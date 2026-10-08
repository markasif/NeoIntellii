"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface AlternatingStepItem {
  step: string;
  headline: string;
  timeline: string;
  desc: string;
  accent: string;
  image: string;
  href?: string;
  linkLabel?: string;
  icon?: LucideIcon;
}

export interface AlternatingStepListProps {
  items: AlternatingStepItem[];
  className?: string;
  /** Alt text prefix for the step images. */
  imageAltPrefix?: string;
}

/**
 * AlternatingStepList — numbered lifecycle steps laid out in alternating
 * image / text rows. Designed for the navy section theme (light typography on
 * a dark background) and reused across the home "Why NeoIntelli" section and
 * the Micro GCC deployment sequence.
 */
export default function AlternatingStepList({
  items,
  className = "",
  imageAltPrefix = "Step",
}: AlternatingStepListProps) {
  return (
    <ol className={`max-w-6xl mx-auto space-y-8 sm:space-y-12 list-none p-0 ${className}`}>
      {items.map((item, idx) => {
        const reverse = idx % 2 === 1;
        const Icon = item.icon;

        return (
          <li
            key={item.step}
            className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2 items-center text-left"
          >
            {/* Text column */}
            <div className={reverse ? "lg:order-2" : "lg:order-1"}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-9 h-9 rounded-full border flex items-center justify-center font-mono font-bold text-xs shrink-0"
                  style={{ borderColor: item.accent, color: item.accent }}
                >
                  {item.step}
                </span>
                {Icon && (
                  <Icon className="w-4 h-4 shrink-0" style={{ color: item.accent }} />
                )}
                <span
                  className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em]"
                  style={{ color: item.accent }}
                >
                  {item.timeline}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-white tracking-tight leading-tight mb-3 font-manrope">
                {item.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>

              {item.href && item.linkLabel && (
                <div className="mt-4">
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors group"
                  >
                    <span>{item.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Image column */}
            <div className={reverse ? "lg:order-1" : "lg:order-2"}>
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-lg">
                <img
                  src={item.image}
                  alt={`${imageAltPrefix} ${item.step}: ${item.headline}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061530]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
