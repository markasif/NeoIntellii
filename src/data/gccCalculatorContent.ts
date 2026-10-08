/**
 * Copy and reference data for the GCC cost calculator (public page and the
 * paid /lp/ variant). Kept out of gccCostData.ts, which is the rate engine's
 * own inputs: everything here is presentation or a published benchmark we
 * quote, not a number the estimate is computed from.
 */

import type { CityKey } from "./gccCostData";

/**
 * Shown under the live preview. Update it whenever the salary bands in
 * gccCostData.ts change - the sentence is a claim about those bands.
 */
export const RATES_UPDATED = "September 2026";

/**
 * US total-compensation ranges, annual USD, as published on /gcc-india-cost.
 * Used only for the "equivalent US team" comparison - never for the India
 * estimate.
 *
 * `null` means the role has no published range yet. Those seats fall back to
 * the site's existing US_COST_MULTIPLIER model and the UI says so, rather than
 * quoting a benchmark nobody published. Replace a null with a real range as
 * soon as one is confirmed and the footnote disappears on its own.
 */
export const US_ROLE_RANGES: Record<string, [number, number] | null> = {
  ai: [150_000, 250_000], // AI/ML Engineer
  ml: [150_000, 250_000], // AI/ML Engineer
  dataeng: [130_000, 200_000], // Data Engineer
  fullstack: [120_000, 180_000], // Full-Stack Engineer
  devops: [130_000, 190_000], // DevOps Engineer
  qa: [100_000, 150_000], // QA/SDET
  // Awaiting published ranges - see the handover notes in docs/.
  backend: null,
  datasci: null,
  mobile: null,
  ba: null,
  po: null,
};

/** Headline proof points. Same three the site footer carries. */
export const TRUST_STATS: { value: string; label: string }[] = [
  { value: "30+", label: "GCCs shaped" },
  { value: "48h", label: "First response" },
  { value: "100%", label: "Senior-led" },
];

/**
 * One anonymised client line for the trust strip. Left null until a line is
 * supplied and approved - an unattributed claim about client outcomes is not
 * something this file should make up.
 */
export const TRUST_CASE_LINE: string | null = null;

/**
 * The person a visitor meets on the booked call. Left null until the photo,
 * name and title are supplied.
 */
export const STRATEGY_LEAD: { name: string; title: string; photo: string } | null = null;

/** Where the "See setup costs" link goes. Anchor added on /gcc-india-cost. */
export const SETUP_COSTS_HREF = "/gcc-india-cost#legal-compliance-admin";

/**
 * The four ways a team can be held. Informational on the results step - the
 * estimate itself is priced on the managed model (see INCLUDED_LINES).
 *
 * The EOR and BOT lines come from the campaign brief; the middle two restate
 * the engagement models already described on the site. Confirm the wording
 * before the campaign goes live.
 */
export const ENGAGEMENT_CARDS: { title: string; line: string }[] = [
  { title: "Start on EOR", line: "Hire in weeks, no entity of your own required." },
  { title: "Co-owned", line: "NeoIntelli runs day-to-day operations while your leaders own the work." },
  { title: "Own from day one", line: "Your entity, your employees - we set it up and staff it." },
  { title: "Build-Operate-Transfer", line: "We build and operate, then transfer; EOR months are credited toward the BOT." },
];

/**
 * What the estimate does and does not cover. The "included" list mirrors what
 * the rate engine actually adds up (salary x benefits multiplier, infra, ops,
 * partner fee, optional SME) - keep the two in step when the engine changes.
 */
export const INCLUDED_LINES = [
  "salary",
  "statutory contributions (PF, gratuity, insurance)",
  "NeoIntelli recruiting and operations fee",
  "workspace and IT operations",
];

export const EXCLUDED_LINES = ["one-time entity setup", "office fit-out", "laptops (billed at actuals)"];

/** City order for the results comparison strip. */
export const COMPARISON_CITIES: CityKey[] = ["bengaluru", "hyderabad", "chennai", "pune"];

/** Headquarters options on the "email me this estimate" form. */
export const HQ_COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Netherlands",
  "France",
  "Switzerland",
  "Nordics",
  "Australia / New Zealand",
  "Singapore",
  "United Arab Emirates",
  "India",
  "Other",
];

export const PLANNED_START_OPTIONS = ["0 to 3 months", "3 to 6 months", "Exploring"];
