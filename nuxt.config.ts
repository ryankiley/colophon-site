// https://nuxt.com/docs/api/configuration/nuxt-config
//
// Static marketing site for the Colophon iOS app. Two routes (/ and
// /privacy), no dynamic content, no auth, no analytics. SSG via
// `nuxt generate` → deployed as static files on Vercel. Response headers
// (CSP, HSTS, etc.) are set by vercel.json because there's no Nitro
// runtime serving the pages.
export default defineNuxtConfig({
  modules: ["@nuxtjs/robots", "@nuxtjs/sitemap"],
  devtools: { enabled: false },
  compatibilityDate: "2026-05-27",
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "color-scheme", content: "light dark" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
  css: ["~/assets/styles/main.scss"],
  site: {
    url: "https://colophonrss.app",
  },
  // ⚠ Nuxt is PINNED to exact 4.4.4 — same regression that bit the
  // portfolio in 4.4.5 / 4.4.6 suppresses inlineStyles and ships a broken
  // SSR HTML payload. See concepts/nuxt-pinned-to-4-4-4-inlinestyles.
  features: {
    inlineStyles: true,
  },
  // Static deploy. Vercel detects this and serves the .output/public
  // tree as a static site (no Functions, no Edge runtime).
  nitro: {
    preset: "static",
  },
  routeRules: {
    "/_nuxt/**": { headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  },
  experimental: {
    payloadExtraction: "client",
    crossOriginPrefetch: true,
    typedPages: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/_global.scss" as *;`,
        },
      },
    },
    build: {
      modulePreload: { polyfill: false },
    },
  },
  robots: {
    // Block AI training crawlers; allow live-retrieval / citation bots.
    // Same split-policy used on the portfolio — keeps Perplexity-User,
    // ChatGPT-User, Claude-User etc. open for "user asks an agent to
    // visit this page" while denying the training-data sweepers.
    groups: [
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "PerplexityBot",
          "Bytespider",
          "Amazonbot",
          "Meta-ExternalAgent",
          "FacebookBot",
          "cohere-ai",
          "Diffbot",
          "ImagesiftBot",
          "DuckAssistBot",
          "Mistral-AI",
        ],
        disallow: ["/"],
      },
      { userAgent: ["*"], disallow: [] },
    ],
    robotsEnabledValue:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  sitemap: {
    urls: ["/", "/privacy"],
  },
});
