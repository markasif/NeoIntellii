"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  FileCheck,
  Layers,
  MapPin,
  Users,
  TrendingUp,
  ShieldAlert,
  Award,
  Calculator,
  Coins,
  Building2,
  CreditCard,
  Landmark,
  Building,
  Cpu,
  Activity,
  Sliders,
  BarChart3,
  Sparkles,
  ShieldCheck,
  ArrowRightLeft,
  UserCheck,
  RefreshCw,
  Server,
  Database,
  Clock,
  HeartHandshake,
  Compass,
  type LucideIcon,
} from "lucide-react";
import {
  GccStrategyHero,
  GccStrategySubnav,
  GccStrategyPageLayout,
  ResponsiveMatrix,
  GccDecisionFramework,
  RelatedGccServices,
  GccStrategyCTA,
  AnswerList,
} from "@/components/gcc-strategy";
import InBrief from "@/components/ai-gcc/InBrief";
import SmoothLineReveal from "@/components/gcc-operations/SmoothLineReveal";
import Section from "@/components/ai-gcc/Section";
import AmberChecklist from "@/components/shared/AmberChecklist";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import CapabilityGrid from "@/components/ai-gcc/CapabilityGrid";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import { gccStrategyFaqs } from "@/data/gccStrategyFaqs";
import { bookACallUrl } from "@/lib/constants";
import {
  GCC_STRATEGY_ROUTES as R,
  GCC_STRATEGY_PILLAR_LABEL,
  GCC_OPERATIONS_LINKS,
  AI_PILLAR_LINKS,
  GCC_TOOL_LINKS,
  blueprintRequestUrl,
  type GccLeadContext,
} from "@/lib/gccStrategyRoutes";

const leadContext: GccLeadContext = {
  source_page: R.strategy,
  service_interest: "GCC Business Case",
  cta_name: "Build My GCC Business Case",
};

const mandateQuestions = [
  "What capability should India own?",
  "What should remain at headquarters?",
  "Which decisions can move to India?",
  "Which workflows are strategic, and which are transactional?",
  "Which IP or knowledge should stay inside the enterprise?",
  "Which business outcomes justify the center?",
  "What does success look like in year 1, year 2 and year 3?",
];

const businessCaseComponents: Array<{ title: string; desc: string; icon: LucideIcon }> = [
  { title: "Strategic rationale", desc: "Why this capability, why owned, why India, why now.", icon: Target },
  { title: "Mandate", desc: "Functions, decisions and outcomes the center owns, and the boundary with headquarters.", icon: FileCheck },
  { title: "Baseline cost", desc: "What the same work costs today, wherever and however it is done.", icon: Calculator },
  { title: "Target cost", desc: "Fully loaded run-rate at steady state for the designed center.", icon: Coins },
  { title: "One-time setup investment", desc: "Entity, workplace, IT, recruitment, program and transition costs before steady state.", icon: Building2 },
  { title: "Operating cost", desc: "Year-by-year run cost including leadership, operating support and compliance.", icon: CreditCard },
  { title: "Policy & incentive eligibility", desc: "Applicable central and state support is assessed after the mandate, entity model and location shortlist are clear. Only validated benefits enter the financial model, and they are shown separately from the base case.", icon: Landmark },
  { title: "Leadership", desc: "The leadership spine, its cost and how early it is needed.", icon: Users },
  { title: "Talent ramp", desc: "Hiring pace by role, seniority mix and the effect of notice periods.", icon: TrendingUp },
  { title: "Workspace", desc: "Office strategy and its cost path from managed space to a longer commitment.", icon: Building },
  { title: "Technology", desc: "Identity, devices, connectivity, platforms and any project-specific infrastructure.", icon: Cpu },
  { title: "Risk", desc: "The risk register, with owners and mitigations that carry a cost.", icon: ShieldAlert },
  { title: "Productivity assumptions", desc: "Ramp curves and the point at which the center is at full productivity.", icon: Activity },
  { title: "Scenario modelling", desc: "Smaller, base and larger mandates; captive and partner-operated variants, run as a base case, a validated-incentive case and a downside case.", icon: Sliders },
  { title: "Sensitivity analysis", desc: "How the case moves with hiring pace, attrition, compensation and scope.", icon: BarChart3 },
  { title: "Capability value", desc: "What owning the capability is worth beyond the cost line.", icon: Sparkles },
  { title: "Ownership value", desc: "IP, knowledge retention and execution speed that a vendor contract does not deliver.", icon: ShieldCheck },
  { title: "Transition cost", desc: "Where work moves from a vendor or another location, the cost and the dip during transition.", icon: ArrowRightLeft },
];

