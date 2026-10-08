import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import WorkforceStrategy from '@/pages/services/gcc-operations/WorkforceStrategy';

const PATHNAME = '/services/gcc-operations/workforce-strategy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <WorkforceStrategy />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
