"use client";

import UniversalLifecycle, {
  type LifecycleStageItem,
  type UniversalLifecycleProps,
} from "@/components/shared/UniversalLifecycle";

export type { LifecycleStageItem };

export interface GccLifecycleWaveProps extends UniversalLifecycleProps {
  stages?: LifecycleStageItem[];
}

/**
 * GccLifecycleWave
 * Reusable lifecycle component delegating directly to the consolidated UniversalLifecycle component.
 */
export default function GccLifecycleWave(props: GccLifecycleWaveProps) {
  return <UniversalLifecycle {...props} />;
}
