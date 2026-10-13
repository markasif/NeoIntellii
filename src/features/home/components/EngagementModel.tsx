"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";
import AdvisoryProcessFlow, { type AdvisoryStep } from "@/components/ai-gcc/AdvisoryProcessFlow";

/** The four-stage engagement model, rendered with the Advisory Process Flow design. */
const PHASES: AdvisoryStep[] = [
  {
    label: "Design",
    items: ["Mandate", "Business case", "Operating model", "Location", "Roadmap"],
  },
  {
    label: "Build",
    items: [
      "Talent",
      "Leadership",
      "AI engineering",
      "Entity and workplace",
      "Platform and infrastructure",
    ],
  },
  {
    label: "Operate",
    items: ["People", "IT", "Service management", "Governance", "Performance"],
  },
  {
    label: "Scale or Transfer",
    items: ["New capability", "AI transformation", "Leadership", "BOT", "Captive ownership"],
  },
];

export default function EngagementModel() {
  return (
    <section
      id="how-we-work"
      className="relative bg-[#E7EDF9] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* Anchor aliases for compatibility */}
      <div id="engagement-model" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div id="how-it-works" className="absolute -top-20 pointer-events-none" aria-hidden="true" />

      <AmbientGlow position="center" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Standardized Section Header */}
        <SectionHeader
          eyebrow="HOW WE WORK"
          title="Design, build, operate, then scale or transfer."
          description="A defined 4-stage engagement model, so you always know which phase you are in, what it produces, and what comes next."
          className="!mb-8 sm:!mb-14 lg:!mb-20"
        />

        {/* Advisory Process Flow design */}
        <AdvisoryProcessFlow steps={PHASES} />
      </div>
    </section>
  );
}
