import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import CostCalcPage from '@/pages/GccCostCalculator';

const PATHNAME = '/gcc-cost-calculator';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <CostCalcPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
