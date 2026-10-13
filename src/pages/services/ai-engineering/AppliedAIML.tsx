import { Link } from "react-router-dom";
import {
  Coins,
  TrendingUp,
  Activity,
  Zap,
  CheckCircle2,
  RefreshCw,
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
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  CapabilitiesSection,
  type CapabilityItem,
  ImageFeatureCardGrid,
  type ImageFeatureCardItem,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { AI_ENGINEERING_SOURCES } from "@/data/aiEngineeringSources";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.applied;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const DECISION_PROBLEMS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "DISCONNECTED FORECASTING",
    title: "A forecast nobody acts on",
    body: "The model is accurate and the planning process still runs on last quarter's spreadsheet. A prediction only has value when a decision, a threshold and an owner are designed around it.",
    image: "/images/ai-engineering/applied-ml-capability.webp",
    imageAlt: "Applied AI forecasting and enterprise planning systems",
  },
  {
    id: "02",
    category: "UNMONITORED MODEL DRIFT",
    title: "A model that was right last year",
    body: "Customer behaviour, suppliers and sensors change. Without drift monitoring and a retraining path, accuracy decays quietly and the business finds out from the outcome.",
    image: "/images/production_capability.webp",
    imageAlt: "Production machine learning model drift and degradation monitoring",
  },
  {
    id: "03",
    category: "ASYMMETRIC ERROR COSTS",
    title: "The right accuracy, the wrong error",
    body: "A fraud model tuned for overall accuracy can be cheap on false negatives and expensive on false positives, or the reverse. The metric has to reflect what each kind of error costs the business.",
    image: "/images/solution_gcc_calculator.webp",
    imageAlt: "Cost-sensitive error analysis and fraud risk confusion matrix modeling",
  },
];

const FLOW = [
  { label: "Data", detail: "Historical records, events and sensor streams, with lineage and quality checks." },
  { label: "Features", detail: "Reusable, versioned feature pipelines so training and serving see the same inputs." },
  { label: "Models", detail: "The simplest model that meets the bar, benchmarked against a baseline and a rules heuristic." },
  { label: "Decisions", detail: "Thresholds, confidence bands and business rules that turn a score into a decision." },
  { label: "Business action", detail: "The order placed, the alert raised, the price set, the case routed, inside the existing system." },
  { label: "Monitoring", detail: "Drift, latency, error cost and outcome tracking feeding back into retraining." },
];

const CAPABILITIES: ImageFeatureCardItem[] = [
  {
    eyebrow: "DECISION TYPE 01",
    title: "Predict",
    desc: "Forecasting, time-series modelling and predictive maintenance delivered with reproducible feature pipelines and lineage.",
    items: ["Forecasting", "Predictive modelling", "Time-series modelling", "Predictive maintenance"],
    image: "/images/ai-engineering/applied-ml-capability.webp",
    imageAlt: "Applied AI forecasting and predictive modelling capabilities",
  },
  {
    eyebrow: "DECISION TYPE 02",
    title: "Classify and detect",
    desc: "Classification, anomaly detection, NLP and computer vision tuned for business error cost and operational volume.",
    items: ["Classification", "Anomaly detection", "NLP", "Computer vision"],
    image: "/images/ai-engineering/evaluation-assurance-capability.webp",
    imageAlt: "Classification, anomaly detection, NLP and computer vision",
  },
  {
    eyebrow: "DECISION TYPE 03",
    title: "Optimize and decide",
    desc: "Optimization, recommendation systems and decision intelligence connecting analytical scores directly into business actions.",
    items: ["Optimization", "Recommendation systems", "Decision intelligence", "Advanced analytics"],
    image: "/images/ai-engineering/compute-economics-gap.webp",
    imageAlt: "Optimization, recommendation systems and decision intelligence",
  },
];

const GENAI_OR_ML = [
  ["Generate or summarize language", "Generative AI", "Fluent output over unstructured input; evaluate for groundedness and factuality."],
  ["Retrieve information from documents", "RAG / Generative AI", "Retrieval quality decides answer quality; measure retrieval separately."],
  ["Forecast demand", "Machine Learning", "Time-series and regression models; evaluate on error cost, not just accuracy."],
  ["Predict equipment failure", "Machine Learning", "Survival and classification models on sensor history; false-negative cost dominates."],
  ["Optimize scheduling", "Optimization / ML", "Constraint solvers and operations research, often with ML-predicted inputs."],
  ["Detect anomalies", "Machine Learning", "Statistical and learned detectors tuned to an acceptable alert volume."],
  ["Interpret images or video", "Computer Vision", "Detection, segmentation and classification models; multimodal LLMs for open-ended description only."],
  ["Execute multi-step workflows", "Agentic AI", "Planning and tool use across systems; needs permissions, state and human oversight."],
];

