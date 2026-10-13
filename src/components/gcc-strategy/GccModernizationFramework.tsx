"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FrameworkStage {
  step: string;
  title: string;
  lead: string;
  focus: string;
  image: string;
  items: string[];
}

const stages: FrameworkStage[] = [
  {
    step: "01",
    title: "Diagnose",
    lead: "Where the center actually is.",
    focus: "Mandate perception, delivery maturity, and value baseline.",
    image: "/images/how_we_work/phase_01_design.webp",
    items: [
      "Mandate perception at headquarters",
      "Maturity of delivery & decision rights",
      "Talent mix, seniority and attrition",
      "Technology, data and AI readiness",
      "Governance and operating rhythm",
      "Value story and ROI baseline",
    ],
  },
  {
    step: "02",
    title: "Redesign",
    lead: "What the center should own next.",
    focus: "Target operating model, leadership depth, and recognized metrics.",
    image: "/images/how_we_work/phase_02_build.webp",
    items: [
      "Target operating model & decision rights",
      "Ownership: services, products, platforms",
      "Leadership structure & India depth",
      "Workforce plan & critical role changes",
      "Platform and tooling ownership",
      "Metrics headquarters will recognize",
    ],
  },
  {
    step: "03",
    title: "Transform",
    lead: "Build the new capability.",
    focus: "Production AI systems, workflow automation, and capability transfer.",
    image: "/images/how_we_work/phase_03_operate.webp",
    items: [
      "AI & data capability to production",
      "Automation of manual workflows",
      "Product / platform transfer to India",
      "Critical skills hired and upskilled",
      "Governance changes operationalized",
    ],
  },
  {
    step: "04",
    title: "Institutionalize",
    lead: "Make it the way the center runs.",
    focus: "Executive operating rhythm, quarterly ROI, and expansion roadmaps.",
    image: "/images/how_we_work/phase_04_scale.webp",
    items: [
      "Executive governance cadence",
      "Talent & leadership pipeline",
      "Operating rhythm & review mechanisms",
      "Value measurement reported quarterly",
      "Continuous mandate-expansion roadmap",
    ],
  },
];

export default function GccModernizationFramework({ className = "" }: { className?: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Automatically activate cards on mobile as the user scrolls / moves past them
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-card-index");
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              if (!isNaN(idx)) {
                setActiveStage(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.25,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stages.length]);

  return (
    <div className={`w-full ${className}`}>
      {/* 4-Card Horizontal Process Columns with staggered entrance animation & hover wash */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 items-stretch pt-2 sm:pt-4">
        {stages.map((stage, index) => {
          const isActive = activeStage === index;
          const num = stage.step;

          return (
            <motion.div
              key={stage.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-card-index={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveStage(index)}
              onTouchStart={() => setActiveStage(index)}
              onTouchMove={() => setActiveStage(index)}
              onClick={() => setActiveStage(index)}
              className={`relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] transition-all duration-500 ease-out cursor-pointer rounded-2xl ${
                isActive
                  ? "lg:-my-6 lg:py-12 scale-[1.01] lg:scale-[1.02] shadow-xl lg:shadow-none text-white z-20 overflow-hidden"
                  : "bg-white/50 sm:bg-transparent text-slate-900 z-10 shadow-none border border-[#D2DCF0]/40 sm:border-transparent hover:border-[#169DC8]/30"
              }`}
            >
              {/* ACTIVE STATE BACKGROUND IMAGE & CYAN DUOTONE ARCHITECTURAL WASH */}
              {isActive && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-full object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Cyan / Teal Duotone architectural overlay matching reference image */}
                  <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                  <div className="absolute inset-0 bg-cyan-600/15" />
                </div>
              )}

              {/* CARD CONTENT */}
              <div className="relative z-10 text-left">
                {/* Big Numerals 01, 02, 03, 04 in website's typography */}
                <div className="flex items-center justify-between leading-none">
                  <span
                    className={`text-6xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-none transition-colors duration-300 select-none ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {num}
                  </span>
                </div>

                {/* Vertical Dotted Track Line under the number */}
                <div
                  className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                    isActive ? "border-white/60" : "border-slate-300"
                  }`}
                />

                {/* Stage Title */}
                <h3
                  className={`text-2xl sm:text-[26px] font-bold tracking-tight mb-2 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {stage.title}
                </h3>

                {/* Lead Description */}
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed mb-4 font-normal transition-colors duration-300 ${
                    isActive ? "text-slate-100" : "text-slate-600"
                  }`}
                >
                  {stage.lead}
                </p>

                {/* Focus / Fit Highlight Box */}
                <div
                  className={`pt-3 pb-3 border-t transition-colors duration-300 mb-3 ${
                    isActive ? "border-white/20" : "border-slate-200"
                  }`}
                >
                  <p className={`text-xs sm:text-[13px] font-medium ${isActive ? "text-white/95" : "text-slate-800"}`}>
                    <span className={`font-semibold ${isActive ? "text-[#67D5F7]" : "text-[#008EC4]"}`}>Focus: </span>
                    {stage.focus}
                  </p>
                </div>

                {/* Deliverable Milestones with Arrow Icons */}
                <ul
                  className={`space-y-2 pt-3 border-t transition-colors duration-300 ${
                    isActive ? "border-white/20" : "border-slate-200"
                  }`}
                >
                  {stage.items.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2.5 text-xs sm:text-[13px] font-medium transition-colors duration-300 group/item ${
                        isActive ? "text-white/95" : "text-slate-700"
                      }`}
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/item:translate-x-0.5 ${
                          isActive ? "text-[#67D5F7]" : "text-[#169DC8]"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
