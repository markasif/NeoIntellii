import type { GetStaticProps } from 'next';
import { AppProviders } from '@/components/page/AppProviders';
import SEOHead from '@/components/page/SEOHead';
import { isValidRoute } from '@/App';

export interface PageShellProps { children: React.ReactNode; pathname: string }

export function PageShell({ children, pathname }: PageShellProps) {
  return (
    <>
      <SEOHead pathname={pathname} />
      <AppProviders pathname={pathname}>
        {children}
      </AppProviders>
    </>
  );
}

export function createStaticProps(pathname: string): GetStaticProps {
  return async () => {
    if (!isValidRoute(pathname)) return { notFound: true };
    return { props: {}, revalidate: 3600 };
  };
}
