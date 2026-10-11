"use client";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Layers,
  Globe,
  Compass,
  Users,
  Award,
  Workflow,
  PlusCircle,
  MapPin,
  Laptop,
  CheckCircle2,
  Cpu,
  Bot,
  ShieldCheck,
  BarChart3,
  Network,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  Building2,
  Check,
  Target,
  ArrowUpRight,
  Code2,
  Database,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import AnswerList from "@/components/gcc-operations/AnswerList";
import SourceNote from "@/components/gcc-operations/SourceNote";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("scale");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const startingPoints = [
  {
    title: "A first team that needs to become a function",
    desc: "The pilot worked. Now it needs leadership, structure and a hiring engine that can sustain growth.",
    badge: "STARTING POINT 01",
    image: "/images/gcc-operations/gcc-ops-workforce.jpg",
    aspect: "aspect-[4/3]",
    points: [
      "Successful pilot validation",
      "Need for dedicated function leadership",
      "Hiring engine capacity expansion",
      "Target: Structured function pod",
    ],
  },
  {
    title: "One function that needs to become several",
    desc: "Engineering is stable, and product, data or operations want to follow. Each needs its own mandate and shared operations.",
    badge: "STARTING POINT 02",
    image: "/images/gcc-operations/gcc-arch-teams.jpg",
    aspect: "aspect-[16/10]",
    points: [
      "Stable engineering foundation",
      "Cross-functional expansion demand",
      "Shared operating infrastructure",
      "Target: Multi-disciplinary center",
    ],
  },
  {
    title: "One city considering a second",
    desc: "Talent, resilience or cost point to another location. The operating model has to run two sites without doubling itself.",
    badge: "STARTING POINT 03",
    image: "/images/gcc-operations/gcc-positioning-tower.jpg",
    aspect: "aspect-[4/3]",
    points: [
      "Specialized regional talent pool",
      "Dual-site business continuity",
      "Unified shared operations layer",
      "Target: Multi-city footprint",
    ],
  },
  {
    title: "Engineering that wants AI and data",
    desc: "The next mandate needs AI engineering, data and platform capability the center does not yet have.",
    badge: "STARTING POINT 04",
    image: "/images/gcc-operations/gcc-ops-performance.jpg",
    aspect: "aspect-[16/10]",
    points: [
      "High-value AI platform scope",
      "Specialized machine learning talent",
      "Modern data platform ownership",
      "Target: AI engineering center",
    ],
  },
  {
    title: "Delivery that wants product ownership",
    desc: "Moving from executing tickets to owning a product, platform or service end to end.",
    badge: "STARTING POINT 05",
    image: "/images/gcc-operations/gcc-hq-leadership.jpg",
    aspect: "aspect-[4/3]",
    points: [
      "Shift from task execution to roadmap",
      "End-to-end product accountability",
      "Headquarters trusted autonomy",
      "Target: Global product ownership",
    ],
  },
  {
    title: "A center professionalizing its operations",
    desc: "Growth has outrun the informal processes, and headquarters wants evidence before the next mandate.",
    badge: "STARTING POINT 06",
    image: "/images/gcc-operations/gcc-ops-scale.jpg",
    aspect: "aspect-[16/10]",
    points: [
      "Replacing informal workflows",
      "Audit-grade evidence generation",
      "Standardized service catalogue",
      "Target: Mature operating layer",
    ],
  },
];

