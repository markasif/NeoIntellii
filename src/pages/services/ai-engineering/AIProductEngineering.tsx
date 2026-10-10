import { Link } from "react-router-dom";
import {
  Users,
  Target,
  CheckCircle2,
  Zap,
  Coins,
  ArrowRightLeft,
  HelpCircle,
  Radio,
  FileCheck,
  Gauge,
  UserCheck,
  AlertTriangle,
  Lock,
  Clock,
} from "lucide-react";
import {
  AiEngineeringPageLayout,
  FlowDiagram,
  InBrief,
  PointOfView,
  Section,
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  CapabilitiesSection,
  type CapabilityItem,
  ImageFeatureCardGrid,
  type ImageFeatureCardItem,
} from "@/components/ai-engineering";
import PillTagList from "@/components/shared/PillTagList";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.product;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const AUDIENCES = ["AI startups", "SaaS companies", "Software product companies", "Scale-ups", "Digital product teams"];

const PRODUCT_PROBLEMS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "FEATURE ADOPTION",
    title: "Impressive in the demo, unused in the product",
    body: "The feature was designed around what the model can do rather than the job the user is doing. It sits in a side panel, answers questions nobody asked and is quietly ignored.",
    image: "/images/ai-engineering/product-engineering-capability.jpg",
    imageAlt: "User-centric AI product integration and workflow UX design",
  },
  {
    id: "02",
    category: "UNIT ECONOMICS",
    title: "The margin disappears at scale",
    body: "Cost per interaction was never a design constraint. At real usage the AI feature costs more to serve than the plan it is bundled into earns.",
    image: "/images/ai-engineering/compute-economics-gap.jpg",
    imageAlt: "Production inference unit economics, routing and caching architecture",
  },
  {
    id: "03",
    category: "CONFIDENCE & FALLBACK",
    title: "Trust breaks on the first wrong answer",
    body: "No confidence signal, no citation, no graceful failure state. One visible mistake and users stop relying on the feature, whatever its average accuracy.",
    image: "/images/ai-engineering/workflow-integration-gap.jpg",
    imageAlt: "Trust verification, citation grounding and graceful fallback UX",
  },
];

const FLOW = [
  { label: "Product UX", detail: "The job to be done, the interaction pattern, streaming, citations, confidence and the failure states." },
  { label: "AI orchestration", detail: "Prompt and tool orchestration, routing, caching, fallbacks and the human-in-the-loop points." },
  { label: "Models", detail: "Hosted, open-weight or trained models behind a gateway, chosen by evaluation, latency and cost per interaction." },
  { label: "Data and context", detail: "Customer data, product content and retrieval, governed per tenant with privacy designed in." },
  { label: "Evaluation", detail: "Offline test sets and release gates that decide whether a change ships." },
  { label: "Observability", detail: "Traces, quality signals, adoption analytics and cost, per feature and per tenant." },
];

const CAPABILITIES: ImageFeatureCardItem[] = [
  {
    eyebrow: "CAPABILITY 01",
    title: "Product and architecture",
    desc: "AI feature architecture, AI-native applications, AI SaaS and API surfaces designed for probabilistic behaviour and unit economics.",
    items: ["AI feature architecture", "AI-native applications", "AI SaaS", "AI APIs"],
    image: "/images/ai-engineering/product-engineering-capability.jpg",
    imageAlt: "AI feature architecture, AI-native applications and AI SaaS",
  },
  {
    eyebrow: "CAPABILITY 02",
    title: "Experiences",
    desc: "User-facing copilots, semantic search, intelligent recommendations and designed human-in-the-loop interaction patterns.",
    items: ["Copilots", "Semantic search", "Recommendations", "Agentic functionality", "Frontend AI experiences", "Human-in-the-loop UX"],
    image: "/images/ai-engineering/genai-capability.jpg",
    imageAlt: "Copilots, semantic search, recommendations and AI experiences",
  },
  {
    eyebrow: "CAPABILITY 03",
    title: "Engineering and operations",
    desc: "Robust backend engineering, automated evaluation release gates, production telemetry and real-time observability.",
    items: ["Backend engineering", "Evaluation", "Analytics", "Production integration"],
    image: "/images/ai-engineering/evaluation-assurance-capability.jpg",
    imageAlt: "Backend engineering, evaluation, analytics and production integration",
  },
];

const FOCUS = [
  "AI behaviour",
  "AI UX",
  "Evaluation",
  "Model economics",
  "Latency",
  "Trust",
  "Fallback",
  "Human escalation",
  "Data",
  "Production ownership",
];

