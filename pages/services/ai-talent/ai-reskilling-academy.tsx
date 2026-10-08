import type { GetStaticProps } from 'next';
import { PageShell, createStaticProps } from '@/lib/page-helpers';
import AIReskillingAcademyPage from '@/pages/services/ai-talent/AIReskillingAcademy';

const PATHNAME = '/services/ai-talent/ai-reskilling-academy';

export default function Page() {
  return (
    <PageShell pathname={PATHNAME}>
      <AIReskillingAcademyPage />
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps = createStaticProps(PATHNAME);
