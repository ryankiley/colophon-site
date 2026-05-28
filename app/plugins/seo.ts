// Global SEO / social meta defaults. Lives in a plugin (not
// `nuxt.config.ts` `app.head`) so the field names are typed via
// `useSeoMeta` (catches `ogImage` typos, auto-maps `og:*` / `twitter:*`).
// Per-page overrides happen via `usePageSetup` on each page.
const SITE_NAME = "Colophon";
const SITE_URL = "https://colophonrss.app";
// SVG og image — most modern platforms (Slack, Discord, LinkedIn,
// iMessage) render it correctly. Twitter falls back to text card, which
// is acceptable for v1. Rendering a 1024-px PNG from the Xcode 26
// .icon bundle isn't possible from the CLI — see
// [[concepts/icon-composer-format-cli-extraction-gotcha]].
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.svg`;
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
    ogImageWidth: 1200,
    ogImageHeight: 630,
    // og:image:type isn't accepted by useSeoMeta's type narrowing (it
    // restricts to jpeg/gif/png) but most platforms infer the type from
    // the .svg extension or the response Content-Type, so we skip it.
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
