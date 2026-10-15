import { Link } from "react-router-dom";
import {
  Target,
  ShieldCheck,
  Crosshair,
  UserCheck,
  Zap,
  Coins,
} from "lucide-react";
import {
  AiEngineeringPageLayout,
  FlowDiagram,
  InBrief,
  PointOfView,
  Section,
  SourceNote,
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  HiringPathCards,
  type HiringPath,
  AmberChecklist,
  CapabilitiesSection,
  type CapabilityItem,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { AI_ENGINEERING_SOURCES } from "@/data/aiEngineeringSources";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.genai;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const STALL_POINTS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "UNGROUNDED RETRIEVAL",
    title: "The answer is fluent but ungrounded",
    body: "The model writes confidently about a policy it never retrieved. Without retrieval that is measured, citations that are checked and evaluation sets that cover the real questions, fluency is mistaken for correctness.",
    image: "/images/services/ai-engineering/genai-ungrounded-retrieval.jpg",
    imageAlt: "Enterprise Generative AI ungrounded retrieval vs factuality verification",
  },
  {
    id: "02",
    category: "TOOL EXECUTION FAILURE",
    title: "The agent works until a tool fails",
    body: "A demo agent handles the happy path. A production agent meets timeouts, partial results, permission errors and ambiguous instructions, and needs a defined behaviour for each of them.",
    image: "/images/services/ai-engineering/agents/monitoring-agentops.webp",
    imageAlt: "Autonomous AI agent live execution trace, tool failure error 503 and incident monitoring",
  },
  {
    id: "03",
    category: "INFERENCE ECONOMICS",
    title: "The unit economics break at volume",
    body: "Per-request cost, latency at the busiest hour and the share of tasks escalated to a human decide whether the system is affordable. None of these are visible in a prototype.",
    image: "/images/services/ai-engineering/inference-unit-economics.jpg",
    imageAlt: "AI token compute economics and high-volume cost modeling dashboard",
  },
];

const FLOW = [
  { label: "Enterprise data", detail: "Documents, records, tickets, APIs and events, classified and access-controlled at the source." },
  { label: "Context and retrieval", detail: "Chunking, embeddings, hybrid search, re-ranking and context assembly measured for retrieval quality." },
  { label: "Models", detail: "Hosted or open-weight models behind a gateway, routed by task, cost and latency, adapted only where evaluation justifies it." },
  { label: "Agents", detail: "Planning, state and memory inside a defined identity with explicit permissions." },
  { label: "Tools and workflows", detail: "Approved tools, enterprise integrations and the business process the output lands in." },
  { label: "Evaluation", detail: "Offline test sets, online monitoring and human review feeding back into every stage." },
];

const CAPABILITIES: HiringPath[] = [
  {
    title: "Retrieval and knowledge",
    items: ["Enterprise RAG", "Knowledge assistants", "Context engineering", "Memory and state"],
    image: "/images/services/ai-engineering/genai-capability.webp",
    imageAlt: "Enterprise RAG and retrieval knowledge engineering",
  },
  {
    title: "Models",
    items: ["Model routing", "Model adaptation", "Fine-tuning where justified", "Multimodal AI"],
    image: "/images/services/ai-engineering/applied-ml-capability.webp",
    imageAlt: "Model routing, adaptation, fine-tuning and multimodal AI",
  },
  {
    title: "Agents and integration",
    items: ["AI copilots", "AI agents", "Multi-agent systems where justified", "Tool calling", "MCP integrations where relevant", "Enterprise integrations"],
    image: "/images/services/ai-engineering/agentic-systems-capability.webp",
    imageAlt: "AI copilots, agents and enterprise integrations",
  },
  {
    title: "Production controls",
    items: ["Evaluation", "Guardrails", "Human escalation", "Observability"],
    image: "/images/services/ai-engineering/evaluation-assurance-capability.webp",
    imageAlt: "Production controls, evaluation, guardrails and observability",
  },
];

