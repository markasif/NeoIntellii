"use client";

import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { AI_GCC_PAGES, type AiGccPageKey } from "@/data/aiGcc";

/**
 * Section sub-navigation for every AI GCC page.
 * Configures the canonical UniversalSubnav engine.
 */
export default function AiGccSubnav({ current }: { current: AiGccPageKey }) {
  const items = AI_GCC_PAGES.map((page) => ({
    key: page.key,
    label: page.navLabel,
    href: `${page.path}#ai-gcc-content`,
    active: current === page.key,
  }));

  return (
    <UniversalSubnav
      id="ai-gcc-subnav"
      ariaLabel="AI GCC section navigation"
      items={items}
      variant="ocean"
      contentId="ai-gcc-content"
      sessionStorageKey="ai_gcc_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
