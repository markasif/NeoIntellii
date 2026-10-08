"use client";

import React, { useMemo } from "react";
import {
  FileText,
  MapPin,
  Lock,
  UserCheck,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";

export interface SearchStep {
  label: string;
  detail: string;
}

const STEP_ICONS: LucideIcon[] = [
  FileText,
  MapPin,
  Lock,
  UserCheck,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
];

export interface ExecutiveSearchFlowProps {
  steps: SearchStep[];
  id?: string;
  className?: string;
}

export default function ExecutiveSearchFlow({
  steps,
  id = "executive-search-lifecycle",
  className = "",
}: ExecutiveSearchFlowProps) {
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
        ariaLabel="AI Executive Search 7-Stage Process Lifecycle"
      />
    </div>
  );
}
