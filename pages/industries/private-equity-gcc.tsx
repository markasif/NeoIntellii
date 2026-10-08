import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import PEGCCPage from '@/pages/industries/private-equity-gcc';

const PATHNAME = '/industries/private-equity-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <PEGCCPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
