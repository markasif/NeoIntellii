"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import type { HeroCta } from "@/components/service-section/ServiceHero";
import { AI_GCC_HUB_PATH, AI_GCC_PAGE_BY_KEY, type AiGccPageKey } from "@/data/aiGcc";

export type { HeroCta };

export interface AiGccHeroProps {
  pageKey: AiGccPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryLink?: HeroCta;
  trustStrip?: string[];
}

export default function AiGccHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  trustStrip,
}: AiGccHeroProps) {
  const isOverview = pageKey === "overview";
  const page = AI_GCC_PAGE_BY_KEY[pageKey];

  const crumbs = isOverview
    ? [{ name: "Home", href: "/" }, { name: "AI GCC" }]
    : [
        { name: "Home", href: "/" },
        { name: "AI GCC", href: AI_GCC_HUB_PATH },
        { name: page?.name ?? "Service" },
      ];

  return (
    <NeoIntelliHero
      id="ai-gcc-hero"
      ariaLabel="AI GCC India Executive Hero"
      breadcrumbs={!isOverview ? crumbs : undefined}
      title={title}
      description={description}
      desktopImage="/images/hero/ai-gcc.webp"
      mobileImage="/images/hero/ai-gcc-mobile.webp"
      imageAlt="AI GCC India Executive Command Center"
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      tertiaryCta={tertiaryLink}
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
