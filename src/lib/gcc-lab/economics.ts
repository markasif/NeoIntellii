/**
 * Comparison economics: what an India team is being compared *against*, and
 * what follows from that.
 *
 * The first question is not "how much do we save" but "save against what".
 * Four objectives produce four different baselines and four different words
 * for the result, and one of them - exploring without a baseline - produces no
 * savings figure at all rather than a made-up one.
 *
 *   net_difference_m       = comparable_baseline_cash_m - india_cash_m
 *   cumulative_difference_t = sum(net_difference_m, m = 1..t)
 *
 * Payback is the first month the cumulative difference turns non-negative
 * after an initial deficit. If there was never a deficit the answer is "no
 * initial deficit in this model", not a break-even event that did not happen;
 * if the deficit is never recovered inside the horizon, the answer says that
 * too. A later reversal is flagged, and a sustained payback month - the month
 * after which the cumulative difference stays non-negative for the rest of the
 * horizon - is offered alongside.
 */

import { convert } from "./currency";
import { effectiveTeam } from "./costModel";
import type {
  CostResult,
  CostWarning,
  CurrencyCode,
  EconomicsResult,
  ObjectiveKey,
  Profile,
  Scenario,
} from "./types";

/** How the difference must be described for each objective. */
export const DIFFERENCE_LABELS: Record<ObjectiveKey, string> = {
  "add-capacity": "Cost difference against planned HQ hiring (avoided planned spend, not payroll savings)",
  "transition-work": "Incremental cash savings against avoidable HQ and vendor cost",
  "expand-india": "Incremental cost of the additional team, on top of the existing India run rate",
  explore: "India cost only - no baseline has been given, so there is nothing to compare against",
};

export interface EconomicsOptions {
  /** Annual discount rate for the optional NPV. Pre-tax planning basis. */
  discountRateAnnual?: number;
}

const sum = (values: number[]): number => values.reduce((total, value) => total + value, 0);

/**
 * How much of the target team is actually staffed each month, as a fraction.
 * Used to phase a transition baseline: work that has not moved yet has not
 * stopped costing anything at HQ.
 */
function staffedFraction(profile: Profile, scenario: Scenario, cost: CostResult): number[] {
  const target = effectiveTeam(profile, scenario)
    .filter((row) => !row.advisory)
    .reduce((total, row) => total + row.fte, 0);
  if (target <= 0) return cost.headcountMonthly.map(() => 0);
  return cost.headcountMonthly.map((headcount) => Math.min(1, Math.max(0, headcount / target)));
}

/**
 * The comparable baseline cash schedule, or null when the case has no
 * baseline. A null here is what makes savings, ROI and payback unavailable
 * downstream rather than zero.
 */
export function baselineSchedule(
  profile: Profile,
  scenario: Scenario,
  cost: CostResult,
): { monthly: number[] | null; warnings: CostWarning[]; note: string } {
  const months = cost.indiaCashMonthly.length;
  const warnings: CostWarning[] = [];
  const baseline = scenario.baseline;
  const objective = baseline.objective ?? profile.objective;
  const toBase = (value: number): number | null =>
    convert(value, baseline.currency, scenario.baseCurrency, scenario.fx);

  if (baseline.roles.length === 0 && objective !== "expand-india") {
    return {
      monthly: null,
      warnings: [
        {
          id: "no-baseline",
          severity: "info",
          message:
            "No baseline costs have been entered, so savings, ROI and payback are unavailable. Enter what the same scope would cost you today and they unlock.",
        },
      ],
      note: "No baseline",
    };
  }

  if (objective === "expand-india" && baseline.roles.length === 0) {
    return {
      monthly: null,
      warnings: [
        {
          id: "expansion-no-counterfactual",
          severity: "info",
          message:
            "This is an expansion of an existing India centre. The model reports the incremental cost of the new team on top of your current run rate; it does not invent a US or HQ alternative to compare it against.",
        },
      ],
      note: "Expansion - incremental cost only",
    };
  }

  // Baseline roles are scheduled against the *planned* team, not the delayed
  // one. A delay therefore shows up as a cost difference AND as unfilled
  // capacity, rather than as a saving on its own.
  const undelayed = effectiveTeam(profile, { ...scenario, hiringDelayMonths: 0 })
    .filter((row) => !row.advisory);

  const monthly = new Array<number>(months).fill(0);
  let unconverted = 0;

  baseline.roles.forEach((role) => {
    const annual = toBase(role.annualCost);
    if (annual == null || !Number.isFinite(annual)) {
      unconverted += 1;
      return;
    }
    const match = undelayed.find(
      (row) => row.roleKey === role.roleKey && row.seniority === role.seniority,
    );
    const startMonth = match?.startMonth ?? 1;
    for (let m = startMonth - 1; m < months; m += 1) {
      monthly[m] += (role.fte * annual) / 12;
    }
  });

  if (unconverted > 0) {
    warnings.push({
      id: "baseline-unconverted",
      severity: "blocking",
      message: `${unconverted} baseline role(s) could not be converted into ${scenario.baseCurrency}. They are excluded from the comparison, not counted as zero.`,
    });
  }

  // Scope check: a comparison is only comparable when both sides carry the
  // same roles, seniority and headcount.
  const indiaFte = undelayed.reduce((total, row) => total + row.fte, 0);
  const baselineFte = baseline.roles.reduce((total, role) => total + role.fte, 0);
  if (indiaFte > 0 && baselineFte > 0 && Math.abs(indiaFte - baselineFte) > 0.01) {
    warnings.push({
      id: "scope-mismatch",
      severity: "caution",
      message: `The baseline covers ${baselineFte} FTE and the India team ${indiaFte} FTE. The difference below is not a like-for-like comparison until the two scopes match.`,
    });
  }

  if (objective === "transition-work") {
    // Work that has not moved has not stopped costing anything, so only the
    // share of the baseline that has actually been replaced counts as avoided.
    const staffed = staffedFraction(profile, scenario, cost);
    const overlap = Math.max(0, Math.round(scenario.baseline.overlapMonths ?? 0));
    const phased = monthly.map((value, m) => {
      const source = m - overlap;
      const fraction = source < 0 ? 0 : staffed[source] ?? 0;
      return value * fraction;
    });
    if (overlap > 0) {
      warnings.push({
        id: "overlap-modelled",
        severity: "info",
        message: `A ${overlap}-month overlap is modelled: HQ or vendor cost keeps running for ${overlap} month(s) after each part of the team is in place.`,
      });
    }
    return { monthly: phased, warnings, note: "Avoidable cost, phased as work actually moves" };
  }

  return { monthly, warnings, note: "Comparable planned cost, on the planned hiring schedule" };
}

