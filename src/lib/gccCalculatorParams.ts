import {
  blueprintPods,
  roles as roleConfigs,
  type BlueprintPodKey,
  type CityKey,
  type EngagementModel,
} from "@/data/gccCostData";

/**
 * Query-string prefill for /gcc-cost-calculator.
 *
 * Campaigns, partner sites and our own assistants link into the calculator with
 * the team already worked out, e.g.
 *
 *   /gcc-cost-calculator?team=10&Engineering%20Manager=1&AI%20%2F%20ML%20Engineer=1&...
 *
 * Those links are written by hand and by other tools, so the labels never match
 * ours exactly - "AI / ML Engineer" vs our "AI/ML Engineers", singular vs
 * plural, a slug instead of a label. Everything is therefore matched on a
 * normalised token (lowercase, alphanumerics only, trailing plural dropped),
 * which collapses all of those spellings onto one key.
 *
 * Nothing here throws or guesses at unknown parameters: an unrecognised key is
 * ignored, so utm_* and friends ride along harmlessly and the visitor lands on
 * step 1 with whatever we could understand already filled in.
 */

/** A role count above this is a typo or an attack, not a GCC. */
const MAX_PER_ROLE = 500;
const MAX_TEAM = 2000;

/**
 * Lowercase, strip everything that is not a letter or digit, drop a trailing
 * plural. "AI / ML Engineer", "ai-ml-engineers" and "AI/ML Engineers" all
 * collapse to "aimlengineer".
 */
export function normalizeToken(value: string): string {
  const cleaned = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned.length > 2 && cleaned.endsWith("s") ? cleaned.slice(0, -1) : cleaned;
}

/**
 * Spellings we accept for each role on top of its key and its label in
 * gccCostData. Written the way a human would type them; they go through
 * normalizeToken() like everything else.
 */
const ROLE_ALIASES: Record<string, string[]> = {
  // The old combined "AI/ML Engineer" role (key "aiml") lands on AI: agents
  // and RAG are what most links that used it were asking for.
  ai: ["AI Engineer", "AI / ML Engineer", "AI/ML Engineers", "aiml", "GenAI Engineer", "LLM Engineer", "Agentic AI Engineer", "Agent Engineer"],
  ml: ["ML Engineer", "Machine Learning Engineer", "Deep Learning Engineer", "NLP Engineer", "MLOps Engineer"],
  dataeng: ["Data Engineer", "Data Platform Engineer", "Analytics Engineer", "ETL Engineer"],
  // Frontend was folded into Full-Stack when the roster was trimmed.
  fullstack: ["Full-Stack Engineer", "Full Stack Developer", "Software Engineer", "Product Engineer", "Frontend Engineer", "Front-End Developer", "UI Engineer", "Web Engineer", "frontend", "Tech Lead", "Team Lead"],
  backend: ["Backend Engineer", "Back-End Developer", "API Engineer", "Server Engineer"],
  devops: ["Cloud / DevOps Engineer", "DevOps Engineer", "Cloud Engineer", "Platform Engineer", "SRE", "Site Reliability Engineer", "Infrastructure Engineer"],
  qa: ["QA / SDET", "QA Engineer", "SDET", "Test Engineer", "QA Automation Engineer", "Automation Engineer"],
  datasci: ["Data Scientist", "Data Science", "Data Analyst", "ML Scientist"],
  mobile: ["Mobile Engineer", "Mobile Developer", "iOS Engineer", "Android Engineer"],
  ba: ["Business Analyst", "BA"],
  // Product Manager / Agile BA and Engineering Manager both map to Product
  // Owner: it is the one delivery-ownership seat left in the roster.
  po: ["Product Owner", "PO", "Product Manager", "PM", "Agile BA", "Technical Program Manager", "pmba", "Engineering Manager", "Eng Manager", "EM", "Delivery Manager", "engmgr"],
};

const ROLE_LOOKUP: Map<string, string> = (() => {
  const map = new Map<string, string>();
  for (const role of roleConfigs) {
    map.set(normalizeToken(role.key), role.key);
    map.set(normalizeToken(role.label), role.key);
    for (const alias of ROLE_ALIASES[role.key] ?? []) map.set(normalizeToken(alias), role.key);
  }
  return map;
})();

