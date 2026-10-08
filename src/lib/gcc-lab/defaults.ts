/**
 * Default cost assumptions for the Decision Lab.
 *
 * Two kinds of number live here and they are not interchangeable.
 *
 * `OPERATING_BANDS` are the planning assumptions the site already publishes on
 * /gcc-cost-calculator, restated once so the calculator and the lab cannot
 * drift apart. Their low and high values are the calculator's existing
 * constants, which is what makes the two routes reconcile.
 *
 * `NOT_BUDGETED` names the cost lines the lab knows a real programme has but
 * for which NeoIntelli has no approved planning figure yet. They default to
 * zero *and* to an exclusion note, so the total never quietly pretends the
 * cost is nil. A visitor can enter their own figure for any of them; until
 * they do, the estimate says out loud that it is incomplete.
 */

import type { CostCategory } from "./types";

export interface AssumptionBand {
  low: number;
  base: number;
  high: number;
}

export type BandSelector = "low" | "base" | "high";

export const pick = (band: AssumptionBand, selector: BandSelector): number => band[selector];

/**
 * Planning bands, in the benchmark currency (USD) unless the name says otherwise.
 *
 * The low and high figures for benefits, workspace, IT operations, the partner
 * fee and fractional leadership are the constants in src/data/gccCostData.ts.
 * Change them there, not here.
 */
export const OPERATING_BANDS = {
  /** Fraction added to a base salary to reach India CTC. 30-35%. */
  benefitsRate: { low: 0.3, base: 0.325, high: 0.35 } as AssumptionBand,
  /** Workspace and equipment provision, per seat per month. */
  workspacePerSeatMonthly: { low: 200, base: 275, high: 350 } as AssumptionBand,
  /** IT, security and compliance operations, per seat per month. */
  itSecurityPerSeatMonthly: { low: 75, base: 100, high: 125 } as AssumptionBand,
  /** Managed-engagement fee, per seat per month. */
  partnerFeePerSeatMonthly: { low: 200, base: 300, high: 400 } as AssumptionBand,
  /** Fractional AI leadership retainer, per month, flat - not per seat. */
  fractionalLeadershipMonthly: { low: 1500, base: 2000, high: 2500 } as AssumptionBand,
  /**
   * Annual salary step-up, applied on each scenario anniversary.
   * A planning assumption, not a measured market increment.
   */
  salaryEscalation: { low: 0.05, base: 0.08, high: 0.12 } as AssumptionBand,
} as const;

/**
 * Published figures a visitor can adopt for the two assumptions that most
 * change a five-year number and that NeoIntelli has no data of its own for.
 *
 * These are NOT the model's defaults. They are offered as one-click anchors
 * next to the field, each labelled with what it actually covers, because a
 * sourced figure the visitor chose beats an unsourced one the model picked -
 * and because the scope caveats matter: an all-industry India increase is not
 * a GCC increase, and "technology consulting" is not an in-house capability
 * centre.
 */
export interface PublishedAnchor {
  id: string;
  label: string;
  /** The value, as a fraction. */
  value: number;
  sourceId: string;
  /** What the figure covers, and what it does not. Shown with the option. */
  scope: string;
}

export const ESCALATION_ANCHORS: PublishedAnchor[] = [
  {
    id: "aon-all-industry",
    label: "9.1% - India, all industries",
    value: 0.091,
    sourceId: "aon-salary-increase",
    scope:
      "The projected 2026 India salary increase across all industries, per the cited consultancy study. Not GCC-specific and not role-specific; specialist AI hiring can run well above an all-industry average.",
  },
  {
    id: "aon-technology",
    label: "6.8% - technology consulting",
    value: 0.068,
    sourceId: "aon-salary-increase",
    scope:
      "The cited study's reported figure for technology consulting, the lowest-growth sector in that study. An in-house capability centre is not a consultancy, so treat this as the low end rather than as your sector.",
  },
];

export const ATTRITION_ANCHORS: PublishedAnchor[] = [
  {
    id: "aon-attrition",
    label: "16.5% - India, trending",
    value: 0.165,
    sourceId: "aon-salary-increase",
    scope:
      "The cited study reports Indian attrition declining from a 2022 peak of 21.4% towards roughly 16.5%. All-industry, not GCC-specific, and a new centre's first two years are not a steady state.",
  },
];

/** Multiplier on workspace cost by work model. A planning assumption. */
export const WORK_MODEL_WORKSPACE_FACTOR = {
  office: 1,
  hybrid: 0.6,
  remote: 0.15,
} as const;

/**
 * Cost lines with no approved default. Zero here means "not budgeted", and
 * every one of them is reported as an exclusion until the visitor supplies a
 * figure. None of these is a claim that the cost does not exist.
 */
