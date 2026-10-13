"use client";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  Shield,
  FileCheck,
  CheckCircle2,
  Scale,
  Users,
  AlertOctagon,
  FileText,
  Compass,
  Building2,
  Building,
  Eye,
  Database,
  RefreshCw,
  CheckSquare,
  ArrowRight,
  Lock,
  Calendar,
  Sparkles,
  Award,
  AlertTriangle,
  FolderLock,
  ArrowUpRight,
  Check,
} from "lucide-react";
import GccOperationsLayout from "@/components/gcc-operations/GccOperationsLayout";
import OpsSection from "@/components/gcc-operations/OpsSection";
import CapabilityGrid from "@/components/gcc-operations/CapabilityGrid";
import InBriefCard from "@/components/gcc-operations/InBriefCard";
import AnswerList from "@/components/gcc-operations/AnswerList";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import SourceNote, { LEGAL_VALIDATION_NOTE } from "@/components/gcc-operations/SourceNote";
import TypewriterParagraph from "@/components/gcc-operations/TypewriterParagraph";
import { gccOperationsPage, gccOperationsFaqs, PILLAR_LINKS, GCC_OPERATIONS_BASE } from "@/data/gccOperationsContent";
import { LABOUR_CODES_STATEMENT } from "@/data/gccPolicy";

const page = gccOperationsPage("governance");
const faqs = gccOperationsFaqs[page.path];
const link = "text-[#008EC4] hover:text-[#0D306C] font-semibold underline underline-offset-4 decoration-[#008EC4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-sm";

const capabilities = [
  { title: "Decision rights", desc: "Who decides what, between headquarters and the center, written down and reviewed.", icon: Scale },
  { title: "RACI", desc: "Responsibility for each governance activity, so nothing depends on goodwill.", icon: Users },
  { title: "Committee structure", desc: "Operating, risk and business reviews with the right people and a fixed cadence.", icon: Building2 },
  { title: "Escalation model", desc: "What escalates, to whom, and how fast, inside the center and to headquarters.", icon: AlertOctagon },
  { title: "Risk register", desc: "Owned, rated, reviewed on a cadence and connected to decisions.", icon: AlertTriangle },
  { title: "Control framework", desc: "Controls mapped to the policies and regulations agreed with the client's advisers.", icon: Shield },
  { title: "Policy coordination", desc: "Local policies kept aligned to global intent, with exceptions recorded.", icon: FileText },
  { title: "Regulatory tracking", desc: "Changes that affect the center tracked and routed to the right adviser and owner.", icon: Compass },
  { title: "Vendor risk", desc: "Due diligence, terms, monitoring and exit plans for the center's suppliers.", icon: Building },
  { title: "Third-party risk", desc: "The wider set of partners, platforms and processors the center depends on.", icon: Lock },
  { title: "Audit readiness", desc: "Controls operated continuously so an audit is a review rather than a scramble.", icon: FileCheck },
  { title: "Evidence management", desc: "Evidence collected and organized against the control framework as work happens.", icon: FolderLock },
  { title: "Board reporting", desc: "Performance, risk and compliance status in a form a board can act on.", icon: Eye },
  { title: "Data governance coordination", desc: "Operating the data handling controls the client's data governance function defines.", icon: Database },
  { title: "Business continuity governance", desc: "Continuity plans owned, tested and reviewed in proportion to the center's role.", icon: RefreshCw },
  { title: "Issue remediation", desc: "Findings and incidents tracked to closure with owners and dates.", icon: CheckSquare },
];

interface GovernanceStep {
  id: string;
  name: string;
  description: string;
  tag: "authority" | "control" | "reporting";
  tagLabel: string;
  tagSub: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
}