const AGENT_REQUIREMENTS = [
  "Identity: the agent acts as a known principal, not as the developer's credentials.",
  "Permissions: an explicit list of what it may read, write and call, scoped per task.",
  "State: durable task state so a failure mid-workflow can be resumed or safely abandoned.",
  "Tool governance: a registry of approved tools with versions, owners and side-effect classification.",
  "Evaluation: task-level test cases with expected outcomes, run before every change.",
  "Observability: traces of every step, tool call and decision, retained for audit.",
  "Failure handling: defined behaviour for timeouts, partial results and ambiguous instructions.",
  "Human escalation: a designed hand-off, not a chat window the user has to find.",
  "Security: prompt-injection defences, output validation and data-boundary enforcement.",
  "Cost management: a budget per task and routing that respects it.",
];

const METRICS: CapabilityItem[] = [
  {
    title: "Task success rate",
    desc: "Share of tasks completed to the agreed acceptance criteria on the evaluation set and in production.",
    icon: Target,
  },
  {
    title: "Groundedness",
    desc: "Share of answer claims supported by retrieved sources, checked automatically and sampled by humans.",
    icon: ShieldCheck,
  },
  {
    title: "Retrieval precision and recall",
    desc: "Whether the right passages are retrieved for the questions the workflow actually asks.",
    icon: Crosshair,
  },
  {
    title: "Escalation rate",
    desc: "How often the system hands off to a person, and whether those hand-offs were the right ones.",
    icon: UserCheck,
  },
  {
    title: "Latency at the percentile that matters",
    desc: "Response time measured at the busiest hour for the workflow, not on an idle test bench.",
    icon: Zap,
  },
  {
    title: "Cost per completed task",
    desc: "Model, retrieval, tool and human-review cost per unit of work, tracked against the business case.",
    icon: Coins,
  },
];

