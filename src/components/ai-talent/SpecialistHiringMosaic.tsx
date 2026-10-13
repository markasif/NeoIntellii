"use client";

import React, { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Boxes,
  Brain,
  Database,
  GraduationCap,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { AI_TALENT_PAGES } from "@/data/aiTalent";

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
  /** Kept for API compatibility; cards now use the creative no-photo surface. */
  showBadge?: boolean;
  showGroup?: boolean;
  showButton?: boolean;
}

/** Maps a specialist role family to a crisp navy/cyan line icon for the card tile. */
function resolveIcon(card: SpecialistCardItem): LucideIcon {
  if (card.icon) return card.icon;
  const k = (card.key || "").toLowerCase();
  const t = (card.name || "").toLowerCase();
  if (k.includes("aiml") || t.includes("ml engineer") || t.includes("ml ")) return Brain;
  if (k.includes("genai") || t.includes("genai") || t.includes("agent")) return Sparkles;
  if (k.includes("data") || k.includes("analyst") || t.includes("data")) return Database;
  if (k.includes("mlops") || k.includes("platform") || t.includes("mlops")) return Workflow;
  if (k.includes("leadership") || t.includes("leader") || t.includes("head")) return Users;
  if (k.includes("hub") || k.includes("recruitment")) return Boxes;
  if (k.includes("academy") || t.includes("reskill") || t.includes("academy")) return GraduationCap;
  return Bot;
}

/**
 * Home-Industries style underlined cyan link with arrow:
 * single line, fade-truncated when it does not fit; on hover the full text
 * slides in to reveal the remainder.
 */
function SpecialistUnderlineLink({
  label,
  isCardHovered,
}: {
  label: string;
  isCardHovered: boolean;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [overflowShift, setOverflowShift] = useState(0);

  const measure = useCallback(() => {
    const label = labelRef.current;
    const wrap = wrapRef.current;
    if (label && wrap) {
      const extra = label.scrollWidth - wrap.clientWidth;
      setOverflowShift(extra > 2 ? extra : 0);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const truncated = overflowShift > 0;
  const revealed = isCardHovered && truncated;

  return (
    <span className="max-w-full min-w-0 inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[#38BDF8] uppercase tracking-wide pb-0.5 border-b border-[#38BDF8]/80 transition-colors">
      <span
        ref={wrapRef}
        className={`relative block min-w-0 flex-1 overflow-hidden whitespace-nowrap ${
          truncated && !revealed
            ? "[mask-image:linear-gradient(to_right,black_calc(100%-16px),transparent_100%)]"
            : ""
        }`}
      >
        <span
          ref={labelRef}
          className="inline-block will-change-transform"
          style={{
            transform: revealed ? `translateX(-${overflowShift + 6}px)` : "translateX(0px)",
            transition: revealed
              ? `transform ${Math.max(0.5, overflowShift * 0.012)}s cubic-bezier(0.2, 0.8, 0.4, 1)`
              : "transform 0.3s ease-out",
          }}
        >
          {label}
        </span>
      </span>
      <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200" />
    </span>
  );
}

function SpecialistCard({
  card,
  idx,
  showButton,
}: {
  card: SpecialistCardItem;
  idx: number;
  showButton: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = resolveIcon(card);

  return (
    <motion.div
      key={card.key}
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(idx * 0.09, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-none shadow-md group min-h-[210px] sm:min-h-[220px] flex flex-col justify-start p-5 sm:p-6 border border-[#CBD7E8] bg-[#0D244D] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-left"
    >
      {/* ── Creative surface (brand navy + amber accents, no photos) ── */}
      {/* Top cyan hairline accent, brightens and grows on hover */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#169DC8] via-[#38BDF8] to-transparent opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:h-[4px]" />
      {/* Corner glow */}
      <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[#169DC8]/25 blur-3xl transition-all duration-500 group-hover:bg-[#38BDF8]/40" />
      {/* Soft amber glow (top-right) */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F19326]/15 blur-3xl transition-all duration-500 group-hover:bg-[#F19326]/25" />
      {/* Faint engineering grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background-image:linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] [background-size:30px_30px]" />
      {/* Amber corner brackets (top-right, open inward) */}
      <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none">
        <span className="absolute top-0 left-0 w-7 h-[2px] bg-[#F19326]/70 transition-all duration-500 group-hover:w-9 group-hover:bg-[#F19326]" />
        <span className="absolute top-0 right-0 w-[2px] h-7 bg-[#F19326]/70 transition-all duration-500 group-hover:h-9 group-hover:bg-[#F19326]" />
      </div>

      {/* Entire card link wrapper (if path exists) */}
      {card.path && (
        <Link
          to={card.path}
          className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          aria-label={card.anchor || card.name}
        />
      )}

      {/* Icon tile */}
      <div className="relative z-10 mb-3 w-11 h-11 flex items-center justify-center border border-[#38BDF8]/35 bg-[#061530]/45 transition-all duration-500 group-hover:border-[#38BDF8]/70 group-hover:bg-[#061530]/70">
        <Icon
          className="w-5 h-5 text-[#67D5F7] transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.8}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 space-y-1.5 text-left pointer-events-none w-full flex-1">
        {/* Amber bar slides in above the title on hover */}
        <span className="block h-[3px] w-0 bg-[#F19326] transition-all duration-500 group-hover:w-10 mb-2" />

        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#67D5F7] transition-colors">
          {card.name}
        </h3>

        <p className="text-xs sm:text-[12.5px] text-[#D2DCF0]/85 leading-relaxed line-clamp-2 font-normal">
          {card.summary}
        </p>

        {/* Bottom Action Link - home-Industries underlined cyan style */}
        {showButton && card.anchor && (
          <div className="pt-3 w-full max-w-full">
            <SpecialistUnderlineLink label={card.anchor} isCardHovered={isHovered} />
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
 * - Top Right & Rows 2-3: 7 uniform-height cards filling all columns evenly
 * - Photography-free creative navy surface with cyan + amber accents
 * - Line-icon tile, role family title + summary, and an underlined cyan link
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
    }));

  return (
    <div className={`w-full select-none ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 items-stretch">
        {/* ================================================================= */}
        {/* TOP LEFT: Section Heading & Lead (Spans 2 columns on desktop)    */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          <SpecialistCard key={card.key} card={card} idx={idx} showButton={showButton} />
        ))}
      </div>
    </div>
  );
}