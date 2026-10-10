"use client";

import { Link } from "react-router-dom";
import { ChevronRight, Target, Users, GitBranch, Code2, CheckCircle2, Check, Rocket, Handshake, ClipboardList, FileCode2, Layers, RefreshCw, Scale, User, Package, FileText, ArrowRight, Sparkles, Bot, Database, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AmbientGlow from "@/components/ui/AmbientGlow";
import {
  AiDeliveryTeamsPageLayout,
  AiDeliveryTeamsHero,
  AiDeliveryTeamsCTA,
  RelatedAiDeliveryServices,
  AiDeliveryPathwaysFlow,
  WrongAnswerCards,
} from "@/components/ai-delivery-teams";
import AiDeliveryTeamsSubnav from "@/components/shared/AiDeliveryTeamsSubnav";
import InBrief from "@/components/ai-gcc/InBrief";
import Section from "@/components/ai-gcc/Section";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import MosaicGrid from "@/components/shared/MosaicGrid";
import UniversalLifecycle from "@/components/shared/UniversalLifecycle";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import { AI_DELIVERY_TEAMS, AI_ENGINEERING_LINKS, ECOSYSTEM_LINKS, SERVICE_INTEREST, ctaHref } from "@/lib/aiDeliveryTeams";

const PATH = AI_DELIVERY_TEAMS.dedicated;
const primaryCta = ctaHref({ service: SERVICE_INTEREST.dedicated, cta: "Build My Dedicated AI Team", source: PATH });

const bestFor = [
  { title: "An ongoing AI product roadmap", desc: "Features and capabilities queued behind each other rather than a single deliverable." },
  { title: "Continuous Agentic AI development", desc: "Agents, tools and workflows that keep changing as real usage teaches you what they should do." },
  { title: "A data and AI platform", desc: "Platform work that only pays off when someone maintains it across quarters." },
  { title: "SaaS AI capability", desc: "AI inside a product you ship to customers, with the release discipline that implies." },
  { title: "Long-term AI modernisation", desc: "Replacing or extending existing systems with AI over a sustained programme." },
  { title: "Multiple production releases", desc: "Where the second and third releases matter as much as the first." },
  { title: "Stable technical context", desc: "Where re-explaining the domain to new people each quarter is the actual cost." },
];

const notRightWhen = [
  {
    situation: "You need one specialist, not a team",
    alternative: "Hire or contract the individual",
    href: ECOSYSTEM_LINKS.talent,
    label: "AI and data recruitment",
    icon: User,
  },
  {
    situation: "The scope is short and closed",
    alternative: "Scope it as a delivery pod",
    href: AI_DELIVERY_TEAMS.pod,
    label: "AI Delivery Pod",
    icon: Package,
  },
  {
    situation: "You want employees on your payroll now",
    alternative: "Recruit permanently, transfer later if useful",
    href: ECOSYSTEM_LINKS.talent,
    label: "Hire permanent AI talent",
    icon: Users,
  },
  {
    situation: "The outcome is fixed, tightly bounded and short",
    alternative: "A pod with acceptance criteria fits better",
    href: AI_DELIVERY_TEAMS.pod,
    label: "AI Delivery Pod",
    icon: Target,
  },
  {
    situation: "There is no ongoing roadmap behind the first release",
    alternative: "Do not buy continuity you will not use",
    href: AI_DELIVERY_TEAMS.pod,
    label: "AI Delivery Pod",
    icon: FileText,
  },
];

const comparisonColumns = ["Permanent team", "Staff augmentation", "Dedicated AI Engineering Team", "Project delivery"];

const comparisonRows: { dimension: string; values: string[] }[] = [
  {
    dimension: "Continuity",
    values: [
      "High while people stay",
      "Low, individuals rotate",
      "Designed for continuity across releases",
      "Ends with the project",
    ],
  },
  {
    dimension: "Employment",
    values: ["Your payroll", "Vendor payroll", "NeoIntelli payroll", "Vendor payroll"],
  },
  {
    dimension: "Management",
    values: [
      "You manage everything",
      "You manage each individual",
      "Technical leadership inside the team, priorities from you",
      "Vendor project manager",
    ],
  },
  {
    dimension: "Delivery accountability",
    values: [
      "Yours",
      "Yours",
      "Shared against the roadmap",
      "Against a fixed statement of work",
    ],
  },
  {
    dimension: "Flexibility",
    values: [
      "Low, changes mean hiring or exits",
      "High for numbers, low for capability",
      "Composition adjusts as the roadmap moves",
      "Low, change requests",
    ],
  },
  {
    dimension: "Knowledge retention",
    values: [
      "Retained until attrition",
      "Leaves with the individual",
      "Held by the team and documented for transfer",
      "Leaves with the vendor",
    ],
  },
  {
    dimension: "Best-fit duration",
    values: ["Indefinite", "Weeks to months", "Ongoing, reviewed periodically", "Fixed project length"],
  },
];

const insideTheTeam = [
  { role: "Technical lead", desc: "Owns architecture decisions inside the agreed boundary, and is accountable for what the team ships." },
  { role: "AI engineers", desc: "GenAI, agentic or applied ML depth, chosen against the roadmap rather than a standard template." },
  { role: "Data engineering", desc: "Pipelines, retrieval and AI-ready data where the roadmap depends on them." },
  { role: "Platform and MLOps", desc: "Deployment, observability, cost and reliability for the AI workloads the team puts into production." },
  { role: "Evaluation", desc: "Test sets, regression and quality measurement so releases can be accepted on evidence." },
  { role: "Product or delivery support", desc: "Added when the team needs to shape the work as well as build it." },
];

// How it runs lifecycle steps for UniversalLifecycle
const howItRunsSteps = [
  { title: "Roadmap", desc: "", icon: Target },
  { title: "Stable team", desc: "", icon: Users },
  { title: "Sprints", desc: "", icon: GitBranch },
  { title: "Release", desc: "", icon: Rocket },
  { title: "Operate", desc: "", icon: Code2 },
  { title: "Continuous context", desc: "", icon: Handshake },
];

// Cadence items for CapabilitiesSection
const cadenceItems = [
  { title: "Roadmap intake", desc: "Your priorities enter the team's backlog through one agreed route, not through side channels.", icon: Target },
  { title: "Sprint or flow cadence", desc: "The team runs on your cadence and your tooling where agreed, not a parallel process.", icon: GitBranch },
  { title: "Shared code review", desc: "Your engineers review the team's work and the team reviews yours, on your standards.", icon: ClipboardList },
  { title: "Architecture review", desc: "Decisions that cross the agreed boundary come to your architects before they are made.", icon: FileCode2 },
  { title: "Release and acceptance", desc: "Business acceptance is evidence-based and defined before the work starts.", icon: Rocket },
  { title: "Periodic composition review", desc: "Team shape is revisited as the roadmap changes rather than held fixed by contract.", icon: RefreshCw },
];

const answers = [
  {
    question: "What is a dedicated AI engineering team?",
    answer: "A stable group of AI specialists aligned to one client's ongoing AI roadmap rather than a short standalone project. The team integrates into the client's delivery system and maintains context across releases, while NeoIntelli provides the agreed engineering capability, continuity and technical leadership.",
  },
  {
    question: "How does it differ from staff augmentation?",
    answer: "Staff augmentation supplies individuals who work under your management, and accountability stays with you for each contract. A dedicated team has technical leadership inside it, a shared delivery accountability against your roadmap, and continuity of context that individual contractors do not carry.",
  },
  {
    question: "Can the engineers work inside our repositories?",
    answer: "Where agreed and approved by your security process, yes. The team works under least privilege in your environments, following your access, review and release standards. What the team can reach is defined before delivery begins.",
  },
  {
    question: "Who manages the team?",
    answer: "You set priorities and business direction. Technical leadership, day-to-day engineering management and delivery quality sit with the team. That split is written down at scoping so neither side assumes the other is deciding.",
  },
  {
    question: "Can we interview team members?",
    answer: "Yes. Composition is proposed and agreed with you before work starts, and you can assess the people who will be doing the work.",
  },
  {
    question: "Can the team scale up or down?",
    answer: "Composition is reviewed as the roadmap changes. Notice periods and the mechanics of adding or releasing capacity are agreed in the engagement rather than assumed.",
  },
  {
    question: "Can the team become permanent?",
    answer: "That is the build and transfer path. NeoIntelli can recruit and technically validate your permanent roles, pair them with the delivery team, and move ownership as readiness is demonstrated.",
  },
  {
    question: "Dedicated AI team or in-house hiring?",
    answer: "Hire in-house when the capability is core, permanent, and you can absorb the hiring and onboarding cycle. Use a dedicated team when the roadmap is already running and waiting for a full internal team would delay it. The two are often sequenced rather than chosen between.",
  },
  {
    question: "Dedicated AI team or an AI agency?",
    answer: "An agency is usually engaged per project and hands over a deliverable. A dedicated team is engaged against a roadmap, stays with it, and is measured on production outcomes rather than project completion.",
  },
  {
    question: "How does a dedicated team relate to an AI Micro GCC?",
    answer: "A dedicated team is an engineering delivery engagement. An AI Micro GCC is an owned organizational wedge with legal, operational and facilities structure designed to scale into a full GCC. A dedicated team can be the first phase of a Micro GCC.",
  },
];

const relatedLinks = [
  { name: "AI Delivery Pod", href: AI_DELIVERY_TEAMS.pod, desc: "A cross-functional engineering squad for one defined, acceptable production outcome." },
  { name: "Forward-Deployed AI Engineers", href: AI_DELIVERY_TEAMS.fde, desc: "Hands-on engineers embedded where the production integration and ambiguity live." },
  { name: "AI Team Build & Transfer", href: AI_DELIVERY_TEAMS.transfer, desc: "Execution capacity now, with progressive knowledge and operational transfer to your team." },
  { name: "AI Solutions", href: AI_ENGINEERING_LINKS.hub, desc: "Explore enterprise AI engineering capabilities, architecture, and solution areas." },
  { name: "AI Talent", href: ECOSYSTEM_LINKS.talent, desc: "Recruit permanent AI specialists and engineering leaders directly onto your payroll." },
  { name: "Micro GCC", href: ECOSYSTEM_LINKS.microGcc, desc: "Deploy a lean, owned India capability centre starting with 8 to 50 engineers." },
];

export default function DedicatedAiEngineeringTeam() {
  return (
    <AiDeliveryTeamsPageLayout>
      {/* 1. Hero */}
      <AiDeliveryTeamsHero
        title="A dedicated AI engineering team for your roadmap."
        description="A stable team of AI specialists working on one roadmap, inside your delivery system, keeping the technical context that makes the second and third release faster than the first."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/gcc" },
          { name: "AI Delivery Teams", href: AI_DELIVERY_TEAMS.parent },
          { name: "Dedicated AI Engineering Team" },
        ]}
        primaryCta={{ label: "Build My Dedicated AI Team", href: primaryCta }}
        secondaryCta={{ label: "Compare Delivery Models", href: `${AI_DELIVERY_TEAMS.parent}#compare-delivery-models` }}
        contextualLink={{
          textPrefix: "Short, defined outcome instead?",
          linkLabel: "Explore AI Delivery Pod",
          href: AI_DELIVERY_TEAMS.pod,
        }}
      />

      {/* 2. Subnav */}
      <AiDeliveryTeamsSubnav />

      <main id="ai-delivery-content" className="scroll-mt-32">
        {/* 3. In Brief — editorial style matching the overview */}
        <InBrief>
          A dedicated AI engineering team is a stable group of specialists aligned to one client's ongoing AI roadmap rather than a short standalone project. The team integrates into the client's delivery system and maintains context across releases, while NeoIntelli provides the agreed engineering capability, continuity and technical leadership. It suits organisations with more AI work ahead than one release, and it is the wrong choice when a single bounded outcome is all that is needed.
        </InBrief>

        {/* 4. Continuity is the product — Section header + InBrief editorial body */}
        <Section
          id="continuity"
          eyebrow="CONTINUITY"
          title="Continuity is the product."
          align="center"
          width="regular"
        >
          <div className="max-w-5xl mx-auto text-[#505D74] text-sm sm:text-base lg:text-lg leading-relaxed font-normal space-y-6 sm:space-y-7 text-left">
            <p>
              The expensive part of AI engineering is rarely the first build. It is everything that depends on knowing why the system is shaped the way it is: which data source is unreliable on Mondays, why retrieval was tuned that way, which integration will break if you touch it, what the last evaluation regression actually meant. That knowledge does not live in a document — it lives in the people who made the decisions. A team that rotates every quarter pays for it again every quarter. A dedicated team is the model for organisations where that repeated cost is the real problem. It is not a discount on staff augmentation. It is a different structure with different accountability.
            </p>
          </div>
        </Section>

        {/* 5. Best suited to — Styled after Homepage Transformation Impact Bento Architecture */}
        <section
          id="fit"
          className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#E7EDF9] overflow-hidden"
        >
          <AmbientGlow position="top" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto px-4">
              <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#169DC8] mb-3">
                BEST SUITED TO
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] text-[#0D306C] leading-[1.14]">
                Best suited to<span className="text-[#169DC8]">.</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#505D74] leading-relaxed max-w-2xl mx-auto">
                The common thread is a roadmap that keeps producing work, and a cost to losing context between pieces of it.
              </p>
            </div>

            {/* Bento-Style 3-Column Grid matching Homepage Transformation Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              
              {/* LEFT COLUMN: 2 Cards (Roadmap & Agentic AI) */}
              <div className="flex flex-col gap-4 sm:gap-5 order-1 lg:order-1 h-full">
                {/* Card 1: An ongoing AI product roadmap */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#FFF8EE] via-[#FFFDF8] to-[#FFF3E0] border border-[#F7E7D2] shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]"
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs bg-[#FEF3C7]/80 text-[#B45309] border-[#FDE68A]">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>PRODUCT ROADMAP</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {bestFor[0].title}
                    </h3>

                    <div className="flex items-start gap-2.5 mb-3 max-w-[80%] sm:max-w-[76%]">
                      <span
                        className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: "#EA580C" }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <p className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                        {bestFor[0].desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 pt-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className="absolute -bottom-2.5 sm:-bottom-3.5 -right-2 sm:-right-3 pointer-events-none select-none z-10 flex items-end justify-end overflow-visible"
                    style={{ width: "74%", height: "72%" }}
                  >
                    <img
                      src="/images/pillar_card1_arch_v2.png"
                      alt={bestFor[0].title}
                      className="w-full h-full object-contain object-right-bottom scale-105 sm:scale-[1.08] origin-bottom-right drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                {/* Card 2: Continuous Agentic AI development */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#F0F9FF] via-[#F8FCFF] to-[#E6F4FE] border border-[#D0E9FA] shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]"
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]">
                      <Bot className="w-3.5 h-3.5" />
                      <span>AGENTIC WORKFLOWS</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {bestFor[1].title}
                    </h3>

                    <div className="flex items-start gap-2.5 mb-3 max-w-[80%] sm:max-w-[76%]">
                      <span
                        className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: "#0284C7" }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <p className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                        {bestFor[1].desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 pt-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 sm:right-0.5 pointer-events-none select-none z-10 flex items-end justify-end overflow-visible"
                    style={{ width: "66%", height: "65%" }}
                  >
                    <img
                      src="/images/pillar_card2_valid_v3.png"
                      alt={bestFor[1].title}
                      className="w-full h-full object-contain object-right-bottom scale-100 origin-bottom-right drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              </div>

              {/* MIDDLE COLUMN: Bento Cards (2 Top Cards + 1 Deep Navy Glass Anchor Card with Cutout) */}
              <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-2 h-full">
                
                {/* TOP ROW: 2 Cards (Data & AI platform + Multiple production releases) */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4 shrink-0">
                  {/* Card 3: A data and AI platform */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative rounded-[22px] sm:rounded-[24px] bg-white border border-[#D2DCF0]/80 shadow-[0_8px_25px_rgba(13,48,108,0.05)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(13,48,108,0.09)] transition-all duration-300 group hover:-translate-y-0.5 min-h-[145px]"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/60 flex items-center justify-center shrink-0 text-[#0284C7] shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                        <Database className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="text-xs sm:text-[13px] font-extrabold text-[#0D306C] mb-1 group-hover:text-[#169DC8] transition-colors leading-snug">
                        {bestFor[2].title}
                      </div>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-snug font-normal">
                      {bestFor[2].desc}
                    </p>
                  </motion.div>

                  {/* Card 6: Multiple production releases */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="relative rounded-[22px] sm:rounded-[24px] bg-white border border-[#D2DCF0]/80 shadow-[0_8px_25px_rgba(13,48,108,0.05)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(13,48,108,0.09)] transition-all duration-300 group hover:-translate-y-0.5 min-h-[145px]"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D]/60 flex items-center justify-center shrink-0 text-[#D97706] shadow-2xs group-hover:scale-105 transition-transform mb-2.5">
                        <Rocket className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="text-xs sm:text-[13px] font-extrabold text-[#0D306C] mb-1 group-hover:text-[#169DC8] transition-colors leading-snug">
                        {bestFor[5].title}
                      </div>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-snug font-normal">
                      {bestFor[5].desc}
                    </p>
                  </motion.div>
                </div>

                {/* BOTTOM ROW: Dedicated Team Anchor Card matching Skyscraper card with Cutout */}
                <div className="flex-1 flex flex-col min-h-[220px]">
                  <Link
                    to={primaryCta}
                    className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#0B254E] via-[#0E356E] to-[#124286] p-5 sm:p-6 text-white shadow-[0_12px_35px_rgba(11,37,78,0.25)] hover:shadow-[0_18px_45px_rgba(11,37,78,0.35)] transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    {/* Subtle curved background lines */}
                    <svg
                      viewBox="0 0 400 300"
                      fill="none"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                    >
                      <path
                        d="M -50 250 C 120 180, 260 280, 450 150"
                        stroke="#FFFFFF"
                        strokeWidth="36"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M -30 200 C 130 130, 270 230, 450 100"
                        stroke="#FFFFFF"
                        strokeWidth="28"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Warm sunset ambient glow behind the building */}
                    <div className="absolute right-0 bottom-0 w-[72%] h-[95%] bg-radial from-[#F59E0B]/35 via-[#F59E0B]/10 to-transparent pointer-events-none rounded-full blur-xl" />

                    {/* Skyscraper Cutout Illustration with Seamlessly Blended Left Edge */}
                    <div
                      className="absolute -right-2 sm:-right-3 -bottom-1 sm:-bottom-2 pointer-events-none select-none flex items-end justify-end"
                      style={{
                        width: "76%",
                        height: "148%",
                        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, black 28%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, black 28%)",
                      }}
                    >
                      <img
                        src="/images/gcc_skyscraper_cutout.png"
                        alt="Dedicated AI Engineering Team"
                        className="w-full h-full object-contain object-right-bottom scale-105 origin-bottom-right"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#E98D1C]/25 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="relative z-10">
                      {/* Top Hexagon Architectural Badge */}
                      <div className="relative flex items-center justify-center w-8 h-9 mb-2.5">
                        <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill="rgba(255, 255, 255, 0.22)"
                            stroke="rgba(255, 255, 255, 0.65)"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                        </div>
                      </div>

                      <div className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight max-w-[65%] sm:max-w-[62%]">
                        {bestFor[6].title}
                      </div>

                      <div className="text-xs sm:text-[13px] text-white/90 font-normal mt-2 leading-relaxed max-w-[65%] sm:max-w-[62%]">
                        {bestFor[6].desc}
                      </div>
                    </div>

                    {/* Bottom-left Circular Arrow Button */}
                    <div className="relative z-20 pt-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: 2 Cards (SaaS AI & Modernisation) */}
              <div className="flex flex-col gap-4 sm:gap-5 order-3 md:order-2 lg:order-3 h-full">
                {/* Card 4: SaaS AI capability */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#F0F9FF] via-[#F8FCFF] to-[#E6F4FE] border border-[#D0E9FA] shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]"
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>SAAS PRODUCT AI</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {bestFor[3].title}
                    </h3>

                    <div className="flex items-start gap-2.5 mb-3 max-w-[80%] sm:max-w-[76%]">
                      <span
                        className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: "#0284C7" }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <p className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                        {bestFor[3].desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 pt-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className="absolute bottom-0 sm:bottom-0.5 right-0 sm:right-1 pointer-events-none select-none z-10 flex items-end justify-end overflow-visible"
                    style={{ width: "63%", height: "62%" }}
                  >
                    <img
                      src="/images/pillar_card3_deliver_v3.png"
                      alt={bestFor[3].title}
                      className="w-full h-full object-contain object-right-bottom scale-100 origin-bottom-right drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Card 5: Long-term AI modernisation */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.27, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#FFF8EE] via-[#FFFDF8] to-[#FFF3E0] border border-[#F7E7D2] shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]"
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs bg-[#FEF3C7]/80 text-[#B45309] border-[#FDE68A]">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>ENTERPRISE MODERNISATION</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {bestFor[4].title}
                    </h3>

                    <div className="flex items-start gap-2.5 mb-3 max-w-[80%] sm:max-w-[76%]">
                      <span
                        className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: "#EA580C" }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <p className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                        {bestFor[4].desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-20 pt-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className="absolute -bottom-2.5 sm:-bottom-3.5 -right-2 sm:-right-3 pointer-events-none select-none z-10 flex items-end justify-end overflow-visible"
                    style={{ width: "74%", height: "72%" }}
                  >
                    <img
                      src="/images/pillar_card4_transfer_v2.png"
                      alt={bestFor[4].title}
                      className="w-full h-full object-contain object-right-bottom scale-105 sm:scale-[1.08] origin-bottom-right drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. When a dedicated team is the wrong answer */}
        <Section
          id="when-wrong-answer"
          eyebrow="WHEN A DEDICATED TEAM IS THE WRONG ANSWER"
          title="When a dedicated team is the wrong answer."
          width="regular"
          align="center"
        >
          <WrongAnswerCards items={notRightWhen} />
        </Section>

        {/* 7. How it runs */}
        <Section
          id="how-it-runs"
          eyebrow="How it runs"
          title="One roadmap, one team, repeated releases."
          lead="The loop below is the whole model. Each pass through it leaves more context inside the team, which is what makes the next pass shorter."
          width="wide"
        >
          <UniversalLifecycle
            steps={howItRunsSteps}
            theme="light"
            tagStyle="none"
          />
          <CapabilitiesSection
            items={cadenceItems.map((item) => ({ title: item.title, body: item.desc, icon: item.icon }))}
            columns={3}
          />
        </Section>

        {/* 8. What sits inside the team */}
          <Section 
            eyebrow="WHAT SITS INSIDE THE TEAM."
            title="What sits inside the team."
            width="wide"
            align="center"
          >
                   <div className="grid md:grid-cols-3 gap-5">
              {insideTheTeam.map((item) => (
                <div key={item.role} className="bg-[#0D244D] border border-black/[0.04] p-6 sm:p-7">
                  <h3 className="text-white font-manrope font-bold text-lg mb-2">{item.role}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
              <div className="mt-8 text-center mx-auto max-w-3xl">
                            
            <p className="text-[#505D74] text-sm mt-8 max-w-3xl leading-relaxed">
              Teams are purpose-assembled from technically validated AI specialists around the mandate. Composition, seniority and the people themselves are agreed with you before work starts.
            </p>
            </div>



          </Section>

        {/* 9. Comparison Table */}
        <Section
          id="compare"
          eyebrow="COMPARISON"
          title="Four ways to get AI engineering capacity."
          lead="None of these is universally better. They differ in who carries continuity, who manages, and what happens when the work changes shape."
          width="wide"
        >
          <ResponsiveTable
            caption="Permanent team, staff augmentation, dedicated AI engineering team and project delivery compared"
            headers={["Dimension", ...comparisonColumns]}
            rows={comparisonRows.map((r) => [r.dimension, ...r.values])}
          />
        </Section>


        {/* 10. Access, security and IP – use Section component */}
        <Section
          id="access-security-ip"
          eyebrow="ACCESS, SECURITY & IP"
          title="Access, security and IP."
          width="regular"
        >
          <p className="text-[#505D74] text-base leading-relaxed mb-5 font-normal">
            The team works inside your environment where you agree to it. Access is granted by you, on least privilege, through your approval process. Secrets management, environment isolation and the scope of production access follow your security standards and are defined before delivery begins.
          </p>
          <p className="text-[#505D74] text-base leading-relaxed font-normal">
            Client-specific deliverables, NeoIntelli pre-existing IP, reuse rights and assignment terms are defined in the engagement agreement before delivery begins. Where you expect full assignment of deliverables, that is written into the agreement.
          </p>
        </Section>


   
        {/* 12. FAQs */}
        <Section
          id="faqs"
          eyebrow="FAQS"
          title="Questions buyers actually ask."
          width="regular"
        >
          <AnswerBlock items={answers} level={3} />
        </Section>

        {/* 13. CTA */}
        <AiDeliveryTeamsCTA
          serviceInterest="Dedicated AI Team"
          title="Bring the roadmap. We will propose the team."
          description="Share what is queued for the next few quarters and where the current constraint sits. We will come back with a team shape, a seniority mix and the reasoning behind both."
          primaryCta={{ label: "Build My Dedicated AI Team", href: primaryCta }}
          secondaryCta={{ label: "Hire Permanent AI Talent", href: ECOSYSTEM_LINKS.talent }}
          bottomText={
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300">
              <span>Not sure this is the right model?</span>
              <Link
                to={AI_DELIVERY_TEAMS.parent}
                className="text-[#38BDF8] underline underline-offset-4 hover:text-white transition-colors font-medium"
              >
                Compare all AI delivery models
              </Link>
            </div>
          }
        />

        {/* 14. Connected Ecosystem */}
        <RelatedAiDeliveryServices links={relatedLinks} />
      </main>
    </AiDeliveryTeamsPageLayout>
  );
}
