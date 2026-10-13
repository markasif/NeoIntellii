"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Users,
  Compass,
  Zap,
  Cpu,
  Target,
  Copyright,
  Route,
  Layers,
  Database,
  Bot,
  Calculator,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import AdvisoryProcessFlow, { type AdvisoryStep } from "@/components/ai-gcc/AdvisoryProcessFlow";
import GccPerformanceFramework, { type OutcomeGroup } from "@/components/gcc-operations/GccPerformanceFramework";
import OperatingLayerGrid from "@/components/gcc-operations/OperatingLayerGrid";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import PillFeatureCardGrid from "@/components/shared/PillFeatureCardGrid";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";
import ConnectedEcosystem, { type ConnectedCardItem } from "@/components/shared/ConnectedEcosystem";
import Consultation from "@/features/home/components/Consultation";
import { getPageMeta } from "@/lib/pageMeta";
import {
  ABOUT_CLIENT_CONTROL,
  ABOUT_DIFFERENTIATORS,
  ABOUT_ENTRY_POINTS,
  ABOUT_FAQS,
  ABOUT_LIFECYCLE,
  ABOUT_PILLARS,
  ABOUT_PRINCIPLES,
  ABOUT_TOOLS,
} from "@/data/about";

/** Images for the seven operating-model stages, in lifecycle order. */
const LIFECYCLE_IMAGES = [
  "/images/home/connected_operating_model_diagram.webp",
  "/images/services/gcc/gcc-talent.webp",
  "/images/services/ai-engineering/agentic_realistic.webp",
  "/images/services/ai-delivery-teams/dedicated_ai_team_realistic.webp",
  "/images/services/gcc/gcc-setup.webp",
  "/images/services/gcc-operations/gcc-ops-workforce.webp",
  "/images/services/gcc/gcc_modernization.webp",
] as const;

/** Icons for the "what stays with you" list, in the order of ABOUT_CLIENT_CONTROL. */
const CLIENT_CONTROL_ITEMS = ABOUT_CLIENT_CONTROL.map((text, i) => ({
  text,
  icon: [Compass, Target, Copyright, Route, Layers, Database, Users][i],
}));

/** 5-stage flexible entry flow matching the Advisory Process Flow design */
const ENTRY_FLOW_STEPS: AdvisoryStep[] = [
  {
    label: "AI Talent",
    detail: "Specialist hiring, technology-assisted screening, and practitioner technical validation.",
    icon: Users,
  },
  {
    label: "AI Delivery Team",
    detail: "Dedicated engineering pods calibrated to build and ship production systems.",
    icon: Cpu,
  },
  {
    label: "AI Micro GCC",
    detail: "A focused 8-to-50 person capability with complete operating and facility support.",
    icon: Layers,
  },
  {
    label: "AI GCC",
    detail: "Full-scale capability center with end-to-end operational governance and infrastructure.",
    icon: Building2,
  },
  {
    label: "Captive Capability",
    detail: "Build-Operate-Transfer (BOT) and seamless transition to your own captive entity.",
    icon: ShieldCheck,
  },
];

const relatedLinks = [
  { name: "AI GCC", href: "/services/ai-gcc" },
  { name: "Micro GCC", href: "/services/micro-gcc" },
  { name: "GCC Operations", href: "/services/gcc-operations" },
  { name: "AI Engineering", href: "/services/ai-engineering" },
  { name: "GCC Cost Calculator", href: "/gcc-cost-calculator" },
  { name: "Talk to Us", href: "/contact" },
];

/** The same related links, rendered in the Connected Ecosystem card shape. */
const RELATED_CARDS: ConnectedCardItem[] = relatedLinks.map((link) => {
  const meta = getPageMeta(link.href, link.name);
  const icon = link.name.includes("AI GCC")
    ? Bot
    : link.name.includes("Micro")
    ? Compass
    : link.name.includes("Operations")
    ? ShieldCheck
    : link.name.includes("Engineering")
    ? Cpu
    : link.name.includes("Calculator")
    ? Calculator
    : Users;
  return {
    path: link.href,
    name: link.name,
    summary: meta.description,
    anchor: `Read about ${meta.title}`,
    icon,
  };
});

