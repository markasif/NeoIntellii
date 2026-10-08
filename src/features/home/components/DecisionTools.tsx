"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";


type ModalKey = "cost" | "roi" | "readiness";

export default function DecisionTools() {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  // ---------- Tool 1: Cost Calculator ----------
  const [teamSize, setTeamSize] = useState<number>(25);
  const [seniority, setSeniority] = useState<string>("Blended (Mid + Senior + Lead)");
  const [location, setLocation] = useState<string>("Bengaluru (HSR / Tech Corridor)");
  const usAverage = 185000;
  const indiaAverage = 48000;
  const usTotal = teamSize * usAverage;
  const indiaTotal = teamSize * indiaAverage;
  const savings = usTotal - indiaTotal;
  const pctSavings = Math.round((savings / usTotal) * 100);

  // ---------- Tool 2: ROI Estimator ----------
  const [annualSpend, setAnnualSpend] = useState<number>(3500000);
  const annualSavingsROI = annualSpend - annualSpend * 0.32;
  const fiveYearROI = annualSavingsROI * 5;

  // ---------- Tool 3: Readiness Assessment ----------
  const [readinessAnswers, setReadinessAnswers] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: false, 4: true,
  });
  const readinessQuestions = [
    "Identified target technical competencies and functional charter",
    "Executive sponsorship and board-level budget established",
    "Operating model chosen: Direct Subsidiary (Pvt Ltd) vs BOT",
    "IT security, compliance (SOC2/GDPR) and IP protections defined",
    "Mentor team in HQ aligned for collaboration with India leads",
  ];
  const positiveAnswersCount = Object.values(readinessAnswers).filter(Boolean).length;
  const toggleReadiness = (idx: number) =>
    setReadinessAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toolCards = [
    {
      id: "01",
      modalKey: "cost" as ModalKey,
      eyebrow: "GCC COST CALCULATOR",
      title: "What will it cost?",
      description:
        "Model roles, seniority, headcount and city for a fully loaded monthly and annual estimate.",
      ctaLabel: "Open Cost Calculator",
      image: "/images/tools/decision_cost_calculator.jpg",
      imageAlt: "GCC Cost Calculator - Financial modeling dashboard with Bangalore tech corridor",
    },
    {
      id: "02",
      modalKey: "roi" as ModalKey,
      eyebrow: "GCC ROI ESTIMATOR",
      title: "When does the model pay back?",
      description:
        "Compare current spend against an India model to see break-even and multi-year effect.",
      ctaLabel: "Open ROI Estimator",
      image: "/images/tools/decision_roi_estimator.jpg",
      imageAlt: "GCC ROI Estimator - Executive multi-year break-even payback projection analysis",
    },
    {
      id: "03",
      modalKey: "readiness" as ModalKey,
      eyebrow: "GCC READINESS ASSESSMENT",
      title: "Are you ready to build?",
      description:
        "A short structured assessment that returns a readiness view and a recommended next step.",
      ctaLabel: "Start Assessment",
      image: "/images/tools/decision_readiness_assessment.jpg",
      imageAlt: "GCC Readiness Assessment - Strategic capability diagnostic framework and audit milestones",
    },
  ];

  // benefits removed per user request

  const journeyPoints = [
    { l: "4%", b: "12%", t: "Assess", s: "Readiness" },
    { l: "33%", b: "38%", t: "Model", s: "Costs" },
    { l: "57%", b: "62%", t: "Validate", s: "Returns" },
    { l: "82%", b: "58%", t: "Build", s: "your GCC" },
  ];

  return (
    <section
      id="tools"
      className="relative bg-[#E7EDF9] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* Anchor aliases for compatibility */}
      <div id="decision-tools" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div id="pricing" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      
      <AmbientGlow position="top" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Standardized Section Header */}
        <SectionHeader
          eyebrow="GCC DECISION TOOLKIT"
          title={
            <>
              Plan your GCC before you commit<span className="text-[#169DC8]">.</span>
            </>
          }
          description="Three tools that answer the questions a business case has to survive: what it costs, when it pays back, and whether you are ready to build."
          className="mb-6 sm:mb-8"
        />

        {/* ================================================================ */}
        {/* THREE-COLUMN GRID: 3 tool cards with smooth entrance animation   */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {toolCards.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveModal(tool.modalKey)}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5"
            >
              {/* TOP WHITE CONTENT SECTION */}
              <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                <div>
                  {/* Category Eyebrow in uppercase vibrant blue */}
                  <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#169DC8] mb-2 sm:mb-2.5">
                    {tool.eyebrow}
                  </span>

                  {/* Main Question / Title with Round Orange Button on opposite right */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2.5 sm:mb-3">
                    <h3 className="text-lg sm:text-2xl lg:text-[23px] font-extrabold text-[#0D306C] tracking-tight leading-[1.25] group-hover:text-[#169DC8] transition-colors flex-1">
                      {tool.title}
                    </h3>

                    {/* Round Arrow Button with Arrow Icon matching Transformation Impact */}
                    <div
                      title={tool.ctaLabel}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-[#0D306C] group-hover:bg-[#0D306C] group-hover:!text-white group-hover:scale-105 transition-all duration-300 shrink-0 mt-0.5 round-arrow-btn"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-inherit group-hover:!text-white transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* BOTTOM IMAGE CONTAINER (Flush with bottom rounded corners) */}
              <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-[#081B3E] flex-shrink-0">
                <Image
                  src={tool.image}
                  alt={tool.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B3E]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================================================================ */}
        {/* BOTTOM BANNER — dark with journey path & smooth entrance         */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 relative rounded-2xl bg-gradient-to-br from-[#0D306C] via-[#1A4080] to-[#0D306C] overflow-hidden flex flex-col xl:block xl:min-h-[148px]"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(22,157,200,0.2) 0%, transparent 70%)",
            }}
          />
          {/* Left text */}
          <div className="relative z-10 px-5 sm:px-10 py-5 sm:py-10 w-full xl:max-w-xl">
            <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#67D5F7] mb-1.5 sm:mb-2">
              SAME DISCIPLINE. A CLEARER PATH.
            </span>
            <h3 className="text-[17px] sm:text-2xl lg:text-[26px] font-extrabold text-white leading-snug mb-1.5 sm:mb-2">
              Plan with data. Build with confidence.
            </h3>
            <p className="text-[12px] sm:text-[13px] text-[#A3BFDD] leading-relaxed max-w-md">
              Use all three tools to create a stronger, data-backed business case for your AI GCC.
            </p>
          </div>
          {/* Right mountain journey graphic */}
          <div className="relative w-full h-28 sm:h-40 xl:absolute xl:right-0 xl:bottom-0 xl:top-0 xl:h-auto xl:w-[48%] pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 480 148"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M0 148 L80 82 L140 104 L200 42 L280 62 L360 12 L440 52 L480 32 L480 148 Z"
                fill="url(#mGrad)"
              />
              <path
                d="M60 124 Q120 97, 180 77 Q240 57, 310 44 Q370 32, 440 50"
                stroke="#67D5F7"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.8"
              />
              <circle cx="60" cy="124" r="4" fill="#169DC8" />
              <circle cx="60" cy="124" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="180" cy="77" r="4" fill="#169DC8" />
              <circle cx="180" cy="77" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="310" cy="44" r="4" fill="#169DC8" />
              <circle cx="310" cy="44" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="440" cy="50" r="4" fill="#169DC8" />
              <circle cx="440" cy="50" r="7" fill="#169DC8" fillOpacity="0.2" />
              <line x1="440" y1="50" x2="440" y2="24" stroke="#67D5F7" strokeWidth="1.5" />
              <path d="M440 24 L456 30 L440 36 Z" fill="#F19326" />
              <defs>
                <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#169DC8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0D306C" stopOpacity="0.45" />
                </linearGradient>
              </defs>
            </svg>
            {/* Journey labels */}
            <div className="absolute inset-0">
              {journeyPoints.map((pt) => (
                <div
                  key={pt.t}
                  className="absolute"
                  style={{ left: pt.l, bottom: pt.b }}
                >
                  <div className="text-[10px] sm:text-[10px] font-bold text-white leading-none">
                    {pt.t}
                  </div>
                  <div className="text-[10px] sm:text-[10px] text-[#A3BFDD] leading-none">
                    {pt.s}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute right-5 bottom-5 text-right">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#67D5F7] leading-relaxed">
                FROM INSIGHT
                <br />
                TO IMPACT.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================================================================== */}
      {/* INTERACTIVE MODAL                                                  */}
      {/* ================================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D306C]/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-[#D2DCF0]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0D306C] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* -------- MODAL 1: Cost Calculator -------- */}
            {activeModal === "cost" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#169DC8]">
                    Interactive Tool
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0D306C] mt-1">
                    GCC Cost Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-[#505D74] mt-1">
                    Adjust target headcount, seniority, and location to estimate net enterprise arbitrage.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#E7EDF9]/50 border border-[#D2DCF0] p-5 space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#0D306C] mb-2">
                      <span>Target Engineering Headcount:</span>
                      <span className="text-sm text-[#169DC8] font-mono font-extrabold">
                        {teamSize} Engineers
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={150}
                      step={5}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full accent-[#169DC8] cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-bold text-[#505D74] uppercase tracking-wider block mb-1">
                        Seniority Mix
                      </label>
                      <select
                        value={seniority}
                        onChange={(e) => setSeniority(e.target.value)}
                        className="w-full rounded-xl border border-[#D2DCF0] bg-white p-2.5 text-xs text-[#0D306C] font-semibold focus:outline-none"
                      >
                        <option>Blended (Mid + Senior + Lead)</option>
                        <option>Senior AI/ML Specialists (Top 5%)</option>
                        <option>Full-Stack Core Product Pod</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#505D74] uppercase tracking-wider block mb-1">
                        India Location Hub
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-xl border border-[#D2DCF0] bg-white p-2.5 text-xs text-[#0D306C] font-semibold focus:outline-none"
                      >
                        <option>Bengaluru (HSR / Tech Corridor)</option>
                        <option>Hyderabad (HITEC City)</option>
                        <option>Pune (Hinjawadi Infotech)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#D2DCF0] bg-white p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#505D74]">
                      US/EU Loaded Cost
                    </div>
                    <div className="text-lg font-extrabold text-[#0D306C] mt-1 font-mono">
                      ${(usTotal / 1000000).toFixed(2)}M/yr
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#169DC8]/30 bg-[#169DC8]/5 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#169DC8]">
                      India GCC Cost
                    </div>
                    <div className="text-lg font-extrabold text-[#169DC8] mt-1 font-mono">
                      ${(indiaTotal / 1000000).toFixed(2)}M/yr
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#F19326]/40 bg-[#F19326]/10 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#D87E1B]">
                      Projected Net Arbitrage
                    </div>
                    <div className="text-lg font-extrabold text-[#D87E1B] mt-1 font-mono">
                      ${(savings / 1000000).toFixed(2)}M ({pctSavings}%)
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#505D74] hover:text-[#0D306C] cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto text-center rounded-full bg-[#F19326] hover:bg-[#D87E1B] text-white px-7 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Lock In Pricing Model
                  </a>
                </div>
              </div>
            )}

            {/* -------- MODAL 2: ROI Estimator -------- */}
            {activeModal === "roi" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#169DC8]">
                    Interactive Tool
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0D306C] mt-1">
                    GCC ROI Estimator
                  </h3>
                  <p className="text-xs sm:text-sm text-[#505D74] mt-1">
                    Analyze break-even timeline and multi-year EBITDA impact vs onshore or vendor models.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#E7EDF9]/50 border border-[#D2DCF0] p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-[#0D306C]">
                    <span>Current Annual Tech Spend:</span>
                    <span className="text-sm text-[#169DC8] font-mono font-extrabold">
                      ${(annualSpend / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={20000000}
                    step={500000}
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(Number(e.target.value))}
                    className="w-full accent-[#169DC8] cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#D2DCF0] bg-white p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#505D74]">
                      Break-Even Point
                    </div>
                    <div className="text-lg font-extrabold text-[#0D306C] mt-1">Month 5.2</div>
                  </div>
                  <div className="rounded-xl border border-[#169DC8]/30 bg-[#169DC8]/5 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#169DC8]">
                      Annual Savings
                    </div>
                    <div className="text-lg font-extrabold text-[#169DC8] mt-1 font-mono">
                      ${(annualSavingsROI / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#F19326]/40 bg-[#F19326]/10 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#D87E1B]">
                      5-Year Cumulative ROI
                    </div>
                    <div className="text-lg font-extrabold text-[#D87E1B] mt-1 font-mono">
                      ${(fiveYearROI / 1000000).toFixed(2)}M
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#505D74] hover:text-[#0D306C] cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto text-center rounded-full bg-[#F19326] hover:bg-[#D87E1B] text-white px-7 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Request Board Model
                  </a>
                </div>
              </div>
            )}

            {/* -------- MODAL 3: Readiness Assessment -------- */}
            {activeModal === "readiness" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#169DC8]">
                    Interactive Diagnostic
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0D306C] mt-1">
                    GCC Readiness Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#505D74] mt-1">
                    Evaluate your enterprise readiness across governance, operations, and leadership.
                  </p>
                </div>
                <div className="space-y-2.5">
                  {readinessQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleReadiness(idx)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        readinessAnswers[idx]
                          ? "bg-white border-[#169DC8] shadow-xs"
                          : "bg-slate-50 border-[#D2DCF0] opacity-75"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-md flex items-center justify-center transition-colors ${
                          readinessAnswers[idx]
                            ? "bg-[#169DC8] text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {readinessAnswers[idx] && (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        )}
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-[#0D306C]">
                        {q}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-[#E7EDF9]/70 border border-[#D2DCF0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#505D74]">
                      Readiness Score
                    </div>
                    <div className="text-xl font-extrabold text-[#0D306C]">
                      {positiveAnswersCount}/5 Criteria Met ({positiveAnswersCount * 20}%)
                    </div>
                  </div>
                  <span className="rounded-full bg-[#169DC8]/10 text-[#169DC8] font-bold px-3.5 py-1 text-xs">
                    {positiveAnswersCount >= 4 ? "Ready to Launch" : "Foundation Stage"}
                  </span>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#505D74] hover:text-[#0D306C] cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setActiveModal(null)}
                    className="w-full sm:w-auto text-center rounded-full bg-[#F19326] hover:bg-[#D87E1B] text-white px-7 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Book Diagnostic Call
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
