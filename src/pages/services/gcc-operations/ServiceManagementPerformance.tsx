"use client";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Layers,
  FileCheck,
  ShieldCheck,
  Scale,
  GitBranch,
  Target,
  Clock,
  AlertTriangle,
  LayoutDashboard,
  FileSpreadsheet,
  Workflow,
  Sparkles,
  Award,
  BarChart2,
  CheckSquare,
  ArrowRight,
  Filter,
  Check,
  Cpu,
  Bot,
  Zap,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import GccPerformanceFramework from "@/components/gcc-operations/GccPerformanceFramework";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import SourceNote from "@/components/gcc-operations/SourceNote";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("performance");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const capabilities = [
  { title: "Service catalogue", desc: "Every service the center provides, with scope, owner and intake route.", icon: Layers },
  { title: "Service ownership", desc: "A named owner accountable for each service's performance and improvement.", icon: Award },
  { title: "SLAs", desc: "Commitments agreed with the people who consume the service, not imposed on them.", icon: CheckCircle2 },
  { title: "OLAs where relevant", desc: "Internal agreements between teams that together deliver a service.", icon: GitBranch },
  { title: "RACI", desc: "Who is responsible, accountable, consulted and informed for each service and decision.", icon: Scale },
  { title: "Intake model", desc: "How work enters the center, how it is prioritized and who says no.", icon: Filter },
  { title: "Delivery workflows", desc: "The standard path from request to delivered outcome, with hand-offs made explicit.", icon: Workflow },
  { title: "KPI framework", desc: "A short set of outcome measures across delivery, service, talent, value and risk.", icon: Target },
  { title: "Operating rhythm", desc: "Weekly, monthly and quarterly reviews with defined inputs, decisions and outputs.", icon: Clock },
  { title: "Escalation model", desc: "What escalates, to whom, and how quickly, within the center and to headquarters.", icon: AlertTriangle },
  { title: "Executive dashboards", desc: "The center's performance in one view that leadership and headquarters both trust.", icon: LayoutDashboard },
  { title: "Stakeholder reporting", desc: "Reporting tuned to what each stakeholder decides, not a single pack for everyone.", icon: FileSpreadsheet },
  { title: "Automation backlog", desc: "A scored, owned list of automation and AI opportunities with a delivery rhythm.", icon: Cpu },
  { title: "Continuous improvement", desc: "Root-cause practice, retrospectives and improvement actions tracked to closure.", icon: Sparkles },
  { title: "Maturity roadmap", desc: "A phased plan from execution to ownership to innovation, with milestones and evidence.", icon: TrendingUp },
  { title: "Benchmarking", desc: "Structured comparison of operating practices, used to inform targets rather than replace them.", icon: BarChart2 },
  { title: "Value realization tracking", desc: "The link between what the center delivers and the outcomes headquarters funded it for.", icon: ShieldCheck },
];

interface PerformanceLoopStep {
  id: string;
  name: string;
  description: string;
  tag: "definition" | "cadence" | "improvement";
  tagLabel: string;
  tagSub: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
}

const performanceStages: PerformanceLoopStep[] = [
  {
    id: "01",
    name: "Service",
    description: "Defined, owned, in the catalogue.",
    tag: "definition",
    tagLabel: "Catalogue",
    tagSub: "Owned",
    icon: Layers,
    x: 90,
    y: 110,
  },
  {
    id: "02",
    name: "SLA",
    description: "Agreed with the consumer.",
    tag: "definition",
    tagLabel: "Commitment",
    tagSub: "Consensual",
    icon: CheckCircle2,
    x: 270,
    y: 240,
  },
  {
    id: "03",
    name: "KPI",
    description: "Outcome measures, not activity.",
    tag: "definition",
    tagLabel: "Outcomes",
    tagSub: "Objective",
    icon: Target,
    x: 450,
    y: 110,
  },
  {
    id: "04",
    name: "Operating review",
    description: "Weekly, monthly, quarterly.",
    tag: "cadence",
    tagLabel: "Cadence",
    tagSub: "Rigorous",
    icon: Clock,
    x: 630,
    y: 240,
  },
  {
    id: "05",
    name: "Root cause",
    description: "Why the number moved.",
    tag: "cadence",
    tagLabel: "Analysis",
    tagSub: "Root Cause",
    icon: AlertTriangle,
    x: 810,
    y: 110,
  },
  {
    id: "06",
    name: "Improvement",
    description: "Owned actions to closure.",
    tag: "improvement",
    tagLabel: "Remediation",
    tagSub: "Closed Loop",
    icon: Sparkles,
    x: 990,
    y: 240,
  },
  {
    id: "07",
    name: "Automation",
    description: "Backlog, scored, delivered.",
    tag: "improvement",
    tagLabel: "Engineering",
    tagSub: "Delivered",
    icon: Cpu,
    x: 1170,
    y: 110,
  },
  {
    id: "08",
    name: "Value",
    description: "Reported against the mandate.",
    tag: "improvement",
    tagLabel: "Realization",
    tagSub: "Enterprise",
    icon: ShieldCheck,
    x: 1350,
    y: 240,
  },
];

