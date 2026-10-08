"use client";

import React from "react";
import OutcomeCardGrid, { type OutcomeCardItem } from "@/components/shared/OutcomeCardGrid";

export interface OutcomeGroup {
  title: string;
  badge?: string;
  image: string;
  alt: string;
  aspect?: string;
  summary: string;
  metrics?: string[];
  link?: string;
  actionText?: string;
}

const DEFAULT_GROUPS: OutcomeGroup[] = [
  {
    title: "Talent",
    badge: "TALENT METRICS",
    image: "/images/gcc-operations/gcc-ops-people.jpg",
    alt: "GCC talent and recruitment operations dashboard",
    aspect: "aspect-[4/5]", // Big / Tall
    summary: "Time to productivity, offer-to-join ratios, and employee retention across cohorts.",
    metrics: [
      "Time to productivity",
      "Offer-to-join",
      "Critical-role hiring time",
      "Employee retention",
    ],
  },
  {
    title: "Service",
    badge: "SERVICE DELIVERY",
    image: "/images/gcc-operations/gcc-ops-performance.jpg",
    alt: "GCC service management and SLA performance dashboard",
    aspect: "aspect-[4/3]", // Short
    summary: "SLA achievement, incident resolution velocity, cycle time, and delivery quality.",
    metrics: [
      "Service SLA achievement",
      "Incident resolution",
      "Cycle time",
      "Quality",
    ],
  },
  {
    title: "Value",
    badge: "VALUE REALIZATION",
    image: "/images/gcc-operations/gcc-ops-workforce.jpg",
    alt: "GCC workforce planning and value realization command center",
    aspect: "aspect-[4/5]", // Big / Tall
    summary: "Unit service costs, stakeholder satisfaction, automation, and mandate expansion.",
    metrics: [
      "Cost per service or unit",
      "Stakeholder satisfaction",
      "Automation coverage",
      "Mandate expansion",
    ],
  },
  {
    title: "Risk",
    badge: "GOVERNANCE & CONTROLS",
    image: "/images/gcc-operations/gcc-ops-governance.jpg",
    alt: "GCC compliance, risk register, and audit readiness dashboard",
    aspect: "aspect-[4/3]", // Short
    summary: "Proactive risk remediation, control evidence, vendor reviews, and closed findings.",
    metrics: [
      "Risk remediation",
      "Control evidence on time",
      "Vendor reviews completed",
      "Audit findings closed",
    ],
  },
];

export interface GccPerformanceFrameworkProps {
  items?: OutcomeGroup[];
  sourceNote?: string;
  showSourceNote?: boolean;
  columns?: 2 | 3 | 4;
  imageRounded?: string;
  /** CTA style passed through to OutcomeCardGrid. */
  ctaButtonVariant?: "accent" | "gradient" | "cyan";
  /** Place the CTA after the card content instead of pinning it to the bottom. */
  ctaAfterContent?: boolean;
}

/**
 * Outcome measures grouped the way an operating review reads them.
 * Thin wrapper over the universal OutcomeCardGrid so every page that renders
 * this editorial card design shares one implementation.
 */
export default function GccPerformanceFramework({
  items,
  sourceNote,
  showSourceNote = true,
  columns,
  imageRounded,
  ctaButtonVariant,
  ctaAfterContent,
}: GccPerformanceFrameworkProps = {}) {
  const activeGroups = items || DEFAULT_GROUPS;
  const effectiveColumns =
    columns || (activeGroups.length === 3 ? 3 : activeGroups.length === 2 ? 2 : 4);

  const mapped: OutcomeCardItem[] = activeGroups.map((group) => ({
    title: group.title,
    badge: group.badge,
    image: group.image,
    alt: group.alt,
    aspect: group.aspect,
    summary: group.summary,
    lists: group.metrics && group.metrics.length > 0 ? [{ items: group.metrics }] : undefined,
    link: group.link,
    actionText: group.actionText,
  }));

  return (
    <OutcomeCardGrid
      items={mapped}
      columns={effectiveColumns}
      imageRounded={imageRounded}
      showSourceNote={showSourceNote && Boolean(sourceNote || !items)}
      sourceNote={sourceNote}
      ctaButtonVariant={ctaButtonVariant}
      ctaAfterContent={ctaAfterContent}
    />
  );
}
