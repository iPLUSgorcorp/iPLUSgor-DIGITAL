import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { getLocalizedPath, seoMetadata, siteOrigin } from "../src/seo-metadata.js";

const output = resolve("dist/client");
const failures = [];

function requireFile(path, label = relative(output, path)) {
  if (!existsSync(path)) failures.push(`Missing ${label}`);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const locale of ["ua", "en", "de"]) {
  for (const route of Object.keys(seoMetadata[locale])) {
    const localizedPath = getLocalizedPath(route, locale);
    const outputRoute = localizedPath.replace(/^\/+|\/+$/g, "");
    const documentPath = outputRoute
      ? resolve(output, outputRoute, "index.html")
      : resolve(output, "index.html");
    requireFile(documentPath, `${localizedPath} static document`);
    if (!existsSync(documentPath)) continue;
    const document = readFileSync(documentPath, "utf8");
    const canonicalUrl = `${siteOrigin}${localizedPath}`;
    if (!document.includes(`<link rel="canonical" href="${canonicalUrl}"`)) {
      failures.push(`${localizedPath} has no matching canonical URL`);
    }
  }

  const legacyRoute = getLocalizedPath("/work/aton", locale).replace(/^\/+|\/+$/g, "");
  requireFile(resolve(output, legacyRoute, "index.html"), `/${legacyRoute}/ legacy route document`);
}

for (const required of ["404.html", ".nojekyll", "CNAME", "robots.txt", "sitemap.xml"]) {
  requireFile(resolve(output, required));
}

if (existsSync(resolve(output, "CNAME"))) {
  const cname = readFileSync(resolve(output, "CNAME"), "utf8").trim();
  if (cname !== "iplusgor.com") failures.push(`Unexpected CNAME: ${cname}`);
}

const textExtensions = new Set([".html", ".css", ".js", ".json", ".webmanifest"]);
const assetPattern = /\/?assets\/[A-Za-z0-9_.\/-]+\.(?:avif|css|gif|jpe?g|js|mp4|png|svg|webm|webp|woff2?)/g;
for (const file of walk(output)) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(assetPattern)) {
    const assetPath = match[0].replace(/^\//, "");
    requireFile(resolve(output, assetPath), `${assetPath} referenced by ${relative(output, file)}`);
  }
}

if (failures.length) {
  console.error("GitHub Pages verification failed:");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Verified GitHub Pages documents, canonical URLs, domain files and referenced assets.");
