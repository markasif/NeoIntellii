"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Check,
  Database,
  UserCheck,
  Lock,
  Webhook,
  Server,
  RefreshCw,
  CheckCircle2,
  Activity,
  ShieldAlert,
  Shield,
  Zap,
  Coins,
  Users,
  TrendingUp,
  Target,
  GitBranch,
  Code2,
  Rocket,
  Handshake,
  Workflow,
  ListTodo,
  Cloud,
  FileCode2,
  ShieldCheck,
  FileText,
  BookOpen,
  Eye,
  Repeat,
} from "lucide-react";
import { motion } from "framer-motion";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import {
  AiDeliveryTeamsPageLayout,
  AiDeliveryTeamsHero,
  AiDeliveryTeamsCTA,
  RelatedAiDeliveryServices,
  AiDeliveryPathwaysFlow,
  DecisionFrameworkGrid,
} from "@/components/ai-delivery-teams";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";
import InBrief from "@/components/ai-gcc/InBrief";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import Section from "@/components/ai-gcc/Section";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import DataCapabilitiesGrid from "@/components/ai-gcc/DataCapabilitiesGrid";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import AmberChecklist from "@/components/shared/AmberChecklist";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import {
  AI_DELIVERY_TEAMS,
  AI_ENGINEERING_LINKS,
  ECOSYSTEM_LINKS,
  SERVICE_INTEREST,
  ctaHref,
} from "@/lib/aiDeliveryTeams";

const PATH = AI_DELIVERY_TEAMS.parent;
const primaryCta = ctaHref({ service: SERVICE_INTEREST.parent, cta: "Discuss My AI Team", source: PATH });

const deliveryModels = [
  {
    name: "Dedicated AI Engineering Team",
    href: AI_DELIVERY_TEAMS.dedicated,
    image: "/images/services/gcc-operations/gcc-arch-teams.webp",
    alt: "Dedicated AI engineering team working in production environment",
    aspect: "aspect-[4/5]", // Big / Tall
    lead: "A stable team on your ongoing roadmap.",
    points: [
      "Ongoing roadmap rather than a single deliverable",
      "Long-lived technical context across releases",
      "Composition adjusts as the roadmap changes",
    ],
    cta: "Dedicated AI Engineering Team",
  },
  {
    name: "AI Delivery Pod",
    href: AI_DELIVERY_TEAMS.pod,
    image: "/images/services/gcc-operations/perf-ai-impl.webp",
    alt: "AI delivery pod architecting production models and pipelines",
    aspect: "aspect-[4/3]", // Short
    lead: "A cross-functional squad for one defined outcome.",
    points: [
      "One charter, one production outcome",
      "Shared acceptance and evaluation criteria",
      "Roles chosen by the outcome, not by job title",
    ],
    cta: "AI Delivery Pod",
  },
  {
    name: "Forward-Deployed AI Engineers",
    href: AI_DELIVERY_TEAMS.fde,
    image: "/images/home/contact_engineer_blue_lounge.webp",
    alt: "Forward-deployed AI engineer embedded directly with product and operations",
    aspect: "aspect-[4/5]", // Big / Tall
    lead: "Engineers embedded where the production problem lives.",
    points: [
      "High integration and workflow complexity",
      "Pilot to production, inside real systems",
      "Close to users, data, APIs and constraints",
    ],
    cta: "Forward-Deployed AI Engineers",
  },
  {
    name: "AI Team Build & Transfer",
    href: AI_DELIVERY_TEAMS.transfer,
    image: "/images/services/gcc-operations/gcc-real-bot-handover.webp",
    alt: "Build-operate-transfer team handover session and knowledge transfer",
    aspect: "aspect-[4/3]", // Short
    lead: "Execution now, permanent ownership later.",
    points: [
      "Delivery starts before internal hiring completes",
      "Documentation, pairing and reverse shadowing built in",
      "Ownership moves on readiness, not on a fixed date",
    ],
    cta: "AI Team Build & Transfer",
  },
];

const decisionColumns = [
  "Permanent hire",
  "Staff augmentation",
  "Dedicated AI Team",
  "AI Delivery Pod",
  "Forward-Deployed Engineer",
];

