"use client";

import React, { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { GccOpsFaq } from "@/data/gccOperationsContent";
import SectionHeader from "@/components/ui/SectionHeader";

interface AnswerListProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  items: GccOpsFaq[];
  tone?: "white" | "muted";
  align?: "left" | "center";
}

const paragraphs = (text: string) => text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);

/**
 * FAQ accordion matching the exact visual design, typography and motion of the Home Page FAQ.
 * Direct answers first. Accessible semantic heading tags and structured schema compliance.
 */
export default function AnswerList({
  id = "answers",
  eyebrow = "COMMON INQUIRIES & ANSWERS",
  title,
  intro,
  items,
  align = "center",
}: AnswerListProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative scroll-mt-32 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 bg-transparent overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={intro}
          align={align}
          variant="cyan"
          className="!mb-6 sm:!mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-4"
        >
          {items.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-[#E2EDF5] bg-white transition-all overflow-hidden shadow-sm hover:border-[#169DC8]/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8]"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-[#2B3D66] pr-3 sm:pr-4">
                    {item.q}
                  </h3>
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#E2EDF5] transition-transform duration-200 ${
                      isOpen ? "bg-[#169DC8] text-white rotate-180" : "bg-slate-50 text-[#536485]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#536485] leading-relaxed border-t border-[#E2EDF5] pt-3 sm:pt-4 space-y-2.5">
                    {paragraphs(item.a).map((part, pIdx) => (
                      <p key={pIdx}>{part}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
