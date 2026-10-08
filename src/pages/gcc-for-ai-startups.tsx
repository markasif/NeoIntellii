"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Rocket,
  Shield,
  Users,
  Layers,
  TrendingUp,
  DollarSign,
  BarChart3,
  Globe,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CAL_BOOKING_URL } from "@/lib/constants";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

// Relative shape only. No burn figures, cost ranges or runway projections -
// those are modelled with each company against its own plan, not published.
const comparisonData = [
  { model: "All US (SF/NYC)", cost: "Heaviest burn", runway: "Shortest runway", highlight: false },
  { model: "All India (GCC)", cost: "Leanest burn", runway: "Longest runway", highlight: true },
  { model: "Hybrid (5 US + 15 India)", cost: "Moderate burn", runway: "Extended runway", highlight: false },
];

const whyGCCCards = [
  {
    icon: BarChart3,
    title: "Investors want to see your team, not your vendor",
    desc: "A GCC is your company. It shows up on your org chart, not as a line item on a vendor invoice.",
  },
  {
    icon: Shield,
    title: "AI IP must stay in-house",
    desc: "Your models, your data, your competitive moat. Outsourcing AI work means sharing your crown jewels.",
  },
  {
    icon: Users,
    title: "Retention matters when every sprint counts",
    desc: "Outsourced teams rotate. Your GCC team builds context over months and years.",
  },
  {
    icon: Rocket,
    title: "You can start small",
    desc: "NeoIntelli launches GCCs with as few as 5 engineers. Scale up as product-market fit materializes.",
  },
];

const timelineSteps = [
  { week: "Week 1", title: "Intake call", desc: "Understand your product, tech stack, team needs." },
  { week: "Week 2–3", title: "Source & screen", desc: "Source and screen candidates. You interview and approve." },
  { week: "Week 3–4", title: "Offer & onboard", desc: "Offer, onboard, workspace ready." },
  { week: "Week 4+", title: "Shipping code", desc: "Team is in your standup, your Slack, your GitHub. Shipping code." },
];

// Stage, shape and commitment - never a rate. Each model is quoted against
// the team you actually need and confirmed in a written proposal.
const engagementModels = [
  { stage: "Pre-Seed / Seed", engineers: "3–5 engineers", model: "Managed Pod", note: "Lightest commitment. No India entity of your own required." },
  { stage: "Series A", engineers: "5–15 engineers", model: "Managed GCC", note: "Your charter and roadmap. We run everything operational." },
  { stage: "Series B", engineers: "15–40 engineers", model: "GCC with India Lead", note: "A named India lead owns delivery on the ground." },
  { stage: "Series C+", engineers: "40–100+", model: "Full GCC", note: "Full ownership of entity, talent and IP, with a graduate path built in." },
];

const investorPoints = [
  { icon: DollarSign, title: "Capital efficiency", desc: "Demonstrate disciplined capital deployment. Show investors you can build more with less." },
  { icon: TrendingUp, title: "Team growth metrics", desc: "Show rapid team scaling without burning through runway. Headcount growth that maps to product milestones." },
  { icon: Globe, title: "Global talent narrative", desc: "A global engineering team is a strength, not a workaround. Investors increasingly expect it." },
  { icon: Layers, title: "Margin improvement", desc: "Lower cost per engineer means better unit economics and a clearer path to profitability." },
];

const faqs = [
  {
    q: "Do I need to incorporate a company in India?",
    a: "Not initially. NeoIntelli offers a managed model where your team operates under our entity while you retain full operational control. When you’re ready, we help you transition to your own entity.",
  },
  {
    q: "Can I start with just 3 engineers?",
    a: "Yes. Many AI startups begin with a small, focused pod of 3–5 engineers and scale from there. There’s no minimum headcount requirement to get started.",
  },
  {
    q: "What kind of AI engineers can you hire in India?",
    a: "ML engineers, data engineers, full-stack developers with AI experience, MLOps specialists, NLP/computer vision engineers, and research engineers. India has one of the deepest AI talent pools globally.",
  },
  {
    q: "How is this different from freelance or contract hiring?",
    a: "A GCC gives you a dedicated, full-time team that works exclusively for you. They’re on your tools, in your standups, and building deep context on your product. It’s not freelance or contract work — it’s your team.",
  },
  {
    q: "What if I need to scale down?",
    a: "Our month-to-month managed model allows you to scale up or down with 30 days notice. No long-term lock-in contracts.",
  },
  {
    q: "Will there be timezone overlap?",
    a: "Yes. India-based teams typically offer 4–6 hours of overlap with US time zones (more with East Coast). Most startups find this sufficient for daily standups and real-time collaboration.",
  },
  {
    q: "Who owns the IP?",
    a: "You do. All intellectual property, code, models, and data belong to your company. This is contractually guaranteed from day one.",
  },
  {
    q: "How do you ensure quality?",
    a: "We source from top-tier talent pools, run rigorous technical screening, and you make the final hiring decision. Every engineer is interviewed and approved by your team before they start.",
  },
];

