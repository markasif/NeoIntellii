"use client";

import React, { useMemo } from "react";
import {
  Compass,
  Search,
  Cpu,
  Bot,
  Terminal,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import UniversalLifecycle, { LifecycleStageItem } from "@/components/shared/UniversalLifecycle";
import { VALIDATION_FLOW } from "@/data/aiTalent";

const STEP_ICONS: React.ComponentType<{ className?: string }>[] = [
  Compass,
  Search,
  Cpu,
  Bot,
  Terminal,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
];

export interface ValidationStep {
  label: string;
  detail: string;
}

interface ValidationRoadmapProps {
  steps?: readonly ValidationStep[] | ValidationStep[];
  id?: string;
  className?: string;
}

/**
 * ValidationRoadmap
 * Renders the 8-step "We interview. You hire." technical assessment flow
 * using the signature UniversalLifecycle continuous undulating wave visualization.
 * Preserves 100% of the original content, descriptions, and sequence.
 */
export default function ValidationRoadmap({
  steps = VALIDATION_FLOW,
  id = "validation-roadmap-lifecycle",
  className = "",
}: ValidationRoadmapProps) {
  const stages: LifecycleStageItem[] = useMemo(() => {
    return steps.map((step, index) => {
      const isHigh = index % 2 === 0;
      return {
        id: String(index + 1).padStart(2, "0"),
        name: step.label,
        description: step.detail,
        icon: STEP_ICONS[index] || CheckCircle2,
        isHigh,
      };
    });
  }, [steps]);

  return (
    <div className={`w-full select-none ${className}`}>
      <UniversalLifecycle
        stages={stages}
        id={id}
        tagStyle="none"
        ariaLabel="AI Talent 8-Step Practitioner Validation Roadmap"
      />
    </div>
  );
}
