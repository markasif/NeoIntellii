import type { GetStaticPaths, GetStaticProps } from 'next';
import { blogPosts } from '@/data/blogPosts';
import SEOHead from '@/components/page/SEOHead';
import { AppProviders } from '@/components/page/AppProviders';
import BlogPost from '@/pages/BlogPost';

type Props = { pathname: string };

export default function BlogPostPage({ pathname }: Props) {
  return (
    <>
      <SEOHead pathname={pathname} />
      <AppProviders pathname={pathname}>
        <BlogPost />
      </AppProviders>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: blogPosts.map((post) => ({ params: { slug: post.slug } })),
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  // fallback: 'blocking' means any /blog/<anything> reaches this handler. Without
  // this check an unknown slug returned HTTP 200 and redirected client-side to
  // /blog, i.e. a soft 404 over an unbounded URL space.
  if (!blogPosts.some((post) => post.slug === slug)) return { notFound: true, revalidate: 3600 };
  return { props: { pathname: `/blog/${slug}` }, revalidate: 3600 };
};
