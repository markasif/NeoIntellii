import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Layers,
  Network,
  Users,
  Cpu,
  ShieldCheck,
  Milestone,
} from "lucide-react";
import {
  AiGccPageLayout,
  Section,
  InBrief,
  AnswerBlock,
  AdvisoryProcessFlow,
  AdvisoryScopeGrid,
  DeliverablesList,
  TwoPathsComparison,
  SplitValuePointOfView,
} from "@/components/ai-gcc";
import { AI_GCC_CONTEXT_LINKS, AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

const PAGE = AI_GCC_PAGE_BY_KEY.advisory;

const FLOW = [
  { label: "Business outcome", detail: "The cost, revenue, risk or cycle-time result the enterprise needs." },
  { label: "AI mandate", detail: "What the GCC owns: workflows, products, platforms, decisions." },
  { label: "Capability", detail: "Talent, data, compute, MLOps, AgentOps and governance to deliver it." },
  { label: "Roadmap", detail: "Sequenced investments with value checkpoints and stop rules." },
];

const CAPABILITIES = [
  {
    title: "AI maturity assessment",
    body: "Where the enterprise and the GCC actually stand across data, talent, platform, delivery and governance, measured against what the mandate will require rather than against a generic maturity ladder.",
    image: "/images/ai-gcc/advisory/ai-maturity-assessment.jpg",
  },
  {
    title: "GCC mandate",
    body: "A written statement of what the center owns, what it does not, which decisions it makes, and how HQ and the center share product ownership.",
    image: "/images/ai-gcc/advisory/gcc-mandate.jpg",
  },
  {
    title: "Process and use-case portfolio",
    body: "Workflows ranked by business value, data readiness, risk class and reuse potential. Pilots that cannot reach production are cut early.",
    image: "/images/ai-gcc/advisory/use-case-portfolio.jpg",
  },
  {
    title: "Target operating model",
    body: "Team topology, delivery cadence, decision rights, platform ownership and the interfaces to HQ product, security and finance.",
    image: "/images/ai-gcc/advisory/target-operating-model.jpg",
  },
  {
    title: "Talent architecture",
    body: "Leadership roles, the first squad, the hiring sequence and the Hiring OS flow needed to fill scarce AI and data roles at the right bar.",
    image: "/images/ai-gcc/advisory/talent-architecture.jpg",
  },
  {
    title: "Platform and compute direction",
    body: "Data platform, model access, RAG and agent infrastructure, and the cloud, reserved or dedicated GPU posture the use cases justify.",
    image: "/images/ai-gcc/advisory/platform-compute-direction.jpg",
  },
  {
    title: "Responsible AI",
    body: "The governance operating model: AI inventory, risk classification, controls, evaluation and the evidence trail regulators and auditors will ask for.",
    image: "/images/ai-gcc/advisory/responsible-ai.jpg",
  },
  {
    title: "Value roadmap",
    body: "A sequenced plan with investment gates, value checkpoints and the metrics each phase must move before the next one is funded.",
    image: "/images/ai-gcc/advisory/value-roadmap.jpg",
  },
];

const VALUE_METRICS = ["Cost", "Cycle time", "Quality", "Revenue", "Risk", "Adoption", "Human effort", "Operational resilience"];

const DELIVERABLES = [
  {
    id: "maturity",
    text: "AI maturity assessment and gap view",
    icon: BarChart3,
  },
  {
    id: "mandate",
    text: "GCC mandate and decision-rights charter",
    icon: FileText,
  },
  {
    id: "portfolio",
    text: "Prioritized use-case and process portfolio",
    icon: Layers,
  },
  {
    id: "operating-model",
    text: "Target operating model and team topology",
    icon: Network,
  },
  {
    id: "talent",
    text: "Talent architecture and hiring sequence",
    icon: Users,
  },
  {
    id: "platform",
    text: "Platform, data and compute direction",
    icon: Cpu,
  },
  {
    id: "responsible-ai",
    text: "Responsible AI governance operating model",
    icon: ShieldCheck,
  },
  {
    id: "roadmap",
    text: "Value roadmap with checkpoints and metrics",
    icon: Milestone,
  },
];

const FAQ = [
  {
    question: "What should an AI GCC own?",
    answer: "The workflows, products or platforms where AI changes the outcome and the enterprise wants the capability in-house. Ownership means the center is accountable for the result, not only for the build.",
    detail: ["Mandates that read as a list of technologies rather than outcomes produce pilots. The advisory work turns the list into ownership."],
  },
  {
    question: "How do you measure AI value in a GCC?",
    answer: "Against the business metrics the enterprise already reports: cost, cycle time, quality, revenue, risk, adoption, human effort and operational resilience. Model counts and pilot counts are activity, not value.",
  },
  {
    question: "Do we need advisory if we already know the use case?",
    answer: "Usually a shorter version. A clear use case still needs a mandate, an operating model, a compute posture and a governance path before hiring starts, or the team is built around the wrong assumptions.",
  },
  {
    question: "Does advisory cover an existing GCC?",
    answer: "Yes. For an existing center the focus shifts to an AI value diagnostic of current pilots, process redesign, workforce transformation and platform consolidation.",
  },
  {
    question: "Who from NeoIntelli leads the advisory work?",
    answer: "Senior practitioners who then stay involved through setup and operations. The advisory output is a plan NeoIntelli is prepared to execute, not a document handed to a different team.",
  },
];

export default function AIAdvisoryStrategy() {
  return (
    <AiGccPageLayout
      hero={{
        pageKey: "advisory",
        eyebrow: "AI GCC in India · AI Advisory & GCC Design",
        title: "Define the AI GCC mandate before you build the center.",
        description: "What should the GCC own, and how will it create measurable value? AI advisory answers that question with a maturity assessment, a use-case portfolio, a target operating model, a compute direction, responsible AI governance and a value roadmap that the rest of the AI GCC operating model executes.",
        primaryCta: { label: PAGE.ctaLabel, href: aiGccBookingUrl({ sourcePage: PAGE.path, serviceInterest: PAGE.serviceInterest, ctaName: PAGE.ctaLabel }) },
        secondaryCta: { label: "Back to AI GCC in India", href: AI_GCC_PAGE_BY_KEY.overview.path },
      }}
      cta={{
        title: "Schedule an AI GCC strategy session.",
        description: "Bring the business outcomes you are chasing and the state of your data, team and pilots. We will map the mandate, the operating model and the first value checkpoint.",
        secondary: { label: AI_GCC_CONTEXT_LINKS.blueprint.anchor, href: AI_GCC_CONTEXT_LINKS.blueprint.path },
      }}
      related={[
        { page: "overview" },
        { page: "setup" },
        { page: "governance" },
        { context: "readiness" },
      ]}
    >
      <InBrief>
        AI Advisory & GCC Design defines what an AI GCC in India should own and how its value will be measured. NeoIntelli assesses AI maturity, writes the GCC mandate, prioritizes the process and use-case portfolio, designs the target operating model and talent architecture, sets the platform and compute direction, establishes responsible AI governance and sequences a value roadmap. The output is a plan the same team then builds and operates, so strategy and execution do not drift apart.
      </InBrief>

      <Section id="advisory-flow" eyebrow="HOW THE WORK IS STRUCTURED" title="From business outcome to roadmap." width="wide" align="center" lead="Every advisory engagement runs in this order. Starting from the technology and working backwards is how pilots multiply without value.">
        <AdvisoryProcessFlow steps={FLOW} />
      </Section>

      <Section id="advisory-capabilities" eyebrow="SCOPE" title="What AI advisory for a GCC covers." width="wide" align="center">
        <AdvisoryScopeGrid items={CAPABILITIES} />
      </Section>

      <Section id="ai-value-realization" eyebrow="AI VALUE REALIZATION" title="Measure AI by business value, not model count." width="wide" align="center" lead="The advisory phase fixes the measures before anything is built, so the GCC reports value in the same terms HQ already uses.">
        <SplitValuePointOfView
          description="A model in production is an input. Value is the change it makes to a workflow the business cares about. For each use case the roadmap names the metric, the baseline, the owner and the checkpoint at which the enterprise decides to scale, hold or stop."
          pillsTitle="Target Value Metrics"
          pills={VALUE_METRICS}
          footer={
            <>
              The same measures run through <Link to={AI_GCC_PAGE_BY_KEY.mlops.path} className="text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-2 transition-colors">{AI_GCC_PAGE_BY_KEY.mlops.name}</Link> once the systems are live, so the value story is continuous from strategy to production.
            </>
          }
          imageSrc="/images/ai-gcc/advisory/value-roadmap.jpg"
          imageAlt="AI Value Realization Roadmap"
          ourViewText="A GCC should not measure AI maturity by the number of pilots running. It should measure processes transformed and business outcomes created."
        />
      </Section>

      <Section id="two-paths" eyebrow="TWO PATHS" title="New GCC or existing GCC." width="wide" align="center">
        <TwoPathsComparison />
      </Section>

      <Section id="advisory-deliverables" eyebrow="DELIVERABLES" title="What you receive." width="wide" align="center">
        <DeliverablesList items={DELIVERABLES} />
        <p className="mt-8 text-center">
          <Link to={AI_GCC_CONTEXT_LINKS.blueprint.path} className="btn-gradient-primary">{AI_GCC_CONTEXT_LINKS.blueprint.anchor} <ArrowRight className="w-4 h-4" aria-hidden /></Link>
        </p>
      </Section>

      <Section id="advisory-questions" eyebrow="BUYER QUESTIONS" title="Questions about AI advisory for GCCs." width="narrow" align="center">
        <AnswerBlock items={FAQ} />
      </Section>
    </AiGccPageLayout>
  );
}
