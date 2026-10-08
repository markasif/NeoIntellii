"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SourceNote from "@/components/gcc-operations/SourceNote";
import { accentActionButtonClass } from "@/components/shared/actionButtonStyles";

/**
 * Universal editorial card grid.
 *
 * This is the single component behind the "Outcome Framework" style card grid
 * used across GCC Operations, AI GCC, AI Talent, AI Delivery Teams, Micro GCC
 * and the About page. It reproduces the existing design exactly while accepting
 * every variation the current implementations use:
 *  - sharp or rounded image headers with optional badge tag
 *  - staggered aspect ratios per card
 *  - optional eyebrow tag and numeric title prefix
 *  - summary paragraph and cyan lead line
 *  - labelled or plain bullet lists (solid / muted)
 *  - "Includes" pill rows
 *  - cyan button link or inline text link
 *  - optional advisory source note
 *
 * Content always comes from the caller; the component only owns presentation.
 */

export interface OutcomeCardListItem {
  /** Optional monospace uppercase label rendered above the list. */
  label?: string;
  items: string[];
  /**
   * "solid"  → semibold navy text with cyan dot (Outcome Framework default)
   * "muted"  → slate text with top-aligned cyan dot (delivery model cards)
   */
  variant?: "solid" | "muted";
  /** Optional extra classes for the list element. */
  className?: string;
}

export interface OutcomeCardItem {
  title: string;
  badge?: string;
  /** Small monospace uppercase tag above the title. */
  tag?: string;
  /** Numeric prefix rendered before the title, e.g. "01". */
  number?: string;
  image?: string;
  alt?: string;
  aspect?: string;
  /** Primary description paragraph. */
  summary?: string;
  /** Cyan lead line shown directly under the title. */
  lead?: string;
  lists?: OutcomeCardListItem[];
  /** Pill row rendered under an "Includes" label. */
  includes?: string[];
  /** Internal route or anchor/href for the action. */
  link?: string;
  cta?: { label: string; href: string };
  actionText?: string;
  /** "button" (default) renders the cyan button; "text" renders an inline link. */
  linkVariant?: "button" | "text";
  icon?: React.ComponentType<{ className?: string }>;
}