const decisionRows: { dimension: string; values: string[] }[] = [
  {
    dimension: "Primary need",
    values: [
      "Capability you intend to own permanently",
      "Extra hands on a defined task",
      "Continuous execution on an AI roadmap",
      "One production outcome delivered",
      "AI integrated into real systems and workflows",
    ],
  },
  {
    dimension: "Employment model",
    values: [
      "Your payroll",
      "Vendor payroll, you direct the work",
      "NeoIntelli payroll, agreed team",
      "NeoIntelli payroll, agreed team",
      "NeoIntelli payroll, deeply embedded",
    ],
  },
  {
    dimension: "Delivery ownership",
    values: [
      "You own it",
      "You own it",
      "Shared, against the roadmap",
      "Shared, against the pod charter",
      "Shared, against the production target",
    ],
  },
  {
    dimension: "Embedding depth",
    values: [
      "Full",
      "Task level",
      "Inside your delivery system",
      "Inside your delivery system",
      "Inside your product, systems and workflow",
    ],
  },
  {
    dimension: "Duration",
    values: [
      "Indefinite",
      "Short to medium",
      "Ongoing, reviewed periodically",
      "Bounded by the outcome",
      "Bounded by the production problem",
    ],
  },
  {
    dimension: "Team continuity",
    values: [
      "High, subject to attrition",
      "Low, individuals rotate",
      "Designed for continuity",
      "Held for the charter",
      "Held for the engagement",
    ],
  },
  {
    dimension: "Client management effort",
    values: [
      "High: hiring, management, retention",
      "High: you manage each individual",
      "Moderate: priorities and reviews",
      "Moderate: acceptance and decisions",
      "Moderate to high: access and context",
    ],
  },
  {
    dimension: "Best fit when",
    values: [
      "The capability is core and permanent, and you can wait for the hiring cycle",
      "Scope is narrow, well understood and directed by your own leads",
      "There is a real roadmap with repeated releases",
      "The outcome is definable and can be accepted",
      "The model works but the system integration does not",
    ],
  },
];

const configurations = [
  {
    title: "GenAI & Agentic AI Team",
    desc: "AI application engineering, retrieval, agents, tool and API integration, and evaluation of generated output.",
    href: AI_ENGINEERING_LINKS.genai,
    linkLabel: "Generative & Agentic AI engineering",
  },
  {
    title: "Applied AI & ML Team",
    desc: "Machine learning, forecasting, computer vision, natural language processing and optimisation against business measures.",
    href: AI_ENGINEERING_LINKS.hub,
    linkLabel: "AI engineering capability",
  },
  {
    title: "AI Data Team",
    desc: "Pipelines, AI-ready data, unstructured data handling, retrieval design, and vector or hybrid search.",
    href: AI_ENGINEERING_LINKS.data,
    linkLabel: "Data engineering",
  },
  {
    title: "Production AI Team",
    desc: "MLOps, LLMOps and AgentOps, observability, reliability and cost control for AI workloads in production.",
    href: AI_ENGINEERING_LINKS.mlops,
    linkLabel: "MLOps and LLMOps",
  },
  {
    title: "AI Product Team",
    desc: "AI-native product surfaces, AI features inside existing products, copilots, AI interaction design and integrations.",
    href: AI_ENGINEERING_LINKS.product,
    linkLabel: "AI product engineering",
  },
  {
    title: "AI Evaluation Team",
    desc: "Test datasets, retrieval and agent evaluation, regression suites and reliability measurement before and after release.",
    href: AI_ENGINEERING_LINKS.evaluation,
    linkLabel: "AI evaluation and governance",
  },
];

const journey = [
  {
    step: "Scope",
    detail: "Outcome, constraints, boundaries and what acceptance will mean.",
    icon: Target,
  },
  {
    step: "Assemble",
    detail: "Team shape, technical leadership and the specialist skills the outcome needs.",
    icon: Users,
  },
  {
    step: "Embed",
    detail: "Repositories, tools, security approvals and delivery cadence, where agreed.",
    icon: GitBranch,
  },
  {
    step: "Build",
    detail: "Engineering, data work and integration against the agreed architecture boundary.",
    icon: Code2,
  },
  {
    step: "Evaluate",
    detail: "Technical quality and business acceptance, measured rather than asserted.",
    icon: CheckCircle2,
  },
  {
    step: "Production",
    detail: "Deploy, observe and operate under real load and real constraints.",
    icon: Rocket,
  },
  {
    step: "Transfer or operate",
    detail: "Continue as a managed delivery team, or move ownership to your people.",
    icon: Handshake,
  },
];

const insideYourSystem = [
  {
    title: "Git repositories and branching model",
    image: "/images/industries/tech-product-engineering.webp",
    icon: GitBranch,
  },
  {
    title: "CI/CD pipelines and release process",
    image: "/images/services/ai-gcc/ai-mlops.webp",
    icon: Workflow,
  },
  {
    title: "Issue tracker and sprint cadence",
    image: "/images/services/gcc-operations/operating-reality/13-mandates.webp",
    icon: ListTodo,
  },
  {
    title: "Cloud accounts and environments",
    image: "/images/services/gcc-operations/operating-reality/05-devices.webp",
    icon: Cloud,
  },
  {
    title: "Documentation and architecture records",
    image: "/images/services/ai-gcc/ai-architecture.webp",
    icon: FileCode2,
  },
  {
    title: "Standups and architecture reviews",
    image: "/images/services/gcc-operations/operating-reality/11-leadership.webp",
    icon: Users,
  },
  {
    title: "Observability and alerting",
    image: "/images/services/gcc-operations/operating-reality/07-performance.webp",
    icon: Activity,
  },
  {
    title: "Security review and approval workflows",
    image: "/images/services/gcc-operations/operating-reality/09-risk.webp",
    icon: ShieldCheck,
  },
];

