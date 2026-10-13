"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Users,
  Cpu,
  Layers,
  Building2,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import AmbientGlow from "@/components/ui/AmbientGlow";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export default function GCCLifecycle() {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stages: LifecycleStageItem[] = [
    {
      id: "01",
      name: "Strategy",
      description:
        "The mandate, business case and operating model the center is built around.",
      visual: "Business case → Operating model → GCC mandate",
      icon: Target,
      isHigh: true,
      x: 100,
      y: 110,
    },
    {
      id: "02",
      name: "Talent",
      description:
        "Specialist AI, data and engineering people, technically validated before they reach you.",
      visual: "Leadership + AI + Engineering",
      icon: Users,
      isHigh: false,
      x: 300,
      y: 240,
    },
    {
      id: "03",
      name: "AI Engineering",
      description:
        "Generative, agentic and applied AI engineered into production systems.",
      visual: "GenAI + Data + MLOps + Agentic AI",
      icon: Cpu,
      isHigh: true,
      x: 500,
      y: 110,
    },
    {
      id: "04",
      name: "Delivery",
      description:
        "Teams that own delivery inside your roadmap, priorities and cadence.",
      visual: "Build → Ship → Operate",
      icon: Layers,
      isHigh: false,
      x: 700,
      y: 240,
    },
    {
      id: "05",
      name: "GCC Build",
      description:
        "Entity, leadership, workplace, IT and governance brought to a working launch.",
      visual: "Entity + Workplace + Technology + Governance",
      icon: Building2,
      isHigh: true,
      x: 900,
      y: 110,
    },
    {
      id: "06",
      name: "Operate",
      description:
        "People, workplace, service management, performance and governance, run daily.",
      visual: "People + Performance + Governance",
      icon: RefreshCw,
      isHigh: false,
      x: 1100,
      y: 240,
    },
    {
      id: "07",
      name: "Scale / Transfer",
      description:
        "New capability, AI transformation, and the path to captive ownership when you want it.",
      visual: "Capability → Ownership → Scale",
      icon: BarChart3,
      isHigh: true,
      x: 1300,
      y: 110,
    },
  ];

  // First-view trigger for header animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="lifecycle"
      ref={sectionRef}
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[#E7EDF9] overflow-hidden"
    >
      {/* Anchor alias for compatibility */}
      <div id="process" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      {/* Subtle ambient light glow */}
      <AmbientGlow position="top" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* CENTERED SECTION HEADER                                                   */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center px-2">
          {/* Small letter-spaced eyebrow */}
          <span
            className={`block text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#169DC8] mb-3 transition-all duration-700 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}
          >
            ONE PARTNER · COMPLETE GCC LIFECYCLE
          </span>

          {/* Large confident heading */}
          <h2
            className={`text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0D306C] tracking-[-0.03em] leading-[1.14] mb-4 transition-all duration-700 ease-out delay-150 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Build the AI GCC end to end.
          </h2>

          {/* Supporting description */}
          <p
            className={`text-sm sm:text-base lg:text-lg text-[#505D74] leading-relaxed font-normal max-w-2xl mx-auto transition-all duration-700 ease-out delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            An AI GCC requires more than hiring engineers. The mandate, talent, engineering capability, delivery model, operating systems and governance need to work together. NeoIntelli connects those layers from the first business case through ongoing operations and scale
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Continuous Sinusoidal Wave Lifecycle Visualization (UniversalLifecycle)    */}
        {/* ========================================================================= */}
        <div className="mt-4">
          <UniversalLifecycle stages={stages} id="home-lifecycle" tagStyle="none" />
        </div>
      </div>
    </section>
  );
}
