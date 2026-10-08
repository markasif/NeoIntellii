import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ManufPage from '@/pages/industries/manufacturing-gcc';

const PATHNAME = '/industries/manufacturing-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ManufPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
