"use client";

import React from "react";
import {
  Compass,
  Users,
  Cpu,
  Rocket,
  Settings2,
  GitFork,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface HeroLifecycleMarqueeProps {
  className?: string;
  items?: { label: string; icon?: LucideIcon }[];
}

const DEFAULT_ITEMS = [
  { label: "STRATEGY", icon: Compass },
  { label: "TALENT", icon: Users },
  { label: "AI ENGINEERING", icon: Cpu },
  { label: "DELIVERY", icon: Rocket },
  { label: "OPERATIONS", icon: Settings2 },
  { label: "BOT", icon: GitFork },
];

/**
 * Full-screen-width navy marquee bar for the home hero.
 * Items are plain cyan icons + uppercase labels (no chip/pill wrapper),
 * matching the trust marquee used on the industry/hero sections. The first
 * item starts on the same line as the hero heading above.
 */
export default function HeroLifecycleMarquee({
  className = "",
  items = DEFAULT_ITEMS,
}: HeroLifecycleMarqueeProps) {
  return (
    <div
      className={`relative z-20 w-full select-none pointer-events-auto ${className}`}
      aria-label="NeoIntelli Capability Lifecycle"
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
              {items.map((item, idx) => {
                const Icon = item.icon ?? Sparkles;
                return (
                  <div
                    key={`t${track}-${idx}`}
                    className="flex items-center gap-2.5 mr-6 sm:mr-10 shrink-0"
                  >
                    <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11.5px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-white/95 whitespace-nowrap">
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