/**
 * The adapter that puts /gcc-cost-calculator and /lp/gcc-playbook on one engine.
 *
 * The calculator's own input shape - a seniority breakdown per role, a city, a
 * complexity multiplier, an engagement model and an advisory toggle - is
 * normalized here into the lab's Profile and Scenario, and the answer comes
 * back out of the lab's monthly cash model. There is no second salary table,
 * no second benefits multiplier and no second fee schedule anywhere in the
 * codebase.
 *
 * The calculator quotes a low-high range and the lab quotes a monthly cash
 * schedule, so the bridge runs the same model twice - once at each end of the
 * planning bands - and reads the steady-state month out of each. Because every
 * seat in a calculator scenario starts in month 1 and nothing escalates inside
 * the first year, that steady-state month is the calculator's annual figure.
 */

import { computeCostResult } from "./costModel";
import { OPERATING_BANDS } from "./defaults";
import { createProfile, createScenario, createTeamRow, NO_BUNDLE } from "./profile";
import { SENIORITY_ORDER } from "./roles";
import type { CostCategory, IndiaCityKey, Profile, Scenario, SeniorityKey } from "./types";

export type LegacySeniorityBreakdown = Record<string, number[]>;

export interface LegacyInput {
  seniorityBreakdown: LegacySeniorityBreakdown;
  city: IndiaCityKey;
  complexityMultiplier: number;
  engagement: "captive" | "managed" | "hybrid";
  includeSME: boolean;
}

const seniorityFromTier = (tier: number): SeniorityKey =>
  SENIORITY_ORDER[Math.min(Math.max(0, Math.round(tier)), SENIORITY_ORDER.length - 1)];

/**
 * The calculator's inputs as a lab case.
 *
 * A "hybrid" engagement is a managed engagement that intends to transfer, so
 * it is priced as managed and carries the transfer intent on the profile
 * rather than inventing a third fee schedule.
 */
export function normalizeLegacyInput(input: LegacyInput): { profile: Profile; scenario: Scenario } {
  const team = Object.entries(input.seniorityBreakdown).flatMap(([roleKey, seats]) =>
    (seats ?? []).map((tier, index) =>
      createTeamRow({
        id: `legacy_${roleKey}_${index}`,
        roleKey,
        seniority: seniorityFromTier(tier),
        fte: 1,
        startMonth: 1,
        compensationBasis: "base-salary",
      }),
    ),
  );

  const managed = input.engagement === "managed" || input.engagement === "hybrid";

  const profile = createProfile({
    profileId: "legacy",
    country: "UNKNOWN",
    displayCurrency: "USD",
    city: input.city,
    cityIsDefault: false,
    // The calculator prices a seat in an office, which is the assumption behind
    // its published workspace figure.
    workModel: "office",
    ownership: input.engagement === "hybrid" ? "transfer-later" : input.engagement === "captive" ? "own-from-day-one" : "provider-employed",
    team,
    createdAt: "1970-01-01T00:00:00.000Z",
    updatedAt: "1970-01-01T00:00:00.000Z",
  });

  const scenario = createScenario(profile, {
    id: "legacy",
    engagement: managed ? "neointelli-managed" : "client-managed",
    feeBundle: NO_BUNDLE,
    baseCurrency: "USD",
    costAssumptions: {
      complexityMultiplier: input.complexityMultiplier,
      // The calculator quotes a run rate, not a ramp: nothing one-time, no
      // escalation inside the year it reports.
      salaryEscalation: 0,
      recruitmentPerHire: 0,
      equipmentPerHire: 0,
      entityLegalMonthly: 0,
      travelOversightMonthly: 0,
      initialSetup: 0,
      contingencyRate: 0,
      attritionRate: 0,
    },
  });

  return { profile, scenario };
}

export interface LegacyBand {
  low: number;
  high: number;
}

export interface LegacyCategoryTotals {
  /** Compensation plus the statutory and benefits top-up, annual. */
  salary: LegacyBand;
  workspace: LegacyBand;
  operations: LegacyBand;
  partner: LegacyBand;
  advisory: LegacyBand;
  annual: LegacyBand;
}

const CATEGORY_GROUPS: Record<keyof Omit<LegacyCategoryTotals, "annual">, CostCategory[]> = {
  salary: ["talent", "incremental-benefits"],
  workspace: ["workspace"],
  operations: ["it-security-ops"],
  partner: ["partner-fees"],
  advisory: ["fractional-leadership"],
};

/**
 * Annual totals per legacy category, at both ends of the planning bands.
 *
 * Read from the steady-state month of the shared model and multiplied by
 * twelve - valid here precisely because every seat starts in month 1, so the
 * steady-state month *is* a representative month of year one.
 */
export function legacyAnnualTotals(input: LegacyInput): LegacyCategoryTotals {
  const { profile, scenario } = normalizeLegacyInput(input);

  const run = (band: "low" | "high") => {
    const scenarioForBand: Scenario = {
      ...scenario,
      costAssumptions: {
        ...scenario.costAssumptions,
        // Advisory is a flat retainer, so it is set explicitly rather than left
        // to the opt-in default of zero.
        fractionalLeadershipMonthly: input.includeSME ? OPERATING_BANDS.fractionalLeadershipMonthly[band] : 0,
      },
    };
    return computeCostResult(profile, scenarioForBand, { band, horizonMonths: 12 });
  };

  const low = run("low");
  const high = run("high");

  const totalFor = (result: ReturnType<typeof computeCostResult>, categories: CostCategory[]): number =>
    result.lineItems
      .filter((item) => categories.includes(item.category))
      .reduce((sum, item) => sum + item.steadyStateMonthly, 0) * 12;

  const groups = Object.entries(CATEGORY_GROUPS) as [keyof typeof CATEGORY_GROUPS, CostCategory[]][];
  const totals = groups.reduce((acc, [key, categories]) => {
    acc[key] = { low: totalFor(low, categories), high: totalFor(high, categories) };
    return acc;
  }, {} as Record<keyof typeof CATEGORY_GROUPS, LegacyBand>);

  return {
    ...totals,
    annual: {
      low: groups.reduce((sum, [key]) => sum + totals[key].low, 0),
      high: groups.reduce((sum, [key]) => sum + totals[key].high, 0),
    },
  };
}
