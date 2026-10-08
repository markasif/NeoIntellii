import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AISolutionsPage from '@/pages/services/AISolutions';

const PATHNAME = '/services/ai-gcc';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AISolutionsPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
