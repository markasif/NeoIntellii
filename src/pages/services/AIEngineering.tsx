import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Compass, Users, Sparkles } from "lucide-react";
import {
  AiEngineeringPageLayout,
  AiEngineeringLifecycle,
  AnswerBlock,
  PointOfView,
  PillFeatureCardGrid,
  ReadinessFramework,
  Section,
  SourceNote,
  SpecialistHiringMosaic,
  AiGccArchitecture,
  type ArchitectureLayer,
  HiringPathCards,
  type HiringPath,
  StaggeredFeatureGrid,
  type StaggeredFeatureCardItem,
  NeoHireXMatrix,
} from "@/components/ai-engineering";
import ImageFeatureCardGrid, { type ImageFeatureCardItem } from "@/components/shared/ImageFeatureCardGrid";
import {
  AI_ENGINEERING_CHILD_PAGES,
  AI_ENGINEERING_CROSS_LINKS,
  AI_ENGINEERING_PAGE_BY_KEY,
} from "@/data/aiEngineering";
import { AI_ENGINEERING_SOURCES } from "@/data/aiEngineeringSources";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.overview;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const PRODUCTION_GAP = [
  {
    eyebrow: "GAP 01",
    title: "The model works. The workflow doesn't.",
    desc: "Integration, process design and adoption are missing. The output is correct and nobody's job changes, because nothing upstream or downstream was redesigned to use it.",
    image: "/images/ai-engineering/workflow-integration-gap.webp",
    imageAlt: "Enterprise AI and workflow integration architecture",
  },
  {
    eyebrow: "GAP 02",
    title: "The prototype works. Production doesn't.",
    desc: "Evaluation, observability, security and operating discipline are missing. It handled twenty hand-picked examples and now meets twenty thousand real ones with no way to tell how it is doing.",
    image: "/images/ai-engineering/production-observability-gap.webp",
    imageAlt: "Production AI telemetry and observability monitoring dashboard",
  },
  {
    eyebrow: "GAP 03",
    title: "The AI works. The economics don't.",
    desc: "Latency, infrastructure, token cost, human escalation or low adoption make the system uneconomic. It is correct, slow, expensive, and used by a handful of people.",
    image: "/images/ai-engineering/compute-economics-gap.webp",
    imageAlt: "AI compute economics and token cost FinOps dashboard",
  },
];

const THREE_TYPES = [
  {
    title: "Applied AI & Machine Learning",
    verb: "Predict",
    items: ["Forecast", "Classify", "Optimize", "Recommend", "Detect"],
    body: "Trained on your historical data to make a repeatable, measurable decision. The right tool when the question has a numeric or categorical answer and the past is a guide to the future.",
    href: P.applied.path,
  },
  {
    title: "Generative AI",
    verb: "Generate",
    items: ["Summarize", "Retrieve", "Interpret", "Assist"],
    body: "Large language and multimodal models working over language, documents and images. The right tool when the input is unstructured and the output is text, a structured extract or an assisted decision.",
    href: P.genai.path,
  },
  {
    title: "Agentic AI",
    verb: "Plan",
    items: ["Reason", "Use tools", "Execute multi-step workflows", "Escalate to humans"],
    body: "Models that plan and act across systems inside defined permissions. The right tool when a workflow has several steps, several systems and a clear boundary for what a human must approve.",
    href: P.agents.path,
  },
];

