import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ModernizationTransformationPage from '@/pages/services/gcc/ModernizationTransformation';

const PATHNAME = '/services/gcc/modernization-transformation';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ModernizationTransformationPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
