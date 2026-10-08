"use client";

import React from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AmbientGlow from "@/components/ui/AmbientGlow";

export default function Insights() {
  const articles = [
    {
      id: "benefits-of-building-a-gcc-in-india-for-enterprise-ai",
      tag: "AI GCC",
      meta: "Sep 2026 · 15 min read",
      title: "Benefits of Building a GCC in India for Enterprise AI – 2026",
      description:
        "Learn the Benefits of Building a GCC in India for Enterprise AI, cut costs, own IP and data, and speed MLOps governance. Start your GCC plan today.",
      href: "/blog/benefits-of-building-a-gcc-in-india-for-enterprise-ai",
      image: "/images/insights/insight_enterprise_ai.jpg",
      imageAlt: "Benefits of Building a GCC in India for Enterprise AI – 2026",
    },
    {
      id: "ai-gcc-india-talent-availability-2026",
      tag: "AI GCC",
      meta: "Aug 2026 · 12 min read",
      title: "AI GCC in India: Where to Build Your AI Talent Engine in 2026",
      description:
        "Planning an AI GCC in India? Compare Bengaluru, Hyderabad, Pune and Chennai for AI-agent developers, MLOps, data science, data engineering and GenAI talent availability.",
      href: "/blog/ai-gcc-india-talent-availability-2026",
      image: "/images/insights/insight_ai_talent_engine.jpg",
      imageAlt: "Where to Build Your AI Talent Engine in 2026",
    },
    {
      id: "hire-ai-agent-developers-india-gcc",
      tag: "AI GCC",
      meta: "Aug 2026 · 10 min read",
      title: "The Hunt for AI Agent Developers: Why Your Recruitment Partner is Looking at...",
      description:
        "As enterprises shift to autonomous AI agents, the hunt for specialized developers has intensified. Discover why traditional recruitment fails and how to vet for true agentic expertise.",
      href: "/blog/hire-ai-agent-developers-india-gcc",
      image: "/images/insights/insight_ai_agents_dev.jpg",
      imageAlt: "The Hunt for AI Agent Developers in India GCC",
    },
  ];

  return (
    <section
      id="insights"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#E7EDF9] overflow-hidden"
    >
      <AmbientGlow position="top" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#169DC8] mb-3">
              Insights &amp; Perspectives
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D306C] tracking-[-0.03em] leading-[1.14]">
              Latest from the GCC frontier<span className="text-[#169DC8]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-[#505D74] max-w-2xl leading-relaxed font-normal">
              Actionable frameworks, cost structures, and operating models for enterprise builders.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-white border border-[#D2DCF0] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0D306C] shadow-2xs hover:border-[#169DC8] hover:text-[#169DC8] transition-all duration-200 group shrink-0"
          >
            <span>Explore Insights</span>
            <ArrowRight className="w-4 h-4 text-[#169DC8] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3-COLUMN CARDS GRID (Image Top + Content Below in Transparent)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="h-full"
            >
              <Link
                to={art.href}
                className="group flex flex-col h-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#169DC8] rounded-2xl"
              >
                {/* 1. Image on top */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 sm:mb-5 shadow-[0_6px_20px_rgba(13,48,108,0.08)] group-hover:shadow-[0_12px_30px_rgba(13,48,108,0.14)] transition-all duration-300 bg-[#0D306C]/10">
                  <Image
                    src={art.image}
                    alt={art.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D306C]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* 2. Below content in transparent */}
                <div className="flex-1 flex flex-col bg-transparent">
                  {/* Meta tag & read time */}
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                      {art.tag}
                    </span>
                    <span className="text-xs sm:text-[13px] text-[#505D74] font-medium">
                      {art.meta}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-[19px] font-extrabold text-[#0D306C] tracking-tight leading-snug mb-2.5 line-clamp-2 transition-colors group-hover:text-[#169DC8]">
                    {art.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-[#505D74] leading-relaxed mb-4 line-clamp-3 font-normal">
                    {art.description}
                  </p>

                  {/* Read article CTA */}
                  <div className="mt-auto">
                    <span className="btn-cyan group-hover:bg-[#0D306C]">
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
