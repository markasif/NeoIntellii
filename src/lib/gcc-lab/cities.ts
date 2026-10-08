/**
 * India city records and the comparison.
 *
 * Two things are kept strictly apart in this file, because conflating them is
 * how a location comparison turns into a sales pitch:
 *
 *   1. How well a city models for a given team - which is a function of the
 *      compensation register, and only exists for cities the register covers.
 *   2. Where NeoIntelli actually operates - which is a fact about NeoIntelli,
 *      disclosed next to any recommendation, and never implied by a city
 *      appearing in the comparison.
 *
 * Release one deliberately does not produce a numeric fit score. A "86 / 100"
 * built on four qualitative observations and one salary table would be a
 * precision the evidence cannot carry. The comparison explains, ranks on
 * modelled cost only where every city is priceable, and says "insufficient
 * evidence" where it is not. `NUMERIC_FIT_SCORING_ENABLED` is the flag that
 * would turn scoring on, and the conditions it must meet first are written
 * next to it.
 */

import type { IndiaCityKey } from "./types";
import { BENCHMARKED_CITIES } from "./roles";

/**
 * Numeric fit scores stay off until every one of these is true:
 *   - each dimension has a published definition and a dated source
 *   - weights are published and normalized, and the user can change them
 *   - missing data is handled as unknown, never as zero
 *   - a city below the evidence-coverage threshold shows "insufficient
 *     evidence" instead of a rank
 *   - the page shows how the ranking moves when the priorities change
 */
export const NUMERIC_FIT_SCORING_ENABLED = false;

export type EvidenceLevel = "modelled" | "qualitative-only" | "no-evidence";

export interface CityRecord {
  key: IndiaCityKey;
  label: string;
  state: string;
  /** Does the compensation register price this city? */
  compensationCoverage: EvidenceLevel;
  /** What is actually known about specialist and leadership depth here. */
  talentEvidence: string;
  talentEvidenceLevel: EvidenceLevel;
  /** Operational observations that are not cost. */
  operationalNotes: string[];
  /** Policy jurisdiction. Gurugram and Noida are separate states and are not merged. */
  policyJurisdiction: string;
  /** True only where NeoIntelli itself operates today. */
  neoIntelliPresence: boolean;
  presenceNote: string;
}

