import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const work = await readFile(new URL("../src/pages/WorkPage.jsx", import.meta.url), "utf8");
const catalogue = await readFile(new URL("../src/pages/CataloguePage.jsx", import.meta.url), "utf8");
const intake = await readFile(new URL("../src/pages/StartProjectPage.jsx", import.meta.url), "utf8");
const conversionOffer = await readFile(new URL("../src/components/ConversionOffer.jsx", import.meta.url), "utf8");
const analytics = await readFile(new URL("../src/lib/analytics.js", import.meta.url), "utf8");
const layout = await readFile(new URL("../src/components/SiteLayout.jsx", import.meta.url), "utf8");
const i18n = await readFile(new URL("../src/i18n.jsx", import.meta.url), "utf8");
const team = await readFile(new URL("../src/pages/TeamPage.jsx", import.meta.url), "utf8");
const teamProfileUa = await readFile(new URL("../src/content/team-profile.ua.md", import.meta.url), "utf8");
const teamProfileEn = await readFile(new URL("../src/content/team-profile.en.md", import.meta.url), "utf8");
const teamProfileDe = await readFile(new URL("../src/content/team-profile.de.md", import.meta.url), "utf8");
const seo = await readFile(new URL("../src/seo-metadata.js", import.meta.url), "utf8");
const indexDocument = await readFile(new URL("../index.html", import.meta.url), "utf8");
const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const pagesWorkflow = await readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8");
const cname = (await readFile(new URL("../public/CNAME", import.meta.url), "utf8")).trim();
const workConceptsSource = await readFile(new URL("../public/data/work-concepts.json", import.meta.url), "utf8");
const workConcepts = JSON.parse(workConceptsSource);
const { seoMetadata, siteOrigin } = await import("../src/seo-metadata.js");

test("declares every required public route", () => {
  for (const route of [
    "approach",
    "solutions",
    "solutions/catalogue",
    "work",
    "team",
    "start-project",
  ]) {
    assert.match(app, new RegExp(`\\["${route.replace("/", "\\/")}",`));
  }
  assert.match(app, /routePrefix}work\/aton/);
  assert.match(app, /<Navigate to={`\$\{prefix \? `\/\$\{prefix}` : ""}\/work`} replace \/>/);
});

