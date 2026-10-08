import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GovernanceCompliance from '@/pages/services/gcc-operations/GovernanceCompliance';

const PATHNAME = '/services/gcc-operations/governance-compliance';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GovernanceCompliance />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
