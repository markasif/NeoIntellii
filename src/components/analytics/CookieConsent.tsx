"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck } from "lucide-react";
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
      } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
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
 * Cookie consent banner — shown on the first visit and re-openable from the
 * footer / cookie policy. Third-party scripts only load once the matching
 * consent is granted (see @/lib/consent).
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
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
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, [syncFromStore]);

  const decide = (next: { analytics: boolean; marketing: boolean }) => {
    saveConsent(next);
    setVisible(false);
    setShowPrefs(false);
  };

  return (
    <AnimatePresence>
      {mounted && visible && (
        <motion.aside
          key="cookie-consent"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed z-[120] inset-x-0 bottom-0 sm:inset-x-auto sm:left-6 sm:bottom-6 w-full sm:w-[440px] max-w-full"
        >
          <div
            className="relative overflow-hidden rounded-t-2xl sm:rounded-3xl border border-[#B9D6F0] shadow-[0_20px_60px_rgba(13,48,108,0.3)]"
            style={{ background: "linear-gradient(180deg, #F8FAFD 0%, #EDF5FC 32%, #CDE3F7 100%)" }}
          >
            {/* Cyan hairline accent (matches the footer accent) */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#169DC8] via-[#67D5F7] to-transparent opacity-90" />
            {/* Soft corner glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#169DC8]/15 blur-3xl" />

            <div className="relative z-10 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/80 border border-[#CFE4F6] text-[#008EC4] shadow-sm">
                  <Cookie className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#008EC4] font-mono">
                  Cookie settings
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-[#0D244D] tracking-tight leading-snug mb-2 font-[family-name:var(--font-manrope)]">
                We use cookies to improve your experience.
              </h2>

              <p className="text-[12.5px] sm:text-[13px] text-[#505D74] leading-relaxed mb-4">
                We use essential cookies to run the site, and optional analytics and
                marketing cookies to understand how it is used. Analytics and marketing
                stay off until you allow them. Read our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-[#008EC4] font-semibold underline underline-offset-2 hover:text-[#0D244D] transition-colors"
                >
                  Cookie Policy
                </Link>
                .
              </p>

              <AnimatePresence initial={false}>
                {showPrefs && (
                  <motion.div
                    key="prefs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4">
                      {/* Essential — always on */}
                      <div className="flex items-start justify-between gap-3 rounded-xl border border-[#CFE4F6] bg-white/80 p-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#008EC4]" />
                            <span className="text-[13px] font-bold text-[#0D244D]">Essential</span>
                          </div>
                          <p className="text-[11.5px] text-[#64748B] leading-relaxed">
                            Required for the site to work. Always active.
                          </p>
                        </div>
                        <Switch checked disabled onChange={() => {}} label="Essential cookies (always on)" />
                      </div>

                      {PREF_ROWS.map((row) => (
                        <div
                          key={row.key}
                          className="flex items-start justify-between gap-3 rounded-xl border border-[#CFE4F6] bg-white/80 p-3"
                        >
                          <div className="flex-1">
                            <span className="block text-[13px] font-bold text-[#0D244D] mb-0.5">
                              {row.title}
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
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, marketing: true })}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#169DC8] to-[#0D306C] hover:from-[#1389af] hover:to-[#09224f] shadow-md shadow-[#169DC8]/25 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, marketing: false })}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-[13px] font-bold text-[#0D306C] bg-white/70 border border-[#0D306C]/20 hover:bg-white hover:border-[#0D306C]/35 transition-all duration-200 w-full sm:w-auto"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => (showPrefs ? decide({ analytics, marketing }) : setShowPrefs(true))}
                  className="text-xs sm:text-[13px] font-bold text-[#008EC4] hover:text-[#0D244D] transition-colors px-1 py-2 sm:ml-auto underline-offset-4 hover:underline"
                >
                  {showPrefs ? "Save preferences" : "Manage preferences"}
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
