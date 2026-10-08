"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Cpu,
  Layers,
  Bot,
  Workflow,
  Sparkles,
  Activity,
  ShieldCheck,
  Database,
  BarChart3,
  Sliders,
  CheckCircle2,
  Lock,
  Zap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface CapabilityItem {
  title: string;
  body?: string;
  items?: string[];
  href?: string;
  linkLabel?: string;
  icon?: LucideIcon;
}

interface AiCapabilityGridProps {
  items: CapabilityItem[];
  columns?: 2 | 3 | 4;
  tone?: "white" | "muted";
}

const COL_MAP: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

function resolveCapabilityIcon(title: string, customIcon?: LucideIcon): LucideIcon {
  if (customIcon) return customIcon;
  const t = title.toLowerCase();
  if (t.includes("retrieval") || t.includes("rag") || t.includes("knowledge")) return Layers;
  if (t.includes("model") || t.includes("generative") || t.includes("llm")) return Cpu;
  if (t.includes("agent") || t.includes("copilot") || t.includes("automation")) return Bot;
  if (t.includes("workflow") || t.includes("tool") || t.includes("integration")) return Workflow;
  if (t.includes("eval") || t.includes("quality") || t.includes("assurance")) return Sparkles;
  if (t.includes("observability") || t.includes("monitor") || t.includes("trace")) return Activity;
  if (t.includes("governance") || t.includes("security") || t.includes("guardrail")) return ShieldCheck;
  if (t.includes("data") || t.includes("lakehouse") || t.includes("platform")) return Database;
  if (t.includes("metric") || t.includes("analytics") || t.includes("finops")) return BarChart3;
  if (t.includes("predict") || t.includes("forecast") || t.includes("classify")) return TrendingUp;
  if (t.includes("optimize") || t.includes("decision") || t.includes("control")) return Sliders;
  if (t.includes("product") || t.includes("experience") || t.includes("ux")) return Zap;
  return Brain;
}

/**
 * Standardized Capability & Feature Grid:
 * Matches the visual design system of CapabilitiesSection:
 * - Crisp white card surfaces on signature #E7EDF9 canvas
 * - Deep navy line icons (#0D244D) positioned prominently at top-left
 * - Bold Manrope typography (#0D306C) and slate description copy
 * - Bullet items with cyan dots
 * - Cyan action link with arrow on hover
 */
export default function AiCapabilityGrid({
  items,
  columns = 3,
}: AiCapabilityGridProps) {
  const colClass = COL_MAP[columns] || COL_MAP[3];

  return (
    <ul className={`grid gap-5 sm:gap-6 ${colClass} items-stretch max-w-7xl mx-auto list-none pl-0`}>
      {items.map((item) => {
        const IconComponent = resolveCapabilityIcon(item.title, item.icon);
        const isExternal = item.href?.startsWith("http");

        const cardContent = (
          <div className="flex flex-col h-full justify-between p-6 sm:p-7 rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-300 group">
            <div>
              {/* Top Navy Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#EDF3FB] border border-[#D2DCF0]/70 flex items-center justify-center text-[#0D244D] group-hover:text-[#169DC8] group-hover:bg-[#169DC8]/10 transition-colors mb-4">
                <IconComponent className="w-5 h-5 stroke-[1.8]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#0D306C] tracking-tight leading-snug mb-2.5 font-sans group-hover:text-[#008EC4] transition-colors">
                {item.title}
              </h3>

              {item.body && (
                <p className="text-xs sm:text-sm text-[#505D74] leading-relaxed mb-4 font-normal">
                  {item.body}
                </p>
              )}

              {item.items && item.items.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-none pl-0">
                  {item.items.map((entry) => (
                    <li key={entry} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#505D74] leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#169DC8] shrink-0 mt-1.5" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {item.href && (
              <div className="pt-4 border-t border-[#EDF3FB] flex items-center justify-between mt-auto">
                <span className="text-xs sm:text-[13px] font-semibold text-[#008EC4] group-hover:text-[#0D306C] transition-colors inline-flex items-center gap-1.5">
                  {item.linkLabel ?? `Explore ${item.title}`}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            )}
          </div>
        );

        return (
          <li key={item.title} className="h-full">
            {item.href ? (
              isExternal ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-2xl">
                  {cardContent}
                </a>
              ) : (
                <Link to={item.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-2xl">
                  {cardContent}
                </Link>
              )
            ) : (
              cardContent
            )}
          </li>
        );
      })}
    </ul>
  );
}
