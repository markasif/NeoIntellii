import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import RetailPage from '@/pages/industries/retail-gcc';

const PATHNAME = '/industries/retail-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <RetailPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
