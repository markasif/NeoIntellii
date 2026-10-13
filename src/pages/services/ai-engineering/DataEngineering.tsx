import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  Crosshair,
  GitFork,
  Timer,
  Coins,
} from "lucide-react";
import {
  AiEngineeringPageLayout,
  FlowDiagram,
  InBrief,
  Section,
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  CapabilitiesSection,
  type CapabilityItem,
  HiringPathCards,
  type HiringPath,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.data;
const P = AI_ENGINEERING_PAGE_BY_KEY;
const AI_GCC_DATA_PATH = "/services/ai-gcc/data-engineering";

const DATA_PROBLEMS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "UNSTRUCTURED CONTEXT",
    title: "The documents exist. The context does not.",
    body: "Ten years of contracts, tickets and manuals sit in shared drives with no structure, no access model and no way to chunk, index and retrieve them in a form a model can use safely.",
    image: "/images/ai-engineering/data-engineering-capability.webp",
    imageAlt: "Unstructured document context extraction and vector indexing",
  },
  {
    id: "02",
    category: "BROKEN LINEAGE",
    title: "The pipeline runs. The lineage does not.",
    body: "A number reaches the model and nobody can say which source, which transformation or which version produced it. When the answer is wrong, the investigation starts from zero.",
    image: "/images/tech-data-platform.webp",
    imageAlt: "Data engineering pipeline lineage and governance tracking",
  },
  {
    id: "03",
    category: "FEATURE STALENESS",
    title: "The model is fine. The features are stale.",
    body: "Training used a clean, complete snapshot. Serving gets a feed that is hours late and missing fields. The model is accurate on paper and wrong in production.",
    image: "/images/pillar_card1_arch_v2-removebg-preview.png",
    imageAlt: "Real-time feature store and streaming pipeline synchronization",
  },
];

const FLOW = [
  { label: "Sources", detail: "Operational databases, SaaS systems, events, documents, images and sensor streams." },
  { label: "Pipelines", detail: "Batch and streaming ingestion with contracts, tests, orchestration and lineage recorded as they run." },
  { label: "Governed data products", detail: "Curated, owned datasets with quality checks, a catalogue entry and an access policy." },
  { label: "Retrieval and features", detail: "Chunked and embedded documents, hybrid search indexes, feature pipelines and evaluation datasets." },
  { label: "AI workloads", detail: "Training, RAG, agents and analytics consuming the same trusted layer." },
];

const CAPABILITIES: HiringPath[] = [
  {
    title: "Platform",
    items: ["Data platform architecture", "Lakehouse", "Batch pipelines", "Streaming pipelines"],
    image: "/images/ai-engineering/data-engineering-capability.webp",
    imageAlt: "Data platform architecture and batch streaming pipelines",
  },
  {
    title: "Governance",
    items: ["Data quality", "Lineage", "Cataloguing", "Data governance"],
    image: "/images/tech-data-platform.webp",
    imageAlt: "Data governance, quality, lineage and cataloguing",
  },
  {
    title: "AI-ready data",
    items: ["Unstructured document pipelines", "Vector databases", "Hybrid retrieval", "Knowledge graph where justified"],
    image: "/images/ai-engineering/genai-capability.webp",
    imageAlt: "AI-ready data, unstructured document pipelines and vector databases",
  },
  {
    title: "Serving AI",
    items: ["Feature infrastructure", "Evaluation datasets", "AI-ready data", "Retrieval quality measurement"],
    image: "/images/ai-engineering/evaluation-assurance-capability.webp",
    imageAlt: "Feature infrastructure, evaluation datasets and retrieval quality",
  },
];

const METRICS: CapabilityItem[] = [
  {
    title: "Freshness against SLO",
    desc: "How late each data product is versus the freshness the consuming AI workload was designed for.",
    icon: Clock,
  },
  {
    title: "Quality check pass rate",
    desc: "Share of pipeline runs passing schema, completeness, range and referential checks, by data product.",
    icon: CheckCircle2,
  },
  {
    title: "Retrieval precision and recall",
    desc: "Measured on an evaluation set of real questions, per index, before and after every change to chunking or embeddings.",
    icon: Crosshair,
  },
  {
    title: "Lineage coverage",
    desc: "Share of AI-consumed datasets with end-to-end lineage from source to model input.",
    icon: GitFork,
  },
  {
    title: "Time to onboard a source",
    desc: "Elapsed time from a new source being identified to a governed data product being available to AI workloads.",
    icon: Timer,
  },
  {
    title: "Cost per pipeline and per query",
    desc: "Storage, compute and retrieval cost attributed to the workload it serves.",
    icon: Coins,
  },
];

