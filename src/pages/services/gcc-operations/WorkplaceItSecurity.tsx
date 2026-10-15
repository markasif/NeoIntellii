"use client";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Laptop,
  Headphones,
  UserCheck,
  KeyRound,
  Network,
  AppWindow,
  Activity,
  ShieldAlert,
  Server,
  Lock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Bot,
  BookOpen,
  ArrowUpRight,
  Users,
  Share2,
  Building2,
  Database,
  BarChart3,
  RefreshCw,
  User,
  FileText,
  Coins,
  Shield,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import PillFeatureCardGrid from "@/components/shared/PillFeatureCardGrid";
import SourceNote from "@/components/gcc-operations/SourceNote";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";

const page = gccOperationsPage("workplace");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const groups = [
  {
    title: "Workspace and connectivity",
    image: "/images/services/gcc-operations/scope-workspace.webp",
    items: ["Workspace coordination", "Connectivity", "Vendor coordination"],
  },
  {
    title: "Devices and applications",
    image: "/images/services/gcc-operations/scope-devices.webp",
    items: ["Devices", "Endpoint management", "Collaboration tools", "Software and license coordination", "Asset lifecycle"],
  },
  {
    title: "Identity and access",
    image: "/images/services/gcc-operations/scope-identity.webp",
    items: ["Identity", "SSO", "MFA", "Access provisioning", "Joiner, mover and leaver workflow"],
  },
  {
    title: "Support and ITSM",
    image: "/images/services/gcc-operations/scope-support.webp",
    items: ["IT helpdesk", "ITSM", "Incident handling"],
  },
  {
    title: "Security and continuity",
    image: "/images/services/gcc-operations/scope-security.webp",
    items: ["Security tooling coordination", "Monitoring", "Business continuity support"],
  },
];

interface FoundationStep {
  id: string;
  name: string;
  description: string;
  tag: "access" | "infrastructure" | "assurance";
  tagLabel: string;
  tagSub: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
}

const foundationStages: FoundationStep[] = [
  {
    id: "01",
    name: "Employee",
    description: "Joins through the HR event.",
    tag: "access",
    tagLabel: "HR Ingestion",
    tagSub: "Day 0",
    icon: UserCheck,
    x: 90,
    y: 110,
  },
  {
    id: "02",
    name: "Identity",
    description: "Enterprise account, groups, MFA.",
    tag: "access",
    tagLabel: "Zero-Trust",
    tagSub: "SSO/IAM",
    icon: KeyRound,
    x: 270,
    y: 240,
  },
  {
    id: "03",
    name: "Device",
    description: "Managed build, encryption, protection.",
    tag: "infrastructure",
    tagLabel: "Endpoint",
    tagSub: "MDM Enrolled",
    icon: Laptop,
    x: 450,
    y: 110,
  },
  {
    id: "04",
    name: "Network",
    description: "Secure connectivity to enterprise systems.",
    tag: "infrastructure",
    tagLabel: "SD-WAN",
    tagSub: "IPSec/VPN",
    icon: Network,
    x: 630,
    y: 240,
  },
  {
    id: "05",
    name: "Enterprise apps",
    description: "Role-based access, licensed and tracked.",
    tag: "access",
    tagLabel: "SaaS/RBAC",
    tagSub: "Licensed",
    icon: AppWindow,
    x: 810,
    y: 110,
  },
  {
    id: "06",
    name: "Support",
    description: "Local service desk on the enterprise ITSM.",
    tag: "infrastructure",
    tagLabel: "ITSM",
    tagSub: "24/7 SLA",
    icon: Headphones,
    x: 990,
    y: 240,
  },
  {
    id: "07",
    name: "Monitoring",
    description: "Endpoint, access and service health.",
    tag: "assurance",
    tagLabel: "Observability",
    tagSub: "Real-Time",
    icon: Activity,
    x: 1170,
    y: 110,
  },
  {
    id: "08",
    name: "Security",
    description: "Policies applied, exceptions recorded, incidents handled.",
    tag: "assurance",
    tagLabel: "Governance",
    tagSub: "Audit-Ready",
    icon: ShieldAlert,
    x: 1350,
    y: 240,
  },
];

