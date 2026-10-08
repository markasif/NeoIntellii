import {
  Bot,
  Boxes,
  Building2,
  Check,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  KeyRound,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { QuestionAnswer } from "./Accordion";

/**
 * Copy and data for /lp/india-engineering-squad.
 *
 * The page is positioned for AI-first product companies: AI-native SaaS,
 * agentic systems, ML products, AI platforms and data/MLOps teams in the US,
 * UK and Europe, from bootstrapped through Series A and selectively Series B.
 *
 * Two rules shape everything here. First, no commercial detail is public: no
 * rates, no salary examples, no fee structure, no calculator, no percentages.
 * Commercials are discussed privately after role calibration, and the page says
 * so. Second, nothing is claimed that cannot be stood behind: no testimonials,
 * no logos, no case studies, no invented metrics or certifications, and no
 * capability NeoIntelli cannot genuinely evaluate.
 *
 * Content lives here rather than in the page component because the page is
 * long and almost entirely copy. Changing a card, a stack group or a scenario
 * is a change in this file alone.
 */

/* ---------------------------------------------------------------- hero --- */

export const HERO_TRUST = [
  "You approve every engineer",
  "AI and engineering technical validation before founder interviews",
  "Dedicated employees, not rotating contractors",
  "Your product, repositories and engineering decisions stay under your control",
];

/** The capability line under the hero headline. */
export const HERO_CAPABILITIES = [
  "AI/ML",
  "GenAI",
  "Data",
  "Backend",
  "Full Stack",
  "MLOps",
  "Cloud",
];

/* ------------------------------------------------- who this is built for --- */

export const AUDIENCE_CARDS: { icon: typeof Sparkles; title: string; body: string }[] = [
  {
    icon: Sparkles,
    title: "AI SaaS",
    body: "B2B AI applications, copilots, workflow automation and AI-enabled vertical software.",
  },
  {
    icon: Workflow,
    title: "Agentic systems",
    body: "Agent workflows, orchestration, tool use, enterprise integrations and human-in-the-loop systems.",
  },
  {
    icon: Cpu,
    title: "ML products",
    body: "Forecasting, optimization, recommendation, computer vision and predictive applications.",
  },
  {
    icon: Layers,
    title: "AI platforms",
    body: "RAG infrastructure, model APIs, internal AI platforms, evaluation systems and developer tooling.",
  },
  {
    icon: Database,
    title: "Data & MLOps",
    body: "Data pipelines, feature and model infrastructure, deployment, monitoring and production AI operations.",
  },
];

/* ------------------------------------------- why AI hiring is different --- */

export const AI_HIRING_PROBLEMS = [
  {
    title: "AI titles are misleading",
    body: "“AI Engineer” can describe anything from API integration to serious ML and production engineering. Job titles alone are not enough to judge capability.",
  },
  {
    title: "Production depth is difficult to validate",
    body: "Strong AI product engineers need to understand more than prompts or models. They need to reason about data, APIs, evaluation, latency, reliability, cost and production constraints.",
  },
  {
    title: "AI teams are multidisciplinary",
    body: "Most AI startups need a mix of AI/ML, backend, data, full-stack and platform engineering. Hiring one type of engineer repeatedly creates capability gaps.",
  },
  {
    title: "India still needs a local operating layer",
    body: "Notice periods, compensation, employment, onboarding and retention still need to be handled well even when the technical hiring bar is strong.",
  },
];

/* ------------------------------------------ how AI engineers are evaluated --- */

export const EVALUATION_COLUMNS: { title: string; note: string; areas: string[] }[] = [
  {
    title: "AI / ML / GenAI roles",
    note: "Evaluate areas such as",
    areas: [
      "Python and software engineering fundamentals",
      "ML fundamentals",
      "Model selection and trade-offs",
      "RAG architecture",
      "Embeddings and retrieval",
      "Vector search",
      "LLM application architecture",
      "Agent workflows",
      "Tool calling",
      "Evaluation strategies",
      "Hallucination and reliability thinking",
      "Model latency",
      "Inference cost",
      "Data quality",
      "Production deployment",
      "Observability",
      "MLOps",
      "Cloud deployment patterns",
    ],
  },
  {
    title: "Product & platform engineering roles",
    note: "Evaluate areas such as",
    areas: [
      "Backend architecture",
      "APIs",
      "Distributed systems",
      "Databases",
      "Security basics",
      "Cloud design",
      "Testing",
      "Scalability",
      "Observability",
      "Frontend and product engineering where relevant",
      "Integration architecture",
      "Ownership and communication",
    ],
  },
];

/* --------------------------------------------- AI / engineering stack --- */

/**
 * Each group is split into lanes rather than one flat list, because a flat list
 * of vendor names reads as a checklist. The lanes separate what a team runs on
 * from what it builds with and what it has to get right, which is closer to how
 * an engineer would actually describe their own depth.
 *
 * Two deliberate exclusions. No model or provider names: those change with the
 * client's architecture and dating the page to a particular vendor makes it
 * look narrower than the work actually is, so the groups name the engineering
 * around the models instead. And no general-purpose enterprise stacks: this is
 * end-to-end AI product engineering, so the surrounding backend and frontend
 * are the ones AI products are actually built on.
 *
 * The section is still restrained text, not a logo wall: breadth is the point,
 * not the count.
 */
export const STACK_GROUPS: {
  icon: typeof Sparkles;
  title: string;
  lanes: { label: string; items: string[] }[];
}[] = [
  {
    icon: Sparkles,
    title: "GenAI & LLM engineering",
    lanes: [
      {
        label: "Frameworks",
        items: ["LangChain", "LlamaIndex", "Haystack", "DSPy", "Vercel AI SDK"],
      },
      {
        label: "Retrieval",
        items: [
          "RAG architecture",
          "Embeddings",
          "Vector search",
          "Hybrid retrieval",
          "Re-ranking",
          "Chunking strategies",
        ],
      },
      {
        label: "Practice",
        items: [
          "Context engineering",
          "Structured output",
          "Tool and function calling",
          "Streaming responses",
          "Guardrails",
          "Hallucination and reliability",
        ],
      },
    ],
  },
  {
    icon: Bot,
    title: "Agentic AI",
    lanes: [
      { label: "Frameworks", items: ["LangGraph", "CrewAI", "AutoGen", "Semantic Kernel"] },
      {
        label: "Patterns",
        items: [
          "Multi-agent orchestration",
          "Planning and memory",
          "Tool use and MCP",
          "Human-in-the-loop",
          "Long-running workflows",
        ],
      },
      {
        label: "Reliability",
        items: ["Agent evaluation", "Tracing", "Failure recovery", "Cost and latency budgets"],
      },
    ],
  },
  {
    icon: Cpu,
    title: "Machine learning",
    lanes: [
      {
        label: "Frameworks",
        items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "Hugging Face", "Ray"],
      },
      {
        label: "Practice",
        items: [
          "Feature engineering",
          "Training pipelines",
          "Fine-tuning and PEFT",
          "Model evaluation",
          "Inference optimization",
        ],
      },
      {
        label: "Problem areas",
        items: ["Forecasting", "Recommendation", "Ranking", "Computer vision", "NLP", "Anomaly detection"],
      },
    ],
  },
  {
    icon: Database,
    title: "Data engineering",
    lanes: [
      { label: "Pipelines", items: ["Spark", "Airflow", "dbt", "Kafka", "Dagster", "Flink"] },
      {
        label: "Stores",
        items: ["Snowflake", "BigQuery", "Databricks", "PostgreSQL", "pgvector", "Qdrant", "Pinecone"],
      },
      {
        label: "Practice",
        items: [
          "Batch and streaming",
          "Data quality and contracts",
          "Feature stores",
          "Retrieval indexing",
          "Lineage",
        ],
      },
    ],
  },
  {
    icon: Cloud,
    title: "MLOps & LLMOps",
    lanes: [
      {
        label: "Platform",
        items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
      },
      {
        label: "Serving",
        items: ["vLLM", "Ray Serve", "Triton", "Model registries", "Deployment pipelines"],
      },
      {
        label: "Observability & evals",
        items: [
          "LangSmith",
          "Langfuse",
          "MLflow",
          "Weights & Biases",
          "Eval harnesses",
          "Drift and cost monitoring",
        ],
      },
    ],
  },
  {
    icon: Boxes,
    title: "Product engineering",
    lanes: [
      { label: "Backend", items: ["Python", "FastAPI", "TypeScript", "Node.js", "Go", "APIs"] },
      {
        label: "Frontend",
        items: ["React", "Next.js", "SvelteKit", "Vue", "Streaming and realtime UI"],
      },
      {
        label: "Practice",
        items: [
          "Distributed systems",
          "PostgreSQL and Redis",
          "Auth and multi-tenancy",
          "Testing and observability",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------- squad shapes --- */

export const SQUAD_SHAPES: { title: string; roles: string[]; body: string }[] = [
  {
    title: "AI product squad",
    roles: ["Senior AI/ML Engineer", "Backend Engineer", "Full Stack Engineer", "Data / MLOps Engineer"],
    body: "For AI-native SaaS products where model capabilities need to be integrated into a reliable customer-facing application.",
  },
  {
    title: "Agentic AI squad",
    roles: ["Senior GenAI Engineer", "Backend / Platform Engineer", "Full Stack Engineer", "Data Engineer"],
    body: "For products built around agents, enterprise integrations, workflow orchestration and tool-driven automation.",
  },
  {
    title: "ML platform squad",
    roles: ["ML Engineer", "Data Engineer", "Backend Engineer", "MLOps / Cloud Engineer"],
    body: "For teams building prediction, optimization, recommendation, computer vision or ML infrastructure.",
  },
];

/* ------------------------------------------------------------- control --- */

export const YOU_CONTROL = [
  "Every final hiring decision",
  "Product roadmap",
  "AI / model architecture",
  "Technical architecture",
  "Engineering priorities",
  "GitHub / GitLab repositories",
  "Cloud environments",
  "Data access",
  "Model and provider decisions",
  "Engineering rituals",
  "Performance expectations",
  "Product IP",
];

export const WE_HANDLE = [
  "India talent sourcing",
  "Candidate screening",
  "AI / engineering technical validation",
  "Employment contracts",
  "Payroll",
  "Statutory requirements",
  "HR operations",
  "Employee onboarding",
  "Retention support",
  "Replacement hiring when required",
];

/* ------------------------------------------------------ hiring process --- */

export const HIRING_STAGES: {
  number: string;
  title: string;
  body: string;
  extra?: "neohirex";
}[] = [
  {
    number: "01",
    title: "Product & role calibration",
    body: "We translate your product architecture, roadmap and engineering ownership into the required roles, seniority and technical evaluation criteria.",
  },
  {
    number: "02",
    title: "Talent sourcing & AI-assisted screening",
    body: "Our AI-enabled hiring platform helps screen and rank applicants against the agreed criteria before deeper technical evaluation.",
    extra: "neohirex",
  },
  {
    number: "03",
    title: "Role-specific technical validation",
    body: "AI/ML, backend, data, full-stack and platform candidates are evaluated against the actual demands of their role.",
  },
  {
    number: "04",
    title: "You meet the finalists",
    body: "We aim to put a small number of technically credible candidates in front of you. You make every final hiring decision.",
  },
  {
    number: "05",
    title: "Employment & onboarding",
    body: "Once approved, NeoIntelli manages India employment, onboarding and the people-operations layer while the engineer works as part of your dedicated team.",
  },
];

/* ----------------------------------------------------- hiring timeline --- */

export const TIMELINE = [
  {
    marker: "Day 1",
    title: "Product and role calibration",
    body: "Define product ownership, AI/ML requirements, stack, seniority, must-haves and the evaluation bar.",
  },
  {
    marker: "Week 1–2",
    title: "Validated profiles begin reaching you",
    body: "Sourcing, screening and technical validation run in parallel.",
  },
  {
    marker: "Week 2+",
    title: "Founder interviews & offers",
    body: "You interview shortlisted candidates and approve each hire.",
  },
  {
    marker: "Joining",
    title: "Onboarding begins as candidates become available",
    body: "Actual joining dates depend on candidate notice periods.",
  },
];

/* ------------------------------------- AI & engineering leadership bridge --- */

export const BRIDGE_GROUPS = [
  {
    label: "Before hiring",
    items: [
      "AI / product architecture context",
      "Role definition",
      "Seniority calibration",
      "Technical expectations",
      "Interview criteria",
    ],
  },
  {
    label: "During hiring",
    items: [
      "AI/ML technical evaluation support",
      "Senior engineering validation",
      "Architecture-sensitive hiring",
      "Founder interview support when required",
    ],
  },
  {
    label: "During setup",
    items: [
      "Initial technical context",
      "AI, backend and data ownership boundaries",
      "Engineering rhythm",
      "Communication model",
      "Transition toward the client's own technical leadership",
    ],
  },
];

/* ------------------------------------------------- commercial section --- */

export const PROPOSAL_CONTENTS = [
  "Recommended squad structure",
  "Role and seniority definition",
  "Technical capability requirements",
  "Employment and operating scope",
  "Workspace and equipment requirements where applicable",
  "Private commercial proposal",
  "Transfer framework where relevant",
];

/* ------------------------------------------ IP, AI data, security --- */

export const DILIGENCE_CARDS: {
  icon: typeof FileCheck2;
  title: string;
  body: string;
  items?: string[];
}[] = [
  {
    icon: FileCheck2,
    title: "Product IP",
    body: "Work-product and IP arrangements are defined contractually around assignment to the nominated client entity.",
  },
  {
    icon: KeyRound,
    title: "Repositories & infrastructure",
    body: "Code can remain in client-controlled repositories, cloud environments and infrastructure.",
    items: ["GitHub", "GitLab", "Cloud environments"],
  },
  {
    icon: Network,
    title: "AI & data access",
    body: "Model credentials, datasets, vector stores, APIs and production environments can remain under client-controlled access policies.",
  },
  {
    icon: ShieldCheck,
    title: "Diligence support",
    body: "Relevant employment, confidentiality, IP and compliance documentation can be made available for diligence under the appropriate confidentiality framework.",
  },
];

/* -------------------------------------------------- US / UK / EU model --- */

export const REGIONS = [
  {
    title: "United States",
    body: "Define working-hour overlap around the founder and core product and engineering team's schedule.",
  },
  {
    title: "United Kingdom",
    body: "India provides meaningful working-day overlap while allowing the India team to continue execution as the UK day progresses.",
  },
  {
    title: "European Union",
    body: "Operating models can incorporate appropriate data-processing, access and contractual requirements for EU-headquartered companies.",
  },
];

/* ------------------------------------------- when something goes wrong --- */

export const SCENARIOS: QuestionAnswer[] = [
  {
    q: "What if I don't like the candidates?",
    a: "You are never required to hire a candidate presented by NeoIntelli. We continue the search until you are comfortable making the hiring decision.",
  },
  {
    q: "What if an AI engineer isn't as strong as expected?",
    a: "Concerns are reviewed with your engineering leadership and the NeoIntelli technical and people teams. Depending on the situation, we support performance management or replacement under the agreed engagement terms.",
  },
  {
    q: "What if an engineer resigns?",
    a: "NeoIntelli begins replacement sourcing and works with you on knowledge transfer and continuity during the employee's notice period where possible.",
  },
  {
    q: "What if the product architecture changes?",
    a: "Team structure and required skills can be reviewed as the roadmap changes. AI stacks evolve quickly, so role requirements should follow the product rather than remain fixed around one technology.",
  },
  {
    q: "What if we pivot away from one AI stack or model provider?",
    a: "Role requirements are defined against your architecture, not a fixed technology list. As the stack changes, the evaluation criteria for open roles change with it, subject to the employment and notice obligations defined in the engagement.",
  },
  {
    q: "What if we stop the India initiative?",
    a: "Exit terms and applicable notice requirements are defined before the engagement begins.",
  },
  {
    q: "What if we want to employ the team ourselves later?",
    a: "The operating model can include a pre-agreed path for transferring the team into your own India entity once agreed milestones are reached.",
  },
  {
    q: "Who owns the code and AI work product?",
    a: "Your contractual framework is designed so work product produced for your engagement, including models, prompts, pipelines and application code, is assigned to your nominated client entity, subject to the executed agreements.",
  },
  {
    q: "Can NeoIntelli move my engineers to another customer?",
    a: "No. Engineers assigned to your dedicated squad are not rotated between client projects while assigned to your engagement.",
  },
];

/* ------------------------------------------------ start / scale / own --- */

export const JOURNEY = [
  {
    label: "01",
    title: "Start",
    subtitle: "Build the core product squad",
    body: "Begin with the AI, backend, data and product engineers required for your immediate roadmap.",
  },
  {
    label: "02",
    title: "Scale",
    subtitle: "Add engineering depth and local leadership",
    body: "Add specialist roles, engineering management, platform capability or additional squads as the product and India organization grow.",
  },
  {
    label: "03",
    title: "Own",
    subtitle: "Move to your own India entity",
    body: "When the business case makes sense, transition the operating model and eligible team members under the agreed transfer framework.",
  },
];

/* ----------------------------------------------------- why NeoIntelli --- */

export const WHY_NEOINTELLI: { icon: typeof Users; title: string; body: string }[] = [
  {
    icon: Cpu,
    title: "AI-aware technical leadership",
    body: "AI/ML hiring is calibrated with people who understand engineering, architecture and production AI systems.",
  },
  {
    icon: Layers,
    title: "Role-specific technical validation",
    body: "AI, backend, data and platform candidates are not evaluated with the same generic interview.",
  },
  {
    icon: Check,
    title: "Founder control",
    body: "Every final hiring and technical decision stays with the client.",
  },
  {
    icon: Boxes,
    title: "Multidisciplinary squad design",
    body: "Build the mix of AI, data, backend, full-stack and cloud capability your product actually needs.",
  },
  {
    icon: Building2,
    title: "India operations",
    body: "Employment, HR and operational infrastructure are handled locally.",
  },
  {
    icon: Workflow,
    title: "Path to ownership",
    body: "The model can evolve toward your own India engineering organization rather than permanent vendor dependency.",
  },
];

/* ------------------------------------------------------------------ FAQ --- */

export const FAQS: QuestionAnswer[] = [
  {
    q: "Do you only hire AI engineers?",
    a: "No. We build AI-first engineering teams. Depending on the product, a squad can combine AI/ML, GenAI, backend, data, full-stack, MLOps, cloud and engineering leadership roles.",
  },
  {
    q: "How small can we start?",
    a: "A first squad commonly starts with a small number of engineers covering the capabilities your immediate roadmap requires. The mix matters more than the headcount.",
  },
  {
    q: "Are they NeoIntelli employees?",
    a: "Yes. During the initial operating phase, team members are employed through the agreed NeoIntelli India employment structure and dedicated to the client engagement.",
  },
  {
    q: "Who decides whom to hire?",
    a: "You do. NeoIntelli sources and technically validates candidates; the final hiring decision remains with the client.",
  },
  {
    q: "Who owns the AI and product architecture?",
    a: "You do. Model choices, architecture, evaluation approach and engineering priorities remain client decisions. NeoIntelli operates the India hiring and employment layer around them.",
  },
  {
    q: "Can they work with our US, UK or EU team?",
    a: "Yes. Working-hour overlap is agreed during role calibration and incorporated into the operating model.",
  },
  {
    q: "How quickly will we see candidates?",
    a: "Initial validated profiles can typically begin reaching the founder during the first two weeks, depending on role complexity and market availability.",
  },
  {
    q: "How quickly can engineers join?",
    a: "Joining time depends significantly on candidate notice periods and role seniority. NeoIntelli begins sourcing immediately and provides expected joining dates before offers are approved.",
  },
  {
    q: "What if we are pre-seed or bootstrapped?",
    a: "The model is designed for early-stage AI companies from bootstrapped through Series A, and selectively Series B. The starting point is the roles your current roadmap needs rather than a fixed team size.",
  },
  {
    q: "How are commercials handled?",
    a: "Commercials depend on roles, seniority, technical specialization and operating requirements. After a short calibration call, NeoIntelli provides a private commercial proposal.",
  },
];
