"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AmbientGlow from "@/components/ui/AmbientGlow";
import SourceNote from "./SourceNote";

interface ModeItem {
  number: string;
  title: string;
  desc: string;
  points: { label: string; value: string }[];
  image: string;
  imageAlt: string;
}

const MODES: ModeItem[] = [
  {
    number: "01",
    title: "Managed Operating Layer",
    desc: "NeoIntelli manages selected GCC operating functions under the client's direction.",
    points: [
      { label: "Best when", value: "The client has an India entity but limited local operations capacity, or wants managed operations long term." },
      { label: "Local operating functions", value: "Agreed functions across people, workplace and IT, service management, governance and reporting." },
      { label: "Employment structure", value: "Client's India entity." },
      { label: "Typical next step", value: "Stay managed, or take functions in-house progressively." },
    ],
    image: "/images/how_we_work/phase_01_design.webp",
    imageAlt: "Managed Operating Layer executive operations",
  },
  {
    number: "02",
    title: "EOR / Interim Model",
    desc: "Employees may initially operate through an agreed employment structure while the permanent model is established.",
    points: [
      { label: "Best when", value: "Hiring needs to start before the client's entity is ready, or the client is validating India before committing to a structure." },
      { label: "Local operating functions", value: "Operating functions can run in parallel so the team is supported from day one." },
      { label: "Employment structure", value: "Agreed interim structure, chosen with legal and tax advice." },
      { label: "Typical next step", value: "Move to the permanent structure on a planned date." },
    ],
    image: "/images/how_we_work/phase_02_build.webp",
    imageAlt: "EOR and interim operating infrastructure",
  },
  {
    number: "03",
    title: "Build-Operate-Transfer",
    desc: "NeoIntelli builds and operates the agreed operating layer before transferring defined capability to the client's organization.",
    points: [
      { label: "Best when", value: "The client wants to own the center but does not want to build every local function before the first team is productive." },
      { label: "Local operating functions", value: "The full operating layer, documented for transfer from day one." },
      { label: "Employment structure", value: "Per the contract and entity structure, with a planned transfer." },
      { label: "Typical next step", value: "Transfer by readiness criteria, staged by function or team." },
    ],
    image: "/images/how_we_work/phase_03_operate.webp",
    imageAlt: "Build-Operate-Transfer command operations",
  },
  {
    number: "04",
    title: "Captive Operating Model",
    desc: "The client progressively takes direct operational ownership of the center.",
    points: [
      { label: "Best when", value: "The client's India organization is ready to run local functions itself, often after a managed or BOT period." },
      { label: "Local operating functions", value: "Client-operated, with NeoIntelli support on request." },
      { label: "Employment structure", value: "Client's India entity." },
      { label: "Typical next step", value: "Scale, expand the mandate, add AI capability." },
    ],
    image: "/images/how_we_work/phase_04_scale.webp",
    imageAlt: "Captive ownership corporate enterprise",
  },
];

export default function ManagedModelComparison() {
  const [activePhase, setActivePhase] = useState<number>(0);
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
                setActivePhase(idx);
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
  }, [MODES.length]);

  return (
    <div className="relative w-full select-none py-1">
      <AmbientGlow position="center" />

      {/* 4-Card Horizontal Process Columns with smooth staggered entrance animation matching EngagementModel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 items-stretch pb-4 lg:pb-6">
        {MODES.map((mode, index) => {
          const isActive = activePhase === index;

          return (
            <motion.div
              key={mode.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-card-index={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActivePhase(index)}
              onTouchStart={() => setActivePhase(index)}
              onTouchMove={() => setActivePhase(index)}
              onClick={() => setActivePhase(index)}
              className={`relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] transition-all duration-500 ease-out cursor-pointer rounded-2xl border ${
                isActive
                  ? "lg:-my-6 lg:py-11 scale-[1.01] lg:scale-[1.02] shadow-[0_24px_60px_rgba(4,18,43,0.4)] text-white z-20 overflow-hidden bg-gradient-to-b from-[#0C2A5E]/95 via-[#0A224E] to-[#061530] border-[#16427D]"
                  : "bg-white text-[#0D306C] shadow-xs border-[#D2DCF0] hover:border-[#169DC8]/50 hover:shadow-md z-10"
              }`}
            >
              {/* ACTIVE STATE BACKGROUND IMAGE & CYAN DUOTONE ARCHITECTURAL WASH */}
              {isActive && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
                  <Image
                    src={mode.image}
                    alt={mode.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover object-center filter contrast-[1.3] brightness-[0.7] grayscale scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Cyan / Teal Duotone architectural overlay matching reference image */}
                  <div className="absolute inset-0 bg-[#0A4870] mix-blend-multiply opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031926] via-[#083D5C]/85 to-[#0E7490]/70 mix-blend-color" />
                  <div className="absolute inset-0 bg-cyan-600/15" />
                </div>
              )}

              {/* CARD CONTENT */}
              <div className="relative z-10 flex flex-col flex-1">
                {/* Big Numerals 01, 02, 03, 04 in website's typography */}
                <div className="flex items-center justify-between leading-none">
                  <span
                    className={`text-6xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-none transition-all duration-300 select-none ${
                      isActive
                        ? "text-white"
                        : "bg-gradient-to-br from-[#169DC8] via-[#169DC8] to-[#0D306C] bg-clip-text text-transparent"
                    }`}
                  >
                    {mode.number}
                  </span>
                </div>

                {/* Vertical Dotted Track Line under the number matching reference image */}
                <div
                  className={`w-px h-8 border-l border-dashed my-4 transition-colors duration-300 ${
                    isActive ? "border-white/60" : "border-[#169DC8]/60"
                  }`}
                />

                {/* Phase Title */}
                <h3
                  className={`text-2xl sm:text-[28px] font-bold tracking-tight mb-3 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#0D306C]"
                  }`}
                >
                  {mode.title}
                </h3>

                {/* Lead Description */}
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed mb-6 font-normal transition-colors duration-300 ${
                    isActive ? "text-slate-100" : "text-[#505D74]"
                  }`}
                >
                  {mode.desc}
                </p>

                {/* Deliverable Milestones with Arrow Icons matching button icon */}
                <ul
                  className={`space-y-2.5 pt-4 border-t transition-colors duration-300 ${
                    isActive ? "border-white/20" : "border-[#D2DCF0]"
                  }`}
                >
                  {mode.points.map((pt) => (
                    <li
                      key={pt.label}
                      className={`flex items-start gap-2.5 text-xs sm:text-[13px] font-medium transition-colors duration-300 group/item ${
                        isActive ? "text-white/95" : "text-[#2B3D66]"
                      }`}
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform duration-200 group-hover/item:translate-x-0.5 ${
                          isActive ? "text-[#67D5F7]" : "text-[#169DC8]"
                        }`}
                      />
                      <div>
                        <span className={`font-bold ${isActive ? "text-white" : "text-[#0D244D]"}`}>
                          {pt.label}:{" "}
                        </span>
                        <span className={isActive ? "text-white/90" : "text-[#505D74]"}>{pt.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scope Note */}
      <SourceNote className="mt-2">
        Modes are starting points, not a mandatory sequence. A client can begin in any mode that fits its entity status and operating capacity, and does not have to pass through every stage. Employment and entity structures are agreed with qualified advisers.
      </SourceNote>
    </div>
  );
}
