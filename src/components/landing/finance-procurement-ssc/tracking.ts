/**
 * Identifiers for /lp/finance-procurement-shared-services-india.
 *
 * They live in their own module so the form, the industry block and the page
 * can all tag events without importing each other.
 */

/**
 * Netlify form name, declared in public/__forms.html. It doubles as the source
 * tag carried on every submission, so a lead is attributable to this page.
 */
export const FORM_NAME = "lp-ssc";

/**
 * Distinct page identifier on every conversion event fired from this page, so
 * its ad groups can be measured separately from the other landing pages.
 */
export const PAGE_ID = "lp-finance-procurement-ssc";
