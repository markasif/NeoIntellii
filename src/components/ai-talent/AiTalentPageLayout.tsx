"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import AiTalentHero from "./AiTalentHero";
import AiTalentSubnav from "./AiTalentSubnav";
import AiTalentCTA from "./AiTalentCTA";
import RelatedAiTalentServices, { type RelatedRef } from "./RelatedAiTalentServices";
import Consultation from "@/features/home/components/Consultation";
import type { HeroCta } from "@/components/service-section/ServiceHero";
import {
  AI_TALENT_PAGE_BY_KEY,
  type AiTalentPageKey,
} from "@/data/aiTalent";
import { aiGccBookingUrl } from "@/lib/aiGccCta";

export type { RelatedRef };

export interface AiTalentPageLayoutProps {
  pageKey: AiTalentPageKey;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    secondaryCta?: HeroCta;
    tertiaryLink?: HeroCta;
    trustStrip?: string[];
  };
  cta: {
    title: string;
    description: string;
    secondary?: { label: string; href: string };
  };
  related: RelatedRef[];
  children: ReactNode;
}

export const talentBookingUrl = (
  pageKey: AiTalentPageKey,
  ctaName?: string,
  placement: "hero" | "footer_cta" = "hero"
) => {
  const page = AI_TALENT_PAGE_BY_KEY[pageKey] ?? AI_TALENT_PAGE_BY_KEY.overview;
  return aiGccBookingUrl({
    sourcePage: page.path,
    serviceInterest: page.serviceInterest,
    ctaName: ctaName ?? page.ctaLabel,
    placement,
    eventType: "staffing",
  });
};

/**
 * Shared page layout for every AI Talent page.
 * Delegates global shell to canonical ServicePageLayout.
 */
export default function AiTalentPageLayout({
  pageKey,
  hero,
  cta,
  related,
  children,
}: AiTalentPageLayoutProps) {
  const page = AI_TALENT_PAGE_BY_KEY[pageKey] ?? AI_TALENT_PAGE_BY_KEY.overview;

  return (
    <ServicePageLayout
      contentTargetId="ai-talent-content"
      sessionStorageKey="ai_talent_subnav_nav"
      hideConsultation={true}
    >
      <AiTalentHero
        pageKey={pageKey}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryCta={{ label: page.ctaLabel, href: talentBookingUrl(pageKey) }}
        secondaryCta={hero.secondaryCta}
        tertiaryLink={hero.tertiaryLink}
        trustStrip={hero.trustStrip}
      />
      <AiTalentSubnav current={pageKey} />
      <main id="ai-talent-content" className="scroll-mt-32">
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>
      {/* 1. Page-Specific Contextual CTA */}
      <AiTalentCTA
        pageKey={pageKey}
        title={cta.title}
        description={cta.description}
        secondary={cta.secondary}
      />

      {/* 2. Connected Ecosystem & Related AI Talent Services */}
      <RelatedAiTalentServices items={related} />

      {/* 3. Consultation Session */}
      <Consultation hideUpperCta={true} hideWaveDivider={true} />
    </ServicePageLayout>
  );
}