const QUESTIONS = [
  {
    question: "What is Generative AI?",
    answer: "Generative AI is a class of models, mainly large language and multimodal models, that produce text, code, images or structured outputs from natural-language and document inputs. In an enterprise it is used to summarise, retrieve, interpret, draft and assist.",
    detail: ["The model is trained on broad data and does not know your business. Enterprise Generative AI is therefore mostly an engineering problem: supplying the right context, constraining the output, integrating it into a workflow and measuring whether it is correct."],
  },
  {
    question: "What is Agentic AI?",
    answer: "Agentic AI is software in which a model plans and executes multi-step work by calling tools and systems, keeping state across steps, and escalating to a person when it should not act alone. It differs from a chatbot in that it does things, not only says things.",
    detail: ["Production agents run inside a defined identity, an explicit permission set and a tool registry, with traces of every step. An agent without those is a prototype, whatever the demo looked like."],
  },
  {
    question: "Generative AI vs Agentic AI: what's the difference?",
    answer: "Generative AI produces an output for a person to use. Agentic AI takes actions across systems to complete a task. The first is a capability inside a workflow; the second is a workflow participant with permissions, state and accountability.",
    detail: ["Most enterprise systems start generative (a knowledge assistant, a drafting copilot) and become agentic only for steps where the action is well defined, reversible or approved by a person. Moving a system from generative to agentic raises the bar for evaluation, observability and security, which is why we treat it as a separate engineering decision."],
  },
  {
    question: "RAG vs fine-tuning: which should you use?",
    answer: "Use retrieval-augmented generation (RAG) for knowledge the model does not have and for content that changes. Use fine-tuning when evaluation shows the base model consistently fails on behaviour, format or domain style that prompting and retrieval cannot fix. They solve different problems and are often combined.",
    detail: ["RAG keeps facts current and traceable to a source. Fine-tuning teaches a model how to respond, not what is true this week. Choosing fine-tuning to fix a knowledge gap is the most common expensive mistake we see in GenAI programmes."],
  },
  {
    question: "When does an AI agent need memory?",
    answer: "An agent needs memory when a task spans more than one interaction or one session, when earlier decisions change later ones, or when personalisation is part of the value. It does not need memory for a single-turn retrieval or a stateless classification.",
    detail: ["Memory is a data-governance decision as much as a design one. What is remembered, for whom, for how long and who can inspect it has to be decided before the feature exists, because it is difficult to retrofit."],
  },
  {
    question: "What is MCP and when is it useful?",
    answer: "MCP, the Model Context Protocol, is an open standard for connecting AI applications to tools and data sources through a common client-server interface. It is useful when several AI applications need the same tools, or when you want tool integrations that outlive a particular model provider or agent framework.",
    detail: ["It is not useful as a reason to expose every internal system to an agent. Every MCP server is a permission boundary and needs the same identity, scoping and audit treatment as any other integration."],
  },
  {
    question: "Single-agent vs multi-agent architecture?",
    answer: "Start with a single agent and a well-designed tool set. Move to multiple agents only when the workflow has clearly separable roles, different permission boundaries or different models per step, and the added coordination is justified by the outcome.",
    detail: ["Multi-agent architectures multiply the surfaces to evaluate, trace and secure. They should be justified by the workflow, not chosen because they are fashionable."],
  },
  {
    question: "How do you evaluate an AI agent?",
    answer: "With a set of realistic tasks that have known correct outcomes, run against the agent before every change, measuring task success, tool-call correctness, steps to completion, unsafe-action rate and escalation behaviour. Production traces are then sampled and scored the same way.",
    detail: ["Agent evaluation is the subject of its own page, because it is the part most teams skip and the part that decides whether an agent can be trusted with real work."],
    link: { label: "How we evaluate agents and GenAI systems", href: P.evaluation.path },
  },
  {
    question: "How do you prevent unsafe agent actions?",
    answer: "By making unsafe actions impossible rather than unlikely: scoped permissions, a registry of approved tools with side-effect classification, output validation, prompt-injection defences, and human approval for any action that is irreversible or consequential.",
    detail: ["Guardrails on the model's text are the last line, not the first. The first line is that the agent simply cannot call a tool it was not granted."],
  },
  {
    question: "How do you control GenAI cost?",
    answer: "By measuring cost per completed task, routing each request to the smallest model that meets the quality bar, caching what repeats, trimming context to what retrieval proves is relevant, and designing the workflow so people handle the cases the model should not.",
    detail: ["Cost is a design input from the first architecture review, not an optimisation pass at the end. A system that is correct and uneconomic will still be switched off."],
  },
];

