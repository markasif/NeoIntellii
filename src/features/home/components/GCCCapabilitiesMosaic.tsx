"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ArrowUpRight,
  FileText,
  Settings,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
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
    steps: string[];
    /** Optional matching icon per step (rendered in front of the step text). */
    icons?: LucideIcon[];
    footerNote?: string;
  }
  | {
    type: "models";
    title: string;
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
    /** Shorter label shown on mobile. Falls back to `label`. */
    mobileLabel?: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    /** Shorter label shown on mobile. Falls back to `label`. */
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
        "An India capability center designed around AI, data foundations and production engineering from day one—unifying specialist talent, MLOps and enterprise governance into one dedicated operating model.",
      ],
    },
    image: "/images/ai_gcc_cubes.jpg",
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
    image: "/images/mosaic_ai_eng.jpg",
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
    image: "/images/mosaic_gcc_strat.jpg",
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
      steps: ["Managed", "Stabilize", "Scale", "BOT", "Captive"],
      icons: [Layers, ShieldCheck, TrendingUp, Users, Building2],
      footerNote: "Not every center follows this sequence. It exists so that a managed start does not close off captive ownership later.",
    },
  },
];

// Spacing constants for the left navigation track (6 static stages: 0..5, filling viewport height)
const NODE_SPACING = 94;
const BASE_Y = 46; // Y-coordinate for stage 01 node
const TOTAL_TRACK_HEIGHT = 560;
const LINE_X = 16;
const BULGE_OFFSET = 10; // Inward curve towards the navigation labels
const CURVE_RADIUS = 36;

const getPillarDisplay = (label: string, idx: number): { number: string; title: string; subtitle: string } => {
  const number = String(idx + 1).padStart(2, "0");
  const words = label.split(" ");
  if (words.length <= 2) {
    return { number, title: words[0] || "", subtitle: words[1] || "" };
  }

  const lower = label.toLowerCase();
  if (lower.includes("strategy")) return { number, title: "AI Strategy", subtitle: "Mandate" };
  if (lower.includes("talent")) return { number, title: "Specialist", subtitle: "Talent" };
  if (lower.includes("genai") || lower.includes("generative")) return { number, title: "GenAI &", subtitle: "Agents" };
  if (lower.includes("mlops")) return { number, title: "MLOps &", subtitle: "Infra" };
  if (lower.includes("operating model")) return { number, title: "Operating", subtitle: "Model" };
  if (lower.includes("data engineering")) return { number, title: "Real-Time", subtitle: "Data" };
  if (lower.includes("guardrails")) return { number, title: "Guardrails", subtitle: "& Eval" };
  if (lower.includes("business case")) return { number, title: "Business", subtitle: "Case" };
  if (lower.includes("location")) return { number, title: "Location", subtitle: "& City" };
  if (lower.includes("entity")) return { number, title: "Entity &", subtitle: "Launch" };
  if (lower.includes("modernization")) return { number, title: "Modernize", subtitle: "& Scale" };

  return { number, title: words.slice(0, 2).join(" "), subtitle: words.slice(2, 4).join(" ") };
};

const PILLAR_HEIGHTS = ["h-[52%]", "h-[63%]", "h-[75%]", "h-[87%]", "h-[98%]"];

interface AsideVisualProps {
  aside: AsideVariant;
  checklist: ChecklistItem[];
  id: string;
  isMobile?: boolean;
}

