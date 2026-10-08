import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GCCServicesPage from '@/pages/services/GCCServices';

const PATHNAME = '/services/gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GCCServicesPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