const capabilities = [
  { title: "Mandate expansion", desc: "Defining the next mandate and what it requires before committing to it.", icon: Compass },
  { title: "Workforce planning", desc: "Roles, skills and phasing for the expanded scope, connected to the hiring engine.", icon: Users },
  { title: "Leadership evolution", desc: "From one generalist leader to a leadership team with clear decision rights.", icon: Award },
  { title: "Operating-model redesign", desc: "Services, cadence and responsibilities re-cut for the larger center.", icon: Workflow },
  { title: "New functions", desc: "Standing up product, data, operations or shared-service functions on the same operating layer.", icon: PlusCircle },
  { title: "New teams", desc: "Adding teams without adding a new way of working for each.", icon: Layers },
  { title: "New city assessment", desc: "Talent, cost, resilience and operating implications of a second location.", icon: MapPin },
  { title: "Distributed and remote operating model", desc: "Running across sites and remote employees with consistent controls and support.", icon: Laptop },
  { title: "Capability maturity", desc: "Moving from execution to ownership with evidence headquarters trusts.", icon: CheckCircle2 },
  { title: "Automation", desc: "Operating processes standardized and automated before they multiply.", icon: Zap },
  { title: "AI enablement", desc: "AI-assisted work, AI-enabled products and the roles and skills they need.", icon: Cpu },
  { title: "Governance redesign", desc: "Layered reviews, automated controls and reporting that aggregates across functions.", icon: ShieldCheck },
  { title: "Service-management maturity", desc: "Catalogue, service levels and KPIs extended to the new scope.", icon: BarChart3 },
  { title: "Vendor rationalization", desc: "Fewer, better-managed suppliers as the center grows.", icon: Network },
  { title: "Operating-cost visibility", desc: "People cost, operating services and infrastructure shown separately as the center scales.", icon: BarChart3 },
  { title: "Succession", desc: "Cover for the leaders whose roles become harder to fill as the center grows.", icon: Calendar },
  { title: "Transition planning", desc: "Where expansion coincides with a move to captive operation, planned together.", icon: Sparkles },
];

interface ExpansionPathStep {
  id: string;
  name: string;
  description: string;
  tag: "mandate" | "foundation" | "growth";
  tagLabel: string;
  tagSub: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
}

const expansionStages: ExpansionPathStep[] = [
  {
    id: "01",
    name: "New mandate",
    description: "Defined and funded.",
    tag: "mandate",
    tagLabel: "Strategy",
    tagSub: "Charter",
    icon: Compass,
    x: 100,
    y: 110,
  },
  {
    id: "02",
    name: "Workforce",
    description: "Roles, skills, phasing, hiring engine.",
    tag: "mandate",
    tagLabel: "Talent",
    tagSub: "Phased",
    icon: Users,
    x: 310,
    y: 240,
  },
  {
    id: "03",
    name: "Leadership",
    description: "Function leads, decision rights, succession.",
    tag: "foundation",
    tagLabel: "Governance",
    tagSub: "Leads",
    icon: Award,
    x: 520,
    y: 110,
  },
  {
    id: "04",
    name: "Systems",
    description: "Workplace, IT and service management extended.",
    tag: "foundation",
    tagLabel: "Platform",
    tagSub: "IT & Tools",
    icon: Laptop,
    x: 730,
    y: 240,
  },
  {
    id: "05",
    name: "Governance",
    description: "Reviews, controls and reporting at the new scale.",
    tag: "foundation",
    tagLabel: "Assurance",
    tagSub: "Controls",
    icon: ShieldCheck,
    x: 940,
    y: 110,
  },
  {
    id: "06",
    name: "AI / automation",
    description: "Capability scaled without proportional headcount.",
    tag: "growth",
    tagLabel: "Leverage",
    tagSub: "Non-Linear",
    icon: Cpu,
    x: 1150,
    y: 240,
  },
  {
    id: "07",
    name: "Expanded ownership",
    description: "The center owns more, with evidence.",
    tag: "growth",
    tagLabel: "Ownership",
    tagSub: "Sovereign",
    icon: Target,
    x: 1360,
    y: 110,
  },
];

/**
 * Expansion Path Lifecycle Component
 * Consolidated via UniversalLifecycle (7 stages)
 */
function ExpansionPathLifecycle() {
  return (
    <UniversalLifecycle
      stages={expansionStages}
      id="expansion-path-cycle"
    />
  );
}



