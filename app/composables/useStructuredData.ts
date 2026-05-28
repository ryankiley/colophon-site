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
        // Escape "<" so a "</script>" (or "<!--") inside any value can't
        // break out of the surrounding <script> block. JSON.stringify
        // alone doesn't neutralize it; inputs are static today, but this
        // keeps the sink safe if it's ever fed dynamic data.
        innerHTML: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(
          /</g,
          "\\u003c",
        ),
      },
    ],
  });
}
