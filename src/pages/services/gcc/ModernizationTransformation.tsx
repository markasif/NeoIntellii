"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Building2,
  Handshake,
  UserX,
  Bot,
  Layers,
  Target,
  Database,
  Shield,
  Users,
  Workflow,
  AlertTriangle,
  HelpCircle,
  Compass,
  Cpu,
} from "lucide-react";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import {
  GccStrategyHero,
  GccStrategySubnav,
  GccStrategyPageLayout,
  GccModernizationFramework,
  RelatedGccServices,
  GccStrategyCTA,
} from "@/components/gcc-strategy";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import AdvisoryProcessFlow from "@/components/ai-gcc/AdvisoryProcessFlow";
import { gccModernizationFaqs } from "@/data/gccStrategyFaqs";
import { maturityStages } from "@/data/gccStrategyContent";
import { bookACallUrl } from "@/lib/constants";
import {
  GCC_STRATEGY_ROUTES as R,
  GCC_STRATEGY_PILLAR_LABEL,
  GCC_OPERATIONS_LINKS,
  AI_PILLAR_LINKS,
  type GccLeadContext,
} from "@/lib/gccStrategyRoutes";

const leadContext: GccLeadContext = {
  source_page: R.modernization,
  service_interest: "GCC Modernization",
  cta_name: "Assess My GCC",
};

const transformationSignals = [
  {
    title: "Stagnant mandate",
    desc: "A mandate that has not grown or expanded in years.",
    image: "/images/gcc-operations/operating-reality/13-mandates.jpg",
    icon: Clock,
  },
  {
    title: "Cost center view",
    desc: "Headquarters sees a cost center, not an enterprise capability.",
    image: "/images/gcc-operations/operating-reality/08-reporting.jpg",
    icon: Building2,
  },
  {
    title: "Weak HQ trust",
    desc: "Weak trust and misalignment between headquarters and India leadership.",
    image: "/images/gcc-operations/operating-reality/11-leadership.jpg",
    icon: Handshake,
  },
  {
    title: "High attrition",
    desc: "High attrition, especially in senior and critical technical roles.",
    image: "/images/gcc-operations/operating-reality/01-employees.jpg",
    icon: UserX,
  },
  {
    title: "Fragmented AI",
    desc: "Fragmented AI pilots that stall out and never reach production.",
    image: "/images/ai-architecture.jpg",
    icon: Bot,
  },
  {
    title: "Ticket-volume model",
    desc: "A legacy operating model configured purely for ticket volume.",
    image: "/images/gcc-operations/operating-reality/05-devices.jpg",
    icon: Layers,
  },
  {
    title: "Limited product role",
    desc: "Limited product ownership without roadmap influence or design authority.",
    image: "/images/gcc-operations/workforce-strategy-planning.jpg",
    icon: Target,
  },
  {
    title: "Limited platform role",
    desc: "Routine maintenance tasks rather than core platform and architecture ownership.",
    image: "/images/tech-integration.png",
    icon: Database,
  },
  {
    title: "Weak governance",
    desc: "Weak or ceremonial governance without operational rigor.",
    image: "/images/gcc-operations/standards/evidence-audit.jpg",
    icon: Shield,
  },
  {
    title: "Mismatched talent",
    desc: "Talent that matches the old mandate, not the next one.",
    image: "/images/gcc-operations/operating-reality/10-hiring.jpg",
    icon: Users,
  },
  {
    title: "Excess manual work",
    desc: "Too much manual work that automation should have removed.",
    image: "/images/tech-process-automation.png",
    icon: Workflow,
  },
  {
    title: "Slow decision rights",
    desc: "Slow decision rights where even minor operational choices escalate.",
    image: "/images/gcc-operations/standards/itsm-monitoring.jpg",
    icon: AlertTriangle,
  },
  {
    title: "Unclear value story",
    desc: "A value story nobody at headquarters can articulate.",
    image: "/images/gcc-operations/gcc-hq-leadership.jpg",
    icon: HelpCircle,
  },
];

const maturityFlow = [
  {
    label: "Execution Center",
    detail: "Executes defined tasks and tickets. Value is measured as cost reduction and operational throughput.",
    icon: Layers,
  },
  {
    label: "Capability Center",
    detail: "Owns services end to end with its own leadership structure, delivery accountability, and quality standards.",
    icon: Building2,
  },
  {
    label: "Ownership Hub",
    detail: "Owns entire products or platforms, influences enterprise roadmaps, and holds real architectural decision rights.",
    icon: Target,
  },
  {
    label: "AI-Enabled Value Center",
    detail: "Owns production AI and data capability that fundamentally changes how the global enterprise operates and competes.",
    icon: Sparkles,
  },
];

