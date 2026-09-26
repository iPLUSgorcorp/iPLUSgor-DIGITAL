import { createContext, use, useEffect, useMemo, useState } from "react";
import { getBaseRoute, getLocaleFromPath, getLocalizedPath } from "./seo-metadata.js";

const LocaleContext = createContext(null);
const STORAGE_KEY = "iplusgor-locale";
const supported = ["ua", "en", "de"];

function detectLocale() {
  const pathLocale = getLocaleFromPath(window.location.pathname);
  if (pathLocale !== "ua") return pathLocale;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (supported.includes(stored)) return stored;
  } catch { /* Language detection remains available. */ }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const code = String(language || "").toLowerCase();
    if (code.startsWith("uk")) return "ua";
    if (code.startsWith("de")) return "de";
    if (code.startsWith("en")) return "en";
  }
  return "ua";
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    try { window.localStorage.setItem(STORAGE_KEY, locale); } catch { /* Keep current-session selection. */ }
    if (getLocaleFromPath(window.location.pathname) !== locale) {
      const nextPath = getLocalizedPath(getBaseRoute(window.location.pathname), locale);
      window.history.replaceState({}, "", `${nextPath}${window.location.search}${window.location.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [locale]);

  useEffect(() => {
    const sync = () => {
      const next = getLocaleFromPath(window.location.pathname);
      setLocaleState(next);
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const value = useMemo(() => ({
    locale,
    setLocale(next) {
      if (!supported.includes(next) || next === locale) return;
      const nextPath = getLocalizedPath(getBaseRoute(window.location.pathname), next);
      window.history.pushState({}, "", `${nextPath}${window.location.search}${window.location.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      setLocaleState(next);
    },
  }), [locale]);
  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale() {
  const value = use(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
