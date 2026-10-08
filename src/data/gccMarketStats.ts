/**
 * Single source of truth for India GCC market figures used anywhere on the site.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The site previously carried FY2024 totals on some pages and newer totals on
 * others, so a reader could see "1,700+ GCCs / $64.6B" on one page and a
 * different market on the next. Every current-market figure now reads from this
 * file so there is one number to change per reporting cycle.
 *
 * CLAIM GOVERNANCE
 * ----------------
 * Only figures that can be quoted from the named report edition belong here.
 * A `GCC` and a `GCC operating unit` are different metrics: 2,117 companies run
 * 3,728 units, because the average GCC now operates from more than one site.
 * Never label a unit count as a count of companies.
 *
 * Source: India GCC Landscape Report 2026 ("The GCC Value
 * Orbit"), published May 2026, data as of March 2026 / FY2026.
 */

export const GCC_MARKET_SOURCE = "India GCC Landscape Report 2026 (industry research)";
export const GCC_MARKET_SOURCE_URL =
  "https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/";
export const GCC_MARKET_PERIOD = "FY2026";
export const GCC_MARKET_AS_OF = "March 2026";
export const GCC_MARKET_LAST_CHECKED = "Sep 2026";

export const gccMarketStats = {
  /** Reporting period the figures describe. */
  period: GCC_MARKET_PERIOD,
  /** Point in time the underlying data was collected. */
  asOf: GCC_MARKET_AS_OF,
  /** When NeoIntelli last verified these against the published report. */
  lastChecked: GCC_MARKET_LAST_CHECKED,
  sourceName: GCC_MARKET_SOURCE,
  sourceUrl: GCC_MARKET_SOURCE_URL,

  /** Unique GCC parent organisations operating in India. */
  gccCount: 2117,
  gccCountLabel: "2,117",
  /** Physical operating units those GCCs run. Not a company count. */
  unitCount: 3728,
  unitCountLabel: "3,728",
  /** People employed across the India GCC ecosystem. */
  workforce: 2_360_000,
  workforceLabel: "2.36M",
  /** Estimated FY2026 revenue of the India GCC ecosystem, USD. */
  revenueUsdBillions: 98.4,
  revenueLabel: "$98.4B",
  /** Companies from the global top-2000 list operating an India GCC. */
  forbesG2000: 506,
  forbesG2000Label: "506",
} as const;

export interface GccStatCard {
  value: string;
  label: string;
  /** Short context so a number is never read out of the metric it describes. */
  context?: string;
}

/**
 * The four-card strip used wherever the site states the current India GCC
 * market. Use this verbatim rather than restating the numbers inline.
 */
export const GCC_MARKET_STAT_CARDS: GccStatCard[] = [
  { value: gccMarketStats.gccCountLabel, label: "GCCs in India", context: "Unique parent organisations" },
  { value: gccMarketStats.unitCountLabel, label: "GCC operating units", context: "Sites, not companies" },
  { value: gccMarketStats.workforceLabel, label: "GCC professionals", context: "Installed talent base" },
  { value: gccMarketStats.revenueLabel, label: `${GCC_MARKET_PERIOD} GCC revenue`, context: "Estimated ecosystem revenue" },
];

/** Optional fifth card, for strips that have room for it. */
export const GCC_FORBES_STAT_CARD: GccStatCard = {
  value: gccMarketStats.forbesG2000Label,
  label: "Of the world's 2,000 largest public companies, with India GCCs",
};

/**
 * City-level GCC OPERATING UNITS for FY26 — again, units and not companies.
 * Bengaluru alone accounts for a little over 29% of all India GCC units.
 */
export interface GccCityUnits {
  city: string;
  units: string;
}

export const GCC_CITY_UNITS: GccCityUnits[] = [
  { city: "Bengaluru", units: "1,080+" },
  { city: "Hyderabad", units: "515+" },
  { city: "NCR", units: "490+" },
  { city: "Pune", units: "475+" },
  { city: "Chennai", units: "405+" },
  { city: "Mumbai", units: "375+" },
];

/** Attribution line for any city-level unit figure. */
export const GCC_CITY_UNITS_NOTE =
  "These figures represent GCC operating units, not unique parent companies.";