/**
 * Performance Loop Lifecycle Component
 * Consolidated via UniversalLifecycle (8 stages)
 */
function PerformanceLoopLifecycle() {
  return (
    <UniversalLifecycle
      stages={performanceStages}
      id="performance-loop-cycle"
    />
  );
}

const measureThrough = [
  "Ownership",
  "Business outcome",
  "Delivery reliability",
  "Quality",
  "Cycle time",
  "Innovation",
  "AI enablement",
  "Customer and stakeholder value",
  "Risk",
  "Cost",
  "Talent health",
];

const notOnly = [
  "Number of people hired",
  "Utilization",
  "Tickets closed",
  "Hours worked",
];

const progression = [
  { label: "Eliminate", note: "Remove unnecessary work before touching anything else.", icon: Filter },
  { label: "Standardize", note: "Make the process repeatable and measurable.", icon: Workflow },
  { label: "Automate", note: "Deterministic workflow automation for stable, frequent steps.", icon: Zap },
  { label: "Assist", note: "Copilots and GenAI for drafting, search, triage and summarization.", icon: Bot },
  { label: "Agent-enable", note: "Controlled AI agents only where autonomy is justified and the fallback is in place.", icon: Cpu },
];

const cadence = [
  { when: "Weekly", who: "Service owners", what: "Service levels, incidents, intake, blockers. Small corrections, fast." },
  { when: "Monthly", who: "Center leadership", what: "KPIs against targets, improvement actions, automation backlog, people and risk signals." },
  { when: "Quarterly", who: "Headquarters and center leadership", what: "Business review: outcomes against the mandate, value realization, maturity, next-quarter commitments and mandate expansion." },
  { when: "Annually", who: "Sponsors", what: "Targets, the measurement framework itself, the service catalogue and the maturity roadmap." },
];

