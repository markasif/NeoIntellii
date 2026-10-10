import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Bot,
  Database,
  RefreshCw,
  Clock,
  Users,
  BarChart3,
  Workflow,
  Cpu,
  Check,
  Sliders,
  Search,
  Sparkles,
  UserCheck,
  Award,
  Rocket,
} from "lucide-react";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import {
  AiGccPageLayout,
  Section,
  SourceNote,
  OperatingEngineGrid,
  AiGccArchitecture,
  BuyerPathCards,
  ResponsiveTable,
  AnswerBlock,
  FlowDiagram,
  PointOfView,
  AiGccBuildJourney,
  StaggeredFeatureGrid,
} from "@/components/ai-gcc";
import { AI_GCC_CONTEXT_LINKS, AI_GCC_PAGE_BY_KEY } from "@/data/aiGcc";
import { getResearch } from "@/data/aiGccSources";
import { aiGccBookingUrl } from "@/lib/aiGccCta";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import PillTagList from "@/components/shared/PillTagList";

function CountingNumber({ target, suffix = "%" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1600;

    let animId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const HUB = AI_GCC_PAGE_BY_KEY.overview;
const booking = (ctaName: string, serviceInterest = HUB.serviceInterest) =>
  aiGccBookingUrl({ sourcePage: HUB.path, serviceInterest, ctaName });

const TRUST = [
  {
    title: "Senior-led",
    body: "Senior involvement from strategy through launch. The people who design the center stay accountable for how it runs.",
    icon: ShieldCheck,
    isTall: true,
  },
  {
    title: "NeoHireX Hiring OS",
    body: "AI-assisted candidate screening, first-round AI interviews and structured technical validation on NeoIntelli's own hiring platform.",
    icon: Bot,
    isTall: false,
  },
  {
    title: "AI + Data talent",
    body: "A specialist recruiting engine for GenAI, agentic AI, ML, data engineering and MLOps roles, with senior technical validation.",
    icon: Database,
    isTall: false,
  },
  {
    title: "Managed → BOT → Captive",
    body: "Choose the ownership model that fits the current stage and move to the next one without rebuilding the team.",
    icon: RefreshCw,
    isTall: true,
  },
];

const HARD_PARTS = [
  "Process redesign so AI changes how work is done, not just which tool is open",
  "Data that is governed, reusable and ready for retrieval, training and evaluation",
  "Specialist talent that is scarce and expensive to screen badly",
  "Compute sized to the workload rather than to the hype cycle",
  "Production deployment with evaluation, observability and rollback",
  "Governance that keeps agents inside their permissions",
  "Business ownership so someone is accountable for the outcome",
];

const BUYER_PATHS = [
  {
    title: "AI Micro GCC",
    tagline: "Start with 8 to 50 people. The operating system of a full GCC, starting with one AI squad.",
    bestFor: ["AI startups and scale-ups", "SaaS and mid-market companies", "PE-backed companies", "First India engineering teams"],
    includes: ["First AI squad", "Managed or co-owned launch", "Hiring + HR + infrastructure", "Path to captive"],
    cta: { label: "Explore AI Micro GCC", href: AI_GCC_CONTEXT_LINKS.microGcc.path },
    highlight: true,
    image: "/images/solution_micro_gcc.jpg",
    alt: "AI Micro GCC engineering squad collaborating in modern tech office",
    badge: "WAY 01",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Build a New AI GCC",
    tagline: "Enterprise and strategic capability-center launches designed around an AI mandate.",
    bestFor: ["Enterprises launching a first India center", "Groups adding an AI capability center to an existing footprint"],
    includes: ["Business case", "Mandate", "Entity", "Leadership", "Talent", "AI/data platform", "Governance", "Scale"],
    cta: { label: "Plan a New AI GCC", href: booking("Plan a New AI GCC") },
    image: "/images/mosaic_ai_gcc.jpg",
    alt: "Global AI Capability Center enterprise strategic setup",
    badge: "WAY 02",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Transform an Existing GCC",
    tagline: "For centers that already exist but hold fragmented AI pilots with no shared foundation.",
    bestFor: ["GCCs with pilots that never reached production", "Centers asked to own an enterprise AI mandate"],
    includes: ["AI maturity", "AI value realization", "Process redesign", "Talent transformation", "Platform modernization", "AgentOps", "Governance"],
    cta: { label: "Transform My Existing GCC", href: booking("Transform My Existing GCC", "AI GCC Transformation") },
    image: "/images/gcc_modernization.jpg",
    alt: "Transforming an existing GCC for enterprise AI operations",
    badge: "WAY 03",
    aspect: "aspect-[4/3]",
  },
];

const JOURNEY = [
  { label: "Decide", detail: "Mandate, business case, ownership model, city, team shape." },
  { label: "Establish", detail: "Entity or EOR path, workspace, IT, security, compliance baseline." },
  { label: "Hire", detail: "Leadership first, then the squad through the Hiring OS." },
  { label: "Enable AI", detail: "Data foundation, developer environments, compute, MLOps." },
  { label: "Operate", detail: "People operations, delivery cadence, governance, reporting." },
  { label: "Scale", detail: "Second squad, new capabilities, platform reuse." },
  { label: "Own", detail: "BOT milestone or captive transition when the case supports it." },
];

const TIMELINE_DRIVERS = ["Team size", "Role complexity", "Entity model", "Location", "Leadership hiring", "Infrastructure", "Compliance", "Real-estate model"];

const HIRING_FLOW = [
  { id: "01", name: "Role calibration", icon: Sliders },
  { id: "02", name: "Sourcing", icon: Search },
  { id: "03", name: "NeoHireX screening", icon: Bot },
  { id: "04", name: "AI first-round evaluation", icon: Sparkles },
  { id: "05", name: "Senior technical validation", icon: ShieldCheck },
  { id: "06", name: "Client interview", icon: UserCheck },
  { id: "07", name: "Offer", icon: Award },
  { id: "08", name: "Onboarding", icon: Rocket },
];

const INFRA = [
  {
    title: "Development",
    desc: "AI developer environments, model and API access, vector infrastructure and experiment tracking.",
    items: ["AI developer environments", "Model and API access", "Vector infrastructure", "Experiment tracking"],
    image: "/images/gcc-operations/gcc-ops-workplace.jpg",
    imageAlt: "AI development infrastructure and developer environments",
  },
  {
    title: "Training",
    desc: "GPU capacity planning, fine-tuning infrastructure, storage pipelines and model checkpoint management.",
    items: ["GPU capacity planning", "Training and fine-tuning", "Storage", "Pipelines", "Model and checkpoint management"],
    image: "/images/gcc-operations/gcc-ops-performance.jpg",
    imageAlt: "GPU compute cluster training and fine-tuning infrastructure",
  },
  {
    title: "Production",
    desc: "Inference pipelines, autoscaling, model gateways, production observability, security and AI FinOps.",
    items: ["Inference", "Autoscaling", "Model gateways", "Observability", "Security", "AI FinOps"],
    image: "/images/gcc-operations/gcc-ops-card.jpg",
    imageAlt: "Production AI inference and MLOps deployment command center",
  },
];

const OWNERSHIP = [
  {
    name: "Managed GCC",
    body: "NeoIntelli runs the operating environment around your India team: hiring, people operations, workspace, IT and infrastructure operations, under your direction. The team works only for you. Product direction and work product stay with you under the engagement contract.",
    fit: "First squad, fastest path to a working team, minimal internal overhead.",
    items: [
      "Dedicated India Team",
      "Full People & IT Ops",
      "Work Product Stays Yours",
      "Zero Local Admin Overhead",
    ],
    image: "/images/how_we_work/phase_03_operate.jpg",
    imageAlt: "Managed GCC operations and dedicated India engineering workspace",
  },
  {
    name: "EOR-first",
    body: "Hire in India before you have your own Indian entity, through an employer-of-record arrangement that NeoIntelli coordinates. The team can later move to your entity. Whether an EOR structure suits you depends on your legal, tax and regulatory position; confirm it with your advisers.",
    fit: "Companies that want to start hiring now and decide on an entity later.",
    items: [
      "Immediate Sourcing & Hiring",
      "No Upfront Entity Required",
      "Coordinated EOR Framework",
      "Seamless Transition Later",
    ],
    image: "/images/how_we_work/phase_01_design.jpg",
    imageAlt: "EOR-first employment and onboarding setup session",
  },
  {
    name: "Build-Operate-Transfer",
    body: "NeoIntelli builds and operates the center against agreed milestones. At transfer, the team, operating processes and agreed assets move to your entity on the terms set out in the contract. The transfer is planned from day one, not negotiated at the end.",
    fit: "Companies that intend to own the center but want a proven operation before taking it on.",
    items: [
      "Built for Handover from Day 1",
      "Milestone-Based Operation",
      "Staged Asset & Process Transfer",
      "Zero Proprietary Lock-In",
    ],
    image: "/images/how_we_work/phase_02_build.jpg",
    imageAlt: "Build-Operate-Transfer engineering and milestone transition",
  },
  {
    name: "Captive",
    body: "Your own entity from the start. NeoIntelli supports setup, hiring, people operations, infrastructure and AI enablement as much or as little as you need while your leadership runs the center.",
    fit: "Enterprises with an existing India presence or a settled decision to operate directly.",
    items: [
      "100% Direct Corporate Entity",
      "Modular Operating Support",
      "Client Leadership Driven",
      "Full Strategic Autonomy",
    ],
    image: "/images/how_we_work/phase_04_scale.jpg",
    imageAlt: "100% Captive enterprise headquarters and global capability expansion",
  },
];

const TRANSFORM = [
  {
    title: "AI Value Diagnostic",
    body: "Inventory every pilot, measure what each one changed, and rank the portfolio by business outcome rather than by technical novelty.",
    icon: BarChart3,
  },
  {
    title: "Process Redesign",
    body: "Redesign the workflows AI is meant to change, with clear human decision points, so adoption is engineered rather than hoped for.",
    icon: Workflow,
  },
  {
    title: "Workforce Transformation",
    body: "Re-map roles, skills and hiring plans toward AI engineering, data, MLOps and product ownership.",
    icon: Users,
  },
  {
    title: "Platform & AgentOps",
    body: "Consolidate fragmented tooling into a shared data, model and agent platform with evaluation and observability built in.",
    icon: Cpu,
  },
  {
    title: "AI Governance",
    body: "AI inventory, risk classification, controls and audit evidence that scale with the portfolio instead of slowing it.",
    icon: ShieldCheck,
  },
];

const COMPARISON_ROWS: string[][] = [
  ["GCC Strategy", "Yes", "Rarely", "No", "Yes"],
  ["Setup & Operations", "Yes", "No", "No", "Yes"],
  ["AI Advisory", "Partial", "Yes", "No", "Yes"],
  ["Hiring OS", "No", "No", "Partial", "Yes (NeoHireX)"],
  ["AI/Data Hiring", "Partial", "No", "Yes", "Yes"],
  ["HR Operations", "Yes", "No", "No", "Yes"],
  ["Workspace & IT", "Yes", "No", "No", "Yes"],
  ["GPU/AI Infrastructure", "Partial", "Partial", "No", "Yes"],
  ["GenAI/Data/MLOps", "Rarely", "Yes", "No", "Yes"],
  ["AI Governance", "Partial", "Yes", "No", "Yes"],
  ["BOT/Captive Path", "Yes", "No", "No", "Yes"],
];

const POD_VS_MICRO: string[][] = [
  ["Purpose", "Deliver a defined capability or project", "Build a long-term dedicated India capability"],
  ["Duration", "Scoped to the project or capability need", "Ongoing, designed to grow"],
  ["Operating model", "NeoIntelli-run delivery team", "Full GCC operating model at squad scale: hiring, HR, workspace, IT, infrastructure"],
  ["Ownership path", "Not the goal", "Managed → BOT → Captive"],
  ["Best when", "You need outcomes quickly without building a center", "You want your own India team and the option to own it"],
];

const FAQ = [
  {
    question: "What is an AI Micro GCC?",
    answer: "An AI Micro GCC is a dedicated India AI capability of roughly 8 to 50 people that runs on the same operating model as a full GCC: Hiring OS, people operations, workspace, IT, cloud or GPU infrastructure, AI engineering and governance, with a path to your own captive center.",
    detail: ["It is the most common way companies start with NeoIntelli. The first squad is usually an AI engineering or data team. The operating model is designed so the second and third squads reuse what the first one built."],
  },
  {
    question: "Can an AI GCC start with 8 to 10 people?",
    answer: "Yes. A first squad of 8 to 10 is a normal starting point when the mandate is clear and leadership is in place.",
    detail: ["What matters is the operating environment around the squad. A 10-person AI GCC should not copy the operating model of a 1,000-person GCC, but it still needs hiring, HR, workspace, IT, compute and governance done properly."],
  },
  {
    question: "What roles should an AI GCC hire first?",
    answer: "Usually an AI engineering lead, then the engineers closest to the first use case: AI/ML or GenAI engineers, a data engineer and an MLOps or platform engineer. Product ownership and a domain expert come from HQ or are hired early.",
    detail: ["Team composition depends on the mandate. A retrieval-heavy copilot needs data and evaluation depth; an agentic workflow needs backend, integration and AgentOps skills."],
  },
  {
    question: "How much does an AI GCC cost?",
    answer: "Cost depends on team size and seniority, city, entity or EOR model, workspace, compute and the ownership model. There is no single number that is honest across those variables.",
    detail: [`Use the ${AI_GCC_CONTEXT_LINKS.costCalculator.name} for a role-by-role estimate, and the ${AI_GCC_CONTEXT_LINKS.roiEstimator.name} to model value against that cost. GPU spend is planned separately from the people cost, because utilization changes the answer.`],
  },
  {
    question: "Can we start without an India entity?",
    answer: "Yes. The EOR-first and Managed GCC models let you hire and operate before an Indian entity exists, and move the team to your entity later.",
    detail: ["Whether that is the right structure for you depends on legal, tax and regulatory factors specific to your company. NeoIntelli coordinates the operational side; your legal and tax advisers confirm the structure."],
  },
  {
    question: "Can the team transfer to our own entity later?",
    answer: "Yes. Transfer is designed in from the start under the Build-Operate-Transfer or Managed models, with milestones and terms agreed in the engagement contract.",
  },
  {
    question: "Who owns the IP?",
    answer: "Work product created for you is assigned to you under the engagement contract. NeoIntelli does not claim rights over your product, models, prompts or data.",
    detail: ["Specific terms, including pre-existing NeoIntelli tooling such as NeoHireX, are set out in the contract and should be reviewed by your counsel."],
  },
  {
    question: "What does NeoIntelli operate versus what does the client control?",
    answer: "NeoIntelli operates the environment: hiring, people operations, workspace, IT, infrastructure operations and platform engineering as agreed. The client controls product roadmap, priorities, architecture decisions, data access, budget and governance policy.",
    detail: [`The ${AI_GCC_PAGE_BY_KEY.setup.name} page has the full responsibility table.`],
  },
  {
    question: "Can NeoIntelli transform an existing GCC?",
    answer: "Yes. Existing centers with fragmented pilots get an AI value diagnostic, process redesign, workforce transformation, platform and AgentOps consolidation and AI governance.",
  },
];

export default function AISolutions() {
  const [activeOwnership, setActiveOwnership] = useState<number>(2);

  return (
    <AiGccPageLayout
      hero={{
        pageKey: "overview",
        eyebrow: "AI GCC in India",
        title: "Build and operate your AI GCC in India.",
        description: "Start with an AI Micro GCC or build a full capability center. NeoIntelli brings AI strategy, GCC setup, Hiring OS, specialist AI talent, people operations, workspace, cloud and GPU infrastructure, AI engineering, AgentOps and governance together under one operating model.",
        primaryCta: { label: HUB.ctaLabel, href: booking(HUB.ctaLabel) },
        secondaryCta: { label: "Start with an AI Micro GCC", href: AI_GCC_CONTEXT_LINKS.microGcc.path },
        tertiaryLink: { label: "Already have a GCC? Transform it for AI →", href: "#transform-existing-gcc" },
      }}
      cta={{
        title: "One AI GCC. One accountable operating partner.",
        description: "Tell us the mandate, the team you have in mind and where you are on entity and ownership. We will come back with a plan for the first squad and the operating environment around it.",
        secondary: { label: AI_GCC_CONTEXT_LINKS.readiness.anchor, href: AI_GCC_CONTEXT_LINKS.readiness.path },
      }}
      related={[
        { context: "microGcc" },
        { page: "setup" },
        { page: "infrastructure" },
        { context: "aiDataRecruitment" },
        { context: "blueprint" },
      ]}
    >
      {/* ── TRUST STRIP ─────────────────────────────────────────────────── */}
      <section aria-label="Why NeoIntelli for an AI GCC" className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-8 sm:pb-16 bg-[#E7EDF9]">
        <div className="max-w-7xl mx-auto">
          <StaggeredFeatureGrid items={TRUST} />
        </div>
      </section>

      {/* ── WHAT IS AN AI GCC ──────────────────────────────────────────── */}
      <Section id="what-is-an-ai-gcc" eyebrow="DEFINITION" title="What is an AI GCC?" width="wide" align="center">
        <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
          <p className="drop-cap-amber">
            An AI GCC is a Global Capability Center designed to own and operate AI, data and AI-enabled engineering capabilities as part of the enterprise operating model. Unlike a traditional delivery center, an AI GCC combines specialist talent, data, compute, MLOps, AgentOps, governance and business ownership around measurable enterprise outcomes.
          </p>
          <p>
            The word &quot;AI&quot; describes what the center owns, not a marketing flavor. A traditional GCC is measured on delivery capacity and cost. An AI GCC is measured on workflows transformed, models and agents in production, and the business value they create. That changes who you hire, what infrastructure you run, how work is governed and how the center reports to HQ.
          </p>
          <p>
            NeoIntelli is an AI GCC Operating Partner based in Bengaluru, India. We design, build, hire, enable, operate and scale AI capability centers for companies headquartered in the US, the UK and Europe, from a first squad of 8 to a multi-capability center.
          </p>
          <div className="pt-2 sm:pt-4 space-y-3">
            <h3 className="text-[#0D244D] font-display font-bold text-xl sm:text-2xl">
              How is an AI GCC different from a traditional GCC?
            </h3>
            <p>
              A traditional GCC takes defined work from HQ and delivers it at scale. An AI GCC is expected to change how that work is done. It needs data engineers and MLOps as core roles rather than support roles, GPU and inference infrastructure as part of the design, evaluation and AgentOps as the production discipline, and AI governance that covers agents as well as models. The people, platform and governance layers are different, so the setup has to be different.
            </p>
          </div>
          <div className="pt-2 sm:pt-4 space-y-3">
            <h3 className="text-[#0D244D] font-display font-bold text-xl sm:text-2xl">
              Why India?
            </h3>
            <p>
              India has the deepest pool of software, data and AI engineering talent outside the US, a mature Global Capability Center ecosystem in cities such as Bengaluru, Hyderabad, Pune and Chennai, working-hour overlap with Europe and a usable handover window with North America, and a cost structure that lets a company fund senior engineers rather than a large junior bench. The talent is real; the difficulty is screening it well and operating the environment around it. That is the work NeoIntelli does.
            </p>
          </div>
        </SmoothLineReveal>
      </Section>

      {/* ── OPERATIONAL REALITY ─────────────────────────────────────────── */}
      <Section
        id="why-ai-gcc-now"
        eyebrow="THE AI GCC REALITY"
        title="AI adoption is common. AI value is not."
        width="wide"
        align="center"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto">
          {/* Left Column: Transparent points with clean arrows + PointOfView vertically centered */}
          <div className="flex flex-col justify-center text-left h-full gap-6 sm:gap-8">
            <ul className="space-y-4 sm:space-y-4.5 list-none p-0 m-0">
              {HARD_PARTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-transparent text-[#2B3D66]"
                >
                  <ArrowRight className="w-4 h-4 text-[#008EC4] mt-1 shrink-0" aria-hidden />
                  <span className="text-sm sm:text-base font-normal leading-relaxed text-[#2B3D66]">{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <PointOfView>
                A GCC should not measure AI maturity by the number of pilots running. It should measure processes transformed and business outcomes created.
              </PointOfView>
            </div>
          </div>

          {/* Right Column: 88% and 39% cards stacked with counting animation */}
          <div className="flex flex-col justify-between gap-6 sm:gap-8 h-full">
            {/* Card 1: 88% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 p-7 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 shadow-[0_8px_24px_rgba(13,48,108,0.06)] hover:border-[#169DC8]/40 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-mono font-bold text-[#008EC4] tracking-tighter block leading-none mb-3 select-none">
                  <CountingNumber target={88} />
                </span>
                <p className="text-base sm:text-lg font-bold text-[#0D244D] leading-snug tracking-tight mb-4">
                  of surveyed organizations report using AI in at least one business function.
                </p>
              </div>
              <div>
                <div className="w-10 h-[2px] bg-[#008EC4] mb-3.5" />
                <p className="text-xs text-[#505D74] leading-relaxed">
                  Source: {getResearch("state-of-ai-2025-adoption").publisher}, {getResearch("state-of-ai-2025-adoption").title} ({getResearch("state-of-ai-2025-adoption").year}). {getResearch("state-of-ai-2025-adoption").context}
                </p>
              </div>
            </motion.div>

            {/* Card 2: 39% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 p-7 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 shadow-[0_8px_24px_rgba(13,48,108,0.06)] hover:border-[#169DC8]/40 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-mono font-bold text-[#008EC4] tracking-tighter block leading-none mb-3 select-none">
                  <CountingNumber target={39} />
                </span>
                <p className="text-base sm:text-lg font-bold text-[#0D244D] leading-snug tracking-tight mb-4">
                  Only 39% of surveyed organizations report any enterprise-level EBIT impact from AI, and most of those report it at under 5% of EBIT.
                </p>
              </div>
              <div>
                <div className="w-10 h-[2px] bg-[#008EC4] mb-3.5" />
                <p className="text-xs text-[#505D74] leading-relaxed">
                  Source: {getResearch("state-of-ai-2025-ebit").publisher}, {getResearch("state-of-ai-2025-ebit").title} ({getResearch("state-of-ai-2025-ebit").year}). {getResearch("state-of-ai-2025-ebit").context}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── THREE WAYS TO START ─────────────────────────────────────────── */}
      <Section
        id="three-ways-to-start"
        eyebrow="THREE WAYS TO BEGIN"
        title="One AI GCC model. Three ways to begin."
        width="wide"
        align="center"
        lead="The operating model is the same. The starting point depends on where you are."
      >
        <BuyerPathCards paths={BUYER_PATHS} ctaButtonVariant="cyan" ctaAfterContent />
      </Section>

      {/* ── OPERATING SYSTEM ────────────────────────────────────────────── */}
      <Section
        id="operating-system"
        eyebrow="AI GCC OPERATING SYSTEM"
        title="Everything your AI GCC needs under one operating model."
        width="wide"
        align="center"
        lead="One AI GCC. Multiple operating engines. These are not separate businesses; they are components of one operating model, run by one accountable partner."
      >
        <OperatingEngineGrid />
      </Section>

      {/* ── ARCHITECTURE (DARK NAVY BLUEPRINT) ─────────────────────────── */}
      <Section
        id="architecture"
        eyebrow="CORE ARCHITECTURE"
        title="Your AI GCC is a system, not a hiring project."
        theme="navy"
        width="wide"
        align="center"
        lead="Four layers have to work together. Hiring fills one of them."
        wavesOnMobile
      >
        <AiGccArchitecture />
      </Section>

      {/* ── BUILD JOURNEY ───────────────────────────────────────────────── */}
      <Section
        id="build-journey"
        eyebrow="PARALLEL BUILD JOURNEY"
        title="Build the center in parallel, not sequentially."
        width="wide"
        align="center"
        lead="Entity, workspace, hiring and infrastructure run as parallel workstreams from the decision point. Waiting for each to finish before the next starts is the main reason launches drift."
      >
        <AiGccBuildJourney steps={JOURNEY} />

        {/* Transparent How long does it take section with custom pill tags */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0D306C] tracking-tight leading-snug mb-3">
            How long does it take to build an AI GCC in India?
          </h3>
          <p className="text-[#505D74] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
            There is no universal launch timeline, and any partner that quotes one before understanding your mandate is guessing. The timeline is set by:
          </p>

          {/* Pill tags matching requested cyan pill design */}
          <PillTagList items={TIMELINE_DRIVERS} size="lg" />
        </div>
      </Section>

      {/* ── TALENT & HIRING ENGINE (DARK NAVY SECTION) ─────────────────── */}
      <Section
        id="hiring-engine"
        eyebrow="RECRUITMENT HUB + NEOHIREX HIRING OS"
        title="The AI GCC needs a different hiring engine."
        theme="navy"
        width="wide"
        align="center"
        lead="AI talent is scarce. Poor screening makes that scarcity even more expensive. Every AI GCC hire runs through one calibrated flow."
        wavesOnMobile
      >
        <UniversalLifecycle
          theme="navy"
          stages={HIRING_FLOW}
          id="ai-gcc-hiring-lifecycle"
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-6 md:mt-8 text-left items-stretch">
          {/* Left Column: What is NeoHireX? (Directly on section background, no container box) */}
          <div className="flex flex-col justify-between h-full py-2 sm:py-3 px-1 sm:px-2">
            <div>
              {/* NeoHireX OG Logo Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white shadow-md border border-white/90 transition-all">
                  <img
                    src="/images/neohirex-logo.png"
                    alt="NeoHireX"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#38BDF8]">
                  HIRING OS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-3">
                What is NeoHireX?
              </h3>
              <p className="text-sm sm:text-[15px] text-[#C5D7F0] leading-relaxed mb-6 font-normal">
                NeoHireX is NeoIntelli&apos;s own AI hiring platform: applicant tracking, AI screening and ranking, first-round AI interviews and offer management. For applicable engagements it is included in the service, so the GCC does not need a separate ATS to run its hiring.
              </p>
            </div>

            <div className="pt-2 mt-auto">
              <Link
                to={AI_GCC_CONTEXT_LINKS.talentAcquisition.path}
                className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0D244D] font-semibold text-xs sm:text-sm hover:bg-[#38BDF8] hover:text-white transition-all shadow-md hover:shadow-lg group/link cursor-pointer"
              >
                <span>{AI_GCC_CONTEXT_LINKS.talentAcquisition.anchor}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Card 2: Specialist AI and Data hiring (Navy Hero Card with Topic Clusters Wave Ribbon Background) */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D] p-7 sm:p-9 transition-all duration-300 shadow-xl shadow-[#081B3E]/30 flex flex-col justify-between h-full group text-white">
            {/* Abstract golden-blue flowing wave ribbons at top from Topic Clusters */}
            <div className="absolute top-0 left-0 right-0 h-32 sm:h-36 overflow-hidden pointer-events-none opacity-85">
              <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none">
                <path
                  d="M -20,28 C 80,8 160,82 260,38 C 320,12 360,36 420,10"
                  stroke="url(#hiringTopicGoldGradient)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M -20,44 C 90,18 180,96 280,48 C 340,22 380,46 420,18"
                  stroke="url(#hiringTopicBlueGradient)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M -20,60 C 100,28 200,108 300,58 C 350,32 390,56 420,28"
                  stroke="url(#hiringTopicCyanGradient)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <defs>
                  <linearGradient id="hiringTopicGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.2" />
                    <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="hiringTopicBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="hiringTopicCyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Ambient top-right cyan glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#00A3E0]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00A3E0]/30 transition-all duration-500" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                {/* Header Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                    <Users className="w-4 h-4 text-[#38BDF8]" />
                    SPECIALIST AI TALENT
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-3 group-hover:text-[#38BDF8] transition-colors">
                  Specialist AI and Data hiring
                </h3>
                <p className="text-sm sm:text-[15px] text-[#C5D7F0] leading-relaxed mb-6 font-normal">
                  GenAI, agentic AI, ML, data engineering, MLOps and AI architecture roles are sourced by a specialist desk and validated by senior AI practitioners before a candidate reaches your interview.
                </p>
              </div>

              <div className="pt-2 mt-auto">
                <Link
                  to={AI_GCC_CONTEXT_LINKS.aiDataRecruitment.path}
                  className="btn-cyan"
                >
                  <span>{AI_GCC_CONTEXT_LINKS.aiDataRecruitment.anchor}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-8 max-w-3xl mx-auto text-center">
          Recruitment ends at the offer and onboarding. After that, People & HR Operations takes over: employment support, payroll coordination, benefits, engagement, learning, performance support and retention.{" "}
          <Link to={AI_GCC_CONTEXT_LINKS.talentManagement.path} className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-2">
            {AI_GCC_CONTEXT_LINKS.talentManagement.anchor}
          </Link>.
        </p>
      </Section>

      {/* ── AI INFRASTRUCTURE & GPU ─────────────────────────────────────── */}
      <Section
        id="ai-infrastructure"
        eyebrow="AI INFRASTRUCTURE & GPU"
        title="Give the AI team the compute environment it actually needs."
        width="wide"
        align="center"
        lead="Dedicated GPUs are not automatically cheaper than cloud GPUs. Utilization determines the economics. The infrastructure engine sizes each stage to the workload."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {INFRA.map((stage, idx) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 text-left"
            >
              {/* TOP WHITE CONTENT SECTION */}
              <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 bg-white">
                {/* Category Eyebrow in uppercase vibrant blue */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#169DC8] mb-1.5 sm:mb-2">
                  STAGE 0{idx + 1}
                </span>

                {/* Main Title */}
                <h3 className="text-xl sm:text-2xl lg:text-[23px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors mb-2">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-3">
                  {stage.desc}
                </p>

                {/* Existing data items rendered cleanly as 2-column checklist */}
                <div className="pt-3 border-t border-[#E7EDF9]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-[13px] text-[#2B3D66]">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-medium">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#169DC8]" aria-hidden="true" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BOTTOM IMAGE CONTAINER (Flush with bottom rounded corners) */}
              <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-[#081B3E] flex-shrink-0">
                <img
                  src={stage.image}
                  alt={stage.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 sm:mt-10 text-center">
          <Link
            to={AI_GCC_PAGE_BY_KEY.infrastructure.path}
            className="btn-gradient-primary"
          >
            {AI_GCC_PAGE_BY_KEY.infrastructure.anchor} <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </p>
      </Section>

      {/* ── OWNERSHIP MODELS ─────────────────────────────────────────────── */}
      <Section
        id="ownership-models"
        eyebrow="SCALE, BOT & OWNERSHIP"
        title="Start with the ownership model that fits today."
        width="wide"
        align="center"
        lead="All four models run the same operating engines. They differ in who employs the team, who runs the environment and when ownership moves."
      >
        {/* 4-Card Horizontal Process Columns with smooth staggered entrance animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 items-stretch pt-2 sm:pt-4">
          {OWNERSHIP.map((model, index) => {
            const isActive = activeOwnership === index;
            const num = `0${index + 1}`;

            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveOwnership(index)}
                onClick={() => setActiveOwnership(index)}
                className={`relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[400px] sm:min-h-[440px] lg:min-h-[520px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                  isActive
                    ? "lg:-my-8 lg:py-14 scale-[1.01] lg:scale-[1.02] shadow-xl lg:shadow-none text-white z-20 overflow-hidden"
                    : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent"
                }`}
              >
                {/* ACTIVE STATE BACKGROUND IMAGE & CYAN DUOTONE ARCHITECTURAL WASH */}
                {isActive && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                    <img
                      src={model.image}
                      alt={model.imageAlt}
                      className="w-full h-full object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Cyan / Teal Duotone architectural overlay matching reference image */}
                    <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                    <div className="absolute inset-0 bg-cyan-600/15" />
                  </div>
                )}

                {/* CARD CONTENT */}
                <div className="relative z-10 text-left">
                  {/* Big Numerals 01, 02, 03, 04 in website's typography */}
                  <div className="flex items-center justify-between leading-none">
                    <span
                      className={`text-6xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-none transition-colors duration-300 select-none ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    >
                      {num}
                    </span>
                  </div>

                  {/* Vertical Dotted Track Line under the number matching reference image */}
                  <div
                    className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                      isActive ? "border-white/60" : "border-slate-300"
                    }`}
                  />

                  {/* Model Title */}
                  <h3
                    className={`text-2xl sm:text-[26px] font-bold tracking-tight mb-3 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {model.name}
                  </h3>

                  {/* Lead Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mb-4 font-normal transition-colors duration-300 ${
                      isActive ? "text-slate-100" : "text-slate-600"
                    }`}
                  >
                    {model.body}
                  </p>

                  {/* Fits When Highlight Box */}
                  <div
                    className={`pt-3 pb-3 border-t transition-colors duration-300 mb-3 ${
                      isActive ? "border-white/20" : "border-slate-200"
                    }`}
                  >
                    <p className={`text-xs sm:text-[13px] font-medium ${isActive ? "text-white/95" : "text-slate-800"}`}>
                      <span className={`font-semibold ${isActive ? "text-[#67D5F7]" : "text-[#008EC4]"}`}>Fits when: </span>
                      {model.fit}
                    </p>
                  </div>

                  {/* Deliverable Milestones with Arrow Icons */}
                  <ul
                    className={`space-y-2 pt-3 border-t transition-colors duration-300 ${
                      isActive ? "border-white/20" : "border-slate-200"
                    }`}
                  >
                    {model.items.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2.5 text-xs sm:text-[13px] font-medium transition-colors duration-300 group/item ${
                          isActive ? "text-white/95" : "text-slate-700"
                        }`}
                      >
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5 ${
                            isActive ? "text-[#67D5F7]" : "text-[#169DC8]"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="relative z-10 pt-6 text-left">
                  <a
                    href={booking(model.name)}
                    className={`${isActive ? "btn-cyan" : "btn-white"}`}
                  >
                    <span>Explore Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[#7A889B] text-xs leading-relaxed mt-10 sm:mt-14 max-w-3xl mx-auto text-center">
          Legal, tax and employment outcomes depend on your jurisdiction, structure and contracts. NeoIntelli coordinates the operational model; your legal, tax and compliance advisers confirm the structure.
        </p>
      </Section>

      {/* ── EXISTING GCC TRANSFORMATION ─────────────────────────────────── */}
      <Section
        id="transform-existing-gcc"
        eyebrow="EXISTING GCC TRANSFORMATION"
        title="Already have a GCC? Make AI measurable."
        width="wide"
        align="center"
        lead="Do not measure AI maturity by the number of pilots. Measure workflows transformed and business outcomes created."
      >
        {/* 5-Step Progression using Half-Sink Slot Count */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center max-w-6xl mx-auto mb-10 sm:mb-14">
          {TRANSFORM.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Slotted Step Number Design matching reference image */}
                  <SlottedStepNumber index={index} />

                  <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[#505D74] text-xs leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                    {step.body}
                  </p>
                </div>

                <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                  <StepIcon className="w-6 h-6 stroke-[1.8]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Value Realization Card Below (matching ServiceManagementPerformance container styling without accelerator tag) */}
        <div className="overflow-hidden bg-white shadow-sm max-w-6xl mx-auto">
          <div className="bg-[#0D244D] text-white p-7 sm:p-9 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden text-left">
            {/* Ambient Cyan Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#008EC4]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-10 rounded-full bg-[#123164] border border-[#1E4D94] flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  AI Value Realization
                </h3>
              </div>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal">
                Turn AI adoption into measurable business value: cost, cycle time, quality, revenue, risk and adoption, reported the way HQ already reads results.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                to={booking("Transform My Existing GCC", "AI GCC Transformation")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#169DC8] to-[#008EC4] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(22,157,200,0.5)] transition-all hover:gap-3"
              >
                <span>Transform My Existing GCC</span>
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOR STARTUPS & SCALE-UPS ────────────────────────────────────── */}
      <Section
        id="ai-engineering-team-india"
        eyebrow="FOR STARTUPS AND SCALE-UPS"
        title="Build your AI engineering team in India."
        width="wide"
        align="center"
        lead="Start with one AI squad. Operate through NeoIntelli. Scale into an AI Micro GCC. Own it when you are ready."
      >
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center self-center py-2 sm:py-4">
            <p className="text-[#3A4860] text-sm sm:text-base leading-relaxed mb-4 font-normal">
              For a startup or scale-up the first India team is an engineering decision, not a corporate-structure project. You need a calibrated squad, someone to run employment, payroll, workspace and IT, and infrastructure the engineers can use on day one. That is an AI Micro GCC in practice, even if nobody calls it that yet.
            </p>
            <p className="text-[#3A4860] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              A talent pod and a Micro GCC are not the same thing. A pod delivers a capability or project. A Micro GCC is a long-term dedicated India capability with its own operating model and a path to ownership.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={AI_GCC_CONTEXT_LINKS.microGcc.path}
                className="btn-gradient-primary text-xs sm:text-sm py-2.5 px-5 sm:px-6 shadow-sm"
              >
                <span>Explore AI Micro GCC</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" aria-hidden />
              </Link>
              <Link
                to={AI_GCC_CONTEXT_LINKS.aiStartups.path}
                className="btn-white cursor-pointer shrink-0"
              >
                <span>GCC for AI startups</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" aria-hidden />
              </Link>
            </div>
          </div>
          <ResponsiveTable caption="Talent pod compared with an AI Micro GCC" headers={["", "Talent Pod", "AI Micro GCC"]} rows={POD_VS_MICRO} />
        </div>
      </Section>

      {/* ── WHY NEOINTELLI ──────────────────────────────────────────────── */}
      <Section
        id="why-neointelli"
        eyebrow="WHY NEOINTELLI"
        title="More than GCC setup. More than AI consulting."
        width="wide"
        align="center"
        lead="Most providers cover one or two engines. The AI GCC needs all of them, run together. Ratings describe typical provider categories, not named companies."
      >
        <ResponsiveTable
          caption="Capability comparison between provider categories and NeoIntelli"
          headers={["Capability", "Traditional GCC Provider", "AI Consultancy", "Recruitment Firm", "NeoIntelli"]}
          rows={COMPARISON_ROWS}
        />
        <p className="text-[#505D74] text-sm leading-relaxed mt-6 max-w-3xl mx-auto text-center">
          Senior-led, Bengaluru-based, and accountable for the whole operating environment.{" "}
          <Link to={AI_GCC_CONTEXT_LINKS.about.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">
            {AI_GCC_CONTEXT_LINKS.about.anchor}
          </Link>.
        </p>
      </Section>

      {/* ── BUYER QUESTIONS ─────────────────────────────────────────────── */}
      <Section
        id="ai-gcc-questions"
        eyebrow="BUYER QUESTIONS"
        title="Questions buyers ask before starting an AI GCC."
        width="narrow"
        align="center"
      >
        <AnswerBlock items={FAQ} />
        <div className="mt-8 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#D2DCF0] text-center shadow-sm">
          <p className="text-[#505D74] text-sm">
            Planning tools:{" "}
            <Link to={AI_GCC_CONTEXT_LINKS.costCalculator.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.costCalculator.name}</Link>,{" "}
            <Link to={AI_GCC_CONTEXT_LINKS.roiEstimator.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.roiEstimator.name}</Link>,{" "}
            <Link to={AI_GCC_CONTEXT_LINKS.readiness.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.readiness.name}</Link> and the{" "}
            <Link to={AI_GCC_CONTEXT_LINKS.blueprint.path} className="text-[#169DC8] hover:text-[#0D306C] font-semibold underline underline-offset-2">{AI_GCC_CONTEXT_LINKS.blueprint.name}</Link>.
          </p>
        </div>
      </Section>
    </AiGccPageLayout>
  );
}
