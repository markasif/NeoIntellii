"use client";

import Section, { type SectionProps } from "@/components/ui/Section";

export type OpsSectionProps = SectionProps;

/**
 * Backward-compatible thin wrapper for GCC Operations pages.
 * Delegates to canonical Section primitive preserving ops-specific padding and alignment defaults.
 */
export default function OpsSection({
  align = "left",
  width = "default",
  ...props
}: OpsSectionProps) {
  return (
    <Section
      align={align}
      width={width}
      paddingVariant="ops"
      {...props}
    />
  );
}
