/**
 * The three people named on /lp/india-engineering-squad.
 *
 * The page shows each of them twice: a compact accountability card near the
 * top, and a long profile further down, so the copy lives here once and both
 * renderings read from it. Adding a photo, correcting a bio or reordering the
 * three is a change in this file alone.
 *
 * Muzamil and Ravi carry their NeoIntelli titles. Karthick is named without a
 * job title or company affiliation: `designation` and `shortRole` are null on
 * his record and every rendering omits the title line rather than filling it
 * in, so nothing on the page states where he works or who he advises. Keep it
 * that way when editing his copy.
 *
 * The page is positioned for AI-first product companies, so Karthick's record
 * carries the AI, architecture and technical-hiring detail that positioning
 * needs. He is deliberately not reduced to model APIs: his lane spans AI/ML,
 * architecture, data, backend and engineering quality.
 *
 * `primaryPhoto` and `secondaryPhoto` stay nullable so a leader without a
 * portrait still renders: both components reserve the same 4:5 space and draw a
 * neutral placeholder until a path is set, and every rendering of that leader
 * then picks the file up with no layout work. All three primary portraits are
 * in; the secondary candid slot is still open on each.
 *
 * Portraits live in public/images/leadership as WebP, cropped to 4:5 at source
 * rather than left to object-cover, so the composition of each is a decision
 * rather than whatever the box happens to be.
 */

export type AccountabilityItem = {
  title: string;
  text: string;
};

/**
 * One block of the "his role in your engagement" subsection on the long
 * profile. A block carries either a prose `text`, a bulleted `items` list, or
 * a `flow` rendered as an arrow sequence.
 */
export type EngagementBlock = {
  label: string;
  text?: string;
  items?: string[];
  flow?: string[];
};

export type Leader = {
  /** Stable slug: anchor ids, analytics labels and React keys. */
  id: string;
  name: string;
  /** Job title, e.g. "CEO", or null to render no title at all. */
  designation: string | null;
  /**
   * Title as displayed on the long profile, e.g. "CEO · NeoIntelli", or null
   * to render no title line.
   */
  shortRole: string | null;
  /** Small-caps label above the compact card. */
  accountabilityLabel: string;
  /** The lane this leader owns in the three-way triad. */
  lane: string;
  /** The triad summary line under the lane. */
  laneSummary: string;
  /** Compact card copy, one string per paragraph. */
  shortBio: string[];
  /** Compact card accountability list. */
  accountabilityItems: AccountabilityItem[];
  /** Compact card closing line. */
  bottomLine: string;
  /** Long profile positioning line. */
  positioning: string;
  /** Long profile copy, one string per paragraph. */
  longBio: string[];
  /** Long profile "his role in your engagement" blocks. */
  engagement: EngagementBlock[];
  /** Optional pull-quote on the long profile. */
  statement?: string;
  /** Long profile accountability chips. */
  accountability: string[];
  /** The one line naming what this leader is escalated to for. */
  escalation: string;
  linkedinUrl: string;
  /** Label on the compact card link. */
  linkedinShortCta: string;
  /** Label on the long profile button. */
  linkedinLongCta: string;
  /** Public path to the portrait, or null while it is still being shot. */
  primaryPhoto: string | null;
  /** Optional second image (candid, at-desk) for the long profile. */
  secondaryPhoto: string | null;
  altText: string;
  displayOrder: number;
};