/**
 * IT Foundation Lifecycle Component
 * Consolidated via UniversalLifecycle (8 stages)
 */
function ItFoundationLifecycle() {
  return (
    <UniversalLifecycle
      stages={foundationStages}
      id="it-foundation-cycle"
    />
  );
}

const dayOneLeft = [
  {
    id: "identity",
    icon: Users,
    text: "Identity accounts and access groups created from the HR record",
  },
  {
    id: "connectivity",
    icon: Share2,
    text: "Connectivity to the systems the team will actually use",
  },
  {
    id: "support",
    icon: Headphones,
    text: "A service desk contact and the ITSM process the team will follow",
  },
  {
    id: "workspace",
    icon: Building2,
    text: "Workspace ready to use, with network and peripherals tested",
  },
  {
    id: "monitoring",
    icon: BarChart3,
    text: "Monitoring live before the first production workload",
  },
];

const dayOneRight = [
  {
    id: "devices",
    icon: Laptop,
    text: "Devices with the standard build, enrolled and encrypted",
  },
  {
    id: "collaboration",
    icon: Users,
    text: "Collaboration tools provisioned and licensed",
  },
  {
    id: "security",
    icon: ShieldCheck,
    text: "Security awareness onboarding scheduled in the first week",
  },
  {
    id: "asset",
    icon: Database,
    text: "Asset register open, with every device recorded",
  },
  {
    id: "workflow",
    icon: RefreshCw,
    text: "Joiner, mover and leaver workflow tested end to end",
  },
];

