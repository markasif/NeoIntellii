import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import { isPersonalEmailDomain, validateCompanyName, validateRequiredChoice, validateWorkEmail } from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { track, userDataForEmail, type PageVariant } from "@/lib/dataLayer";
import { HQ_COUNTRIES, PLANNED_START_OPTIONS } from "@/data/gccCalculatorContent";

/**
 * "Email me this estimate" - the step-3 lead form.
 *
 * It sits under the finished number and never gates it: the estimate is the
 * reason the visitor clicked the ad, and hiding it behind a form would cost
 * more than it captures.
 *
 * The lead goes where every other tool lead goes (Netlify Forms, with the
 * configured team and the computed numbers attached as hidden fields), and
 * /api/send-tool-email mails the visitor the same summary the ROI estimator
 * sends. Only the Netlify submission can fail the form - an email provider
 * having a bad minute must not read as an error to somebody who just handed
 * us their details - and only a successful submission fires the conversion
 * event, never the click.
 *
 * Every field posted here must also be declared in public/__forms.html.
 */

const FORM_NAME = "cost-calculator";

const INPUT =
  "w-full px-4 py-3 rounded-xl border border-[#1E3A8A] bg-[#0A2E63] text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/30 transition-all font-sans";

export interface EstimateEmailFormProps {
  pageVariant: PageVariant;
  /** The configuration and numbers on screen, posted with the lead. */
  fields: Record<string, string | number>;
}

type Errors = Partial<Record<"name" | "email" | "company" | "hqCountry" | "plannedStart", string>>;

export default function EstimateEmailForm({ pageVariant, fields }: EstimateEmailFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const emailResults = async (data: FormData): Promise<boolean> => {
    try {
      const response = await fetch("/api/send-tool-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "cost",
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "");
    const hqCountry = String(data.get("hqCountry") ?? "");
    const plannedStart = String(data.get("plannedStart") ?? "");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    const emailError = validateWorkEmail(email);
    // A consumer mailbox gets the campaign's wording; anything else keeps the
    // shared validator's more specific message.
    if (emailError) nextErrors.email = isPersonalEmailDomain(email) ? "Please use your work email" : emailError;
    const companyError = validateCompanyName(company);
    if (companyError) nextErrors.company = companyError;
    const hqError = validateRequiredChoice(hqCountry, "your headquarters country");
    if (hqError) nextErrors.hqCountry = hqError;
    const startError = validateRequiredChoice(plannedStart, "a planned start");
    if (startError) nextErrors.plannedStart = startError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    appendAttributionToFormData(data);
    setSubmitting(true);

    Promise.all([submitNetlifyForm(FORM_NAME, data), emailResults(data)])
      .then(([, sent]) => {
        setEmailed(sent);
        setSubmitted(true);
        if (!sent) {
          toast.error("We saved your details, but the email did not send. We'll follow up within 1 business day.");
        }
        // Fires only now: the server accepted the lead. Never on click.
        track("gcc_estimate_email_submitted", {
          hq_country: hqCountry,
          planned_start: plannedStart,
          page_variant: pageVariant,
          user_data: userDataForEmail(email),
        });
        trackEvent("cost_calculator_complete", { company, ...fields });
        trackEvent("qualified_lead", { source: "cost_calculator" });
      })
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setSubmitting(false));
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-[#06224A]/80 p-8 text-center text-white">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-xl font-extrabold font-manrope text-white mb-1.5">
          {emailed ? "Sent! Check your inbox." : "Got it!"}
        </p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto font-sans">
          {emailed
            ? "Your estimate is on its way. A NeoIntelli advisor will follow up within 1 business day."
            : "We have your details and your estimate. A NeoIntelli advisor will send it over within 1 business day."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1E3A8A] bg-[#06224A]/70 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#00A3E0]/20 border border-[#00A3E0]/40 flex items-center justify-center text-[#00A3E0] shrink-0">
          <Mail className="w-4 h-4" />
        </div>
        <h3 className="text-xl sm:text-[22px] font-extrabold font-manrope text-white tracking-tight leading-snug">
          Email me this estimate
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
        The full breakdown — roles, seniority, city and the loaded monthly cost — as an executive summary you can forward.
      </p>

      <form
        name={FORM_NAME}
        method="POST"
        action={NETLIFY_FORMS_ENDPOINT}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input type="hidden" name="pageVariant" value={pageVariant} />
        <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor={`bot-field-${FORM_NAME}`}>Don&apos;t fill this out if you are human: </label>
          <input id={`bot-field-${FORM_NAME}`} name="bot-field" tabIndex={-1} autoComplete="off" />
        </p>

        {/* The numbers on screen travel with the lead. */}
        {Object.entries(fields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={String(value)} />
        ))}

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold font-manrope text-white mb-2" htmlFor="estimate-name">
              Name
            </label>
            <input id="estimate-name" name="name" required autoComplete="name" placeholder="Your name" className={INPUT} />
            {errors.name && <p className="text-2xs text-rose-400 mt-1.5 font-medium">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold font-manrope text-white mb-2" htmlFor="estimate-email">
              Work email
            </label>
            <input id="estimate-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={INPUT} />
            {errors.email && <p className="text-2xs text-rose-400 mt-1.5 font-medium">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold font-manrope text-white mb-2" htmlFor="estimate-company">
              Company
            </label>
            <input id="estimate-company" name="company" required autoComplete="organization" placeholder="Your company" className={INPUT} />
            {errors.company && <p className="text-2xs text-rose-400 mt-1.5 font-medium">{errors.company}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold font-manrope text-white mb-2" htmlFor="estimate-hq">
              Headquarters country
            </label>
            <select id="estimate-hq" name="hqCountry" required defaultValue="" className={INPUT}>
              <option value="" disabled className="bg-[#0A2E63] text-slate-400">Select a country</option>
              {HQ_COUNTRIES.map((country) => (
                <option key={country} value={country} className="bg-[#0A2E63] text-white">
                  {country}
                </option>
              ))}
            </select>
            {errors.hqCountry && <p className="text-2xs text-rose-400 mt-1.5 font-medium">{errors.hqCountry}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold font-manrope text-white mb-2" htmlFor="estimate-start">
              Planned start
            </label>
            <select id="estimate-start" name="plannedStart" required defaultValue="" className={INPUT}>
              <option value="" disabled className="bg-[#0A2E63] text-slate-400">Select a timeline</option>
              {PLANNED_START_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#0A2E63] text-white">
                  {option}
                </option>
              ))}
            </select>
            {errors.plannedStart && <p className="text-2xs text-rose-400 mt-1.5 font-medium">{errors.plannedStart}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full justify-center py-3.5 rounded-full bg-[#00A3E0] hover:bg-[#008EC4] text-white font-manrope font-bold text-sm shadow-md shadow-[#00A3E0]/25 hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {submitting ? "Sending…" : <>Send my estimate <ArrowRight className="w-4 h-4" /></>}
        </button>

        <p className="text-xs text-slate-400 text-center mt-4 font-sans">
          We&apos;ll email your estimate and follow up within 1 business day. No spam, no selling your data.
        </p>
      </form>
    </div>
  );
}
