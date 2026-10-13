import { Link } from "react-router-dom";
import {
  Rocket,
  CheckCircle2,
  Target,
  Activity,
  Crosshair,
  Zap,
  Coins,
  ArrowRightLeft,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import CapabilityGrid, { type CapabilityItem as GccCapabilityItem } from "@/components/gcc-operations/CapabilityGrid";
import {
  AiEngineeringPageLayout,
  FlowDiagram,
  InBrief,
  PointOfView,
  Section,
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  ImageFeatureCardGrid,
  type ImageFeatureCardItem,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.ops;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const QUIET_FAILURES: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "SILENT DEGRADATION",
    title: "Drift nobody measured",
    body: "The model kept answering while the world it was trained on moved. Accuracy decayed for months and the business found out from the outcome.",
    image: "/images/services/ai-engineering/ops/model-drift.webp",
    imageAlt: "Conceptual visualization of model accuracy drift and silent degradation",
  },
  {
    id: "02",
    category: "UNTESTED REGRESSION",
    title: "A prompt change nobody tested",
    body: "A one-line edit to fix one complaint regressed a hundred other cases. There was no evaluation set to run, so nobody knew until users did.",
    image: "/images/services/ai-engineering/ops/prompt-regression.webp",
    imageAlt: "Conceptual visualization of prompt modification cascading regression risk",
  },
  {
    id: "03",
    category: "OPAQUE EXECUTION",
    title: "An agent nobody can trace",
    body: "A record was changed and the only evidence is that the agent was running. Without step-level traces there is no root cause and no fix.",
    image: "/images/services/ai-engineering/ops/untraceable-agent.webp",
    imageAlt: "Conceptual visualization of opaque autonomous agent execution and missing trace audit",
  },
];

const FLOW = [
  { label: "Code, data, model, prompt, agent", detail: "Every changeable artefact versioned together, so a release is reproducible." },
  { label: "Evaluate", detail: "Automated evaluation on golden datasets as a release gate, with human review where the risk requires it." },
  { label: "Deploy", detail: "Staged rollout, canaries and rollback that work for models, prompts and agent versions alike." },
  { label: "Observe", detail: "Traces, quality signals, latency, cost and drift, per system and per version." },
  { label: "Govern", detail: "Registry, approvals, policy enforcement and the audit evidence a review will ask for." },
  { label: "Improve", detail: "Production feedback, corrections and incidents flowing back into datasets and the next release." },
];

const AREAS: ImageFeatureCardItem[] = [
  {
    eyebrow: "AREA 01",
    title: "MLOps",
    desc: "The lifecycle of trained models: dataset versioning, training pipelines, model registries and safe rollback.",
    items: ["Model lifecycle", "Dataset versioning", "Training pipelines", "Model registry", "Deployment", "Monitoring", "Drift", "Retraining", "Rollback"],
    image: "/images/services/ai-engineering/mlops-platform-capability.webp",
    imageAlt: "MLOps trained model lifecycle and training pipelines",
  },
  {
    eyebrow: "AREA 02",
    title: "LLMOps",
    desc: "The lifecycle of LLM applications, where the prompt, the retrieval and the model can each change.",
    items: ["Prompt and version management", "RAG evaluation", "Model routing", "Quality monitoring", "Token economics", "Latency", "Prompt regression", "Safety controls"],
    image: "/images/services/ai-engineering/genai-capability.webp",
    imageAlt: "LLMOps prompt versioning, RAG evaluation and token economics",
  },
  {
    eyebrow: "AREA 03",
    title: "AgentOps",
    desc: "The lifecycle of agents, where the system takes actions and every step needs to be accountable.",
    items: ["Agent registry", "Agent versions", "Tool permissions", "Traces", "Task success", "Failure analysis", "Human escalation", "Cost per task", "Agent incidents", "Policy enforcement"],
    image: "/images/services/ai-engineering/agentic-systems-capability.webp",
    imageAlt: "AgentOps registry, tool permissions, step traces and task success",
  },
];

