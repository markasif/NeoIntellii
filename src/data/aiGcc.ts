/**
 * Single source of truth for the AI GCC section: routes, subnav labels,
 * breadcrumb names, per-page CTA labels and lead-form service interest.
 *
 * Everything that renders an AI GCC link (subnav, hub cards, related links,
 * footer, tests) reads from here so a route can never drift between surfaces.
 */

export const AI_GCC_HUB_PATH = "/services/ai-gcc";

export type AiGccPageKey =
  | "overview"
  | "advisory"
  | "setup"
  | "genai"
  | "data"
  | "mlops"
  | "governance"
  | "infrastructure";

export interface AiGccPage {
  key: AiGccPageKey;
  path: string;
  /** Short label used in the subnav. */
  navLabel: string;
  /** Visible service name. Used for breadcrumbs, cards and related links. */
  name: string;
  /** One-line description used on hub cards and related-link cards. */
  summary: string;
  /** Descriptive anchor text for internal links (never "Learn more"). */
  anchor: string;
  /** The one contextual CTA label for the page. */
  ctaLabel: string;
  /** Shortened CTA label for mobile screens to stay on one single line. */
  mobileCtaLabel?: string;
  /** Lead-form / analytics service interest value. */
  serviceInterest: string;
}

export const AI_GCC_PAGES: AiGccPage[] = [
  {
    key: "overview",
    path: AI_GCC_HUB_PATH,
    navLabel: "Overview",
    name: "AI GCC",
    summary: "Build and operate your AI GCC in India with one operating partner for strategy, hiring, people operations, infrastructure, AI engineering and governance.",
    anchor: "Explore AI GCC in India",
    ctaLabel: "Plan My AI GCC",
    mobileCtaLabel: "Plan My AI GCC",
    serviceInterest: "AI GCC",
  },
  {
    key: "advisory",
    path: `${AI_GCC_HUB_PATH}/ai-advisory-strategy`,
    navLabel: "AI Advisory",
    name: "AI Advisory",
    summary: "AI maturity, GCC mandate, use-case portfolio, operating model, talent architecture and a value roadmap measured in business outcomes.",
    anchor: "Explore AI Advisory & GCC Design",
    ctaLabel: "Discuss My AI GCC Strategy",
    mobileCtaLabel: "Discuss AI GCC Strategy",
    serviceInterest: "AI Advisory",
  },
  {
    key: "setup",
    path: `${AI_GCC_HUB_PATH}/setup-operations`,
    navLabel: "Setup & Operations",
    name: "Setup & Operations",
    summary: "Entity coordination, Hiring OS, people operations, workspace, IT, cloud and GPU, AI platform, governance and the path from managed to captive.",
    anchor: "Explore AI GCC Setup & Operations",
    ctaLabel: "Plan My AI GCC Setup",
    mobileCtaLabel: "Plan AI GCC Setup",
    serviceInterest: "AI GCC Setup",
  },
  {
    key: "genai",
    path: `${AI_GCC_HUB_PATH}/generative-ai`,
    navLabel: "GenAI & Agents",
    name: "Generative & Agentic AI",
    summary: "Enterprise RAG, copilots, agentic AI, model adaptation, evaluation and production engineering inside your GCC.",
    anchor: "Explore Generative & Agentic AI",
    ctaLabel: "Discuss a Production AI Use Case",
    mobileCtaLabel: "Discuss Production AI",
    serviceInterest: "Agentic AI",
  },
  {
    key: "data",
    path: `${AI_GCC_HUB_PATH}/data-engineering`,
    navLabel: "Data Engineering",
    name: "Data Engineering",
    summary: "The AI-ready data foundation: platform architecture, pipelines, reusable data products, vector infrastructure, lineage and data FinOps.",
    anchor: "Explore Data Engineering for AI GCCs",
    ctaLabel: "Assess My AI Data Foundation",
    mobileCtaLabel: "Assess Data Foundation",
    serviceInterest: "Data Engineering",
  },
  {
    key: "mlops",
    path: `${AI_GCC_HUB_PATH}/mlops`,
    navLabel: "MLOps & AgentOps",
    name: "MLOps, LLMOps & AgentOps",
    summary: "The production operating layer for models, LLM applications and agents: CI/CD, evaluation, observability, cost and governance integration.",
    anchor: "Explore MLOps, LLMOps & AgentOps",
    ctaLabel: "Review My AI Production Stack",
    mobileCtaLabel: "Review AI Stack",
    serviceInterest: "MLOps & AgentOps",
  },
  {
    key: "governance",
    path: `${AI_GCC_HUB_PATH}/responsible-ai`,
    navLabel: "AI Governance",
    name: "AI Governance & Responsible AI",
    summary: "AI inventory, risk classification, model and agent governance, evaluation, controls, monitoring and audit evidence.",
    anchor: "Explore AI Governance & Responsible AI",
    ctaLabel: "Assess My AI Governance",
    mobileCtaLabel: "Assess AI Governance",
    serviceInterest: "AI Governance",
  },
  {
    key: "infrastructure",
    path: `${AI_GCC_HUB_PATH}/ai-infrastructure-gpu`,
    navLabel: "AI Infrastructure & GPU",
    name: "AI Infrastructure & GPU",
    summary: "Cloud, reserved and dedicated GPU, developer environments, training and inference infrastructure, storage, networking and AI FinOps.",
    anchor: "Explore AI Infrastructure & GPU",
    ctaLabel: "Plan My AI Infrastructure",
    mobileCtaLabel: "Plan AI Infrastructure",
    serviceInterest: "AI Infrastructure & GPU",
  },
];

