"use client";

import { Link } from "react-router-dom";
import { ArrowRight, Check, CheckCircle2, ChevronRight, Layers, ShieldCheck, Sparkles, Building2, Briefcase, Compass, Rocket, TrendingUp, FileText, CreditCard, Laptop, UserCheck, BookOpen, Target, Database, LifeBuoy, AlertCircle, MapPin, Globe, Scale, Receipt } from "lucide-react";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import AdvisoryProcessFlow from "@/components/ai-gcc/AdvisoryProcessFlow";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import {
  GccStrategyHero,
  GccStrategySubnav,
  GccStrategyPageLayout,
  GccSetupWorkstreams,
  SourceNote,
  RelatedGccServices,
  GccStrategyCTA,
} from "@/components/gcc-strategy";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import { gccSetupFaqs } from "@/data/gccStrategyFaqs";
import { GCC_SETUP_CONSIDERATIONS, GCC_SETUP_DISCLAIMER } from "@/data/gccPolicy";
import { bookACallUrl } from "@/lib/constants";
import {
  GCC_STRATEGY_ROUTES as R,
  GCC_STRATEGY_PILLAR_LABEL,
  GCC_OPERATIONS_LINKS,
  AI_PILLAR_LINKS,
  GCC_TOOL_LINKS,
  type GccLeadContext,
} from "@/lib/gccStrategyRoutes";

const leadContext: GccLeadContext = {
  source_page: R.setup,
  service_interest: "GCC Setup & Launch",
  cta_name: "Plan My GCC Launch",
};

const workstreams: Array<{ id?: string; title: string; lead: string; image: string; items: string[]; link?: { label: string; href: string } }> = [
  {
    title: "Program management",
    lead: "One plan, one owner.",
    image: "/images/services/gcc/01-program-management.webp",
    items: [
      "Integrated plan across every workstream",
      "Dependencies mapped and re-checked weekly",
      "Decision gates at readiness, pilot launch and full launch",
      "Risk register with owners",
      "Weekly cadence with headquarters and India",
    ],
  },
  {
    title: "Entity & compliance coordination",
    lead: "Coordinated, not improvised.",
    image: "/images/services/gcc/02-entity-compliance.webp",
    items: [
      "Entity route and setup coordination",
      "Statutory registrations and the compliance calendar",
      "Advisers briefed, sequenced and managed",
      "Employment framework and contracts",
      "Policy requirements by state and sector",
    ],
  },
  {
    id: "leadership-talent",
    title: "Leadership & talent mobilization",
    lead: "Leaders first, then the cohort.",
    image: "/images/services/gcc/03-leadership-talent.webp",
    items: [
      "Center head and function-lead search",
      "Role design for the initial workforce",
      "Recruitment launch with technical validation",
      "Onboarding sequence that matches workspace and IT readiness",
    ],
    link: { label: "Hire AI and data roles with NeoIntelli's AI Talent service", href: AI_PILLAR_LINKS.aiTalent.href },
  },
  {
    title: "Workplace",
    lead: "Space that fits the year, not the decade.",
    image: "/images/services/gcc/04-workplace.webp",
    items: [
      "Office strategy: managed space first, longer commitments later",
      "Workspace selection and contracting",
      "Equipment and furniture",
      "Facilities readiness for day one",
    ],
  },
  {
    title: "IT & security",
    lead: "Same standards as headquarters.",
    image: "/images/services/gcc/05-it-security.webp",
    items: [
      "Identity and access",
      "Devices and endpoint management",
      "Connectivity",
      "Security baseline agreed with the strictest business unit served",
      "Integration with headquarters systems",
    ],
  },
  {
    title: "People readiness",
    lead: "Ready before the first offer.",
    image: "/images/services/gcc/06-people-readiness.webp",
    items: [
      "Employment workflows",
      "Payroll readiness",
      "Benefits",
      "Policies and handbook",
      "Onboarding journey",
    ],
  },
  {
    title: "Governance",
    lead: "Decided, written, practised.",
    image: "/images/services/gcc/07-governance.webp",
    items: [
      "Decision rights between headquarters and India",
      "Reporting lines and dashboards",
      "Launch governance and escalation",
      "The operating cadence the center keeps after go-live",
    ],
  },
  {
    title: "Go-live",
    lead: "First employees, first mandate.",
    image: "/images/services/gcc/08-go-live.webp",
    items: [
      "Readiness checklist signed off",
      "First employees start against a defined objective",
      "First mandate live with its metrics",
      "Handover into GCC Operations",
    ],
    link: { label: "What GCC Operations runs after go-live", href: GCC_OPERATIONS_LINKS.overview.href },
  },
];

