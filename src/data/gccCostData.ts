export type CityKey = "bengaluru" | "hyderabad" | "chennai" | "pune";

export interface RoleSpecialization {
  key: string;
  label: string;
  /**
   * Marks a focus area that usually means deep-tech work (fine-tuning, GPU
   * serving, multi-agent orchestration). Used to suggest the complexity
   * tier, never to change the price on its own.
   */
  deepTech?: boolean;
}

export interface RoleConfig {
  label: string;
  key: string;
  /** One line under the role name: what this seat actually does. */
  note: string;
  /** Focus areas the visitor can tick for this role. Multi-select. */
  specializations: RoleSpecialization[];
  baseSalary: Record<CityKey, number[]>;
}

// Base annual salary in USD by role, city, and seniority index
// [junior, mid, senior, lead]. Bands are modeled on market experience rather
// than a single salary survey - verify against current data before quoting.
export const roles: RoleConfig[] = [
  {
    label: "AI Engineers",
    key: "ai",
    note: "AI agents, RAG, tool-calling - LangGraph, LangSmith, CrewAI",
    specializations: [
      { key: "langgraph", label: "LangGraph / LangChain" },
      { key: "langsmith", label: "LangSmith evals & tracing" },
      { key: "crewai", label: "CrewAI / AutoGen multi-agent", deepTech: true },
      { key: "rag", label: "RAG & vector search" },
      { key: "mcp", label: "MCP / tool-calling" },
      { key: "guardrails", label: "Evals & guardrails" },
    ],
    baseSalary: {
      bengaluru: [22000, 36000, 52000, 68000],
      hyderabad: [19000, 31000, 45000, 59000],
      chennai: [18000, 29000, 42000, 55000],
      pune: [18000, 29000, 42000, 55000],
    },
  },
  {
    label: "ML Engineers",
    key: "ml",
    note: "Model training, deep learning, NLP, fine-tuning",
    specializations: [
      { key: "dl", label: "Deep learning (PyTorch)", deepTech: true },
      { key: "nlp", label: "NLP / transformers" },
      { key: "cv", label: "Computer vision", deepTech: true },
      { key: "finetune", label: "Fine-tuning (LoRA / PEFT)", deepTech: true },
      { key: "classical", label: "Classical ML / forecasting" },
      { key: "serving", label: "Model serving (vLLM / Triton)", deepTech: true },
    ],
    baseSalary: {
      bengaluru: [22000, 36000, 52000, 68000],
      hyderabad: [19000, 31000, 45000, 59000],
      chennai: [18000, 29000, 42000, 55000],
      pune: [18000, 29000, 42000, 55000],
    },
  },
  {
    label: "Data Engineers",
    key: "dataeng",
    note: "Pipelines, lakehouse, data quality",
    specializations: [
      { key: "spark", label: "Spark / Databricks" },
      { key: "dbt", label: "dbt / Snowflake / BigQuery" },
      { key: "airflow", label: "Airflow / orchestration" },
      { key: "streaming", label: "Kafka / streaming" },
      { key: "dq", label: "Data quality & governance" },
    ],
    baseSalary: {
      bengaluru: [18000, 30000, 44000, 58000],
      hyderabad: [15000, 26000, 38000, 50000],
      chennai: [14000, 24000, 36000, 47000],
      pune: [14000, 24000, 36000, 47000],
    },
  },
  {
    label: "Full-Stack Engineers",
    key: "fullstack",
    note: "End-to-end product delivery, UI to API",
    specializations: [
      { key: "react", label: "React / Next.js" },
      { key: "node", label: "Node / TypeScript" },
      { key: "pyweb", label: "Python (FastAPI / Django)" },
      { key: "graphql", label: "GraphQL / REST APIs" },
    ],
    baseSalary: {
      bengaluru: [16000, 28000, 42000, 56000],
      hyderabad: [14000, 24000, 36000, 48000],
      chennai: [13000, 22000, 34000, 45000],
      pune: [13000, 22000, 34000, 45000],
    },
  },
  {
    label: "Backend Engineers",
    key: "backend",
    note: "Services, APIs, core platform",
    specializations: [
      { key: "python", label: "Python / FastAPI" },
      { key: "java", label: "Java / Spring" },
      { key: "go", label: "Go" },
      { key: "nodeb", label: "Node / NestJS" },
      { key: "microservices", label: "Microservices / event-driven" },
    ],
    baseSalary: {
      bengaluru: [16000, 28000, 42000, 56000],
      hyderabad: [14000, 24000, 36000, 48000],
      chennai: [13000, 22000, 34000, 45000],
      pune: [13000, 22000, 34000, 45000],
    },
  },
  {
    label: "Cloud/DevOps Engineers",
    key: "devops",
    note: "Infra, CI/CD, GPU & serving environments",
    specializations: [
      { key: "k8s", label: "Kubernetes" },
      { key: "iac", label: "Terraform / IaC" },
      { key: "cicd", label: "CI/CD pipelines" },
      { key: "observability", label: "Observability" },
      { key: "gpu", label: "GPU & inference infra", deepTech: true },
    ],
    baseSalary: {
      bengaluru: [18000, 30000, 46000, 60000],
      hyderabad: [15000, 26000, 40000, 52000],
      chennai: [14000, 24000, 37000, 49000],
      pune: [14000, 24000, 37000, 49000],
    },
  },
  {
    label: "QA/SDET",
    key: "qa",
    note: "Automation, release confidence, LLM evals",
    specializations: [
      { key: "e2e", label: "Playwright / Cypress" },
      { key: "api", label: "API automation" },
      { key: "perf", label: "Performance testing" },
      { key: "llmeval", label: "LLM eval / regression suites" },
    ],
    baseSalary: {
      bengaluru: [13000, 22000, 33000, 44000],
      hyderabad: [11000, 19000, 28000, 38000],
      chennai: [10000, 18000, 27000, 36000],
      pune: [10000, 18000, 27000, 36000],
    },
  },
  {
    label: "Data Scientists",
    key: "datasci",
    note: "Experimentation, forecasting, insight",
    specializations: [
      { key: "exp", label: "Experimentation / A-B" },
      { key: "forecast", label: "Forecasting" },
      { key: "causal", label: "Causal inference" },
      { key: "bi", label: "BI / dashboards" },
    ],
    baseSalary: {
      bengaluru: [20000, 34000, 50000, 65000],
      hyderabad: [17000, 29000, 43000, 56000],
      chennai: [16000, 27000, 40000, 53000],
      pune: [16000, 27000, 40000, 53000],
    },
  },
  {
    label: "Mobile Engineers",
    key: "mobile",
    note: "iOS and Android delivery",
    specializations: [
      { key: "ios", label: "iOS / Swift" },
      { key: "android", label: "Android / Kotlin" },
      { key: "xplat", label: "React Native / Flutter" },
    ],
    baseSalary: {
      bengaluru: [16000, 28000, 42000, 56000],
      hyderabad: [14000, 24000, 36000, 48000],
      chennai: [13000, 22000, 34000, 45000],
      pune: [13000, 22000, 34000, 45000],
    },
  },
  {
    label: "Business Analysts",
    key: "ba",
    note: "Requirements, user stories, process mapping",
    specializations: [
      { key: "reqs", label: "Requirements & user stories" },
      { key: "process", label: "Process mapping" },
      { key: "sql", label: "SQL / analytics" },
      { key: "agile", label: "Agile / Jira" },
    ],
    baseSalary: {
      bengaluru: [14000, 22000, 32000, 42000],
      hyderabad: [12000, 19000, 28000, 36000],
      chennai: [11000, 18000, 26000, 34000],
      pune: [11000, 18000, 26000, 34000],
    },
  },
  {
    label: "Product Owners",
    key: "po",
    note: "Backlog ownership & your US/EU sprint bridge",
    specializations: [
      { key: "bridge", label: "US/EU sprint bridge" },
      { key: "backlog", label: "Backlog & roadmap ownership" },
      { key: "prd", label: "PRDs & acceptance criteria" },
      { key: "stakeholder", label: "Stakeholder management" },
    ],
    baseSalary: {
      bengaluru: [24000, 36000, 52000, 68000],
      hyderabad: [20000, 31000, 45000, 58000],
      chennai: [19000, 29000, 42000, 55000],
      pune: [19000, 29000, 42000, 55000],
    },
  },
];

