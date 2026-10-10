"use client";

import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { GCC_OPERATIONS_PAGES } from "@/data/gccOperationsContent";

/**
 * Section sub-navigation for every GCC Operations page.
 * Configures the canonical UniversalSubnav engine.
 */
export default function GccOperationsSubnav({ pathname }: { pathname: string }) {
  const items = GCC_OPERATIONS_PAGES.map((page) => ({
    label: page.subnavLabel,
    href: page.path,
    active: pathname === page.path,
  }));

  return (
    <UniversalSubnav
      id="gcc-operations-subnav"
      ariaLabel="GCC Operations section navigation"
      items={items}
      variant="ocean"
      contentId="gcc-operations-content"
      sessionStorageKey="gcc_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
