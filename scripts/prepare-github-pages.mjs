import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getLocalizedPath, legacyRedirects, localeHtmlCodes, localeOpenGraphCodes, seoMetadata, siteOrigin } from '../src/seo-metadata.js';
import { getStructuredData, serializeStructuredData } from '../src/structured-data.js';
import { renderPage } from '../dist/server/entry-static.js';

const output = resolve('dist/client');
const template = readFileSync(resolve(output, 'index.html'), 'utf8');
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
function documentFor(path, locale, metadata) {
  const canonicalUrl = `${siteOrigin}${path}`;
  let document = template.replace(/<html\s+lang="[^"]*"/i, `<html lang="${localeHtmlCodes[locale]}"`).replace(/<title>[\s\S]*?<\/title>/i, `<title>${escape(metadata.title)}</title>`);
  for (const [selector, value] of [
    ['name="description"', metadata.description], ['name="robots"', metadata.robots || defaultRobots],
    ['property="og:title"', metadata.title], ['property="og:description"', metadata.description],
    ['property="og:url"', canonicalUrl], ['property="og:locale"', localeOpenGraphCodes[locale]],
    ['name="twitter:title"', metadata.title], ['name="twitter:description"', metadata.description],
  ]) document = document.replace(new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*("\\s*\\/?>)`, 'i'), (_, before, after) => `${before}${escape(value)}${after}`);
  document = document.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i, (_, before, after) => `${before}${canonicalUrl}${after}`);
  for (const code of ['uk', 'en', 'de', 'x-default']) {
    const alternate = code === 'uk' || code === 'x-default' ? 'ua' : code;
    document = document.replace(new RegExp(`(<link\\s+rel="alternate"\\s+hreflang="${code}"\\s+href=")[^"]*("\\s*\\/?>)`, 'i'), (_, before, after) => `${before}${siteOrigin}${getLocalizedPath(path, alternate)}${after}`);
  }
  return document.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, `<script id="site-schema" type="application/ld+json">${serializeStructuredData(getStructuredData(path, locale))}</script>`);
}

for (const locale of ['ua', 'en', 'de']) {
  for (const [route, metadata] of Object.entries(seoMetadata[locale])) {
    const path = getLocalizedPath(route, locale);
    const directory = resolve(output, path.replace(/^\/+|\/+$/g, ''));
    mkdirSync(directory, { recursive: true });
    const body = renderPage(path, locale);
    writeFileSync(resolve(directory, 'index.html'), documentFor(path, locale, metadata).replace('<div id="root"></div>', `<div id="root">${body}</div>`));
  }
  for (const [from, to] of Object.entries(legacyRedirects)) {
    const path = getLocalizedPath(from, locale);
    const target = getLocalizedPath(to, locale);
    const redirectTo = `${target}${from === '/approach' ? '#method' : ''}`;
    const directory = resolve(output, path.replace(/^\/+|\/+$/g, ''));
    mkdirSync(directory, { recursive: true });
    writeFileSync(resolve(directory, 'index.html'), documentFor(target, locale, { ...seoMetadata[locale][to], robots: 'noindex, follow' }).replace('</head>', `<meta http-equiv="refresh" content="0;url=${redirectTo}" /></head>`).replace('<div id="root"></div>', `<div id="root"><a href="${redirectTo}">I+Gor</a></div>`));
  }
}

const fallback = template.replace(/(<meta\s+name="robots"\s+content=")[^"]*("\s*\/?>)/i, '$1noindex, follow$2').replace(/<title>[\s\S]*?<\/title>/i, '<title>404 | I+Gor</title>').replace(/<link[^>]+(?:rel="canonical"|hreflang=)[^>]*>/g, '').replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, '');
writeFileSync(resolve(output, '404.html'), fallback);
writeFileSync(resolve(output, '.nojekyll'), '');

// Update this date when public content changes; it is not a fake daily freshness signal.
const lastModified = '2026-09-29';
const urls = [];
for (const route of Object.keys(seoMetadata.ua)) for (const locale of ['ua', 'en', 'de']) {
  const alternatives = ['ua', 'en', 'de'].map((code) => `<xhtml:link rel="alternate" hreflang="${localeHtmlCodes[code]}" href="${siteOrigin}${getLocalizedPath(route, code)}"/>`).join('');
  urls.push(`  <url><loc>${siteOrigin}${getLocalizedPath(route, locale)}</loc><lastmod>${lastModified}</lastmod>${alternatives}<xhtml:link rel="alternate" hreflang="x-default" href="${siteOrigin}${getLocalizedPath(route, 'ua')}"/></url>`);
}
writeFileSync(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
console.log('Prerendered 12 localized pages, retained legacy redirects and generated multilingual sitemap.');
