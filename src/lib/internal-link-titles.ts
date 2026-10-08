const decodeEntities = (value: string) => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const plainText = (value: string) => decodeEntities(value
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim());

const escapeAttribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/**
 * Adds a title only to internal links that do not already supply one. The
 * title mirrors the visible link text, so this is a non-semantic SEO and
 * accessibility enhancement rather than a keyword or destination rewrite.
 */
export const withInternalLinkTitles = (html: string) => html.replace(
  /<a\b([^>]*?)\bhref=(['"])(\/[^'"\s>]*)\2([^>]*)>([\s\S]*?)<\/a>/gi,
  (match, before: string, quote: string, href: string, after: string, content: string) => {
    if (/\btitle\s*=/i.test(match)) return match;
    const title = plainText(content);
    if (!title) return match;
    return `<a${before}href=${quote}${href}${quote}${after} title="${escapeAttribute(title)}">${content}</a>`;
  },
);
