"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Users,
  Database,
  Cpu,
  BarChart3,
  Bot,
  Layers,
  Workflow,
  Search,
  Sparkles,
  ShieldCheck,
  Compass,
  Globe,
  Building2,
  Shield,
  TrendingUp,
  FileText,
  Settings,
  UsersRound,
  Plus,
  Minus,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

interface ChecklistItem {
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

export type AsideVariant =
  | {
    type: "definition";
    title: string;
    paragraphs: string[];
  }
  | {
    type: "flow";
    title: string;
    paragraphs?: string[];
    steps: string[];
    icons?: LucideIcon[];
    footerNote?: string;
  }
  | {
    type: "models";
    title: string;
    paragraphs?: string[];
    models: { name: string; summary: string }[];
  };

export interface CapabilityItem {
  id: string;
  tabNumber: string;
  navLabel: string;
  titleName: string;
  eyebrowLabel: string;
  subheading: string;
  body: string;
  icon: LucideIcon;
  checklist: ChecklistItem[];
  primaryCta: {
    label: string;
    mobileLabel?: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    mobileLabel?: string;
    href: string;
  };
  aside: AsideVariant;
  image?: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  // 01 — AI GCC (Flagship)
  {
    id: "ai-gcc",
    tabNumber: "01",
    navLabel: "AI GCC",
    titleName: "AI GCC",
    eyebrowLabel: "FLAGSHIP SERVICE",
    subheading: "Build an India capability center designed around AI from day one.",
    body: "An AI GCC is designed backwards from the AI and data work it is meant to own. Strategy, specialist talent, data foundations, generative and agentic AI, MLOps, AI infrastructure and governance are set as one operating model rather than added to a delivery center afterwards.",
    icon: Cpu,
    checklist: [
      { label: "AI strategy and the mandate the center owns", icon: Target },
      { label: "Specialist AI, data and platform talent", icon: Users },
      { label: "Data foundations, GenAI and Agentic AI in production", icon: Database },
      { label: "MLOps, AI infrastructure and AI governance", icon: Cpu },
      { label: "The operating model that holds it together", icon: BarChart3 },
    ],
    primaryCta: {
      label: "Explore AI GCC",
      href: "/services/ai-gcc",
    },
    secondaryCta: {
      label: "Already operate a GCC? Transform it for AI",
      mobileLabel: "Transform an existing GCC",
      href: "/services/gcc/modernization-transformation",
    },
    aside: {
      type: "definition",
      title: "What is an AI GCC?",
      paragraphs: [
        "An AI GCC is a Global Capability Center designed around AI, data and engineering capability as part of its core operating model.",
        "It combines specialist talent, data and AI platforms, production engineering, model and agent operations, governance and enterprise ownership inside a dedicated capability center rather than treating AI as a separate innovation project.",
      ],
    },
    image: "/images/ai_gcc_cubes.webp",
  },

  // 02 — BUILD THE TEAM
  {
    id: "ai-talent",
    tabNumber: "02",
    navLabel: "Build the Team",
    titleName: "AI Talent",
    eyebrowLabel: "BUILD THE TEAM",
    subheading: "Hire AI specialists your technical team does not need to screen from zero.",
    body: "Specialist sourcing across the AI and data disciplines, with NeoHireX carrying the screening and practicing AI engineers carrying the technical validation. Your engineers spend interview time choosing between credible candidates instead of filtering the pipeline.",
    icon: Users,
    checklist: [
      { label: "GenAI and Agentic AI practitioners", icon: Bot },
      { label: "Machine learning and data science specialists", icon: Database },
      { label: "Data engineering & real-time pipeline experts", icon: Layers },
      { label: "MLOps, LLMOps and AI platform architects", icon: Workflow },
      { label: "AI leadership and executive talent search", icon: Search },
    ],
    primaryCta: {
      label: "Explore AI Talent",
      href: "/services/ai-talent",
    },
    secondaryCta: {
      label: "See how NeoHireX supports hiring at scale",
      mobileLabel: "NeoHireX hiring at scale",
      href: "/services/ai-talent/recruitment-hub",
    },
    aside: {
      type: "flow",
      title: "How a shortlist is built",
      footerNote: "A 5-stage technical screening sequence taking candidates from initial sourcing to an engineer-validated shortlist.",
      steps: [
        "Source",
        "NeoHireX screen",
        "AI first round",
        "Senior technical validation",
        "Qualified shortlist",
      ],
      icons: [Search, Cpu, Bot, Users, ShieldCheck],
    },
  },