export const LEADERS: Leader[] = [
  {
    id: "muzamil",
    name: "Muzamil",
    designation: "CEO",
    shortRole: "CEO · NeoIntelli",
    accountabilityLabel: "Executive & operating accountability",
    lane: "Executive",
    laneSummary: "Business alignment · Operating model · Scale",
    shortBio: [
      "Muzamil leads NeoIntelli's overall client engagement and operating model. For founders establishing their first engineering presence in India, he helps ensure that team structure, operating approach and long-term India strategy remain aligned with the company's growth plans.",
      "He remains responsible for executive alignment as the engagement evolves from the first hires into a larger India engineering operation.",
    ],
    accountabilityItems: [
      {
        title: "Operating model",
        text: "Structuring how NeoIntelli and the client's India team work together.",
      },
      {
        title: "Executive alignment",
        text: "Keeping business expectations, responsibilities and growth plans aligned.",
      },
      {
        title: "Scale strategy",
        text: "Helping the operating model evolve as the India engineering team grows.",
      },
    ],
    bottomLine: "Your point of accountability for the overall NeoIntelli relationship.",
    positioning: "Executive sponsor for your India operation",
    longBio: [
      "Muzamil is responsible for NeoIntelli's executive relationship with the client and the operating model surrounding the India team.",
      "As the squad develops, his role is to ensure NeoIntelli's responsibilities, the client's expectations and the future India strategy remain aligned rather than allowing the relationship to become a conventional outsourced delivery engagement.",
    ],
    engagement: [
      {
        label: "At the start",
        text: "Align the India operating model with what the founder actually wants the team to own.",
      },
      {
        label: "As you hire",
        text: "Maintain executive visibility into hiring progress, operating requirements and escalation points.",
      },
      {
        label: "As you scale",
        text: "Help evaluate when the operating model should evolve, including additional leadership, larger squads or movement toward the client's own India entity.",
      },
    ],
    accountability: ["Executive relationship", "Operating model", "India scale strategy", "Executive escalation"],
    escalation: "If there is a business issue, Muzamil is accountable.",
    linkedinUrl: "https://www.linkedin.com/in/muzamil55/",
    linkedinShortCta: "View Muzamil on LinkedIn",
    linkedinLongCta: "Connect with Muzamil on LinkedIn",
    primaryPhoto: "/images/leadership/muzamil.webp",
    secondaryPhoto: null,
    altText: "Muzamil, CEO at NeoIntelli",
    displayOrder: 1,
  },
  {
    id: "karthick-raju",
    name: "Karthick Raju",
    designation: null,
    shortRole: null,
    accountabilityLabel: "AI, technical & engineering quality",
    lane: "AI & technical",
    laneSummary: "AI role calibration · Technical quality · Engineering setup",
    shortBio: [
      "Karthick brings nearly two decades of technology delivery experience with hands-on leadership across engineering, architecture, AI and enterprise technology initiatives.",
      "For AI-first startups, he helps translate the product roadmap into the engineering capabilities required to build it, from AI/ML and data through backend, platform and cloud engineering.",
      "He helps calibrate technical seniority, define the evaluation bar for critical roles and act as a technical bridge while the client's first India engineering team takes shape.",
    ],
    accountabilityItems: [
      {
        title: "AI & role calibration",
        text: "Translating the product roadmap into the right mix of AI, data, backend, platform and engineering roles.",
      },
      {
        title: "Technical hiring bar",
        text: "Defining what candidates need to demonstrate before they reach the founder interview.",
      },
      {
        title: "Critical technical validation",
        text: "Supporting technical evaluation for AI/ML, architecture-sensitive and senior engineering roles.",
      },
    ],
    bottomLine: "Your technical bridge while the first AI-first India squad takes shape.",
    positioning: "AI & engineering advisor for your first India squad",
    longBio: [
      "Karthick has spent nearly two decades across technology delivery and engineering, with recent years focused heavily on AI strategy, AI adoption, architecture and technical team building.",
      "His role in the India Engineering Squad model is to make sure the team is being designed around the actual AI product architecture, not around generic job descriptions.",
      "He works across AI/ML requirements, software architecture, data dependencies, backend engineering and technical hiring so that founders build the right combination of capabilities.",
    ],
    engagement: [
      {
        label: "Before sourcing",
        flow: [
          "AI product roadmap",
          "Architecture",
          "Engineering ownership",
          "Required roles",
          "Seniority",
          "Technical evaluation criteria",
        ],
      },
      {
        label: "During hiring",
        text: "Support technical calibration and validation for AI/ML, architecture-sensitive and senior engineering roles.",
      },
      {
        label: "During squad setup",
        items: [
          "AI, backend and data ownership boundaries",
          "Engineering working rhythm",
          "Architecture context",
          "Communication between India and global teams",
          "Transition toward local engineering leadership",
        ],
      },
    ],
    statement:
      "Founders should spend their interview time selecting between credible engineers, not discovering basic technical gaps.",
    accountability: [
      "AI role definition",
      "Technical hiring bar",
      "Critical technical validation",
      "Early engineering setup",
    ],
    escalation: "If there is a technical or AI-quality issue, Karthick is accountable.",
    linkedinUrl: "https://www.linkedin.com/in/karthick-raju/",
    linkedinShortCta: "View Karthick on LinkedIn",
    linkedinLongCta: "Connect with Karthick on LinkedIn",
    primaryPhoto: "/images/leadership/karthick-raju.webp",
    secondaryPhoto: null,
    altText: "Karthick Raju",
    displayOrder: 2,
  },
  {
    id: "ravi-kiran",
    name: "Ravi Kiran",
    designation: "CHRO",
    shortRole: "CHRO · NeoIntelli",
    accountabilityLabel: "Talent, people operations & retention",
    lane: "People",
    laneSummary: "Hiring · Employment · Retention",
    shortBio: [
      "Ravi is an experienced HR leader with more than a decade across talent and people operations. At NeoIntelli, he oversees the people layer behind your India engineering team, from talent acquisition and onboarding through employee operations and retention.",
      "For hard-to-hire AI and engineering roles, his responsibility is not simply to fill openings, but to build a hiring and employee operating process that helps strong engineers join, integrate and stay.",
    ],
    accountabilityItems: [
      {
        title: "Talent acquisition",
        text: "Building and managing the hiring pipeline around the roles agreed with the client.",
      },
      {
        title: "Employee operations",
        text: "Supporting employment, onboarding, HR processes and the employee lifecycle in India.",
      },
      {
        title: "Retention",
        text: "Keeping an active view of employee experience, engagement and people-related risks as the team grows.",
      },
    ],
    bottomLine: "Your people-operations owner behind the engineers working with you.",
    positioning: "People & talent leader behind your India squad",
    longBio: [
      "Ravi brings more than a decade of HR leadership experience and owns the people infrastructure supporting NeoIntelli's India teams.",
      "For founders, his responsibility extends beyond recruiting. He oversees the employee journey surrounding the squad: sourcing, offer management, onboarding, employee operations and retention.",
      "That distinction matters because building an engineering team is not complete when an offer is accepted. Specialist AI and engineering roles can be difficult to close and difficult to keep, so the goal is a team that joins, integrates and stays.",
    ],
    engagement: [
      {
        label: "During hiring",
        items: [
          "Candidate pipeline oversight",
          "Hiring coordination",
          "Compensation-market alignment",
          "Offer management",
          "Joining coordination",
        ],
      },
      {
        label: "When engineers join",
        items: [
          "Employment onboarding",
          "Documentation",
          "Employee communication",
          "People policies",
          "Operational setup",
        ],
      },
      {
        label: "After joining",
        items: [
          "Employee experience",
          "HR support",
          "Engagement",
          "Retention risks",
          "Performance-process support",
          "Replacement coordination where required",
        ],
      },
    ],
    accountability: ["Talent acquisition", "Offer & onboarding", "Employee operations", "Retention"],
    escalation: "If there is a hiring or people issue, Ravi is accountable.",
    linkedinUrl: "https://www.linkedin.com/in/ravi-kiran-970863114/",
    linkedinShortCta: "View Ravi on LinkedIn",
    linkedinLongCta: "Connect with Ravi on LinkedIn",
    primaryPhoto: "/images/leadership/ravi-kiran-v2.webp",
    secondaryPhoto: null,
    altText: "Ravi Kiran, CHRO at NeoIntelli",
    displayOrder: 3,
  },
].sort((a, b) => a.displayOrder - b.displayOrder);

/** Lookup used by the technical-bridge section, which names one leader. */
export const leaderById = (id: string): Leader => {
  const leader = LEADERS.find((entry) => entry.id === id);
  if (!leader) throw new Error(`Unknown NeoIntelli leader: ${id}`);
  return leader;
};
