"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import {
  AI_ENGINEERING_HUB_PATH,
  AI_ENGINEERING_PAGE_BY_KEY,
  type AiEngineeringPageKey,
} from "@/data/aiEngineering";

export interface HeroCta {
  label: string;
  href: string;
}

export interface AiEngineeringHeroProps {
  pageKey: AiEngineeringPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryLink?: HeroCta;
  trustStrip?: string[];
}

export default function AiEngineeringHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  trustStrip,
}: AiEngineeringHeroProps) {
  const isOverview = pageKey === "overview";
  const page = AI_ENGINEERING_PAGE_BY_KEY[pageKey];

  const crumbs = isOverview
    ? [{ name: "Home", href: "/" }, { name: "AI Engineering" }]
    : [
      { name: "Home", href: "/" },
      { name: "AI Engineering", href: AI_ENGINEERING_HUB_PATH },
      { name: page?.name ?? "Service" },
    ];

  return (
    <NeoIntelliHero
      id="ai-engineering-hero"
      ariaLabel="Enterprise AI Engineering Hero"
      breadcrumbs={!isOverview ? crumbs : undefined}
      title={title}
      description={description}
      desktopImage="/images/hero/ai-engineering.webp"
      mobileImage="/images/hero/ai-engineering-mbile.webp"
      imageAlt="Enterprise AI Engineering Command Center"
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      tertiaryCta={tertiaryLink}
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
