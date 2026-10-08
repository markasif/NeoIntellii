/**
 * Shared UI pieces for the Decision Lab workspace.
 *
 * Built on the site's existing card and type system - one radius, one border,
 * no coloured strips, no gauges. The pieces that carry meaning here are the
 * ones about honesty: a basis tag next to a figure, a status chip that reads
 * as text rather than as a colour, and a value that renders "Not budgeted"
 * instead of a zero.
 *
 * Accessibility notes that are easy to lose in a refactor:
 *   - Every status carries a word, not only a colour.
 *   - A tooltip is never the only place an explanation exists.
 *   - Recalculation is announced once through a polite live region, not on
 *     every keystroke.
 */

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Info } from "lucide-react";
import type { BasisType, ConfidenceLabel } from "@/lib/gcc-lab/types";

/* ------------------------------------------------------------------ layout */

export function Panel({
  title,
  description,
  children,
  actions,
  id,
}: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  id?: string;
}) {
  return (
    <section data-lab-panel id={id} className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            {title && <h3 className="text-lg md:text-xl text-heading font-semibold">{title}</h3>}
            {description && <p className="text-sm leading-relaxed text-body-muted mt-1.5 max-w-prose">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h4 className="text-2xs uppercase tracking-[0.16em] font-semibold text-body-muted mb-3">{children}</h4>;
}

/* ------------------------------------------------------------------ fields */

const FIELD_CLASS =
  "w-full rounded-xl border border-black/[0.10] bg-white px-3 py-2.5 text-sm text-heading transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/50 disabled:bg-black/[0.03] disabled:text-body-muted";

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-heading mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-body-muted mt-1.5 leading-relaxed">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-destructive mt-1.5 leading-relaxed">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  label,
  hint,
  error,
  ...props
}: { label: string; hint?: ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} htmlFor={id}>
      <input id={id} className={FIELD_CLASS} aria-invalid={error ? true : undefined} {...props} />
    </Field>
  );
}

export function SelectInput({
  label,
  hint,
  error,
  options,
  groups,
  ...props
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  options?: { value: string; label: string }[];
  groups?: { label: string; options: { value: string; label: string }[] }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} htmlFor={id}>
      <div className="relative">
        <select id={id} className={`${FIELD_CLASS} appearance-none pr-9`} {...props}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {groups?.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown aria-hidden className="w-4 h-4 text-body-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </Field>
  );
}

export function NumberInput({
  label,
  hint,
  error,
  value,
  onValueChange,
  placeholder,
  min = 0,
  step,
  suffix,
  ...props
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
  suffix?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} htmlFor={id}>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") return onValueChange(undefined);
            const parsed = Number(raw);
            onValueChange(Number.isFinite(parsed) ? parsed : undefined);
          }}
          className={`${FIELD_CLASS} ${suffix ? "pr-12" : ""}`}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {suffix && (
          <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-body-muted">
            {suffix}
          </span>
        )}
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------- choice sets */

export function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
  columns = 1,
}: {
  label: string;
  value: T | null;
  options: { value: T; label: string; description?: string }[];
  onChange: (value: T) => void;
  hint?: ReactNode;
  columns?: 1 | 2 | 3;
}) {
  const name = useId();
  const grid = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-heading mb-2">{label}</legend>
      <div className={`grid grid-cols-1 ${grid} gap-2`} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 cursor-pointer transition-colors ${
                selected ? "border-secondary bg-secondary/[0.05]" : "border-black/[0.08] hover:border-black/[0.16]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="mt-0.5 accent-[hsl(var(--secondary))] w-4 h-4 shrink-0"
              />
              <span className="min-w-0">
                <span className="block text-sm text-heading font-medium">{option.label}</span>
                {option.description && (
                  <span className="block text-xs text-body-muted mt-0.5 leading-relaxed">{option.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {hint && <p className="text-xs text-body-muted mt-2 leading-relaxed">{hint}</p>}
    </fieldset>
  );
}

export function CheckboxGroup({
  label,
  values,
  options,
  onChange,
  hint,
  columns = 2,
}: {
  label: string;
  values: string[];
  options: { value: string; label: string }[];
  onChange: (values: string[]) => void;
  hint?: ReactNode;
  columns?: 1 | 2 | 3;
}) {
  const grid = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-heading mb-2">{label}</legend>
      <div className={`grid grid-cols-1 ${grid} gap-1.5`}>
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label key={option.value} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-black/[0.02]">
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onChange(checked ? values.filter((entry) => entry !== option.value) : [...values, option.value])
                }
                className="accent-[hsl(var(--secondary))] w-4 h-4 shrink-0"
              />
              <span className="text-sm text-body">{option.label}</span>
            </label>
          );
        })}
      </div>
      {hint && <p className="text-xs text-body-muted mt-2 leading-relaxed">{hint}</p>}
    </fieldset>
  );
}

