"use client";

import React from "react";
import { type LucideIcon, ArrowRight, ArrowDown, SearchCheck, Lightbulb, TrendingUp, Target, Cpu, Workflow, Zap } from "lucide-react";
import { motion } from "framer-motion";

export interface AdvisoryStep {
  label: string;
  detail?: string;
  /** Optional list of sub-items rendered inside the step card. */
  items?: string[];
  icon?: LucideIcon;
}

interface AdvisoryProcessFlowProps {
  steps?: AdvisoryStep[];
  className?: string;
  detailClassName?: string;
  cardMinHeight?: string;
}

const STEP_META_4 = [
  {
    num: "01",
    color: "#0D306C", // Signature NeoIntelli Navy Blue
    curve: "bottom" as const,
    Icon: SearchCheck,
  },
  {
    num: "02",
    color: "#0D306C", // Signature NeoIntelli Navy Blue
    curve: "top" as const,
    Icon: Lightbulb,
  },
  {
    num: "03",
    color: "#009BBF", // Teal / Cyan
    curve: "bottom" as const,
    Icon: TrendingUp,
  },
  {
    num: "04",
    color: "#009BBF", // Teal / Cyan
    curve: "top" as const,
    Icon: Target,
  },
];

const STEP_META_3 = [
  {
    num: "01",
    color: "#0D306C", // Navy Blue
    curve: "bottom" as const,
    Icon: Cpu,
  },
  {
    num: "02",
    color: "#009BBF", // Cyan
    curve: "top" as const,
    Icon: Workflow,
  },
  {
    num: "03",
    color: "#0D306C", // Navy Blue
    curve: "bottom" as const,
    Icon: Zap,
  },
];

const STEP_META_5 = [
  {
    num: "01",
    color: "#0D306C", // Signature NeoIntelli Navy Blue
    curve: "bottom" as const,
    Icon: SearchCheck,
  },
  {
    num: "02",
    color: "#0D306C", // Signature NeoIntelli Navy Blue
    curve: "top" as const,
    Icon: Lightbulb,
  },
  {
    num: "03",
    color: "#009BBF", // Teal / Cyan
    curve: "bottom" as const,
    Icon: Cpu,
  },
  {
    num: "04",
    color: "#009BBF", // Teal / Cyan
    curve: "top" as const,
    Icon: Target,
  },
  {
    num: "05",
    color: "#0D306C", // Signature NeoIntelli Navy Blue
    curve: "bottom" as const,
    Icon: Zap,
  },
];

const DEFAULT_STEPS: AdvisoryStep[] = [
  {
    label: "Business outcome",
    detail: "The cost, revenue, risk or cycle-time result the enterprise needs.",
  },
  {
    label: "AI mandate",
    detail: "What the GCC owns: workflows, products, platforms, decisions.",
  },
  {
    label: "Capability",
    detail: "Talent, data, compute, MLOps, AgentOps and governance to deliver it.",
  },
  {
    label: "Roadmap",
    detail: "Sequenced investments with value checkpoints and stop rules.",
  },
];

