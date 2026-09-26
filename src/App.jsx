import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LocaleProvider, useLocale } from "./i18n.jsx";
import { getBaseRoute, getLocalizedPath, getSeoMetadata, legacyRedirects, localeOpenGraphCodes, siteOrigin } from "./seo-metadata.js";

const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx").then((m) => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx").then((m) => ({ default: m.AboutPage })));
const StartProjectPage = lazy(() => import("./pages/StartProjectPage.jsx").then((m) => ({ default: m.StartProjectPage })));

function RouteMetadata() {
  const { locale } = useLocale();
  const location = useLocation();
  useEffect(() => {
    const route = getBaseRoute(location.pathname);
    const page = getSeoMetadata(route, locale);
    const baseUrl = (import.meta.env.VITE_SITE_URL || (window.location.hostname === "iplusgor.com" ? window.location.origin : siteOrigin)).replace(/\/$/, "");
    const canonicalRoute = legacyRedirects[route] || route;
    const canonicalUrl = `${baseUrl}${getLocalizedPath(canonicalRoute, locale)}`;
    document.title = page.title;
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    for (const [selector, value] of [
      ['meta[name="description"]', page.description], ['meta[name="robots"]', page.robots || "index, follow, max-image-preview:large"],
      ['meta[property="og:title"]', page.title], ['meta[property="og:description"]', page.description], ['meta[property="og:url"]', canonicalUrl],
      ['meta[property="og:locale"]', localeOpenGraphCodes[locale]], ['meta[name="twitter:title"]', page.title], ['meta[name="twitter:description"]', page.description],
      ['link[rel="canonical"]', canonicalUrl],
    ]) document.querySelector(selector)?.setAttribute(selector.startsWith("link") ? "href" : "content", value);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
      const code = link.getAttribute("hreflang");
      const alternate = code === "uk" || code === "x-default" ? "ua" : code;
      link.setAttribute("href", `${baseUrl}${getLocalizedPath(canonicalRoute, alternate)}`);
    });
    if (!location.hash) window.scrollTo(0, 0);
  }, [locale, location.pathname, location.hash]);
  return null;
}

function Lazy({ component: Page }) {
  return <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}><Page /></Suspense>;
}

function NotFoundPage() {
  const { locale } = useLocale();
  const label = { en: "This page is no longer here.", ua: "Цієї сторінки більше немає.", de: "Diese Seite gibt es nicht mehr." }[locale];
  return <section className="container not-found"><h1>404</h1><p>{label}</p><a className="button" href={getLocalizedPath("/", locale)}>I+Gor <span aria-hidden="true">↗</span></a></section>;
}

function LocalizedRoutes({ prefix = "" }) {
  const path = (route) => prefix ? `${prefix}${route === "/" ? "" : route}` : route;
  return <Route element={<SiteLayout />}>
    <Route path={path("/")} element={<HomePage />} />
    <Route path={path("/services")} element={<Lazy component={ServicesPage} />} />
    <Route path={path("/about")} element={<Lazy component={AboutPage} />} />
    <Route path={path("/start-project")} element={<Lazy component={StartProjectPage} />} />
    {Object.entries(legacyRedirects).map(([from, to]) => <Route key={`${prefix}-${from}`} path={path(from)} element={<Navigate to={`${path(to)}${from === "/approach" ? "#method" : ""}`} replace />} />)}
    <Route path={path("/*")} element={<NotFoundPage />} />
  </Route>;
}

export function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <LocaleProvider><BrowserRouter basename={basename}><RouteMetadata /><Routes>
    {LocalizedRoutes({ prefix: "" })}{LocalizedRoutes({ prefix: "/en" })}{LocalizedRoutes({ prefix: "/de" })}
  </Routes></BrowserRouter></LocaleProvider>;
}
