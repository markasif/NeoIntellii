"use client";

import React, { type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Calculator,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Users,
  Compass,
} from "lucide-react";
import { AI_GCC_CONTEXT_LINKS, AI_GCC_PAGE_BY_KEY, type AiGccPageKey } from "@/data/aiGcc";
import SectionHeader from "@/components/ui/SectionHeader";

export type RelatedRef =
  | { page: AiGccPageKey }
  | { context: keyof typeof AI_GCC_CONTEXT_LINKS };

const getPillarIcon = (name: string): ComponentType<{ className?: string }> => {
  const lower = name.toLowerCase();
  if (lower.includes("advisory") || lower.includes("strategy")) return Sparkles;
  if (lower.includes("setup") || lower.includes("operations")) return Zap;
  if (lower.includes("genai") || lower.includes("generative")) return Bot;
  if (lower.includes("data") || lower.includes("recruitment")) return Database;
  if (lower.includes("mlops") || lower.includes("infrastructure") || lower.includes("gpu")) return Cpu;
  if (lower.includes("governance") || lower.includes("responsible")) return ShieldCheck;
  if (lower.includes("calculator")) return Calculator;
  if (lower.includes("blueprint") || lower.includes("guide")) return BookOpen;
  if (lower.includes("readiness")) return CheckCircle2;
  if (lower.includes("micro")) return Compass;
  if (lower.includes("talent")) return Users;
  return Sparkles;
};

interface RelatedItemData {
  path: string;
  name: string;
  anchor: string;
  summary?: string;
}

const resolve = (ref: RelatedRef): RelatedItemData => {
  if ("page" in ref) {
    const page = AI_GCC_PAGE_BY_KEY[ref.page];
    return {
      path: page.path,
      name: page.name,
      anchor: page.anchor,
      summary: page.summary,
    };
  }
  const link = AI_GCC_CONTEXT_LINKS[ref.context];
  return {
    path: link.path,
    name: link.name,
    anchor: link.anchor,
    summary: "",
  };
};

function EcosystemCard({ item }: { item: RelatedItemData }) {
  const Icon = getPillarIcon(item.name);

  return (
    <Link
      to={item.path}
      className="group relative flex flex-col justify-between w-full h-full min-h-[175px] sm:min-h-[190px] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] border border-[#16427D]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
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
          stroke="#16427D"
          strokeOpacity={0.75}
          strokeWidth="1.5"
          className="group-hover:stroke-[#38BDF8] transition-colors"
        />
      </svg>

      {/* Inner Specular Highlight Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        <div>
          {/* Top Row: Hexagon Icon Badge */}
          <div className="flex items-center justify-start mb-3">
            <div className="relative flex items-center justify-center w-8 h-9">
              <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                <polygon
                  points="27,3 50,16 50,44 27,57 4,44 4,16"
                  fill="#123B70"
                  stroke="#38BDF8"
                  strokeWidth="2.4"
                  strokeOpacity="0.85"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                <Icon className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="block font-extrabold text-[15px] sm:text-base mb-1 leading-snug transition-colors text-white group-hover:text-[#38BDF8]">
            {item.name}
          </h3>

          {/* Description - only shown when description exists */}
          {Boolean(item.summary) && (
            <p className="text-xs sm:text-[12.5px] text-[#C5D7F0]/90 leading-relaxed line-clamp-2 sm:line-clamp-3 mt-1.5">
              {item.summary}
            </p>
          )}
        </div>

        {/* Footer Action Tag / Anchor Link */}
        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-white transition-colors">
          <span>{item.anchor || "Explore service"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Connected Ecosystem section across all AI GCC pages:
 * - Dynamically renders the exact related service cards configured per page.
 * - Clean responsive grid layout matching design.
 */
export default function RelatedAiGccServices({
  title = "Related AI GCC services",
  items = [],
}: {
  title?: string;
  currentKey?: AiGccPageKey;
  items?: RelatedRef[];
}) {
  const resolvedItems = items.map(resolve);

  return (
    <section
      aria-labelledby="related-ai-gcc-heading"
      className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip select-none"
    >
      {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
      <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16 xl:h-16 block pointer-events-none"
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
            eyebrow="CONNECTED ECOSYSTEM"
            title={`${title.replace(/\.?$/, "")}.`}
            description="Explore related capabilities, delivery models and planning tools across the NeoIntelli platform."
            align="center"
            variant="white"
          />
        </div>

        {/* Dynamic Card Grid: Renders exactly the cards passed per page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
          {resolvedItems.map((item) => (
            <EcosystemCard key={item.path + item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