function DayOneReadinessChecklist() {
  const renderItem = (item: (typeof dayOneLeft)[0]) => {
    const IconComponent = item.icon;

    return (
      <div
        key={item.id}
        className="flex items-center justify-between gap-3.5 sm:gap-5 py-2.5 sm:py-3.5 group select-none transition-colors border-b border-[#DCE8F4]/60 last:border-b-0"
      >
        {/* Left: Navy Outline Icon */}
        <div className="shrink-0 text-[#0D244D] group-hover:text-[#008EC4] transition-colors">
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
        </div>

        {/* Middle: Text */}
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
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-2 sm:gap-y-3">
        {/* Left Column (Items 1, 3, 5, 7, 9) */}
        <div className="space-y-1 sm:space-y-2">
          {dayOneLeft.map(renderItem)}
        </div>

        {/* Right Column (Items 2, 4, 6, 8, 10) */}
        <div className="space-y-1 sm:space-y-2">
          {dayOneRight.map(renderItem)}
        </div>
      </div>
    </div>
  );
}

const dayOne = [
  "Identity accounts and access groups created from the HR record",
  "Devices with the standard build, enrolled and encrypted",
  "Connectivity to the systems the team will actually use",
  "Collaboration tools provisioned and licensed",
  "A service desk contact and the ITSM process the team will follow",
  "Security awareness onboarding scheduled in the first week",
  "Workspace ready to use, with network and peripherals tested",
  "Asset register open, with every device recorded",
  "Monitoring live before the first production workload",
  "Joiner, mover and leaver workflow tested end to end",
];

const good = [
  {
    title: "Identity-first access",
    desc: "Enterprise identity, MFA and conditional policies on every system the center uses.",
    badge: "STANDARD 01",
    tag: "ZERO-TRUST",
  },
  {
    title: "Managed devices as a condition of access",
    desc: "No unmanaged device reaches enterprise data. Exceptions are recorded and time-limited.",
    badge: "STANDARD 02",
    tag: "ENDPOINT",
  },
  {
    title: "Data flows mapped and documented",
    desc: "Where data is processed and stored is known, recorded and reviewed with the client's advisers.",
    badge: "STANDARD 03",
    tag: "DATA MAPPING",
  },
  {
    title: "ITSM and monitoring from the start",
    desc: "Tickets, incidents and changes visible to headquarters in the tools headquarters already uses.",
    badge: "STANDARD 04",
    tag: "OBSERVABILITY",
  },
  {
    title: "Integration by the enterprise pattern",
    desc: "Connectivity and application access follow the enterprise architecture, not a local shortcut.",
    badge: "STANDARD 05",
    tag: "ARCHITECTURE",
  },
  {
    title: "Evidence as a by-product",
    desc: "Access reviews, device records and change logs kept as work happens, so audits are reviews rather than projects.",
    badge: "STANDARD 06",
    tag: "AUDIT-READY",
  },
  {
    title: "Cost discipline",
    desc: "Licenses, devices and connectivity tracked per employee and reviewed each quarter.",
    badge: "STANDARD 07",
    tag: "GOVERNANCE",
  },
  {
    title: "Continuity arrangements",
    desc: "A tested plan for power, connectivity and workspace disruption proportionate to the center's role.",
    badge: "STANDARD 08",
    tag: "RESILIENCE",
  },
];

const standardIcons = [
  User,
  Laptop,
  Database,
  BarChart3,
  Share2,
  FileText,
  Coins,
  Shield,
];

function CostDisciplineVisual() {
  return (
    <div className="relative w-full h-full flex items-end justify-center pb-2 select-none overflow-hidden bg-[#041126]">
      {/* Background cyan ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#169DC8]/20 rounded-full blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 240 140"
        fill="none"
        className="w-[85%] h-[85%] overflow-visible pointer-events-none"
      >
        <defs>
          <linearGradient id="cost-bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#169DC8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#082247" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="cost-line-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#008EC4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="cost-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 4 ascending glowing pillars with rounded caps */}
        <rect x="25" y="90" width="22" height="42" rx="4" fill="url(#cost-bar-grad)" />
        <rect x="75" y="70" width="22" height="62" rx="4" fill="url(#cost-bar-grad)" />
        <rect x="125" y="45" width="22" height="87" rx="4" fill="url(#cost-bar-grad)" />
        <rect x="175" y="20" width="22" height="112" rx="4" fill="url(#cost-bar-grad)" />

        {/* Dynamic sweeping bezier curve trendline */}
        <path
          d="M 15,122 C 65,110 115,80 185,22"
          stroke="url(#cost-line-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#cost-cyan-glow)"
        />

        {/* Luminous Apex Node */}
        <circle cx="185" cy="22" r="5" fill="#38BDF8" filter="url(#cost-cyan-glow)" />
        <circle cx="185" cy="22" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

function ContinuityVisual() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-end">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/gcc-operations/standards/continuity_building.webp"
          alt="Continuity arrangements"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-bottom transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Soft dark vignette blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041126]/60 via-transparent to-transparent" />
      </div>
      {/* Corner NeoIntelli Amber accent geometry */}
      <svg
        viewBox="0 0 140 140"
        fill="none"
        className="absolute -right-1 -bottom-1 w-24 h-24 sm:w-28 sm:h-28 z-10 pointer-events-none drop-shadow-sm"
      >
        <path
          d="M 140,0 C 120,40 70,90 0,140 L 140,140 Z"
          fill="#F19326"
        />
      </svg>
    </div>
  );
}

const aiInIt = [
  {
    title: "Ticket triage",
    desc: "NeoIntelli can implement classification, routing and enrichment of tickets before a person picks them up.",
    icon: Cpu,
  },
  {
    title: "Service desk copilots",
    desc: "Assistants inside the existing ITSM tool that draft responses and suggest resolutions from the runbooks.",
    icon: Bot,
  },
  {
    title: "Knowledge management",
    desc: "Runbooks and decisions captured and kept current, searchable with citations.",
    icon: BookOpen,
  },
];

