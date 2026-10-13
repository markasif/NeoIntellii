import { Link } from "react-router-dom";
import { Sparkles, Terminal } from "lucide-react";
import { Section, InBrief, AnswerBlock, PointOfView, ResponsiveTable, SplitValuePointOfView } from "@/components/ai-gcc";
import { AiTalentPageLayout, RoleMatrix, ValidationRoadmap } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, type RoleGroup } from "@/data/aiTalent";

const WHAT_WE_TEST = [
  "RAG & Retrieval Precision",
  "Context Engineering",
  "Continuous Evaluation & Evals",
  "Tool Calling & Schema Handling",
  "Model Context Protocol (MCP)",
  "Multi-Agent Orchestration",
  "Memory & State Management",
  "Security, Jailbreak & Permissions",
  "Observability & Step Tracing",
  "Latency Budgets & Token FinOps",
  "Enterprise System Integration",
];

const GROUPS: RoleGroup[] = [
  {
    name: "GenAI and LLM engineering",
    intro: "Engineers who build products on large language models. The gap between a demo and a production system is the whole evaluation.",
    roles: [
      {
        title: "GenAI Engineer / LLM Engineer",
        owns: "LLM-powered features in production: prompt and context design, retrieval, structured outputs, evaluation, cost and latency, and the integration into the product and its data.",
        signals: ["A feature in front of real users with an evaluation set behind it", "Retrieval and context decisions explained with measurements", "Cost per request and latency budgets they managed", "Failure handling: fallbacks, guardrails, escalation"],
        falsePositives: ["Chat-with-your-PDF demos presented as production RAG", "Prompt tinkering described as engineering", "Framework lists (LangChain, LlamaIndex) with no system behind them"],
        evaluation: ["Deep dive on one shipped feature: data, retrieval, evaluation, cost", "Design exercise with quality, latency and cost targets", "Discussion of an evaluation they built and what it caught"],
      },
      {
        title: "RAG Engineer",
        owns: "Retrieval systems: ingestion and parsing, chunking, embeddings, hybrid search, re-ranking, citation, permission-aware access, refresh pipelines and retrieval evaluation.",
        signals: ["Retrieval quality measured and improved, not assumed", "Permission and freshness problems solved in production", "Clear reasoning on chunking, hybrid search and re-ranking trade-offs"],
        falsePositives: ["Vector database familiarity presented as retrieval expertise", "No experience with permission-aware retrieval or stale indexes"],
        evaluation: ["Retrieval design exercise on messy enterprise documents", "Evaluation methodology for retrieval precision and faithfulness", "Debugging scenario for a system that answers confidently and wrongly"],
      },
      {
        title: "AI Application Engineer / AI Product Engineer",
        owns: "Product-grade software with AI components: APIs, UI states for uncertainty, background jobs, data handling, observability and the engineering rigor of any production service.",
        signals: ["Strong software engineering with AI as one component", "UX decisions for uncertain outputs and human review", "Observability and testing for non-deterministic behaviour"],
        falsePositives: ["Frontend or backend engineers rebranded without AI ownership", "AI experience limited to hackathons"],
        evaluation: ["Engineering fundamentals review", "Design exercise on an AI feature end to end", "Testing and observability discussion for LLM behaviour"],
      },
    ],
  },
  {
    name: "Agentic AI engineering",
    intro: "Agents act on systems. The evaluation covers permissions, tracing, evaluation and escalation as much as orchestration.",
    roles: [
      {
        title: "Agentic AI Engineer / AI Agent Developer",
        owns: "Multi-step, tool-using agents in production: orchestration, tool calling and MCP integration, RAG and context engineering, memory and state, permission handling, evaluation, tracing, human escalation and deployment.",
        signals: ["An agent in production with a registry entry, permissions and traces", "Task-success evaluation they designed and ran across versions", "Incidents they handled: runaway loops, wrong tool calls, cost spikes", "Escalation paths to humans that actually fire"],
        falsePositives: ["Listing LangChain, CrewAI, AutoGen or MCP without a production agent", "Multi-agent demos with no permissions, evaluation or tracing", "Prototype experience presented as production ownership"],
        evaluation: ["Walkthrough of one production agent: tools, permissions, evaluation, failures", "Design exercise for an agent acting on enterprise systems with safety constraints", "Tool-calling and state-management questions with edge cases"],
      },
      {
        title: "AI Systems Engineer",
        owns: "The systems around models and agents: gateways, routing, caching, queues, rate limits, observability, cost controls and reliability for AI workloads.",
        signals: ["AI traffic they kept reliable under load", "Routing and caching decisions with measured savings", "Tracing and observability stacks they built for LLM or agent calls"],
        falsePositives: ["Platform engineers with no exposure to non-deterministic workloads", "Reliability experience unrelated to model or agent traffic"],
        evaluation: ["Systems design for an LLM gateway with routing and fallbacks", "Incident scenario on an AI service", "Cost and latency discussion with numbers"],
      },
      {
        title: "Forward Deployed AI Engineer",
        owns: "Delivering AI systems inside a customer's environment: discovery, integration with their data and workflows, evaluation against their criteria and adoption after launch.",
        signals: ["Deployments in customer environments with adoption outcomes", "Integration with unfamiliar data and systems under time pressure", "Communication with non-technical stakeholders"],
        falsePositives: ["Solutions engineers with demo-only experience", "Delivery experience without hands-on engineering"],
        evaluation: ["Scenario on integrating an AI feature into a customer's stack", "Engineering depth check", "Stakeholder communication assessment"],
      },
    ],
  },
  {
    name: "GenAI and agentic architecture",
    intro: "Enterprise foundation model strategy, platform reuse, governance and multi-agent systems.",
    roles: [
      {
        title: "GenAI Architect / Agentic AI Architect",
        owns: "Platform and system design for LLM applications and agents: model strategy, retrieval and agent architecture, evaluation and governance integration, security, cost and the guidance of the engineers building on it.",
        signals: ["Architectures in production for multiple use cases, with reuse", "Governance, security and cost designed in from the start", "Decisions they reversed after evaluation evidence"],
        falsePositives: ["Vendor reference architectures presented as experience", "Architect titles with no production accountability"],
        evaluation: ["Architecture review of a multi-agent enterprise scenario", "Deep questions on evaluation, governance and cost design", "Technical leadership assessment"],
      },
    ],
  },
];

