"use client";

import React, { useState } from "react";

export interface ArchitectureLayer {
  name: string;
  purpose: string;
  items: string[];
}

/**
 * Standardized Stacked Production Architecture Component:
 * Matches the visual design system of OperatingArchitecture:
 * - Stacked numbered layers ("01" - "05") with interactive hover highlight
 * - Dark navy gradient card with subtle borders and ambient glow
 * - Monospace uppercase badge tags
 * - Responsive tag pills for architecture components
 */
export default function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ol className="space-y-3.5 max-w-5xl mx-auto list-none pl-0">
      {layers.map((layer, index) => {
        const isHovered = hoveredIndex === index;
        const num = String(index + 1).padStart(2, "0");

        return (
          <li
            key={layer.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`grid md:grid-cols-[260px_1fr] gap-4 md:gap-8 rounded-2xl p-6 md:p-7 border transition-all duration-300 ${
              isHovered
                ? "bg-[#0E2854] border-[#00C2FF]/60 shadow-[0_8px_30px_rgba(0,194,255,0.15)]"
                : "bg-[#0A224E]/80 border-white/10 hover:border-white/20 shadow-md"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xs font-mono font-bold uppercase tracking-[0.2em] text-[#00C2FF]">
                  LAYER {num}
                </span>
              </div>
              <h3 className="font-sans font-bold text-white text-lg md:text-xl leading-snug tracking-tight mb-2">
                {layer.name}
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-normal">
                {layer.purpose}
              </p>
            </div>

            <ul className="flex flex-wrap gap-2 content-center items-center list-none pl-0">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="text-xs text-white/95 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.07] font-medium tracking-tight hover:border-[#00C2FF]/50 hover:bg-[#00C2FF]/10 transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
