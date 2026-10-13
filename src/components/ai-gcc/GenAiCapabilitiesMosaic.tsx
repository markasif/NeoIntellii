"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Coins,
  Gauge,
  Library,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface CapabilityItem {
  title: string;
  body: string;
  image?: string;
}

export interface GenAiCapabilitiesMosaicProps {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  items?: CapabilityItem[];
  className?: string;
}

const DEFAULT_ITEMS: CapabilityItem[] = [
  {
    title: "Enterprise RAG",
    body: "Retrieval pipelines over governed enterprise data: chunking, embedding, hybrid search, re-ranking, citation and access control that follows the source system.",
  },
  {
    title: "AI copilots",
    body: "Knowledge and workflow copilots for engineering, operations, customer and back-office teams, designed around the task and the escalation path, not the chat box.",
  },
  {
    title: "Agentic AI",
    body: "Multi-step agents that plan, call tools and complete work inside defined permissions, with tracing and human escalation built in from the first version.",
  },
  {
    title: "Model adaptation",
    body: "Prompt engineering, structured outputs, fine-tuning and distillation chosen by evidence from evaluation rather than by default.",
  },
  {
    title: "Evaluation",
    body: "Task-level evaluation sets, LLM-as-judge with human calibration, regression suites for prompts and retrieval, and red-teaming for the risks that matter to the use case.",
  },
  {
    title: "Production engineering",
    body: "Gateways, caching, rate limiting, fallbacks, observability and rollout patterns so a GenAI feature behaves like software, not a demo.",
  },
  {
    title: "AI economics",
    body: "Cost per task, model routing across tiers, caching and batch strategies, and unit economics.",
  },
];

/** Maps each capability to a crisp navy/cyan line icon for the card tile. */
function resolveIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("rag") || t.includes("retrieval")) return Library;
  if (t.includes("copilot") || t.includes("assistant")) return Sparkles;
  if (t.includes("agent")) return Bot;
  if (t.includes("model") || t.includes("adaptation") || t.includes("fine")) return SlidersHorizontal;
  if (t.includes("evaluation") || t.includes("eval")) return Gauge;
  if (t.includes("production") || t.includes("engineering")) return Rocket;
  if (t.includes("economic") || t.includes("cost")) return Coins;
  return Bot;
}

/**
 * GenAiCapabilitiesMosaic - Balanced Editorial Grid:
 * - Top Left (Spans 2 columns): Header block with left-aligned title & lead text
 * - Top Right (Column 3): Card 1 (Enterprise RAG) - half-height standard card
 * - Row 2 & Row 3: Standard height cards filling all 3 columns evenly
 * - Crisp rectangular navy cards with rounded-none (no rounded corners)
 * - Photography-free creative surface: cyan hairline accent, corner glows,
 *   faint engineering-grid texture, amber corner brackets + glow, an amber
 *   title bar revealed on hover, and a line-icon tile
 * - Clean cards without top cyan badges and without arrow buttons
 */
export default function GenAiCapabilitiesMosaic({
  eyebrow = "CAPABILITIES",
  title = "What the GCC builds and runs.",
  lead = "From specialist talent and AI engineering to GCC setup and local operations, NeoIntelli connects the essential capabilities behind the complete AI GCC lifecycle.",
  items = DEFAULT_ITEMS,
  className = "",
}: GenAiCapabilitiesMosaicProps) {
  const mergedItems = items.map((item, idx) => {
    const fallback = DEFAULT_ITEMS[idx] || DEFAULT_ITEMS[0];
    return {
      title: item.title || fallback.title,
      body: item.body || fallback.body,
    };
  });

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
          className="md:col-span-2 lg:col-span-2 flex flex-col justify-center text-left py-3 sm:py-5 pr-0 lg:pr-8"
        >
          {eyebrow && (
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#008EC4] mb-3 block">
              {eyebrow}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#0D306C] tracking-tight leading-[1.18] mb-4 [&_span]:!text-inherit">
            {title}
          </h2>

          {lead && (
            <p className="text-[#505D74] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {lead}
            </p>
          )}
        </motion.div>

        {/* ================================================================= */}
        {/* ALL CAPABILITY CARDS: Standard uniform height grid cards           */}
        {/* ================================================================= */}
        {mergedItems.map((card, idx) => {
          const Icon = resolveIcon(card.title);
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(idx * 0.09, 0.6),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-none shadow-md group min-h-[185px] sm:min-h-[195px] flex flex-col justify-start p-5 sm:p-6 border border-[#CBD7E8] bg-[#0D244D] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-left"
            >
              {/* ── Creative surface (brand navy + amber accents, no photos) ── */}
              {/* Top cyan hairline accent, brightens and grows on hover */}
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#169DC8] via-[#38BDF8] to-transparent opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:h-[4px]" />
              {/* Corner glow */}
              <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-[#169DC8]/25 blur-3xl transition-all duration-500 group-hover:bg-[#38BDF8]/40" />
              {/* Soft amber glow (top-right) to fill the empty corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F19326]/15 blur-3xl transition-all duration-500 group-hover:bg-[#F19326]/25" />
              {/* Amber corner brackets (top-right scan-corner motif, open turned inward) */}
              <div className="absolute top-0 right-0 w-7 h-7 pointer-events-none">
                <span className="absolute top-0 left-0 w-7 h-[2px] bg-[#F19326]/70 transition-all duration-500 group-hover:w-9 group-hover:bg-[#F19326]" />
                <span className="absolute top-0 right-0 w-[2px] h-7 bg-[#F19326]/70 transition-all duration-500 group-hover:h-9 group-hover:bg-[#F19326]" />
              </div>
              {/* Faint engineering grid texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background-image:linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] [background-size:30px_30px]" />
              {/* Icon tile */}
              <div className="absolute top-4 left-5 sm:left-6 w-11 h-11 flex items-center justify-center border border-[#38BDF8]/35 bg-[#061530]/45 transition-all duration-500 group-hover:border-[#38BDF8]/70 group-hover:bg-[#061530]/70">
                <Icon
                  className="w-5 h-5 text-[#67D5F7] transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.8}
                />
              </div>
              {/* Bottom depth gradient behind the text */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0A224E] via-[#0D244D]/85 to-transparent pointer-events-none" />

              {/* Content (starts just below the icon tile, no arrow button) */}
              <div className="relative z-10 space-y-1.5 text-left pt-16">
                {/* Amber bar slides in above the title on hover */}
                <span className="block h-[3px] w-0 bg-[#F19326] transition-all duration-500 group-hover:w-10 mb-2" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#67D5F7] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-[12.5px] text-[#D2DCF0]/85 leading-relaxed line-clamp-3 font-normal">
                  {card.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
