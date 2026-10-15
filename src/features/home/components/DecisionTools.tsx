"use client";

import Image from "next/image";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";


export default function DecisionTools() {
  const bannerRef = useRef<HTMLDivElement>(null);
  // Slow, once-only journey animation when the banner scrolls into view.
  const bannerInView = useInView(bannerRef, { once: true, margin: "-80px" });

  const toolCards = [
    {
      id: "01",
      eyebrow: "GCC COST CALCULATOR",
      title: "What will it cost?",
      description:
        "Model roles, seniority, headcount and city for a fully loaded monthly and annual estimate.",
      ctaLabel: "Open Cost Calculator",
      href: "/gcc-cost-calculator",
      image: "/images/tools/decision_cost_calculator.webp",
      imageAlt: "GCC Cost Calculator - Financial modeling dashboard with Bangalore tech corridor",
    },
    {
      id: "02",
      eyebrow: "GCC ROI ESTIMATOR",
      title: "When does the model pay back?",
      description:
        "Compare current spend against an India model to see break-even and multi-year effect.",
      ctaLabel: "Open ROI Estimator",
      href: "/gcc-roi-estimator",
      image: "/images/tools/decision_roi_estimator.webp",
      imageAlt: "GCC ROI Estimator - Executive multi-year break-even payback projection analysis",
    },
    {
      id: "03",
      eyebrow: "GCC READINESS ASSESSMENT",
      title: "Are you ready to build?",
      description:
        "A short structured assessment that returns a readiness view and a recommended next step.",
      ctaLabel: "Start Assessment",
      href: "/gcc-readiness-assessment",
      image: "/images/tools/decision_readiness_assessment.webp",
      imageAlt: "GCC Readiness Assessment - Strategic capability diagnostic framework and audit milestones",
    },
  ];

  // benefits removed per user request

  const journeyPoints = [
    { l: "3%", b: "26%", t: "Assess", s: "Readiness" },
    { l: "28%", b: "57%", t: "Model", s: "Costs" },
    { l: "55%", b: "81%", t: "Validate", s: "Returns" },
    { l: "76%", b: "78%", t: "Build", s: "your GCC" },
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
          title="Plan your GCC before you commit."
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
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#D2DCF0]/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
            >
              <Link
                to={tool.href}
                aria-label={tool.ctaLabel}
                className="flex flex-col justify-between h-full cursor-pointer"
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
                      <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 text-inherit group-hover:!text-white transition-all duration-200 group-hover:translate-x-0.5" />
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
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================================================================ */}
        {/* BOTTOM BANNER — dark with journey path & smooth entrance         */}
        {/* ================================================================ */}
        <motion.div
          ref={bannerRef}
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
                opacity="0.45"
              />
              {/* Active line draws slowly from Assess toward the flag when scrolled into view */}
              <path
                d="M60 124 Q120 97, 180 77 Q240 57, 310 44 Q370 32, 440 50"
                stroke="#67D5F7"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: bannerInView ? 0 : 1,
                  transition: "stroke-dashoffset 2.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <circle cx="60" cy="124" r="4" fill="#169DC8" />
              <circle cx="60" cy="124" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="180" cy="77" r="4" fill="#169DC8" />
              <circle cx="180" cy="77" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="310" cy="44" r="4" fill="#169DC8" />
              <circle cx="310" cy="44" r="7" fill="#169DC8" fillOpacity="0.2" />
              <circle cx="440" cy="50" r="4" fill="#169DC8" />
              <circle cx="440" cy="50" r="7" fill="#169DC8" fillOpacity="0.2" />
              {/* Flag pole + pennant at the destination, revealed after the line arrives */}
              <g
                style={{
                  opacity: bannerInView ? 1 : 0,
                  transform: bannerInView ? "scale(1)" : "scale(0.7)",
                  transformOrigin: "440px 30px",
                  transition: "opacity 0.6s ease 2.2s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 2.2s",
                }}
              >
                <line x1="440" y1="50" x2="440" y2="24" stroke="#67D5F7" strokeWidth="1.5" />
                <path d="M440 24 L456 30 L440 36 Z" fill="#F19326" />
              </g>
              <defs>
                <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#169DC8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0D306C" stopOpacity="0.45" />
                </linearGradient>
              </defs>
            </svg>
            {/* Journey labels */}
            <div className="absolute inset-0">
              {journeyPoints.map((pt, i) => (
                <div
                  key={pt.t}
                  className="absolute"
                  style={{
                    left: pt.l,
                    bottom: pt.b,
                    opacity: bannerInView ? 1 : 0,
                    transform: bannerInView ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 0.7s ease ${0.3 + i * 0.72}s, transform 0.7s ease ${0.3 + i * 0.72}s`,
                  }}
                >
                  <div className="text-[10px] font-bold text-white leading-none whitespace-nowrap drop-shadow-[0_1px_3px_rgba(8,27,62,0.9)]">
                    {pt.t}
                  </div>
                  <div className="mt-0.5 text-[10px] text-[#A3BFDD] leading-none whitespace-nowrap drop-shadow-[0_1px_3px_rgba(8,27,62,0.9)]">
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

    </section>
  );
}