const productionChallenges = [
  {
    title: "Data integration",
    image: "/images/services/ai-gcc/ai-data-workloads.webp",
    icon: Database,
  },
  {
    title: "Identity",
    image: "/images/services/gcc-operations/operating-reality/04-access.webp",
    icon: UserCheck,
  },
  {
    title: "Permissions",
    image: "/images/services/gcc-operations/operating-reality/04-access.webp",
    icon: Lock,
  },
  {
    title: "APIs",
    image: "/images/industries/tech-integration.webp",
    icon: Webhook,
  },
  {
    title: "Legacy systems",
    image: "/images/services/gcc-operations/operating-reality/05-devices.webp",
    icon: Server,
  },
  {
    title: "Workflow redesign",
    image: "/images/industries/tech-process-automation.webp",
    icon: RefreshCw,
  },
  {
    title: "Evaluation",
    image: "/images/home/ai-assessment.webp",
    icon: CheckCircle2,
  },
  {
    title: "Observability",
    image: "/images/services/ai-gcc/ai-mlops.webp",
    icon: Activity,
  },
  {
    title: "Reliability",
    image: "/images/services/gcc-operations/operating-reality/09-risk.webp",
    icon: ShieldAlert,
  },
  {
    title: "Security",
    image: "/images/services/ai-gcc/ai-governance.webp",
    icon: Shield,
  },
  {
    title: "Latency",
    image: "/images/services/ai-gcc/ai-architecture.webp",
    icon: Zap,
  },
  {
    title: "Cost",
    image: "/images/services/gcc-operations/operating-reality/02-payroll.webp",
    icon: Coins,
  },
  {
    title: "Human escalation",
    image: "/images/services/gcc-operations/operating-reality/11-leadership.webp",
    icon: Users,
  },
  {
    title: "Adoption",
    image: "/images/services/gcc-operations/operating-reality/01-employees.webp",
    icon: TrendingUp,
  },
];

const transferPractices = [
  {
    title: "Documentation kept current",
    image: "/images/services/gcc-operations/operating-reality/08-reporting.webp",
    icon: FileText,
  },
  {
    title: "Architecture decision records",
    image: "/images/services/ai-gcc/ai-architecture.webp",
    icon: FileCode2,
  },
  {
    title: "Runbooks for operating the system",
    image: "/images/services/gcc-operations/operating-reality/13-mandates.webp",
    icon: BookOpen,
  },
  {
    title: "Pairing with your engineers",
    image: "/images/how_we_work/phase_02_build.webp",
    icon: Users,
  },
  {
    title: "Your team inside delivery, not observing it",
    image: "/images/services/gcc-operations/operating-reality/11-leadership.webp",
    icon: UserCheck,
  },
  {
    title: "Shared code and design reviews",
    image: "/images/industries/tech-product-engineering.webp",
    icon: Code2,
  },
  {
    title: "Shadowing",
    image: "/images/services/gcc-operations/operating-reality/01-employees.webp",
    icon: Eye,
  },
  {
    title: "Reverse shadowing before handover",
    image: "/images/how_we_work/phase_03_operate.webp",
    icon: Repeat,
  },
];

const responsibility: { area: string; client: string; neo: string; shared: string }[] = [
  { area: "Business priorities", client: "Owns", neo: "Advises", shared: "" },
  { area: "Product and AI roadmap", client: "Owns", neo: "Contributes", shared: "Sequencing" },
  { area: "Architecture boundaries", client: "Approves", neo: "Proposes", shared: "Design decisions" },
  { area: "Team composition", client: "Approves", neo: "Proposes", shared: "Changes over time" },
  { area: "Engineering execution", client: "", neo: "Owns", shared: "" },
  { area: "Code review", client: "Participates", neo: "Participates", shared: "Standards" },
  { area: "Data access", client: "Grants", neo: "Requests, least privilege", shared: "" },
  { area: "Security approval", client: "Owns", neo: "Complies", shared: "Controls in delivery" },
  { area: "Evaluation", client: "Defines acceptance", neo: "Builds and runs", shared: "Criteria" },
  { area: "Deployment", client: "Approves", neo: "Executes where agreed", shared: "Release process" },
  { area: "Production monitoring", client: "", neo: "", shared: "Per the operating agreement" },
  { area: "Knowledge transfer", client: "Provides receiving people", neo: "Documents and pairs", shared: "Readiness sign-off" },
  { area: "Permanent-team hiring", client: "Hires and employs", neo: "Recruits and validates where engaged", shared: "" },
  { area: "IP", client: "", neo: "", shared: "Defined in the engagement agreement" },
];

