import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import TechGCCPage from '@/pages/industries/TechnologyGcc';

const PATHNAME = '/industries/technology-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <TechGCCPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
