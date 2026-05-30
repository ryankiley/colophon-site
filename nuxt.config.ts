// https://nuxt.com/docs/api/configuration/nuxt-config
//
// Static marketing site for the Colophon iOS app. Two routes (/ and
// /privacy), no dynamic content, no auth. SSG via `nuxt generate` →
// deployed as static files on Vercel. Response headers (CSP, HSTS, etc.)
// are set by vercel.json because there's no Nitro runtime serving the
// pages, and the page ships no client-side JS (see features.noScripts).
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { SITE_NAME, SITE_URL, TESTFLIGHT_URL } from "./app/utils/site";

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
        // Paint the mobile browser chrome to match the page surface in
        // each mode (off-white light / near-black dark).
        { name: "theme-color", content: "#fafafa", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#0e0e0e", media: "(prefers-color-scheme: dark)" },
        { name: "apple-mobile-web-app-title", content: SITE_NAME },
        { name: "format-detection", content: "telephone=no" },
      ],
      script: [
        // Vercel Web Analytics + Speed Insights, served by the Vercel
        // platform at these same-origin paths. Bare script tags rather
        // than the @vercel/analytics module, whose runtime init threw
        // "Cannot read properties of undefined (reading 'app')" against
        // the static-preset SSG output; these endpoints work the same
        // with zero framework friction. Deferred — and the only JS on
        // the page, since the Nuxt runtime is stripped (features.noScripts).
        { src: "/_vercel/insights/script.js", defer: true },
        { src: "/_vercel/speed-insights/script.js", defer: true },
      ],
      link: [
        // Modern favicon stack — SVG primary (theme-aware), PNG fallback,
        // apple-touch-icon for iOS Home Screen / share sheet thumbnails.
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        // hreflang advertises the canonical language for AI / search.
        { rel: "alternate", hreflang: "en", href: SITE_URL },
        // rel=me — IndieAuth / IndieWeb identity links. Reinforces the
        // Person entity by tying the site to off-site profiles in a
        // machine-readable way; picked up by Knowledge Graph builders.
        { rel: "me", href: "https://ryankiley.com" },
        { rel: "me", href: "https://github.com/ryankiley" },
        // Preconnect to the TestFlight host so the CTA's first navigation
        // gets a warm TLS handshake. No crossorigin — the CTA is a
        // top-level (credentialed) navigation, which won't reuse an
        // anonymous CORS socket.
        { rel: "preconnect", href: new URL(TESTFLIGHT_URL).origin },
      ],
    },
  },
  css: ["~/assets/styles/main.scss"],
  site: {
    url: SITE_URL,
  },
  // Nuxt 4.4.6 with inlineStyles intentionally OFF (see features below).
  // With inlineStyles ON, Nuxt 4.4.5/4.4.6 inline the global CSS
  // *non-deterministically* — the same source can build styled or silently
  // unstyled (the portfolio took a prod outage on 4.4.6 this way, on the
  // identical config). So rather than pin to 4.4.4 forever to keep that
  // fragile feature, this site drops it: CSS ships as render-blocking
  // <link>s (one clean paint, no FOUC). That kills the race (Nuxt can be
  // bumped normally now) and leaves zero inline <style> blocks — which is
  // why the CSP has no style-src 'unsafe-inline' (see vercel.json). 4.4.6
  // also clears the dev-only __nuxt_island advisory (GHSA-g8wj-3cr3-6w7v),
  // moot for this static deploy but free.
  features: {
    inlineStyles: false,
    // The page has no client-side interactivity, so ship zero JS:
    // noScripts strips the Vue/Nuxt runtime, the hydration bootstrap, and
    // the payload from the prerendered HTML — leaving pure HTML + a linked
    // stylesheet. (The Vercel analytics tags above live in app.head and are
    // unaffected.) Flip this off per-route if a page ever needs JS.
    noScripts: true,
  },
  // Static deploy. Vercel detects this and serves the .output/public
  // tree as a static site (no Functions, no Edge runtime).
  nitro: {
    preset: "static",
    // Prerender the catch-all (app/pages/[...slug].vue) at /not-found,
    // then (see hooks below) copy it over 404.html — so unmatched routes
    // get a real, prerendered not-found page instead of an empty SPA
    // shell, which can't hydrate under features.noScripts.
    prerender: {
      routes: ["/not-found"],
    },
  },
  // Overwrite the empty SPA-fallback 404.html with the prerendered
  // /not-found page once prerendering has written every file. Runs under
  // both `nuxt build` (Vercel's command) and `nuxt generate`.
  hooks: {
    "nitro:init"(nitro) {
      nitro.hooks.hook("prerender:done", () => {
        const pub = nitro.options.output.publicDir;
        const src = [
          join(pub, "not-found", "index.html"),
          join(pub, "not-found.html"),
        ].find((p) => existsSync(p));
        if (src) copyFileSync(src, join(pub, "404.html"));
        // Drop the /not-found artifact now that 404.html is seeded from it,
        // so it isn't served as a 200 twin of the 404 page.
        rmSync(join(pub, "not-found"), { recursive: true, force: true });
        rmSync(join(pub, "not-found.html"), { force: true });
      });
      // The SPA-fallback shell (200.html) is written AFTER prerender:done, so
      // it must be removed on a later hook. Nitro emits 200.html — an empty
      // `<div id="__nuxt">` shell — as a client-routing catch-all; on Vercel
      // it shadows 404.html, so EVERY unmatched route resolves to that blank
      // shell at HTTP 200 (a soft 404 — verified on prod 2026-05-30). Under
      // features.noScripts the shell can't hydrate anyway, so it's dead weight.
      // Removing it lets Vercel's static serving fall through to 404.html with
      // a real 404. (index.html, the real home page, is untouched.)
      nitro.hooks.hook("compiled", () => {
        rmSync(join(nitro.options.output.publicDir, "200.html"), { force: true });
      });
    },
  },
  routeRules: {
    "/_nuxt/**": { headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  },
  experimental: {
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
  },
  robots: {
    // Block AI training crawlers; allow live-retrieval / citation bots.
    // Keeps Perplexity-User, ChatGPT-User, Claude-User etc. open for
    // "user asks an agent to visit this page" while denying the
    // training-data sweepers.
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
    // Hand-curated allowlist of canonical, indexable URLs. excludeAppSources
    // turns OFF the module's auto-discovery, which otherwise sweeps the
    // prerendered /not-found route (from nitro.prerender.routes) into the
    // sitemap — and the prerender hook above makes /not-found a real 404, so
    // advertising it would point crawlers at a 404. With discovery off the
    // sitemap is exactly these URLs. Adding a page? Add it here.
    urls: ["/", "/privacy", "/terms"],
    excludeAppSources: true,
  },
});
