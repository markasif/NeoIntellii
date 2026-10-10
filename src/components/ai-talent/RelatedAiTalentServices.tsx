"use client";

import React, { type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Cpu,
  Database,
  Users,
  Compass,
  GraduationCap,
  Briefcase,
  Layers,
  Search,
} from "lucide-react";
import {
  AI_TALENT_CONTEXT_LINKS,
  AI_TALENT_PAGE_BY_KEY,
  type AiTalentPageKey,
} from "@/data/aiTalent";
import SectionHeader from "@/components/ui/SectionHeader";

export type RelatedRef =
  | { page: AiTalentPageKey }
  | { context: keyof typeof AI_TALENT_CONTEXT_LINKS };

const getTalentIcon = (name: string): ComponentType<{ className?: string }> => {
  const lower = name.toLowerCase();
  if (lower.includes("genai") || lower.includes("agentic")) return Bot;
  if (lower.includes("mlops") || lower.includes("platform") || lower.includes("infra")) return Cpu;
  if (lower.includes("data") || lower.includes("pipeline")) return Database;
  if (lower.includes("leadership") || lower.includes("executive")) return Search;
  if (lower.includes("academy") || lower.includes("reskilling")) return GraduationCap;
  if (lower.includes("hub") || lower.includes("neohirex")) return Layers;
  if (lower.includes("contract") || lower.includes("staffing")) return Briefcase;
  if (lower.includes("micro") || lower.includes("gcc")) return Compass;
  if (lower.includes("recruitment") || lower.includes("talent")) return Users;
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
    const page = AI_TALENT_PAGE_BY_KEY[ref.page];
    return {
      path: page.path,
      name: page.name,
      anchor: page.anchor,
      summary: page.summary,
    };
  }
  const link = AI_TALENT_CONTEXT_LINKS[ref.context];
  return {
    path: link.path,
    name: link.name,
    anchor: link.anchor,
    summary: "",
  };
};

function EcosystemCard({ item }: { item: RelatedItemData }) {
  const Icon = getTalentIcon(item.name);

  return (
    <Link
      to={item.path}
      className="group relative flex flex-col justify-between w-full h-full min-h-[175px] sm:min-h-[190px] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836] border border-[#20528E]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
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
              Service
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2 group-hover:text-[#38BDF8] transition-colors duration-200 line-clamp-2">
            {item.name}
          </h3>

          {item.summary && (
            <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2 mb-3 font-normal">
              {item.summary}
            </p>
          )}
        </div>

        <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-white transition-colors duration-200">
          <span>{item.anchor || "Explore service"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

export default function RelatedAiTalentServices({
  title = "Related AI Talent Services",
  items = [],
}: {
  title?: string;
  items?: RelatedRef[];
}) {
  if (!items || items.length === 0) return null;
  const resolved = items.map(resolve);

  return (
    <section
      id="related-ai-talent"
      aria-labelledby="related-ai-talent-heading"
      className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip select-none"
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
            title={
              <>
                {title}
                <span className="text-[#38BDF8]">.</span>
              </>
            }
            description="Explore related talent practices, scaling options, and capability pillars across the NeoIntelli platform."
            align="center"
            variant="white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
          {resolved.map((item) => (
            <EcosystemCard key={item.path} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
