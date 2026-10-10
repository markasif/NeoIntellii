export const NETLIFY_FORMS_ENDPOINT = "/__forms.html";

export function encodeNetlifyForm(formName: string, data: FormData): string {
  const params = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === "string") params.append(key, value);
  });
  if (!params.has("form-name")) params.set("form-name", formName);
  return params.toString();
}

export async function submitNetlifyForm(formName: string, data: FormData): Promise<void> {
  const response = await fetch(NETLIFY_FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeNetlifyForm(formName, data),
  });
  if (response.ok) return;

  // Local development serves public/__forms.html as a static file and the dev
  // server does not run Netlify's form handler, so it answers 404/405. Treat
  // that as accepted so the form flow is testable locally — a real deployment
  // is handled by Netlify and returns 2xx, so it never reaches this branch.
  const isLocalHost =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/i.test(window.location.hostname);
  if (
    process.env.NODE_ENV === "development" &&
    isLocalHost &&
    (response.status === 404 || response.status === 405)
  ) {
    console.warn(
      `[netlifyForms] "${formName}" submission skipped on localhost (HTTP ${response.status}); the Netlify form handler only runs in deployment.`,
    );
    return;
  }

  throw new Error(`Netlify form "${formName}" was rejected (HTTP ${response.status})`);
}
