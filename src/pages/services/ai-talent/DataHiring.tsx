import { Link } from "react-router-dom";
import { Database, GitBranch, Layers, ShieldCheck } from "lucide-react";
import { Section, InBrief, AnswerBlock, PointOfView, ResponsiveTable } from "@/components/ai-gcc";
import { AiTalentPageLayout, RoleMatrix, ValidationRoadmap } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, type RoleGroup } from "@/data/aiTalent";

const GROUPS: RoleGroup[] = [
  {
    name: "Data engineering",
    intro: "Engineers who build and run the platform and pipelines every model, dashboard and agent depends on.",
    roles: [
      {
        title: "Data Engineer",
        owns: "Reliable batch and streaming pipelines, data modelling, quality checks, orchestration and the operational care of data products other teams depend on.",
        signals: ["Pipelines they own that page them when they break, and what they changed", "Data contracts or quality checks they introduced", "Cost or performance improvements with numbers", "Modelling decisions explained for the consumers they served"],
        falsePositives: ["SQL-only analysts labelled as data engineers", "Tool lists (Spark, Airflow, dbt) with no owned system", "ETL maintenance with no design ownership"],
        evaluation: ["End-to-end walkthrough of one pipeline: source, transformation, quality, consumers", "Modelling and incremental-load design exercise", "Debugging scenario for a late or wrong dataset"],
      },
      {
        title: "Analytics Engineer",
        owns: "Transformed, tested, documented datasets and metrics that analysts, data scientists and AI features consume, with software practices applied to analytics code.",
        signals: ["A metrics layer or model set with tests and documentation", "Refactors that removed duplicate definitions", "Close working relationships with analysts and product"],
        falsePositives: ["Dashboard builders with no transformation ownership", "dbt familiarity without testing or CI"],
        evaluation: ["Modelling exercise with conflicting metric definitions", "Testing and documentation practices review", "Stakeholder scenario on a disputed number"],
      },
      {
        title: "Data Platform Engineer",
        owns: "The lakehouse or warehouse platform: ingestion frameworks, storage, compute, orchestration, catalog, access control, cost and the developer experience of the teams that build on it.",
        signals: ["Platform capabilities adopted by multiple teams", "Access control, residency and cost handled as design inputs", "Migrations or upgrades they led without breaking consumers"],
        falsePositives: ["Cloud certifications without a platform they ran", "Single-team pipeline work described as platform"],
        evaluation: ["Platform design exercise with multi-team, governance and cost constraints", "Operations scenario: outage, cost spike, access request", "Developer-experience discussion"],
      },
      {
        title: "Streaming Engineer",
        owns: "Event-driven and real-time data systems: Kafka or equivalent, stream processing, schema evolution, exactly-once semantics where required, replay and monitoring.",
        signals: ["Streaming systems with stated latency and delivery guarantees", "Schema evolution and replay handled in production", "Backpressure or partitioning problems they solved"],
        falsePositives: ["Batch engineers with a Kafka connector on the resume", "No experience with failure modes of streaming systems"],
        evaluation: ["Design exercise for a real-time feature with delivery guarantees", "Failure-mode discussion: late data, duplicates, reprocessing", "Monitoring approach review"],
      },
      {
        title: "Data Architect",
        owns: "Data architecture across domains: platform choices, modelling standards, integration patterns, governance and lineage, and the guidance of engineers implementing them.",
        signals: ["Architectures adopted across teams with the trade-offs explicit", "Governance and lineage designed in, not retrofitted", "Decisions they changed after production evidence"],
        falsePositives: ["Vendor reference architectures as experience", "Architecture without accountability for what was built"],
        evaluation: ["Architecture review of a multi-domain scenario", "Governance and residency design questions", "Technical leadership assessment"],
      },
    ],
  },
  {
    name: "Data science",
    intro: "Statistical modeling, experimentation, and quantitative business levers.",
    roles: [
      {
        title: "Data Scientist / Applied Scientist",
        owns: "Analysis, experimentation and models that change decisions or products, with statistical rigor and clear communication of uncertainty. Applied scientists lean toward productionized models.",
        signals: ["A decision or product change with their analysis behind it", "Experiments designed with power, controls and caveats", "Models handed to engineering with a production plan"],
        falsePositives: ["Dashboards or reporting described as data science", "Modelling with no reasoning about the statistics"],
        evaluation: ["Case exercise from question to recommendation", "Statistics and experimentation fundamentals", "Communication of uncertainty to a stakeholder"],
      },
      {
        title: "Decision Scientist / Advanced Analytics",
        owns: "Quantitative decision support: causal analysis, forecasting, optimization and experimentation tied to specific business levers.",
        signals: ["Causal or forecasting work that a business owner acted on", "Optimization models used in operations", "Understanding of the limits of their methods"],
        falsePositives: ["Descriptive analytics presented as decision science", "Methods listed without a decision attached"],
        evaluation: ["Case on a real business lever with messy data", "Methods discussion with failure modes", "Stakeholder communication assessment"],
      },
    ],
  },
  {
    name: "AI data",
    intro: "Data roles that exist because of AI workloads: retrieval infrastructure, AI-ready data, feature infrastructure and evaluation datasets.",
    roles: [
      {
        title: "AI Data Engineer",
        owns: "Vector and retrieval infrastructure, document ingestion and parsing for RAG, AI-ready data products, feature infrastructure and versioned evaluation datasets.",
        signals: ["Retrieval indexes they built and kept fresh and permission-aware", "Evaluation datasets treated as owned data products", "Feature or embedding pipelines in production"],
        falsePositives: ["Vector database tutorials as experience", "Data engineers with no exposure to AI consumers"],
        evaluation: ["Design exercise for a permission-aware retrieval data pipeline", "Evaluation dataset ownership discussion", "Freshness and cost scenario"],
      },
    ],
  },
];

