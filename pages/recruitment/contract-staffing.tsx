import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import ContractPage from '@/pages/recruitment/ContractStaffing';

const PATHNAME = '/recruitment/contract-staffing';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <ContractPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
