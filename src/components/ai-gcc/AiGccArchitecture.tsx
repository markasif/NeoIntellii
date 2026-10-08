"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export interface ArchitectureLayer {
  name: string;
  items: string[];
  accent?: string;
  highlight?: boolean;
  badge?: string;
}

export const AI_GCC_LAYERS: ArchitectureLayer[] = [
  {
    name: "Business & Value",
    accent: "#169DC8",
    items: ["AI mandate", "Business outcomes", "Use cases", "Product ownership", "HQ alignment"],
  },
  {
    name: "People & Capability",
    accent: "#F59E0B",
    items: ["Leadership", "AI engineers", "ML engineers", "Data engineers", "MLOps", "Product", "Domain SMEs"],
  },
  {
    name: "AI Platform",
    accent: "#008EC4",
    items: ["Data", "Models", "RAG", "Agents", "GPU", "MLOps", "LLMOps", "AgentOps"],
    highlight: true,
  },
  {
    name: "GCC Foundation",
    accent: "#0D306C",
    items: ["Entity", "Hiring OS", "HR", "Payroll", "Workspace", "IT", "Security", "Compliance", "Governance"],
  },
];

/**
 * Modern four-layer AI GCC architecture blueprint:
 * Uses the exact flagship 3D isometric stack component design from OperatingArchitecture in GCC Operations:
 * - Left column: Layer numbers (01 - 04), Layer eyebrows, titles, and element tags
 * - Center column: 4-Layer 3D Floating Isometric Stack with SVG planes, thickness extrusions, internal grids, and hover illumination
 * - Right column: Layer scope items in a 2-column grid with ArrowRight icons
 * - Responsive mobile view with interactive layer cards
 * - Zero extra data added; zero current data removed
 */
