/**
 * Version stamps for the GCC Decision Lab.
 *
 * Every result snapshot records both, so an exported decision pack can always
 * say which arithmetic and which benchmark vintage produced it. Bump
 * MODEL_VERSION when the maths changes, DATA_VERSION when the benchmark,
 * policy or city records change.
 */

export const MODEL_VERSION = "lab-model-1.0.0";
export const DATA_VERSION = "lab-data-2026-09-05";

/** Schema version stored on a persisted profile, for migration checks. */
export const PROFILE_SCHEMA_VERSION = 1;

/** Planning horizon in months. Presentation defaults to the first 36. */
export const HORIZON_MONTHS = 60;
export const DEFAULT_VISIBLE_MONTHS = 36;
