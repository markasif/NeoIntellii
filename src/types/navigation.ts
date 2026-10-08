import type { LucideIcon } from "lucide-react";

export type MegaLink = {
  label: string;
  href: string;
  desc?: string;
  icon?: LucideIcon;
  external?: boolean;
};

export type MegaColumn = {
  label: string;
  links: MegaLink[];
};

export type MegaFeatured = {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  links?: MegaLink[];
  bullets?: string[];
};

export type MegaItem = {
  columnsPerRow?: number;
  wide?: boolean;
  variant?: "cards" | "links";
  name: string;
  href?: string;
  external?: boolean;
  logo?: {
    src: string;
    alt: string;
    tagline: string;
    heading?: string;
    subheading?: string;
    description?: string;
    href: string;
  };
  columns: MegaColumn[];
  featured?: MegaFeatured;
};
