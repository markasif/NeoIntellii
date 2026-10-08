import { describe, it, expect } from "vitest";
import { computeCostResult, computeCostBand, effectiveTeam } from "@/lib/gcc-lab/costModel";
import { convert, fromInr, shockFx, DEFAULT_FX } from "@/lib/gcc-lab/currency";
import { legacyAnnualTotals } from "@/lib/gcc-lab/legacyBridge";
import { computeCosts } from "@/lib/gccCostEngine";
import { hashInputs, normalizeForHash, createScenario } from "@/lib/gcc-lab/profile";
import { fixtureCase, ZERO_COSTS } from "./helpers/gccLabFixtures";
import type { CostCategory } from "@/lib/gcc-lab/types";

const line = (result: ReturnType<typeof computeCostResult>, category: CostCategory) =>
  result.lineItems.find((item) => item.category === category)!;

describe("shared engine - one set of numbers for both public routes", () => {
  it("gives /gcc-cost-calculator and the lab bridge identical totals for the same normalized case", () => {
    const input = {
      seniorityBreakdown: { ai: [2, 3], dataeng: [1] },
      city: "hyderabad" as const,
      complexityMultiplier: 0.15,
      engagement: "managed" as const,
      includeSME: true,
    };
    const legacy = computeCosts(input);
    const shared = legacyAnnualTotals(input);

    expect(legacy.annual.low).toBe(Math.round(shared.annual.low));
    expect(legacy.annual.high).toBe(Math.round(shared.annual.high));
    expect(legacy.salary.low).toBe(Math.round(shared.salary.low));
    expect(legacy.partner.high).toBe(Math.round(shared.partner.high));
  });

  it("hashes two identically-normalized cases the same, regardless of row order or labels", () => {
    const a = fixtureCase([{ roleKey: "ai", overrideAnnual: 100 }, { roleKey: "qa", overrideAnnual: 50 }]);
    const b = fixtureCase([{ roleKey: "qa", overrideAnnual: 50 }, { roleKey: "ai", overrideAnnual: 100 }]);
    expect(hashInputs(a.profile, a.scenario)).toBe(hashInputs(b.profile, b.scenario));

    const renamed = createScenario(a.profile, { ...a.scenario, label: "Something else" });
    expect(hashInputs(a.profile, renamed)).toBe(hashInputs(a.profile, a.scenario));
  });

  it("changes the hash when a figure that moves the cost changes", () => {
    const a = fixtureCase([{ roleKey: "ai", overrideAnnual: 100 }]);
    const b = fixtureCase([{ roleKey: "ai", overrideAnnual: 101 }]);
    expect(hashInputs(a.profile, a.scenario)).not.toBe(hashInputs(b.profile, b.scenario));
    expect(normalizeForHash(a.profile, a.scenario)).not.toEqual(normalizeForHash(b.profile, b.scenario));
  });
});

describe("the ramp fixture", () => {
  /**
   * Two FTE at 1.2m a year, starting month 7, plus a 100k setup in month 1 and
   * nothing else. Six months of payroll at 200k plus the setup is 1.3m.
   * Synthetic arithmetic, not a benchmark.
   */
  it("reports 1.3m of year-one cash and a 200k steady-state monthly payroll", () => {
    const { profile, scenario } = fixtureCase(
      [
        { roleKey: "ai", fte: 1, startMonth: 7, overrideAnnual: 1_200_000, compensationBasis: "total-employer-cost" },
        { roleKey: "ai", fte: 1, startMonth: 7, overrideAnnual: 1_200_000, compensationBasis: "total-employer-cost" },
      ],
      { initialSetup: 100_000 },
    );
    const result = computeCostResult(profile, scenario);

    expect(result.firstYearCash).toBeCloseTo(1_300_000, 6);
    expect(result.steadyStateMonthly).toBeCloseTo(200_000, 6);
    expect(result.steadyStateAnnual).toBeCloseTo(2_400_000, 6);
    expect(result.oneTimeTotal).toBeCloseTo(100_000, 6);
    // Twelve times a ramping month is never the year-one figure.
    expect(result.firstYearCash).not.toBeCloseTo(result.steadyStateMonthly * 12, 0);
  });
});

