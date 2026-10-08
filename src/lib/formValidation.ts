/**
 * Shared lead-form validation.
 *
 * Two rules drive the design:
 *
 * 1. Business enquiries only. Consumer mailboxes (Gmail, Yahoo and the rest)
 *    and disposable domains are rejected, so the inbox stays enquiries rather
 *    than job seekers and throwaway sign-ups.
 * 2. International input is legitimate. Company names carry accents, umlauts,
 *    slashed O, cedillas, eszett and digits ("Bäckerei Müller GmbH", "Société
 *    Générale", "3M", "7-Eleven"), and phone numbers arrive in half a dozen
 *    punctuation styles. Everything below matches Unicode letters rather than
 *    ASCII so those are accepted, not bounced.
 */

/**
 * Consumer mailbox providers. Broad on purpose - the country variants matter,
 * since a European visitor is far likelier to type yahoo.fr than yahoo.com.
 */
export const FREE_EMAIL_DOMAINS = new Set([
  // Google
  "gmail.com", "googlemail.com",
  // Yahoo
  "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.in", "yahoo.ca", "yahoo.com.au",
  "yahoo.de", "yahoo.fr", "yahoo.it", "yahoo.es", "yahoo.co.jp", "yahoo.com.br",
  "yahoo.com.mx", "yahoo.com.sg", "yahoo.ie", "yahoo.se", "yahoo.dk", "yahoo.no",
  "ymail.com", "rocketmail.com",
  // Microsoft
  "outlook.com", "outlook.in", "outlook.de", "outlook.fr", "outlook.es", "outlook.it",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.it", "hotmail.es",
  "hotmail.be", "hotmail.nl", "hotmail.se", "hotmail.dk", "hotmail.no", "hotmail.ca",
  "live.com", "live.co.uk", "live.fr", "live.de", "live.it", "live.nl", "live.se",
  "live.ca", "live.com.au", "msn.com", "passport.com", "windowslive.com",
  // Apple
  "icloud.com", "me.com", "mac.com",
  // Privacy-focused
  "protonmail.com", "proton.me", "pm.me", "tutanota.com", "tutanota.de", "tuta.io",
  "hushmail.com", "mailfence.com", "posteo.de", "runbox.com", "startmail.com",
  // Europe
  "gmx.com", "gmx.de", "gmx.at", "gmx.ch", "gmx.net", "web.de", "t-online.de",
  "freenet.de", "arcor.de", "mail.de", "bluewin.ch", "sunrise.ch",
  "orange.fr", "wanadoo.fr", "free.fr", "laposte.net", "sfr.fr", "bbox.fr",
  "neuf.fr", "aliceadsl.fr", "club-internet.fr", "voila.fr",
  "libero.it", "virgilio.it", "tiscali.it", "alice.it", "tin.it", "fastwebnet.it",
  "terra.es", "telefonica.net", "ya.com", "wanadoo.es",
  "sapo.pt", "clix.pt", "mail.pt",
  "wp.pl", "o2.pl", "onet.pl", "interia.pl", "op.pl", "gazeta.pl",
  "seznam.cz", "centrum.cz", "email.cz", "volny.cz", "azet.sk", "zoznam.sk",
  "telenet.be", "skynet.be", "proximus.be", "scarlet.be",
  "ziggo.nl", "kpnmail.nl", "planet.nl", "home.nl", "hetnet.nl",
  "telia.com", "telia.se", "bredband.net", "spray.se", "hotmail.fi", "luukku.com",
  "online.no", "broadpark.no", "start.no", "mail.dk", "jubii.dk",
  "eircom.net", "btinternet.com", "sky.com", "virginmedia.com", "talktalk.net",
  "ntlworld.com", "blueyonder.co.uk", "tiscali.co.uk",
  // Russia / CIS
  "mail.ru", "inbox.ru", "list.ru", "bk.ru", "internet.ru", "yandex.com",
  "yandex.ru", "ya.ru", "rambler.ru", "ukr.net", "meta.ua",
  // Asia
  "rediffmail.com", "rediff.com", "sify.com", "indiatimes.com",
  "qq.com", "163.com", "126.com", "sina.com", "sina.cn", "sohu.com", "aliyun.com",
  "naver.com", "daum.net", "hanmail.net", "nate.com",
  "docomo.ne.jp", "ezweb.ne.jp", "softbank.ne.jp", "nifty.com", "biglobe.ne.jp",
  // Americas / other
  "aol.com", "aim.com", "comcast.net", "verizon.net", "att.net", "sbcglobal.net",
  "bellsouth.net", "cox.net", "charter.net", "earthlink.net", "juno.com",
  "optonline.net", "roadrunner.com", "shaw.ca", "rogers.com", "sympatico.ca",
  "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br", "globo.com",
  "prodigy.net.mx", "hotmail.com.ar",
  "bigpond.com", "optusnet.com.au", "iinet.net.au", "xtra.co.nz",
  // Generic free providers
  "zoho.com", "zohomail.com", "mail.com", "email.com", "usa.com", "consultant.com",
  "fastmail.com", "fastmail.fm", "hey.com", "inbox.com", "lycos.com", "excite.com",
  "hushmail.me", "gmx.us", "mailbox.org", "disroot.org", "riseup.net",
]);

