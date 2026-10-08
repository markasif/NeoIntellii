import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Children, isValidElement, type AnchorHTMLAttributes, type ReactNode } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string; href?: string; children?: ReactNode; replace?: boolean };

const destinationLabel = (target: string) => {
  const pathname = target.split(/[?#]/)[0];
  const segment = pathname.split('/').filter(Boolean).at(-1);
  if (!segment) return '';
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const childText = (children: ReactNode): string => Children.toArray(children)
  .map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return childText(child.props.children);
    return '';
  })
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim();

const linkTitle = (children: ReactNode, target: string, explicitTitle?: string) =>
  explicitTitle ?? (childText(children) || destinationLabel(target) || undefined);

export function Link({ to, href, children, title, ...props }: LinkProps) {
  const target = to ?? href ?? '#';
  return <NextLink href={target} title={linkTitle(children, target, title)} {...props}>{children}</NextLink>;
}

type NavLinkClassName = string | ((state: { isActive: boolean; isPending: boolean }) => string) | undefined;

export function NavLink({ to, href, children, className, title, ...props }: Omit<LinkProps, 'className'> & { className?: NavLinkClassName }) {
  const router = useRouter();
  const target = to ?? href ?? '#';
  const isActive = router.asPath.split('?')[0] === target;
  const fn = className as ((state: { isActive: boolean; isPending: boolean }) => string) | undefined;
  const resolvedClass = typeof className === 'function' ? fn!({ isActive, isPending: false }) : (className as string | undefined);
  return <NextLink href={target} title={linkTitle(children, target, title)} className={resolvedClass} {...props}>{children}</NextLink>;
}

export function useLocation() {
  const router = useRouter();
  const asPath = router?.asPath || '/';
  const [pathnameWithHash, hash = ''] = asPath.split('#');
  const [pathname, search = ''] = pathnameWithHash.split('?');
  return { pathname: pathname || '/', search: search ? `?${search}` : '', hash: hash ? `#${hash}` : '' };
}

export function useParams() {
  const router = useRouter();
  const slug = router?.query?.slug;
  const parts = Array.isArray(slug) ? slug : typeof slug === 'string' ? [slug] : [];
  return { slug: parts[parts.length - 1] };
}

export function Navigate({ to, replace = false }: { to: string; replace?: boolean }) {
  const router = useRouter();
  if (typeof window !== 'undefined' && router) {
    void (replace ? router.replace(to) : router.push(to));
  }
  return null;
}

export type NavLinkProps = Omit<LinkProps, 'className'> & { className?: NavLinkClassName };
