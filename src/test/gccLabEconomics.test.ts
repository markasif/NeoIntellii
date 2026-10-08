import { describe, it, expect } from "vitest";
import { computeCostResult } from "@/lib/gcc-lab/costModel";
import { computeEconomics, DIFFERENCE_LABELS } from "@/lib/gcc-lab/economics";
import { runStressCases, explainDelta, stressCases } from "@/lib/gcc-lab/sensitivity";
import { fixtureCase } from "./helpers/gccLabFixtures";
import type { BaselineConfig, ObjectiveKey, Scenario } from "@/lib/gcc-lab/types";


/** Synthetic: one seat at 960 a year is exactly 80 a month. */
const indiaEighty = (setup: number, objective: ObjectiveKey, baselineAnnual: number | null) => {
  const baseline: BaselineConfig = {
    objective,
    roles: baselineAnnual == null
      ? []
      : [{ roleKey: "ai", seniority: "senior", fte: 1, annualCost: baselineAnnual, currency: "INR" }],
    currency: "INR",
  };
  const { profile, scenario } = fixtureCase(
    [{ roleKey: "ai", seniority: "senior", fte: 1, startMonth: 1, overrideAnnual: 960 }],
    { initialSetup: setup },
    "INR",
    { objective },
    { baseline },
  );
  const cost = computeCostResult(profile, scenario);
  return { profile, scenario, cost, economics: computeEconomics(profile, scenario, cost) };
};

describe("payback", () => {
  it("recovers a month-1 deficit in month 3 on the -30 / -10 / +10 fixture", () => {
    const { economics } = indiaEighty(50, "add-capacity", 1_200);
    expect(economics.cumulativeDifference!.slice(0, 3)).toEqual([-30, -10, 10]);
    expect(economics.paybackMonth).toBe(3);
    expect(economics.paybackState).toBe("recovered");
    expect(economics.sustainedPaybackMonth).toBe(3);
    expect(economics.reversesLater).toBe(false);
  });

  it("says there was no initial deficit rather than inventing a break-even month", () => {
    const { economics } = indiaEighty(0, "add-capacity", 1_200);
    expect(economics.paybackState).toBe("no-initial-deficit");
    expect(economics.paybackMonth).toBeNull();
  });

  it("says the deficit is not recovered inside the horizon when it never is", () => {
    const baseline: BaselineConfig = {
      objective: "add-capacity",
      roles: [{ roleKey: "ai", seniority: "senior", fte: 1, annualCost: 1_200, currency: "INR" }],
      currency: "INR",
    };
    // India at 1,440 a year is 120 a month against a 100 a month baseline.
    const { profile, scenario } = fixtureCase(
      [{ roleKey: "ai", seniority: "senior", fte: 1, overrideAnnual: 1_440 }],
      { initialSetup: 50 },
      "INR",
      { objective: "add-capacity" },
      { baseline },
    );
    const cost = computeCostResult(profile, scenario);
    const economics = computeEconomics(profile, scenario, cost);
    expect(economics.paybackState).toBe("not-recovered-in-horizon");
    expect(economics.paybackMonth).toBeNull();
    expect(economics.cumulativeDifference!.at(-1)!).toBeLessThan(0);
  });
});