export default function GCCForAIStartups() {
  useEffect(() => {
    document.title = "GCC for AI Startups — Build Your India Engineering Team | NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="startup-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="GCC for AI Startups Hero"
        >
          {/* Executive Background Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="GCC for AI Startups"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
            />
            {/* Soft responsive overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Top spacer for navbar */}
          <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

          {/* Hero Content Area */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
            {/* Breadcrumb Navigation */}
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
                  <span aria-current="page" className="font-semibold text-[#0D306C]">
                    GCC for AI Startups
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left font-sans">
                  Build a World-Class Engineering Team for 60% Less.
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left font-sans">
                  You raised funding to build AI, not to pay Bay Area rent. A GCC in India gives you 3x the engineering firepower for the same budget — and you own the team and the IP.
                </p>

                {/* CTAs Row */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-left">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>Extend Your Runway — Book Call</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </a>

                  <a
                    href="#startup-models"
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>View Flexible Pod Models</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dock: Metrics Strip */}
          <div className="relative z-20 w-full bg-transparent border-none pb-4 sm:pb-6 lg:pb-8 shrink-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-[#0D306C]/10 sm:divide-y-0 sm:divide-x sm:divide-[#0D306C]/15 bg-transparent p-0">
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    60%
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Burn reduction vs US and European hiring
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    3–5
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Engineers starter pod with immediate scale
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    3–4 Wks
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Time to first operational production pod
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    100%
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Dedicated client ownership of code &amp; IP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. THE STARTUP MATH */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                CAPITAL EFFICIENCY MATH
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                The Runway Math That Changes Everything
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Scenario: you have just closed a Series A and you need to stand up an engineering team of twenty.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {comparisonData.map((row) => (
                <div
                  key={row.model}
                  className={`p-8 rounded-3xl transition-all flex flex-col justify-between ${
                    row.highlight
                      ? "bg-gradient-to-br from-[#012048] to-[#0D306C] text-white shadow-xl border border-[#00A3E0]/40 ring-2 ring-[#00A3E0]/30 relative overflow-hidden"
                      : "bg-[#F0F5FA] border border-[#D2DCF0] text-[#2B3D66]"
                  }`}
                >
                  {row.highlight && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A3E0] text-white text-xs font-mono font-bold uppercase tracking-wider mb-4 w-fit shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      Highest Capital Efficiency
                    </div>
                  )}
                  <div>
                    <p
                      className={`text-sm font-manrope font-bold mb-3 ${
                        row.highlight ? "text-[#38BDF8]" : "text-[#505D74]"
                      }`}
                    >
                      {row.model}
                    </p>
                    <p
                      className={`text-3xl sm:text-4xl font-manrope font-extrabold mb-2 tracking-tight ${
                        row.highlight ? "text-white" : "text-[#0D306C]"
                      }`}
                    >
                      {row.cost}
                    </p>
                    <p
                      className={`text-xs sm:text-sm mb-6 ${
                        row.highlight ? "text-slate-300" : "text-[#505D74]"
                      }`}
                    >
                      Annual burn, same twenty engineers
                    </p>
                  </div>

                  <div
                    className={`pt-6 border-t ${
                      row.highlight ? "border-white/20" : "border-[#D2DCF0]"
                    }`}
                  >
                    <p
                      className={`text-2xl font-manrope font-bold mb-1 ${
                        row.highlight ? "text-[#38BDF8]" : "text-[#0D306C]"
                      }`}
                    >
                      {row.runway}
                    </p>
                    <p
                      className={`text-xs ${
                        row.highlight ? "text-slate-300" : "text-[#505D74]"
                      }`}
                    >
                      Runway impact
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-[#F0F5FA] border border-[#D2DCF0] max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl font-manrope font-extrabold text-[#0D306C]">
                Same talent quality. Same IP ownership.{" "}
                <span className="text-[#008EC4]">Materially more runway.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHY SMART AI STARTUPS CHOOSE GCCS OVER OUTSOURCING */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA] border-b border-[#D2DCF0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                FOUNDER STRATEGY
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Why Smart AI Startups Choose GCCs Over Outsourcing
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Captive ownership ensures your engineering velocity, valuation multiples, and core algorithms remain yours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {whyGCCCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.title}
                    className="p-8 rounded-2xl bg-white border border-[#D2DCF0] shadow-xs hover:border-[#00A3E0]/40 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00A3E0]/10 flex items-center justify-center mb-5 group-hover:bg-[#00A3E0]/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-[#008EC4]" />
                    </div>
                    <h3 className="font-manrope font-bold text-xl text-[#0D306C] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[#505D74] text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. HOW IT WORKS FOR STARTUPS */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                SPRINT-PACED ONBOARDING
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Startup-Friendly GCC: How It Works
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                From technical discovery to shipping production code in less than a month.
              </p>
            </div>

            <div className="relative">
              {/* Vertical connector line on desktop */}
              <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#00A3E0] via-[#0D306C] to-[#00A3E0]/30" />

              <div className="space-y-6">
                {timelineSteps.map((step, i) => (
                  <div key={step.week} className="md:pl-20 relative">
                    {/* Timeline Node */}
                    <div className="hidden md:flex absolute left-[25px] top-7 w-4 h-4 rounded-full bg-gradient-to-br from-[#00A3E0] to-[#0D306C] ring-4 ring-white shadow-xs" />
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#F0F5FA] border border-[#D2DCF0] hover:border-[#00A3E0]/40 transition-colors">
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008EC4] block mb-1">
                        {step.week}
                      </span>
                      <h3 className="font-manrope font-bold text-lg sm:text-xl text-[#0D306C] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#505D74] text-sm sm:text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#00A3E0]/40 bg-[#00A3E0]/5 text-center">
              <p className="text-[#0D306C] text-sm sm:text-base leading-relaxed font-manrope">
                <span className="font-extrabold text-[#0D306C]">No long-term contracts.</span>{" "}
                Month-to-month managed model available. Scale up or down with 30 days notice.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. STARTUP ENGAGEMENT MODELS */}
        {/* ============================================================ */}
        <section
          id="startup-models"
          className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA] border-b border-[#D2DCF0] scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                VENTURE STAGES
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Flexible Models for Every Stage
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Each model is quoted against your team size, role mix, seniority and city. Contact us for pricing, confirmed in a written proposal.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {engagementModels.map((m) => (
                <div
                  key={m.stage}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D2DCF0] shadow-xs hover:border-[#00A3E0]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#008EC4] mb-3">
                      {m.stage}
                    </span>
                    <p className="font-manrope font-extrabold text-xl text-[#0D306C] mb-1">
                      {m.engineers}
                    </p>
                    <p className="text-sm font-semibold text-[#169DC8] mb-4">
                      {m.model}
                    </p>
                  </div>
                  <p className="text-[#505D74] text-xs sm:text-sm mt-4 pt-4 border-t border-[#D2DCF0] leading-relaxed">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. INVESTOR-READY (DARK EXECUTIVE BLOCK) */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#001844] text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#38BDF8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                EQUITY VALUE &amp; FUNDRAISING
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-4">
                How a GCC Strengthens Your Next Fundraise
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                A well-structured India GCC is not a cost-cutting story. It is a capital efficiency story that investors love.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {investorPoints.map((point) => {
                const IconComp = point.icon;
                return (
                  <div
                    key={point.title}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00A3E0]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6 text-[#38BDF8]" />
                    </div>
                    <h3 className="font-manrope font-bold text-lg text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/services/ai-gcc"
                className="bg-[#00A3E0] hover:bg-[#008EC4] text-white font-manrope font-bold py-3 px-6 rounded-xl shadow-md hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 text-sm"
              >
                Explore AI GCC Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors text-sm font-manrope font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                FOUNDER FAQS
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Clear answers on incorporation requirements, IP protection, hiring, and time zone coordination.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-[#F0F5FA] rounded-2xl border border-[#D2DCF0] transition-all hover:border-[#00A3E0]/40 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-manrope font-bold text-base sm:text-lg text-[#0D306C] list-none select-none">
                    <span className="pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-[#00A3E0] shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-[#D2DCF0]/50 text-sm sm:text-base text-[#505D74] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. FINAL FOUNDER CTA */}
        {/* ============================================================ */}
        <ExecutiveCTA
          eyebrow="TAKE ACTION TODAY"
          title="Ready to Extend Your Runway?"
          description="Talk to us about building your AI engineering team in India. No pitch decks. No long contracts. Just a conversation about what you need."
          primaryCta={{
            label: "Book a Startup GCC Call",
            href: CAL_BOOKING_URL,
            isExternal: true,
          }}
          secondaryCta={{
            label: "Contact Us",
            href: "/contact",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
