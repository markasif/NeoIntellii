"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Users,
  Building2,
  Laptop,
  Shield,
  TrendingDown,
  Calculator,
  UserPlus,
  RefreshCw,
  Compass,
  Clock,
  Coins,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import { ResponsiveMatrix } from "@/components/gcc-strategy";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Consultation from "@/features/home/components/Consultation";
import { CAL_BOOKING_URL } from "@/lib/constants";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

const costCategories = [
  {
    icon: Users,
    title: "Talent & Salaries",
    percentage: "55-65%",
    description: "Fully loaded compensation including base salary, benefits, bonuses, and statutory contributions (PF, gratuity, insurance).",
    items: [
      { role: "AI/ML Engineer", india: "$30K - $55K", us: "$150K - $250K" },
      { role: "Full-Stack Developer", india: "$20K - $40K", us: "$120K - $180K" },
      { role: "Data Engineer", india: "$25K - $45K", us: "$130K - $200K" },
      { role: "DevOps/Cloud Engineer", india: "$22K - $42K", us: "$130K - $190K" },
      { role: "QA/SDET Engineer", india: "$18K - $35K", us: "$100K - $150K" },
      { role: "Engineering Manager", india: "$45K - $75K", us: "$180K - $280K" },
    ],
  },
  {
    icon: Building2,
    title: "Office & Infrastructure",
    percentage: "15-20%",
    description: "Workspace, furnishings, power backup, internet, and facility management across Tier-1 technology centers.",
    items: [
      { role: "Grade-A office space (per seat/year)", india: "$1,800 - $3,600", us: "$8,000 - $15,000" },
      { role: "Furnishing & fit-out (one-time/seat)", india: "$800 - $1,500", us: "$3,000 - $6,000" },
      { role: "Co-working/managed space (per seat/year)", india: "$2,400 - $4,800", us: "$6,000 - $12,000" },
    ],
  },
  {
    icon: Laptop,
    title: "Technology & Tools",
    percentage: "10-15%",
    description: "Hardware, software licenses, cloud infrastructure, collaboration tools, and enterprise cybersecurity.",
    items: [
      { role: "Laptop + peripherals (one-time)", india: "$1,000 - $1,800", us: "$1,500 - $2,500" },
      { role: "Software licenses (per person/year)", india: "$2,000 - $5,000", us: "$3,000 - $7,000" },
      { role: "Cloud infra (per person/year)", india: "$1,500 - $4,000", us: "$2,000 - $5,000" },
    ],
  },
  {
    icon: Shield,
    title: "Legal, Compliance & Admin",
    percentage: "5-10%",
    description: "Entity registration, legal counsel, statutory compliance, accounting, payroll, and HR administration.",
    items: [
      { role: "Entity registration (one-time)", india: "$3,000 - $8,000", us: "$5,000 - $15,000" },
      { role: "Legal & compliance (annual)", india: "$10,000 - $25,000", us: "$30,000 - $80,000" },
      { role: "Payroll & HR admin (per person/year)", india: "$500 - $1,200", us: "$1,500 - $3,000" },
    ],
  },
];

const teamSizes = [
  {
    size: "Starter Pod",
    headcount: "5-10 PEOPLE",
    monthlyIndia: "$25K - $50K",
    annualIndia: "$300K - $600K",
    annualUS: "$900K - $2M",
    savings: "60-70%",
    bestFor: "MVP validation, focused AI/ML or engineering pods",
    highlight: false,
  },
  {
    size: "Growth Team",
    headcount: "15-25 PEOPLE",
    monthlyIndia: "$65K - $130K",
    annualIndia: "$780K - $1.56M",
    annualUS: "$2.7M - $5M",
    savings: "65-70%",
    bestFor: "Multi-function teams with engineering, data, and QA",
    highlight: true,
  },
  {
    size: "Scale Center",
    headcount: "50-100 PEOPLE",
    monthlyIndia: "$200K - $450K",
    annualIndia: "$2.4M - $5.4M",
    annualUS: "$7.5M - $15M",
    savings: "65-70%",
    bestFor: "Full GCC with multiple pods, leadership, and support functions",
    highlight: false,
  },
];

