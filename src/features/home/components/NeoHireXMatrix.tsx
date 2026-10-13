"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";

export interface NeoHireXMatrixItem {
  id?: string;
  category?: string;
  eyebrow?: string;
  step?: string;
  title: string;
  description?: string;
  body?: string;
  desc?: string;
  what?: string;
  when?: string;
  limits?: string;
  cta?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  direction?: "left" | "right";
}

export interface NeoHireXMatrixProps {
  id?: string;
  items?: NeoHireXMatrixItem[];
  showHeader?: boolean;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "cyan" | "navy" | "white";
  className?: string;
}

const DEFAULT_SOLUTIONS: NeoHireXMatrixItem[] = [
  {
    id: "01",
    category: "FOR AI-FIRST STARTUPS & SCALE-UPS",
    title: "Start with an AI Micro GCC.",
    description:
      "Build a dedicated AI engineering capability in India without starting with the overhead of a large traditional GCC. Begin with one focused team and expand as the business grows.",
    cta: "Explore AI Micro GCC",
    href: "/services/micro-gcc",
    image: "/images/solution_micro_gcc.webp",
    imageAlt:
      "AI Micro GCC engineering team collaborating in India on neural architectures and ML pipelines",
    direction: "right",
  },
  {
    id: "02",
    category: "SPECIALIZED AI TALENT",
    title: "Hire AI talent that has already been technically evaluated.",
    description:
      "Build your team across GenAI, Agentic AI, machine learning, data engineering, MLOps and AI leadership through specialist sourcing, NeoHireX screening and practitioner-led technical validation.",
    cta: "Explore AI Talent",
    href: "/services/ai-talent",
    image: "/images/solution_ai_talent.webp",
    imageAlt:
      "Senior AI engineering practitioner conducting technical evaluation with code and scorecard metrics",
    direction: "left",
  },
  {
    id: "03",
    category: "FREE GCC PLANNING TOOL",
    title: "What would your India GCC actually cost?",
    description:
      "Model roles, seniority, headcount and city to estimate the fully loaded monthly and annual operating cost of your India team.",
    cta: "Calculate My GCC Cost",
    href: "/gcc-cost-calculator",
    image: "/images/solution_gcc_calculator.webp",
    imageAlt:
      "India GCC strategic cost and talent headcount modeling dashboard interface",
    direction: "right",
  },
];

