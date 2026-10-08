/**
 * Persistence for a case.
 *
 * Anonymous work stays in memory for the tab by default. Saving to the device
 * is a deliberate act with an explanation, a timestamp, an expiry and a delete
 * button - not something that happens because somebody typed a salary.
 *
 * Contact details are never stored alongside the case. The saved record is the
 * profile and its scenarios; a name and an email exist only inside a review
 * submission the visitor explicitly sends.
 *
 * Browser storage is treated as something that can simply not be there. A
 * private window, cleared site data or a browser configured to block storage
 * all throw on access, and every call here is wrapped accordingly - the
 * workspace keeps working, it just cannot remember.
 */

import type { Profile, Scenario } from "./types";
import { PROFILE_SCHEMA_VERSION } from "./versions";

export const STORAGE_KEY = "ni_gcc_lab_case_v1";

/** How long a saved case lives before it is treated as expired. */
export const RETENTION_DAYS = 30;

export interface SavedCase {
  schemaVersion: number;
  savedAt: string;
  expiresAt: string;
  profile: Profile;
  scenarios: Scenario[];
  activeScenarioId: string;
}

export type StorageAvailability = "available" | "unavailable";

/** Probes storage by actually writing to it - the only reliable test. */
export function storageAvailability(): StorageAvailability {
  try {
    if (typeof window === "undefined" || !window.localStorage) return "unavailable";
    const probe = `${STORAGE_KEY}__probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return "available";
  } catch {
    return "unavailable";
  }
}

const isoDaysFromNow = (days: number, from: Date): string =>
  new Date(from.getTime() + days * 86_400_000).toISOString();

export interface SaveResult {
  ok: boolean;
  savedAt?: string;
  expiresAt?: string;
  reason?: string;
}

/**
 * Saves a case to this device.
 *
 * Deliberately refuses anything carrying contact details: the saved record is
 * the case, and a name or an email in it would be personal data sitting in a
 * browser with no consent behind it.
 */
export function saveCase(
  profile: Profile,
  scenarios: Scenario[],
  activeScenarioId: string,
  now: Date = new Date(),
): SaveResult {
  if (storageAvailability() === "unavailable") {
    return { ok: false, reason: "This browser is not allowing site storage, so the case cannot be saved here. Download the CSV instead - it keeps everything." };
  }
  const payload: SavedCase = {
    schemaVersion: PROFILE_SCHEMA_VERSION,
    savedAt: now.toISOString(),
    expiresAt: isoDaysFromNow(RETENTION_DAYS, now),
    profile,
    scenarios,
    activeScenarioId,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { ok: true, savedAt: payload.savedAt, expiresAt: payload.expiresAt };
  } catch {
    return { ok: false, reason: "Saving failed - the browser's storage may be full. Download the CSV instead." };
  }
}

export interface LoadResult {
  status: "loaded" | "empty" | "expired" | "unreadable" | "wrong-version" | "unavailable";
  saved?: SavedCase;
  message?: string;
}

export function loadCase(now: Date = new Date()): LoadResult {
  if (storageAvailability() === "unavailable") {
    return { status: "unavailable", message: "This browser is not allowing site storage." };
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return { status: "unavailable", message: "This browser is not allowing site storage." };
  }
  if (!raw) return { status: "empty" };

  let parsed: SavedCase;
  try {
    parsed = JSON.parse(raw) as SavedCase;
  } catch {
    return { status: "unreadable", message: "A saved case was found but could not be read. It has been left in place; clear it if you want a clean start." };
  }

  if (parsed.schemaVersion !== PROFILE_SCHEMA_VERSION) {
    return {
      status: "wrong-version",
      message: "A case saved by an older version of this workspace was found. It has not been loaded, because the figures behind it may have changed.",
    };
  }

  if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < now.getTime()) {
    return {
      status: "expired",
      saved: parsed,
      message: `This case was saved on ${parsed.savedAt.slice(0, 10)} and is past its ${RETENTION_DAYS}-day retention. Load it if you still want it, or clear it.`,
    };
  }

  return { status: "loaded", saved: parsed };
}

export function clearCase(): boolean {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** True when a saved case exists that a new save would overwrite. */
export function hasSavedCase(): boolean {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    return window.localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}

export const STORAGE_EXPLANATION =
  `Saving keeps this case in this browser on this device only. It is not sent anywhere, it is not tied to an account, and it is not readable from another device or another browser. It is kept for ${RETENTION_DAYS} days and you can delete it at any time. Your name and email are never saved with it.`;

/**
 * Fields that must never appear in a URL, a log line or an analytics payload.
 * Deep links may select an area of the workspace and nothing more.
 */
export const NEVER_IN_URL = [
  "overrideAnnual",
  "baseline",
  "readiness",
  "privacy",
  "mobility",
  "industry",
  "hqCity",
] as const;

/** Everything a deep link is allowed to carry. */
export type DeepLinkArea = "team" | "compare" | "prepare" | "pack";

export function areaFromQuery(search: string): DeepLinkArea | null {
  try {
    const value = new URLSearchParams(search).get("area");
    if (value === "team" || value === "compare" || value === "prepare" || value === "pack") return value;
    return null;
  } catch {
    return null;
  }
}
