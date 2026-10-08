/**
 * Single source of truth for the Enterprise AI Engineering section
 * (/services/ai-engineering and its seven child pages).
 *
 * Routes, visible names, subnav and menu labels, H1s, titles, meta
 * descriptions, CTA labels and lead-form service-interest values all live
 * here so the subnav, hub cards, related links, footer, SEO config, sitemap
 * and tests cannot drift apart.
 *
 * This section is deliberately independent of the AI GCC and AI Talent
 * sections, which are being reworked in parallel. Cross-pillar links are
 * centralised below so a destination can be retargeted in one place.
 */

export type AiEngineeringPageKey =
  | "overview"
  | "genai"
  | "applied"
  | "data"
  | "product"
  | "agents"
  | "ops"
  | "evaluation";

export interface AiEngineeringPage {
  key: AiEngineeringPageKey;
  path: string;
  /** Full visible service name, used in breadcrumbs, cards and related links. */
  name: string;
  /** Short label for the section subnavigation. */
  navLabel: string;
  /** Label used in the Services navigation and footer. */
  menuLabel: string;
  /** The page's single H1. */
  h1: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  /** One-line summary used on the hub capability grid and related cards. */
  summary: string;
  /** Primary CTA label for the page. */
  ctaLabel: string;
  /** Value passed as service_interest on CTA links and the contact form. */
  serviceInterest: string;
}

export const AI_ENGINEERING_HUB_PATH = "/services/ai-engineering";

const child = (slug: string) => `${AI_ENGINEERING_HUB_PATH}/${slug}`;

