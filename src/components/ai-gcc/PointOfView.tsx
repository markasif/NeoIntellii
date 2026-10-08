"use client";

import React, { type ReactNode } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Editorial viewpoint callout matching the GCC Operations editorial callout system:
 * - Rich navy blue gradient with ambient glow
 * - Amber / Cyan uppercase tag
 * - Prominent quote mark accent
 * - Crisp Manrope typography
 */
interface PointOfViewProps {
  children: ReactNode;
  className?: string;
}

export default function PointOfView({ children, className = "" }: PointOfViewProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] border border-[#16427D]/60 p-6 sm:p-8 text-white shadow-lg shadow-[#081B3E]/15 text-left ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#169DC8]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#169DC8]/20 border border-[#169DC8]/40 flex items-center justify-center shrink-0 text-[#38BDF8] mt-1">
          <Quote className="w-5 h-5 rotate-180" />
        </div>

        <div>
          <span className="block text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
            OUR VIEW
          </span>
          <div className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm font-sans">
            {children}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