const measures = [
  {
    title: "Lead time to change",
    desc: "How long an agreed change takes to reach production.",
    image: "/images/services/ai-delivery-teams/metrics/01-lead-time.webp",
  },
  {
    title: "Accepted releases",
    desc: "Releases that pass business acceptance, not just code review.",
    image: "/images/services/ai-delivery-teams/metrics/02-accepted-releases.webp",
  },
  {
    title: "Deployment frequency",
    desc: "How often the team can safely ship.",
    image: "/images/services/ai-delivery-teams/metrics/03-deployment-frequency.webp",
  },
  {
    title: "Evaluation pass rate",
    desc: "Performance against the agreed evaluation set, tracked over time.",
    image: "/images/home/ai-assessment.webp",
  },
  {
    title: "Task success rate",
    desc: "For agents and assistants, whether the task actually completed.",
    image: "/images/services/gcc-operations/operating-reality/14-bot.webp",
  },
  {
    title: "Retrieval quality",
    desc: "For retrieval systems, whether the right context was found.",
    image: "/images/services/ai-gcc/ai-data-workloads.webp",
  },
  {
    title: "Latency",
    desc: "End to end response time under realistic load.",
    image: "/images/services/gcc-operations/operating-reality/07-performance.webp",
  },
  {
    title: "Cost per request or task",
    desc: "Unit economics of the AI workload as usage grows.",
    image: "/images/how_we_work/phase_04_scale.webp",
  },
  {
    title: "Production incidents",
    desc: "Frequency, severity and time to recover.",
    image: "/images/services/gcc-operations/operating-reality/09-risk.webp",
  },
  {
    title: "Defect escape rate",
    desc: "Issues found in production that evaluation should have caught.",
    image: "/images/services/ai-gcc/ai-mlops.webp",
  },
  {
    title: "Adoption",
    desc: "Whether the intended users actually use the capability.",
    image: "/images/how_we_work/phase_03_operate.webp",
  },
  {
    title: "Knowledge-transfer readiness",
    desc: "Whether your people could operate the system today.",
    image: "/images/how_we_work/phase_02_build.webp",
  },
];

const selectorInputs = [
  { input: "Engagement duration", signal: "Short and bounded points to a pod. Continuous points to a dedicated team." },
  { input: "Outcome clarity", signal: "A definable, acceptable outcome suits a pod. An evolving roadmap suits a dedicated team." },
  { input: "Need for permanent employees", signal: "If the capability must sit on your payroll, start with recruitment rather than a delivery team." },
  { input: "Your engineering maturity", signal: "Strong internal engineering favours embedded specialists. Thin internal engineering favours a full team." },
  { input: "Integration complexity", signal: "Deep enterprise integration and workflow change point to forward-deployed engineers." },
  { input: "Continuous roadmap ownership", signal: "Multiple releases against a moving roadmap point to a dedicated team." },
  { input: "Business embedding depth", signal: "Work that has to sit next to users and operations points to forward-deployed engineers." },
  { input: "Knowledge transfer intent", signal: "A plan to own the capability internally points to build and transfer." },
  { input: "India capability strategy", signal: "A long-term India team of your own points to a Micro GCC or a full AI GCC." },
];

const selectorOutputs = [
  { answer: "Hire permanent AI talent", href: ECOSYSTEM_LINKS.talent, when: "The capability is core, permanent and best owned on your payroll." },
  { answer: "Dedicated AI Engineering Team", href: AI_DELIVERY_TEAMS.dedicated, when: "There is a live roadmap and repeated releases to own." },
  { answer: "AI Delivery Pod", href: AI_DELIVERY_TEAMS.pod, when: "One outcome needs to reach production with clear acceptance." },
  { answer: "Forward-Deployed AI Engineers", href: AI_DELIVERY_TEAMS.fde, when: "The model works and the integration does not." },
  { answer: "AI Team Build & Transfer", href: AI_DELIVERY_TEAMS.transfer, when: "You need delivery now and ownership later." },
  { answer: "AI Micro GCC", href: ECOSYSTEM_LINKS.microGcc, when: "You want your own long-term India capability." },
];

const readiness = [
  "Does the AI work on data that represents production, not a curated sample?",
  "Is evaluation defined, and does someone own the result?",
  "Are permissions and identity clear for every system the AI touches?",
  "Are the integrations production-ready, or demo-ready?",
  "Are the failure modes known, and is behaviour on failure defined?",
  "Is human escalation defined for the cases the system should not decide?",
  "Is observability available for inputs, outputs, cost and latency?",
  "Is the cost per request or task understood at expected volume?",
  "Is rollback possible without losing data or state?",
  "Is operating ownership clear once the system is live?",
];