describe("baselines and result language", () => {
  it("hides savings, ROI and payback entirely when there is no baseline", () => {
    const { economics } = indiaEighty(50, "explore", null);
    expect(economics.baselineCashMonthly).toBeNull();
    expect(economics.netDifferenceMonthly).toBeNull();
    expect(economics.paybackState).toBe("no-baseline");
    expect(economics.roiPercent).toBeNull();
    expect(economics.roiUnavailableReason).toBeTruthy();
  });

  it("uses avoided-planned-spend language for a growth case", () => {
    const { economics } = indiaEighty(0, "add-capacity", 1_200);
    expect(economics.differenceLabel).toBe(DIFFERENCE_LABELS["add-capacity"]);
    expect(economics.differenceLabel).toContain("avoided planned spend");
    // The word "savings" appears only in the disclaimer that these are not savings.
    expect(economics.differenceLabel).toContain("not payroll savings");
  });

  it("does not turn an India expansion into a US replacement", () => {
    const { economics } = indiaEighty(0, "expand-india", null);
    expect(economics.baselineCashMonthly).toBeNull();
    expect(economics.differenceLabel).toContain("existing India run rate");
    expect(economics.warnings.some((warning) => warning.id === "expansion-no-counterfactual")).toBe(true);
  });

  it("phases a transition baseline as work actually moves, so a delay is not a saving", () => {
    const baseline: BaselineConfig = {
      objective: "transition-work",
      roles: [{ roleKey: "ai", seniority: "senior", fte: 1, annualCost: 1_200, currency: "INR" }],
      currency: "INR",
    };
    const build = (delay: number) => {
      const { profile, scenario } = fixtureCase(
        [{ roleKey: "ai", seniority: "senior", fte: 1, startMonth: 1, overrideAnnual: 960 }],
        {},
        "INR",
        { objective: "transition-work" },
        { baseline, hiringDelayMonths: delay },
      );
      const cost = computeCostResult(profile, scenario);
      return { cost, economics: computeEconomics(profile, scenario, cost) };
    };

    const now = build(0);
    const late = build(6);

    // Month 1 with no delay: 100 avoided against 80 of India cash.
    expect(now.economics.netDifferenceMonthly![0]).toBeCloseTo(20, 6);
    // Month 1 delayed: nothing has moved, so nothing is avoided and nothing is saved.
    expect(late.economics.baselineCashMonthly![0]).toBeCloseTo(0, 6);
    expect(late.economics.netDifferenceMonthly![0]).toBeCloseTo(0, 6);
    expect(late.economics.cumulativeDifference!.at(-1)!).toBeLessThan(now.economics.cumulativeDifference!.at(-1)!);
  });

  it("flags a scope mismatch rather than comparing different-sized teams silently", () => {
    const baseline: BaselineConfig = {
      objective: "add-capacity",
      roles: [{ roleKey: "ai", seniority: "senior", fte: 4, annualCost: 1_200, currency: "INR" }],
      currency: "INR",
    };
    const { profile, scenario } = fixtureCase(
      [{ roleKey: "ai", seniority: "senior", fte: 1, overrideAnnual: 960 }],
      {},
      "INR",
      { objective: "add-capacity" },
      { baseline },
    );
    const cost = computeCostResult(profile, scenario);
    const economics = computeEconomics(profile, scenario, cost);
    expect(economics.warnings.some((warning) => warning.id === "scope-mismatch")).toBe(true);
  });
});

describe("ROI", () => {
  it("divides the cumulative net benefit by the transition investment, counted once", () => {
    const { economics } = indiaEighty(50, "add-capacity", 1_200);
    expect(economics.transitionInvestment).toBe(50);
    const expected = (economics.cumulativeDifference!.at(-1)! / 50) * 100;
    expect(economics.roiPercent).toBeCloseTo(expected, 6);
    // The setup cost is inside the cash schedule already; it is not deducted twice.
    expect(economics.cumulativeDifference![0]).toBe(-30);
  });

  it("reports ROI as unavailable when the denominator is zero", () => {
    const { economics } = indiaEighty(0, "add-capacity", 1_200);
    expect(economics.transitionInvestment).toBe(0);
    expect(economics.roiPercent).toBeNull();
    expect(economics.roiUnavailableReason).toContain("denominator");
  });
});

