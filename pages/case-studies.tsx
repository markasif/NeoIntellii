import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import CaseStudiesPage from '@/pages/CaseStudies';

const PATHNAME = '/case-studies';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <CaseStudiesPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