const assemblySteps = [
  { title: "Role calibration", desc: "The mandate is translated into role definitions, seniority and the specific technical depth the outcome requires." },
  { title: "AI-assisted screening", desc: "NeoHireX supports candidate screening, ranking and structured evaluation when NeoIntelli assembles or expands delivery teams." },
  { title: "Technical assessment", desc: "Hands-on evaluation against work that resembles the mandate rather than generic tests." },
  { title: "Senior engineering review", desc: "Experienced AI engineers review the assessment and the reasoning behind it." },
  { title: "Delivery-context validation", desc: "A check that the person fits this engagement: the stack, the constraints and the way the team will work." },
  { title: "Composition agreed with you", desc: "Team shape and members are agreed before work starts, and adjusted as the mandate changes." },
];

const answers = [
  {
    question: "What is an AI delivery team?",
    answer: "A cross-functional engineering team accountable for executing an AI roadmap or a production outcome. It can combine engineering leadership, GenAI or ML capability, data, integration, MLOps and evaluation under shared delivery accountability, rather than supplying unrelated individual engineers.",
  },
  {
    question: "What is an AI delivery pod?",
    answer: "A cross-functional unit organised around one defined AI outcome. The roles are chosen by what the outcome needs, and the pod works to a single charter with agreed acceptance and evaluation criteria.",
  },
  {
    question: "How is a dedicated AI team different from staff augmentation?",
    answer: "Staff augmentation supplies individuals who work under your management. A dedicated AI team is a group with technical leadership, shared delivery accountability and continuity of context across releases.",
  },
  {
    question: "How is an AI pod different from consulting?",
    answer: "Consulting typically produces recommendations, designs and decisions. A pod is an engineering unit that builds, evaluates and ships the thing, and is measured on whether it reached production.",
  },
  {
    question: "When is permanent hiring the better answer?",
    answer: "When the capability is core to your business, you intend to own it indefinitely, and you can absorb the hiring and onboarding cycle. In that case start with recruitment, not a delivery team.",
  },
  {
    question: "What is a Forward-Deployed AI Engineer?",
    answer: "A hands-on engineer who works inside your product, engineering and business environment to turn AI capability into a production system. The role combines software and AI engineering with integration, workflow understanding and responsibility for operating under real constraints.",
  },
  {
    question: "How do forward-deployed engineers differ from a pod?",
    answer: "A pod is a cross-functional team working to a shared charter. Forward-deployed engineers are specialists embedded deeply in your environment, usually where ambiguity and integration complexity are the hard part. The two can run alongside each other.",
  },
  {
    question: "Who owns the code and the IP?",
    answer: "Client-specific deliverables, NeoIntelli pre-existing IP, reuse rights and assignment terms are defined in the engagement agreement before delivery begins. Where you expect full assignment of deliverables, that is written into the agreement.",
  },
  {
    question: "Can the team work inside our repositories?",
    answer: "Where agreed and approved by your security process, yes. Teams work under least privilege, in your environments, following your access and review standards.",
  },
  {
    question: "How do you measure AI delivery?",
    answer: "By production outcomes rather than utilisation: lead time, accepted releases, evaluation results, reliability, cost per request or task, adoption, and readiness to hand over. The specific measures are agreed at scoping.",
  },
  {
    question: "How does knowledge transfer work?",
    answer: "Through documentation, architecture decision records, runbooks, pairing with your engineers, shared reviews, shadowing and reverse shadowing. It runs during delivery rather than as a closing activity.",
  },
  {
    question: "Can a delivery team become our internal team?",
    answer: "That is the build and transfer path. NeoIntelli can recruit and technically validate your permanent roles, pair them with the delivery team, then move ownership as readiness is demonstrated.",
  },
  {
    question: "Can a delivery team become an AI Micro GCC?",
    answer: "Yes. Where the intent is a long-term India capability of your own, the delivery engagement can be structured so the operating practices carry into a Micro GCC or a broader AI GCC.",
  },
];

const relatedLinks = [
  { name: "AI Solutions", href: AI_ENGINEERING_LINKS.hub, desc: "Explore enterprise AI engineering capabilities and service blueprints." },
  { name: "AI Talent", href: ECOSYSTEM_LINKS.talent, desc: "Recruit and technically validate permanent AI and data roles in India." },
  { name: "Micro GCC", href: ECOSYSTEM_LINKS.microGcc, desc: "Start with one dedicated senior AI squad on a model built to scale." },
  { name: "Generative AI", href: AI_ENGINEERING_LINKS.genai, desc: "Enterprise Generative AI, retrieval, agents, and production evaluation." },
  { name: "MLOps & LLMOps", href: AI_ENGINEERING_LINKS.mlops, desc: "Production observability, model lifecycle management, and cost control." },
  { name: "Data Engineering", href: AI_ENGINEERING_LINKS.data, desc: "Pipelines, retrieval data foundations, and vector architectures." },
];