describe("degenerate inputs", () => {
  it("never produces NaN, Infinity or a misleading total for an empty team", () => {
    const { profile, scenario } = fixtureCase([]);
    const result = computeCostResult(profile, scenario);
    expect(result.firstYearCash).toBe(0);
    expect(result.steadyStateMonthly).toBe(0);
    expect(result.indiaCashMonthly.every(Number.isFinite)).toBe(true);
  });

  it("clamps malformed quantities and negative costs instead of propagating them", () => {
    const { profile, scenario } = fixtureCase(
      [{ roleKey: "ai", fte: Number.NaN, overrideAnnual: 1_200_000 }, { roleKey: "ai", fte: -3, overrideAnnual: 1_200_000 }],
      { workspacePerSeatMonthly: -500 },
    );
    const result = computeCostResult(profile, scenario);
    expect(Number.isFinite(result.firstYearCash)).toBe(true);
    expect(result.firstYearCash).toBe(0);
    expect(line(result, "workspace").total).toBe(0);
  });

  it("reports seats it cannot price rather than counting them as zero", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", compensationBasis: "base-salary" }], {}, "USD", {
      city: "mumbai",
    });
    const result = computeCostResult(profile, scenario);
    expect(result.warnings.some((warning) => warning.id === "unpriced-seats")).toBe(true);
    expect(result.warnings.find((warning) => warning.id === "unpriced-seats")?.severity).toBe("blocking");
    expect(result.exclusions.join(" ")).toContain("unpriced");
    expect(result.firstYearCash).toBe(0);
  });

  it("flags a missing FX quote instead of converting to zero", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_000 }], {}, "USD");
    const broken = { ...scenario, fx: { ...scenario.fx, quotes: { ...scenario.fx.quotes, USD: 0 } } };
    const result = computeCostResult(profile, broken);
    expect(result.warnings.some((warning) => warning.id === "fx-missing")).toBe(true);
  });
});

describe("no double counting", () => {
  it("adds the benefits top-up to a base-salary row and nothing to a CTC row", () => {
    const base = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000, compensationBasis: "base-salary" }], {
      benefitsRate: 0.3,
    });
    const ctc = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000, compensationBasis: "india-ctc" }], {
      benefitsRate: 0.3,
    });
    const total = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000, compensationBasis: "total-employer-cost" }], {
      benefitsRate: 0.3,
    });

    const baseResult = computeCostResult(base.profile, base.scenario);
    const ctcResult = computeCostResult(ctc.profile, ctc.scenario);
    const totalResult = computeCostResult(total.profile, total.scenario);

    expect(line(baseResult, "incremental-benefits").steadyStateMonthly).toBeCloseTo(30_000, 6);
    expect(line(ctcResult, "incremental-benefits").steadyStateMonthly).toBe(0);
    expect(line(totalResult, "incremental-benefits").steadyStateMonthly).toBe(0);
    expect(ctcResult.steadyStateMonthly).toBeCloseTo(100_000, 6);
    expect(baseResult.steadyStateMonthly).toBeCloseTo(130_000, 6);
  });

  it("zeroes and flags a line a bundled managed fee already covers", () => {
    const unbundled = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], {
      workspacePerSeatMonthly: 20_000,
      partnerFeePerSeatMonthly: 5_000,
    }, "INR", {}, { engagement: "neointelli-managed" });
    const bundled = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], {
      workspacePerSeatMonthly: 20_000,
      partnerFeePerSeatMonthly: 5_000,
    }, "INR", {}, {
      engagement: "neointelli-managed",
      feeBundle: { recruitment: false, workspace: true, equipment: false, itSecurityOps: false, entityLegalPayroll: false },
    });

    const a = computeCostResult(unbundled.profile, unbundled.scenario);
    const b = computeCostResult(bundled.profile, bundled.scenario);

    expect(line(a, "workspace").steadyStateMonthly).toBeCloseTo(20_000, 6);
    expect(line(b, "workspace").steadyStateMonthly).toBe(0);
    expect(line(b, "workspace").coveredByBundle).toBe(true);
    expect(b.steadyStateMonthly).toBeCloseTo(a.steadyStateMonthly - 20_000, 6);
  });

  it("changes only the advisory line when fractional leadership is toggled", () => {
    const off = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], { fractionalLeadershipMonthly: 0 });
    const on = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], { fractionalLeadershipMonthly: 7_500 });
    const a = computeCostResult(off.profile, off.scenario);
    const b = computeCostResult(on.profile, on.scenario);

    expect(b.steadyStateMonthly - a.steadyStateMonthly).toBeCloseTo(7_500, 6);
    a.lineItems.forEach((item) => {
      if (item.category === "fractional-leadership") return;
      expect(line(b, item.category).steadyStateMonthly).toBeCloseTo(item.steadyStateMonthly, 6);
    });
  });
});

