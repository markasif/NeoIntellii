import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getAttribution } from "@/lib/attribution";
import { track, type BookCallPlacement } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";
import { CAL_EVENT_LINK, calTrackingConfig, onCalBookingSuccess, renderCalInline } from "@/lib/calEmbed";

/**
 * Booking, on our own domain.
 *
 * Every "book a call" CTA either opens this modal or goes to /book-a-call;
 * nothing links out to cal.com any more. That is what lets us record the two
 * events the campaign is measured on: `cta_book_call_click` when the calendar
 * opens, and `meeting_booked` when cal.com confirms the booking.
 *
 * The embed script is only injected the first time somebody opens the modal,
 * so a page that nobody books from pays nothing for it.
 */

interface BookCallContextValue {
  openBookCall: (placement: BookCallPlacement) => void;
}

const BookCallContext = createContext<BookCallContextValue | null>(null);

/** Opens the booking modal. Returns a no-op outside the provider, never throws. */
export const useBookCall = (): BookCallContextValue => {
  const context = useContext(BookCallContext);
  return context ?? { openBookCall: () => undefined };
};

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<BookCallPlacement>("results");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const placementRef = useRef<BookCallPlacement>("results");

  const openBookCall = useCallback((next: BookCallPlacement) => {
    placementRef.current = next;
    setPlacement(next);
    setOpen(true);
    track("cta_book_call_click", { placement: next });
    // Keeps the site's own funnel reporting intact alongside the ad events.
    trackEvent("cta_click", { location: `book_call_${next}` });
  }, []);

  // Subscribed lazily: the first open is what loads cal.com, and the
  // subscription has to exist before the visitor can finish a booking.
  useEffect(() => {
    if (!open) return;
    return onCalBookingSuccess(() => {
      track("meeting_booked", { placement: placementRef.current });
      trackEvent("booked_consultation", { source: `modal_${placementRef.current}` });
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const element = containerRef.current;
    if (!element) return;
    // Radix remounts the content on each open; clear anything the previous
    // open left behind so a second visit never stacks two calendars.
    element.innerHTML = "";
    renderCalInline({
      element,
      calLink: CAL_EVENT_LINK,
      config: calTrackingConfig(window.location.search, getAttribution() as Record<string, unknown>),
    });
  }, [open]);

  const value = useMemo(() => ({ openBookCall }), [openBookCall]);

  return (
    <BookCallContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-[calc(100vw-2rem)] p-0 overflow-hidden bg-white">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-left text-lg text-heading">
              Book a 30-minute GCC strategy call
            </DialogTitle>
          </DialogHeader>
          <div
            ref={containerRef}
            data-placement={placement}
            className="h-[70vh] max-h-[640px] overflow-y-auto px-2 pb-4"
          />
        </DialogContent>
      </Dialog>
    </BookCallContext.Provider>
  );
}
