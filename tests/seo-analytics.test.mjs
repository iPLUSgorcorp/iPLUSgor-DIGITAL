import assert from 'node:assert/strict';
import test from 'node:test';
import { getStructuredData } from '../src/structured-data.js';
import { seoMetadata, getLocalizedPath, siteOrigin, localeHtmlCodes } from '../src/seo-metadata.js';

test('localized structured data describes real pages and all four services', () => {
  for (const locale of ['ua', 'en', 'de']) {
    const titles = new Set();
    for (const route of Object.keys(seoMetadata[locale])) {
      titles.add(seoMetadata[locale][route].title);
      const graph = getStructuredData(route, locale)['@graph'];
      const url = `${siteOrigin}${getLocalizedPath(route, locale)}`;
      const page = graph.find((node) => node['@id'] === `${url}#webpage`);
      assert.equal(page.url, url);
      assert.equal(page.inLanguage, localeHtmlCodes[locale]);
      assert.equal(graph.filter((node) => node['@type'] === 'Service').length, ['/', '/services'].includes(route) ? 4 : 0);
      assert.equal(new Set(graph.map((node) => node['@id'])).size, graph.length);
      assert.equal(graph.find((node) => node['@type'] === 'Organization').email, 'hello@iplusgor.com');
      assert.equal(graph.some((node) => node.aggregateRating || node.address || node.review), false);
      if (route !== '/') assert.equal(graph.find((node) => node['@type'] === 'BreadcrumbList').itemListElement[1].item, url);
    }
    assert.equal(titles.size, 4);
  }
});

function environment(hostname) {
  const storage = new Map();
  const scripts = [];
  globalThis.window = { location: { hostname, origin: `https://${hostname}`, pathname: '/en/' }, localStorage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) }, dispatchEvent() {} };
  globalThis.document = { title: 'I+Gor', createElement: () => ({}), head: { append: (node) => scripts.push(node) }, cookie: '' };
  return { storage, scripts };
}

test('GA4 requires consent, loads once and excludes inquiry data', async () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  try {
    const { scripts } = environment('iplusgor.com');
    const analytics = await import('../src/lib/analytics.js?production-test');
    analytics.initializeAnalytics();
    assert.equal(scripts.length, 0);
    analytics.setAnalyticsConsent('accepted');
    analytics.initializeAnalytics();
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].async, true);
    assert.match(scripts[0].src, /id=G-NXQSRS6NSX$/);
    analytics.trackEvent('form_handoff', { locale: 'en', method: 'mailto', email: 'private@example.com', problem: 'Confidential brief' });
    const event = Array.from(window.dataLayer.at(-1));
    assert.deepEqual(event, ['event', 'form_handoff', { locale: 'en', method: 'mailto' }]);
    window.location.pathname = '/en/services/';
    analytics.updateAnalyticsPage();
    assert.equal(window.dataLayer.at(-2)[2].update, true);
    assert.deepEqual(Array.from(window.dataLayer.at(-1)), ['event', 'page_view', { page_title: 'I+Gor', page_location: 'https://iplusgor.com/en/services/', page_referrer: 'https://iplusgor.com/en/' }]);
    analytics.updateAnalyticsPage();
    assert.equal(window.dataLayer.filter((item) => item[0] === 'event' && item[1] === 'page_view').length, 1);
    analytics.setAnalyticsConsent('declined');
    assert.equal(window['ga-disable-G-NXQSRS6NSX'], true);
    const count = window.dataLayer.length;
    analytics.trackEvent('form_handoff', { locale: 'en' });
    assert.equal(window.dataLayer.length, count);
  } finally { globalThis.window = originalWindow; globalThis.document = originalDocument; }
});

test('local preview never sends production analytics', async () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  try {
    const { scripts } = environment('localhost');
    const analytics = await import('../src/lib/analytics.js?preview-test');
    analytics.setAnalyticsConsent('accepted');
    assert.equal(scripts.length, 0);
  } finally { globalThis.window = originalWindow; globalThis.document = originalDocument; }
});
