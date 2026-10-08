"use client";

import { useLocation } from "react-router-dom";
import UniversalSubnav from "@/components/navigation/UniversalSubnav";

/**
 * Section sub-navigation shared by every Industry GCC page.
 * Configures the canonical UniversalSubnav engine with the same look used by
 * the AI GCC, GCC Operations, AI Talent and AI Delivery Teams pillars.
 */
export interface IndustryPageNavItem {
  key: string;
  label: string;
  path: string;
}

export const INDUSTRY_PAGES: IndustryPageNavItem[] = [
  { key: "bfsi", label: "BFSI", path: "/industries/bfsi-gcc" },
  { key: "healthcare", label: "Healthcare", path: "/industries/healthcare-gcc" },
  { key: "manufacturing", label: "Manufacturing", path: "/industries/manufacturing-gcc" },
  { key: "retail", label: "Retail", path: "/industries/retail-gcc" },
  { key: "private-equity", label: "Private Equity", path: "/industries/private-equity-gcc" },
  { key: "technology", label: "Technology", path: "/industries/technology-gcc" },
];

export default function IndustriesSubnav() {
  const { pathname } = useLocation();

  const items = INDUSTRY_PAGES.map((page) => ({
    key: page.key,
    label: page.label,
    href: `${page.path}#industries-content`,
    active: pathname === page.path,
  }));

  return (
    <UniversalSubnav
      id="industries-subnav"
      ariaLabel="Industries section navigation"
      items={items}
      variant="ocean"
      contentId="industries-content"
      sessionStorageKey="industries_subnav_nav"
      scrollMode="center"
      justify="start"
    />
  );
}
