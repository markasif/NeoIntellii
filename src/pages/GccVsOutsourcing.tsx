"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Scale,
  ShieldCheck,
  HelpCircle,
  Layers,
  ArrowUpRight,
  Sparkles,
  Calculator,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

const comparisonRows = [
  { factor: "Team ownership", gcc: "Your employees, your culture", outsourcing: "Vendor's employees" },
  { factor: "IP ownership", gcc: "100% yours", outsourcing: "Typically shared or licensed" },
  { factor: "Cost (Year 1)", gcc: "Higher (setup + ramp)", outsourcing: "Lower (pay-per-project/hour)" },
  { factor: "Cost (Year 2-5)", gcc: "Lower (amortized setup, no vendor margin)", outsourcing: "Higher (vendor margins compound)" },
  { factor: "Control over quality", gcc: "Full control", outsourcing: "Limited (SOW-dependent)" },
  { factor: "Talent retention", gcc: "High (employees invested in your mission)", outsourcing: "Low (vendor rotates talent)" },
  { factor: "Scalability", gcc: "Scale at your pace, your terms", outsourcing: "Vendor-dependent" },
  { factor: "Knowledge retention", gcc: "Institutional knowledge stays in your org", outsourcing: "Walks away when contract ends" },
  { factor: "Time to start", gcc: "8-12 weeks", outsourcing: "2-4 weeks" },
  { factor: "Minimum viable size", gcc: "5-10 people", outsourcing: "1 person" },
  { factor: "Management overhead", gcc: "Requires India leadership or partner", outsourcing: "Vendor manages day-to-day" },
  { factor: "Best for", gcc: "Long-term capability building, AI/IP-heavy work", outsourcing: "Short-term projects, non-core work" },
];

const gccReasons = [
  "You're building a long-term engineering capability (2+ year horizon)",
  "Your work involves proprietary AI models, core IP, or sensitive data",
  "You want to own your team and retain institutional knowledge",
  "You're spending $500K+/year on outsourcing and want better economics",
  "Talent retention and cultural alignment matter more than speed to start",
  "You need dedicated, embedded teams — not rotating contractors",
];

const outsourcingReasons = [
  "You need to ship a specific project in <3 months",
  "Your needs are project-based, not ongoing",
  "You need fewer than 5 people and don't plan to scale",
  "The work is non-core (testing, maintenance, support)",
  "You don't have bandwidth to manage an India operation (and don't want a managed GCC partner)",
];

const tcoRows = [
  { component: "Setup costs", gcc: "$150K", outsourcing: "$0" },
  { component: "Annual team cost", gcc: "$1.2M/yr × 5 = $6M", outsourcing: "$1.8M/yr × 5 = $9M" },
  { component: "Vendor margin", gcc: "$0", outsourcing: "$2.5M (embedded in rates)" },
  { component: "Knowledge loss cost*", gcc: "$0", outsourcing: "$500K-$1M (re-onboarding)" },
  { component: "Total 5-year cost", gcc: "~$6.15M", outsourcing: "~$10-12M", highlight: true },
  { component: "IP ownership", gcc: "100%", outsourcing: "Negotiable" },
  { component: "Team at end of 5 years", gcc: "Yours", outsourcing: "Gone" },
];

const decisionFramework = [
  { question: "Is this a 2+ year need?", yes: "Consider GCC", no: "Outsourcing" },
  { question: "Does the work involve core IP?", yes: "GCC", no: "Either works" },
  { question: "Are you spending $500K+/year?", yes: "GCC saves money", no: "Outsourcing may be simpler" },
  { question: "Do you need >10 dedicated people?", yes: "GCC", no: "Start with outsourcing" },
];

const faqs = [
  {
    q: "Is NeoIntelli biased toward GCCs?",
    a: "We're a GCC partner, so naturally we believe in the model. But we'll tell you when outsourcing is the better fit. If your project is short-term, small-scale, or non-core, outsourcing may make more sense.",
  },
  {
    q: "Can I start with outsourcing and transition to a GCC later?",
    a: "Absolutely. Many companies start with outsourcing to validate the India model, then transition to a GCC for long-term cost savings and IP ownership. NeoIntelli supports this transition.",
  },
  {
    q: "What if I need both GCC and outsourcing?",
    a: "A hybrid model works well for many companies. Core IP and long-term capabilities go to your GCC, while non-core or surge-capacity work goes to outsourcing vendors.",
  },
];