  // 03 — BUILD THE AI
  {
    id: "ai-engineering",
    tabNumber: "03",
    navLabel: "Build the AI",
    titleName: "AI Engineering",
    eyebrowLabel: "BUILD THE AI",
    subheading: "Take AI from proof of value to production.",
    body: "AI prototypes are easy. Production AI is not. Getting there needs data, software engineering, integration, evaluation, observability, security, operations and unit economics treated as one engineering problem rather than a demo that has to be hardened later.",
    icon: Layers,
    checklist: [
      { label: "Generative and Agentic AI architectures", icon: Sparkles },
      { label: "Applied machine learning & vector retrieval pipelines", icon: Cpu },
      { label: "Enterprise data engineering for real-time inference", icon: Database },
      { label: "AI product engineering, guardrails and evaluation", icon: ShieldCheck },
      { label: "MLOps, LLMOps, AgentOps & cost observability", icon: BarChart3 },
    ],
    primaryCta: {
      label: "Explore AI Engineering",
      href: "/services/ai-engineering",
    },
    secondaryCta: {
      label: "AI Agents & Automation",
      href: "/services/ai-engineering/ai-agents-automation",
    },
    aside: {
      type: "definition",
      title: "AI prototypes are easy. Production AI is not.",
      paragraphs: [
        "What separates the two is rarely the model. It is the data it runs on, the systems it integrates with, the evaluation that proves it works, the observability that catches it when it stops, the security and governance around it, and the cost per outcome once real traffic arrives.",
      ],
    },
    image: "/images/mosaic_ai_eng.webp",
  },

  // 04 — DEPLOY THE TEAM
  {
    id: "delivery-teams",
    tabNumber: "04",
    navLabel: "Deploy the Team",
    titleName: "AI Delivery Teams",
    eyebrowLabel: "DEPLOY THE TEAM",
    subheading: "Deploy an AI team that owns delivery.",
    body: "AI Talent is how you hire people. AI Delivery Teams is how you deploy execution capability: a senior-led team working inside your roadmap, repositories and release cadence, accountable for the outcome rather than for supplying CVs.",
    icon: Workflow,
    checklist: [
      { label: "Work directly inside your roadmap and repositories", icon: Workflow },
      { label: "Senior-led, accountable for delivered outcomes", icon: Users },
      { label: "Scale the squad up or down against roadmap needs", icon: TrendingUp },
      { label: "A defined, contractually guaranteed path to captive transfer", icon: ShieldCheck },
      { label: "Embedded squads for GenAI and platform engineering", icon: Layers },
    ],
    primaryCta: {
      label: "Explore AI Delivery Teams",
      href: "/services/ai-delivery-teams",
    },
    secondaryCta: {
      label: "Explore Delivery Pods",
      href: "/services/ai-delivery-teams/ai-delivery-pod",
    },
    aside: {
      type: "models",
      title: "Four engagement models",
      paragraphs: [
        "Deploy senior-led execution squads engineered to work directly within your product roadmaps, code repositories and release cadence.",
        "From embedded delivery pods tackling single high-impact models to dedicated full-stack teams with a contractually assured captive transfer path.",
      ],
      models: [
        { name: "Dedicated AI Engineering Team", summary: "A stable team on your ongoing AI roadmap." },
        { name: "AI Delivery Pod", summary: "A cross-functional squad on one production outcome." },
        { name: "Forward-Deployed AI Engineers", summary: "Embedded where the production problem lives." },
        { name: "AI Team Build & Transfer", summary: "Deliver now, own the capability later." },
      ],
    },
  },

  // 05 — DESIGN & LAUNCH
  {
    id: "gcc-strategy",
    tabNumber: "05",
    navLabel: "Design & Launch",
    titleName: "GCC Strategy & Setup",
    eyebrowLabel: "DESIGN & LAUNCH THE CENTER",
    subheading: "Design the GCC around the mandate, not the headcount.",
    body: "A GCC is an ownership decision before it is a location decision. What the center is meant to own determines the operating model, the city, the workforce plan and the launch sequence, so the mandate is settled first and the build follows from it.",
    icon: Compass,
    checklist: [
      { label: "Business case and mandate", icon: Target },
      { label: "Operating model and governance design", icon: Compass },
      { label: "Location strategy and workforce plan", icon: Globe },
      { label: "Entity, workplace, IT and launch", icon: Building2 },
      { label: "Modernization of an existing center", icon: Sparkles },
    ],
    primaryCta: {
      label: "Explore GCC Strategy & Setup",
      href: "/services/gcc",
    },
    secondaryCta: {
      label: "Start with the GCC business case",
      mobileLabel: "GCC business case",
      href: "/services/gcc/strategy-business-case",
    },
    aside: {
      type: "definition",
      title: "A GCC is an ownership decision before it is a location decision.",
      paragraphs: [
        "Deciding what the center owns settles almost everything downstream: which roles you hire, which city can supply them, how the work is governed, and whether the end state is a managed center or a captive one.",
      ],
    },
    image: "/images/mosaic_gcc_strat.webp",
  },