const governanceStages: GovernanceStep[] = [
  {
    id: "01",
    name: "Decision",
    description: "Written decision rights.",
    tag: "authority",
    tagLabel: "Charter",
    tagSub: "Rights",
    icon: Scale,
    x: 100,
    y: 110,
  },
  {
    id: "02",
    name: "Owner",
    description: "A named person, not a team.",
    tag: "authority",
    tagLabel: "RACI",
    tagSub: "Accountable",
    icon: Users,
    x: 310,
    y: 240,
  },
  {
    id: "03",
    name: "Control",
    description: "Mapped to policy or regulation.",
    tag: "control",
    tagLabel: "Framework",
    tagSub: "Mandatory",
    icon: Shield,
    x: 520,
    y: 110,
  },
  {
    id: "04",
    name: "Evidence",
    description: "Collected as work happens.",
    tag: "control",
    tagLabel: "Audit-Trail",
    tagSub: "Continuous",
    icon: FolderLock,
    x: 730,
    y: 240,
  },
  {
    id: "05",
    name: "Review",
    description: "On a fixed cadence.",
    tag: "reporting",
    tagLabel: "Cadence",
    tagSub: "Periodic",
    icon: Calendar,
    x: 940,
    y: 110,
  },
  {
    id: "06",
    name: "Escalation",
    description: "Defined path and speed.",
    tag: "reporting",
    tagLabel: "Triage",
    tagSub: "High-Priority",
    icon: AlertOctagon,
    x: 1150,
    y: 240,
  },
  {
    id: "07",
    name: "Board visibility",
    description: "Honest, consistent reporting.",
    tag: "reporting",
    tagLabel: "Executive",
    tagSub: "Transparent",
    icon: Eye,
    x: 1360,
    y: 110,
  },
];

/**
 * Governance Model Lifecycle Component
 * Consolidated via UniversalLifecycle (7 stages)
 */
function GovernanceModelLifecycle() {
  return (
    <UniversalLifecycle
      stages={governanceStages}
      id="governance-model-cycle"
    />
  );
}

const reviews = [
  {
    title: "Center operating review",
    desc: "Monthly. Center leadership and NeoIntelli. Delivery, people, IT, risk signals, open actions.",
    icon: Building2,
  },
  {
    title: "Risk and compliance review",
    desc: "Monthly or quarterly by risk profile. Risk register, control status, vendor reviews, regulatory changes, remediation.",
    icon: Shield,
  },
  {
    title: "Business review with headquarters",
    desc: "Quarterly. Outcomes against the mandate, risk posture, compliance status, decisions needed from headquarters.",
    icon: Award,
  },
];

const reviewCadence = [
  {
    title: "Decision rights and risk framework",
    desc: "Reviewed annually, or when the mandate, structure or leadership changes.",
    badge: "ANNUAL",
    icon: Scale,
    isTall: true,
  },
  {
    title: "Controls and policies",
    desc: "Reviewed at least twice a year, with owners confirming they still operate as designed.",
    badge: "SEMI-ANNUAL",
    icon: RefreshCw,
    isTall: false,
  },
  {
    title: "Regulatory horizon",
    desc: "Scanned continuously, with changes routed to the client's advisers and the relevant control owner.",
    badge: "CONTINUOUS",
    icon: Compass,
    isTall: false,
  },
  {
    title: "Event-triggered reviews",
    desc: "Acquisitions, new locations, new regulated work and AI deployments trigger a review outside the cadence.",
    badge: "AD-HOC",
    icon: AlertTriangle,
    isTall: true,
  },
];

const doesSay = [
  "Supports readiness",
  "Control mapping",
  "Policy alignment",
  "Audit preparation",
  "Evidence coordination",
  "Implementation support",
  "Operating controls",
];

const doesNotSay = [
  "Guarantees compliance",
  "Certifies SOC 2 or ISO 27001",
  "Promises zero audit findings",
  "Provides legal, tax or regulatory advice",
];

