"use client";

import React from "react";
import { OPERATING_ENGINES } from "@/data/aiGcc";
import CapabilitiesSection from "./CapabilitiesSection";

/**
 * The nine operating engines of one AI GCC:
 * Reusable component implementation matching the reference design:
 * - Crisp white card with subtle blue borders and hover elevation
 * - Deep navy icons per engine
 * - Bold navy typography
 * - Contextual bottom navigation links with right arrows
 */
export default function OperatingEngineGrid() {
  return <CapabilitiesSection items={OPERATING_ENGINES} columns={3} />;
}
