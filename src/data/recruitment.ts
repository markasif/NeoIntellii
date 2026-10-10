/**
 * Single source of truth for the Recruitment & Staffing section: routes,
 * subnav labels, visible names and CTAs. Nav, subnav, related links and CTAs
 * read from here so a route cannot drift between surfaces.
 */

export const RECRUITMENT_HUB_PATH = "/recruitment";

export type RecruitmentPageKey =
  | "hub"
  | "permanent"
  | "contract-staffing"
  | "executive-search"
  | "rpo";

export interface RecruitmentPage {
  key: RecruitmentPageKey;
  path: string;
  navLabel: string;
  name: string;
  summary: string;
  ctaLabel: string;
  serviceInterest: string;
}

export const RECRUITMENT_PAGES: RecruitmentPage[] = [
  {
    key: "hub",
    path: RECRUITMENT_HUB_PATH,
    navLabel: "Overview",
    name: "Recruitment & Staffing",
    summary:
      "Permanent recruitment, contract staffing, executive search and RPO delivered pan-India with AI-powered sourcing and written SLAs.",
    ctaLabel: "Talk to a Recruiter",
    serviceInterest: "Recruitment & Staffing",
  },
  {
    key: "permanent",
    path: `${RECRUITMENT_HUB_PATH}/permanent`,
    navLabel: "Permanent Recruitment",
    name: "Permanent Recruitment",
    summary:
      "Mid-to-senior lateral hiring for global enterprises and India GCCs, where speed and quality both matter.",
    ctaLabel: "Discuss a Permanent Hire",
    serviceInterest: "Permanent Recruitment",
  },
  {
    key: "contract-staffing",
    path: `${RECRUITMENT_HUB_PATH}/contract-staffing`,
    navLabel: "Contract Staffing",
    name: "Contract Staffing & C2H",
    summary:
      "Compliant contract, contract-to-hire and temporary staffing with candidates on our payroll and full statutory coverage.",
    ctaLabel: "Discuss Contract Staffing",
    serviceInterest: "Contract Staffing",
  },
  {
    key: "executive-search",
    path: `${RECRUITMENT_HUB_PATH}/executive-search`,
    navLabel: "Executive Search",
    name: "Executive Search",
    summary:
      "Retained search for CXO, board and senior leadership mandates where confidentiality and depth matter more than speed.",
    ctaLabel: "Discuss an Executive Search",
    serviceInterest: "Executive Search",
  },
  {
    key: "rpo",
    path: `${RECRUITMENT_HUB_PATH}/rpo`,
    navLabel: "RPO Services",
    name: "RPO Services",
    summary:
      "End-to-end or project-based hiring pods that own the funnel and scale from 50 to 500+ hires a quarter.",
    ctaLabel: "Discuss RPO",
    serviceInterest: "RPO Services",
  },
];

export const RECRUITMENT_PAGE_BY_KEY = Object.fromEntries(
  RECRUITMENT_PAGES.map((page) => [page.key, page])
) as Record<RecruitmentPageKey, RecruitmentPage>;