export const AI_ENGINEERING_PAGES: AiEngineeringPage[] = [
  {
    key: "overview",
    path: AI_ENGINEERING_HUB_PATH,
    name: "Enterprise AI Engineering",
    navLabel: "Overview",
    menuLabel: "Overview",
    h1: "Build AI that works in production.",
    seoTitle: "AI Engineering Services India | GenAI, ML, Data | NeoIntelli",
    metaDescription:
      "Build production AI with NeoIntelli across Generative AI, Agentic AI, machine learning, data engineering, MLOps and AI product engineering.",
    keywords: [
      "AI engineering services",
      "enterprise AI engineering",
      "enterprise AI services",
      "AI development services India",
      "production AI",
    ],
    summary:
      "Production AI systems across Generative AI, Agentic AI, machine learning and data, from proof of value to permanent capability.",
    ctaLabel: "Discuss My AI Use Case",
    serviceInterest: "AI Engineering",
  },
  {
    key: "genai",
    path: child("generative-agentic-ai"),
    name: "Generative & Agentic AI",
    navLabel: "GenAI & Agents",
    menuLabel: "Generative & Agentic AI",
    h1: "Build Generative & Agentic AI for real enterprise workflows.",
    seoTitle: "Generative & Agentic AI Development Services | NeoIntelli",
    metaDescription:
      "Build production GenAI and Agentic AI systems with RAG, AI agents, enterprise integrations, evaluation, guardrails, observability and AgentOps.",
    keywords: [
      "Generative AI development services",
      "GenAI development company",
      "Agentic AI development",
      "enterprise GenAI",
      "RAG development",
      "LLM application development",
    ],
    summary: "RAG, LLM applications, copilots and agentic systems.",
    ctaLabel: "Discuss My GenAI / Agentic Use Case",
    serviceInterest: "Generative & Agentic AI",
  },
  {
    key: "applied",
    path: child("applied-ai-ml"),
    name: "Applied AI & Machine Learning",
    navLabel: "Applied AI & ML",
    menuLabel: "Applied AI & Machine Learning",
    h1: "Applied AI & Machine Learning for business decisions.",
    seoTitle: "AI & Machine Learning Development Services | NeoIntelli",
    metaDescription:
      "Build applied AI and machine learning systems for forecasting, prediction, optimization, recommendations, anomaly detection, NLP and computer vision.",
    keywords: [
      "AI ML development services",
      "machine learning development services",
      "applied AI",
      "predictive AI services",
    ],
    summary: "Forecasting, prediction, optimization, CV, NLP and ML systems.",
    ctaLabel: "Assess My AI / ML Use Case",
    serviceInterest: "Applied AI & ML",
  },
  {
    key: "data",
    path: child("data-engineering"),
    name: "AI Data Engineering",
    navLabel: "Data Engineering",
    menuLabel: "AI Data Engineering",
    h1: "Build the data foundation your AI can trust.",
    seoTitle: "Data Engineering Services for AI | NeoIntelli",
    metaDescription:
      "Build AI-ready data platforms with pipelines, governed data products, unstructured data, vector retrieval, evaluation datasets and production data engineering.",
    keywords: [
      "data engineering services",
      "AI data engineering",
      "AI-ready data platform",
      "data platform for AI",
    ],
    summary: "Data platforms, pipelines, AI-ready data and retrieval infrastructure.",
    ctaLabel: "Assess My AI Data Foundation",
    serviceInterest: "AI Data Engineering",
  },
  {
    key: "product",
    path: child("ai-product-engineering"),
    name: "AI Product Engineering",
    navLabel: "AI Product Engineering",
    menuLabel: "AI Product Engineering",
    h1: "Build AI into the product, not beside it.",
    seoTitle: "AI Product Engineering Services | NeoIntelli",
    metaDescription:
      "Design and build AI-native products, SaaS features, copilots, semantic search, recommendations, agents and production AI experiences.",
    keywords: [
      "AI product development",
      "AI product engineering",
      "AI SaaS development",
      "AI application development",
    ],
    summary: "AI-native products and AI capabilities inside existing software.",
    ctaLabel: "Discuss My AI Product",
    serviceInterest: "AI Product Engineering",
  },
  {
    key: "agents",
    path: child("ai-agents-automation"),
    name: "AI Agents & Automation",
    navLabel: "AI Automation",
    menuLabel: "AI Agents & Automation",
    h1: "Turn business workflows into agent-enabled systems.",
    seoTitle: "Enterprise AI Agent Development Services | NeoIntelli",
    metaDescription:
      "Build secure AI agents and agent-enabled workflows for enterprise operations with tool use, permissions, integrations, evaluation and human oversight.",
    keywords: [
      "AI agent development",
      "enterprise AI agent development",
      "AI workflow automation",
      "agentic workflow",
    ],
    summary: "Tool-using agents and AI-enabled enterprise workflows.",
    ctaLabel: "Map My AI Automation Opportunity",
    serviceInterest: "AI Agents & Automation",
  },
  {
    key: "ops",
    path: child("mlops-llmops-agentops"),
    name: "MLOps, LLMOps & AgentOps",
    navLabel: "MLOps & AgentOps",
    menuLabel: "MLOps, LLMOps & AgentOps",
    h1: "Operate models, LLM applications and agents in production.",
    seoTitle: "MLOps, LLMOps & AgentOps Services | NeoIntelli",
    metaDescription:
      "Operate production AI with MLOps, LLMOps and AgentOps across deployment, evaluation, tracing, observability, reliability, governance and AI FinOps.",
    keywords: ["MLOps services", "LLMOps services", "AgentOps services", "AI observability"],
    summary: "Production lifecycle, observability, deployment and operations.",
    ctaLabel: "Review My Production AI Stack",
    serviceInterest: "MLOps / LLMOps / AgentOps",
  },
  {
    key: "evaluation",
    path: child("ai-evaluation-assurance"),
    name: "AI Evaluation & Assurance",
    navLabel: "AI Evaluation",
    menuLabel: "AI Evaluation & Assurance",
    h1: "Know whether your AI actually works.",
    seoTitle: "AI Evaluation & GenAI Testing Services | NeoIntelli",
    metaDescription:
      "Evaluate GenAI, RAG and AI agents with structured test datasets, factuality checks, task-success metrics, red teaming and production monitoring.",
    keywords: [
      "AI evaluation services",
      "GenAI testing",
      "LLM evaluation",
      "RAG evaluation",
      "AI agent testing",
    ],
    summary: "Evaluation, testing, red teaming and production quality.",
    ctaLabel: "Assess My AI Evaluation Approach",
    serviceInterest: "AI Evaluation & Assurance",
  },
];

