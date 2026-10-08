/**
 * Country registry for the Decision Lab.
 *
 * Membership is deliberately a set of overlapping flags rather than one
 * exclusive "track". A Norwegian company is in the EEA *and* EFTA and is not
 * in the EU; a Swiss company is in EFTA, is not in the EEA, and needs its own
 * Swiss-law review rather than an EEA conclusion; the UK is in none of them
 * and has its own transfer framework. Nothing here decides eligibility for
 * anything - it decides which considerations get surfaced.
 *
 * The mapping is versioned so a change to it is visible in an export.
 */

import type { CurrencyCode } from "./types";

export const COUNTRY_MAPPING_VERSION = "country-map-2026-09-05";

export type Membership = "eu" | "eea" | "efta" | "uk" | "gdpr-applicable" | "swiss-fadp" | "uk-gdpr";

export interface CountryRecord {
  /** ISO 3166-1 alpha-2, or the two sentinel values. */
  code: string;
  name: string;
  currency: CurrencyCode;
  /** Representative IANA zone. The user can change it; a country is not a zone. */
  defaultTimeZone: string;
  memberships: Membership[];
  /** Region grouping for the compact selector only - never for benchmarking. */
  region: "north-america" | "uk-ireland" | "europe" | "nordics" | "apac" | "other";
}

export const COUNTRIES: CountryRecord[] = [
  { code: "US", name: "United States", currency: "USD", defaultTimeZone: "America/New_York", memberships: [], region: "north-america" },
  { code: "CA", name: "Canada", currency: "CAD", defaultTimeZone: "America/Toronto", memberships: [], region: "north-america" },
  { code: "GB", name: "United Kingdom", currency: "GBP", defaultTimeZone: "Europe/London", memberships: ["uk", "uk-gdpr"], region: "uk-ireland" },
  { code: "IE", name: "Ireland", currency: "EUR", defaultTimeZone: "Europe/Dublin", memberships: ["eu", "eea", "gdpr-applicable"], region: "uk-ireland" },
  { code: "DE", name: "Germany", currency: "EUR", defaultTimeZone: "Europe/Berlin", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "FR", name: "France", currency: "EUR", defaultTimeZone: "Europe/Paris", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "NL", name: "Netherlands", currency: "EUR", defaultTimeZone: "Europe/Amsterdam", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "ES", name: "Spain", currency: "EUR", defaultTimeZone: "Europe/Madrid", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "IT", name: "Italy", currency: "EUR", defaultTimeZone: "Europe/Rome", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "PL", name: "Poland", currency: "EUR", defaultTimeZone: "Europe/Warsaw", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "BE", name: "Belgium", currency: "EUR", defaultTimeZone: "Europe/Brussels", memberships: ["eu", "eea", "gdpr-applicable"], region: "europe" },
  { code: "SE", name: "Sweden", currency: "SEK", defaultTimeZone: "Europe/Stockholm", memberships: ["eu", "eea", "gdpr-applicable"], region: "nordics" },
  { code: "DK", name: "Denmark", currency: "DKK", defaultTimeZone: "Europe/Copenhagen", memberships: ["eu", "eea", "gdpr-applicable"], region: "nordics" },
  { code: "FI", name: "Finland", currency: "EUR", defaultTimeZone: "Europe/Helsinki", memberships: ["eu", "eea", "gdpr-applicable"], region: "nordics" },
  // EEA-but-not-EU. These three get EEA privacy content *and* EFTA trade context.
  { code: "NO", name: "Norway", currency: "NOK", defaultTimeZone: "Europe/Oslo", memberships: ["eea", "efta", "gdpr-applicable"], region: "nordics" },
  { code: "IS", name: "Iceland", currency: "EUR", defaultTimeZone: "Atlantic/Reykjavik", memberships: ["eea", "efta", "gdpr-applicable"], region: "nordics" },
  { code: "LI", name: "Liechtenstein", currency: "CHF", defaultTimeZone: "Europe/Vaduz", memberships: ["eea", "efta", "gdpr-applicable"], region: "europe" },
  // EFTA but not EEA: Swiss data protection is its own regime, not a substitute EEA conclusion.
  { code: "CH", name: "Switzerland", currency: "CHF", defaultTimeZone: "Europe/Zurich", memberships: ["efta", "swiss-fadp"], region: "europe" },
  { code: "AU", name: "Australia", currency: "AUD", defaultTimeZone: "Australia/Sydney", memberships: [], region: "apac" },
  { code: "SG", name: "Singapore", currency: "SGD", defaultTimeZone: "Asia/Singapore", memberships: [], region: "apac" },
  { code: "AE", name: "United Arab Emirates", currency: "USD", defaultTimeZone: "Asia/Dubai", memberships: [], region: "other" },
  { code: "IN", name: "India", currency: "INR", defaultTimeZone: "Asia/Kolkata", memberships: [], region: "apac" },
  { code: "OTHER", name: "Other country", currency: "USD", defaultTimeZone: "UTC", memberships: [], region: "other" },
  { code: "UNKNOWN", name: "Not sure yet", currency: "USD", defaultTimeZone: "UTC", memberships: [], region: "other" },
];

const BY_CODE = new Map(COUNTRIES.map((country) => [country.code, country]));

export const findCountry = (code: string): CountryRecord | undefined => BY_CODE.get(code);

export const hasMembership = (code: string, membership: Membership): boolean =>
  findCountry(code)?.memberships.includes(membership) ?? false;

/**
 * The display currency a country suggests. The user can change it: display
 * currency, HQ currency and the currency someone is actually paid in are three
 * different things, and the model keeps them apart.
 */
export const suggestedCurrency = (code: string): CurrencyCode => findCountry(code)?.currency ?? "USD";

/** True when the code names a real country rather than a placeholder. */
export const isResolvedCountry = (code: string): boolean =>
  code !== "OTHER" && code !== "UNKNOWN" && BY_CODE.has(code);

/** Grouped for the compact selector. Order is stable. */
export const COUNTRY_GROUPS: { label: string; region: CountryRecord["region"] }[] = [
  { label: "North America", region: "north-america" },
  { label: "UK & Ireland", region: "uk-ireland" },
  { label: "Europe", region: "europe" },
  { label: "Nordics", region: "nordics" },
  { label: "Asia Pacific", region: "apac" },
  { label: "Other", region: "other" },
];