const WHO_TO_HIRE: string[][] = [
  ["You have a business question and messy data", "Data Scientist", "Analysis and experimentation come first; production modelling can wait."],
  ["You have a model idea but no reliable data", "Data Engineer", "No model survives an unreliable pipeline. Build the foundation first."],
  ["You have a validated model that must run in production", "ML Engineer", "Productionization, inference and monitoring are engineering work."],
  ["You are building RAG or agents on enterprise documents", "AI Data Engineer, then GenAI Engineer", "Retrieval quality is a data problem before it is a model problem."],
];

const FAQ = [
  { question: "Do we need a Data Scientist, ML Engineer or Data Engineer?", answer: "Start from the constraint. A business question with messy data needs a data scientist. A model idea with unreliable data needs a data engineer first. A validated model that must run in production needs an ML engineer. Most first teams need a data engineer before either of the others." },
  { question: "How do you evaluate a data engineer?", answer: "On a pipeline they own: source, transformation, quality checks, consumers and what happens when it fails. Practicing data engineers run the technical round with a modelling exercise and a debugging scenario, and the evidence is recorded with the shortlist." },
  { question: "Is an analytics engineer a data engineer?", answer: "Adjacent, not identical. An analytics engineer owns transformed, tested datasets and metrics close to the business. A data engineer owns ingestion, pipelines and platform reliability. Small teams sometimes combine them; the role calibration decides which one you need." },
  { question: "What is an AI data engineer?", answer: "A data engineer whose consumers are retrieval systems, models and agents: vector and retrieval infrastructure, document ingestion, AI-ready data products, feature infrastructure and evaluation datasets. The role is new enough that most candidates grew into it from data or backend engineering." },
  { question: "How does data hiring connect to building an AI GCC?", answer: `Data engineering is the first capability most AI GCCs need. ${AI_TALENT_CONTEXT_LINKS.aiGccData.name} describes the foundation the team will build; the AI Micro GCC model runs the operating environment around them.` },
];

export default function DataHiring() {
  return (
    <AiTalentPageLayout
      pageKey="data"
      hero={{
        eyebrow: "AI Talent · Data Engineering & Data Science Hiring",
        title: "Hire Data Engineering & Data Science Talent in India",
        description: "Data engineers, analytics and data platform engineers, streaming engineers, data architects, data and applied scientists, decision scientists and AI data engineers, each assessed on the systems and decisions they have owned.",
        secondaryCta: { label: "Which role do we need?", href: "#which-role" },
        trustStrip: [
          "Data Contracts & Telemetry Verified",
          "Production Pipeline Troubleshooting Scenarios",
          "Lakehouse & Real-Time Streaming Depth",
          "Practitioner-Assessed Shortlists",
        ],
      }}
      cta={{
        title: "Discuss a data hire.",
        description: "Tell us what the data has to feed: dashboards, models, retrieval or agents. We will calibrate the role to that, show you the evaluation plan and start sourcing.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.aiGccData.anchor, href: AI_TALENT_CONTEXT_LINKS.aiGccData.path },
      }}
      related={[{ page: "overview" }, { page: "aiml" }, { page: "mlops" }, { context: "aiGccData" }]}
    >
      <InBrief>
        Data engineering and data science hiring at NeoIntelli covers data engineers, analytics engineers, data platform and streaming engineers, data architects, data scientists, applied and decision scientists, and AI data engineers who build retrieval, feature and evaluation infrastructure in India. Specialist recruiters source, NeoHireX screens and runs first-round AI interviews, and practicing data engineers and scientists validate ownership of real pipelines, platforms, analyses and models before you see a shortlist.
      </InBrief>

      <Section id="which-role" eyebrow="Answer first" title="Do we need a Data Scientist, ML Engineer or Data Engineer?" tone="muted" width="wide" lead="Start from the constraint you actually have. The title follows.">
        <ResponsiveTable caption="Which data or ML role to hire first" headers={["Your situation", "Hire first", "Why"]} rows={WHO_TO_HIRE} />
        <div className="mt-8 max-w-6xl mx-auto">
          <PointOfView>
            Most AI programs do not fail on the model. They fail on data nobody owns. The first data hire is usually the most important AI hire.
          </PointOfView>
        </div>
      </Section>

      <Section id="role-profiles" eyebrow="Role profiles" title="What each role owns, and how we tell ownership from exposure." width="wide">
        <RoleMatrix groups={GROUPS} />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="The validation flow behind every data shortlist." tone="muted" width="wide">
        <ValidationRoadmap />
        <div className="mt-4 text-[#2B3D66] text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#0e92b8] mb-2 justify-center">
            <Database className="w-4 h-4" />
            <span>AI GCC Data Foundation</span>
          </div>
          <p className="text-body text-xs sm:text-sm leading-relaxed text-[#415A77] max-w-3xl mx-auto">
            The foundation these engineers build for an AI GCC is described under{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccData.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccData.name}
            </Link>.
          </p>
        </div>
      </Section>

      <Section id="data-questions" eyebrow="Buyer questions" title="Questions about data engineering and data science recruitment in India." width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
