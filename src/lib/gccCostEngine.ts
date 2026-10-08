/**
 * The cost calculator's arithmetic.
 *
 * The maths itself now lives in the shared Decision Lab engine
 * (src/lib/gcc-lab/costModel.ts): this module normalizes the calculator's own
 * inputs into a lab case, asks that engine for the answer, and presents it in
 * the shape the calculator UI and the result email already expect. That is
 * what stops /gcc-cost-calculator and /lp/gcc-playbook from quoting two
 * different numbers for the same team - there is one salary table, one
 * benefits multiplier and one fee schedule behind both.
 *
 * Every figure is annual USD unless a name says monthly.
 */

import {
  roles as roleConfigs,
  seniorityLevels,
  BENEFITS_MULTIPLIER_LOW,
  BENEFITS_MULTIPLIER_HIGH,
  US_COST_MULTIPLIER,
  type CityKey,
  type EngagementModel,
} from "@/data/gccCostData";
import { US_ROLE_RANGES } from "@/data/gccCalculatorContent";
import { legacyAnnualTotals } from "@/lib/gcc-lab/legacyBridge";

export interface Range {
  low: number;
  high: number;
}

/** Seat-level seniority per role: role key -> one tier index per seat. */
export type SeniorityBreakdown = Record<string, number[]>;

export interface CostInput {
  seniorityBreakdown: SeniorityBreakdown;
  city: CityKey;
  /** Fraction added on top of blended salary for workload complexity. */
  complexityMultiplier: number;
  engagement: EngagementModel;
  includeSME: boolean;
}

export interface CostBreakdown {
  salary: Range;
  infra: Range;
  ops: Range;
  partner: Range;
  sme: Range;
  annual: Range;
  monthly: Range;
}

const round = ({ low, high }: Range): Range => ({ low: Math.round(low), high: Math.round(high) });

/** Total seats across every role in a breakdown. */
export const seatCount = (breakdown: SeniorityBreakdown): number =>
  Object.values(breakdown).reduce((total, seats) => total + seats.length, 0);

/**
 * Fully loaded annual salary for one seat, before workload complexity:
 * base band for the city and tier, plus the 30-35% statutory and benefits
 * overhead.
 */
const seatSalary = (roleKey: string, city: CityKey, tier: number): Range | null => {
  const role = roleConfigs.find((r) => r.key === roleKey);
  const base = role?.baseSalary[city]?.[tier];
  if (base == null) return null;
  return { low: base * BENEFITS_MULTIPLIER_LOW, high: base * BENEFITS_MULTIPLIER_HIGH };
};

export function computeCosts({
  seniorityBreakdown,
  city,
  complexityMultiplier,
  engagement,
  includeSME,
}: CostInput): CostBreakdown {
  const totals = legacyAnnualTotals({
    seniorityBreakdown,
    city,
    complexityMultiplier,
    engagement,
    includeSME,
  });

  const annual = totals.annual;
  return {
    salary: round(totals.salary),
    infra: round(totals.workspace),
    ops: round(totals.operations),
    partner: round(totals.partner),
    sme: round(totals.advisory),
    annual: round(annual),
    monthly: { low: Math.round(annual.low / 12), high: Math.round(annual.high / 12) },
  };
}

export interface RoleCostRow {
  roleKey: string;
  role: string;
  /** Seniority tier shared by every seat on this row. */
  level: string;
  seats: number;
  monthly: Range;
}

/**
 * One row per role and seniority tier: what the visitor actually configured,
 * priced. Salary and statutory cost only - infra, ops and the partner fee are
 * team-wide and appear in the category breakdown instead.
 */
export function roleCostRows(
  seniorityBreakdown: SeniorityBreakdown,
  city: CityKey,
  complexityMultiplier: number,
): RoleCostRow[] {
  const rows: RoleCostRow[] = [];
  roleConfigs.forEach((role) => {
    const seats = seniorityBreakdown[role.key] ?? [];
    if (seats.length === 0) return;
    // A plain object rather than a Map: the root tsconfig sets no `target`,
    // so spreading a Map's iterator would need --downlevelIteration.
    const byTier: Record<number, number> = {};
    seats.forEach((tier) => { byTier[tier] = (byTier[tier] ?? 0) + 1; });
    Object.keys(byTier)
      .map(Number)
      .sort((a, b) => b - a)
      .forEach((tier) => {
        const count = byTier[tier];
        const seat = seatSalary(role.key, city, tier);
        if (!seat) return;
        const factor = (count * (1 + complexityMultiplier)) / 12;
        rows.push({
          roleKey: role.key,
          role: role.label,
          level: seniorityLevels[tier]?.shortLabel ?? `Tier ${tier}`,
          seats: count,
          monthly: { low: Math.round(seat.low * factor), high: Math.round(seat.high * factor) },
        });
      });
  });
  return rows;
}

export interface UsEquivalent extends Range {
  /** Seats priced from a published US range. */
  publishedSeats: number;
  /** Seats priced from the site's US_COST_MULTIPLIER model, for want of a published range. */
  modeledSeats: number;
}

/**
 * What the same team costs in the US, per year.
 *
 * Roles with a published range on /gcc-india-cost use it. Roles without one
 * fall back to the site's existing multiple of the India cost, and the count
 * of those seats is returned so the page can say so rather than presenting a
 * modeled number as a published benchmark.
 */
export function usEquivalent(
  seniorityBreakdown: SeniorityBreakdown,
  city: CityKey,
  complexityMultiplier: number,
): UsEquivalent {
  let low = 0;
  let high = 0;
  let publishedSeats = 0;
  let modeledSeats = 0;

  Object.entries(seniorityBreakdown).forEach(([roleKey, seats]) => {
    const published = US_ROLE_RANGES[roleKey];
    seats.forEach((tier) => {
      if (published) {
        low += published[0];
        high += published[1];
        publishedSeats += 1;
        return;
      }
      const seat = seatSalary(roleKey, city, tier);
      if (!seat) return;
      low += seat.low * (1 + complexityMultiplier) * US_COST_MULTIPLIER;
      high += seat.high * (1 + complexityMultiplier) * US_COST_MULTIPLIER;
      modeledSeats += 1;
    });
  });

  return { low: Math.round(low), high: Math.round(high), publishedSeats, modeledSeats };
}

/** Rounds to the nearest $10K for the headline US comparison line. */
export const roundToNearest10k = (value: number): number => Math.round(value / 10_000) * 10_000;
