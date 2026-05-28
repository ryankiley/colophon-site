// Render public/og.svg → public/og.png at 1200×630 using headless Chrome.
//
// Why Chrome (not resvg/sharp): og.svg sets its type in -apple-system, so
// a real browser on macOS rasterises it with the actual San Francisco
// glyphs — pixel-identical to the site. Re-run after editing og.svg:
//
//   node scripts/render-og.mjs
//
// Override the browser with CHROME_BIN=/path/to/chrome if it can't be found.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "og.svg");
const outPath = join(root, "public", "og.png");

const chrome = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]
  .filter(Boolean)
  .find((p) => existsSync(p));

if (!chrome) {
  console.error("No Chrome/Chromium found — set CHROME_BIN=/path/to/chrome.");
  process.exit(1);
}

// Wrap the SVG in a margin-free document so the screenshot is exactly the
// 1200×630 artboard with no body-margin offset.
const html = `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0}svg{display:block}</style>
${readFileSync(svgPath, "utf8")}`;
const htmlPath = join(tmpdir(), "colophon-og.html");
writeFileSync(htmlPath, html);

try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      `--screenshot=${outPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "inherit" },
  );
  console.log(`Rendered ${outPath} (1200×630) from og.svg`);
} finally {
  rmSync(htmlPath, { force: true });
}
