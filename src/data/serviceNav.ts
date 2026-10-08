import {
  Sparkles, Users, Brain, Building2, Rocket, Settings2,
  Repeat, UserCheck, Calculator, Compass, Map as MapIcon,
  type LucideIcon,
} from "lucide-react";

/**
 * The service taxonomy: six pillars, each with an overview page and its
 * sub-pages. This is the single source of truth for the "What We Do" and
 * "Solutions" mega menus and for the footer service columns, so a route can
 * never drift between navigation surfaces.
 *
 * STATUS FIELD
 * ------------
 * Three pillars were built in parallel on their own branches and are not in
 * this branch yet. Their links are declared here (so the navigation carries
 * the agreed structure) and marked `pending` with the branch that delivers
 * them. `src/test/serviceNav.test.ts` checks every status against the route
 * registry: when a branch merges, the test fails and tells you to flip the
 * flag, so no link is silently wrong in either direction.
 */
export type NavStatus = "live" | "pending";

export interface ServiceNavLink {
  label: string;
  href: string;
  status: NavStatus;
  /** Branch that delivers a pending page. */
  source?: string;
}

export interface ServicePillar {
  /** Menu column heading and footer heading. */
  name: string;
  /** Overview page. Rendered as the first "Overview" link in each column. */
  href: string;
  status: NavStatus;
  source?: string;
  /** One line used on the "What We Do" cards. */
  blurb: string;
  icon: LucideIcon;
  /** Sub-pages, excluding the overview. */
  links: ServiceNavLink[];
}


const live = (label: string, href: string): ServiceNavLink => ({ label, href, status: "live" });

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    name: "AI GCC",
    href: "/services/ai-gcc",
    status: "live",
    blurb: "Build and operate an AI capability center in India under one operating model, from one squad to a full GCC.",
    icon: Building2,
    links: [
      live("AI Advisory & Strategy", "/services/ai-gcc/ai-advisory-strategy"),
      live("AI GCC Setup & Operations", "/services/ai-gcc/setup-operations"),
      live("Generative & Agentic AI for GCCs", "/services/ai-gcc/generative-ai"),
      live("Data Engineering for AI GCCs", "/services/ai-gcc/data-engineering"),
      live("MLOps, LLMOps & AgentOps for GCCs", "/services/ai-gcc/mlops"),
      live("AI Governance & Responsible AI", "/services/ai-gcc/responsible-ai"),
      live("AI Infrastructure & GPU", "/services/ai-gcc/ai-infrastructure-gpu"),
    ],
  },
  {
    name: "AI Talent",
    href: "/services/ai-talent",
    status: "live",
    blurb: "Technically validated GenAI, ML, Data and MLOps talent, from one specialist hire to a complete AI team.",
    icon: Brain,
    links: [
      live("AI & ML Recruitment", "/services/ai-talent/ai-ml-recruitment"),
      live("GenAI & Agentic AI Hiring", "/services/ai-talent/genai-agentic-ai-hiring"),
      live("Data Engineering & Data Science Hiring", "/services/ai-talent/data-engineering-data-science-hiring"),
      live("MLOps & AI Platform Hiring", "/services/ai-talent/mlops-ai-platform-hiring"),
      live("AI Leadership & Executive Search", "/services/ai-talent/ai-leadership-executive-search"),
      live("AI Recruitment Hub + NeoHireX", "/services/ai-talent/recruitment-hub"),
      live("AI Talent Academy & Reskilling", "/services/ai-talent/ai-reskilling-academy"),
    ],
  },
  {
    name: "AI Engineering",
    href: "/services/ai-engineering",
    status: "live",
    blurb: "Build production AI: generative and agentic systems, applied ML, data, products and the operations around them.",
    icon: Sparkles,
    links: [
      live("Generative & Agentic AI", "/services/ai-engineering/generative-agentic-ai"),
      live("Applied AI & Machine Learning", "/services/ai-engineering/applied-ai-ml"),
      live("AI Data Engineering", "/services/ai-engineering/data-engineering"),
      live("AI Product Engineering", "/services/ai-engineering/ai-product-engineering"),
      live("AI Agents & Automation", "/services/ai-engineering/ai-agents-automation"),
      live("MLOps, LLMOps & AgentOps", "/services/ai-engineering/mlops-llmops-agentops"),
      live("AI Evaluation & Assurance", "/services/ai-engineering/ai-evaluation-assurance"),
    ],
  },
  {
    name: "AI Delivery Teams",
    href: "/services/ai-delivery-teams",
    status: "live",
    blurb: "Senior-led AI squads that deliver inside your operating model, with a path to transferring the team to you.",
    icon: Users,
    links: [
      live("Dedicated AI Engineering Team", "/services/ai-delivery-teams/dedicated-ai-engineering-team"),
      live("AI Delivery Pod", "/services/ai-delivery-teams/ai-delivery-pod"),
      live("Forward-Deployed AI Engineers", "/services/ai-delivery-teams/forward-deployed-ai-engineers"),
      live("AI Team Build & Transfer", "/services/ai-delivery-teams/ai-team-transfer"),
    ],
  },
  {
    name: "GCC Strategy & Setup",
    href: "/services/gcc",
    status: "live",
    blurb: "Business case, location, entity and launch for a new India capability center, or the modernization of an existing one.",
    icon: Rocket,
    links: [
      live("GCC Strategy & Business Case", "/services/gcc/strategy-business-case"),
      live("GCC Location Strategy", "/services/gcc/location-strategy"),
      live("GCC Setup & Launch", "/services/gcc/setup-launch"),
      live("GCC Modernization & Transformation", "/services/gcc/modernization-transformation"),
      live("AI Micro GCC", "/services/micro-gcc"),
    ],
  },
  {
    name: "GCC Operations",
    href: "/services/gcc-operations",
    status: "live",
    blurb: "Run the center day to day: people, workplace, service performance, governance, transition and expansion.",
    icon: Settings2,
    links: [
      live("People & HR Operations", "/services/gcc-operations/people-hr-operations"),
      live("GCC Workforce Strategy", "/services/gcc-operations/workforce-strategy"),
      live("Workplace, IT & Security", "/services/gcc-operations/workplace-it-security"),
      live("Service Management & Performance", "/services/gcc-operations/service-management-performance"),
      live("Governance & Compliance", "/services/gcc-operations/governance-compliance"),
      live("BOT & Transition", "/services/gcc-operations/bot-transition"),
      live("Scale & Expansion", "/services/gcc-operations/scale-expansion"),
    ],
  },
];

