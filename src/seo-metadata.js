export const siteOrigin = "https://iplusgor.com";
export const siteName = "iPLUSgor Digital";

export const seoMetadata = {
  ua: {
    "/": {
      title: "Створення сайтів для бізнесу | iPLUSgor Digital",
      description: "iPLUSgor Digital створює сучасні адаптивні сайти для локального бізнесу в Україні: структура, дизайн, frontend, домен і публікація.",
    },
    "/approach": {
      title: "Як ми створюємо сайти | iPLUSgor Digital",
      description: "Шість зрозумілих етапів створення сайту: від першої розмови й структури до адаптивної розробки, домену та публікації.",
    },
    "/solutions": {
      title: "Рішення для бізнес-сайтів | iPLUSgor Digital",
      description: "Структура сайту, контент, шлях клієнта, корисна інформація, аналітика та frontend у єдиній системі для локального бізнесу.",
    },
    "/solutions/catalogue": {
      title: "Приклад каталогу товарів | iPLUSgor Digital",
      description: "Інтерактивний приклад того, як категорії, фільтри, порівняння та технічна інформація допомагають клієнту вибрати товар.",
    },
    "/work": {
      title: "Концепти сайтів і вибрані роботи | iPLUSgor Digital",
      description: "Самостійні концепти сайтів iPLUSgor Digital для локального бізнесу, e-commerce та персональних сторінок. Кожен концепт позначений чесно.",
    },
    "/team": {
      title: "Команда вебдизайну та frontend | iPLUSgor Digital",
      description: "Незалежна українська команда iPLUSgor Digital створює зрозумілі адаптивні сайти й супроводжує проєкт від задачі до запуску.",
    },
    "/start-project": {
      title: "Розрахувати сайт для бізнесу | iPLUSgor Digital",
      description: "Розкажіть про бізнес і задачу. iPLUSgor Digital допоможе визначити структуру, обсяг, термін і наступний крок створення сайту.",
    },
  },
  en: {
    "/": {
      title: "Business website design and development | iPLUSgor Digital",
      description: "iPLUSgor Digital creates clear, responsive websites for local businesses: structure, design, frontend, domain connection and launch.",
    },
    "/approach": {
      title: "How we build business websites | iPLUSgor Digital",
      description: "A clear six-stage website process from the first conversation and structure to responsive development, domain connection and launch.",
    },
    "/solutions": {
      title: "Business website solutions | iPLUSgor Digital",
      description: "Website structure, content, customer journeys, useful information, analytics and frontend delivered as one connected system.",
    },
    "/solutions/catalogue": {
      title: "Product catalogue interface example | iPLUSgor Digital",
      description: "An interactive example of how categories, filters, comparison and technical information can make product selection easier.",
    },
    "/work": {
      title: "Website concepts and selected work | iPLUSgor Digital",
      description: "Self-initiated website concepts for local business, e-commerce and personal pages, clearly labelled and presented by iPLUSgor Digital.",
    },
    "/team": {
      title: "Web design and frontend team | iPLUSgor Digital",
      description: "Meet the independent Ukrainian iPLUSgor Digital team and see how a business website moves from the first task to launch.",
    },
    "/start-project": {
      title: "Estimate a business website | iPLUSgor Digital",
      description: "Tell us about your business and goal. iPLUSgor Digital will help define the website scope, timeline and practical next step.",
    },
  },
  de: {
    "/": {
      title: "Websites für lokale Unternehmen | iPLUSgor Digital",
      description: "iPLUSgor Digital entwickelt klare responsive Websites für lokale Unternehmen: Struktur, Design, Frontend, Domain-Anbindung und Veröffentlichung.",
    },
    "/approach": {
      title: "So entwickeln wir Websites | iPLUSgor Digital",
      description: "Sechs klare Schritte von der ersten Besprechung und Struktur bis zur responsiven Entwicklung, Domain-Anbindung und Veröffentlichung.",
    },
    "/solutions": {
      title: "Website-Lösungen für Unternehmen | iPLUSgor Digital",
      description: "Website-Struktur, Inhalte, Kundenwege, nützliche Informationen, Analyse und Frontend als ein zusammenhängendes System.",
    },
    "/solutions/catalogue": {
      title: "Beispiel für einen Produktkatalog | iPLUSgor Digital",
      description: "Ein interaktives Beispiel dafür, wie Kategorien, Filter, Vergleiche und technische Informationen die Produktauswahl erleichtern.",
    },
    "/work": {
      title: "Website-Konzepte und ausgewählte Arbeiten | iPLUSgor Digital",
      description: "Eigenständige Website-Konzepte für lokale Unternehmen, E-Commerce und persönliche Seiten, klar gekennzeichnet von iPLUSgor Digital.",
    },
    "/team": {
      title: "Webdesign- und Frontend-Team | iPLUSgor Digital",
      description: "Lernen Sie das unabhängige ukrainische Team von iPLUSgor Digital und den Weg einer Website von der Aufgabe bis zum Start kennen.",
    },
    "/start-project": {
      title: "Business-Website kalkulieren | iPLUSgor Digital",
      description: "Beschreiben Sie Ihr Unternehmen und Ihr Ziel. iPLUSgor Digital hilft, Umfang, Zeitplan und den nächsten Schritt festzulegen.",
    },
  },
};

export function getSeoMetadata(pathname, locale = "ua") {
  const localized = seoMetadata[locale] || seoMetadata.ua;
  return localized[pathname] || localized["/"];
}
