"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { ArrowRight, ChevronRight, User, Settings, Handshake, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const youOwn = [
  "Team selection and approval",
  "Technical direction and roadmap",
  "IP and codebase",
  "Performance standards",
  "Strategic decisions",
];

const weManage = [
  "Legal entity and compliance",
  "Talent acquisition and onboarding",
  "HR, payroll, and benefits",
  "Office space and IT infrastructure",
  "Employee engagement and retention",
  "Finance, accounting, and statutory filings",
  "Vendor management",
];

const together = [
  "Team structure and scaling plan",
  "Quarterly business reviews",
  "Culture building and alignment",
  "Performance management",
];

const personas = [
  {
    title: "Companies building their first GCC",
    desc: "Don't know Indian labor law, tax, or compliance? Don't need to. We handle all ground-level legalities while you focus on technical mandates.",
  },
  {
    title: "Companies that want a GCC but not the overhead",
    desc: "You want a dedicated captive team without building a full-time India HR, legal, and facilities department.",
  },
  {
    title: "Companies scaling from 5 to 50+ fast",
    desc: "You need operational infrastructure that scales elastically without you having to rebuild internal processes each quarter.",
  },
  {
    title: "Companies transitioning from outsourcing",
    desc: "Keep the talent, lose the vendor margin. We help convert outsourced agency teams into your captive GCC.",
  },
];

const comparisonRows = [
  { feature: "Team ownership", gcaas: "Yours (100% Captive)", diy: "Yours", outsourcing: "Vendor's", eor: "Yours" },
  { feature: "Operations management", gcaas: "NeoIntelli (Full Stack)", diy: "Internal HR & Ops", outsourcing: "Vendor", eor: "Limited (Payroll only)" },
  { feature: "Setup time", gcaas: "8–12 weeks", diy: "16–24 weeks", outsourcing: "2–4 weeks", eor: "1–2 weeks" },
  { feature: "Compliance handled", gcaas: "Fully Covered", diy: "You manage", outsourcing: "Vendor", eor: "Yes" },
  { feature: "Scalability", gcaas: "High (Squad by squad)", diy: "Moderate", outsourcing: "Vendor-dependent", eor: "Limited" },
  { feature: "Best for", gcaas: "10–200+ person teams", diy: "50+ (with India ops team)", outsourcing: "Project-based", eor: "1–10 people" },
];

const faqs = [
  {
    q: "Do I legally own the team with GCCaaS?",
    a: "Yes. The employees are hired under your India entity (which we help set up) or a co-employment arrangement. IP, codebase, and team direction are 100% yours.",
  },
  {
    q: "How is GCCaaS different from an EOR?",
    a: "An EOR employs people on your behalf but offers limited operational support. GCCaaS provides full operational infrastructure - office, HR, compliance, retention programs, and scaling support.",
  },
  {
    q: "Can I transition from GCCaaS to a fully in-house operation?",
    a: "Absolutely. Many clients start with GCCaaS and transition to full in-house management as their India team matures. We design for this transition from day one.",
  },
  {
    q: "What's the minimum team size for GCCaaS?",
    a: "We typically recommend 10+ people to justify the GCC model. For teams of 1-10, an EOR or staffing arrangement may be more cost-effective.",
  },
];

