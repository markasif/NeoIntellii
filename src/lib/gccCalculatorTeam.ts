/**
 * Team-shape helpers for the GCC cost calculator.
 *
 * These were part of the calculator page until the paid /lp/ variant needed
 * the same behaviour. They are pure functions over role keys and seat counts,
 * which is also what makes them testable without rendering the calculator.
 */

import {
  roles as roleConfigs,
  macroArchetypes,
  type MacroArchetypeKey,
} from "@/data/gccCostData";

/**
 * Deep links from /lp/micro-gcc-india arrive with the team already designed:
 *
 *   /gcc-cost-calculator?team=8&Engineering%20Manager=1&AI%20%2F%20ML%20Engineer=2
 *
 * Role names travel as human labels rather than internal keys so a shared link
 * stays readable. Matching on letters and digits alone means the singular
 * label the landing page uses ("AI Engineer"), the plural label this page
 * shows ("AI Engineers") and the raw key ("ai") all resolve to the same role,
 * and spacing or slashes never break the handoff.
 */
const normalizeRoleName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Roles that used to exist in this calculator, and where a link that still
 * names them should land. Engineering Manager and Product Manager / Agile BA
 * both fold into Product Owner (the one delivery-ownership seat left),
 * Frontend into Full-Stack, and the old combined AI/ML role onto AI.
 */
const LEGACY_ROLE_ALIASES: Record<string, string> = {
  aiml: "ai",
  aimlengineer: "ai",
  aimlengineers: "ai",
  engmgr: "po",
  engineeringmanager: "po",
  engineeringmanagers: "po",
  pmba: "po",
  productmanager: "po",
  productmanagers: "po",
  productmanageragileba: "po",
  productmanagersagilebas: "po",
  frontend: "fullstack",
  frontendengineer: "fullstack",
  frontendengineers: "fullstack",
};

const ROLE_KEY_BY_NAME: Record<string, string> = {
  ...LEGACY_ROLE_ALIASES,
  ...Object.fromEntries(
    roleConfigs.flatMap((role) => {
      const label = normalizeRoleName(role.label);
      // Both spellings of the label, so "Data Scientist" finds "Data Scientists".
      const aliases = [role.key, label, label.replace(/s$/, "")];
      return aliases.map((alias) => [alias, role.key]);
    }),
  ),
};

/** Highest count a single role may be prefilled with, so a hand-edited URL cannot skew the estimate. */
const MAX_PREFILL_PER_ROLE = 500;

/** Reads role counts out of a query string. Unknown names and bad numbers are ignored; retired roles fold onto their successor. */
export function teamCountsFromQuery(search: string): Record<string, number> {
  const counts: Record<string, number> = {};
  new URLSearchParams(search).forEach((value, name) => {
    const key = ROLE_KEY_BY_NAME[normalizeRoleName(name)];
    if (!key) return;
    const count = Number(value);
    if (!Number.isFinite(count) || count <= 0) return;
    counts[key] = Math.min(MAX_PREFILL_PER_ROLE, (counts[key] ?? 0) + Math.floor(count));
  });
  return counts;
}

/** Fraction of seats at [Junior, Mid, Senior, Lead] for a macro archetype. */
export function archetypeRatios(key: MacroArchetypeKey): [number, number, number, number] {
  return macroArchetypes.find((a) => a.key === key)!.ratios;
}

/** The single tier an archetype leans on most - used to seed a newly added seat. */
export function primaryTierForArchetype(key: MacroArchetypeKey): number {
  const ratios = archetypeRatios(key);
  let best = 0;
  ratios.forEach((r, i) => { if (r > ratios[best]) best = i; });
  return best;
}

/**
 * Splits `count` seats across 4 seniority tiers by `ratios`, using the
 * largest-remainder method so the tiers always add back up to `count`.
 */
export function distributeSeats(count: number, ratios: [number, number, number, number]): number[] {
  if (count <= 0) return [];
  const raw = ratios.map((r) => r * count);
  const base = raw.map(Math.floor);
  let assigned = base.reduce((a, b) => a + b, 0);
  const order = raw
    .map((v, i) => ({ i, remainder: v - base[i] }))
    .sort((a, b) => b.remainder - a.remainder);
  let cursor = 0;
  while (assigned < count && order.length > 0) {
    base[order[cursor % order.length].i] += 1;
    assigned += 1;
    cursor += 1;
  }
  const seats: number[] = [];
  base.forEach((n, tier) => { for (let i = 0; i < n; i++) seats.push(tier); });
  return seats;
}

/** Full seniority breakdown for every role that has a headcount, at one archetype's ratios. */
export function buildBreakdownForCounts(
  counts: Record<string, number>,
  archetypeKey: MacroArchetypeKey,
): Record<string, number[]> {
  const ratios = archetypeRatios(archetypeKey);
  const next: Record<string, number[]> = {};
  roleConfigs.forEach((role) => {
    const n = counts[role.key] || 0;
    if (n > 0) next[role.key] = distributeSeats(n, ratios);
  });
  return next;
}

/** Maps the legacy ?seniority=0-3 query param onto the nearest macro archetype. */
export function archetypeFromSeniorityIndex(idx: number): MacroArchetypeKey {
  if (idx >= 3) return "staff-rnd";
  if (idx === 2) return "senior-led";
  return "balanced";
}
