import { Link } from "react-router-dom";
import {
  Target,
  ArrowRightLeft,
  Wrench,
  Clock,
  Coins,
  ShieldAlert,
  Headphones,
  Laptop,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Code2,
  BookOpen,
  FileText,
  ShieldCheck,
  Factory,
  type LucideIcon,
} from "lucide-react";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import {
  AiEngineeringPageLayout,
  AiCapabilityGrid,
  FlowDiagram,
  InBrief,
  PointOfView,
  Section,
  NeoHireXMatrix,
  type NeoHireXMatrixItem,
  CapabilitiesSection,
  type CapabilityItem,
  AgentCapabilitiesGrid,
} from "@/components/ai-engineering";
import { AI_ENGINEERING_CROSS_LINKS, AI_ENGINEERING_PAGE_BY_KEY } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl } from "@/lib/aiEngineeringCta";

const PAGE = AI_ENGINEERING_PAGE_BY_KEY.agents;
const P = AI_ENGINEERING_PAGE_BY_KEY;

const LAYERS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    step: "Layer 1",
    category: "LAYER 1 · DETERMINISTIC",
    title: "Deterministic Automation",
    what: "Rules, scripts, workflow engines and RPA.",
    when: "When the process is stable, the inputs are structured and every branch can be written down. It is the cheapest, most testable option and it should not be replaced by AI just because AI is available.",
    limits: "Breaks on unstructured input, exceptions and any judgment the rules did not anticipate.",
    image: "/images/tech-process-automation.webp",
    imageAlt: "Deterministic workflow automation and rules engine",
  },
  {
    id: "02",
    step: "Layer 2",
    category: "LAYER 2 · AI-ASSISTED",
    title: "AI-Assisted Workflow",
    what: "AI recommends. A human approves or acts.",
    when: "When the step needs interpretation of language or documents, when the cost of an error is high, or when the organisation is not yet ready to let a system act alone. Most enterprise workflows should start here.",
    limits: "Throughput is bounded by the people in the loop; the design must make review fast.",
    image: "/images/solution_ai_talent.webp",
    imageAlt: "AI-assisted enterprise workflow with human in the loop approval",
  },
  {
    id: "03",
    step: "Layer 3",
    category: "LAYER 3 · AGENTIC",
    title: "Agentic Workflow",
    what: "AI plans and executes controlled actions using approved tools.",
    when: "When the task spans several systems, the actions are well defined and reversible or approved, and evaluation has shown task success at the required level. Human escalation remains for anything outside the agent's permissions.",
    limits: "Requires identity, permissions, state, traces and continuous evaluation, or it is a prototype.",
    image: "/images/ai-engineering/agentic-systems-capability.webp",
    imageAlt: "Autonomous tool-calling AI agent workflow architecture",
  },
];

const FLOW = [
  { label: "Trigger", detail: "An event, a ticket, a message, a schedule or a person's request." },
  { label: "Agent", detail: "A defined identity with a scoped permission set and a registry of approved tools." },
  { label: "Reasoning and state", detail: "Planning over retrieved context, with durable task state so work can be resumed or safely abandoned." },
  { label: "Approved tools", detail: "APIs, systems and integrations the agent may call, each classified by side effect." },
  { label: "Action", detail: "A record updated, a case routed, a draft prepared, a request submitted." },
  { label: "Validation and human escalation", detail: "Automated checks on the result, and a designed hand-off to a person for anything consequential or uncertain." },
];

