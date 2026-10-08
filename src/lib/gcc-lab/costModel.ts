/**
 * The India cost model: a monthly cash engine, as pure functions.
 *
 * The whole model is a month-by-month cash schedule over a 60-month horizon.
 * Everything the workspace shows - first-year cash, steady-state run rate,
 * one-time totals, the comparison, the sensitivity runs, the export - is
 * derived from that one array, so no two surfaces can disagree.
 *
 * The arithmetic, stated once:
 *
 *   payroll_m      = sum over active rows of (FTE x annual_compensation_m / 12)
 *   india_cash_m   = payroll_m + non-included benefits + recurring operations
 *                    + partner fees + compute + one-time items + transition
 *                    + explicitly modelled risk cost
 *   first_year_cash = sum(india_cash_m) for m = 1..12
 *
 * Salary escalation is applied as an annual step-up on each scenario
 * anniversary - month 13 is the first month at the stepped rate - rather than
 * being smeared across the year. Advisory seats are costed but never counted
 * as headcount.
 *
 * The two things this file refuses to do are worth naming. It will not price a
 * seat it has no benchmark and no user figure for: those seats are reported as
 * unpriced and left out of the total rather than counted as zero. And it will
 * not silently absorb a cost line into a bundled fee: a line covered by a fee
 * is zeroed *and* flagged, so the same cost can never be billed twice.
 */

import {
  convert,
  inrPerUnit,
} from "./currency";
import {
  CATEGORY_LABELS,
  NOT_BUDGETED,
  OPERATING_BANDS,
  WORK_MODEL_WORKSPACE_FACTOR,
  pick,
  type BandSelector,
} from "./defaults";
import { BENCHMARK_INR_PER_USD, compensationBenchmark, isBenchmarkedCity, roleLabel } from "./roles";
import type {
  CostCategory,
  CostLineItem,
  CostResult,
  CostUnit,
  CostWarning,
  CurrencyCode,
  Profile,
  Scenario,
  TeamRow,
} from "./types";
import { HORIZON_MONTHS } from "./versions";

export interface ComputeOptions {
  /** Which end of the planning bands to use. Defaults to the midpoint. */
  band?: BandSelector;
  horizonMonths?: number;
}

const zeros = (n: number): number[] => new Array(n).fill(0);

/** Guards every user-supplied number at the boundary: no NaN reaches the maths. */
export const finite = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

/** Quantities cannot be negative. A negative input is a typo, not a rebate. */
const nonNegative = (value: unknown, fallback = 0): number => Math.max(0, finite(value, fallback));

/**
 * The team a scenario actually prices: profile rows with the scenario's
 * overrides applied and the hiring delay pushed through the start months.
 */
export function effectiveTeam(profile: Profile, scenario: Scenario): TeamRow[] {
  const delay = nonNegative(scenario.hiringDelayMonths);
  return profile.team.map((row) => {
    const override = scenario.teamOverrides[row.id] ?? {};
    const merged = { ...row, ...override };
    return {
      ...merged,
      fte: nonNegative(merged.fte),
      startMonth: Math.max(1, Math.round(nonNegative(merged.startMonth, 1))) + delay,
    };
  });
}

/** The same team without the delay, used to measure the capacity a delay costs. */
function undelayedTeam(profile: Profile, scenario: Scenario): TeamRow[] {
  return effectiveTeam(profile, { ...scenario, hiringDelayMonths: 0 });
}

/**
 * A figure from the register, in the scenario's base currency.
 *
 * Register figures describe costs incurred in India, so they are treated as
 * INR-native: translated from their published USD form at the fixed benchmark
 * rate, then converted to the base currency at the scenario's quote. When the
 * scenario quotes the benchmark rate itself the two steps cancel exactly,
 * which is what keeps /gcc-cost-calculator's published numbers unchanged.
 */
export function registerFigureToBase(usdAmount: number, scenario: Scenario): number | null {
  const inr = usdAmount * BENCHMARK_INR_PER_USD;
  return convert(inr, "INR", scenario.baseCurrency, scenario.fx);
}

export interface ResolvedCompensation {
  /** Annual compensation in the scenario's base currency, on the row's declared basis. */
  annual: number;
  source: "user-override" | "benchmark";
  benchmarkId?: string;
}

