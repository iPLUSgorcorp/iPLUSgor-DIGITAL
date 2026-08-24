import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  getLocalizedPath,
  localeHtmlCodes,
  localeOpenGraphCodes,
  seoMetadata,
  siteOrigin,
} from "../src/seo-metadata.js";

const output = resolve("dist/client");
const appRoutes = [];
for (const locale of ["ua", "en", "de"]) {
  for (const [path, metadata] of Object.entries(seoMetadata[locale])) {
    const canonicalPath = getLocalizedPath(path, locale);
    const outputRoute = canonicalPath.replace(/^\/+|\/+$/g, "");
    appRoutes.push({ outputRoute, canonicalPath, locale, metadata });
  }
  appRoutes.push({
    outputRoute: getLocalizedPath("/work/aton", locale).replace(/^\/+|\/+$/g, ""),
    canonicalPath: getLocalizedPath("/work", locale),
    locale,
    metadata: seoMetadata[locale]["/work"],
  });
}

function routeDocument(template, canonicalPath, locale, metadata) {
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;
  const replaceMeta = (source, selector, content) => source.replace(
    new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*("\\s*\\/?>)`, "i"),
    `$1${content}$2`,
  );

  let document = template
    .replace(/<html\s+lang="[^"]*"/i, `<html lang="${localeHtmlCodes[locale]}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${metadata.title}</title>`);
  document = replaceMeta(document, 'name="description"', metadata.description);
  document = replaceMeta(document, 'name="robots"', metadata.robots || "index, follow, max-image-preview:large");
  document = replaceMeta(document, 'property="og:title"', metadata.title);
  document = replaceMeta(document, 'property="og:description"', metadata.description);
  document = replaceMeta(document, 'property="og:url"', canonicalUrl);
  document = replaceMeta(document, 'property="og:locale"', localeOpenGraphCodes[locale]);
  document = replaceMeta(document, 'name="twitter:title"', metadata.title);
  document = replaceMeta(document, 'name="twitter:description"', metadata.description);
  document = document.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i, `$1${canonicalUrl}$2`);
  for (const alternateLocale of ["ua", "en", "de"]) {
    const hreflang = localeHtmlCodes[alternateLocale];
    const alternateUrl = `${siteOrigin}${getLocalizedPath(canonicalPath, alternateLocale)}`;
    document = document.replace(
      new RegExp(`(<link\\s+rel="alternate"\\s+hreflang="${hreflang}"\\s+href=")[^"]*("\\s*\\/?>)`, "i"),
      `$1${alternateUrl}$2`,
    );
  }
  return document.replace(
    /(<link\s+rel="alternate"\s+hreflang="x-default"\s+href=")[^"]*("\s*\/?>)/i,
    `$1${siteOrigin}${getLocalizedPath(canonicalPath, "ua")}$2`,
  );
}

mkdirSync(output, { recursive: true });
const indexDocument = readFileSync(resolve(output, "index.html"), "utf8");
copyFileSync(resolve(output, "index.html"), resolve(output, "404.html"));

for (const { outputRoute, canonicalPath, locale, metadata } of appRoutes) {
  if (!outputRoute) continue;
  const routeOutput = resolve(output, outputRoute);
  mkdirSync(routeOutput, { recursive: true });
  writeFileSync(resolve(routeOutput, "index.html"), routeDocument(indexDocument, canonicalPath, locale, metadata));
}

writeFileSync(resolve(output, ".nojekyll"), "");

console.log(`Prepared GitHub Pages routes (${appRoutes.length - 1}), SPA fallback and .nojekyll`);