/** Every navigable path in the taxonomy, overviews included. */
export const serviceNavEntries = (): ServiceNavLink[] =>
  SERVICE_PILLARS.flatMap((pillar) => [
    { label: pillar.name, href: pillar.href, status: pillar.status, source: pillar.source },
    ...pillar.links,
  ]);

/**
 * Live pages the six pillars do not cover yet. Two of the parallel branches
 * retire some of these (Technology Solutions, and the operations pages under
 * /services/gcc), so this column is transitional: delete an entry once the
 * branch that replaces it has merged and redirected the old URL. It exists so
 * that pages still in the sitemap keep a crawlable link from the footer.
 */
export const TRANSITIONAL_LINKS = [
  { label: "Recruitment Hub", href: "/recruitment" },
  { label: "Contract & Contract-to-Hire", href: "/recruitment/contract-staffing" },
];

/** Resources column, shared by the footer and the "What We Do" featured card. */
export const RESOURCE_LINKS = [
  { label: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
  { label: "GCC ROI Estimator", href: "/gcc-roi-estimator" },
  { label: "GCC Readiness Assessment", href: "/gcc-readiness-assessment" },
  { label: "GCC Blueprint", href: "/blueprint" },
  { label: "GCC Cost Guide", href: "/gcc-india-cost" },
  { label: "GCC FAQ", href: "/gcc-faq" },
];

export interface FooterColumn {
  heading: string;
  links: { name: string; href: string }[];
}

/**
 * Footer service columns: the six pillars, the transitional pages and the
 * resource tools. Built here rather than in the Footer component so the menus,
 * the footer and the tests all read the same structure.
 */
export const FOOTER_SERVICE_COLUMNS: FooterColumn[] = [
  ...SERVICE_PILLARS.map((pillar) => ({
    heading: pillar.name,
    links: [
      { name: "Overview", href: pillar.href },
      ...pillar.links.map((link) => ({ name: link.label, href: link.href })),
    ],
  })),
  { heading: "More Services", links: TRANSITIONAL_LINKS.map((link) => ({ name: link.label, href: link.href })) },
  { heading: "Resources", links: RESOURCE_LINKS.map((link) => ({ name: link.label, href: link.href })) },
];

/* ------------------------------------------------------------------------- *
 * SOLUTIONS
 * ------------------------------------------------------------------------- */

/**
 * "Solutions" answers a different question from "What We Do". The pillars above
 * describe the capabilities NeoIntelli provides; the nine entries below are
 * entry points named after the problem, outcome or starting point a buyer
 * arrives with. They are deliberately curated, not a second copy of the service
 * taxonomy - the full taxonomy stays reachable from the pillar overview pages
 * and from the footer.
 *
 * Every href points at a page that already exists. Nothing here creates a route
 * or a URL: a solution entry is a label on an existing canonical page.
 */
export interface SolutionLink {
  label: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  /**
   * True when the destination is an existing capability page standing in for a
   * dedicated solution landing page that has not been built yet. Tracked so the
   * follow-up phase knows exactly which three entries need their own page.
   */
  interim?: boolean;
}

export interface SolutionGroup {
  /** Section heading. Rendered uppercase by the menu, as with every column. */
  label: string;
  links: SolutionLink[];
}

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    label: "Build your AI capability",
    links: [
      {
        label: "AI Micro GCC",
        href: "/services/micro-gcc",
        desc: "Start your dedicated India AI team.",
        icon: Building2,
      },
      {
        label: "AI Delivery Pods",
        href: "/services/ai-delivery-teams/ai-delivery-pod",
        desc: "One focused team. One defined outcome.",
        icon: Users,
      },
      {
        label: "AI Team Build & Transfer",
        href: "/services/ai-delivery-teams/ai-team-transfer",
        desc: "Build now. Bring the capability in-house.",
        icon: Repeat,
      },
    ],
  },
  {
    label: "Solve an AI challenge",
    links: [
      {
        // TODO(solutions-phase-2): dedicated landing page for expert-validated
        // AI hiring. Until it exists this points at AI & ML Recruitment, the
        // page that describes practitioner-led technical validation.
        label: "Expert-Validated AI Hiring",
        href: "/services/ai-talent/ai-ml-recruitment",
        desc: "Hire AI engineers assessed by practitioners.",
        icon: UserCheck,
        interim: true,
      },
      {
        // TODO(solutions-phase-2): dedicated pilot-to-production landing page.
        // Forward-Deployed AI Engineers is the closest existing destination -
        // its stated trigger is "a pilot exists but will not reach production".
        label: "AI Pilot to Production",
        href: "/services/ai-delivery-teams/forward-deployed-ai-engineers",
        desc: "Turn an existing AI pilot into a production system.",
        icon: Rocket,
        interim: true,
      },
      {
        // TODO(solutions-phase-2): dedicated AI CoE landing page. GCC
        // Modernization & Transformation is the existing page about adding AI
        // and data capability inside a center that already operates.
        label: "AI CoE for Existing GCCs",
        href: "/services/gcc/modernization-transformation",
        desc: "Build AI capability inside your existing center.",
        icon: Brain,
        interim: true,
      },
    ],
  },
  {
    label: "Plan your GCC",
    links: [
      {
        label: "GCC Cost Calculator",
        href: "/gcc-cost-calculator",
        desc: "Estimate the cost of your India team.",
        icon: Calculator,
      },
      {
        label: "GCC Readiness Assessment",
        href: "/gcc-readiness-assessment",
        desc: "Find your best starting model.",
        icon: Compass,
      },
      {
        label: "GCC Blueprint",
        href: "/blueprint",
        desc: "Define your team, economics and launch plan.",
        icon: MapIcon,
      },
    ],
  },
];

/** Flat list of the nine solution entries. */
export const solutionEntries = (): SolutionLink[] => SOLUTION_GROUPS.flatMap((group) => group.links);