const costCategories: Array<{ title: string; desc: string; icon: LucideIcon; image: string }> = [
  { title: "Salary", desc: "Base compensation by role and seniority in the chosen city.", icon: Coins, image: "/images/gcc-operations/operating-reality/02-payroll.webp" },
  { title: "Benefits", desc: "Statutory and voluntary benefits, insurance and allowances.", icon: ShieldCheck, image: "/images/gcc-operations/operating-reality/01-employees.webp" },
  { title: "Recruitment", desc: "Search, sourcing, technical validation and offer management for each hire.", icon: Users, image: "/images/gcc-operations/operating-reality/04-access.webp" },
  { title: "HR", desc: "People operations, policies, engagement and performance processes.", icon: UserCheck, image: "/images/gcc-operations/operating-reality/11-leadership.webp" },
  { title: "Entity and compliance", desc: "Registration, statutory filings, advisers and ongoing compliance operations.", icon: Landmark, image: "/images/gcc-operations/operating-reality/09-risk.webp" },
  { title: "Workspace", desc: "Managed workspace or lease, fit-out, facilities and utilities.", icon: Building, image: "/images/gcc-operations/operating-reality/05-devices.webp" },
  { title: "IT", desc: "Devices, identity, connectivity, security tooling and support.", icon: Cpu, image: "/images/gcc-operations/operating-reality/05-devices.webp" },
  { title: "Leadership", desc: "The center head and function leads, usually the largest single line early on.", icon: Award, image: "/images/gcc-operations/operating-reality/11-leadership.webp" },
  { title: "Operating support", desc: "A partner's fee for running the operating layer, where used.", icon: RefreshCw, image: "/images/gcc-operations/operating-reality/14-bot.webp" },
  { title: "Project-specific infrastructure", desc: "Cloud, GPU or compute, data and tooling tied to the mandate.", icon: Server, image: "/images/ai-mlops.webp" },
  { title: "Transition cost", desc: "Knowledge transfer, parallel running and stabilization when work moves.", icon: ArrowRightLeft, image: "/images/how_we_work/phase_03_operate.webp" },
];

const entryModelColumns = ["Captive from day one", "Assisted build-out", "Build-Operate-Transfer", "Managed GCC", "EOR-first"];

const entryModelRows = [
  { label: "Control", cells: ["Full, immediately", "Full, with partner execution", "Partner until transfer, then full", "Direction, not employment", "Direction; EOR employs"] },
  { label: "Initial complexity", cells: ["Highest", "Medium", "Low", "Low", "Lowest"] },
  { label: "Speed to first team", cells: ["Slowest", "Medium", "Fast", "Fast", "Fastest"] },
  { label: "Transfer path", cells: ["Not needed", "Operating layer moves in-house", "Contractual milestone", "By agreement", "Conversion to own entity"] },
  { label: "Local operating capability required", cells: ["High from day one", "Medium", "Low initially", "Low", "Low"] },
  { label: "Talent ownership", cells: ["Full", "Full", "Shared until transfer", "Shared", "Direction only until conversion"] },
  { label: "Cost structure", cells: ["Capex-heavy start, lowest steady state", "Setup fee plus run cost", "Partner margin until transfer", "Ongoing partner margin", "Per-employee fee"] },
  { label: "Long-term suitability", cells: ["Strong, if the enterprise can run it", "Strong", "Strong after transfer", "Depends on how much ownership is wanted", "Bridge, not a destination"] },
];