/** Throwaway inboxes - never a real business enquiry. */
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "yopmail.com", "guerrillamail.com", "guerrillamail.net",
  "sharklasers.com", "10minutemail.com", "temp-mail.org", "tempmail.com",
  "throwawaymail.com", "trashmail.com", "trashmail.de", "dispostable.com",
  "getnada.com", "maildrop.cc", "mailnesia.com", "fakeinbox.com", "spamgourmet.com",
  "mytemp.email", "emailondeck.com", "moakt.com", "tempr.email", "discard.email",
  "mailcatch.com", "spam4.me", "grr.la", "einrot.com", "harakirimail.com",
]);

/**
 * The patterns are built with `new RegExp` rather than literals because the
 * root tsconfig sets no `target`, so TypeScript rejects the `u` flag on a
 * literal. Runtime behaviour is identical - and the flag is what makes
 * `\p{L}` match é, ü, ø, ß and non-Latin scripts instead of nothing.
 */
const unicodeRegExp = (source: string) => new RegExp(source, "u");

/**
 * Local part allows the RFC's common printable set plus Unicode letters, so
 * internationalised addresses are not rejected out of hand. The domain must be
 * a real dotted name ending in a 2+ letter TLD (Unicode, so IDNs pass).
 */
const EMAIL_PATTERN = unicodeRegExp(
  "^[\\p{L}\\p{N}!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\p{L}\\p{N}!#$%&'*+/=?^_`{|}~-]+)*" +
    "@(?:[\\p{L}\\p{N}](?:[\\p{L}\\p{N}-]*[\\p{L}\\p{N}])?\\.)+\\p{L}{2,}$",
);

/** Letters of any script, digits, spaces and the punctuation company names use. */
const COMPANY_PATTERN = unicodeRegExp("^[\\p{L}\\p{N} .,&'’‘`\\-–—/()+#!@:]+$");

/** At least one letter or digit - punctuation alone is not a name. */
const HAS_ALPHANUMERIC = unicodeRegExp("[\\p{L}\\p{N}]");

/** Phone input styles: +33 1 23 45 67 89, (020) 7123-4567, +91-98765 43210. */
const PHONE_ALLOWED = unicodeRegExp("^[\\d+()\\-.\\s/]+$");

export const domainOf = (email: string): string =>
  email.trim().toLowerCase().split("@").pop() ?? "";

/** True for consumer mailboxes and throwaway inboxes. */
export const isPersonalEmailDomain = (email: string): boolean => {
  const domain = domainOf(email);
  return FREE_EMAIL_DOMAINS.has(domain) || DISPOSABLE_EMAIL_DOMAINS.has(domain);
};

/** Returns an error message, or null when the value is acceptable. */
export function validateWorkEmail(value: string): string | null {
  const email = value.trim();
  if (!email) return "Work email is required.";
  if (email.length > 254) return "Please enter a valid company email address.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid company email address.";
  if (isPersonalEmailDomain(email)) {
    return "Please enter a valid company email address — personal email addresses aren't accepted.";
  }
  return null;
}

export function validateCompanyName(value: string): string | null {
  const company = value.trim();
  if (!company) return "Company name is required.";
  if (company.length < 2) return "Please enter your full company name.";
  if (company.length > 120) return "Please shorten your company name.";
  // Punctuation alone is not a name; require at least one letter or digit.
  if (!HAS_ALPHANUMERIC.test(company)) return "Please enter your full company name.";
  if (!COMPANY_PATTERN.test(company)) return "Please remove any unsupported characters from your company name.";
  return null;
}

export function validateRequiredChoice(value: string, label: string): string | null {
  return value.trim() ? null : `Please select ${label}.`;
}

export function validateSelectedRoles(roles: string[]): string | null {
  return roles.length > 0 ? null : "Please select at least one role.";
}

/**
 * Phone is the one optional field, so an empty value passes. Anything typed
 * has to look like a real number: E.164 allows at most 15 digits, and 7 is
 * about the shortest national number in use.
 */
export function validatePhone(value: string): string | null {
  const phone = value.trim();
  if (!phone) return null;
  if (!PHONE_ALLOWED.test(phone)) return "Please enter a valid phone number.";
  if (phone.lastIndexOf("+") > 0) return "Please enter a valid phone number.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number, including country code.";
  return null;
}
