import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { seoMetadata, siteOrigin } from "../src/seo-metadata.js";

const output = resolve("dist/client");
const appRoutes = Object.fromEntries(
  Object.entries(seoMetadata.ua)
    .filter(([path]) => path !== "/")
    .map(([path, metadata]) => [path.replace(/^\//, ""), metadata]),
);

Object.assign(appRoutes, {
  "work/aton": {
    ...seoMetadata.ua["/work"],
    canonicalPath: "/work",
  },
});

function routeDocument(template, route, metadata) {
  const canonicalPath = metadata.canonicalPath ?? `/${route}`;
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;
  const replaceMeta = (source, selector, content) => source.replace(
    new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*("\\s*\\/?>)`, "i"),
    `$1${content}$2`,
  );

  let document = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${metadata.title}</title>`);
  document = replaceMeta(document, 'name="description"', metadata.description);
  document = replaceMeta(document, 'property="og:title"', metadata.title);
  document = replaceMeta(document, 'property="og:description"', metadata.description);
  document = replaceMeta(document, 'property="og:url"', canonicalUrl);
  document = replaceMeta(document, 'name="twitter:title"', metadata.title);
  document = replaceMeta(document, 'name="twitter:description"', metadata.description);
  return document.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i, `$1${canonicalUrl}$2`);
}

mkdirSync(output, { recursive: true });
const indexDocument = readFileSync(resolve(output, "index.html"), "utf8");
copyFileSync(resolve(output, "index.html"), resolve(output, "404.html"));

for (const [route, metadata] of Object.entries(appRoutes)) {
  const routeOutput = resolve(output, route);
  mkdirSync(routeOutput, { recursive: true });
  writeFileSync(resolve(routeOutput, "index.html"), routeDocument(indexDocument, route, metadata));
}

writeFileSync(resolve(output, ".nojekyll"), "");

console.log(`Prepared GitHub Pages routes (${Object.keys(appRoutes).length}), SPA fallback and .nojekyll`);
