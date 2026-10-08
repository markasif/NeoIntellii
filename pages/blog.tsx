import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import BlogPage from '@/pages/Blog';

const PATHNAME = '/blog';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <BlogPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
