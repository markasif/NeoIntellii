import { useEffect } from "react";
import { track } from "@/lib/dataLayer";

/**
 * Reports mailto: and tel: clicks as `contact_click`.
 *
 * One delegated listener at the document rather than a handler on every link:
 * these addresses appear in footers, blog bodies and landing pages that are
 * written as plain markup, and a shared listener is the only way to catch all
 * of them without touching each one.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a[href^='mailto:'], a[href^='tel:']") as HTMLAnchorElement | null;
      if (!link) return;
      track("contact_click", { type: link.getAttribute("href")?.startsWith("tel:") ? "phone" : "email" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
