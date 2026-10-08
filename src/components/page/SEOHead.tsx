import Head from 'next/head';
import {
  SITE_NAME,
  SITE_URL,
  buildCanonicalUrl,
  buildBreadcrumbItems,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildWebPageSchema,
  buildLocalBusinessSchema,
  buildFaqSchema,
  buildBlogPostingSchema,
  buildServiceSchema,
  buildHowToSchema,
  getOgImage,
  getRouteSeo,
  isIndexablePath,
} from '@/lib/seo';

const JsonLd = ({ id, data }: { id: string; data: object | null }) =>
  data ? <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /> : null;

export default function SEOHead({ pathname }: { pathname: string }) {
  const routeSeo = getRouteSeo(pathname);
  const canonical = buildCanonicalUrl(pathname);
  // A paid page that mirrors an organic one canonicalises to the organic URL;
  // everything else canonicalises to itself. Open Graph keeps the page's own
  // URL either way, so a shared link resolves to what the sharer was looking at.
  const canonicalHref = routeSeo.canonical ?? canonical;
  const indexable = isIndexablePath(pathname);
  const ogImage = getOgImage(pathname);

  // Organization and WebSite are emitted on every page, not just the homepage,
  // so the @id references used by WebPage/Service/BlogPosting resolve within
  // each page's own graph instead of dangling.
  const breadcrumb = pathname === '/' ? null : {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: buildBreadcrumbItems(pathname).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item })),
  };

  return (
    <Head>
      <title>{routeSeo.title}</title>
      <meta name="description" content={routeSeo.description} />
      <meta name="robots" content={indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow'} />
      <meta name="author" content={SITE_NAME} />
      {routeSeo.keywords?.length ? <meta name="keywords" content={routeSeo.keywords.join(',')} /> : null}
      <link rel="canonical" href={canonicalHref} />
      <meta property="og:type" content={routeSeo.type ?? 'website'} />
      <meta property="og:title" content={routeSeo.title} />
      <meta property="og:description" content={routeSeo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage.url} />
      <meta property="og:image:secure_url" content={ogImage.url} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(ogImage.width)} />
      <meta property="og:image:height" content={String(ogImage.height)} />
      <meta property="og:image:alt" content={ogImage.alt} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@NeoIntelli" />
      <meta name="twitter:creator" content="@NeoIntelli" />
      <meta name="twitter:title" content={routeSeo.title} />
      <meta name="twitter:description" content={routeSeo.description} />
      <meta name="twitter:image" content={ogImage.url} />
      <meta name="twitter:image:alt" content={ogImage.alt} />
      <JsonLd id="organization-schema" data={buildOrganizationSchema()} />
      <JsonLd id="website-schema" data={buildWebsiteSchema()} />
      <JsonLd id="localbusiness-schema" data={pathname === '/' ? buildLocalBusinessSchema() : null} />
      <JsonLd id="webpage-schema" data={buildWebPageSchema(pathname)} />
      <JsonLd id="breadcrumb-schema" data={breadcrumb} />
      <JsonLd id="faq-schema" data={buildFaqSchema(pathname)} />
      <JsonLd id="blogposting-schema" data={buildBlogPostingSchema(pathname)} />
      <JsonLd id="service-schema" data={buildServiceSchema(pathname)} />
      <JsonLd id="howto-schema" data={buildHowToSchema(pathname)} />
    </Head>
  );
}
