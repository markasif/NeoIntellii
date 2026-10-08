import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import HealthcarePage from '@/pages/industries/HealthcareGcc';

const PATHNAME = '/industries/healthcare-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <HealthcarePage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
