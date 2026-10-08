/**
 * Lead context carried into the GCC Blueprint request.
 *
 * CTAs in the GCC Strategy & Setup pillar link to /blueprint with
 * ?source_page=&service_interest=&cta_name= so the request records where it
 * came from. The values are read from the query string, restricted to short
 * plain text, and submitted as hidden fields on the existing Netlify form -
 * no new form or CRM system is involved. Anything unexpected falls back to
 * the defaults so a hand-typed or truncated link never breaks the form.
 */
export interface BlueprintLeadContext {
  source_page: string;
  service_interest: string;
  cta_name: string;
}

const MAX_LENGTH = 80;

const DISALLOWED = new Set(['<', '>', '"', "'", '`']);

const clean = (value: string | null, fallback: string) => {
  if (!value) return fallback;
  const trimmed = Array.from(value)
    .filter((char) => char.charCodeAt(0) >= 0x20 && !DISALLOWED.has(char))
    .join("")
    .trim()
    .slice(0, MAX_LENGTH);
  return trimmed || fallback;
};

export const DEFAULT_BLUEPRINT_LEAD_CONTEXT: BlueprintLeadContext = {
  source_page: "/blueprint",
  service_interest: "GCC Strategy",
  cta_name: "Request the GCC Blueprint",
};

export const readBlueprintLeadContext = (search: string): BlueprintLeadContext => {
  const params = new URLSearchParams(search);
  const sourcePage = clean(params.get("source_page"), DEFAULT_BLUEPRINT_LEAD_CONTEXT.source_page);
  return {
    // Only site-relative paths are recorded as the source page.
    source_page: sourcePage.startsWith("/") ? sourcePage : DEFAULT_BLUEPRINT_LEAD_CONTEXT.source_page,
    service_interest: clean(params.get("service_interest"), DEFAULT_BLUEPRINT_LEAD_CONTEXT.service_interest),
    cta_name: clean(params.get("cta_name"), DEFAULT_BLUEPRINT_LEAD_CONTEXT.cta_name),
  };
};
