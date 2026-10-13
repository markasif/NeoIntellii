import { Link } from "react-router-dom";
import {
  AiGccPageLayout,
  Section,
  InBrief,
  AnswerBlock,
  MetricsWeDesignFor,
  GenAiArchitectureLifecycle,
  GenAiCapabilitiesMosaic,
  SplitValuePointOfView,
} from "@/components/ai-gcc";
import { AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";
import { Target, SearchCheck, UserCheck, Zap, Coins, Bug } from "lucide-react";

const PAGE = AI_GCC_PAGE_BY_KEY.genai;

const FLOW = [
  { label: "Enterprise data", detail: "Documents, records, APIs and events under the client's classification." },
  { label: "RAG and models", detail: "Retrieval, ranking, model routing and adaptation where it earns its cost." },
  { label: "Agents", detail: "Tool-using agents with permissions, registry and versioning." },
  { label: "Workflows", detail: "Embedded in the business process with human decision points." },
  { label: "Evaluation", detail: "Continuous evaluation, tracing and cost per task feeding back into every stage." },
];

const CAPABILITIES = [
  {
    title: "Enterprise RAG",
    body: "Retrieval pipelines over governed enterprise data: chunking, embedding, hybrid search, re-ranking, citation and access control that follows the source system.",
    image: "/images/services/ai-gcc/genai/enterprise-rag.webp",
  },
  {
    title: "AI copilots",
    body: "Knowledge and workflow copilots for engineering, operations, customer and back-office teams, designed around the task and the escalation path, not the chat box.",
    image: "/images/services/ai-gcc/genai/ai-copilots.webp",
  },
  {
    title: "Agentic AI",
    body: "Multi-step agents that plan, call tools and complete work inside defined permissions, with tracing and human escalation built in from the first version.",
    image: "/images/services/ai-gcc/genai/agentic-ai.webp",
  },
  {
    title: "Model adaptation",
    body: "Prompt engineering, structured outputs, fine-tuning and distillation chosen by evidence from evaluation rather than by default.",
    image: "/images/services/ai-gcc/genai/model-adaptation.webp",
  },
  {
    title: "Evaluation",
    body: "Task-level evaluation sets, LLM-as-judge with human calibration, regression suites for prompts and retrieval, and red-teaming for the risks that matter to the use case.",
    image: "/images/services/ai-gcc/genai/evaluation.webp",
  },
  {
    title: "Production engineering",
    body: "Gateways, caching, rate limiting, fallbacks, observability and rollout patterns so a GenAI feature behaves like software, not a demo.",
    image: "/images/services/ai-gcc/genai/production-engineering.webp",
  },
  {
    title: "AI economics",
    body: "Cost per task, model routing across tiers, caching and batch strategies, and the unit economics the business case depends on.",
    image: "/images/services/ai-gcc/genai/ai-economics.webp",
  },
];

const AGENT_OPERATING_MODEL = ["Agent registry", "Versioning", "Tool permissions", "Tracing", "Evaluation", "Human escalation", "Cost per task", "Incident handling", "Governance"];

const METRICS = [
  { text: "Task success rate against an agreed evaluation set", icon: Target },
  { text: "Retrieval precision and citation coverage", icon: SearchCheck },
  { text: "Escalation rate to a human", icon: UserCheck },
  { text: "Latency at the percentile the workflow needs", icon: Zap },
  { text: "Cost per completed task", icon: Coins },
  { text: "Prompt and retrieval regression caught before release", icon: Bug },
];

const FAQ = [
  {
    question: "Should we fine-tune or use RAG?",
    answer: "Start with retrieval for knowledge the model does not have and for content that changes. Fine-tune for behaviour, format or domain style the base model gets wrong consistently. Evaluation decides, not preference.",
  },
  {
    question: "What is agentic AI in an enterprise context?",
    answer: "Software that uses a model to plan and execute multi-step work with tools, inside defined permissions, with tracing and a human escalation path. Without those constraints it is a prototype.",
  },
  {
    question: "How do you handle hallucinations?",
    answer: "With grounding, citation, structured outputs, evaluation sets that measure faithfulness for the specific task, and workflow design that routes low-confidence answers to a person. No fixed hallucination percentage is promised because the honest figure depends on the task and the data.",
  },
  {
    question: "Which foundation models do you work with?",
    answer: "The ones your data policy, latency and cost allow. Commercial APIs, open-weight models on your own infrastructure, or a routed mix. Model choice is an evaluation result and a governance decision, not a vendor preference.",
  },
  {
    question: "Is generative AI usable in regulated industries?",
    answer: "Yes, with the controls designed in: data classification, residency, access that follows the source system, evaluation evidence, human oversight and an audit trail. AI governance covers this on its own page.",
  },
  {
    question: "How does GenAI fit the rest of the AI GCC?",
    answer: "It sits on the data foundation, runs on the AI infrastructure, ships through MLOps and LLMOps, and is governed with the rest of the AI inventory. The GCC owns the whole chain, which is what makes production possible.",
  },
];

export default function GenerativeAI() {
  return (
    <AiGccPageLayout
      hero={{
        pageKey: "genai",
        eyebrow: "AI GCC in India · Generative & Agentic AI",
        title: "Generative & Agentic AI for GCCs.",
        description: "Build production GenAI and agentic AI inside your GCC: enterprise RAG, copilots, tool-using agents, model adaptation, evaluation, production engineering and the cost controls that keep a use case fundable.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Back to AI GCC in India", href: AI_GCC_PAGE_BY_KEY.overview.path },
      }}
      cta={{
        title: "Discuss a production AI use case.",
        description: "Bring the workflow, the data it depends on and the constraint that has stopped it so far. We will map the RAG, model, agent and evaluation design and what the GCC needs to run it.",
      }}
      related={[
        { page: "overview" },
        { page: "mlops" },
        { page: "data" },
        { page: "infrastructure" },
        { page: "governance" },
      ]}
    >
      <InBrief>
        Generative & Agentic AI inside an AI GCC means building copilots, retrieval systems and tool-using agents that run in production on governed enterprise data. NeoIntelli designs the RAG and model layer, engineers the agents and workflows, sets up evaluation and tracing, and connects the result to the GCC's MLOps, LLMOps and AgentOps operating layer so that cost, quality and risk are managed continuously rather than at launch.
      </InBrief>

      <Section id="genai-architecture" eyebrow="ARCHITECTURE" title="From enterprise data to evaluated workflows." width="wide" align="center" lead="Every GenAI system in the GCC follows this chain. Evaluation is the last box in the diagram and the first thing designed.">
        <GenAiArchitectureLifecycle steps={FLOW} />
      </Section>

      <Section id="genai-capabilities" width="wide">
        <GenAiCapabilitiesMosaic
          eyebrow="CAPABILITIES"
          title="What the GCC builds and runs."
          lead="Enterprise RAG, copilots, tool-using agents, model adaptation, evaluation, production engineering and the cost controls that keep a use case fundable."
          items={CAPABILITIES}
        />
      </Section>

      <Section id="agent-operating-model" eyebrow="AGENTOPS" title="Agents require an operating model, not just an orchestration framework." width="wide" align="center" lead="An agent that can call tools is an actor in your systems. It needs the same operating discipline as a service and a new-joiner combined.">
        <SplitValuePointOfView
          description="The registry knows which agents exist and which version is live. Permissions define which tools each agent may call and with what scope. Tracing records every step. Evaluation measures task success before and after each change."
          pillsTitle="AgentOps Controls"
          pills={AGENT_OPERATING_MODEL}
          footer={
            <>
              This layer is run by <Link to={AI_GCC_PAGE_BY_KEY.mlops.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_PAGE_BY_KEY.mlops.name}</Link> and governed under <Link to={AI_GCC_PAGE_BY_KEY.governance.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_PAGE_BY_KEY.governance.name}</Link>.
            </>
          }
          imageSrc="/images/services/ai-gcc/Futuristic AI Governance Command Center.webp"
          imageAlt="AgentOps & Autonomous Workflows"
          ourViewText="An AI agent without evaluation, permissions and observability is a prototype, not an enterprise capability."
        />
      </Section>

      <Section id="genai-measures" eyebrow="MEASURES OF SUCCESS" title="What a production GenAI use case is measured on." width="wide" align="center">
        <MetricsWeDesignFor items={METRICS} />
      </Section>

      <Section id="genai-questions" eyebrow="BUYER QUESTIONS" title="Questions about GenAI and agents in a GCC." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