const relatedLinks = [
  { name: "GCC Setup & Launch", href: "/services/gcc/setup-launch", desc: "Build your captive center in 12 weeks" },
  { name: "GCC Cost Calculator", href: "/gcc-cost-calculator", desc: "Model exact role-by-role budgets" },
  { name: "AI-first GCC", href: "/services/ai-gcc", desc: "Future-proof engineering architecture" },
  { name: "GCC-as-a-Service", href: "/gcc-as-a-service", desc: "Zero entity overhead, 100% control" },
];

export default function GccVsOutsourcing() {
  useEffect(() => {
    document.title = "GCC vs Outsourcing | Honest Comparison Guide 2026 - NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="gcc-vs-outsourcing-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="GCC vs Outsourcing Comparison Hero"
        >
          {/* Executive Background Overlay with 3D Cyan Fluid Ribbon */}
          <div className="absolute inset-0 w-full h-full z-0">
            {/* Mobile artwork */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/hero/hero-half-viewport-mobile.webp"
                alt="Mobile hero artwork"
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
            {/* Desktop artwork */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/hero/hero-half-viewport.webp"
              alt="GCC vs Outsourcing Comparison"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
            </div>
            {/* Soft responsive gradient overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#012048]/95 via-[#012048]/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-200">
                    GCC vs Outsourcing
                  </span>
                </li>
              </ol>
            </nav>


            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-manrope font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.035em] leading-[1.08] mb-5 max-w-4xl"
            >
              GCC vs IT Outsourcing — An Honest Comparison
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mb-8"
            >
              Both models work. Neither is universally better. Here is an honest breakdown to help you choose the right one for your situation — written by a GCC partner who will tell you when outsourcing makes more sense.
            </motion.p>

            {/* Hero CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#00A3E0] to-[#0D306C] hover:from-[#008EC4] hover:to-[#092352] text-white font-manrope font-bold py-3.5 px-7 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base group"
              >
                Not Sure? Get a Personalized Recommendation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gcc-cost-calculator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-manrope font-semibold text-sm sm:text-base backdrop-blur-xs transition-all"
              >
                <Calculator className="w-4 h-4 text-[#38BDF8]" />
                Calculate GCC Cost Savings
              </Link>
            </motion.div>

            {/* Hero Trust Badges Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>100% IP &amp; Team Ownership</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>60–70% Long-Term Cost Advantage</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <Layers className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Zero Hidden Vendor Markup</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. AT A GLANCE COMPARISON TABLE */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                HEAD-TO-HEAD MATRIX
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                GCC vs Outsourcing at a Glance
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                A structured comparison across governance, economics, intellectual property, and team longevity.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#D2DCF0] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F0F5FA] border-b border-[#D2DCF0]">
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74] w-1/4">
                        Factor
                      </th>
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#0D306C] bg-[#00A3E0]/10 border-x border-[#00A3E0]/20 w-[37.5%]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                          GCC (Captive Center)
                        </div>
                      </th>
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74] w-[37.5%]">
                        IT Outsourcing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D2DCF0]/60 text-sm">
                    {comparisonRows.map((row, idx) => (
                      <tr
                        key={row.factor}
                        className={`transition-colors hover:bg-[#F8FAFD] ${
                          idx % 2 === 0 ? "bg-white" : "bg-[#FAFBFD]"
                        }`}
                      >
                        <td className="py-4 px-6 font-manrope font-bold text-[#0D306C]">
                          {row.factor}
                        </td>
                        <td className="py-4 px-6 font-medium text-[#0D306C] bg-[#00A3E0]/[0.04] border-x border-[#00A3E0]/15">
                          {row.gcc}
                        </td>
                        <td className="py-4 px-6 text-[#505D74]">
                          {row.outsourcing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHEN GCC MAKES SENSE VS WHEN OUTSOURCING WINS */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                STRATEGIC FIT CRITERIA
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                When to Choose Which Operating Model
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Choose the model that aligns with your product horizon, IP sensitivity, and budget scale.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Card 1: Choose GCC If */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#00A3E0]/30 shadow-md flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3E0]/5 rounded-bl-full pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#008EC4] text-xs font-mono font-bold uppercase tracking-wider mb-6 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommended for Long-Term Moats
                </div>
                <h3 className="font-manrope font-extrabold text-2xl text-[#0D306C] mb-4">
                  Choose a GCC If...
                </h3>
                <p className="text-[#505D74] text-sm mb-6 leading-relaxed">
                  Best when engineering is your core competitive advantage and you need high retention.
                </p>

                <ul className="space-y-4 text-sm mt-auto">
                  {gccReasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00A3E0]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#008EC4]" />
                      </div>
                      <span className="font-medium text-[#2B3D66] leading-relaxed">
                        {reason}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[#D2DCF0]">
                  <Link
                    to="/services/gcc/setup-launch"
                    className="inline-flex items-center gap-2 text-sm font-manrope font-bold text-[#008EC4] hover:text-[#0D306C] transition-colors"
                  >
                    Explore GCC Setup &amp; Launch Program
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Stay with Outsourcing If */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D2DCF0] shadow-xs flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#505D74] text-xs font-mono font-bold uppercase tracking-wider mb-6 w-fit">
                  <Compass className="w-3.5 h-3.5" />
                  Pragmatic for Tactical Projects
                </div>
                <h3 className="font-manrope font-extrabold text-2xl text-[#0D306C] mb-4">
                  Stay with Outsourcing If...
                </h3>
                <p className="text-[#505D74] text-sm mb-6 leading-relaxed">
                  Best when immediate flexibility, short commitment, or non-core capacity is the priority.
                </p>

                <ul className="space-y-4 text-sm mt-auto">
                  {outsourcingReasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                        <XCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-[#505D74] leading-relaxed">
                        {reason}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[#D2DCF0]">
                  <p className="text-xs text-[#505D74] leading-relaxed">
                    Note: If you have an existing outsourced team in India, NeoIntelli can assist you in converting them into a high-performing captive GCC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. 5-YEAR TOTAL COST OF OWNERSHIP (TCO) */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#D2DCF0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                FINANCIAL MODELING
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                The Real Math: 5-Year Total Cost of Ownership
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Scenario: 25-person engineering team over 5 years.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#D2DCF0] bg-white shadow-sm mb-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F0F5FA] border-b border-[#D2DCF0]">
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74] w-1/3">
                        Cost Component
                      </th>
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#0D306C] bg-[#00A3E0]/10 border-x border-[#00A3E0]/20 w-1/3">
                        GCC (5 Years)
                      </th>
                      <th className="py-4.5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74] w-1/3">
                        Outsourcing (5 Years)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D2DCF0]/60 text-sm">
                    {tcoRows.map((row) => (
                      <tr
                        key={row.component}
                        className={`transition-colors ${
                          row.highlight
                            ? "bg-[#00A3E0]/15 font-bold"
                            : "hover:bg-[#F8FAFD]"
                        }`}
                      >
                        <td
                          className={`py-4 px-6 ${
                            row.highlight
                              ? "font-manrope font-extrabold text-[#0D306C] text-base"
                              : "font-manrope font-semibold text-[#0D306C]"
                          }`}
                        >
                          {row.component}
                        </td>
                        <td
                          className={`py-4 px-6 border-x border-[#00A3E0]/20 ${
                            row.highlight
                              ? "font-manrope font-extrabold text-[#008EC4] text-lg bg-[#00A3E0]/20"
                              : "font-medium text-[#0D306C] bg-[#00A3E0]/[0.04]"
                          }`}
                        >
                          {row.gcc}
                        </td>
                        <td
                          className={`py-4 px-6 ${
                            row.highlight
                              ? "font-manrope font-bold text-[#505D74] text-base"
                              : "text-[#505D74]"
                          }`}
                        >
                          {row.outsourcing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#F0F5FA] rounded-xl p-4 sm:p-5 border border-[#D2DCF0] text-xs text-[#505D74] leading-relaxed">
              <p className="italic">
                *Knowledge loss cost estimates based on industry averages for re-onboarding replacement teams when vendor contracts change. Every figure in this table is an illustrative starting point for a 25-person team, not a quote — actual cost moves with role mix, seniority, city and engagement length.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. HYBRID MODEL (DARK EXECUTIVE BLOCK) */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#001844] text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#38BDF8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                PROVEN TRANSITION PATH
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-5">
                The Best of Both Worlds: Start Outsourcing, Transition to a GCC
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Many companies start with outsourcing to validate the India model. Once proven, they transition to a GCC for long-term cost savings and IP ownership. NeoIntelli supports this transition.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Start with outsourcing",
                  desc: "Validate the India model with a small outsourced team for 6–12 months.",
                },
                {
                  step: "02",
                  title: "Prove the value",
                  desc: "Demonstrate quality, cost savings, and collaboration readiness.",
                },
                {
                  step: "03",
                  title: "Transition to GCC",
                  desc: "Convert the outsourced team into your captive GCC with NeoIntelli's help.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xs relative group hover:border-[#00A3E0]/50 transition-all"
                >
                  <p className="text-4xl sm:text-5xl font-manrope font-extrabold text-white/15 mb-4 group-hover:text-[#38BDF8]/40 transition-colors">
                    {s.step}
                  </p>
                  <h3 className="font-manrope font-bold text-lg text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/services/gcc-operations/bot-transition"
                className="inline-flex items-center gap-2 text-sm font-manrope font-bold text-[#38BDF8] hover:text-white transition-colors"
              >
                Learn about Build-Operate-Transfer (BOT) Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. QUICK DECISION FRAMEWORK */}
        {/* ============================================================ */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA] border-b border-[#D2DCF0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#169DC8] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] block mb-3">
                DECISION ARCHITECTURE
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Quick Decision Framework
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Four diagnostic criteria to determine your optimal operating model today.
              </p>
            </div>

            <div className="space-y-4">
              {decisionFramework.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl bg-white p-6 sm:p-7 border border-[#D2DCF0] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <p className="font-manrope font-bold text-base sm:text-lg text-[#0D306C]">
                    {item.question}
                  </p>
                  <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A3E0]/10 border border-[#00A3E0]/20">
                      <CheckCircle2 className="w-4 h-4 text-[#008EC4] shrink-0" />
                      <span className="text-sm font-manrope font-bold text-[#0D306C]">
                        Yes → <span className="text-[#008EC4]">{item.yes}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm font-manrope font-medium text-[#505D74]">
                        No → <span>{item.no}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                CLARITY &amp; OBJECTIVITY
              </span>
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0D306C] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#505D74] text-base sm:text-lg leading-relaxed">
                Objective answers to common questions about trade-offs, transition timelines, and hybrid setups.
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
        {/* 8. RELATED STRATEGIC SOLUTIONS */}
        {/* ============================================================ */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA] border-b border-[#D2DCF0]">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-manrope font-bold text-xl text-[#0D306C] mb-6">
              Related GCC Solutions &amp; Models
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="p-5 rounded-xl bg-white border border-[#D2DCF0] hover:border-[#00A3E0] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-manrope font-bold text-sm text-[#0D306C] group-hover:text-[#008EC4] transition-colors">
                        {link.name}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#505D74] group-hover:text-[#008EC4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-[#505D74] leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 9. CLOSING EXECUTIVE CTA */}
        {/* ============================================================ */}
        <ExecutiveCTA
          eyebrow="DECISION CONSULTATION"
          title="Still not sure? Let us analyze your specific situation."
          description="We will recommend the right model based on your team size, budget, timeline, and strategic goals."
          primaryCta={{
            label: "Get a Personalized Recommendation",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Model Your GCC Economics",
            href: "/gcc-cost-calculator",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
