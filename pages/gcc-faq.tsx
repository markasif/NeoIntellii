import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import FAQPage from '@/pages/gcc-faq';

const PATHNAME = '/gcc-faq';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <FAQPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
