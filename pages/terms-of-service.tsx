import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import TermsPage from '@/pages/TermsOfService';

const PATHNAME = '/terms-of-service';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <TermsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
