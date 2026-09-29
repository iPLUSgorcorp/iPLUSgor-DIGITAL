import { serviceDepth } from './content/service-depth.js';
import { getBaseRoute, getLocalizedPath, getSeoMetadata, localeHtmlCodes, siteOrigin } from './seo-metadata.js';

export function getStructuredData(path, locale = 'ua') {
  const route = getBaseRoute(path);
  const metadata = getSeoMetadata(route, locale);
  const url = `${siteOrigin}${getLocalizedPath(route, locale)}`;
  const orgId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;
  const servicesUrl = `${siteOrigin}${getLocalizedPath('/services', locale)}`;
  const services = serviceDepth[locale].items.map((item) => ({
    '@type': 'Service', '@id': `${servicesUrl}#${item.id}`,
    name: item.title, serviceType: item.title, description: item.build,
    url: `${servicesUrl}#${item.id}`, provider: { '@id': orgId },
  }));
  const includeServices = route === '/' || route === '/services';
  const graph = [
    { '@type': 'Organization', '@id': orgId, name: 'I+Gor', alternateName: 'iPLUSgor Digital', url: `${siteOrigin}/`, email: 'hello@iplusgor.com', logo: { '@type': 'ImageObject', url: `${siteOrigin}/assets/brand/iplusgor-logo-dark.png`, width: 960, height: 239 }, description: getSeoMetadata('/', locale).description, contactPoint: { '@type': 'ContactPoint', contactType: 'Project inquiries', email: 'hello@iplusgor.com', availableLanguage: ['Ukrainian', 'English', 'German'] } },
    { '@type': 'WebSite', '@id': websiteId, url: `${siteOrigin}/`, name: 'I+Gor', inLanguage: ['uk', 'en', 'de'], publisher: { '@id': orgId } },
    { '@type': route === '/about' ? 'AboutPage' : route === '/start-project' ? 'ContactPage' : 'WebPage', '@id': `${url}#webpage`, url, name: metadata.title, description: metadata.description, inLanguage: localeHtmlCodes[locale], isPartOf: { '@id': websiteId }, about: includeServices ? services.map((service) => ({ '@id': service['@id'] })) : { '@id': orgId }, ...(route !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}) },
    ...(includeServices ? services : []),
  ];
  if (route !== '/') graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'I+Gor', item: `${siteOrigin}${getLocalizedPath('/', locale)}` },
    { '@type': 'ListItem', position: 2, name: { en: { '/services': 'Services', '/about': 'About', '/start-project': 'Start project' }, ua: { '/services': 'Послуги', '/about': 'Про нас', '/start-project': 'Почати проєкт' }, de: { '/services': 'Leistungen', '/about': 'Über uns', '/start-project': 'Projekt starten' } }[locale][route], item: url },
  ] });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const serializeStructuredData = (data) => JSON.stringify(data).replaceAll('<', '\\u003c');
