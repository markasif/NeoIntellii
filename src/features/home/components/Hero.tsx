"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#E7EDF9] select-none"
      aria-label="NeoIntelli AI GCC Hero"
    >
      {/* ── FULL-BLEED ARCHITECTURAL SUNSET BACKGROUND (ANCHORED TO BOTTOM TERRACE) ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero/hero.webp"
          alt="NeoIntelli AI GCC Architecture Skyscrapers at Sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_bottom] sm:object-bottom"
        />
      </div>

      {/* ── TOP SPACER FOR FIXED/STICKY NAVBAR ──────────────────────────────── */}
      <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

      {/* ── MAIN EDITORIAL HERO CONTENT ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 min-h-0 flex flex-col justify-center pb-6 sm:pb-10 lg:pb-14">
        <div className="max-w-xl lg:max-w-2xl text-left -translate-y-2 sm:-translate-y-4 lg:-translate-y-6">

          {/* Eyebrow: AI GCC · INDIA with accent divider */}
          <div className="flex flex-col items-start mb-1.5 sm:mb-2.5">
            <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.22em] text-[#334E68]">
              AI GCC <span className="mx-1 text-[#169DC8]">·</span> INDIA
            </span>
            <div className="w-8 sm:w-9 h-[2px] bg-[#169DC8] mt-1 sm:mt-1.5 rounded-full" />
          </div>

          {/* Main Headline: Rendered directly for instant LCP with zero paint delay */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0B1A38] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2 sm:mb-2.5 font-sans text-left">
            <span className="block">Build and scale your</span>
            <span className="block">
              <span className="text-[#008EC4]">AI GCC</span> in India.
            </span>
          </h1>

          {/* High-Contrast Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14.5px] text-[#1D3557] leading-[1.48] sm:leading-[1.55] mb-3.5 sm:mb-4.5 max-w-lg sm:max-w-xl text-left font-normal"
          >
            NeoIntelli helps global companies design, build, operate and scale
            AI-led Global Capability Centers in India. From AI strategy and
            specialist talent to production AI engineering, delivery teams and GCC
            operations, one partner connects the complete capability lifecycle.
          </motion.p>

          {/* Action CTAs: Matching exact visual look of AiGccHero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row flex-wrap items-center justify-start gap-2.5 sm:gap-3 w-full sm:w-auto"
          >
            {/* Button 1: GCC Cost Calculator (Navy-blue primary button) */}
            <Link
              href="/gcc-cost-calculator"
              title="GCC Cost Calculator"
              className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold tracking-tight px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <span>GCC Cost Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
            </Link>

            {/* Button 2: Explore AI Micro GCC (Secondary button) */}
            <Link
              href="/services/micro-gcc"
              title="Explore AI Micro GCC"
              className="btn-white cursor-pointer shrink-0"
            >
              <span>Explore AI Micro GCC</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM LIFECYCLE STRIP TICKER MATCHING MOCKUP ───────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-20 w-full py-2 sm:py-2.5 lg:py-3 pb-3.5 sm:pb-4.5 pointer-events-none shrink-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 lg:gap-x-6 gap-y-1 text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#1E3A5F]">
            <span>STRATEGY</span>
            <span className="text-[#169DC8]">·</span>
            <span>TALENT</span>
            <span className="text-[#169DC8]">·</span>
            <span>AI ENGINEERING</span>
            <span className="text-[#169DC8]">·</span>
            <span>DELIVERY</span>
            <span className="text-[#169DC8]">·</span>
            <span>OPERATIONS</span>
            <span className="text-[#169DC8]">·</span>
            <span>BOT</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
