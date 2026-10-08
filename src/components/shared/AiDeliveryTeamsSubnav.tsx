"use client";

import { useLocation } from "react-router-dom";
import UniversalSubnav from "@/components/navigation/UniversalSubnav";

const DELIVERY_TEAM_ITEMS = [
  { label: "Overview", href: "/services/ai-delivery-teams" },
  { label: "Dedicated Team", href: "/services/ai-delivery-teams/dedicated-ai-engineering-team" },
  { label: "AI Delivery Pod", href: "/services/ai-delivery-teams/ai-delivery-pod" },
  { label: "Forward-Deployed", href: "/services/ai-delivery-teams/forward-deployed-ai-engineers" },
  { label: "Team Transfer", href: "/services/ai-delivery-teams/ai-team-transfer" },
];

/**
 * Section navigation for the AI Delivery Teams category.
 * Configures the canonical UniversalSubnav engine.
 */
export default function AiDeliveryTeamsSubnav() {
  const { pathname } = useLocation();
  const current = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;

  const items = DELIVERY_TEAM_ITEMS.map((item) => ({
    ...item,
    active: current === item.href,
  }));

  return (
    <UniversalSubnav
      id="ai-delivery-subnav"
      ariaLabel="AI Delivery Teams section navigation"
      items={items}
      variant="cyan"
      contentId="ai-delivery-content"
      sessionStorageKey="ai_delivery_subnav_nav"
      scrollMode="offset"
      justify="center"
    />
  );
}
