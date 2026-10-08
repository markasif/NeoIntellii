import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import StrategyBusinessCasePage from '@/pages/services/gcc/StrategyBusinessCase';

const PATHNAME = '/services/gcc/strategy-business-case';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <StrategyBusinessCasePage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
