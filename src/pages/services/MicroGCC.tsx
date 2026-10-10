"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Check,
  Clock,
  PhoneCall,
  Users,
  Layers,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Consultation from "@/features/home/components/Consultation";
import Section from "@/components/ai-gcc/Section";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import RelatedLinks from "@/components/shared/RelatedLinks";
import SectionHeader from "@/components/ui/SectionHeader";
import TypewriterContextButton from "@/components/ui/TypewriterContextButton";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";
import IndustryImageCard from "@/components/shared/IndustryImageCard";
import AlternatingStepList from "@/components/shared/AlternatingStepList";

import {
  tiers,
  models,
  squadRoles,
  compareRows,
  blocks,
  phases,
  costRows,
  costDrivers,
  cityRows,
  builds,
  whyNeo,
  faqs,
  relatedLinks,
} from "@/data/microGcc";

// Animated counter for hero stats
function CountingNumber({ target, suffix = "%" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1600;

    let animId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}



const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MicroGCC() {
  useEffect(() => {
    document.title = "Micro GCC Setup in India | NeoIntelli";
    const desc =
      "Launch a Micro GCC in India as a single squad or a multi-squad team. Fully owned, co-owned, or managed. Built for startups, SMEs, and mid-market global firms.";
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", desc);
  }, []);

  return (
    <div className="min-h-screen bg-[#E7EDF9] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="micro-gcc-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="Micro GCC India Executive Hero"
        >
          {/* ── FULL-BLEED EXECUTIVE BACKGROUND ───────── */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="Micro GCC India Executive View"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
            />
            {/* Soft responsive overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* ── TOP SPACER FOR FIXED/STICKY NAVBAR ── */}
          <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

          {/* ── HERO CONTENT ── */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="hover:text-[#00A3E0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/services/gcc"
                    className="hover:text-[#00A3E0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    GCC Strategy
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-current="page" className="font-semibold text-[#0D306C]">
                    Micro GCC
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left font-sans">
                  Start with one squad. Scale to five.
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left font-sans">
                  A Micro GCC is a captive India team built squad by squad. Start with 8 people. Add a squad when you are ready. Choose how much you want to own: fully, jointly, or managed. Same talent depth. Same IP control. Without the enterprise overhead.
                </p>

                {/* CTAs Row matching GCC Strategy & GCC Operations hero */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-left">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>Book a 30-min scoping call</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </Link>

                  <a
                    href="#tiers"
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>Explore Tiers</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>

                  <TypewriterContextButton
                    href="/services/gcc"
                    label="Planning a full-scale GCC instead? Start with GCC Strategy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM DOCK: METRICS & CITATION STRIP ── */}
          <div className="relative z-20 w-full bg-transparent border-none pb-4 sm:pb-6 lg:pb-8 shrink-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-[#0D306C]/10 sm:divide-y-0 sm:divide-x sm:divide-[#0D306C]/15 bg-transparent p-0">
                {/* Metric 1 */}
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    <CountingNumber target={25} />
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Of India's 1,600+ GCCs are sub-50 captive centers
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    8 to 50
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Squad-based team sizing (1 to 5 squads)
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    6 to 12 wks
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Kickoff to first squad operational
                  </p>
                </div>

                {/* Metric 4 */}
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    60 to 70%
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Cost reduction vs US, UK, or Nordic team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHY MICRO GCC. WHY NOW. ───────────────────────────────────── */}
        <Section
          id="why-now"
          eyebrow="WHY MICRO GCC · WHY NOW"
          title="The captive model is no longer enterprise-only."
          width="regular"
          align="center"
        >
          <div className="max-w-5xl mx-auto space-y-6 text-left">
            <p className="drop-cap-amber-f19326 text-base sm:text-lg text-[#505D74] leading-relaxed font-normal">
              For two decades, setting up a GCC in India meant a large-enterprise budget, a 12 to 18 month build, and a 200-plus seat office. That bar shut out everyone else.
            </p>

            <p className="text-lg sm:text-xl font-bold text-[#0D306C] tracking-tight leading-snug">
              That bar is gone.
            </p>

            <p className="text-base sm:text-lg text-[#505D74] leading-relaxed font-normal">
              Cloud infrastructure, EOR-first hiring models, flexible workspace, and a mature compliance ecosystem have collapsed the cost and time of standing up a captive India team. Today, a working 8-person squad can be live in 6 to 8 weeks. A 50-person multi-squad team in 6 to 9 months. At a fraction of what a traditional setup cost in 2015.
            </p>

            <p className="text-base sm:text-lg text-[#505D74] leading-relaxed font-normal">
              The result. Of India's 1,600 plus GCCs, nearly 400 are now lean captive centers run by startups, SMEs, and mid-market global firms. UK fintechs, US healthcare scale-ups, Nordic industrial companies, and PE-backed portfolios are now building India teams the same way Walmart and JPMorgan did. Just leaner. Faster. And with the same control over IP, talent, and roadmap.
            </p>
          </div>
        </Section>

        {/* ── 3. SQUAD TIERS ──────────────────────────────────────────────── */}
        <Section
          id="tiers"
          eyebrow="SQUAD SCALING ARCHITECTURE"
          title="The model scales with you. One squad at a time."
          lead="A Micro GCC is not one size. It is a unit of capability. Start with what you need today. Add more when you are ready."
          width="wide"
          align="center"
        >
          {/* Top Progression Track: Architectural Horizon */}
      

          {/* 4-Tier Scaling Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {tiers.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-xs hover:border-[#008EC4] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 text-left"
              >
                {/* Visual Header Image with floating badges */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A1D42]">
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/20 to-transparent pointer-events-none" />

                  {/* Top-left Tier Badge */}
                  <div className="absolute top-3 left-3 bg-[#06152B]/85 backdrop-blur-xs text-[#00A3E0] text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border border-[#00A3E0]/30 uppercase">
                    {t.tierTag}
                  </div>

                  {/* Top-right Headcount Pill */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#0D306C] text-[11px] font-bold tracking-tight px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-white">
                    <Users className="w-3 h-3 text-[#008EC4]" />
                    <span>{t.size}</span>
                  </div>

                  {/* Bottom-left Squad Capacity Indicator */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i < t.squadPods
                              ? "w-4 bg-[#00A3E0]"
                              : "w-2 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-medium text-white/80">
                      {t.squadLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                  {/* Timeline / Stage Eyebrow */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#169DC8] font-mono">
                      {t.growthStage}
                    </span>
                    <span className="text-[11px] font-medium text-[#505D74] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#008EC4]" />
                      {t.timeline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-[#0D306C] tracking-tight leading-snug mb-3 group-hover:text-[#008EC4] transition-colors">
                    {t.tierName}
                  </h3>

                  {/* Best for Callout */}
                  <div className="mb-4 rounded-xl bg-[#F0F6FC] p-3 border border-[#D2DCF0]/70">
                    <span className="text-[10px] font-mono font-bold text-[#008EC4] uppercase tracking-wider block mb-1">
                      Best suited for
                    </span>
                    <p className="text-xs text-[#0D306C] font-semibold leading-relaxed">
                      {t.best}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-5 font-normal flex-1">
                    {t.desc}
                  </p>

                  {/* Typical Roles Section */}
                  <div className="pt-3.5 border-t border-[#E7EDF9] mt-auto">
                    <div className="text-[11px] font-bold text-[#0D306C] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-manrope">
                      <Users className="w-3.5 h-3.5 text-[#008EC4]" />
                      <span>Typical roles</span>
                    </div>
                    <p className="text-xs text-[#505D74] leading-relaxed font-normal">
                      {t.roles}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architectural Transition Banner */}
          <div className="mt-10 sm:mt-12 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#001844] text-white border border-[#20528E]/40 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#008EC4]/20 border border-[#008EC4]/40 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-manrope text-white mb-1">
                  Modular Squad Expansion. Zero Architecture Rebuild.
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                  Every tier shares the same underlying recruiters, compliance framework, and security baseline. When your roadmap demands adding a second or third squad, you scale capacity without disrupting active delivery or renegotiating operations.
                </p>
              </div>
            </div>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center rounded-full bg-[#008EC4] hover:bg-[#007ba8] text-white text-xs sm:text-[13px] font-bold tracking-tight px-5 py-2.5 transition-all duration-200 shrink-0 shadow-sm"
            >
              <span>Compare Operating Models</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </Section>

        {/* ── 4. OWNERSHIP MODELS ─────────────────────────────────────────── */}
        <Section
          id="models"
          eyebrow="ENGAGEMENT &amp; OWNERSHIP"
          title="Own it fully. Co-own it. Or let us run it."
          lead="Three engagement models. Same talent. Same quality. Different levels of operational ownership."
          width="wide"
          align="center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {models.map((m, idx) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 text-left"
              >
                {/* TOP WHITE CONTENT SECTION */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 bg-white">
                  {/* Category Eyebrow in uppercase vibrant blue */}
                  <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#169DC8] mb-1.5 sm:mb-2 font-mono">
                    MODEL 0{idx + 1}
                  </span>

                  {/* Main Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-[23px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors mb-2 font-manrope">
                    {m.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-4 font-normal">
                    {m.desc}
                  </p>

                  {/* Responsibilities and Fit Details (100% Content Preserved) */}
                  <div className="pt-3.5 border-t border-[#E7EDF9] space-y-3 text-xs sm:text-[13px] mt-auto">
                    <div>
                      <span className="font-bold text-[#0D306C] block text-[11px] uppercase tracking-wider mb-0.5">
                        Typical fit:
                      </span>
                      <span className="text-[#505D74] leading-relaxed block">{m.fit}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#169DC8] block text-[11px] uppercase tracking-wider mb-0.5">
                        NeoIntelli handles:
                      </span>
                      <span className="text-[#505D74] leading-relaxed block">{m.neo}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#0D306C] block text-[11px] uppercase tracking-wider mb-0.5">
                        You handle:
                      </span>
                      <span className="text-[#505D74] leading-relaxed block">{m.you}</span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM IMAGE CONTAINER (Flush with bottom rounded corners, matching AI Infrastructure & GPU) */}
                <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-[#081B3E] flex-shrink-0">
                  <img
                    src={m.image}
                    alt={m.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle soft gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#505D74] mt-8 sm:mt-10 max-w-3xl mx-auto text-center leading-relaxed font-normal">
            <strong className="font-semibold text-[#0D306C]">All three models can transition:</strong> Start as Managed, move to Co-Owned once proven, and transition to Fully Owned when scale justifies the overhead. Same team. Same recruiters. Same workspace. No rebuild.
          </p>
        </Section>

        {/* ── 5. SQUAD ANATOMY ────────────────────────────────────────────── */}
        <Section
          id="anatomy"
          eyebrow="SQUAD TOPOLOGY"
          title="What an 8-person squad actually looks like."
          lead="Every squad is built as a working unit. Senior led. Charter driven. Outcome owned."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            {/* Roles Table */}
            <ResponsiveTable
              caption="Squad Composition &amp; Roles"
              headers={["Role", "Count", "Function"]}
              rows={squadRoles.map((r) => [
                r.role,
                <span key={r.role} className="font-mono font-bold text-[#008EC4]">
                  {r.count}
                </span>,
                r.fn,
              ])}
            />

            {/* Squad Operating Principles Card */}
            <div className="mt-8 rounded-2xl bg-[#001844] text-white p-7 sm:p-9 shadow-md text-left">
             

              <h3 className="text-lg sm:text-xl font-bold font-manrope text-white mb-5">
                Squad operating principles
              </h3>

              <ul className="space-y-3.5 list-none pl-0 m-0 mb-6">
                {[
                  "Single charter agreed at squad scoping",
                  "Reports into home team leadership with clear escalation path",
                  "Weekly delivery cadence, monthly business review",
                  "Toolchain, security, and reporting integrated with your home stack",
                  "India lead introduced at Twin Squad tier (Tier 2) and above",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                    <span className="mt-0.5 p-1 rounded-full bg-[#169DC8]/20 text-[#38BDF8] shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-white/15">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Squad composition is tuned per engagement. Engineering, AI and data, product, design, customer success, finance, or compliance focus. Some clients run cross-functional squads. Others run specialised ones.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 6. COMPARISON TABLE ─────────────────────────────────────────── */}
        <Section
          id="comparison"
          eyebrow="OPERATING MODEL COMPARISON"
          title="Pick the model that fits the company you actually are."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            <ResponsiveTable
              caption="Traditional GCC vs Micro GCC vs Outsourcing vs EOR"
              headers={["Factor", "Traditional GCC", "Micro GCC", "Outsourcing", "EOR"]}
              rows={compareRows.map((row) => [
                row[0],
                row[1],
                <span key={row[0]} className="font-bold text-[#008EC4]">
                  {row[2]}
                </span>,
                row[3],
                row[4],
              ])}
            />

            <p className="text-center text-xs sm:text-sm text-[#505D74] mt-5 max-w-3xl mx-auto font-normal">
              A Micro GCC is the right answer when you want full ownership of talent and IP, but the volume does not yet justify a traditional GCC.
            </p>
          </div>
        </Section>

        {/* ── 7. BUILDING BLOCKS ──────────────────────────────────────────── */}
        <Section
          id="building-blocks"
          eyebrow="OPERATING FOUNDATION"
          title="Everything you need to operate. None of what you do not."
          lead="Eight building blocks. Configured by tier and engagement model."
          width="wide"
          align="center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 max-w-7xl mx-auto">
            {blocks.map((b) => (
              <div
                key={b.t}
                className="group flex flex-col justify-between text-left select-none transition-all duration-300"
              >
                <div>
                  {/* Visual Frame on Top (16:10 ratio like Parallel Execution in Setup & Launch) */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-3.5 border border-[#CBD5E1]/80 bg-slate-100 shadow-[0_2px_12px_rgba(13,48,108,0.06)] group-hover:border-[#008EC4]/60 group-hover:shadow-[0_8px_25px_rgba(22,157,200,0.18)] transition-all duration-300">
                    <img
                      src={b.image}
                      alt={b.t}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-extrabold text-[16px] sm:text-[17.5px] leading-snug tracking-tight text-[#0D306C] group-hover:text-[#008EC4] transition-colors mb-1.5 font-manrope">
                    {b.t}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed font-normal">
                    {b.d}
                  </p>
                </div>
                {b.link && (
                  <div className="mt-auto pt-2.5 border-t border-[#D2DCF0]/60">
                    <Link
                      to={b.link.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008EC4] hover:text-[#0D306C] transition-colors group-hover:translate-x-0.5"
                    >
                      <span>{b.link.label}</span>
                      <ArrowRight aria-hidden className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 8. FIVE PHASES LIFECYCLE (NAVY WITH ORGANIC WAVES) ───────────── */}
        <Section
          id="lifecycle"
          eyebrow="DEPLOYMENT SEQUENCE"
          title="Five phases from scoping call to first operational squad."
          lead="A single squad is operational in 6 to 8 weeks. A Tier 3 team in 4 to 6 months. A Tier 4 team in 6 to 9 months."
          theme="navy"
          width="wide"
          align="center"
        >
          <AlternatingStepList items={phases} className="mt-6 sm:mt-10" />
        </Section>

        {/* ── 9. INVESTMENT & ECONOMICS ───────────────────────────────────── */}
        <Section
          id="investment"
          eyebrow="INVESTMENT &amp; ECONOMICS"
          title="What shapes the investment."
          lead="A Micro GCC is scoped against your tier, ownership model, city and squad composition. What the tiers tell you is the relative shape of the commitment. Contact us for pricing on yours, confirmed in the proposal."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            {/* Cost Rows Table */}
            <ResponsiveTable
              caption="Micro GCC Investment Shape by Tier"
              headers={["Tier", "One-time setup", "Monthly operating overhead", "What moves it most"]}
              rows={costRows.map((row) => [
                row[0],
                row[1],
                row[2],
                row[3],
              ])}
            />

            {/* Cost Drivers Card */}
            <div className="mt-8 rounded-2xl bg-[#001844] text-white p-7 sm:p-9 shadow-md text-left">
              <h3 className="text-lg font-bold font-manrope text-white mb-4">
                What your quote is built from
              </h3>

              <ul className="grid sm:grid-cols-2 gap-3.5 list-none pl-0 m-0 mb-6">
                {costDrivers.map((driver) => (
                  <li key={driver} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                    <ArrowRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-white/15">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  A Micro GCC is a lucrative alternative to home-market hiring, with direct control, full IP ownership, and no vendor margin layer. Contact us for pricing and you get the numbers in a written proposal once we have scoped the work with you.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 10. LOCATION ARCHITECTURE ────────────────────────────────────── */}
        <Section
          id="cities"
          eyebrow="LOCATION ARCHITECTURE"
          title="Pick the city based on your function, not the headlines."
          lead="NeoIntelli has active hiring and operations presence in all six cities."
          width="wide"
          align="center"
        >
          <div className="max-w-6xl mx-auto">
            <ResponsiveTable
              caption="India City Matrix for Micro GCC"
              headers={["City", "Best for", "Talent depth", "Cost index", "Notes"]}
              rows={cityRows.map((row) => [
                row[0],
                row[1],
                <span key={row[0]} className="font-semibold text-[#0D306C]">
                  {row[2]}
                </span>,
                <span key={row[0]} className="font-mono font-bold text-[#008EC4]">
                  {row[3]}
                </span>,
                row[4],
              ])}
            />
          </div>
        </Section>

        {/* ── 11. COMMON BUILDS ────────────────────────────────────────────── */}
        <Section
          id="builds"
          eyebrow="PROVEN SQUAD ARCHITECTURES"
          title="Common Micro GCC builds we run."
          lead="Real deployment topologies proven with global clients across healthcare AI, fintech, and industrial sectors."
          width="wide"
          align="center"
        >
          <OutcomeCardGrid
            items={builds.map((b) => ({
              title: b.t,
              tag: b.tag,
              badge: b.badge,
              aspect: b.aspect,
              image: b.image,
              alt: b.alt,
              summary: b.d,
              lists: [{ label: "Architecture Highlights", items: b.metrics }],
              cta: b.cta,
            }))}
            columns={3}
            titleSize="md"
            maxWidthClassName="max-w-7xl mx-auto"
          />
        </Section>

        {/* ── 12. WHY NEOINTELLI ───────────────────────────────────────────── */}
        <Section
          id="why-neointelli"
          eyebrow="WHY NEOINTELLI"
          title="Why NeoIntelli for Micro GCC."
          lead="Engineered from day one for lean, agile global captives — without traditional enterprise bloat."
          width="wide"
          align="center"
        >
          <div className="max-w-7xl mx-auto">
            {/* 6-Card Grid: 2 rows with 3 columns (lg:grid-cols-3) matching Home Industries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {whyNeo.map((w, index) => {
                const isTopRow = index < 3;
                const transitionDelay = isTopRow
                  ? `${(index + 1) * 150}ms`
                  : `${((index - 3) + 1) * 150}ms`;

                return (
                  <motion.div
                    key={w.t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transitionDelay }}
                    className="h-full"
                  >
                    <IndustryImageCard
                      title={w.t}
                      description={w.d}
                      href={w.href}
                      linkLabel={w.ctaText}
                      image={w.image}
                      imageAlt={w.t}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ── 13. FREQUENTLY ASKED QUESTIONS ───────────────────────────────── */}
        <Section
          id="faqs"
          eyebrow="QUESTIONS &amp; ANSWERS"
          title="Frequently asked questions"
          width="regular"
          align="center"
        >
          <div className="max-w-4xl mx-auto">
            <AnswerBlock
              items={faqs.map((faq) => ({
                question: faq.q,
                answer: faq.a,
              }))}
              level={3}
            />
          </div>
        </Section>

        {/* ── 14. CLOSING CTA BANNER ───────────────────────────────────────── */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] text-white p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-[0.2em] mb-3 block">
                Start Today
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold font-manrope text-white tracking-tight leading-tight mb-4">
                Start with one squad.
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                A 30 minute scoping call. We will come back within 48 hours with a Micro GCC build plan: squad count, tier, ownership model, city, timeline, and indicative cost.
              </p>

              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#169DC8] to-[#0D306C] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#169DC8]/25 hover:from-[#1389af] hover:to-[#09224f] hover:shadow-[0_8px_25px_-4px_rgba(22,157,200,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group"
                >
                  <span>Book a 30-min scoping call</span>
                  <ArrowRight aria-hidden className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Download the Micro GCC playbook</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── 15. CONNECTED ECOSYSTEM (Matching AI Talent with Wave Divider & Navy BG) ── */}
      <section
        id="related-services"
        aria-labelledby="related-services-heading"
        className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip select-none"
      >
        {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
        <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
          >
            <path
              d="M0,-4 L1440,-4 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
              fill="#D2DCF0"
              opacity="0.6"
            />
            <path
              d="M0,-4 L1440,-4 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
              fill="#E7EDF9"
            />
          </svg>
        </div>

        {/* Ambient background glow highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Subtle technical grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <SectionHeader
              eyebrow="CONNECTED ECOSYSTEM"
              title={
                <>
                  Related Services &amp; Tools
                  <span className="text-[#38BDF8]">.</span>
                </>
              }
              description="Explore related GCC practices, scaling options, and capability pillars across the NeoIntelli platform."
              align="center"
              variant="white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
            {relatedLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group relative flex flex-col justify-between w-full h-full min-h-[175px] sm:min-h-[190px] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
                  }}
                >
                  {/* Chamfer Corner Border Accent (Bottom-Left Cut) */}
                  <svg
                    className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none overflow-visible z-20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="22"
                      y2="24"
                      stroke="#20528E"
                      strokeOpacity={0.75}
                      strokeWidth="1.5"
                      className="group-hover:stroke-[#38BDF8] transition-colors"
                    />
                  </svg>

                  {/* Inner Specular Highlight Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-[#38BDF8] border border-white/10 group-hover:border-[#38BDF8]/50 group-hover:scale-105 transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono text-[#38BDF8] tracking-wider uppercase font-semibold">
                          Service
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2 group-hover:text-[#38BDF8] transition-colors duration-200 line-clamp-2">
                        {item.name}
                      </h3>

                      {item.summary && (
                        <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2 mb-3 font-normal">
                          {item.summary}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-white transition-colors duration-200">
                      <span>{item.anchor || "Explore service"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Consultation hideUpperCta={true} hideWaveDivider={true} />
      <Footer />
    </div>
  );
}
