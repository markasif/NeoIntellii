import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import {
 SITE_NAME,
 SITE_URL,
 buildCanonicalUrl,
 isIndexablePath,
 buildBreadcrumbItems,
 buildOrganizationSchema,
 buildWebsiteSchema,
 buildFaqSchema,
 buildBlogPostingSchema,
 buildServiceSchema,
 getRouteSeo,
 PRERENDER_ROUTES,
} from "./lib/seo";

const toJsonLd = (data: object) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

export const render = (url: string) => {
 const routeSeo = getRouteSeo(url);
 const canonical = buildCanonicalUrl(url);
 const isIndexable = isIndexablePath(url);

 const appHtml = renderToString(
 <StaticRouter location={url}>
 <App />
 </StaticRouter>,
 );

 // Breadcrumb schema (all pages except homepage)
 const breadcrumbJsonLd = url !=="/"
 ? toJsonLd({
"@context":"https://schema.org",
"@type":"BreadcrumbList",
 itemListElement: buildBreadcrumbItems(url).map((item, index) => ({
"@type":"ListItem",
 position: index + 1,
 name: item.name,
 item: item.item,
 })),
 })
 :"";

 // FAQ schema (pages with FAQ sections)
 const faqData = buildFaqSchema(url);
 const faqJsonLd = faqData ? toJsonLd(faqData) :"";

 // BlogPosting schema (individual blog posts)
 const blogData = buildBlogPostingSchema(url);
 const blogJsonLd = blogData ? toJsonLd(blogData) :"";

 // Service schema (service hub pages)
 const serviceData = buildServiceSchema(url);
 const serviceJsonLd = serviceData ? toJsonLd(serviceData) :"";

 // Organization + WebSite schemas (homepage only)
 const homepageSchemas = url ==="/"
 ? `${toJsonLd(buildOrganizationSchema())}${toJsonLd(buildWebsiteSchema())}`
 :"";

 const head = `
 <title>${routeSeo.title}</title>
 <meta name="description" content="${routeSeo.description}"/>
 <meta name="author" content="${SITE_NAME}"/>
 <meta name="robots" content="${isIndexable ?"index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1":"noindex,follow"}"/>
 <meta property="og:type" content="${routeSeo.type ??"website"}"/>
 <meta property="og:title" content="${routeSeo.title}"/>
 <meta property="og:description" content="${routeSeo.description}"/>
 <meta property="og:url" content="${canonical}"/>
 <meta property="og:site_name" content="${SITE_NAME}"/>
 <meta property="og:image" content="${SITE_URL}/images/hero-illustration.webp"/>
 <meta property="og:locale" content="en_US"/>
 <meta name="twitter:card" content="summary_large_image"/>
 <meta name="twitter:title" content="${routeSeo.title}"/>
 <meta name="twitter:description" content="${routeSeo.description}"/>
 <meta name="twitter:image" content="${SITE_URL}/images/hero-illustration.webp"/>
 <link rel="canonical" href="${canonical}"/>
 ${homepageSchemas}
 ${breadcrumbJsonLd}
 ${faqJsonLd}
 ${blogJsonLd}
 ${serviceJsonLd}
 `;

 return { appHtml, head };
};


export { PRERENDER_ROUTES };
