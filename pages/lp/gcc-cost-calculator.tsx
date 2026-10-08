import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GccCostCalculatorLpPage from '@/pages/landing/GccCostCalculatorLp';

const PATHNAME = '/lp/gcc-cost-calculator';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GccCostCalculatorLpPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
