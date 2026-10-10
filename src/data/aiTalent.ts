/**
 * Single source of truth for the AI Talent section: routes, subnav labels,
 * visible names, CTAs, the validation flow and the role profiles that every
 * child page renders. Nav, hub cards, related links, footer and tests read
 * from here so a route cannot drift between surfaces.
 */
import type { ExpertReviewData } from "@/components/ai-gcc/ExpertReview";

export const AI_TALENT_HUB_PATH = "/services/ai-talent";

export type AiTalentPageKey =
  | "overview"
  | "aiml"
  | "genai"
  | "data"
  | "mlops"
  | "leadership"
  | "hub"
  | "academy";

export interface AiTalentPage {
  key: AiTalentPageKey;
  path: string;
  navLabel: string;
  name: string;
  summary: string;
  anchor: string;
  ctaLabel: string;
  mobileCtaLabel?: string;
  serviceInterest: string;
  /** Subnav grouping label. */
  group: "Overview" | "Specialist Hiring" | "Scale Hiring" | "Leadership" | "Build Capability";
}

export const AI_TALENT_PAGES: AiTalentPage[] = [
  { key: "overview", path: AI_TALENT_HUB_PATH, navLabel: "Overview", name: "AI Talent", group: "Overview",
    summary: "Technically validated GenAI, Agentic AI, ML, Data, MLOps and AI Platform talent in India, from one hire to a complete AI team.",
    anchor: "Explore AI Talent Services", ctaLabel: "Discuss My AI Hiring Plan", mobileCtaLabel: "Discuss AI Hiring", serviceInterest: "AI Talent" },
  { key: "aiml", path: `${AI_TALENT_HUB_PATH}/ai-ml-recruitment`, navLabel: "AI & ML Recruitment", name: "AI & ML Recruitment", group: "Specialist Hiring",
    summary: "AI engineers, ML engineers, applied and deep learning, NLP, computer vision, research engineers, data scientists and AI solution architects.",
    anchor: "Explore AI & ML Recruitment", ctaLabel: "Discuss an AI/ML Hire", mobileCtaLabel: "Discuss AI/ML Hire", serviceInterest: "AI & ML Recruitment" },
  { key: "genai", path: `${AI_TALENT_HUB_PATH}/genai-agentic-ai-hiring`, navLabel: "GenAI & Agentic AI", name: "GenAI & Agentic AI Hiring", group: "Specialist Hiring",
    summary: "GenAI, LLM, RAG, agentic AI and AI application engineers and architects, assessed on production ownership rather than framework names.",
    anchor: "Explore GenAI & Agentic AI Hiring", ctaLabel: "Discuss a GenAI or Agent Hire", mobileCtaLabel: "Discuss GenAI Hire", serviceInterest: "GenAI & Agentic AI Hiring" },
  { key: "data", path: `${AI_TALENT_HUB_PATH}/data-engineering-data-science-hiring`, navLabel: "Data Engineering & Science", name: "Data Engineering & Data Science Hiring", group: "Specialist Hiring",
    summary: "Data engineers, analytics and platform engineers, streaming engineers, data architects, data and applied scientists, and AI data specialists.",
    anchor: "Explore Data Engineering & Data Science Hiring", ctaLabel: "Discuss a Data Hire", mobileCtaLabel: "Discuss Data Hire", serviceInterest: "Data Engineering & Data Science Hiring" },
  { key: "mlops", path: `${AI_TALENT_HUB_PATH}/mlops-ai-platform-hiring`, navLabel: "MLOps & AI Platform", name: "MLOps & AI Platform Hiring", group: "Specialist Hiring",
    summary: "MLOps, ML and AI platform, AI infrastructure, LLMOps, AgentOps, GPU infrastructure and AI DevSecOps engineers for production AI.",
    anchor: "Explore MLOps & AI Platform Hiring", ctaLabel: "Discuss an MLOps or Platform Hire", mobileCtaLabel: "Discuss Platform Hire", serviceInterest: "MLOps & AI Platform Hiring" },
  { key: "leadership", path: `${AI_TALENT_HUB_PATH}/ai-leadership-executive-search`, navLabel: "AI Leadership", name: "AI Leadership & Executive Search", group: "Leadership",
    summary: "Chief AI Officer, Head of AI, VP AI and Data, AI engineering and platform directors, distinguished architects and GCC AI heads.",
    anchor: "Explore AI Leadership & Executive Search", ctaLabel: "Discuss an AI Leadership Search", mobileCtaLabel: "Discuss Leadership Search", serviceInterest: "AI Leadership & Executive Search" },
  { key: "hub", path: `${AI_TALENT_HUB_PATH}/recruitment-hub`, navLabel: "Recruitment Hub + NeoHireX", name: "AI Recruitment Hub + NeoHireX", group: "Scale Hiring",
    summary: "A dedicated recruitment POD, NeoHireX Hiring OS and practitioner technical validation in one operating model for 10 to 100+ technical hires.",
    anchor: "Explore the AI Recruitment Hub + NeoHireX", ctaLabel: "Plan My AI Recruitment Hub", mobileCtaLabel: "Plan Recruitment Hub", serviceInterest: "AI Recruitment Hub" },
  { key: "academy", path: `${AI_TALENT_HUB_PATH}/ai-reskilling-academy`, navLabel: "Academy & Reskilling", name: "AI Talent Academy & Reskilling", group: "Build Capability",
    summary: "Convert backend, data, DevOps, ML, QA and architecture engineers you already employ into validated AI capability.",
    anchor: "Explore AI Talent Academy & Reskilling", ctaLabel: "Discuss AI Reskilling for My Team", mobileCtaLabel: "Discuss AI Reskilling", serviceInterest: "AI Talent Academy & Reskilling" },
];

