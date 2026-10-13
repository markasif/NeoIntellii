import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  UserPlus,
  FileText,
  Calculator,
  HeartHandshake,
  Calendar,
  Headphones,
  BookOpen,
  Smile,
  Award,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
  LogOut,
  CheckCircle2,
  UserCheck,
  FileCheck,
  Compass,
  TrendingUp,
  Heart,
  Shield,
  Handshake,
  Building2,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import SourceNote, { LEGAL_VALIDATION_NOTE } from "@/components/gcc-operations/SourceNote";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("people");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

// 14 Capabilities for People & HR Operations (Structured for 5 + 5 + 4 layout)
const capabilities = [
  { title: "Onboarding administration", desc: "Pre-joining documentation, day-one readiness, induction scheduling and first-month check-ins.", icon: UserPlus },
  { title: "Employee documentation", desc: "Contracts, letters, records and changes kept complete, current and in systems the client can access.", icon: FileText },
  { title: "Payroll coordination", desc: "Inputs, calendars, changes and reconciliations with the payroll provider or employing entity.", icon: Calculator },
  { title: "Benefits administration", desc: "Enrolment, changes, renewals and employee queries for the benefits design the client agrees.", icon: HeartHandshake },
  { title: "Leave administration", desc: "Leave policy administration, balances and approvals aligned to the local policy set.", icon: Calendar },
  { title: "HR helpdesk", desc: "A single place for employee questions, with answers grounded in the local policies and escalation to the client where needed.", icon: Headphones },
  { title: "Policy administration", desc: "The local policy set maintained in line with global intent and local employment practice.", icon: BookOpen },
  { title: "Employee engagement", desc: "Pulse measurement, town halls, recognition and events, run to the client's culture and cadence.", icon: Smile },
  { title: "Performance-cycle coordination", desc: "Calendars, forms, reminders and completion tracking for the client's performance framework.", icon: Award },
  { title: "Learning administration", desc: "Enrolment, scheduling, tracking and vendor coordination for agreed learning programs.", icon: GraduationCap },
  { title: "Retention programs", desc: "Operating the retention levers the client chooses: stay conversations, mobility processes, recognition.", icon: ShieldCheck },
  { title: "Employee lifecycle processes", desc: "Joiner, mover and leaver processes connected to IT access and payroll so nothing falls between functions.", icon: RefreshCw },
  { title: "Offboarding", desc: "Exit documentation, clearance, final settlement coordination and records closure.", icon: LogOut },
  { title: "Background verification coordination", desc: "Coordination with verification providers to the client's policy, with results recorded for audit.", icon: CheckCircle2 },
];

// 8 Stages of Employee Lifecycle Journey (Matching Home Page GCCLifecycle undulating sine wave)
const journeyStages = [
  {
    id: "01",
    name: "Candidate",
    description: "Sourcing and screening, with NeoHireX where agreed.",
    tag: "supports" as const,
    tagLabel: "Supports",
    tagSub: "Managers decide",
    icon: UserCheck,
    isHigh: true,
    x: 90,
    y: 110,
  },
  {
    id: "02",
    name: "Offer",
    description: "Client decides. NeoIntelli prepares documentation.",
    tag: "joint" as const,
    tagLabel: "Joint",
    tagSub: "Shared policy & data",
    icon: FileCheck,
    isHigh: false,
    x: 270,
    y: 240,
  },
  {
    id: "03",
    name: "Join",
    description: "Employment documentation, statutory enrolment coordination, day-one readiness.",
    tag: "operates" as const,
    tagLabel: "Operates",
    tagSub: "NeoIntelli executes",
    icon: UserPlus,
    isHigh: true,
    x: 450,
    y: 110,
  },
  {
    id: "04",
    name: "Onboard",
    description: "Induction, access, first-month check-ins.",
    tag: "operates" as const,
    tagLabel: "Operates",
    tagSub: "NeoIntelli executes",
    icon: Compass,
    isHigh: false,
    x: 630,
    y: 240,
  },
  {
    id: "05",
    name: "Perform",
    description: "Cycle coordination. Managers assess.",
    tag: "supports" as const,
    tagLabel: "Supports",
    tagSub: "Managers decide",
    icon: TrendingUp,
    isHigh: true,
    x: 810,
    y: 110,
  },
  {
    id: "06",
    name: "Develop",
    description: "Learning administration and tracking.",
    tag: "supports" as const,
    tagLabel: "Supports",
    tagSub: "Managers decide",
    icon: GraduationCap,
    isHigh: false,
    x: 990,
    y: 240,
  },
  {
    id: "07",
    name: "Retain",
    description: "Engagement data and programs. Client decides the levers.",
    tag: "joint" as const,
    tagLabel: "Joint",
    tagSub: "Shared policy & data",
    icon: Heart,
    isHigh: true,
    x: 1170,
    y: 110,
  },
  {
    id: "08",
    name: "Transition / Exit",
    description: "Offboarding, records, transfer where applicable.",
    tag: "operates" as const,
    tagLabel: "Operates",
    tagSub: "NeoIntelli executes",
    icon: LogOut,
    isHigh: false,
    x: 1350,
    y: 240,
  },
];

