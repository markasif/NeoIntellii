"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Answer {
  question: string;
  /** One or two sentence direct answer. */
  answer: string;
  /** Optional expansion paragraphs rendered after the direct answer. */
  detail?: string[];
}

interface AnswerBlockProps {
  items: Answer[];
  /** h2 when the block is a top-level section, h3 when it sits under a section heading. */
  level?: 2 | 3;
}

/**
 * Accessible FAQ accordion for AI GCC pages:
 * Matches AnswerList and Home Page FAQ styling:
 * - Rounded-2xl card on #E7EDF9 canvas with subtle border and elevation
 * - Chevron indicator with cyan background when expanded
 * - Direct answers displayed first with optional detail paragraphs
 */
export default function AnswerBlock({ items, level = 3 }: AnswerBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
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
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#505D74] leading-relaxed border-t border-[#D2DCF0]/50 pt-3 sm:pt-4 space-y-2.5">
                    <p className="font-medium text-[#2B3D66]">{item.answer}</p>
                    {item.detail?.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
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
