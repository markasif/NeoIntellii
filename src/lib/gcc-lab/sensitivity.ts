/**
 * Stress tests and scenario deltas.
 *
 * Every stress test is the same case with exactly one thing changed, run
 * through the same engine. That is what lets "why did this change?" reconcile
 * against actual line items instead of narrating a story about the market: a
 * delta here is always the arithmetic difference between two cost lines, and
 * the explanation names those lines.
 *
 * Percentage points and relative percentages are kept apart. Salary escalation
 * moves by *percentage points* (8% becomes 13%); FX moves by a *relative*
 * percentage of the quote (85 becomes 93.5). The labels say which.
 */

import { computeCostResult } from "./costModel";
import { computeEconomics } from "./economics";
import { convert, shockFx } from "./currency";
import { CATEGORY_LABELS } from "./defaults";
import { OPERATING_BANDS } from "./defaults";
import type { CostCategory, CostResult, CurrencyCode, EconomicsResult, Profile, Scenario, WorkModel } from "./types";

export interface StressCase {
  id: string;
  label: string;
  /** What was changed, in words a finance reader can check. */
  change: string;
  scenario: Scenario;
}

export interface StressOutcome extends StressCase {
  cost: CostResult;
  economics: EconomicsResult;
  /**
   * Deltas against the base case, already in the display currency and each
   * converted at its own scenario's FX quote.
   *
   * Converting inside rather than at the edge is what makes an FX stress
   * legible: the model computes in rupees, so a rate move leaves the rupee
   * figures identical and only shows up once they are read in the visitor's
   * currency. Converting both sides at the base scenario's quote would report
   * every FX stress as no change at all.
   */
  steadyStateDelta: number;
  steadyStateDeltaPercent: number | null;
  firstYearDelta: number;
  /**
   * Change across the first thirty-six months. Some inputs - salary
   * escalation above all - do nothing to a month-one run rate and everything
   * to a three-year one, so a table without this column reports them as zero.
   */
  threeYearDelta: number;
  /** Unfilled FTE-months this variant creates that the base case does not. */
  additionalUnfilledFteMonths: number;
  notes: string[];
}

const escalationOf = (scenario: Scenario): number =>
  scenario.costAssumptions.salaryEscalation ?? OPERATING_BANDS.salaryEscalation.base;

/** The standard stress set. Each entry changes exactly one input. */
export function stressCases(scenario: Scenario): StressCase[] {
  const escalation = escalationOf(scenario);
  const cases: StressCase[] = [];

  const withAssumptions = (id: string, label: string, change: string, patch: Partial<Scenario["costAssumptions"]>) => {
    cases.push({
      id,
      label,
      change,
      scenario: { ...scenario, costAssumptions: { ...scenario.costAssumptions, ...patch } },
    });
  };

  withAssumptions(
    "escalation-up",
    "Salary escalation +5 percentage points",
    `Annual step-up raised from ${(escalation * 100).toFixed(0)}% to ${((escalation + 0.05) * 100).toFixed(0)}% - a 5 percentage point change, not a 5% one`,
    { salaryEscalation: escalation + 0.05 },
  );
  withAssumptions(
    "escalation-down",
    "Salary escalation -5 percentage points",
    `Annual step-up lowered from ${(escalation * 100).toFixed(0)}% to ${(Math.max(0, escalation - 0.05) * 100).toFixed(0)}%`,
    { salaryEscalation: Math.max(0, escalation - 0.05) },
  );

  cases.push({
    id: "fx-weaker-rupee",
    label: "Rupee 10% weaker",
    change: "Every FX quote raised 10% - more rupees per unit of foreign currency",
    scenario: { ...scenario, fx: shockFx(scenario.fx, 0.1) },
  });
  cases.push({
    id: "fx-stronger-rupee",
    label: "Rupee 10% stronger",
    change: "Every FX quote lowered 10% - fewer rupees per unit of foreign currency",
    scenario: { ...scenario, fx: shockFx(scenario.fx, -0.1) },
  });

  [3, 6].forEach((delay) => {
    cases.push({
      id: `delay-${delay}`,
      label: `Hiring delayed ${delay} months`,
      change: `Every start month pushed back ${delay} months. Payroll falls and so does delivered capacity.`,
      scenario: { ...scenario, hiringDelayMonths: scenario.hiringDelayMonths + delay },
    });
  });

  return cases;
}

/** A work-model variant, kept separate because it changes the profile, not the scenario. */
export const WORK_MODEL_LABELS: Record<WorkModel, string> = {
  office: "Full-time office",
  hybrid: "Hybrid",
  remote: "Remote-first",
};

const sumFirst = (values: number[], months: number): number =>
  values.slice(0, months).reduce((total, value) => total + value, 0);

