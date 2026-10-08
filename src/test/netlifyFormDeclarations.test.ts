import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Netlify stores only the fields it detected at build time and drops the rest
 * without an error, so an undeclared field is invisible data loss. This locks
 * every form's declaration to the fields the app actually posts.
 *
 * Add a field to a form? Add it here and to public/__forms.html.
 */
const declarations = readFileSync(resolve(__dirname, "../../public/__forms.html"), "utf8");

const declaredFields = (formName: string): string[] => {
  const match = declarations.match(new RegExp(`<form name="${formName}"([\\s\\S]*?)</form>`));
  if (!match) throw new Error(`No <form name="${formName}"> declaration found`);
  return [...match[1].matchAll(/name="([^"]+)"/g)].map((m) => m[1]);
};

// Appended to every submission by appendAttributionToFormData().
const ATTRIBUTION = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "li_fat_id", "ttclid",
  "first_landing_page", "first_referrer", "captured_at", "expires_at",
];

const FORMS: Record<string, string[]> = {
  contact: ["bot-field", "name", "email", "company", "topic", "message", "source_page", "service_interest", "cta_name"],
  blueprint: ["bot-field", "name", "email", "company", "message", "source_page", "service_interest", "cta_name"],
  "ai-hiring-lp": ["bot-field", "email", "company", "companyType", "roles", "hireCount", "phone"],
  "micro-gcc-lp": ["bot-field", "name", "email", "company", "companyStage", "capability", "teamSize", "timeline", "phone"],
  "lp-ssc": [
    "bot-field", "source", "name", "email", "company",
    "role", "headquarters", "processes", "entities", "targetSize", "timeline", "phone",
  ],
  "lp-squad": [
    "bot-field", "source", "name", "email", "company", "companyWebsite",
    "headquarters", "companyStage", "productType", "teamOwns", "capabilities",
    "teamSize", "startWhen", "phone",
  ],
  "roi-estimator": [
    "bot-field", "name", "email", "company",
    "spend", "teamSize", "location", "role", "horizon",
    "year1Savings", "totalSavings", "roiPct", "breakEvenMonth",
  ],
  "readiness-assessment": ["bot-field", "name", "email", "company", "score", "tier", "industry", "answers"],
  // The Decision Lab review request. Coarse case facts only - no salaries, no
  // free text from the profile, no privacy or readiness answers.
  "gcc-decision-lab": [
    "bot-field", "name", "email", "company", "role", "reviewObjective",
    "consent", "marketingConsent", "submissionId",
    "caseId", "inputHash", "modelVersion", "dataVersion",
    "currency", "city", "country", "teamSize", "objective",
    "firstYearCash", "steadyStateMonthly", "paybackState",
    "openQuestions", "exclusions",
  ],
  "cost-calculator": [
    "bot-field", "name", "email", "company", "hqCountry", "plannedStart", "pageVariant",
    "totalTeam", "roles", "city", "seniority", "engagement",
    "monthlyLow", "monthlyHigh", "annualLow", "annualHigh",
    "salaryLow", "salaryHigh", "infraLow", "infraHigh",
    "opsLow", "opsHigh", "partnerLow", "partnerHigh",
    "usEquivLow", "usEquivHigh", "savingsLow", "savingsHigh",
    "savingsPctLow", "savingsPctHigh",
  ],
};

describe("public/__forms.html", () => {
  it.each(Object.entries(FORMS))("declares every field %s posts", (formName, fields) => {
    const declared = declaredFields(formName);
    for (const field of fields) expect(declared).toContain(field);
  });

  it.each(Object.keys(FORMS))("declares the attribution fields for %s", (formName) => {
    const declared = declaredFields(formName);
    for (const field of ATTRIBUTION) expect(declared).toContain(field);
  });

  it("marks every form for Netlify detection with a honeypot", () => {
    for (const formName of Object.keys(FORMS)) {
      const form = declarations.match(new RegExp(`<form name="${formName}"[^>]*>`))![0];
      expect(form).toContain('data-netlify="true"');
      expect(form).toContain('data-netlify-honeypot="bot-field"');
    }
  });
});
