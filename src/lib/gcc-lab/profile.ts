/**
 * Profile and scenario construction, normalization and hashing.
 *
 * Normalization is what makes two cases comparable: it strips the volatile
 * parts (ids, timestamps, labels) and orders the team deterministically, so
 * the same case built through the workspace and through the calculator
 * normalizes to the same object - and therefore to the same input hash and
 * the same numbers. Every result snapshot carries that hash.
 */

import { DEFAULT_FX } from "./currency";
import { suggestedCurrency } from "./countries";
import type {
  BaselineConfig,
  CurrencyCode,
  FeeBundle,
  IndiaCityKey,
  Profile,
  Scenario,
  SeniorityKey,
  TeamRow,
} from "./types";
import { DATA_VERSION, MODEL_VERSION, PROFILE_SCHEMA_VERSION } from "./versions";

let idCounter = 0;

/** Ids are local to a browser session; nothing depends on them being global. */
export function newId(prefix: string): string {
  idCounter += 1;
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}_${idCounter}_${random}`;
}

export const DEFAULT_CITY: IndiaCityKey = "bengaluru";

export function createTeamRow(partial: Partial<TeamRow> & { roleKey: string }): TeamRow {
  return {
    id: partial.id ?? newId("row"),
    roleKey: partial.roleKey,
    seniority: partial.seniority ?? "senior",
    fte: partial.fte ?? 1,
    startMonth: partial.startMonth ?? 1,
    compensationBasis: partial.compensationBasis ?? "base-salary",
    skillTags: partial.skillTags ?? [],
    benchmarkId: partial.benchmarkId,
    overrideAnnual: partial.overrideAnnual,
    overrideCurrency: partial.overrideCurrency,
    advisory: partial.advisory,
  };
}

export function createProfile(partial: Partial<Profile> = {}): Profile {
  const now = new Date().toISOString();
  const country = partial.country ?? "UNKNOWN";
  return {
    schemaVersion: PROFILE_SCHEMA_VERSION,
    profileId: partial.profileId ?? newId("profile"),
    country,
    hqCity: partial.hqCity,
    hqTimeZone: partial.hqTimeZone,
    displayCurrency: partial.displayCurrency ?? suggestedCurrency(country),
    objective: partial.objective ?? "explore",
    projectStage: partial.projectStage ?? "exploring",
    mandate: partial.mandate ?? "not-decided",
    industry: partial.industry,
    team: partial.team ?? [],
    city: partial.city ?? DEFAULT_CITY,
    // The opening city is an assumption until the visitor picks one, and the
    // workspace says so next to the estimate rather than presenting it as a choice.
    cityIsDefault: partial.cityIsDefault ?? true,
    workModel: partial.workModel ?? "hybrid",
    ownership: partial.ownership ?? "undecided",
    startDate: partial.startDate ?? now.slice(0, 10),
    privacy: partial.privacy ?? {
      dataOriginMarkets: [],
      servingMarkets: [],
      receivingEntity: "not-decided",
      indiaRemoteAccess: "unknown",
      regulatedActivities: [],
    },
    mobility: partial.mobility ?? { postingWorkers: "unknown" },
    readiness: partial.readiness ?? {},
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
  };
}

export const NO_BUNDLE: FeeBundle = {
  recruitment: false,
  workspace: false,
  equipment: false,
  itSecurityOps: false,
  entityLegalPayroll: false,
};

export function emptyBaseline(currency: CurrencyCode): BaselineConfig {
  return { objective: "explore", roles: [], currency };
}

export function createScenario(profile: Profile, partial: Partial<Scenario> = {}): Scenario {
  return {
    id: partial.id ?? newId("scenario"),
    label: partial.label ?? "Base",
    profileRevision: partial.profileRevision ?? 1,
    teamOverrides: partial.teamOverrides ?? {},
    cityOverride: partial.cityOverride,
    engagement: partial.engagement ?? "client-managed",
    feeBundle: partial.feeBundle ?? NO_BUNDLE,
    hiringDelayMonths: partial.hiringDelayMonths ?? 0,
    costAssumptions: partial.costAssumptions ?? {},
    aiCompute: partial.aiCompute ?? { mode: "not-budgeted" },
    fx: partial.fx ?? DEFAULT_FX,
    // Rupees, because that is what the team is paid in. The display currency
    // is applied once at the edge, which is what lets an exchange-rate move
    // change the number a visitor reads instead of cancelling itself out.
    baseCurrency: partial.baseCurrency ?? "INR",
    baseline: partial.baseline ?? { ...emptyBaseline(profile.displayCurrency), objective: profile.objective },
    entryArrangement: partial.entryArrangement,
    modelVersion: partial.modelVersion ?? MODEL_VERSION,
    dataVersion: partial.dataVersion ?? DATA_VERSION,
  };
}

/* ------------------------------------------------------------ normalization */

const SENIORITY_RANK: Record<SeniorityKey, number> = { junior: 0, mid: 1, senior: 2, lead: 3 };

/** Team rows, ordered so two equivalent teams compare equal regardless of edit order. */
export function normalizeTeam(team: TeamRow[]): Omit<TeamRow, "id" | "benchmarkId">[] {
  return [...team]
    .map(({ id: _id, benchmarkId: _benchmarkId, ...row }) => ({
      ...row,
      skillTags: [...row.skillTags].sort(),
    }))
    .sort((a, b) =>
      a.roleKey.localeCompare(b.roleKey) ||
      SENIORITY_RANK[a.seniority] - SENIORITY_RANK[b.seniority] ||
      a.startMonth - b.startMonth ||
      a.fte - b.fte,
    );
}

/**
 * The parts of a case that actually change the numbers.
 *
 * Labels, ids and timestamps are deliberately absent: renaming a scenario must
 * not change its hash, and the same case entered on two routes must produce
 * the same one.
 */
export function normalizeForHash(profile: Profile, scenario: Scenario): unknown {
  return {
    schemaVersion: profile.schemaVersion,
    country: profile.country,
    objective: profile.objective,
    city: scenario.cityOverride ?? profile.city,
    workModel: profile.workModel,
    team: normalizeTeam(profile.team),
    engagement: scenario.engagement,
    feeBundle: scenario.feeBundle,
    hiringDelayMonths: scenario.hiringDelayMonths,
    costAssumptions: scenario.costAssumptions,
    aiCompute: scenario.aiCompute,
    baseCurrency: scenario.baseCurrency,
    fx: { quotes: scenario.fx.quotes, quoteDate: scenario.fx.quoteDate },
    baseline: scenario.baseline,
    modelVersion: scenario.modelVersion,
    dataVersion: scenario.dataVersion,
  };
}

/** Key order is sorted, so the string is stable across engines and edit order. */
export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(",")}}`;
}

/** FNV-1a. Short, dependency-free and stable - it is an identity, not a digest. */
export function hashInputs(profile: Profile, scenario: Scenario): string {
  const text = stableStringify(normalizeForHash(profile, scenario));
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `h${hash.toString(16).padStart(8, "0")}`;
}

/** A short, human-quotable case id derived from the input hash. */
export const caseIdFor = (profile: Profile, scenario: Scenario): string =>
  `NI-${hashInputs(profile, scenario).slice(1, 9).toUpperCase()}`;