  // 06 — RUN & SCALE
  {
    id: "gcc-operations",
    tabNumber: "06",
    navLabel: "Run & Scale",
    titleName: "GCC Operations",
    eyebrowLabel: "RUN & SCALE THE GCC",
    subheading: "Operate the local GCC systems while your leadership owns the mandate.",
    body: "The local operating layer runs day to day: people and HR, workforce, workplace and IT, service management, performance, governance and compliance coordination. Your leadership keeps the mandate and the delivery agenda.",
    icon: ShieldCheck,
    checklist: [
      { label: "People, HR and local workforce operations", icon: Users },
      { label: "Workplace, IT and physical & cyber security infrastructure", icon: ShieldCheck },
      { label: "Daily operational service desk and runbooks", icon: Workflow },
      { label: "Statutory governance and compliance coordination", icon: Shield },
      { label: "Continuous performance telemetry and SLA tracking", icon: TrendingUp },
    ],
    primaryCta: {
      label: "Explore GCC Operations",
      href: "/services/gcc-operations",
    },
    secondaryCta: {
      label: "See how BOT and transition works",
      mobileLabel: "BOT & transition",
      href: "/services/gcc-operations/bot-transition",
    },
    aside: {
      type: "flow",
      title: "An optional ownership path",
      paragraphs: [
        "Ownership is a path, not a single decision. A center can begin as a managed operation and move toward captive ownership over time, transferring scope, systems and people at the pace the enterprise chooses.",
      ],
      steps: ["Managed", "Stabilize", "Scale", "BOT", "Captive"],
      icons: [Layers, ShieldCheck, TrendingUp, Users, Building2],
      footerNote: "Not every center follows this sequence. It exists so that a managed start does not close off captive ownership later.",
    },
  },
];

/** ── 01. AI GCC: Animated Growing Skyscraper Enterprise Campus ── */
function AiGccSkyscraperVisual() {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative min-h-[250px] sm:min-h-[280px] bg-gradient-to-b from-[#091E42] via-[#051430] to-[#030B1C] border border-[#169DC8]/40 flex flex-col justify-between p-3 sm:p-4 select-none cursor-pointer group shadow-inner"
      title="Click to replay growing skyscraper animation"
    >
      {/* Radial Depth & Ambient Backlight Glow behind the skyscraper */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-gradient-to-t from-[#00C2FF]/20 via-[#169DC8]/15 to-transparent blur-2xl" />
      </div>

      {/* Subtle perspective grid lines / elevation markers */}
      <div className="absolute inset-x-0 bottom-0 top-10 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#169DC8_1px,transparent_1px),linear-gradient(to_bottom,#169DC8_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_50%,transparent_100%)]" />

      {/* Animated Growing Skyscraper Container */}
      <div
        key={replayKey}
        className="relative z-10 flex-1 flex flex-col items-center justify-end overflow-hidden pt-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 70, scaleY: 0.65, scaleX: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scaleY: 1, scaleX: 1 }
              : { opacity: 0, y: 70, scaleY: 0.65, scaleX: 0.95 }
          }
          transition={{
            duration: 1.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "bottom center" }}
          className="relative flex items-end justify-center w-full"
        >
          <img
            src="/images/skyscraper.webp"
            alt="AI GCC Enterprise Campus Skyscraper"
            className="w-auto h-[180px] sm:h-[210px] md:h-[220px] max-w-full object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,194,255,0.4)]"
            loading="eager"
          />
        </motion.div>

        {/* Foundation Horizon Glow Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: isInView ? 0.2 : 0, ease: "easeOut" }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent shadow-[0_0_12px_#00C2FF] relative z-20"
        />
      </div>
    </div>
  );
}

/** ── CountUp Number Component ── */
function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.3,
  start = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  start?: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(ease * value);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, duration, start]);

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** ── 02. AI TALENT: Technical Screening Funnel (navy bar chart, matches the visual family) ── */
function AiTalentBarFlowVisual({
  aside,
}: {
  aside: Extract<AsideVariant, { type: "flow" }>;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  const heights = [42, 60, 78, 96, 116];

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative bg-[#06122C] border border-[#169DC8]/40 p-3 sm:p-3.5 select-none cursor-pointer group shadow-inner flex-1 flex flex-col"
      title="Click to replay talent screening animation"
    >
      {/* Top-Right Ambient Cyan Light Bloom */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle_at_90%_15%,rgba(0,194,255,0.32)_0%,rgba(6,18,44,0)_70%)] pointer-events-none" />

      {/* Bouncing bar chart, labels just below each bar */}
      <div
        key={replayKey}
        className="relative z-10 flex-1 flex items-end justify-between gap-1.5 sm:gap-3 min-h-[160px] sm:min-h-[180px]"
      >
        {aside.steps.map((stepText, sIdx) => {
          const StepIcon = aside.icons?.[sIdx] || Workflow;
          const isFinal = sIdx === aside.steps.length - 1;
          return (
            <div key={sIdx} className="flex-1 min-w-0 flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                transition={{
                  delay: isInView ? sIdx * 0.12 : 0,
                  type: "spring",
                  stiffness: 250,
                  damping: 14,
                }}
                style={{ height: heights[sIdx], transformOrigin: "bottom" }}
                className={`w-full rounded-t-md ${isFinal
                    ? "bg-gradient-to-t from-[#0B4D88] to-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.55)]"
                    : "bg-gradient-to-t from-[#0B4D88] to-[#00C2FF]"
                  }`}
              />
              <div className="flex flex-col items-center gap-0.5 w-full text-center">
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold ${isFinal ? "text-[#00E5FF]" : "text-[#38BDF8]"}`}>
                  0{sIdx + 1}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100 leading-tight line-clamp-2 min-h-[26px]">
                  {stepText}
                </span>
                <StepIcon className={`w-3 h-3 shrink-0 ${isFinal ? "text-[#00E5FF]" : "text-[#00C2FF]"}`} />
              </div>
            </div>
          );
        })}
      </div>

      {aside.footerNote && (
        <p className="relative z-10 mt-2.5 text-[10px] sm:text-[10.5px] text-slate-400 italic border-t border-white/10 pt-2 font-normal">
          {aside.footerNote}
        </p>
      )}
    </div>
  );
}
/** ── 03. AI ENGINEERING: Production Readiness & Telemetry Matrix with Bigger Numbers and Counting Animation ── */
function ProductionAiStackVisual() {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: false });

  const metrics = [
    {
      label: "Eval & Accuracy Gates",
      num: 99.4,
      suffix: "%",
      decimals: 1,
      tag: "Continuous Testing",
    },
    {
      label: "Real-time Pipeline Latency",
      prefix: "<",
      num: 15,
      suffix: "ms",
      decimals: 0,
      tag: "Inference SLA",
    },
    {
      label: "Inference Cost Reduction",
      prefix: "-",
      num: 64,
      suffix: "%",
      decimals: 0,
      tag: "Model Routing & Cache",
    },
    {
      label: "Enterprise Guardrails",
      num: 100,
      suffix: "%",
      decimals: 0,
      tag: "Zero Data Leak",
    },
  ];

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative min-h-[280px] sm:min-h-[320px] bg-gradient-to-b from-[#081E44] via-[#051430] to-[#020A1A] border border-[#169DC8]/50 flex flex-col justify-between p-4 sm:p-5 select-none cursor-pointer group shadow-inner"
      title="Click to replay telemetry counting animation"
    >
      {/* Top-Right Ambient Cyan Light Bloom */}
      <div className="absolute top-0 right-0 w-52 h-52 bg-[radial-gradient(circle_at_90%_15%,rgba(0,194,255,0.35)_0%,rgba(6,18,44,0)_70%)] pointer-events-none" />

      {/* 2x2 Telemetry Metric Matrix with Bigger Numbers & Counting Animation */}
      <div key={replayKey} className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3 my-auto pt-1">
        {metrics.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
            transition={{ delay: isInView ? idx * 0.1 : 0, duration: 0.4, ease: "easeOut" }}
            className="rounded-xl bg-white/[0.05] border border-white/12 hover:border-[#00C2FF]/50 p-3 sm:p-3.5 flex flex-col justify-between transition-all hover:bg-white/[0.08]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9.5px] sm:text-[10px] font-mono text-[#38BDF8] tracking-wider uppercase font-semibold">
                {m.tag}
              </span>
              <Activity className="w-3.5 h-3.5 text-[#00C2FF]" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-manrope text-white tracking-tight leading-tight my-1 drop-shadow-sm">
              <CountUpNumber
                value={m.num}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
                start={isInView}
              />
            </div>
            <div className="text-[10.5px] sm:text-[11px] text-slate-300 font-medium line-clamp-1">
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** ── 04. AI DELIVERY TEAMS: Autonomous Squads Matrix ── */
function DeliveryModelsMatrixVisual({
  aside,
}: {
  aside: Extract<AsideVariant, { type: "models" }>;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative bg-[#06122C] border border-[#169DC8]/40 p-3 sm:p-3.5 select-none cursor-pointer group shadow-inner"
      title="Click to replay squad models"
    >
      {/* 2x2 Squad Matrix */}
      <div key={replayKey} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {aside.models.map((m, mIdx) => (
          <motion.div
            key={mIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay: isInView ? mIdx * 0.1 : 0, duration: 0.3, ease: "easeOut" }}
            className="rounded-lg border border-white/10 bg-white/[0.04] hover:border-[#00C2FF]/50 hover:bg-white/[0.07] p-2.5 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] font-bold text-[#00C2FF] px-1.5 py-0.5 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                  0{mIdx + 1} SQUAD
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </div>
              <h6 className="text-xs sm:text-[12px] font-bold text-white mb-0.5 font-manrope">
                {m.name}
              </h6>
              <p className="text-[10px] sm:text-[10.5px] text-slate-300 leading-relaxed font-normal">
                {m.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** ── 05. GCC STRATEGY & SETUP: Exponential Business Growth Graph ── */
function StrategyGrowthGraph() {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  // Growth curve matching user's image: dips, rises, and rockets exponentially to apex
  const pathD =
    "M 0 195 C 50 195, 75 155, 110 155 C 145 155, 155 215, 185 215 C 215 215, 230 140, 250 140 C 270 140, 280 162, 300 160 C 340 155, 370 75, 375 25";

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative min-h-[200px] sm:min-h-[220px] bg-[#06122C] border border-[#169DC8]/40 flex flex-col justify-between p-3.5 select-none cursor-pointer group shadow-inner"
      title="Click to replay growth animation"
    >
      {/* Top-Right Ambient Cyan Light Bloom (Illuminating the apex) */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_90%_15%,rgba(0,194,255,0.45)_0%,rgba(6,18,44,0)_70%)] pointer-events-none" />

      {/* Subtle bottom perspective floor grid matching screenshot */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,18,44,0.4)_100%)] pointer-events-none">
        <svg
          viewBox="0 0 400 90"
          className="w-full h-full opacity-20"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid lines */}
          <line x1="0" y1="30" x2="400" y2="30" stroke="#169DC8" strokeWidth="0.8" />
          <line x1="0" y1="55" x2="400" y2="55" stroke="#169DC8" strokeWidth="0.9" />
          <line x1="0" y1="75" x2="400" y2="75" stroke="#169DC8" strokeWidth="1" />
          {/* Converging perspective lines */}
          <line x1="40" y1="90" x2="80" y2="0" stroke="#169DC8" strokeWidth="0.8" />
          <line x1="120" y1="90" x2="140" y2="0" stroke="#169DC8" strokeWidth="0.8" />
          <line x1="200" y1="90" x2="200" y2="0" stroke="#169DC8" strokeWidth="0.8" />
          <line x1="280" y1="90" x2="260" y2="0" stroke="#169DC8" strokeWidth="0.8" />
          <line x1="360" y1="90" x2="320" y2="0" stroke="#169DC8" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Main Animated SVG Chart */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          key={replayKey}
          viewBox="0 0 400 240"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="cyanNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="curveBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#00C2FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Outer Cyan Glow Layer */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#00C2FF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeOpacity="0.32"
            filter="url(#cyanNeonGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Mid Cyan Layer */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#00E5FF"
            strokeWidth="4.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Core White/Cyan Highlight Beam */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#E0F7FF"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Glowing Apex Circle Node at (375, 25) */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: isInView ? 1.6 : 0, duration: 0.5, ease: "easeOut" }}
          >
            {/* Outer halo */}
            <circle cx="375" cy="25" r="26" fill="#00C2FF" fillOpacity="0.25" />
            <circle cx="375" cy="25" r="14" fill="#00E5FF" fillOpacity="0.45" />
            {/* Solid glowing sphere matching reference */}
            <circle cx="375" cy="25" r="8.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2.5" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/** ── 06. GCC OPERATIONS: Upward Cyan Wave BOT Ownership Trajectory ── */
function GccOwnershipPathVisual({
  aside: _aside,
}: {
  aside: Extract<AsideVariant, { type: "flow" }>;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15, once: false });

  // 5 stage configurations matching the trajectory sequence
  const nodes = [
    { num: "01", label: "Managed", x: 10, y: 64, icon: Layers },
    { num: "02", label: "Stabilize", x: 30, y: 55, icon: ShieldCheck },
    { num: "03", label: "Scale", x: 50, y: 45, icon: TrendingUp },
    { num: "04", label: "BOT", x: 70, y: 34, icon: Users },
    { num: "05", label: "Captive", x: 90, y: 20, icon: Building2, isApex: true },
  ];

  return (
    <div
      ref={containerRef}
      onClick={() => setReplayKey((k) => k + 1)}
      className="mt-4 sm:mt-5 rounded-xl overflow-hidden relative bg-gradient-to-b from-[#071638] via-[#051329] to-[#020A18] border border-[#169DC8]/40 p-4 sm:p-5 select-none cursor-pointer group shadow-inner flex-1 flex flex-col justify-between min-h-[290px] sm:min-h-[330px]"
      title="Click to replay ownership trajectory"
    >
      {/* Ambient background glow matching dark navy canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-10 w-64 h-64 bg-[#00C2FF]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#169DC8]/12 rounded-full blur-2xl" />
      </div>


      {/* Upward Ascending Glowing Cyan Wave Line & Hexagon Nodes */}
      <div key={replayKey} className="relative z-10 flex-1 w-full h-full min-h-[210px] sm:min-h-[240px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full absolute inset-0 pointer-events-none overflow-visible z-0"
        >
          <defs>
            <linearGradient id="upwardGlowLine" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0077B6" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#00B4D8" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#00C2FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
            </linearGradient>
            <filter id="neonLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
            </filter>
          </defs>

          {/* Subtle neon halo line behind */}
          <motion.path
            d="M 0 68 C 5 66, 7 65, 10 64 C 18 61, 23 58, 30 55 C 38 51, 43 48, 50 45 C 58 41, 63 37, 70 34 C 78 30, 83 24, 90 20 C 94 18, 97 15, 100 13"
            fill="none"
            stroke="#00C2FF"
            strokeWidth="1.8"
            opacity="0.3"
            filter="url(#neonLineGlow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Slender, crisp foreground upward cyan line */}
          <motion.path
            d="M 0 68 C 5 66, 7 65, 10 64 C 18 61, 23 58, 30 55 C 38 51, 43 48, 50 45 C 58 41, 63 37, 70 34 C 78 30, 83 24, 90 20 C 94 18, 97 15, 100 13"
            fill="none"
            stroke="url(#upwardGlowLine)"
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* 5 Hexagon Stage Nodes positioned along the ascending wave */}
        {nodes.map((node, idx) => {
          const NodeIcon = node.icon;
          const isApex = node.isApex;

          return (
            <motion.div
              key={node.num}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{
                delay: isInView ? 0.2 + idx * 0.12 : 0,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/node z-20 pointer-events-auto flex flex-col items-center"
            >
              {/* Shorter Hexagonal Node Badge Container */}
              <div
                className={`relative w-[44px] h-[50px] sm:w-[54px] sm:h-[62px] flex flex-col items-center justify-center p-1 select-none transition-all duration-300 group-hover/node:scale-108 ${
                  isApex
                    ? "filter drop-shadow-[0_0_18px_rgba(0,229,255,0.7)]"
                    : "filter drop-shadow-[0_4px_12px_rgba(0,194,255,0.22)] group-hover/node:drop-shadow-[0_4px_18px_rgba(0,229,255,0.45)]"
                }`}
              >
                {/* SVG Hexagon Shape with Gradients & Borders */}
                <svg
                  viewBox="0 0 68 78"
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                >
                  <defs>
                    <linearGradient id={`hexBg-${node.num}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      {isApex ? (
                        <>
                          <stop offset="0%" stopColor="#0E3D78" stopOpacity="0.98" />
                          <stop offset="100%" stopColor="#051635" stopOpacity="1" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#0B234C" stopOpacity="0.94" />
                          <stop offset="100%" stopColor="#041228" stopOpacity="0.97" />
                        </>
                      )}
                    </linearGradient>

                    <linearGradient id={`hexStroke-${node.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      {isApex ? (
                        <>
                          <stop offset="0%" stopColor="#00E5FF" />
                          <stop offset="50%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#00C2FF" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#0099DD" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#006699" stopOpacity="0.8" />
                        </>
                      )}
                    </linearGradient>
                  </defs>

                  {/* Symmetrical Vertical Hexagon Polygon */}
                  <polygon
                    points="34,2 66,20 66,58 34,76 2,58 2,20"
                    fill={`url(#hexBg-${node.num})`}
                    stroke={`url(#hexStroke-${node.num})`}
                    strokeWidth={isApex ? "2.2" : "1.4"}
                    className="transition-colors duration-300"
                  />

                  {/* Subtle inner accent polygon for apex node */}
                  {isApex && (
                    <polygon
                      points="34,6 61,22 61,56 34,72 7,56 7,22"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                  )}
                </svg>

                {/* Content inside hexagon: Stage number & Shorter Logo/Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  {/* Stage Number (01, 02...) */}
                  <span
                    className={`text-[7.5px] sm:text-[9px] font-mono font-bold leading-none mb-0.5 tracking-wider ${
                      isApex ? "text-[#00E5FF]" : "text-[#38BDF8]/90"
                    }`}
                  >
                    {node.num}
                  </span>

                  {/* Shorter Icon / Logo */}
                  <div
                    className={`flex items-center justify-center transition-transform duration-300 group-hover/node:scale-110 ${
                      isApex ? "text-[#00E5FF]" : "text-[#7DD3FC]"
                    }`}
                  >
                    <NodeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Text Label Moved BELOW the Hexagon Shape */}
              <span
                className={`absolute top-[calc(100%+6px)] sm:top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-[9.5px] sm:text-[11px] md:text-[11.5px] font-bold font-manrope leading-tight tracking-tight text-center drop-shadow-md whitespace-nowrap transition-colors ${
                  isApex
                    ? "text-[#38BDF8] font-extrabold"
                    : "text-white group-hover/node:text-[#7DD3FC]"
                }`}
              >
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** ── Unified AsidePanel Container ── */
function AsidePanel({
  aside,
  id,
}: {
  aside: AsideVariant;
  image?: string;
  id?: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-[#DCE8F4] bg-white p-5 sm:p-6 relative overflow-hidden flex flex-col shadow-2xs">
      <div>
        <div className="w-8 h-1 bg-[#169DC8] rounded-full mb-3" />
        <h5 className="text-base sm:text-lg font-bold text-[#0D306C] mb-2 sm:mb-2.5 font-manrope">
          {aside.title}
        </h5>
        {"paragraphs" in aside && aside.paragraphs && (
          <div className="space-y-2">
            {aside.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed font-normal"
              >
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* DEDICATED ANIMATED NAVY VISUAL MODULES */}
      {id === "ai-gcc" && <AiGccSkyscraperVisual />}
      {id === "ai-talent" && aside.type === "flow" && <AiTalentBarFlowVisual aside={aside} />}
      {id === "ai-engineering" && <ProductionAiStackVisual />}
      {id === "delivery-teams" && aside.type === "models" && <DeliveryModelsMatrixVisual aside={aside} />}
      {id === "gcc-strategy" && <StrategyGrowthGraph />}
      {id === "gcc-operations" && aside.type === "flow" && <GccOwnershipPathVisual aside={aside} />}
    </div>
  );
}

export default function GCCCapabilitiesMosaic() {
  // First section is opened by default as requested
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (idx: number) => {
    const isOpening = openIndex !== idx;
    const currentOpen = openIndex;

    setOpenIndex((prev) => (prev === idx ? null : idx));

    if (isOpening) {
      const targetEl = itemRefs.current[idx];
      if (targetEl) {
        const navOffset = 85;
        const rect = targetEl.getBoundingClientRect();
        const currentItemAbsoluteY = window.pageYOffset + rect.top;

        // If the currently open item is ABOVE the clicked item,
        // its height will collapse to 0, shifting the clicked item upwards.
        let heightToCollapseAbove = 0;
        if (currentOpen !== null && currentOpen < idx) {
          const prevPanel = document.getElementById(
            `capability-panel-${CAPABILITIES[currentOpen].id}`
          );
          if (prevPanel) {
            heightToCollapseAbove = prevPanel.offsetHeight;
          }
        }

        // Calculate final resting position of the clicked item's header
        const finalItemY = currentItemAbsoluteY - heightToCollapseAbove;
        const targetScrollY = Math.max(0, finalItemY - navOffset);

        // Smoothly scroll to the header so it remains right under the navbar
        // and the section content expands downwards
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });

        // Additional settling checks during and after the 350ms collapse animation
        setTimeout(() => {
          if (targetEl) {
            const updatedRect = targetEl.getBoundingClientRect();
            if (Math.abs(updatedRect.top - navOffset) > 12) {
              window.scrollTo({
                top: Math.max(0, window.pageYOffset + updatedRect.top - navOffset),
                behavior: "smooth",
              });
            }
          }
        }, 150);

        setTimeout(() => {
          if (targetEl) {
            const finalRect = targetEl.getBoundingClientRect();
            if (Math.abs(finalRect.top - navOffset) > 8) {
              window.scrollTo({
                top: Math.max(0, window.pageYOffset + finalRect.top - navOffset),
                behavior: "smooth",
              });
            }
          }
        }, 360);
      }
    }
  };

  return (
    <section
      id="capabilities"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[#E7EDF9] text-[#0D306C] selection:bg-[#169DC8]/20 selection:text-[#0D306C] overflow-hidden"
    >
      {/* SECTION HEADER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
        <SectionHeader
          eyebrow="The Capabilities Behind the Lifecycle"
          title={
            <>
              What&apos;s required to build, operate and scale an AI-first GCC
              <span className="text-[#169DC8]">.</span>
            </>
          }
          description="From specialist talent and AI engineering to GCC setup and local operations, NeoIntelli connects the six essential capabilities behind the complete India GCC lifecycle."
          align="center"
          className="mb-0"
        />
      </div>

      {/* 6 CAPABILITY ACCORDION SECTIONS FRAMED IN CYAN LINES (MAX-W-7XL, NO CONTAINER BORDER, NO SHADOW) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {CAPABILITIES.map((cap, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={cap.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                id={`capability-row-${cap.id}`}
                className={`scroll-mt-24 sm:scroll-mt-28 transition-colors duration-200 ${idx !== 0 ? "border-t border-[#169DC8]" : ""
                  }`}
              >
                {/* ACCORDION ROW HEADER */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between py-4 md:py-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8]/60 transition-all"
                  aria-expanded={isOpen}
                  aria-controls={`capability-panel-${cap.id}`}
                  id={`capability-header-${cap.id}`}
                >
                  {/* Left: Capability Title (numbers removed) */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-[#0D306C] tracking-tight group-hover:text-[#169DC8] transition-colors truncate sm:whitespace-normal pr-4">
                    {cap.titleName}
                  </h3>

                  {/* Right: Clean + and - toggle without round div or circle */}
                  <div className="shrink-0 flex items-center justify-center pointer-events-none select-none">
                    {isOpen ? (
                      <Minus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#169DC8] stroke-[1.5]" />
                    ) : (
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0D306C] group-hover:text-[#169DC8] stroke-[1.5] transition-colors" />
                    )}
                  </div>
                </button>

                {/* EXPANDED CONTENT PANEL */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`capability-panel-${cap.id}`}
                      role="region"
                      aria-labelledby={`capability-header-${cap.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-8 sm:pb-10 md:pb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6 lg:gap-8 xl:gap-10 items-stretch">
                          {/* COLUMN 1: NARRATIVE, KEY CAPABILITIES TAGS & CTAs */}
                          <div className="flex flex-col justify-between text-left">
                            <div>
                              {/* Eyebrow badge */}
                              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase bg-[#E5F2FC] text-[#008EC4] mb-3">
                                <span>{cap.eyebrowLabel}</span>
                              </div>

                              {/* Subheading */}
                              <h4 className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#0D306C] leading-snug mb-3 font-manrope">
                                {cap.subheading}
                              </h4>

                              {/* Body narrative */}
                              <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-6 font-normal">
                                {cap.body}
                              </p>

                              {/* Key Capabilities Checklist */}
                              <div className="mb-6">
                                <span className="block text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#169DC8] mb-3">
                                  KEY CAPABILITIES
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {cap.checklist.map((item, itemIdx) => {
                                    const TagIcon = item.icon;
                                    const isSpanTwo = itemIdx === 4 && cap.checklist.length === 5;
                                    return (
                                      <div
                                        key={item.label}
                                        className={`rounded-xl border border-[#DCE8F4] bg-white hover:border-[#169DC8]/50 p-3 flex items-center gap-3 transition-all duration-200 shadow-2xs ${isSpanTwo ? "sm:col-span-2" : ""
                                          }`}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-[#E5F2FC] text-[#0D306C] flex items-center justify-center shrink-0">
                                          <TagIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className="text-xs sm:text-[13px] font-semibold text-[#0D306C] leading-snug line-clamp-2 block font-manrope">
                                            {item.label}
                                          </span>
                                          <span className="block w-4 h-[2px] rounded-full bg-[#F59E0B] mt-1" />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Call To Action Buttons — both on one line, even on mobile */}
                            <div className="flex items-center gap-2 pt-2">
                              <Link
                                to={cap.primaryCta.href}
                                className="btn-navy cursor-pointer inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-[13px] py-2.5 px-4 sm:px-5 rounded-full shadow-sm hover:scale-[1.02] transition-transform flex-1 min-w-0 whitespace-nowrap truncate"
                              >
                                <span>{cap.primaryCta.mobileLabel ?? cap.primaryCta.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                              </Link>
                              {cap.secondaryCta && (
                                <Link
                                  to={cap.secondaryCta.href}
                                  className="text-[#0D306C] hover:text-[#169DC8] text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full border border-[#CBD5E1] bg-white hover:border-[#169DC8] transition-all flex-1 min-w-0 whitespace-nowrap truncate"
                                >
                                  <span>{cap.secondaryCta.mobileLabel ?? cap.secondaryCta.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#169DC8] shrink-0" />
                                </Link>
                              )}
                            </div>
                          </div>

                          {/* COLUMN 2: ASIDE DEEP DIVE (DEFINITION / FLOW / MODELS) */}
                          <div className="h-full">
                            <AsidePanel aside={cap.aside} image={cap.image} id={cap.id} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
