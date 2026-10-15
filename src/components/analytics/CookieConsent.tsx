"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  hasConsentDecision,
  loadConsentedScripts,
  saveConsent,
} from "@/lib/consent";

type PrefKey = "analytics" | "marketing";

interface PrefRow {
  key: PrefKey;
  title: string;
  desc: string;
}

const PREF_ROWS: PrefRow[] = [
  {
    key: "analytics",
    title: "Analytics",
    desc: "Google Analytics, Web Vitals and behaviour insights that show us which pages and tools are useful.",
  },
  {
    key: "marketing",
    title: "Marketing",
    desc: "Google Ads and campaign measurement that help us understand which channels bring qualified visitors.",
  },
];

function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${
        checked ? "bg-[#169DC8]" : "bg-[#C3D6EA]"
      } ${disabled ? "opacity-75 cursor-not-allowed bg-[#169DC8]/80" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/**
 * Cookie consent banner:
 * - Bottom full-width bar (desktop) and stacked card (mobile) with amber hairline top accent.
 * - Interactive modal dialog box with footer color styling when managing cookie preferences.
 * - Supports "Save Choices" (only active selected), "Reject All", and "Accept All".
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const syncFromStore = useCallback(() => {
    const stored = getConsent();
    setAnalytics(stored.analytics);
    setMarketing(stored.marketing);
  }, []);

  // First visit: no decision stored → show banner. Returning visitor → boot
  // whichever tags were previously consented to.
  useEffect(() => {
    setMounted(true);
    syncFromStore();
    if (hasConsentDecision()) {
      loadConsentedScripts();
    } else {
      setVisible(true);
    }
  }, [syncFromStore]);

  // Re-open from the footer link / cookie policy page.
  useEffect(() => {
    const open = () => {
      syncFromStore();
      setShowModal(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, [syncFromStore]);

  const decide = (next: { analytics: boolean; marketing: boolean }) => {
    saveConsent(next);
    setVisible(false);
    setShowModal(false);
  };

  return (
    <>
      {/* ── MODAL DIALOG BOX: MANAGE COOKIES (FOOTER BACKGROUND COLOR + AMBER ACCENT) ── */}
      <AnimatePresence>
        {mounted && showModal && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-[#0B1E3D]/65 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-dialog-title"
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[#B9D6F0] shadow-[0_25px_60px_rgba(13,48,108,0.25)] my-auto z-10"
              style={{
                background:
                  "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 20%, #CDE3F7 60%, #ADD2F1 100%)",
              }}
            >
              {/* Cyan hairline top accent */}
              <span className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#169DC8] via-[#67D5F7] to-[#169DC8] opacity-95 pointer-events-none" />

              <div className="relative z-10 p-5 sm:p-7">
                {/* Header: Title + Close Button */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/80 border border-[#CFE4F6] text-[#008EC4] shadow-xs">
                      <Cookie className="w-4 h-4" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h2
                        id="cookie-dialog-title"
                        className="text-lg sm:text-xl font-extrabold text-[#0D244D] tracking-tight font-[family-name:var(--font-manrope)]"
                      >
                        Cookie Preferences
                      </h2>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008EC4] font-mono">
                        Manage Your Settings
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg p-1.5 text-[#505D74] hover:text-[#0D244D] hover:bg-white/60 transition-colors cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-5">
                  Customize which cookies you wish to allow. Essential cookies are required to
                  operate this website. Analytics and marketing cookies are optional and only
                  activate if you enable them and save your choice.
                </p>

                {/* Preference Cards */}
                <div className="space-y-3 mb-6">
                  {/* Essential — Always Active */}
                  <div className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-white/85 border border-[#CFE4F6] shadow-xs">
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-4 h-4 text-[#008EC4]" />
                        <span className="text-[13.5px] font-bold text-[#0D244D]">
                          Essential Cookies
                        </span>
                        <span className="text-[10.5px] font-bold text-[#0D306C] bg-[#CFE4F6]/80 border border-[#B9D6F0] rounded-full px-2 py-0.5">
                          Always Active
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#64748B] leading-relaxed">
                        Required for secure navigation, session integrity and core features.
                        These cannot be turned off.
                      </p>
                    </div>
                    <Switch
                      checked
                      disabled
                      onChange={() => {}}
                      label="Essential cookies (always active)"
                    />
                  </div>

                  {PREF_ROWS.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-white/85 border border-[#CFE4F6] shadow-xs"
                    >
                      <div className="flex-1 pr-3">
                        <span className="block text-[13.5px] font-bold text-[#0D244D] mb-1">
                          {row.title} Cookies
                        </span>
                        <p className="text-[11.5px] text-[#64748B] leading-relaxed">
                          {row.desc}
                        </p>
                      </div>
                      <Switch
                        checked={row.key === "analytics" ? analytics : marketing}
                        onChange={() =>
                          row.key === "analytics"
                            ? setAnalytics((v) => !v)
                            : setMarketing((v) => !v)
                        }
                        label={`${row.title} cookies`}
                      />
                    </div>
                  ))}
                </div>

                {/* Dialog Footer Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#B9D6F0]/70">
                  <button
                    type="button"
                    onClick={() => decide({ analytics: false, marketing: false })}
                    className="rounded-lg px-4 py-2.5 text-xs sm:text-[13px] font-bold text-[#0D306C] bg-white border border-[#0D306C]/25 hover:bg-[#EDF5FC] hover:border-[#0D306C]/40 transition-all cursor-pointer text-center shadow-xs"
                  >
                    Reject All
                  </button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => decide({ analytics, marketing })}
                      className="rounded-lg px-5 py-2.5 text-xs sm:text-[13px] font-bold text-black bg-white hover:bg-[#1389af] shadow-md shadow-[#169DC8]/25 transition-all cursor-pointer text-center"
                    >
                      Save Choices
                    </button>
                    <button
                      type="button"
                      onClick={() => decide({ analytics: true, marketing: true })}
                      className="rounded-lg px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#169DC8] to-[#0D306C] hover:from-[#1389af] hover:to-[#09224f] shadow-md shadow-[#169DC8]/25 transition-all cursor-pointer text-center"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM FULL-WIDTH COOKIE BANNER ── */}
      <AnimatePresence>
        {mounted && visible && (
          <motion.aside
            key="cookie-consent-bar"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="false"
            aria-label="Cookie consent"
            className="fixed z-[120] inset-x-0 bottom-0 w-full"
          >
            <div
              className="relative w-full border-t border-[#B9D6F0] shadow-[0_-12px_40px_rgba(13,48,108,0.14)]"
              style={{
                background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 40%, #E2EEF9 100%)",
              }}
            >
              {/* Amber hairline top accent (replaced cyan) */}
              <span className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 opacity-95 pointer-events-none" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
                {/* DESKTOP LAYOUT (Image 1) */}
                <div className="hidden md:flex items-center justify-between gap-6 lg:gap-8">
                  {/* Left: Text flow */}
                  <p className="text-xs lg:text-[13px] text-[#505D74] leading-relaxed flex-1 max-w-4xl">
                    <strong className="text-[#0D244D] font-bold">We use cookies to improve your experience.</strong>{" "}
                    We use essential cookies to run the site, and optional analytics and marketing cookies to understand how it is used. Analytics and marketing stay off until you allow them. Read our{" "}
                    <Link
                      href="/cookie-policy"
                      className="text-amber-600 font-semibold underline underline-offset-2 hover:text-[#0D244D] transition-colors"
                    >
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-amber-600 font-semibold underline underline-offset-2 hover:text-[#0D244D] transition-colors"
                    >
                      Privacy Statement
                    </Link>
                    .
                  </p>

                  {/* Right: Actions (Cookies Settings, Reject All, Accept All Cookies) */}
                  <div className="flex items-center gap-4 lg:gap-5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="text-xs sm:text-[13px] font-bold text-[#0D306C] hover:text-amber-600 underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cookies Settings
                    </button>

                    <button
                      type="button"
                      onClick={() => decide({ analytics: false, marketing: false })}
                      className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-xs sm:text-[13px] font-bold text-[#0D306C] bg-white border border-[#0D306C]/25 hover:bg-[#EDF5FC] hover:border-[#0D306C]/40 transition-all duration-200 shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      Reject All
                    </button>

                    <button
                      type="button"
                      onClick={() => decide({ analytics: true, marketing: true })}
                      className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#169DC8] to-[#0D306C] hover:from-[#1389af] hover:to-[#09224f] shadow-md shadow-[#169DC8]/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer whitespace-nowrap"
                    >
                      Accept All Cookies
                    </button>
                  </div>
                </div>

                {/* MOBILE LAYOUT (Image 2) */}
                <div className="flex md:hidden flex-col gap-3">
                  {/* Top: Text flow */}
                  <p className="text-[12.5px] text-[#505D74] leading-relaxed">
                    <strong className="text-[#0D244D] font-bold">We use cookies to improve your experience.</strong>{" "}
                    We use essential cookies to run the site, and optional analytics and marketing cookies to understand how it is used. Analytics and marketing stay off until you allow them. Read our{" "}
                    <Link
                      href="/cookie-policy"
                      className="text-amber-600 font-semibold underline underline-offset-2 hover:text-[#0D244D] transition-colors"
                    >
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-amber-600 font-semibold underline underline-offset-2 hover:text-[#0D244D] transition-colors"
                    >
                      Privacy Statement
                    </Link>
                    .
                  </p>

                  {/* Center: Cookies Settings */}
                  <div className="text-center py-0.5">
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="text-[13px] font-bold text-[#0D306C] hover:text-amber-600 underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Cookies Settings
                    </button>
                  </div>

                  {/* Stacked Full-Width Buttons */}
                  <div className="flex flex-col gap-2.5 w-full pt-1">
                    <button
                      type="button"
                      onClick={() => decide({ analytics: false, marketing: false })}
                      className="w-full inline-flex items-center justify-center rounded-lg py-3 text-[13px] font-bold text-[#0D306C] bg-white border border-[#0D306C]/25 hover:bg-[#EDF5FC] hover:border-[#0D306C]/40 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      Reject All
                    </button>

                    <button
                      type="button"
                      onClick={() => decide({ analytics: true, marketing: true })}
                      className="w-full inline-flex items-center justify-center rounded-lg py-3 text-[13px] font-bold text-white bg-gradient-to-r from-[#169DC8] to-[#0D306C] hover:from-[#1389af] hover:to-[#09224f] shadow-md shadow-[#169DC8]/25 transition-all duration-200 cursor-pointer"
                    >
                      Accept All Cookies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
