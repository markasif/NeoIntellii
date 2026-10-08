import { Link } from "react-router-dom";
import { Cpu, Server } from "lucide-react";
import { Section, InBrief, AnswerBlock, PointOfView, ResponsiveTable } from "@/components/ai-gcc";
import { AiTalentPageLayout, RoleMatrix, ValidationRoadmap } from "@/components/ai-talent";
import { AI_TALENT_CONTEXT_LINKS, type RoleGroup } from "@/data/aiTalent";

const GROUPS: RoleGroup[] = [
  {
    name: "MLOps and ML platform",
    roles: [
      {
        title: "MLOps Engineer",
        owns: "The lifecycle of production models: registry and versioning, CI/CD for training and deployment, evaluation gates, monitoring, drift detection, retraining and rollback.",
        signals: ["Pipelines that deploy models with evaluation gates, and a rollback they performed", "Drift or quality monitoring that caught a real problem", "Reproducible training from code and data"],
        falsePositives: ["DevOps engineers with no model lifecycle exposure", "MLflow or Kubeflow familiarity without a production model behind it"],
        evaluation: ["Walkthrough of one model lifecycle they run end to end", "Design exercise for CI/CD with evaluation gates and rollback", "Incident scenario: silent quality decay in production"],
      },
      {
        title: "ML Platform Engineer / AI Platform Engineer",
        owns: "Shared platform capabilities for AI teams: training and serving infrastructure, feature and vector stores, experiment tracking, model gateways, developer environments and the internal APIs teams build on.",
        signals: ["Platform capabilities adopted by more than one team", "Serving infrastructure with stated latency and cost", "Developer experience improvements with adoption evidence"],
        falsePositives: ["Single-team tooling described as a platform", "Cloud certifications without a platform they operated"],
        evaluation: ["Platform design exercise for multi-team AI workloads", "Operations scenario: capacity, cost, outage", "Developer-experience and API design discussion"],
      },
    ],
  },
  {
    name: "LLMOps and AgentOps",
    intro: "Production operations for LLM applications and agents. The roles are new; the evidence we ask for is not.",
    roles: [
      {
        title: "LLMOps Engineer",
        owns: "Prompt and retrieval configuration lifecycle, evaluation pipelines for generated output, model routing and fallbacks, cost per call, tracing and quality monitoring for LLM applications.",
        signals: ["Prompt regression caught by an evaluation they built", "Routing or caching decisions with measured cost impact", "Tracing across model and retrieval calls in production"],
        falsePositives: ["Prompt engineering presented as LLMOps", "Observability experience unrelated to non-deterministic workloads"],
        evaluation: ["Design exercise for continuous evaluation of an LLM feature", "Cost and routing discussion with numbers", "Incident scenario on quality regression after a model update"],
      },
      {
        title: "AgentOps Engineer",
        owns: "Registry, versioning, tool permissions, tracing, task-success evaluation, human escalation, cost per task and incident handling for autonomous and semi-autonomous agents.",
        signals: ["An agent they operate with a registry entry, permissions and traces", "Task-success evaluation across agent versions", "Incidents handled: runaway loops, wrong tool calls, cost spikes"],
        falsePositives: ["Agent framework demos with no operations behind them", "MLOps experience assumed to transfer without agent exposure"],
        evaluation: ["Walkthrough of an agent in production: permissions, evaluation, incidents", "Design exercise for agent governance controls", "Escalation and kill-switch scenario"],
      },
      {
        title: "AI Systems Engineer",
        owns: "Reliability of AI services: gateways, queues, rate limits, caching, autoscaling, observability and cost control for model and agent traffic.",
        signals: ["AI traffic kept reliable under load with numbers", "Caching and routing with measured savings", "Observability stacks built for LLM or agent calls"],
        falsePositives: ["SRE experience with no AI workload exposure", "Reliability claims without incidents to discuss"],
        evaluation: ["Systems design for an LLM gateway with fallbacks", "Incident scenario on an AI service", "Capacity and cost discussion"],
      },
    ],
  },
  {
    name: "AI infrastructure and DevSecOps",
    intro: "Compute clusters, GPU orchestration, and policy-as-code security for AI workloads.",
    roles: [
      {
        title: "AI Infrastructure Engineer / GPU Infrastructure Engineer",
        owns: "Compute for AI: GPU capacity planning, cloud, reserved and dedicated environments, training and inference clusters, storage and networking that keep accelerators fed, utilization and AI FinOps.",
        signals: ["GPU environments they provisioned and operated with utilization data", "Storage and network decisions that fixed a training bottleneck", "Cost allocation and reservation management"],
        falsePositives: ["Cloud infrastructure experience with no accelerator workloads", "Kubernetes experience assumed to cover GPU scheduling"],
        evaluation: ["Capacity planning exercise from a workload description", "Troubleshooting scenario: idle GPUs, slow data loading", "FinOps discussion with a utilization model"],
      },
      {
        title: "AI DevOps / DevSecOps Engineer",
        owns: "Delivery pipelines, identity and secrets, isolation for sensitive AI workloads, supply-chain and dependency controls, and security integration for AI systems.",
        signals: ["Security controls applied to model, data and agent access", "Pipelines that enforce policy without blocking delivery", "Incidents or audits they supported"],
        falsePositives: ["Generic DevOps with no AI-specific controls", "Security checklists without implementation"],
        evaluation: ["Design exercise for secure AI delivery with isolation and secrets", "Policy-as-code and identity discussion", "Audit-evidence scenario"],
      },
    ],
  },
];