export default function AdvisoryProcessFlow({
  steps = DEFAULT_STEPS,
  className = "",
  detailClassName,
  cardMinHeight,
}: AdvisoryProcessFlowProps) {
  const metaList =
    steps.length === 3
      ? STEP_META_3
      : steps.length === 5
      ? STEP_META_5
      : steps.length > 5
      ? Array.from({ length: steps.length }, (_, i) => ({
          num: String(i + 1).padStart(2, "0"),
          color: i % 2 === 0 ? "#0D306C" : "#009BBF",
          curve: i % 2 === 0 ? ("bottom" as const) : ("top" as const),
          Icon: [SearchCheck, Lightbulb, Cpu, Target, Zap][i % 5],
        }))
      : STEP_META_4;

  const mergedSteps = steps.slice(0, metaList.length).map((step, idx) => {
    const meta = metaList[idx % metaList.length];
    return {
      ...step,
      ...meta,
      Icon: step.icon || meta.Icon,
    };
  });

  return (
    <div className={`w-full ${className}`}>
      {/* ============================================================== */}
      {/* DESKTOP VIEW (lg+): Cards in alternating snake flow with arrows */}
      {/* ============================================================== */}
      <div className={`hidden lg:flex items-stretch justify-between ${steps.length >= 5 ? "gap-2 xl:gap-3" : "gap-3 xl:gap-4"} relative ${steps.length === 3 ? "max-w-5xl mx-auto" : ""}`}>
        {mergedSteps.map((step, idx) => {
          const { Icon, color, curve, num, label, detail, items } = step;
          const isBottomCurve = curve === "bottom";

          return (
            <React.Fragment key={label}>
              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex-1 relative flex flex-col justify-between rounded-2xl sm:rounded-[28px] xl:rounded-[32px] bg-white border border-[#E2E8F0]/90 shadow-[0_12px_36px_rgba(13,48,108,0.06)] hover:shadow-[0_20px_48px_rgba(13,48,108,0.12)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${cardMinHeight || (steps.length >= 5 ? "min-h-[360px] xl:min-h-[390px]" : "min-h-[390px] xl:min-h-[410px]")}`}
              >
                {/* 1. TOP CURVED CAP (Even cards: 02 & 04) */}
                {!isBottomCurve && (
                  <div className="w-full relative shrink-0" style={{ color }}>
                    <svg
                      viewBox="0 0 240 70"
                      preserveAspectRatio="none"
                      className="w-full h-16 xl:h-[72px] block"
                      aria-hidden="true"
                    >
                      <path
                        d="M 0,70 C 60,15 180,15 240,70 L 240,0 L 0,0 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                {/* 2. TOP NUMBER (Odd cards: 01 & 03 & 05) */}
                {isBottomCurve && (
                  <div className={`${steps.length >= 5 ? "px-4 pt-4 sm:px-5 sm:pt-5" : "px-5 pt-5 sm:px-6 sm:pt-6"} select-none flex flex-col items-start`}>
                    <span
                      className={`${steps.length >= 5 ? "text-3xl sm:text-4xl xl:text-5xl" : "text-4xl sm:text-5xl"} font-mono font-bold text-transparent tracking-tighter block leading-none`}
                      style={{
                        WebkitTextStroke: `2px ${color}`,
                      }}
                    >
                      {num}
                    </span>
                    <div className="w-8 sm:w-10 h-[2.5px] bg-[#F19326] rounded-full mt-1.5" />
                  </div>
                )}

                {/* 3. CENTER CONTENT (Icon + Label + Detail) */}
                <div
                  className={`flex-1 flex flex-col items-center justify-center text-center ${steps.length >= 5 ? "px-3 xl:px-4" : "px-4 xl:px-5"} ${
                    isBottomCurve ? "py-3" : "-mt-1 py-3"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`${steps.length >= 5 ? "w-11 h-11 xl:w-13 xl:h-13" : "w-12 h-12 xl:w-14 xl:h-14"} rounded-full flex items-center justify-center mb-3`}
                    style={{ color }}
                  >
                    <Icon className={`${steps.length >= 5 ? "w-5 h-5 xl:w-6 xl:h-6" : "w-6 h-6 xl:w-7 xl:h-7"}`} strokeWidth={2.2} />
                  </div>

                  {/* Label */}
                  <h3 className={`${steps.length >= 5 ? "text-xs sm:text-sm xl:text-base" : "text-sm xl:text-base"} font-extrabold text-[#0D306C] uppercase tracking-wider mb-2 font-manrope`}>
                    {label}
                  </h3>

                  {/* Detail */}
                  {detail && (
                    <p className={detailClassName || `text-xs ${steps.length >= 5 ? "xl:text-xs" : "xl:text-[13px]"} text-[#505D74] leading-relaxed max-w-[220px] mx-auto font-normal`}>
                      {detail}
                    </p>
                  )}

                  {/* Sub-items */}
                  {items && items.length > 0 && (
                    <ul className="mt-3 w-full max-w-[210px] mx-auto space-y-1.5 text-left list-none p-0">
                      {items.map((entry) => (
                        <li
                          key={entry}
                          className="flex items-start gap-2 text-[11px] sm:text-xs text-[#505D74] leading-snug"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 4. BOTTOM CURVED CAP (Odd cards: 01 & 03 & 05) */}
                {isBottomCurve && (
                  <div className="w-full mt-auto relative shrink-0" style={{ color }}>
                    <svg
                      viewBox="0 0 240 70"
                      preserveAspectRatio="none"
                      className="w-full h-16 xl:h-[72px] block"
                      aria-hidden="true"
                    >
                      <path
                        d="M 0,0 C 60,55 180,55 240,0 L 240,70 L 0,70 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                {/* 5. BOTTOM NUMBER (Even cards: 02 & 04) */}
                {!isBottomCurve && (
                  <div className={`${steps.length >= 5 ? "px-4 pb-4 sm:px-5 sm:pb-5" : "px-5 pb-5 sm:px-6 sm:pb-6"} mt-auto select-none flex flex-col items-start`}>
                    <span
                      className={`${steps.length >= 5 ? "text-3xl sm:text-4xl xl:text-5xl" : "text-4xl sm:text-5xl"} font-mono font-bold text-transparent tracking-tighter block leading-none`}
                      style={{
                        WebkitTextStroke: `2px ${color}`,
                      }}
                    >
                      {num}
                    </span>
                    <div className="w-8 sm:w-10 h-[2.5px] bg-[#F19326] rounded-full mt-1.5" />
                  </div>
                )}
              </motion.div>

              {/* Connecting Directional Arrow between cards */}
              {idx < mergedSteps.length - 1 && (
                <div
                  className={`shrink-0 flex items-center justify-center ${
                    idx % 2 === 0
                      ? "self-end pb-7 xl:pb-8" // Bottom arrow (between 01->02 and 03->04)
                      : "self-start pt-7 xl:pt-8" // Top arrow (between 02->03 and 04->05)
                  }`}
                  style={{
                    color: mergedSteps[idx].color,
                  }}
                  aria-hidden="true"
                >
                  <ArrowRight className={`${steps.length >= 5 ? "w-5 h-5 xl:w-6 xl:h-6" : "w-6 h-6 xl:w-7 xl:h-7"}`} strokeWidth={3.2} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TABLET & MOBILE VIEW (<lg): The same cards, stacked vertically  */}
      {/* with down arrows between them (keeps the desktop design).        */}
      {/* ============================================================== */}
      <ol className="lg:hidden max-w-2xl mx-auto list-none p-0 m-0 px-4 sm:px-0">
        {mergedSteps.map((step, idx) => {
          const { Icon, color, curve, num, label, detail, items } = step;
          const isBottomCurve = curve === "bottom";
          const isLast = idx === mergedSteps.length - 1;

          return (
            <li key={label} className="relative">
              {/* Card — same structure as desktop */}
              <div className="relative flex flex-col justify-between rounded-2xl sm:rounded-[28px] bg-white border border-[#E2E8F0]/90 shadow-[0_10px_30px_rgba(13,48,108,0.06)] overflow-hidden">
                {/* 1. Top curved cap (even cards) */}
                {!isBottomCurve && (
                  <div className="w-full relative shrink-0" style={{ color }}>
                    <svg
                      viewBox="0 0 240 70"
                      preserveAspectRatio="none"
                      className="w-full h-9 sm:h-12 block"
                      aria-hidden="true"
                    >
                      <path d="M 0,70 C 60,15 180,15 240,70 L 240,0 L 0,0 Z" fill="currentColor" />
                    </svg>
                  </div>
                )}

                {/* 2. Top number (odd cards) */}
                {isBottomCurve && (
                  <div className="px-5 pt-5 select-none flex flex-col items-start">
                    <span
                      className="text-3xl sm:text-4xl font-mono font-bold text-transparent tracking-tighter block leading-none"
                      style={{ WebkitTextStroke: `2px ${color}` }}
                    >
                      {num}
                    </span>
                    <div className="w-8 h-[2.5px] bg-[#F19326] rounded-full mt-1.5" />
                  </div>
                )}

                {/* 3. Center content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-5 py-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3" style={{ color }}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0D306C] uppercase tracking-wider mb-2 font-manrope">
                    {label}
                  </h3>
                  {detail && (
                    <p className={detailClassName || "text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed max-w-sm mx-auto w-full font-normal"}>
                      {detail}
                    </p>
                  )}
                  {items && items.length > 0 && (
                    <ul className="mt-3 w-full max-w-sm mx-auto space-y-1.5 list-none p-0">
                      {items.map((entry) => (
                        <li key={entry} className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#505D74] leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 4. Bottom curved cap (odd cards) */}
                {isBottomCurve && (
                  <div className="w-full mt-auto relative shrink-0" style={{ color }}>
                    <svg
                      viewBox="0 0 240 70"
                      preserveAspectRatio="none"
                      className="w-full h-9 sm:h-12 block"
                      aria-hidden="true"
                    >
                      <path d="M 0,0 C 60,55 180,55 240,0 L 240,70 L 0,70 Z" fill="currentColor" />
                    </svg>
                  </div>
                )}

                {/* 5. Bottom number (even cards) */}
                {!isBottomCurve && (
                  <div className="px-5 pb-5 mt-auto select-none flex flex-col items-start">
                    <span
                      className="text-3xl sm:text-4xl font-mono font-bold text-transparent tracking-tighter block leading-none"
                      style={{ WebkitTextStroke: `2px ${color}` }}
                    >
                      {num}
                    </span>
                    <div className="w-8 h-[2.5px] bg-[#F19326] rounded-full mt-1.5" />
                  </div>
                )}
              </div>

              {/* Down arrow connector between cards */}
              {!isLast && (
                <div className="flex items-center justify-center py-2" aria-hidden="true">
                  <ArrowDown className="w-5 h-5" style={{ color }} strokeWidth={3} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
