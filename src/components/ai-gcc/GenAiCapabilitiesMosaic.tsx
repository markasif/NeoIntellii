"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    image: "/images/mosaic_ai_eng.webp",
  },
  {
    title: "AI copilots",
    body: "Knowledge and workflow copilots for engineering, operations, customer and back-office teams, designed around the task and the escalation path, not the chat box.",
    image: "/images/ai-genai.webp",
  },
  {
    title: "Agentic AI",
    body: "Multi-step agents that plan, call tools and complete work inside defined permissions, with tracing and human escalation built in from the first version.",
    image: "/images/ai-gcc/advisory/target-operating-model.webp",
  },
  {
    title: "Model adaptation",
    body: "Prompt engineering, structured outputs, fine-tuning and distillation chosen by evidence from evaluation rather than by default.",
    image: "/images/ai-architecture.webp",
  },
  {
    title: "Evaluation",
    body: "Task-level evaluation sets, LLM-as-judge with human calibration, regression suites for prompts and retrieval, and red-teaming for the risks that matter to the use case.",
    image: "/images/ai-gcc/advisory/responsible-ai.webp",
  },
  {
    title: "Production engineering",
    body: "Gateways, caching, rate limiting, fallbacks, observability and rollout patterns so a GenAI feature behaves like software, not a demo.",
    image: "/images/ai-mlops.webp",
  },
  {
    title: "AI economics",
    body: "Cost per task, model routing across tiers, caching and batch strategies, and unit economics.",
    image: "/images/ai-gcc/advisory/value-roadmap.webp",
  },
];

/**
 * GenAiCapabilitiesMosaic - Balanced Editorial Grid:
 * - Top Left (Spans 2 columns): Header block with left-aligned title & lead text
 * - Top Right (Column 3): Card 1 (Enterprise RAG) - half-height standard card
 * - Row 2 & Row 3: Standard height cards filling all 3 columns evenly
 * - Crisp rectangular cards with rounded-none (no rounded corners)
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
      image: item.image || fallback.image,
    };
  });

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
          className="md:col-span-2 lg:col-span-2 flex flex-col justify-center text-left py-3 sm:py-5 pr-0 lg:pr-8"
        >
          {eyebrow && (
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#008EC4] mb-3 block">
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
        {/* ALL CAPABILITY CARDS: Standard uniform height grid cards           */}
        {/* ================================================================= */}
        {mergedItems.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative overflow-hidden rounded-none shadow-md group min-h-[240px] sm:min-h-[255px] flex flex-col justify-end p-5 sm:p-6 border border-[#CBD7E8] bg-[#051329] transition-all duration-500 hover:shadow-xl text-left"
          >
            {/* Background Image */}
            <Image
              src={card.image!}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 rounded-none"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/85 to-transparent" />

            {/* Content without arrow button and without top cyan tag */}
            <div className="relative z-10 space-y-1.5 text-left">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#67D5F7] transition-colors">
                {card.title}
              </h3>

              <p className="text-xs sm:text-[12.5px] text-[#D2DCF0]/85 leading-relaxed line-clamp-3 font-normal">
                {card.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