const EVALUATION_BY_USE_CASE = [
  ["Classification (fraud, churn, triage)", "Precision, recall, F1, ROC/AUC where classes are imbalanced", "Cost of a false positive versus a false negative, set with the business"],
  ["Forecasting and regression", "MAE, RMSE, and error by horizon and segment", "Cost of over-forecasting versus under-forecasting"],
  ["Anomaly detection", "Precision at a fixed alert volume, recall on known incidents", "Alert fatigue and missed incidents"],
  ["Recommendation and ranking", "Offline ranking metrics, then online uplift against a control group", "Revenue or engagement per exposure, not click-through alone"],
  ["Computer vision", "Precision and recall per class, localisation quality", "Inspection throughput and the cost of an escaped defect"],
  ["All production models", "Drift in inputs and outputs, inference latency, retraining cadence", "How long a degraded model runs before anyone notices"],
];

const METRICS: CapabilityItem[] = [
  {
    title: "Business error cost",
    desc: "The expected cost of the model's mistakes, using the false-positive and false-negative costs the business agreed.",
    icon: Coins,
  },
  {
    title: "Lift over baseline",
    desc: "Improvement against the current process or a simple heuristic, measured on held-out data and then in production.",
    icon: TrendingUp,
  },
  {
    title: "Drift",
    desc: "Shift in input distributions and prediction distributions, with thresholds that trigger review or retraining.",
    icon: Activity,
  },
  {
    title: "Inference latency",
    desc: "Time to a prediction at the volume and percentile the decision needs, batch or real time.",
    icon: Zap,
  },
  {
    title: "Decision adoption",
    desc: "Share of predictions that actually reach a decision and are acted on inside the workflow.",
    icon: CheckCircle2,
  },
  {
    title: "Retraining and rollback time",
    desc: "How long it takes to retrain, validate and promote a model, and to roll one back.",
    icon: RefreshCw,
  },
];

const QUESTIONS = [
  {
    question: "What is applied AI?",
    answer: "Applied AI is the use of machine learning and related techniques to make a specific, repeatable business decision better: forecast a quantity, classify a case, detect an anomaly, recommend an option or optimise a plan. It is measured by the quality of the decision, not the sophistication of the model.",
    detail: ["Applied AI systems are trained on your own historical data and integrated into the process where the decision is made. That integration, plus the monitoring that keeps the model honest, is most of the engineering."],
  },
  {
    question: "Machine learning vs Generative AI: which do we need?",
    answer: "If the answer to your question is a number, a category, a ranking or a schedule, you need machine learning. If the input is language, documents or images and the output is text, an extract or assistance, you need Generative AI. Many systems need both, in different components.",
    detail: ["The table above is the checklist we apply. The most common mistake is using a language model for a prediction task because it is available, and paying for it in latency, cost and untestable behaviour."],
  },
  {
    question: "How much data do we need?",
    answer: "Enough history to cover the situations the model will face, including the rare ones that matter most, with labels or outcomes you trust. That is a question about coverage and quality, not row counts, and a short data review usually answers it before any modelling begins.",
    detail: ["When data is thin, the honest answer is often a rules-based baseline first, instrumented to collect the outcomes a model will later learn from."],
  },
  {
    question: "When is a rules-based system better than machine learning?",
    answer: "When the decision can be written down as rules the business already trusts, when the data is too sparse to learn from, or when every decision must be explainable line by line. Rules are also the baseline every model must beat to justify its cost.",
    detail: ["We frequently ship a rules engine as the first production release and add a model only where the rules demonstrably fall short."],
  },
  {
    question: "How do you handle model drift?",
    answer: "By monitoring input and output distributions against the training data, alerting when they shift beyond agreed thresholds, and having a tested retraining and rollback path ready before the first deployment. Drift is expected; being surprised by it is the failure.",
    detail: ["The operating side of this, from model registry to automated retraining, is covered under MLOps."],
    link: { label: "How MLOps keeps models honest in production", href: P.ops.path },
  },
];