const CAPABILITIES = [
  {
    title: "Workflow discovery and automation design",
    body: "Mapping the process, the exceptions and the decision points, then choosing which layer each step belongs to.",
    image: "/images/ai-engineering/agents/workflow-discovery.webp",
    imageAlt: "AI workflow discovery and automation process mapping",
  },
  {
    title: "Agent architecture",
    body: "Planning patterns, state and memory, model routing and the boundaries between agent, tools and people.",
    image: "/images/ai-engineering/agents/agent-architecture.webp",
    imageAlt: "Autonomous AI agent architecture and cognitive state engine",
  },
  {
    title: "Tool and integration layer",
    body: "APIs, enterprise system connectors and MCP integrations where relevant, with versioning and ownership.",
    image: "/images/ai-engineering/agents/tool-integration.webp",
    imageAlt: "Enterprise API integration layer and cloud tool bridge",
  },
  {
    title: "Permission and identity model",
    body: "The agent as a known principal with scoped, auditable access per task.",
    image: "/images/ai-engineering/agents/permission-identity.webp",
    imageAlt: "Agent identity and role-based cryptographic permission control",
  },
  {
    title: "Human-in-the-loop design",
    body: "Approval points, review interfaces and escalation paths designed for speed and accountability.",
    image: "/images/ai-engineering/agents/human-in-the-loop.webp",
    imageAlt: "Human-in-the-loop decision review and action approval interface",
  },
  {
    title: "Evaluation and simulation",
    body: "Task-level test cases and simulated environments run before every change.",
    image: "/images/ai-engineering/agents/evaluation-simulation.webp",
    imageAlt: "AI agent evaluation suite and simulated benchmark testing",
  },
  {
    title: "Monitoring and AgentOps",
    body: "Traces, task success, cost per task, incident handling and policy enforcement in production.",
    image: "/images/ai-engineering/agents/monitoring-agentops.webp",
    imageAlt: "AgentOps production telemetry and real-time execution trace monitoring",
  },
  {
    title: "Migration from rules and RPA",
    body: "Replacing brittle automations step by step, keeping deterministic logic where it still wins.",
    image: "/images/ai-engineering/agents/rpa-migration.webp",
    imageAlt: "Modernization from legacy RPA scripts to intelligent AI agent workflows",
  },
];

const USE_CASES: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Customer operations",
    body: "Case summarisation, intent triage, draft responses and status updates across CRM and ticketing, with agents acting on approved cases.",
    icon: Headphones,
  },
  {
    title: "IT support",
    body: "Ticket classification, runbook execution for known issues, access requests within policy, and escalation of anything novel.",
    icon: Laptop,
  },
  {
    title: "Finance operations",
    body: "Invoice matching, exception investigation, reconciliation preparation and audit-trail generation, with approvals kept with people.",
    icon: Receipt,
  },
  {
    title: "Procurement",
    body: "Supplier document extraction, policy checks on requests, and preparation of comparisons for a buyer to decide.",
    icon: ShoppingCart,
  },
  {
    title: "Sales operations",
    body: "Account research, CRM hygiene, proposal drafting from approved content, and pipeline updates from meeting notes.",
    icon: TrendingUp,
  },
  {
    title: "Engineering",
    body: "Code review assistance, incident summarisation, test generation and change documentation inside existing tooling.",
    icon: Code2,
  },
  {
    title: "Knowledge workflows",
    body: "Answering policy and process questions with citations, and routing what the knowledge base cannot answer.",
    icon: BookOpen,
  },
  {
    title: "Document workflows",
    body: "Extraction, classification, validation against rules, and routing of contracts, claims and forms.",
    icon: FileText,
  },
  {
    title: "Compliance assistance",
    body: "Evidence collection, control mapping and first-draft assessments for a compliance professional to review and sign.",
    icon: ShieldCheck,
  },
  {
    title: "Manufacturing support",
    body: "Maintenance ticket enrichment, quality-deviation summaries and work-order preparation from sensor and shift data.",
    icon: Factory,
  },
];

const METRICS: CapabilityItem[] = [
  {
    title: "Task success rate",
    desc: "Share of tasks completed to the agreed outcome on the evaluation set and in production.",
    icon: Target,
  },
  {
    title: "Straight-through versus escalated",
    desc: "How much work completes without a person, and whether the escalations were the right ones.",
    icon: ArrowRightLeft,
  },
  {
    title: "Tool-call correctness",
    desc: "Whether the agent called the right tool with the right arguments, measured per step.",
    icon: Wrench,
  },
  {
    title: "Time to resolution",
    desc: "Elapsed time per task compared with the baseline process.",
    icon: Clock,
  },
  {
    title: "Cost per task",
    desc: "Model, tool and human-review cost per completed unit of work.",
    icon: Coins,
  },
  {
    title: "Incident and unsafe-action rate",
    desc: "Any action outside policy or permissions, and how quickly it was detected and reversed.",
    icon: ShieldAlert,
  },
];

