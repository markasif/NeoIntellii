import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { MinimalFooter, MinimalHeader } from "@/components/shared/MinimalChrome";
import { track } from "@/lib/dataLayer";
import { trackEvent } from "@/lib/analytics";

/**
 * /thank-you-call - the fallback booking confirmation (option 4 of D3).
 *
 * The embed's own bookingSuccessful event is the primary signal and this page
 * is not part of that path. It exists so that, if the listener ever proves
 * unreliable, cal.com's "redirect on booking" setting can point here and the
 * conversion still records.
 *
 * IMPORTANT: enable that redirect only if the listener is switched off.
 * With both live, one booking would push `meeting_booked` twice and Google Ads
 * would double-count it. The sessionStorage guard below stops a refresh of
 * this page from counting twice, but it cannot see the modal's own push.
 */

const GUARD_KEY = "ni_meeting_booked_thankyou";

export default function ThankYouCall() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(GUARD_KEY)) return;
      window.sessionStorage.setItem(GUARD_KEY, "1");
    } catch {
      /* private mode - fall through and report the booking once per load */
    }
    track("meeting_booked", {});
    trackEvent("booked_consultation", { source: "thank_you_call" });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MinimalHeader />

      <main className="flex-1 px-6 sm:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-5" aria-hidden="true" />
          <h1 className="font-display text-heading text-2xl md:text-3xl mb-3">Your call is booked.</h1>
          <p className="text-body leading-relaxed">You will receive a calendar invite.</p>
          <Link to="/" className="inline-block mt-8 text-[#0a93bd] text-sm underline underline-offset-2">
            Back to neointelli.com
          </Link>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
