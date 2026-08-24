import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getBaseRoute, getLocaleFromPath, getLocalizedPath } from "./seo-metadata.js";

const LocaleContext = createContext(null);
const STORAGE_KEY = "iplusgor-locale";
const supported = ["ua", "en", "de"];

function detectLocale() {
  const pathLocale = getLocaleFromPath(window.location.pathname);
  if (pathLocale !== "ua") return pathLocale;
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
    navigation: { approach: "Approach", solutions: "Services", work: "Work", team: "Team", start: "Request a review", review: "Conversion review", menuOpen: "Open navigation menu", menuClose: "Close navigation menu", primary: "Primary navigation", mobile: "Mobile navigation", footer: "Footer navigation", skip: "Skip to main content" },
    shared: { review: "Request a conversion review", premium: "Focused scope — fast execution — launch ownership", practice: "iPLUSgor builds conversion-focused websites and landing pages for service businesses already acquiring customers.", language: "Language", themeDark: "Use dark theme", themeLight: "Use light theme", darkMode: "Dark mode", lightMode: "Light mode", home: "iPLUSgor Digital home" },
  },
  ua: {
    navigation: { approach: "Підхід", solutions: "Послуги", work: "Роботи", team: "Команда", start: "Запросити розбір", review: "Conversion review", menuOpen: "Відкрити меню навігації", menuClose: "Закрити меню навігації", primary: "Основна навігація", mobile: "Мобільна навігація", footer: "Навігація у футері", skip: "Перейти до основного вмісту" },
    shared: { review: "Запросити conversion review", premium: "Сфокусований обсяг — швидка реалізація — відповідальність за запуск", practice: "iPLUSgor створює conversion-focused сайти й landing pages для сервісних бізнесів, які вже залучають клієнтів.", language: "Мова", themeDark: "Увімкнути темну тему", themeLight: "Увімкнути світлу тему", darkMode: "Темна тема", lightMode: "Світла тема", home: "Головна iPLUSgor Digital" },
  },
  de: {
    navigation: { approach: "Ansatz", solutions: "Leistungen", work: "Arbeiten", team: "Team", start: "Review anfragen", review: "Conversion-Review", menuOpen: "Navigationsmenü öffnen", menuClose: "Navigationsmenü schließen", primary: "Hauptnavigation", mobile: "Mobile Navigation", footer: "Fußnavigation", skip: "Zum Hauptinhalt springen" },
    shared: { review: "Conversion-Review anfragen", premium: "Fokussierter Umfang — schnelle Umsetzung — Launch-Verantwortung", practice: "iPLUSgor entwickelt conversion-orientierte Websites und Landingpages für Dienstleistungsunternehmen mit aktiver Kundengewinnung.", language: "Sprache", themeDark: "Dunkles Design verwenden", themeLight: "Helles Design verwenden", darkMode: "Dunkles Design", lightMode: "Helles Design", home: "Startseite von iPLUSgor Digital" },
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

    if (getLocaleFromPath(window.location.pathname) !== locale) {
      const nextPath = getLocalizedPath(getBaseRoute(window.location.pathname), locale);
      window.history.replaceState({}, "", `${nextPath}${window.location.search}${window.location.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale(next) {
      if (!supported.includes(next) || next === locale) return;
      const nextPath = getLocalizedPath(getBaseRoute(window.location.pathname), next);
      window.history.pushState({}, "", `${nextPath}${window.location.search}${window.location.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      setLocaleState(next);
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
