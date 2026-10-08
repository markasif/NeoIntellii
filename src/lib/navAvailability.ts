import { isValidRoute } from "@/App";

/**
 * Navigation is declared for the full service structure, but three pillars
 * ship on parallel branches and are not in this build yet. Rendering a link to
 * a page that does not exist would put 404s in the global menu and footer on
 * every page, so navigation is filtered against the route registry at render
 * time.
 *
 * The effect is self-healing: the moment a branch merges and registers its
 * routes in src/App.tsx, its links appear with no further edit. Anything
 * external, or carrying a query or hash, is left alone.
 *
 * `isValidRoute` is a hoisted function declaration in src/App.tsx, so calling
 * it from a component that App can transitively import is safe.
 */
export const isNavLinkAvailable = (href: string, external?: boolean): boolean => {
  if (external) return true;
  if (!href.startsWith("/")) return true;
  const path = href.split(/[?#]/)[0];
  if (!path || path === "/") return true;
  return isValidRoute(path);
};

/**
 * Drops unavailable links from a set of menu or footer columns, and drops any
 * column left with nothing in it.
 */
export const filterNavColumns = <L extends { href: string; external?: boolean }, C extends { links: L[] }>(columns: C[]): C[] =>
  columns
    .map((column) => ({ ...column, links: column.links.filter((link) => isNavLinkAvailable(link.href, link.external)) }))
    .filter((column) => column.links.length > 0);