export default function GenerativeAgenticAI() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "genai",
        eyebrow: "Enterprise AI Engineering · Generative & Agentic AI",
        title: PAGE.h1,
        description:
          "NeoIntelli designs and builds production Generative AI and Agentic AI systems: enterprise RAG, knowledge assistants, copilots and tool-using agents that run inside real workflows with evaluation, guardrails, observability and human escalation engineered in from the first version.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Discuss a GenAI or agent use case that has to work in production.",
        description:
          "Bring the workflow, the documents or systems it depends on and the constraint that has stopped it so far. We will map the retrieval, model, agent and evaluation design and tell you what production would take.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.ops.path, context: "AgentOps and LLMOps: the operating layer that keeps GenAI systems and agents reliable after launch." },
        { href: P.evaluation.path, context: "Golden datasets, groundedness checks and agent task-success evaluation for the systems described here." },
        { href: P.data.path, context: "Document pipelines, vector and hybrid retrieval, and the evaluation datasets RAG depends on." },
        { href: P.agents.path, context: "Agent-enabled enterprise workflows, permissions and human-in-the-loop design." },
      ]}
    >
      <Section
        id="where-genai-stalls"
        eyebrow="Why pilots stall"
        title="Most GenAI pilots stall between the demo and the workflow."
        lead="A convincing prototype takes days. A system a team can rely on takes an engineering approach that treats the model as one component among several, most of which decide whether the system is trustworthy and affordable."
        tone="muted"
        width="wide"
      >
        <NeoHireXMatrix items={STALL_POINTS} showHeader={false} />
      </Section>

      <InBrief>
        Generative & Agentic AI engineering is the design and build of production systems that use large language and multimodal models to
        retrieve, generate, interpret and act inside enterprise workflows. It is useful when the input is unstructured, when knowledge work needs
        assistance, or when a multi-step process across systems can be safely delegated to an agent with defined permissions. It solves the problem
        most GenAI pilots hit: a fluent demo that cannot be trusted, integrated, evaluated or afforded at production volume.
      </InBrief>

      <Section
        id="genai-architecture"
        eyebrow="How the system fits together"
        title="From enterprise data to an evaluated action."
        lead="Every production GenAI or agent system we build has these six parts. The model is one of them. The other five are where the engineering effort and the risk actually sit."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we engineer."
        lead="Grouped by where they sit in the system. Fine-tuning, multi-agent designs and MCP integrations are listed with a qualifier on purpose: each is used where evaluation or the workflow justifies it, not by default."
        tone="muted"
        width="wide"
      >
        <HiringPathCards items={CAPABILITIES} showButton={false} />
      </Section>

      <Section
        id="agent-is-not-an-llm-with-tools"
        title="An AI agent is not just an LLM with tools."
        lead="Giving a model access to APIs produces a demo. Producing an enterprise agent means engineering the ten things below, and most of them have nothing to do with the model."
        width="wide"
      >
        <AmberChecklist items={AGENT_REQUIREMENTS} iconType="number">
          <PointOfView statement="An AI agent without permissions, evaluation and observability is a prototype, not an enterprise capability.">
            <p>
              The failure modes of agents are operational: an action taken on stale state, a tool that returned a partial result, a permission that was
              broader than the task needed. These are engineered out with identity, scoping, traces and tests, then kept out by the operating
              discipline described under{" "}
              <Link to={P.ops.path} className="text-[#077fa4] underline underline-offset-4">MLOps, LLMOps & AgentOps</Link> and verified by{" "}
              <Link to={P.evaluation.path} className="text-[#077fa4] underline underline-offset-4">AI Evaluation & Assurance</Link>.
            </p>
          </PointOfView>
        </AmberChecklist>
      </Section>

      <Section
        id="questions"
        eyebrow="Answer first"
        title="The questions that shape a GenAI or agent system."
        lead="Direct answers first, then the reasoning. These are the decisions we work through with a client in the first two weeks of a proof of value."
        tone="muted"
        width="regular"
      >
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
              {item.question.startsWith("What is MCP") && (
                <div className="mt-4">
                  <SourceNote source={AI_ENGINEERING_SOURCES.mcp} compact />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="metrics"
        eyebrow="Metrics we design for"
        title="What we instrument on every GenAI and agent system."
        width="wide"
      >
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>

      <Section
        id="governance"
        eyebrow="Responsible AI in context"
        title="Governance is designed into the system, not documented after it."
        width="regular"
      >
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <p className="text-base sm:text-[17px] text-[#0D244D] leading-relaxed font-normal">
            Every GenAI and agent build classifies the use case by risk, defines what data may reach a model and where, sets the human oversight points, and records the evaluation evidence and traces an audit will ask for. We do not claim regulatory compliance on a client's behalf; we engineer the controls and the evidence their own governance requires.
          </p>
          <p className="text-sm sm:text-base text-[#505D74] leading-relaxed font-normal">
            For the policy, risk-classification and oversight framework an AI capability center should own, see{" "}
            <Link to={AI_ENGINEERING_CROSS_LINKS.responsibleAi.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
              Responsible AI governance under AI GCC
            </Link>
            . This page covers how those controls are implemented in a specific system.
          </p>
        </div>
      </Section>
    </AiEngineeringPageLayout>
  );
}
