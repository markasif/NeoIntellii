"use client";

import React from "react";
import {
  Compass,
  Layers,
  GitFork,
  Cpu,
  Building2,
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export interface HeroTrustItem {
  label: string;
  icon?: LucideIcon;
}

export interface HeroTrustMarqueeProps {
  items?: (string | HeroTrustItem)[];
  className?: string;
}

/** Maps common trust stat keywords to crisp navy-blue Lucide vector icons. */
function resolveIcon(label: string): LucideIcon {
  const lower = label.toLowerCase();
  if (lower.includes("senior") || lower.includes("lead")) return Compass;
  if (lower.includes("transparent") || lower.includes("model") || lower.includes("architecture")) return Layers;
  if (lower.includes("bot") || lower.includes("captive") || lower.includes("managed") || lower.includes("transfer") || lower.includes("path")) return GitFork;
  if (lower.includes("ai") || lower.includes("genai") || lower.includes("ml") || lower.includes("agent") || lower.includes("data") || lower.includes("engine") || lower.includes("tech")) return Cpu;
  if (lower.includes("bengaluru") || lower.includes("india") || lower.includes("center") || lower.includes("hub") || lower.includes("location")) return Building2;
  if (lower.includes("pod") || lower.includes("squad") || lower.includes("team") || lower.includes("specialist") || lower.includes("talent")) return Users;
  if (lower.includes("validation") || lower.includes("guarantee") || lower.includes("accountable") || lower.includes("audit")) return ShieldCheck;
  if (lower.includes("neohire") || lower.includes("os") || lower.includes("hiring")) return CheckCircle2;
  return Sparkles;
}

const DEFAULT_ITEMS: HeroTrustItem[] = [
  { label: "Senior-led operations", icon: Compass },
  { label: "Transparent operating model", icon: Layers },
  { label: "Managed → BOT → Captive path", icon: GitFork },
  { label: "AI/Data-ready talent engine", icon: Cpu },
  { label: "Bengaluru operating capability", icon: Building2 },
  { label: "NeoHireX-enabled hiring", icon: Sparkles },
];

/**
 * Trust marquee for every hero section — full-width navy bar styled exactly
 * like the home page hero marquee: scrolling cyan icons + labels with edge
 * fades, aligned with the hero heading.
 */
export default function HeroTrustMarquee({
  items = DEFAULT_ITEMS,
  className = "",
}: HeroTrustMarqueeProps) {
  const normalized: HeroTrustItem[] = items.map((item) => {
    if (typeof item === "string") {
      return { label: item, icon: resolveIcon(item) };
    }
    return { label: item.label, icon: item.icon ?? resolveIcon(item.label) };
  });

  if (normalized.length === 0) return null;

  return (
    <div
      className={`relative z-20 w-full select-none pointer-events-auto ${className}`}
      aria-label="Executive Trust Signals"
    >
      <div className="relative overflow-hidden border-y border-white/15 bg-gradient-to-r from-[#06122C]/95 via-[#081B3E]/90 to-[#06122C]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(4,18,43,0.35)]">
        {/* Top cyan accent line */}
        <div
          className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent"
          aria-hidden="true"
        />

        {/* Far-edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-6 z-10 bg-gradient-to-r from-[#06122C] to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-6 z-10 bg-gradient-to-l from-[#06122C] to-transparent"
          aria-hidden="true"
        />

        {/* Scrolling track — first item aligned to the heading line above */}
        <div className="flex w-max will-change-transform animate-hero-marquee items-center py-3 sm:py-3.5 pl-4 sm:pl-6 lg:pl-8">
          {[0, 1, 2].map((track) => (
            <div
              key={track}
              className="flex items-center shrink-0"
              aria-hidden={track === 0 ? undefined : true}
            >
              {normalized.map((item, idx) => {
                const Icon = item.icon ?? Sparkles;
                return (
                  <div
                    key={`t${track}-${idx}`}
                    className="flex items-center gap-2.5 mr-6 sm:mr-10 shrink-0"
                  >
                    <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11.5px] lg:text-xs font-bold text-white/95 whitespace-nowrap tracking-tight sm:tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[#38BDF8]/70 text-xs" aria-hidden="true">
                      •
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}