{/* 3D Isometric Corner Illustrations for AI Transformation Bridge Cards      */ }
{/* ========================================================================= */ }
function BotAssistantGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="bot-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="bot-visor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1E3F" />
            <stop offset="100%" stopColor="#051226" />
          </linearGradient>
          <linearGradient id="tablet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D306C" />
            <stop offset="100%" stopColor="#071A3C" />
          </linearGradient>
        </defs>
        <g transform="translate(10, 50)">
          <rect x="0" y="0" width="55" height="42" rx="6" fill="url(#tablet-grad)" stroke="#169DC8" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#38BDF8" />
          <line x1="20" y1="12" x2="45" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="22" r="3" fill="#38BDF8" />
          <line x1="20" y1="22" x2="42" y2="22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="32" r="3" fill="#38BDF8" />
          <line x1="20" y1="32" x2="38" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
        <path d="M 68 70 C 80 65 85 70 95 72" stroke="#169DC8" strokeWidth="1.5" strokeDasharray="3 3" />
        <g transform="translate(75, 40)">
          <rect x="29" y="-8" width="4" height="10" rx="2" fill="#0D306C" />
          <circle cx="31" cy="-10" r="4.5" fill="#169DC8" />
          <rect x="-4" y="24" width="6" height="16" rx="3" fill="#0D306C" />
          <rect x="60" y="24" width="6" height="16" rx="3" fill="#0D306C" />
          <rect x="0" y="0" width="62" height="60" rx="24" fill="url(#bot-head-grad)" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="8" y="14" width="46" height="30" rx="14" fill="url(#bot-visor-grad)" />
          <ellipse cx="22" cy="28" rx="5" ry="6" fill="#38BDF8" />
          <ellipse cx="40" cy="28" rx="5" ry="6" fill="#38BDF8" />
          <circle cx="20.5" cy="26" r="1.5" fill="#FFFFFF" />
          <circle cx="38.5" cy="26" r="1.5" fill="#FFFFFF" />
          <path d="M 28 38 Q 31 41 34 38" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

function DataCapabilityGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="disc-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#123B7A" />
            <stop offset="100%" stopColor="#0B234A" />
          </linearGradient>
          <linearGradient id="disc-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D2B59" />
            <stop offset="100%" stopColor="#06152D" />
          </linearGradient>
        </defs>
        <g transform="translate(10, 30)">
          <rect x="0" y="0" width="55" height="50" rx="6" fill="#FFFFFF" stroke="#D2DCF0" strokeWidth="1.5" />
          <line x1="8" y1="42" x2="48" y2="42" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="8" y1="12" x2="8" y2="42" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="14" y="28" width="6" height="14" rx="1.5" fill="#0D306C" />
          <rect x="23" y="22" width="6" height="20" rx="1.5" fill="#169DC8" />
          <rect x="32" y="16" width="6" height="26" rx="1.5" fill="#38BDF8" />
          <rect x="41" y="10" width="6" height="32" rx="1.5" fill="#F19326" />
        </g>
        <g transform="translate(75, 45)">
          <g transform="translate(0, 50)">
            <path d="M 0 12 C 0 20 54 20 54 12 L 54 28 C 54 36 0 36 0 28 Z" fill="url(#disc-body)" stroke="#169DC8" strokeWidth="1" />
            <ellipse cx="27" cy="12" rx="27" ry="10" fill="url(#disc-top)" stroke="#38BDF8" strokeWidth="1" />
          </g>
          <g transform="translate(0, 25)">
            <path d="M 0 12 C 0 20 54 20 54 12 L 54 28 C 54 36 0 36 0 28 Z" fill="url(#disc-body)" stroke="#169DC8" strokeWidth="1" />
            <ellipse cx="27" cy="12" rx="27" ry="10" fill="url(#disc-top)" stroke="#38BDF8" strokeWidth="1" />
          </g>
          <g transform="translate(0, 0)">
            <path d="M 0 12 C 0 20 54 20 54 12 L 54 28 C 54 36 0 36 0 28 Z" fill="url(#disc-body)" stroke="#169DC8" strokeWidth="1" />
            <ellipse cx="27" cy="12" rx="27" ry="10" fill="url(#disc-top)" stroke="#38BDF8" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlatformLayersGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="layer-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B498E" />
            <stop offset="100%" stopColor="#0B234A" />
          </linearGradient>
          <linearGradient id="layer-side" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D2B59" />
            <stop offset="100%" stopColor="#051226" />
          </linearGradient>
        </defs>
        <g transform="translate(45, 45)">
          <g transform="translate(0, 48)">
            <path d="M 35 0 L 70 18 L 70 28 L 35 10 Z" fill="url(#layer-side)" />
            <path d="M 0 18 L 35 0 L 35 10 L 0 28 Z" fill="url(#layer-side)" />
            <path d="M 35 0 L 70 18 L 35 36 L 0 18 Z" fill="url(#layer-top)" stroke="#169DC8" strokeWidth="1" />
          </g>
          <g transform="translate(0, 24)">
            <path d="M 35 0 L 70 18 L 70 28 L 35 10 Z" fill="url(#layer-side)" />
            <path d="M 0 18 L 35 0 L 35 10 L 0 28 Z" fill="url(#layer-side)" />
            <path d="M 35 0 L 70 18 L 35 36 L 0 18 Z" fill="url(#layer-top)" stroke="#169DC8" strokeWidth="1" />
          </g>
          <g transform="translate(0, 0)">
            <path d="M 35 0 L 70 18 L 70 28 L 35 10 Z" fill="url(#layer-side)" />
            <path d="M 0 18 L 35 0 L 35 10 L 0 28 Z" fill="url(#layer-side)" />
            <path d="M 35 0 L 70 18 L 35 36 L 0 18 Z" fill="url(#layer-top)" stroke="#38BDF8" strokeWidth="1.2" />
            <path
              d="M 27 18 C 27 15 29 13 32 13 C 33 11 36 10 38 11 C 41 9 44 11 44 14 C 47 14 48 16 47 18 C 48 20 47 22 45 22 L 28 22 C 26 22 25 20 27 18 Z"
              fill="#FFFFFF"
              stroke="#169DC8"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function UpskillingStepsGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <g transform="translate(30, 40)">
          <rect x="5" y="80" width="30" height="20" rx="3" fill="#0B234A" stroke="#169DC8" strokeWidth="1" />
          <rect x="35" y="60" width="30" height="40" rx="3" fill="#123B7A" stroke="#169DC8" strokeWidth="1" />
          <rect x="65" y="40" width="30" height="60" rx="3" fill="#1B498E" stroke="#38BDF8" strokeWidth="1" />
          <path
            d="M 20 70 L 50 45 L 80 15"
            stroke="#169DC8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path d="M 80 15 L 70 16 M 80 15 L 78 25" stroke="#169DC8" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(74, 18)">
            <circle cx="8" cy="4" r="3.5" fill="#06152D" />
            <path d="M 3 18 L 5 11 C 5 9 11 9 11 11 L 13 18 Z" fill="#06152D" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LaptopCodeGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <g transform="translate(25, 45)">
          <rect x="15" y="0" width="80" height="52" rx="4" fill="#06152D" stroke="#334155" strokeWidth="1.5" />
          <rect x="18" y="3" width="74" height="46" rx="2" fill="#030A17" />
          <line x1="24" y1="10" x2="48" y2="10" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="16" x2="65" y2="16" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="21" x2="52" y2="21" stroke="#F19326" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="26" x2="70" y2="26" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="31" x2="58" y2="31" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="38" x2="42" y2="38" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 52 L 110 52 L 95 68 L 15 68 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          <rect x="42" y="54" width="26" height="4" rx="1.5" fill="#64748B" />
        </g>
      </svg>
    </div>
  );
}

