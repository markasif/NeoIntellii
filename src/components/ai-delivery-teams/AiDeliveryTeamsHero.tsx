"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";

export interface HeroCta {
  label: string;
  href: string;
}

export interface Crumb {
  name: string;
  href?: string;
}

export interface ContextualLinkProp {
  textPrefix?: string;
  linkLabel?: string;
  label?: string;
  href: string;
}

export interface AiDeliveryTeamsHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  contextualLink?: ContextualLinkProp;
  trustStrip?: string[];
}

export default function AiDeliveryTeamsHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  contextualLink,
  trustStrip,
}: AiDeliveryTeamsHeroProps) {
  const isOverview = breadcrumbs.length <= 2;
  const tertiary = contextualLink
    ? {
        label: contextualLink.linkLabel || contextualLink.label || "Learn More",
        href: contextualLink.href,
      }
    : undefined;

  return (
    <NeoIntelliHero
      id="ai-delivery-teams-hero"
      ariaLabel="AI Delivery Teams Executive Hero"
      breadcrumbs={!isOverview ? breadcrumbs : undefined}
      title={title}
      description={description}
      desktopImage="/images/hero/delivery-team.webp"
      mobileImage="/images/hero/delivery-team-mobile.webp"
      imageAlt="AI Delivery Teams Executive Command Center"
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      tertiaryCta={tertiary}
      trustStrip={!isOverview ? trustStrip : undefined}
    />
  );
}
