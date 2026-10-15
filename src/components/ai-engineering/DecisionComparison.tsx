"use client";

import React, { type ReactNode } from "react";
import ResponsiveTable from "@/components/ai-gcc/ResponsiveTable";

export interface DecisionComparisonProps {
  caption: string;
  columns: string[];
  rows: (string | ReactNode)[][];
  note?: string;
}

/**
 * Standardized Decision & Comparison Table:
 * Delegates to the approved ResponsiveTable component:
 * - Rich navy thead (#0D244D) with white uppercase font-mono headers
 * - Alternating zebra striping with hover highlight
 * - Rounded-2xl container with subtle elevation and borders
 * - Accessible table markup and container-confined horizontal scrolling
 */
export default function DecisionComparison({
  caption,
  columns,
  rows,
  note,
}: DecisionComparisonProps) {
  return (
    <figure className="w-full">
      <ResponsiveTable
        caption={caption}
        headers={columns}
        rows={rows}
        hideCaption={false}
      />
      {note && (
        <figcaption className="mt-3.5 text-xs text-[#505D74] leading-relaxed max-w-6xl mx-auto text-left">
          {note}
        </figcaption>
      )}
    </figure>
  );
}