export default function AppliedAIML() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "applied",
        eyebrow: "Enterprise AI Engineering · Applied AI & Machine Learning",
        title: PAGE.h1,
        description:
          "Forecasting, prediction, optimisation, recommendation, anomaly detection, computer vision and NLP systems engineered as decision systems: from data and features to models, the decisions they drive and the monitoring that keeps them right.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Assess whether your problem needs machine learning, and what it would take.",
        description:
          "Bring the decision you want to improve, the data you have and the cost of getting it wrong. We will tell you whether it is a prediction, an optimisation or a language problem, and what a proof of value with a real baseline looks like.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.data.path, context: "Feature infrastructure, pipelines and the governed data products ML systems train and serve from." },
        { href: P.ops.path, context: "Model registry, deployment, drift monitoring, retraining and rollback for production models." },
        { href: P.evaluation.path, context: "Acceptance criteria, evaluation datasets and production monitoring for probabilistic systems." },
        { href: P.genai.path, context: "For the problems in the table that belong to language, documents or agents." },
      ]}
    >
      <Section
        id="the-decision-is-the-hard-part"
        eyebrow="Why ML projects disappoint"
        title="The model is rarely the hard part. The decision is."
        lead="Most machine learning effort in enterprises goes into models that are never wired into a decision, never monitored, or measured on a metric that does not reflect what a mistake costs. We engineer the decision system, not just the model."
        tone="muted"
        width="wide"
      >
        <NeoHireXMatrix items={DECISION_PROBLEMS} showHeader={false} />
      </Section>

      <InBrief>
        Applied AI & Machine Learning engineering builds systems that make a specific business decision better and keep making it better:
        forecasting, prediction, classification, anomaly detection, recommendation, optimisation, computer vision and NLP. It is the right
        approach when the question has a numeric or categorical answer, your historical data reflects the situations the model will face, and
        the decision repeats often enough to justify a model. It solves the gap between an accurate notebook and a monitored system that
        changes an order, an alert, a price or a route inside the real process.
      </InBrief>

      <Section
        id="decision-system"
        eyebrow="How the system fits together"
        title="From data to a monitored business action."
        lead="Six stages, and the two that most projects skip are the last two: the decision logic that turns a score into an action, and the monitoring that tells you when the model stops being right."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we build."
        lead="Grouped by the kind of decision they support. Each is delivered with the feature pipeline, decision logic, monitoring and retraining path it needs to stay in production."
        tone="muted"
        width="wide"
      >
        <ImageFeatureCardGrid items={CAPABILITIES} columns={3} />
      </Section>

      <Section
        id="does-this-need-generative-ai"
        title="Does this problem actually need Generative AI?"
        lead="Usually not. Most business decisions are prediction, detection or optimisation problems, where a trained model is more accurate, cheaper and easier to evaluate than a language model. This is the checklist we apply before choosing an architecture."
        width="wide"
      >
        <DecisionComparison
          caption="Which kind of AI fits which business problem"
          columns={["The problem", "Usually the right approach", "What to watch"]}
          rows={GENAI_OR_ML}
          note="Combinations are common. A demand forecast (ML) can feed a scheduling optimiser, and a document-extraction step (Generative AI) can feed a classifier. The table decides the component, not the whole system."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="flex flex-col h-full">
            <PointOfView
              statement="Not every business problem needs an LLM, and not every prediction problem needs a model on day one."
              className="h-full flex flex-col justify-between"
            >
              <p>
                We often ship a rules-based baseline first, instrument it to collect outcomes, and add a model only where the rules demonstrably fall
                short. The baseline is not a compromise. It is the evidence that the model earns its cost.
              </p>
            </PointOfView>
          </div>
          <div className="flex flex-col justify-between h-full py-2 sm:py-3">
            <SourceNote
              source={AI_ENGINEERING_SOURCES.rulesOfMl}
              variant="transparent"
              className="h-full flex flex-col justify-between"
            />
          </div>
        </div>
      </Section>

      <Section
        id="how-we-evaluate-ml"
        eyebrow="Evaluation"
        title="How do you evaluate a machine learning system?"
        lead="By choosing the metric from the use case and the cost of each kind of error, not by reporting every metric a library prints. Precision and recall mean nothing until the business has said which mistake is more expensive."
        tone="muted"
        width="wide"
      >
        <DecisionComparison
          caption="Evaluation metrics chosen by use case"
          columns={["Use case", "Metrics we use", "The business question the metric answers"]}
          rows={EVALUATION_BY_USE_CASE}
          note="Drift and inference latency are tracked on every production model regardless of type. The acceptance threshold for each metric is agreed against a measured baseline during Discover."
        />
      </Section>

      <Section id="questions" eyebrow="Answer first" title="Questions we answer before modelling starts." width="regular">
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

      <Section id="metrics" eyebrow="Metrics we design for" title="What we instrument on every ML system." tone="muted" width="wide">
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>
    </AiEngineeringPageLayout>
  );
}