const dayOne = [
  {
    title: "Employment setup",
    desc: "Contract signed, statutory enrolments in motion.",
    image: "/images/services/gcc-operations/operating-reality/01-employees.webp",
    icon: FileText,
  },
  {
    title: "Payroll process",
    desc: "The first pay run is scheduled and tested, not assumed.",
    image: "/images/services/gcc-operations/operating-reality/02-payroll.webp",
    icon: CreditCard,
  },
  {
    title: "Workspace and access",
    desc: "A desk, a badge and a way in on day one.",
    image: "/images/services/gcc-operations/operating-reality/04-access.webp",
    icon: Building2,
  },
  {
    title: "Device",
    desc: "Configured, enrolled and shipped before the start date.",
    image: "/images/services/gcc-operations/operating-reality/05-devices.webp",
    icon: Laptop,
  },
  {
    title: "Identity",
    desc: "Accounts, groups and licences provisioned.",
    image: "/images/services/gcc-operations/standards/identity.webp",
    icon: UserCheck,
  },
  {
    title: "Security",
    desc: "Baseline applied; exceptions approved in advance.",
    image: "/images/services/gcc-operations/operating-reality/09-risk.webp",
    icon: ShieldCheck,
  },
  {
    title: "Policies",
    desc: "Acknowledged in onboarding, not discovered later.",
    image: "/images/services/gcc-operations/standards/evidence-audit.webp",
    icon: BookOpen,
  },
  {
    title: "Manager",
    desc: "Named, briefed and available in the first week.",
    image: "/images/services/gcc-operations/operating-reality/11-leadership.webp",
    icon: Briefcase,
  },
  {
    title: "Role",
    desc: "A written role with a scope the manager agrees with.",
    image: "/images/services/gcc-operations/workforce-strategy-planning.webp",
    icon: Target,
  },
  {
    title: "Data and system access",
    desc: "Requested and approved against the role, not after the first blocker.",
    image: "/images/services/gcc-operations/standards/data-flows.webp",
    icon: Database,
  },
  {
    title: "Support route",
    desc: "Who to ask about IT, HR, facilities and payroll.",
    image: "/images/services/gcc-operations/scope-support.webp",
    icon: LifeBuoy,
  },
  {
    title: "Escalation path",
    desc: "What to do when the support route is not enough.",
    image: "/images/services/gcc-operations/standards/itsm-monitoring.webp",
    icon: AlertCircle,
  },
  {
    title: "Initial objective",
    desc: "Something real to deliver in the first weeks.",
    image: "/images/services/gcc-operations/operating-reality/13-mandates.webp",
    icon: Sparkles,
  },
];

const milestones = [
  {
    title: "Readiness / strategy phase",
    body: "Mandate, operating model, city and first roles locked. Ends at design lock.",
    icon: Compass,
  },
  {
    title: "Pilot team launch",
    body: "The first squad or leadership spine working, often under an EOR or partner entity while the enterprise entity is established.",
    icon: Rocket,
  },
  {
    title: "Entity & workplace readiness",
    body: "The enterprise entity, payroll and permanent workspace live; people and contracts transferred where needed.",
    icon: Building2,
  },
  {
    title: "Full operating launch",
    body: "The designed center operating its mandate with governance, metrics and the operating cadence in place.",
    icon: CheckCircle2,
  },
  {
    title: "Steady-state scale",
    body: "The center growing against its roadmap under GCC Operations, with the operating layer transferring in-house where agreed.",
    icon: TrendingUp,
  },
];

