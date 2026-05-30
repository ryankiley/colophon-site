// Single source of truth for the handful of URLs and strings that would
// otherwise drift across pages, the SEO plugin, and nuxt.config. Nuxt
// auto-imports everything in app/utils, so app code can use these bare;
// nuxt.config imports the file directly (it runs outside the app context).
export const SITE_NAME = "Colophon";
export const SITE_URL = "https://colophonrss.app";
export const TESTFLIGHT_URL = "https://testflight.apple.com/join/xCmmRp7d";
export const CONTACT_EMAIL = "ryanekiley@gmail.com";
export const GITHUB_URL = "https://github.com/ryankiley/colophonrss";
