import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import PeopleHrOperations from '@/pages/services/gcc-operations/PeopleHrOperations';

const PATHNAME = '/services/gcc-operations/people-hr-operations';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <PeopleHrOperations />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