export default function GccAsAService() {
  useEffect(() => {
    document.title = "GCC-as-a-Service India | Fully Managed GCC — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="gccaas-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="GCC as a Service Hero"
        >
          {/* ── MOBILE BACKGROUND: FOOTER GRADIENT (HIDDEN ON DESKTOP) ── */}
          <div
            className="sm:hidden absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 50%, #ADD2F1 75%, #8EBDE4 100%)",
            }}
          />

          {/* ── DESKTOP BACKGROUND: EXECUTIVE VIEW (HIDDEN ON MOBILE) ── */}
          <div className="hidden sm:block absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/services/gcc-operations/hero-bg.webp"
              alt="India GCC as a Service"
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
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto py-2 sm:py-4">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
              <ol className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-xs text-[#505D74]">
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
                    GCC-as-a-Service
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-center sm:text-left shrink-0 w-full max-w-5xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
              <div className="max-w-xl lg:max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                <h1 className="text-[28px] xs:text-[32px] sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.16] sm:leading-[1.1] mb-2.5 sm:mb-3 text-center sm:text-left">
                  Your GCC, Fully Managed.
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#1D3557] sm:text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-center sm:text-left font-sans mx-auto sm:mx-0">
                  You own the team and the IP. We handle everything else — entity setup, hiring, HR, payroll, compliance, office, IT, and day-to-day operations. It&apos;s your GCC without the operational headache.
                </p>

                {/* CTAs Row - In mobile: show ONLY the navy blue button in center */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                    <Link
                      to="/contact"
                      className="btn-navy shrink-0 text-xs sm:text-[13px] px-4 sm:px-5 py-2.5 whitespace-nowrap"
                    >
                      <span>Explore GCCaaS</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                    </Link>
                  </div>

                  <Link
                    to="/services/gcc/setup-launch"
                    data-secondary-cta
                    className="hidden sm:inline-flex btn-white cursor-pointer shrink-0 whitespace-nowrap text-xs sm:text-[13px] !py-2 sm:!py-2.5 !px-3.5 sm:!px-5"
                  >
                    <span>GCC Setup &amp; Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </Link>
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
                    100%
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Client IP &amp; codebase ownership
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    0
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Legal entity setup required upfront
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    10–200+
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Flexible pod sizing &amp; team scale
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    30 Days
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Fast operational deployment velocity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. HOW IT WORKS (3-COLUMN TRI-PARTITE ARCHITECTURE) */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5 sm:mb-3">
                Operating Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.14] mb-4">
                How GCC-as-a-Service Works
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#505D74] max-w-2xl mx-auto leading-relaxed">
                Clear delineation of responsibilities between your headquarters and NeoIntelli on the ground in India.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* You Own */}
              <div className="bg-[#F0F5FA] rounded-2xl p-6 sm:p-8 border border-[#D2DCF0] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-xs flex items-center justify-center border border-[#D2DCF0]">
                      <User className="w-5 h-5 text-[#008EC4]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#169DC8] block">Your Headquarters</span>
                      <h3 className="text-lg font-bold font-manrope text-[#0D306C]">You Own</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {youOwn.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#169DC8] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#2B3D66] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-[#D2DCF0]">
                  <span className="text-xs text-[#505D74]">100% intellectual property &amp; product roadmap control</span>
                </div>
              </div>

              {/* We Manage */}
              <div className="bg-[#001844] rounded-2xl p-6 sm:p-8 border border-white/15 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A3E0]/15 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Settings className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#38BDF8] block">NeoIntelli India</span>
                      <h3 className="text-lg font-bold font-manrope text-white">We Manage</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {weManage.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-10 mt-8 pt-4 border-t border-white/15">
                  <span className="text-xs text-slate-300">Complete legal, physical &amp; HR operational backbone</span>
                </div>
              </div>

              {/* Together */}
              <div className="bg-[#F0F5FA] rounded-2xl p-6 sm:p-8 border border-[#D2DCF0] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-xs flex items-center justify-center border border-[#D2DCF0]">
                      <Handshake className="w-5 h-5 text-[#0D306C]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#169DC8] block">Governance Interface</span>
                      <h3 className="text-lg font-bold font-manrope text-[#0D306C]">Together</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {together.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#169DC8] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#2B3D66] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-[#D2DCF0]">
                  <span className="text-xs text-[#505D74]">Continuous strategic alignment &amp; cadence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHO GCC-AS-A-SERVICE IS BUILT FOR */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5 sm:mb-3">
                Target Profiles
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.14] mb-4">
                GCC-as-a-Service Is Built For...
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#505D74] max-w-2xl mx-auto leading-relaxed">
                Whether you are launching your first squad or migrating legacy contractors into a captive asset.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {personas.map((p, index) => (
                <div
                  key={p.title}
                  className="bg-white rounded-2xl p-7 border border-[#D2DCF0] shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-200"
                >
                  <span className="inline-block font-mono text-xs font-bold text-[#169DC8] bg-[#169DC8]/10 px-2.5 py-1 rounded-md mb-3">
                    Scenario 0{index + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-manrope text-[#0D306C] mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. COMPARISON TABLE */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D2DCF0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-14">
              <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
                Strategic Benchmarking
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.15] mb-3">
                GCCaaS vs Other Models
              </h2>
              <p className="text-sm sm:text-base text-[#505D74] max-w-xl mx-auto">
                Comparing managed captive delivery with traditional DIY setup, outsourcing, and basic EORs.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#D2DCF0] shadow-xs bg-white">
              <table className="w-full text-left min-w-[650px] border-collapse">
                <thead>
                  <tr className="bg-[#F0F5FA] border-b border-[#D2DCF0]">
                    <th className="py-4 px-5 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74]">
                      Feature
                    </th>
                    <th className="py-4 px-5 text-xs font-mono font-bold uppercase tracking-wider text-[#008EC4] bg-[#00A3E0]/10">
                      GCCaaS (NeoIntelli)
                    </th>
                    <th className="py-4 px-5 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74]">
                      DIY GCC
                    </th>
                    <th className="py-4 px-5 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74]">
                      Outsourcing
                    </th>
                    <th className="py-4 px-5 text-xs font-mono font-bold uppercase tracking-wider text-[#505D74]">
                      EOR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D2DCF0]/70 text-sm">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="hover:bg-[#F8FAFD] transition-colors">
                      <td className="py-4 px-5 font-bold font-manrope text-[#0D306C]">
                        {row.feature}
                      </td>
                      <td className="py-4 px-5 font-bold text-[#008EC4] bg-[#00A3E0]/5">
                        {row.gcaas}
                      </td>
                      <td className="py-4 px-5 text-[#505D74]">
                        {row.diy}
                      </td>
                      <td className="py-4 px-5 text-[#505D74]">
                        {row.outsourcing}
                      </td>
                      <td className="py-4 px-5 text-[#505D74]">
                        {row.eor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. FAQS */}
        {/* ============================================================ */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0F5FA]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 sm:mb-14">
              <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
                Questions &amp; Answers
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-2xl border border-[#D2DCF0] p-5 sm:p-6 transition-all duration-200 open:shadow-xs"
                >
                  <summary className="flex items-center justify-between cursor-pointer text-sm sm:text-base font-bold font-manrope text-[#0D306C] list-none">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 text-[#169DC8] shrink-0 ml-4 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="pt-3.5 border-t border-[#D2DCF0]/60 mt-3.5">
                    <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. RELATED SERVICES STRIP */}
        {/* ============================================================ */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#D2DCF0]">
          <div className="max-w-7xl mx-auto">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#505D74] mb-6 text-center">
              Related GCC Solutions
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "GCC Setup & Launch", href: "/services/gcc/setup-launch", desc: "Turnkey enterprise setup program" },
                { name: "GCC Operations", href: "/services/gcc-operations", desc: "Day-to-day managed facility & HR services" },
                { name: "GCC vs Outsourcing", href: "/gcc-vs-outsourcing", desc: "Economic & operational comparison guide" },
                { name: "GCC Cost Calculator", href: "/gcc-cost-calculator", desc: "Model team size and city budgets" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="group p-4 rounded-xl border border-[#D2DCF0] bg-[#F0F5FA] hover:bg-white hover:border-[#169DC8]/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold font-manrope text-[#0D306C] group-hover:text-[#169DC8] transition-colors mb-1">
                      {link.name}
                    </h4>
                    <p className="text-xs text-[#505D74]">{link.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#169DC8] mt-3">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. BOTTOM CTA BANNER */}
        {/* ============================================================ */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#001844] text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#38BDF8] mb-3">
              Get Started
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-manrope text-white tracking-[-0.03em] mb-4">
              Ready to explore GCC-as-a-Service?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Speak with our senior GCC strategy leads about building a fully managed GCC in India tailored to your tech stack.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold font-manrope text-white bg-gradient-to-r from-[#00A3E0] to-[#0D306C] hover:from-[#008EC4] hover:to-[#092352] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-white/20"
              >
                <span>Speak with an Advisor</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/gcc-cost-calculator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold font-manrope text-slate-200 bg-white/10 hover:bg-white/15 hover:text-white backdrop-blur-md transition-all duration-200 border border-white/10"
              >
                <span>Calculate Your Cost</span>
                <ChevronRight className="w-4 h-4 text-[#38BDF8]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
