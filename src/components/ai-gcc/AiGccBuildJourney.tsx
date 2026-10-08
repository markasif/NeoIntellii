"use client";

import React from "react";
import {
  Target,
  Building2,
  Users,
  Cpu,
  RefreshCw,
  BarChart3,
  Layers,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface JourneyStep {
  label: string;
  detail: string;
}

export const DEFAULT_AI_GCC_STAGES: LifecycleStageItem[] = [
  {
    id: "01",
    name: "Decide",
    description: "Mandate, business case, ownership model, city, team shape.",
    visual: "Mandate → Business case → City",
    icon: Target,
    isHigh: true,
    x: 100,
    y: 110,
  },
  {
    id: "02",
    name: "Establish",
    description: "Entity or EOR path, workspace, IT, security, compliance baseline.",
    visual: "Entity + Workspace + IT + Compliance",
    icon: Building2,
    isHigh: false,
    x: 300,
    y: 240,
  },
  {
    id: "03",
    name: "Hire",
    description: "Leadership first, then the squad through the Hiring OS.",
    visual: "Leadership first → AI Squad → Validation",
    icon: Users,
    isHigh: true,
    x: 500,
    y: 110,
  },
  {
    id: "04",
    name: "Enable AI",
    description: "Data foundation, developer environments, compute, MLOps.",
    visual: "Data foundation + Compute + MLOps",
    icon: Cpu,
    isHigh: false,
    x: 700,
    y: 240,
  },
  {
    id: "05",
    name: "Operate",
    description: "People operations, delivery cadence, governance, reporting.",
    visual: "People ops + Delivery + Governance",
    icon: RefreshCw,
    isHigh: true,
    x: 900,
    y: 110,
  },
  {
    id: "06",
    name: "Scale",
    description: "Second squad, new capabilities, platform reuse.",
    visual: "Second squad + Capabilities + Platform reuse",
    icon: BarChart3,
    isHigh: false,
    x: 1100,
    y: 240,
  },
  {
    id: "07",
    name: "Own",
    description: "BOT milestone or captive transition when the case supports it.",
    visual: "BOT milestone → Captive transition",
    icon: Layers,
    isHigh: true,
    x: 1300,
    y: 110,
  },
];

/**
 * Parallel Build Journey Lifecycle Component:
 * Consolidated via UniversalLifecycle (7 stages)
 */
export default function AiGccBuildJourney({
  steps,
}: {
  steps?: JourneyStep[];
}) {
  const stages = DEFAULT_AI_GCC_STAGES.map((stage, idx) => {
    if (steps && steps[idx]) {
      return {
        ...stage,
        name: steps[idx].label,
        description: steps[idx].detail,
      };
    }
    return stage;
  });

  return (
    <UniversalLifecycle
      stages={stages}
      id="ai-gcc-build-journey"
      ariaLabel="Parallel build journey lifecycle"
    />
  );
}
