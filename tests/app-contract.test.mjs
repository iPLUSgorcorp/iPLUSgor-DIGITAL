import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";
import { getLocalizedPath, legacyRedirects, seoMetadata, siteOrigin } from "../src/seo-metadata.js";

const root = resolve(".");
const read = (path) => readFile(join(root, path), "utf8");

test("keeps four distinct pages in UA, EN and DE", async () => {
  const sitemap = await read("public/sitemap.xml");
  for (const locale of ["ua", "en", "de"]) {
    assert.deepEqual(Object.keys(seoMetadata[locale]).sort(), ["/", "/about", "/services", "/start-project"].sort());
    for (const [route, metadata] of Object.entries(seoMetadata[locale])) {
      assert.ok(metadata.title.length > 20);
      assert.ok(metadata.description.length > 50);
      assert.match(sitemap, new RegExp(`${siteOrigin}${getLocalizedPath(route, locale)}`));
    }
  }
  assert.doesNotMatch(sitemap, /\/work\/|\/team\/|\/approach\/|\/solutions\//);
});

test("retains legacy links and GitHub Pages production routing", async () => {
  const app = await read("src/App.jsx");
  const workflow = await read(".github/workflows/deploy-pages.yml");
  const prepare = await read("scripts/prepare-github-pages.mjs");
  assert.equal(legacyRedirects["/approach"], "/");
  assert.equal(legacyRedirects["/solutions/catalogue"], "/services");
  assert.equal(legacyRedirects["/team"], "/about");
  assert.match(app, /Object\.entries\(legacyRedirects\)/);
  assert.match(prepare, /http-equiv="refresh"/);
  assert.match(workflow, /VITE_BASE_PATH:\s*\//);
  assert.match(workflow, /npm run verify:pages/);
});

test("uses one public contact address and an honest email handoff", async () => {
  const index = await read("index.html");
  const intake = await read("src/pages/StartProjectPage.jsx");
  const layout = await read("src/components/SiteLayout.jsx");
  const readme = await read("README.md");
  for (const source of [index, intake, layout, readme]) assert.match(source, /hello@iplusgor\.com/);
  assert.match(intake, /mailto:/);
  assert.match(intake, /navigator\.clipboard\.writeText/);
  assert.match(readme, /No form backend is configured/);
});

test("keeps copy grounded in implementation and budget reality", async () => {
  const copy = await read("src/content/site-copy.js");
  for (const phrase of ["Conversion systems", "AI and business automation", "Custom tools and integrations", "Diagnostic / scope to cash", "$4,000 to $10,000+", "October 20, 2026", "up to 30%"])
    assert.ok(copy.includes(phrase), `Missing ${phrase}`);
  assert.doesNotMatch(copy, /guaranteed revenue|guaranteed leads|trusted by 10,000/i);
});

test("serves a small set of intentional public assets", async () => {
  const brand = await readdir(join(root, "public/assets/brand"));
  assert.deepEqual(brand.sort(), ["iplusgor-logo-dark.png", "iplusgor-logo-light.png", "iplusgor-symbol-signal.webp", "iplusgor-symbol.webp"].sort());
  const layout = await read("src/components/SiteLayout.jsx");
  for (const asset of ["iplusgor-logo-dark.png", "iplusgor-logo-light.png"]) assert.ok(layout.includes(asset));
  assert.match(await read("index.html"), /iplusgor-symbol-signal\.webp/);
  const manifest = JSON.parse(await read("public/site.webmanifest"));
  assert.equal(manifest.icons[0].type, "image/webp");
});

test("explains every capability and practical automation in each language", async () => {
  const { serviceDepth } = await import("../src/content/service-depth.js");
  for (const locale of ["en", "ua", "de"]) {
    const copy = serviceDepth[locale];
    assert.equal(copy.items.length, 4);
    assert.equal(copy.examples.length, 4);
    for (const item of copy.items) {
      for (const key of ["problem", "build", "after", "fit", "scope"]) assert.ok(item[key].length > 70, `${locale} ${item.id} ${key}`);
      assert.ok(item.statement.length > 35, `${locale} ${item.id} statement`);
      assert.ok(item.components.length >= 7);
      assert.ok(item.workflow.length >= 5);
      assert.ok(item.impact.length >= 2);
    }
  }
});

test("ships four localized process photos at a practical size", async () => {
  const { processImages, processImageNote } = await import("../src/content/process-media.js");
  assert.equal(processImages.length, 4);
  for (const image of processImages) {
    const file = await stat(join(root, "public/assets/process", image.file));
    assert.ok(file.size < 150_000, `${image.file} is too large`);
    for (const locale of ["en", "ua", "de"]) assert.ok(image.alt[locale].length > 30);
  }
  for (const locale of ["en", "ua", "de"]) assert.ok(processImageNote[locale].length > 30);
});
