import { createContext, use, useEffect, useMemo, useState } from "react";
import { getBaseRoute, getLocaleFromPath, getLocalizedPath } from "./seo-metadata.js";

const LocaleContext = createContext(null);
const STORAGE_KEY = "iplusgor-locale";
const supported = ["ua", "en", "de"];

function detectLocale() {
  return getLocaleFromPath(window.location.pathname);
}

export function LocaleProvider({ children, initialLocale }) {
  const [locale, setLocaleState] = useState(initialLocale ?? detectLocale);

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
