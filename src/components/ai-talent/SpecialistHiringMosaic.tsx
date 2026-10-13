"use client";

import React, { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { AI_TALENT_PAGES, AiTalentPage } from "@/data/aiTalent";

export interface SpecialistCardItem {
  key: string;
  name: string;
  group?: string;
  path: string;
  anchor: string;
  summary: string;
  image?: string;
  icon?: LucideIcon;
}

export interface SpecialistHiringMosaicProps {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  pages?: SpecialistCardItem[];
  className?: string;
  showBadge?: boolean;
  showGroup?: boolean;
  showButton?: boolean;
}

const SPECIALIST_IMAGES: Record<string, string> = {
  aiml: "/images/ai-talent/aiml-recruitment.webp",
  genai: "/images/ai-talent/genai-agentic.webp",
  data: "/images/ai-talent/data-engineering.webp",
  mlops: "/images/ai-talent/mlops-platform.webp",
  leadership: "/images/ai-talent/ai-leadership.webp",
  hub: "/images/ai-talent/recruitment-hub.webp",
  academy: "/images/ai-talent/reskilling-academy.webp",
};

/**
 * Single-line action button with marquee shift on hover
 * ensuring the button NEVER wraps to two lines while revealing
 * the full text whenever the card/button is hovered.
 */
function SpecialistMarqueeButton({
  label,
  isCardHovered,
}: {
  label: string;
  isCardHovered: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState<number>(0);

  const measure = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const extra = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setShift(extra > 2 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    if (isCardHovered) {
      measure();
    }
  }, [isCardHovered, measure]);

  return (
    <span
      className="btn-cyan max-w-full inline-flex items-center justify-between gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-full whitespace-nowrap overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)] group-hover:bg-[#0D306C]"
      title={label}
    >
      <span
        ref={containerRef}
        className="relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left"
      >
        <span
          ref={textRef}
          className="inline-block whitespace-nowrap will-change-transform"
          style={{
            transform: isCardHovered && shift > 0 ? `translateX(-${shift + 6}px)` : "translateX(0px)",
            transition: isCardHovered && shift > 0
              ? `transform ${Math.max(0.8, shift * 0.02)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
              : "transform 0.35s ease-out",
          }}
        >
          {label}
        </span>
      </span>
      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
    </span>
  );
}

function SpecialistCard({
  card,
  idx,
  showBadge,
  showGroup,
  showButton,
}: {
  card: SpecialistCardItem;
  idx: number;
  showBadge: boolean;
  showGroup: boolean;
  showButton: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = card.image || SPECIALIST_IMAGES[card.key] || "/images/ai-talent/aiml-recruitment.webp";

  return (
    <motion.div
      key={card.key}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: idx * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-none shadow-md group min-h-[260px] sm:min-h-[280px] flex flex-col justify-end p-5 sm:p-6 border border-[#CBD7E8] bg-[#051329] transition-all duration-500 hover:shadow-xl text-left"
    >
      {/* Background Image with hover zoom */}
      <Image
        src={imgSrc}
        alt={card.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 rounded-none"
      />

      {/* Dark Gradient Overlay for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/85 to-[#051329]/20" />

      {/* Top Category Tag matching home page GCCCapabilitiesMosaic design */}
      {showBadge && (
        <div className="absolute top-2.5 sm:top-3 left-3.5 sm:left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#169DC8] text-white text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-xs">
            {showGroup && card.group && (
              <>
                <span>{card.group}</span>
                <span className="text-white/60">·</span>
              </>
            )}
            <span>{String(idx + 1).padStart(2, "0")}</span>
          </span>
        </div>
      )}

      {/* Entire card link wrapper (if path exists) */}
      {card.path && (
        <Link
          to={card.path}
          className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[#169DC8]"
          aria-label={card.anchor || card.name}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 space-y-2 text-left pointer-events-none w-full">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#67D5F7] transition-colors">
          {card.name}
        </h3>

        <p className="text-xs sm:text-[12.5px] text-[#D2DCF0]/85 leading-relaxed line-clamp-2 font-normal">
          {card.summary}
        </p>

        {/* Bottom Action Button - strictly ONE LINE with marquee reveal on hover */}
        {showButton && card.anchor && (
          <div className="pt-2 w-full max-w-full">
            <SpecialistMarqueeButton label={card.anchor} isCardHovered={isHovered} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * SpecialistHiringMosaic
 * Balanced editorial 3-column mosaic grid matching the exact visual style
 * of GenAiCapabilitiesMosaic in Generative AI:
 * - Top Left (Spans 2 columns on desktop): Eyebrow, Title & Lead text
 * - Top Right & Rows 2-3: 7 standard uniform-height cards filling all columns evenly
 * - Full-bleed photographic background with hover scale
 * - Dark architectural gradient overlay
 * - Role family badge, title, summary, and action link
 */
export default function SpecialistHiringMosaic({
  eyebrow = "Specialist hiring",
  title = "One page per role family, because the evaluation differs.",
  lead = "A GenAI engineer, an MLOps engineer and a data scientist are assessed on different evidence. Each page explains what the role owns, the production signals we look for, the resume signals that mislead and how we evaluate.",
  pages,
  className = "",
  showBadge = true,
  showGroup = true,
  showButton = true,
}: SpecialistHiringMosaicProps) {
  const items: SpecialistCardItem[] =
    pages ||
    AI_TALENT_PAGES.filter((p) => p.key !== "overview").map((p) => ({
      key: p.key,
      name: p.name,
      group: p.group,
      path: p.path,
      anchor: p.anchor,
      summary: p.summary,
      image: SPECIALIST_IMAGES[p.key] || "/images/ai-talent/aiml-recruitment.webp",
    }));

  return (
    <div className={`w-full select-none ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 items-stretch">
        {/* ================================================================= */}
        {/* TOP LEFT: Section Heading & Lead (Spans 2 columns on desktop)    */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 flex flex-col justify-center text-left py-4 sm:py-6 pr-0 lg:pr-8"
        >
          {eyebrow && (
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#008EC4] mb-3 block font-mono">
              {eyebrow}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#0D306C] tracking-tight leading-[1.18] mb-4">
            {title}
          </h2>

          {lead && (
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {lead}
            </p>
          )}
        </motion.div>

        {/* ================================================================= */}
        {/* 7 SPECIALIST CARDS: Uniform height cards matching GenAiMosaic    */}
        {/* ================================================================= */}
        {items.map((card, idx) => (
          <SpecialistCard
            key={card.key}
            card={card}
            idx={idx}
            showBadge={showBadge}
            showGroup={showGroup}
            showButton={showButton}
          />
        ))}
      </div>
    </div>
  );
}
