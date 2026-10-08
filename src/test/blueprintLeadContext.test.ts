import { describe, it, expect } from "vitest";
import { readBlueprintLeadContext, DEFAULT_BLUEPRINT_LEAD_CONTEXT } from "@/lib/blueprintLeadContext";
import { blueprintRequestUrl } from "@/lib/gccStrategyRoutes";

describe("blueprint lead context", () => {
  it("round-trips the context a GCC Strategy CTA puts on the URL", () => {
    const url = blueprintRequestUrl({
      source_page: "/services/gcc/strategy-business-case",
      service_interest: "GCC Business Case",
      cta_name: "Request the GCC Blueprint",
    });
    const search = url.slice(url.indexOf("?"));
    expect(readBlueprintLeadContext(search)).toEqual({
      source_page: "/services/gcc/strategy-business-case",
      service_interest: "GCC Business Case",
      cta_name: "Request the GCC Blueprint",
    });
  });

  it("falls back to defaults when the query string is missing or empty", () => {
    expect(readBlueprintLeadContext("")).toEqual(DEFAULT_BLUEPRINT_LEAD_CONTEXT);
    expect(readBlueprintLeadContext("?source_page=&cta_name=")).toEqual(DEFAULT_BLUEPRINT_LEAD_CONTEXT);
  });

  it("only records site-relative source pages and strips markup", () => {
    const context = readBlueprintLeadContext("?source_page=https://evil.example&service_interest=%3Cscript%3EGCC%3C/script%3E");
    expect(context.source_page).toBe("/blueprint");
    expect(context.service_interest).toBe("scriptGCC/script");
  });

  it("truncates over-long values", () => {
    const context = readBlueprintLeadContext(`?cta_name=${"a".repeat(200)}`);
    expect(context.cta_name).toHaveLength(80);
  });
});
