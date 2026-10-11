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
  LucideIcon,
} from "lucide-react";

export interface HeroTrustItem {
  label: string;
  icon?: LucideIcon;
}

export interface HeroTrustMarqueeProps {
  items?: (string | HeroTrustItem)[];
  className?: string;
}

/**
 * Maps common trust stat keywords to crisp navy blue Lucide vector icons.
 */
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
 * Mobile-first movable trust marquee for service heroes.
 * - Displays stats (Senior-led, Transparent operating model, etc.)
 * - Logos/Icons are Navy Blue (#0D306C) directly inline WITHOUT ANY enclosing wrapper div
 * - Smooth infinite CSS-accelerated marquee scrolling
 */
export default function HeroTrustMarquee({
  items = DEFAULT_ITEMS,
  className = "",
}: HeroTrustMarqueeProps) {
  const normalized: HeroTrustItem[] = items.map((item) => {
    if (typeof item === "string") {
      return {
        label: item,
        icon: resolveIcon(item),
      };
    }
    return {
      label: item.label,
      icon: item.icon ?? resolveIcon(item.label),
    };
  });

  if (normalized.length === 0) return null;

  return (
    <div
      className={`relative w-full px-4 py-2 select-none pointer-events-auto ${className}`}
      aria-label="Executive Trust Signals"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-full border border-white/15 bg-white/10 backdrop-blur-md py-2 px-3 sm:px-6 shadow-[0_8px_30px_rgba(4,18,43,0.35)]">
          {/* Edge gradient masks */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-14 z-10 bg-gradient-to-r from-[#071F4F] via-[#071F4F]/70 to-transparent rounded-l-full"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 z-10 bg-gradient-to-l from-[#071F4F] via-[#071F4F]/70 to-transparent rounded-r-full"
            aria-hidden="true"
          />

          {/* Marquee tracks */}
          <div className="flex w-max will-change-transform animate-hero-marquee items-center">
            {[0, 1].map((track) => (
              <div
                key={track}
                className="flex items-center gap-6 sm:gap-9 pr-6 sm:pr-9 shrink-0"
                aria-hidden={track === 0 ? undefined : true}
              >
                {normalized.map((item, idx) => {
                  const Icon = item.icon ?? Sparkles;
                  return (
                    <div key={`t${track}-${idx}`} className="flex items-center gap-2 shrink-0">
                      <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" aria-hidden="true" />
                      <span className="text-[11.5px] sm:text-xs font-bold text-white/95 whitespace-nowrap tracking-tight">
                        {item.label}
                      </span>
                      <span className="text-[#38BDF8]/60 text-xs ml-2" aria-hidden="true">
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
    </div>
  );
}
