"use client";

import { useLocation } from "react-router-dom";
import UniversalSubnav from "@/components/navigation/UniversalSubnav";
import { GCC_STRATEGY_NAV, GCC_STRATEGY_ROUTES, GCC_STRATEGY_PILLAR_LABEL } from "@/lib/gccStrategyRoutes";

/**
 * Shared section navigation for the GCC Strategy & Setup pillar.
 * Configures the canonical UniversalSubnav engine.
 */
export default function GccStrategySubnav() {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/$/, "") || "/";

  const items = GCC_STRATEGY_NAV.map((item) => {
    const href = GCC_STRATEGY_ROUTES[item.key];
    return {
      key: item.key,
      label: item.label,
      href,
      active: current === href,
      promoted: item.key === "microGcc",
    };
  });

  return (
    <UniversalSubnav
      id="gcc-strategy-subnav"
      ariaLabel={`${GCC_STRATEGY_PILLAR_LABEL} sections`}
      items={items}
      variant="cyan"
      contentId="gcc-strategy-content"
      sessionStorageKey="gcc_strategy_subnav_nav"
      scrollMode="offset"
      justify="center"
    />
  );
}
