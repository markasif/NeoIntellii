"use client";

import React, { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import ServicePageLayout from "@/components/layout/ServicePageLayout";
import RecruitmentHero, { type RecruitmentHeroCta } from "./RecruitmentHero";
import RecruitmentSubnav from "./RecruitmentSubnav";
import RecruitmentCTA from "./RecruitmentCTA";
import ConnectedEcosystem from "@/components/shared/ConnectedEcosystem";
import Consultation from "@/features/home/components/Consultation";
import { getPageMeta } from "@/lib/pageMeta";
import { type LucideIcon, Users, RefreshCw, Layers, Rocket, Cpu, LineChart } from "lucide-react";
import { RECRUITMENT_PAGE_BY_KEY, type RecruitmentPageKey } from "@/data/recruitment";

/** Resolves a related-card icon from the link name. */
function resolveRelatedIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("recruit") || lower.includes("staff") || lower.includes("search") || lower.includes("rpo") || lower.includes("talent")) return Users;
  if (lower.includes("outsourc")) return RefreshCw;
  if (lower.includes("pod") || lower.includes("delivery") || lower.includes("team")) return Layers;
  if (lower.includes("setup") || lower.includes("launch") || lower.includes("gcc")) return Rocket;
  if (lower.includes("ai") || lower.includes("data")) return Cpu;
  return LineChart;
}

export interface RecruitmentPageLayoutProps {
  pageKey: RecruitmentPageKey;
  pageTitle?: string;
  metaDescription?: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    secondaryCta?: RecruitmentHeroCta;
    trustStrip?: string[];
  };
  cta: {
    title: string;
    description: string;
    href?: string;
    secondary?: { label: string; href: string };
  };
  related: { name: string; href: string }[];
  children: ReactNode;
}

/**
 * Shared page layout for every Recruitment & Staffing page.
 * Mirrors the AI Talent pillar layout: canonical ServicePageLayout shell,
 * signature hero, sticky section subnav, standard content and Consultation.
 */
export default function RecruitmentPageLayout({
  pageKey,
  pageTitle,
  metaDescription,
  hero,
  cta,
  related,
  children,
}: RecruitmentPageLayoutProps) {
  const page = RECRUITMENT_PAGE_BY_KEY[pageKey] ?? RECRUITMENT_PAGE_BY_KEY.hub;

  useEffect(() => {
    if (pageTitle) document.title = pageTitle;
    if (metaDescription) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", metaDescription);
    }
  }, [pageTitle, metaDescription]);

  return (
    <ServicePageLayout
      contentTargetId="recruitment-content"
      sessionStorageKey="recruitment_subnav_nav"
      hideConsultation={true}
    >
      <RecruitmentHero
        pageKey={pageKey}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryCta={{ label: page.ctaLabel, href: "/contact" }}
        secondaryCta={hero.secondaryCta}
        trustStrip={hero.trustStrip}
      />
      <RecruitmentSubnav current={pageKey} />
      <main id="recruitment-content" className="scroll-mt-32">
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* 1. Page-specific CTA */}
      <RecruitmentCTA
        eyebrow={page.serviceInterest}
        title={cta.title}
        description={cta.description}
        cta={{ label: page.ctaLabel, href: cta.href ?? "/contact" }}
        secondary={cta.secondary}
      />

      {/* 2. Connected ecosystem / continue exploring */}
      {related.length > 0 && (
        <ConnectedEcosystem
          title="Continue exploring"
          cards={related.map((link) => {
            const meta = getPageMeta(link.href, link.name);
            return {
              path: link.href,
              name: link.name,
              summary: meta.description,
              anchor: `Read about ${meta.title}`,
              icon: resolveRelatedIcon(link.name),
            };
          })}
          hideConsultation
          waveFill="#E7EDF9"
        />
      )}

      {/* 3. Consultation */}
      <Consultation hideUpperCta={true} hideWaveDivider={true} />
    </ServicePageLayout>
  );
}
