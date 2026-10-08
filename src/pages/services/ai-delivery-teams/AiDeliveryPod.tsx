"use client";

import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Ban,
  Boxes,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  FileCheck,
  GitBranch,
  Handshake,
  Layout,
  Link2,
  Monitor,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  UserCheck,
  Users,
  Webhook,
  Workflow,
  Zap,
  Coins,
  Search,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import {
  AiDeliveryTeamsPageLayout,
  AiDeliveryTeamsHero,
  AiDeliveryTeamsCTA,
  RelatedAiDeliveryServices,
  WrongAnswerCards,
} from "@/components/ai-delivery-teams";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import {
  AI_DELIVERY_TEAMS,
  AI_ENGINEERING_LINKS,
  ECOSYSTEM_LINKS,
  SERVICE_INTEREST,
  ctaHref,
} from "@/lib/aiDeliveryTeams";

const PATH = AI_DELIVERY_TEAMS.pod;
const primaryCta = ctaHref({ service: SERVICE_INTEREST.pod, cta: "Scope My AI Delivery Pod", source: PATH });

const charter = [
  { field: "Business objective", prompt: "What changes for the business if this works. Stated as an outcome, not a feature list.", icon: Target, image: "/images/ai-architecture.jpg" },
  { field: "Users and workflow", prompt: "Who uses it, inside which workflow, and what they do today instead.", icon: Users, image: "/images/gcc-operations/operating-reality/01-employees.jpg" },
  { field: "Scope", prompt: "What the pod will build, integrate and operate.", icon: Boxes, image: "/images/gcc-operations/operating-reality/13-mandates.jpg" },
  { field: "Non-scope", prompt: "What it will explicitly not do. The most useful line in the charter.", icon: Ban, image: "/images/gcc-operations/operating-reality/09-risk.jpg" },
  { field: "Architecture boundary", prompt: "What the pod may change on its own, and what needs your architects.", icon: GitBranch, image: "/images/tech-integration.png" },
  { field: "Dependencies", prompt: "Teams, vendors, approvals and systems the pod cannot proceed without.", icon: Link2, image: "/images/tech-process-automation.png" },
  { field: "Data access", prompt: "Which data, at what sensitivity, through which route, approved by whom.", icon: Database, image: "/images/ai-data-workloads.jpg" },
  { field: "Systems and integrations", prompt: "The enterprise systems in scope and the interfaces available.", icon: Webhook, image: "/images/gcc-operations/operating-reality/05-devices.jpg" },
  { field: "Security constraints", prompt: "Environments, access model, residency and review gates that apply.", icon: Shield, image: "/images/ai-governance.jpg" },
  { field: "Risks", prompt: "What is most likely to stop this, and what would be done about it.", icon: AlertTriangle, image: "/images/gcc-operations/operating-reality/04-access.jpg" },
  { field: "Evaluation criteria", prompt: "How quality is measured, on what dataset, at what threshold.", icon: CheckCircle2, image: "/images/ai-assessment.jpg" },
  { field: "Acceptance criteria", prompt: "What the business must see to call it done.", icon: FileCheck, image: "/images/gcc-operations/operating-reality/07-performance.jpg" },
  { field: "Production target", prompt: "What running in production actually means here: users, volume, environment.", icon: Rocket, image: "/images/ai-mlops.jpg" },
  { field: "Operations", prompt: "Who watches it, who is paged, and what the response looks like.", icon: Activity, image: "/images/how_we_work/phase_03_operate.jpg" },
  { field: "Ownership", prompt: "Who owns the code, the model configuration and the operating runbook after go-live.", icon: UserCheck, image: "/images/gcc-operations/operating-reality/11-leadership.jpg" },
  { field: "Handover", prompt: "What is documented and transferred, to whom, and when.", icon: Handshake, image: "/images/gcc-operations/gcc-real-bot-handover.jpg" },
];

const configurations = [
  { title: "GenAI & Agentic AI", desc: "Retrieval, agents, tool and API integration, prompt and context design, evaluation of generated output.", href: AI_ENGINEERING_LINKS.genai, label: "Generative AI engineering", icon: Sparkles },
  { title: "Applied AI & ML", desc: "Forecasting, classification, computer vision, NLP and optimisation tied to a business measure.", href: AI_ENGINEERING_LINKS.hub, label: "AI engineering capability", icon: Cpu },
  { title: "AI Data", desc: "Pipelines, AI-ready data, unstructured content, retrieval design, vector and hybrid search.", href: AI_ENGINEERING_LINKS.data, label: "Data engineering", icon: Database },
  { title: "MLOps / AgentOps", desc: "Deployment, monitoring, evaluation harnesses, cost and latency control for AI workloads.", href: AI_ENGINEERING_LINKS.mlops, label: "MLOps and LLMOps", icon: Monitor },
  { title: "AI Product", desc: "The product surface around the model: interaction design, feedback loops, integration into the product.", href: AI_ENGINEERING_LINKS.product, label: "AI product engineering", icon: Smartphone },
  { title: "AI Evaluation", desc: "Test datasets, retrieval and agent evaluation, regression suites, reliability measurement.", href: AI_ENGINEERING_LINKS.evaluation, label: "AI evaluation and governance", icon: CheckCircle2 },
];

