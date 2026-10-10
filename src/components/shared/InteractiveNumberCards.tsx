"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface InteractiveNumberCardItem {
  title: string;
  desc: string;
  /** Optional background image for the active card (duotone wash applied). */
  image?: string;
  imageAlt?: string;
}

export interface InteractiveNumberCardsProps {
  items: InteractiveNumberCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Interactive numbered cards matching the AI GCC "Scale, BOT & Ownership"
 * design: a big number, dotted track, title and description per card, with the
 * hovered/active card lifting to a dark duotone panel with light typography.
 * No per-card CTA button.
 */
export default function InteractiveNumberCards({
  items,
  columns = 4,
  className = "",
}: InteractiveNumberCardsProps) {
  const [active, setActive] = useState(0);

  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-5 lg:gap-8 items-stretch pt-2 sm:pt-4 ${className}`}>
      {items.map((item, index) => {
        const isActive = active === index;
        const num = String(index + 1).padStart(2, "0");

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
            className={`relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
              isActive
                ? "lg:-my-8 lg:py-14 scale-[1.01] lg:scale-[1.02] shadow-xl lg:shadow-none text-white z-20 overflow-hidden"
                : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent"
            }`}
          >
            {/* Active state background */}
            {isActive && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                    <div className="absolute inset-0 bg-cyan-600/15" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0C3262] via-[#08234B] to-[#051836]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/40 to-[#0E7490]/25" />
                  </>
                )}
              </div>
            )}

            <div className="relative z-10 text-left">
              <div className="flex items-center justify-between leading-none">
                <span
                  className={`text-6xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-none transition-colors duration-300 select-none ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {num}
                </span>
              </div>

              <div
                className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                  isActive ? "border-white/60" : "border-slate-300"
                }`}
              />

              <h3
                className={`text-2xl sm:text-[26px] font-bold tracking-tight mb-3 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`text-xs sm:text-[13px] leading-relaxed font-normal transition-colors duration-300 ${
                  isActive ? "text-slate-100" : "text-slate-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