/* ----------------------------------------------------------------- signals */

export const BASIS_LABELS: Record<BasisType, string> = {
  "user-input": "Your input",
  "published-benchmark": "Benchmark",
  "planning-assumption": "Planning assumption",
  derived: "Derived",
};

/** A basis tag. Text, not a colour - the word is the signal. */
export function BasisTag({ basis }: { basis: BasisType }) {
  return (
    <span className="inline-flex items-center rounded-md bg-black/[0.04] px-1.5 py-0.5 text-2xs text-body-muted whitespace-nowrap">
      {BASIS_LABELS[basis]}
    </span>
  );
}

export function ConfidenceTag({ confidence }: { confidence: ConfidenceLabel }) {
  const labels: Record<ConfidenceLabel, string> = {
    indicative: "Indicative",
    "planning-grade": "Planning grade",
    "source-backed": "Source backed",
    "insufficient-evidence": "Insufficient evidence",
  };
  return (
    <span className="inline-flex items-center rounded-md border border-black/[0.08] px-1.5 py-0.5 text-2xs text-body-muted whitespace-nowrap">
      {labels[confidence]}
    </span>
  );
}

/**
 * A note. `tone` changes the border weight and the leading word, never the
 * meaning - the text says what it is, so it survives being read in greyscale.
 */
export function Note({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "caution" | "blocking";
  title?: string;
  children: ReactNode;
}) {
  const lead = tone === "blocking" ? "Needs attention" : tone === "caution" ? "Worth knowing" : "Note";
  const border = tone === "blocking" ? "border-destructive/30" : tone === "caution" ? "border-gold/40" : "border-black/[0.08]";
  return (
    <div className={`rounded-xl border ${border} bg-black/[0.015] px-3.5 py-3`}>
      <p className="text-2xs uppercase tracking-[0.14em] font-semibold text-body-muted mb-1">{title ?? lead}</p>
      <div className="text-xs leading-relaxed text-body">{children}</div>
    </div>
  );
}

/** An explanation that lives in the page, with a disclosure - never only in a tooltip. */
export function Explain({ summary, children }: { summary: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-xs text-accent-strong hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 rounded"
      >
        <Info aria-hidden className="w-3.5 h-3.5" />
        {summary}
      </button>
      {open && <div className="mt-2 text-xs leading-relaxed text-body max-w-prose">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ values */

/**
 * A figure with its label. Renders the unavailable text rather than a zero
 * when there is no number, so "not budgeted" never reads as "free".
 */
export function Stat({
  label,
  value,
  unavailable,
  sub,
  basis,
}: {
  label: string;
  value: string | null;
  unavailable?: string;
  sub?: ReactNode;
  basis?: BasisType;
}) {
  return (
    <div data-lab-stat className="rounded-xl border border-black/[0.06] bg-white px-4 py-3.5">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-2xs uppercase tracking-[0.14em] text-body-muted">{label}</p>
        {basis && <BasisTag basis={basis} />}
      </div>
      {value != null ? (
        <p className="text-xl md:text-2xl text-heading font-semibold tabular-nums">{value}</p>
      ) : (
        <p className="text-sm text-body-muted leading-snug">{unavailable ?? "Not available"}</p>
      )}
      {sub && <div className="text-xs text-body-muted mt-1 leading-relaxed">{sub}</div>}
    </div>
  );
}

/** Wide content scrolls inside its own container; the page body never does. */
export function ScrollX({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1" tabIndex={0} role="region" aria-label={label}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------- live region */

/**
 * Announces a recalculation once it settles, rather than on every keystroke.
 * A screen reader gets "Estimate updated" after the visitor stops typing, not
 * a running commentary.
 */
export function RecalculationAnnouncer({ signature }: { signature: string }) {
  const [message, setMessage] = useState("");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = window.setTimeout(() => setMessage(`Estimate updated at ${new Date().toLocaleTimeString()}`), 700);
    return () => window.clearTimeout(timer);
  }, [signature]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ button */

export function ActionButton({
  variant = "secondary",
  children,
  ...props
}: { variant?: "primary" | "secondary" | "ghost" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90"
      : variant === "secondary"
        ? "bg-accent-strong text-white hover:bg-accent-strong-dark"
        : "border border-black/[0.10] text-heading hover:bg-black/[0.03]";
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}