const cityComparison = [
  {
    city: "Bengaluru",
    talentPool: "Largest",
    costIndex: "Highest in India",
    strengths: "AI/ML, cloud, SaaS, deep tech",
    gccCount: "600+",
  },
  {
    city: "Hyderabad",
    talentPool: "Very Large",
    costIndex: "10-15% lower than Bengaluru",
    strengths: "Enterprise tech, data, pharma-tech",
    gccCount: "400+",
  },
  {
    city: "Chennai",
    talentPool: "Large",
    costIndex: "15-20% lower than Bengaluru",
    strengths: "Manufacturing-tech, BFSI, embedded systems",
    gccCount: "250+",
  },
  {
    city: "Pune",
    talentPool: "Large",
    costIndex: "15-20% lower than Bengaluru",
    strengths: "Automotive-tech, ERP, full-stack engineering",
    gccCount: "200+",
  },
];

const hiddenCosts = [
  {
    icon: UserPlus,
    title: "Recruitment Costs",
    description: "Agency fees (8-15% of CTC), job board subscriptions, and recruitment team salaries. Budget 10-15% of first-year salaries for initial hiring.",
  },
  {
    icon: RefreshCw,
    title: "Attrition & Backfills",
    description: "India's tech attrition runs 15-25%. Factor in 2-3 months of overlap and recruitment cost per backfill. A strong EVP and culture investment reduces this significantly.",
  },
  {
    icon: Compass,
    title: "Travel & Integration",
    description: "Quarterly leadership travel between HQ and GCC. Budget $15K-$30K per trip for a small team. Critical for culture alignment in the first 12 months.",
  },
  {
    icon: Clock,
    title: "Ramp-Up Productivity",
    description: "New hires typically reach full productivity in 3-6 months. Factor in onboarding, training, and knowledge transfer time when planning delivery timelines.",
  },
];

const faqs = [
  {
    q: "What is the total first-year cost to set up a 10-person GCC in India?",
    a: "Including entity setup, office, hiring, salaries, IT, and compliance, budget from around $400K for the first year, rising with seniority and team shape. This is roughly 40-50% of what the same team would cost in the US, with ongoing savings of 60-70% from year two onward.",
  },
  {
    q: "Are these costs for Bangalore specifically or all of India?",
    a: "The salary ranges shown are national averages weighted toward Tier-1 cities. Bengaluru tends to be at the higher end, while Hyderabad, Chennai, and Pune are 10-20% lower. We provide city-specific estimates as part of our feasibility assessment.",
  },
  {
    q: "Do costs include employer statutory contributions?",
    a: "Yes. All salary figures are fully loaded, including Provident Fund (12%), gratuity, ESI (where applicable), professional tax, and statutory bonuses. We also factor in standard benefits like health insurance and meal allowances.",
  },
  {
    q: "How do costs change as the team scales?",
    a: "Per-person costs generally decrease by 10-15% as you scale beyond 25 people due to better office rates, shared infrastructure, and operational efficiencies. Leadership and management layers add cost but improve delivery quality and retention.",
  },
  {
    q: "Is it cheaper to use an EOR or set up our own entity?",
    a: "EOR (Employer of Record) is cheaper for teams under 5 people or for pilot programs. Beyond that, an owned entity is more cost-effective long-term and gives you full control over IP, data, and operations. Many clients start with EOR and transition.",
  },
  {
    q: "What currency risks should we plan for?",
    a: "GCC costs are primarily in INR. The INR/USD rate has been relatively stable (within 3-5% annually). For budgeting, we recommend building a 5% currency buffer. Some clients hedge with forward contracts for large committed expenditures.",
  },
];

