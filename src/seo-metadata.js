export const siteOrigin = "https://iplusgor.com";
export const siteName = "iPLUSgor Digital";
export const localePathPrefixes = { ua: "", en: "/en", de: "/de" };
export const localeHtmlCodes = { ua: "uk", en: "en", de: "de" };
export const localeOpenGraphCodes = { ua: "uk_UA", en: "en_US", de: "de_DE" };

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
  ua: {
    "/": {
      title: "Розробка сайтів і лендингів для бізнесу | iPLUSgor",
      description: "Створення конверсійних сайтів і лендингів для сервісного бізнесу з Google Ads або Meta Ads: офер, довіра, CTA, форми та швидкий frontend.",
    },
    "/approach": {
      title: "Conversion Website Sprint: процес роботи | iPLUSgor",
      description: "Від розбору трафіку й оферу до дизайну, frontend, аналітики та запуску. Фіксований процес без зайвих передач між підрядниками.",
    },
    "/solutions": {
      title: "Рішення для конверсії платного трафіку | iPLUSgor",
      description: "Система сайту для сервісного бізнесу: контекст реклами, ясний офер, докази, мобільний UX, CTA, збір звернень і аналітика.",
    },
    "/solutions/catalogue": {
      title: "Демонстрація складного інтерфейсу | iPLUSgor",
      description: "Другорядний демонстраційний приклад фільтрів, порівняння та технічної інформації. Дані не належать реальному клієнту.",
      robots: "noindex, follow",
    },
    "/work": {
      title: "Концепти сайтів і дизайн-докази | iPLUSgor",
      description: "Самостійні концепти iPLUSgor Digital, що показують структуру, UX і responsive frontend. Концепти не видаються за клієнтські результати.",
    },
    "/team": {
      title: "Команда conversion web design | iPLUSgor Digital",
      description: "Незалежна українська команда стратегії, UX/UI та frontend. Створюємо конверсійні сайти для сервісних компаній із наявним трафіком.",
    },
    "/start-project": {
      title: "Запросити конверсійний розбір сайту | iPLUSgor",
      description: "Покажіть сайт, головну послугу й джерело трафіку. Отримайте предметну розмову про Landing Sprint, Website Sprint або custom scope.",
    },
  },
  en: {
    "/": {
      title: "Conversion website design for service businesses | iPLUSgor",
      description: "Conversion landing pages and commercial websites for service businesses running Google Ads or Meta Ads: clear offers, trust, CTA, forms and fast frontend.",
    },
    "/approach": {
      title: "Conversion Website Sprint process | iPLUSgor Digital",
      description: "From traffic and offer review to design, frontend, analytics and launch. One fixed sprint process without unnecessary agency handoffs.",
    },
    "/solutions": {
      title: "Paid traffic conversion website system | iPLUSgor",
      description: "A service-business website system connecting campaign intent, offer clarity, proof, mobile UX, CTA hierarchy, lead capture and analytics.",
    },
    "/solutions/catalogue": {
      title: "Complex interface demonstration | iPLUSgor Digital",
      description: "A secondary interface example showing filters, comparison and technical information. All visible product data is demonstrative, not client data.",
      robots: "noindex, follow",
    },
    "/work": {
      title: "Website concepts and design evidence | iPLUSgor Digital",
      description: "Self-initiated concepts showing structure, UX and responsive frontend execution. Concepts are labelled honestly and are not presented as client results.",
    },
    "/team": {
      title: "Conversion web design team | iPLUSgor Digital",
      description: "An independent Ukrainian strategy, UX/UI and frontend team building conversion-focused websites for service businesses with existing traffic.",
    },
    "/start-project": {
      title: "Request a website conversion review | iPLUSgor Digital",
      description: "Share your website, primary service and traffic source. Start a focused conversation about a Landing Sprint, Website Sprint or custom scope.",
    },
  },
  de: {
    "/": {
      title: "Webdesign und Landingpages für Dienstleister | iPLUSgor",
      description: "Conversion-Websites und Landingpages für Dienstleister mit Google Ads oder Meta Ads: klares Angebot, Vertrauen, CTA, Formulare und schnelles Frontend.",
    },
    "/approach": {
      title: "Conversion Website Sprint: Ablauf | iPLUSgor Digital",
      description: "Von Traffic- und Angebotsprüfung bis Design, Frontend, Analyse und Launch. Ein fester Sprint ohne unnötige Übergaben zwischen Dienstleistern.",
    },
    "/solutions": {
      title: "Website-System für Paid-Traffic-Conversion | iPLUSgor",
      description: "Ein System für Dienstleister: Kampagnenkontext, klares Angebot, Belege, Mobile UX, CTA-Hierarchie, Lead-Erfassung und Analyse.",
    },
    "/solutions/catalogue": {
      title: "Demonstration einer komplexen Oberfläche | iPLUSgor",
      description: "Ein sekundäres Interface-Beispiel mit Filtern, Vergleich und technischen Informationen. Alle Produktdaten sind Demo-, keine Kundendaten.",
      robots: "noindex, follow",
    },
    "/work": {
      title: "Website-Konzepte und Design-Nachweise | iPLUSgor",
      description: "Eigenständige Konzepte für Struktur, UX und responsives Frontend. Sie sind klar gekennzeichnet und werden nicht als Kundenergebnisse dargestellt.",
    },
    "/team": {
      title: "Team für Conversion-Webdesign | iPLUSgor Digital",
      description: "Ein unabhängiges ukrainisches Team für Strategie, UX/UI und Frontend baut Conversion-Websites für Dienstleister mit vorhandenem Traffic.",
    },
    "/start-project": {
      title: "Website-Conversion-Review anfragen | iPLUSgor Digital",
      description: "Teilen Sie Website, wichtigste Leistung und Traffic-Quelle. Starten Sie ein fokussiertes Gespräch über Landing-, Website- oder Custom-Scope.",
    },
  },
};

export function getSeoMetadata(pathname, locale = "ua") {
  const localized = seoMetadata[locale] || seoMetadata.ua;
  return localized[getBaseRoute(pathname)] || localized["/"];
}
