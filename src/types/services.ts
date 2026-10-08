import type { LucideIcon } from "lucide-react";

export type NavStatus = "live" | "pending";

export interface ServiceNavLink {
  label: string;
  href: string;
  status: NavStatus;
  source?: string;
}

export interface ServicePillar {
  name: string;
  href: string;
  status: NavStatus;
  source?: string;
  blurb: string;
  icon: LucideIcon;
  links: ServiceNavLink[];
}
