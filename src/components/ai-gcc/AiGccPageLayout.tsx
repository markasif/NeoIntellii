"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import AiGccHero, { type AiGccHeroProps } from "./AiGccHero";
import AiGccSubnav from "./AiGccSubnav";
import AiGccCTA from "./AiGccCTA";
import RelatedAiGccServices, { type RelatedRef } from "./RelatedAiGccServices";
import Consultation from "@/features/home/components/Consultation";

export interface AiGccPageLayoutProps {
  hero: AiGccHeroProps;
  cta: { title: string; description: string; secondary?: { label: string; href: string } };
  related: RelatedRef[];
  children: ReactNode;
}

/**
 * Shared page layout for every AI GCC page.
 * Delegates global shell to canonical ServicePageLayout.
 */
export default function AiGccPageLayout({ hero, cta, related, children }: AiGccPageLayoutProps) {
  return (
    <ServicePageLayout
      contentTargetId="ai-gcc-content"
      sessionStorageKey="ai_gcc_subnav_nav"
      hideConsultation={true}
    >
      <AiGccHero {...hero} />
      <AiGccSubnav current={hero.pageKey} />
      <main id="ai-gcc-content" className="scroll-mt-32 w-full max-w-[100vw] overflow-x-hidden">
        <motion.div
          key={hero.pageKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[100vw] overflow-x-hidden"
        >
          {children}
        </motion.div>
      </main>

      {/* 1. Page-Specific Contextual CTA */}
      <AiGccCTA
        pageKey={hero.pageKey}
        title={cta.title}
        description={cta.description}
        secondary={cta.secondary}
      />

      {/* 2. Connected Ecosystem & Planning Tools */}
      <RelatedAiGccServices currentKey={hero.pageKey} items={related} />

      {/* 3. Let's Build Together Consultation Session */}
      <Consultation hideUpperCta={true} hideWaveDivider={true} />
    </ServicePageLayout>
  );
}