const regulatoryFlow = [
  {
    label: "Foreign investment route",
    detail: "Up to 100% FDI under the automatic route for activities not subject to sector-specific restrictions.",
    icon: Globe,
  },
  {
    label: "Export GST",
    detail: "Qualifying exports of services are zero-rated under GST, subject to statutory filing and export conditions.",
    icon: Receipt,
  },
  {
    label: "STPI / SEZ fit",
    detail: "Single-window support and qualifying duty-free technology imports via STP scheme, with tailored SEZ evaluation.",
    icon: Building2,
  },
  {
    label: "Transfer pricing",
    detail: "Eligible IT transactions may use 2026 safe-harbour framework with 15.5% margin up to ₹2,000 crore threshold.",
    icon: Scale,
  },
];

const neoDoes = [
  "Coordinates and operates the setup workstreams as one program",
  "Coordinates entity setup and registrations with the advisers",
  "Designs and implements the employment structures and people processes",
  "Runs leadership search, hiring and technical validation",
  "Stands up workspace, IT and the security baseline",
  "Implements governance and the launch readiness checklist",
];

const advisersDo = [
  "Legal opinions",
  "Tax advice and structuring",
  "Company-secretarial matters",
  "Specialist compliance interpretation",
  "Lease legal review",
  "Regulated-industry requirements",
];

const industries = [
  { name: "BFSI", href: "/industries/bfsi-gcc" },
  { name: "Healthcare & Life Sciences", href: "/industries/healthcare-gcc" },
  { name: "Technology & SaaS", href: "/industries/technology-gcc" },
  { name: "Manufacturing", href: "/industries/manufacturing-gcc" },
  { name: "Private Equity", href: "/industries/private-equity-gcc" },
  { name: "Retail & Consumer", href: "/industries/retail-gcc" },
];

