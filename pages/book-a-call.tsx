import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import BookACallPage from '@/pages/BookACall';

const PATHNAME = '/book-a-call';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <BookACallPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
