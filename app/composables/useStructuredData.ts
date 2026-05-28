/**
 * Emit a <script type="application/ld+json"> tag for Schema.org structured
 * data. The @context is added automatically; the caller supplies @type and
 * the payload.
 *
 * @example
 *   useStructuredData({
 *     "@type": "SoftwareApplication",
 *     name: "Colophon",
 *     applicationCategory: "NewsApplication",
 *   });
 */
export function useStructuredData(data: Record<string, unknown>) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({ "@context": "https://schema.org", ...data }),
      },
    ],
  });
}
