"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface LayerItem {
  label: string;
}

interface ArchitectureLayer {
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  items: LayerItem[];
  highlight?: boolean;
}

const LAYERS: ArchitectureLayer[] = [
  {
    num: "01",
    eyebrow: "Layer 1",
    title: "HQ strategy and control",
    desc: "Mandate, budget, product roadmap, IP, data and enterprise architecture stay at headquarters. The GCC exists to serve this agenda.",
    items: [
      { label: "Mandate" },
      { label: "Budget" },
      { label: "Product roadmap" },
      { label: "IP & data" },
      { label: "Enterprise architecture" },
      { label: "Executive governance" },
    ],
  },
  {
    num: "02",
    eyebrow: "Layer 2",
    title: "GCC leadership",
    desc: "Center and function leaders who run delivery, own local decisions within agreed limits and report to headquarters.",
    items: [
      { label: "Center leadership" },
      { label: "Function leaders" },
      { label: "Local decisioning" },
      { label: "Reporting" },
      { label: "Stakeholder alignment" },
      { label: "Execution management" },
    ],
  },
  {
    num: "03",
    eyebrow: "Layer 3",
    title: "NeoIntelli operating layer",
    desc: "The local scaffolding NeoIntelli operates so leadership can focus entirely on capability and outcomes rather than running the center.",
    items: [
      { label: "People" },
      { label: "Workforce" },
      { label: "Workplace / IT" },
      { label: "Service Management" },
      { label: "Governance" },
      { label: "Transition" },
    ],
    highlight: true,
  },
  {
    num: "04",
    eyebrow: "Layer 4",
    title: "GCC teams and capabilities",
    desc: "The capability the center exists to build. Owned by the client, staffed by the client's team, directed by the client's leadership.",
    items: [
      { label: "AI" },
      { label: "Data" },
      { label: "Engineering" },
      { label: "Product" },
      { label: "Operations" },
    ],
  },
];

export default function OperatingArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

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
              const index = Math.floor(progress * 4);
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
  }, []);

  return (
    <div ref={containerRef} className="w-full select-none">
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (3-Column Architecture: Left Info - Center 3D Stack - Right Items) */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-stretch max-w-7xl mx-auto">
        {/* LEFT COLUMN: Layer Numbers, Titles & Descriptions */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          {LAYERS.map((layer, idx) => {
            const isActive = activeLayer === idx;
            const isDimmed = isAnyActive && !isActive;

            return (
              <div
                key={layer.num}
                onMouseEnter={() => setHoveredLayer(idx)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`relative rounded-2xl p-5 xl:p-6 transition-all duration-300 cursor-pointer border ${
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
                      className={`text-3xl xl:text-4xl font-mono font-bold tracking-tighter transition-colors duration-200 ${
                        isActive && layer.highlight
                          ? "text-[#38BDF8]"
                          : isActive
                          ? "text-white"
                          : "text-white/50"
                      }`}
                    >
                      {layer.num}
                    </span>
                    <div
                      className={`w-[2px] h-8 mt-1 rounded-full transition-colors ${
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
                        {layer.eyebrow}
                      </span>
                      {layer.highlight && (
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider transition-colors ${
                            isActive
                              ? "bg-[#38BDF8] text-[#061530]"
                              : "bg-white/10 text-[#7DD3FC] border border-[#38BDF8]/30"
                          }`}
                        >
                          NeoIntelli Operated
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg xl:text-xl font-extrabold tracking-tight mb-2 transition-colors ${
                        isActive && layer.highlight
                          ? "text-white"
                          : "text-white"
                      }`}
                    >
                      {layer.title}
                    </h3>

                    <p className="text-xs xl:text-[13px] text-[#C5D7F0] leading-relaxed font-normal">
                      {layer.desc}
                    </p>
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
              <linearGradient id="isoTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E4D8C" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0F2F5E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#081E40" stopOpacity="0.9" />
              </linearGradient>

              {/* Gradient for Active / Hovered Layer */}
              <linearGradient id="isoActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#169DC8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0D306C" stopOpacity="0.95" />
              </linearGradient>

              {/* Highlight Gradient for NeoIntelli Layer 3 on Hover */}
              <linearGradient id="isoNeoIntelliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#0284C7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#082F49" stopOpacity="0.95" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 4 STACKED ISOMETRIC PLANES (No side guide lines, clean geometric architecture) */}
            {LAYERS.map((layer, idx) => {
              const y = 50 + idx * 125;
              const isActive = activeLayer === idx;
              const isLayer3 = layer.highlight;

              return (
                <g
                  key={layer.num}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  {/* Bottom Edge Thickness (3D extrusion slab) */}
                  {/* Left Side Thickness */}
                  <polygon
                    points={`35,${y + 45} 190,${y + 90} 190,${y + 104} 35,${y + 59}`}
                    fill={isActive ? "#0284C7" : "#0A244E"}
                    stroke={isActive ? (isLayer3 ? "#38BDF8" : "#67D5F7") : "#1E4882"}
                    strokeWidth="1.2"
                    className="transition-colors duration-300"
                  />
                  {/* Right Side Thickness */}
                  <polygon
                    points={`190,${y + 90} 345,${y + 45} 345,${y + 59} 190,${y + 104}`}
                    fill={isActive ? "#0369A1" : "#071B3B"}
                    stroke={isActive ? (isLayer3 ? "#38BDF8" : "#67D5F7") : "#1E4882"}
                    strokeWidth="1.2"
                    className="transition-colors duration-300"
                  />

                  {/* Top Isometric Diamond Face */}
                  <polygon
                    points={`190,${y} 345,${y + 45} 190,${y + 90} 35,${y + 45}`}
                    fill={
                      isActive
                        ? isLayer3
                          ? "url(#isoNeoIntelliGrad)"
                          : "url(#isoActiveGrad)"
                        : "url(#isoTopGrad)"
                    }
                    stroke={
                      isActive
                        ? isLayer3
                          ? "#38BDF8"
                          : "#67D5F7"
                        : "#38BDF8"
                    }
                    strokeWidth={isActive ? (isLayer3 ? "2.5" : "2.2") : "1.2"}
                    strokeOpacity={isActive ? "1" : "0.5"}
                    filter={isActive ? "url(#cyanGlow)" : undefined}
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
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          {LAYERS.map((layer, idx) => {
            const isActive = activeLayer === idx;
            const isDimmed = isAnyActive && !isActive;

            return (
              <div
                key={layer.num}
                onMouseEnter={() => setHoveredLayer(idx)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`relative rounded-2xl p-5 xl:p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-center ${
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {layer.items.map((item) => {
                    return (
                      <div
                        key={item.label}
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
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
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
        {LAYERS.map((layer, idx) => {
          const isActive = activeLayer === idx;

          return (
            <div
              key={layer.num}
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
                    {layer.num}
                  </span>
                  <div>
                    <span
                      className={`text-[10.5px] font-mono uppercase tracking-wider font-bold block ${
                        isActive && layer.highlight ? "text-[#38BDF8]" : "text-[#7DD3FC]"
                      }`}
                    >
                      {layer.eyebrow}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                      {layer.title}
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
                    NeoIntelli
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-[#C5D7F0] leading-relaxed mb-4">
                {layer.desc}
              </p>

              {/* Scope Items (Transparent with Arrow indicators) */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-2">
                {layer.items.map((item) => (
                  <div
                    key={item.label}
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
                      {item.label}
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
