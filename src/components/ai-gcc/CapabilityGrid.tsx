"use client";

import React from "react";
import CapabilitiesSection, { type CapabilityItem } from "./CapabilitiesSection";

export interface Capability {
  title: string;
  body?: string;
  desc?: string;
}

/**
 * Editorial capability grid for AI GCC pages:
 * Reusable component matching the unified CapabilitiesSection design.
 */
export default function CapabilityGrid({
  items,
  columns = 3,
}: {
  items: (Capability | CapabilityItem)[];
  columns?: 2 | 3 | 4;
}) {
  return <CapabilitiesSection items={items} columns={columns} />;
}