const QUESTIONS = [
  {
    question: "What is an enterprise AI agent?",
    answer: "An enterprise AI agent is software that uses a model to plan and carry out multi-step work across business systems, operating as a known identity with explicit permissions, keeping state across steps, producing traces of what it did, and escalating to a person for anything outside its remit.",
    detail: ["The definition is deliberately operational. An agent that lacks identity, permissions, traces or an escalation path is not enterprise-ready, however capable the model behind it."],
  },
  {
    question: "AI agent vs chatbot?",
    answer: "A chatbot answers. An agent acts. A chatbot produces a response for a person to use; an agent calls tools, updates systems and completes tasks, which is why it needs permissions, state, evaluation and oversight that a chatbot does not.",
  },
  {
    question: "AI agent vs RPA?",
    answer: "RPA replays fixed steps on structured screens and breaks when the input or the interface changes. An AI agent interprets unstructured input, handles variation and chooses among approved tools. RPA remains the better choice for stable, fully specified processes; agents are for the steps that need judgment.",
    detail: ["Most organisations end up with both, and the design question is which layer each step belongs to."],
  },
  {
    question: "When should an agent be autonomous?",
    answer: "When the action is well defined, reversible or low-consequence, the agent's task success has been demonstrated on a realistic evaluation set, and monitoring can catch and reverse mistakes quickly. Autonomy is granted per action type, not per agent, and it can be withdrawn.",
  },
  {
    question: "When should a human approve an agent's action?",
    answer: "Whenever the action is irreversible, financially or legally consequential, affects a customer or employee materially, or falls in a regulated or high-risk workflow. In those cases the agent prepares and the person decides, and the interface is designed to make that decision fast and informed.",
    detail: ["We do not design fully autonomous decisions into regulated or high-risk workflows. Human controls stay in the loop by design."],
  },
  {
    question: "How should agent permissions work?",
    answer: "The agent should act as its own identity with the minimum access each task needs, granted through a registry of approved tools classified by side effect, scoped per task where possible, logged on every use and reviewed like any other privileged account.",
    detail: ["Reusing a developer's or a service account's broad credentials is the most common and most dangerous shortcut."],
  },
  {
    question: "What is human-in-the-loop AI?",
    answer: "Human-in-the-loop AI is a design in which people review, approve, correct or take over at defined points in an automated workflow. It is a control and a data source: every correction improves the evaluation set and, where appropriate, the system.",
  },
  {
    question: "How should enterprise agents be monitored?",
    answer: "With a trace of every step, tool call and decision; task-level success and failure analysis; cost per task; escalation and unsafe-action rates; and alerting tied to policy. This is the AgentOps discipline, and it should exist before the first agent reaches production.",
    link: { label: "AgentOps: operating agents in production", href: P.ops.path },
  },
];

