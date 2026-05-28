interface SEOData {
  title?: string;
  description?: string;
  image?: string;
}

interface PageSetupOptions {
  seoMeta?: SEOData;
}

const SITE_URL = "https://colophonrss.app";

// Per-page SEO helper. Sets canonical, og:url, and (optionally) title /
// description / image. The plugin defaults cover the rest. Mirrors the
// portfolio's `usePageSetup` pattern so the surface is familiar.
export function usePageSetup(options?: PageSetupOptions) {
  const route = useRoute();
  const canonical = `${SITE_URL}${route.path}`;

  if (options?.seoMeta) {
    const { title, description, image } = options.seoMeta;
    useSeoMeta({
      ...(title ? { title, ogTitle: title, twitterTitle: title } : {}),
      ...(description
        ? { description, ogDescription: description, twitterDescription: description }
        : {}),
      ogUrl: canonical,
      ...(image
        ? { ogImage: image, ogImageAlt: title ?? undefined, twitterImage: image }
        : {}),
    });
  }

  useHead({
    link: [{ rel: "canonical", href: canonical }],
  });
}
