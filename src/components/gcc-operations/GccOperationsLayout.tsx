import { type ReactNode } from "react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import type { GccOpsPage } from "@/data/gccOperationsContent";
import GccOperationsHero from "./GccOperationsHero";
import GccOperationsSubnav from "./GccOperationsSubnav";
import GccOperationsCTA from "./GccOperationsCTA";
import RelatedGccServices from "./RelatedGccServices";
import Consultation from "@/features/home/components/Consultation";

export interface GccOperationsLayoutProps {
  page: GccOpsPage;
  eyebrow: string;
  heroDescription: string;
  secondaryCta?: { label: string; href: string };
  contextualLink?: { label: string; href: string };
  trustStrip?: string[];
  cta: { title: string; description: string; secondary?: { label: string; href: string } };
  children: ReactNode;
}

/**
 * Page chrome shared by all eight GCC Operations pages.
 * Delegates global shell to canonical ServicePageLayout.
 */
export default function GccOperationsLayout({
  page,
  eyebrow,
  heroDescription,
  secondaryCta,
  contextualLink,
  trustStrip,
  cta,
  children,
}: GccOperationsLayoutProps) {
  return (
    <ServicePageLayout
      contentTargetId="gcc-operations-content"
      sessionStorageKey="gcc_subnav_nav"
      hideConsultation={true}
    >
      <GccOperationsHero
        page={page}
        eyebrow={eyebrow}
        description={heroDescription}
        secondaryCta={secondaryCta}
        contextualLink={contextualLink}
        trustStrip={trustStrip}
      />
      <GccOperationsSubnav pathname={page.path} />
      <main id="gcc-operations-content" className="scroll-mt-32">
        <motion.div
          key={page.path}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* 1. Page-Specific CTA */}
      <GccOperationsCTA page={page} title={cta.title} description={cta.description} secondary={cta.secondary} />

      {/* 2. Connected Ecosystem & Tools and References */}
      <RelatedGccServices currentKey={page.key} theme="navy" />

      {/* 3. Consultation Session */}
      <Consultation hideUpperCta={true} hideWaveDivider={true} />
    </ServicePageLayout>
  );
}
