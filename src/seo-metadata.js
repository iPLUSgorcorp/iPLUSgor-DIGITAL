export const siteOrigin = "https://iplusgor.com";
export const siteName = "I+Gor";
export const localePathPrefixes = { ua: "", en: "/en", de: "/de" };
export const localeHtmlCodes = { ua: "uk", en: "en", de: "de" };
export const localeOpenGraphCodes = { ua: "uk_UA", en: "en_US", de: "de_DE" };
export const legacyRedirects = {
  "/approach": "/", "/solutions": "/services", "/solutions/catalogue": "/services",
  "/work": "/services", "/work/aton": "/services", "/team": "/about",
};

export function getLocaleFromPath(pathname = "/") {
  const normalized = `/${String(pathname).replace(/^\/+|\/+$/g, "")}`;
  if (normalized === "/en" || normalized.startsWith("/en/")) return "en";
  if (normalized === "/de" || normalized.startsWith("/de/")) return "de";
  return "ua";
}

export function getBaseRoute(pathname = "/") {
  const normalized = `/${String(pathname).replace(/^\/+|\/+$/g, "")}`;
  const withoutLocale = normalized.replace(/^\/(?:en|de)(?=\/|$)/, "");
  return withoutLocale || "/";
}

export function getLocalizedPath(pathname = "/", locale = "ua") {
  const route = getBaseRoute(pathname);
  const prefix = localePathPrefixes[locale] ?? "";
  if (route === "/") return prefix ? `${prefix}/` : "/";
  return `${prefix}${route}/`;
}

export const seoMetadata = {
  en: {
    "/": { title: "Digital implementation for business bottlenecks | I+Gor", description: "I+Gor finds costly gaps in lead flow and operations, then builds conversion systems, automation, integrations and software to remove them." },
    "/services": { title: "Conversion, automation and custom systems | I+Gor", description: "Explore I+Gor's four capabilities: conversion systems, AI and business automation, custom tools and integrations, and focused diagnostics." },
    "/about": { title: "About I+Gor | A digital implementation partner", description: "I+Gor turns unclear commercial and operational problems into scoped, working digital systems with direct responsibility from diagnosis to deployment." },
    "/start-project": { title: "Show us the bottleneck | Start a project with I+Gor", description: "Describe the bottleneck, desired outcome, tools and project scale. Start asynchronously; I+Gor will reply with the next useful step." },
  },
  ua: {
    "/": { title: "Цифрові системи для вузьких місць бізнесу | I+Gor", description: "I+Gor знаходить втрати у заявках і процесах та створює конверсійні системи, автоматизацію, інтеграції й ПЗ, що усуває вузьке місце." },
    "/services": { title: "Конверсія, автоматизація та власні системи | I+Gor", description: "Чотири напрями I+Gor: конверсійні системи, ШІ та бізнес-автоматизація, власні інструменти й інтеграції, діагностика." },
    "/about": { title: "Про I+Gor | Партнер із цифрової реалізації", description: "I+Gor перетворює нечіткі комерційні й операційні проблеми на робочі цифрові системи з визначеним обсягом." },
    "/start-project": { title: "Покажіть вузьке місце | Почати проєкт з I+Gor", description: "Опишіть проблему, бажаний результат, інструменти й орієнтовний обсяг проєкту. Почніть письмово, без обов’язкового дзвінка." },
  },
  de: {
    "/": { title: "Digitale Umsetzung für geschäftliche Engpässe | I+Gor", description: "I+Gor findet teure Lücken in Kundenwegen und Abläufen und baut Conversion-Systeme, Automatisierungen, Integrationen und Software dagegen." },
    "/services": { title: "Conversion, Automatisierung und individuelle Systeme | I+Gor", description: "Vier Leistungen von I+Gor: Conversion-Systeme, KI und Geschäftsautomatisierung, individuelle Tools und Integrationen sowie fokussierte Diagnosen." },
    "/about": { title: "Über I+Gor | Partner für digitale Umsetzung", description: "I+Gor macht aus unklaren geschäftlichen und operativen Problemen funktionierende digitale Systeme mit definiertem Umfang." },
    "/start-project": { title: "Engpass beschreiben | Projekt mit I+Gor starten", description: "Beschreiben Sie Engpass, Ziel, bestehende Tools und Projektgröße. Starten Sie schriftlich und ohne Pflichttermin." },
  },
};

export function getSeoMetadata(pathname, locale = "ua") {
  const localized = seoMetadata[locale] || seoMetadata.ua;
  const route = getBaseRoute(pathname);
  if (legacyRedirects[route]) return localized[legacyRedirects[route]];
  return localized[route] || { title: `404 | ${siteName}`, description: "I+Gor", robots: "noindex, follow" };
}