const DISTINCTIONS: string[][] = [
  ["RAG vs agentic AI", "Retrieval augments a model's answer with your data. An agent plans, calls tools and acts. RAG is often a component of an agent; it is not the same skill set."],
  ["GenAI Engineer vs ML Engineer", "A GenAI engineer builds on foundation models: context, retrieval, evaluation, integration. An ML engineer trains and operates models. Some people do both; most do one well."],
  ["AI Agent Developer vs Agentic AI Architect", "A developer builds and ships agents inside a defined design. An architect defines the agent platform, permissions model, evaluation and governance for many agents."],
  ["Prototype experience vs production ownership", "A prototype proves an idea. Production ownership means evaluation, permissions, tracing, cost control, incidents and users. Only the second predicts success in your team."],
];

const FAQ = [
  { question: "How do you evaluate a GenAI engineer?", answer: "On a shipped feature: the data behind it, retrieval and context decisions, the evaluation set, cost and latency, and failure handling. Practicing GenAI engineers run the round and the evidence is recorded in NeoHireX with the shortlist." },
  { question: "GenAI Engineer vs Agentic AI Engineer?", answer: "A GenAI engineer builds LLM features that answer or generate. An agentic AI engineer builds systems that plan and act through tools, which adds permissions, state, tracing, evaluation of task success and human escalation to the skill set." },
  { question: "Is listing LangChain, CrewAI, AutoGen or MCP enough?", answer: "No. Framework names show exposure. We look for a production agent with a registry entry, tool permissions, traces, an evaluation set and an incident the candidate handled. That is what the technical round asks about." },
  { question: "Can you hire agentic AI engineers for a regulated industry?", answer: "Yes. The evaluation adds emphasis on permissions, auditability, data handling and human oversight, and the shortlist notes how each candidate has worked under those constraints." },
  { question: "How does GenAI hiring connect to building an AI GCC?", answer: `When the first GenAI hire becomes a team, NeoIntelli can run the operating environment around it. ${AI_TALENT_CONTEXT_LINKS.aiGccGenai.name} covers the engineering the team will do; the AI Micro GCC model covers people operations, workspace, IT and infrastructure.` },
];