/** First month the cumulative difference turns non-negative after a deficit. */
function findPayback(cumulative: number[]): { month: number | null; state: EconomicsResult["paybackState"] } {
  const firstDeficit = cumulative.findIndex((value) => value < 0);
  if (firstDeficit === -1) return { month: null, state: "no-initial-deficit" };
  for (let i = firstDeficit; i < cumulative.length; i += 1) {
    if (cumulative[i] >= 0) return { month: i + 1, state: "recovered" };
  }
  return { month: null, state: "not-recovered-in-horizon" };
}

/** The month after which the cumulative difference never goes negative again. */
function findSustainedPayback(cumulative: number[]): number | null {
  for (let i = 0; i < cumulative.length; i += 1) {
    if (cumulative[i] < 0) continue;
    if (cumulative.slice(i).every((value) => value >= 0)) return i + 1;
  }
  return null;
}

export function computeEconomics(
  profile: Profile,
  scenario: Scenario,
  cost: CostResult,
  options: EconomicsOptions = {},
): EconomicsResult {
  const currency: CurrencyCode = scenario.baseCurrency;
  const objective = scenario.baseline.objective ?? profile.objective;
  const { monthly: baselineCashMonthly, warnings } = baselineSchedule(profile, scenario, cost);

  const toBase = (value: number): number =>
    convert(value, scenario.baseline.currency, currency, scenario.fx) ?? 0;

  // The one-time investment that stands the centre up. It is already inside
  // the India cash schedule; it is named separately here only so ROI has a
  // denominator, and it is never subtracted a second time.
  const transitionInvestment =
    toBase(Math.max(0, scenario.baseline.transitionOneTime ?? 0)) +
    toBase(Math.max(0, scenario.baseline.separationOneTime ?? 0)) +
    Math.max(0, scenario.costAssumptions.initialSetup ?? 0);

  if (baselineCashMonthly == null) {
    return {
      baselineCashMonthly: null,
      netDifferenceMonthly: null,
      cumulativeDifference: null,
      paybackMonth: null,
      paybackState: "no-baseline",
      sustainedPaybackMonth: null,
      reversesLater: false,
      roiPercent: null,
      roiUnavailableReason: "No baseline has been given, so there is no net benefit to divide.",
      transitionInvestment,
      npv: null,
      discountRateAnnual: options.discountRateAnnual ?? null,
      currency,
      differenceLabel: DIFFERENCE_LABELS[objective],
      warnings,
    };
  }

  const netDifferenceMonthly = baselineCashMonthly.map((value, m) => value - (cost.indiaCashMonthly[m] ?? 0));

  const cumulativeDifference: number[] = [];
  netDifferenceMonthly.reduce((running, value) => {
    const next = running + value;
    cumulativeDifference.push(next);
    return next;
  }, 0);

  const { month: paybackMonth, state: paybackState } = findPayback(cumulativeDifference);
  const sustainedPaybackMonth = findSustainedPayback(cumulativeDifference);
  const reversesLater =
    paybackMonth != null && cumulativeDifference.slice(paybackMonth - 1).some((value) => value < 0);

  if (reversesLater) {
    warnings.push({
      id: "payback-reverses",
      severity: "caution",
      message:
        "The cumulative difference goes negative again after the payback month. Use the sustained payback month rather than the first crossing.",
    });
  }

  const netBenefit = cumulativeDifference[cumulativeDifference.length - 1] ?? 0;
  const roiPercent = transitionInvestment > 0 ? (netBenefit / transitionInvestment) * 100 : null;

  let npv: number | null = null;
  const discountRateAnnual = options.discountRateAnnual ?? null;
  if (discountRateAnnual != null && Number.isFinite(discountRateAnnual) && discountRateAnnual > -1) {
    const monthlyRate = Math.pow(1 + discountRateAnnual, 1 / 12) - 1;
    npv = sum(netDifferenceMonthly.map((value, m) => value / Math.pow(1 + monthlyRate, m + 1)));
  }

  return {
    baselineCashMonthly,
    netDifferenceMonthly,
    cumulativeDifference,
    paybackMonth,
    paybackState,
    sustainedPaybackMonth,
    reversesLater,
    roiPercent,
    roiUnavailableReason:
      transitionInvestment > 0
        ? undefined
        : "No transition investment has been identified, so the ROI denominator is zero and the percentage is unavailable.",
    transitionInvestment,
    npv,
    discountRateAnnual,
    currency,
    differenceLabel: DIFFERENCE_LABELS[objective],
    warnings,
  };
}

/** The definition shown wherever an ROI percentage appears. Never implied. */
export const ROI_DEFINITION =
  "ROI = cumulative net benefit over the horizon divided by the separately identified transition investment, times 100. The transition investment is already counted once inside the cash costs and is not subtracted again. This is not project profitability and it is not a revenue return.";