const AI_ENGINEERING_CAPABILITY_CARDS = [
  {
    key: "genai",
    name: "Generative & Agentic AI",
    group: "GENAI",
    path: "/services/ai-engineering/generative-agentic-ai",
    anchor: "Explore GenAI & Agents",
    summary: "RAG, LLM applications, multimodal models, tool calling and bounded agentic systems for enterprise workflows.",
    image: "/images/ai-engineering/genai-capability.webp",
  },
  {
    key: "applied",
    name: "Applied AI & Machine Learning",
    group: "APPLIED ML",
    path: "/services/ai-engineering/applied-ai-ml",
    anchor: "Explore Applied AI",
    summary: "Predictive modeling, forecasting, classification and classical ML where smaller, testable models outperform LLMs.",
    image: "/images/ai-engineering/applied-ml-capability.webp",
  },
  {
    key: "data",
    name: "AI Data Engineering",
    group: "DATA",
    path: "/services/ai-engineering/data-engineering",
    anchor: "Explore Data Engineering",
    summary: "Production pipelines, feature stores, vector stores, streaming ETL and data platforms that keep models fed and grounded.",
    image: "/images/ai-engineering/data-engineering-capability.webp",
  },
  {
    key: "product",
    name: "AI Product Engineering",
    group: "PRODUCT",
    path: "/services/ai-engineering/ai-product-engineering",
    anchor: "Explore AI Product",
    summary: "End-to-end applications, interfaces, workflows and UX that turn AI capabilities into systems people actually use.",
    image: "/images/ai-engineering/product-engineering-capability.webp",
  },
  {
    key: "agents",
    name: "Agentic AI & Multi-Agent Systems",
    group: "ORCHESTRATION",
    path: "/services/ai-engineering/ai-agents-automation",
    anchor: "Explore Agentic AI",
    summary: "Multi-step autonomous execution, tool use, memory systems, boundary conditions and human-in-the-loop oversight.",
    image: "/images/ai-engineering/agentic-systems-capability.webp",
  },
  {
    key: "ops",
    name: "MLOps & AI Platform Engineering",
    group: "MLOPS",
    path: "/services/ai-engineering/mlops-llmops-agentops",
    anchor: "Explore MLOps & Platform",
    summary: "Deployment, serving, scaling, latency optimization, CI/CD and GPU infrastructure monitoring for production reliability.",
    image: "/images/ai-engineering/mlops-platform-capability.webp",
  },
  {
    key: "evaluation",
    name: "AI Evaluation & Assurance",
    group: "ASSURANCE",
    path: "/services/ai-engineering/ai-evaluation-assurance",
    anchor: "Explore Evaluation",
    summary: "Evaluation datasets, red teaming, hallucination metrics, safety guardrails and real-time production quality assurance.",
    image: "/images/ai-engineering/evaluation-assurance-capability.webp",
  },
];

const AI_ENGINEERING_LAYERS: ArchitectureLayer[] = [
  {
    name: "Experience & Workflow",
    accent: "#169DC8",
    items: ["Applications", "Copilots", "Agents", "APIs", "Business workflows"],
  },
  {
    name: "Intelligence",
    accent: "#F59E0B",
    items: ["LLMs", "ML models", "Computer vision", "Optimization", "Decision systems"],
  },
  {
    name: "Context & Data",
    accent: "#008EC4",
    items: ["Structured data", "Documents", "Vector retrieval", "Knowledge", "Features", "Evaluation datasets"],
  },
  {
    name: "Production Layer",
    accent: "#38BDF8",
    highlight: true,
    badge: "Core Engineering",
    items: ["MLOps", "LLMOps", "AgentOps", "Evaluation", "Observability", "Security"],
  },
  {
    name: "Infrastructure",
    accent: "#0D306C",
    items: ["Cloud", "GPU", "Storage", "Networking", "CI/CD", "FinOps"],
  },
];

const ARCHITECTURE = AI_ENGINEERING_LAYERS;

const BUILD_BUY = [
  {
    question: "When is SaaS enough?",
    answer: "When the AI capability is not part of how you compete and a vendor already solves the workflow well. Buy it, integrate it and spend your engineering elsewhere.",
    detail: ["Typical cases: meeting transcription, generic document OCR, standard support deflection. The test is whether your data or your process would make a custom system materially better. If not, SaaS wins on cost and time."],
  },
  {
    question: "When is an API-based solution enough?",
    answer: "When a hosted model plus your own retrieval, prompts, tooling and evaluation gives the quality you need, and your data policy allows the data to leave your environment.",
    detail: ["This is the default starting point for most GenAI systems. The differentiation lives in the context you supply, the workflow you build around the model and the evaluation that proves it works, not in the model weights."],
  },
  {
    question: "When is custom AI justified?",
    answer: "When the problem is specific to your data, the decision is repeated at volume, and a measurable business outcome depends on getting it right.",
    detail: ["Demand forecasting on your sales history, fraud patterns in your transactions, defect detection on your production line. Here a hosted general model is the wrong shape, and a purpose-built ML system earns its cost."],
  },
  {
    question: "When is fine-tuning justified?",
    answer: "When evaluation shows the base model consistently fails on behaviour, format or domain style that retrieval and prompting cannot fix, and you have enough good examples to teach it.",
    detail: ["Fine-tuning does not add knowledge that changes weekly; retrieval does that. It is a targeted intervention decided by evidence from evaluation, not a default step in every project."],
  },
  {
    question: "When may self-hosting be justified?",
    answer: "When data residency, latency, predictable volume or per-token economics make a hosted API the wrong choice, and you have or will build the operating capability to run models.",
    detail: ["Open-weight models on your own infrastructure remove a data boundary and can lower unit cost at sustained volume. They also transfer availability, patching and capacity planning to your team."],
  },
  {
    question: "When may dedicated infrastructure be justified?",
    answer: "When sustained, predictable GPU utilisation is high enough that reserved or dedicated capacity is cheaper than on-demand, and the workload is stable enough to plan against.",
    detail: ["Dedicated GPUs are not automatically cheaper than cloud compute. Utilisation determines the economics, and bursty experimentation usually belongs on-demand. Infrastructure and GPU decisions sit with the AI GCC pillar."],
  },
];

