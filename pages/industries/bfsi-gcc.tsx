import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import BFSIPage from '@/pages/industries/BfsiGcc';

const PATHNAME = '/industries/bfsi-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <BFSIPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