export default function GenAIAgenticHiring() {
  return (
    <AiTalentPageLayout
      pageKey="genai"
      hero={{
        eyebrow: "AI Talent · GenAI & Agentic AI Hiring",
        title: "Hire GenAI & Agentic AI Engineers in India",
        description: "GenAI, LLM, RAG, agentic AI, AI agent, AI application, AI systems and forward deployed engineers, plus GenAI and agentic architects, assessed on production ownership: RAG, context engineering, evaluation, tool calling, MCP, orchestration, memory, security, observability, cost and enterprise integration.",
        secondaryCta: { label: "See what we test", href: "#what-we-test" },
        trustStrip: [
          "Model Context Protocol (MCP) Tested",
          "Production RAG & Context Engineering",
          "Agent Tracing & Observability Verified",
          "Senior Engineering Shortlists",
        ],
      }}
      cta={{
        title: "Discuss a GenAI or agent hire.",
        description: "Tell us what the system does, which tools it touches and how it is evaluated today. We will calibrate the role against that architecture and show you the technical round before sourcing starts.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.aiGccGenai.anchor, href: AI_TALENT_CONTEXT_LINKS.aiGccGenai.path },
      }}
      related={[{ page: "overview" }, { page: "mlops" }, { page: "aiml" }, { context: "aiGccGenai" }, { context: "aiGccMlops" }]}
    >
      <InBrief>
        GenAI & Agentic AI hiring at NeoIntelli covers GenAI, LLM, RAG, agentic AI, AI agent, AI application, AI systems, AI product and forward deployed engineers, and GenAI and agentic architects in India. Candidates are sourced by specialist recruiters, screened and interviewed on NeoHireX, and validated by practicing engineers on RAG, context engineering, evaluation, tool calling, MCP, orchestration, memory and state, security, observability, latency and cost, and enterprise integration. Framework names on a resume are not treated as evidence.
      </InBrief>

      <Section
        id="what-we-test"
        eyebrow="WHAT WE TEST"
        title="Eleven things a production GenAI or agent engineer must have done."
        width="wide"
        align="center"
        lead="These are the topics of the senior technical round. Candidates are asked to show evidence from systems they owned, not to define terms."
      >
        <SplitValuePointOfView
          description="Senior practitioner technical interviews test hands-on architectural depth, failure mode mitigation, and enterprise integration ownership across live production workloads."
          pillsTitle="Core Evaluation Competencies"
          pills={WHAT_WE_TEST}
          imageSrc="/images/ai-talent/genai-agentic.webp"
          imageAlt="Production GenAI and Agentic Systems Assessment"
          ourViewText="Listing LangChain, CrewAI, AutoGen or MCP on a resume does not prove the candidate has built a production agentic system. Resume signal is not enough."
        />
      </Section>

      <Section id="distinctions" eyebrow="Getting the role right" title="RAG is not agentic AI. A GenAI engineer is not an ML engineer." width="wide" lead="Most mis-hires in this space start with a role definition that mixes four different jobs. These distinctions are the first thing role calibration settles.">
        <ResponsiveTable caption="Distinctions between GenAI and agentic AI roles" headers={["Distinction", "What it means for the hire"]} rows={DISTINCTIONS} />
      </Section>

      <Section id="role-profiles" eyebrow="Role profiles" title="What each role owns, and how we tell ownership from exposure." tone="muted" width="wide">
        <RoleMatrix groups={GROUPS} />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="The validation flow behind every GenAI and agent shortlist." width="wide">
        <ValidationRoadmap />
        <div className="mt-4 text-[#2B3D66] text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#0e92b8] mb-2">
            <span>Production Continuity with AI GCC</span>
          </div>
          <p className="text-body text-xs sm:text-sm leading-relaxed text-[#415A77] max-w-3xl mx-auto">
            The same production disciplines the technical round tests are what an AI GCC runs day to day. Explore{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccGenai.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccGenai.name}
            </Link>{" "}
            and{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccMlops.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccMlops.name}
            </Link>.
          </p>
        </div>
      </Section>

      <Section id="genai-questions" eyebrow="Buyer questions" title="Questions about hiring GenAI and agentic AI engineers in India." tone="muted" width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
