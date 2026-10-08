"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import AiEngineeringHero, { type AiEngineeringHeroProps } from "./AiEngineeringHero";
import AiEngineeringSubnav from "./AiEngineeringSubnav";
import AiEngineeringCTA from "./AiEngineeringCTA";
import RelatedAiServices, { type RelatedLink } from "./RelatedAiServices";
import Consultation from "@/features/home/components/Consultation";

export interface AiEngineeringPageLayoutProps {
  hero: AiEngineeringHeroProps;
  cta: { title: string; description: string };
  related?: RelatedLink[];
  children: ReactNode;
}

/**
 * Shared page layout for every Enterprise AI Engineering page.
 * Delegates global shell to canonical ServicePageLayout.
 */
export default function AiEngineeringPageLayout({
  hero,
  cta,
  related = [],
  children,
}: AiEngineeringPageLayoutProps) {
  return (
    <ServicePageLayout
      contentTargetId="ai-engineering-content"
      sessionStorageKey="ai_engineering_subnav_nav"
      hideConsultation={true}
    >
      <AiEngineeringHero {...hero} />
      <AiEngineeringSubnav current={hero.pageKey} />
      <main id="ai-engineering-content" className="scroll-mt-32">
        <motion.div
          key={hero.pageKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
        <AiEngineeringCTA pageKey={hero.pageKey} title={cta.title} description={cta.description} />
        {related.length > 0 && <RelatedAiServices links={related} />}
        <Consultation hideUpperCta={true} hideWaveDivider={related.length > 0} />
      </main>
    </ServicePageLayout>
  );
}