export function runStressCases(
  profile: Profile,
  baseScenario: Scenario,
  baseCost: CostResult,
  displayCurrency: CurrencyCode,
  cases: StressCase[] = stressCases(baseScenario),
): StressOutcome[] {
  /** Reads a figure in the display currency, using that scenario's own quote. */
  const read = (value: number, scenario: Scenario): number =>
    convert(value, scenario.baseCurrency, displayCurrency, scenario.fx) ?? 0;

  const baseSteady = read(baseCost.steadyStateMonthly, baseScenario);
  const baseFirstYear = read(baseCost.firstYearCash, baseScenario);
  const baseThreeYear = read(sumFirst(baseCost.indiaCashMonthly, 36), baseScenario);

  return cases.map((stress) => {
    const cost = computeCostResult(profile, stress.scenario);
    const economics = computeEconomics(profile, stress.scenario, cost);
    const steadyStateDelta = read(cost.steadyStateMonthly, stress.scenario) - baseSteady;
    const additionalUnfilledFteMonths = cost.unfilledFteMonths - baseCost.unfilledFteMonths;

    const notes: string[] = [];
    if (additionalUnfilledFteMonths > 0.01) {
      notes.push(
        `This variant leaves ${additionalUnfilledFteMonths.toFixed(1)} more FTE-months unfilled than the base case. Lower spend here buys less delivery, not the same delivery cheaper.`,
      );
    }
    if (stress.id.startsWith("fx-")) {
      notes.push(
        "FX moves both ways at once: an India cost read in your currency changes, and anything you buy in a foreign currency - cloud, tooling, licences - changes in the opposite direction.",
      );
    }

    return {
      ...stress,
      cost,
      economics,
      steadyStateDelta,
      steadyStateDeltaPercent: baseSteady > 0 ? (steadyStateDelta / baseSteady) * 100 : null,
      firstYearDelta: read(cost.firstYearCash, stress.scenario) - baseFirstYear,
      threeYearDelta: read(sumFirst(cost.indiaCashMonthly, 36), stress.scenario) - baseThreeYear,
      additionalUnfilledFteMonths,
      notes,
    };
  });
}

/* --------------------------------------------------------- scenario deltas */

export interface LineDelta {
  category: CostCategory;
  label: string;
  baseMonthly: number;
  variantMonthly: number;
  delta: number;
}

export interface ScenarioDelta {
  steadyStateDelta: number;
  steadyStateDeltaPercent: number | null;
  firstYearDelta: number;
  oneTimeDelta: number;
  headcountDelta: number;
  /** Every line that moved, largest absolute change first. */
  lines: LineDelta[];
  /** The reconciliation, in words. Sums to the headline delta. */
  explanation: string[];
}

/**
 * Reconciles two runs against each other, line by line.
 *
 * The explanation is built from the line items themselves, so it can only ever
 * say something the arithmetic supports. A price difference is never
 * attributed to talent scarcity, market heat or anything else the model does
 * not contain.
 */
export function explainDelta(base: CostResult, variant: CostResult, formatter: (value: number) => string): ScenarioDelta {
  const byCategory = new Map<CostCategory, LineDelta>();

  const record = (item: CostResult["lineItems"][number], side: "base" | "variant") => {
    const existing = byCategory.get(item.category) ?? {
      category: item.category,
      label: CATEGORY_LABELS[item.category],
      baseMonthly: 0,
      variantMonthly: 0,
      delta: 0,
    };
    if (side === "base") existing.baseMonthly = item.steadyStateMonthly;
    else existing.variantMonthly = item.steadyStateMonthly;
    existing.delta = existing.variantMonthly - existing.baseMonthly;
    byCategory.set(item.category, existing);
  };

  base.lineItems.forEach((item) => record(item, "base"));
  variant.lineItems.forEach((item) => record(item, "variant"));

  const lines = Array.from(byCategory.values())
    .filter((line) => Math.abs(line.delta) > 0.005)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const steadyStateDelta = variant.steadyStateMonthly - base.steadyStateMonthly;
  const baseHeadcount = base.headcountMonthly[base.headcountMonthly.length - 1] ?? 0;
  const variantHeadcount = variant.headcountMonthly[variant.headcountMonthly.length - 1] ?? 0;

  const explanation = lines.map(
    (line) =>
      `${line.label}: ${formatter(line.baseMonthly)} to ${formatter(line.variantMonthly)} a month (${line.delta >= 0 ? "+" : ""}${formatter(line.delta)})`,
  );
  if (explanation.length === 0) explanation.push("No cost line changed between these two scenarios.");

  return {
    steadyStateDelta,
    steadyStateDeltaPercent:
      base.steadyStateMonthly > 0 ? (steadyStateDelta / base.steadyStateMonthly) * 100 : null,
    firstYearDelta: variant.firstYearCash - base.firstYearCash,
    oneTimeDelta: variant.oneTimeTotal - base.oneTimeTotal,
    headcountDelta: variantHeadcount - baseHeadcount,
    lines,
    explanation,
  };
}