const JOURNEY: HiringPath[] = [
  {
    title: "I have an AI idea",
    tagline: "Discover & Prove",
    body: "Discover and prove. We frame the business problem, check the data and constraints, and run a proof of value with a baseline and acceptance criteria.",
    cta: {
      label: "Start with a proof of value",
      href: P.applied.path,
    },
    image: "/images/ai-engineering/journey-start-idea.webp",
    imageAlt: "Frame business problem and proof of value",
  },
  {
    title: "I have an AI prototype",
    tagline: "Move Prototype to Production",
    body: "Production engineering. We rebuild the prototype as a system with integration, evaluation, security, observability and an owner.",
    cta: {
      label: "Move a prototype to production",
      href: P.genai.path,
    },
    image: "/images/ai-engineering/journey-start-prototype.webp",
    imageAlt: "Rebuild prototype into production AI system",
    highlight: true,
  },
  {
    title: "I already have AI in production",
    tagline: "Scale & Operations",
    body: "Scale, evaluation and operations. We review reliability, quality drift, cost per request and the operating model, then fix what limits scale.",
    cta: {
      label: "Review production AI operations",
      href: P.ops.path,
    },
    image: "/images/how_we_work/phase_03_operate.webp",
    imageAlt: "Review reliability and production AI operations",
  },
  {
    title: "I need a permanent AI team",
    tagline: "Hire Validated Specialists",
    body: "AI Talent. Once the system is stable, we help hire the engineers who will own it, validated by senior AI practitioners.",
    cta: {
      label: "Explore AI Talent",
      href: AI_ENGINEERING_CROSS_LINKS.aiTalent.href,
    },
    image: "/images/solution_ai_talent.webp",
    imageAlt: "Hire and technically validate permanent AI engineers",
  },
  {
    title: "I need an India capability center",
    tagline: "AI Micro GCC & Scale",
    body: "AI Micro GCC or AI GCC. Start with one squad in India that owns the system, and grow it into a full capability center when the mandate justifies it.",
    cta: {
      label: "Start an AI Micro GCC",
      href: AI_ENGINEERING_CROSS_LINKS.microGcc.href,
    },
    image: "/images/solution_micro_gcc.webp",
    imageAlt: "Start an AI Micro GCC or capability center in India",
  },
];

const DIFFERENCE: StaggeredFeatureCardItem[] = [
  {
    title: "A traditional software vendor",
    who: "A traditional software vendor",
    body: "builds what you specify.",
    does: "builds what you specify.",
    icon: Boxes,
    isTall: true,
  },
  {
    title: "An AI consultancy",
    who: "An AI consultancy",
    body: "advises what you should do.",
    does: "advises what you should do.",
    icon: Compass,
    isTall: false,
  },
  {
    title: "A recruitment firm",
    who: "A recruitment firm",
    body: "finds people.",
    does: "finds people.",
    icon: Users,
    isTall: false,
  },
  {
    title: "NeoIntelli",
    who: "NeoIntelli",
    body: "helps identify the AI opportunity, engineers it into production and builds the permanent capability needed to own it.",
    does: "helps identify the AI opportunity, engineers it into production and builds the permanent capability needed to own it.",
    icon: Sparkles,
    isTall: true,
    highlight: true,
  },
];

