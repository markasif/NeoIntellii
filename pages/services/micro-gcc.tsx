import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import MicroGCCPage from '@/pages/services/MicroGCC';

const PATHNAME = '/services/micro-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <MicroGCCPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