const riskRegister: Array<{ title: string; desc: string; icon: LucideIcon; image: string }> = [
  {
    title: "Talent",
    desc: "The roles the mandate needs may be scarce in the chosen city. Mitigate with role-level talent data before the city is fixed, and a hiring sequence that starts with the hardest roles.",
    icon: Users,
    image: "/images/gcc-operations/operating-reality/10-hiring.webp",
  },
  {
    title: "Leadership",
    desc: "Senior searches take longer than plans assume. Start leadership search at design lock, not after entity registration.",
    icon: Award,
    image: "/images/gcc-operations/operating-reality/11-leadership.webp",
  },
  {
    title: "Location",
    desc: "A city chosen for cost may not support the mandate's seniority. Evaluate against role mix and scale, not cost per seat.",
    icon: MapPin,
    image: "/images/gcc-operations/operating-reality/08-reporting.webp",
  },
  {
    title: "Entity",
    desc: "Entity route and timing shape when payroll and employment can go live. Coordinate advisers early and plan an employment bridge.",
    icon: Landmark,
    image: "/images/gcc-operations/operating-reality/09-risk.webp",
  },
  {
    title: "Regulatory",
    desc: "Employment, tax and data rules change and vary by state. Keep a compliance calendar and qualified advisers on the program.",
    icon: FileCheck,
    image: "/images/gcc-operations/operating-reality/03-benefits.webp",
  },
  {
    title: "Security",
    desc: "Access, device and data controls that do not match headquarters standards block work. Set the baseline before the first hire.",
    icon: ShieldAlert,
    image: "/images/gcc-operations/operating-reality/04-access.webp",
  },
  {
    title: "Data",
    desc: "Unclear data access rights stall AI and analytics mandates. Decide which data the center can use and how, in design.",
    icon: Database,
    image: "/images/gcc-operations/operating-reality/05-devices.webp",
  },
  {
    title: "Cost",
    desc: "Compensation inflation, workspace choices and hiring pace move the case. Model sensitivity, not a single number.",
    icon: Coins,
    image: "/images/gcc-operations/operating-reality/02-payroll.webp",
  },
  {
    title: "Real estate",
    desc: "Long leases signed before the operating model settles are hard to unwind. Start with managed workspace where possible.",
    icon: Building,
    image: "/images/gcc-operations/operating-reality/07-performance.webp",
  },
  {
    title: "HQ decision latency",
    desc: "Slow decisions at headquarters are the most common cause of launch drift. Agree decision rights and a decision cadence up front.",
    icon: Clock,
    image: "/images/gcc-operations/operating-reality/12-headcount.webp",
  },
  {
    title: "Vendor dependency",
    desc: "Where a partner operates the center, the exit and transfer terms decide how much you really own. Write the transfer path into the contract.",
    icon: RefreshCw,
    image: "/images/gcc-operations/operating-reality/06-vendors.webp",
  },
  {
    title: "Cultural integration",
    desc: "A center that is treated as a supplier behaves like one. Design rituals, reporting lines and career paths that integrate it.",
    icon: HeartHandshake,
    image: "/images/gcc-operations/operating-reality/01-employees.webp",
  },
  {
    title: "Mandate ambiguity",
    desc: "If India does not know what it owns, headquarters will not trust it with more. Write the mandate down and revisit it every year.",
    icon: Compass,
    image: "/images/gcc-operations/operating-reality/13-mandates.webp",
  },
  {
    title: "AI capability scarcity",
    desc: "Where the mandate includes AI, senior AI and MLOps talent is the binding constraint. Plan hiring and upskilling together.",
    icon: Cpu,
    image: "/images/ai-mlops.webp",
  },
];

const boardOutputs = [
  "Executive rationale",
  "Mandate",
  "Operating-model recommendation",
  "Location shortlist",
  "Workforce blueprint",
  "Multi-year financial model",
  "Risk register",
  "Governance model",
  "Launch roadmap",
  "Decision gates",
  "Success metrics",
  "Ownership path",
];

