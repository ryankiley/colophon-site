# colophonrss.app

Marketing site for [Colophon](https://github.com/ryankiley/colophon) — a calm, content-first RSS and newsletter reader for iPhone and iPad.

Static Nuxt 4 site. Hosts the TestFlight join link and the privacy policy. `colophonrss.com` 301s to `colophonrss.app`. Ships zero client JS (`features.noScripts`) — the pages are pure prerendered HTML + inlined CSS.

## Develop

```bash
nvm use
npm install
npm run dev -- --host 0.0.0.0   # accessible from LAN devices
```

## Build

```bash
npm run generate                # → .output/public
npm run typecheck
```

## Social card

`public/og.png` (the Open Graph / Twitter card) is rendered from `public/og.svg` via headless
Chrome, so its system-font type matches the site. Re-render after editing the SVG:

```bash
node scripts/render-og.mjs
```