export default function GovernanceCompliance() {
  const [hoveredCadenceCard, setHoveredCadenceCard] = useState<number | null>(null);

  return (
    <GccOperationsLayout
      page={page}
      eyebrow="Governance & Compliance · GCC Operations"
      heroDescription="Decision rights, committees, escalation, a living risk register, a control framework, vendor risk, audit readiness and board reporting, operated so headquarters always knows who decides what, what could go wrong and what is being done about it."
      secondaryCta={{ label: "See the governance model", href: "#governance-model" }}
      contextualLink={{ label: "Governing models and agents? Explore Responsible AI Governance →", href: PILLAR_LINKS.responsibleAi }}
      cta={{
        title: "Review the governance your GCC runs on.",
        description: "A structured review of decision rights, risk register, controls, vendor risk and reporting against the size and risk profile of your center.",
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
              GOVERNANCE &amp; COMPLIANCE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D244D] tracking-[-0.03em] leading-[1.14] mb-4">
              Governance is what makes a center trusted with more.
            </h2>
            <p className="text-[#505D74] font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              A quarterly steering committee and an annual audit used to be enough. They are not any more. Regulatory frameworks, control obligations, and board visibility converge at once.
            </p>
            <p className="text-[#0D244D] font-bold text-base sm:text-lg tracking-tight mb-4">
              Centers that run governance as an operating system earn the right to take on strategic enterprise scope.
            </p>
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
              NeoIntelli operates the decision cadence, risk register, and statutory evidence coordination under your global oversight.
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
              imageSrc="/images/services/gcc-operations/gcc-ops-governance.webp"
              imageAlt="GCC Governance, Risk & Compliance Operations"
            >
              Governance &amp; Compliance is the part of NeoIntelli&apos;s GCC operating layer that keeps control, risk and decision rights visible as an India center grows: decision rights between headquarters and the center, committee cadence, escalation, a risk register with owners, a control framework mapped to agreed policies and regulations, vendor and third-party risk, audit readiness, evidence coordination and board reporting. It is for leaders who must answer to a board, a regulator or an auditor for a center in another country. NeoIntelli operates the governance cadence and coordinates compliance workflows. Legal interpretation stays with qualified advisers.
            </InBriefCard>
          </motion.div>
        </div>
      </OpsSection>

      {/* SECTION 2: Capabilities Grid */}
      <OpsSection
        id="capabilities"
        eyebrow="SCOPE"
        title="What governance and compliance operations covers."
        intro="Sixteen vital disciplines ensuring structural accountability, continuous evidence gathering, and regulatory visibility."
        tone="muted"
        align="center"
        width="wide"
      >
        <CapabilityGrid variant="governance" items={capabilities} />
      </OpsSection>

      {/* SECTION 3: The Governance Model Lifecycle */}
      <OpsSection
        id="governance-model"
        eyebrow="THE GOVERNANCE MODEL"
        title="From decision to board visibility."
        intro="Every decision that matters has an owner, a control, evidence, a review and an escalation path. That chain is what a board, a regulator or an auditor will ask to see."
        align="center"
        width="wide"
      >
        <GovernanceModelLifecycle />
      </OpsSection>

      {/* SECTION 4: How the Governance Cadence Runs */}
      <OpsSection
        id="how-it-runs"
        eyebrow="OPERATING CADENCE"
        title="How the governance cadence runs."
        intro="Three reviews, each with a purpose, plus a review schedule for the framework itself. Sized for the center, not copied from a large enterprise template."
        tone="muted"
        align="center"
        width="wide"
      >
        {/* 3 Review Cadences using Half-Sink Slot Count */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto mb-16">
          {reviews.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Slotted Step Number Design matching reference image */}
                  <SlottedStepNumber index={index} />

                  <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#505D74] text-xs sm:text-sm leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                  <ItemIcon className="w-6 h-6 stroke-[1.8]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Framework Review Frequency Subheading */}
        <h3 className="text-[#0D244D] font-extrabold text-xl sm:text-2xl text-center mb-8">
          How often the framework itself is reviewed
        </h3>

        {/* 4 Cards: Layout matching overview center archetypes (Card 1 & 4 tall, Cards 2 & 3 short, bottom aligned) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-5 lg:gap-6 pt-4 sm:pt-6 max-w-6xl mx-auto">
          {reviewCadence.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredCadenceCard === idx;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredCadenceCard(idx)}
                onMouseLeave={() => setHoveredCadenceCard(null)}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 flex flex-col justify-center items-center text-center group cursor-pointer ${
                  item.isTall
                    ? "sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[400px] lg:min-h-[420px]"
                    : "sm:p-7 min-h-[250px] sm:min-h-[260px]"
                } ${
                  isHovered
                    ? "border border-[#16427D]/60 shadow-[0_16px_40px_rgba(8,27,62,0.35)] -translate-y-1"
                    : "bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 shadow-[0_8px_24px_rgba(13,48,108,0.06)] hover:-translate-y-1 hover:border-[#16427D]/60 hover:shadow-[0_16px_40px_rgba(8,27,62,0.35)]"
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

                {/* Hover Navy Blue Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] transition-opacity duration-300 pointer-events-none z-0 ${
                    isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full border border-white/5 pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  {/* Badge Pill */}
                  <span
                    className={`inline-block text-[10.5px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                      item.isTall ? "mb-4 sm:mb-5" : "mb-3"
                    } transition-colors duration-300 ${
                      isHovered
                        ? "bg-white/15 text-white border border-white/20"
                        : "bg-[#EDF6FD] text-[#008EC4] border border-[#D5E8F8] group-hover:bg-white/15 group-hover:text-white group-hover:border-white/20"
                    }`}
                  >
                    {item.badge}
                  </span>

                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      item.isTall ? "mb-6 sm:mb-8" : "mb-4 sm:mb-5"
                    } ${
                      isHovered
                        ? "bg-white text-[#008EC4] border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] scale-105"
                        : "bg-[#EDF3FB] border border-[#C5D7EE] text-[#008EC4] shadow-xs group-hover:bg-white group-hover:text-[#008EC4] group-hover:border-white group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-[#008EC4] stroke-[2.2] transition-colors duration-300" />
                  </div>

                  <h4
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`font-bold tracking-tight mb-2 sm:mb-3 transition-colors duration-300 leading-snug ${
                      item.isTall ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                    } ${isHovered ? "!text-white" : "text-[#0D306C] group-hover:!text-white"}`}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{ color: isHovered ? "#ffffff" : undefined }}
                    className={`leading-relaxed font-normal transition-colors duration-300 ${
                      item.isTall ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                    } ${isHovered ? "!text-white" : "text-[#505D74] group-hover:!text-white"}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </OpsSection>

      {/* SECTION 5: How NeoIntelli Describes Compliance Work */}
      <OpsSection
        id="how-we-describe-compliance"
        eyebrow="LEGAL PRECISION"
        title="How NeoIntelli describes compliance work."
        intro="Precision matters here. The words below are the words NeoIntelli uses in proposals and contracts, because they describe what an operating partner can actually be accountable for."
        align="center"
        width="wide"
      >
        <div className="rounded-3xl border border-[#DCE8F4] overflow-hidden shadow-[0_12px_40px_rgba(13,48,108,0.08)] grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Left Side: Navy Blue - NeoIntelli provides */}
          <div className="relative bg-gradient-to-br from-[#081B3E] via-[#0A224E] to-[#051329] text-white p-7 sm:p-9 lg:p-11 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1B3663]">
            {/* Subtle corner ambient glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F2D6B] via-[#123874] to-[#0A224E] border border-[#38BDF8]/40 flex items-center justify-center shadow-[0_4px_20px_rgba(56,189,248,0.25)] shrink-0">
                  <svg viewBox="14 4 92 104" fill="none" className="w-6 h-6 shrink-0" aria-hidden="true">
                    <path
                      d="M60 8L102 32V80L60 104L18 80V32L60 8ZM60 22L30 39V73L60 90L90 73V39L60 22Z"
                      fill="#38BDF8"
                      opacity="0.95"
                    />
                    <path
                      d="M44 70V39H49L68 63V39H76V70H71L52 47V70H44Z"
                      fill="#FFFFFF"
                    />
                    <circle cx="77" cy="42" r="4.5" fill="#38BDF8" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  NeoIntelli provides
                </h3>
              </div>

              {/* 2-Column Points with Transparent Arrows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {doesSay.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 group py-0.5">
                    <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5 transition-transform duration-200 group-hover:translate-x-1" />
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-white/10 text-xs text-[#94A3B8] leading-relaxed">
              Scope defined and contractually anchored in the operating agreement.
            </div>
          </div>

          {/* Right Side: White - NeoIntelli does not claim to */}
          <div className="relative bg-white text-[#2B3D66] p-7 sm:p-9 lg:p-11 flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EDF6FD] to-[#E2F0FC] border border-[#B9DCF7] flex items-center justify-center text-[#008EC4] shadow-xs shrink-0">
                  <Scale className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D306C] tracking-tight">
                  NeoIntelli does not claim to
                </h3>
              </div>

              {/* Points with Transparent Arrows */}
              <div className="space-y-4">
                {doesNotSay.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 group py-0.5">
                    <ArrowRight className="w-4 h-4 text-[#008EC4] shrink-0 mt-0.5 transition-transform duration-200 group-hover:translate-x-1" />
                    <span className="text-sm font-semibold text-[#0D244D] group-hover:text-[#008EC4] transition-colors leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-[#EDF3FB] text-[#505D74] text-xs sm:text-sm leading-relaxed font-normal">
                Certifications and audit opinions are issued by accredited certification bodies and auditors. NeoIntelli supports the readiness work that precedes them.
              </div>
            </div>
          </div>
        </div>

        <SourceNote className="mt-8 max-w-6xl mx-auto">{LEGAL_VALIDATION_NOTE}</SourceNote>
      </OpsSection>

      {/* SECTION 6: Data Protection & Cross-Border Transfers */}
      <OpsSection
        id="data-protection"
        eyebrow="STATUTORY FRAMEWORKS"
        title="Data protection and cross-border transfers."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto text-[#505D74] text-base sm:text-[17px] leading-relaxed font-normal space-y-6 sm:space-y-8 text-left">
          <TypewriterParagraph
            text="India's Digital Personal Data Protection Act, 2023, and the rules and regulations made under it, set the framework for personal data processed in the center. Where the center processes personal data of people in other jurisdictions, other regimes may apply in parallel: the GDPR for personal data of people in the European Union, or sector-specific rules such as HIPAA for certain United States health information. Each of these frameworks has its own scope and its own obligations."
          />
          <p>
            Transfer mechanisms are not interchangeable. Standard contractual clauses, binding corporate rules and data processing agreements serve different purposes under different regimes, and a mechanism that satisfies one framework does not automatically satisfy another or every India requirement. NeoIntelli maps data flows, keeps records of what is processed where, and coordinates the operating controls the client&apos;s advisers specify. It does not treat any single mechanism as a universal answer.
          </p>
          <p>
            The EU AI Act and comparable AI-specific regulation apply to certain AI systems rather than to the center as a whole. They are handled in AI governance, described below, and connected to the center&apos;s risk register.
          </p>
        </div>
        <SourceNote className="mt-8 max-w-5xl mx-auto">{LEGAL_VALIDATION_NOTE}</SourceNote>
      </OpsSection>

      {/* SECTION 7: Labour Codes Statutory Update */}
      <OpsSection
        id="labour-codes"
        eyebrow="EMPLOYMENT REGULATION"
        title="A major India employment-law change to account for."
        align="center"
        width="wide"
      >
        <div className="max-w-5xl mx-auto text-[#505D74] text-base sm:text-[17px] leading-relaxed font-normal space-y-6 sm:space-y-8 text-left">
          <TypewriterParagraph
            text={LABOUR_CODES_STATEMENT}
          />
          <p>
            What this means in practice varies. Central rules and several state rules under the Codes are still being notified,
            and state-specific requirements such as Shops and Establishments registration continue to apply alongside the central
            framework. NeoIntelli tracks the changes that affect the center and routes them to the client&apos;s advisers and the
            relevant control owner; it does not interpret them.
          </p>
        </div>
        <SourceNote className="mt-8 max-w-5xl mx-auto">
          Source: Ministry of Labour &amp; Employment / Press Information Bureau, four Labour Codes brought into effect
          21 November 2025. Last checked Sep 2026. {LEGAL_VALIDATION_NOTE}
        </SourceNote>
      </OpsSection>

      {/* SECTION 8: AI Governance Differentiation */}
      <OpsSection
        id="ai-governance"
        eyebrow="DISTINCTION"
        title="GCC operating governance is not AI governance."
        intro="This page covers the governance of the center: decision rights, risk, controls, entity and operational responsibilities, board reporting, audit readiness and vendor risk. Governing models, GenAI applications and agents is a separate discipline with its own controls."
        tone="muted"
        align="center"
        width="wide"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Left Column: GCC Operating Governance */}
          <div className="pb-8 md:pb-0 md:pr-10 lg:pr-14 flex flex-col justify-between">
            <div>
              <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-3">
                GCC operating governance
              </h3>
              <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
                Decision rights, risk register, control framework, vendor risk, audit readiness, board reporting. Applies to the whole center regardless of what it builds.
              </p>
            </div>
          </div>

          {/* Right Column: AI Governance */}
          <div className="pt-8 md:pt-0 md:pl-10 lg:pl-14 flex flex-col justify-between">
            <div>
              <h3 className="text-[#0D306C] font-extrabold text-xl sm:text-2xl mb-3">
                AI governance
              </h3>
              <p className="text-[#505D74] text-sm sm:text-base leading-relaxed mb-5">
                AI inventory, risk classification, model and agent controls, evaluation, monitoring, human oversight and audit evidence for specific AI systems. Connected to the center&apos;s risk register, owned in a separate service.
              </p>
            </div>
            <div className="pt-4 border-t border-[#0D306C]/10 text-sm text-[#505D74]">
              For model, GenAI and agent governance, explore{" "}
              <Link to={PILLAR_LINKS.responsibleAi} className={link}>Responsible AI Governance</Link>.
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-[#505D74] text-center max-w-2xl mx-auto leading-relaxed">
          Where AI can help inside governance operations: NeoIntelli can implement evidence collection against the control framework, regulatory change monitoring and document processing for vendor reviews, through{" "}
          <Link to={PILLAR_LINKS.aiEngineering} className={link}>AI Engineering</Link>.
        </p>
      </OpsSection>

      {/* SECTION 9: FAQs */}
      <AnswerList
        id="buyer-questions"
        title="Questions buyers ask about GCC governance and compliance"
        intro={LEGAL_VALIDATION_NOTE}
        items={faqs}
        tone="white"
      />
    </GccOperationsLayout>
  );
}