const pitfalls = [
  {
    title: "Metric overload",
    desc: "A long list of KPIs is the same as none. Keep to a short set tied to enterprise value.",
    badge: "FAILURE MODE 01",
    image: "/images/gcc-operations/gcc-ops-performance.webp",
    aspect: "aspect-[4/3]",
    points: [
      "Vanity metric accumulation",
      "Executive dashboard noise",
      "Diluted operational focus",
      "Remedy: 5-pillar outcome KPIs",
    ],
  },
  {
    title: "Process improvement without service design",
    desc: "Optimizing a process inside a badly designed service moves the bottleneck rather than removing it.",
    badge: "FAILURE MODE 02",
    image: "/images/gcc-operations/gcc-arch-teams.webp",
    aspect: "aspect-[16/10]",
    points: [
      "Sub-optimized local silos",
      "Shifted bottleneck impact",
      "Disconnected upstream hand-offs",
      "Remedy: Service catalogue definition",
    ],
  },
  {
    title: "Automation as a one-off project",
    desc: "Automation needs a continuous backlog with owners, scoring and a delivery rhythm, not a one-quarter campaign.",
    badge: "FAILURE MODE 03",
    image: "/images/gcc-operations/gcc-ops-scale.webp",
    aspect: "aspect-[4/3]",
    points: [
      "Abandoned workflow scripts",
      "Lack of ongoing maintenance",
      "Diminishing ROI over time",
      "Remedy: Scored automation backlog",
    ],
  },
  {
    title: "Maturity claimed, not evidenced",
    desc: "Self-rated maturity is rarely accepted by headquarters. Evidence is what unlocks scope expansion.",
    badge: "FAILURE MODE 04",
    image: "/images/gcc-operations/gcc-ops-governance.webp",
    aspect: "aspect-[16/10]",
    points: [
      "Subjective internal scores",
      "Headquarters skepticism",
      "Stalled expansion mandates",
      "Remedy: Verifiable SLA audit trails",
    ],
  },
  {
    title: "No manager enablement",
    desc: "New operating models fail when the managers who run them day to day were never trained on them.",
    badge: "FAILURE MODE 05",
    image: "/images/gcc-operations/gcc-hq-leadership.webp",
    aspect: "aspect-[4/3]",
    points: [
      "Superficial process adoption",
      "Reversion to informal habits",
      "Inconsistent review cadence",
      "Remedy: Structured manager coaching",
    ],
  },
  {
    title: "No early visible wins",
    desc: "Without something visible early, the operating model loses sponsor patience before it compounds.",
    badge: "FAILURE MODE 06",
    image: "/images/gcc-operations/gcc-positioning-tower.webp",
    aspect: "aspect-[16/10]",
    points: [
      "Loss of headquarters patience",
      "Delayed value realization",
      "Skepticism on return on investment",
      "Remedy: 90-day velocity sprints",
    ],
  },
];