const PILLARS: ImageFeatureCardItem[] = [
  {
    eyebrow: "PILLAR 01",
    title: "Build the AI",
    desc: "Enterprise AI Engineering. Generative AI, Agentic AI, machine learning, data, MLOps and evaluation, taken from proof of value into reliable production workflows.",
    items: [
      "Generative & Agentic AI systems",
      "Applied ML & predictive models",
      "Data foundations & pipeline engineering",
      "Continuous evaluation & MLOps platforms",
    ],
    image: "/images/ai-architecture.webp",
    imageAlt: "Enterprise AI Engineering and Model Architecture",
    href: "#capabilities",
    linkLabel: "You are here · Explore capabilities",
  },
  {
    eyebrow: "PILLAR 02",
    title: "Build the team",
    desc: "AI Talent. Hire technically validated specialists, from a single critical hire to a full engineering squad, validated by practicing AI engineers on NeoHireX.",
    items: [
      "Role-calibrated specialist search",
      "NeoHireX screening & AI first-round",
      "Senior practitioner technical validation",
      "Evidence-backed evaluation dossier",
    ],
    image: "/images/solution_ai_talent.webp",
    imageAlt: "AI Talent technical validation and team building in India",
    href: AI_ENGINEERING_CROSS_LINKS.aiTalent.href,
    linkLabel: "Explore AI Talent",
  },
  {
    eyebrow: "PILLAR 03",
    title: "Build the capability",
    desc: "AI Micro GCC & AI GCC. Start with a dedicated squad in India that owns the system, and scale into a full Global Capability Center with governance and BOT ownership transfer.",
    items: [
      "Dedicated 5-to-30 person AI squad",
      "People operations, workspace & zero-trust IT",
      "Enterprise governance & AgentOps",
      "Full BOT transfer or captive model",
    ],
    image: "/images/mosaic_ai_gcc.webp",
    imageAlt: "Global AI Capability Center and Micro GCC in India",
    href: AI_ENGINEERING_CROSS_LINKS.aiGcc.href,
    linkLabel: "Explore AI GCC",
  },
];

