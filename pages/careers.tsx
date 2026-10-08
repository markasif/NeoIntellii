import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import CareersPage from '@/pages/careers';

const PATHNAME = '/careers';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <CareersPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