export const NOT_BUDGETED: {
  category: CostCategory;
  label: string;
  prompt: string;
  /**
   * How to actually obtain the figure.
   *
   * A blank field with no approved default is a dead end, and filling it with
   * someone else's blended number would be worse. What is left, and what a
   * practitioner would say, is who to ask and what to ask them for.
   */
  howToGetIt: string;
}[] = [
  {
    category: "recruitment",
    label: "Recruitment",
    prompt: "Agency, referral or in-house sourcing cost per hire",
    howToGetIt:
      "Ask two India recruitment agencies for their fee as a percentage of first-year CTC for one of your senior roles in your chosen city, and whether it differs for AI and data roles. Multiply by the compensation figure this model is already using.",
  },
  {
    category: "equipment",
    label: "Laptops and equipment",
    prompt: "One-off hardware cost per hire",
    howToGetIt:
      "Take your own standard developer machine spec and price it landed in India, including GST and a three-year refresh. Add anything the role needs beyond a laptop - a second monitor, a docking station, a GPU workstation.",
  },
  {
    category: "entity-legal-payroll",
    label: "Entity, legal, accounting and payroll",
    prompt: "Monthly retained cost",
    howToGetIt:
      "Ask an India corporate services firm for a monthly retainer quote covering statutory filings, bookkeeping and payroll for your planned headcount. Ask separately for the one-off incorporation cost - that belongs in initial setup, not here.",
  },
  {
    category: "travel-oversight",
    label: "Travel and HQ oversight",
    prompt: "Monthly travel and management time",
    howToGetIt:
      "Count the trips you actually expect in year one, price them, and divide by twelve. Then add the HQ management time the centre will consume - it is a real cost even though nobody invoices you for it.",
  },
  {
    category: "initial-setup",
    label: "Initial setup",
    prompt: "One-time entity and workplace setup",
    howToGetIt:
      "Incorporation and registrations, plus a workspace deposit and fit-out if you are taking your own space. Your corporate services firm and a commercial agent in the city can each quote their half.",
  },
  {
    category: "transition",
    label: "Transition",
    prompt: "Knowledge transfer, overlap and handover",
    howToGetIt:
      "Only applies if you are moving existing work. Estimate the HQ hours that go into handover, price them at loaded cost, and add any retention or severance you expect on the outgoing side.",
  },
  {
    category: "ai-compute",
    label: "AI and cloud consumption",
    prompt: "Monthly budget, or GPU hours and API usage",
    howToGetIt:
      "Take one month of your current AI and cloud bill for comparable work, or price the workload directly: expected GPU hours times your negotiated rate, plus API calls times unit price. There is no reliable percentage-of-payroll shortcut.",
  },
  {
    category: "contingency",
    label: "Contingency",
    prompt: "Percentage of the running cost held back",
    howToGetIt:
      "Your own finance convention for a programme at this stage of certainty. State it explicitly rather than padding the other lines.",
  },
];

export const NOT_BUDGETED_CATEGORIES = new Set<CostCategory>(NOT_BUDGETED.map((item) => item.category));

/** Human labels for every cost category, used by the table, PDF and CSV alike. */
export const CATEGORY_LABELS: Record<CostCategory, string> = {
  talent: "Talent compensation",
  "incremental-benefits": "Statutory and benefits top-up",
  recruitment: "Recruitment",
  workspace: "Workspace",
  equipment: "Laptops and equipment",
  "it-security-ops": "IT, security and compliance operations",
  "entity-legal-payroll": "Entity, legal, accounting and payroll",
  "partner-fees": "Operating partner fees",
  "fractional-leadership": "Fractional AI leadership",
  "travel-oversight": "Travel and HQ oversight",
  "initial-setup": "Initial setup",
  transition: "Transition",
  "ai-compute": "AI and cloud consumption",
  contingency: "Contingency",
};

/** What each category is charged on. Shown next to every fee so the base is never implicit. */
export const CATEGORY_UNIT_LABELS: Record<CostCategory, string> = {
  talent: "Per FTE, from start month",
  "incremental-benefits": "Percentage of compensation, where the basis excludes it",
  recruitment: "One-time per hire",
  workspace: "Per seat per month",
  equipment: "One-time per hire",
  "it-security-ops": "Per seat per month",
  "entity-legal-payroll": "Per month, team-wide",
  "partner-fees": "Per seat per month",
  "fractional-leadership": "Per month, flat - not per seat",
  "travel-oversight": "Per month, team-wide",
  "initial-setup": "One-time",
  transition: "One-time",
  "ai-compute": "Usage or monthly budget",
  contingency: "Percentage of the running cost",
};