export default function AIEngineering() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "overview",
        eyebrow: "Enterprise AI Engineering",
        title: PAGE.h1,
        description:
          "NeoIntelli designs and engineers production AI systems across Generative AI, Agentic AI, machine learning and data. From the data foundation and model architecture to evaluation, MLOps and enterprise integration, we help move AI from proof of value into real workflows.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Explore AI Engineering", href: "#capabilities" },
        tertiaryLink: { label: "AI GCC India Command Center", href: "/services/ai-gcc" },
      }}
      cta={{
        title: "Bring us the use case, not the model.",
        description:
          "Tell us the workflow, the decision it is meant to improve and the data it depends on. We will tell you which kind of AI it needs, what a proof of value would take and what production would require.",
      }}
    >
      {/* 1. The production gap */}
      <Section
        id="production-gap"
        eyebrow="The production gap"
        title="AI prototypes are easy. Production AI is not."
        lead="Most enterprise AI programmes do not fail at the model. They fail in the gap between a working demo and a system the business can rely on. The gap has three familiar shapes."
        width="wide"
      >
        <NeoHireXMatrix items={PRODUCTION_GAP} showHeader={false} />
        <p className="mt-8 sm:mt-10 max-w-3xl mx-auto text-[#505D74] text-sm sm:text-base leading-relaxed text-center font-normal">
          NeoIntelli engineers the whole system: the workflow, the data, the model, the evaluation, the integration and the operating discipline.
          That is what turns a demo into a system with owners, acceptance criteria and a cost the business understands.
        </p>
      </Section>

      {/* 2. Definition (answer first) */}
      <Section id="what-is-ai-engineering" title="What is AI engineering?" width="regular" align="center">
        <div className="max-w-5xl mx-auto text-left space-y-6 sm:space-y-7">
          <p className="text-primary text-lg md:text-xl leading-relaxed font-display mb-6">
            AI engineering is the discipline of designing, building, integrating and operating artificial intelligence systems in production.
            It combines data engineering, machine learning, Generative AI, software engineering, evaluation, infrastructure, MLOps and governance
            so that AI can operate reliably inside real business workflows instead of remaining an isolated prototype. The output of AI engineering
            is not a model. It is a dependable system with owners, acceptance criteria and a cost the business understands.
          </p>
          <p className="text-[#505D74] text-sm sm:text-base leading-relaxed font-normal">
            The distinction matters because the skills that produce a convincing demo are not the skills that keep a system correct, fast, secure
            and affordable at volume. Data science answers &ldquo;can a model do this?&rdquo;. AI engineering answers &ldquo;can this run inside the business,
            every day, and can we tell when it stops working?&rdquo;.
          </p>
          <p className="text-[#505D74] text-sm sm:text-base leading-relaxed font-normal">
            Enterprise AI Engineering at NeoIntelli covers that full span, from the first framing of a use case to the point where an internal
            team owns the system. It is a different question from the one our{" "}
            <Link to={AI_ENGINEERING_CROSS_LINKS.aiGcc.href} className="text-[#008EC4] hover:text-[#0D306C] underline underline-offset-4 transition-colors font-medium">
              AI GCC
            </Link>{" "}
            pages answer. AI GCC asks what capabilities an India capability center should own. AI Engineering asks whether NeoIntelli can design and build this
            capability for your company. The two connect at the end of the lifecycle, when a working system needs a permanent home.
          </p>

          <SourceNote
            source={AI_ENGINEERING_SOURCES.hiddenTechDebt}
            variant="navy-rect"
            className="mt-8 sm:mt-10"
          />
        </div>
      </Section>

      {/* 3. Three types of AI */}
      <Section
        id="three-types-of-ai"
        eyebrow="Three kinds of AI"
        title="Not every problem needs the same kind of AI."
        lead="Applied machine learning, Generative AI and Agentic AI solve different problems and fail in different ways. We choose the architecture from the problem, and we do not force a language model into a job a smaller, cheaper, more testable model does better."
        width="wide"
      >
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
          <PillFeatureCardGrid items={THREE_TYPES} />

          <PointOfView statement="Not every business problem needs an LLM." className="w-full">
            <p>
              A demand forecast, a fraud score or a defect detector is a prediction problem, and a language model is an expensive, slow and hard-to-test
              way to make a prediction. We reserve Generative AI for language, documents and assistance, and Agentic AI for multi-step work across
              systems. Choosing the smallest architecture that solves the problem is most of what keeps production AI economic.
            </p>
          </PointOfView>
        </div>
      </Section>

      {/* 4. Lifecycle framework */}
      <Section
        id="proof-of-value-to-capability"
        eyebrow="Proof of Value → Production → Permanent Capability"
        title="From proof of value to permanent AI capability."
        lead="Six stages, one team, no hand-off between the people who prove the value and the people who run the system. The final stage is what makes NeoIntelli different: we help build the team, the AI Micro GCC or the AI GCC that will own what we built."
        width="wide"
      >
        <AiEngineeringLifecycle />
      </Section>

      {/* 5. Capability grid */}
      <Section id="capabilities" width="wide">
        <SpecialistHiringMosaic
          eyebrow="Capabilities"
          title="One engineering partner across the AI stack."
          lead="Seven engineering capabilities that are usually combined on a single system. Each has its own page with the decisions, trade-offs and evaluation approach that shape it."
          pages={AI_ENGINEERING_CAPABILITY_CARDS}
          showBadge={false}
        />
      </Section>

      {/* 6. Architecture */}
      <Section
        id="production-ai-architecture"
        eyebrow="CORE ARCHITECTURE"
        title="Production AI requires more than a model."
        lead="Five layers have to exist for an AI system to run inside a business. Most stalled programmes have built one or two of them well and assumed the rest."
        theme="navy"
        width="wide"
        align="center"
        wavesOnMobile
      >
        <AiGccArchitecture layers={AI_ENGINEERING_LAYERS} />
      </Section>

      {/* 7. Build vs buy vs API */}
      <Section
        id="build-buy-or-integrate"
        eyebrow="Technical judgment"
        title="Build, buy or integrate?"
        lead="Custom development is the right answer less often than vendors suggest. These are the questions we ask before recommending anything, and the honest answer is often a smaller build than the one you came in with."
        width="wide"
      >
        <AnswerBlock items={BUILD_BUY} />
        <p className="mt-8 text-xs sm:text-sm text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          Infrastructure and GPU strategy for an India capability center is covered under{" "}
          <Link to={AI_ENGINEERING_CROSS_LINKS.aiInfrastructure.href} className="text-[#008EC4] hover:text-[#0D306C] underline underline-offset-4 transition-colors font-medium">
            AI GCC
          </Link>
          . AI Engineering pages discuss infrastructure requirements as they affect a system's design and economics; they do not duplicate that page.
        </p>
      </Section>

      {/* 8. Production readiness */}
      <Section
        id="production-ready"
        eyebrow="Readiness framework"
        title="What makes an AI system production-ready?"
        lead="An AI system is production-ready when it is integrated into a real workflow, has acceptance criteria it demonstrably meets, is observable and secure in operation, has an economic model the business accepts, and has a named owner. We assess readiness across eleven dimensions and five stages."
        width="wide"
      >
        <ReadinessFramework />
      </Section>

      {/* 9. Client journey */}
      <Section
        id="where-to-start"
        eyebrow="Where are you starting from?"
        title="Five starting points, one lifecycle."
        lead="The engagement shape depends on where the AI is today. Each path enters the same six-stage lifecycle at a different stage."
        width="wide"
      >
        <HiringPathCards paths={JOURNEY} buttonVariant="white-to-cyan" />
      </Section>

      {/* 10. Buyer questions */}
      <Section id="questions" eyebrow="Questions we are asked" title="Straight answers before the first call." width="regular">
        <AnswerBlock
          items={[
            {
              question: "Does every AI project need an LLM?",
              answer: "No. A large language model is the right tool for language, documents, retrieval and assistance. For forecasting, classification, optimisation and anomaly detection, a trained machine learning model is usually more accurate, cheaper to run and far easier to evaluate.",
              detail: ["We see the reverse mistake too: rules or classical ML forced onto a problem that is really about interpreting unstructured text. The first engineering decision is which kind of AI the problem needs, and it is made from the data and the decision, not from what is fashionable."],
            },
            {
              question: "When should a company build custom AI?",
              answer: "When the problem is specific to its own data, the decision repeats at volume, and a measurable outcome depends on the result. If a vendor already solves the workflow well and your data would not make a custom system materially better, buy it instead.",
              detail: ["Our build, buy or integrate section above sets out the six questions we work through. Most GenAI systems start on a hosted model API; the differentiation is in the context, the workflow and the evaluation, not the weights."],
            },
            {
              question: "How does AI Engineering relate to AI GCC and AI Talent?",
              answer: "AI Engineering builds the AI. AI Talent builds the team that will own it. AI Micro GCC and AI GCC build and operate the India capability center around it. They are sequential, not competing, and a client can enter at any point.",
              detail: ["A company that only needs a production system engineered can stop after stage five. A company that wants to own the capability permanently continues into stage six, where we help hire the engineers, stand up an India squad, or design a full AI GCC."],
            },
            {
              question: "How does an engagement start?",
              answer: "With a working session on one use case: the business problem, the workflow, the expected outcome, the data, the constraints and the risk. From that we propose a proof of value with a baseline and acceptance criteria, or tell you that the problem does not need AI yet.",
              detail: ["Senior engineers are involved from the first conversation. There is no separate sales team producing a proposal that the delivery team then discovers."],
            },
          ]}
        />
      </Section>

      {/* 11. How NeoIntelli is different */}
      <Section
        id="how-we-are-different"
        eyebrow="How we work"
        title="Senior engineers, focused teams, and a path to owning it yourself."
        lead="We do not compete on scale, accelerators or hyperscaler partnerships. We compete on senior technical involvement, specialised AI execution, small focused teams and the ability to turn what we build into a permanent capability you own."
        width="wide"
      >
        <StaggeredFeatureGrid items={DIFFERENCE} />
      </Section>

      {/* 12. Cross-pillar */}
      <Section
        id="build-the-ai-team-capability"
        eyebrow="The NeoIntelli journey"
        title="Build the AI. Build the team. Build the capability."
        lead="AI Engineering stands on its own. When a system becomes strategic, the same partner can help hire the engineers to own it, start an AI Micro GCC in India, or design and operate a full AI GCC."
        width="wide"
      >
        <ImageFeatureCardGrid items={PILLARS} columns={3} />
      </Section>
    </AiEngineeringPageLayout>
  );
}