const QUESTIONS = [
  {
    question: "What does AI-ready data mean?",
    answer: "AI-ready data is data an AI system can train on, retrieve from or be evaluated against without a project-specific rescue effort: known provenance, measured quality, an access policy, a documented owner, and a shape a model can consume, whether that is a feature table, a chunked and embedded document store or a labelled evaluation set.",
    detail: ["It is a property of the platform, not of a single dataset. When every new use case starts by rebuilding its own pipeline, the data is not AI-ready however clean each copy is."],
  },
  {
    question: "Does every GenAI application need a vector database?",
    answer: "No. A vector database is needed when an application must find semantically similar content across a corpus too large to fit in a prompt. Many GenAI applications work over a small, known set of documents, a structured database or an API, and need no vector store at all.",
    detail: ["When one is needed, the choice between a dedicated vector database and vector capabilities inside an existing database is decided by scale, latency, filtering needs and what the team can operate."],
  },
  {
    question: "Vector database vs traditional database?",
    answer: "A traditional database answers exact questions: this customer, this order, this date. A vector database answers similarity questions: passages that mean roughly this. Production RAG systems usually need both, with metadata filters from the first constraining the similarity search of the second.",
    detail: ["Most relational and document databases now offer vector indexes. For moderate corpora that is often the simpler operational choice."],
  },
  {
    question: "What is hybrid search?",
    answer: "Hybrid search combines keyword (lexical) retrieval with semantic (vector) retrieval and merges the results, usually with a re-ranking step. It exists because vectors miss exact identifiers, part numbers and rare terms, and keywords miss paraphrase and meaning.",
    detail: ["For enterprise content full of codes, names and acronyms, hybrid retrieval is the default we start from, then measure."],
  },
  {
    question: "When does an AI system need a knowledge graph?",
    answer: "When the questions depend on relationships between entities, such as which supplier feeds which plant that ships to which customer, and those relationships are not recoverable from text similarity alone. If the questions are about finding relevant passages, a graph is unnecessary overhead.",
    detail: ["We treat a knowledge graph as an addition justified by a measured retrieval gap, not as a starting architecture."],
  },
  {
    question: "What data is required for RAG?",
    answer: "A curated corpus with access control that mirrors the source systems, metadata rich enough to filter on, a chunking strategy that respects document structure, and an evaluation set of real questions with known good answers. The evaluation set is the part most teams forget and the part that makes everything else measurable.",
    detail: ["Freshness matters too: a pipeline that re-indexes changed documents on a known cadence, with the old versions retired."],
  },
  {
    question: "How do you evaluate retrieval quality?",
    answer: "With an evaluation set of questions and the passages that should answer them, scored for precision, recall and rank, and re-run after every change to chunking, embeddings, filters or index configuration. Answer quality is measured separately so a retrieval regression is not mistaken for a model problem.",
    detail: ["Production queries are then sampled and reviewed to keep the evaluation set honest."],
    link: { label: "How retrieval fits into end-to-end AI evaluation", href: P.evaluation.path },
  },
  {
    question: "How should unstructured enterprise data be prepared for AI?",
    answer: "By classifying it first, then extracting, cleaning and structuring it in a pipeline that records provenance, preserves access rights, handles tables and images deliberately, chunks by document structure rather than fixed character counts, and versions the result so an index can be rebuilt reproducibly.",
    detail: ["Preparation is a data product like any other: owned, tested and monitored, not a one-off script run before the demo."],
  },
];