export default function AIAgentsAutomation() {
  return (
    <AiEngineeringPageLayout
      hero={{
        pageKey: "agents",
        eyebrow: "Enterprise AI Engineering · AI Agents & Automation",
        title: PAGE.h1,
        description:
          "Enterprise AI agents and agent-enabled workflows engineered with tool use, permissions, integrations, evaluation and human oversight: automation that acts inside the rules of the business, and leaves the consequential decisions with people.",
        primaryCta: {
          label: PAGE.ctaLabel,
          href: aiEngineeringBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }),
        },
        secondaryCta: { label: "Back to Enterprise AI Engineering", href: P.overview.path },
      }}
      cta={{
        title: "Map where agents belong in your workflows, and where they do not.",
        description:
          "Bring a process that consumes skilled people's time. We will map each step to deterministic automation, AI-assisted work or an agent, define the permissions and approval points, and describe what production would take.",
      }}
      related={[
        { href: P.overview.path },
        { href: P.genai.path, context: "The retrieval, model and agent engineering underneath agent-enabled workflows." },
        { href: P.ops.path, context: "AgentOps: registry, versions, traces, cost per task and incident handling for agents in production." },
        { href: P.evaluation.path, context: "Task-success evaluation, tool-call correctness and red teaming for agents." },
        { href: P.product.path, context: "Agentic functionality inside a software product." },
      ]}
    >
      <Section
        id="three-layers"
        eyebrow="Three layers of automation"
        title="Three layers of automation, one decision per workflow step."
        lead="Not every workflow should become an autonomous agent, and most should not. We map each step of a process to the lowest layer that handles it reliably, and we move a step up a layer only when evidence supports it."
        tone="muted"
        width="wide"
      >
        <NeoHireXMatrix items={LAYERS} showHeader={false} />
      </Section>

      <InBrief>
        AI Agents & Automation engineering turns business workflows into agent-enabled systems: AI that reads the trigger, reasons over context and
        state, calls approved tools and completes or escalates the task under defined permissions and human oversight. It is useful when a workflow
        spans several systems, involves judgment that rules cannot capture, and has a clear boundary for what a person must approve. It solves the
        limits of rules and RPA without handing uncontrolled autonomy to a model.
      </InBrief>

      <Section
        id="agent-workflow-architecture"
        eyebrow="How an agent-enabled workflow runs"
        title="From trigger to a validated, escalatable action."
        lead="Six stages, with the permission boundary drawn at the tools and the human boundary drawn at the action. Both are engineered, not implied."
        width="wide"
      >
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we engineer."
        lead="From discovering which steps should be automated at all, to the operating discipline that keeps agents inside policy after launch."
        width="wide"
        align="center"
        theme="navy"
        wavesOnMobile
      >
        <AgentCapabilitiesGrid items={CAPABILITIES} theme="navy" />
      </Section>

      <Section
        id="use-cases"
        eyebrow="Where agents earn their place"
        title="Credible use cases, with people kept where they belong."
        lead="Examples of workflows where agent-enabled automation has a clear return. In every one, consequential actions in regulated or high-risk steps stay with a person; the agent prepares, routes and executes only what it is permitted to."
        width="wide"
      >
        <CapabilityGrid
          variant="ai"
          rowPattern={[4, 3, 3]}
          items={USE_CASES}
        />
        <div className="mt-8">
          <PointOfView statement="An AI agent without permissions, evaluation and observability is a prototype, not an enterprise capability.">
            <p>
              The same view shapes our{" "}
              <Link to={P.genai.path} className="text-[#077fa4] underline underline-offset-4">Generative & Agentic AI engineering</Link>: the model is
              the easy part. Identity, scoped access, durable state, traces and continuous evaluation are what let an agent be trusted with real work.
            </p>
          </PointOfView>
        </div>
      </Section>

      <Section id="questions" eyebrow="Answer first" title="The questions that decide whether an agent is safe to deploy." tone="muted" width="regular">
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
        id="governance"
        eyebrow="Responsible AI in context"
        title="Permissions, auditability and risk classification are part of the build."
        width="regular"
      >
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <p className="text-base sm:text-[17px] text-[#0D244D] leading-relaxed font-normal">
            Every agent we ship is classified by the risk of the actions it can take, runs under a reviewed permission set, keeps an audit trail of every step, and has human oversight at the points the classification requires. We engineer these controls and the evidence for them; the client's governance function owns the policy.
          </p>
          <p className="text-sm sm:text-base text-[#505D74] leading-relaxed font-normal">
            For the enterprise governance framework an AI capability center should own, see{" "}
            <Link to={AI_ENGINEERING_CROSS_LINKS.responsibleAi.href} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 transition-colors">
              Responsible AI governance under AI GCC
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section id="metrics" eyebrow="Metrics we design for" title="What we instrument on every agent-enabled workflow." tone="muted" width="wide">
        <CapabilitiesSection items={METRICS} columns={3} />
        <p className="mt-8 text-xs text-[#505D74] leading-relaxed max-w-3xl mx-auto text-center font-normal">
          These are the metrics we instrument and report. Targets are agreed per system against a measured baseline; we do not publish universal improvement percentages.
        </p>
      </Section>
    </AiEngineeringPageLayout>
  );
}
