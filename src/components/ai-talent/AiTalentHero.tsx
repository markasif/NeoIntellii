"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import type { HeroCta } from "@/components/service-section/ServiceHero";
import { AI_TALENT_HUB_PATH, AI_TALENT_PAGE_BY_KEY, type AiTalentPageKey } from "@/data/aiTalent";

export type { HeroCta };

export interface AiTalentHeroProps {
  pageKey: AiTalentPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryLink?: HeroCta;
  trustStrip?: string[];
}

export default function AiTalentHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryLink,
  trustStrip,
}: AiTalentHeroProps) {
  const isOverview = pageKey === "overview";
  const page = AI_TALENT_PAGE_BY_KEY[pageKey];

  const crumbs = isOverview
    ? [{ name: "Home", href: "/" }, { name: "AI Talent" }]
    : [
        { name: "Home", href: "/" },
        { name: "AI Talent", href: AI_TALENT_HUB_PATH },
        { name: page?.name ?? "Service" },
      ];

  return (
    <NeoIntelliHero
      id="ai-talent-hero"
      ariaLabel="AI Talent India Executive Hero"
      breadcrumbs={!isOverview ? crumbs : undefined}
      title={title}
      description={description}
      desktopImage="/hero/ai-talent.webp"
      mobileImage="/hero/ai-talent-mobile.webp"
      imageAlt="AI Talent Acquisition Command Center"
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      tertiaryCta={tertiaryLink}
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
