import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import VsOutsourcingPage from '@/pages/GccVsOutsourcing';

const PATHNAME = '/gcc-vs-outsourcing';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <VsOutsourcingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