/**
 * What one seat costs a year, before escalation and complexity.
 *
 * Returns null when neither a user figure nor a benchmark covers the row -
 * which is the honest answer for, say, a Mumbai seat, since the compensation
 * register does not cover Mumbai. Callers must surface that, not zero it.
 */
export function resolveCompensation(
  row: TeamRow,
  city: Profile["city"],
  scenario: Scenario,
): ResolvedCompensation | null {
  if (row.overrideAnnual != null && Number.isFinite(row.overrideAnnual)) {
    const from = row.overrideCurrency ?? scenario.baseCurrency;
    const converted = convert(nonNegative(row.overrideAnnual), from, scenario.baseCurrency, scenario.fx);
    if (converted == null) return null;
    return { annual: converted, source: "user-override" };
  }
  const benchmark = compensationBenchmark(row.roleKey, city, row.seniority);
  if (!benchmark) return null;
  const converted = registerFigureToBase(benchmark.annual, scenario);
  if (converted == null) return null;
  return { annual: converted, source: "benchmark", benchmarkId: benchmark.benchmarkId };
}

/**
 * The top-up needed to get from a row's declared compensation basis to total
 * employer cost.
 *
 * A row quoted on India CTC already carries employer provident fund, gratuity
 * and insurance, so it gets nothing added. Adding the benefits rate to it
 * again is the single most common way a GCC cost model overstates itself.
 */
export function benefitsTopUpRate(row: TeamRow, benefitsRate: number): number {
  switch (row.compensationBasis) {
    case "base-salary": return benefitsRate;
    case "india-ctc": return 0;
    case "total-employer-cost": return 0;
    default: return 0;
  }
}

/**
 * One seat's annual cost to company, in rupees.
 *
 * Exposed so the team editor can show a figure in the form the Indian market
 * actually quotes - lakh per annum, CTC - beside whatever display currency the
 * visitor has chosen. Returns null when the seat cannot be priced, which is
 * carried through as "no benchmark", never as zero.
 */
export function seatAnnualCtcInr(
  row: TeamRow,
  city: Profile["city"],
  scenario: Scenario,
  benefitsRate: number,
  complexityMultiplier = 0,
): number | null {
  const resolved = resolveCompensation(row, city, scenario);
  if (resolved == null) return null;
  const loaded = resolved.annual * (1 + nonNegative(complexityMultiplier)) * (1 + benefitsTopUpRate(row, benefitsRate));
  return convert(loaded, scenario.baseCurrency, "INR", scenario.fx);
}

/** A cost line, assembled from its monthly array. */
function lineItem(
  category: CostCategory,
  unit: CostUnit,
  monthly: number[],
  basis: CostLineItem["basis"],
  extras: Partial<CostLineItem> = {},
): CostLineItem {
  const total = monthly.reduce((sum, value) => sum + value, 0);
  return {
    category,
    label: CATEGORY_LABELS[category],
    unit,
    monthly,
    total,
    firstYear: monthly.slice(0, 12).reduce((sum, value) => sum + value, 0),
    steadyStateMonthly: 0,
    basis,
    ...extras,
  };
}

/** Which cost lines a bundled managed fee already covers, so they are not billed twice. */
function bundleCovers(scenario: Scenario, category: CostCategory): boolean {
  if (scenario.engagement !== "neointelli-managed") return false;
  const bundle = scenario.feeBundle;
  switch (category) {
    case "recruitment": return bundle.recruitment;
    case "workspace": return bundle.workspace;
    case "equipment": return bundle.equipment;
    case "it-security-ops": return bundle.itSecurityOps;
    case "entity-legal-payroll": return bundle.entityLegalPayroll;
    default: return false;
  }
}

