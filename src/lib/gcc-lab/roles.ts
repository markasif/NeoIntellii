/**
 * Canonical roles and compensation benchmarks for the Decision Lab.
 *
 * The role list, the skill tags and the salary bands are the ones the site
 * already ships in src/data/gccCostData.ts. This module does not restate them
 * - it wraps them, so the lab and /gcc-cost-calculator can never drift onto
 * two different salary tables. Adding a role means adding it to the canonical
 * data file, not here.
 *
 * What this module adds is the part the raw data does not carry: the *basis*
 * of each band (base salary, before statutory overhead), the currency it is
 * denominated in, which cities it covers, and what happens when it does not
 * cover the city the visitor picked.
 */

import { roles as roleConfigs, seniorityLevels, type CityKey } from "@/data/gccCostData";
import type { CurrencyCode, IndiaCityKey, SeniorityKey } from "./types";

/**
 * The bands in gccCostData are published as annual USD figures.
 *
 * The cost itself is not a dollar cost: a seat in Bengaluru is paid in rupees.
 * The USD band is a translation of an INR-native cost, struck at the rate
 * below, and the model treats it that way - it converts a band to rupees at
 * this fixed rate and then to the display currency at whatever quote is in
 * force. That is what makes an exchange-rate move actually change the cost you
 * read, instead of cancelling itself out.
 */
export const BENCHMARK_CURRENCY: CurrencyCode = "USD";

/**
 * The INR-per-USD rate the published bands were struck at.
 *
 * Deliberately NOT the scenario's FX quote: if it moved with the scenario, a
 * rate shock would convert into rupees and back out again and produce no
 * change at all. It moves only when the bands themselves are re-struck, which
 * is a data-register change, not a market event.
 */
export const BENCHMARK_INR_PER_USD = 85;
export const BENCHMARK_FX_DATE = "2026-09-05";

/** The compensation basis those bands are expressed on. */
export const BENCHMARK_BASIS = "base-salary" as const;

export const SENIORITY_ORDER: SeniorityKey[] = ["junior", "mid", "senior", "lead"];

/** Seniority key -> the tier index used by the canonical salary arrays. */
export const seniorityIndex = (seniority: SeniorityKey): number => {
  const index = SENIORITY_ORDER.indexOf(seniority);
  return index === -1 ? 1 : index;
};

export const seniorityLabel = (seniority: SeniorityKey): string =>
  seniorityLevels[seniorityIndex(seniority)]?.shortLabel ?? seniority;

export const seniorityLongLabel = (seniority: SeniorityKey): string =>
  seniorityLevels[seniorityIndex(seniority)]?.label ?? seniority;

export interface LabRole {
  key: string;
  label: string;
  note: string;
  skillTags: { key: string; label: string; deepTech?: boolean }[];
}

export const LAB_ROLES: LabRole[] = roleConfigs.map((role) => ({
  key: role.key,
  label: role.label,
  note: role.note,
  skillTags: role.specializations.map((spec) => ({ key: spec.key, label: spec.label, deepTech: spec.deepTech })),
}));

const ROLE_BY_KEY = new Map(LAB_ROLES.map((role) => [role.key, role]));

export const findRole = (key: string): LabRole | undefined => ROLE_BY_KEY.get(key);

export const roleLabel = (key: string): string => ROLE_BY_KEY.get(key)?.label ?? key;

export const skillTagLabel = (roleKey: string, tagKey: string): string =>
  ROLE_BY_KEY.get(roleKey)?.skillTags.find((tag) => tag.key === tagKey)?.label ?? tagKey;

/**
 * Cities the compensation register actually covers.
 *
 * Every other city stays selectable, but only for a scenario where the visitor
 * supplies the costs. The lab will not extrapolate a band it does not have,
 * and it will not rank a city it cannot price.
 */
export const BENCHMARKED_CITIES: IndiaCityKey[] = ["bengaluru", "hyderabad", "chennai", "pune"];

export const isBenchmarkedCity = (city: IndiaCityKey): city is IndiaCityKey & CityKey =>
  (BENCHMARKED_CITIES as string[]).includes(city);

export interface CompensationBenchmark {
  /** Stable id recorded on the team row that used it. */
  benchmarkId: string;
  /** Annual base salary, in BENCHMARK_CURRENCY. */
  annual: number;
  currency: CurrencyCode;
  basis: typeof BENCHMARK_BASIS;
  sourceId: "ni-comp-bands";
  /** Planning band around the point figure, where the data supports one. */
  low: number;
  high: number;
}

/**
 * The band width around a point salary.
 *
 * The canonical data gives one figure per role/city/tier, not a distribution.
 * Rather than invent a percentile spread, the lab widens the point figure by a
 * declared planning band and says so. This is a planning assumption; it is not
 * a measured range and must never be labelled one.
 */
export const PLANNING_BAND = 0.1;

/**
 * Annual base salary for a role, city and seniority - or null when the
 * register does not cover that combination. A null is carried through to the
 * UI as "no benchmark for this city", never as zero.
 */
export function compensationBenchmark(
  roleKey: string,
  city: IndiaCityKey,
  seniority: SeniorityKey,
): CompensationBenchmark | null {
  if (!isBenchmarkedCity(city)) return null;
  const role = roleConfigs.find((candidate) => candidate.key === roleKey);
  const annual = role?.baseSalary[city as CityKey]?.[seniorityIndex(seniority)];
  if (annual == null || !Number.isFinite(annual)) return null;
  return {
    benchmarkId: `ni-comp:${roleKey}:${city}:${seniority}`,
    annual,
    currency: BENCHMARK_CURRENCY,
    basis: BENCHMARK_BASIS,
    sourceId: "ni-comp-bands",
    low: annual * (1 - PLANNING_BAND),
    high: annual * (1 + PLANNING_BAND),
  };
}

/**
 * How much of a team the register can actually price, as a fraction of FTE.
 * Below the evidence threshold the lab refuses to rank cities or present a
 * headline band, and says why.
 */
export const EVIDENCE_COVERAGE_THRESHOLD = 0.7;
