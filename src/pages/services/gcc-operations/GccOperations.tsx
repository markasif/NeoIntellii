import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  FileText,
  UserCheck,
  Shield,
  Wrench,
  Database,
  FileCheck,
  ShieldCheck,
  GraduationCap,
  Users,
  Handshake,
  BookOpen,
  ClipboardCheck,
  Bot,
  Sparkles,
  FileSearch,
  Headphones,
  MessageSquare,
  LineChart,
  TrendingUp,
  ScanEye,
  Infinity as InfinityIcon,
  IndianRupee,
  BarChart3,
  Briefcase,
  Layers,
  RefreshCw,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import SectionHeader from "@/components/ui/SectionHeader";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import CardGrid from "@/components/gcc-operations/CardGrid";
import Checklist from "@/components/gcc-operations/Checklist";
import OwnershipSplit from "@/components/gcc-operations/OwnershipSplit";
import OperatingBoundariesDiagram from "@/components/gcc-operations/OperatingBoundariesDiagram";
import OperatingLayerGrid from "@/components/gcc-operations/OperatingLayerGrid";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import OperatingArchitecture from "@/components/gcc-operations/OperatingArchitecture";
import ResponsibilityMatrix from "@/components/gcc-operations/ResponsibilityMatrix";
import ManagedModelComparison from "@/components/gcc-operations/ManagedModelComparison";
import BotJourney from "@/components/gcc-operations/BotJourney";
import GccPerformanceFramework from "@/components/gcc-operations/GccPerformanceFramework";
import SourceNote, { SCOPE_NOTE } from "@/components/gcc-operations/SourceNote";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import OperatingRealitySection from "@/components/gcc-operations/OperatingRealitySection";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("overview");
const faqs = gccOperationsFaqs[page.path];

const link = "text-[#008EC4] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 hover:text-[#0D306C] hover:decoration-[#0D306C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-xs transition-colors";

const clientOwns = [
  "Business strategy",
  "GCC mandate",
  "Product roadmap",
  "Intellectual property",
  "Data ownership",
  "Enterprise architecture",
  "Budget approval",
  "Final hiring decisions",
  "Executive governance",
];

const neointelliOperates = [
  "Recruitment operations",
  "Local onboarding",
  "HR administration",
  "Workplace support",
  "IT operations coordination",
  "Service management",
  "Operating reporting",
  "Local vendor coordination",
  "Compliance workflows",
  "GCC operating cadence",
  "Transition programme",
];

const transferable = [
  "Documented processes",
  "Defined ownership for every function",
  "Service levels written down",
  "Standard tooling, not partner-only tooling",
  "Employee records in transferable systems",
  "Vendor records and contracts catalogued",
  "Controls with named owners and evidence",
  "Knowledge transfer built into the operate stage",
  "Transition governance agreed up front",
  "Clear commercial obligations for transfer",
];

const transferConditions = [
  { num: "01", text: "Documented processes", icon: FileText },
  { num: "02", text: "Defined ownership for every function", icon: UserCheck },
  { num: "03", text: "Service levels written down", icon: Shield },
  { num: "04", text: "Standard tooling, not partner-only tooling", icon: Wrench },
  { num: "05", text: "Employee records in transferable systems", icon: Database },
  { num: "06", text: "Vendor records and contracts catalogued", icon: FileCheck },
  { num: "07", text: "Controls with named owners and evidence", icon: ShieldCheck },
  { num: "08", text: "Knowledge transfer built into the operate stage", icon: GraduationCap },
  { num: "09", text: "Transition governance agreed up front", icon: Users },
  { num: "10", text: "Clear commercial obligations for transfer", icon: Handshake },
];

const aiUseCases = [
  { title: "Recruitment screening", desc: "NeoHireX can screen, rank and run AI-led first-round evaluation before recruiters and hiring managers decide.", icon: UserCheck },
  { title: "Candidate evaluation", desc: "Structured, role-specific assessments can be generated and scored with recruiter review.", icon: ClipboardCheck },
  { title: "Onboarding assistance", desc: "A joiner assistant can answer first-week questions and track onboarding steps.", icon: Briefcase },
  { title: "HR knowledge assistant", desc: "Employees can ask policy and process questions and get answers grounded in the local policy set.", icon: Sparkles },
  { title: "Policy search", desc: "Search across global and local policies with citations, so exceptions are visible.", icon: FileSearch },
  { title: "IT ticket triage", desc: "Tickets can be classified, routed and enriched before a person picks them up.", icon: Headphones },
  { title: "Knowledge management", desc: "Runbooks and decisions can be captured and kept current as the center changes.", icon: BookOpen },
  { title: "Service desk copilots", desc: "Agents can draft responses and suggest resolutions inside the existing ITSM tool.", icon: MessageSquare },
  { title: "Operational reporting", desc: "Monthly and quarterly operating packs can be assembled from source systems with review.", icon: LineChart },
  { title: "Workforce analytics", desc: "Hiring, attrition and capacity signals can be modelled to inform the workforce plan.", icon: TrendingUp },
  { title: "Anomaly detection", desc: "Payroll, access and vendor data can be checked for exceptions before they become findings.", icon: ScanEye },
  { title: "Vendor workflow automation", desc: "Onboarding, renewals and reviews can be routed and tracked automatically.", icon: InfinityIcon },
  { title: "Document processing", desc: "Employment, vendor and compliance documents can be extracted and filed with validation.", icon: FileText },
  { title: "Compliance evidence support", desc: "Evidence can be collected and organized against the control framework as work happens.", icon: ShieldCheck },
];

