import type { GetServerSideProps } from 'next';
import { ROUTE_SEO, SITE_URL, postDateIso } from '@/lib/seo';
import { blogPosts } from '@/data/blogPosts';

// The sitemap is generated from the same sources that drive on-page SEO
// (ROUTE_SEO for static routes, blogPosts for articles), so every indexable
// page is listed and a new blog post appears here with no extra step.

type SitemapEntry = { loc: string; lastmod?: string; changefreq: string; priority: string };

const buildEntries = (): SitemapEntry[] => {
  const staticEntries: SitemapEntry[] = ROUTE_SEO.map((route) => ({
    loc: `${SITE_URL}${route.path === '/' ? '/' : route.path}`,
    changefreq: route.path === '/' || route.path === '/blog' ? 'weekly' : 'monthly',
    priority:
      route.path === '/' ? '1.0'
      : route.path === '/blog' ? '0.9'
      : route.path.startsWith('/services') || route.path.startsWith('/recruitment') ? '0.8'
      : '0.7',
  }));

  const blogEntries: SitemapEntry[] = blogPosts.map((post) => {
    const lastmod = postDateIso(post.date);
    return {
      loc: `${SITE_URL}/blog/${post.slug}`,
      ...(lastmod ? { lastmod } : {}),
      changefreq: 'monthly',
      priority: '0.6',
    };
  });

  return [...staticEntries, ...blogEntries];
};

const renderXml = (entries: SitemapEntry[]): string => {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '';
      return `  <url><loc>${entry.loc}</loc>${lastmod}<changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(renderXml(buildEntries()));
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
