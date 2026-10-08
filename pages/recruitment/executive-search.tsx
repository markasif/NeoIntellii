import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ExecSearchPage from '@/pages/recruitment/ExecutiveSearch';

const PATHNAME = '/recruitment/executive-search';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ExecSearchPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