const DESIGN_CHANGES: CapabilityItem[] = [
  {
    title: "Uncertainty",
    body: "The feature is sometimes wrong by design. The interface has to say how sure it is and make checking cheap.",
    icon: HelpCircle,
  },
  {
    title: "Streaming responses",
    body: "Perceived latency is a design decision: stream, show partial results, and let the user act before the model finishes.",
    icon: Radio,
  },
  {
    title: "Citations",
    body: "Every answer that draws on content shows where it came from, so the user can verify instead of trust.",
    icon: FileCheck,
  },
  {
    title: "Confidence",
    body: "A calibrated signal that decides whether the output is shown, suggested or routed to a person.",
    icon: Gauge,
  },
  {
    title: "Human review",
    body: "Where the stakes justify it, a person approves before the action happens, and the product makes that fast.",
    icon: UserCheck,
  },
  {
    title: "Failure states",
    body: "Timeouts, refusals, low-confidence results and tool errors each need a designed experience, not a spinner.",
    icon: AlertTriangle,
  },
  {
    title: "Cost per interaction",
    body: "A unit economics constraint that shapes model choice, caching, context size and which users get which capability.",
    icon: Coins,
  },
  {
    title: "Privacy",
    body: "Tenant isolation, what leaves your environment, retention of prompts and outputs, and what users are told.",
    icon: Lock,
  },
  {
    title: "Latency",
    body: "Budgeted per interaction at the percentile users feel, and traded deliberately against model quality.",
    icon: Clock,
  },
];

const METRICS: CapabilityItem[] = [
  {
    title: "Adoption per exposed user",
    desc: "Share of users who see the feature and use it again, by segment and by tenant.",
    icon: Users,
  },
  {
    title: "Task completion",
    desc: "Whether the user finished the job the feature exists for, not whether they clicked it.",
    icon: Target,
  },
  {
    title: "Acceptance rate",
    desc: "For suggestions and drafts, how often the output is used with little or no editing.",
    icon: CheckCircle2,
  },
  {
    title: "Latency at the felt percentile",
    desc: "Time to first token and time to usable result at the percentile users notice.",
    icon: Zap,
  },
  {
    title: "Cost per interaction",
    desc: "Model, retrieval and tool cost per use, tracked against plan pricing and margin.",
    icon: Coins,
  },
  {
    title: "Fallback and escalation rate",
    desc: "How often the feature declines, degrades or hands off, and whether those were the right calls.",
    icon: ArrowRightLeft,
  },
];

const QUESTIONS = [
  {
    question: "What is AI product engineering?",
    answer: "AI product engineering is the design and build of software products whose core value depends on AI behaviour: AI-native applications, AI features inside existing products, copilots, semantic search, recommendations and agentic functionality. It combines product design, AI orchestration, backend and frontend engineering, evaluation and production operations.",
    detail: ["It differs from conventional product development because the central component is probabilistic. Design, testing, pricing and support all change when the feature can be wrong."],
  },
  {
    question: "Should we build our AI feature on a model API or on our own model?",
    answer: "Start on a hosted model API unless data policy, latency or unit economics rule it out. Your differentiation is the context you supply, the workflow you design and the evaluation that proves quality, not the weights. Revisit the choice when evaluation shows a gap or when volume makes self-hosting cheaper.",
    detail: ["A model gateway from day one keeps the choice reversible: routing, fallbacks and provider changes then happen without a rewrite."],
  },
  {
    question: "How do we know the AI feature is good enough to ship?",
    answer: "When it meets acceptance criteria you wrote down before building: a test set of realistic inputs with expected outputs, quality thresholds agreed with product, latency and cost budgets, and defined behaviour for failure. If those criteria do not exist, the feature is not ready, however good the demo looks.",
    detail: ["Release gates then run the same evaluation on every change, so a prompt tweak or model update cannot silently regress quality."],
    link: { label: "How we set acceptance criteria for AI features", href: P.evaluation.path },
  },
  {
    question: "How does cost per interaction affect pricing?",
    answer: "Directly. An AI feature has a variable serving cost that traditional software does not, so the plan it sits in, the usage limits and the model tier per user all have to be designed together with the feature. Measuring cost per interaction from the first release is what makes that design possible.",
    detail: ["We do not offer pricing advice; we make the unit economics visible so your product and finance teams can decide."],
  },
  {
    question: "Should we build the AI product in-house or with a partner?",
    answer: "Build with a partner when you need senior AI engineering faster than you can hire it and want the system built so your team can own it. Build in-house when the AI behaviour is your core product and you already have the engineers. Many companies do both: a partner engineers the first production version while the permanent team is hired.",
    detail: ["That hand-over is designed in from the start, and it is where AI Talent and an AI Micro GCC continue the journey."],
    link: { label: "Hire the engineers to own it: AI Talent", href: AI_ENGINEERING_CROSS_LINKS.aiTalent.href },
  },
];

