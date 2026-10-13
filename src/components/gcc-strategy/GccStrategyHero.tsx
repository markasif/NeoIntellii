"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import { trackEvent } from "@/lib/analytics";
import type { GccLeadContext } from "@/lib/gccStrategyRoutes";

export interface HeroCta {
  label: string;
  href: string;
}

export interface Crumb {
  name: string;
  href?: string;
}

export interface GccStrategyHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  contextualLink?: HeroCta;
  leadContext?: GccLeadContext;
  trustStrip?: string[];
}

export default function GccStrategyHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  contextualLink,
  leadContext,
  trustStrip,
}: GccStrategyHeroProps) {
  const isOverview = breadcrumbs.length <= 2;
  const track = (ctaName: string) => () => {
    if (leadContext) {
      trackEvent("cta_click", { location: "gcc_strategy_hero", ...leadContext, cta_name: ctaName });
    }
  };

  return (
    <NeoIntelliHero
      id="gcc-strategy-hero"
      ariaLabel="GCC Strategy & Setup Executive Hero"
      breadcrumbs={breadcrumbs}
      title={title}
      description={description}
      desktopImage="/images/hero/gcc.webp"
      mobileImage="/images/hero/gcc-mobile.webp"
      imageAlt="GCC Strategy & Setup Executive Command Center"
      primaryCta={{
        label: primaryCta.label,
        href: primaryCta.href,
        onClick: track(primaryCta.label),
      }}
      secondaryCta={
        secondaryCta
          ? {
              label: secondaryCta.label,
              href: secondaryCta.href,
              onClick: track(secondaryCta.label),
            }
          : undefined
      }
      tertiaryCta={
        contextualLink
          ? {
              label: contextualLink.label,
              href: contextualLink.href,
              onClick: track(contextualLink.label),
            }
          : undefined
      }
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
