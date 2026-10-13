"use client";

import React, { type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Cpu,
  Database,
  ShieldCheck,
  Workflow,
  Layers,
  Activity,
  Compass,
  Users,
} from "lucide-react";
import { AI_ENGINEERING_PAGES } from "@/data/aiEngineering";
import { getPageMeta } from "@/lib/pageMeta";
import SectionHeader from "@/components/ui/SectionHeader";

export interface RelatedLink {
  href: string;
  label?: string;
  context?: string;
  anchor?: string;
}

export interface RelatedAiServicesProps {
  links: RelatedLink[];
  title?: string;
  description?: string;
}

const getEngineeringIcon = (name: string): ComponentType<{ className?: string }> => {
  const lower = name.toLowerCase();
  if (lower.includes("genai") || lower.includes("generative")) return Bot;
  if (lower.includes("agent") || lower.includes("automation")) return Workflow;
  if (lower.includes("mlops") || lower.includes("llmops") || lower.includes("agentops") || lower.includes("platform")) return Cpu;
  if (lower.includes("data") || lower.includes("pipeline") || lower.includes("lakehouse")) return Database;
  if (lower.includes("evaluation") || lower.includes("assurance") || lower.includes("benchmark")) return ShieldCheck;
  if (lower.includes("product") || lower.includes("software") || lower.includes("app")) return Layers;
  if (lower.includes("applied") || lower.includes("machine learning") || lower.includes("ml")) return Activity;
  if (lower.includes("micro") || lower.includes("gcc")) return Compass;
  if (lower.includes("talent") || lower.includes("team")) return Users;
  return Sparkles;
};

interface ResolvedItem {
  href: string;
  name: string;
  summary: string;
  anchor: string;
}

function EcosystemCard({ item }: { item: ResolvedItem }) {
  const Icon = getEngineeringIcon(item.name);

  return (
    <Link
      to={item.href}
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
          <span>{item.anchor || `Explore ${item.name}`}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Connected Ecosystem & Related AI Engineering Services:
 * Matches RelatedAiTalentServices & RelatedAiGccServices:
 * - Signature organic wave divider flowing from #E7EDF9 canvas into deep navy (#081B3E)
 * - Atmospheric cyan radial glows and blueprint grid pattern
 * - SectionHeader with "CONNECTED ECOSYSTEM" in white typography
 * - Chamfer-cut cards with specular highlights and glowing badges
 */
export default function RelatedAiServices({
  links = [],
  title = "Related AI Engineering services",
  description = "Explore related engineering capabilities, platform ops, and scaling pathways across NeoIntelli.",
}: RelatedAiServicesProps) {
  if (!links || links.length === 0) return null;

  const resolvedItems: ResolvedItem[] = links.map((link) => {
    const page = AI_ENGINEERING_PAGES.find((entry) => entry.path === link.href);
    const meta = getPageMeta(link.href, link.label ?? link.href);
    const name = link.label ?? page?.name ?? meta.title;
    const summary = link.context ?? page?.summary ?? meta.description;
    const anchor = link.anchor ?? (page?.name ? `Explore ${page.name}` : `Explore ${name}`);

    return {
      href: link.href,
      name,
      summary,
      anchor,
    };
  });

  return (
    <section
      id="related-ai-engineering"
      aria-labelledby="related-ai-engineering-heading"
      className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip select-none"
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
            eyebrow="CONNECTED ECOSYSTEM"
            title={`${title.replace(/\.?$/, "")}.`}
            description={description}
            align="center"
            variant="white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
          {resolvedItems.map((item) => (
            <EcosystemCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