describe("stress tests", () => {
  it("shows a hiring delay costing capacity, not just cash", () => {
    const { profile, scenario, cost } = indiaEighty(0, "add-capacity", 1_200);
    const outcomes = runStressCases(profile, scenario, cost, "INR");
    const delay = outcomes.find((outcome) => outcome.id === "delay-6")!;
    expect(delay.additionalUnfilledFteMonths).toBeCloseTo(6, 6);
    expect(delay.notes.join(" ")).toContain("Lower spend here buys less delivery");
  });

  it("labels salary escalation in percentage points and FX as a relative quote change", () => {
    const { scenario } = indiaEighty(0, "add-capacity", 1_200);
    const cases = stressCases(scenario);
    expect(cases.find((entry) => entry.id === "escalation-up")!.change).toContain("percentage point");
    expect(cases.find((entry) => entry.id === "fx-weaker-rupee")!.change).toContain("10%");
  });

  it("reconciles a scenario delta against the line items that actually moved", () => {
    const base = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], { workspacePerSeatMonthly: 10_000 });
    const variant: Scenario = {
      ...base.scenario,
      costAssumptions: { ...base.scenario.costAssumptions, workspacePerSeatMonthly: 15_000 },
    };
    const delta = explainDelta(
      computeCostResult(base.profile, base.scenario),
      computeCostResult(base.profile, variant),
      (value) => value.toFixed(0),
    );
    expect(delta.steadyStateDelta).toBeCloseTo(5_000, 6);
    expect(delta.lines).toHaveLength(1);
    expect(delta.lines[0].category).toBe("workspace");
    expect(delta.explanation[0]).toContain("Workspace");
  });
});

describe("stress tests read in the display currency", () => {
  /**
   * A benchmarked team, priced in rupees and read in dollars. This is the
   * combination where an FX stress has to actually move the number: the rupee
   * cost is unchanged, and the dollar figure is not.
   */
  const benchmarkedCase = () => {
    const { profile, scenario } = fixtureCase(
      [
        { roleKey: "ai", seniority: "senior", compensationBasis: "base-salary", startMonth: 1 },
        { roleKey: "dataeng", seniority: "mid", compensationBasis: "base-salary", startMonth: 1 },
      ],
      {},
      "INR",
      { displayCurrency: "USD" },
      { costAssumptions: {} },
    );
    return { profile, scenario, cost: computeCostResult(profile, scenario) };
  };

  it("shows a weaker rupee costing fewer dollars and a stronger one costing more", () => {
    const { profile, scenario, cost } = benchmarkedCase();
    const outcomes = runStressCases(profile, scenario, cost, "USD");

    const weaker = outcomes.find((outcome) => outcome.id === "fx-weaker-rupee")!;
    const stronger = outcomes.find((outcome) => outcome.id === "fx-stronger-rupee")!;

    expect(weaker.steadyStateDelta).toBeLessThan(0);
    expect(stronger.steadyStateDelta).toBeGreaterThan(0);
    // The rupee cost itself does not move - only what it converts to.
    expect(weaker.cost.steadyStateMonthly).toBeCloseTo(cost.steadyStateMonthly, 6);
  });

  it("shows a salary step-up in the three-year figure even when month one is unchanged", () => {
    const { profile, scenario, cost } = benchmarkedCase();
    const outcomes = runStressCases(profile, scenario, cost, "USD");
    const up = outcomes.find((outcome) => outcome.id === "escalation-up")!;

    // Escalation lands on the first anniversary, so a fully-staffed month one
    // and the first twelve months are identical by construction.
    expect(up.steadyStateDelta).toBeCloseTo(0, 6);
    expect(up.firstYearDelta).toBeCloseTo(0, 6);
    // Over three years it is anything but zero, which is why that column exists.
    expect(up.threeYearDelta).toBeGreaterThan(0);

    const down = outcomes.find((outcome) => outcome.id === "escalation-down")!;
    expect(down.threeYearDelta).toBeLessThan(0);
  });

  it("prices a benchmarked seat the same in rupees whatever the display currency is", () => {
    const inrDisplay = fixtureCase([{ roleKey: "ai", compensationBasis: "base-salary" }], {}, "INR", { displayCurrency: "INR" }, { costAssumptions: {} });
    const usdDisplay = fixtureCase([{ roleKey: "ai", compensationBasis: "base-salary" }], {}, "INR", { displayCurrency: "USD" }, { costAssumptions: {} });
    expect(computeCostResult(inrDisplay.profile, inrDisplay.scenario).steadyStateMonthly).toBeCloseTo(
      computeCostResult(usdDisplay.profile, usdDisplay.scenario).steadyStateMonthly,
      6,
    );
  });
});