export default function AiDeliveryTeams() {
  return (
    <AiDeliveryTeamsPageLayout>
      {/* 1. Hero Section */}
      <AiDeliveryTeamsHero
        eyebrow="AI Delivery Teams · India"
        title="Deploy an AI team that owns delivery."
        description="Embedded AI engineering teams across Generative AI, Agentic AI, machine learning, data and MLOps that work inside your roadmap, repositories and delivery cadence. Choose an ongoing dedicated team, a cross-functional delivery pod, or forward-deployed engineers for the last mile to production."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/gcc" },
          { name: "AI Delivery Teams" },
        ]}
        primaryCta={{ label: "Discuss My AI Team", href: primaryCta }}
        secondaryCta={{ label: "Compare Delivery Models", href: "#compare-delivery-models" }}
        contextualLink={{
          textPrefix: "Want permanent employees?",
          linkLabel: "Explore AI Talent",
          href: ECOSYSTEM_LINKS.talent,
        }}
      />

      {/* 2. Subnav */}
      <AiDeliveryTeamsSubnav />

      <main id="ai-delivery-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          AI Delivery Teams is how NeoIntelli provides execution capacity: senior AI engineers working inside your roadmap,
          repositories and delivery cadence rather than beside them. It suits companies that need AI built and operated in
          production and do not want to wait out a full hiring cycle first. You choose a dedicated team, a delivery pod,
          forward-deployed engineers, or a build and transfer path. Unlike staff augmentation, accountability sits with the
          team, not with a set of individual contracts.
        </InBrief>

        {/* 4. Definition */}
        <Section
          id="definition"
          eyebrow="AI DELIVERY TEAM"
          title="What is an AI delivery team?"
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              An AI delivery team is a cross-functional engineering team responsible for executing an AI roadmap or a production
              outcome. Unlike traditional staff augmentation, the team can combine engineering leadership, GenAI or ML capability,
              data, integration, MLOps and evaluation under shared delivery accountability instead of supplying unrelated individual
              engineers.
            </p>
            <p>
              The distinction matters because most AI work fails at the seams rather than at the model. A team that owns retrieval
              but not data access, or agents but not evaluation, hands the hardest part back to you. A delivery team is composed
              so the seams sit inside one accountable group.
            </p>
            <p>
              It is not a bench of CVs, and it is not a fixed product. The team is purpose-assembled from technically validated AI
              specialists around the delivery mandate, and the composition is agreed with you before work starts.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 5. Decision Comparison */}
        <Section
          id="compare-delivery-models"
          eyebrow="MODEL COMPARISON"
          title="Do you need a hire, a team, a pod or an FDE?"
          lead="These are different answers to different problems. Two of the five are not NeoIntelli delivery models at all, and for some situations they are the right choice."
          width="wide"
          headerClassName="max-w-5xl"
          leadClassName="max-w-5xl mx-auto"
        >
          <ResponsiveTable
            caption="Comparison of delivery models across dimensions"
            headers={["Dimension", ...decisionColumns]}
            rows={decisionRows.map((r) => [r.dimension, ...r.values])}
          />
          <div className="mt-4 max-w-4xl mx-auto text-center px-4">
            <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed font-normal">
              If the capability is core, permanent and you can absorb the hiring cycle, hire. If the scope is narrow and your own leads will direct it, staff augmentation is cheaper and simpler. The three delivery models below are for the cases in between, where someone has to own the outcome end to end.
            </p>
          </div>
        </Section>

        {/* 6. Four Delivery Models Grid */}
        <Section
          id="delivery-models"
          eyebrow="DELIVERY MODELS"
          title="Four ways to engage an AI delivery team."
          lead="Choose by the nature of the problem, the duration of the work, and how much technical context the team needs to hold."
          width="wide"
          headerClassName="max-w-5xl"
          leadClassName="max-w-5xl mx-auto"
        >
          <OutcomeCardGrid
            items={deliveryModels.map((model) => ({
              title: model.name,
              aspect: model.aspect,
              image: model.image,
              alt: model.alt,
              lead: model.lead,
              lists: [{ items: model.points, variant: "muted" }],
              cta: { label: model.cta, href: model.href },
            }))}
            columns={4}
            ctaButtonVariant="gradient"
            ctaAfterContent
            maxWidthClassName="max-w-7xl mx-auto"
          />
        </Section>