/** Parameter names that carry a total headcount rather than a role count. */
const TOTAL_KEYS = new Set(["team", "teamsize", "total", "totalteam", "headcount", "size", "people"].map(normalizeToken));

const SENIORITY_KEYS = new Set(["seniority", "level", "mix", "experience"].map(normalizeToken));
const SENIORITY_VALUES: Record<string, number> = {
  junior: 0, entry: 0, fresher: 0, mostlyjunior: 0, graduate: 0,
  balanced: 1, mixed: 1, mix: 1, mid: 1, midlevel: 1, balancedmix: 1,
  senior: 2, mostlysenior: 2, experienced: 2,
  lead: 3, principal: 3, staff: 3, leadprincipal: 3,
};

const CITY_KEYS = new Set(["city", "location", "place"].map(normalizeToken));
const CITY_VALUES: Record<string, CityKey | "recommend"> = {
  bengaluru: "bengaluru", bangalore: "bengaluru", blr: "bengaluru",
  hyderabad: "hyderabad", hyd: "hyderabad", hitechcity: "hyderabad",
  chennai: "chennai", madra: "chennai",
  pune: "pune",
  recommend: "recommend", any: "recommend", notsure: "recommend", flexible: "recommend", undecided: "recommend",
};

const ENGAGEMENT_KEYS = new Set(["model", "engagement", "operatingmodel", "mode"].map(normalizeToken));
const ENGAGEMENT_VALUES: Record<string, EngagementModel> = {
  captive: "captive", owned: "captive", fullycaptive: "captive", ownedcaptive: "captive",
  managed: "managed", managedgcc: "managed", gccaa: "managed", gccaaservice: "managed", managedservice: "managed",
  hybrid: "hybrid", bot: "hybrid", buildoperatetransfer: "hybrid",
};

const POD_KEYS = new Set(["pod", "blueprint", "blueprintpod", "preset", "template", "shape"].map(normalizeToken));

/**
 * Blueprint pod spellings. Every pod answers to its key and its label in
 * gccCostData (so the two sides can never drift), plus the shorthand a human
 * or a landing page is likely to write.
 *
 * Note normalizeToken() drops a trailing plural, so "mlops" is stored and
 * looked up as "mlop" - correct as long as both sides go through it, which
 * they do.
 */
const POD_VALUES: Record<string, BlueprintPodKey> = (() => {
  const extra: Record<BlueprintPodKey, string[]> = {
    agentic: ["Agentic AI Pod", "agentic ai", "agents", "agent pod"],
    mlops: ["MLOps Platform Pod", "ml ops", "ml platform", "model training"],
    product: ["Product Engineering Pod", "product engineering", "product pod", "platform pod", "saas pod"],
    poc: ["Fast AI POC Sprint Unit", "poc sprint", "sprint unit", "strike team", "fast poc"],
    custom: ["Custom Build", "scratch", "start from scratch", "none", "blank"],
  };
  const map: Record<string, BlueprintPodKey> = {};
  for (const pod of blueprintPods) {
    map[normalizeToken(pod.key)] = pod.key;
    map[normalizeToken(pod.label)] = pod.key;
    for (const alias of extra[pod.key] ?? []) map[normalizeToken(alias)] = pod.key;
  }
  return map;
})();

/**
 * Role split used when a link gives a total headcount but no roles - a typical
 * product engineering pod, sized to the number asked for. It is a starting
 * point the visitor edits on step 1, not a recommendation.
 */
const DEFAULT_MIX: Array<[string, number]> = [
  ["fullstack", 0.3],
  ["backend", 0.15],
  ["ai", 0.15],
  ["ml", 0.1],
  ["dataeng", 0.1],
  ["devops", 0.1],
  ["qa", 0.05],
  ["po", 0.05],
];

export interface CalculatorPrefill {
  /** Role key -> headcount. Null when the link said nothing about the team. */
  teamCounts: Record<string, number> | null;
  /** Whether the counts came from per-role params or were split from a total. */
  teamSource: "roles" | "total" | null;
  /** Index into seniorityLevels, or null when unspecified. */
  seniority: number | null;
  /** A city, "recommend" for "let NeoIntelli pick", or null when unspecified. */
  city: CityKey | "recommend" | null;
  engagement: EngagementModel | null;
  /**
   * A 1-click blueprint pod to open on, or null when the link named none.
   * A pod carries the focus areas, seniority preset and complexity tier the
   * calculator would apply on a click; any role counts in the same link then
   * override the pod's own team shape.
   */
  pod: BlueprintPodKey | null;
  /** True when the link carried anything we understood. */
  applied: boolean;
}