export default function SetupLaunch() {
  return (
    <GccStrategyPageLayout>
      {/* 1. Hero */}
      <GccStrategyHero
        eyebrow="GCC Setup & Launch"
        title="Turn the GCC design into a working India center."
        description="Entity, leadership, talent, workplace, IT, people processes, governance and headquarters integration, run as one coordinated program with one dependency plan. This page starts where the strategic decisions end."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: R.overview },
          { name: GCC_STRATEGY_PILLAR_LABEL, href: R.overview },
          { name: "Setup & Launch" },
        ]}
        primaryCta={{ label: "Plan My GCC Launch", href: bookACallUrl("hero") }}
        secondaryCta={{ label: "See the parallel workstreams", href: "#workstreams" }}
        contextualLink={{ label: "Decisions not made yet? Start with Strategy & Business Case", href: R.strategy }}
        leadContext={leadContext}
      />

      {/* 2. Subnav */}
      <GccStrategySubnav />

      <main id="gcc-strategy-content" className="scroll-mt-32">
        {/* 3. In Brief */}
        <InBrief>
          GCC setup converts an approved mandate and business case into an operating center in India. The work usually
          includes entity and compliance coordination, leadership hiring, workforce mobilization, workspace, IT and
          security readiness, local people processes, headquarters integration and launch governance. Strong setup
          programs run these workstreams in parallel against one dependency plan rather than as separate vendor
          projects. NeoIntelli runs the program and hands the live center into its GCC Operations services.
        </InBrief>

        {/* 4. What has to be decided before setup starts */}
        <Section
          id="prerequisites"
          eyebrow="PREREQUISITES"
          title="What has to be decided before setup starts"
          align="center"
          width="regular"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            <Link
              to={R.strategy}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgba(22,157,200,0.18)] min-h-[210px] text-left"
            >
              {/* Background Image with Editorial Navy Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src="/images/how_we_work/phase_01_design.webp"
                  alt="Strategy and business case"
                  className="w-full h-full object-cover object-center opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/90 to-[#0A224E]/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/95 via-[#051329]/40 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Top: Cyan accent bar */}
              <div className="relative z-10 w-6 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-12 group-hover:bg-[#38BDF8] transition-all duration-300" />

              {/* Title & Description */}
              <div className="relative z-10 max-w-[85%] mt-4">
                <h3 className="text-white font-bold text-lg sm:text-xl font-manrope leading-snug group-hover:text-white transition-colors">
                  Strategy &amp; Business Case
                </h3>
                <p className="text-[#C5D7F0] text-xs sm:text-sm leading-relaxed font-normal mt-2">
                  Mandate, operating model, economics, risk and the board decision.
                </p>
              </div>

              {/* Bottom: Action link & Circular Icon */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38BDF8] group-hover:text-white transition-colors">
                  <span>Settle the mandate and entry model</span>
                  <ArrowRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                  <Compass className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
            </Link>

            <Link
              to={R.location}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#38BDF8]/25 hover:border-[#38BDF8]/55 bg-[#051329] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgba(22,157,200,0.18)] min-h-[210px] text-left"
            >
              {/* Background Image with Editorial Navy Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src="/images/services/gcc-operations/standards/continuity_building.webp"
                  alt="Location strategy"
                  className="w-full h-full object-cover object-center opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#051329]/90 to-[#0A224E]/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/95 via-[#051329]/40 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-xl pointer-events-none" />
              </div>

              {/* Top: Cyan accent bar */}
              <div className="relative z-10 w-6 h-[2px] bg-[#38BDF8]/60 rounded-full group-hover:w-12 group-hover:bg-[#38BDF8] transition-all duration-300" />

              {/* Title & Description */}
              <div className="relative z-10 max-w-[85%] mt-4">
                <h3 className="text-white font-bold text-lg sm:text-xl font-manrope leading-snug group-hover:text-white transition-colors">
                  Location Strategy
                </h3>
                <p className="text-[#C5D7F0] text-xs sm:text-sm leading-relaxed font-normal mt-2">
                  The city that fits the role mix, at the seniority the mandate needs.
                </p>
              </div>

              {/* Bottom: Action link & Circular Icon */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38BDF8] group-hover:text-white transition-colors">
                  <span>Choose the city</span>
                  <ArrowRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#051329]/90 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover:border-[#38BDF8]/70 group-hover:scale-105 transition-all">
                  <MapPin className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
            </Link>
          </div>
        </Section>

        {/* 5. Eight Parallel Setup Workstreams */}
        <Section
          id="workstreams"
          eyebrow="SETUP PROGRAM"
          title="Build in parallel, not sequentially."
          lead="Once the design decisions are locked, most workstreams can start together. The chart shows which run when. Phases are program stages, not calendar promises; the length of each depends on the operating model, the entity route, the leadership market and the workplace strategy, and is scoped per program."
          align="center"
          width="wide"
        >
          <GccSetupWorkstreams className="max-w-6xl mx-auto" />
        </Section>

        {/* 6. The eight setup workstreams in detail */}
        <Section
          id="workstream-detail"
          eyebrow="PARALLEL EXECUTION"
          title="The eight setup workstreams"
          lead="Eight parallel workstreams coordinated against a single, transparent critical path."
          align="center"
          width="wide"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 max-w-7xl mx-auto">
            {workstreams.map((w, index) => (
              <div
                key={w.title}
                id={w.id}
                className="group flex flex-col justify-between text-left select-none transition-all duration-300"
              >
                <div>
                  {/* Visual Frame on Top (16:10 ratio like Metrics in AI Delivery Teams) */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-3.5 border border-[#CBD5E1]/80 bg-slate-100 shadow-[0_2px_12px_rgba(13,48,108,0.06)] group-hover:border-[#008EC4]/60 group-hover:shadow-[0_8px_25px_rgba(22,157,200,0.18)] transition-all duration-300">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-extrabold text-[16px] sm:text-[17.5px] leading-snug tracking-tight text-[#0D306C] group-hover:text-[#008EC4] transition-colors mb-1.5 font-manrope">
                    {w.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#008EC4] font-semibold mb-3">
                    {w.lead}
                  </p>
                  <ul className="space-y-2 list-none pl-0 mb-4">
                    {w.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#505D74] leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00A3E0] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {w.link && (
                  <div className="mt-auto pt-2.5 border-t border-[#D2DCF0]/60">
                    <Link
                      to={w.link.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008EC4] hover:text-[#0D306C] transition-colors group-hover:translate-x-0.5"
                    >
                      <span>{w.link.label}</span>
                      <ArrowRight aria-hidden className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 7. How long does GCC setup take? Depends which milestone you mean */}
        <Section
          id="milestones"
          eyebrow="MILESTONES &amp; TIMELINE"
          title="How long does GCC setup take? Depends which milestone you mean."
          lead="A single number for “GCC setup time” hides five different milestones with different lead times. NeoIntelli scopes each for the specific program, and does not publish universal durations, because a pilot squad under an EOR and a fully captive multi-function center are not the same launch."
          align="center"
          width="wide"
        >
          {/* 5-Step Progression using Half-Sink Slotted Step Number */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center max-w-6xl mx-auto mb-10 sm:mb-14">
            {milestones.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Slotted Step Number Design matching reference image */}
                    <SlottedStepNumber index={index} />

                    <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
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

        </Section>

        {/* 8. Day-One Readiness */}
        <Section
          id="day-one"
          eyebrow="DAY-ONE READINESS"
          title="What must be ready before the first employee starts?"
          lead="Thirteen things. Employment setup, payroll, workspace and access, a device, identity, security, policies, a manager, a role, data and system access, a support route, an escalation path and an initial objective. NeoIntelli signs each off on a readiness checklist before an offer letter carries a start date."
          align="center"
          width="wide"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
            {dayOne.map((item, index) => (
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
                    src="/images/services/gcc-operations/operating-reality/globe.webp"
                    alt="Day-One Readiness Global Scale"
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
                    All 13 gates signed off before an offer letter carries a start date.
                  </h3>
                  <p className="text-[#94A3B8] text-[11px] sm:text-xs font-normal leading-relaxed mt-1">
                    Missing any one turns a first day into a waiting day. NeoIntelli audits every item on our readiness checklist before onboarding begins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Readiness comes before onboarding, not during. Once payroll, devices, access models and statutory registrations are verified, new joiners are productive from hour one rather than waiting on IT tickets.
            </p>
          </div>
        </Section>

        {/* 9. India setup considerations that can change the model */}
        <Section
          id="india-setup-considerations"
          eyebrow="REGULATORY &amp; TAX FOUNDATIONS"
          title="India setup considerations that can change the model"
          lead="Four decisions in the entity and tax workstream move the economics and the structure more than most others. None of them is automatic, and each depends on the activity, the entity and the location."
          align="center"
          width="wide"
        >
          <div className="max-w-6xl mx-auto mb-10 sm:mb-12">
            <AdvisoryProcessFlow steps={regulatoryFlow} />
          </div>

          <div className="max-w-6xl mx-auto text-center space-y-4">
            <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed italic max-w-3xl mx-auto">
              {GCC_SETUP_DISCLAIMER}
            </p>
            <SourceNote
              className="mt-4"
              source="DPIIT Consolidated FDI Policy; CBIC, Integrated Goods and Services Tax Act (zero-rated supply and export of services); Software Technology Parks of India, STP Scheme; CBDT / Ministry of Finance, Finance Act 2026 safe-harbour changes"
              lastChecked="Sep 2026"
            />
            <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed pt-3">
              Ongoing obligations once the center is live, including the current labour-code framework, are covered in{" "}
              <Link
                to={GCC_OPERATIONS_LINKS.governance.href}
                className="text-[#008EC4] font-semibold underline decoration-[#008EC4]/30 hover:decoration-[#008EC4] hover:text-[#0D306C] transition-colors"
              >
                Governance &amp; Compliance
              </Link>
              .
            </p>
          </div>
        </Section>

        {/* 10. What NeoIntelli does, and what qualified advisers do */}
        <Section
          id="who-does-what"
          eyebrow="DELIVERY BOUNDARIES"
          title="What NeoIntelli does, and what qualified advisers do"
          lead="NeoIntelli is a GCC design and setup firm, not a law, accounting or tax firm. It coordinates and operates the setup workstreams and works with specialist advisers, the client's or its own network, for matters that require a licensed professional opinion."
          align="center"
          width="wide"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Left: NeoIntelli */}
            <div className="rounded-2xl bg-[#001844] text-white p-7 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-manrope text-white mb-5">
                  NeoIntelli coordinates and operates
                </h3>
                <ul className="space-y-3.5">
                  {neoDoes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                      <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Qualified advisers */}
            <div className="rounded-2xl bg-transparent p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-manrope text-[#0D306C] mb-5">
                  Qualified external or client advisers handle
                </h3>
                <ul className="space-y-3.5 mb-6">
                  {advisersDo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-[#505D74] leading-relaxed">
                      <ArrowRight className="w-4 h-4 text-[#008EC4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-[#505D74] leading-relaxed pt-4 border-t border-[#D2DCF0]/60 italic font-normal">
                Legal and tax interpretation, including entity structure, transfer pricing and IP assignment terms, is
                validated by qualified advisers. NeoIntelli implements what they advise and keeps the program moving
                around it.
              </p>
            </div>
          </div>
        </Section>

        {/* 11. Setup considerations by industry */}
        <Section
          id="industries"
          eyebrow="INDUSTRY PERSPECTIVES"
          title="Setup considerations by industry"
          lead="Industry-specific operating models, regulatory guardrails, and specialized capability center setups."
          align="center"
          width="regular"
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {industries.map((ind) => (
              <Link
                key={ind.href}
                to={ind.href}
                className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#00A3E0] bg-transparent text-[#0D244D] text-xs sm:text-[13.5px] font-semibold hover:border-[#008EC4] hover:bg-[#008EC4] hover:text-white transition-all duration-200 select-none shadow-2xs hover:shadow-xs"
              >
                <span>{ind.name} GCC</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#008EC4] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </Section>

        {/* 12. GCC Setup FAQs */}
        <Section
          id="questions"
          eyebrow="QUESTIONS &amp; ANSWERS"
          title="GCC setup questions, answered directly"
          lead="Clear answers on India setup lead times, legal entities, parallel execution, and day-one readiness."
          align="center"
          width="regular"
        >
          <div className="max-w-4xl mx-auto">
            <AnswerBlock items={gccSetupFaqs.map((f) => ({ question: f.q, answer: f.a }))} level={3} />
          </div>
        </Section>

        {/* 13. Contextual CTA */}
        <GccStrategyCTA
          title="Launch the center as one program, not twelve projects."
          description="A 30-minute session with a NeoIntelli setup lead: which workstreams start on day one for your mandate, what the critical path really is, and what has to be ready before the first employee starts."
          primary={{
            label: "Plan My GCC Launch",
            href: bookACallUrl("footer_cta"),
          }}
          secondary={{
            label: "Estimate setup and run cost",
            href: GCC_TOOL_LINKS.costCalculator.href,
          }}
          leadContext={leadContext}
        />

        {/* 14. Related GCC Services */}
        <RelatedGccServices
          title="Before and after the launch"
          variant="overview"
          primary={[
            {
              label: "Strategy & Business Case",
              href: R.strategy,
              desc: "The decisions setup depends on: mandate, entry model, economics.",
              anchor: "Build the GCC business case",
            },
            {
              label: "Location Strategy",
              href: R.location,
              desc: "Choose the city around the mandate and role mix.",
              anchor: "Compare GCC locations in India",
            },
            {
              label: GCC_OPERATIONS_LINKS.overview.label,
              href: GCC_OPERATIONS_LINKS.overview.href,
              desc: "Run and scale the center after go-live: people, workplace, IT, governance and performance.",
              anchor: "Hand over into GCC Operations",
            },
          ]}
          secondary={[
            {
              label: AI_PILLAR_LINKS.aiTalent.label,
              href: AI_PILLAR_LINKS.aiTalent.href,
              anchor: "Hire the AI and data team with AI Talent",
            },
            {
              label: GCC_OPERATIONS_LINKS.botTransition.label,
              href: GCC_OPERATIONS_LINKS.botTransition.href,
              anchor: "Read about BOT and transition",
            },
            {
              label: "AI Micro GCC",
              href: R.microGcc,
              anchor: "Start with an AI Micro GCC",
            },
            {
              label: GCC_TOOL_LINKS.readiness.label,
              href: GCC_TOOL_LINKS.readiness.href,
              anchor: "Check GCC readiness",
            },
          ]}
        />
      </main>
    </GccStrategyPageLayout>
  );
}
