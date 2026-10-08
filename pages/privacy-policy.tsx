import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import PrivacyPolicyPage from '@/pages/PrivacyPolicy';

const PATHNAME = '/privacy-policy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <PrivacyPolicyPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