/** Monthly AI and cloud consumption, from whichever mode the scenario is in. */
export function computeAiCompute(scenario: Scenario, months: number): { monthly: number[]; warnings: CostWarning[] } {
  const monthly = zeros(months);
  const warnings: CostWarning[] = [];
  const config = scenario.aiCompute;
  const currency = config.currency ?? scenario.baseCurrency;
  const toBase = (value: number): number => convert(value, currency, scenario.baseCurrency, scenario.fx) ?? 0;

  if (config.mode === "not-budgeted") {
    warnings.push({
      id: "compute-not-budgeted",
      severity: "caution",
      message:
        "AI and cloud consumption is not budgeted. For a team doing model training or high-volume inference this can be a material part of the run rate, so the total below is incomplete until you enter a figure.",
    });
    return { monthly, warnings };
  }

  if (config.mode === "monthly-budget") {
    const budget = toBase(nonNegative(config.monthlyBudget));
    for (let m = 0; m < months; m += 1) monthly[m] += budget;
  }

  if (config.mode === "structured") {
    const gpu = nonNegative(config.gpuHoursPerMonth) * nonNegative(config.gpuHourlyRate);
    const api = nonNegative(config.apiUnitsPerMonth) * nonNegative(config.apiUnitRate);
    const recurring = toBase(gpu + api + nonNegative(config.storageMonthly) + nonNegative(config.platformMonthly));
    for (let m = 0; m < months; m += 1) monthly[m] += recurring;

    // Owned hardware and rented GPU hours buy the same capacity. Charging both
    // for the same workload double counts it, so the model says so rather than
    // quietly adding them together.
    if (nonNegative(config.hardwarePurchase) > 0 && gpu > 0) {
      warnings.push({
        id: "compute-hardware-and-rental",
        severity: "caution",
        message:
          "This scenario carries both a hardware purchase and rented GPU hours. Check they cover different capacity - the model adds them, it cannot tell whether they overlap.",
      });
    }
  }

  const chargeOnce = (amount: number | undefined, month: number | undefined) => {
    const value = toBase(nonNegative(amount));
    if (value <= 0) return;
    const index = Math.min(Math.max(1, Math.round(finite(month, 1))), months) - 1;
    monthly[index] += value;
  };
  chargeOnce(config.oneTimeTraining, config.trainingMonth);
  chargeOnce(config.hardwarePurchase, config.hardwarePurchaseMonth);

  return { monthly, warnings };
}

/**
 * The whole India cash schedule for one profile and scenario.
 *
 * Deterministic: the same inputs always produce the same array. Nothing here
 * reads a clock, a random source or the network.
 */
