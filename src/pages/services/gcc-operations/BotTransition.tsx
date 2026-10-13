"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  FileText,
  Handshake,
  ShieldCheck,
  Rocket,
  RefreshCw,
  Award,
  ArrowRightLeft,
  CheckCircle2,
  Lock,
  Layers,
  Users,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Workflow,
  Building2,
  Building,
  FolderLock,
  Check,
  ArrowUpRight,
  Activity,
  Database,
  Scale,
  FileCheck,
  BookOpen,
  Settings,
  HardDrive,
  BarChart3,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import SourceNote, { LEGAL_VALIDATION_NOTE } from "@/components/gcc-operations/SourceNote";
import GccLifecycleWave from "@/components/gcc-operations/GccLifecycleWave";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import TypewriterParagraph from "@/components/gcc-operations/TypewriterParagraph";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("bot");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const stages = [
  {
    title: "Build",
    desc: "Everything is built in the form it will be handed over in: documented, owned, on standard tooling.",
    items: ["Team", "Processes", "Systems", "Workspace", "Controls", "Operating model"],
    icon: Rocket,
    image: "/images/services/gcc-operations/gcc-ops-workplace.webp",
    imageAlt: "GCC Build Phase - Setting up workplace, infrastructure, engineering pods, and operational controls",
  },
  {
    title: "Operate",
    desc: "NeoIntelli runs the agreed operating layer against service levels while the center's leadership and the client's receiving organization mature.",
    items: ["Stabilize", "Measure", "Improve", "Document", "Develop leadership"],
    icon: RefreshCw,
    image: "/images/services/gcc-operations/gcc-ops-performance.webp",
    imageAlt: "GCC Operate Phase - Managing SLA adherence, service levels, and performance dashboards",
  },
  {
    title: "Transfer",
    desc: "Defined capability moves into the client's organization by readiness criteria, staged by function, team or location.",
    items: ["Employees where applicable", "Process ownership", "Vendors", "Systems", "Records", "Governance", "Knowledge", "Operational control"],
    icon: ArrowRightLeft,
    image: "/images/services/gcc-operations/gcc-real-bot-handover.webp",
    imageAlt: "GCC Transfer Phase - Formal executive transfer and operational control handover ceremony",
  },
];

const botStages = [
  {
    id: "01",
    name: "Build",
    description: "Team, processes, systems, workspace, controls and operating model, built for handover.",
    tagLabel: "Design",
    tagSub: "Standardized",
    icon: Rocket,
  },
  {
    id: "02",
    name: "Operate",
    description: "The operating layer runs to service levels. Leadership focuses on the mandate.",
    tagLabel: "Run",
    tagSub: "SLA-Driven",
    icon: RefreshCw,
  },
  {
    id: "03",
    name: "Stabilize",
    description: "Stable performance, documented processes, settled leadership, trusted reporting.",
    tagLabel: "Stability",
    tagSub: "Runbooks",
    icon: ShieldCheck,
  },
  {
    id: "04",
    name: "Transfer readiness",
    description: "Readiness criteria met and evidenced. Client owners named for every function.",
    tagLabel: "Audited",
    tagSub: "Gates Met",
    icon: CheckSquare,
  },
  {
    id: "05",
    name: "Cutover",
    description: "Employees, records, vendors, systems and control move on a planned date, staged where needed.",
    tagLabel: "Cutover",
    tagSub: "Staged Date",
    icon: ArrowRightLeft,
  },
  {
    id: "06",
    name: "Client ownership",
    description: "The client operates the center directly. NeoIntelli supports on request.",
    tagLabel: "Captive",
    tagSub: "Full Control",
    icon: Award,
  },
];

function BotJourneyLifecycle() {
  return <GccLifecycleWave stages={botStages} id="bot-journey-cycle" />;
}

