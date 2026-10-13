"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Layers,
  Users,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  Target,
  Cpu,
  Building2,
  RefreshCw,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AmbientGlow from "@/components/ui/AmbientGlow";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

// Animated Counting Number for Stats
function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  trigger = true,
  duration = 1800,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  trigger?: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [trigger, value, duration]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function WhyNeoIntelliLifecycle() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // 6 Stages for Why NeoIntelli Lifecycle — Content strictly matching Reference Image 2
  const stages: LifecycleStageItem[] = [
    {
      id: "01",
      name: "Strategy",
      description: "Decide what the center should own.",
      icon: Target,
      href: "/services/gcc/strategy-business-case",
    },
    {
      id: "02",
      name: "Talent",
      description: "Find and validate specialist people.",
      icon: Users,
      href: "/services/ai-talent",
    },
    {
      id: "03",
      name: "Engineering",
      description: "Build production AI capability.",
      icon: Cpu,
      href: "/services/ai-engineering",
    },
    {
      id: "04",
      name: "Delivery",
      description: "Deploy execution capacity.",
      icon: Layers,
      href: "/services/ai-delivery-teams",
    },
    {
      id: "05",
      name: "Setup",
      description: "Launch the GCC.",
      icon: Building2,
      href: "/services/gcc/setup-launch",
    },
    {
      id: "06",
      name: "Operations",
      description: "Run and scale the center.",
      icon: RefreshCw,
      href: "/services/gcc-operations",
    },
  ];

  // 4 Outer Pillar Cards for Transformation Impact — Exactly matching Reference Image 1
  const transformationPillars = [
    {
      title: "Senior Architectural Design",
      badge: "ARCHITECTURE",
      icon: Layers,
      image: "/images/pillar_card1_arch_v2-removebg-preview.png",
      points: [
        "Senior involvement in the decisions that set the model, not only at the pitch",
        "AI and data specialization rather than general offshore delivery",
      ],
      accent: "from-[#FFF8EE] via-[#FFFDF8] to-[#FFF3E0]",
      borderColor: "border-[#F7E7D2]",
      badgeBg: "bg-[#FEF3C7]/80 text-[#B45309] border-[#FDE68A]",
      bulletBg: "#EA580C",
      imgPos: "-bottom-2.5 sm:-bottom-3.5 -right-2 sm:-right-3",
      imgWidth: "74%",
      imgHeight: "72%",
      imgScale: "scale-105 sm:scale-[1.08]",
      btnDark: false,
      textMaxW: "max-w-[58%] sm:max-w-[55%]",
    },
    {
      title: "Deep Technical Validation",
      badge: "VALIDATION",
      icon: Users,
      image: "/images/pillar_card2_valid_v3-removebg-preview.png",
      points: [
        "NeoHireX-supported hiring with practitioner-led technical validation",
        "Production AI engineering capability, not advisory alone",
      ],
      accent: "from-[#F0F9FF] via-[#F8FCFF] to-[#E6F4FE]",
      borderColor: "border-[#D0E9FA]",
      badgeBg: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
      bulletBg: "#0284C7",
      imgPos: "-bottom-1 sm:-bottom-1.5 right-0 sm:right-0.5",
      imgWidth: "66%",
      imgHeight: "65%",
      imgScale: "scale-100",
      btnDark: false,
      textMaxW: "max-w-[72%] sm:max-w-[68%]",
    },
    {
      title: "Autonomous Outcome Squads",
      badge: "DELIVERY",
      icon: Zap,
      image: "/images/pillar_card3_deliver_v3-removebg-preview.png",
      points: [
        "AI delivery teams that own outcomes inside your cadence",
        "The option to start with an AI Micro GCC and grow from there",
      ],
      accent: "from-[#F0F9FF] via-[#F8FCFF] to-[#E6F4FE]",
      borderColor: "border-[#D0E9FA]",
      badgeBg: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
      bulletBg: "#0284C7",
      imgPos: "bottom-0 sm:bottom-0.5 right-0 sm:right-1",
      imgWidth: "63%",
      imgHeight: "62%",
      imgScale: "scale-100",
      btnDark: true, // Matches Image 1 dark button
      textMaxW: "max-w-[72%] sm:max-w-[68%]",
    },
    {
      title: "Integrated Transfer Roadmap",
      badge: "TRANSFER",
      icon: ShieldCheck,
      image: "/images/pillar_card4_transfer_v2-removebg-preview.png",
      points: [
        "Integrated GCC operations rather than a hand-off to a third party",
        "Capability transfer designed in, including a BOT path to captive ownership",
      ],
      accent: "from-[#FFF8EE] via-[#FFFDF8] to-[#FFF3E0]",
      borderColor: "border-[#F7E7D2]",
      badgeBg: "bg-[#FEF3C7]/80 text-[#B45309] border-[#FDE68A]",
      bulletBg: "#EA580C",
      imgPos: "-bottom-2.5 sm:-bottom-3.5 -right-2 sm:-right-3",
      imgWidth: "74%",
      imgHeight: "72%",
      imgScale: "scale-105 sm:scale-[1.08]",
      btnDark: false,
      textMaxW: "max-w-[55%] sm:max-w-[52%]",
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 1: WHY NEOINTELLI (NAVY BLUE WITH WAVE DIVIDERS & LIFECYCLE)      */}
      {/* ========================================================================= */}
      <section
        id="why-neointelli"
        ref={sectionRef}
        className="relative scroll-mt-28 overflow-x-clip select-none bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] text-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-24 sm:pb-28 md:pb-32 lg:pb-36 px-4 sm:px-6 lg:px-8"
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

        {/* ── AMBIENT BACKGROUND GLOW (Navy Theme) ─────────────────────── */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0D306C]/50 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center px-2 mb-8 sm:mb-12">
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#38BDF8] mb-3">
              WHY NEOINTELLI
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-[-0.03em] leading-[1.14] mb-4">
              One operating partner across the AI GCC lifecycle<span className="text-[#38BDF8]">.</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#C5D7F0] leading-relaxed font-normal max-w-2xl mx-auto">
              Unified accountability across all six lifecycle layers — eliminating the friction, latency, and hand-off gaps between traditional advisors, recruiters, and staffing vendors.
            </p>
          </div>

          {/* Continuous Sinusoidal Wave Lifecycle Visualization (UniversalLifecycle) */}
          <div className="mt-2 sm:mt-4">
            <UniversalLifecycle
              stages={stages}
              id="why-neointelli-lifecycle"
              theme="navy"
              tagStyle="none"
            />
          </div>
        </div>

        {/* ── BOTTOM ORGANIC WAVE SECTION DIVIDER (Navy -> Light) ──────── */}
        <div className="absolute -bottom-[2px] sm:-bottom-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 lg:h-20 block pointer-events-none"
          >
            {/* Subtle cyan accent wave undertone */}
            <path
              d="M0,124 L1440,124 L1440,42 C1260,78 1060,18 800,56 C540,94 300,36 0,72 Z"
              fill="#169DC8"
              opacity="0.25"
            />
            {/* Soft pearl-blue wave layer */}
            <path
              d="M0,124 L1440,124 L1440,30 C1280,62 1080,22 830,50 C570,80 320,28 0,62 Z"
              fill="#D2DCF0"
              opacity="0.75"
            />
            {/* Main solid wave seamlessly matching section below */}
            <path
              d="M0,124 L1440,124 L1440,18 C1220,52 1020,12 760,42 C500,72 270,24 0,52 Z"
              fill="#E7EDF9"
            />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: TRANSFORMATION IMPACT (LIGHT BACKGROUND - NOT IN NAVY SECTION) */}
      {/* ========================================================================= */}
      <section
        id="transformation-impact"
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#E7EDF9] overflow-hidden"
      >
        <AmbientGlow position="top" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto px-4">
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#169DC8] mb-3">
              TRANSFORMATION IMPACT
            </span>
            <h3 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] text-[#0D306C] leading-[1.14]">
              What connecting those layers actually changes<span className="text-[#169DC8]">.</span>
            </h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#505D74] leading-relaxed max-w-2xl mx-auto">
              A unified operating architecture eliminates the fragmentation, hand-off friction, and advisory disconnects of traditional offshore setups.
            </p>
          </div>

          {/* Bento-Style 3-Column Grid matching reference Image 1 architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            
            {/* LEFT COLUMN: 2 Cards (Pillars 0: Architecture & 1: Validation) */}
            <div className="flex flex-col gap-4 sm:gap-5 order-1 lg:order-1 h-full">
              {[transformationPillars[0], transformationPillars[1]].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + idx * 0.12,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br ${pillar.accent} border ${pillar.borderColor} shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]`}
                >
                  <div className="relative z-10">
                    {/* Eyebrow badge pill */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs ${pillar.badgeBg}`}
                    >
                      <pillar.icon className="w-3.5 h-3.5" />
                      <span>{pillar.badge}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {pillar.title}
                    </h4>

                    {/* Arrow-bullet points */}
                    <ul className={`space-y-2 mb-3 ${pillar.textMaxW}`}>
                      {pillar.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                            style={{ backgroundColor: pillar.bulletBg }}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className={`absolute ${pillar.imgPos} pointer-events-none select-none z-10 flex items-end justify-end overflow-visible`}
                    style={{ width: pillar.imgWidth, height: pillar.imgHeight }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 640px) 75vw, 38vw"
                      className={`object-contain object-right-bottom ${pillar.imgScale} origin-bottom-right`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* MIDDLE COLUMN: 4 Bento Cards (2 Stats + 1 Badge + 1 Glass Skyscraper Consultation Card) */}
            <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-2 h-full">
              
              {/* TOP ROW: 2 Stat Metric Cards */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 shrink-0">
                {/* Stat 1: 40% */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative rounded-[22px] sm:rounded-[24px] bg-white border border-[#D2DCF0]/80 shadow-[0_8px_25px_rgba(13,48,108,0.05)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(13,48,108,0.09)] transition-all duration-300 group hover:-translate-y-0.5 min-h-[145px]"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0D306C] tracking-tight leading-none group-hover:text-[#169DC8] transition-colors">
                      <AnimatedCounter value={40} suffix="%" trigger={isInView} />
                    </div>
                    <div className="text-xs sm:text-[13px] font-extrabold text-[#0D306C] mt-2 mb-1">
                      Lower Operating Cost
                    </div>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-tight font-normal">
                    Compared to traditional US/EU in-house teams with zero quality compromise.
                  </p>
                </motion.div>

                {/* Stat 2: 3.5x */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.16 }}
                  className="relative rounded-[22px] sm:rounded-[24px] bg-white border border-[#D2DCF0]/80 shadow-[0_8px_25px_rgba(13,48,108,0.05)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(13,48,108,0.09)] transition-all duration-300 group hover:-translate-y-0.5 min-h-[145px]"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0D306C] tracking-tight leading-none group-hover:text-[#169DC8] transition-colors">
                      <AnimatedCounter value={3.5} decimals={1} suffix="x" trigger={isInView} />
                    </div>
                    <div className="text-xs sm:text-[13px] font-extrabold text-[#0D306C] mt-2 mb-1">
                      Faster Deployment
                    </div>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-tight font-normal">
                    Validated AI specialists onboarded via NeoHireX in days, not months.
                  </p>
                </motion.div>
              </div>

              {/* MIDDLE ROW: NeoHireX Technical Validation Badge Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="relative rounded-[22px] sm:rounded-[24px] bg-white border border-[#D2DCF0]/80 shadow-[0_8px_25px_rgba(13,48,108,0.05)] p-4 sm:p-5 flex items-start gap-3.5 hover:shadow-[0_12px_30px_rgba(13,48,108,0.09)] transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/60 flex items-center justify-center shrink-0 text-[#0284C7] shadow-2xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-extrabold text-[#0D306C] tracking-tight leading-snug group-hover:text-[#169DC8] transition-colors">
                    NeoHireX Technical Validation
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-relaxed mt-1 font-normal">
                    Practitioner-led screening testing production AI, agentic systems, and high-throughput data architectures.
                  </p>
                </div>
              </motion.div>

              {/* BOTTOM ROW: CTA Glass Skyscraper Card matching Reference Image 1 */}
              <div className="flex-1 flex flex-col min-h-[220px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.28 }}
                  className="flex-1 flex flex-col"
                >
                  <Link
                    to="/services/gcc-operations"
                    aria-label="Discuss Your GCC Operating Model — Architecture consultation with our senior GCC advisors"
                    className="flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#0B254E] via-[#0E356E] to-[#124286] p-5 sm:p-6 text-white shadow-[0_12px_35px_rgba(11,37,78,0.25)] hover:shadow-[0_18px_45px_rgba(11,37,78,0.35)] transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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

                    {/* Skyscraper Illustration with Seamlessly Blended Left Edge */}
                    <div
                      className="absolute -right-2 sm:-right-3 -bottom-1 sm:-bottom-2 pointer-events-none select-none flex items-end justify-end"
                      style={{
                        width: "76%",
                        height: "148%",
                        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, black 28%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, black 28%)",
                      }}
                    >
                      <Image
                        src="/images/gcc_skyscraper_cutout-removebg-preview.png"
                        alt="Modern GCC Corporate Tower"
                        fill
                        sizes="(max-width: 640px) 76vw, 40vw"
                        className="object-contain object-right-bottom scale-105 origin-bottom-right"
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
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                        </div>
                      </div>

                      <div className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight max-w-[68%] sm:max-w-[65%]">
                        Discuss Your GCC Operating Model
                      </div>

                      <div className="text-xs sm:text-[13px] text-white/90 font-normal mt-2 leading-relaxed max-w-[68%] sm:max-w-[65%]">
                        Architecture consultation with our senior GCC advisors.
                      </div>
                    </div>

                    {/* Bottom-left Circular Arrow Button — Navigates to GCC Operations */}
                    <div className="relative z-20 pt-4">
                      <div
                        aria-hidden="true"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-slate-100/90 flex items-center justify-center text-[#0D306C] group-hover:bg-[#169DC8] group-hover:text-white group-hover:scale-105 transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* RIGHT COLUMN: 2 Cards (Pillars 2: Delivery & 3: Transfer) */}
            <div className="flex flex-col gap-4 sm:gap-5 order-3 md:order-2 lg:order-3 h-full">
              {[transformationPillars[2], transformationPillars[3]].map((pillar, idx) => (
                <motion.div
                  key={idx + 2}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + idx * 0.12,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`flex-1 relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br ${pillar.accent} border ${pillar.borderColor} shadow-[0_8px_25px_rgba(13,48,108,0.06)] hover:shadow-[0_14px_35px_rgba(13,48,108,0.11)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 overflow-visible min-h-[290px] sm:min-h-[310px]`}
                >
                  <div className="relative z-10">
                    {/* Eyebrow badge pill */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider shadow-2xs ${pillar.badgeBg}`}
                    >
                      <pillar.icon className="w-3.5 h-3.5" />
                      <span>{pillar.badge}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#0D306C] tracking-tight leading-snug mt-3 mb-2.5 transition-colors duration-300 group-hover:text-[#169DC8]">
                      {pillar.title}
                    </h4>

                    {/* Arrow-bullet points */}
                    <ul className={`space-y-2 mb-3 ${pillar.textMaxW}`}>
                      {pillar.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full text-white shadow-2xs"
                            style={{ backgroundColor: pillar.bulletBg }}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span className="text-xs sm:text-[12.5px] text-[#475569] leading-snug font-medium">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* 3D Illustration Breaking Out of the Div */}
                  <div
                    className={`absolute ${pillar.imgPos} pointer-events-none select-none z-10 flex items-end justify-end overflow-visible`}
                    style={{ width: pillar.imgWidth, height: pillar.imgHeight }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 640px) 75vw, 38vw"
                      className={`object-contain object-right-bottom ${pillar.imgScale} origin-bottom-right`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}