function ShortlistFlowAsideVisual({
  aside,
  id,
  isMobile = false,
}: {
  aside: Extract<AsideVariant, { type: "flow" }>;
  id: string;
  isMobile?: boolean;
}) {
  const [shortlistActiveIdx, setShortlistActiveIdx] = useState<number>(0);
  const [shortlistProgress, setShortlistProgress] = useState<number>(0.2);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const shortlistContainerRef = useRef<HTMLDivElement>(null);
  const shortlistTimerRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedRef = useRef<boolean>(false);

  // Subtle scroll-driven movement for the arrow button (safe client listener, no Next.js hydration issues)
  useEffect(() => {
    const handleScroll = () => {
      if (!shortlistContainerRef.current) return;
      const rect = shortlistContainerRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight || 800;
      const p = Math.max(0, Math.min(1, (winHeight * 0.95 - rect.top) / (winHeight * 0.5)));
      setScrollProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth step progression (01 to 05) on initial scroll into view, then stops with no looping
  useEffect(() => {
    const el = shortlistContainerRef.current;
    if (!el) return;

    setShortlistActiveIdx(0);
    setShortlistProgress(0.2);
    hasAnimatedRef.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          shortlistTimerRef.current.forEach((t) => clearTimeout(t));
          shortlistTimerRef.current = [];

          [0, 1, 2, 3, 4].forEach((idx) => {
            const t = setTimeout(() => {
              setShortlistActiveIdx(idx);
              setShortlistProgress((idx + 1) / 5);
            }, idx * 280);
            shortlistTimerRef.current.push(t);
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      shortlistTimerRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // 5-step staggered diagonal layout coordinates shifted left into available space
  const stepCoords = [
    { nodeX: 10, nodeY: 34, cardLeft: 30, cardTop: 10 },
    { nodeX: 30, nodeY: 116, cardLeft: 56, cardTop: 92 },
    { nodeX: 58, nodeY: 198, cardLeft: 86, cardTop: 174 },
    { nodeX: 92, nodeY: 280, cardLeft: 122, cardTop: 256 },
    { nodeX: 130, nodeY: 362, cardLeft: 160, cardTop: 338 },
  ];

  // Parse step titles and icons precisely matching the reference
  const stepsData = aside.steps.map((rawText, idx) => {
    const num = `0${idx + 1}`;
    const coords = stepCoords[idx] || {
      nodeX: 10 + idx * 30,
      nodeY: 34 + idx * 82,
      cardLeft: 30 + idx * 32,
      cardTop: 10 + idx * 82,
    };

    let IconComp = aside.icons?.[idx] || Workflow;
    let line1 = rawText;
    let line2 = "";

    const lower = rawText.toLowerCase();
    if (lower === "source") {
      IconComp = Database;
      line1 = "Source";
    } else if (lower.includes("neohirex")) {
      IconComp = Search;
      line1 = "NeoHireX";
      line2 = "screen";
    } else if (lower.includes("ai first")) {
      IconComp = FileText;
      line1 = "AI first";
      line2 = "round";
    } else if (lower.includes("validation")) {
      IconComp = Settings;
      line1 = "Technical";
      line2 = "validation";
    } else if (lower.includes("shortlist")) {
      IconComp = UsersRound;
      line1 = "Qualified";
      line2 = "shortlist";
    } else {
      const parts = rawText.split(" ");
      if (parts.length > 1) {
        line1 = parts[0];
        line2 = parts.slice(1).join(" ");
      }
    }

    return { num, IconComp, line1, line2, rawText, ...coords };
  });

  // Smooth S-shaped curve passing accurately through all 5 milestone nodes shifted left
  const curvePathD =
    "M 6 0 C 6 12, 8 22, 10 34 C 14 62, 22 90, 30 116 C 40 148, 48 174, 58 198 C 70 228, 80 254, 92 280 C 106 310, 118 334, 130 362 C 138 386, 146 406, 150 430";

  // Arrow subtle forward scroll translation
  const arrowTranslateY = (1 - scrollProgress) * 12;
  const arrowScale = 0.94 + scrollProgress * 0.06;

  return (
    <div
      ref={shortlistContainerRef}
      className={`relative w-full overflow-hidden select-none ${
        isMobile ? "p-4 sm:p-5 min-h-[500px]" : "h-full p-5 sm:p-6 lg:p-7 flex flex-col justify-between"
      }`}
    >
      {/* TOP-RIGHT REFINED COMPACT ORGANIC CURVED DESK SILHOUETTE */}
      <div className="absolute top-0 right-0 w-[38%] sm:w-[41%] h-[42%] sm:h-[46%] pointer-events-none select-none z-10 overflow-hidden">
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={`deskOrganicClip-${id}`}>
              <path d="M 45 0 C 12 50, 8 115, 48 160 C 88 205, 155 232, 240 240 L 240 0 Z" />
            </clipPath>
          </defs>
          <image
            href="/images/ai-talent/shortlist-review-desk.jpg"
            x="0"
            y="0"
            width="240"
            height="240"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#deskOrganicClip-${id})`}
          />
          {/* Subtle light-cyan curve border accent matching reference */}
          <path
            d="M 45 0 C 12 50, 8 115, 48 160 C 88 205, 155 232, 240 240"
            fill="none"
            stroke="#D6EAF8"
            strokeWidth="2.5"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* FLOATING ACTION BUTTON OVER IMAGE: NAVY BLUE, LAYERED ABOVE IMAGE, NO LOOP ANIMATION, SCROLL-DRIVEN FRONT MOVEMENT */}
      <div
        style={{
          transform: `translateY(${arrowTranslateY}px) scale(${arrowScale})`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute top-[24%] sm:top-[26%] right-[14%] sm:right-[16%] z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D244D] shadow-[0_10px_25px_rgba(13,36,77,0.35)] hover:shadow-[0_12px_28px_rgba(13,36,77,0.45)] border-2 border-white flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
        title="Shortlist Progression"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
          {/* Corner L-bracket */}
          <path
            d="M 5 12 V 19 H 12"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upward-right arrow */}
          <path
            d="M 11 13 L 19 5"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 14 5 H 19 V 10"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* HEADER: CYAN ACCENT PILL + COMPACT SINGLE-LINE TITLE (Never touches image) */}
      <div className="relative z-20 mb-2 w-fit">
        <div className="w-10 sm:w-12 h-1 bg-[#008EC4] rounded-full mb-2 shadow-[0_0_8px_rgba(0,142,196,0.35)]" />
        <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-[#0D244D] tracking-tight leading-tight whitespace-nowrap font-manrope">
          {aside.title || "How a shortlist is built"}
        </h3>
      </div>

      {/* MAIN STAGE: SOLID CURVED TIMELINE PATH + 5 STAGGERED WIDER FLOATING CARDS */}
      <div className="relative flex-1 w-full min-h-[410px]">
        {/* INLINE SVG: SOLID (NOT DOTTED) TIMELINE & MILESTONE NODES */}
        <svg
          viewBox="0 0 460 420"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        >
          <defs>
            {/* Thin Cyan Glow Filter */}
            <filter id={`thinCyanGlow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38BDF8" floodOpacity="0.45" />
            </filter>
            {/* Node Soft Shadow */}
            <filter id={`nodeShadow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#0D244D" floodOpacity="0.18" />
            </filter>
            {/* Solid Line Cyan Gradient */}
            <linearGradient id={`shortlistLineGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#169DC8" />
              <stop offset="50%" stopColor="#00A3E0" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>

          {/* 1. Solid Base Track (Matches left navigation line stroke width: 2.2px) */}
          <path
            d={curvePathD}
            stroke="#DCE8F5"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 2. Solid Active Cyan Path (Matches left navigation line stroke width: 2.2px) */}
          <path
            d={curvePathD}
            stroke={`url(#shortlistLineGrad-${id})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            filter={`url(#thinCyanGlow-${id})`}
            style={{
              strokeDasharray: 430,
              strokeDashoffset: 430 * (1 - shortlistProgress),
              transition: "stroke-dashoffset 0.38s ease-out",
            }}
          />

          {/* 3. Small White Circular Milestone Nodes along the path (Matches left navigation round styling) */}
          {stepsData.map((step, idx) => {
            const isReached = idx <= shortlistActiveIdx;
            return (
              <g key={`node-${step.num}`}>
                {/* Active subtle cyan aura when reached */}
                {isReached && (
                  <circle
                    cx={step.nodeX}
                    cy={step.nodeY}
                    r="7.5"
                    fill="#169DC8"
                    fillOpacity="0.22"
                  />
                )}

                {/* Crisp White Round Circle */}
                <circle
                  cx={step.nodeX}
                  cy={step.nodeY}
                  r="4"
                  fill="#FFFFFF"
                  stroke={isReached ? "#169DC8" : "#93A8C7"}
                  strokeWidth="1.8"
                  filter={`url(#nodeShadow-${id})`}
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* 4. Five Staggered Wider Floating Cards: 01 Source down to 05 Qualified shortlist */}
        {stepsData.map((step, idx) => {
          const IconComp = step.IconComp;
          const isReached = idx <= shortlistActiveIdx;

          return (
            <div
              key={step.num}
              style={{
                left: `${(step.cardLeft / 460) * 100}%`,
                top: `${(step.cardTop / 420) * 100}%`,
              }}
              className={`absolute z-20 group/card transition-all duration-300 hover:scale-[1.03] hover:z-30 cursor-default ${
                isReached ? "opacity-100" : "opacity-75"
              }`}
            >
              <div className="relative w-[192px] sm:w-[214px] bg-white/95 backdrop-blur-xs rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_6px_20px_rgba(10,37,84,0.07)] hover:shadow-[0_10px_24px_rgba(10,37,84,0.11)] border border-white/85 flex items-center gap-2.5 sm:gap-3 transition-shadow duration-300">
                {/* Partially overlapping orange numbered circular badge */}
                <span className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-[#FFA000] text-white font-mono font-bold text-[11px] flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-[#FFA000]/25">
                  {step.num}
                </span>

                {/* Soft light blue circular icon badge */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5F1FC] flex items-center justify-center text-[#0D306C] shrink-0 group-hover/card:bg-[#D5EAFD] transition-colors duration-200">
                  <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0D306C]" strokeWidth={2.2} />
                </div>

                {/* Compact step title */}
                <div className="pr-1 select-none flex-1 min-w-0">
                  <div className="text-[13px] sm:text-[13.5px] font-extrabold text-[#0D244D] tracking-tight leading-tight whitespace-nowrap font-manrope">
                    {step.line1}
                  </div>
                  {step.line2 && (
                    <div className="text-[12px] sm:text-[12.5px] font-extrabold text-[#0D244D] tracking-tight leading-tight whitespace-nowrap font-manrope">
                      {step.line2}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {aside.footerNote && (
        <div className="relative z-20 text-center px-4 pt-1 pb-1">
          <p className="text-[11px] sm:text-xs text-[#505D74] italic leading-tight">
            {aside.footerNote}
          </p>
        </div>
      )}
    </div>
  );
}

function CapabilityAsideVisual({ aside, checklist, id, isMobile = false }: AsideVisualProps) {

  if (aside.type === "definition") {
    return (
      <div className={`flex flex-col justify-between ${isMobile ? "w-full" : "h-full gap-2 sm:gap-2.5"}`}>
        {/* 3D 5-Pillar Stepping Visual Stage with Crystal-Clear Animated Mosaic Cube Grid Background */}
        <div
          className={`relative w-full flex flex-col justify-end rounded-2xl overflow-hidden ${isMobile
              ? "h-[270px] sm:h-[300px] p-2 sm:p-2.5 shadow-inner border border-[#D2DCF0]/60"
              : "flex-1 p-2.5 sm:p-3.5"
            }`}
        >
          {/* 3D CUBE MOSAIC VECTOR BACKGROUND — 100% CRYSTAL CLEAR & CONTINUOUSLY ANIMATED */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden rounded-2xl">
            <svg
              className="w-full h-full"
              viewBox="0 0 520 480"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id={`mosaicBevel-${id}`} x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#0B2554" floodOpacity="0.08" />
                </filter>
                {/* Gradients for each diagonal stop 0..11 */}
                {[
                  { top: "#FFFFFF", bottom: "#F0F6FD" },
                  { top: "#F6FAFE", bottom: "#E6F1FD" },
                  { top: "#EDF5FD", bottom: "#DAEBFC" },
                  { top: "#E2EFFD", bottom: "#CBE2FB" },
                  { top: "#D5E7FC", bottom: "#B8D7FA" },
                  { top: "#C4DCFB", bottom: "#A0C9F8" },
                  { top: "#AFCEFA", bottom: "#87B8F5" },
                  { top: "#96BEF8", bottom: "#6BA4F3" },
                  { top: "#7BACF6", bottom: "#4E8FF0" },
                  { top: "#5E98F4", bottom: "#3279ED" },
                  { top: "#4183F2", bottom: "#1D64EB" },
                  { top: "#276EEF", bottom: "#0F52E0" },
                ].map((stop, idx) => (
                  <linearGradient key={idx} id={`mosaicGrad-${id}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={stop.top} />
                    <stop offset="100%" stopColor={stop.bottom} />
                  </linearGradient>
                ))}
                {/* Pillow Highlight */}
                <linearGradient id={`mosaicPillowHi-${id}`} x1="0%" y1="0%" x2="75%" y2="75%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                {/* Pillow Shade */}
                <linearGradient id={`mosaicPillowSh-${id}`} x1="25%" y1="25%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B2554" stopOpacity="0" />
                  <stop offset="100%" stopColor="#0B2554" stopOpacity="0.14" />
                </linearGradient>
              </defs>

              {Array.from({ length: 6 }).map((_, r) =>
                Array.from({ length: 7 }).map((_, c) => {
                  const tileSize = 68;
                  const gap = 6;
                  const x = c * (tileSize + gap) + 4;
                  const y = r * (tileSize + gap) + 4;
                  const diag = Math.min(r + c, 11);
                  const delay = (r + c) * 0.14;

                  return (
                    <motion.g
                      key={`${r}-${c}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -3.5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: delay,
                        },
                        opacity: { duration: 0.5, delay: delay * 0.4 },
                        scale: { duration: 0.5, delay: delay * 0.4 },
                      }}
                      style={{ transformOrigin: `${x + tileSize / 2}px ${y + tileSize / 2}px` }}
                    >
                      {/* Base 3D Rounded Cube */}
                      <rect
                        x={x}
                        y={y}
                        width={tileSize}
                        height={tileSize}
                        rx={15}
                        fill={`url(#mosaicGrad-${id}-${diag})`}
                        filter={`url(#mosaicBevel-${id})`}
                      />
                      {/* Soft 3D Pillow Highlight */}
                      <rect
                        x={x}
                        y={y}
                        width={tileSize}
                        height={tileSize}
                        rx={15}
                        fill={`url(#mosaicPillowHi-${id})`}
                      />
                      {/* Soft 3D Pillow Shade */}
                      <rect
                        x={x}
                        y={y}
                        width={tileSize}
                        height={tileSize}
                        rx={15}
                        fill={`url(#mosaicPillowSh-${id})`}
                      />
                      {/* Crisp Edge Stroke */}
                      <rect
                        x={x + 0.5}
                        y={y + 0.5}
                        width={tileSize - 1}
                        height={tileSize - 1}
                        rx={14.5}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.7)"
                        strokeWidth="1"
                      />
                    </motion.g>
                  );
                })
              )}
            </svg>
          </div>

          {/* 5 Stepping Vertical Pillars Grid */}
          <div
            className={`relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2.5 items-end w-full px-1 pb-1 ${isMobile ? "h-[240px] sm:h-[260px]" : "h-[390px] sm:h-[420px]"
              }`}
          >
            {checklist.map((item, idx) => {
              const IconComponent = item.icon;
              const isHero = idx === 2; // Middle hero pillar
              const pillarData = getPillarDisplay(item.label, idx);
              const heightClass = PILLAR_HEIGHTS[idx] || "h-[70%]";

              return (
                <motion.div
                  key={`${id}-${idx}`}
                  initial={{ y: 90, scaleY: 0.12, opacity: 0 }}
                  animate={{ y: 0, scaleY: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 14,
                    mass: 0.75,
                    delay: idx * 0.1,
                  }}
                  style={{ transformOrigin: "bottom" }}
                  className={`relative flex flex-col items-center justify-end w-full group cursor-pointer ${heightClass}`}
                >
                  {/* Floating Tooltip on Hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-[#051329] text-white text-[11px] font-semibold shadow-xl border border-[#38BDF8]/30 pointer-events-none whitespace-normal opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 w-36 text-center leading-snug">
                    {item.label}
                  </div>

                  {/* Pillar Column Body with Pointed Top, Number at Apex, and Logo Below Number */}
                  <div
                    className={`relative w-full flex-1 flex flex-col items-center justify-start pt-2.5 sm:pt-4 pb-1.5 px-0.5 sm:px-1 rounded-b-xl border-x border-b transition-all duration-300 group-hover:shadow-lg ${isHero
                        ? "bg-gradient-to-b from-[#008EC4] via-[#0070F3] to-[#0D244D] text-white border-[#38BDF8]/40 shadow-[0_14px_30px_rgba(0,142,196,0.3)]"
                        : idx === 4
                          ? "bg-gradient-to-b from-[#0B2554] via-[#0D306C] to-[#081B3E] text-white border-[#16427D]/80 shadow-md"
                          : "bg-gradient-to-b from-white via-[#F8FAFC] to-[#E9F1F8] text-[#0D306C] border-[#CBD5E1]/80 shadow-2xs group-hover:border-[#008EC4]/60"
                      }`}
                    style={{
                      clipPath: "polygon(50% 0%, 100% 12px, 100% 100%, 0% 100%, 0% 12px)",
                    }}
                  >
                    {/* Step Number at Apex */}
                    <span
                      className={`font-mono font-extrabold text-xs sm:text-base tracking-tight leading-none pt-0.5 ${isHero || idx === 4 ? "text-white" : "text-[#0D306C]"
                        }`}
                    >
                      {pillarData.number}
                    </span>

                    {/* Logo / Matching Icon Badge Placed Below Number */}
                    <div className="mt-1.5 sm:mt-2.5 flex items-center justify-center">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs ${isHero
                            ? "bg-white/20 backdrop-blur-xs text-white border border-white/35 shadow-inner"
                            : idx === 4
                              ? "bg-white/12 text-[#38BDF8] border border-[#38BDF8]/35"
                              : "bg-white text-[#0D306C] border border-[#CBD5E1] group-hover:border-[#008EC4] group-hover:text-[#008EC4]"
                          }`}
                      >
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    {/* Text Label INSIDE the Pillar Body */}
                    <div className="mt-1.5 sm:mt-2 px-0.5 sm:px-1.5 w-full text-center flex-1 flex flex-col justify-start">
                      <p
                        className={`font-manrope font-bold text-[8px] sm:text-[9.5px] lg:text-[10px] leading-tight tracking-tight ${isHero || idx === 4 ? "text-white drop-shadow-xs" : "text-[#0D306C]"
                          }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (aside.type === "flow") {
    const isShortlistFlow =
      aside.title.toLowerCase().includes("shortlist") || id.toLowerCase().includes("talent");

    if (isShortlistFlow) {
      return <ShortlistFlowAsideVisual aside={aside} id={id} isMobile={isMobile} />;
    }

    // ORIGINAL ORBITAL CONCENTRIC ARC FLOW FOR GCC OPERATIONS ("An optional ownership path")
    const ARC_ORIGIN = { cx: 520, cy: 530 };
    const nodes = [
      { x: 375, y: 385, r: 32, num: "01" },
      { x: 305, y: 315, r: 33, num: "02" },
      { x: 235, y: 242, r: 34, num: "03" },
      { x: 165, y: 165, r: 35, num: "04" },
      { x: 92, y: 82, r: 43, num: "05" },
    ];

    const arcRadii = nodes.map(n =>
      Math.round(Math.hypot(ARC_ORIGIN.cx - n.x, ARC_ORIGIN.cy - n.y))
    );

    const renderCircleText = (text: string, x: number, y: number, isHero = false) => {
      const words = text.split(" ");
      if (words.length <= 1) {
        return (
          <text
            x={x}
            y={y + (isHero ? 7 : 5)}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#091E42"
            fontSize={isHero ? "13.5" : "11.5"}
            fontWeight={isHero ? "800" : "700"}
            letterSpacing="-0.015em"
            style={{ fontFamily: "var(--font-manrope), 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {text}
          </text>
        );
      }

      const line1 = words[0];
      const line2 = words.slice(1).join(" ");
      return (
        <>
          <text
            x={x}
            y={y + (isHero ? 1 : 0)}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#091E42"
            fontSize={isHero ? "11.5" : "9.5"}
            fontWeight={isHero ? "800" : "700"}
            letterSpacing="-0.01em"
            style={{ fontFamily: "var(--font-manrope), 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {line1}
          </text>
          <text
            x={x}
            y={y + (isHero ? 14 : 11.5)}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#091E42"
            fontSize={isHero ? "10.5" : "9"}
            fontWeight={isHero ? "800" : "700"}
            letterSpacing="-0.01em"
            style={{ fontFamily: "var(--font-manrope), 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {line2}
          </text>
        </>
      );
    };

    const getArcPath = (r: number, startDeg: number, endDeg: number) => {
      const rad = Math.PI / 180;
      const a1 = startDeg * rad;
      const a2 = endDeg * rad;
      const x1 = Math.round(ARC_ORIGIN.cx + r * Math.cos(a1));
      const y1 = Math.round(ARC_ORIGIN.cy + r * Math.sin(a1));
      const x2 = Math.round(ARC_ORIGIN.cx + r * Math.cos(a2));
      const y2 = Math.round(ARC_ORIGIN.cy + r * Math.sin(a2));
      return `M ${x1},${y1} A ${r},${r} 0 0 0 ${x2},${y2}`;
    };

    return (
      <div className={`flex flex-col justify-between ${isMobile ? "w-full" : "h-full gap-2 sm:gap-2.5"}`}>
        <div className="relative flex-1 w-full flex flex-col justify-between p-1 sm:p-2 bg-transparent border-0 shadow-none overflow-hidden">
          <div className="relative z-20 text-center pt-1 sm:pt-2 px-4 pb-1 shrink-0">
            <h5 className="text-base sm:text-lg lg:text-xl font-extrabold font-manrope text-[#0D306C] tracking-tight leading-snug">
              {aside.title}
            </h5>
          </div>

          <div
            className={`relative w-full flex items-center justify-center overflow-hidden ${
              isMobile ? "max-w-[360px] mx-auto min-h-[300px] sm:min-h-[330px]" : "flex-1 min-h-[340px]"
            }`}
          >
            <svg
              viewBox="0 0 460 440"
              fill="none"
              className={`relative z-10 select-none overflow-hidden ${
                isMobile ? "w-full h-auto aspect-square" : "w-full h-full"
              }`}
            >
              <defs>
                <filter id={`archFeatherBlur-${id}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="26" />
                </filter>
                <filter id={`apexAuraBlur-${id}`} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                </filter>
                <filter id={`heroCircleGlow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="#F59E0B" floodOpacity="0.5" />
                </filter>
                <filter id={`nodeShadow-${id}`} x="-25%" y="-25%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#061838" floodOpacity="0.25" />
                </filter>

                <radialGradient id={`apexGlowGrad-${id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#0284C7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`arcLineGrad-${id}`} x1="100%" y1="50%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
                </linearGradient>

                <marker
                  id={`dottedAmberArrow-${id}`}
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
                </marker>
              </defs>

              <g className="pointer-events-none select-none">
                <g filter={`url(#archFeatherBlur-${id})`}>
                  <path
                    d={getArcPath(540, -76, -146)}
                    fill="none"
                    stroke="#0A2A66"
                    strokeWidth="170"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                  <path
                    d={getArcPath(270, -80, -155)}
                    fill="none"
                    stroke="#0B2B6A"
                    strokeWidth="150"
                    strokeLinecap="round"
                    opacity="0.92"
                  />
                  <path
                    d={getArcPath(410, -78, -150)}
                    fill="none"
                    stroke="#061838"
                    strokeWidth="180"
                    strokeLinecap="round"
                    opacity="0.98"
                  />
                  <path
                    d={getArcPath(410, -85, -144)}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="60"
                    strokeLinecap="round"
                    opacity="0.28"
                  />
                </g>
                <circle cx="92" cy="82" r="56" fill={`url(#apexGlowGrad-${id})`} filter={`url(#apexAuraBlur-${id})`} />
                <circle cx="92" cy="82" r="38" fill="#38BDF8" opacity="0.4" filter={`url(#apexAuraBlur-${id})`} />
              </g>

              <g className="pointer-events-none select-none">
                {arcRadii.map((r, i) => (
                  <path
                    key={`arc-${i}`}
                    d={getArcPath(r, -76, -182)}
                    fill="none"
                    stroke={`url(#arcLineGrad-${id})`}
                    strokeWidth="1.6"
                    strokeDasharray="4 4"
                    opacity="0.9"
                  />
                ))}
              </g>

              <g className="pointer-events-none select-none">
                {nodes.slice(0, 4).map((curr, i) => {
                  const next = nodes[i + 1];
                  const angle = Math.atan2(next.y - curr.y, next.x - curr.x);
                  const x1 = curr.x - Math.cos(angle) * (curr.r + 2);
                  const y1 = curr.y - Math.sin(angle) * (curr.r + 2);
                  const x2 = next.x + Math.cos(angle) * (next.r + 6);
                  const y2 = next.y + Math.sin(angle) * (next.r + 6);

                  return (
                    <line
                      key={`arrow-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      markerEnd={`url(#dottedAmberArrow-${id})`}
                      opacity="0.95"
                    />
                  );
                })}
              </g>

              {nodes.map((n, i) => {
                const isHero = i === 4;
                const stepText = aside.steps[i] || `Stage ${n.num}`;

                return (
                  <g key={`circle-node-${i}`} className="select-none">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill="#FFFFFF"
                      filter={isHero ? `url(#heroCircleGlow-${id})` : `url(#nodeShadow-${id})`}
                    />
                    <rect
                      x={n.x - (isHero ? 13 : 11)}
                      y={n.y - (isHero ? 28.5 : 23)}
                      width={isHero ? 26 : 22}
                      height={isHero ? 13 : 11}
                      rx={isHero ? 6.5 : 5.5}
                      fill="#F59E0B"
                    />
                    <text
                      x={n.x}
                      y={n.y - (isHero ? 22 : 17)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#FFFFFF"
                      fontSize={isHero ? "8.5" : "7.5"}
                      fontWeight="800"
                      style={{ fontFamily: "var(--font-manrope), monospace" }}
                    >
                      {n.num}
                    </text>
                    {renderCircleText(stepText, n.x, n.y, isHero)}
                  </g>
                );
              })}
            </svg>
          </div>

          {aside.footerNote && (
            <div className="relative z-20 text-center px-4 pt-1 pb-1">
              <p className="text-[11px] sm:text-xs text-[#505D74] italic leading-tight">
                {aside.footerNote}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (aside.type === "models") {
    return (
      <div className={`flex flex-col justify-center ${isMobile ? "w-full my-1" : "h-full"}`}>
        <div className="text-center">
          <span className="block text-xs font-mono font-bold tracking-[0.18em] uppercase text-[#169DC8] mb-1.5">
            ENGAGEMENT OPTIONS
          </span>
          <h5 className="text-sm sm:text-base font-bold font-manrope text-[#0D306C] tracking-tight mb-3 sm:mb-4">
            {aside.title}
          </h5>

          <div className="grid grid-cols-1 gap-2.5 sm:gap-3 text-left">
            {aside.models.map((m, mIdx) => (
              <div
                key={mIdx}
                className="group/model relative rounded-2xl overflow-hidden border border-[#38BDF8]/30 hover:border-[#F59E0B]/60 bg-[#061838] p-3.5 sm:p-4.5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,24,56,0.6)] min-h-[96px] sm:min-h-[108px]"
              >
                <img
                  src="/images/engagement_wave_bg.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-85 group-hover/model:opacity-100 group-hover/model:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#061838]/80 via-[#061838]/30 to-transparent pointer-events-none" />
                <div className="relative z-10 w-5 h-[2.5px] bg-gradient-to-r from-[#38BDF8] to-[#F59E0B] rounded-full group-hover/model:w-10 transition-all duration-300" />

                <div className="relative z-10 mt-2 max-w-[80%]">
                  <h6 className="text-white font-bold text-xs sm:text-[13px] leading-snug tracking-tight font-manrope">
                    {m.name}
                  </h6>
                  <p className="text-[#C5D7F0] text-[11px] sm:text-xs leading-relaxed font-normal mt-1">
                    {m.summary}
                  </p>
                </div>

                <div className="absolute right-3 bottom-3 z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#061838]/90 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] shadow-xs backdrop-blur-md group-hover/model:border-[#F59E0B]/80 group-hover/model:text-[#F59E0B] group-hover/model:scale-105 transition-all">
                    <span className="font-mono text-[10px] font-bold">
                      {String(mIdx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function GCCCapabilitiesMosaic() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  /** True while a click-initiated smooth scroll is in flight, so scroll events don't fight the clicked stage. */
  const clickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track scroll progress through the dedicated scroll track container
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ["start 84px", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // Map scroll progress (0..1) to stage index (0..5) smoothly based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion || clickScrollingRef.current) return;
    const clamped = Math.max(0, Math.min(0.999, latest));
    const newIdx = Math.min(CAPABILITIES.length - 1, Math.floor(clamped * CAPABILITIES.length));
    if (newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  });

  // Handle manual selection via clicking nav items with smooth scroll sync centered in interval
  const handleSelectStage = (idx: number) => {
    setActiveIndex(idx);
    if (!scrollSectionRef.current) return;
    const rect = scrollSectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top - 84;
    const scrollableDistance = scrollSectionRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance > 0) {
      const targetScroll = containerTop + ((idx + 0.5) / CAPABILITIES.length) * scrollableDistance;
      // Hold off scroll-driven stage changes until the programmatic scroll settles,
      // otherwise the in-between positions flicker the card through the other stages.
      clickScrollingRef.current = true;
      if (clickScrollTimeoutRef.current) clearTimeout(clickScrollTimeoutRef.current);
      const release = () => {
        clickScrollingRef.current = false;
        if (clickScrollTimeoutRef.current) {
          clearTimeout(clickScrollTimeoutRef.current);
          clickScrollTimeoutRef.current = null;
        }
        window.removeEventListener("scrollend", release);
      };
      window.addEventListener("scrollend", release, { once: true });
      // Fallback for browsers without the scrollend event.
      clickScrollTimeoutRef.current = setTimeout(release, 1200);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const activeCap = CAPABILITIES[activeIndex] || CAPABILITIES[0];

  // Dynamic Y-coordinate of the active marker along the track
  const activeMarkerY = BASE_Y + activeIndex * NODE_SPACING;

  // Organic S-curve for the cyan vertical line bulging INWARD towards the navigation
  const inwardApexX = LINE_X - BULGE_OFFSET;
  const cyanPathD = `
    M ${LINE_X}, 8
    L ${LINE_X}, ${Math.max(8, activeMarkerY - CURVE_RADIUS)}
    C ${LINE_X}, ${activeMarkerY - CURVE_RADIUS * 0.4}, ${inwardApexX}, ${activeMarkerY - CURVE_RADIUS * 0.4}, ${inwardApexX}, ${activeMarkerY}
    C ${inwardApexX}, ${activeMarkerY + CURVE_RADIUS * 0.4}, ${LINE_X}, ${activeMarkerY + CURVE_RADIUS * 0.4}, ${LINE_X}, ${activeMarkerY + CURVE_RADIUS}
    L ${LINE_X}, ${TOTAL_TRACK_HEIGHT - 8}
  `;

  return (
    <section
      id="capabilities"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[#E7EDF9] text-[#0D306C] selection:bg-[#169DC8]/20 selection:text-[#0D306C]"
    >
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER (STANDARD MARGIN MATCHING OTHER HOMEPAGE SECTIONS)      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
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

      {/* ========================================================================= */}
      {/* 2. SCROLL TRACK CONTAINER (STARTS DIRECTLY BELOW HEADER, SAME SPACING)    */}
      {/* ========================================================================= */}
      <div
        ref={scrollSectionRef}
        className="hidden md:block relative md:h-[320vh]"
      >
        <div className="sticky top-20 sm:top-24 w-full overflow-hidden">
          {/* Subtle ambient depth glows */}
          <div className="absolute left-[6%] top-[20%] w-[380px] h-[380px] rounded-full bg-[#169DC8]/6 blur-3xl pointer-events-none z-0" />
          <div className="absolute right-[5%] top-[20%] w-[480px] h-[480px] rounded-full bg-[#169DC8]/6 blur-3xl pointer-events-none z-0" />

          {/* MAIN CAPABILITIES EXPLORER (EXPANDED TO FULL VIEWPORT HEIGHT) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="w-full grid grid-cols-1 md:grid-cols-[68px_1fr] lg:grid-cols-[74px_1fr] xl:grid-cols-[78px_1fr] gap-3 sm:gap-4 lg:gap-5 items-start">

              {/* ----------------------------------------------------------------- */}
              {/* LEFT SIDE: 6 FIXED STAGES RAIL WITH ORGANIC CYAN TRACK LINE       */}
              {/* (SPANS FULL 560PX VIEWPORT HEIGHT)                                */}
              {/* ----------------------------------------------------------------- */}
              <div className="hidden md:flex relative items-start select-none h-[560px]">
                <div className="relative w-full flex items-start h-[560px]">
                  {/* 1. ICON LOGOS RAIL (ALL 6 STAGES EVENLY DISTRIBUTED WITH MATCHING LOGOS) */}
                  <div
                    role="tablist"
                    aria-label="AI GCC Capabilities Stages"
                    className="flex-1 pr-1 relative flex flex-col h-[560px] justify-between items-center"
                  >
                    {CAPABILITIES.map((cap, idx) => {
                      const isActive = activeIndex === idx;
                      const IconComponent = cap.icon;

                      return (
                        <button
                          key={cap.id}
                          id={`capability-tab-${cap.id}`}
                          type="button"
                          onClick={() => handleSelectStage(idx)}
                          style={{ height: NODE_SPACING }}
                          className="group relative flex flex-col items-center justify-center text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-xl cursor-pointer w-full"
                          aria-selected={isActive}
                          role="tab"
                          aria-controls={`capability-panel-${cap.id}`}
                          aria-label={`${cap.tabNumber} ${cap.titleName}`}
                        >
                          {/* Stage Number */}
                          <span
                            className={`text-[11px] font-mono font-bold tracking-wider mb-1 transition-colors ${isActive ? "text-[#008EC4]" : "text-[#7B8B9E] group-hover:text-[#0D306C]"
                              }`}
                          >
                            {cap.tabNumber}
                          </span>

                          {/* Matching Icon / Logo Tile */}
                          <div
                            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                ? "bg-gradient-to-br from-[#0D244D] to-[#051329] text-[#38BDF8] shadow-[0_6px_20px_rgba(22,157,200,0.3)] border border-[#169DC8]/60 scale-105"
                                : "bg-white/85 hover:bg-white text-[#505D74] hover:text-[#0D306C] border border-[#CBD5E1]/80 hover:border-[#94A3B8] shadow-2xs hover:scale-105"
                              }`}
                          >
                            <IconComponent
                              className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-[#38BDF8] scale-110" : "text-[#505D74] group-hover:text-[#0D306C]"
                                }`}
                              aria-hidden="true"
                            />
                            {isActive && (
                              <span className="absolute -inset-0.5 rounded-xl bg-[#169DC8]/25 blur-xs -z-10" />
                            )}
                          </div>

                          {/* Floating Tooltip displaying capability title on hover */}
                          <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#051329] text-white text-xs font-semibold shadow-lg border border-[#38BDF8]/25 pointer-events-none whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
                            <span className="font-mono text-[#38BDF8] text-[10px] mr-1.5">{cap.tabNumber}</span>
                            {cap.titleName}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 2. CYAN VERTICAL LINE & ORGANIC INWARD BULGE SVG TRACK (560PX) */}
                  <div className="w-[24px] shrink-0 relative h-[560px] pointer-events-none">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox={`0 0 24 ${TOTAL_TRACK_HEIGHT}`}
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="cyanLineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#169DC8" stopOpacity="0.25" />
                          <stop offset="10%" stopColor="#169DC8" stopOpacity="0.95" />
                          <stop offset="90%" stopColor="#169DC8" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#93A8C7" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* Continuous organic curved cyan line without moving animation */}
                      <motion.path
                        d={cyanPathD}
                        stroke="url(#cyanLineGrad)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                        transition={{ type: "spring", stiffness: 160, damping: 25, mass: 0.35 }}
                      />

                      {/* Circular nodes for inactive stages */}
                      {CAPABILITIES.map((_, idx) => {
                        const nodeY = BASE_Y + idx * NODE_SPACING;
                        const isCurrent = activeIndex === idx;
                        if (isCurrent) return null;

                        return (
                          <circle
                            key={`node-${idx}`}
                            cx={LINE_X}
                            cy={nodeY}
                            r="3.5"
                            fill="#FFFFFF"
                            stroke="#93A8C7"
                            strokeWidth="1.6"
                            className="transition-colors duration-300"
                          />
                        );
                      })}

                      {/* Active Circular Cyan Marker */}
                      <motion.g
                        animate={{ y: activeMarkerY }}
                        transition={{ type: "spring", stiffness: 160, damping: 25, mass: 0.35 }}
                      >
                        <circle
                          cx={inwardApexX}
                          cy={0}
                          r="9"
                          fill="#169DC8"
                          fillOpacity="0.22"
                        />
                        <circle
                          cx={inwardApexX}
                          cy={0}
                          r="5.5"
                          fill="#169DC8"
                          fillOpacity="0.45"
                        />
                        <circle
                          cx={inwardApexX}
                          cy={0}
                          r="3"
                          fill="#169DC8"
                        />
                      </motion.g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* RIGHT SIDE: TWO-COLUMN EDITORIAL CAPABILITY PANEL                 */}
              {/* (STARTS AT TOP OF LEFT LINE AND ENDS AT BOTTOM, EXACT SAME 560PX)  */}
              {/* ----------------------------------------------------------------- */}
              <div className="w-full min-w-0 relative md:pl-3 lg:pl-5 md:h-[560px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeCap.id}
                    id={`capability-panel-${activeCap.id}`}
                    role="tabpanel"
                    aria-labelledby={`capability-tab-${activeCap.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:h-[560px] grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] xl:grid-cols-[1.12fr_0.88fr] gap-5 xl:gap-7 items-stretch"
                  >
                    {/* COLUMN A: CORE CAPABILITY CONTENT & CTAs (JUSTIFY CENTER VERTICALLY) */}
                    <div className="flex flex-col justify-center h-full text-left py-0.5">
                      <div>
                        {/* Eyebrow Label (Clean cyan font, no number prefix) */}
                        <span className="block text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-[#169DC8] mb-1.5 sm:mb-2">
                          {activeCap.eyebrowLabel}
                        </span>

                        {/* Topic Heading (Generous, premium sizing) */}
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-extrabold text-[#051329] tracking-tight leading-[1.16] mb-2 sm:mb-2">
                          {activeCap.titleName}
                        </h3>

                        {/* Supporting Headline */}
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#0D306C] leading-snug mb-2 sm:mb-2.5">
                          {activeCap.subheading}
                        </h4>

                        {/* Body Description */}
                        <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-3 sm:mb-3.5 font-normal">
                          {activeCap.body}
                        </p>

                        {/* Definition Text moved from right side: Exact same typography and styling as subheading & body, without background */}
                        {activeCap.aside.type === "definition" && (
                          <div className="mb-3.5 sm:mb-4">
                            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#0D306C] leading-snug mb-2 sm:mb-2.5">
                              {activeCap.aside.title}
                            </h4>
                            <div className="space-y-2">
                              {activeCap.aside.paragraphs.map((p, pIdx) => (
                                <p
                                  key={pIdx}
                                  className="text-sm sm:text-base text-[#505D74] leading-relaxed font-normal"
                                >
                                  {p}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Capability Checklist (Compact Tags without numbers, preventing button overflow) */}
                        {activeCap.aside.type !== "definition" && (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-2.5 sm:mb-3 list-none p-0 m-0">
                            {activeCap.checklist.map((item, idx) => {
                              const IconComponent = item.icon;
                              const isFullWidth = idx === 4;

                              return (
                                <li
                                  key={item.label}
                                  className={`group/tag relative rounded-xl border border-[#DCE8F4] bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center gap-2.5 text-left shadow-2xs hover:shadow-sm hover:border-[#008EC4]/50 transition-all duration-200 ${isFullWidth ? "sm:col-span-2" : ""
                                    }`}
                                >
                                  {/* Left: Pastel Blue Circular Icon Disc */}
                                  <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 shrink-0 rounded-full bg-[#E5F2FC] flex items-center justify-center text-[#0D306C] group-hover/tag:scale-105 transition-transform duration-200">
                                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D306C]" aria-hidden="true" />
                                  </span>

                                  {/* Right: Label & Amber Bar (Count removed) */}
                                  <div className="flex-1 min-w-0">
                                    <span className="block text-[#0D306C] font-semibold text-[11px] sm:text-[11.5px] leading-tight tracking-tight font-manrope line-clamp-2">
                                      {item.label}
                                    </span>
                                    <span className="block w-4 sm:w-5 h-[2px] rounded-full bg-[#F59E0B] mt-1 group-hover/tag:w-7 group-hover/tag:bg-[#D97706] transition-all duration-200" />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* Action CTAs: Directly below content */}
                        <div className="flex flex-wrap xl:flex-nowrap items-center gap-2.5 sm:gap-3 pt-1 shrink-0">
                          {/* Primary Button */}
                          <Link
                            to={activeCap.primaryCta.href}
                            className="btn-navy shrink-0"
                          >
                            <span>{activeCap.primaryCta.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                          </Link>

                          {/* Secondary Button */}
                          {activeCap.secondaryCta && (
                            <Link
                              to={activeCap.secondaryCta.href}
                              className="btn-white cursor-pointer shrink-0 whitespace-nowrap"
                            >
                              <span>{activeCap.secondaryCta.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* COLUMN B: ASIDE CONTENT (FULL HEIGHT, STARTS & ENDS WITH COLUMN A) */}
                    <div className="flex flex-col justify-between h-full text-left py-0.5">
                      <CapabilityAsideVisual
                        aside={activeCap.aside}
                        checklist={activeCap.checklist}
                        id={activeCap.id}
                        isMobile={false}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE VIEW (<MD): PROGRESSIVE SCROLLING FLOW (NO TABS / NAV BUTTONS)  */}
      {/*    EACH STAGE FLOWS SEQUENTIALLY DOWN AS THE USER SCROLLS                 */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full max-w-xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 mt-4">
        {CAPABILITIES.map((cap) => {
          const IconComponent = cap.icon;

          return (
            <React.Fragment key={`mobile-stage-${cap.id}`}>
              {/* Individual Stage (scroll-reveal, no card surface) */}
              <motion.article
                id={`stage-${cap.id}`}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden"
              >
                {/* Ambient Card Header Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#169DC8]/8 rounded-full blur-2xl pointer-events-none" />

                {/* Stage Header: Number Badge, Eyebrow & Icon */}
                <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D244D] to-[#051329] text-[#38BDF8] flex items-center justify-center shadow-[0_4px_14px_rgba(13,36,77,0.25)] border border-[#169DC8]/40 shrink-0">
                      <IconComponent className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#169DC8]">
                          STAGE {cap.tabNumber} OF 06
                        </span>
                        <span className="text-[#CBD5E1]">•</span>
                        <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#7B8B9E]">
                          {cap.navLabel}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-[#051329] tracking-tight font-manrope leading-tight">
                        {cap.titleName}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Subheading & Narrative Body */}
                <div className="relative z-10 mb-3.5">
                  <p className="text-xs sm:text-sm font-bold text-[#0D306C] leading-snug font-manrope">
                    {cap.subheading}
                  </p>
                  <p className="text-xs sm:text-[12.5px] text-[#505D74] leading-relaxed mt-1.5">
                    {cap.body}
                  </p>
                </div>

                {/* Definition Narrative if definition variant */}
                {cap.aside.type === "definition" && (
                  <div className="relative z-10 mb-3 pt-2 border-t border-[#E2E8F0]/80">
                    <h5 className="text-xs sm:text-sm font-bold text-[#0D306C] mb-1 font-manrope">
                      {cap.aside.title}
                    </h5>
                    <div className="space-y-1.5">
                      {cap.aside.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-[12.5px] text-[#505D74] leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visual Graphic Section for this stage */}
                <div className="relative z-10 my-3.5 pt-2 pb-1 border-t border-[#E2E8F0]/80">
                  <CapabilityAsideVisual
                    aside={cap.aside}
                    checklist={cap.checklist}
                    id={`mobile-${cap.id}`}
                    isMobile={true}
                  />
                </div>

                {/* Checklist Tags (Core Capabilities) */}
                {cap.aside.type !== "definition" && (
                  <div className="relative z-10 mb-4 pt-2 border-t border-[#E2E8F0]/80">
                    <span className="block text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#169DC8] mb-2">
                      KEY CAPABILITIES
                    </span>
                    <ul className="grid grid-cols-1 gap-2">
                      {cap.checklist.map((item) => {
                        const TagIcon = item.icon;
                        return (
                          <li
                            key={item.label}
                            className="group/tag relative rounded-xl border border-[#DCE8F4] bg-white px-3 py-2 flex items-center gap-2.5 text-left shadow-2xs hover:border-[#008EC4]/50 transition-all"
                          >
                            <span className="w-7 h-7 shrink-0 rounded-full bg-[#E5F2FC] flex items-center justify-center text-[#0D306C]">
                              <TagIcon className="w-3.5 h-3.5 text-[#0D306C]" aria-hidden="true" />
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="block text-[#0D306C] font-semibold text-[11px] leading-snug font-manrope">
                                {item.label}
                              </span>
                              <span className="block w-4 h-[2px] rounded-full bg-[#F59E0B] mt-0.5" />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Call-to-Action Buttons */}
                <div className="relative z-10 flex flex-col gap-2 pt-1">
                  <Link
                    to={cap.primaryCta.href}
                    className="btn-navy w-full"
                  >
                    <span>{cap.primaryCta.mobileLabel ?? cap.primaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </Link>
                  {cap.secondaryCta && (
                    <Link
                      to={cap.secondaryCta.href}
                      className="btn-white text-center justify-center text-xs py-2"
                    >
                      <span>{cap.secondaryCta.mobileLabel ?? cap.secondaryCta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                    </Link>
                  )}
                </div>
              </motion.article>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