{/* 7. Point of View (Outcome before headcount) */}
        <Section
          id="point-of-view"
          eyebrow="POINT OF VIEW"
          title="Outcome before headcount."
          width="regular"
          align="center"
          headerClassName="max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left: Opening sentences */}
            <div className="space-y-5 text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal text-left pr-4">
              <p>
                Most AI team conversations open with a number of engineers. That is the wrong end of the problem. Headcount is an output of the delivery design, not an input to it.
              </p>
              <p>
                Start instead with the business objective, the workflow it sits in, the technical boundary you are willing to draw, the production target, and what acceptance will mean. Only then do team shape, seniority, skills and headcount follow, and they follow with reasons attached.
              </p>
            </div>
            {/* Right: Decide first / Then determine side by side in navy rectangle with sharp corners */}
            <div className="relative bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-6 sm:p-8 text-white shadow-lg shadow-[#081B3E]/15">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid sm:grid-cols-2 gap-8">
                {/* Decide first */}
                <div>
                  <span className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-4">Decide first</span>
                  <ul className="space-y-3 list-none p-0 m-0">
                    {["Business objective", "Workflow and users", "Technical boundary", "Production target", "Acceptance criteria"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" aria-hidden="true" />
                        <span className="text-sm sm:text-base font-medium leading-relaxed text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Then determine */}
                <div className="pl-6 sm:pl-8">
                  <span className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#F19326] mb-4">Then determine</span>
                  <ul className="space-y-3 list-none p-0 m-0">
                    {["Team shape", "Seniority mix", "Skills and specialisms", "Headcount"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-[#38BDF8] mt-1 shrink-0" aria-hidden="true" />
                        <span className="text-sm sm:text-base font-medium leading-relaxed text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 8. Production Reality / Forward-Deployed Context */}
        <Section
          id="production-reality"
          eyebrow="PRODUCTION REALITY"
          title="The hardest part of AI is often getting it into production."
          width="wide"
          align="center"
          headerClassName="max-w-5xl"
        >
          {/* Centered Sentence / Narrative */}
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 text-[#505D74] text-base sm:text-lg leading-relaxed font-normal text-center mb-10 sm:mb-12">
            <p>
              In many enterprises the prototype already works. Someone has demonstrated the model, the retrieval or the agent, and the demo is convincing. The work that follows is a different discipline.
            </p>
            <p>
              That is where forward-deployed engineering earns its place: not because the model needs improving, but because the surrounding system does.
            </p>
          </div>

          {/* 14 Operating Reality Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {productionChallenges.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[110px] sm:min-h-[118px]"
              >
                {/* Background Image with Editorial Navy Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-right opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/90 via-transparent to-transparent" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Cyan accent bar (no numbers) */}
                <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

                {/* Title */}
                <div className="relative z-10 max-w-[76%] mt-2">
                  <h4 className="text-white font-bold text-sm sm:text-[15px] leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Circular Icon in Bottom Right */}
                <div className="absolute right-3.5 bottom-3.5 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                    <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary CTA Button (styled like Compare Delivery Models button) */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to={AI_DELIVERY_TEAMS.fde}
              className="btn-gradient"
            >
              <span>See how forward-deployed AI engineers work</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 shrink-0 text-[#169DC8] transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </Section>

        {/* 9. Configurations Across AI Engineering */}
        <CapabilitiesSection
          id="configurations"
          eyebrow="TEAM CONFIGURATIONS"
          title="The same models, shaped around different technical work."
          lead="These are configurations of a delivery team, not separate services. Each one maps onto the technical capability page that owns the subject in depth."
          items={configurations.map((c) => ({
            title: c.title,
            desc: c.desc,
            links: [{ path: c.href, anchor: c.linkLabel }],
          }))}
          columns={3}
        />

        {/* 10. Delivery Journey Flow */}
        <Section
          id="journey"
          eyebrow="DELIVERY JOURNEY"
          title="Scope, assemble, embed, build, evaluate, production, transfer."
          lead="The sequence is the same across the models. What changes is how much of it a given engagement owns. Durations are set at scoping against your scope and constraints rather than quoted in advance."
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

        {/* 11. Inside Your Delivery System */}
        <Section
          id="inside-system"
          eyebrow="INTEGRATION"
          title="Embedded in your engineering system, not working beside it."
          lead="Delivery that runs in a parallel environment produces work that has to be re-integrated later. Where agreed and approved by your security process, teams work inside the systems your own engineers use."
          width="wide"
        >
          {/* Operating Reality Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {insideYourSystem.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[110px] sm:min-h-[118px]"
              >
                {/* Background Image with Editorial Navy Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-right opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/90 via-transparent to-transparent" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Cyan accent bar (no numbers) */}
                <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

                {/* Title */}
                <div className="relative z-10 max-w-[76%] mt-2">
                  <h4 className="text-white font-bold text-sm sm:text-[15px] leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Circular Icon in Bottom Right */}
                <div className="absolute right-3.5 bottom-3.5 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                    <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#505D74] max-w-3xl mx-auto text-center leading-relaxed mt-8 sm:mt-10">
            Access is granted by you, on least privilege, through your approval process. Secrets management, environment isolation and production access follow your security standards, and what the team can reach is defined before delivery begins.
          </p>
        </Section>

        {/* 12. Shared Responsibility Matrix */}
        <Section
          id="responsibility"
          eyebrow="RESPONSIBILITY"
          title="Who owns what."
          lead="A delivery model only works when ownership is explicit. This is the default shape. It is adjusted per engagement."
          width="wide"
        >
          <ResponsiveTable
            caption="Default responsibility split between client and NeoIntelli"
            headers={["Area", "Client", "NeoIntelli", "Shared"]}
            rows={responsibility.map((r) => [r.area, r.client || "—", r.neo || "—", r.shared || "—"])}
          />
          <p className="text-xs sm:text-sm text-[#505D74] mt-6 max-w-3xl mx-auto text-center leading-relaxed">
            Exact responsibilities and IP arrangements are defined in the engagement agreement. Client-specific deliverables, NeoIntelli pre-existing IP, reuse rights and assignment terms are agreed before delivery begins.
          </p>
        </Section>

        {/* 13. Measurement / Metrics */}
        <Section
          id="measures"
          eyebrow="METRICS"
          title="Measure the team by production outcomes, not utilisation."
          lead="Hours booked tells you nothing about whether the AI works. These are the measures worth agreeing at scoping. Few engagements need all of them, and forcing every metric onto every project produces reporting rather than insight."
          width="wide"
          align="center"
        >
          <DataCapabilitiesGrid items={measures} theme="light" />
        </Section>

        {/* 14. Capability Transfer */}
        <Section
          id="capability-transfer"
          eyebrow="KNOWLEDGE TRANSFER"
          title="Delivery should increase your capability, not your dependency."
          lead="A delivery partner that leaves you unable to operate what it built has not finished the job. Transfer is designed into the engagement rather than negotiated at the end of it."
          width="wide"
        >
          {/* Narrative sentence matching InBrief / above sentence text size and style */}
          <div className="max-w-4xl mx-auto text-center text-sm sm:text-base md:text-lg text-[#2B3D66] font-normal leading-relaxed mb-10 sm:mb-12">
            <p>
              How much transfer happens, and when, depends on whether you have people to receive it. That is a joint decision, and it is why the recruitment and Micro GCC paths sit next to this one.
            </p>
          </div>

          {/* Operating Reality Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {transferPractices.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[110px] sm:min-h-[118px]"
              >
                {/* Background Image with Editorial Navy Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-right opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/85 to-[#0A224E]/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/90 via-transparent to-transparent" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Cyan accent bar (no numbers) */}
                <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

                {/* Title */}
                <div className="relative z-10 max-w-[76%] mt-2">
                  <h4 className="text-white font-bold text-sm sm:text-[15px] leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                </div>

                {/* Circular Icon in Bottom Right */}
                <div className="absolute right-3.5 bottom-3.5 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                    <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 12. Where a Delivery Team Can Lead */}
        <Section
          id="pathways"
          eyebrow="PATHWAYS"
          title="Where a delivery team can lead."
          lead="Delivery is the entry point, not the destination. Once the capability runs in production, four paths are open and none of them is automatic."
          theme="navy"
          width="wide"
          wavesOnMobile
        >
          <AiDeliveryPathwaysFlow />
        </Section>

        {/* 13. Decision Framework / Model Selector */}
        <Section
          id="model-selector"
          eyebrow="DECISION FRAMEWORK"
          title="Which AI delivery model do you need?"
          lead="There is no score to calculate. Read the nine inputs, note which way each one points for you, and the answer is usually the option that most of them agree on."
          width="wide"
        >
          <DecisionFrameworkGrid
            leftTitle="What to weigh"
            leftItems={selectorInputs.map((item) => ({
              title: item.input,
              description: item.signal,
            }))}
            rightTitle="Where it points"
            rightItems={selectorOutputs.map((item) => ({
              title: item.answer,
              description: item.when,
              href: item.href,
            }))}
          />
        </Section>


        {/* 14. Production Readiness Checklist */}
        <Section
          id="readiness"
          eyebrow="CHECKLIST"
          title="Production readiness for an AI system."
          lead="Ten questions worth answering before a pilot is called ready. There is no score attached, and a no is not a failure. It is a scope item."
          width="wide"
        >
          <AmberChecklist items={readiness} />
        </Section>

        {/* 15. How Teams Are Assembled */}
        <CapabilitiesSection
          id="assembly"
          eyebrow="TEAM ASSEMBLY"
          title="How a delivery team is assembled."
          lead="Teams are purpose-assembled from technically validated AI specialists around the delivery mandate. Validation is a process, not a claim about a bench."
          items={assemblySteps.map((item) => ({
            title: item.title,
            desc: item.desc,
          }))}
          columns={3}
        />

        {/* 16. Questions Buyers Actually Ask (FAQs) */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="Questions buyers actually ask."
          width="regular"
        >
          <AnswerBlock items={answers} level={3} />
        </Section>

        {/* 17. Contextual CTA Banner */}
        <AiDeliveryTeamsCTA
          title="Tell us the outcome. We will propose the team."
          description="Bring the objective, the constraints and what production would look like. We will come back with a delivery model, a team shape and the reasoning behind both."
          primaryCta={{ label: "Discuss My AI Team", href: primaryCta }}
          secondaryCta={{ label: "Explore AI Micro GCC", href: ECOSYSTEM_LINKS.microGcc }}
        />

        {/* 18. Connected Ecosystem */}
        <RelatedAiDeliveryServices links={relatedLinks} />
      </main>
    </AiDeliveryTeamsPageLayout>
  );
}
