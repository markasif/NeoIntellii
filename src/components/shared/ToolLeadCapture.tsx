import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";
import { track, userDataForEmail } from "@/lib/dataLayer";
import { bookACallUrl } from "@/lib/constants";
import type { ToolKind } from "@/lib/toolEmail";

/**
 * Lead capture for the interactive tools (ROI estimator, readiness
 * assessment, cost calculator).
 *
 * It sits *below* the result the visitor came for rather than gating it: the
 * tools are organic entry points, and hiding the answer behind a form would
 * cost more traffic than it captures. The result values the visitor is looking
 * at ride along as hidden fields, so a submission arrives with the numbers
 * already attached and nobody has to ask "what did they calculate?".
 *
 * Every field posted here must also be declared in public/__forms.html -
 * Netlify silently drops anything it did not detect at build time.
 *
 * A submission does two things: it lands in Netlify Forms (so we see who ran
 * the tool) and, when `emailTool` is set, /api/send-tool-email mails the
 * visitor their own results. Only the Netlify submission can fail the form:
 * the lead is captured either way, and an email provider having a bad minute
 * must not become an error in front of someone who just handed us their
 * details. What it does change is the wording of the confirmation, so we never
 * tell somebody to check an inbox nothing was sent to.
 */
export interface ToolLeadCaptureProps {
  /** Netlify form name; must match a declaration in public/__forms.html. */
  formName: string;
  heading: string;
  description: string;
  submitLabel: string;
  /** Analytics event fired once the submission is accepted. */
  event: ConversionEvent;
  /** `qualified_lead` source label. */
  source: string;
  /** Tool inputs and results posted alongside the contact details. */
  fields: Record<string, string | number>;
  /**
   * Which template send-tool-email should render for the visitor. Omit to
   * capture the lead without emailing them a copy.
   */
  emailTool?: ToolKind;
  /**
   * Campaign event name for the Google Ads container (see @/lib/dataLayer).
   * Pushed only after the submission is accepted, never on click, with the
   * visitor's email attached for enhanced conversions.
   */
  dataLayerEvent?: string;
  /** Extra parameters for that event. Enumerated values only - no raw money, no free text. */
  dataLayerParams?: Record<string, unknown>;
  /** Appearance variant: "light" (default), "dark", or "transparent" */
  variant?: "light" | "dark" | "transparent";
}

