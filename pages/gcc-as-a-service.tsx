import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GccAsAServicePage from '@/pages/GccAsAService';

const PATHNAME = '/gcc-as-a-service';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GccAsAServicePage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
