"use client";

import { RECRUITMENT_HUB_PATH, RECRUITMENT_PAGE_BY_KEY, type RecruitmentPageKey } from "@/data/recruitment";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";

export interface RecruitmentHeroCta {
  label: string;
  href: string;
}

export interface RecruitmentHeroProps {
  pageKey: RecruitmentPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: RecruitmentHeroCta;
  secondaryCta?: RecruitmentHeroCta;
  trustStrip?: string[];
}

/**
 * Signature page hero for every Recruitment & Staffing page.
 * Delegates to the shared NeoIntelliHero system with the recruitment artwork.
 */
export default function RecruitmentHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  trustStrip,
}: RecruitmentHeroProps) {
  const isHub = pageKey === "hub";
  const page = RECRUITMENT_PAGE_BY_KEY[pageKey];

  return (
    <NeoIntelliHero
      id="recruitment-hero"
      ariaLabel={`${title} hero`}
      breadcrumbs={
        isHub
          ? [
              { name: "Home", href: "/" },
              { name: "Recruitment" },
            ]
          : [
              { name: "Home", href: "/" },
              { name: "Recruitment", href: RECRUITMENT_HUB_PATH },
              { name: page?.name ?? "Recruitment" },
            ]
      }
      title={title}
      description={description}
      desktopImage="/images/hero/recruitment.webp"
      mobileImage="/images/hero/recruitment-mobile.webp"
      imageAlt={`${title} - NeoIntelli India`}
      primaryCta={{ label: primaryCta.label, href: primaryCta.href }}
      secondaryCta={
        secondaryCta
          ? { label: secondaryCta.label, href: secondaryCta.href }
          : undefined
      }
      trustStrip={trustStrip}
    />
  );
}