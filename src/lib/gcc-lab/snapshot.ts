/**
 * The immutable result snapshot.
 *
 * One object drives the screen, the PDF and the CSV. That is the only way
 * three surfaces can be guaranteed to agree, and it is what makes an export
 * safe while the visitor keeps editing: the snapshot is taken, and everything
 * downstream reads the snapshot rather than the live case. An edit made while
 * a PDF is rendering cannot leak half of a newer version into it.
 *
 * The snapshot carries its own provenance - case id, input hash, model and
 * data versions, FX quote date, every assumption with its basis, every source,
 * every exclusion and every open question - so a pack that ends up in an inbox
 * six weeks later can still be checked.
 */

import { computeCostBand, computeCostResult, effectiveTeam } from "./costModel";
import { computeEconomics } from "./economics";
import { OPERATING_BANDS } from "./defaults";
import { caseIdFor, hashInputs } from "./profile";
import { assessReadiness } from "./readiness";
import { surfacePolicies } from "./policy";
import { findCity } from "./cities";
import { sourceRefs, SOURCE_REGISTER, isStale } from "./sources";
import { BENCHMARK_CURRENCY, BENCHMARK_FX_DATE, BENCHMARK_INR_PER_USD, isBenchmarkedCity } from "./roles";
import type {
  Assumption,
  CostWarning,
  Profile,
  ResultSnapshot,
  Scenario,
  SourceReference,
} from "./types";

export interface SnapshotOptions {
  /** Injected so a snapshot is reproducible in a test. */
  now?: Date;
  discountRateAnnual?: number;
}

const assumption = (input: Assumption): Assumption => input;

/**
 * The assumptions actually used by this run, each with its basis.
 *
 * An assumption the visitor has overridden reports basis "user-input" and
 * keeps its previous value, so a reader can see what was changed and from what.
 */