export const AI_TALENT_PAGE_BY_KEY = Object.fromEntries(AI_TALENT_PAGES.map((page) => [page.key, page])) as Record<AiTalentPageKey, AiTalentPage>;
export const AI_TALENT_PATHS = AI_TALENT_PAGES.map((page) => page.path);

export const AI_TALENT_CONTEXT_LINKS = {
  aiGcc: { path: "/services/ai-gcc", name: "AI GCC in India", anchor: "Explore AI GCC in India" },
  microGcc: { path: "/services/micro-gcc", name: "AI Micro GCC", anchor: "Start an AI Micro GCC" },
  aiGccSetup: { path: "/services/ai-gcc/setup-operations", name: "AI GCC Setup & Operations", anchor: "Explore AI GCC Setup & Operations" },
  aiGccAdvisory: { path: "/services/ai-gcc/ai-advisory-strategy", name: "AI Advisory & GCC Design", anchor: "Explore AI Advisory & GCC Design" },
  aiGccGenai: { path: "/services/ai-gcc/generative-ai", name: "Generative & Agentic AI for GCCs", anchor: "Explore Generative & Agentic AI for GCCs" },
  aiGccData: { path: "/services/ai-gcc/data-engineering", name: "Data Engineering for AI GCCs", anchor: "Explore Data Engineering for AI GCCs" },
  aiGccMlops: { path: "/services/ai-gcc/mlops", name: "MLOps, LLMOps & AgentOps", anchor: "Explore MLOps, LLMOps & AgentOps" },
  aiGccInfra: { path: "/services/ai-gcc/ai-infrastructure-gpu", name: "AI Infrastructure & GPU", anchor: "Explore AI Infrastructure & GPU" },
  contractStaffing: { path: "/recruitment/contract-staffing", name: "Contract & Contract-to-Hire", anchor: "Explore contract and contract-to-hire AI talent" },
  talentManagement: { path: "/services/gcc-operations/workforce-strategy", name: "GCC Workforce Strategy", anchor: "Explore GCC Workforce Strategy" },
  peopleOperations: { path: "/services/gcc-operations/people-hr-operations", name: "People & HR Operations", anchor: "Explore People & HR Operations" },
  aiDeliveryTeams: { path: "/services/ai-delivery-teams", name: "AI Delivery Teams", anchor: "Explore AI Delivery Teams" },
  neohirex: { path: "https://neohirex.ai/", name: "NeoHireX", anchor: "Visit NeoHireX" },
  neohirexDemo: { path: "/book-a-call?type=neohirex", name: "NeoHireX demo", anchor: "Book a NeoHireX demo" },
  about: { path: "/about", name: "About NeoIntelli", anchor: "About NeoIntelli" },
} as const;

/** The signature flow behind every AI Talent page: "We interview. You hire." */
export const VALIDATION_FLOW = [
  { label: "Role calibration", detail: "Understand what this person actually has to build, own and operate, and at what seniority." },
  { label: "Specialist sourcing", detail: "Search the AI, data and platform talent pools relevant to the role, not a generic database." },
  { label: "NeoHireX screening", detail: "Role-calibrated screening and ranking on NeoIntelli's own Hiring OS." },
  { label: "AI first-round interview", detail: "Structured candidate evaluation before a human hour is spent." },
  { label: "Senior technical round", detail: "Practicing AI and data engineers assess technical depth against the role." },
  { label: "Expert validation", detail: "Validate ownership, architecture decisions and production experience behind the resume." },
  { label: "Qualified shortlist", detail: "You see evaluation context and evidence, not another stack of CVs." },
  { label: "You decide", detail: "Your team runs the final interviews and makes the hiring decision. NeoHireX never does." },
];

export interface RoleProfile {
  title: string;
  owns: string;
  signals: string[];
  falsePositives: string[];
  evaluation: string[];
}

export interface RoleGroup {
  name: string;
  intro?: string;
  roles: RoleProfile[];
}

/**
 * Reviewer for AI Talent pages. Published with no job title and no company:
 * the site names no role for Karthick Raju anywhere. Leave `role` unset.
 */
export const AI_TALENT_EXPERT_REVIEW: ExpertReviewData = {
  name: "Karthick Raju",
  profileUrl: "https://www.linkedin.com/in/karthick-raju/",
  reviewedOn: "2026-09-04",
};