const readinessGates = [
  {
    id: "gate-perf",
    gate: "GATE 01",
    title: "Stable service performance",
    desc: "Service levels met for an agreed period, not a single good month.",
    icon: Activity,
  },
  {
    id: "gate-docs",
    gate: "GATE 02",
    title: "Documented processes with named client owners",
    desc: "Every operating process has a runbook and a person in the client's organization who will own it.",
    icon: FileText,
  },
  {
    id: "gate-lead",
    gate: "GATE 03",
    title: "Client leadership in seat",
    desc: "The center lead and function leads who will run the center after transfer are hired and settled.",
    icon: Users,
  },
  {
    id: "gate-recv",
    gate: "GATE 04",
    title: "A receiving organization",
    desc: "Client HR, IT, finance and governance functions able to take on what is transferred.",
    icon: Building2,
  },
  {
    id: "gate-rec",
    gate: "GATE 05",
    title: "Records migrated and reconciled",
    desc: "Employee, vendor, asset and control records in the client's systems and checked against the source.",
    icon: Database,
  },
  {
    id: "gate-ven",
    gate: "GATE 06",
    title: "Vendors resolved",
    desc: "Contracts novated where permitted and consented, or replaced by client arrangements before cutover.",
    icon: Building,
  },
  {
    id: "gate-gov",
    gate: "GATE 07",
    title: "Governance running with client chairs",
    desc: "Reviews chaired by the client's leadership before the transfer, not after it.",
    icon: Scale,
  },
  {
    id: "gate-comm",
    gate: "GATE 08",
    title: "Commercial obligations settled",
    desc: "Transfer terms, timing and any post-transfer support agreed in writing.",
    icon: FileCheck,
  },
];

const readinessLeft = [readinessGates[0], readinessGates[2], readinessGates[4], readinessGates[6]];
const readinessRight = [readinessGates[1], readinessGates[3], readinessGates[5], readinessGates[7]];

const assetTransfers = [
  { id: "transfer-emp", text: "Employees", icon: Users },
  { id: "transfer-rec", text: "Employment records", icon: FileText },
  { id: "transfer-proc", text: "Process documentation", icon: BookOpen },
  { id: "transfer-ops", text: "Operating procedures", icon: Settings },
  { id: "transfer-ven", text: "Vendor relationships where contractually transferable", icon: Building },
  { id: "transfer-asset", text: "Asset inventory", icon: HardDrive },
  { id: "transfer-know", text: "Knowledge", icon: Sparkles },
  { id: "transfer-acc", text: "Access ownership", icon: Lock },
  { id: "transfer-rep", text: "Service reporting", icon: BarChart3 },
  { id: "transfer-ctrl", text: "Control evidence", icon: ShieldCheck },
  { id: "transfer-train", text: "Training materials", icon: GraduationCap },
  { id: "transfer-dash", text: "Operating dashboards", icon: LayoutDashboard },
  { id: "transfer-gov", text: "Governance responsibilities", icon: Scale },
];

const transferLeft = [
  assetTransfers[0],
  assetTransfers[2],
  assetTransfers[4],
  assetTransfers[6],
  assetTransfers[8],
  assetTransfers[10],
  assetTransfers[12],
];
const transferRight = [
  assetTransfers[1],
  assetTransfers[3],
  assetTransfers[5],
  assetTransfers[7],
  assetTransfers[9],
  assetTransfers[11],
];

const employeeAreas = [
  "Employment documentation",
  "Tenure treatment",
  "Benefits transition",
  "Payroll cutover",
  "Leave balances",
  "Statutory records",
  "Policy change",
  "Communication",
  "Manager continuity",
];