describe("FX", () => {
  it("converts 8.5m INR at 85 INR per USD to 100k USD", () => {
    expect(fromInr(8_500_000, 85)).toBeCloseTo(100_000, 6);
    expect(convert(8_500_000, "INR", "USD", DEFAULT_FX)).toBeCloseTo(100_000, 6);
  });

  it("reads an INR cost as fewer dollars when the rupee weakens, and more when it strengthens", () => {
    const weaker = shockFx(DEFAULT_FX, 0.1);
    const stronger = shockFx(DEFAULT_FX, -0.1);
    expect(weaker.quotes.USD).toBeCloseTo(93.5, 6);
    expect(convert(8_500_000, "INR", "USD", weaker)!).toBeCloseTo(8_500_000 / 93.5, 6);
    expect(convert(8_500_000, "INR", "USD", weaker)!).toBeLessThan(100_000);
    expect(convert(8_500_000, "INR", "USD", stronger)!).toBeGreaterThan(100_000);
  });

  it("returns null rather than zero for an unquoted currency", () => {
    const broken = { ...DEFAULT_FX, quotes: { ...DEFAULT_FX.quotes, GBP: 0 } };
    expect(convert(100, "GBP", "INR", broken)).toBeNull();
  });
});

describe("ramp, delay and capacity", () => {
  it("pushes start months out and counts the capacity a delay costs", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", startMonth: 1, overrideAnnual: 1_200_000 }]);
    const delayed = { ...scenario, hiringDelayMonths: 3 };

    expect(effectiveTeam(profile, delayed)[0].startMonth).toBe(4);

    const base = computeCostResult(profile, scenario);
    const late = computeCostResult(profile, delayed);
    expect(late.firstYearCash).toBeLessThan(base.firstYearCash);
    expect(late.unfilledFteMonths).toBeCloseTo(3, 6);
    expect(base.unfilledFteMonths).toBeCloseTo(0, 6);
  });

  it("withholds the planning band once every seat carries a typed figure", () => {
    const typed = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }]);
    expect(computeCostBand(typed.profile, typed.scenario)).toBeNull();

    // No assumption overrides: the published low/high bands are what produce the spread.
    const benchmarked = fixtureCase([{ roleKey: "ai", compensationBasis: "base-salary" }], {}, "USD");
    const open = { ...benchmarked.scenario, costAssumptions: {} };
    const band = computeCostBand(benchmarked.profile, open);
    expect(band).not.toBeNull();
    expect(band!.low).toBeLessThan(band!.high);

    // Once every band-driving assumption is overridden there is no spread to report.
    expect(computeCostBand(benchmarked.profile, benchmarked.scenario)).toBeNull();
  });
});

describe("AI compute", () => {
  it("defaults to not budgeted and says the estimate is incomplete", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }]);
    const result = computeCostResult(profile, scenario);
    expect(line(result, "ai-compute").total).toBe(0);
    expect(result.warnings.some((warning) => warning.id === "compute-not-budgeted")).toBe(true);
    expect(result.exclusions.some((text) => text.startsWith("AI and cloud consumption"))).toBe(true);
  });

  it("keeps one-time training separate from recurring inference", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", overrideAnnual: 1_200_000 }], {}, "INR", {}, {
      aiCompute: {
        mode: "structured",
        gpuHoursPerMonth: 100,
        gpuHourlyRate: 200,
        oneTimeTraining: 500_000,
        trainingMonth: 2,
        currency: "INR",
      },
    });
    const result = computeCostResult(profile, scenario);
    const compute = line(result, "ai-compute");
    expect(compute.monthly[0]).toBeCloseTo(20_000, 6);
    expect(compute.monthly[1]).toBeCloseTo(520_000, 6);
    expect(compute.monthly[2]).toBeCloseTo(20_000, 6);
  });
});