export function collectAssumptions(profile: Profile, scenario: Scenario): Assumption[] {
  const overrides = scenario.costAssumptions;
  const list: Assumption[] = [];

  const banded = (
    id: string,
    label: string,
    key: keyof typeof OPERATING_BANDS,
    unit: string,
    override: number | undefined,
    rationale: string,
  ) => {
    const band = OPERATING_BANDS[key];
    const overridden = override != null && Number.isFinite(override);
    list.push(
      assumption({
        id,
        label,
        value: overridden ? override! : band.base,
        unit,
        currency: unit.includes("per month") || unit.includes("one-time") ? BENCHMARK_CURRENCY : undefined,
        low: overridden ? undefined : band.low,
        high: overridden ? undefined : band.high,
        basis: overridden ? "user-input" : "planning-assumption",
        sourceId: overridden ? undefined : key === "benefitsRate" ? "ni-comp-bands" : "ni-operating-costs",
        confidence: overridden ? "source-backed" : "planning-grade",
        confidenceRationale: overridden ? "Your own figure." : rationale,
        overridden,
        previousValue: overridden ? band.base : undefined,
      }),
    );
  };

  banded("benefits-rate", "Statutory and benefits top-up on base salary", "benefitsRate", "fraction of base salary", overrides.benefitsRate,
    "A NeoIntelli planning band, applied only to rows quoted on base salary. Rows quoted on India CTC already include it.");
  banded("salary-escalation", "Annual salary step-up", "salaryEscalation", "fraction, applied on each scenario anniversary", overrides.salaryEscalation,
    "A planning assumption, not a measured market increment. Stress-tested at plus and minus five percentage points in the Compare area.");
  banded("workspace", "Workspace", "workspacePerSeatMonthly", "per seat per month", overrides.workspacePerSeatMonthly,
    "A planning band. Real cost depends on the city, the workspace model and the lease.");
  banded("it-security", "IT, security and compliance operations", "itSecurityPerSeatMonthly", "per seat per month", overrides.itSecurityPerSeatMonthly,
    "A planning band covering device management, security tooling and compliance administration.");

  if (scenario.engagement === "neointelli-managed") {
    banded("partner-fee", "Operating partner fee", "partnerFeePerSeatMonthly", "per seat per month", overrides.partnerFeePerSeatMonthly,
      "An internal pricing input pending commercial sign-off, not an approved price list.");
  }

  list.push(
    assumption({
      id: "fx",
      label: `FX quote: INR per one ${profile.displayCurrency}`,
      value: scenario.fx.quotes[profile.displayCurrency] ?? 0,
      unit: `INR per 1 ${profile.displayCurrency}`,
      basis: scenario.fx.origin === "user-entered" ? "user-input" : "planning-assumption",
      sourceId: scenario.fx.origin === "user-entered" ? undefined : "ni-fx-planning",
      effectiveFrom: scenario.fx.quoteDate,
      confidence: scenario.fx.origin === "user-entered" ? "source-backed" : "indicative",
      confidenceRationale:
        scenario.fx.origin === "user-entered"
          ? "Your own rate."
          : "A round planning quote so the arithmetic is inspectable. There is no rate feed connected and this is not a dealable rate.",
      overridden: scenario.fx.origin === "user-entered",
    }),
  );

  list.push(
    assumption({
      id: "benchmark-translation",
      label: "Rate the published bands were struck at",
      value: BENCHMARK_INR_PER_USD,
      unit: `INR per 1 ${BENCHMARK_CURRENCY}`,
      basis: "planning-assumption",
      sourceId: "ni-comp-bands",
      effectiveFrom: BENCHMARK_FX_DATE,
      confidence: "planning-grade",
      confidenceRationale:
        "The register describes costs incurred in rupees and publishes them in USD at this rate. It is deliberately separate from your display FX quote: if the two moved together, a rate change would convert into rupees and back out again and show no effect at all.",
    }),
  );

  list.push(
    assumption({
      id: "compensation-basis",
      label: "Compensation benchmark basis",
      value: 0,
      descriptive: true,
      unit: `Annual base salary in ${BENCHMARK_CURRENCY}, before statutory overhead`,
      basis: "published-benchmark",
      sourceId: "ni-comp-bands",
      confidence: isBenchmarkedCity(scenario.cityOverride ?? profile.city) ? "planning-grade" : "insufficient-evidence",
      confidenceRationale: isBenchmarkedCity(scenario.cityOverride ?? profile.city)
        ? "NeoIntelli planning bands modelled on delivery and hiring experience. Not a published salary survey and carrying no sample size."
        : "The compensation register does not cover this city. Nothing is modelled from it.",
    }),
  );

  list.push(
    assumption({
      id: "policy-value",
      label: "Modelled value of policy incentives",
      value: 0,
      unit: "always zero in this release",
      basis: "planning-assumption",
      confidence: "source-backed",
      confidenceRationale:
        "Every policy consideration is modelled at zero. A deduction is not a cash grant, provisions do not stack automatically, and none is quantified until reviewed.",
    }),
  );

  return list;
}

/** What the case cannot answer yet. Printed prominently rather than in a footnote. */
export function openQuestions(profile: Profile, scenario: Scenario, cost: ReturnType<typeof computeCostResult>): string[] {
  const questions: string[] = [];

  const readiness = assessReadiness(profile.readiness);
  readiness.openGates.forEach((gate) => questions.push(`Readiness gate: ${gate.question}`));
  if (readiness.coverage < 1) {
    questions.push(
      `Readiness is ${readiness.answeredCount} of ${readiness.totalCount} questions answered. The unanswered ones are not passes.`,
    );
  }

  cost.exclusions.forEach((exclusion) => questions.push(`Cost not budgeted: ${exclusion}`));

  if (scenario.baseline.roles.length === 0 && profile.objective !== "expand-india") {
    questions.push("No baseline costs entered, so savings, ROI and payback cannot be produced.");
  }

  const city = findCity(scenario.cityOverride ?? profile.city);
  if (city && city.compensationCoverage !== "modelled") {
    questions.push(`No compensation record covers ${city.label}. Every figure here rests on costs you supplied.`);
  }
  if (profile.cityIsDefault) {
    questions.push(`The city is still the workspace's opening assumption (${city?.label ?? profile.city}), not a decision you have made.`);
  }

  surfacePolicies(profile)
    .filter((entry) => entry.status === "more-information-needed")
    .slice(0, 5)
    .forEach((entry) => {
      questions.push(`${entry.record.title}: ${entry.record.missingFacts.slice(0, 2).join("; ")}`);
    });

  if (profile.privacy.indiaRemoteAccess === "unknown") {
    questions.push("It is not established whether the India team would access personal data. This changes both the plan and the privacy work.");
  }

  return questions;
}