export const cities: { key: CityKey; label: string; description: string }[] = [
  { key: "bengaluru", label: "Bengaluru", description: "Largest talent pool, highest cost" },
  { key: "hyderabad", label: "Hyderabad", description: "Strong GCC ecosystem, 10-15% savings vs Bengaluru" },
  { key: "chennai", label: "Chennai", description: "Growing AI hub, 15-20% savings" },
  { key: "pune", label: "Pune", description: "Engineering culture, 15-20% savings" },
];

// Per-seat seniority tiers. Index lines up with the 4 entries in each role's
// baseSalary array above, and with the tier index stored per seat in the
// calculator's seniority breakdown.
export const seniorityLevels = [
  { key: 0, label: "Junior Engineer (0-3 yrs)", shortLabel: "Junior" },
  { key: 1, label: "Mid-Level Engineer (3-5 yrs)", shortLabel: "Mid" },
  { key: 2, label: "Senior Engineer (4-6 yrs)", shortLabel: "Senior" },
  { key: 3, label: "Staff / Tech Lead (7+ yrs)", shortLabel: "Lead" },
];

export type BlueprintPodKey = "agentic" | "mlops" | "product" | "poc" | "custom";
export type MacroArchetypeKey = "senior-led" | "balanced" | "staff-rnd";
export type ComplexityTierKey = "standard" | "deep" | "frontier";
export type CloudProviderKey = "aws" | "azure" | "gcp";

