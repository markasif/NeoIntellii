import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ScaleExpansion from '@/pages/services/gcc-operations/ScaleExpansion';

const PATHNAME = '/services/gcc-operations/scale-expansion';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ScaleExpansion />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