const acceptance = [
  { title: "Task success", desc: "Did the system complete the task the user came to do, end to end.", icon: CheckCircle2 },
  { title: "Accuracy", desc: "Correctness against a labelled set that reflects real inputs.", icon: Target },
  { title: "Factuality", desc: "Whether generated statements are true, not merely plausible.", icon: FileCheck },
  { title: "Groundedness", desc: "Whether answers are supported by the retrieved source material.", icon: Search },
  { title: "Retrieval quality", desc: "Whether the right context was found before generation happened.", icon: Search },
  { title: "Latency", desc: "Response time under realistic load, not in isolation.", icon: Zap },
  { title: "Cost", desc: "Cost per request or task at expected volume.", icon: Coins },
  { title: "Tool correctness", desc: "For agents, whether the right tool was called with the right arguments.", icon: Brain },
  { title: "Safety", desc: "Behaviour on adversarial, out-of-scope and sensitive inputs.", icon: ShieldAlert },
  { title: "Human escalation", desc: "Whether the system hands off when it should, rather than guessing.", icon: Handshake },
  { title: "Business outcome", desc: "The measure the objective was written against in the first place.", icon: Target },
];

const journey = [
  { step: "Outcome", detail: "The business result the pod exists to produce.", icon: Target },
  { step: "Pod charter", detail: "Scope, non-scope, data, boundaries, acceptance and evaluation agreed in writing.", icon: FileCheck },
  { step: "Team", detail: "Roles chosen from the charter. Headcount is the last decision, not the first.", icon: Users },
  { step: "Build", detail: "Engineering, data and integration inside the agreed boundary.", icon: GitBranch },
  { step: "Evaluate", detail: "Measured against the evaluation criteria, before anyone claims it is done.", icon: CheckCircle2 },
  { step: "Deploy", detail: "Into production under your release process and security controls.", icon: Rocket },
  { step: "Operate or transfer", detail: "Continue operating, or hand over with documentation and runbooks.", icon: Handshake },
];

const wrongShape = [
  {
    situation: "The work never ends",
    alternative: "A continuous roadmap with repeated releases is a dedicated team, not a sequence of pods.",
    href: AI_DELIVERY_TEAMS.dedicated,
    label: "Dedicated AI Engineering Team",
    icon: RefreshCw,
  },
  {
    situation: "The hard part is integration",
    alternative: "Where the model works and the enterprise systems are the obstacle, embed engineers where the problem is.",
    href: AI_DELIVERY_TEAMS.fde,
    label: "Forward-Deployed AI Engineers",
    icon: GitBranch,
  },
  {
    situation: "You need people, not a unit",
    alternative: "If the capability belongs on your payroll, recruit for it rather than renting a team around it.",
    href: ECOSYSTEM_LINKS.talent,
    label: "Hire permanent AI talent",
    icon: Users,
  },
];

const answers = [
  {
    question: "What is an AI delivery pod?",
    answer: "An AI delivery pod is a cross-functional engineering unit organised around a defined AI outcome rather than a collection of individual job roles. Depending on the objective, the pod can combine AI application engineering, data, machine learning, integration, MLOps, product and evaluation capability under one delivery charter.",
  },
  {
    question: "How is a pod different from a dedicated engineering team?",
    answer: "A pod is bounded by an outcome and ends when that outcome is delivered and handed over. A dedicated team is bounded by a roadmap and keeps going. Many clients start with a pod and move to a dedicated team when the roadmap behind the first outcome becomes clear.",
  },
  {
    question: "How is a pod different from staff augmentation?",
    answer: "Staff augmentation supplies individuals against roles you define and manage. A pod is a unit with one charter, shared accountability for the outcome, and acceptance criteria agreed before work starts.",
  },
  {
    question: "How is a pod different from project outsourcing?",
    answer: "Outsourced projects are usually specified up front and delivered at arm's length. A pod works inside your delivery system where agreed, adapts as evaluation results come in, and is accountable for a production outcome rather than a signed-off specification.",
  },
  {
    question: "How many people should be in an AI pod?",
    answer: "Size follows the charter. A retrieval assistant over one data source needs a different pod from a multi-system agent with human escalation. Decide scope, boundary and acceptance first, and the size follows with reasons attached.",
  },
  {
    question: "What roles belong in an AI pod?",
    answer: "Whichever roles the outcome requires: AI application engineering, data engineering, machine learning, integration, MLOps, evaluation, and product where the surface matters. A pod that omits a capability the outcome depends on hands that gap back to you.",
  },
  {
    question: "How do you measure an AI pod?",
    answer: "Against the evaluation and acceptance criteria in its charter, plus the production measures that apply: task success, retrieval quality, latency, cost per task, and the business outcome the objective named.",
  },
  {
    question: "Does an AI pod include MLOps?",
    answer: "It should when the outcome has to run in production. Deployment, monitoring, evaluation in production and cost control are part of reaching production, not a later phase.",
  },
  {
    question: "Does an AI pod include evaluation?",
    answer: "Yes. Without evaluation there is no defensible definition of done for an AI system, and acceptance turns into opinion.",
  },
  {
    question: "Can the pod hand over to our team?",
    answer: "Yes. Documentation, architecture decision records, runbooks and pairing are part of the charter where handover is the intent. Where you also need to hire the receiving team, that is the build and transfer path.",
  },
];