export const CITY_RECORDS: CityRecord[] = [
  {
    key: "bengaluru",
    label: "Bengaluru",
    state: "Karnataka",
    compensationCoverage: "modelled",
    talentEvidence:
      "The deepest pool for AI, data and platform roles of the cities modelled here, and the one where senior and leadership hires are most often available without relocation. It is also the most expensive, and the most competitive to hire into.",
    talentEvidenceLevel: "qualitative-only",
    operationalNotes: [
      "Largest concentration of comparable capability centres, which cuts both ways: easier to hire experienced people, easier to lose them",
      "Commute times are a real factor in office attendance planning",
    ],
    policyJurisdiction: "Karnataka",
    neoIntelliPresence: true,
    presenceNote: "NeoIntelli is based in Bengaluru. Treat that as a disclosure, not an argument for the city.",
  },
  {
    key: "hyderabad",
    label: "Hyderabad",
    state: "Telangana",
    compensationCoverage: "modelled",
    talentEvidence:
      "A substantial capability-centre ecosystem with strong data and platform hiring. Senior AI leadership is thinner than Bengaluru and more often needs relocation.",
    talentEvidenceLevel: "qualitative-only",
    operationalNotes: [
      "Purpose-built office corridors keep commute planning simpler than Bengaluru",
      "Modelled compensation sits below Bengaluru across every role in the register",
    ],
    policyJurisdiction: "Telangana",
    neoIntelliPresence: false,
    presenceNote: "NeoIntelli does not have its own office here. Delivery would be arranged, not existing.",
  },
  {
    key: "pune",
    label: "Pune",
    state: "Maharashtra",
    compensationCoverage: "modelled",
    talentEvidence:
      "Strong engineering and product depth. AI-specific senior hiring is narrower than Bengaluru or Hyderabad on the evidence available here.",
    talentEvidenceLevel: "qualitative-only",
    operationalNotes: [
      "Established engineering culture and a settled contractor market",
      "Proximity to Mumbai matters for finance-sector stakeholders",
    ],
    policyJurisdiction: "Maharashtra",
    neoIntelliPresence: false,
    presenceNote: "NeoIntelli does not have its own office here. Delivery would be arranged, not existing.",
  },
  {
    key: "chennai",
    label: "Chennai",
    state: "Tamil Nadu",
    compensationCoverage: "modelled",
    talentEvidence:
      "Deep platform, backend and QA depth with lower attrition than Bengaluru on anecdotal evidence. Senior generative-AI hiring is the thinnest of the four modelled cities.",
    talentEvidenceLevel: "qualitative-only",
    operationalNotes: [
      "Modelled compensation is the lowest of the four cities in the register",
      "Strong for platform and product engineering mandates; check AI leadership availability early",
    ],
    policyJurisdiction: "Tamil Nadu",
    neoIntelliPresence: false,
    presenceNote: "NeoIntelli does not have its own office here. Delivery would be arranged, not existing.",
  },
  {
    key: "mumbai",
    label: "Mumbai",
    state: "Maharashtra",
    compensationCoverage: "no-evidence",
    talentEvidence: "No compensation record covers Mumbai in this model.",
    talentEvidenceLevel: "no-evidence",
    operationalNotes: ["Selectable for a scenario where you supply your own costs. Nothing is modelled or ranked."],
    policyJurisdiction: "Maharashtra",
    neoIntelliPresence: false,
    presenceNote: "Not modelled.",
  },
  {
    key: "gurugram",
    label: "Gurugram",
    state: "Haryana",
    compensationCoverage: "no-evidence",
    talentEvidence: "No compensation record covers Gurugram in this model.",
    talentEvidenceLevel: "no-evidence",
    operationalNotes: [
      "Selectable for a scenario where you supply your own costs",
      "Gurugram is in Haryana and Noida is in Uttar Pradesh. They are one labour market and two policy jurisdictions, and this model keeps them apart.",
    ],
    policyJurisdiction: "Haryana",
    neoIntelliPresence: false,
    presenceNote: "Not modelled.",
  },
  {
    key: "noida",
    label: "Noida",
    state: "Uttar Pradesh",
    compensationCoverage: "no-evidence",
    talentEvidence: "No compensation record covers Noida in this model.",
    talentEvidenceLevel: "no-evidence",
    operationalNotes: [
      "Selectable for a scenario where you supply your own costs",
      "Noida is in Uttar Pradesh and Gurugram is in Haryana. Their state provisions are different and are not combined here.",
    ],
    policyJurisdiction: "Uttar Pradesh",
    neoIntelliPresence: false,
    presenceNote: "Not modelled.",
  },
  {
    key: "other",
    label: "Somewhere else",
    state: "Not specified",
    compensationCoverage: "no-evidence",
    talentEvidence: "No compensation record. Supply your own figures and the model will use them.",
    talentEvidenceLevel: "no-evidence",
    operationalNotes: ["Nothing is modelled or ranked for an unspecified location."],
    policyJurisdiction: "Not specified",
    neoIntelliPresence: false,
    presenceNote: "Not modelled.",
  },
];

const BY_KEY = new Map(CITY_RECORDS.map((record) => [record.key, record]));

export const findCity = (key: IndiaCityKey): CityRecord | undefined => BY_KEY.get(key);
export const cityLabel = (key: IndiaCityKey): string => BY_KEY.get(key)?.label ?? key;

/** Cities the model can actually price. Everything else needs the visitor's own figures. */
export const MODELLED_CITIES = CITY_RECORDS.filter((record) => record.compensationCoverage === "modelled");

export type PriorityKey = "cost" | "ai-depth" | "leadership" | "retention" | "operations";

export const PRIORITIES: { key: PriorityKey; label: string; description: string }[] = [
  { key: "cost", label: "Modelled cost", description: "The steady-state run rate for the same team" },
  { key: "ai-depth", label: "AI and data specialist depth", description: "How readily specialist engineers can be hired" },
  { key: "leadership", label: "Leadership availability", description: "Whether a centre lead can be hired locally" },
  { key: "retention", label: "Retention", description: "How hard the team is to keep once built" },
  { key: "operations", label: "Operational practicality", description: "Workspace, commute and day-to-day running" },
];

export interface CityComparisonRow {
  record: CityRecord;
  /** Steady-state monthly cost for the same team, or null when unpriceable. */
  modelledMonthly: number | null;
  /** Percentage against the cheapest priceable city, or null. */
  differenceFromCheapest: number | null;
  /** Ordered qualitative observations against the chosen priorities. */
  observations: string[];
  /** Set when the comparison cannot rank this city. */
  insufficientEvidence: boolean;
}

export interface CityComparison {
  rows: CityComparisonRow[];
  /** Cities in the comparison the model cannot price at all. */
  unpriceable: IndiaCityKey[];
  /** The disclosure that goes next to any recommendation. */
  presenceDisclosure: string;
  /** Why there is no score. Rendered wherever a reader might expect one. */
  scoringNote: string;
}

