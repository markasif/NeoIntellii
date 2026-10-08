import { Link } from "react-router-dom";
import { Database, Layers, ShieldCheck, Sparkles, Network, FileText, Bot, BarChart3, Infinity as InfinityIcon, Shield, Quote, Clock, BadgeCheck, Timer, Recycle, Zap, Coins } from "lucide-react";
import { AiGccPageLayout, Section, InBrief, CapabilityGrid, DataCapabilitiesGrid, AnswerBlock, AdvisoryProcessFlow, MetricsWeDesignFor } from "@/components/ai-gcc";
import { AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

const PAGE = AI_GCC_PAGE_BY_KEY.data;

const DATA_FOR_AI_ITEMS = [
  {
    label: "ML",
    text: "Features, training sets and lineage that make a model reproducible and explainable.",
    icon: Network,
  },
  {
    label: "GENAI",
    text: "Parsed, chunked, permission-aware documents with refresh pipelines behind every retrieval system.",
    icon: FileText,
  },
  {
    label: "AGENTS",
    text: "Clean, typed access to the systems agents act on, with the audit trail their actions require.",
    icon: Bot,
  },
  {
    label: "EVALUATION",
    text: "Versioned evaluation datasets owned like production data, so quality is measured against the same truth every release.",
    icon: BarChart3,
  },
  {
    label: "MLOPS",
    text: "Data validation and contracts wired into CI/CD, so a pipeline change cannot silently break a model.",
    icon: InfinityIcon,
  },
  {
    label: "GOVERNANCE",
    text: "Classification, residency and lineage that give AI governance the evidence it needs without a separate project.",
    icon: Shield,
  },
];

const FLOW = [
  { label: "Sources", detail: "Operational systems, documents, events, third-party feeds.", icon: Database },
  { label: "Data platform", detail: "Ingestion, batch and streaming, storage, transformation, quality.", icon: Layers },
  { label: "Governed data products", detail: "Reusable, owned, documented datasets with lineage and access control.", icon: ShieldCheck },
  { label: "AI workloads", detail: "Features, retrieval indexes, training sets, evaluation sets, agents.", icon: Sparkles },
];

const CAPABILITIES = [
  { title: "Data platform architecture", body: "Lakehouse or warehouse design, ingestion patterns, orchestration, transformation standards and the platform team model the GCC will run it with." },
  { title: "Batch and streaming", body: "Reliable batch pipelines and streaming where latency matters, with schema management, replay and monitoring designed in." },
  { title: "AI-ready data products", body: "Owned, documented, versioned datasets built for reuse across ML, GenAI and analytics rather than rebuilt per use case." },
  { title: "RAG and unstructured data foundation", body: "Document ingestion, parsing, chunking, metadata, embeddings and refresh pipelines that keep retrieval systems current and permission-aware." },
  { title: "Evaluation datasets", body: "Curated, versioned evaluation sets for models, prompts, retrieval and agents, treated as first-class data products with owners." },
  { title: "Feature and vector infrastructure", body: "Feature stores where they earn their keep, vector stores sized to the retrieval workload, and the serving paths that connect them to production." },
  { title: "Governance and lineage", body: "Classification, access control that follows the source, lineage from source to model, and the records privacy and audit teams ask for." },
  { title: "Data FinOps", body: "Storage tiers, compute allocation, pipeline cost per product and the reviews that keep the platform bill tied to the value it produces." },
];

const METRICS = [
  { text: "Pipeline freshness against the SLA each data product declares", icon: Clock },
  { text: "Data quality checks passing at the contract boundary", icon: BadgeCheck },
  { text: "Time to onboard a new source into a governed product", icon: Timer },
  { text: "Share of AI workloads served from reusable products rather than one-off pipelines", icon: Recycle },
  { text: "Retrieval index refresh latency for RAG workloads", icon: Zap },
  { text: "Platform cost per data product", icon: Coins },
];

const FAQ = [
  {
    question: "How is data engineering for an AI GCC different from a data warehouse program?",
    answer: "The consumers are models, retrieval systems, evaluation pipelines and agents as well as dashboards. That adds unstructured data, vector infrastructure, evaluation sets and lineage into training and inference, and it changes what 'done' means for a pipeline.",
  },
  {
    question: "Do we need a feature store or a vector store?",
    answer: "Only when a workload justifies it. Feature stores pay off with many models sharing features under latency constraints. Vector stores are required for retrieval at scale. Both are decisions made per portfolio, not defaults.",
  },
  {
    question: "How do you handle data quality?",
    answer: "With contracts at the boundary of each data product, automated checks that run in the pipeline, ownership for every product and monitoring that alerts the owner, not a shared inbox.",
  },
  {
    question: "How does data governance work with India's data protection law?",
    answer: "Classification, residency mapping, access control and lineage are designed to support the client's obligations, including under the Digital Personal Data Protection Act, 2023 and applicable rules. NeoIntelli provides technology and governance support; legal interpretation sits with the client's advisers.",
  },
  {
    question: "Which cloud and tooling do you use?",
    answer: "The client's cloud and, where sensible, the client's existing tooling. The platform design is driven by workload, skills and governance, not by a preferred vendor list.",
  },
];

export default function DataEngineering() {
  return (
    <AiGccPageLayout
      hero={{
        pageKey: "data",
        eyebrow: "AI GCC in India · Data Engineering",
        title: "Build the data foundation your AI GCC can reuse.",
        description: "Data platforms, batch and streaming pipelines, governed data products, RAG and vector infrastructure, evaluation datasets, lineage and data FinOps, built so every model, copilot and agent in the GCC draws on the same foundation.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Back to AI GCC in India", href: AI_GCC_PAGE_BY_KEY.overview.path },
      }}
      cta={{
        title: "Assess the data foundation before the next model.",
        description: "Share the sources, the AI use cases queued behind them and where pipelines break today. We will map the platform, the data products and the governance the GCC needs to reuse them.",
      }}
      related={[
        { page: "overview" },
        { page: "genai" },
        { page: "mlops" },
        { page: "governance" },
        { page: "infrastructure" },
      ]}
    >
      <InBrief>
        Data engineering for an AI GCC builds the foundation that models, retrieval systems, agents and evaluation pipelines reuse. NeoIntelli designs the data platform, runs batch and streaming pipelines, delivers governed AI-ready data products, builds the unstructured data and vector foundation for RAG, curates evaluation datasets, establishes lineage and access control, and manages data cost. The aim is a foundation each new AI use case draws from rather than a pipeline each one rebuilds.
      </InBrief>

      <Section id="data-architecture" eyebrow="ARCHITECTURE" title="From sources to AI workloads through governed data products." width="wide" align="center" lead="The data product layer is the point. It is what lets the third AI use case cost less than the first.">
        <AdvisoryProcessFlow steps={FLOW} />
      </Section>

      <Section
        id="data-capabilities"
        eyebrow="CAPABILITIES"
        title="What the data foundation includes."
        width="wide"
        align="center"
        theme="navy"
      >
        <DataCapabilitiesGrid items={CAPABILITIES} />
      </Section>

      <Section
        id="data-for-ai"
        eyebrow="WHY IT IS NOT A GENERIC DATA PAGE"
        title="Every data decision is made for the AI workloads that depend on it."
        width="wide"
        align="center"
        lead="Data, models, agents, evaluation, MLOps and governance are one system in an AI GCC. Data engineering is scoped against all of them."
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 lg:gap-10 items-center relative">
          {/* Left: 6 Hexagon Items */}
          <div className="space-y-5 sm:space-y-6 relative z-10">
            {DATA_FOR_AI_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 sm:gap-5 group relative z-10"
                  >
                  <div className="relative w-12 h-14 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 115"
                      className="absolute inset-0 w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      fill="none"
                    >
                      <polygon
                        points="50,4 95,29 95,86 50,111 5,86 5,29"
                        fill="#081B3E"
                        stroke="#169DC8"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        className="transition-colors duration-300 group-hover:stroke-[#38BDF8]"
                      />
                    </svg>
                    <Icon className="relative z-10 w-5 h-5 text-[#169DC8] transition-colors duration-300 group-hover:text-[#38BDF8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold tracking-wider uppercase text-[#081B3E] mb-1 font-heading">
                      {item.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Operating Discipline Style Stacked Cards */}
          <div className="flex flex-col gap-3 sm:gap-3.5 self-center w-full">
            {/* Top: 3D AI Workloads Image (Rectangular without rounded corners) */}
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#CBD7E8] shadow-[0_4px_20px_rgba(13,48,108,0.06)] rounded-none bg-[#071D42]">
              <img
                src="/images/ai-gcc/data/ai-data-workloads.jpg"
                alt="AI Data Foundation Workloads"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Middle: Rectangular Navy Box matching Operating Discipline SplitValuePointOfView */}
            <div className="rounded-none bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/80 p-6 sm:p-7 text-white shadow-md text-left">
              <div className="flex items-center gap-2 mb-2.5 text-[#169DC8] text-xs uppercase tracking-widest font-extrabold">
                <Quote className="w-4 h-4 text-[#169DC8]" aria-hidden />
                <span>OUR VIEW</span>
              </div>
              <p className="text-white text-sm sm:text-[15.5px] leading-relaxed font-medium">
                Most AI programs do not fail on the model. They fail on data nobody owns.
              </p>
            </div>

            {/* Bottom: Context Note Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#CBD7E8] shadow-sm text-left">
              <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed">
                Production consumers of the foundation are described under{" "}
                <Link
                  to={AI_GCC_PAGE_BY_KEY.genai.path}
                  className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors"
                >
                  {AI_GCC_PAGE_BY_KEY.genai.name}
                </Link>{" "}
                and{" "}
                <Link
                  to={AI_GCC_PAGE_BY_KEY.mlops.path}
                  className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors"
                >
                  {AI_GCC_PAGE_BY_KEY.mlops.name}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="data-measures" eyebrow="MEASURES OF SUCCESS" title="What the data foundation is measured on." width="wide" align="center">
        <MetricsWeDesignFor items={METRICS} />
      </Section>

      <Section id="data-questions" eyebrow="BUYER QUESTIONS" title="Questions about data engineering for AI GCCs." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
