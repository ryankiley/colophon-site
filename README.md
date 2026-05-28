# colophonrss.app

Marketing site for [Colophon](https://github.com/ryankiley/colophon) — a calm, content-first RSS and newsletter reader for iPhone and iPad.

Static Nuxt 4 site. Hosts the TestFlight join link and the privacy policy. `colophonrss.com` 301s to `colophonrss.app`.

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