export default function ToolLeadCapture({
  formName,
  heading,
  description,
  submitLabel,
  event,
  source,
  fields,
  emailTool,
  dataLayerEvent,
  dataLayerParams,
  variant = "light",
}: ToolLeadCaptureProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailed, setEmailed] = useState(false);

  /**
   * Mails the visitor their own results. Resolves either way - the caller only
   * uses the answer to decide what the confirmation should say.
   */
  const emailResults = async (data: FormData): Promise<boolean> => {
    if (!emailTool) return false;
    try {
      const response = await fetch("/api/send-tool-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: emailTool,
          name: (data.get("name") as string) || undefined,
          email: data.get("email") as string,
          company: (data.get("company") as string) || undefined,
          data: fields,
        }),
      });
      if (!response.ok) {
        console.warn(`send-tool-email answered HTTP ${response.status}`);
        return false;
      }
      return true;
    } catch (error) {
      console.warn("send-tool-email request failed", error);
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    appendAttributionToFormData(data);
    setSubmitting(true);

    // Both go out together: the visitor waits for one round trip, not two.
    Promise.all([submitNetlifyForm(formName, data), emailResults(data)])
      .then(([, sent]) => {
        setEmailed(sent);
        setSubmitted(true);
        if (emailTool && !sent) {
          toast.error("We saved your details, but the email did not send. We'll follow up within 1 business day.");
        }
        trackEvent(event, {
          company: (data.get("company") as string) || undefined,
          ...fields,
        });
        trackEvent("qualified_lead", { source });
        if (dataLayerEvent) {
          track(dataLayerEvent, {
            ...dataLayerParams,
            user_data: userDataForEmail(String(data.get("email") ?? "")),
          });
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setSubmitting(false));
  };

  const isDark = variant === "dark" || variant === "transparent";
  const isTransparent = variant === "transparent";
  const inputClass = isTransparent
    ? "w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#021838] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
    : isDark
    ? "w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#06224A] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans"
    : "w-full px-4 py-3 rounded-2xl border border-black/[0.06] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = isDark
    ? "block text-xs font-bold font-manrope text-white mb-2"
    : "block text-xs font-bold font-manrope text-[#0D306C] mb-2";

  if (submitted) {
    if (isDark) {
      return (
        <div
          className={
            isTransparent
              ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center text-white"
              : "rounded-2xl border border-emerald-500/40 bg-[#06224A]/80 p-8 text-center text-white"
          }
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-extrabold font-manrope text-white mb-2">
            {emailed ? "Sent! Check your inbox." : "Got it!"}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans max-w-md mx-auto">
            {emailed
              ? "Your results are on their way. A NeoIntelli advisor will follow up within 1 business day."
              : "We have your details and your results. A NeoIntelli advisor will send them over and follow up within 1 business day."}
          </p>
          <a
            href={bookACallUrl("results")}
            onClick={() => trackEvent("booked_consultation", { source: `${source}_confirmation` })}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-manrope text-white bg-[#00A3E0] hover:bg-[#008EC4] shadow-md shadow-[#00A3E0]/25 transition-all"
          >
            Book a consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-7 text-center">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-xl font-extrabold font-manrope text-[#0D306C] mb-2">
          {emailed ? "Sent - check your inbox." : "Got it."}
        </h3>
        <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-6 font-sans">
          {emailed
            ? "Your results are on their way. A NeoIntelli advisor will follow up within 1 business day."
            : "We have your details and your results. A NeoIntelli advisor will send them over and follow up within 1 business day."}
        </p>
        <a
          href={bookACallUrl("results")}
          onClick={() => trackEvent("booked_consultation", { source: `${source}_confirmation` })}
          className="btn-primary font-manrope font-bold"
        >
          Book a consultation <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      className={
        isTransparent
          ? "bg-transparent p-0 text-white"
          : isDark
          ? "rounded-2xl border border-[#1E3A8A] bg-[#06224A]/70 p-6 md:p-8 shadow-sm text-white"
          : "rounded-2xl border border-black/[0.08] bg-[#f5f5f7] p-6 md:p-7"
      }
    >
      <h3
        className={
          isDark
            ? "text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight mb-2"
            : "text-xl sm:text-[22px] font-extrabold font-manrope text-[#0D306C] tracking-tight mb-2"
        }
      >
        {heading}
      </h3>
      <p
        className={
          isDark
            ? "text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans"
            : "text-sm sm:text-base text-[#505D74] leading-relaxed mb-6 font-sans"
        }
      >
        {description}
      </p>

      <form
        name={formName}
        method="POST"
        action={NETLIFY_FORMS_ENDPOINT}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value={formName} />
        <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor={`bot-field-${formName}`}>Don&apos;t fill this out if you are human: </label>
          <input id={`bot-field-${formName}`} name="bot-field" tabIndex={-1} autoComplete="off" />
        </p>

        {/* The numbers on screen travel with the lead. */}
        {Object.entries(fields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={String(value)} />
        ))}

        <div className="grid sm:grid-cols-3 gap-3.5 mb-4">
          <div>
            <label className={labelClass} htmlFor={`name-${formName}`}>Name</label>
            <input id={`name-${formName}`} name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor={`email-${formName}`}>Work email</label>
            <input id={`email-${formName}`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor={`company-${formName}`}>Company</label>
            <input id={`company-${formName}`} name="company" required autoComplete="organization" placeholder="Your company" className={inputClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={
            isDark
              ? "w-full justify-center py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white font-manrope font-bold text-sm shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              : "btn-primary w-full justify-center py-3.5 disabled:opacity-60 font-manrope font-bold"
          }
        >
          {submitting ? "Sending…" : <>{submitLabel} <ArrowRight className="w-4 h-4" /></>}
        </button>

        <p className={isDark ? "text-xs text-slate-400 text-center mt-4 font-sans" : "text-xs text-[#505D74] text-center mt-4 font-sans"}>
          We&apos;ll email your results and follow up within 1 business day. No spam, no selling your data.
        </p>
      </form>
    </div>
  );
}
