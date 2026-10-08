import type { ToolEmailRequest } from "@/lib/toolEmail";

export async function sendToolEmail(request: ToolEmailRequest): Promise<Response> {
  return fetch("/api/send-tool-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
}