export default function NeoHireXMatrix({
  id = "solutions",
  items,
  showHeader = true,
  eyebrow = "NEOINTELLI SOLUTIONS",
  title = (
    <>
      Start where your need is today<span className="text-[#008EC4]">.</span>
    </>
  ),
  description = "Build the first team, solve an immediate talent gap or model the full GCC before committing.",
  variant = "cyan",
  className = "",
}: NeoHireXMatrixProps) {
  const cards = items && items.length > 0 ? items : DEFAULT_SOLUTIONS;

  const content = (
    <div className={`w-full space-y-0 ${className}`}>
      {cards.map((item, index) => {
        const itemId = item.id || String(index + 1).padStart(2, "0");
        const category = item.category || item.eyebrow || item.step || `STAGE ${itemId}`;
        const bodyText = item.description || item.body || item.desc;
        const isNavyRight = item.direction ? item.direction === "right" : index % 2 === 0;
        const hasStructuredPoints = Boolean(item.what || item.when || item.limits);
        const hasCta = Boolean(item.cta && item.href);

        return (
          <motion.div
            key={item.title + index}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden bg-transparent rounded-none border-b border-[#0D244D]/15 lg:border-none pb-6 sm:pb-8 lg:pb-0 mb-6 sm:mb-8 lg:mb-0 last:border-none last:pb-0 last:mb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* ============================================================= */}
              {/* TEXT HALF: Transparent with Adjusted High-Contrast Dark Text */}
              {/* ============================================================= */}
              <div
                className={`lg:col-span-7 py-5 sm:py-8 lg:py-10 px-4 sm:px-7 md:px-8 lg:px-12 xl:px-16 flex items-center bg-transparent text-[#0D244D] ${isNavyRight ? "lg:order-first" : "lg:order-last"
                  }`}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 w-full">
                  {/* Huge Outlined Number with Amber Underline */}
                  <div className="shrink-0 select-none pt-0.5 flex flex-col items-start">
                    <span
                      className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold text-transparent tracking-tighter block leading-none"
                      style={{
                        WebkitTextStroke: "2px #008EC4",
                      }}
                    >
                      {itemId}
                    </span>
                    {/* Amber Accent Underline matching Choose Your GCC Starting Point */}
                    <div className="w-10 sm:w-12 h-[3px] bg-[#DE8017] rounded-full mt-2" />
                  </div>

                  {/* Text Column */}
                  <div className="flex-1 min-w-0">
                    {/* Category */}
                    {category && (
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#008EC4] uppercase mb-2 block">
                        {category}
                      </span>
                    )}

                    {/* Title: Deep Navy */}
                    <h3 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold text-[#0D244D] tracking-tight leading-[1.18] mb-2.5 sm:mb-3 font-sans">
                      {item.title}
                    </h3>

                    {/* Structured Content (e.g., Layers) */}
                    {hasStructuredPoints ? (
                      <div className="space-y-3 mb-4 sm:mb-5 max-w-xl text-left">
                        {item.what && (
                          <p className="text-xs sm:text-sm font-semibold text-[#0D244D] leading-snug">
                            {item.what}
                          </p>
                        )}
                        {item.when && (
                          <div>
                            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#008EC4] font-bold block mb-1">
                              When it is appropriate
                            </span>
                            <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                              {item.when}
                            </p>
                          </div>
                        )}
                        {item.limits && (
                          <div>
                            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-[#DE8017] font-bold block mb-1">
                              Its limits
                            </span>
                            <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed font-normal">
                              {item.limits}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Description: Dark Readable Slate */
                      bodyText && (
                        <p className="text-xs sm:text-sm lg:text-[14.5px] text-[#475569] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl">
                          {bodyText}
                        </p>
                      )
                    )}

                    {/* Underlined CTA link with arrow (rendered only if provided) */}
                    {hasCta && (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#008EC4] uppercase tracking-wider pb-0.5 border-b border-[#008EC4] hover:text-[#0D244D] hover:border-[#0D244D] transition-all group/link"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* NAVY BLUE HALF: Deep Navy Block with Solution Image           */}
              {/* ============================================================= */}
              <div
                className={`lg:col-span-5 h-full flex flex-col justify-between bg-[#081B3E] text-white overflow-hidden ${isNavyRight ? "lg:order-last" : "lg:order-first"
                  }`}
              >
                {/* Main Visual: Photorealistic Solution Image */}
                <div className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] overflow-hidden group/img">
                  <Image
                    src={item.image || "/images/solutions_illustration.webp"}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 500px"
                    className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061530]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Bar: Action Strip (rendered only if CTA provided) */}
                {hasCta && (
                  <div className="flex items-center justify-between py-3 sm:py-3.5 px-5 sm:px-6 lg:px-8 border-t border-white/15 bg-[#061530]/90">
                    <Link
                      href={item.href || "#"}
                      className="text-xs sm:text-[13px] font-mono font-bold text-white hover:text-[#38BDF8] transition-colors tracking-wide uppercase truncate mr-3"
                    >
                      {item.cta}
                    </Link>
                    <Link
                      href={item.href || "#"}
                      className="w-7 h-7 sm:w-8 sm:h-8 border border-white/40 flex items-center justify-center text-white hover:bg-[#008EC4] hover:border-[#008EC4] transition-all shrink-0"
                      aria-label={item.cta}
                    >
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  if (!showHeader) {
    return content;
  }

  return (
    <section
      id={id}
      className="relative bg-[#E7EDF9] text-[#0D244D] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="neohirex" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div id="roles" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      {/* Subtle ambient light glow */}
      <AmbientGlow position="top" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          variant={variant}
          className="px-4 mb-8 sm:mb-10 lg:mb-12"
        />
        {content}
      </div>
    </section>
  );
}
