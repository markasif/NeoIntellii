import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import Index from '@/pages/Index';

const PATHNAME = '/';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <Index />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);

