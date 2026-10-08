import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import GCCIndiaCostPage from '@/pages/GCCIndiaCost';

const PATHNAME = '/gcc-india-cost';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <GCCIndiaCostPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