const strategyFlow = [
  { label: "Business goal", note: "Strategic rationale", icon: Target },
  { label: "Capability mandate", note: "Functions & decisions", href: "#mandate", icon: FileCheck },
  { label: "Ownership model", note: "Captive, BOT, managed", href: "#entry-model", icon: Layers },
  { label: "Location", note: "Talent & ecosystem", href: R.location, icon: MapPin },
  { label: "Workforce", note: "Leaders & skills first", href: `${R.setup}#leadership-talent`, icon: Users },
  { label: "Economics", note: "Multi-year financial model", href: "#business-case", icon: TrendingUp },
  { label: "Risk", note: "Owners & mitigations", href: "#risk-register", icon: ShieldAlert },
  { label: "Board decision", note: "Board-ready recommendation", href: "#board-output", icon: Award },
];

export default function StrategyBusinessCase() {
  return (
    <GccStrategyPageLayout>
      {/* 1. Hero */}
      <GccStrategyHero
        eyebrow="GCC Strategy"
        title="Build the board case before you build the center."
        description="NeoIntelli's GCC strategy and business-case work answers three questions a board will ask: should we build a GCC, what should it own, and what is the multi-year case for it. The output is a decision, not a deck."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: R.overview },
          { name: GCC_STRATEGY_PILLAR_LABEL, href: R.overview },
          { name: "Strategy & Business Case" },
        ]}
        primaryCta={{ label: "Build My GCC Business Case", href: bookACallUrl("hero") }}
        secondaryCta={{ label: "Request the GCC Blueprint", href: blueprintRequestUrl({ ...leadContext, cta_name: "Request the GCC Blueprint" }) }}
        contextualLink={{ label: "Not sure a GCC is the right model? Start with the overview", href: `${R.overview}#is-a-gcc-right` }}
        leadContext={leadContext}
      />

      {/* 2. Subnav */}
      <GccStrategySubnav />

      <main id="gcc-strategy-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          A GCC strategy defines why a Global Capability Center should exist, what capabilities it should own, how it should be structured, where it should operate and what value the parent company expects from it. A credible GCC business case connects capability ownership and workforce design to multi-year economics, risk, governance and a clear setup path before significant investment begins. NeoIntelli builds both, for companies of every size, as a board-ready recommendation.
        </InBrief>

        {/* 4. What this work is, and is not */}
        <Section
          id="what-this-is"
          eyebrow="GCC STRATEGY & BUSINESS CASE"
          title="What this work is, and is not"
          width="regular"
          align="center"
        >
          <SmoothLineReveal className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              This is the decision stage of the GCC journey. It sits before location selection and before setup, and it is where the mandate, the ownership model and the economics are settled. It is not a generic consulting engagement, not a spreadsheet exercise, not entity registration and not an operations program. Those either follow from it or belong to other NeoIntelli services.
            </p>
            <p>
              The people doing the work have designed and launched capability centers themselves. The recommendation is written to be executed by the same team, which changes what goes into it.
            </p>
          </SmoothLineReveal>
        </Section>

        {/* 5. Mandate */}
        <Section
          id="mandate"
          eyebrow="CAPABILITY MANDATE"
          title="Start with the mandate, not the headcount target."
          width="regular"
          align="center"
        >
          <div className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed space-y-4 font-normal mb-10 sm:mb-12">
            <p>
              A headcount target produces a center that is sized before it is understood. A mandate produces a center that can be sized, located, led and costed with confidence. The mandate is a short written statement of what India will own, what stays at headquarters and which decisions move.
            </p>
            <p>
              Everything downstream, from the operating model to the city to the first hires, is easier once the seven questions below have written answers. Most of the disagreements that stall a GCC later were never surfaced here.
            </p>
          </div>

          <AmberChecklist
            items={mandateQuestions}
            iconType="question"
            className="max-w-5xl mx-auto"
          />
        </Section>

        {/* 6. What goes into a GCC business case */}
        <Section
          id="business-case"
          eyebrow="BUSINESS CASE ARCHITECTURE"
          title="What goes into a GCC business case"
          lead="Savings are one line in the case, not the reason for it. A GCC that only saves money is easy to replace with a vendor that saves slightly more. A case built on capability ownership, execution speed and risk, with the economics shown honestly across scenarios, survives its first difficult board meeting."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            <CapabilityGrid
              items={businessCaseComponents}
              columns={3}
            />
            <p className="text-[#505D74] text-xs sm:text-sm mt-10 max-w-4xl mx-auto text-center leading-relaxed font-normal">
              The financial model is presented as three scenarios: a base case that assumes no government support, a validated incentive scenario shown separately, and a downside case. The case has to stand on the base scenario alone, so no advertised return depends on an incentive the company has not been confirmed eligible for. Eligibility itself is worked through in{" "}
              <Link to={R.location} className="text-[#008EC4] font-semibold underline underline-offset-2 hover:text-[#0D306C] transition-colors">
                Location Strategy
              </Link>{" "}
              and{" "}
              <Link to={R.setup} className="text-[#008EC4] font-semibold underline underline-offset-2 hover:text-[#0D306C] transition-colors">
                Setup &amp; Launch
              </Link>
              .
            </p>
          </div>
        </Section>

        {/* 7. How to model GCC cost without fooling yourself */}
        <Section
          id="cost-model"
          eyebrow="COST ARCHITECTURE"
          title="How to model GCC cost without fooling yourself"
          width="wide"
          align="center"
          headerClassName="max-w-5xl"
        >
          {/* Centered Sentence in max-w-5xl */}
          <div className="max-w-5xl mx-auto text-[#505D74] text-base sm:text-lg leading-relaxed font-normal mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <p>
              Most GCC cost surprises come from lines that were never in the model. The fully loaded cost of a center is the sum of the categories below, and each behaves differently over time: salary inflates, recruitment is front-loaded, leadership is lumpy, workspace steps up, operating support falls as ownership transfers. NeoIntelli models them separately rather than applying a universal loading percentage.
            </p>
          </div>

          {/* Operating Reality Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {costCategories.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[140px]"
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

                {/* Title & Description */}
                <div className="relative z-10 max-w-[80%] mt-2.5">
                  <h4 className="text-white font-bold text-sm sm:text-base leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[#C5D7F0] text-xs sm:text-[13px] leading-relaxed font-normal mt-1.5 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Circular Icon in Bottom Right */}
                <div className="absolute right-3.5 bottom-3.5 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                    <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-1.5 sm:gap-4">
            <Link
              to={GCC_TOOL_LINKS.costCalculator.href}
              className="btn-gradient-primary inline-flex items-center justify-center whitespace-nowrap gap-2 !px-3 sm:!px-6 py-3 text-xs sm:text-sm font-semibold shadow-md group"
            >
              <span>Estimate GCC cost</span>
              <ArrowRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={GCC_TOOL_LINKS.costGuide.href}
              className="inline-flex items-center justify-center whitespace-nowrap gap-2 !px-3 sm:!px-6 py-3 rounded-full border border-[#D2DCF0] bg-white hover:border-[#008EC4] text-[#0D306C] hover:text-[#008EC4] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs group"
            >
              <span>View cost guide</span>
              <ArrowRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#008EC4]" />
            </Link>
          </div>
        </Section>

        {/* 8. Captive, BOT, managed or EOR-first? */}
        <Section
          id="entry-model"
          eyebrow="OPERATING MODEL CHOICE"
          title="Captive, BOT, managed or EOR-first?"
          lead="There is no default answer. The right entry model depends on how much control the enterprise needs on day one, how much local operating capability it has, how fast it needs the first team and how it wants ownership to transfer over time. The criteria below are how NeoIntelli frames the choice; the decision framework underneath maps them to your situation."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            <ResponsiveMatrix
              caption="Decision criteria for GCC entry models: control, initial complexity, speed, transfer path, local operating capability, talent ownership, cost structure and long-term suitability"
              rowHeader="Criterion"
              columns={entryModelColumns}
              rows={entryModelRows}
              mobileGroupBy="column"
            />
            <p className="text-[#505D74] text-xs sm:text-sm mt-6 max-w-4xl mx-auto text-center leading-relaxed font-normal">
              An AI Micro GCC is a way to start any of these paths with one senior-led squad and scale into the model you choose. The detailed mechanics of Build-Operate-Transfer, including transfer milestones and what moves, are described in{" "}
              <Link to={GCC_OPERATIONS_LINKS.botTransition.href} className="text-[#008EC4] font-semibold underline underline-offset-2 hover:text-[#0D306C] transition-colors">
                BOT &amp; Transition under GCC Operations
              </Link>
              .
            </p>
            <div className="mt-14 max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold font-manrope text-[#0D306C] mb-2">
                  NeoIntelli GCC Decision Framework
                </h3>
                <p className="text-[#505D74] text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed font-normal">
                  Eleven dimensions, six starting models. It is built to help a leadership team see which way its situation leans, not to produce a score.
                </p>
              </div>
              <GccDecisionFramework />
            </div>
          </div>
        </Section>

        {/* 10. GCC Risk Register */}
        <Section
          id="risk-register"
          eyebrow="RISK GOVERNANCE"
          title="The GCC risk register, with the mitigations that work"
          lead="A risk register that lists risks without owners or costed mitigations is decoration. This is the working version NeoIntelli starts every case from, adapted to the mandate."
          width="wide"
          align="center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {riskRegister.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(22,157,200,0.14)] min-h-[160px]"
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    role="presentation"
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/80 to-[#051329]/40" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Cyan accent bar (no numbers) */}
                <div className="relative z-10 w-5 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-9 group-hover:bg-[#38BDF8] transition-all duration-300" />

                {/* Title & Description */}
                <div className="relative z-10 max-w-[80%] mt-2.5">
                  <h4 className="text-white font-bold text-sm sm:text-base leading-snug tracking-tight font-manrope group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[#C5D7F0] text-xs sm:text-[13px] leading-relaxed font-normal mt-1.5">
                    {item.desc}
                  </p>
                </div>

                {/* Circular Icon in Bottom Right */}
                <div className="absolute right-3.5 bottom-3.5 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                    <item.icon className="w-4 h-4 stroke-[1.8] text-[#38BDF8]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* 11. Board-Ready Deliverables */}
        <Section
          id="board-output"
          eyebrow="BOARD DELIVERABLES"
          title="What should a board-ready GCC case contain?"
          width="regular"
          align="center"
          headerClassName="max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
            {/* Left: Sentences */}
            <div className="flex flex-col justify-center text-left space-y-4 text-[#505D74] text-sm sm:text-base leading-relaxed font-normal pr-0 lg:pr-4">
              <p>
                A board-ready GCC case contains twelve things: an executive rationale, the mandate, an operating-model recommendation, a location shortlist, a workforce blueprint, a multi-year financial model, a risk register, a governance model, a launch roadmap, decision gates, success metrics and the ownership path. If any of these is missing, the board is being asked to approve a direction rather than a decision.
              </p>
              <p>
                This is what NeoIntelli&apos;s GCC Blueprint engagement produces. It is the natural next step when the strategy questions on this page have been worked through and the company wants a recommendation it can act on.
              </p>
            </div>

            {/* Right: Navy rounded card without sharp rectangle shape */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-5 sm:p-7 text-white shadow-xl shadow-[#081B3E]/15 flex flex-col justify-center">
              {/* Ambient cyan glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0 m-0">
                  {boardOutputs.map((t, s) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 rounded-lg bg-[#0C2A5C]/75 px-3 py-2.5 text-xs sm:text-[13px] font-medium text-white border border-[#235391]/60 shadow-2xs hover:border-[#38BDF8]/60 hover:bg-[#0E3470] transition-colors"
                    >
                      <span className="text-xs font-mono font-bold text-[#38BDF8] w-5 shrink-0">
                        {String(s + 1).padStart(2, "0")}
                      </span>
                      <span className="text-slate-100 font-manrope">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Centered Button below both left and right divs */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              to={blueprintRequestUrl({ ...leadContext, cta_name: "Request the GCC Blueprint" })}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#169DC8] to-[#0D306C] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#169DC8]/20 hover:from-[#1389af] hover:to-[#09224f] hover:shadow-[0_8px_25px_-4px_rgba(22,157,200,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group"
            >
              <span>Request the GCC Blueprint</span>
              <ArrowRight aria-hidden className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-white" />
            </Link>
          </div>
        </Section>

        {/* 11. Strategy Lifecycle Journey (From business goal to board decision directly above FAQ) */}
        <Section
          id="strategy-flow"
          eyebrow="STRATEGY LIFECYCLE"
          title="From business goal to board decision"
          lead="The order matters. Each stage narrows the next; skipping one means reopening it later."
          theme="navy"
          width="wide"
          align="center"
          wavesOnMobile
        >
          <UniversalLifecycle
            theme="navy"
            steps={strategyFlow.map((s) => ({
              title: s.label,
              desc: s.note,
              icon: s.icon,
              href: s.href,
            }))}
          />
        </Section>

        {/* 12. Questions Buyers Ask */}
        <Section
          id="questions"
          eyebrow="QUESTIONS BUYERS ASK"
          title="GCC strategy questions, answered directly"
          lead="Concrete answers to the questions executive sponsors and steering committees ask before committing to a GCC strategy engagement."
          width="regular"
          align="center"
        >
          <AnswerBlock items={gccStrategyFaqs.map((t) => ({ question: t.q, answer: t.a }))} level={3} />
        </Section>

        {/* 13. Contextual CTA */}
        <GccStrategyCTA
          title="Build the case the board can approve."
          description="Bring the mandate questions and the numbers you have. A NeoIntelli GCC strategy lead will work through ownership, entry model, economics and risk with you in a 30-minute session."
          primary={{ label: "Build My GCC Business Case", href: bookACallUrl("footer_cta") }}
          secondary={{ label: "Request the GCC Blueprint", href: blueprintRequestUrl({ ...leadContext, cta_name: "Request the GCC Blueprint" }) }}
          leadContext={leadContext}
        />

        {/* 14. Related Services */}
        <RelatedGccServices
          variant="overview"
          title="Continue the GCC decision journey"
          primary={[
            { label: "Location Strategy", href: R.location, desc: "Choose the city around the mandate and role mix.", anchor: "Compare GCC locations in India" },
            { label: "Setup & Launch", href: R.setup, desc: "Turn the approved case into a working center through parallel workstreams.", anchor: "See how the launch program works" },
            { label: "AI Micro GCC", href: R.microGcc, desc: "Start with one senior-led squad and scale into the model you choose.", anchor: "Start with an AI Micro GCC" },
          ]}
          secondaryTitle="After launch, and alongside it"
          secondary={[
            { label: GCC_TOOL_LINKS.costCalculator.label, href: GCC_TOOL_LINKS.costCalculator.href, anchor: "Estimate GCC cost with the calculator" },
            { label: GCC_TOOL_LINKS.blueprint.label, href: GCC_TOOL_LINKS.blueprint.href, anchor: "Explore the GCC Blueprint engagement" },
            { label: GCC_TOOL_LINKS.gccVsOutsourcing.label, href: GCC_TOOL_LINKS.gccVsOutsourcing.href, anchor: "Compare GCC vs outsourcing in detail" },
            { label: AI_PILLAR_LINKS.aiGcc.label, href: AI_PILLAR_LINKS.aiGcc.href, anchor: "Design an AI-focused capability center" },
          ]}
        />
      </main>
    </GccStrategyPageLayout>
  );
}