const ownershipLadder = [
  { label: "Task execution", note: "Tickets, volume, cost", icon: Layers },
  { label: "Service ownership", note: "End-to-end services with own leadership", icon: Users },
  { label: "Product / platform ownership", note: "Roadmap influence, real decision rights", icon: Target },
  { label: "Enterprise capability ownership", note: "Functions the enterprise depends on", icon: Building2 },
  {
    label: "AI / data transformation mandate",
    note: "Capability that changes how the enterprise competes",
    href: AI_PILLAR_LINKS.aiGcc.href,
    external: true,
    icon: Sparkles,
  },
];

const aiTriggers = [
  "AI becomes part of the product roadmap",
  "The enterprise needs Agentic AI systems in production",
  "Data capability is fragmented across teams and tools",
  "AI pilots cannot reach production",
  "There is no MLOps function",
  "AI talent is insufficient for the mandate",
  "AI governance is immature",
  "AI adoption has no measurable value",
];

const modernizationFlow = [
  { label: "Current GCC", note: "Existing baseline and scope", icon: Building2 },
  { label: "Maturity diagnostic", note: "Diagnose where the center actually is", href: "#framework", icon: Layers },
  { label: "Mandate redesign", note: "Define what the center should own next", href: "#framework", icon: Compass },
  { label: "AI / data / automation", note: "Build new production capabilities", href: "#ai-path", icon: Cpu },
  { label: "Workforce", note: "Reshape seniority and critical skills", href: AI_PILLAR_LINKS.aiTalent.href, icon: Users },
  { label: "Operating model", note: "Refactor decision rights and processes", icon: Workflow },
  { label: "Governance", note: "Institutionalize the operating cadence", href: GCC_OPERATIONS_LINKS.governance.href, icon: Shield },
  { label: "Higher ownership", note: "Own enterprise outcomes reliably", icon: TrendingUp },
];

