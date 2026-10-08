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
  if (!response.ok) {
    throw new Error(`Netlify form "${formName}" was rejected (HTTP ${response.status})`);
  }
}
