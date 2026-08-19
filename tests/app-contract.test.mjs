import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const work = await readFile(new URL("../src/pages/WorkPage.jsx", import.meta.url), "utf8");
const catalogue = await readFile(new URL("../src/pages/CataloguePage.jsx", import.meta.url), "utf8");
const intake = await readFile(new URL("../src/pages/StartProjectPage.jsx", import.meta.url), "utf8");
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

test("declares every required public route", () => {
  for (const route of [
    "approach",
    "solutions",
    "solutions/catalogue",
    "work",
    "work/aton",
    "team",
    "start-project",
  ]) {
    assert.match(app, new RegExp(`path="${route.replace("/", "\\/")}"`));
  }
  assert.match(app, /path="work\/aton" element={<Navigate to="\/work" replace \/>}/);
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
  assert.doesNotMatch(`${intake}${layout}${app}`, /€|15,000|PROJECTS FROM/);
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
  assert.match(teamProfileUa, /Модернізуємо поверхню\. Зберігаємо ядро\./);
  assert.match(teamProfileEn, /# About iPLUSgor/);
  assert.match(teamProfileEn, /# Full profile/);
  assert.match(teamProfileEn, /We modernize the surface\. We preserve the core\./);
  assert.match(teamProfileDe, /# Kurz über iPLUSgor/);
  assert.match(teamProfileDe, /# Vollständiges Profil/);
  assert.match(teamProfileDe, /Wir modernisieren die Oberfläche\. Wir bewahren den Kern\./);
});

test("publishes consistent crawlable SEO metadata for the production domain", () => {
  assert.match(indexDocument, /<html lang="uk">/);
  assert.match(indexDocument, /<title>Створення сайтів для бізнесу \| iPLUSgor Digital<\/title>/);
  assert.match(indexDocument, /<link rel="canonical" href="https:\/\/iplusgor\.com\/"/);
  assert.match(indexDocument, /"@type": "WebSite"/);
  assert.match(indexDocument, /"@type": "Organization"/);
  assert.match(indexDocument, /https:\/\/www\.instagram\.com\/iplusgor\//);
  for (const locale of ["ua", "en", "de"]) assert.match(seo, new RegExp(`^  ${locale}:`, "m"));
  for (const route of ["approach", "solutions", "solutions/catalogue", "work", "team", "start-project"]) {
    assert.match(sitemap, new RegExp(`<loc>https://iplusgor\\.com/${route}</loc>`));
  }
  assert.match(robots, /Sitemap: https:\/\/iplusgor\.com\/sitemap\.xml/);
  assert.doesNotMatch(`${seo}${indexDocument}`, /Creative|industrial|manufactur|dealer|equipment/i);
});
