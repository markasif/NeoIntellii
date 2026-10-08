import { describe, it, expect, vi, afterEach } from "vitest";
import { encodeNetlifyForm, submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";

const formData = (entries: [string, string][]) => {
  const data = new FormData();
  entries.forEach(([key, value]) => data.append(key, value));
  return data;
};

afterEach(() => vi.unstubAllGlobals());

describe("encodeNetlifyForm", () => {
  it("urlencodes the body rather than leaving it multipart", () => {
    const body = encodeNetlifyForm("contact", formData([["email", "a@b.com"], ["company", "Acme Ltd"]]));
    expect(body).toBe("email=a%40b.com&company=Acme+Ltd&form-name=contact");
  });

  it("keeps every value of a repeated field", () => {
    const body = encodeNetlifyForm("ai-hiring-lp", formData([
      ["roles", "GenAI Engineer"],
      ["roles", "MLOps Engineer"],
    ]));
    expect(body.match(/roles=/g)).toHaveLength(2);
    expect(body).toContain("roles=GenAI+Engineer");
    expect(body).toContain("roles=MLOps+Engineer");
  });

  it("does not duplicate a form-name the form already carries", () => {
    const body = encodeNetlifyForm("contact", formData([["form-name", "contact"], ["email", "a@b.com"]]));
    expect(body.match(/form-name=/g)).toHaveLength(1);
  });

  it("carries the marketing attribution keys through", () => {
    const body = encodeNetlifyForm("ai-hiring-lp", formData([
      ["gclid", "abc123"],
      ["utm_campaign", "ai hiring"],
      ["first_landing_page", "/lp/hire-ai-engineers"],
    ]));
    expect(body).toContain("gclid=abc123");
    expect(body).toContain("utm_campaign=ai+hiring");
    expect(body).toContain("first_landing_page=%2Flp%2Fhire-ai-engineers");
  });
});

describe("submitNetlifyForm", () => {
  it("posts urlencoded to the static endpoint, not to a rendered route", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    await submitNetlifyForm("contact", formData([["email", "a@b.com"]]));

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(NETLIFY_FORMS_ENDPOINT);
    expect(url).not.toBe("/");
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    expect(typeof init.body).toBe("string");
  });

  // The original bug: posting to "/" returned 200 page HTML, so callers
  // reported success for a submission Netlify never received.
  it("rejects on a non-2xx response instead of reporting success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 405 }));
    await expect(submitNetlifyForm("contact", formData([["email", "a@b.com"]]))).rejects.toThrow(/405/);
  });
});
