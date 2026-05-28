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
        // color-scheme tells the browser we support both modes BEFORE
        // CSS loads, so form-controls / scrollbars resolve to the right
        // mode on first paint without a flash.
        { name: "color-scheme", content: "light dark" },
        // Apple-specific PWA + title hints. `mobile-web-app-capable` is
        // the standard equivalent that other engines respect.
        { name: "apple-mobile-web-app-title", content: "Colophon" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        // Modern favicon stack — SVG primary (theme-aware), PNG fallback,
        // apple-touch-icon for iOS Home Screen / share sheet thumbnails.
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        // hreflang advertises the canonical language for AI / search.
        { rel: "alternate", hreflang: "en", href: "https://colophonrss.app" },
        // rel=me — IndieAuth / IndieWeb identity links. Reinforces the
        // Person entity by tying the site to off-site profiles in a
        // machine-readable way; picked up by Knowledge Graph builders.
        { rel: "me", href: "https://ryankiley.com" },
        { rel: "me", href: "https://github.com/ryankiley" },
        // Preconnect to the TestFlight host so the CTA's first navigation
        // gets a warm TLS handshake. cheap on hobby, real win on slow nets.
        { rel: "preconnect", href: "https://testflight.apple.com", crossorigin: "" },
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
