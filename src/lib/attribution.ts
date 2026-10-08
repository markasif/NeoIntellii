/**
 * Marketing attribution capture + persistence.
 * Captures UTM params and ad click IDs from the URL on first landing,
 * persists them in localStorage for 90 days, and exposes them for
 * inclusion in conversion events and form submissions.
 */

const STORAGE_KEY = "ni_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "li_fat_id",
  "ttclid",
] as const;

export type AttributionRecord = {
  first_landing_page?: string;
  first_referrer?: string;
  captured_at?: number;
  expires_at?: number;
} & Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

const safeStorage = (): Storage | null => {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
};

export const getAttribution = (): AttributionRecord => {
  const storage = safeStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AttributionRecord;
    if (parsed.expires_at && parsed.expires_at < Date.now()) {
      storage.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
};

const writeAttribution = (record: AttributionRecord) => {
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignore quota errors */
  }
};

/**
 * Capture attribution from the current URL. Merges into any existing
 * record so later visits don't clobber the first-touch UTM source.
 * First-touch values win; new click IDs always overwrite.
 */
export const captureAttributionFromUrl = (): AttributionRecord => {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const existing = getAttribution();
  const next: AttributionRecord = { ...existing };
  let changed = false;

  for (const key of TRACKED_PARAMS) {
    const value = url.searchParams.get(key);
    if (!value) continue;
    const isClickId =
      key === "gclid" ||
      key === "gbraid" ||
      key === "wbraid" ||
      key === "fbclid" ||
      key === "msclkid" ||
      key === "ttclid" ||
      key === "li_fat_id";
    // First-touch for UTMs, last-touch for click IDs
    if (isClickId || !next[key]) {
      next[key] = value;
      changed = true;
    }
  }

  if (!next.first_landing_page) {
    next.first_landing_page = url.pathname + url.search;
    changed = true;
  }
  if (!next.first_referrer && document.referrer) {
    next.first_referrer = document.referrer;
    changed = true;
  }

  if (changed) {
    next.captured_at = next.captured_at ?? Date.now();
    next.expires_at = Date.now() + TTL_MS;
    writeAttribution(next);
  }
  return next;
};

/** Append attribution fields as hidden form fields before submit. */
export const appendAttributionToFormData = (data: FormData): FormData => {
  const attr = getAttribution();
  for (const [key, value] of Object.entries(attr)) {
    if (value == null) continue;
    if (data.has(key)) continue;
    data.append(key, String(value));
  }
  return data;
};