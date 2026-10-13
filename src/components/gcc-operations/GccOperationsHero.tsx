"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import { buildBreadcrumbItems, SITE_URL } from "@/lib/seo";
import type { GccOpsPage } from "@/data/gccOperationsContent";
import { gccOpsBookingHref, trackGccOpsCta } from "./GccOperationsCTA";

interface GccOperationsHeroProps {
  page: GccOpsPage;
  eyebrow: string;
  description: string;
  secondaryCta?: { label: string; href: string };
  contextualLink?: { label: string; href: string };
  trustStrip?: string[];
}

/**
 * High-Performance Executive Hero Section for GCC Operations:
 * Integrates directly with the reusable NeoIntelliHero system.
 * - Mobile: Centered text, single white CTA, portrait mobile artwork (/images/hero/gcc-operations-mobile.webp).
 * - Desktop: Left-aligned content block, 3 CTAs in horizontal row, widescreen desktop artwork (/images/hero/gcc-operations.webp).
 */
export default function GccOperationsHero({
  page,
  eyebrow,
  description,
  secondaryCta,
  contextualLink,
  trustStrip,
}: GccOperationsHeroProps) {
  const isOverview = page.key === "overview";
  const crumbs = buildBreadcrumbItems(page.path).map((item) => ({
    name: item.name,
    href: item.item.replace(SITE_URL, "") || "/",
  }));

  return (
    <NeoIntelliHero
      id="gcc-operations-hero"
      ariaLabel="GCC Operations India Hero"
      breadcrumbs={!isOverview ? crumbs : undefined}
      titlePrefix={isOverview ? "Run and scale" : undefined}
      titleHighlight={isOverview ? "your GCC" : undefined}
      titleSuffix={isOverview ? "in India." : undefined}
      title={!isOverview ? page.h1 : undefined}
      description={description}
      desktopImage="/images/hero/home page.webp"
      mobileImage="/images/hero/home-mobile.webp"
      imageAlt="NeoIntelli AI GCC Architecture Futuristic City Skyline"
      primaryCta={{
        label: page.ctaLabel,
        href: gccOpsBookingHref("hero"),
        onClick: () => trackGccOpsCta(page, page.ctaLabel, "hero"),
      }}
      secondaryCta={secondaryCta}
      tertiaryCta={contextualLink}
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