export default function ModernizationTransformation() {
  return (
    <GccStrategyPageLayout>
      {/* 1. Hero */}
      <GccStrategyHero
        eyebrow="GCC Modernization"
        title="Move your GCC from delivery capacity to enterprise capability."
        description="For centers that already operate. NeoIntelli redesigns the mandate, the operating model, the workforce and the AI and data capability of an existing India GCC so it owns more, proves more and is trusted with more."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: R.overview },
          { name: GCC_STRATEGY_PILLAR_LABEL, href: R.overview },
          { name: "Modernization & Transformation" },
        ]}
        primaryCta={{ label: "Assess My GCC", href: bookACallUrl("hero") }}
        secondaryCta={{ label: "Explore AI GCC", href: AI_PILLAR_LINKS.aiGcc.href }}
        contextualLink={{ label: "Planning a new center instead? Start with the overview", href: R.overview }}
        leadContext={leadContext}
      />

      {/* 2. Subnav */}
      <GccStrategySubnav />

      <main id="gcc-strategy-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          GCC modernization redesigns an existing Global Capability Center around higher-value capability, ownership and
          measurable enterprise outcomes. The work can include mandate expansion, operating-model redesign, AI and data
          capability, workforce changes, product or platform ownership, governance improvements, automation and stronger
          integration with global leadership. NeoIntelli runs it as a diagnose, redesign, transform and institutionalize program
          for India GCCs of any size.
        </InBrief>

        {/* 4. When should a GCC be transformed? */}
        <Section
          id="signals"
          eyebrow="TRANSFORMATION SIGNALS"
          title="When should a GCC be transformed?"
          lead="When the center is experiencing several of the following at once. One of them is a management issue; five of them mean the operating model no longer fits what the enterprise needs from India."
          align="center"
          width="wide"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {transformationSignals.map((item, index) => (
              <OperatingRealityCard
                key={item.title}
                item={{
                  number: String(index + 1).padStart(2, "0"),
                  title: item.title,
                  desc: item.desc,
                  image: item.image,
                  icon: item.icon,
                }}
              />
            ))}

            {/* Closing Statement Card to complete the 4x4 grid */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/35 hover:border-[#38BDF8]/65 bg-[#051329] p-5 sm:p-6 lg:p-7 col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 min-h-[140px] sm:min-h-[150px] lg:min-h-[155px] flex items-center justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)]">
              {/* Background Globe visual */}
              <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden flex items-center justify-end">
                <div className="relative w-full h-full opacity-60 mix-blend-screen transition-transform duration-700 ease-out group-hover:scale-105">
                  <img
                    src="/images/gcc-operations/operating-reality/globe.png"
                    alt="Transformation Diagnostic Global Scale"
                    className="w-full h-full object-contain object-right"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3.5 sm:gap-5 max-w-[85%] sm:max-w-[80%]">
                <div className="shrink-0 text-[#38BDF8] flex items-center justify-center">
                  <ArrowRight
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.2}
                  />
                </div>

                <div className="h-9 sm:h-11 w-[1px] bg-[#38BDF8]/35 shrink-0" />

                <div className="flex flex-col justify-center">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] tracking-tight leading-snug">
                    Five or more signals mean the operating model must change.
                  </h3>
                  <p className="text-[#94A3B8] text-[11px] sm:text-xs font-normal leading-relaxed mt-1">
                    One is a management issue; several at once mean the center is trapped in execution capacity while the enterprise needs autonomous capability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Modernization is not an incremental tune-up. It is a deliberate shift from executing tickets under headquarters oversight to owning end-to-end technical outcomes with autonomous India leadership.
            </p>
          </div>
        </Section>

        {/* 5. The NeoIntelli GCC modernization framework */}
        <Section
          id="framework"
          eyebrow="TRANSFORMATION FRAMEWORK"
          title="The NeoIntelli GCC modernization framework"
          lead="Four stages. Diagnose before redesigning, redesign before transforming, and institutionalize so the change outlasts the program. Most failed transformations skip the first or the last."
          align="center"
          width="wide"
        >
          <GccModernizationFramework />
        </Section>

        {/* 6. What is GCC maturity? NeoIntelli's four-stage view */}
        <Section
          id="maturity"
          eyebrow="MATURITY SPECTRUM"
          title="What is GCC maturity? NeoIntelli's four-stage view"
          lead="GCC maturity is how much of the enterprise's capability, decision-making and value a center owns. NeoIntelli describes it in four stages. This is NeoIntelli's own lens for diagnosing a center and agreeing a target with headquarters; it is not an industry standard and it is not a certification."
          align="center"
          width="wide"
        >
          <div className="max-w-6xl mx-auto">
            <AdvisoryProcessFlow steps={maturityFlow} />
          </div>
        </Section>

        {/* 7. The NeoIntelli viewpoint / Moving up the ownership ladder */}
        <Section
          id="ownership"
          eyebrow="THE NEOINTELLI VIEWPOINT"
          title="The next stage of GCC maturity is usually more ownership, not simply more headcount."
          lead="Centers grow in trust before they grow in size. A GCC that owns one service end to end, reliably, earns the next product; a GCC that adds two hundred people to the same ticket queue does not. The ladder below is the progression NeoIntelli designs toward, one rung at a time."
          theme="navy"
          width="wide"
          align="center"
        >
          <UniversalLifecycle
            id="ownership-ladder"
            steps={ownershipLadder.map((s) => ({
              title: s.label,
              desc: s.note,
              href: s.href,
              icon: s.icon,
            }))}
            theme="navy"
            ariaLabel="Ownership progression: task execution, service ownership, product or platform ownership, enterprise capability ownership, AI and data transformation mandate"
          />
        </Section>

        {/* 8. When GCC modernization becomes AI transformation */}
        <Section
          id="ai-path"
          eyebrow="AI INTEGRATION"
          title="When GCC modernization becomes AI transformation."
          lead="Many modernization programs start as operating-model work and become AI work part-way through."
          width="regular"
          align="center"
          headerClassName="max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
            {/* Left: Clean narrative sentences without badge or sub-heading */}
            <div className="flex flex-col justify-center text-left space-y-4 text-[#505D74] text-sm sm:text-base leading-relaxed font-normal pr-0 lg:pr-4">
              <p>
                Many modernization programs start as operating-model work and become AI work part-way through, because
                the capability the enterprise wants India to own next is an AI or data capability. That is a different
                program: data foundations, MLOps, AI governance, AI product ownership and a workforce with a different
                seniority profile.
              </p>
              <p>
                When the triggers on the right describe your center, NeoIntelli scopes the work as an AI GCC program,
                which designs the center around AI and data capability rather than adding AI to an unchanged mandate.
              </p>
            </div>

            {/* Right: Navy blue rectangle with arrow points (not in boxes) */}
            <div className="bg-[#001844] text-white p-7 sm:p-8 shadow-md flex flex-col justify-center">
              <ul className="space-y-3.5 list-none pl-0 m-0">
                {aiTriggers.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                    <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Centered Button below both left and right divs */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              to={AI_PILLAR_LINKS.aiGcc.href}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#169DC8] to-[#0D306C] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#169DC8]/20 hover:from-[#1389af] hover:to-[#09224f] hover:shadow-[0_8px_25px_-4px_rgba(22,157,200,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group"
            >
              <span>Explore AI GCC</span>
              <ArrowRight aria-hidden className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-white" />
            </Link>
          </div>
        </Section>

        {/* 9. From current GCC to higher ownership */}
        <Section
          id="flow"
          eyebrow="TRANSFORMATION SEQUENCE"
          title="From current GCC to higher ownership"
          lead="The sequence a modernization program follows. Governance is designed here and run by GCC Operations afterwards."
          align="center"
          width="wide"
        >
          <UniversalLifecycle
            id="transformation-sequence"
            steps={modernizationFlow.map((f) => ({
              title: f.label,
              desc: f.note,
              href: f.href,
              icon: f.icon,
            }))}
            ariaLabel="Modernization sequence: current GCC, maturity diagnostic, mandate redesign, AI data and automation, workforce, operating model, governance, higher ownership"
          />
        </Section>

        {/* 10. GCC modernization questions, answered directly */}
        <Section
          id="questions"
          eyebrow="QUESTIONS &amp; ANSWERS"
          title="GCC modernization questions, answered directly"
          lead="Direct answers on moving beyond cost arbitrage, AI readiness, maturity stages, and global mandate expansion."
          align="center"
          width="regular"
        >
          <div className="max-w-4xl mx-auto">
            <AnswerBlock items={gccModernizationFaqs.map((a) => ({ question: a.q, answer: a.a }))} level={3} />
          </div>
        </Section>

        {/* 11. Contextual CTA */}
        <GccStrategyCTA
          title="Find out which stage your GCC is at, and what the next one would take."
          description="A 30-minute diagnostic conversation with a NeoIntelli GCC lead: mandate, maturity, talent, technology, governance and the value story headquarters hears today."
          primary={{
            label: "Assess My GCC",
            href: bookACallUrl("footer_cta"),
          }}
          secondary={{
            label: "Explore AI GCC",
            href: AI_PILLAR_LINKS.aiGcc.href,
          }}
          leadContext={leadContext}
        />

        {/* 12. Related Services */}
        <RelatedGccServices
          title="Services a modernization program draws on"
          variant="overview"
          primary={[
            {
              label: GCC_OPERATIONS_LINKS.overview.label,
              href: GCC_OPERATIONS_LINKS.overview.href,
              desc: "The operating layer that keeps a modernized center running: people, workplace, IT, governance, performance.",
              anchor: "Run and scale with GCC Operations",
            },
            {
              label: AI_PILLAR_LINKS.aiGcc.label,
              href: AI_PILLAR_LINKS.aiGcc.href,
              desc: "Design the center around AI and data capability when that is the next mandate.",
              anchor: "Build an AI-focused capability center",
            },
            {
              label: AI_PILLAR_LINKS.aiEngineering.label,
              href: AI_PILLAR_LINKS.aiEngineering.href,
              desc: "Product engineering, data platforms and automation programs that give the center something to own.",
              anchor: "Build the AI with AI Engineering",
            },
          ]}
          secondary={[
            {
              label: AI_PILLAR_LINKS.aiTalent.label,
              href: AI_PILLAR_LINKS.aiTalent.href,
              anchor: "Reshape the workforce with AI Talent",
            },
            {
              label: "GCC Strategy & Setup overview",
              href: R.overview,
              anchor: "Back to the GCC Strategy & Setup overview",
            },
            {
              label: "Strategy & Business Case",
              href: R.strategy,
              anchor: "Rebuild the mandate with Strategy & Business Case",
            },
          ]}
        />
      </main>
    </GccStrategyPageLayout>
  );
}