export interface BlueprintPod {
  key: BlueprintPodKey;
  label: string;
  tagline: string;
  badge?: string;
  /** Role key -> headcount. Empty resets the team to a blank slate. */
  roleCounts: Partial<Record<string, number>>;
  /** Role key -> focus areas the pod is built around. */
  specializations: Partial<Record<string, string[]>>;
  /** Seniority preset the pod opens with. Omit to keep whatever is already selected. */
  archetype?: MacroArchetypeKey;
  /** Workload complexity preset the pod opens with. */
  complexity?: ComplexityTierKey;
}

// 1-click starting points. Counts are illustrative team shapes, not a
// commitment - every counter, seat and focus area stays editable afterward.
export const blueprintPods: BlueprintPod[] = [
  {
    key: "agentic",
    label: "Agentic AI Pod",
    tagline: "2 AI Eng + Backend + Infra + QA + PO",
    badge: "Recommended",
    roleCounts: { ai: 2, backend: 1, devops: 1, qa: 1, po: 1 },
    specializations: {
      ai: ["langgraph", "rag", "guardrails"],
      backend: ["python", "microservices"],
      devops: ["k8s", "cicd"],
      qa: ["llmeval", "api"],
      po: ["bridge", "backlog"],
    },
    complexity: "deep",
  },
  {
    key: "mlops",
    label: "MLOps Platform Pod",
    tagline: "2 ML Eng + Data + Infra + QA + PO",
    badge: "Model Training",
    roleCounts: { ml: 2, dataeng: 1, devops: 1, qa: 1, po: 1 },
    specializations: {
      ml: ["dl", "finetune", "serving"],
      dataeng: ["spark", "airflow"],
      devops: ["k8s", "gpu"],
      qa: ["api"],
      po: ["bridge", "backlog"],
    },
    complexity: "deep",
  },
  {
    key: "product",
    label: "Product Engineering Pod",
    tagline: "Core platform delivery for SaaS products",
    roleCounts: { backend: 2, fullstack: 1, qa: 1, po: 1 },
    specializations: {
      backend: ["python", "microservices"],
      fullstack: ["react", "node"],
      qa: ["e2e", "api"],
      po: ["bridge", "backlog"],
    },
    archetype: "balanced",
    complexity: "standard",
  },
  {
    key: "poc",
    label: "Fast AI POC Sprint Unit",
    tagline: "2 Senior Engineers",
    badge: "60-90 Day Goal",
    roleCounts: { ai: 1, fullstack: 1 },
    specializations: {
      ai: ["langgraph", "rag"],
      fullstack: ["react", "pyweb"],
    },
    archetype: "staff-rnd",
  },
  {
    key: "custom",
    label: "Custom Build",
    tagline: "Start from Scratch",
    roleCounts: {},
    specializations: {},
  },
];