const howItRuns = [
  { title: "Map", desc: "Entity status, employment structure, headcount plan, global policies and the systems of record the client already uses." },
  { title: "Stand up", desc: "Local policy set, process runbooks, payroll calendar, helpdesk, document templates and the employee records structure." },
  { title: "Operate", desc: "The agreed processes run to service levels, with a monthly people report to the client's HR and center leadership." },
  { title: "Transfer or continue", desc: "Records, runbooks and vendor relationships are in transferable form from the start, so the function can move in-house when the client chooses." },
];

/**
 * Employee Journey Lifecycle Component
 * Consolidated via UniversalLifecycle (variant="employee-journey", 8 stages)
 */
function EmployeeJourneyLifecycle() {
  return (
    <UniversalLifecycle
      stages={journeyStages}
      variant="employee-journey"
      id="employee-journey-cycle"
    />
  );
}

export default function PeopleHrOperations() {
  return (
    <GccOperationsLayout
      page={page}
      eyebrow="People & HR Operations · GCC Operations"
      heroDescription="NeoIntelli operates the administrative and support work of the employee lifecycle in your India GCC: onboarding, payroll coordination, benefits, HR helpdesk, engagement, performance-cycle coordination and offboarding. Your HR leadership keeps the strategy, the frameworks and the decisions."
      secondaryCta={{ label: "See the employee journey", href: "#employee-journey" }}
      contextualLink={{ label: "Need recruitment execution? Explore AI Talent →", href: PILLAR_LINKS.aiTalent }}
      cta={{
        title: "Discuss how people operations would run around your team.",
        description: "A conversation about your entity status, the HR functions you want operated versus retained, and how onboarding and payroll would work in the first quarter.",
        secondary: { label: "See the full operating layer", href: GCC_OPERATIONS_BASE },
      }}
    >
      {/* SECTION 1: WHY (People Operations Positioning & In Brief Card) */}
      <OpsSection id="why" width="wide">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch overflow-hidden">
          {/* LEFT: Positioning Content & 3 Feature Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#008EC4] mb-2.5 sm:mb-3">
              PEOPLE OPERATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Employees need support from day one. A local HR function takes longer to build.
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              The first cohort joins, and with it come contracts, statutory enrolments, payroll inputs, benefits questions, leave requests, policy questions and a manager in another time zone who wants to know it is all handled.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              You retain strategic control. NeoIntelli operates the employee lifecycle scaffolding.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Building a full local HR team before day one is rarely the best use of leadership time or budget. People &amp; HR Operations carries this work under your global people frameworks, keeping records in systems you access, and routing decisions to your HR leadership.
            </p>
          </motion.div>

          {/* RIGHT: In Brief Dark Card matching uploaded design */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col h-full"
          >
            <InBriefCard
              imageSrc="/images/services/gcc-operations/gcc-in-brief-people.webp"
              imageAlt="GCC People & HR Operations"
            >
              People &amp; HR Operations is the part of NeoIntelli&apos;s GCC operating layer that runs the employee lifecycle in your India center: onboarding administration, documentation, payroll coordination, benefits and leave administration, HR helpdesk, policy administration, engagement, performance-cycle coordination, learning administration, retention programs and offboarding. It is for companies whose India GCC has employees to support but no local HR function to support them. NeoIntelli operates the agreed processes under your global people frameworks, keeps records in transferable systems, and routes decisions to your HR leadership.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: SCOPE / CAPABILITIES (5-Column + 5-Column + 4-Column Grid matching Overview AI Acceleration) */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What people operations covers."
        intro="Each item is a process NeoIntelli can operate. The engagement defines which are included, and the responsibility matrix records who owns each decision."
        align="center"
        width="wide"
      >
        <CapabilityGrid
          variant="hr"
          items={capabilities}
          footer={
            <SourceNote className="text-center max-w-2xl mx-auto">
              NeoIntelli does not provide legal HR advice. {LEGAL_VALIDATION_NOTE}
            </SourceNote>
          }
        />

      </OpsSection>

      {/* SECTION 3: EMPLOYEE JOURNEY (Redesigned like Homepage GCCLifecycle Sine Wave) */}
      <OpsSection
        id="employee-journey"
        eyebrow="EMPLOYEE JOURNEY"
        title="Where NeoIntelli operates and supports across the employee lifecycle."
        intro="The lifecycle is one flow, not eight separate processes. The tags show the typical split: NeoIntelli operates the administrative steps, supports the steps where managers decide, and shares the steps where policy and data meet."
        align="center"
        width="wide"
        headerClassName="mx-auto !mb-0"
      >
        <EmployeeJourneyLifecycle />
      </OpsSection>

      {/* SECTION 4: RESPONSIBILITY BOUNDARIES (Normal background with 2-Panel Lifecycle Paradigm Card matching Overview & Uploaded Data) */}
      <OpsSection
        id="what-stays-with-hq"
        eyebrow="RESPONSIBILITY BOUNDARIES"
        title="Local operations do not replace global people leadership."
        intro="The center runs on your people philosophy. NeoIntelli administers it locally. The line between the two is drawn explicitly at the start of the engagement."
        align="center"
        width="wide"
      >
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D5E2F3] shadow-md max-w-5xl mx-auto">
          {/* Desktop Center Collaboration Badge - Handshake symbol between panels */}
          <div className="hidden lg:flex absolute left-1/2 bottom-20 sm:bottom-24 -translate-x-1/2 z-30 w-11 h-11 rounded-full bg-white text-[#0D244D] shadow-xl items-center justify-center pointer-events-none border border-[#D5E2F3] group-hover:scale-110 transition-transform duration-300">
            <Handshake className="w-5 h-5 text-[#008EC4]" />
          </div>

          <div className="grid lg:grid-cols-2 items-stretch">
            {/* 1. Left Panel (White Panel: HQ / CLIENT MAY RETAIN) */}
            <div className="relative bg-white flex flex-col overflow-hidden text-left">
              <div className="p-6 sm:p-8 lg:p-9 flex flex-col flex-1">
                {/* Header */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-1.5">
                  HQ / CLIENT MAY RETAIN
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D244D] tracking-tight leading-[1.2] mb-1">
                  Global people leadership
                </h3>
                {/* Amber Underline matching home page */}
                <div className="w-8 h-[3px] bg-[#DE8017] rounded-full mb-4" />
                <p className="text-[#505D74] text-xs sm:text-sm mb-5 leading-relaxed">
                  Strategic governance, executive mandates and global policy decisions remain owned by client HR leadership.
                </p>

                {/* 3-column arrow bullet grid in 2-3 lines matching Overview */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-2 mb-6">
                  {[
                    "Global HR strategy",
                    "Compensation philosophy",
                    "Performance framework",
                    "Senior promotion decisions",
                    "Culture",
                    "Leadership policy",
                    "Global mobility policy",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1">
                      <ArrowRight className="w-2.5 h-2.5 text-[#0D306C] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-[10.5px] sm:text-xs text-[#2B3D66] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0 bg-[#081B3E]">
                <Image
                  src="/images/services/gcc-operations/gcc-hq-leadership.webp"
                  alt="Global People Leadership & Headquarters Executive Governance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="border-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Mobile Connecting Badge between panels */}
            <div className="flex lg:hidden justify-center items-center -my-4 z-30 relative">
              <div className="w-10 h-10 rounded-full bg-white text-[#0D244D] shadow-lg flex items-center justify-center pointer-events-none border border-[#D5E2F3]">
                <Handshake className="w-4 h-4 text-[#008EC4]" />
              </div>
            </div>

            {/* 2. Right Panel (Deep Navy Blue Panel: NEOINTELLI MAY OPERATE) */}
            <div className="relative bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#061530] text-white flex flex-col overflow-hidden text-left">
              <div className="p-6 sm:p-8 lg:p-9 flex flex-col flex-1">
                {/* Header */}
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-1.5">
                  NEOINTELLI MAY OPERATE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-[1.2] mb-1">
                  Local people operations
                </h3>
                {/* Amber Underline matching home page */}
                <div className="w-8 h-[3px] bg-[#DE8017] rounded-full mb-4" />
                <p className="text-[#C5D7F0] text-xs sm:text-sm mb-5 leading-relaxed">
                  Daily administrative workflows, employee support, payroll coordination and compliance execution in India.
                </p>

                {/* 3-column arrow bullet grid in 2-3 lines matching Overview */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-2 mb-6">
                  {[
                    "Local administration",
                    "Workflows",
                    "Employee support",
                    "Payroll coordination",
                    "Benefits coordination",
                    "Onboarding",
                    "Documentation",
                    "Reporting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1">
                      <ArrowRight className="w-2.5 h-2.5 text-[#38BDF8] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-[10.5px] sm:text-xs text-white/85 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0 bg-[#061530]">
                <Image
                  src="/images/services/gcc-operations/gcc-local-operations.webp"
                  alt="Local People & HR Operations Team Execution"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="border-0 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Note below card matching uploaded image */}
        <p className="mt-5 text-center text-xs sm:text-[13px] text-[#505D74] leading-relaxed max-w-4xl mx-auto">
          <span className="font-bold text-[#0D244D]">Note:</span> Exact scope depends on the engagement. Where a local practice needs to differ from a global policy, the exception is documented and approved by the client.
        </p>
      </OpsSection>

      {/* SECTION 5: HIRING CONNECTION (Navy Theme with Organic Wave Divider) */}
      <OpsSection
        id="hiring-connection"
        eyebrow="TALENT &amp; HIRING INTEGRATION"
        title="How hiring connects to people operations."
        intro="Recruitment finds and technically validates the people. People operations takes over the moment an offer is approved."
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto text-left">
          {/* Left: Recruitment operations and NeoHireX */}
          <div className="flex flex-col">
            <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-3 tracking-tight">
              Recruitment operations and NeoHireX
            </h3>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed flex-1">
              Recruitment operations can be supported by NeoHireX, NeoIntelli&apos;s Hiring OS for candidate screening, ranking, AI-led first-round evaluation and recruitment workflow management. NeoHireX does not make final hiring decisions. Sourcing, technical validation and offer coordination sit with NeoIntelli&apos;s AI Talent practice; people operations takes over at the offer.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={PILLAR_LINKS.aiTalent} className="btn-white whitespace-nowrap">
                <span>Explore AI Talent</span>
                <ArrowRight className="w-4 h-4 text-[#0D306C] shrink-0" />
              </Link>
              <Link to={PILLAR_LINKS.aiDataRecruitment} className="btn-navy whitespace-nowrap">
                <span>AI &amp; Data recruitment</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right: Where AI can help inside people operations */}
          <div className="flex flex-col">
            <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-3 tracking-tight">
              Where AI can help inside people operations
            </h3>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed flex-1">
              NeoIntelli can implement an onboarding assistant that answers first-week questions, an HR knowledge assistant grounded in the local policy set, document processing for employment records, and anomaly checks on payroll inputs before they reach the provider. Each is designed with a human owner and a clear fallback.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={PILLAR_LINKS.aiEngineering} className="btn-white whitespace-nowrap">
                <span>See AI Engineering</span>
                <ArrowRight className="w-4 h-4 text-[#0D306C] shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 6: HOW IT RUNS (Four Steps) */}
      <OpsSection
        id="how-it-runs"
        eyebrow="How the engagement runs"
        title="Four steps from first employee to a function you could take in-house."
        tone="muted"
        width="wide"
        align="center"
      >
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-6xl mx-auto">
          {howItRuns.map((step, index) => {
            const stepIcons = [Compass, Building2, RefreshCw, Handshake];
            const StepIcon = stepIcons[index] || Compass;

            return (
              <li
                key={step.title}
                className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Slotted Step Number Design matching reference image */}
                  <SlottedStepNumber index={index} />

                  {/* Step Title in Uppercase */}
                  <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-3 group-hover:text-[#008EC4] transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-[#505D74] text-xs sm:text-[13.5px] leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Icon */}
                <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                  <StepIcon className="w-6 h-6 stroke-[1.8]" />
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 text-sm text-[#505D74] text-center">
          Planning the workforce, not only administering it? See{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/workforce-strategy`} className={link}>Workforce Strategy</Link>.
          Moving the function into your own entity? See{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/bot-transition`} className={link}>BOT &amp; Transition</Link>.
        </p>
      </OpsSection>

      {/* SECTION 7: FAQ LIST (Precedes Wave Divider in Layout) */}
      <AnswerList
        id="buyer-questions"
        eyebrow="COMMON INQUIRIES &amp; ANSWERS"
        title="Questions buyers ask about GCC HR and people operations"
        intro={`Answers are operational, not legal. Where an answer depends on the employment structure, tax or labour law, it says so. ${LEGAL_VALIDATION_NOTE}`}
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