function TalentNetworkGraphic() {
  return (
    <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-24 sm:h-28 pointer-events-none select-none overflow-hidden">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B498E" />
            <stop offset="100%" stopColor="#081B3E" />
          </linearGradient>
        </defs>
        <g transform="translate(25, 45)">
          <g transform="translate(36, 10)">
            <circle cx="16" cy="10" r="10" fill="url(#avatar-grad)" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M 4 36 C 4 26 28 26 28 36 Z" fill="url(#avatar-grad)" stroke="#38BDF8" strokeWidth="1.5" />
          </g>
          <g transform="translate(2, 28)">
            <circle cx="14" cy="8" r="8" fill="url(#avatar-grad)" stroke="#169DC8" strokeWidth="1" />
            <path d="M 3 30 C 3 21 25 21 25 30 Z" fill="url(#avatar-grad)" stroke="#169DC8" strokeWidth="1" />
          </g>
          <g transform="translate(72, 28)">
            <circle cx="14" cy="8" r="8" fill="url(#avatar-grad)" stroke="#169DC8" strokeWidth="1" />
            <path d="M 3 30 C 3 21 25 21 25 30 Z" fill="url(#avatar-grad)" stroke="#169DC8" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

const capabilityLevers = [
  { title: "AI-enabled productivity", desc: "Engineering, support and operations teams working with AI tools, measured on cycle time and quality.", icon: Zap },
  { title: "Workflow redesign and automation", desc: "Eliminate, standardize and automate before adding people to a process.", icon: Workflow },
  { title: "GenAI and agentic AI", desc: "Copilots, assistants and controlled agents built into the center's own products and operations.", icon: Bot },
  { title: "Data capability", desc: "Data engineering and platform ownership that makes AI and analytics work possible.", icon: Layers },
  { title: "Platform ownership", desc: "Owning a platform end to end rather than delivering tickets on it.", icon: Building2 },
  { title: "Upskilling and new operating roles", desc: "Reskilling paths for existing teams and a small number of anchors in AI engineering, evaluation and AI governance.", icon: Users },
];

const readinessTests = [
  { id: "test-delivery", badge: "TEST 01", title: "Delivery reliability", desc: "The current mandate is delivered predictably, with quality and service levels headquarters can see.", icon: CheckCircle2 },
  { id: "test-leadership", badge: "TEST 02", title: "Leadership capacity", desc: "The leadership team can absorb more scope without the center lead becoming the bottleneck.", icon: Award },
  { id: "test-workforce", badge: "TEST 03", title: "Workforce plan and hiring engine", desc: "The roles the new mandate needs are planned and the hiring engine can fill them without quality loss.", icon: Users },
  { id: "test-governance", badge: "TEST 04", title: "Governance and controls", desc: "Decision rights, controls and reporting will hold at the new scale rather than break under it.", icon: ShieldCheck },
  { id: "test-evidence", badge: "TEST 05", title: "Evidence headquarters trusts", desc: "The case for the mandate is made with operating data, not with a deck.", icon: BarChart3 },
];

const secondCity = [
  {
    id: "city-talent",
    condition: "CONDITION 01",
    title: "The mandate needs talent the first city cannot supply",
    desc: "A specific skill pool, not a general sense that another city is cheaper.",
    icon: Users,
  },
  {
    id: "city-resilience",
    condition: "CONDITION 02",
    title: "Resilience is a requirement",
    desc: "Business continuity or client obligations require a second site.",
    icon: ShieldCheck,
  },
  {
    id: "city-cost",
    condition: "CONDITION 03",
    title: "The cost profile is materially different for the roles in question",
    desc: "Tested against actual roles and seniority, not headline averages.",
    icon: BarChart3,
  },
  {
    id: "city-operating",
    condition: "CONDITION 04",
    title: "The operating model can run two sites without duplicating every function",
    desc: "Shared services, shared governance, one way of working.",
    icon: Workflow,
  },
];

export default function ScaleExpansion() {
  const renderReadinessItem = (item: (typeof readinessTests)[0], index: number) => {
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

        {/* Middle: Test Badge, Title & Description */}
        <div className="flex-1 px-1 sm:px-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#008EC4] uppercase px-2 py-0.5 rounded-md bg-[#EDF6FD] border border-[#D5E8F8]">
              {item.badge || `TEST 0${index + 1}`}
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

  const renderCityItem = (item: (typeof secondCity)[0]) => {
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

        {/* Middle: Condition Badge, Title & Description */}
        <div className="flex-1 px-1 sm:px-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#008EC4] uppercase px-2 py-0.5 rounded-md bg-[#EDF6FD] border border-[#D5E8F8]">
              {item.condition}
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
  return (
    <GccOperationsLayout
      page={page}
      eyebrow="Scale & Expansion · GCC Operations"
      heroDescription="New mandates, new functions, new teams, a second city, AI and data capability, product or platform ownership: NeoIntelli plans and operates the expansion so the workforce, leadership, systems and governance grow with the mandate instead of behind it."
      secondaryCta={{ label: "See the expansion path", href: "#expansion-path" }}
      contextualLink={{ label: "Adding AI capability? Explore AI GCC →", href: PILLAR_LINKS.aiGcc }}
      cta={{
        title: "Plan the next stage of your GCC before you commit to it.",
        description: "A readiness review of your current center against the mandate you want it to take on: workforce, leadership, systems, governance and cost.",
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
              SCALE &amp; EXPANSION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Growth exposes every shortcut taken at launch<span className="text-[#008EC4]">.</span>
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              A center that works at one size does not automatically work at three times that size. Informal processes become inconsistent, controls fray, and leadership becomes the constraint.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              Scale the workforce, leadership, systems, and governance with the mandate instead of behind it.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Scale &amp; Expansion is the part of the operating layer that plans and runs growth so the center gets stronger as it gets larger.
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
              imageSrc="/images/gcc-operations/gcc-ops-scale.jpg"
              imageAlt="GCC Scale & Expansion Operations"
            >
              Scale &amp; Expansion is the part of NeoIntelli&apos;s GCC operating layer for centers that already exist and need to grow: more people, more functions, a larger mandate, a second location, AI and data capability, or a move from delivery to product and platform ownership. It is for GCC heads and headquarters sponsors who want the expansion to strengthen operations, governance and workforce planning rather than dilute them. NeoIntelli assesses readiness, redesigns the operating model where needed, plans the workforce and leadership changes, and operates the expanded layer.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: Where Scaling Usually Starts (Editorial Grid) */}
      <OpsSection
        id="starting-points"
        eyebrow="EXPANSION TRIGGERS"
        title="Where scaling usually starts."
        intro="Six common starting points. Most centers recognize themselves in more than one."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {startingPoints.map((item) => (
            <div
              key={item.title}
              className="flex flex-col text-left bg-transparent border-0 shadow-none p-0 group"
            >
              {/* Image Frame */}
              <div className="relative w-full overflow-hidden rounded-none border border-[#0D306C]/15 mb-4 bg-[#0D244D]">
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D244D]/85 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-white uppercase px-2.5 py-1 bg-[#0D244D]/80 backdrop-blur-md border border-white/20 font-semibold">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-[#0D244D] font-extrabold text-lg sm:text-xl tracking-tight leading-snug mb-2 group-hover:text-[#008EC4] transition-colors">
                {item.title}
              </h3>

              <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed mb-4">
                {item.desc}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1.5 mb-5 pt-2 border-t border-[#D5E3EE]/70">
                {item.points.map((pt, i) => (
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
      </OpsSection>

      {/* SECTION 3: Scope & Capabilities */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What scale and expansion covers."
        intro="Seventeen operational disciplines that allow centers to multiply capacity, scope, and geographic footprint without multiplying overhead."
        align="center"
        width="wide"
      >
        <CapabilityGrid variant="scale" items={capabilities} rowPattern={[4, 4, 4, 5]} />
      </OpsSection>

      {/* SECTION 4: The Expansion Path Lifecycle */}
      <OpsSection
        id="expansion-path"
        eyebrow="THE EXPANSION PATH"
        title="From new mandate to expanded ownership, in order."
        intro="Each step is the precondition for the next. Adding headcount before leadership, or leadership before governance, is how expansion becomes complexity."
        tone="muted"
        align="center"
        width="wide"
      >
        <ExpansionPathLifecycle />
      </OpsSection>

      {/* SECTION 5: AI Transformation Bridge (Navy Theme with Organic Wave Divider) */}
      <OpsSection
        id="ai-transformation"
        eyebrow="AI TRANSFORMATION BRIDGE"
        title="Scaling headcount is not the only way to scale capability."
        intro="The next mandate does not always need proportionally more people. It often needs different capability: AI-enabled productivity in the existing teams, automation of the operating processes, and a small number of new roles that change what the center can own. NeoIntelli connects the expansion plan to its AI Engineering, AI Talent and AI GCC practices so capability scales faster than headcount."
        theme="navy"
        align="center"
        width="wide"
        wavesOnMobile
      >
        {/* Modular "business card" grid — OperatingRealityCard design (no numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-7xl mx-auto items-stretch">
          {[
            { title: "AI-enabled productivity", desc: "Engineering, support and operations teams working with AI tools, measured on cycle time and quality.", icon: Zap, href: undefined },
            { title: "Workflow redesign and automation", desc: "Eliminate, standardize and automate before adding people to a process.", icon: Workflow, href: undefined },
            { title: "GenAI and agentic AI", desc: "Copilots, assistants and controlled agents built into the center's own products and operations.", icon: Bot, href: undefined },
            { title: "Data capability", desc: "Data engineering and platform ownership that makes AI and analytics work possible.", icon: Database, href: undefined },
            { title: "Platform ownership", desc: "Owning a platform end to end rather than delivering tickets on it.", icon: Building2, href: undefined },
            { title: "Upskilling and new operating roles", desc: "Reskilling paths for existing teams and a small number of anchors in AI engineering, evaluation and AI governance.", icon: Users, href: undefined },
            { title: "AI Engineering", desc: "Build the AI capability and automate operating processes.", icon: Code2, href: PILLAR_LINKS.aiEngineering },
            { title: "AI Talent", desc: "Find and technically validate the AI, data and platform roles.", icon: Users, href: PILLAR_LINKS.aiTalent },
            { title: "AI GCC", desc: "Build an AI-focused capability center, or turn the existing one into one.", icon: Globe, href: PILLAR_LINKS.aiGcc },
          ].map((c) => (
            <OperatingRealityCard
              key={c.title}
              item={{ title: c.title, desc: c.desc, icon: c.icon, href: c.href }}
            />
          ))}
        </div>
      </OpsSection>

      {/* SECTION 6: Readiness Tests */}
      <OpsSection
        id="readiness"
        eyebrow="EXPANSION READINESS"
        title="Is the center ready for a bigger mandate?"
        intro="Five tests NeoIntelli applies before recommending that a center take on more. Passing them is what turns a request for a mandate into a case for one."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
            <div className="space-y-1 sm:space-y-2">
              {readinessTests.slice(0, 3).map((item, idx) => renderReadinessItem(item, idx))}
            </div>
            <div className="space-y-1 sm:space-y-2">
              {readinessTests.slice(3, 5).map((item, idx) => renderReadinessItem(item, idx + 3))}
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 7: When a Second Location Makes Sense */}
      <OpsSection
        id="second-city"
        eyebrow="MULTI-CITY STRATEGY"
        title="When a second location makes sense."
        intro="A second city should solve a specific problem. These are the conditions under which it usually does."
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
            <div className="space-y-1 sm:space-y-2">
              {secondCity.slice(0, 2).map(renderCityItem)}
            </div>
            <div className="space-y-1 sm:space-y-2">
              {secondCity.slice(2, 4).map(renderCityItem)}
            </div>
          </div>
        </div>

        <SourceNote className="mt-8 max-w-5xl mx-auto">
          City comparisons on talent depth and cost are made per role and seniority during the assessment. NeoIntelli does not publish generic city rankings on this page because they change and rarely match a specific mandate.
        </SourceNote>

        <p className="mt-8 text-sm text-[#505D74] text-center max-w-3xl mx-auto">
          Governance for a larger center is covered under{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/governance-compliance`} className={link}>Governance &amp; Compliance</Link>. The workforce plan for the expanded scope is covered under{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/workforce-strategy`} className={link}>Workforce Strategy</Link>. Moving to captive operation at the same time? See{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/bot-transition`} className={link}>BOT &amp; Transition</Link>.
        </p>
      </OpsSection>

      {/* SECTION 8: Common Inquiries */}
      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about scaling a GCC"
        intro="Direct answers to key operating, leadership, multi-site, and capability questions before scaling a Global Capability Center."
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