export const AI_ENGINEERING_PAGE_BY_KEY = Object.fromEntries(
  AI_ENGINEERING_PAGES.map((page) => [page.key, page]),
) as Record<AiEngineeringPageKey, AiEngineeringPage>;

export const AI_ENGINEERING_CHILD_PAGES = AI_ENGINEERING_PAGES.filter((page) => page.key !== "overview");

export const AI_ENGINEERING_PATHS = AI_ENGINEERING_PAGES.map((page) => page.path);

/**
 * Cross-pillar destinations. AI Talent and AI GCC are being reworked in
 * parallel, so every link out of this section goes through these constants.
 * Retarget here if those sections change their canonical URLs.
 */
export const AI_ENGINEERING_CROSS_LINKS = {
  aiTalent: {
    label: "AI Talent",
    href: "/services/ai-talent",
    context: "Need engineers to own what we build? Explore AI Talent.",
  },
  microGcc: {
    label: "AI Micro GCC",
    href: "/services/micro-gcc",
    context: "Need a dedicated India team? Start an AI Micro GCC.",
  },
  aiGcc: {
    label: "AI GCC",
    href: "/services/ai-gcc",
    context: "Need a complete India AI capability center? Explore AI GCC.",
  },
  responsibleAi: {
    label: "Responsible AI governance (AI GCC)",
    href: "/services/ai-gcc/responsible-ai",
  },
  /**
   * AI infrastructure and GPU belong to the AI GCC pillar, which owns the
   * dedicated page. AI Engineering pages discuss infrastructure only as it
   * affects a system's design and economics, and link here for the rest.
   */
  aiInfrastructure: {
    label: "AI Infrastructure & GPU (AI GCC)",
    href: "/services/ai-gcc/ai-infrastructure-gpu",
  },
} as const;

/** The six-stage NeoIntelli framework rendered on the hub page. */
export const AI_ENGINEERING_LIFECYCLE = [
  {
    step: "01",
    name: "Discover",
    summary: "Agree what the AI is for before choosing what it is.",
    items: ["Business problem", "Workflow", "Expected outcome", "Data", "Constraints", "Risk"],
  },
  {
    step: "02",
    name: "Prove",
    summary: "A proof of value with a baseline and a way to judge it.",
    items: ["Architecture", "Proof of value", "Baseline", "Evaluation criteria", "Business validation"],
  },
  {
    step: "03",
    name: "Engineer",
    summary: "Build the system, not just the model.",
    items: ["Data", "AI/ML", "GenAI", "Agents", "Software", "Integration"],
  },
  {
    step: "04",
    name: "Productionize",
    summary: "Make it safe to depend on.",
    items: ["MLOps", "LLMOps", "AgentOps", "Security", "Observability", "Evaluation"],
  },
  {
    step: "05",
    name: "Scale",
    summary: "Make it economic and owned.",
    items: ["Performance", "Reliability", "FinOps", "Adoption", "Operational ownership"],
  },
  {
    step: "06",
    name: "Build Capability",
    summary: "Transfer the system to a team that can own it.",
    items: ["Knowledge transfer", "Internal AI team", "AI Talent", "AI Micro GCC", "AI GCC"],
  },
] as const;

/**
 * Production AI Readiness Framework: dimensions and stages only. Scoring
 * benchmarks are intentionally absent until NeoIntelli has evidence to publish.
 */
export const PRODUCTION_READINESS_DIMENSIONS = [
  "Business Value",
  "Workflow Readiness",
  "Data Readiness",
  "Model Suitability",
  "Integration Complexity",
  "Evaluation Readiness",
  "Security",
  "Governance",
  "Human Oversight",
  "AI Economics",
  "Operating Ownership",
] as const;

export const PRODUCTION_READINESS_STAGES = [
  "Experiment",
  "Proof of Value",
  "Production Candidate",
  "Production Ready",
  "Scale Ready",
] as const;