const METRICS: GccCapabilityItem[] = [
  {
    title: "Deployment frequency",
    desc: "How often a model, prompt or agent version can be released safely.",
    icon: Rocket,
  },
  {
    title: "Evaluation pass rate",
    desc: "Share of release candidates passing the golden-dataset gate, and what failed when they did not.",
    icon: CheckCircle2,
  },
  {
    title: "Task success",
    desc: "For agents and LLM applications, completion to the agreed outcome in production.",
    icon: Target,
  },
  {
    title: "Drift",
    desc: "Shift in inputs, outputs and quality signals against the baseline, with thresholds that trigger action.",
    icon: Activity,
  },
  {
    title: "Retrieval quality",
    desc: "Precision and recall on the evaluation set, tracked across index and embedding changes.",
    icon: Crosshair,
  },
  {
    title: "Latency",
    desc: "At the percentile the workflow needs, per version, under real load.",
    icon: Zap,
  },
  {
    title: "Cost per request or task",
    desc: "Model, retrieval, tool and infrastructure cost per unit of work, attributed to the system.",
    icon: Coins,
  },
  {
    title: "Human escalation rate",
    desc: "How often the system hands off, and whether the hand-offs were appropriate.",
    icon: ArrowRightLeft,
  },
  {
    title: "Failure rate",
    desc: "Errors, timeouts, refusals and unsafe actions, classified by cause.",
    icon: AlertTriangle,
  },
  {
    title: "Rollback time",
    desc: "How long it takes to return to the last known-good version once a problem is detected.",
    icon: RotateCcw,
  },
];

const QUESTIONS = [
  {
    question: "What is MLOps?",
    answer: "MLOps is the set of engineering practices for taking trained machine learning models into production and keeping them there: versioning data and models, automating training and deployment, monitoring accuracy and drift, retraining on a defined trigger and rolling back when a release fails.",
  },
  {
    question: "What is LLMOps?",
    answer: "LLMOps is MLOps adapted to LLM applications, where the behaviour depends on prompts, retrieved context, routing decisions and a model you may not control. It adds prompt versioning and regression testing, RAG evaluation, model routing, token cost management, quality monitoring of generated output and safety controls.",
  },
  {
    question: "What is AgentOps?",
    answer: "AgentOps is the operating discipline for AI agents in production: a registry of agents and their versions, tool permissions, step-level traces, task-success measurement, failure analysis, human escalation, cost per task, incident handling and policy enforcement. It exists because an agent takes actions, so every step must be accountable.",
  },
  {
    question: "How is LLMOps different from MLOps?",
    answer: "In MLOps the model changes rarely and the data changes constantly. In LLMOps the model may be a vendor's, the prompt and retrieval change often, and the output is free text that has to be judged rather than scored against a label. Evaluation therefore moves from a metric to a dataset-and-rubric process, and versioning has to cover prompts and indexes as well as weights.",
  },
  {
    question: "What should an AI observability stack capture?",
    answer: "For every request or task: the version of every artefact involved, the input and retrieved context, each model call and tool call with latency and cost, the output, any quality signal or human correction, and the final outcome in the workflow. Aggregated, that is what makes drift, regression and cost visible.",
  },
  {
    question: "How do you roll back an AI system?",
    answer: "By treating the model, the prompt, the index and the agent configuration as one versioned release, keeping the previous release deployable, and having a rehearsed procedure that switches traffic back within a known time. Rollback for AI is only possible if the release was reproducible in the first place.",
    link: { label: "How evaluation gates decide what gets released", href: P.evaluation.path },
  },
];

