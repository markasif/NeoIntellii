import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Picks the first route that actually exists in pages/, falling back to the
 * last entry.
 *
 * Two legacy pod URLs semantically belong to pages other workstreams are
 * building (a GCC modernization page and an AI Engineering pillar). Hard-coding
 * a destination that does not exist yet would turn a 301 into a 301 followed by
 * a 404; hard-coding today's closest page would need a manual edit later and be
 * forgotten. Resolving at build time gives a single-hop redirect to a live page
 * now, and moves to the better destination automatically on the build after
 * that page lands.
 */
const firstExistingRoute = (...routes) =>
  routes.find((route) =>
    ['.tsx', '.ts', '.jsx', '.js'].some((ext) =>
      fs.existsSync(path.join(__dirname, 'pages', `${route.replace(/^\//, '')}${ext}`)) ||
      fs.existsSync(path.join(__dirname, 'pages', route.replace(/^\//, ''), `index${ext}`)),
    ),
  ) ?? routes[routes.length - 1];

const AI_DELIVERY_TEAMS = '/services/ai-delivery-teams';
const AI_DELIVERY_POD = `${AI_DELIVERY_TEAMS}/ai-delivery-pod`;
const DEDICATED_AI_TEAM = `${AI_DELIVERY_TEAMS}/dedicated-ai-engineering-team`;

// Transformation Pod covered program management, BA, change and PMO, which is
// GCC transformation intent rather than AI delivery intent.
const TRANSFORMATION_DESTINATION = firstExistingRoute(
  '/services/gcc/modernization-transformation',
  '/services/gcc/operations-excellence',
);

// Architecture Pod covered enterprise, solution, cloud, data, security and
// integration architecture, which belongs with AI engineering and advisory.
const ARCHITECTURE_DESTINATION = firstExistingRoute(
  '/services/ai-engineering',
  '/services/ai-gcc/ai-advisory-strategy',
);

// Every legacy Talent Pods URL redirects straight to its final destination, so
// no visitor or crawler is sent through a second hop.
//
// These use an explicit 301 rather than `permanent: true`, which Next.js emits
// as a 308. Both are permanent redirects, but 301 is what the migration plan
// specifies and what the analytics and crawl tooling reporting on this
// migration is set up to look for. Next compiles each source to a regex ending
// in `(?:/)?`, so the trailing-slash form of every URL below is covered without
// a separate rule.
const aiDeliveryTeamsRedirects = [
  ['/services/talent', AI_DELIVERY_TEAMS],
  ['/pods', AI_DELIVERY_TEAMS],
  ['/pods/ai-data', AI_DELIVERY_POD],
  ['/pods/engineering', DEDICATED_AI_TEAM],
  ['/pods/transformation', TRANSFORMATION_DESTINATION],
  ['/pods/architecture', ARCHITECTURE_DESTINATION],
].map(([source, destination]) => ({ source, destination, statusCode: 301 }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/next-router-shim.tsx',
    },
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/company', destination: '/about', statusCode: 301 },
      { source: '/services', destination: '/services/gcc', permanent: true },
      { source: '/services/', destination: '/services/gcc', permanent: true },
      { source: '/gcc-solutions', destination: '/services/gcc', permanent: true },
      // Technology Solutions was retired in favour of Enterprise AI Engineering.
      // Explicit 301s (not 308) so legacy clients and SEO tooling read them as
      // permanent moves; every destination is a final canonical URL, no chains.
      // /services/development points at AI Engineering rather than the retired
      // /services/technology, so it stays a single hop.
      { source: '/services/development', destination: '/services/ai-engineering', statusCode: 301 },
      { source: '/services/technology', destination: '/services/ai-engineering', statusCode: 301 },
      { source: '/services/technology/data-platform', destination: '/services/ai-engineering/data-engineering', statusCode: 301 },
      { source: '/services/technology/process-automation', destination: '/services/ai-engineering/ai-agents-automation', statusCode: 301 },
      { source: '/services/technology/product-engineering', destination: '/services/ai-engineering/ai-product-engineering', statusCode: 301 },
      { source: '/services/technology/integration-programs', destination: '/services/ai-engineering', statusCode: 301 },
      // /build-gcc-india duplicated the commercial intent of Setup & Launch; merged there (single hop).
      { source: '/build-gcc-india', destination: '/services/gcc/setup-launch', permanent: true },
      { source: '/build-gcc-india/', destination: '/services/gcc/setup-launch', permanent: true },
      { source: '/staffing-solution-neointelli/:path*', destination: AI_DELIVERY_TEAMS, statusCode: 301 },
      ...aiDeliveryTeamsRedirects,
      { source: '/gcc', destination: '/services/ai-gcc', permanent: true },
      { source: '/gcc/', destination: '/services/ai-gcc', permanent: true },
      { source: '/talent', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/talent/', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/talent/executive-search', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/talent/executive-search/', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/talent/staffing-solutions', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/talent/staffing-solutions/', destination: '/services/gcc-operations/workforce-strategy', permanent: true },
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      // AI Talent consolidation. The redirects below are the planned
      // destinations for the legacy recruitment pages once Search Console
      // clicks, impressions, backlinks and conversions have been reviewed.
      // They are intentionally inactive until that review is done; the old
      // pages remain live and link to the new section in the meantime.
      // { source: '/services/ai-data-recruitment', destination: '/services/ai-talent', permanent: true },
      // { source: '/services/ai-talent-acquisition', destination: '/services/ai-talent/recruitment-hub', permanent: true },
      // { source: '/recruitment/rpo', destination: '/services/ai-talent/recruitment-hub', permanent: true },
      // { source: '/recruitment/executive-search', destination: '/services/ai-talent/ai-leadership-executive-search', permanent: true },
      { source: '/sitemap/', destination: '/sitemap.xml', permanent: true },
      // GCC Operations & Managed Services pillar. The legacy operating pages were
      // consolidated into /services/gcc-operations; every old URL redirects in a
      // single hop to its final canonical destination (trailing-slash variants
      // included so Next's own slash normalisation never adds a second hop).
      // statusCode 301 is used deliberately: the migration brief asks for 301,
      // whereas permanent:true would emit 308.
      { source: '/gcc-operating-model', destination: '/services/gcc-operations', statusCode: 301 },
      { source: '/gcc-operating-model/', destination: '/services/gcc-operations', statusCode: 301 },
      { source: '/services/gcc/operations-excellence', destination: '/services/gcc-operations/service-management-performance', statusCode: 301 },
      { source: '/services/gcc/operations-excellence/', destination: '/services/gcc-operations/service-management-performance', statusCode: 301 },
      { source: '/services/gcc/talent-management', destination: '/services/gcc-operations/workforce-strategy', statusCode: 301 },
      { source: '/services/gcc/talent-management/', destination: '/services/gcc-operations/workforce-strategy', statusCode: 301 },
      { source: '/services/gcc/technology-infrastructure', destination: '/services/gcc-operations/workplace-it-security', statusCode: 301 },
      { source: '/services/gcc/technology-infrastructure/', destination: '/services/gcc-operations/workplace-it-security', statusCode: 301 },
      { source: '/services/gcc/compliance-governance', destination: '/services/gcc-operations/governance-compliance', statusCode: 301 },
      { source: '/services/gcc/compliance-governance/', destination: '/services/gcc-operations/governance-compliance', statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
      { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
    ];
  },
  webpack(config, { isServer }) {
    config.resolve.alias['react-router-dom'] = path.resolve(__dirname, 'src/lib/next-router-shim.tsx');

    // Prevent react-router-dom from being externalized on the server so the
    // webpack alias above is applied during SSR as well as client-side.
    if (isServer && Array.isArray(config.externals)) {
      config.externals = config.externals.map((ext) => {
        if (typeof ext !== 'function') return ext;
        return (ctx, cb) => {
          if (/^react-router(-dom)?(\/.*)?$/.test(ctx.request)) return cb();
          return ext(ctx, cb);
        };
      });
    }

    // Return image imports as URL strings (Vite-compatible behaviour).
    // Without this override Next.js returns StaticImageData objects.
    const imgExts = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i;

    // Remove Next.js built-in image-loader rules so they don't conflict
    // with our custom asset/resource rule below.
    config.module.rules = config.module.rules.filter((rule) => {
      if (!rule || typeof rule !== 'object') return true;
      if (rule.loader && String(rule.loader).includes('next-image-loader')) return false;
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.filter((r) => {
          if (!r || typeof r !== 'object') return true;
          if (r.loader && String(r.loader).includes('next-image-loader')) return false;
          return true;
        });
      }
      return true;
    });

    // Custom rule: emit image files and return plain URL strings.
    // Uses [contenthash:8] for deterministic hashes across server/client builds.
    config.module.rules.unshift({
      test: imgExts,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[contenthash:8][ext]',
        publicPath: '/_next/',
      },
    });

    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/redesign-source/**',
        '**/.next/**',
      ],
    };

    return config;
  },
};

export default nextConfig;