export const AI_GCC_PAGE_BY_KEY = Object.fromEntries(AI_GCC_PAGES.map((page) => [page.key, page])) as Record<AiGccPageKey, AiGccPage>;

export const AI_GCC_PATHS = AI_GCC_PAGES.map((page) => page.path);

export const getAiGccPage = (key: AiGccPageKey) => AI_GCC_PAGE_BY_KEY[key];

/** Pages outside the AI GCC folder that the section links to contextually. */
export const AI_GCC_CONTEXT_LINKS = {
  microGcc: { path: "/services/micro-gcc", name: "AI Micro GCC", anchor: "Explore AI Micro GCC" },
  aiDataRecruitment: { path: "/services/ai-data-recruitment", name: "AI & Data Recruitment", anchor: "Explore AI/Data Recruitment" },
  talentAcquisition: { path: "/services/ai-talent-acquisition", name: "Recruitment Hub & NeoHireX Hiring OS", anchor: "Explore the Recruitment Hub & Hiring OS" },
  talentManagement: { path: "/services/gcc-operations/workforce-strategy", name: "GCC Workforce Strategy", anchor: "Explore GCC Workforce Strategy" },
  peopleOperations: { path: "/services/gcc-operations/people-hr-operations", name: "People & HR Operations", anchor: "Explore People & HR Operations" },
  technologyInfrastructure: { path: "/services/gcc-operations/workplace-it-security", name: "Workplace, IT & Security", anchor: "Explore Workplace, IT & Security" },
  operationsExcellence: { path: "/services/gcc-operations/service-management-performance", name: "GCC Service Management & Performance", anchor: "Explore GCC Service Management & Performance" },
  gccServices: { path: "/services/gcc", name: "GCC Services", anchor: "Explore GCC Services" },
  gccAsAService: { path: "/gcc-as-a-service", name: "Managed GCC & Build-Operate-Transfer", anchor: "Explore Managed GCC & BOT" },
  blueprint: { path: "/blueprint", name: "GCC Blueprint", anchor: "Explore the GCC Blueprint" },
  costCalculator: { path: "/gcc-cost-calculator", name: "GCC Cost Calculator", anchor: "Estimate cost with the GCC Cost Calculator" },
  roiEstimator: { path: "/gcc-roi-estimator", name: "GCC ROI Estimator", anchor: "Model value with the GCC ROI Estimator" },
  readiness: { path: "/gcc-readiness-assessment", name: "GCC Readiness Assessment", anchor: "Take the GCC Readiness Assessment" },
  aiStartups: { path: "/gcc-for-ai-startups", name: "GCC for AI Startups", anchor: "Build your AI engineering team in India" },
  about: { path: "/about", name: "About NeoIntelli", anchor: "About NeoIntelli" },
} as const;

/**
 * The nine operating engines of one AI GCC. Rendered on the hub and reused by
 * the setup page so the model reads the same everywhere.
 */
export interface OperatingEngine {
  title: string;
  body: string;
  links: { path: string; anchor: string }[];
}