const comparison = [
  { row: "Who operates local functions", bot: "Partner, until transfer", captive: "Client, from day one", eor: "Employer of record, limited scope", managed: "Partner, for as long as agreed" },
  { row: "Employment vehicle", bot: "Per contract and entity structure, with planned transfer", captive: "Client's India entity", eor: "Third-party employer", managed: "Client's India entity" },
  { row: "End state", bot: "Client-owned and operated center", captive: "Client-owned and operated center", eor: "No built-in path to a center", managed: "Client-owned, partner-operated" },
  { row: "Transfer obligation", bot: "Yes, planned from the start", captive: "Not applicable", eor: "No", managed: "No, optional later" },
  { row: "Best for", bot: "Companies that want to own the center but are not yet ready to run it", captive: "Companies with an India operations organization already in place", eor: "Small pilot teams before an entity exists", managed: "Companies that want to keep leadership on the mandate long term" },
];

export default function BotTransition() {
  const renderReadinessItem = (item: (typeof readinessGates)[0]) => {
    const IconComponent = item.icon;

    return (
      <div
        key={item.id}
        className="flex items-start justify-between gap-3.5 sm:gap-5 py-3 sm:py-3.5 group select-none transition-colors border-b border-[#DCE8F4]/60 last:border-b-0"
      >
        {/* Left: Navy Outline Icon */}
        <div className="shrink-0 text-[#0D244D] group-hover:text-[#008EC4] transition-colors mt-0.5">
          <IconComponent className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[1.8]" />
        </div>

        {/* Middle: Gate Badge, Title & Description */}
        <div className="flex-1 px-1 sm:px-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#008EC4] uppercase px-2 py-0.5 rounded-md bg-[#EDF6FD] border border-[#D5E8F8]">
              {item.gate}
            </span>
          </div>
          <h4 className="text-sm sm:text-[14.5px] font-bold leading-snug text-[#0D244D]">
            {item.title}
          </h4>
          <p className="text-xs text-[#505D74] leading-relaxed mt-1 font-normal">
            {item.desc}
          </p>
        </div>

        {/* Right: Navy Rosette Badge with White Tick */}
        <div className="shrink-0 mt-1">
          <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6" badgeColor="#0D306C" checkColor="#FFFFFF" />
        </div>
      </div>
    );
  };

  const renderTransferItem = (item: (typeof assetTransfers)[0]) => {
    const IconComponent = item.icon;

    return (
      <div
        key={item.id}
        className="flex items-center justify-between gap-3.5 sm:gap-5 py-3 sm:py-3.5 group select-none transition-colors border-b border-[#DCE8F4]/60 last:border-b-0"
      >
        {/* Left: Navy Outline Icon */}
        <div className="shrink-0 text-[#0D244D] group-hover:text-[#008EC4] transition-colors">
          <IconComponent className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[1.8]" />
        </div>

        {/* Middle: Asset Text */}
        <div className="flex-1 px-1 sm:px-2">
          <span className="text-sm sm:text-[14.5px] font-semibold leading-snug text-[#0D244D]">
            {item.text}
          </span>
        </div>

        {/* Right: Navy Rosette Badge with White Tick */}
        <div className="shrink-0">
          <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6" badgeColor="#0D306C" checkColor="#FFFFFF" />
        </div>
      </div>
    );
  };

  return (
    <GccOperationsLayout
      page={page}
      eyebrow="BOT & Transition · GCC Operations"
      heroDescription="Build-Operate-Transfer with the transfer designed in from the first month: team, processes, systems, workspace and controls built to hand over, an operate stage measured against readiness criteria, and a staged transition of employees, records, vendors, knowledge and control into your organization."
      secondaryCta={{ label: "See the BOT journey", href: "#bot-journey" }}
      contextualLink={{ label: "Starting from scratch? Explore GCC Setup & Launch →", href: PILLAR_LINKS.gccSetupLaunch }}
      cta={{
        title: "Plan a transition that does not disrupt the center.",
        description: "A working session on your intended end state, entity timing, readiness criteria and how employees, vendors, systems and control would move.",
        secondary: { label: "See the full operating layer", href: GCC_OPERATIONS_BASE },
      }}
    >
      {/* SECTION 1: Strategic Position & InBrief */}
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
              BOT &amp; TRANSITION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Ownership is the destination. The operating layer is the vehicle.
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Most companies that choose Build-Operate-Transfer want the same thing: a center they own, staffed by their people, run under their governance, without building every local function before day one.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              Transferability is engineered from month one: zero proprietary lock-in, clear control gates.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              NeoIntelli builds the operating layer to transfer, runs it until readiness criteria are evidenced, and hands over operational control in stages you dictate.
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
              imageSrc="/images/services/gcc-operations/gcc-real-bot-handover.webp"
              imageAlt="GCC Build-Operate-Transfer Handover Operations"
            >
              BOT &amp; Transition is NeoIntelli&apos;s Build-Operate-Transfer service for companies that want to own their India GCC but do not want to build every local operating function before the first team is productive. NeoIntelli builds the team, processes, systems, workspace and controls, operates the agreed operating layer until readiness criteria are met, and then transfers employees where applicable, process ownership, vendors, systems, records, governance and operational control into the client&apos;s organization. Every process is documented for transfer from day one. Transfer mechanics depend on the contract and entity structure.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: Three Stages of BOT */}
      <OpsSection
        id="three-stages"
        eyebrow="TRANSFER BY DESIGN"
        title="BOT should be designed for transfer from day one."
        intro="Three stages, one design principle: nothing is built in a form that only NeoIntelli can run. Exact transfer mechanics depend on the contract and the entity structure."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                const el = document.getElementById("bot-journey");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5"
            >
              {/* TOP WHITE CONTENT SECTION */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
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
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-[13px] text-[#2B3D66]">
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
                <Image
                  src={stage.image}
                  alt={stage.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </OpsSection>

      {/* SECTION 3: The BOT Journey Lifecycle */}
      <OpsSection
        id="bot-journey"
        eyebrow="THE BOT JOURNEY"
        title="From build to client ownership."
        intro="Six steps. The two in the middle, stabilize and transfer readiness, are the ones most BOT arrangements skip, and the ones that decide whether the cutover is a milestone or a crisis."
        align="center"
        width="wide"
      >
        <BotJourneyLifecycle />
      </OpsSection>

      {/* SECTION 4: Transfer Readiness Criteria */}
      <OpsSection
        id="readiness"
        eyebrow="READINESS GATES"
        title="What ready to transfer actually means."
        intro="Readiness criteria are agreed at the start and evidenced before cutover. They replace the calendar as the trigger for transfer."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
            <div className="space-y-1 sm:space-y-2">
              {readinessLeft.map(renderReadinessItem)}
            </div>
            <div className="space-y-1 sm:space-y-2">
              {readinessRight.map(renderReadinessItem)}
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 5: What Transfers at Cutover */}
      <OpsSection
        id="what-transfers"
        eyebrow="ASSET TRANSFER"
        title="What should transfer."
        intro="A checklist for the transfer plan. Each item has a client owner, a source, a destination and a reconciliation step."
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
            <div className="space-y-1 sm:space-y-2">
              {transferLeft.map(renderTransferItem)}
            </div>
            <div className="space-y-1 sm:space-y-2">
              {transferRight.map(renderTransferItem)}
            </div>
          </div>
        </div>

        <SourceNote className="mt-8 max-w-5xl mx-auto">
          Third-party contracts transfer only where the contract allows it and any required consent is obtained. Where consent is not available, a replacement arrangement is planned and in place before cutover. NeoIntelli does not promise the transfer of third-party contracts it does not control.
        </SourceNote>
      </OpsSection>

      {/* SECTION 6: Employee Transfer Continuity */}
      <OpsSection
        id="employee-transfer"
        eyebrow="PEOPLE CONTINUITY"
        title="Employee continuity should be planned early."
        intro="People are the most important thing that moves, and the area where a general promise is least useful. The transition plan covers each of these areas explicitly for the specific structure in use."
        theme="navy"
        align="center"
        width="wide"
        wavesOnMobile
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-1 sm:gap-y-2 max-w-5xl mx-auto" aria-label="Employee transition areas">
          {employeeAreas.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 py-3 group select-none transition-colors border-b border-white/10"
            >
              <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              <span className="text-sm sm:text-[14.5px] font-semibold text-white/90 leading-snug group-hover:text-[#38BDF8] transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>

        <SourceNote theme="dark" className="mt-8 max-w-5xl mx-auto">
          Treatment of tenure, gratuity, equity, tax and benefit continuity depends on the employment structure, the contract and applicable law. NeoIntelli plans the operating side of the transition and does not make universal claims about these outcomes. {LEGAL_VALIDATION_NOTE}
        </SourceNote>

        <p className="mt-8 text-sm text-slate-300 text-center max-w-2xl mx-auto">
          The day-to-day employee lifecycle before and after transfer is covered under{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/people-hr-operations`} className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-4 decoration-[#38BDF8]/40 transition-colors">
            People &amp; HR Operations
          </Link>.
        </p>
      </OpsSection>

      {/* SECTION 7: Transferability Principle */}
      <OpsSection
        id="transferability"
        eyebrow="CORE PRINCIPLE"
        title="If the operating model cannot transfer, it is not truly BOT-ready."
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto text-[#505D74] text-base sm:text-lg leading-relaxed space-y-4 font-normal text-left">
          <TypewriterParagraph
            text="The test of a BOT-ready operating model is simple: could the client's organization run it tomorrow with the documentation, systems and records it has access to today? If the answer depends on NeoIntelli-only processes, undocumented knowledge or partner-only tooling, the model is not ready, whatever the contract says."
          />
          <p>
            NeoIntelli designs around documented processes, defined ownership, service levels, standard tooling, employee and vendor records in transferable systems, controls with evidence, knowledge transfer during the operate stage, transition governance and clear commercial obligations. The full list is on the{" "}
            <Link to={`${GCC_OPERATIONS_BASE}#managed-bot-captive`} className={link}>GCC Operations overview</Link>.
          </p>
        </div>
      </OpsSection>

      {/* SECTION 8: Model Comparison Table */}
      <OpsSection
        id="compare"
        eyebrow="OPERATING MODELS"
        title="BOT compared with captive, EOR and managed services."
        intro="The models are often confused because the operate stage can look similar from the outside. The end state and the obligations are different."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="overflow-x-auto rounded-2xl border border-[#DCE8F4] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.04)] max-w-6xl mx-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <caption className="sr-only">Comparison of BOT, captive, EOR and managed services models</caption>
            <thead className="bg-[#0D306C] text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Factor</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Build-Operate-Transfer</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Captive from day one</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">EOR</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Managed services</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F4]">
              {comparison.map((row) => (
                <tr key={row.row} className="hover:bg-[#169DC8]/[0.03] transition-colors">
                  <th scope="row" className="px-6 py-4.5 text-[#0D306C] font-extrabold text-sm whitespace-nowrap">{row.row}</th>
                  <td className="px-6 py-4.5 text-[#0D244D] font-medium text-sm leading-relaxed">{row.bot}</td>
                  <td className="px-6 py-4.5 text-[#505D74] text-sm leading-relaxed">{row.captive}</td>
                  <td className="px-6 py-4.5 text-[#505D74] text-sm leading-relaxed">{row.eor}</td>
                  <td className="px-6 py-4.5 text-[#505D74] text-sm leading-relaxed">{row.managed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-sm text-[#505D74] text-center max-w-2xl mx-auto">
          Comparing a GCC with outsourcing altogether? Read{" "}
          <Link to="/gcc-vs-outsourcing" className={link}>GCC vs Outsourcing</Link>. Weighing entity timing and cost? Use the{" "}
          <Link to={PILLAR_LINKS.costCalculator} className={link}>GCC Cost Calculator</Link>.
        </p>
      </OpsSection>

      {/* SECTION 9: FAQs */}
      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about GCC Build-Operate-Transfer"
        intro={LEGAL_VALIDATION_NOTE}
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
