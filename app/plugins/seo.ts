// Global SEO / social meta defaults. Lives in a plugin (not
// `nuxt.config.ts` `app.head`) so the field names are typed via
// `useSeoMeta` (catches `ogImage` typos, auto-maps `og:*` / `twitter:*`).
// Per-page overrides happen via `usePageSetup` on each page. SITE_NAME /
// SITE_URL are auto-imported from app/utils/site.

// 1200×630 PNG, rendered from public/og.svg (see scripts/render-og.mjs).
// PNG rather than SVG: Facebook, LinkedIn, and X reject SVG OG images,
// and iMessage / Slack render them unreliably — so a raster is the only
// format that previews everywhere the TestFlight link gets shared.
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;
const DEFAULT_DESCRIPTION =
  "A calm, content-first RSS and newsletter reader for iPhone and iPad. Now in TestFlight.";

export default defineNuxtPlugin(() => {
  // Pages set their own `title` (e.g. "Privacy"); the template wraps it
  // with " — Colophon". Pages without an explicit title fall through to
  // the bare site name.
  useHead({
    titleTemplate: (chunk?: string) =>
      chunk ? `${chunk} — ${SITE_NAME}` : SITE_NAME,
  });

  useSeoMeta({
    description: DEFAULT_DESCRIPTION,
    ogSiteName: SITE_NAME,
    ogTitle: SITE_NAME,
    ogType: "website",
    ogLocale: "en_US",
    ogDescription: DEFAULT_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageType: "image/png",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${SITE_NAME} — calm RSS reader for iPhone and iPad`,
    twitterTitle: SITE_NAME,
    twitterDescription: DEFAULT_DESCRIPTION,
    twitterImage: DEFAULT_OG_IMAGE,
    twitterImageAlt: `${SITE_NAME} — calm RSS reader for iPhone and iPad`,
    twitterCard: "summary_large_image",
  });

  // WebSite schema — gives search engines + AI agents the site identity
  // for citation. SoftwareApplication schema for the iOS app itself is
  // emitted from index.vue (the page that actually pitches the product).
  useStructuredData({
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
  });
});