export const OPERATING_ENGINES: OperatingEngine[] = [
  {
    title: "AI Advisory & GCC Design",
    body: "AI maturity assessment, GCC mandate, business case, target operating model, value roadmap and governance design.",
    links: [{ path: AI_GCC_PAGE_BY_KEY.advisory.path, anchor: AI_GCC_PAGE_BY_KEY.advisory.anchor }],
  },
  {
    title: "GCC Setup & Operations",
    body: "Location strategy, entity coordination, launch planning, operating cadence and day-to-day running of the center.",
    links: [{ path: AI_GCC_PAGE_BY_KEY.setup.path, anchor: AI_GCC_PAGE_BY_KEY.setup.anchor }],
  },
  {
    title: "Recruitment Hub + NeoHireX Hiring OS",
    body: "Specialist AI and Data recruiting, AI screening and first-round interviews, senior technical validation, executive hiring and offer support.",
    links: [
      { path: AI_GCC_CONTEXT_LINKS.aiDataRecruitment.path, anchor: AI_GCC_CONTEXT_LINKS.aiDataRecruitment.anchor },
      { path: AI_GCC_CONTEXT_LINKS.talentAcquisition.path, anchor: AI_GCC_CONTEXT_LINKS.talentAcquisition.anchor },
    ],
  },
  {
    title: "People & HR Operations",
    body: "Employment support, onboarding, payroll coordination, benefits, HR operations, engagement, learning, performance support and retention after the hire.",
    links: [
      { path: AI_GCC_CONTEXT_LINKS.talentManagement.path, anchor: AI_GCC_CONTEXT_LINKS.talentManagement.anchor },
      { path: AI_GCC_CONTEXT_LINKS.operationsExcellence.path, anchor: AI_GCC_CONTEXT_LINKS.operationsExcellence.anchor },
    ],
  },
  {
    title: "Workspace, IT & Security",
    body: "Workspace, end-user computing, identity, zero-trust baseline, connectivity, service tooling and compliance-ready controls.",
    links: [{ path: AI_GCC_CONTEXT_LINKS.technologyInfrastructure.path, anchor: AI_GCC_CONTEXT_LINKS.technologyInfrastructure.anchor }],
  },
  {
    title: "AI Infrastructure & GPU",
    body: "Developer environments, cloud, reserved or dedicated GPU where justified, training, fine-tuning and inference infrastructure, storage, networking and AI FinOps.",
    links: [{ path: AI_GCC_PAGE_BY_KEY.infrastructure.path, anchor: AI_GCC_PAGE_BY_KEY.infrastructure.anchor }],
  },
  {
    title: "Data, GenAI & AI Engineering",
    body: "Data platforms and products, enterprise RAG, copilots, AI agents and AI applications built for production.",
    links: [
      { path: AI_GCC_PAGE_BY_KEY.data.path, anchor: AI_GCC_PAGE_BY_KEY.data.anchor },
      { path: AI_GCC_PAGE_BY_KEY.genai.path, anchor: AI_GCC_PAGE_BY_KEY.genai.anchor },
    ],
  },
  {
    title: "MLOps, AgentOps & Governance",
    body: "Model, prompt and agent lifecycle, continuous evaluation, observability, AI inventory, risk classification and audit evidence.",
    links: [
      { path: AI_GCC_PAGE_BY_KEY.mlops.path, anchor: AI_GCC_PAGE_BY_KEY.mlops.anchor },
      { path: AI_GCC_PAGE_BY_KEY.governance.path, anchor: AI_GCC_PAGE_BY_KEY.governance.anchor },
    ],
  },
  {
    title: "Scale, BOT & Ownership",
    body: "Managed GCC, EOR-first launch, Build-Operate-Transfer and captive ownership, with expansion from one squad into multiple capabilities.",
    links: [
      { path: AI_GCC_CONTEXT_LINKS.gccAsAService.path, anchor: AI_GCC_CONTEXT_LINKS.gccAsAService.anchor },
      { path: AI_GCC_CONTEXT_LINKS.microGcc.path, anchor: AI_GCC_CONTEXT_LINKS.microGcc.anchor },
    ],
  },
];

/**
 * Editorial reviewer shown on AI GCC pages. Published with no job title and no
 * company, matching the leadership profiles on
 * src/components/landing/india-engineering-squad/leadership.ts, which name
 * Karthick Raju with no role either. Leave `role` unset.
 * Update reviewedOn whenever the section content is materially revised.
 */
export const AI_GCC_EXPERT_REVIEW = {
  name: "Karthick Raju",
  profileUrl: "https://www.linkedin.com/in/karthick-raju/",
  reviewedOn: "2026-09-04",
} as const;
