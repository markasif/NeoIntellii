"use client";

import React, { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RoleGroup } from "@/data/aiTalent";

interface RoleMatrixProps {
  groups: RoleGroup[];
  defaultGroupIndex?: number;
}

export default function RoleMatrix({ groups, defaultGroupIndex = 0 }: RoleMatrixProps) {
  // Each box can expand and un-expand by clicking plus and minus; first box expanded by default
  const [expandedIndices, setExpandedIndices] = useState<number[]>([defaultGroupIndex]);

  const toggleGroup = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full space-y-5 select-none">
      {groups.map((group, groupIdx) => {
        const isExpanded = expandedIndices.includes(groupIdx);
        const words = group.name.split(" ");
        const firstWord = words[0];
        const restOfTitle = words.slice(1).join(" ");

        return (
          <div
            key={group.name}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isExpanded
                ? "bg-white border-[#0D244D] shadow-md"
                : "border-black/[0.08] shadow-xs"
            }`}
          >
            {/* Box Header Button with Navy Blue Background */}
            <button
              type="button"
              onClick={() => toggleGroup(groupIdx)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors bg-[#0D244D] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
              aria-expanded={isExpanded}
            >
              <div className="pr-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                  <span className="underline decoration-[#DE8017] decoration-2 sm:decoration-[3px] underline-offset-4">
                    {firstWord}
                  </span>
                  {restOfTitle ? ` ${restOfTitle}` : ""}
                </h3>
                {group.intro && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                    {group.intro}
                  </p>
                )}
              </div>

              {/* Expander Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 bg-white/10 text-white hover:bg-white/20"
              >
                {isExpanded ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Expanded Box Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden bg-white border-t border-black/[0.06]"
                >
                  <div className="p-5 sm:p-8 space-y-10">
                    {group.roles.map((role, roleIdx) => (
                      <article
                        key={role.title}
                        className={`${
                          roleIdx > 0 ? "pt-8 border-t border-black/[0.06]" : ""
                        }`}
                      >
                        {/* Role Subheading without Logo */}
                        <h4 className="text-lg sm:text-xl font-display font-bold text-[#0D244D] tracking-tight mb-2">
                          {role.title}
                        </h4>

                        {/* Description: Normal text with 'Owns:' in front */}
                        <p className="text-sm sm:text-base leading-relaxed text-[#415A77] mb-5">
                          <span className="font-semibold text-[#0D244D]">Owns: </span>
                          {role.owns}
                        </p>

                        {/* Points with Arrow Without Div (3 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                          {/* 1. Production Signals */}
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#DE8017] font-mono mb-3">
                              Production Signals
                            </h5>
                            <ul className="space-y-2.5 list-none p-0 m-0">
                              {role.signals.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#334155] leading-relaxed"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00A3E0]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 2. Signals That Mislead */}
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#DE8017] font-mono mb-3">
                              Signals That Mislead
                            </h5>
                            <ul className="space-y-2.5 list-none p-0 m-0">
                              {role.falsePositives.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#334155] leading-relaxed"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00A3E0]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 3. How NeoIntelli Evaluates */}
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#DE8017] font-mono mb-3">
                              How NeoIntelli Evaluates
                            </h5>
                            <ul className="space-y-2.5 list-none p-0 m-0">
                              {role.evaluation.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#334155] leading-relaxed"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#00A3E0]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </article>
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



