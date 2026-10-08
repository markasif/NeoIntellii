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
  Boxes,
  Workflow,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export interface RelatedDeliveryLink {
  name: string;
  href: string;
  desc?: string;
  anchor?: string;
}

export interface RelatedAiDeliveryServicesProps {
  links: RelatedDeliveryLink[];
  title?: string;
  description?: string;
}

const getPillarIcon = (name: string): ComponentType<{ className?: string }> => {
  const lower = name.toLowerCase();
  if (lower.includes("talent") || lower.includes("recruit")) return Users;
  if (lower.includes("micro") || lower.includes("squad")) return Compass;
  if (lower.includes("genai") || lower.includes("generative")) return Bot;
  if (lower.includes("data")) return Database;
  if (lower.includes("mlops") || lower.includes("llmops")) return Cpu;
  if (lower.includes("solutions") || lower.includes("engineering")) return Zap;
  if (lower.includes("pod")) return Boxes;
  if (lower.includes("governance") || lower.includes("responsible")) return ShieldCheck;
  if (lower.includes("pipeline") || lower.includes("delivery")) return Workflow;
  if (lower.includes("calculator") || lower.includes("cost")) return Calculator;
  if (lower.includes("guide") || lower.includes("blueprint")) return BookOpen;
  if (lower.includes("readiness") || lower.includes("evaluation")) return CheckCircle2;
  return Sparkles;
};

function EcosystemCard({ item }: { item: RelatedDeliveryLink }) {
  const Icon = getPillarIcon(item.name);

  return (
    <Link
      to={item.href}
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
          {Boolean(item.desc) && (
            <p className="text-xs sm:text-[12.5px] text-[#C5D7F0]/90 leading-relaxed line-clamp-2 sm:line-clamp-3 mt-1.5 font-normal">
              {item.desc}
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
 * Connected Ecosystem section across AI Delivery Teams pages:
 * - Perfectly matches the Connected Ecosystem visual design of AI GCC and GCC Operations.
 * - Features top organic wave divider (flowing from canvas to navy), ambient glows,
 *   technical grid overlay, chamfer-cornered cards, and hexagonal icon badges.
 */
export default function RelatedAiDeliveryServices({
  links = [],
  title = "Related AI Delivery & Capability Pathways",
  description = "Explore related capabilities, delivery models and planning tools across the NeoIntelli platform.",
}: RelatedAiDeliveryServicesProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      aria-labelledby="related-delivery-services-heading"
      className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-hidden select-none"
    >
      {/* ── TOP ORGANIC WAVE SECTION DIVIDER (Light -> Navy) ─────────── */}
      <div className="absolute top-0 inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
        >
          <path
            d="M0,0 L1440,0 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
            fill="#D2DCF0"
            opacity="0.6"
          />
          <path
            d="M0,0 L1440,0 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
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
            description={description}
            align="center"
            variant="white"
          />
        </div>

        {/* Dynamic Card Grid: Renders exactly the cards passed per page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
          {links.map((link) => (
            <EcosystemCard key={link.href + link.name} item={link} />
          ))}
        </div>
      </div>
    </section>
  );
}
