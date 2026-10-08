"use client";

import React from "react";
import OutcomeCardGrid from "@/components/shared/OutcomeCardGrid";

export interface BuyerPath {
  title: string;
  tagline?: string;
  bestFor: string[];
  includes: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  image?: string;
  alt?: string;
  badge?: string;
  aspect?: string;
}

const DEFAULT_METAS = [
  {
    image: "/images/solution_micro_gcc.jpg",
    alt: "AI Micro GCC team collaborating in India tech hub",
    badge: "WAY 01",
    aspect: "aspect-[4/3]",
  },
  {
    image: "/images/mosaic_ai_gcc.jpg",
    alt: "Global AI Capability Center enterprise launch",
    badge: "WAY 02",
    aspect: "aspect-[16/10]",
  },
  {
    image: "/images/gcc_modernization.jpg",
    alt: "Enterprise AI GCC transformation and modernization",
    badge: "WAY 03",
    aspect: "aspect-[4/3]",
  },
];

/**
 * Three ways to begin an AI GCC.
 * Thin wrapper over the universal OutcomeCardGrid, which owns the editorial
 * outcome-framework card design used across the site.
 */
export default function BuyerPathCards({ paths }: { paths: BuyerPath[] }) {
  return (
    <OutcomeCardGrid
      items={paths.map((path, idx) => {
        const fallback = DEFAULT_METAS[idx] || DEFAULT_METAS[0];
        return {
          title: path.title,
          badge: path.badge || fallback.badge,
          image: path.image || fallback.image,
          alt: path.alt || fallback.alt,
          aspect: path.aspect || fallback.aspect,
          summary: path.tagline,
          lists:
            path.bestFor && path.bestFor.length > 0
              ? [{ label: "Best for", items: path.bestFor }]
              : undefined,
          includes: path.includes,
          cta: path.cta,
        };
      })}
      columns={3}
      titleSize="md"
      maxWidthClassName="max-w-7xl mx-auto"
    />
  );
}