test("uses an honest concept library with explicit publication permission", () => {
  assert.match(work, /work-concepts\.json/);
  assert.match(work, /explicit client permission/);
  assert.match(work, /SELF-INITIATED STUDY/);
  assert.match(work, /before/);
  assert.match(work, /after/);
  assert.doesNotMatch(work, /ATON|VTN LED|AEROSTAR/);
  assert.match(work, /MagnifyingGlassPlus/);
  assert.match(work, /MagnifyingGlassMinus/);
  assert.match(work, /Math\.min\(3, Math\.max\(1/);
  assert.match(work, /onDoubleClick/);
});

test("labels demo data and uses a real email handoff", () => {
  assert.match(catalogue, /INTERFACE EXAMPLE — NOT CLIENT DATA/);
  assert.match(intake, /igorcorp\.tech@gmail\.com/);
  assert.match(intake, /mailto:/);
  assert.match(intake, /mail\.google\.com/);
  assert.match(intake, /\$4,000/);
  assert.match(intake, /\$8,500/);
  assert.match(intake, /\$10,000/);
  assert.doesNotMatch(`${intake}${layout}${app}`, /€|15,000|PROJECTS FROM/);
});

test("publishes exact conversion scopes and analytics-ready events", () => {
  assert.match(conversionOffer, /\$4,000/);
  assert.match(conversionOffer, /\$8,500/);
  assert.match(conversionOffer, /\$10,000/);
  assert.match(conversionOffer, /2–3/);
  assert.match(conversionOffer, /5–7/);
  assert.match(analytics, /iplusgor:conversion/);
  assert.match(analytics, /dataLayer/);
  assert.match(intake, /form_started/);
  assert.match(intake, /form_handoff/);
});

test("provides browser-detected UA, EN and DE locales", () => {
  assert.match(i18n, /navigator\.languages/);
  assert.match(i18n, /startsWith\("uk"\)/);
  assert.match(i18n, /startsWith\("de"\)/);
  assert.match(i18n, /localStorage/);
  assert.match(layout, /\["ua", "en", "de"\]/);
});

test("keeps every localized team profile concise first and expandable in full", () => {
  assert.match(team, /<details className="team-profile__details">/);
  assert.match(team, /teamProfiles/);
  assert.match(team, /splitTeamProfile/);
  assert.match(teamProfileUa, /# Коротко про iPLUSgor/);
  assert.match(teamProfileUa, /# Повна версія/);
  assert.match(teamProfileUa, /Менше передач між підрядниками/);
  assert.match(teamProfileUa, /Conversion Website Sprint — \$8,500/);
  assert.match(teamProfileEn, /# About iPLUSgor/);
  assert.match(teamProfileEn, /# Full profile/);
  assert.match(teamProfileEn, /Fewer handoffs/);
  assert.match(teamProfileEn, /Conversion Website Sprint — \$8,500/);
  assert.match(teamProfileDe, /# Kurz über iPLUSgor/);
  assert.match(teamProfileDe, /# Vollständiges Profil/);
  assert.match(teamProfileDe, /Weniger Übergaben/);
  assert.match(teamProfileDe, /Conversion Website Sprint — \$8,500/);
});

test("publishes consistent crawlable SEO metadata for the production domain", () => {
  assert.match(indexDocument, /<html lang="uk">/);
  assert.match(indexDocument, /<title>Розробка сайтів і лендингів для бізнесу \| iPLUSgor<\/title>/);
  assert.match(indexDocument, /<link rel="canonical" href="https:\/\/iplusgor\.com\/"/);
  assert.match(indexDocument, /"@type": "WebSite"/);
  assert.match(indexDocument, /"@type": "Organization"/);
  assert.match(indexDocument, /"@type": "Service"/);
  assert.match(indexDocument, /"serviceType": "Conversion-focused commercial website strategy, design and frontend development"/);
  assert.match(indexDocument, /"@type": "OfferCatalog"/);
  assert.match(indexDocument, /"price": "4000"/);
  assert.match(indexDocument, /"price": "8500"/);
  assert.match(indexDocument, /"minPrice": "10000"/);
  assert.match(indexDocument, /https:\/\/www\.instagram\.com\/iplusgor\//);
  for (const locale of ["ua", "en", "de"]) assert.match(seo, new RegExp(`^  ${locale}:`, "m"));
  for (const route of ["approach", "solutions", "work", "team", "start-project"]) {
    assert.match(sitemap, new RegExp(`<loc>https://iplusgor\\.com/${route}/</loc>`));
    assert.match(sitemap, new RegExp(`<loc>https://iplusgor\\.com/en/${route}/</loc>`));
    assert.match(sitemap, new RegExp(`<loc>https://iplusgor\\.com/de/${route}/</loc>`));
  }
  assert.doesNotMatch(sitemap, /solutions\/catalogue/);
  assert.equal(seoMetadata.ua["/solutions/catalogue"].robots, "noindex, follow");
  assert.match(indexDocument, /hreflang="uk" href="https:\/\/iplusgor\.com\/"/);
  assert.match(indexDocument, /hreflang="en" href="https:\/\/iplusgor\.com\/en\/"/);
  assert.match(indexDocument, /hreflang="de" href="https:\/\/iplusgor\.com\/de\/"/);
  assert.match(robots, /Sitemap: https:\/\/iplusgor\.com\/sitemap\.xml/);
  assert.doesNotMatch(`${seo}${indexDocument}`, /Creative|industrial|manufactur|dealer|equipment/i);
});

test("provides complete localized metadata for every public route", () => {
  const publicRoutes = ["/", "/approach", "/solutions", "/solutions/catalogue", "/work", "/team", "/start-project"];
  assert.equal(siteOrigin, "https://iplusgor.com");
  for (const locale of ["ua", "en", "de"]) {
    assert.deepEqual(Object.keys(seoMetadata[locale]).sort(), [...publicRoutes].sort());
    for (const route of publicRoutes) {
      assert.ok(seoMetadata[locale][route].title.trim(), `${locale} ${route} needs a title`);
      assert.ok(seoMetadata[locale][route].description.trim(), `${locale} ${route} needs a description`);
    }
  }
  assert.match(seo, /ua: "uk_UA", en: "en_US", de: "de_DE"/);
  assert.match(app, /meta\[property="og:locale"\]/);
});

test("keeps concept copy localized and free of Russian interface text", () => {
  const russianInterfaceWords = /\b(?:изображение|изображения|задача|задачи|задачу|посмотреть|отправить|выбрать|сравнить|наличие|мощность|установка|предыдущий|следующий|закрыть|открыть)\b/iu;
  assert.doesNotMatch(`${workConceptsSource}${work}${catalogue}${intake}${team}${seo}`, russianInterfaceWords);
  for (const concept of workConcepts) {
    for (const field of [concept.description, concept.tag]) {
      assert.equal(typeof field, "object", `${concept.id} needs localized concept copy`);
      for (const locale of ["ua", "en", "de"]) assert.ok(field[locale], `${concept.id} needs ${locale} copy`);
    }
    for (const image of concept.images || []) {
      assert.equal(typeof image.label, "object", `${concept.id} image labels must be localized`);
      for (const locale of ["ua", "en", "de"]) assert.ok(image.label[locale], `${concept.id} image needs a ${locale} label`);
    }
  }
});

test("builds GitHub Pages at the custom-domain root", () => {
  assert.match(pagesWorkflow, /VITE_BASE_PATH:\s*\//);
  assert.match(pagesWorkflow, /VITE_SITE_URL:\s*https:\/\/iplusgor\.com/);
  assert.match(pagesWorkflow, /npm run verify:pages/);
  assert.doesNotMatch(pagesWorkflow, /BASE_PATH="\/\$REPO_NAME\/"/);
  assert.equal(cname, "iplusgor.com");
});
