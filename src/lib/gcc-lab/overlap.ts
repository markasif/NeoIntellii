/**
 * Working-hour overlap between an HQ time zone and India.
 *
 * Computed from IANA zones on a specific date, so daylight saving is handled
 * by the platform rather than by a table of guesses - and so "the US" does not
 * get one overlap number. New York and Los Angeles are three hours apart, and
 * both of them move relative to India twice a year, because India does not
 * observe daylight saving at all.
 *
 * The schedules are the user's to change: an India team working 11:00-20:00
 * IST has a very different overlap from one working 09:00-18:00, and that is a
 * decision, not a fact about the country.
 */

export const INDIA_TIME_ZONE = "Asia/Kolkata";

export interface WorkSchedule {
  /** Local start hour, 0-24. Fractions allowed: 9.5 is 09:30. */
  start: number;
  end: number;
}

export const DEFAULT_HQ_SCHEDULE: WorkSchedule = { start: 9, end: 17 };
export const DEFAULT_INDIA_SCHEDULE: WorkSchedule = { start: 10, end: 19 };

/**
 * Minutes that `timeZone` is ahead of UTC at `date`.
 *
 * Derived by formatting the instant in the zone and reading the wall clock
 * back - the only approach that is correct across daylight saving without
 * shipping a zone database.
 */
export function offsetMinutes(timeZone: string, date: Date): number | null {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = formatter.formatToParts(date);
    const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    const hour = read("hour");
    const asUtc = Date.UTC(
      read("year"),
      read("month") - 1,
      read("day"),
      // Intl can render midnight as hour 24 in some environments.
      hour === 24 ? 0 : hour,
      read("minute"),
      read("second"),
    );
    if (!Number.isFinite(asUtc)) return null;
    return Math.round((asUtc - date.getTime()) / 60_000);
  } catch {
    return null;
  }
}

export interface OverlapResult {
  /** Overlapping working hours, to one decimal. */
  hours: number;
  /** The overlap window in each side's local clock, as "HH:MM". */
  hqWindow: string | null;
  indiaWindow: string | null;
  /** Hours India is ahead of HQ on this date. */
  indiaAheadHours: number | null;
  /** Set when the zones could not be resolved. */
  unavailableReason?: string;
}

const clock = (hoursFromMidnight: number): string => {
  const wrapped = ((hoursFromMidnight % 24) + 24) % 24;
  const hh = Math.floor(wrapped);
  const mm = Math.round((wrapped - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm === 60 ? 0 : mm).padStart(2, "0")}`;
};

/**
 * Overlap on a given date. Returns an explicit unavailable result rather than
 * a zero when a zone cannot be resolved.
 */
export function workingOverlap(
  hqTimeZone: string | undefined,
  date: Date,
  hqSchedule: WorkSchedule = DEFAULT_HQ_SCHEDULE,
  indiaSchedule: WorkSchedule = DEFAULT_INDIA_SCHEDULE,
): OverlapResult {
  if (!hqTimeZone) {
    return { hours: 0, hqWindow: null, indiaWindow: null, indiaAheadHours: null, unavailableReason: "No HQ time zone selected yet." };
  }
  const hqOffset = offsetMinutes(hqTimeZone, date);
  const indiaOffset = offsetMinutes(INDIA_TIME_ZONE, date);
  if (hqOffset == null || indiaOffset == null) {
    return { hours: 0, hqWindow: null, indiaWindow: null, indiaAheadHours: null, unavailableReason: `Could not resolve the time zone ${hqTimeZone}.` };
  }

  // Both working days expressed on one shared axis: minutes from UTC midnight.
  const hqStartUtc = hqSchedule.start * 60 - hqOffset;
  const hqEndUtc = hqSchedule.end * 60 - hqOffset;
  const indiaStartUtc = indiaSchedule.start * 60 - indiaOffset;
  const indiaEndUtc = indiaSchedule.end * 60 - indiaOffset;

  // The two days can sit on either side of UTC midnight, so the HQ day is
  // tried at -1, 0 and +1 days and the best intersection wins.
  let best = { minutes: 0, startUtc: 0, endUtc: 0 };
  [-1440, 0, 1440].forEach((shift) => {
    const start = Math.max(hqStartUtc + shift, indiaStartUtc);
    const end = Math.min(hqEndUtc + shift, indiaEndUtc);
    const minutes = Math.max(0, end - start);
    if (minutes > best.minutes) best = { minutes, startUtc: start, endUtc: end };
  });

  const indiaAheadHours = (indiaOffset - hqOffset) / 60;

  if (best.minutes <= 0) {
    return {
      hours: 0,
      hqWindow: null,
      indiaWindow: null,
      indiaAheadHours,
      unavailableReason: "These two schedules do not overlap on this date. Shift one of them, or plan for asynchronous handover.",
    };
  }

  return {
    hours: Math.round((best.minutes / 60) * 10) / 10,
    hqWindow: `${clock((best.startUtc + hqOffset) / 60)}-${clock((best.endUtc + hqOffset) / 60)}`,
    indiaWindow: `${clock((best.startUtc + indiaOffset) / 60)}-${clock((best.endUtc + indiaOffset) / 60)}`,
    indiaAheadHours: Math.round(indiaAheadHours * 10) / 10,
  };
}