export default function WorkplaceItSecurity() {
  return (
    <GccOperationsLayout
      page={page}
      eyebrow="Workplace, IT & Security · GCC Operations"
      heroDescription="Devices, identity and access, connectivity, collaboration tools, service desk, asset lifecycle and security coordination, run as an extension of your enterprise IT rather than an exception to it. Your security policies and architecture decisions stay with headquarters."
      secondaryCta={{ label: "See the IT foundation", href: "#it-foundation" }}
      contextualLink={{ label: "Building data or AI platforms? Explore AI Engineering →", href: PILLAR_LINKS.aiEngineering }}
      cta={{
        title: "Review the IT setup your GCC employees actually work on.",
        description: "A structured review of identity, devices, connectivity, support and joiner, mover and leaver controls against what your enterprise security team expects.",
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
              WORKPLACE &amp; IT
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              The workplace and enterprise IT foundation needed to run the center.
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              A GCC is an extension of the enterprise&apos;s most sensitive systems, staffed by people who sit in a different country from the IT team that owns those systems.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              Turnkey devices, identity, connectivity, and zero-trust controls configured to your enterprise architecture.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              Workplace, IT &amp; Security manages the local IT lifecycle from day one, operating within your identity platform, security policies, and ITSM processes.
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
              imageSrc="/images/services/gcc-operations/gcc-ops-workplace.webp"
              imageAlt="GCC Workplace IT & Security Operations"
            >
              Workplace, IT &amp; Security is the part of NeoIntelli&apos;s GCC operating layer that gives every employee in the India center a managed device, the right access, secure connectivity to headquarters systems, collaboration tools and local support, with joiner, mover and leaver controls that hold up in an audit. It is for companies whose enterprise IT sits in another country and who do not want to build a local IT function to support a growing team. NeoIntelli operates within the client&apos;s identity platform, security policies and ITSM process, and coordinates local vendors and security tooling.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: Scope & Capabilities */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What workplace and IT operations covers."
        intro="Grouped the way the work is actually run. The engagement defines which groups NeoIntelli operates and which the enterprise IT team keeps."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {groups.map((group) => (
            <div
              key={group.title}
              className="group relative rounded-2xl bg-white border border-[#DCE7F6] hover:border-[#169DC8]/60 shadow-[0_2px_12px_rgba(13,48,108,0.04)] hover:shadow-[0_8px_24px_rgba(22,157,200,0.12)] p-5 sm:p-6 min-h-[220px] sm:min-h-[235px] lg:min-h-[245px] flex items-center justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1"
            >
              {/* Left Content Area: Heading + Points with Arrows */}
              <div className="relative z-10 w-[58%] sm:w-[60%] max-w-[58%] sm:max-w-[60%] pr-2 sm:pr-3 flex flex-col justify-center h-full">
                {/* Heading */}
                <h3 className="text-base sm:text-lg lg:text-[18px] font-extrabold text-[#0D306C] tracking-tight leading-snug group-hover:text-[#008EC4] transition-colors">
                  {group.title}
                </h3>

                {/* Points with Arrows */}
                <ul className="mt-3 sm:mt-3.5 space-y-1.5 sm:space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 sm:gap-2">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#008EC4] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-medium text-xs sm:text-[13px] text-[#2B3D66] leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side Artwork: Generated matching image with NO shadow overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[40%] h-full pointer-events-none overflow-hidden">
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}

          {/* Out-of-Scope Architecture Card (6th Card) */}
          <div className="group relative rounded-2xl bg-white border border-dashed border-[#0D306C]/25 hover:border-[#169DC8]/60 shadow-[0_2px_12px_rgba(13,48,108,0.04)] hover:shadow-[0_8px_24px_rgba(22,157,200,0.12)] p-5 sm:p-6 min-h-[220px] sm:min-h-[235px] lg:min-h-[245px] flex items-center justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1">
            <div className="relative z-10 w-[58%] sm:w-[60%] max-w-[58%] sm:max-w-[60%] pr-2 sm:pr-3 flex flex-col justify-center h-full space-y-2.5">
              <h3 className="text-base sm:text-lg lg:text-[18px] font-extrabold text-[#0D244D] tracking-tight leading-snug">
                Deliberately not on this page
              </h3>

              <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed">
                Data platform engineering, analytics infrastructure, data governance design and AI infrastructure belong to the engineering functions that own them.
              </p>

              <div className="pt-1 text-xs sm:text-sm font-semibold flex items-center gap-2 text-[#008EC4]">
                <Link to={PILLAR_LINKS.aiEngineering} className={link}>AI Engineering</Link>
                <span className="text-[#505D74]/60">·</span>
                <Link to={PILLAR_LINKS.aiGcc} className={link}>AI GCC</Link>
              </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[40%] h-full pointer-events-none overflow-hidden">
              <Image
                src="/images/industries/tech-data-platform.webp"
                alt="Separate Layer - AI & Data Engineering"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </OpsSection>

      {/* SECTION 3: The IT Foundation Lifecycle */}
      <OpsSection
        id="it-foundation"
        eyebrow="THE IT FOUNDATION"
        title="From employee to secured, supported and monitored."
        intro="Every employee passes through the same chain. The chain is what makes access consistent, support predictable and evidence available."
        align="center"
        width="wide"
      >
        <ItFoundationLifecycle />
      </OpsSection>

      {/* SECTION 4: Day-One IT Readiness */}
      <OpsSection
        id="day-one"
        eyebrow="DAY-ONE READINESS"
        title="What should be ready before the first employees join."
        intro="The first cohort should not spend its first week waiting for access. This is the readiness list NeoIntelli works from."
        tone="muted"
        align="center"
        width="wide"
      >
        <DayOneReadinessChecklist />
      </OpsSection>

      {/* SECTION 5: Operational Standards */}
      <OpsSection
        id="what-good-looks-like"
        eyebrow="OPERATIONAL STANDARDS"
        title="What good GCC workplace and IT operations looks like."
        intro="Eight clear principles that prevent operational drift and keep enterprise security standards intact."
        theme="navy"
        align="center"
        width="wide"
        wavesOnMobile
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {good.map((item, index) => {
            let visualElement: React.ReactNode = null;
            if (index === 0) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/identity.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 1) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/devices.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 2) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/data-flows.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 3) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/itsm-monitoring.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 4) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/enterprise-network.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 5) {
              visualElement = (
                <Image
                  src="/images/services/gcc-operations/standards/evidence-audit.webp"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              );
            } else if (index === 6) {
              visualElement = <CostDisciplineVisual />;
            } else if (index === 7) {
              visualElement = <ContinuityVisual />;
            }

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                className="group flex flex-col text-left select-none"
              >
                {/* 1. Rectangle Image on Top */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3.5 border border-white/10 bg-[#071D42]/60 shadow-[0_4px_20px_rgba(0,0,0,0.35)] group-hover:border-[#38BDF8]/40 group-hover:shadow-[0_8px_25px_rgba(56,189,248,0.2)] transition-all duration-300">
                  {visualElement}
                </div>

                {/* 2. Heading Below Image */}
                <h3 className="font-extrabold text-[16px] sm:text-[17.5px] leading-snug tracking-tight text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* 3. Description Below Heading */}
                <p className="text-[#94A3B8] text-xs sm:text-[13px] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <SourceNote theme="dark" className="mt-12 max-w-5xl mx-auto">
          No control removes risk entirely. These are the operating conditions that reduce it and make it visible. Security policy, architecture standards and risk acceptance decisions remain with the client&apos;s security leadership.
        </SourceNote>
      </OpsSection>

      {/* SECTION 6: AI in IT Operations */}
      <OpsSection
        id="ai-in-it-operations"
        eyebrow="AI INTEGRATION"
        title="Where AI can help inside IT operations."
        intro="Intelligent agents and copilots applied where they produce concrete cycle-time and accuracy improvements."
        tone="muted"
        align="center"
        width="wide"
      >
        <PillFeatureCardGrid
          items={aiInIt.map((item, index) => ({
            eyebrow: String(index + 1).padStart(2, "0"),
            title: item.title,
            desc: item.desc,
          }))}
          className="max-w-6xl mx-auto"
        />

        <p className="mt-10 text-sm text-[#505D74] text-center max-w-2xl mx-auto">
          Implementation sits with <Link to={PILLAR_LINKS.aiEngineering} className={link}>AI Engineering</Link>. Measuring the service desk on outcomes sits with{" "}
          <Link to={`${GCC_OPERATIONS_BASE}/service-management-performance`} className={link}>Service Management &amp; Performance</Link>.
        </p>
      </OpsSection>

      {/* SECTION 7: FAQs */}
      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about GCC workplace, IT and security"
        intro="The answers describe what reduces risk in a GCC context and what headquarters should expect to see. None of them claims to eliminate risk."
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
