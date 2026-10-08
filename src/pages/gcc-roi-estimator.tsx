"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Percent,
  Users,
  MapPin,
  Briefcase,
  CalendarRange,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CAL_BOOKING_URL } from "@/lib/constants";
import ToolLeadCapture from "@/components/shared/ToolLeadCapture";

/* ------------------------------------------------------------------ */
/* Cost constants (Preserved 100% unchanged) */
/* ------------------------------------------------------------------ */

const LOCATION_COSTS: Record<string, number> = {
  "US (West Coast)": 180_000,
  "US (East Coast)": 160_000,
  UK: 130_000,
  "EU (Western Europe)": 120_000,
  Australia: 140_000,
  Other: 140_000,
};

const INDIA_ROLE_COSTS: Record<string, number> = {
  "Software Engineering": 35_000,
  "AI/ML": 45_000,
  "Data Engineering": 38_000,
  Mixed: 38_000,
};

const SPEND_RANGES = [
  "$500K - $1M",
  "$1M - $2M",
  "$2M - $5M",
  "$5M - $10M",
  "$10M - $20M",
  "$20M+",
];

const LOCATIONS = Object.keys(LOCATION_COSTS);
const ROLES = Object.keys(INDIA_ROLE_COSTS);
const TIMELINES = [3, 5] as const;

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  if (n < 0) return "-" + fmt(-n);
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtPct(n: number): string {
  return Math.round(n).toLocaleString("en-US") + "%";
}