export default function AiGccArchitecture({
  layers = AI_GCC_LAYERS,
}: {
  layers?: ArchitectureLayer[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const isFiveOrMore = layers.length >= 5;
  const startY = isFiveOrMore ? 30 : 50;
  const stepY = isFiveOrMore ? 104 : 125;
  const thickness = isFiveOrMore ? 10 : 14;

  // Active layer is driven by hover if hovered, otherwise by scroll position through the section
  const activeLayer = hoveredLayer !== null ? hoveredLayer : scrollActiveIndex;
  const isAnyActive = activeLayer !== null;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Before the section reaches viewing range
            if (rect.top > windowHeight * 0.75) {
              setScrollActiveIndex(null);
            } else if (rect.bottom < windowHeight * 0.15) {
              // After the section has scrolled past viewport
              setScrollActiveIndex(null);
            } else {
              // Section is within view: calculate smooth progression across the 4 layers
              const start = windowHeight * 0.75;
              const totalDistance = rect.height + windowHeight * 0.2;
              const progress = Math.max(0, Math.min(0.999, (start - rect.top) / totalDistance));
              const index = Math.floor(progress * layers.length);
              setScrollActiveIndex(index);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [layers.length]);

  return (
    <div ref={containerRef} className="w-full select-none" role="region" aria-label="AI GCC architecture blueprint">
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (3-Column Architecture: Left Info - Center 3D Stack - Right Items) */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-stretch max-w-7xl mx-auto">
        {/* LEFT COLUMN: Layer Numbers, Titles & Element Tags */}
        <div className={`lg:col-span-4 flex flex-col justify-between ${isFiveOrMore ? "space-y-3.5 xl:space-y-4" : "space-y-6"}`}>
          {layers.map((layer, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const isActive = activeLayer === idx;
            const isDimmed = isAnyActive && !isActive;

            return (
              <div
                key={layer.name}
                onMouseEnter={() => setHoveredLayer(idx)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`relative rounded-2xl ${
                  isFiveOrMore ? "p-4 xl:p-4.5" : "p-5 xl:p-6"
                } transition-all duration-300 cursor-pointer border ${
                  isActive && layer.highlight
                    ? "bg-[#0A2E66]/90 border-[#38BDF8] shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/50"
                    : isActive
                    ? "bg-white/10 border-white/40 shadow-lg"
                    : isDimmed
                    ? "bg-white/[0.03] border-white/10 opacity-60"
                    : "bg-white/[0.05] border-white/15 hover:border-white/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Big Monospace Number */}
                  <div className="shrink-0 flex flex-col items-center">
                    <span
                      className={`${
                        isFiveOrMore ? "text-2xl xl:text-3xl" : "text-3xl xl:text-4xl"
                      } font-mono font-bold tracking-tighter transition-colors duration-200 ${
                        isActive && layer.highlight
                          ? "text-[#38BDF8]"
                          : isActive
                          ? "text-white"
                          : "text-white/50"
                      }`}
                    >
                      {num}
                    </span>
                    <div
                      className={`w-[2px] ${isFiveOrMore ? "h-6" : "h-8"} mt-1 rounded-full transition-colors ${
                        isActive && layer.highlight
                          ? "bg-[#38BDF8]"
                          : isActive
                          ? "bg-white/60"
                          : "bg-white/20"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${
                          isActive && layer.highlight ? "text-[#38BDF8]" : "text-[#7DD3FC]"
                        }`}
                      >
                        LAYER {num}
                      </span>
                      {layer.highlight && (
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider transition-colors ${
                            isActive
                              ? "bg-[#38BDF8] text-[#061530]"
                              : "bg-white/10 text-[#7DD3FC] border border-[#38BDF8]/30"
                          }`}
                        >
                          {layer.badge || "Core Platform"}
                        </span>
                      )}
                    </div>

                    <h3 className={`${isFiveOrMore ? "text-base xl:text-lg" : "text-lg xl:text-xl"} font-extrabold tracking-tight mb-2 text-white`}>
                      {layer.name}
                    </h3>

                    {/* Element tag preview */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {layer.items.slice(0, 3).map((item) => (
                        <span key={item} className="text-[10.5px] px-2 py-0.5 rounded-sm bg-white/10 text-white/80 font-mono">
                          {item}
                        </span>
                      ))}
                      {layer.items.length > 3 && (
                        <span className="text-[10.5px] px-2 py-0.5 rounded-sm bg-white/5 text-[#7DD3FC] font-mono">
                          +{layer.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN: 4-Layer 3D Floating Isometric Stack Visualization */}
        <div className="lg:col-span-4 flex items-center justify-center relative">
          {/* Subtle central glow orb */}
          <div className="absolute inset-0 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />

          <svg
            viewBox="0 0 380 560"
            fill="none"
            className="w-full h-auto max-h-[600px] overflow-visible select-none drop-shadow-2xl"
          >
            <defs>
              {/* Gradients for Standard Layers */}
              <linearGradient id="isoTopGradAi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E4D8C" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0F2F5E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#081E40" stopOpacity="0.9" />
              </linearGradient>

              {/* Gradient for Active / Hovered Layer */}
              <linearGradient id="isoActiveGradAi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#169DC8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0D306C" stopOpacity="0.95" />
              </linearGradient>

              {/* Highlight Gradient for Platform Layer on Hover */}
              <linearGradient id="isoPlatformGradAi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#0284C7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#082F49" stopOpacity="0.95" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="cyanGlowAi" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* STACKED ISOMETRIC PLANES */}
            {layers.map((layer, idx) => {
              const y = startY + idx * stepY;
              const isActive = activeLayer === idx;
              const isHighlight = layer.highlight;

              return (
                <g
                  key={layer.name}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  {/* Left Side Thickness (3D extrusion slab) */}
                  <polygon
                    points={`35,${y + 45} 190,${y + 90} 190,${y + 90 + thickness} 35,${y + 45 + thickness}`}
                    fill={isActive ? "#0284C7" : "#0A244E"}
                    stroke={isActive ? (isHighlight ? "#38BDF8" : "#67D5F7") : "#1E4882"}
                    strokeWidth="1.2"
                    className="transition-colors duration-300"
                  />
                  {/* Right Side Thickness */}
                  <polygon
                    points={`190,${y + 90} 345,${y + 45} 345,${y + 45 + thickness} 190,${y + 90 + thickness}`}
                    fill={isActive ? "#0369A1" : "#071B3B"}
                    stroke={isActive ? (isHighlight ? "#38BDF8" : "#67D5F7") : "#1E4882"}
                    strokeWidth="1.2"
                    className="transition-colors duration-300"
                  />

                  {/* Top Isometric Diamond Face */}
                  <polygon
                    points={`190,${y} 345,${y + 45} 190,${y + 90} 35,${y + 45}`}
                    fill={
                      isActive
                        ? isHighlight
                          ? "url(#isoPlatformGradAi)"
                          : "url(#isoActiveGradAi)"
                        : "url(#isoTopGradAi)"
                    }
                    stroke={
                      isActive
                        ? isHighlight
                          ? "#38BDF8"
                          : "#67D5F7"
                        : "#38BDF8"
                    }
                    strokeWidth={isActive ? (isHighlight ? "2.5" : "2.2") : "1.2"}
                    strokeOpacity={isActive ? "1" : "0.5"}
                    filter={isActive ? "url(#cyanGlowAi)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Internal Grid Lines on Diamond Face */}
                  <line
                    x1="112"
                    y1={y + 22}
                    x2="268"
                    y2={y + 68}
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeOpacity={isActive ? "0.6" : "0.2"}
                  />
                  <line
                    x1="268"
                    y1={y + 22}
                    x2="112"
                    y2={y + 68}
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeOpacity={isActive ? "0.6" : "0.2"}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* RIGHT COLUMN: Layer Scope / Capability Items */}
        <div className={`lg:col-span-4 flex flex-col justify-between ${isFiveOrMore ? "space-y-3.5 xl:space-y-4" : "space-y-6"}`}>
          {layers.map((layer, idx) => {
            const isActive = activeLayer === idx;
            const isDimmed = isAnyActive && !isActive;

            return (
              <div
                key={layer.name}
                onMouseEnter={() => setHoveredLayer(idx)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`relative rounded-2xl ${
                  isFiveOrMore ? "p-4 xl:p-4.5" : "p-5 xl:p-6"
                } transition-all duration-300 cursor-pointer border flex flex-col justify-center ${
                  isActive && layer.highlight
                    ? "bg-[#0A2E66]/90 border-[#38BDF8] shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/50"
                    : isActive
                    ? "bg-white/10 border-white/40 shadow-lg"
                    : isDimmed
                    ? "bg-white/[0.03] border-white/10 opacity-60"
                    : "bg-white/[0.05] border-white/15 hover:border-white/30"
                }`}
              >
                {/* Capability Items (Transparent with Arrow indicators) */}
                <div className={`grid grid-cols-2 ${isFiveOrMore ? "gap-x-3 gap-y-1.5" : "gap-x-4 gap-y-2.5"}`}>
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 py-1 bg-transparent group/item"
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                          isActive
                            ? "text-[#38BDF8] translate-x-0.5"
                            : "text-[#38BDF8]/60"
                        }`}
                      />
                      <span
                        className={`text-xs xl:text-[13px] font-semibold leading-snug transition-colors ${
                          isActive ? "text-white" : "text-white/85"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET LAYOUT (Stacked Responsive 4-Layer Presentation Cards)     */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-4">
        {layers.map((layer, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          const isActive = activeLayer === idx;

          return (
            <div
              key={layer.name}
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                isActive && layer.highlight
                  ? "bg-gradient-to-br from-[#071F47] to-[#0D306C] border-[#38BDF8] shadow-[0_4px_24px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/40"
                  : isActive
                  ? "bg-white/10 border-white/35 shadow-lg"
                  : "bg-white/5 border-white/15"
              }`}
            >
              {/* Header with Monospace Numeral and Tags */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tighter transition-colors ${
                      isActive && layer.highlight
                        ? "text-[#38BDF8]"
                        : isActive
                        ? "text-white"
                        : "text-white/60"
                    }`}
                  >
                    {num}
                  </span>
                  <div>
                    <span
                      className={`text-[10.5px] font-mono uppercase tracking-wider font-bold block ${
                        isActive && layer.highlight ? "text-[#38BDF8]" : "text-[#7DD3FC]"
                      }`}
                    >
                      LAYER {num}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                      {layer.name}
                    </h3>
                  </div>
                </div>

                {layer.highlight && (
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-extrabold uppercase transition-colors ${
                      isActive
                        ? "bg-[#38BDF8] text-[#061530]"
                        : "bg-white/10 text-[#7DD3FC] border border-[#38BDF8]/30"
                    }`}
                  >
                    Platform
                  </span>
                )}
              </div>

              {/* Scope Items */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-2">
                {layer.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 py-1 bg-transparent"
                  >
                    <ArrowRight
                      className={`w-3 h-3 shrink-0 transition-all duration-200 ${
                        isActive ? "text-[#38BDF8] translate-x-0.5" : "text-[#38BDF8]/60"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium transition-colors ${
                        isActive ? "text-white" : "text-white/85"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