export interface OutcomeCardGridProps {
  items: OutcomeCardItem[];
  columns?: 2 | 3 | 4;
  /** Image corner rounding, e.g. "rounded-2xl". Defaults to sharp corners. */
  imageRounded?: string;
  showSourceNote?: boolean;
  sourceNote?: string;
  className?: string;
  /** Wrap the grid in a centred max-width container. */
  maxWidthClassName?: string;
  /** "lg" (default) matches Outcome Framework headings; "md" the smaller variant. */
  titleSize?: "md" | "lg";
  /** "accent" (default) uses the solid cyan button; "gradient" the .btn-gradient pill; "cyan" the .btn-cyan pill. */
  ctaButtonVariant?: "accent" | "gradient" | "cyan";
  /** Place the CTA directly after the list content instead of pinning it to the card bottom. */
  ctaAfterContent?: boolean;
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

function isPlainLink(href: string): boolean {
  return href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function OutcomeCardGrid({
  items,
  columns,
  imageRounded,
  showSourceNote = false,
  sourceNote,
  className = "",
  maxWidthClassName = "",
  titleSize = "lg",
  ctaButtonVariant = "accent",
  ctaAfterContent = false,
}: OutcomeCardGridProps) {
  const ctaClass =
    ctaButtonVariant === "gradient"
      ? "inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-br from-[#169DC8] to-[#0D306C] text-white text-[12px] font-bold tracking-wide whitespace-nowrap transition-all duration-200 shadow-xs hover:gap-2.5 hover:shadow-[0_0_22px_rgba(22,157,200,0.55),0_4px_16px_rgba(13,48,108,0.3)]"
      : ctaButtonVariant === "cyan"
        ? "btn-cyan whitespace-nowrap"
        : accentActionButtonClass;
  const effectiveColumns: 2 | 3 | 4 =
    columns || (items.length === 3 ? 3 : items.length === 2 ? 2 : 4);
  const gridColsClass = GRID_COLS[effectiveColumns] || GRID_COLS[4];
  const titleClass =
    titleSize === "md"
      ? "text-lg sm:text-[21px]"
      : "text-xl sm:text-[22px]";

  const content = (
    <div className={`grid gap-6 sm:gap-7 lg:gap-8 ${gridColsClass} items-start ${className}`}>
      {items.map((item, idx) => {
        const aspect = item.aspect || (idx % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]");
        const action = item.cta || (item.link ? { label: item.actionText || "Explore", href: item.link } : undefined);

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col group bg-transparent border-0 shadow-none text-left h-full"
          >
            {/* Image header */}
            {item.image && (
              <div
                className={`relative w-full ${aspect} overflow-hidden shadow-[0_6px_20px_rgba(13,48,108,0.1)] group-hover:shadow-[0_12px_28px_rgba(13,48,108,0.18)] transition-all duration-300 bg-[#0A1D42]`}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-[#0D244D]/85 backdrop-blur-xs text-white text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 uppercase">
                    {item.badge}
                  </div>
                )}
              </div>
            )}

            {/* Editorial content */}
            <div className="pt-4 sm:pt-5 flex flex-col flex-1 text-left">
              {item.tag && (
                <span className="text-[11px] font-mono font-bold text-[#008EC4] tracking-wider uppercase block mb-1.5">
                  {item.tag}
                </span>
              )}

              <h3
                className={`text-[#0D306C] font-extrabold ${titleClass} tracking-tight mb-2 leading-snug group-hover:text-[#008EC4] transition-colors flex items-baseline gap-2`}
              >
                {item.number && (
                  <span className="text-[#00A3E0] font-mono font-bold text-base sm:text-lg shrink-0">
                    {item.number}
                  </span>
                )}
                <span>{item.title}</span>
              </h3>

              {item.lead && (
                <p className="text-xs sm:text-[13px] text-[#008EC4] font-semibold leading-relaxed mb-3">
                  {item.lead}
                </p>
              )}

              {item.summary && (
                <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-3.5 font-normal">
                  {item.summary}
                </p>
              )}

              {item.lists?.map((list, listIdx) => {
                const muted = list.variant === "muted";
                return (
                  <React.Fragment key={`${item.title}-list-${listIdx}`}>
                    {list.label && (
                      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] mb-2 font-mono text-[#008EC4]">
                        {list.label}
                      </span>
                    )}
                    <ul
                      className={`${muted ? (ctaAfterContent ? "space-y-2 mb-5" : "space-y-2 mb-5 flex-1") : "space-y-2 mb-4"} list-none p-0 m-0 ${list.className || ""}`}
                    >
                      {list.items.map((point) => (
                        <li
                          key={point}
                          className={
                            muted
                              ? "flex items-start gap-2 text-xs sm:text-[12.5px] text-[#505D74] leading-relaxed"
                              : "flex items-center gap-2 text-xs sm:text-[12.5px] text-[#2B3D66]"
                          }
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-[#00A3E0] shrink-0 ${muted ? "mt-1" : ""}`}
                            aria-hidden="true"
                          />
                          <span className={muted ? "font-normal" : "font-semibold"}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                );
              })}

              {item.includes && item.includes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] font-mono text-[#008EC4]">
                      Includes
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#D5E2F3] to-transparent" aria-hidden="true" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.includes.map((inc) => (
                      <span
                        key={inc}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] sm:text-xs font-semibold text-[#0D306C] border border-[#00A3E0] transition-all duration-200 select-none group/pill"
                      >
                        <span>{inc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {action && (
                <div className={ctaAfterContent ? "pt-2" : item.linkVariant === "text" ? "mt-auto" : "pt-2 mt-auto"}>
                  {item.linkVariant === "text" ? (
                    isPlainLink(action.href) ? (
                      <a
                        href={action.href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008EC4] hover:text-[#0D306C] transition-colors group/link"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        to={action.href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008EC4] hover:text-[#0D306C] transition-colors group/link"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    )
                  ) : isPlainLink(action.href) ? (
                    <a
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={ctaClass}
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={action.href}
                      className={ctaClass}
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="overflow-hidden py-1">
      {maxWidthClassName ? <div className={maxWidthClassName}>{content}</div> : content}

      {showSourceNote && (
        <SourceNote className="mt-10 text-center max-w-3xl mx-auto">
          {sourceNote ||
            "Target values are agreed per center in the operating model. NeoIntelli does not publish universal benchmark values for these measures because they depend on mandate, function mix and maturity."}
        </SourceNote>
      )}
    </div>
  );
}
