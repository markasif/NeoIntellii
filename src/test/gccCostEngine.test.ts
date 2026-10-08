import { describe, it, expect } from "vitest";
import { computeCosts, roleCostRows, seatCount, usEquivalent, roundToNearest10k } from "@/lib/gccCostEngine";
import { bucketForRange, monthlyBucket, userDataForEmail } from "@/lib/dataLayer";
import {
  roles as roleConfigs,
  BENEFITS_MULTIPLIER_LOW,
  INFRA_COST_LOW,
  OPS_COST_LOW,
  PARTNER_FEE_MANAGED_LOW,
  SME_FEE_LOW,
  US_COST_MULTIPLIER,
} from "@/data/gccCostData";
import { US_ROLE_RANGES } from "@/data/gccCalculatorContent";

/**
 * The calculator's arithmetic, pinned. The paid landing page prices the same
 * team in four cities at once and quotes a US comparison next to the number,
 * so these are no longer numbers only one component ever sees.
 */

const salaryOf = (roleKey: string, city: "bengaluru" | "hyderabad" | "chennai" | "pune", tier: number) =>
  roleConfigs.find((r) => r.key === roleKey)!.baseSalary[city][tier];

describe("computeCosts", () => {
  const oneSeniorAi = { ai: [2] };

  it("adds statutory overhead, workspace, operations and the partner fee", () => {
    const costs = computeCosts({
      seniorityBreakdown: oneSeniorAi,
      city: "bengaluru",
      complexityMultiplier: 0,
      engagement: "managed",
      includeSME: false,
    });
    const expectedLow =
      salaryOf("ai", "bengaluru", 2) * BENEFITS_MULTIPLIER_LOW +
      INFRA_COST_LOW * 12 +
      OPS_COST_LOW * 12 +
      PARTNER_FEE_MANAGED_LOW * 12;
    expect(costs.annual.low).toBe(Math.round(expectedLow));
    expect(costs.monthly.low).toBe(Math.round(expectedLow / 12));
  });

  it("drops the partner fee on a fully captive model", () => {
    const captive = computeCosts({
      seniorityBreakdown: oneSeniorAi,
      city: "bengaluru",
      complexityMultiplier: 0,
      engagement: "captive",
      includeSME: false,
    });
    expect(captive.partner).toEqual({ low: 0, high: 0 });
  });

  it("applies complexity to engineering cost only, never to overhead", () => {
    const base = computeCosts({
      seniorityBreakdown: oneSeniorAi,
      city: "bengaluru",
      complexityMultiplier: 0,
      engagement: "managed",
      includeSME: false,
    });
    const deep = computeCosts({
      seniorityBreakdown: oneSeniorAi,
      city: "bengaluru",
      complexityMultiplier: 0.15,
      engagement: "managed",
      includeSME: false,
    });
    expect(deep.salary.low).toBe(Math.round(base.salary.low * 1.15));
    expect(deep.infra).toEqual(base.infra);
    expect(deep.ops).toEqual(base.ops);
    expect(deep.partner).toEqual(base.partner);
  });

  it("adds the advisory retainer as a flat fee, not per seat", () => {
    const withSme = computeCosts({
      seniorityBreakdown: { ai: [2, 2, 2] },
      city: "bengaluru",
      complexityMultiplier: 0,
      engagement: "managed",
      includeSME: true,
    });
    expect(withSme.sme.low).toBe(SME_FEE_LOW * 12);
  });

  it("prices the same team lower outside Bengaluru", () => {
    const input = { seniorityBreakdown: oneSeniorAi, complexityMultiplier: 0, engagement: "managed" as const, includeSME: false };
    const bengaluru = computeCosts({ ...input, city: "bengaluru" });
    const chennai = computeCosts({ ...input, city: "chennai" });
    expect(chennai.monthly.high).toBeLessThan(bengaluru.monthly.high);
  });

  it("returns a zero estimate for an empty team apart from the flat retainer", () => {
    const empty = computeCosts({
      seniorityBreakdown: {},
      city: "bengaluru",
      complexityMultiplier: 0,
      engagement: "managed",
      includeSME: false,
    });
    expect(empty.annual).toEqual({ low: 0, high: 0 });
  });
});

describe("seatCount", () => {
  it("counts every seat across roles", () => {
    expect(seatCount({ ai: [2, 3], qa: [1] })).toBe(3);
  });
});

describe("roleCostRows", () => {
  it("groups seats of one role by seniority tier", () => {
    const rows = roleCostRows({ ai: [2, 2, 3] }, "bengaluru", 0);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ role: "AI Engineers", level: "Lead", seats: 1 });
    expect(rows[1]).toMatchObject({ role: "AI Engineers", level: "Senior", seats: 2 });
  });

  it("skips roles with no seats", () => {
    expect(roleCostRows({ ai: [], qa: [1] }, "pune", 0).map((r) => r.roleKey)).toEqual(["qa"]);
  });
});

describe("usEquivalent", () => {
  it("uses the published range for roles that have one", () => {
    const result = usEquivalent({ ai: [2, 3] }, "bengaluru", 0);
    const [low, high] = US_ROLE_RANGES.ai!;
    expect(result).toMatchObject({ low: low * 2, high: high * 2, publishedSeats: 2, modeledSeats: 0 });
  });

  it("falls back to the India-cost model for roles without a published range, and says how many", () => {
    const result = usEquivalent({ backend: [2] }, "bengaluru", 0);
    expect(result.publishedSeats).toBe(0);
    expect(result.modeledSeats).toBe(1);
    expect(result.low).toBe(
      Math.round(salaryOf("backend", "bengaluru", 2) * BENEFITS_MULTIPLIER_LOW * US_COST_MULTIPLIER),
    );
  });
});

describe("roundToNearest10k", () => {
  it("rounds to the nearest ten thousand", () => {
    expect(roundToNearest10k(154_000)).toBe(150_000);
    expect(roundToNearest10k(155_000)).toBe(160_000);
  });
});

describe("monthlyBucket", () => {
  it("maps each band to the name the Ads container expects", () => {
    expect(monthlyBucket(0)).toBe("lt25k");
    expect(monthlyBucket(24_999)).toBe("lt25k");
    expect(monthlyBucket(25_000)).toBe("25k_50k");
    expect(monthlyBucket(50_000)).toBe("50k_100k");
    expect(monthlyBucket(100_000)).toBe("100k_200k");
    expect(monthlyBucket(200_000)).toBe("gt200k");
  });

  it("buckets a range on its midpoint", () => {
    expect(bucketForRange(20_000, 32_000)).toBe("25k_50k");
  });
});

describe("userDataForEmail", () => {
  it("lowercases and trims, and never hashes client-side", () => {
    expect(userDataForEmail("  Person@Company.COM ")).toEqual({ email: "person@company.com" });
  });
});
