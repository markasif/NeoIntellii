import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import FinanceProcurementSharedServicesIndiaLandingPage from '@/pages/landing/FinanceProcurementSharedServicesIndia';

const PATHNAME = '/lp/finance-procurement-shared-services-india';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <FinanceProcurementSharedServicesIndiaLandingPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
