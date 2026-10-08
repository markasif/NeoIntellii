"use client";

import React, { useMemo } from "react";
import {
  Search,
  Target,
  ArrowRightLeft,
  GraduationCap,
  Terminal,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface ReskillingFlowStep {
  label: string;
  detail: string;
}

const STEP_ICONS: LucideIcon[] = [
  Search,          // 1. Assessment
  Target,          // 2. Capability gap
  ArrowRightLeft,  // 3. Role conversion
  GraduationCap,   // 4. Learning path
  Terminal,        // 5. Practical project
  ShieldCheck,     // 6. Technical validation
  Rocket,          // 7. Internal deployment
];

export interface ReskillingLifecycleFlowProps {
  steps: ReskillingFlowStep[];
  id?: string;
  className?: string;
}

/**
 * ReskillingLifecycleFlow
 * Renders the 7-step "Assessment to internal deployment" role conversion flow
 * using the signature UniversalLifecycle continuous sinusoidal wave visualization.
 */
export default function ReskillingLifecycleFlow({
  steps,
  id = "reskilling-academy-lifecycle",
  className = "",
}: ReskillingLifecycleFlowProps) {
  const stages: LifecycleStageItem[] = useMemo(() => {
    return steps.map((step, index) => {
      const Icon = STEP_ICONS[index] || CheckCircle2;
      return {
        id: String(index + 1).padStart(2, "0"),
        name: step.label,
        description: step.detail,
        icon: Icon,
      };
    });
  }, [steps]);

  return (
    <div className={`w-full select-none ${className}`}>
      <UniversalLifecycle
        stages={stages}
        id={id}
        tagStyle="none"
        ariaLabel="AI Talent Academy & Reskilling 7-Step Lifecycle"
      />
    </div>
  );
}
