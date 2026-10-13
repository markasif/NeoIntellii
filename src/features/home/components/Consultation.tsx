"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Animated Counting Number for Stats
function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  trigger,
  duration = 1800,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  trigger: boolean;
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

export interface ConsultationProps {
  hideUpperCta?: boolean;
  hideWaveDivider?: boolean;
  waveFill?: string;
}

export default function Consultation({ hideUpperCta = false, hideWaveDivider = false, waveFill = "#E7EDF9" }: ConsultationProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white ${
        hideWaveDivider
          ? "pt-2 sm:pt-4"
          : hideUpperCta
          ? "pt-14 sm:pt-16 md:pt-20 lg:pt-24"
          : "pt-8 sm:pt-10 md:pt-12 lg:pt-14"
      } pb-12 sm:pb-16 lg:pb-20 overflow-x-clip`}
    >
      {/* ========================================================================= */}
      {/* TOP ORGANIC WAVE SECTION DIVIDER (Flowing down from FAQ section #E7EDF9)  */}
      {/* ========================================================================= */}
      {!hideWaveDivider && (
        <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block pointer-events-none"
          >
            <path
              d="M0,-4 L1440,-4 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
              fill="#D2DCF0"
              opacity="0.6"
            />
            <path
              d="M0,-4 L1440,-4 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
              fill={waveFill}
            />
          </svg>
        </div>
      )}

      {/* Ambient background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle technical grid pattern matching screenshot theme */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${hideUpperCta ? 'pt-6 sm:pt-10' : 'pt-10 sm:pt-14 lg:pt-18'} pb-4 sm:pb-6`}>
        
        {/* ========================================================================= */}
        {/* UPPER CALL TO ACTION HEADER (Start with one team. Scale into an AI GCC)   */}
        {/* ========================================================================= */}
        {!hideUpperCta && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 px-2"
          >
            <span className="block text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 font-[family-name:var(--font-plus-jakarta)]">
              BUILD YOUR INDIA AI CAPABILITY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-[-0.03em] leading-[1.14] mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Start with one team. Scale into an AI GCC.
            </h2>
            <p className="text-xs sm:text-base text-[#C5D7F0] leading-relaxed max-w-2xl mx-auto font-normal">
              Whether you are testing the India model with an initial AI squad or designing a full capability center, NeoIntelli can help define the right starting model and build the operating path around it.
            </p>

            {/* Action pills row */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-7 w-full sm:w-auto">
              <Link
                href="/services/ai-gcc"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0A224E] hover:bg-[#F19326] hover:text-white px-6 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight shadow-md transition-all duration-200 w-full sm:w-auto"
              >
                <span>Plan My AI GCC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/gcc-cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 w-full sm:w-auto"
              >
                <span>Calculate GCC Cost</span>
              </Link>
              <Link
                href="/services/micro-gcc"
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#38BDF8] hover:text-white transition-colors py-1.5 sm:py-0 sm:pl-2"
              >
                <span>Explore AI Micro GCC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* MAIN TWO-COLUMN SECTION                                                   */}
        {/* ========================================================================= */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${hideUpperCta ? 'pt-0' : 'pt-2 sm:pt-6'}`}>
          
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: 'LET'S BUILD TOGETHER' with smooth slide-in animation    */}
          {/* --------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            
            <div className="mb-6 sm:mb-8">
              <span className="block text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3 font-[family-name:var(--font-plus-jakarta)]">
                LET&apos;S BUILD TOGETHER
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-[-0.03em] leading-[1.14] mb-4 font-[family-name:var(--font-plus-jakarta)]">
                Design your next AI-first Global Capability Center.
              </h3>
              <p className="text-xs sm:text-base text-[#C5D7F0] leading-relaxed max-w-xl font-normal">
                Whether you are setting up a new GCC, scaling engineering capability, or building an AI-enabled operating model &mdash; NeoIntelli helps you move with clarity, speed, and enterprise-grade execution.
              </p>
            </div>

            {/* Horizontal Dual-Capsule Pill Slices Framing the Blue Lounge Workspace Photo */}
            <div className="pt-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-xl flex gap-2.5 sm:gap-4 select-none">
                
                {/* Left Pill Capsule Slice */}
                <div className="relative flex-1 h-full rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/20 shadow-2xl group bg-[#0A224E]">
                  <div className="absolute inset-0 w-[200%] h-full left-0">
                    <Image
                      src="/images/home/contact_engineer_blue_lounge.webp"
                      alt="NeoIntelli AI Engineering Lounge Workspace in Bengaluru"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Pill Capsule Slice */}
                <div className="relative flex-1 h-full rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/20 shadow-2xl group bg-[#0A224E]">
                  <div className="absolute inset-0 w-[200%] h-full -left-[100%]">
                    <Image
                      src="/images/home/contact_engineer_blue_lounge.webp"
                      alt="NeoIntelli AI Engineering Lounge Workspace in Bengaluru"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061836]/40 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

          </motion.div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: The Discovery Call Card with Chamfered Animated Stats   */}
          {/* --------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            
            {/* Card with subtle rounded-2xl border matching reference screenshot */}
            <div className="rounded-2xl bg-[#0B4A77]/55 border border-[#169DC8]/35 backdrop-blur-xl p-5 sm:p-8 lg:p-9 shadow-2xl space-y-5 sm:space-y-6">
              
              {/* Card Header */}
              <div>
                <span className="block text-xs sm:text-[13px] font-medium text-cyan-200/90 mb-1.5 sm:mb-2 font-[family-name:var(--font-plus-jakarta)]">
                  Start the conversation
                </span>
                <h4 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug font-[family-name:var(--font-plus-jakarta)]">
                  A 30-minute discovery call with a GCC strategy lead.
                </h4>
              </div>

              {/* Two Action Buttons matching screenshot */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <Link
                  href="/book-a-call"
                  className="w-full flex items-center justify-between rounded-xl sm:rounded-2xl bg-white hover:bg-[#F19326] text-[#0A224E] hover:text-white px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-tight shadow-md transition-all duration-300 group"
                >
                  <span>Schedule a Strategy Meeting</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-between rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-tight shadow-sm transition-all duration-300 group"
                >
                  <span>Contact with GCC Expert</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Horizontal Divider */}
              <div className="pt-2 border-t border-white/15">
                
                {/* 3 Metric Cards Styled Like 'What Connecting Those Layers' with Chamfered Bottom-Left Cut & Animation - 2 Rows on Mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3">
                  
                  {/* Card 1: 30+ GCCs Shaped */}
                  <div
                    className="relative p-3 sm:p-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md group hover:-translate-y-0.5 text-left flex flex-col justify-between"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                    }}
                  >
                    <div>
                      {/* Hexagon Shape Icon Badge matching 'One Partner' Lifecycle section */}
                      <div className="relative flex items-center justify-center w-7 h-8 mb-2">
                        <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill="rgba(255, 255, 255, 0.15)"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex items-baseline font-mono font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
                        <AnimatedCounter value={30} trigger={isInView} />
                        <span className="text-base sm:text-lg font-bold ml-0.5 text-[#67D5F7]">+</span>
                      </div>
                      <div className="text-[10.5px] sm:text-xs text-white font-bold mt-1.5 leading-tight">
                        GCCs shaped
                      </div>
                    </div>
                    <div className="text-right text-[9px] text-[#CBD5E1] font-medium mt-2">
                      Lifecycle
                    </div>
                  </div>

                  {/* Card 2: 48h First Response */}
                  <div
                    className="relative p-3 sm:p-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md group hover:-translate-y-0.5 text-left flex flex-col justify-between"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                    }}
                  >
                    <div>
                      {/* Hexagon Shape Icon Badge matching 'One Partner' Lifecycle section */}
                      <div className="relative flex items-center justify-center w-7 h-8 mb-2">
                        <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill="rgba(255, 255, 255, 0.15)"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex items-baseline font-mono font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
                        <AnimatedCounter value={48} trigger={isInView} />
                        <span className="text-base sm:text-lg font-bold ml-0.5 text-[#67D5F7]">h</span>
                      </div>
                      <div className="text-[10.5px] sm:text-xs text-white font-bold mt-1.5 leading-tight">
                        First response
                      </div>
                    </div>
                    <div className="text-right text-[9px] text-[#CBD5E1] font-medium mt-2">
                      SLA
                    </div>
                  </div>

                  {/* Card 3: 100% Senior-Led (Cyan-to-Amber Gradient Highlight matching 'Discuss Your GCC') - Spans full width on mobile (Row 2) */}
                  <div
                    className="col-span-2 sm:col-span-1 relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#169DC8] via-[#0EA5C9] to-[#DE8017] border border-white/30 backdrop-blur-md transition-all duration-300 shadow-[0_10px_28px_rgba(22,157,200,0.3)] hover:shadow-[0_14px_35px_rgba(222,128,23,0.38)] group hover:-translate-y-0.5 text-left flex flex-row sm:flex-col items-center sm:items-stretch justify-between overflow-hidden"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                    }}
                  >
                    {/* Inner subtle glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/15 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 flex items-center gap-3 sm:block">
                      {/* Hexagon Shape Icon Badge matching 'Discuss Your GCC' section */}
                      <div className="relative flex items-center justify-center w-7 h-8 mb-0 sm:mb-2 shrink-0">
                        <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                          <polygon
                            points="27,3 50,16 50,44 27,57 4,44 4,16"
                            fill="rgba(255, 255, 255, 0.25)"
                            stroke="rgba(255, 255, 255, 0.55)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline font-mono font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
                          <AnimatedCounter value={100} trigger={isInView} />
                          <span className="text-base sm:text-lg font-bold ml-0.5 text-white">%</span>
                        </div>
                        <div className="text-[10.5px] sm:text-xs text-white font-bold mt-0.5 sm:mt-1.5 leading-tight">
                          Senior-led
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 text-right text-[9px] text-white/90 font-medium mt-0 sm:mt-2 shrink-0">
                      Partners
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
