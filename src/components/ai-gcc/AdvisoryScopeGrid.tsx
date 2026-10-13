"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ScopeStandardItem {
  title: string;
  body?: string;
  desc?: string;
  image?: string;
}

export interface AdvisoryScopeGridProps {
  items: ScopeStandardItem[];
  className?: string;
}

/**
 * AdvisoryScopeGrid - Displays AI GCC Scope & Capabilities in the
 * exact visual treatment of Operational Standards from GCC Operations Workplace IT & Security:
 * - 4-column responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop)
 * - 16:10 aspect ratio rounded images with smooth hover scale
 * - Bold navy title (#0D306C) transitioning to cyan (#008EC4) on hover
 * - High readability description copy in #505D74
 */
export default function AdvisoryScopeGrid({
  items,
  className = "",
}: AdvisoryScopeGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 ${className}`}
    >
      {items.map((item, index) => {
        const text = item.body ?? item.desc ?? "";
        const imageSrc =
          item.image ||
          "/images/services/ai-gcc/advisory/ai-maturity-assessment.webp";

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.06,
            }}
            className="group flex flex-col text-left select-none"
          >
            {/* 1. Rectangle Image on Top */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3.5 border border-[#DCE7F6] bg-[#071D42]/60 shadow-[0_4px_20px_rgba(13,48,108,0.08)] group-hover:border-[#169DC8]/60 group-hover:shadow-[0_8px_25px_rgba(22,157,200,0.15)] transition-all duration-300">
              <Image
                src={imageSrc}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* 2. Heading Below Image */}
            <h3 className="font-extrabold text-[16px] sm:text-[17.5px] leading-snug tracking-tight text-[#0D306C] group-hover:text-[#008EC4] transition-colors mb-2">
              {item.title}
            </h3>

            {/* 3. Description Below Heading */}
            <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed font-normal">
              {text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
