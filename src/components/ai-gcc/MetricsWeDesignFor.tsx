import React from "react";
import DeliverablesList, { type DeliverableItem } from "./DeliverablesList";

/**
 * Engineering objectives and metrics targets for AI GCC pages:
 * Matches the DeliverablesList design from AI Advisory
 */
export default function MetricsWeDesignFor({
  items,
  className = "",
}: {
  title?: string;
  items: (DeliverableItem | string)[];
  className?: string;
}) {
  return <DeliverablesList items={items} className={className} />;
}