/* ------------------------------------------------------------------ */
/* Smooth Animated Counter Component */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 600;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      displayRef.current = current;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Custom Chart Tooltip */
/* ------------------------------------------------------------------ */

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[#001844]/95 backdrop-blur-md text-white p-3.5 rounded-xl border border-[#1E3A8A] shadow-xl text-xs">
      <p className="font-bold font-manrope text-white mb-2">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-mono font-bold text-white tabular-nums">
              {fmt(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */

export default function GCCROIEstimator() {
  /* --- title --- */
  useEffect(() => {
    document.title = "GCC ROI Estimator | India Savings Calculator — NeoIntelli";
  }, []);

  /* --- form state --- */
  const [spend, setSpend] = useState(SPEND_RANGES[2]);
  const [teamSize, setTeamSize] = useState(20);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [role, setRole] = useState(ROLES[0]);
  const [horizon, setHorizon] = useState<3 | 5>(5);

  /* Fire roi_estimator_complete once when user first changes any input */
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    const isDefault =
      spend === SPEND_RANGES[2] &&
      teamSize === 20 &&
      location === LOCATIONS[0] &&
      role === ROLES[0] &&
      horizon === 5;
    if (isDefault) return;
    fired.current = true;
    // Defer so calc has settled
    const id = window.setTimeout(() => {
      trackEvent("roi_estimator_complete", {
        team_size: teamSize,
        location,
        role,
        horizon,
        spend,
      });
    }, 0);
    return () => window.clearTimeout(id);
  }, [spend, teamSize, location, role, horizon]);

  /* --- derived calculations (Preserved 100% exact logic) --- */
  const calc = useMemo(() => {
    const currentCostPerEngineer = LOCATION_COSTS[location];
    const indiaCostPerEngineer = INDIA_ROLE_COSTS[role];
    const currentAnnualCost = currentCostPerEngineer * teamSize;
    const indiaAnnualSalary = indiaCostPerEngineer * teamSize;
    const monthlyOverhead = (indiaAnnualSalary * 0.15) / 12;
    const annualOverhead = monthlyOverhead * 12;
    const setupCost = 50_000 + 2_000 * teamSize;
    const indiaAnnualTotal = indiaAnnualSalary + annualOverhead;

    /* Year-by-year data */
    const years = Array.from({ length: horizon }, (_, i) => {
      const year = i + 1;
      const currentCost = currentAnnualCost;
      const gccCost = year === 1 ? indiaAnnualTotal + setupCost : indiaAnnualTotal;
      const savings = currentCost - gccCost;
      return { year, currentCost, gccCost, savings };
    });

    const year1Savings = years[0].savings;
    const totalSavings = years.reduce((acc, y) => acc + y.savings, 0);

    /* Break-even month */
    const monthlySavings = (currentAnnualCost - indiaAnnualTotal) / 12;
    const breakEvenMonth =
      monthlySavings > 0 ? Math.ceil(setupCost / monthlySavings) : 0;

    /* ROI % = total savings / total investment * 100 */
    const totalInvestment = setupCost + indiaAnnualTotal * horizon;
    const roiPct = totalInvestment > 0 ? (totalSavings / totalInvestment) * 100 : 0;

    /* Chart data */
    const chartData = years.map((y) => ({
      name: `Year ${y.year}`,
      "Current Model": y.currentCost,
      "GCC Model": y.gccCost,
    }));

    return {
      currentCostPerEngineer,
      indiaCostPerEngineer,
      currentAnnualCost,
      indiaAnnualTotal,
      setupCost,
      year1Savings,
      breakEvenMonth,
      totalSavings,
      roiPct,
      chartData,
    };
  }, [location, role, teamSize, horizon]);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="roi-estimator-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="GCC ROI Estimator Hero"
        >
          {/* Executive Background Overlay with 3D Cyan Fluid Ribbon */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/tools/hero_tools_bg.webp"
              alt="India GCC ROI Estimator"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
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
                    GCC ROI Estimator
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.08] mb-4 sm:mb-5 max-w-2xl lg:max-w-3xl text-left"
            >
              Calculate the ROI of Your India GCC
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal font-sans max-w-xl text-left mb-6 sm:mb-8"
            >
              Input your current costs and team size. Get a clear picture of
              savings, break-even timeline, and 5-year ROI.
            </motion.p>

            {/* Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 text-left"
            >
              <a
                href="#calculator"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all"
              >
                <span>Start Modeling</span>
                <Calculator className="w-4 h-4 text-white" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. EXECUTIVE CALCULATOR SECTION WITH 2-COLUMN CONSOLE */}
        {/* ============================================================ */}
        <section id="calculator" className="pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Section Eyebrow & Title */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <p className="text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5 sm:mb-3">
                Scenario Configuration
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.14] mb-3">
                Configure Your Scenario
              </h2>
              <p className="text-base sm:text-[17px] text-[#505D74] leading-relaxed">
                Adjust the inputs below to model your GCC cost savings.
              </p>
            </div>            {/* 2-Column Responsive Layout: 35% Stats / 65% Form (Aligned bottom baseline) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* ============================================================ */}
              {/* LEFT COLUMN: Data Stats, Graph, Cost Per Comparison & Conservative by Design (~35% balance) */}
              {/* ============================================================ */}
              <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between space-y-4 min-w-0">
                <div className="space-y-4">
                  {/* 1. Key Metrics Grid (Compact Data Stats in 2x2) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Year 1 Savings */}
                    <div className="rounded-xl p-3 sm:p-3.5 bg-gradient-to-br from-[#008EC4] to-[#007AA8] text-white border border-[#00A3E0]/60 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-100">
                          Year 1
                        </span>
                        <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center shrink-0">
                          <DollarSign className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold font-manrope text-sky-100 mb-0.5">Savings</p>
                        <p className="text-base sm:text-lg xl:text-xl font-extrabold font-manrope text-white tracking-tight tabular-nums leading-none">
                          <AnimatedNumber value={calc.year1Savings} prefix="$" />
                        </p>
                      </div>
                    </div>

                    {/* Break-Even Month */}
                    <div className="rounded-xl p-3 sm:p-3.5 bg-white border border-[#D2DCF0] shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                          Payback
                        </span>
                        <div className="w-5 h-5 rounded bg-amber-500/15 flex items-center justify-center shrink-0 text-amber-600">
                          <Clock className="w-3 h-3" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold font-manrope text-[#505D74] mb-0.5">Break-Even</p>
                        <p className="text-base sm:text-lg xl:text-xl font-extrabold font-manrope text-[#0D306C] tracking-tight tabular-nums leading-none">
                          {calc.breakEvenMonth > 0 ? `Mo. ${calc.breakEvenMonth}` : "Immediate"}
                        </p>
                      </div>
                    </div>

                    {/* Total Savings */}
                    <div className="rounded-xl p-3 sm:p-3.5 bg-gradient-to-br from-[#0D306C] via-[#0A2E63] to-[#012048] border border-[#00A3E0]/40 text-white shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                          Cumulative
                        </span>
                        <div className="w-5 h-5 rounded bg-[#00A3E0]/20 flex items-center justify-center shrink-0 text-[#00A3E0]">
                          <TrendingUp className="w-3 h-3" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold font-manrope text-slate-300 mb-0.5">{horizon}yr Total</p>
                        <p className="text-base sm:text-lg xl:text-xl font-extrabold font-manrope text-[#00A3E0] tracking-tight tabular-nums leading-none">
                          <AnimatedNumber value={calc.totalSavings} prefix="$" />
                        </p>
                      </div>
                    </div>

                    {/* ROI % */}
                    <div className="rounded-xl p-3 sm:p-3.5 bg-white border border-emerald-500/40 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                          Efficiency
                        </span>
                        <div className="w-5 h-5 rounded bg-emerald-500/15 flex items-center justify-center shrink-0 text-emerald-600">
                          <Percent className="w-3 h-3" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold font-manrope text-[#505D74] mb-0.5">ROI</p>
                        <p className="text-base sm:text-lg xl:text-xl font-extrabold font-manrope text-emerald-600 tracking-tight tabular-nums leading-none">
                          {fmtPct(calc.roiPct)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Bar Chart: Year-by-year comparison (Graph - Compact) */}
                  <div className="rounded-xl border border-[#D2DCF0] bg-white p-3.5 sm:p-4 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-xs sm:text-sm font-extrabold font-manrope text-[#0D306C] tracking-tight leading-snug">
                        Year-by-Year Comparison
                      </h3>
                      <div className="flex items-center gap-2.5 text-[10px] font-semibold shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#94A3B8]" />
                          <span className="text-[#505D74]">Current</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                          <span className="text-[#0D306C] font-bold">GCC</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-2xs text-[#505D74] mb-3">
                      Spend in {location} vs India GCC.
                    </p>

                    <div className="h-[180px] sm:h-[195px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={calc.chartData}
                          margin={{ top: 8, right: 4, left: -22, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="currentModelGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#94A3B8" />
                              <stop offset="100%" stopColor="#64748B" />
                            </linearGradient>
                            <linearGradient id="gccModelGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00A3E0" />
                              <stop offset="100%" stopColor="#007AA8" />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10, fill: "#64748B", fontWeight: 600 }}
                            axisLine={{ stroke: "#CBD5E1" }}
                            tickLine={false}
                          />
                          <YAxis
                            tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`}
                            tick={{ fontSize: 10, fill: "#64748B", fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            width={38}
                          />
                          <Tooltip content={<CustomChartTooltip />} />
                          <Legend wrapperStyle={{ display: "none" }} />
                          <Bar
                            dataKey="Current Model"
                            fill="url(#currentModelGrad)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={22}
                          />
                          <Bar
                            dataKey="GCC Model"
                            fill="url(#gccModelGrad)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={22}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 3. Cost Per Engineer Comparison (Compact Stacked) */}
                  <div className="rounded-xl border border-[#D2DCF0] bg-white p-3.5 sm:p-4 shadow-xs">
                    <h3 className="text-xs sm:text-sm font-extrabold font-manrope text-[#0D306C] tracking-tight leading-snug mb-1">
                      Cost Per Engineer Comparison
                    </h3>
                    <p className="text-2xs text-[#505D74] mb-3 leading-relaxed">
                      Fully loaded cost per engineer / year.
                    </p>

                    <div className="space-y-2.5">
                      {/* Current Location */}
                      <div className="bg-[#F8FAFC] rounded-lg border border-[#CBD5E1] p-3 shadow-2xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-2xs font-mono font-bold text-[#505D74] uppercase tracking-wider">
                            Current ({location})
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold font-manrope text-[#0D306C] tabular-nums">
                            {fmt(calc.currentCostPerEngineer)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div className="h-full rounded-full bg-[#94A3B8]" style={{ width: "100%" }} />
                        </div>
                      </div>

                      {/* India GCC */}
                      <div className="bg-gradient-to-br from-[#06224A] to-[#0A2E63] rounded-lg border-2 border-[#00A3E0] p-3 text-white shadow-2xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-2xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                            India GCC ({role})
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold font-manrope text-white tabular-nums">
                            {fmt(calc.indiaCostPerEngineer)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#06224A] overflow-hidden border border-[#1E3A8A]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#00A3E0] to-[#008EC4]"
                            style={{
                              width: `${Math.round(
                                (calc.indiaCostPerEngineer / calc.currentCostPerEngineer) * 100
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1.5 flex items-center gap-1 text-3xs sm:text-2xs font-bold font-manrope text-[#38BDF8]">
                          <Sparkles className="w-3 h-3" />
                          <span>
                            {Math.round((1 - calc.indiaCostPerEngineer / calc.currentCostPerEngineer) * 100)}% lower cost per headcount
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Conservative by Design - Pinned to bottom to align with right console */}
                <div className="rounded-xl border border-[#D2DCF0] bg-white p-3 sm:p-3.5 shadow-xs mt-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00A3E0]/15 border border-[#00A3E0]/30 flex items-center justify-center text-[#008EC4] shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#008EC4]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold font-manrope text-[#0D306C] mb-0.5 tracking-tight">
                        Conservative by design
                      </h4>
                      <p className="text-2xs text-[#505D74] leading-tight mb-1.5 font-sans">
                        Excludes unverified government incentives. Validated support can be modeled in the formal board business case.
                      </p>
                      <Link
                        to="/services/gcc/strategy-business-case"
                        className="inline-flex items-center gap-1 text-2xs font-bold font-manrope text-[#008EC4] hover:text-[#0D306C] transition-colors underline underline-offset-2"
                      >
                        <span>Build full business case</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: The Form in Navy Blue Look (~65% of layout) */}
              {/* ============================================================ */}
              <div className="lg:col-span-8 xl:col-span-8 flex flex-col min-w-0">
                <div className="bg-[#012048] p-6 sm:p-7 lg:p-8 text-white relative overflow-hidden border border-[#1E3A8A] flex flex-col justify-between h-full">
                  {/* Faceted geometric watermark in the top-right corner */}
                  <div
                    className="absolute -top-6 -right-6 w-48 h-48 pointer-events-none opacity-20 select-none"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
                      <polygon points="120,60 80,10 60,70" fill="#0D306C" opacity="0.6" />
                      <polygon points="120,60 60,70 90,120" fill="#008EC4" opacity="0.8" />
                      <polygon points="90,120 60,70 30,110" fill="#00A3E0" opacity="0.5" />
                      <polygon points="60,70 80,10 30,30" fill="#38BDF8" opacity="0.7" />
                      <polygon points="60,70 30,30 30,110" fill="#0D306C" opacity="0.4" />
                      <polygon points="120,60 120,120 90,120" fill="#005B94" opacity="0.9" />
                    </svg>
                  </div>

                  {/* Form Inputs Container: 2-column spacious grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current Annual Tech Spend */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06224A]/80 border border-[#1E3A8A] flex flex-col justify-between">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold font-manrope text-white mb-1 uppercase tracking-wider">
                          <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                          <span>Current Annual Tech Spend</span>
                        </label>
                        <p className="text-2xs text-slate-300 mb-3">
                          Approximate annual expenditure on tech talent.
                        </p>
                      </div>
                      <select
                        value={spend}
                        onChange={(e) => setSpend(e.target.value)}
                        className="w-full rounded-xl border border-[#1E3A8A] bg-[#021838] px-3.5 py-2.5 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans cursor-pointer"
                      >
                        {SPEND_RANGES.map((r) => (
                          <option key={r} value={r} className="bg-[#021838] text-white">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Team Size Slider */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06224A]/80 border border-[#1E3A8A] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <label className="flex items-center gap-2 text-xs font-bold font-manrope text-white uppercase tracking-wider">
                            <Users className="w-4 h-4 text-[#38BDF8]" />
                            <span>Planned India Headcount</span>
                          </label>
                          <span className="font-mono font-bold text-xs bg-[#00A3E0]/20 text-[#38BDF8] px-2.5 py-0.5 rounded-lg border border-[#00A3E0]/30 tabular-nums">
                            {teamSize} engineers
                          </span>
                        </div>
                        <p className="text-2xs text-slate-300 mb-3">
                          Engineers planned for your captive operation.
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min={5}
                          max={200}
                          step={1}
                          value={teamSize}
                          onChange={(e) => setTeamSize(Number(e.target.value))}
                          className="w-full h-2 bg-[#021838] rounded-lg appearance-none cursor-pointer accent-[#00A3E0]"
                        />
                        <div className="flex items-center justify-between text-2xs text-slate-400 font-mono mt-1.5">
                          <span>5 engineers</span>
                          <span>50</span>
                          <span>100</span>
                          <span>200 engineers</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Team Location (Spans full 2 columns) */}
                    <div className="md:col-span-2 p-4 sm:p-5 rounded-xl bg-[#06224A]/80 border border-[#1E3A8A]">
                      <label className="flex items-center gap-2 text-xs font-bold font-manrope text-white mb-1 uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-[#38BDF8]" />
                        <span>Current Team Location</span>
                      </label>
                      <p className="text-2xs text-slate-300 mb-3">
                        Benchmark costs against your existing location baseline.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {LOCATIONS.map((loc) => {
                          const isSelected = location === loc;
                          return (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => setLocation(loc)}
                              className={`rounded-xl px-2.5 py-2 text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#00A3E0] text-white border border-[#00A3E0] shadow-sm"
                                  : "bg-[#021838] text-slate-300 border border-[#1E3A8A] hover:bg-[#0A2E63] hover:border-[#00A3E0]/50 hover:text-white"
                              }`}
                            >
                              {loc}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Primary Role Type */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06224A]/80 border border-[#1E3A8A]">
                      <label className="flex items-center gap-2 text-xs font-bold font-manrope text-white mb-1 uppercase tracking-wider">
                        <Briefcase className="w-4 h-4 text-[#38BDF8]" />
                        <span>Primary Capability Focus</span>
                      </label>
                      <p className="text-2xs text-slate-300 mb-3">
                        Core technical discipline of your planned squad structure.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {ROLES.map((r) => {
                          const isSelected = role === r;
                          return (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setRole(r)}
                              className={`rounded-xl px-2.5 py-2 text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#00A3E0] text-white border border-[#00A3E0] shadow-sm"
                                  : "bg-[#021838] text-slate-300 border border-[#1E3A8A] hover:bg-[#0A2E63] hover:border-[#00A3E0]/50 hover:text-white"
                              }`}
                            >
                              {r}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Horizon */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06224A]/80 border border-[#1E3A8A] flex flex-col justify-between">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold font-manrope text-white mb-1 uppercase tracking-wider">
                          <CalendarRange className="w-4 h-4 text-[#38BDF8]" />
                          <span>Timeline Horizon</span>
                        </label>
                        <p className="text-2xs text-slate-300 mb-3">
                          Multi-year projection window.
                        </p>
                      </div>

                      <div className="inline-flex rounded-xl bg-[#021838] p-1 border border-[#1E3A8A]">
                        {TIMELINES.map((t) => {
                          const isSelected = horizon === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setHorizon(t)}
                              className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#00A3E0] text-white shadow-xs"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              {t} Years
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Email Me This ROI Model Form - Transparent Background & Ending in same line of left */}
                  <div id="lead-capture" className="pt-6 mt-auto border-t border-[#1E3A8A]/60">
                    <ToolLeadCapture
                      formName="roi-estimator"
                      heading="Email me this ROI model"
                      description="Get these numbers as an executive shareable summary, plus the assumptions behind them — useful when presenting a GCC business case to the board."
                      submitLabel="Send my ROI model"
                      event="roi_estimator_complete"
                      source="roi_estimator"
                      emailTool="roi"
                      dataLayerEvent="roi_email_submitted"
                      dataLayerParams={{ source_location: location, team_size: teamSize }}
                      variant="transparent"
                      fields={{
                        spend,
                        teamSize,
                        location,
                        role,
                        horizon,
                        year1Savings: Math.round(calc.year1Savings),
                        totalSavings: Math.round(calc.totalSavings),
                        roiPct: Math.round(calc.roiPct),
                        breakEvenMonth: calc.breakEvenMonth,
                      }}
                    />


                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. STRATEGIC CONSULTATION CTA SECTION (Navy Blue with Wave Divider) */}
        {/* ============================================================ */}
        <section
          id="strategic-consultation"
          className="relative bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans select-none"
        >
          {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
          <div className="absolute top-0 inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
            <svg
              viewBox="0 0 1440 140"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
            >
              <path
                d="M0,0 L1440,0 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
                fill="#D2DCF0"
                opacity="0.6"
              />
              <path
                d="M0,0 L1440,0 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
                fill="#F0F5FA"
              />
            </svg>
          </div>

          {/* Ambient background glow highlights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

          {/* Subtle technical grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#38BDF8] mb-2.5 sm:mb-3">
              Strategic Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold font-manrope text-white tracking-[-0.03em] leading-[1.14] mb-4">
              Discuss These Numbers with an Expert
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-[17px] text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Our GCC advisors can walk you through a customized savings model
              based on your specific needs, roles, and growth plans.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold font-manrope text-white bg-gradient-to-r from-[#00A3E0] to-[#008EC4] hover:from-[#008EC4] hover:to-[#007AA8] shadow-md shadow-[#00A3E0]/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/case-studies"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold font-manrope text-white bg-[#06224A] hover:bg-[#0A2E63] border border-[#1E3A8A] transition-all duration-200"
              >
                <span>See Our Approach</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