const DISTINCTIONS: string[][] = [
  ["MLOps Engineer vs AI Platform Engineer", "MLOps runs the lifecycle of models. A platform engineer builds the shared infrastructure many teams and lifecycles use. Small teams start with one person doing both; scale separates them."],
  ["MLOps vs LLMOps vs AgentOps", "MLOps operates trained models. LLMOps adds prompts, retrieval, generated-output evaluation, routing and cost per call. AgentOps adds tools, permissions, traces, task success and escalation."],
  ["AI Infrastructure Engineer vs AI Platform Engineer", "Infrastructure provisions and operates the compute, storage and network. Platform builds the services and developer experience on top of it."],
];

const FAQ = [
  { question: "MLOps Engineer vs AI Platform Engineer: what is the difference?", answer: "An MLOps engineer runs the lifecycle of production models: CI/CD, evaluation gates, monitoring, retraining, rollback. An AI platform engineer builds the shared infrastructure and services that multiple AI teams use. A first team often hires one person for both and separates the roles as workloads grow." },
  { question: "What is an AgentOps engineer?", answer: "Someone who operates AI agents in production: registry and versioning, tool permissions, tracing, task-success evaluation, human escalation, cost per task and incident handling. The role is new; the evidence we ask for is a production agent they have operated and an incident they handled." },
  { question: "Why are MLOps and AI platform roles hard to hire?", answer: "The skills sit between software engineering, infrastructure and machine learning, and most candidates have depth in one and exposure to the others. Role calibration decides which depth matters for your stack, and the technical round checks it with operations scenarios rather than tool quizzes." },
  { question: "Do we need a GPU infrastructure engineer?", answer: "Only when utilization, isolation or latency justify reserved or dedicated GPU environments. Teams on cloud on-demand capacity usually need an AI platform engineer who understands compute cost first. The decision is made from the workload, not the hardware." },
  { question: "How does this connect to an AI GCC?", answer: `These roles run the production layer of an AI GCC. See ${AI_TALENT_CONTEXT_LINKS.aiGccMlops.name} for the operating layer they build and ${AI_TALENT_CONTEXT_LINKS.aiGccInfra.name} for the compute they run it on.` },
];

export default function MLOpsPlatformHiring() {
  return (
    <AiTalentPageLayout
      pageKey="mlops"
      hero={{
        eyebrow: "AI Talent · MLOps & AI Platform Hiring",
        title: "Hire MLOps & AI Platform Engineers in India",
        description: "MLOps, ML platform, AI platform, AI infrastructure, AI systems, LLMOps, AgentOps, GPU infrastructure and AI DevSecOps engineers, assessed on the production systems they have operated and the incidents they have handled.",
        secondaryCta: { label: "See role distinctions", href: "#distinctions" },
        trustStrip: [
          "GPU Scheduling & FinOps Scenarios",
          "Continuous Evals & Rollback Gate Checks",
          "Incident Analysis & Post-Mortem Rigor",
          "India AI Platform Engineers",
        ],
      }}
      cta={{
        title: "Discuss an MLOps or platform hire.",
        description: "Tell us what runs in production today, what is stuck in pilot and how releases happen. We will calibrate the role to that stack and show you the operations scenarios the technical round uses.",
        secondary: { label: AI_TALENT_CONTEXT_LINKS.aiGccMlops.anchor, href: AI_TALENT_CONTEXT_LINKS.aiGccMlops.path },
      }}
      related={[{ page: "overview" }, { page: "genai" }, { page: "data" }, { context: "aiGccMlops" }, { context: "aiGccInfra" }]}
    >
      <InBrief>
        MLOps & AI Platform hiring at NeoIntelli covers MLOps, ML platform, AI platform, AI infrastructure, AI systems, LLMOps, AgentOps, GPU infrastructure and AI DevSecOps engineers in India. These are the roles that move AI from experimentation to production. Specialist recruiters source, NeoHireX screens and runs first-round AI interviews, and practicing platform engineers validate candidates on systems they operate, incidents they handled and the cost and reliability numbers behind them.
      </InBrief>

      <Section id="distinctions" eyebrow="Getting the role right" title="MLOps, LLMOps, AgentOps, platform and infrastructure are five jobs, not one." tone="muted" width="wide">
        <ResponsiveTable caption="Distinctions between MLOps and AI platform roles" headers={["Distinction", "What it means for the hire"]} rows={DISTINCTIONS} />
        <div className="mt-8 max-w-6xl mx-auto">
          <PointOfView>
            An AI agent without evaluation, permissions and observability is a prototype, not an enterprise capability. The people on this page are the ones who make it a capability.
          </PointOfView>
        </div>
      </Section>

      <Section id="role-profiles" eyebrow="Role profiles" title="What each role owns, and how we tell ownership from exposure." width="wide">
        <RoleMatrix groups={GROUPS} />
      </Section>

      <Section id="how-we-validate" eyebrow="We interview. You hire." title="The validation flow behind every MLOps and platform shortlist." tone="muted" width="wide">
        <ValidationRoadmap />
        <div className="mt-8 p-6 text-[#2B3D66] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#0e92b8] mb-2">
            <Cpu className="w-4 h-4" />
            <span>AI GCC Production Layer</span>
          </div>
          <p className="text-body text-xs sm:text-sm leading-relaxed text-[#415A77]">
            The operating layer these engineers build is described under{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccMlops.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccMlops.name}
            </Link>
            , and the compute they run it on under{" "}
            <Link to={AI_TALENT_CONTEXT_LINKS.aiGccInfra.path} className="font-semibold text-[#077fa4] hover:underline">
              {AI_TALENT_CONTEXT_LINKS.aiGccInfra.name}
            </Link>.
          </p>
        </div>
      </Section>

      <Section id="mlops-questions" eyebrow="Buyer questions" title="Questions about MLOps and AI platform recruitment in India." width="narrow">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiTalentPageLayout>
  );
}
