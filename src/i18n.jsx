import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LocaleContext = createContext(null);
const STORAGE_KEY = "iplusgor-locale";
const supported = ["ua", "en", "de"];

function detectLocale() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (supported.includes(stored)) return stored;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const code = String(language || "").toLowerCase();
    if (code.startsWith("uk")) return "ua";
    if (code.startsWith("de")) return "de";
    if (code.startsWith("en")) return "en";
  }
  return "ua";
}

const messages = {
  en: {
    navigation: { approach: "Approach", solutions: "Solutions", work: "Work", team: "Team", start: "Start a project", review: "Preliminary review", menuOpen: "Open navigation menu", menuClose: "Close navigation menu", primary: "Primary navigation", mobile: "Mobile navigation", footer: "Footer navigation", skip: "Skip to main content" },
    shared: { review: "Get a preliminary review", premium: "Selective industrial platform engagements", practice: "iPLUSgor Digital is the website and digital-platform division of the independent Ukrainian iPLUSgor design company.", creative: "iPLUSgor Creative on Instagram" },
  },
  ua: {
    navigation: { approach: "Підхід", solutions: "Рішення", work: "Роботи", team: "Команда", start: "Почати проєкт", review: "Попередній розбір", menuOpen: "Відкрити меню навігації", menuClose: "Закрити меню навігації", primary: "Основна навігація", mobile: "Мобільна навігація", footer: "Навігація у футері", skip: "Перейти до основного вмісту" },
    shared: { review: "Отримати попередній розбір", premium: "Вибіркові проєкти промислових платформ", practice: "iPLUSgor Digital — напрям сайтів і цифрових платформ незалежної української дизайн-компанії iPLUSgor.", creative: "iPLUSgor Creative в Instagram" },
  },
  de: {
    navigation: { approach: "Ansatz", solutions: "Lösungen", work: "Arbeiten", team: "Team", start: "Projekt starten", review: "Vorprüfung", menuOpen: "Navigationsmenü öffnen", menuClose: "Navigationsmenü schließen", primary: "Hauptnavigation", mobile: "Mobile Navigation", footer: "Fußnavigation", skip: "Zum Hauptinhalt springen" },
    shared: { review: "Vorprüfung anfragen", premium: "Ausgewählte Projekte für industrielle Plattformen", practice: "iPLUSgor Digital ist der Bereich für Websites und digitale Plattformen des unabhängigen ukrainischen Designunternehmens iPLUSgor.", creative: "iPLUSgor Creative auf Instagram" },
  },
};

function getNested(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale(next) {
      if (supported.includes(next)) setLocaleState(next);
    },
    t(key) {
      return getNested(messages[locale], key) ?? getNested(messages.en, key) ?? key;
    },
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
