"use client";

import React, { type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  MapPin,
  Rocket,
  Layers,
  RefreshCw,
  Activity,
  Bot,
  Users,
  Cpu,
  Calculator,
  ShieldCheck,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export interface RelatedService {
  label: string;
  href: string;
  desc?: string;
  /** Descriptive anchor text, e.g. "Compare GCC locations". Defaults to the label. */
  anchor?: string;
}

interface RelatedGccServicesProps {
  title?: string;
  intro?: string;
  primary: RelatedService[];
  secondary?: RelatedService[];
  secondaryTitle?: string;
  className?: string;
  variant?: "default" | "overview" | "navy";
}

const getGccPillarIcon = (name: string): ComponentType<{ className?: string }> => {
  const lower = name.toLowerCase();
  if (lower.includes("location") || lower.includes("city")) return MapPin;
  if (lower.includes("setup") || lower.includes("launch")) return Rocket;
  if (lower.includes("strategy") || lower.includes("case") || lower.includes("mandate")) return Layers;
  if (lower.includes("modern") || lower.includes("transform")) return RefreshCw;
  if (lower.includes("operation") || lower.includes("ops")) return Activity;
  if (lower.includes("ai gcc") || lower.includes("genai") || lower.includes("agent")) return Bot;
  if (lower.includes("talent") || lower.includes("people") || lower.includes("hr") || lower.includes("recruit")) return Users;
  if (lower.includes("engineering") || lower.includes("platform") || lower.includes("data")) return Cpu;
  if (lower.includes("calculator") || lower.includes("cost") || lower.includes("guide")) return Calculator;
  if (lower.includes("readiness") || lower.includes("assessment") || lower.includes("diagnostic")) return ShieldCheck;
  return Compass;
};

function GccPrimaryCard({ item }: { item: RelatedService }) {
  const Icon = getGccPillarIcon(item.label);

  return (
    <Link
      to={item.href}
      className="group relative flex flex-col justify-between w-full h-full min-h-[185px] sm:min-h-[200px] p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
      }}
    >
      {/* Chamfer Corner Border Accent (Bottom-Left Cut) */}
      <svg
        className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none overflow-visible z-20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <line
          x1="0"
          y1="2"
          x2="22"
          y2="24"
          stroke="#20528E"
          strokeOpacity={0.75}
          strokeWidth="1.5"
          className="group-hover:stroke-[#38BDF8] transition-colors"
        />
      </svg>

      {/* Inner Specular Highlight Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-[#38BDF8] border border-white/10 group-hover:border-[#38BDF8]/50 group-hover:scale-105 transition-all duration-300">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono text-[#38BDF8] tracking-wider uppercase font-semibold">
              DECISION MILESTONE
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-[#38BDF8] transition-colors duration-200 line-clamp-2">
            {item.label}
          </h3>

          {item.desc && (
            <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed line-clamp-3 mb-3 font-normal">
              {item.desc}
            </p>
          )}
        </div>

        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#38BDF8] group-hover:text-white transition-colors duration-200">
          <span>{item.anchor ?? `Explore ${item.label}`}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Related destinations component.
 * - Default variant: Original light design for inner pages (Strategy & Business Case, Location Strategy, Setup & Launch, Modernization).
 * - Overview variant: Deep navy wave aesthetic with signature PillFeature-styled destination tags.
 */
export default function RelatedGccServices({
  title = "Where to go next",
  intro,
  primary,
  secondary = [],
  secondaryTitle = "Also relevant",
  className = "",
  variant = "default",
}: RelatedGccServicesProps) {
  // Overview / Navy redesign mode (for /services/gcc overview page)
  if (variant === "overview" || variant === "navy") {
    const primaryColClass =
      primary.length === 2
        ? "sm:grid-cols-2 max-w-4xl"
        : primary.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4 max-w-7xl"
        : "sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";

    return (
      <section
        id="continue-gcc-journey"
        aria-labelledby="related-gcc-services-heading"
        className={`relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 overflow-x-clip select-none ${className}`}
      >
        {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
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
              fill="#E7EDF9"
            />
          </svg>
        </div>

        {/* Ambient background glow highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Subtle technical grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <SectionHeader
              eyebrow="CONTINUE THE JOURNEY"
              title={
                <>
                  {title}
                  <span className="text-[#38BDF8]">.</span>
                </>
              }
              description={intro}
              align="center"
              variant="white"
            />
          </div>

          {/* Primary Milestone Decision Cards */}
          <div className={`grid grid-cols-1 ${primaryColClass} gap-4 sm:gap-5 mx-auto items-stretch`}>
            {primary.map((item) => (
              <GccPrimaryCard key={item.href + item.label} item={item} />
            ))}
          </div>

          {/* Secondary: PillFeature-styled destination tags */}
          {secondary.length > 0 && (
            <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-white/[0.08] max-w-6xl mx-auto">
              <span className="block text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
                {secondaryTitle}
              </span>
              <ul className="flex flex-wrap gap-2.5 sm:gap-3 list-none pl-0">
                {secondary.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      to={item.href}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A3E0] bg-[#00A3E0]/10 text-white hover:bg-[#008EC4] hover:border-[#38BDF8] text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-md select-none"
                    >
                      <span>{item.anchor ?? item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Authentic original design with PillFeature-styled tags for inner pages
  return (
    <section className={`py-14 md:py-20 px-6 sm:px-8 lg:px-12 bg-transparent ${className}`} aria-labelledby="related-gcc-services">
      <div className="max-w-7xl mx-auto">
        <span className="block text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#008EC4] mb-2.5">
          CONTINUE THE JOURNEY
        </span>
        <h2 id="related-gcc-services" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D306C] tracking-tight mb-3 font-manrope">
          {title}
        </h2>
        {intro && <p className="text-[#505D74] max-w-3xl mb-8 leading-relaxed font-normal text-sm sm:text-base">{intro}</p>}

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none pl-0">
          {primary.map((item) => (
            <li key={item.href + item.label} className="h-full">
              <Link
                to={item.href}
                className="group flex flex-col h-full p-6 sm:p-7 rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8]"
              >
                <h3 className="text-base sm:text-lg font-bold text-[#0D306C] tracking-tight leading-snug mb-2 font-manrope group-hover:text-[#008EC4] transition-colors">
                  {item.label}
                </h3>
                {item.desc && (
                  <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#008EC4] group-hover:text-[#0D306C] transition-colors">
                  {item.anchor ?? item.label} <ArrowRight aria-hidden className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {secondary.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#D2DCF0]/60">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#505D74] mb-4 font-manrope">
              {secondaryTitle}
            </h3>
            <ul className="flex flex-wrap gap-2.5 sm:gap-3 list-none pl-0">
              {secondary.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#00A3E0] bg-transparent text-[#0D244D] hover:bg-[#008EC4] hover:border-[#008EC4] hover:text-white px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs select-none"
                  >
                    <span>{item.anchor ?? item.label}</span>
                    <ArrowRight aria-hidden className="w-3.5 h-3.5 text-[#00A3E0] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
