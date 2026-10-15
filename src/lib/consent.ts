/**
 * Cookie consent manager — single source of truth for the visitor's choice.
 *
 * Industry-standard behaviour implemented here:
 *  - Nothing third-party (GA4, Google Ads, GTM, RankAI, SplitSense) is loaded
 *    until the visitor grants the matching consent.
 *  - Google Consent Mode v2 signals are derived from the stored state and sent
 *    before the gtag.js library boots.
 *  - The decision is persisted in localStorage and can be changed at any time
 *    (footer link / cookie policy page reopen the banner).
 *  - Pre-consent events queued by the analytics helpers are discarded when
 *    consent is finally granted, so no pre-consent data is ever transmitted.
 */

export const CONSENT_STORAGE_KEY = "neointelli_consent_v1";
/** Fired whenever the stored decision changes. */
export const CONSENT_CHANGE_EVENT = "neointelli:consent-change";
/** Fired to re-open the consent banner (footer link, cookie policy page). */
export const CONSENT_OPEN_EVENT = "neointelli:consent-open";

export interface ConsentState {
  /** Strictly necessary — always granted, not user configurable. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  version: 1;
}

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  ts: 0,
  version: 1,
};

/** Measurement IDs — kept here so the consent loader owns tag bootstrapping. */
const GA_ID = "G-C1G4RM3CN3";
const GOOGLE_ADS_ID = "AW-17602240384";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

let cached: ConsentState | null = null;

function readStorage(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      ts: typeof parsed.ts === "number" ? parsed.ts : Date.now(),
      version: 1,
    };
  } catch {
    return null;
  }
}

export function getConsent(): ConsentState {
  if (cached) return cached;
  cached = readStorage() ?? DEFAULT_CONSENT;
  return cached;
}

export function hasConsentDecision(): boolean {
  return readStorage() !== null;
}

export function hasAnalyticsConsent(): boolean {
  return getConsent().analytics;
}

export function hasMarketingConsent(): boolean {
  return getConsent().marketing;
}

export function hasMeasurementConsent(): boolean {
  const s = getConsent();
  return s.analytics || s.marketing;
}

function consentModeSignals(state: ConsentState) {
  return {
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  } as const;
}

/** Pushes Consent Mode v2 signals to gtag when it is available. */
export function applyConsentMode(state: ConsentState) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", consentModeSignals(state));
}

/**
 * Persist a new decision, apply Consent Mode and (if granted) boot the tags.
 * Safe to call from a click handler or the consent banner.
 */
export function saveConsent(
  next: Partial<Pick<ConsentState, "analytics" | "marketing">>,
): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: Boolean(next.analytics),
    marketing: Boolean(next.marketing),
    ts: Date.now(),
    version: 1,
  };
  cached = state;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage can be unavailable — the in-memory state still applies */
    }
    loadConsentedScripts(state);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }
  return state;
}

/** Re-open the consent banner from anywhere. */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/* -------------------------------------------------------------------------- */
/* Tag bootstrapping — only ever called once consent is granted.              */
/* -------------------------------------------------------------------------- */

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __neointelliGtagReady?: boolean;
  __neointelliGaConfigured?: boolean;
  __neointelliAdsConfigured?: boolean;
  __neointelliGtmLoaded?: boolean;
};

function injectScript(id: string, src: string, attrs: Record<string, string> = {}) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

/** Sets up `gtag`, Consent Mode defaults, and loads the gtag.js library once. */
function ensureGtagReady(state: ConsentState) {
  const w = window as GtagWindow;
  if (w.__neointelliGtagReady) {
    applyConsentMode(state);
    return;
  }
  w.dataLayer = w.dataLayer || [];
  // `define` rather than a named function so the arguments object matches gtag.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  };
  w.__neointelliGtagReady = true;

  // Defaults first (denied), then the visitor's actual choice, both before the
  // library loads so the first hits already respect consent.
  w.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  w.gtag("consent", "update", consentModeSignals(state));
  w.gtag("js", new Date());

  injectScript("neointelli-gtag", `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
}

function ensureGtagConfigured(state: ConsentState) {
  const w = window as GtagWindow;
  if (!w.gtag) return;
  if (state.analytics && !w.__neointelliGaConfigured) {
    w.gtag("config", GA_ID, { send_page_view: false });
    w.__neointelliGaConfigured = true;
  }
  if (state.marketing && !w.__neointelliAdsConfigured) {
    w.gtag("config", GOOGLE_ADS_ID);
    w.__neointelliAdsConfigured = true;
  }
}

function ensureGtm() {
  if (!GTM_ID) return;
  const w = window as GtagWindow;
  if (w.__neointelliGtmLoaded) return;
  w.__neointelliGtmLoaded = true;
  w.dataLayer = w.dataLayer || [];
  (w.dataLayer as unknown[]).push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  injectScript("neointelli-gtm", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

function isDevEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    process.env.NODE_ENV === "development" ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".local") ||
    host.startsWith("192.168.") ||
    host.startsWith("10.")
  );
}

/**
 * Loads every third-party script the visitor has consented to. Idempotent —
 * safe to call on mount for returning visitors and again after a change.
 */
export function loadConsentedScripts(state: ConsentState = getConsent()) {
  if (typeof window === "undefined") return;

  // In local development / preview on localhost or local network, do not inject
  // external scripts (RankAI, SplitSense, GA, GTM). External APIs like RankAI
  // throw 404s on unindexed/local routes, which Next.js Turbopack surfaces as
  // a runtime error overlay.
  if (isDevEnvironment()) return;

  if (state.analytics || state.marketing) {
    ensureGtagReady(state);
    ensureGtagConfigured(state);
  }
  if (state.marketing) {
    ensureGtm();
  }
  if (state.analytics) {
    injectScript(
      "neointelli-rankai",
      "https://rankai.ai/apply.js",
      { "data-rankai-id": "cmslvi2f60001zg576i8bs4mj", defer: "true" },
    );
    injectScript(
      "neointelli-splitsense",
      "https://app.splitsense.ai/script.js",
      { "data-website-id": "92fccf76-f411-4812-adda-f25b7bed93b6", defer: "true" },
    );
  }
}