export interface MacroArchetype {
  key: MacroArchetypeKey;
  label: string;
  ratioLabel: string;
  description: string;
  /** Fraction of seats at [Junior, Mid, Senior, Lead]. Sums to 1. */
  ratios: [number, number, number, number];
}

export const macroArchetypes: MacroArchetype[] = [
  {
    key: "senior-led",
    label: "Senior-Led & Autonomous",
    ratioLabel: "65% Senior / 35% Lead",
    description: "Best for US/EU alignment",
    ratios: [0, 0, 0.65, 0.35],
  },
  {
    key: "balanced",
    label: "Balanced Execution",
    ratioLabel: "50% Mid / 30% Senior / 20% Lead",
    description: "Cost-velocity balance",
    ratios: [0, 0.5, 0.3, 0.2],
  },
  {
    key: "staff-rnd",
    label: "100% Staff / R&D",
    ratioLabel: "All Senior / Principal",
    description: "Deep systems / POCs",
    ratios: [0, 0, 0.5, 0.5],
  },
];

export interface ComplexityTier {
  key: ComplexityTierKey;
  label: string;
  description: string;
  /** Fraction added on top of blended salary cost. */
  multiplier: number;
}

// Complexity multipliers are a NeoIntelli pricing judgment call, not a
// benchmarked market rate - they explain why deep-tech work costs more,
// not a promise of an exact percentage.
export const complexityTiers: ComplexityTier[] = [
  {
    key: "standard",
    label: "Standard Core Apps",
    description: "CRUD, standard APIs, web platforms",
    multiplier: 0,
  },
  {
    key: "deep",
    label: "Deep Tech & Multi-Agent",
    description: "Fine-tuning, vLLM, low-latency inference",
    multiplier: 0.15,
  },
  {
    key: "frontier",
    label: "Frontier Research",
    description: "Custom foundation models, multi-node GPU infra",
    multiplier: 0.3,
  },
];

export const cloudProviders: { key: CloudProviderKey; label: string }[] = [
  { key: "aws", label: "AWS" },
  { key: "azure", label: "Azure" },
  { key: "gcp", label: "Google Cloud" },
];

export const servingStackOptions: { key: string; label: string }[] = [
  { key: "triton-vllm", label: "Triton / vLLM" },
  { key: "kubernetes", label: "Kubernetes (EKS/AKS/GKE)" },
];

export type EngagementModel = "captive" | "managed" | "hybrid";

export const engagementModels: { key: EngagementModel; label: string; description: string }[] = [
  { key: "captive", label: "Fully Captive GCC", description: "You manage everything, we set it up" },
  { key: "managed", label: "Managed GCC", description: "NeoIntelli handles day-to-day operations" },
  { key: "hybrid", label: "Hybrid", description: "NeoIntelli manages initially, transition to captive over time" },
];

// Benefits overhead: 30-35% on top of base salary
export const BENEFITS_MULTIPLIER_LOW = 1.3;
export const BENEFITS_MULTIPLIER_HIGH = 1.35;

// Infrastructure cost per person per month (USD)
export const INFRA_COST_LOW = 200;
export const INFRA_COST_HIGH = 350;

// Operations cost per person per month (USD)
export const OPS_COST_LOW = 75;
export const OPS_COST_HIGH = 125;

// Partner fee per person per month (managed model)
export const PARTNER_FEE_MANAGED_LOW = 200;
export const PARTNER_FEE_MANAGED_HIGH = 400;

// Setup-only fee (one-time, for captive model)
export const SETUP_FEE_LOW = 100000;
export const SETUP_FEE_HIGH = 200000;

// Fractional Principal AI SME advisory add-on: 10-15 hrs/month of
// architectural review, RFC validation and benchmark audits. Flat monthly
// fee, not tied to headcount - NeoIntelli's own pricing input, not a
// market-sourced figure, and should be confirmed before it's quoted.
export const SME_FEE_LOW = 1500;
export const SME_FEE_HIGH = 2500;

// US cost multiplier (average US cost is ~3x India cost for equivalent roles)
export const US_COST_MULTIPLIER = 3.0;
