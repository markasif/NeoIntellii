import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Target,
  FileCheck,
  Crosshair,
  Wrench,
  Users,
  ShieldAlert,
  TrendingDown,
  Activity,
} from "lucide-react";
import {
  AiEngineeringPageLayout,
  AiCapabilityGrid,
  DecisionComparison,
  FlowDiagram,
  InBrief,
  PointOfView,
  Section,
  SourceNote,
  CapabilitiesSection,
  type CapabilityItem,
  HiringPathCards,
  type HiringPath,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { AI_ENGINEERING_SOURCES } from "@/data/aiEngineeringSources";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";
import FiveCardHeroGrid from "@/components/shared/FiveCardHeroGrid";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.evaluation;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const WHAT_TESTING_REQUIRES = [
  {
    key: "datasets",
    name: "Datasets",
    path: "",
    anchor: "",
    summary: "Realistic inputs with known good outcomes, covering the common cases and the rare ones that matter.",
    image: "/images/services/ai-engineering/evaluation/datasets.webp",
  },
  {
    key: "rubrics",
    name: "Rubrics",
    path: "",
    anchor: "",
    summary: "Written criteria for what a good output is, so two reviewers and an automated judge score the same way.",
    image: "/images/services/ai-engineering/evaluation/rubrics.webp",
  },
  {
    key: "business-criteria",
    name: "Business criteria",
    path: "",
    anchor: "",
    summary: "The thresholds the sponsor will accept, agreed before the build rather than negotiated after the demo.",
    image: "/images/services/ai-engineering/evaluation/business-criteria.webp",
  },
  {
    key: "human-baselines",
    name: "Human baselines",
    path: "",
    anchor: "",
    summary: "How well people do the task today, so the system is compared with reality rather than perfection.",
    image: "/images/services/ai-engineering/evaluation/human-baselines.webp",
  },
  {
    key: "automated-eval",
    name: "Automated evaluation",
    path: "",
    anchor: "",
    summary: "Scoring that runs on every change, fast enough to be a release gate.",
    image: "/images/services/ai-engineering/evaluation/automated-eval.webp",
  },
  {
    key: "production-feedback",
    name: "Production feedback",
    path: "",
    anchor: "",
    summary: "Sampled real traffic, user corrections and escalations flowing back into the datasets.",
    image: "/images/services/ai-engineering/evaluation/production-feedback.webp",
  },
  {
    key: "continuous-eval",
    name: "Continuous evaluation",
    path: "",
    anchor: "",
    summary: "The same checks running after launch, because the data, the model provider and the users all change.",
    image: "/images/services/ai-engineering/evaluation/continuous-eval.webp",
  },
];

const FLOW = [
  { label: "Test cases", detail: "Golden datasets built from real inputs, edge cases and adversarial prompts." },
  { label: "Model or agent", detail: "The candidate release, with every artefact versioned." },
  { label: "Automated evaluation", detail: "Metrics, rubric-based judges and tool-call checks, run on every change." },
  { label: "Human evaluation", detail: "Calibrated reviewers on the samples that automation cannot judge reliably." },
  { label: "Acceptance", detail: "A release decision against the criteria written down in advance." },
  { label: "Production monitoring", detail: "Sampled traffic scored the same way, with drift and regression alerts." },
];

const CAPABILITIES: HiringPath[] = [
  {
    title: "What we evaluate",
    items: ["LLM evaluation", "RAG evaluation", "Agent evaluation", "Retrieval evaluation"],
    image: "/images/services/ai-engineering/evaluation-assurance-capability.webp",
    imageAlt: "LLM, RAG and agent evaluation systems",
  },
  {
    title: "How we evaluate",
    items: ["Golden datasets", "Task-success evaluation", "Factuality", "Groundedness", "Tool-call correctness", "Prompt regression"],
    image: "/images/services/ai-engineering/genai-capability.webp",
    imageAlt: "Golden datasets, task-success and groundedness checks",
  },
  {
    title: "Risk and safety",
    items: ["Safety testing", "Red teaming", "Prompt-injection testing", "Data-boundary checks"],
    image: "/images/services/ai-engineering/applied-ml-capability.webp",
    imageAlt: "Safety testing, red teaming and data boundary checks",
  },
  {
    title: "Production",
    items: ["Latency", "Cost", "Human escalation", "Production monitoring"],
    image: "/images/services/ai-engineering/compute-economics-gap.webp",
    imageAlt: "Production telemetry, latency, cost and monitoring",
  },
];

const BY_SYSTEM = [
  ["RAG and knowledge assistants", "Retrieval precision and recall, groundedness, answer correctness, citation accuracy, refusal on unanswerable questions", "Retrieval is scored separately from generation so a regression is attributed to the right component"],
  ["AI agents", "Task success, tool-call correctness, steps to completion, unsafe-action rate, escalation appropriateness", "Evaluated in a simulated environment with realistic tool responses, including failures"],
  ["Copilots and drafting", "Acceptance rate, edit distance, time to complete the task against a human baseline", "Measured with real users where possible; benchmark scores are an input, not the result"],
  ["Classification and prediction", "Precision, recall, F1, ROC/AUC, MAE or RMSE by segment, calibration", "Metric chosen from the cost of each kind of error, then tracked for drift"],
  ["Every system", "Latency at the required percentile, cost per request or task, escalation rate", "Quality that is unaffordable or too slow does not ship"],
];

const METRICS: CapabilityItem[] = [
  {
    title: "Evaluation pass rate",
    desc: "Share of release candidates meeting acceptance criteria on the golden dataset.",
    icon: CheckCircle2,
  },
  {
    title: "Task success",
    desc: "Completion to the agreed outcome, on the evaluation set and on sampled production traffic.",
    icon: Target,
  },
  {
    title: "Groundedness and factuality",
    desc: "Share of claims supported by sources, and share of factual statements verified as correct.",
    icon: FileCheck,
  },
  {
    title: "Retrieval precision and recall",
    desc: "Whether the right passages are retrieved for the questions the workflow asks.",
    icon: Crosshair,
  },
  {
    title: "Tool-call correctness",
    desc: "Right tool, right arguments, right sequence, measured per step.",
    icon: Wrench,
  },
  {
    title: "Judge agreement with humans",
    desc: "How closely automated scoring tracks calibrated human review on the same samples.",
    icon: Users,
  },
  {
    title: "Unsafe-output and unsafe-action rate",
    desc: "Findings from safety testing and red teaming, before and after mitigation.",
    icon: ShieldAlert,
  },
  {
    title: "Regression rate",
    desc: "Share of changes that lowered a tracked metric and were caught before release.",
    icon: TrendingDown,
  },
  {
    title: "Production drift",
    desc: "Movement in quality signals on sampled traffic against the release baseline.",
    icon: Activity,
  },
];

const QUESTIONS = [
  {
    question: "How do you test a Generative AI system?",
    answer: "With a golden dataset of realistic inputs and expected outputs, written acceptance criteria, automated scoring for the properties that can be scored, calibrated human review for the ones that cannot, safety and adversarial testing, and the same checks running on sampled production traffic after release.",
    detail: ["Unit tests still apply to the software around the model. They cannot tell you whether the model's answer was right, which is what the rest of this page is for."],
  },
  {
    question: "How do you evaluate RAG?",
    answer: "In two stages. First retrieval: for each question in the evaluation set, were the right passages retrieved, scored for precision, recall and rank. Then generation: given the retrieved context, was the answer correct, grounded in that context and cited. Scoring them separately is what lets you fix the right component.",
  },
  {
    question: "How do you measure hallucination?",
    answer: "By decomposing each answer into claims and checking whether every claim is supported by the retrieved context (groundedness) and, where a reference exists, whether it is true (factuality). The result is a rate per answer and per dataset, judged automatically and verified by human sampling. We do not promise a fixed hallucination percentage; we measure it for the specific use case.",
  },
  {
    question: "How do you evaluate an AI agent?",
    answer: "With a set of tasks that have known correct outcomes, run in a simulated environment that returns realistic tool responses including failures, scoring task success, tool-call correctness, steps taken, unsafe actions and whether the agent escalated when it should have. Production traces are then sampled and scored the same way.",
  },
  {
    question: "What is an AI golden dataset?",
    answer: "A curated set of inputs with agreed correct outputs or rubric scores, drawn from real usage and deliberately extended with edge cases and adversarial examples. It is the fixed reference every release is measured against, and it grows from production feedback.",
    detail: ["Building it is a joint effort with the business, because deciding what a correct output is requires the people who do the job."],
  },
  {
    question: "Can LLM-as-a-judge be trusted?",
    answer: "Partly, and only when calibrated. A model can score outputs against a rubric at scale, but its agreement with human reviewers has to be measured on the same samples, its known biases (toward length, toward its own style) controlled, and its judgments spot-checked continuously. Used that way it is a useful instrument; used blindly it is a second opinion from the system under test.",
  },
  {
    question: "What should be human evaluated?",
    answer: "Anything where correctness needs domain judgment, where the cost of a wrong output is high, where the rubric is new or contested, and a rolling sample of everything else to keep the automated judge honest. Human evaluation is expensive, so it is aimed where automation is least reliable.",
  },
  {
    question: "What should be automated?",
    answer: "Everything with a checkable property: retrieval metrics, schema and format compliance, tool-call correctness, safety classifiers, regression against the golden dataset, latency and cost. Automation is what makes evaluation a release gate rather than a quarterly review.",
  },
  {
    question: "How do you test AI before production?",
    answer: "By writing the acceptance criteria first, building the golden dataset with the business, running automated and human evaluation on every candidate release, red teaming the system for unsafe outputs and actions, and rehearsing the failure and rollback paths. A system that passes ships with monitoring that keeps running the same tests.",
    link: { label: "How the operating layer runs these checks after launch", href: P.ops.path },
  },
];

export default function AIEvaluationAssurance() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "evaluation",
        eyebrow: "Enterprise AI Engineering · AI Evaluation & Assurance",
        title: PAGE.h1,
        description:
          "Evaluation and assurance for GenAI, RAG, machine learning and AI agents: golden datasets, task-success metrics, factuality and groundedness checks, tool-call correctness, prompt regression, safety testing, red teaming and production monitoring.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Find out whether your AI actually works, with evidence.",
        description:
          "Bring the system, the questions the business keeps asking about it, and whatever testing exists today. We will design the acceptance criteria, the golden dataset and the evaluation pipeline, and tell you what the numbers currently say.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.genai.path, context: "The RAG, copilot and agent systems most of this evaluation applies to." },
        { href: P.agents.path, context: "Agent-enabled workflows and the permissions and oversight their evaluation has to cover." },
        { href: P.ops.path, context: "Where evaluation becomes a release gate and a production monitor." },
        { href: P.data.path, context: "Building and maintaining the evaluation datasets and retrieval indexes." },
      ]}
    >
      <Section
        id="acceptance-criteria"
        width="wide"
      >
        {/* Centered section header (Transformation Impact style) */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#169DC8] mb-3">
            Our position
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0D306C] tracking-[-0.03em] leading-[1.14]">
            AI systems need acceptance criteria just like software systems.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#505D74] leading-relaxed">
            AI output is probabilistic. The same input can produce a different answer, and a correct answer on Monday can be wrong after a model update on Friday. That does not make AI untestable. It means testing needs a different apparatus from unit tests.
          </p>
        </div>

        {/* Decision-milestones card design (left 2 · center 3 with navy hero · right 2) */}
        <FiveCardHeroGrid
          compact
          items={WHAT_TESTING_REQUIRES.map((item, idx) => ({
            n: idx + 1,
            title: item.name,
            body: item.summary,
          }))}
        />
        <div className="mt-8 sm:mt-10">
          <PointOfView statement="A prototype is not production AI. Until acceptance criteria exist and the system meets them, it is an experiment with users.">
            <p>
              Most stalled AI programmes cannot answer the sponsor's simplest question: does it work? Not because the system is bad, but because
              nobody defined what working means or built the means to measure it.
            </p>
          </PointOfView>
        </div>
      </Section>

      <InBrief>
        AI Evaluation & Assurance is the discipline of proving that a Generative AI, RAG, machine learning or agent system meets agreed acceptance
        criteria before release and keeps meeting them in production. It combines golden datasets, task-success and factuality metrics, retrieval
        and tool-call checks, human review, safety testing and red teaming with continuous production monitoring. It is needed whenever an AI
        system's output is probabilistic, which is every AI system. It solves the question every sponsor eventually asks: does this actually work?
      </InBrief>

      <Section
        id="evaluation-pipeline"
        eyebrow="How evaluation runs"
        title="From test cases to a release decision to production monitoring."
        lead="Six stages. The acceptance stage is a decision against criteria agreed in advance, and the monitoring stage runs the same evaluation on real traffic so the decision stays true."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we evaluate, and how."
        tone="muted"
        width="wide"
      >
        <HiringPathCards items={CAPABILITIES} showButton={false} />
      </Section>

      <Section
        id="what-to-measure"
        title="What to measure depends on the system."
        lead="A single accuracy number hides more than it shows. These are the properties we score for each kind of system, chosen so that a regression points at the component that caused it."
        width="wide"
      >
        <DecisionComparison
          caption="Evaluation properties by system type"
          columns={["System", "What we measure", "How it is done"]}
          rows={BY_SYSTEM}
        />
      </Section>

      <Section id="questions" eyebrow="Answer first" title="The evaluation questions every AI sponsor should ask." tone="muted" width="regular">
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

      <Section
        id="assurance-and-governance"
        eyebrow="Assurance in context"
        title="Evaluation is the evidence that governance runs on."
        lead="Risk classification, oversight decisions and audit requests all end in the same question: what does the evidence say about this system? Evaluation produces that evidence continuously. We structure it so a governance function can use it directly."
        width="wide"
      >
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <PointOfView statement="Measurement is an ongoing operating activity, not a one-off test." className="h-full">
            <p>
              The NIST AI Risk Management Framework organises AI risk into Govern, Map, Measure and Manage, with measurement treated as an ongoing activity. Evaluation produces the operational evidence governance needs to classify and manage risk.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Source:{" "}
              <a
                href={AI_ENGINEERING_SOURCES.nistAiRmf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] hover:underline"
              >
                NIST AI Risk Management Framework (2023)
              </a>
            </div>
          </PointOfView>
          <div className="bg-transparent p-6 sm:p-7 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0D306C] tracking-tight leading-snug mb-3 font-sans">
              Where the governance framework lives
            </h3>
            <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed mb-4 font-normal">
              Policy, risk classification and oversight for an AI capability center are covered under{" "}
              <Link to={AI_ENGINEERING_CROSS_LINKS.responsibleAi.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
                Responsible AI governance in AI GCC
              </Link>
              . This page covers how evaluation produces the evidence that framework needs, for a specific system.
            </p>
            <p className="text-sm sm:text-[15px] text-[#505D74] leading-relaxed font-normal">
              We do not claim regulatory compliance on a client's behalf; we engineer the measurement and test telemetry so the client's governance team has authoritative proof.
            </p>
          </div>
        </div>
      </Section>

      <Section id="metrics" eyebrow="Metrics we measure" title="What an evaluation programme reports." tone="muted" width="wide">
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>
    </AiEngineeringPageLayout>
  );
}
