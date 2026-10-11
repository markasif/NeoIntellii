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
 * Premium Glass Marquee Pill for the home page hero:
 * Navy/cyan glass treatment matching the site's hero system, with crisp
 * cyan icons + uppercase white labels and a seamless infinite loop.
 */
export default function HeroLifecycleMarquee({
  className = "",
  items = DEFAULT_ITEMS,
}: HeroLifecycleMarqueeProps) {
  return (
    <div
      className={`relative z-20 w-full py-2 sm:py-2.5 lg:py-3.5 pb-3 sm:pb-5 px-4 select-none pointer-events-auto ${className}`}
      aria-label="NeoIntelli Capability Lifecycle"
    >
      <div className="mx-auto max-w-4xl sm:max-w-5xl">
        <div className="relative overflow-hidden rounded-full border border-white/15 bg-white/10 backdrop-blur-md py-2 sm:py-2.5 px-3 sm:px-6 shadow-[0_8px_30px_rgba(4,18,43,0.35),0_0_30px_rgba(56,189,248,0.2)]">
          {/* Edge gradient masks */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-[#071F4F] via-[#071F4F]/70 to-transparent rounded-l-full"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-[#071F4F] via-[#071F4F]/70 to-transparent rounded-r-full"
            aria-hidden="true"
          />

          {/* Marquee tracks */}
          <div className="flex w-max will-change-transform animate-hero-marquee items-center">
            {[0, 1, 2].map((track) => (
              <div
                key={track}
                className="flex items-center gap-6 sm:gap-9 pr-6 sm:pr-9 shrink-0"
                aria-hidden={track === 0 ? undefined : true}
              >
                {items.map((item, idx) => {
                  const Icon = item.icon ?? Sparkles;
                  return (
                    <div key={`t${track}-${idx}`} className="flex items-center gap-2.5 shrink-0">
                      <Icon className="w-4 h-4 text-[#38BDF8] shrink-0" aria-hidden="true" />
                      <span className="text-[10px] sm:text-[11.5px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-white/95 whitespace-nowrap">
                        {item.label}
                      </span>
                      <span className="text-[#38BDF8]/70 text-xs sm:text-sm" aria-hidden="true">
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