export default function MLOpsLLMOpsAgentOps() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "ops",
        eyebrow: "Enterprise AI Engineering · MLOps, LLMOps & AgentOps",
        title: PAGE.h1,
        description:
          "MLOps, LLMOps and AgentOps for production AI: deployment, evaluation gates, tracing, observability, reliability, governance evidence and AI FinOps for trained models, LLM applications and agents.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Review how your AI is operated today, before the next quiet failure.",
        description:
          "Bring the systems you have in production and how a change reaches them. We will review versioning, evaluation gates, observability, rollback and cost attribution, and describe what a reliable operating layer would add.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.data.path, context: "Dataset versioning, feature serving and the evaluation datasets the operating layer depends on." },
        { href: P.evaluation.path, context: "The evaluation gates, golden datasets and monitoring that MLOps and AgentOps run." },
        {
          href: AI_ENGINEERING_CROSS_LINKS.aiInfrastructure.href,
          label: AI_ENGINEERING_CROSS_LINKS.aiInfrastructure.label,
          context: "Cloud, GPU and infrastructure decisions for an India capability center.",
        },
        { href: P.genai.path, context: "The GenAI and agent systems this operating layer keeps reliable." },
      ]}
    >
      <Section
        id="quiet-failures"
        eyebrow="Why production AI needs an operating layer"
        title="Production AI fails quietly."
        lead="Conventional software fails loudly: an exception, a 500, a page. AI systems keep answering while their quality decays, which is why the operating layer has to measure quality continuously rather than wait for an error."
        tone="muted"
        width="wide"
      >
        <NeoHireXMatrix items={QUIET_FAILURES} showHeader={false} />
      </Section>

      <InBrief>
        MLOps, LLMOps and AgentOps are the operating disciplines that keep models, LLM applications and agents reliable after launch: versioning,
        evaluation gates, deployment, tracing, monitoring, drift and quality detection, rollback, cost control and governance evidence. They are
        needed the moment an AI system has users who depend on it and engineers who need to change it safely. They solve the quiet failures of
        production AI: drift nobody measured, a prompt change nobody tested, an agent action nobody can trace.
      </InBrief>

      <Section
        id="operating-loop"
        eyebrow="How the operating layer works"
        title="One loop for models, prompts and agents."
        lead="The artefacts differ, the loop does not. Every changeable thing is versioned, evaluated before release, deployed with a way back, observed in production, governed with evidence and improved from what production reveals."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="three-disciplines"
        eyebrow="Three capability areas"
        title="MLOps, LLMOps and AgentOps: what each one has to cover."
        lead="Three disciplines because three kinds of artefact change in different ways. A trained model, an LLM application and an agent each need their own registry, evaluation and failure analysis, run through the same loop."
        tone="muted"
        width="wide"
      >
        <ImageFeatureCardGrid items={AREAS} columns={3} />
      </Section>

      <Section id="questions" eyebrow="Answer first" title="Definitions and decisions for the operating layer." width="regular">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {QUESTIONS.map((item) => (
            <div key={item.question} className="border-b border-[#0D244D]/10 pb-8 sm:pb-10 last:border-b-0 last:pb-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#0D306C] tracking-tight mb-2 font-sans">
                {item.question}
              </h3>
              <p className="text-base sm:text-[16.5px] text-[#0D244D] font-medium leading-relaxed mb-3">
                {item.answer}
              </p>
              {"detail" in item && Array.isArray((item as any).detail) && (item as any).detail.map((paragraph: string, i: number) => (
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

      <Section
        id="metrics"
        eyebrow="Metrics we measure"
        title="What the operating layer reports."
        lead="Ten metrics, all instrumented per system and per version. We do not promise universal improvement percentages; the targets are set per system against its own baseline."
        tone="muted"
        width="wide"
      >
        <CapabilityGrid
          variant="ai"
          rowPattern={[4, 3, 3]}
          items={METRICS}
        />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>

      <Section
        id="infrastructure-and-governance"
        eyebrow="Infrastructure and governance in context"
        title="Infrastructure is sized to utilisation. Governance is evidence, not paperwork."
        width="wide"
      >
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <PointOfView statement="Dedicated GPUs are not automatically cheaper than cloud compute. Utilisation determines economics." className="h-full">
            <p>
              The operating layer produces the utilisation, latency and cost-per-task data that makes an infrastructure decision defensible. GPU
              and infrastructure strategy for an India capability center is covered under{" "}
              <Link to={AI_ENGINEERING_CROSS_LINKS.aiInfrastructure.href} className="text-[#008EC4] hover:text-[#38BDF8] underline underline-offset-4 transition-colors">AI GCC</Link>.
            </p>
          </PointOfView>
          <div className="bg-transparent p-6 sm:p-7 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0D306C] tracking-tight leading-snug mb-3 font-sans">
              Governance produced by the pipeline
            </h3>
            <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed mb-4 font-normal">
              Registry entries, evaluation results, approvals, traces and incident records are generated by the operating loop as it runs. That
              is the evidence a model or agent review needs, without a separate documentation effort.
            </p>
            <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed font-normal">
              For the policy and oversight framework itself, see{" "}
              <Link to={AI_ENGINEERING_CROSS_LINKS.responsibleAi.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
                Responsible AI governance under AI GCC
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </AiEngineeringPageLayout>
  );
}