export function computeCostResult(profile: Profile, scenario: Scenario, options: ComputeOptions = {}): CostResult {
  const band: BandSelector = options.band ?? "base";
  const months = options.horizonMonths ?? HORIZON_MONTHS;
  const currency: CurrencyCode = scenario.baseCurrency;
  const warnings: CostWarning[] = [];
  const exclusions: string[] = [];

  const city = scenario.cityOverride ?? profile.city;
  const overrides = scenario.costAssumptions;

  /** A rate that is a fraction, not money: no translation applies. */
  const rateAssumption = (override: number | undefined, key: keyof typeof OPERATING_BANDS): number =>
    override != null && Number.isFinite(override) ? override : pick(OPERATING_BANDS[key], band);

  /**
   * A money assumption. An override is a figure the visitor typed in the base
   * currency; a default comes from the register and is translated like any
   * other register figure.
   */
  const moneyAssumption = (override: number | undefined, key: keyof typeof OPERATING_BANDS): number => {
    if (override != null && Number.isFinite(override)) return override;
    return registerFigureToBase(pick(OPERATING_BANDS[key], band), scenario) ?? 0;
  };

  const benefitsRate = rateAssumption(overrides.benefitsRate, "benefitsRate");
  const escalation = rateAssumption(overrides.salaryEscalation, "salaryEscalation");
  const complexity = nonNegative(overrides.complexityMultiplier);
  const workspaceRate = moneyAssumption(overrides.workspacePerSeatMonthly, "workspacePerSeatMonthly");
  const itSecurityRate = moneyAssumption(overrides.itSecurityPerSeatMonthly, "itSecurityPerSeatMonthly");
  const partnerRate = moneyAssumption(overrides.partnerFeePerSeatMonthly, "partnerFeePerSeatMonthly");
  const leadershipRate = overrides.fractionalLeadershipMonthly != null
    ? nonNegative(overrides.fractionalLeadershipMonthly)
    : 0; // Fractional leadership is opt-in, not a default line.

  const team = effectiveTeam(profile, scenario);
  const planned = undelayedTeam(profile, scenario);

  /* ---------------------------------------------------------- compensation */

  const priced: { row: TeamRow; annual: number }[] = [];
  const unpricedRows: TeamRow[] = [];
  team.forEach((row) => {
    const resolved = resolveCompensation(row, city, scenario);
    if (resolved == null || !Number.isFinite(resolved.annual)) {
      unpricedRows.push(row);
      return;
    }
    priced.push({ row, annual: resolved.annual });
  });

  if (unpricedRows.length > 0) {
    const names = Array.from(new Set(unpricedRows.map((row) => roleLabel(row.roleKey)))).join(", ");
    warnings.push({
      id: "unpriced-seats",
      severity: "blocking",
      message: isBenchmarkedCity(city)
        ? `${unpricedRows.length} seat(s) could not be priced (${names}). Enter a compensation figure for them - they are left out of the total, not counted as zero.`
        : `The compensation register does not cover ${city}. ${unpricedRows.length} seat(s) (${names}) are unpriced and excluded from the total. Enter your own figures, or model a city the register covers.`,
    });
    exclusions.push(`${unpricedRows.length} unpriced seat(s) excluded from every figure below`);
  }

  /** Annual step-ups land on scenario anniversaries: month 13 is the first stepped month. */
  const escalationFactor = (monthIndex: number): number => Math.pow(1 + escalation, Math.floor(monthIndex / 12));

  const talent = zeros(months);
  const incrementalBenefits = zeros(months);
  const headcountMonthly = zeros(months);
  const seatMonthly = zeros(months);
  const plannedFte = zeros(months);
  const activeFte = zeros(months);

  for (let m = 0; m < months; m += 1) {
    const factor = escalationFactor(m);
    priced.forEach(({ row, annual }) => {
      if (m + 1 < row.startMonth) return;
      const compensation = annual * (1 + complexity) * factor;
      talent[m] += (row.fte * compensation) / 12;
      incrementalBenefits[m] += (row.fte * compensation * benefitsTopUpRate(row, benefitsRate)) / 12;
      activeFte[m] += row.fte;
      if (!row.advisory) {
        headcountMonthly[m] += row.fte;
        seatMonthly[m] += row.fte;
      }
    });
    planned.forEach((row) => {
      if (m + 1 < row.startMonth || row.advisory) return;
      plannedFte[m] += row.fte;
    });
  }

  /* ------------------------------------------------------------- attrition */

  const attritionRate = nonNegative(overrides.attritionRate);
  const backfillMonths = Math.round(nonNegative(overrides.backfillMonths));
  const vacancyFte = zeros(months);
  let attritionReplacements = 0;
  if (attritionRate > 0 && backfillMonths > 0) {
    for (let m = 0; m < months; m += 1) {
      const leavers = (activeFte[m] * attritionRate) / 12;
      attritionReplacements += leavers;
      for (let gap = 1; gap <= backfillMonths && m + gap < months; gap += 1) {
        vacancyFte[m + gap] += leavers;
      }
    }
    for (let m = 0; m < months; m += 1) {
      if (activeFte[m] <= 0) continue;
      const vacant = Math.min(vacancyFte[m], activeFte[m]);
      const staffed = 1 - vacant / activeFte[m];
      // A vacant seat is not paid, and it is not delivering either. Both halves
      // of that show up: the payroll drops here, the lost capacity is reported
      // as unfilled FTE-months below.
      talent[m] *= staffed;
      incrementalBenefits[m] *= staffed;
      seatMonthly[m] *= staffed;
      headcountMonthly[m] = Math.max(0, headcountMonthly[m] - vacant);
    }
    warnings.push({
      id: "attrition-modelled",
      severity: "info",
      message: `Attrition is modelled at ${(attritionRate * 100).toFixed(0)}% a year with a ${backfillMonths}-month backfill. It reduces payroll and adds replacement recruitment cost; it does not assume any revenue loss.`,
    });
  }

  /* --------------------------------------------------------- one-time lines */

  const hiresByMonth = zeros(months);
  team.forEach((row) => {
    const index = Math.min(row.startMonth, months) - 1;
    if (index >= 0) hiresByMonth[index] += row.fte;
  });

  const perHire = (rate: number, includeReplacements: boolean): number[] => {
    const arr = hiresByMonth.map((hires) => hires * rate);
    if (includeReplacements && attritionReplacements > 0 && months > 0) {
      // Replacement hiring is spread evenly rather than pinned to a month the
      // model cannot actually know.
      const perMonth = (attritionReplacements * rate) / months;
      for (let m = 0; m < months; m += 1) arr[m] += perMonth;
    }
    return arr;
  };

  const recruitmentRate = nonNegative(overrides.recruitmentPerHire);
  const equipmentRate = nonNegative(overrides.equipmentPerHire);
  const entityMonthly = nonNegative(overrides.entityLegalMonthly);
  const travelMonthly = nonNegative(overrides.travelOversightMonthly);
  const setupOneTime = nonNegative(overrides.initialSetup);

  const workspaceFactor = WORK_MODEL_WORKSPACE_FACTOR[profile.workModel] ?? 1;

  const setupMonthly = zeros(months);
  if (setupOneTime > 0 && months > 0) setupMonthly[0] = setupOneTime;

  const transitionMonthly = zeros(months);
  const baseline = scenario.baseline;
  const transitionOneTime = nonNegative(baseline.transitionOneTime);
  const separationOneTime = nonNegative(baseline.separationOneTime);
  if (months > 0) {
    const transitionInBase = convert(transitionOneTime + separationOneTime, baseline.currency, currency, scenario.fx);
    if (transitionInBase != null && transitionInBase > 0) transitionMonthly[0] = transitionInBase;
  }

  const compute = computeAiCompute(scenario, months);
  warnings.push(...compute.warnings);

  /* --------------------------------------------------------- assemble lines */

  const build = (
    category: CostCategory,
    unit: CostUnit,
    monthly: number[],
    basis: CostLineItem["basis"],
  ): CostLineItem => {
    if (bundleCovers(scenario, category)) {
      return lineItem(category, unit, zeros(months), basis, {
        coveredByBundle: true,
        note: "Covered by the bundled managed fee - not charged again here.",
      });
    }
    return lineItem(category, unit, monthly, basis);
  };

  const lineItems: CostLineItem[] = [
    lineItem("talent", "monthly-recurring", talent, priced.some((p) => p.row.overrideAnnual != null) ? "user-input" : "published-benchmark"),
    lineItem("incremental-benefits", "derived-percentage", incrementalBenefits, "planning-assumption"),
    build("recruitment", "per-hire-one-time", perHire(recruitmentRate, true), "user-input"),
    build("workspace", "per-seat-monthly", seatMonthly.map((seats) => seats * workspaceRate * workspaceFactor), "planning-assumption"),
    build("equipment", "per-hire-one-time", perHire(equipmentRate, true), "user-input"),
    build("it-security-ops", "per-seat-monthly", seatMonthly.map((seats) => seats * itSecurityRate), "planning-assumption"),
    build("entity-legal-payroll", "monthly-recurring", zeros(months).map(() => entityMonthly), "user-input"),
    lineItem(
      "partner-fees",
      "per-seat-monthly",
      scenario.engagement === "neointelli-managed" ? seatMonthly.map((seats) => seats * partnerRate) : zeros(months),
      "planning-assumption",
    ),
    lineItem("fractional-leadership", "monthly-recurring", zeros(months).map(() => leadershipRate), "planning-assumption"),
    build("travel-oversight", "monthly-recurring", zeros(months).map(() => travelMonthly), "user-input"),
    lineItem("initial-setup", "one-time", setupMonthly, "user-input"),
    lineItem("transition", "one-time", transitionMonthly, "user-input"),
    lineItem("ai-compute", "usage-based", compute.monthly, scenario.aiCompute.mode === "not-budgeted" ? "planning-assumption" : "user-input"),
  ];

  // Contingency is a declared percentage of everything above it, never a
  // hidden uplift folded into another line.
  const contingencyRate = nonNegative(overrides.contingencyRate);
  const runningMonthly = zeros(months);
  lineItems.forEach((item) => item.monthly.forEach((value, m) => { runningMonthly[m] += value; }));
  lineItems.push(lineItem("contingency", "derived-percentage", runningMonthly.map((value) => value * contingencyRate), "user-input"));

  const indiaCashMonthly = zeros(months);
  lineItems.forEach((item) => item.monthly.forEach((value, m) => { indiaCashMonthly[m] += value; }));

  /* ------------------------------------------------------------- headlines */

  const firstYearCash = indiaCashMonthly.slice(0, 12).reduce((sum, value) => sum + value, 0);

  // Steady state is the first month every seat is on the payroll, measured on
  // the recurring lines only. Twelve times a ramping month is never presented
  // as an annual figure.
  const targetFte = team.filter((row) => !row.advisory).reduce((sum, row) => sum + row.fte, 0);
  const fullMonth = seatMonthly.findIndex((seats) => seats >= targetFte - 1e-9 && targetFte > 0);
  const steadyIndex = fullMonth === -1 ? -1 : fullMonth;
  const RECURRING: CostCategory[] = [
    "talent", "incremental-benefits", "workspace", "it-security-ops",
    "entity-legal-payroll", "partner-fees", "fractional-leadership", "travel-oversight",
    "ai-compute", "contingency",
  ];
  const steadyStateMonthly = steadyIndex === -1
    ? 0
    : lineItems
        .filter((item) => RECURRING.includes(item.category))
        .reduce((sum, item) => sum + (item.monthly[steadyIndex] ?? 0), 0);

  lineItems.forEach((item) => {
    item.steadyStateMonthly = steadyIndex === -1 ? 0 : (item.monthly[steadyIndex] ?? 0);
  });

  const ONE_TIME: CostCategory[] = ["recruitment", "equipment", "initial-setup", "transition"];
  const oneTimeTotal = lineItems
    .filter((item) => ONE_TIME.includes(item.category))
    .reduce((sum, item) => sum + item.total, 0);

  if (steadyIndex === -1 && targetFte > 0) {
    warnings.push({
      id: "no-steady-state",
      severity: "caution",
      message: "The team never reaches full size inside the horizon, so there is no steady-state run rate to report.",
    });
  }

  /* -------------------------------------------------- capacity and exclusions */

  let unfilledFteMonths = 0;
  for (let m = 0; m < months; m += 1) {
    unfilledFteMonths += Math.max(0, plannedFte[m] - (headcountMonthly[m] ?? 0));
  }

  NOT_BUDGETED.forEach(({ category, label, prompt }) => {
    const item = lineItems.find((candidate) => candidate.category === category);
    if (!item || item.total > 0 || item.coveredByBundle) return;
    exclusions.push(`${label} - not budgeted (${prompt})`);
  });

  if (exclusions.length > 0) {
    warnings.push({
      id: "excluded-lines",
      severity: "caution",
      message: `${exclusions.length} cost line(s) are excluded from this estimate. They are listed under exclusions; the total is not a complete programme cost until you have a figure for each.`,
    });
  }

  if (inrPerUnit(scenario.fx, currency) == null) {
    warnings.push({
      id: "fx-missing",
      severity: "blocking",
      message: `No FX quote for ${currency}. Enter one before relying on any converted figure.`,
    });
  }

  return {
    indiaCashMonthly,
    lineItems,
    firstYearCash,
    steadyStateMonthly,
    steadyStateAnnual: steadyStateMonthly * 12,
    oneTimeTotal,
    headcountMonthly,
    unfilledFteMonths,
    currency,
    exclusions,
    warnings,
  };
}

/**
 * The planning band around the steady-state figure, produced by running the
 * same schedule at both ends of the assumption bands.
 *
 * It is offered only when the estimate rests on the published bands. Once the
 * visitor has typed their own compensation the band would be a fiction, so it
 * is withheld rather than invented.
 */
export function computeCostBand(profile: Profile, scenario: Scenario): { low: number; high: number } | null {
  const allOverridden = profile.team.length > 0 && profile.team.every((row) => row.overrideAnnual != null);
  if (allOverridden) return null;
  const low = computeCostResult(profile, scenario, { band: "low" });
  const high = computeCostResult(profile, scenario, { band: "high" });
  if (!Number.isFinite(low.steadyStateMonthly) || !Number.isFinite(high.steadyStateMonthly)) return null;
  // A collapsed band is a point estimate wearing a range's clothes. Once every
  // assumption behind it has been overridden there is no spread left to report.
  if (Math.abs(high.steadyStateMonthly - low.steadyStateMonthly) < 0.005) return null;
  return { low: low.steadyStateMonthly, high: high.steadyStateMonthly };
}