export default function GCCIndiaCost() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "GCC India Cost Guide | Salary & Setup Cost Breakdown - NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C] flex flex-col">
      <Navbar appearance="dark" />

      <main className="relative flex-grow">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="gcc-india-cost-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="GCC India Cost Guide Hero"
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
              alt="India GCC Cost Guide"
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
                    GCC India Cost Guide
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
              How Much Does It Cost to Build a GCC in India?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mb-8 font-sans"
            >
              A transparent breakdown of GCC setup and operating costs &mdash; salaries, infrastructure, compliance, and everything in between. Real numbers, not marketing ranges.
            </motion.p>

            {/* Hero CTA Row matching AI GCC Hero button styling adjusted for navy blue background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-10 text-left"
            >
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyan group"
              >
                <span>Get a Custom Cost Estimate</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                to="/gcc-cost-calculator"
                className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-white/40 text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-200 backdrop-blur-xs cursor-pointer shrink-0 font-manrope"
              >
                <Calculator className="w-3.5 h-3.5 mr-1.5 text-[#38BDF8]" />
                <span>Use Interactive Cost Calculator</span>
              </Link>
            </motion.div>

            {/* Trust Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl"
            >
              <div className="text-left">
                <p className="font-manrope font-extrabold text-2xl sm:text-3xl text-[#38BDF8]">
                  40–60%
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-normal">
                  Cost savings vs equivalent US teams
                </p>
              </div>
              <div className="text-left">
                <p className="font-manrope font-extrabold text-2xl sm:text-3xl text-[#38BDF8]">
                  12-Week
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-normal">
                  Setup to operational launch timeline
                </p>
              </div>
              <div className="text-left">
                <p className="font-manrope font-extrabold text-2xl sm:text-3xl text-[#38BDF8]">
                  2026
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-normal">
                  Actively benchmarked market rates
                </p>
              </div>
            </motion.div>
          </div>
        </section>        {/* ============================================================ */}
        {/* 2. COST BREAKDOWN BY CATEGORY */}
        {/* ============================================================ */}
        {costCategories.map((category) => {
          const sectionId = category.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          return (
            <section
              key={category.title}
              id={sectionId}
              className="scroll-mt-28 py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent"
            >
              <div className="max-w-7xl mx-auto">
                <SectionHeader
                  eyebrow={`${category.percentage} OF TOTAL OPERATING BUDGET`}
                  title={category.title}
                  description={category.description}
                  variant="cyan"
                  align="center"
                  className="mb-8 sm:mb-10"
                />

                {/* Table using ResponsiveMatrix */}
                <ResponsiveMatrix
                  caption={`${category.title} Cost Breakdown`}
                  rowHeader="Role / Item"
                  columns={["Annual Cost (India)", "Equivalent (US)"]}
                  colWidths={["w-1/2", "w-1/4", "w-1/4"]}
                  rows={category.items.map((item) => ({
                    label: item.role,
                    cells: [
                      <span key="in" className="font-manrope font-bold text-[#008EC4]">
                        {item.india}
                      </span>,
                      <span key="us" className="text-[#505D74] font-medium">
                        {item.us}
                      </span>,
                    ],
                  }))}
                />
              </div>
            </section>
          );
        })}

        {/* ============================================================ */}
        {/* 3. TOTAL COST BY TEAM SIZE */}
        {/* ============================================================ */}
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="HEADCOUNT SCALING"
              title="Total cost by team size"
              description="All-in estimates including salaries, office, technology, and operations across standard team milestones."
              variant="cyan"
              align="center"
              className="mb-8 sm:mb-10 lg:mb-12"
            />

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {teamSizes.map((team) => {
                const isHighlight = team.highlight;

                if (isHighlight) {
                  return (
                    <div
                      key={team.size}
                      className="relative rounded-3xl p-6 sm:p-8 md:py-9 bg-gradient-to-b from-[#012048] via-[#022A60] to-[#011B3D] border border-[#16427D] shadow-2xl flex flex-col justify-between overflow-hidden text-left text-white md:-my-2 md:scale-[1.02] z-10"
                    >
                      {/* Subtle corner glow */}
                      <div
                        className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#00A3E0]/20 blur-3xl"
                        aria-hidden="true"
                      />
                      {/* Fluid wave line decoration matching reference */}
                      <svg
                        className="pointer-events-none absolute bottom-0 right-0 w-full h-32 opacity-25 text-[#38BDF8]"
                        viewBox="0 0 400 150"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 100 C 130 160 250 40 400 110 L 400 150 L 0 150 Z"
                          fill="currentColor"
                        />
                        <path
                          d="M0 120 C 110 70 280 140 400 80 L 400 150 L 0 150 Z"
                          fill="url(#wave-gradient-dark)"
                          opacity="0.6"
                        />
                        <defs>
                          <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="1" y2="1">
                            <stop offset="0%" stopColor="#38BDF8" />
                            <stop offset="100%" stopColor="#0066CC" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="relative z-10">
                        <h3 className="font-manrope font-extrabold text-2xl sm:text-3xl text-white mb-1.5">
                          {team.size}
                        </h3>
                        <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-6 sm:mb-8">
                          {team.headcount}
                        </p>

                        <div className="space-y-3.5 sm:space-y-4 mb-6 sm:mb-7">
                          {/* Monthly Cost Box */}
                          <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 backdrop-blur-xs">
                            <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8] shrink-0 stroke-[1.8]" />
                            <div>
                              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mb-1">
                                Monthly cost (India)
                              </p>
                              <p className="font-manrope font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#38BDF8] tracking-tight leading-none">
                                {team.monthlyIndia}
                              </p>
                            </div>
                          </div>

                          {/* Annual Cost Box */}
                          <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 backdrop-blur-xs">
                            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8] shrink-0 stroke-[1.8]" />
                            <div>
                              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mb-1">
                                Annual cost (India)
                              </p>
                              <p className="font-manrope font-extrabold text-xl sm:text-2xl lg:text-[26px] text-white tracking-tight leading-none">
                                {team.annualIndia}
                              </p>
                            </div>
                          </div>

                          {/* US Equivalent */}
                          <div className="pt-2 px-1">
                            <p className="text-xs sm:text-[13px] text-slate-400 mb-0.5">
                              US equivalent (annual)
                            </p>
                            <p className="text-sm sm:text-base text-slate-300 font-medium line-through decoration-slate-400 tracking-tight">
                              {team.annualUS}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/15">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#023838]/90 border border-[#059669]/60 text-[#34D399] text-xs sm:text-[13px] font-mono font-bold mb-3.5">
                          <TrendingDown className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span>{team.savings} net savings</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {team.bestFor}
                        </p>
                      </div>
                    </div>
                  );
                }

                // White Cards (Starter Pod & Scale Center)
                return (
                  <div
                    key={team.size}
                    className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#D2DCF0] shadow-xs hover:border-[#00A3E0]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
                  >
                    <div>
                      <h3 className="font-manrope font-extrabold text-2xl sm:text-3xl text-[#0D306C] mb-1.5">
                        {team.size}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A3E0] mb-6 sm:mb-8">
                        {team.headcount}
                      </p>

                      <div className="space-y-3.5 sm:space-y-4 mb-6 sm:mb-7">
                        {/* Monthly Cost Box */}
                        <div className="bg-[#F4F8FC] border border-[#E2EDF8] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4">
                          <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A3E0] shrink-0 stroke-[1.8]" />
                          <div>
                            <p className="text-xs sm:text-[13px] text-[#505D74] font-medium mb-1">
                              Monthly cost (India)
                            </p>
                            <p className="font-manrope font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#008EC4] tracking-tight leading-none">
                              {team.monthlyIndia}
                            </p>
                          </div>
                        </div>

                        {/* Annual Cost Box */}
                        <div className="bg-[#F4F8FC] border border-[#E2EDF8] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4">
                          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A3E0] shrink-0 stroke-[1.8]" />
                          <div>
                            <p className="text-xs sm:text-[13px] text-[#505D74] font-medium mb-1">
                              Annual cost (India)
                            </p>
                            <p className="font-manrope font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#0D306C] tracking-tight leading-none">
                              {team.annualIndia}
                            </p>
                          </div>
                        </div>

                        {/* US Equivalent */}
                        <div className="pt-2 px-1">
                          <p className="text-xs sm:text-[13px] text-[#505D74] mb-0.5">
                            US equivalent (annual)
                          </p>
                          <p className="text-sm sm:text-base text-[#4B5563] font-medium line-through decoration-[#9CA3AF] tracking-tight">
                            {team.annualUS}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#D2DCF0]/80">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F3] border border-[#A7F3D0] text-[#059669] text-xs sm:text-[13px] font-mono font-bold mb-3.5">
                        <TrendingDown className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>{team.savings} net savings</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed font-normal">
                        {team.bestFor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote directly below the cards in transparent bg, centered */}
            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto text-center px-4">
              <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed font-normal bg-transparent">
                * Starting price. Every fee, rate and cost figure shown is an indicative starting point, not a quote. Final commercial terms vary with scope, role mix, volume, seniority, city and engagement length, and are confirmed in writing in the proposal and the MSA.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. CITY COMPARISON */}
        {/* ============================================================ */}
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="METROPOLITAN HUBS"
              title="Cost comparison by city"
              description="India's top GCC hubs offer distinct cost profiles, talent depth, and infrastructure tradeoffs."
              variant="cyan"
              align="center"
              className="mb-8 sm:mb-10 lg:mb-12"
            />

            <ResponsiveMatrix
              caption="India GCC City Comparison"
              rowHeader="City"
              columns={["Talent Pool", "Cost Index", "Key Strengths", "GCCs"]}
              rows={cityComparison.map((city) => ({
                label: city.city,
                cells: [
                  city.talentPool,
                  city.costIndex,
                  city.strengths,
                  <span key="gcc" className="font-mono font-bold text-[#008EC4]">
                    {city.gccCount}
                  </span>,
                ],
              }))}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. HIDDEN COSTS TO PLAN FOR (SlottedStepNumber Design) */}
        {/* ============================================================ */}
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="REAL-WORLD FEASIBILITY"
              title="Hidden costs to plan for"
              description="The numbers most vendors don't talk about. We include these in every feasibility assessment."
              variant="cyan"
              align="center"
              className="mb-8 sm:mb-10 lg:mb-12"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-7xl mx-auto">
              {hiddenCosts.map((cost, index) => {
                const CostIcon = cost.icon;
                return (
                  <div
                    key={cost.title}
                    className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Slotted Step Number Design */}
                      <SlottedStepNumber index={index} />

                      <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                        {cost.title}
                      </h3>

                      <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed mb-6 flex-1 max-w-xs font-normal font-sans">
                        {cost.description}
                      </p>
                    </div>

                    <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                      <CostIcon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. FAQ (Typography and Accordion matching other pages) */}
        {/* ============================================================ */}
        <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="COST INTELLIGENCE"
              title="Frequently asked questions about GCC costs"
              description="Authoritative answers regarding first-year budgets, statutory contributions, scale efficiencies, and entity structures."
              variant="cyan"
              align="center"
              className="mb-8 sm:mb-10 lg:mb-12"
            />

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-[#D2DCF0] bg-white transition-all overflow-hidden shadow-xs hover:border-[#169DC8]/50 hover:shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer transition-colors hover:bg-slate-50/60"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base md:text-lg font-bold sm:font-extrabold text-[#0D306C] pr-3 sm:pr-4 font-manrope">
                        {faq.q}
                      </span>
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#D2DCF0] transition-all duration-200 ${
                          isOpen
                            ? "bg-[#169DC8] text-white rotate-180 border-[#169DC8]"
                            : "bg-[#F0F5FA] text-[#505D74]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm md:text-[15px] text-[#505D74] leading-relaxed border-t border-[#D2DCF0]/80 pt-3 sm:pt-4 font-sans font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. FEASIBILITY & MODELING (Executive CTA) */}
        {/* ============================================================ */}
        <ExecutiveCTA
          id="gcc-cost-cta"
          eyebrow="FEASIBILITY & MODELING"
          title="Get Your Custom GCC Cost Estimate"
          description="Every GCC is different. Tell us your team size, roles, and city preference — we'll build a detailed cost model specific to your requirements."
          primaryCta={{
            label: "Book Your Free Cost Consultation",
            href: CAL_BOOKING_URL,
            isExternal: true,
          }}
          secondaryCta={{
            label: "See GCC Setup & Launch Program",
            href: "/services/gcc/setup-launch",
          }}
          footnote={
            <>
              Or email us directly at{" "}
              <a
                href="mailto:reachus@neointelli.com"
                className="text-[#38BDF8] hover:underline"
              >
                reachus@neointelli.com
              </a>
            </>
          }
        />

        {/* ============================================================ */}
        {/* 8. LET'S BUILD TOGETHER (Home Consultation with Wave Divider) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
