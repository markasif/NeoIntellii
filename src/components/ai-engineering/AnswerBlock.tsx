"use client";

import React, { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AnswerItem {
  question: string;
  answer: string;
  detail?: string[];
  bullets?: string[];
  children?: ReactNode;
}

interface AnswerBlockProps {
  id?: string;
  question?: string;
  answer?: string;
  detail?: string[];
  bullets?: string[];
  level?: 2 | 3;
  children?: ReactNode;
  items?: AnswerItem[];
}

/**
 * Standardized Answer-First Accordion Block for Enterprise AI Engineering:
 * Matches the visual design system of AiGcc AnswerBlock:
 * - Rounded-2xl card on #E7EDF9 canvas with subtle border and elevation
 * - Chevron indicator with cyan background when expanded
 * - Direct answers displayed first with optional detail paragraphs and bullet lists
 * - Supports both single-item and multi-item invocations
 */
export default function AnswerBlock({
  id,
  question,
  answer,
  detail = [],
  bullets = [],
  level = 3,
  children,
  items: itemsProp,
}: AnswerBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const Heading = level === 2 ? "h2" : "h3";

  // Normalize single-item invocation or list invocation
  const items: AnswerItem[] = itemsProp ?? (
    question && answer ? [{ question, answer, detail, bullets, children }] : []
  );

  return (
    <div id={id} className="space-y-3 sm:space-y-4 max-w-4xl mx-auto w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="rounded-2xl border border-[#D2DCF0]/80 bg-white/95 backdrop-blur-sm transition-all overflow-hidden shadow-xs hover:border-[#169DC8]/40 hover:shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8]"
            >
              <Heading className="text-sm sm:text-base md:text-lg font-bold text-[#0D306C] pr-3 sm:pr-4 tracking-tight leading-snug">
                {item.question}
              </Heading>
              <div
                className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#D2DCF0] transition-all duration-300 ${
                  isOpen
                    ? "bg-[#169DC8] text-white rotate-180 border-[#169DC8]"
                    : "bg-[#EDF3FB] text-[#505D74]"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#505D74] leading-relaxed border-t border-[#EDF3FB] pt-3 sm:pt-4">
                    <p className="font-semibold text-[#0D306C] mb-2 sm:mb-2.5 text-sm sm:text-base">
                      {item.answer}
                    </p>
                    {item.detail?.map((p, idx) => (
                      <p key={idx} className="mt-2 text-[#505D74] text-xs sm:text-sm leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5 list-none pl-0">
                        {item.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#505D74]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#169DC8] shrink-0 mt-1.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.children && <div className="mt-3">{item.children}</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
