"use client";

import React, { type ReactNode } from "react";
import AiGccInBrief from "@/components/ai-gcc/InBrief";

export interface InBriefProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standardized "IN BRIEF" summary block for Enterprise AI Engineering:
 * Delegates to the approved AiGcc InBrief component:
 * - Centered heading "In Brief" in Manrope (#0D306C)
 * - Short, refined amber underline (#F19326) centered directly under the heading
 * - Transparent editorial layout directly on section canvas (no card, no border)
 * - Large amber editorial drop-cap (#F19326) on the first letter of the paragraph
 * - Preserves 50-100 word count test invariants verbatim
 */
export default function InBrief({ children, className = "" }: InBriefProps) {
  return <AiGccInBrief className={className}>{children}</AiGccInBrief>;
}