const relatedLinks = [
  { name: "AI Solutions", href: AI_ENGINEERING_LINKS.hub, desc: "Explore AI solution blueprints and engineering capabilities across our practice." },
  { name: "Generative AI", href: AI_ENGINEERING_LINKS.genai, desc: "Enterprise GenAI architectures, retrieval-augmented systems and AI agents." },
  { name: "Data Engineering", href: AI_ENGINEERING_LINKS.data, desc: "Enterprise data pipelines, retrieval systems and vector database architecture." },
  { name: "MLOps & LLMOps", href: AI_ENGINEERING_LINKS.mlops, desc: "Production observability, evaluation frameworks, and cost optimization." },
  { name: "Responsible AI", href: AI_ENGINEERING_LINKS.evaluation, desc: "System evaluation, security guardrails, red-teaming, and governance." },
];

export default function AiDeliveryPod() {
  return (
    <AiDeliveryTeamsPageLayout>
      {/* 1. Hero */}
      <AiDeliveryTeamsHero
        eyebrow="AI Delivery Pod · India"
        title="One AI pod. One production outcome."
        description="A cross-functional AI engineering unit built around one defined outcome, from architecture through evaluation to production, with acceptance criteria agreed before the first line of code."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/gcc" },
          { name: "AI Delivery Teams", href: AI_DELIVERY_TEAMS.parent },
          { name: "AI Delivery Pod" },
        ]}
        primaryCta={{ label: "Scope My AI Delivery Pod", href: primaryCta }}
        secondaryCta={{ label: "See the pod charter", href: "#pod-charter" }}
        contextualLink={{
          textPrefix: "Ongoing roadmap instead?",
          linkLabel: "Explore Dedicated AI Engineering Team",
          href: AI_DELIVERY_TEAMS.dedicated,
        }}
      />

      {/* 2. Subnav */}
      <AiDeliveryTeamsSubnav />

      <main id="ai-delivery-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          An AI delivery pod is a cross-functional engineering unit organised around one defined AI outcome. It suits organisations that have a specific result to reach in production and want one accountable team rather than several vendors and roles. The pod works to a written charter with agreed scope, evaluation and acceptance criteria. Unlike staff augmentation, the unit is accountable for the outcome; unlike consulting, it builds and ships it.
        </InBrief>

        {/* 4. What is an AI delivery pod? & Best Suited To */}
        <Section
          id="definition"
          eyebrow="AI DELIVERY POD"
          title="What is an AI delivery pod?"
          width="wide"
          align="center"
        >
          {/* Comparative Breakdown: Best Suited for a Pod vs. a Dedicated Team */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto text-left">
            {/* Card 1: Best suited to an AI Delivery Pod */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white/95 border border-[#CBD5E1]/70 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#008EC4] mb-3">
                  <Target className="w-4 h-4 text-[#008EC4]" />
                  When an AI Pod is Best Suited
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0D244D] mb-3">
                  Best Suited for: Defined Production Outcomes
                </h3>
                <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-4">
                  Deploy a dedicated AI delivery pod when your initiative has a bounded scope and clear definition of success:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#2B3D66]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008EC4] mt-1 shrink-0" />
                    <span><strong>Bounded Enterprise Deliverables:</strong> Single autonomous agent workflow, RAG pipeline, or predictive model deployment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008EC4] mt-1 shrink-0" />
                    <span><strong>Pre-Agreed Acceptance:</strong> Explicit metrics for latency, accuracy, cost per task, and evaluation regression gates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008EC4] mt-1 shrink-0" />
                    <span><strong>Rapid Ramp & Handover:</strong> 12 to 24 week delivery sprint followed by seamless knowledge transfer or team transfer.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: When a Dedicated AI Team fits better */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white/95 border border-[#CBD5E1]/70 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706] mb-3">
                  <RefreshCw className="w-4 h-4 text-[#D97706]" />
                  When a Dedicated Team Fits Better
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0D244D] mb-3">
                  Best Suited for: Ongoing Multi-Quarter Roadmaps
                </h3>
                <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-4">
                  Choose a Dedicated AI Engineering Team when work is continuous and architectural context must persist:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#2B3D66]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] mt-1 shrink-0" />
                    <span><strong>Continuous Product Roadmap:</strong> Multiple releases queued sequentially where context handover costs would be high.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] mt-1 shrink-0" />
                    <span><strong>Living Agent Systems:</strong> Autonomous agents and tools that evolve continuously based on production telemetry.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] mt-1 shrink-0" />
                    <span><strong>Deep System Retention:</strong> Retaining the engineers who know how the underlying platform and data pipelines were tuned.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. The Pod Charter */}
        <Section
          id="pod-charter"
          eyebrow="TEMPLATE"
          title="Define the pod charter before the pod size."
          lead="Sixteen fields. Most stalled AI projects can be traced to two or three of them never being written down. Use this whether or not NeoIntelli is involved."
          width="wide"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {charter.map((c, index) => (
              <OperatingRealityCard
                key={c.field}
                item={{
                  number: String(index + 1).padStart(2, "0"),
                  title: c.field,
                  desc: c.prompt,
                  image: c.image,
                  icon: c.icon,
                }}
              />
            ))}
          </div>
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Staffing comes after this, not before. Once scope, boundary, data access and acceptance are on paper, the roles the pod needs are largely determined, and so is the argument for how many of each.
            </p>
          </div>
        </Section>

        {/* 6. Pod Journey / How a pod runs */}
        <Section
          id="journey"
          eyebrow="HOW A POD RUNS"
          title="Outcome, charter, team, build, evaluate, deploy, transfer."
          lead="Durations are agreed at scoping against your scope, dependencies and approval cycles rather than quoted in advance."
          width="wide"
        >
          <UniversalLifecycle
            steps={journey.map((j) => ({
              title: j.step,
              desc: j.detail,
              icon: j.icon,
            }))}
          />
        </Section>

        {/* 7. Configurations Across AI Engineering */}
        <CapabilitiesSection
          id="configurations"
          eyebrow="POD CONFIGURATIONS"
          title="Same model, different technical centre of gravity."
          lead="Most pods draw on more than one of these. They are configurations of the same engagement, not separate offers, and each maps onto the technical capability page that covers the subject in depth."
          items={configurations.map((c) => ({
            title: c.title,
            desc: c.desc,
            links: [{ path: c.href, anchor: c.label }],
          }))}
          columns={3}
        />

        {/* 8. Acceptance and Evaluation Criteria */}
        <Section
          id="acceptance"
          eyebrow="ACCEPTANCE"
          title="AI acceptance criteria need more than feature complete."
          lead="A traditional definition of done asks whether the feature exists. An AI system can exist and still be unusable. Pick the measures that match the outcome rather than applying all of them."
          width="wide"
          align="center"
        >
          <CapabilityGrid
            variant="hr"
            rowPattern={[4, 4, 3]}
            items={acceptance.map((a) => ({
              title: a.title,
              desc: a.desc,
              icon: a.icon,
            }))}
          />
        </Section>

        {/* 9. When a pod is the wrong shape */}
        <Section
          id="fit"
          eyebrow="WHEN A POD IS THE WRONG ANSWER."
          title="When a pod is the wrong answer."
          width="regular"
          align="center"
        >
          <WrongAnswerCards items={wrongShape} />
        </Section>

        {/* 11. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="Questions buyers actually ask."
          width="regular"
        >
          <AnswerBlock items={answers} level={3} />
        </Section>

        {/* 12. CTA */}
        <AiDeliveryTeamsCTA
          serviceInterest="AI Delivery Pod"
          title="Start with the charter, not the headcount."
          description="Bring the outcome, the systems involved and what acceptance would look like. We will draft the charter with you and propose a pod against it."
          primaryCta={{ label: "Scope My AI Delivery Pod", href: primaryCta }}
          secondaryCta={{ label: "Compare Delivery Models", href: `${AI_DELIVERY_TEAMS.parent}#compare-delivery-models` }}
        />

        {/* 13. Connected Ecosystem */}
        <RelatedAiDeliveryServices links={relatedLinks} />
      </main>
    </AiDeliveryTeamsPageLayout>
  );
}