const EMPTY: CalculatorPrefill = {
  teamCounts: null,
  teamSource: null,
  seniority: null,
  city: null,
  engagement: null,
  pod: null,
  applied: false,
};

/**
 * Reads a count off a query value. A bare flag ("?Backend Engineer" or
 * "...=yes") counts as one; anything that is not a non-negative integer is
 * ignored rather than guessed at.
 */
function parseCount(raw: string): number | null {
  const value = raw.trim();
  if (value === "" || /^(true|yes|y)$/i.test(value)) return 1;
  if (!/^\d+$/.test(value)) return null;
  return Math.min(Number(value), MAX_PER_ROLE);
}

/**
 * Splits `total` across DEFAULT_MIX with the largest-remainder method, so the
 * counts always add back up to exactly `total`.
 */
export function distributeTeam(total: number): Record<string, number> {
  const size = Math.min(Math.max(Math.trunc(total), 0), MAX_TEAM);
  const counts: Record<string, number> = {};
  if (size === 0) return counts;

  const parts = DEFAULT_MIX.map(([key, weight]) => {
    const exact = size * weight;
    const base = Math.floor(exact);
    return { key, base, remainder: exact - base };
  });

  let assigned = parts.reduce((sum, p) => sum + p.base, 0);
  for (const part of [...parts].sort((a, b) => b.remainder - a.remainder)) {
    if (assigned >= size) break;
    part.base += 1;
    assigned += 1;
  }

  for (const part of parts) {
    if (part.base > 0) counts[part.key] = part.base;
  }
  return counts;
}

/**
 * Turns a calculator URL's query string into the state step 1 should open with.
 * Per-role parameters win over a total: when a link carries both (as our own
 * links do), the total is a redundant summary, not a second opinion.
 */
export function parseCalculatorParams(search: string): CalculatorPrefill {
  if (!search) return EMPTY;

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  } catch {
    return EMPTY;
  }

  const roleCounts: Record<string, number> = {};
  let total: number | null = null;
  let seniority: number | null = null;
  let city: CityKey | "recommend" | null = null;
  let engagement: EngagementModel | null = null;
  let pod: BlueprintPodKey | null = null;

  // A plain loop rather than params.forEach: the values below are read after
  // the loop, and TypeScript does not track assignments made inside a closure.
  for (const [rawKey, rawValue] of Array.from(params.entries())) {
    const key = normalizeToken(rawKey);
    const value = normalizeToken(rawValue);

    const roleKey = ROLE_LOOKUP.get(key);
    if (roleKey) {
      const count = parseCount(rawValue);
      // A role repeated in the query accumulates rather than overwrites.
      if (count !== null) roleCounts[roleKey] = Math.min((roleCounts[roleKey] ?? 0) + count, MAX_PER_ROLE);
      continue;
    }

    if (TOTAL_KEYS.has(key)) {
      const parsed = parseCount(rawValue);
      if (parsed !== null) total = Math.min(parsed, MAX_TEAM);
      continue;
    }

    if (SENIORITY_KEYS.has(key)) {
      if (/^[0-3]$/.test(rawValue.trim())) seniority = Number(rawValue.trim());
      else if (value in SENIORITY_VALUES) seniority = SENIORITY_VALUES[value];
      continue;
    }

    if (CITY_KEYS.has(key)) {
      if (value in CITY_VALUES) city = CITY_VALUES[value];
      continue;
    }

    if (ENGAGEMENT_KEYS.has(key)) {
      if (value in ENGAGEMENT_VALUES) engagement = ENGAGEMENT_VALUES[value];
      continue;
    }

    if (POD_KEYS.has(key)) {
      if (value in POD_VALUES) pod = POD_VALUES[value];
    }
  }

  const hasRoles = Object.values(roleCounts).some((n) => n > 0);
  const teamCounts = hasRoles ? roleCounts : total !== null && total > 0 ? distributeTeam(total) : null;
  const teamSource = hasRoles ? "roles" : teamCounts ? "total" : null;

  const applied =
    teamCounts !== null || seniority !== null || city !== null || engagement !== null || pod !== null;

  return { teamCounts, teamSource, seniority, city, engagement, pod, applied };
}