const whoFor = [
  { title: "New GCC", desc: "Needs an operating partner after launch so the first cohort is supported while leadership focuses on the mandate." },
  { title: "AI Micro GCC", desc: "Needs a lightweight operating layer around the initial team without adopting the overhead of a large center." },
  { title: "Scaling GCC", desc: "Needs stronger people, IT, KPI and governance processes before the next mandate arrives." },
  { title: "Existing GCC", desc: "Needs operating model redesign, automation, maturity improvement or Build-Operate-Transfer support." },
];

const ARCHETYPES = [
  { ...whoFor[0], icon: FileText, isTall: true },
  { ...whoFor[1], icon: Bot, isTall: false },
  { ...whoFor[2], icon: TrendingUp, isTall: false },
  { ...whoFor[3], icon: RefreshCw, isTall: true },
];

export default function GccOperations() {
  const [hoveredArchetype, setHoveredArchetype] = useState<number | null>(null);

  return (
    <GccOperationsLayout
      page={page}
      eyebrow="GCC Operations · India"
      heroDescription="NeoIntelli provides the operating layer around your India capability center - people operations, workforce strategy, workplace and IT, service management, governance and transition support - while your leadership retains control of the mandate, product, IP and business decisions."
      secondaryCta={{ label: "See the Operating Model", href: "#operating-model" }}
      contextualLink={{ label: "Still setting up your GCC? Explore GCC Setup & Launch →", href: PILLAR_LINKS.gccSetupLaunch }}
      trustStrip={[
        "Senior-led operations",
        "Transparent operating model",
        "Managed → BOT → Captive path",
        "AI/Data-ready talent engine",
        "Bengaluru operating capability",
        "NeoHireX-enabled hiring",
      ]}
      cta={{
        title: "Discuss how the operating layer would work around your center.",
        description: "A 30-minute conversation with a senior NeoIntelli lead about your GCC's stage, entity status and which functions you want operated versus retained.",
        secondary: { label: "Explore GCC Setup & Launch", href: PILLAR_LINKS.gccSetupLaunch },
      }}
    >
      <OpsSection
        id="positioning"
        width="wide"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch overflow-hidden">
          {/* LEFT: Editorial Content & 3 Feature Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#008EC4] mb-2.5 sm:mb-3">
              OPERATING LAYER
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              One center.<br />
              One operating layer<span className="text-[#008EC4]">.</span>
            </h2>

            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              NeoIntelli operates the local systems around your GCC so your leadership can focus on capability, product and business outcomes. From people operations and workforce planning to workplace, IT, service management, governance and BOT transition, we provide one accountable India operating layer around the center.
            </p>

            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              You retain strategic control. NeoIntelli operates the local scaffolding.
            </p>

            <p className="text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed">
              The main buyer problem is not how to outsource operations. It is how to operate an India GCC without rebuilding every local support function from zero, and later, how to transfer more operating ownership into your own organization when you are ready.
            </p>
          </motion.div>

          {/* RIGHT: In Brief Dark Card matching all other GCC Operations inner pages */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col h-full"
          >
            <InBriefCard
              imageSrc="/images/gcc-operations/gcc-in-brief-overview.jpg"
              imageAlt="GCC Operations &amp; Managed Services Overview"
            >
              GCC Operations &amp; Managed Services is NeoIntelli&apos;s operating layer for companies that run a Global Capability Center in India and do not want to build every local support function themselves. It serves new centers, AI Micro GCCs, scaling centers and existing GCCs professionalizing their operations. It covers people and HR operations, workforce strategy, workplace and IT, service management and performance, governance and compliance coordination, and Build-Operate-Transfer. NeoIntelli operates the agreed functions under a documented responsibility matrix, measures the center on outcomes, and designs every process to transfer to the client when the client is ready.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      <OpsSection
        id="what-are-gcc-managed-services"
        eyebrow="CORE ARCHITECTURE"
        title="What are GCC managed services?"
        align="center"
        width="wide"
      >
        <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
          <p className="drop-cap-amber">
            GCC managed services provide the local operating systems required to run a Global Capability Center without requiring the parent company to build every support function internally on day one. Depending on the model, this can include people operations, workplace and IT support, workforce planning, service management, governance, compliance coordination and transition support, while the client retains strategic ownership of the center.
          </p>
          <p>
            This is different from outsourcing. In an outsourcing contract the vendor owns the team and the delivery. In a managed GCC the client owns the team, the intellectual property, the roadmap and the data. The partner runs the scaffolding: the hiring engine, the HR administration, the devices and access, the service desk, the operating reviews, the vendor relationships and the compliance workflows.
          </p>
          <p>
            One accountable operating layer means one responsibility matrix instead of five vendor contracts, one operating cadence instead of separate reviews for HR, IT and facilities, one reporting line to headquarters, and one set of processes documented well enough to hand over.
          </p>
        </SmoothLineReveal>
      </OpsSection>

      <OpsSection
        id="setup-vs-operations"
        eyebrow="LIFECYCLE PARADIGM"
        title="GCC setup vs GCC operations: what's the difference?"
        intro="GCC setup gets the center ready to operate. GCC operations keeps the center functioning and improving after launch. The first is a project with an end date. The second is the operating model the center runs on for as long as it exists."
        align="center"
        width="wide"
      >
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Desktop Center Transition Circle Arrow - centered on the bottom image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, x: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex absolute left-1/2 bottom-20 sm:bottom-24 z-30 w-11 h-11 rounded-full bg-white text-[#0D244D] shadow-xl items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-300"
          >
            <ArrowRight className="w-4 h-4 text-[#008EC4]" />
          </motion.div>

          <div className="grid lg:grid-cols-2 items-stretch">
            {/* 1. Before launch (White Panel - slides in from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white flex flex-col overflow-hidden h-full"
            >
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                {/* Header */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-1.5">
                  Before launch
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#0D244D] tracking-tight leading-[1.2] mb-1">
                  GCC setup
                </h3>
                {/* Amber Underline matching home page */}
                <div className="w-8 h-[3px] bg-[#DE8017] rounded-full mb-3" />
                <p className="text-[#505D74] text-xs sm:text-sm mb-4 leading-relaxed">Gets the center ready to operate.</p>

                {/* 3-column arrow bullet grid */}
                <ul className="grid grid-cols-3 gap-x-2 gap-y-1.5 mb-5">
                  {["Business case", "Entity", "Location", "Operating model", "Initial hiring", "Infrastructure", "Launch readiness"].map((item) => (
                    <li key={item} className="flex items-start gap-1">
                      <ArrowRight className="w-2.5 h-2.5 text-[#0D306C] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-[10.5px] sm:text-xs text-[#2B3D66] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Home-page style CTA button */}
                <div className="mt-auto">
                  <Link
                    to={PILLAR_LINKS.gccSetupLaunch}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D244D] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#008EC4] transition-all duration-200 shadow-sm hover:-translate-y-0.5 group/btn"
                  >
                    <span>Explore GCC Setup &amp; Launch</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0 bg-[#081B3E]">
                <Image
                  src="/images/gcc-operations/gcc-setup-card.jpg"
                  alt="GCC Setup & Launch Phase Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="border-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Mobile Connecting Arrow between panels */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex lg:hidden justify-center items-center -my-4 z-30 relative"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#0D244D] shadow-lg flex items-center justify-center pointer-events-none">
                <ArrowDown className="w-4 h-4 text-[#008EC4]" />
              </div>
            </motion.div>

            {/* 2. After launch (Navy Blue Panel - slides in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#061530] text-white flex flex-col overflow-hidden h-full"
            >
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                {/* Header */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-1.5">
                  After launch
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-[1.2] mb-1">
                  GCC operations
                </h3>
                {/* Amber Underline matching home page */}
                <div className="w-8 h-[3px] bg-[#DE8017] rounded-full mb-3" />
                <p className="text-[#C5D7F0] text-xs sm:text-sm mb-4 leading-relaxed">Keeps the center functioning and improving.</p>

                {/* 3-column arrow bullet grid */}
                <ul className="grid grid-cols-3 gap-x-2 gap-y-1.5 mb-5">
                  {["People", "Workplace", "IT", "Performance", "Governance", "Risk", "Vendors", "Scale", "Transition"].map((item) => (
                    <li key={item} className="flex items-start gap-1">
                      <ArrowRight className="w-2.5 h-2.5 text-[#38BDF8] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-[10.5px] sm:text-xs text-white/85 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Home-page style CTA button */}
                <div className="mt-auto">
                  <a
                    href="#operating-model"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#0D244D] text-[11px] sm:text-xs font-semibold hover:bg-[#38BDF8] hover:text-white transition-all duration-200 shadow-sm hover:-translate-y-0.5 group/btn"
                  >
                    <span>See the 7 operating functions</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Bottom Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0 bg-[#061530]">
                <Image
                  src="/images/gcc-operations/gcc-ops-card.jpg"
                  alt="GCC Live Operations Command Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="border-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </OpsSection>

      {/* ========================================================================= */}
      {/* WHY THE OPERATING LAYER MATTERS (Navy Blue with Organic Wave Divider)     */}
      {/* ========================================================================= */}
      <OpsSection
        id="why-the-operating-layer-matters"
        theme="navy"
        wavesOnMobile
        eyebrow="OPERATIONAL REALITY"
        title="Building the center is only the beginning."
        intro="The launch programme ends on go-live. The operating load begins the same day, and it grows with every hire, every new system and every new mandate. Most of it is invisible to headquarters until something breaks."
        align="center"
        width="wide"
      >
        <OperatingRealitySection />
      </OpsSection>

      <OpsSection
        id="operating-model"
        eyebrow="THE OPERATING MODEL"
        title="One operating model around the center."
        intro="Seven operating functions, run as one accountable layer. Each has its own page with scope, responsibilities, buyer questions and the point where AI can help."
        align="center"
        width="wide"
      >
        <OperatingLayerGrid />
      </OpsSection>

      <OpsSection
        id="architecture"
        eyebrow="ARCHITECTURE BLUEPRINT"
        title="Where the operating layer sits."
        intro="Strategy and control stay at headquarters. The center's leadership runs the mandate. NeoIntelli operates the layer between leadership and the teams so the teams can do the work the center exists for."
        align="center"
        width="wide"
        theme="navy"
        wavesOnMobile
      >
        <OperatingArchitecture />
      </OpsSection>

      {/* ========================================================================= */}
      {/* WHAT WE OPERATE & CONTROL (Operating Boundaries Diagram)                 */}
      {/* ========================================================================= */}
      <OpsSection
        id="what-we-operate"
        eyebrow="OPERATING BOUNDARIES"
        title={
          <>
            What NeoIntelli operates and what you control<span className="text-[#008EC4]">.</span>
          </>
        }
        intro="The split is explicit, written down, and agreed before the first function is handed over. NeoIntelli does not take ownership of the roadmap, the IP, the data, the architecture, the hiring decisions or the executive governance unless an engagement explicitly agrees it."
        align="center"
        width="wide"
      >
        <OperatingBoundariesDiagram />
        <h3 className="text-[#0D244D] font-extrabold text-xl md:text-2xl mt-8 sm:mt-9 mb-3.5 text-center">Responsibility matrix</h3>
        <ResponsibilityMatrix />
      </OpsSection>

      <OpsSection
        id="operating-modes"
        eyebrow="ENGAGEMENT MODES"
        title={
          <>
            Start with the operating model that fits today
            <span className="text-[#169DC8]">.</span>
          </>
        }
        intro="The right mode depends on entity status, how much local operating capacity you already have, and whether you intend to run the center yourself eventually. You can change mode without rebuilding the center."
        align="center"
        width="wide"
      >
        <ManagedModelComparison />
      </OpsSection>

      <OpsSection
        id="managed-bot-captive"
        theme="navy"
        wavesOnMobile
        eyebrow="BOT TRANSITION"
        title={
          <>
            Designed to transfer, if and when you want it
            <span className="text-[#38BDF8]">.</span>
          </>
        }
        intro="The objective is not permanent dependency unless you want managed operations long term. Systems, documentation, ownership and records are designed to be transferable from the beginning."
        align="center"
        width="wide"
      >
        <div className="-mt-4 sm:-mt-6">
          <BotJourney theme="navy" />
        </div>
        <div className="mt-12 sm:mt-16 grid gap-10 lg:gap-14 lg:grid-cols-12 items-stretch text-left">
          {/* LEFT COLUMN: Operating Model editorial context, quote callout, link, and bottom Guide Card aligned to right points */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2 block">
                  OPERATING MODEL
                </span>
                <div className="w-10 h-[3px] bg-[#DE8017] rounded-full mb-4" />
                <p className="text-[#C5D7F0] text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
                  The objective is not permanent dependency unless you want managed operations long term. Some clients keep the operating layer with NeoIntelli for years because it lets their leadership stay on the mandate. Others plan from the first month to take it over.
                </p>
                <p className="text-[#C5D7F0] text-sm sm:text-base lg:text-lg leading-relaxed">
                  For BOT clients, the systems are designed to be transferable from the beginning. Documentation, ownership, tooling and records are built for a handover that may be two years away, not retrofitted the quarter before it.
                </p>
              </div>

              {/* Quote Callout with Cyan Vertical Bar */}
              <div className="border-l-[3.5px] border-[#00A3E0] pl-4 sm:pl-5 py-1 my-3 sm:my-4">
                <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">
                  If the operating model cannot transfer,<br />
                  it is not truly BOT-ready.
                </h3>
              </div>

              <p className="text-[#C5D7F0] text-sm sm:text-base lg:text-lg leading-relaxed">
                NeoIntelli does not hide essential operating knowledge inside NeoIntelli-only processes. Everything the center depends on is designed around the ten conditions on the right.
              </p>

              <div className="pt-1">
                <Link
                  to={`${GCC_OPERATIONS_BASE}/bot-transition`}
                  className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-4 decoration-[#38BDF8]/40 transition-colors inline-flex items-center gap-1.5 text-sm sm:text-[15px]"
                >
                  <span>How Build-Operate-Transfer works in practice</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Bottom Guide Card - Substantial height filling space upward towards the link */}
            <div className="mt-auto pt-6 sm:pt-8">
              <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0B214C]/95 via-[#0A1D42]/85 to-[#071633]/95 p-6 sm:p-7 md:p-8 min-h-[170px] sm:min-h-[195px] shadow-[0_12px_36px_rgba(0,0,0,0.35)] relative overflow-visible flex items-center justify-between group hover:border-[#38BDF8]/40 transition-all duration-300">
                {/* Left: Icon + Text */}
                <div className="flex items-center gap-4 sm:gap-5 z-20 relative max-w-[58%] sm:max-w-[62%]">
      
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8] block mb-1">
                      GUIDE
                    </span>
                    <h4 className="text-white font-extrabold text-lg sm:text-xl leading-snug">
                      Build-Operate-Transfer in practice
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#C5D7F0] mt-1.5 leading-relaxed hidden sm:block">
                      Handover blueprint, documentation architecture, and governance criteria.
                    </p>
                    <Link
                      to={`${GCC_OPERATIONS_BASE}/bot-transition`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors mt-2.5 group/link"
                    >
                      <span>Read the guide</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Right: Breakout 3D Glass Stack Graphic starting from the bottom of the div and extending out above top and right */}
                <div className="absolute bottom-0 -right-2 sm:-right-4 -top-8 sm:-top-10 w-[195px] sm:w-[230px] flex items-end justify-end pointer-events-none select-none z-10 overflow-visible">
                  {/* Ambient glow */}
                  <div className="absolute right-4 bottom-2 w-32 h-24 bg-[#38BDF8]/25 rounded-full blur-xl pointer-events-none" />
                  <svg
                    viewBox="0 0 240 180"
                    fill="none"
                    className="w-full h-full object-contain object-bottom-right overflow-visible pointer-events-none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="topCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#0284C7" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0369A1" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="stackCardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0B2A59" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#081E40" stopOpacity="0.95" />
                      </linearGradient>
                      <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#38BDF8" floodOpacity="0.75" />
                      </filter>
                    </defs>

                    {/* Stack Base Layer 4: RECORDS */}
                    <g transform="translate(50, 132)">
                      <polygon points="0,22 110,22 150,0 40,0" fill="url(#stackCardGrad)" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1.2" />
                      <rect x="0" y="22" width="110" height="9" rx="2" fill="#05152E" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="0.8" />
                      <text x="24" y="16" fill="#7DD3FC" fontSize="8.5" fontWeight="bold" letterSpacing="0.12em">RECORDS</text>
                    </g>

                    {/* Stack Base Layer 3: TOOLS */}
                    <g transform="translate(50, 117)">
                      <polygon points="0,22 110,22 150,0 40,0" fill="url(#stackCardGrad)" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.2" />
                      <rect x="0" y="22" width="110" height="9" rx="2" fill="#05152E" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="0.8" />
                      <text x="24" y="16" fill="#7DD3FC" fontSize="8.5" fontWeight="bold" letterSpacing="0.12em">TOOLS</text>
                    </g>

                    {/* Stack Base Layer 2: OWNERSHIP */}
                    <g transform="translate(50, 102)">
                      <polygon points="0,22 110,22 150,0 40,0" fill="url(#stackCardGrad)" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="1.2" />
                      <rect x="0" y="22" width="110" height="9" rx="2" fill="#05152E" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="0.8" />
                      <text x="24" y="16" fill="#93C5FD" fontSize="8.5" fontWeight="bold" letterSpacing="0.12em">OWNERSHIP</text>
                    </g>

                    {/* Stack Base Layer 1: PROCESSES */}
                    <g transform="translate(50, 87)">
                      <polygon points="0,22 110,22 150,0 40,0" fill="url(#stackCardGrad)" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="1.2" />
                      <rect x="0" y="22" width="110" height="9" rx="2" fill="#05152E" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="0.8" />
                      <text x="24" y="16" fill="#BAE6FD" fontSize="8.5" fontWeight="bold" letterSpacing="0.12em">PROCESSES</text>
                    </g>

                    {/* Top Angled Glass Plate: Breaks out above top edge of card */}
                    <g filter="url(#cyanGlow)">
                      <polygon
                        points="75,8 215,28 185,98 45,78"
                        fill="url(#topCardGrad)"
                        stroke="#38BDF8"
                        strokeWidth="1.8"
                        strokeOpacity="0.95"
                      />
                      <line x1="85" y1="15" x2="205" y2="32" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.4" />

                      <g transform="translate(75, 40) rotate(8)">
                        <text x="0" y="0" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.08em">DOCUMENT.</text>
                        <text x="0" y="13" fill="#BAE6FD" fontSize="9.5" fontWeight="900" letterSpacing="0.08em">OPERATE.</text>
                        <text x="0" y="26" fill="#7DD3FC" fontSize="9.5" fontWeight="900" letterSpacing="0.08em">TRANSFER.</text>
                      </g>
                      <text x="188" y="54" fill="#38BDF8" fontSize="15" fontWeight="extrabold">&gt;</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 10 Transferability Condition Rows */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2 sm:space-y-2.5">
            {transferConditions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="group flex items-center gap-3.5 sm:gap-4 pb-2.5 sm:pb-3 border-b border-white/15 hover:border-[#38BDF8]/60 transition-colors duration-200"
                >
                  {/* 1. Number styled like Operational Reality section */}
                  <span
                    className="text-2xl sm:text-3xl lg:text-[32px] font-mono font-bold text-transparent tracking-tighter shrink-0 leading-none select-none transition-transform group-hover:scale-105 duration-300 min-w-[34px] sm:min-w-[40px]"
                    style={{
                      WebkitTextStroke: "1.5px #38BDF8",
                    }}
                  >
                    {item.num}
                  </span>

                  {/* 2. Icon without background */}
                  <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#38BDF8] shrink-0 stroke-[1.8] group-hover:scale-110 transition-transform duration-200" />

                  {/* 3. Point Description */}
                  <span className="text-white text-xs sm:text-[13.5px] md:text-sm font-semibold tracking-tight leading-snug group-hover:text-[#38BDF8] transition-colors duration-200">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </OpsSection>

      <OpsSection
        id="ai-enabled-operations"
        eyebrow="AI ACCELERATION"
        title={
          <>
            Where AI can improve GCC operations
            <span className="text-[#169DC8]">.</span>
          </>
        }
        intro="NeoIntelli is an AI company that also runs operating layers. The operating functions around a GCC are full of repetitive, document-heavy and knowledge-intensive work, which is exactly where AI earns its place. Where a capability below is not an existing platform, NeoIntelli can design and implement it through its AI Engineering practice."
        align="center"
        width="wide"
      >
        <CapabilityGrid
          variant="ai"
          items={aiUseCases}
          bottomPanels={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
              {/* Left: NeoHireX inside the hiring engine (Dark Navy Gradient) */}
              <div className="relative overflow-hidden rounded-2xl border border-[#00A3E0]/30 bg-gradient-to-br from-[#061838] via-[#0A2250] to-[#04122C] p-5 sm:p-6 shadow-[0_12px_32px_rgba(6,24,56,0.3)] flex flex-col justify-between group transition-all text-left">
                {/* Subtle glow circle */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 w-56 h-56 bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-white font-extrabold text-base sm:text-lg lg:text-[20px] mb-1.5 leading-snug">
                      <span className="underline decoration-[#F19326] decoration-[3px] underline-offset-[6px]">Neo</span>HireX inside the hiring engine
                    </h3>

                    <p className="text-[#C5D7F0] text-xs sm:text-[12.5px] leading-relaxed mb-4 max-w-[520px]">
                      Recruitment operations can be supported by NeoHireX, NeoIntelli&apos;s Hiring OS for candidate screening, ranking, AI-led first-round evaluation and recruitment workflow management. NeoHireX does not make final hiring decisions. Your hiring managers do.
                    </p>
                  </div>

                  <div>
                    <Link
                      to={PILLAR_LINKS.aiTalent}
                      className="btn-white whitespace-nowrap"
                    >
                      <span>See AI Talent for recruitment execution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Autonomy only where controls justify it (Clean Light Card) */}
              <div className="relative overflow-hidden rounded-2xl border border-[#DCE8F4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(13,48,108,0.04)] hover:shadow-[0_10px_25px_rgba(13,48,108,0.08)] flex flex-col justify-between group transition-all text-left">
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-[#0D244D] font-extrabold text-base sm:text-lg lg:text-[19px] xl:text-[20px] mb-1.5 leading-snug lg:whitespace-nowrap">
                      <span className="underline decoration-[#F19326] decoration-[3px] underline-offset-[6px]">Aut</span>onomy only where controls justify it
                    </h3>

                    <p className="text-[#505D74] text-xs sm:text-[12.5px] leading-relaxed mb-4 max-w-[520px]">
                      The progression is eliminate, standardize, automate, assist, then agent-enable. Copilots and assistants come before agents, and agents are introduced only for workflows where the controls, the data and the fallback are in place.
                    </p>
                  </div>

                  <div>
                    <Link
                      to={PILLAR_LINKS.aiEngineering}
                      className="btn-gradient whitespace-nowrap"
                    >
                      <span>See AI Engineering for implementation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </OpsSection>

      <OpsSection
        id="performance"
        eyebrow="OUTCOME FRAMEWORK"
        title="Measure the GCC by outcomes, not headcount."
        intro="Headcount, utilization and hours worked are inputs. The center should be judged on what it delivers, how reliably, at what quality and cost, and whether headquarters trusts it with more."
        align="center"
        width="wide"
      >
        <GccPerformanceFramework />
        <p className="mt-8 text-center text-sm">
          <Link to={`${GCC_OPERATIONS_BASE}/service-management-performance`} className={link}>How service management and performance reporting work →</Link>
        </p>
      </OpsSection>

      <OpsSection
        id="who-this-is-for"
        eyebrow="CENTER ARCHETYPES"
        title="Built for centers at four different starting points."
        intro="Whether launching an initial cohort, structuring a micro GCC, scaling an active site, or executing a BOT transfer."
        align="center"
        width="wide"
      >
        {/* 4 Archetypes Cards: Layout matching uploaded image (Card 1 & 4 tall, Cards 2 & 3 short, bottom aligned) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-5 lg:gap-6 pt-4 sm:pt-6 overflow-hidden py-2">
          {ARCHETYPES.map((arch, idx) => {
            const Icon = arch.icon;
            const isHovered = hoveredArchetype === idx;

            // Directional entrance: Card 0 from left, Card 3 from right, Cards 1 & 2 from down
            const initialMotion =
              idx === 0
                ? { opacity: 0, x: -80, y: 0 }
                : idx === 3
                ? { opacity: 0, x: 80, y: 0 }
                : { opacity: 0, x: 0, y: 55 };

            return (
              <motion.div
                key={arch.title}
                initial={initialMotion}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: idx === 1 || idx === 2 ? 0.15 : 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredArchetype(idx)}
                onMouseLeave={() => setHoveredArchetype(null)}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 flex flex-col justify-center items-center text-center group cursor-pointer ${
                  arch.isTall
                    ? "sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[400px] lg:min-h-[420px]"
                    : "sm:p-7 min-h-[250px] sm:min-h-[260px]"
                } ${
                  isHovered
                    ? "border border-[#16427D]/60 -translate-y-1"
                    : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 hover:-translate-y-1 hover:border-[#16427D]/60"
                }`}
              >
                {/* Subtle background circles default state */}
                <div
                  className={`absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
                  }`}
                />
                <div
                  className={`absolute -bottom-14 -left-14 w-52 h-52 rounded-full pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "border border-[#0D306C]/5 opacity-100 group-hover:opacity-0"
                  }`}
                />

                {/* Hover Navy Blue Overlay ("the first look") */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] transition-opacity duration-300 pointer-events-none z-0 ${
                    isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full border border-white/5 pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      arch.isTall ? "mb-6 sm:mb-8" : "mb-4 sm:mb-5"
                    } ${
                      isHovered
                        ? "bg-white text-[#008EC4] border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] scale-105"
                        : "bg-[#EDF3FB] border border-[#C5D7EE] text-[#008EC4] shadow-xs group-hover:bg-white group-hover:text-[#008EC4] group-hover:border-white group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-[#008EC4] stroke-[2.2] transition-colors duration-300" />
                  </div>
                  <h3
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`font-bold tracking-tight mb-2 sm:mb-3 transition-colors duration-300 ${
                      arch.isTall ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                    } ${isHovered ? "!text-white" : "text-[#0D306C] group-hover:!text-white"}`}
                  >
                    {arch.title}
                  </h3>
                  <p
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`leading-relaxed font-normal transition-colors duration-300 ${
                      arch.isTall ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                    } ${isHovered ? "!text-white" : "text-[#505D74] group-hover:!text-white"}`}
                  >
                    {arch.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Starting Smaller text without background or enclosing div */}
        <p className="mt-10 sm:mt-12 text-center text-sm sm:text-base lg:text-lg text-[#505D74] max-w-3xl mx-auto leading-relaxed">
          <span className="text-[#0D306C] font-bold">Starting smaller?</span> Explore the{" "}
          <Link to={PILLAR_LINKS.microGcc} className={link}>AI Micro GCC model</Link>{" "}
          for building an initial India capability without adopting the overhead of a large traditional GCC from day one. The Micro GCC can begin with a lightweight managed operating layer and grow into the full model described here.
        </p>
      </OpsSection>

      <OpsSection
        id="transparent-economics"
        width="wide"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          {/* Left Column: Content, Buttons, Feature Pillars */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-7 sm:space-y-8">
            <SectionHeader
              eyebrow="COMMERCIAL TRANSPARENCY"
              title={
                <>
                  Transparent operating economics<span className="text-[#008EC4]">.</span>
                </>
              }
              description="NeoIntelli separates people cost, operating services and project-specific infrastructure so clients can understand what they are paying for as the GCC scales. Operating reports show the same split, so the cost conversation with headquarters is about what the center delivers, not about untangling a blended fee."
              align="left"
              variant="cyan"
              className="mb-0 max-w-none text-left"
            />

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <Link
                to={PILLAR_LINKS.costCalculator}
                className="btn-navy group shrink-0"
              >
                <span>Estimate the operating cost of an India GCC</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to={PILLAR_LINKS.costGuide}
                className="inline-flex items-center gap-2.5 text-[#0D306C] hover:text-[#008EC4] font-semibold text-sm sm:text-[15px] transition-colors group shrink-0"
              >
                <BookOpen className="w-5 h-5 text-[#008EC4] shrink-0" />
                <span className="underline underline-offset-4 decoration-[#0D306C]/40 group-hover:decoration-[#008EC4]">
                  Read the GCC Cost Guide
                </span>
                <ArrowRight className="w-4 h-4 text-[#0D306C] group-hover:text-[#008EC4] transition-all group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            {/* 3 Metrics / Feature Pillars */}
            <div className="grid grid-cols-3 divide-x divide-[#0D306C]/15 pt-6 sm:pt-8 border-t border-[#0D306C]/10 max-w-xl">
              <div className="pr-4 sm:pr-6">
                <div className="w-11 h-11 rounded-2xl bg-[#E1EEFA] text-[#008EC4] flex items-center justify-center mb-3 shadow-xs">
                  <IndianRupee className="w-5 h-5 stroke-[2]" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#0D244D] leading-snug">
                  Clear cost<br />breakdown
                </p>
              </div>

              <div className="px-4 sm:px-6">
                <div className="w-11 h-11 rounded-2xl bg-[#E1EEFA] text-[#008EC4] flex items-center justify-center mb-3 shadow-xs">
                  <FileText className="w-5 h-5 stroke-[2]" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#0D244D] leading-snug">
                  Aligned<br />reporting
                </p>
              </div>

              <div className="pl-4 sm:pr-2">
                <div className="w-11 h-11 rounded-2xl bg-[#E1EEFA] text-[#008EC4] flex items-center justify-center mb-3 shadow-xs">
                  <BarChart3 className="w-5 h-5 stroke-[2]" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#0D244D] leading-snug">
                  Better decisions<br />as you scale
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Stack Graphic - truly transparent background PNG */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <img
                src="/images/gcc-operations/commercial-transparency-stack-transparent.png"
                alt="Commercial transparency: separated people cost, operating services, and project infrastructure"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md"
                width={499}
                height={499}
              />
            </div>
          </div>
        </div>
      </OpsSection>

      <AnswerList
        id="buyer-questions"
        eyebrow="COMMON INQUIRIES & ANSWERS"
        title={
          <>
            Frequently Asked Questions
            <span className="text-[#169DC8]">.</span>
          </>
        }
        intro="Clear answers to the key operational, legal, and strategic questions enterprise leaders ask about GCC operations and managed services."
        items={faqs}
      />
    </GccOperationsLayout>
  );
}