export default function ServiceManagementPerformance() {
  return (
    <GccOperationsLayout
      page={page}
      eyebrow="Service Management & Performance · GCC Operations"
      heroDescription="Service catalogue, service levels, outcome KPIs, operating cadence, escalation, dashboards, an automation backlog and continuous improvement: the system that lets headquarters see what the center delivers and lets the center earn a larger mandate."
      secondaryCta={{ label: "See the performance framework", href: "#performance-framework" }}
      contextualLink={{ label: "Automating operating processes? Explore AI Engineering →", href: PILLAR_LINKS.aiEngineering }}
      cta={{
        title: "Review how your GCC is run and measured.",
        description: "A review of your service catalogue, KPIs, operating cadence and automation backlog, with a view on what to change first.",
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
              SERVICE MANAGEMENT &amp; PERFORMANCE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Better-run centers earn larger mandates<span className="text-[#008EC4]">.</span>
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Many GCCs reach a ceiling some time after the initial mandate is delivered. The team has scaled, but headquarters does not expand scope, because the operating model has not shown it can absorb more.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              A catalogue of owned services, rigorous outcome KPIs, and continuous automation compound maturity.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Service Management &amp; Performance operates the measurement rhythms, dashboards, and automated service levels that let leadership demonstrate verified enterprise value.
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
              imageSrc="/images/gcc-operations/gcc-ops-performance.webp"
              imageAlt="GCC Service Management & Performance Operations"
            >
              Service Management &amp; Performance is the part of NeoIntelli&apos;s GCC operating layer that defines the services the center provides, the levels it commits to, the outcome measures it is judged on and the cadence in which performance is reviewed and improved. It is for GCC leaders and headquarters sponsors who need evidence of value beyond headcount and cost, and for centers whose KPIs measure activity rather than outcomes. NeoIntelli designs the service catalogue, SLAs, KPI framework and operating rhythm, runs the reviews, maintains the automation backlog and reports to headquarters.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: Capabilities Grid */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What service management and performance covers."
        intro="Seventeen core disciplines spanning service definition, performance governance, reporting, and continuous automation."
        tone="muted"
        align="center"
        width="wide"
      >
        <CapabilityGrid variant="performance" items={capabilities} rowPattern={[4, 4, 4, 5]} />
      </OpsSection>

      {/* SECTION 3: The Performance Loop Lifecycle */}
      <OpsSection
        id="performance-loop"
        eyebrow="THE PERFORMANCE LOOP"
        title="From service definition to reported value."
        intro="The loop closes every cycle. A number that moves gets a root cause, an owned action and, where it repeats, an automation candidate."
        align="center"
        width="wide"
      >
        <PerformanceLoopLifecycle />
      </OpsSection>

      {/* SECTION 4: Headcount to Outcomes Contrast Panel */}
      <OpsSection
        id="headcount-to-outcomes"
        eyebrow="CAPABILITY METRICS"
        title="Headcount is an input. Capability is the outcome."
        intro="GCC maturity should increasingly be measured through what the center owns and produces. Inputs still get tracked, but they are not the story the center tells headquarters."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="rounded-2xl border border-[#DCE8F4] overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Left Side: Navy Blue - Measure maturity through */}
          <div className="bg-[#0D244D] text-white p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1B3663]">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#123164] border border-[#1E4D94] flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Check className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Measure maturity through
                </h3>
              </div>

              {/* 3-Column Points with Transparent Arrows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-2.5 sm:gap-y-3">
                {measureThrough.map((item) => (
                  <div key={item} className="flex items-center gap-2 group/item select-none">
                    <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 stroke-[2.5] transition-transform duration-200 group-hover/item:translate-x-0.5" />
                    <span className="text-[12.5px] sm:text-[13px] font-medium text-white/90 leading-snug group-hover/item:text-[#38BDF8] transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: White - Do not measure success only by */}
          <div className="bg-white text-[#2B3D66] p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EDF6FD] border border-[#D5E8F8] flex items-center justify-center text-[#008EC4] shrink-0">
                  <Filter className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0D244D] tracking-tight">
                  Do not measure success only by
                </h3>
              </div>

              {/* Points with Transparent Arrows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                {notOnly.map((item) => (
                  <div key={item} className="flex items-center gap-2 group/item select-none">
                    <ArrowRight className="w-3.5 h-3.5 text-[#008EC4] shrink-0 stroke-[2.5] transition-transform duration-200 group-hover/item:translate-x-0.5" />
                    <span className="text-[12.5px] sm:text-[13px] font-medium text-[#0D244D] leading-snug group-hover/item:text-[#008EC4] transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#EDF3FB] text-[#505D74] text-xs sm:text-[13px] leading-relaxed font-normal">
                These are useful operational signals. As the only measure of success, they reward busy centers rather than valuable ones.
              </p>
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 5: Outcome KPIs Framework */}
      <OpsSection
        id="performance-framework"
        eyebrow="OUTCOME KPIS"
        title="The measures an operating review actually reads."
        align="center"
        width="wide"
      >
        <GccPerformanceFramework />
      </OpsSection>

      {/* SECTION 6: The Operating Rhythm Table */}
      <OpsSection
        id="operating-rhythm"
        eyebrow="GOVERNANCE CADENCE"
        title="The operating rhythm."
        intro="A cadence with defined inputs, decisions and outputs at each level. The point is that problems are seen at the level that can fix them, and headquarters sees outcomes rather than noise."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="overflow-x-auto rounded-2xl border border-[#DCE8F4] bg-white shadow-[0_4px_24px_rgba(13,48,108,0.04)] max-w-6xl mx-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <caption className="sr-only">Operating rhythm by cadence, participants and content</caption>
            <thead className="bg-[#0D306C] text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Cadence</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">Who</th>
                <th scope="col" className="px-6 py-4 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white">What is reviewed and decided</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F4]">
              {cadence.map((row) => (
                <tr key={row.when} className="hover:bg-[#169DC8]/[0.03] transition-colors">
                  <th scope="row" className="px-6 py-5 text-[#0D306C] font-extrabold text-sm whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-[#EDF6FD] text-[#008EC4] font-mono text-xs border border-[#D5E8F8]">
                      {row.when}
                    </span>
                  </th>
                  <td className="px-6 py-5 text-[#0D244D] font-bold text-sm whitespace-nowrap">{row.who}</td>
                  <td className="px-6 py-5 text-[#505D74] text-sm leading-relaxed">{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OpsSection>

      {/* SECTION 7: AI and Automation Progression */}
      <OpsSection
        id="ai-and-automation"
        eyebrow="AUTOMATION PROGRESSION"
        title="Eliminate, standardize, automate, assist, agent-enable."
        intro="The progression matters more than the tooling. Each step makes the next one cheaper and safer, and not every workflow should reach the last step."
        align="center"
        width="wide"
      >
        {/* 5-Step Progression using Half-Sink Slot Count */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center max-w-6xl mx-auto mb-12">
          {progression.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.label}
                className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Slotted Step Number Design matching reference image */}
                  <SlottedStepNumber index={index} />

                  <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors">
                    {step.label}
                  </h3>

                  <p className="text-[#505D74] text-xs leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                    {step.note}
                  </p>
                </div>

                <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                  <StepIcon className="w-6 h-6 stroke-[1.8]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Split Container: What NeoIntelli can implement (Navy) vs What NeoIntelli does not recommend (White) */}
        <div className="rounded-2xl border border-[#DCE8F4] overflow-hidden bg-white shadow-sm grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Left Side: Navy Blue - What NeoIntelli can implement */}
          <div className="bg-[#0D244D] text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1B3663]">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#123164] border border-[#1E4D94] flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  What NeoIntelli can implement
                </h3>
              </div>

              {/* Paragraph format after heading */}
              <div className="text-white/90 text-sm sm:text-base leading-relaxed space-y-3.5 font-normal">
                <p>
                  Workflow automation for stable operating processes, copilots for triage, drafting, search and reporting, and controlled agents for specific workflows where the data, the controls and the fallback are in place.
                </p>
                <p>
                  Implementation runs through NeoIntelli&apos;s AI Engineering practice and its process automation service.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-sm flex items-center gap-2">
                <Link to={PILLAR_LINKS.aiEngineering} className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-4 decoration-[#38BDF8]/40 transition-colors">
                  AI Engineering
                </Link>
                <span className="text-white/40"> · </span>
                <Link to={PILLAR_LINKS.processAutomation} className="text-[#38BDF8] hover:text-white font-semibold underline underline-offset-4 decoration-[#38BDF8]/40 transition-colors">
                  Process automation
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: White - What NeoIntelli does not recommend */}
          <div className="bg-white text-[#2B3D66] p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#EDF6FD] border border-[#D5E8F8] flex items-center justify-center text-[#008EC4] shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D244D] tracking-tight">
                  What NeoIntelli does not recommend
                </h3>
              </div>

              {/* Paragraph format after heading */}
              <div className="text-[#505D74] text-sm sm:text-base leading-relaxed space-y-3.5 font-normal">
                <p>
                  Autonomous agents for every workflow. Automation of processes that have not been standardized.
                </p>
                <p>
                  Automation measured by the number of bots rather than by cycle time, error rate and capacity returned to the team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 8: Where Performance Programs Go Wrong (Editorial Grid) */}
      <OpsSection
        id="pitfalls"
        eyebrow="RISK MITIGATION"
        title="Where performance programs go wrong."
        intro="Six systemic failure patterns that stall GCC maturity and how NeoIntelli engineers around them."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {pitfalls.map((pitfall) => (
            <div
              key={pitfall.title}
              className="flex flex-col text-left bg-transparent border-0 shadow-none p-0 group"
            >
              {/* Image Frame */}
              <div className="relative w-full overflow-hidden rounded-none border border-[#0D306C]/15 mb-4 bg-[#0D244D]">
                <div className={`relative w-full ${pitfall.aspect} overflow-hidden`}>
                  <Image
                    src={pitfall.image}
                    alt={pitfall.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D244D]/85 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-white uppercase px-2.5 py-1 bg-[#0D244D]/80 backdrop-blur-md border border-white/20 font-semibold">
                    {pitfall.badge}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-[#0D244D] font-extrabold text-lg sm:text-xl tracking-tight leading-snug mb-2 group-hover:text-[#008EC4] transition-colors">
                {pitfall.title}
              </h3>

              <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed mb-4">
                {pitfall.desc}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1.5 mb-5 pt-2 border-t border-[#D5E3EE]/70">
                {pitfall.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#2B3D66] font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#169DC8] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SourceNote className="mt-8">
          This page replaces the earlier Operations Excellence page. Percentage productivity and automation claims from that page have been removed because they were not supported by a source or a measured NeoIntelli result. Targets are agreed per engagement.
        </SourceNote>
      </OpsSection>

      {/* SECTION 9: FAQs */}
      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about GCC service management and performance"
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