export default function AIProductEngineering() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "product",
        eyebrow: "Enterprise AI Engineering · AI Product Engineering",
        title: PAGE.h1,
        description:
          "AI-native products, AI features inside existing software, copilots, semantic search, recommendations and agentic functionality engineered for real users, with AI behaviour, AI UX, evaluation, latency, trust and cost per interaction designed together.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Discuss the AI product or feature you are building.",
        description:
          "Bring the user job, the current prototype if there is one, and your latency and margin constraints. We will map the orchestration, model, data, evaluation and UX design, and what it takes to ship and own it.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.genai.path, context: "The retrieval, model and agent engineering behind copilots, search and agentic features." },
        { href: P.applied.path, context: "Recommendation, ranking and prediction models inside products." },
        {
          href: AI_ENGINEERING_CROSS_LINKS.aiTalent.href,
          label: "AI Talent",
          context: AI_ENGINEERING_CROSS_LINKS.aiTalent.context,
        },
        { href: P.evaluation.path, context: "Release gates and acceptance criteria for AI features." },
      ]}
    >
      <Section
        id="who-this-is-for"
        eyebrow="Who this is for"
        title="AI features ship fast and disappoint faster when the product is designed around the demo."
        lead="This page is for teams whose users will judge an AI feature every day, and who need it to be trusted, fast and affordable at scale."
        tone="muted"
        width="wide"
      >
        <PillTagList items={AUDIENCES} className="mb-10" />
        <NeoHireXMatrix items={PRODUCT_PROBLEMS} showHeader={false} />
      </Section>

      <InBrief>
        AI Product Engineering designs and builds AI-native products and AI capabilities inside existing software: copilots, semantic search,
        recommendations, agentic features and the APIs, backend and front-end experiences around them. It is for startups, SaaS and software product
        companies whose users will judge the AI feature every day. It solves the problems generic development ignores: probabilistic behaviour,
        latency, cost per interaction, trust, fallback and the evaluation that decides whether a feature is good enough to ship.
      </InBrief>

      <Section
        id="product-architecture"
        eyebrow="How the system fits together"
        title="From the user's job to an observable AI feature."
        lead="The product experience comes first because it decides everything below it: what the orchestration must do, which model quality is enough, what context is needed and what evaluation has to prove."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we engineer."
        lead="Product architecture, the experiences users touch, and the engineering and operations that keep them working."
        tone="muted"
        width="wide"
      >
        <ImageFeatureCardGrid items={CAPABILITIES} columns={3} />
      </Section>

      <Section
        id="not-outsourced-development"
        title="This is not outsourced feature development."
        lead="A generic development team builds what is specified. AI product engineering has to decide what the feature should do when the model is uncertain, slow, expensive or wrong, and those decisions are the product. Our focus is the list below, not ticket throughput."
        width="wide"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-stretch">
          <div className="bg-transparent p-6 sm:p-7 flex flex-col justify-center">
            <h3 className="text-base sm:text-lg font-bold text-[#0D306C] tracking-tight leading-snug mb-4 font-sans text-center">
              Our focus
            </h3>
            <PillTagList items={FOCUS} align="start" />
          </div>
          <PointOfView statement="The value of AI is measured in the workflow, not the model demo.">
            <p>
              An AI feature earns its place when users complete their job faster or better and keep coming back. Adoption, task completion and
              acceptance rate are the product metrics; model benchmarks are an input to them, not a substitute.
            </p>
          </PointOfView>
        </div>
      </Section>

      <Section
        id="ai-changes-product-design"
        title="AI changes product design, not just backend architecture."
        lead="Nine design decisions that do not exist in deterministic software and that decide whether an AI feature is trusted."
        tone="muted"
        width="wide"
      >
        <CapabilitiesSection items={DESIGN_CHANGES} columns={3} />
      </Section>

      <Section id="questions" eyebrow="Answer first" title="The questions product teams ask us first." width="regular">
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

      <Section id="metrics" eyebrow="Metrics we design for" title="What we instrument on every AI feature." tone="muted" width="wide">
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>
    </AiEngineeringPageLayout>
  );
}
