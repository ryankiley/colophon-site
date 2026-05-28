interface SEOData {
  title?: string;
  description?: string;
}

// Per-page SEO helper. Always sets canonical + og:url; optionally
// overrides title / description (the plugin defaults cover the rest).
// SITE_URL is auto-imported from app/utils/site.
export function usePageSetup(seo?: SEOData) {
  const route = useRoute();
  const canonical = `${SITE_URL}${route.path}`;

  useSeoMeta({
    ogUrl: canonical,
    ...(seo?.title
      ? { title: seo.title, ogTitle: seo.title, twitterTitle: seo.title }
      : {}),
    ...(seo?.description
      ? {
          description: seo.description,
          ogDescription: seo.description,
          twitterDescription: seo.description,
        }
      : {}),
  });

  useHead({
    link: [{ rel: "canonical", href: canonical }],
  });
}