export default function About() {
  const [activeDiff, setActiveDiff] = useState(0);

  useEffect(() => {
    document.title = "About NeoIntelli | AI-Led Global Capability Centers in India";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE WHAT-WE-DO FULL-VIEWPORT HERO SECTION */}
        {/* ============================================================ */}
        <NeoIntelliHero
          id="about-hero"
          ariaLabel="About NeoIntelli Executive Hero"
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "About Us" },
          ]}
          title="Build the capability in India. Keep control of what matters."
          description="NeoIntelli helps global companies build, operate and scale AI-led capability in India: GCC strategy, specialist talent, AI engineering, delivery teams, technology foundations, workplace, operations and governance, through one operating partner."
          desktopImage="/images/hero/about.webp"
          mobileImage="/images/hero/about-mobile.webp"
          imageAlt="About NeoIntelli Executive View"
          primaryCta={{ label: "Build an AI GCC", href: "/services/ai-gcc" }}
          secondaryCta={{ label: "Speak with NeoIntelli", href: "/contact" }}
          bottomContent={
            <div className="relative z-20 w-full bg-transparent pb-4 sm:pb-6 lg:pb-8 shrink-0">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/15 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-1 sm:p-2">
                  <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2.5">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white font-mono tracking-tight leading-none mb-1.5">
                      1
                    </span>
                    <p className="text-[10.5px] sm:text-[12.5px] text-[#C5D7F0] text-center leading-snug font-medium max-w-[220px]">
                      Unified partner from strategy to day-to-day operations
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2.5">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white font-mono tracking-tight leading-none mb-1.5">
                      100%
                    </span>
                    <p className="text-[10.5px] sm:text-[12.5px] text-[#C5D7F0] text-center leading-snug font-medium max-w-[220px]">
                      Client IP, codebase, and team ownership
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2.5">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white font-mono tracking-tight leading-none mb-1.5">
                      12 wks
                    </span>
                    <p className="text-[10.5px] sm:text-[12.5px] text-[#C5D7F0] text-center leading-snug font-medium max-w-[220px]">
                      Typical timeframe from kickoff to first operational pod
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2.5">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white font-mono tracking-tight leading-none mb-1.5">
                      Bengaluru
                    </span>
                    <p className="text-[10.5px] sm:text-[12.5px] text-[#C5D7F0] text-center leading-snug font-medium max-w-[220px]">
                      Headquartered at the center of India&apos;s AI talent ecosystem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* ============================================================ */}
        {/* 2. POINT OF VIEW (Blueprint Strategic Foundation Design) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
              POINT OF VIEW
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.2] mb-4">
              India can be much more than a talent destination.{" "}
              <span className="text-[#505D74] font-normal block sm:inline mt-2 sm:mt-0">
                The next generation of Global Capability Centers will own AI, data, engineering, platforms, products and business-critical operations. Building that takes more than recruiting people.
              </span>
            </h2>
            <div className="w-16 h-1 bg-amber-300 mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHY NEOINTELLI EXISTS */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="WHY NEOINTELLI EXISTS"
              title="The hard part is everything around the hiring."
              align="center"
              variant="cyan"
              className="mb-8 sm:mb-10"
            />
            <div className="space-y-6 text-[#505D74] text-base sm:text-lg leading-relaxed font-sans text-center sm:text-left max-w-5xl mx-auto">
              <p>
                Companies have traditionally looked at India for engineering capacity, operational scale and cost efficiency. AI is changing that equation.
              </p>
              <p>
                But an AI-led center only works if several things are right at the same time. The mandate has to be right. The operating model has to work. The right talent has to be found and technically validated. AI has to move beyond prototypes into production. Security, infrastructure, governance and operations have to work together. And the center has to stay connected to the global business it exists to serve.
              </p>
              <p>
                NeoIntelli was built around that complete problem, not one slice of it.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. WHAT WE ARE BUILDING (Outcome Framework 3-Column Design) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="WHAT WE ARE BUILDING"
              title="Three capabilities that are usually bought separately."
              description="Instead of stitching together a strategy consultant, a staffing provider, an engineering vendor and an operating partner, companies work with NeoIntelli across the complete lifecycle."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <GccPerformanceFramework
              items={[
                {
                  title: ABOUT_PILLARS[0].title,
                  summary: ABOUT_PILLARS[0].desc,
                  image: "/images/services/gcc/gcc-technology.webp",
                  alt: ABOUT_PILLARS[0].title,
                  aspect: "aspect-[4/3.5]",
                  link: ABOUT_PILLARS[0].href,
                  actionText: `Explore ${ABOUT_PILLARS[0].title}`,
                },
                {
                  title: ABOUT_PILLARS[1].title,
                  summary: ABOUT_PILLARS[1].desc,
                  image: "/images/services/gcc/gcc-talent.webp",
                  alt: ABOUT_PILLARS[1].title,
                  aspect: "aspect-[4/3]",
                  link: ABOUT_PILLARS[1].href,
                  actionText: `Explore ${ABOUT_PILLARS[1].title}`,
                },
                {
                  title: ABOUT_PILLARS[2].title,
                  summary: ABOUT_PILLARS[2].desc,
                  image: "/images/services/gcc/gcc_modernization.webp",
                  alt: ABOUT_PILLARS[2].title,
                  aspect: "aspect-[4/3.5]",
                  link: ABOUT_PILLARS[2].href,
                  actionText: `Explore ${ABOUT_PILLARS[2].title}`,
                },
              ]}
              columns={3}
              imageRounded="rounded-2xl"
              showSourceNote={false}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. ONE CONNECTED OPERATING MODEL (Operating Model Mosaic Design) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="ONE CONNECTED OPERATING MODEL"
              title="From the first business case to a capability you own."
              description="You should never have to rebuild the operating model simply because the center grows."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <OperatingLayerGrid
              items={ABOUT_LIFECYCLE.map((stage, idx) => ({
                key: stage.num,
                cardTitle: stage.title,
                summary: stage.desc,
                shortName: stage.title,
                path: stage.href,
                image: LIFECYCLE_IMAGES[idx],
                items: stage.items,
                actionLabel:
                  stage.title === "Scale or Transfer"
                    ? "Explore Scale & BOT"
                    : `Explore ${stage.title}`,
              }))}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. WHAT WE DO DIFFERENTLY (AI-GCC Ownership Model Style) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="CORE PRINCIPLES"
              title="What we do differently."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            {/* Mobile quick-selector pills */}
            <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 mb-6 [scrollbar-width:none]">
              {ABOUT_DIFFERENTIATORS.map((d, idx) => (
                <button
                  key={d.num}
                  type="button"
                  onClick={() => setActiveDiff(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeDiff === idx
                      ? "bg-[#0D306C] text-white shadow-sm scale-105"
                      : "bg-white text-[#505D74] border border-[#D2DCF0]"
                  }`}
                >
                  {d.num}. {d.title.split(" ")[0]}...
                </button>
              ))}
            </div>

            {/* 4-Card Process Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
              {ABOUT_DIFFERENTIATORS.map((d, index) => {
                const isActive = activeDiff === index;
                const images = [
                  "/images/services/gcc-operations/gcc-ops-workforce.webp",
                  "/images/home/mosaic_ai_gcc.webp",
                  "/images/home/contact_engineer_blue_lounge.webp",
                  "/images/industries/tech-process-automation.webp",
                ];

                return (
                  <motion.div
                    key={d.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onMouseEnter={() => setActiveDiff(index)}
                    onClick={() => setActiveDiff(index)}
                    className={`relative p-6 sm:p-7 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                      isActive
                        ? "scale-[1.01] lg:scale-[1.03] shadow-xl text-white z-20 overflow-hidden"
                        : "bg-white/80 text-slate-900 z-10 shadow-xs border border-[#D2DCF0] hover:border-[#008EC4]/40"
                    }`}
                  >
                    {/* Active State Background Image & Cyan Duotone Wash */}
                    {isActive && (
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                        <img
                          src={images[index]}
                          alt={d.title}
                          className="w-full h-full object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                        <div className="absolute inset-0 bg-cyan-600/15" />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10 text-left">
                      {/* Big Numerals */}
                      <span
                        className={`text-5xl sm:text-6xl font-manrope font-black tracking-tight leading-none transition-colors duration-300 select-none ${
                          isActive ? "text-white" : "text-[#0D306C]"
                        }`}
                      >
                        {d.num}
                      </span>

                      {/* Vertical Dotted Track Line */}
                      <div
                        className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                          isActive ? "border-white/60" : "border-slate-300"
                        }`}
                      />

                      {/* Title */}
                      <h3
                        className={`text-lg sm:text-xl font-bold font-manrope tracking-tight mb-3 transition-colors duration-300 leading-snug ${
                          isActive ? "text-white" : "text-[#0D306C]"
                        }`}
                      >
                        {d.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-normal transition-colors duration-300 ${
                          isActive ? "text-slate-100" : "text-[#505D74]"
                        }`}
                      >
                        {d.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* NeoHireX Banner */}
            <div className="text-center p-5 sm:p-6 max-w-2xl mx-auto shadow-2xs mt-8 sm:mt-10">
              <p className="text-[#505D74] text-xs sm:text-sm">
                NeoHireX is our proprietary AI hiring platform.{" "}
                <a
                  href="https://neohirex.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#008EC4] font-bold inline-flex items-center gap-1.5 hover:underline"
                >
                  See what it does <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. BUILT IN INDIA (Navy Theme with Wave Divider) */}
        {/* ============================================================ */}
        <Section
          id="built-in-india"
          theme="navy"
          waveFill="#F0F5FA"
          width="regular"
          align="center"
          wavesOnMobile
        >
          <SectionHeader
            eyebrow="LOCAL MASTERY, GLOBAL GOVERNANCE"
            title="A GCC strategy can be designed anywhere. Making it work in India is local work."
            variant="white"
            align="center"
            className="mb-8 sm:mb-12"
          />

          <div className="max-w-5xl mx-auto space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed text-center sm:text-left">
            <p>
              Talent markets vary by city. Compensation varies by capability. Office decisions affect hiring. Leadership availability matters. Employment, compliance, infrastructure and operational realities matter.
            </p>
            <p>
              NeoIntelli is headquartered in Bengaluru, one of India&apos;s principal technology and engineering hubs. From India, we help global organizations evaluate where to build, what to build and how to operate it.
            </p>
            <p className="font-manrope font-bold text-lg sm:text-xl lg:text-[22px] text-white text-center leading-snug pt-6 border-t border-white/15">
              Our perspective stays global. The India center should fit the company&apos;s business, engineering practices, culture, security expectations and governance model, not operate as a disconnected offshore unit.
            </p>
          </div>
        </Section>

        {/* ============================================================ */}
        {/* 8. ENTRY POINTS: START AT THE SIZE THAT MAKES SENSE */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="START AT THE SIZE THAT MAKES SENSE"
              title="You do not need to begin with a 500-person GCC."
              description="The starting point changes. The principle does not: build around capability first, scale headcount second."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <PillFeatureCardGrid
              columns={3}
              className="max-w-6xl mx-auto"
              items={ABOUT_ENTRY_POINTS.map((entry) => ({
                title: entry.name,
                body: entry.desc,
                href: entry.href,
                ctaText: entry.cta,
              }))}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 9. HOW WE OPERATE (CapabilitiesSection Card Style) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="OPERATING RIGOR"
              title="How we operate."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <CapabilitiesSection
              items={ABOUT_PRINCIPLES.map((p, index) => {
                const icons = [Compass, Zap, Cpu, ShieldCheck, Check, Building2];
                return {
                  title: p.t,
                  desc: p.d,
                  icon: icons[index % icons.length],
                };
              })}
              columns={3}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 10. CONTROL STAYS WITH YOU */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="GOVERNANCE & CONTROL"
              title="Your GCC should remain your capability."
              align="center"
              variant="cyan"
              className="mb-8 sm:mb-10"
            />

            <div className="max-w-5xl mx-auto space-y-4 text-center text-[#505D74] text-base sm:text-lg leading-relaxed mb-10 sm:mb-12">
              <p>
                NeoIntelli can operate the environment around the center. The things that define your business stay with you.
              </p>
              <p className="font-manrope font-bold text-[#0D306C]">
                Our role is to make the India capability work around those priorities, not to replace them.
              </p>
            </div>

            <DeliverablesList items={CLIENT_CONTROL_ITEMS} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 11. DIFFERENT WAYS TO WORK WITH NEOINTELLI (ENTRY PROCESS FLOW) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="DIFFERENT WAYS TO WORK WITH NEOINTELLI"
              title="Enter where the problem is today."
              align="center"
              variant="cyan"
              className="mb-6 sm:mb-8"
            />

            <div className="max-w-5xl mx-auto text-[#505D74] text-base sm:text-lg leading-relaxed text-center mb-10 sm:mb-14">
              <p>
                You may need one specialist engineer. You may need an entire AI delivery team. You may be evaluating whether India makes financial sense. You may be launching your first GCC. You may already have thousands of employees in India and want an existing center to become an AI-led capability. NeoIntelli can start at the point where the problem exists today and connect it to the operating model you may need tomorrow.
              </p>
            </div>

            <AdvisoryProcessFlow steps={ENTRY_FLOW_STEPS} />

            <p className="mt-8 sm:mt-10 text-center text-sm sm:text-base text-[#505D74] font-medium">
              You do not have to buy the entire journey on day one.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 12. PLANNING TOOLS */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="SELF-SERVE ASSESSMENT"
              title="Before you build, model the decision."
              description="Building a GCC is a significant operating decision. You should be able to test the assumptions before committing to them."
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {ABOUT_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col rounded-3xl bg-white border border-[#D2DCF0] p-8 shadow-xs hover:border-[#00A3E0]/40 transition-all justify-between"
                >
                  <div>
                    <h3 className="font-manrope font-extrabold text-xl text-[#0D306C] mb-3">
                      {tool.name}
                    </h3>
                    <p className="text-[#505D74] text-sm leading-relaxed mb-6">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#D2DCF0]">
                    <Link
                      to={tool.href}
                      className="inline-flex items-center gap-1.5 text-sm font-manrope font-bold text-[#008EC4] hover:text-[#0D306C] transition-colors"
                    >
                      {tool.cta} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 13. FREQUENTLY ASKED QUESTIONS */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="ABOUT FAQS"
              title="Frequently Asked Questions"
              align="center"
              variant="cyan"
              className="mb-10 sm:mb-14"
            />

            <div className="space-y-4">
              {ABOUT_FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-2xl border border-[#D2DCF0] transition-all hover:border-[#00A3E0]/40 overflow-hidden shadow-2xs"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-manrope font-bold text-base sm:text-lg text-[#0D306C] list-none select-none">
                    <span className="pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-[#00A3E0] shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-[#D2DCF0]/50 text-sm sm:text-base text-[#505D74] leading-relaxed font-sans">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 14. THE COMPANY WE WANT TO BUILD */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="The company we want to build"
              title="A partner you eventually need less, not more."
              align="center"
              variant="cyan"
              className="mb-8 sm:mb-10"
            />

            <div className="max-w-5xl mx-auto space-y-4 text-[#505D74] text-base sm:text-lg leading-relaxed">
              <p>
                The best outcome for NeoIntelli is not permanent dependency. It is an India capability that becomes stronger, more independent and more valuable over time.
              </p>
              <p>
                Sometimes we continue operating parts of that environment. Sometimes we help expand it. Sometimes the team transitions fully into the client&apos;s organization.
              </p>
              <p>
                What matters is that the capability works. That is the standard we want NeoIntelli to be measured against.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 15. CLOSING EXECUTIVE CTA */}
        {/* ============================================================ */}
        <ExecutiveCTA
          eyebrow="START WITH INTENT"
          title="Build your India capability with intent."
          description="Whether you are considering your first India engineering team, building an AI Micro GCC, launching a full Global Capability Center or transforming an existing operation, start with the mandate. We will help you work backwards from there."
          primaryCta={{
            label: "Speak with a GCC Expert",
            href: "/book-a-call",
          }}
          secondaryCta={{
            label: "Plan My AI GCC",
            href: "/services/ai-gcc",
          }}
          footnote="A 30-minute working conversation. No generic GCC pitch: we start with what you want the India capability to own."
        />

        {/* ============================================================ */}
        {/* 16. CONNECTED ECOSYSTEM (Continue exploring) */}
        {/* ============================================================ */}
        <ConnectedEcosystem cards={RELATED_CARDS} hideConsultation />

        {/* ============================================================ */}
        {/* 17. LET'S BUILD TOGETHER */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" hideWaveDivider />
      </main>

      <Footer />
    </div>
  );
}
