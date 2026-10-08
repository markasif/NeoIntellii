"use client";

import React, { useMemo } from "react";
import {
  Compass,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import UniversalLifecycle, {
  type LifecycleStageItem,
} from "@/components/shared/UniversalLifecycle";
import { AI_ENGINEERING_LIFECYCLE } from "@/data/aiEngineering";

const STAGE_ICONS = [Compass, CheckCircle2, Cpu, ShieldCheck, TrendingUp, Users];

/**
 * The signature NeoIntelli framework: Proof of Value -> Production -> Capability.
 * Consolidated via UniversalLifecycle using the continuous sinusoidal wave visualization.
 * 6 stages, fully responsive with interactive stage card timeline.
 */
export default function AiEngineeringLifecycle({
  theme = "light",
}: {
  theme?: "light" | "navy";
}) {
  const stages: LifecycleStageItem[] = useMemo(() => {
    return AI_ENGINEERING_LIFECYCLE.map((stage, idx) => ({
      id: stage.step,
      name: stage.name,
      description: stage.summary,
      items: [...stage.items],
      icon: STAGE_ICONS[idx] || Cpu,
    }));
  }, []);

  return (
    <div className="w-full">
      <UniversalLifecycle
        id="ai-engineering-lifecycle-wave"
        stages={stages}
        theme={theme}
        variant="default"
        tagStyle="none"
        ariaLabel="AI Engineering six-stage lifecycle from Proof of Value to Permanent Capability"
      />
    </div>
  );
}
