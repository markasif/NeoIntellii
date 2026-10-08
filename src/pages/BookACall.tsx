import { useEffect, useRef, useState } from "react";
import { MinimalFooter, MinimalHeader } from "@/components/shared/MinimalChrome";
import { getAttribution } from "@/lib/attribution";
import { track, type BookCallPlacement } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";
import { readAiGccLeadParams, type AiGccLeadParamKey } from "@/lib/aiGccCta";
import {
  CAL_EVENT_TYPES,
  calTrackingConfig,
  isCalEventType,
  onCalBookingSuccess,
  renderCalInline,
  type CalEventType,
} from "@/lib/calEmbed";

/**
 * /book-a-call - the one booking surface on the site.
 *
 * Every "Speak with a GCC Expert" button and the "Talk to a GCC Expert"
 * sitelink land here rather than on cal.com, so a confirmed booking is
 * observable: cal.com's embed reports it and we push `meeting_booked`.
 *
 * A link may carry ?placement=... (our own CTAs and the ad sitelink do). It is
 * echoed on both the click and the booking so a conversion can be traced back
 * to the surface that produced it.
 */

const PLACEMENTS: BookCallPlacement[] = ["hero", "sticky", "results", "footer_cta", "sitelink"];

/**
 * Headings per event type. The default is the GCC strategy call; the others
 * exist so the contact page can offer its three conversations without linking
 * off to cal.com.
 */
const HEADINGS: Record<CalEventType, string> = {
  staffing: "Book a 30-minute strategy call",
  gcc: "Book a 30-minute GCC setup call",
  ai: "Book a 30-minute AI solutions call",
  neohirex: "Book a 30-minute NeoHireX demo",
};

const readPlacement = (search: string): BookCallPlacement | null => {
  const value = new URLSearchParams(search).get("placement");
  return PLACEMENTS.find((placement) => placement === value) ?? null;
};

export default function BookACall() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [placement, setPlacement] = useState<BookCallPlacement | null>(null);
  const [leadParams, setLeadParams] = useState<Partial<Record<AiGccLeadParamKey, string>>>({});
  const [eventType, setEventType] = useState<CalEventType>("staffing");

  useEffect(() => {
    const search = window.location.search;
    const found = readPlacement(search);
    setPlacement(found);
    const type = new URLSearchParams(search).get("type");
    if (isCalEventType(type)) setEventType(type);
    // Service pages (the AI GCC section today) tag their CTAs with the page,
    // service interest and CTA label so a booking can be traced to the offer
    // the visitor was reading about. Absent on links that do not carry them.
    const lead = readAiGccLeadParams(search);
    setLeadParams(lead);
    // The click that brought them here happened on another page or off-site
    // (an ad sitelink), so the arrival is the click we can observe. Placement
    // rides along when the link carried it, and is simply absent when it did not.
    track("cta_book_call_click", { ...(found ? { placement: found } : {}), ...lead });
  }, []);

  useEffect(() => {
    const unsubscribe = onCalBookingSuccess(() => {
      track("meeting_booked", { ...(placement ? { placement } : {}), ...leadParams });
      trackEvent("booked_consultation", { source: "book_a_call_page" });
    });
    return unsubscribe;
  }, [placement, leadParams]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    element.innerHTML = "";
    renderCalInline({
      element,
      calLink: CAL_EVENT_TYPES[eventType],
      config: calTrackingConfig(window.location.search, getAttribution() as Record<string, unknown>),
    });
  }, [eventType]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MinimalHeader />

      <main className="flex-1 px-6 sm:px-8 lg:px-12 py-10 md:py-14">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-heading text-2xl md:text-3xl text-center mb-8">
            {HEADINGS[eventType]}
          </h1>
          <div ref={containerRef} className="min-h-[640px] rounded-2xl overflow-hidden" />
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
