"use client";

import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { AI_ENGINEERING_PAGES, type AiEngineeringPageKey } from "@/data/aiEngineering";

/**
 * Section sub-navigation for every Enterprise AI Engineering page.
 * Configures the canonical UniversalSubnav engine.
 */
export default function AiEngineeringSubnav({ current }: { current: AiEngineeringPageKey }) {
  const items = AI_ENGINEERING_PAGES.map((page) => ({
    key: page.key,
    label: page.navLabel,
    href: page.path,
    active: current === page.key,
  }));

  return (
    <UniversalSubnav
      id="ai-engineering-subnav"
      ariaLabel="AI Engineering services navigation"
      items={items}
      variant="ocean"
      contentId="ai-engineering-content"
      sessionStorageKey="ai_engineering_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