/** Sources actually used, plus a note on any that are past their review date. */
function collectSources(assumptions: Assumption[]): { sources: SourceReference[]; warnings: CostWarning[] } {
  const ids = Array.from(new Set(assumptions.map((entry) => entry.sourceId).filter((id): id is string => Boolean(id))));
  const warnings: CostWarning[] = [];
  SOURCE_REGISTER.filter((source) => ids.includes(source.id) && isStale(source)).forEach((source) => {
    warnings.push({
      id: `stale-source-${source.id}`,
      severity: "caution",
      message: `"${source.title}" was last reviewed on ${source.lastReviewed} and is past its ${source.reviewCadence} review. It stays visible, but it should not carry an unqualified recommendation.`,
    });
  });
  return { sources: sourceRefs(ids), warnings };
}

/**
 * Takes the snapshot.
 *
 * Everything downstream - the summary, the PDF, the CSV, the review
 * submission - reads this object and nothing else.
 */
export function buildSnapshot(profile: Profile, scenario: Scenario, options: SnapshotOptions = {}): ResultSnapshot {
  const now = options.now ?? new Date();
  const cost = computeCostResult(profile, scenario);
  const band = computeCostBand(profile, scenario);
  const economics = computeEconomics(profile, scenario, cost, { discountRateAnnual: options.discountRateAnnual });
  const assumptions = collectAssumptions(profile, scenario);
  const { sources, warnings: sourceWarnings } = collectSources(assumptions);

  const costWithBand = band ? { ...cost, steadyStateBand: band } : cost;

  return {
    caseId: caseIdFor(profile, scenario),
    inputHash: hashInputs(profile, scenario),
    computedAt: now.toISOString(),
    modelVersion: scenario.modelVersion,
    dataVersion: scenario.dataVersion,
    fxQuoteDate: scenario.fx.quoteDate,
    // Deep-frozen at the boundary: a snapshot that can be mutated is not a snapshot.
    profile: JSON.parse(JSON.stringify(profile)) as Profile,
    scenario: JSON.parse(JSON.stringify(scenario)) as Scenario,
    cost: costWithBand,
    economics,
    assumptions,
    sources,
    warnings: [...cost.warnings, ...economics.warnings, ...sourceWarnings],
    openQuestions: openQuestions(profile, scenario, cost),
    // Only an actual recorded practitioner review may change this.
    reviewState: "planning-estimate",
  };
}

/** Headcount at the target team size, advisory seats excluded. */
export const targetHeadcount = (profile: Profile, scenario: Scenario): number =>
  effectiveTeam(profile, scenario)
    .filter((row) => !row.advisory)
    .reduce((total, row) => total + row.fte, 0);

export const REVIEW_STATE_LABELS: Record<ResultSnapshot["reviewState"], string> = {
  "planning-estimate": "Planning estimate",
  "practitioner-reviewed": "Practitioner reviewed",
};

export const PLANNING_ESTIMATE_NOTE =
  "This is automated output. It is labelled a planning estimate because no NeoIntelli practitioner has reviewed it. \"Practitioner reviewed\" appears only after a review has actually happened and been recorded.";