export default function DataEngineering() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "data",
        eyebrow: "Enterprise AI Engineering · AI Data Engineering",
        title: PAGE.h1,
        description:
          "AI-ready data platforms engineered for production: batch and streaming pipelines, governed data products with quality and lineage, unstructured document pipelines, vector and hybrid retrieval, feature infrastructure and the evaluation datasets every AI system needs.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Find out whether your data can support the AI you want to build.",
        description:
          "Bring the AI use case and a description of where its data lives today. We will assess coverage, quality, access and retrieval readiness, and tell you what the foundation needs before the model is worth building.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.genai.path, context: "The RAG, copilot and agent systems this data layer serves." },
        { href: P.applied.path, context: "Forecasting, classification and optimisation models built on the feature infrastructure described here." },
        { href: P.ops.path, context: "Dataset versioning, feature serving and monitoring in the production lifecycle." },
        {
          href: AI_GCC_DATA_PATH,
          label: "Data Engineering inside an AI GCC",
          context: "Who should own the data platform, how the team is shaped and how standards are governed inside an India capability center.",
        },
      ]}
    >
      <Section
        id="data-failures"
        eyebrow="Why AI quality is a data problem"
        title="Most AI quality problems start in the data."
        lead="Hallucinated answers, decaying accuracy and slow responses are frequently traced not to the model but to what it was given: documents that were never structured, features that arrive late, and numbers nobody can trace to a source."
        tone="muted"
        width="wide"
      >
        <NeoHireXMatrix items={DATA_PROBLEMS} showHeader={false} />
      </Section>

      <InBrief>
        AI Data Engineering builds and operates the data foundation that AI systems train on, retrieve from and are evaluated against: batch and
        streaming pipelines, a governed lakehouse, data products with quality and lineage, document pipelines for unstructured content, vector and
        hybrid retrieval, feature infrastructure and evaluation datasets. It is useful when AI quality is limited by data you cannot trust, find or
        serve fast enough. It solves the problem behind most AI failures: the model was fine and the data underneath it was not.
      </InBrief>

      <Section
        id="data-architecture"
        eyebrow="How the platform fits together"
        title="From raw sources to AI workloads that share one trusted layer."
        lead="The goal is a platform where every new AI use case starts from governed data products and measured retrieval, instead of rebuilding its own pipeline."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we engineer."
        lead="Platform, governance, AI-ready data and AI serving. The last two groups are what distinguish AI data engineering from a conventional analytics platform."
        tone="muted"
        width="wide"
      >
        <HiringPathCards items={CAPABILITIES} showButton={false} />
      </Section>

      <Section
        id="implementation-versus-ownership"
        width="wide"
      >
        {/* Centered header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4] block mb-3">
            Implementation vs Ownership
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0D306C] tracking-tight leading-tight font-sans mb-5">
            How this differs from data engineering inside an AI GCC
          </h2>
          <p className="text-base sm:text-[16.5px] text-[#2B3D66] leading-relaxed font-normal max-w-4xl mx-auto">
            This page is about implementation: architecture, pipelines, data products, retrieval infrastructure and production engineering, delivered by NeoIntelli for your system. Our AI GCC data engineering page is about ownership: which capabilities an India capability center should own, how the team is shaped, and how platform standards and governance are run over the long term.
          </p>
        </div>

        {/* Two-column cards */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
          {/* Left card: navy blue */}
          <div className="rounded-2xl bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#0D306C] p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <span className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4DB8E8] mb-3">
                OUR VIEW
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3 font-sans">
                A vector database is not a data strategy.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#B0C4DE] leading-relaxed font-normal">
                Retrieval infrastructure is one component of an AI-ready platform. Buying it before the corpus is classified, the access model is
                defined and an evaluation set exists produces a fast index over data nobody trusts.
              </p>
            </div>
          </div>

          {/* Right card: transparent */}
          <div className="bg-transparent p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0D306C] tracking-tight mb-3 font-sans">
                When the platform becomes yours to own
              </h3>
              <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed mb-3 font-normal">
                Once the foundation is in production, the question becomes who runs it. That is where{" "}
                <Link to={AI_GCC_DATA_PATH} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
                  data engineering inside an AI GCC
                </Link>{" "}
                and{" "}
                <Link to={AI_ENGINEERING_CROSS_LINKS.aiTalent.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
                  AI Talent
                </Link>{" "}
                take over.
              </p>
              <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed font-normal">
                Infrastructure sizing, storage and GPU decisions for an India capability center are covered under{" "}
                <Link to={AI_ENGINEERING_CROSS_LINKS.aiInfrastructure.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
                  AI GCC
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="questions" eyebrow="Answer first" title="The data questions that decide whether AI will work." tone="muted" width="regular">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {QUESTIONS.map((item) => (
            <div key={item.question} className="border-b border-[#0D244D]/10 pb-8 sm:pb-10 last:border-b-0 last:pb-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#0D306C] tracking-tight mb-2 font-sans">
                {item.question}
              </h3>
              <p className="text-base sm:text-[16.5px] text-[#0D244D] font-medium leading-relaxed mb-3">
                {item.answer}
              </p>
              {item.detail?.map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed mb-2 font-normal">
                  {paragraph}
                </p>
              ))}
              {item.link && (
                <p className="mt-3 text-sm">
                  <Link
                    to={item.link.href}
                    className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors"
                  >
                    {item.link.label}
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="metrics" eyebrow="Metrics we design for" title="What we instrument on every AI data platform." width="wide">
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>
    </AiEngineeringPageLayout>
  );
}
