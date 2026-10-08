/**
 * Route registry for the GCC Strategy & Setup pillar.
 *
 * The parent keeps its historical URL (/services/gcc) and is repositioned as
 * "GCC Strategy & Setup". Everything under it owns one stage of the GCC
 * decision journey: decide, design, launch. Operating the center after launch
 * belongs to the GCC Operations pillar, which is being built in a parallel
 * workstream - see GCC_OPERATIONS_LINKS below for how this pillar points at it.
 */

export const GCC_STRATEGY_ROUTES = {
  overview: "/services/gcc",
  strategy: "/services/gcc/strategy-business-case",
  location: "/services/gcc/location-strategy",
  setup: "/services/gcc/setup-launch",
  modernization: "/services/gcc/modernization-transformation",
  /** Kept as a separate commercial wedge. Never moved under /services/gcc. */
  microGcc: "/services/micro-gcc",
} as const;

export type GccStrategyRouteKey = keyof typeof GCC_STRATEGY_ROUTES;

/** Shared subnav / navigation taxonomy for the pillar. Order matters. */
export const GCC_STRATEGY_NAV: Array<{ key: GccStrategyRouteKey; label: string; shortLabel?: string }> = [
  { key: "overview", label: "Overview" },
  { key: "strategy", label: "Strategy & Business Case", shortLabel: "Strategy" },
  { key: "location", label: "Location Strategy", shortLabel: "Location" },
  { key: "setup", label: "Setup & Launch", shortLabel: "Setup" },
  { key: "modernization", label: "Modernization & Transformation", shortLabel: "Modernization" },
  { key: "microGcc", label: "AI Micro GCC", shortLabel: "Micro GCC" },
];

export const GCC_STRATEGY_PILLAR_LABEL = "GCC Strategy & Setup";

/**
 * Destinations in the other NeoIntelli pillars this section links to.
 *
 * GCC Operations: the parallel GCC Operations stream is migrating the legacy
 * /services/gcc/* operating pages to /services/gcc-operations/*. Those routes
 * do not exist in this repository yet, so the entries below point at the
 * current live equivalents under the *new* taxonomy labels. When the GCC
 * Operations routes land, update the hrefs here and every page in this pillar
 * follows - no page carries its own copy of these paths. Do not add redirects
 * for the legacy routes in this pillar; that logic belongs to the GCC
 * Operations stream.
 */
export const GCC_OPERATIONS_LINKS = {
  overview: { label: "GCC Operations", href: "/services/gcc-operations" },
  botTransition: { label: "BOT & Transition", href: "/services/gcc-operations/bot-transition" },
  peopleHr: { label: "People & HR Operations", href: "/services/gcc-operations/people-hr-operations" },
  workplaceIt: { label: "Workplace, IT & Security", href: "/services/gcc-operations/workplace-it-security" },
  governance: { label: "Governance & Compliance", href: "/services/gcc-operations/governance-compliance" },
  serviceManagement: { label: "Service Management & Performance", href: "/services/gcc-operations/service-management-performance" },
} as const;

export const AI_PILLAR_LINKS = {
  aiGcc: { label: "AI GCC", href: "/services/ai-gcc" },
  /** The AI Talent pillar landed with the six-pillar navigation restructure. */
  aiTalent: { label: "AI Talent", href: "/services/ai-talent" },
  aiTalentAcquisition: { label: "AI Recruitment Hub", href: "/services/ai-talent/recruitment-hub" },
  /** The Enterprise AI Engineering pillar. */
  aiEngineering: { label: "AI Engineering", href: "/services/ai-engineering" },
} as const;

export const GCC_TOOL_LINKS = {
  costCalculator: { label: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
  costGuide: { label: "GCC Cost Guide", href: "/gcc-india-cost" },
  roiEstimator: { label: "GCC ROI Estimator", href: "/gcc-roi-estimator" },
  readiness: { label: "GCC Readiness Assessment", href: "/gcc-readiness-assessment" },
  blueprint: { label: "GCC Blueprint", href: "/blueprint" },
  gccVsOutsourcing: { label: "GCC vs Outsourcing", href: "/gcc-vs-outsourcing" },
  faq: { label: "GCC FAQ", href: "/gcc-faq" },
} as const;

/**
 * Lead-context values passed with CTAs in this pillar. They ride on the
 * existing analytics `cta_click` event and, for the Blueprint form, as hidden
 * fields on the request. No new CRM or form system is introduced.
 */
export type GccServiceInterest =
  | "GCC Strategy"
  | "GCC Business Case"
  | "GCC Location Strategy"
  | "GCC Setup & Launch"
  | "GCC Modernization"
  | "AI Micro GCC";

export interface GccLeadContext {
  source_page: string;
  service_interest: GccServiceInterest;
  cta_name: string;
}

/** Builds a Blueprint request URL that carries the lead context as query params. */
export const blueprintRequestUrl = (context: GccLeadContext) => {
  const params = new URLSearchParams({
    source_page: context.source_page,
    service_interest: context.service_interest,
    cta_name: context.cta_name,
  });
  return `${GCC_TOOL_LINKS.blueprint.href}?${params.toString()}`;
};
