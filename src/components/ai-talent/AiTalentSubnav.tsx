"use client";

import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { AI_TALENT_PAGES, type AiTalentPageKey } from "@/data/aiTalent";

/**
 * Section sub-navigation for every AI Talent page.
 * Configures the canonical UniversalSubnav engine.
 */
export default function AiTalentSubnav({ current }: { current: AiTalentPageKey }) {
  const items = AI_TALENT_PAGES.map((page) => ({
    key: page.key,
    label: page.navLabel,
    href: page.path,
    active: current === page.key,
  }));

  return (
    <UniversalSubnav
      id="ai-talent-subnav"
      ariaLabel="AI Talent section navigation"
      items={items}
      variant="ocean"
      contentId="ai-talent-content"
      sessionStorageKey="ai_talent_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
