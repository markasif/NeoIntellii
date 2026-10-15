"use client";

import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { RECRUITMENT_PAGES, type RecruitmentPageKey } from "@/data/recruitment";

/**
 * Section sub-navigation for every Recruitment & Staffing page.
 * Configures the canonical UniversalSubnav engine (same look as the other
 * service pillars).
 */
export default function RecruitmentSubnav({ current }: { current: RecruitmentPageKey }) {
  const items = RECRUITMENT_PAGES.map((page) => ({
    key: page.key,
    label: page.navLabel,
    href: page.path,
    active: current === page.key,
  }));

  return (
    <UniversalSubnav
      id="recruitment-subnav"
      ariaLabel="Recruitment section navigation"
      items={items}
      variant="ocean"
      contentId="recruitment-content"
      sessionStorageKey="recruitment_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
