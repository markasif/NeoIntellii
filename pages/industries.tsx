import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import IndustriesPage from '@/pages/Industries';

const PATHNAME = '/industries';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <IndustriesPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