const PRIORITY_OBSERVATIONS: Record<PriorityKey, Partial<Record<IndiaCityKey, string>>> = {
  cost: {
    bengaluru: "Highest modelled compensation of the four cities in the register.",
    hyderabad: "Modelled below Bengaluru across every role in the register.",
    pune: "Modelled below Bengaluru across every role in the register.",
    chennai: "Lowest modelled compensation of the four cities in the register.",
  },
  "ai-depth": {
    bengaluru: "Deepest specialist pool of the modelled cities.",
    hyderabad: "Strong data and platform depth; specialist AI hiring is narrower than Bengaluru.",
    pune: "Strong engineering depth; AI-specific senior hiring is narrower.",
    chennai: "Thinnest senior generative-AI hiring of the four. Check availability before committing.",
  },
  leadership: {
    bengaluru: "Most likely of the four to yield a centre lead without relocation.",
    hyderabad: "Leadership hiring is possible but more often needs relocation.",
    pune: "Leadership hiring is possible but more often needs relocation.",
    chennai: "AI leadership availability is the thing to validate first here.",
  },
  retention: {
    bengaluru: "The most competitive market to hold on to people in.",
    hyderabad: "Less churn pressure than Bengaluru on anecdotal evidence; no measured rate is published here.",
    pune: "Settled engineering market; no measured attrition rate is published here.",
    chennai: "Lower attrition than Bengaluru on anecdotal evidence; no measured rate is published here.",
  },
  operations: {
    bengaluru: "Commute times are a genuine factor in office attendance planning.",
    hyderabad: "Purpose-built office corridors keep commute planning simpler.",
    pune: "Established workspace market and proximity to Mumbai stakeholders.",
    chennai: "Straightforward workspace market; fewer comparable centres competing for the same space.",
  },
};

export const SCORING_NOTE =
  "There is no overall fit score. Cities are compared on modelled cost, which comes from the compensation register, and on named observations, which are qualitative. A single number would imply evidence this model does not have. Where a city is not in the register it is marked insufficient evidence rather than ranked.";

/**
 * Builds the comparison. `costFor` is supplied by the caller so this module
 * never has to know how a team is priced - it asks for a number and reports
 * honestly when it does not get one.
 */
export function compareCities(
  cities: IndiaCityKey[],
  priorities: PriorityKey[],
  costFor: (city: IndiaCityKey) => number | null,
): CityComparison {
  const rows: CityComparisonRow[] = cities.map((key) => {
    const record = findCity(key);
    const modelledMonthly = record?.compensationCoverage === "modelled" ? costFor(key) : null;
    const observations = (priorities.length > 0 ? priorities : (["cost", "ai-depth"] as PriorityKey[]))
      .map((priority) => PRIORITY_OBSERVATIONS[priority]?.[key])
      .filter((text): text is string => Boolean(text));
    return {
      record: record ?? CITY_RECORDS[CITY_RECORDS.length - 1],
      modelledMonthly,
      differenceFromCheapest: null,
      observations:
        observations.length > 0
          ? observations
          : ["No evidence record covers this city. Supply your own costs to model it."],
      insufficientEvidence: modelledMonthly == null,
    };
  });

  const priced = rows.map((row) => row.modelledMonthly).filter((value): value is number => value != null && value > 0);
  const cheapest = priced.length > 0 ? Math.min(...priced) : null;
  if (cheapest != null) {
    rows.forEach((row) => {
      if (row.modelledMonthly == null) return;
      row.differenceFromCheapest = ((row.modelledMonthly - cheapest) / cheapest) * 100;
    });
  }

  const present = rows.filter((row) => row.record.neoIntelliPresence).map((row) => row.record.label);
  const presenceDisclosure =
    present.length > 0
      ? `NeoIntelli is based in ${present.join(" and ")}. Every other city in this comparison would be arranged rather than existing delivery. Nothing here implies a NeoIntelli office in a city it does not name.`
      : "NeoIntelli is based in Bengaluru. None of the cities in this comparison is an existing NeoIntelli location, so delivery there would be arranged rather than existing.";

  return {
    rows,
    unpriceable: rows.filter((row) => row.insufficientEvidence).map((row) => row.record.key),
    presenceDisclosure,
    scoringNote: SCORING_NOTE,
  };
}

/** Cities the visitor can put side by side. Release one caps the comparison at three. */
export const MAX_COMPARED_CITIES = 3;

export const isModelled = (key: IndiaCityKey): boolean =>
  (BENCHMARKED_CITIES as string[]).includes(key);
