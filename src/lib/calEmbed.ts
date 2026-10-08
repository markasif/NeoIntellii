/**
 * Cal.com embed loader.
 *
 * /book-a-call renders the event type inline, which is what makes a confirmed
 * booking observable to us - a link to cal.com leaves our measurement behind
 * at the click. The calculator's step-3 CTAs used to open the same embed in a
 * modal; they now link out to CAL_COM_BOOKING_URL instead, because the modal was
 * rendering a blank calendar. Restoring the embed there would win back the
 * `meeting_booked` signal for those CTAs.
 *
 * Two things are worth knowing before changing this file:
 *
 * 1. The loader below is the official cal.com snippet, transcribed. It defines
 *    `window.Cal` as a queue immediately and injects embed.js once; every call
 *    made before the script arrives is replayed by it afterwards, so callers
 *    never have to wait for a ready event.
 * 2. Booking success is delivered as an embed event. `bookingSuccessful` is the
 *    long-standing action name and `bookingSuccessfulV2` is the newer one
 *    carrying a slightly different payload; a page can receive either
 *    depending on the embed version cal.com serves, so we subscribe to both
 *    and de-duplicate. Verify against the current cal.com embed docs (blocked
 *    from this environment at the time of writing) and in a live test booking
 *    before trusting it as the only conversion signal - /thank-you-call exists
 *    as the redirect fallback if it ever proves unreliable.
 */

const EMBED_SCRIPT = "https://app.cal.com/embed/embed.js";

/**
 * The cal.com event types this account books. /book-a-call renders whichever
 * one a `?type=` parameter names, so the contact page can still offer three
 * conversations without a single link leaving for cal.com.
 */
export const CAL_EVENT_TYPES = {
  staffing: "meeting-neointelli/staffing",
  gcc: "meeting-neointelli/gcc",
  ai: "meeting-neointelli/ai",
  neohirex: "meeting-neointelli/neohirex",
} as const;

export type CalEventType = keyof typeof CAL_EVENT_TYPES;

export const isCalEventType = (value: string | null): value is CalEventType =>
  value !== null && Object.prototype.hasOwnProperty.call(CAL_EVENT_TYPES, value);

/** The default event type: the GCC strategy call every campaign CTA books. */
export const CAL_EVENT_LINK = CAL_EVENT_TYPES.staffing;

/** Where cal.com is hosted for this account (self-hosting would change it). */
export const CAL_ORIGIN = "https://cal.com";

/**
 * The booking page on cal.com itself, for the CTAs that link out rather than
 * open the embed. Distinct from CAL_BOOKING_URL in src/lib/constants.ts, which
 * is our own /book-a-call route. Linking out costs us the `meeting_booked`
 * signal (see the note at the top of this file), so prefer the embed where it
 * works.
 */
export const CAL_COM_BOOKING_URL = `https://app.cal.com/${CAL_EVENT_LINK}`;

type CalQueue = {
  (...args: unknown[]): void;
  ns?: Record<string, CalQueue>;
  q?: unknown[][];
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalQueue;
  }
}

/** The official snippet, transcribed: a stub queue plus a one-time script injection. */
const installStub = () => {
  const w = window;
  if (w.Cal) return;

  const push = (target: CalQueue, args: unknown[]) => {
    target.q = target.q || [];
    target.q.push(args);
  };

  const cal: CalQueue = function (...args: unknown[]) {
    const self = w.Cal as CalQueue;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const api: CalQueue = function (...inner: unknown[]) {
          push(api, inner);
        };
        api.q = api.q || [];
        self.ns![namespace] = self.ns![namespace] || api;
        push(self.ns![namespace], args);
        push(self, ["initNamespace", namespace]);
        return;
      }
    }
    push(self, args);
  };

  w.Cal = cal;
};

let initialised = false;

/** Loads the embed and initialises it. Safe to call from every component that needs it. */
export const initCalEmbed = () => {
  if (typeof window === "undefined") return;
  installStub();
  if (initialised) return;
  initialised = true;
  window.Cal?.("init", { origin: CAL_ORIGIN });
};

export type CalConfig = Record<string, string | undefined>;

/**
 * Marketing parameters to hand to cal.com so the booking record carries the
 * source. They ride as embed config keys, which cal.com forwards to the
 * booking page as query parameters; confirm in a test booking that they land
 * on the CRM record before the campaign relies on them.
 */
const TRACKED_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

/** Reads the tracked parameters out of a query string (usually the current URL's). */
export const calTrackingConfig = (search: string, stored: Record<string, unknown> = {}): CalConfig => {
  const params = new URLSearchParams(search);
  const config: CalConfig = {};
  for (const key of TRACKED_KEYS) {
    const value = params.get(key) ?? (typeof stored[key] === "string" ? (stored[key] as string) : undefined);
    if (value) config[key] = value;
  }
  return config;
};

export interface CalInlineOptions {
  /** Element the calendar renders into. */
  element: HTMLElement;
  calLink?: string;
  config?: CalConfig;
}

/** Renders the inline calendar into `element`. */
export const renderCalInline = ({ element, calLink = CAL_EVENT_LINK, config = {} }: CalInlineOptions) => {
  initCalEmbed();
  window.Cal?.("inline", {
    elementOrSelector: element,
    calLink,
    config: { layout: "month_view", ...config },
  });
  window.Cal?.("ui", { hideEventTypeDetails: false, layout: "month_view" });
};

type BookingCallback = () => void;

const listeners = new Set<BookingCallback>();
let subscribed = false;
let lastBookingAt = 0;

/**
 * Notifies once per booking. Both action names can arrive for a single
 * booking, so a short window collapses them - `meeting_booked` firing twice
 * would double-count the conversion in Google Ads.
 */
const notify = () => {
  const now = Date.now();
  if (now - lastBookingAt < 3000) return;
  lastBookingAt = now;
  listeners.forEach((listener) => listener());
};

/** Subscribes to cal.com's booking-success event. Returns an unsubscribe function. */
export const onCalBookingSuccess = (callback: BookingCallback): (() => void) => {
  if (typeof window === "undefined") return () => undefined;
  initCalEmbed();
  listeners.add(callback);
  if (!subscribed) {
    subscribed = true;
    window.Cal?.("on", { action: "bookingSuccessful", callback: notify });
    window.Cal?.("on", { action: "bookingSuccessfulV2", callback: notify });
  }
  return () => {
    listeners.delete(callback);
  };
};
