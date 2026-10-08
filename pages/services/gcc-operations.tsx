import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GccOperations from '@/pages/services/gcc-operations/GccOperations';

const PATHNAME = '/services/gcc-operations';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GccOperations />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
