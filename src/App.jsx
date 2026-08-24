import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { LocaleProvider, useLocale } from "./i18n.jsx";
import {
  getBaseRoute,
  getLocalizedPath,
  getSeoMetadata,
  localeOpenGraphCodes,
  siteOrigin,
} from "./seo-metadata.js";

const ApproachPage = lazy(() => import("./pages/ApproachPage.jsx").then((module) => ({ default: module.ApproachPage })));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage.jsx").then((module) => ({ default: module.SolutionsPage })));
const CataloguePage = lazy(() => import("./pages/CataloguePage.jsx").then((module) => ({ default: module.CataloguePage })));
const WorkPage = lazy(() => import("./pages/WorkPage.jsx").then((module) => ({ default: module.WorkPage })));
const TeamPage = lazy(() => import("./pages/TeamPage.jsx").then((module) => ({ default: module.TeamPage })));
const StartProjectPage = lazy(() => import("./pages/StartProjectPage.jsx").then((module) => ({ default: module.StartProjectPage })));

const publicPages = [
  ["approach", ApproachPage],
  ["solutions", SolutionsPage],
  ["solutions/catalogue", CataloguePage],
  ["work", WorkPage],
  ["team", TeamPage],
  ["start-project", StartProjectPage],
];

function LazyRoute({ component: PageComponent }) {
  return (
    <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page"><span /></div>}>
      <PageComponent />
    </Suspense>
  );
}

function LocalizedRoutes({ prefix = "" }) {
  const routePrefix = prefix ? `${prefix}/` : "";
  return (
    <Route element={<SiteLayout />}>
      <Route path={prefix || "/"} element={<HomePage />} />
      {publicPages.map(([path, PageComponent]) => (
        <Route
          key={`${prefix}-${path}`}
          path={`${routePrefix}${path}`}
          element={<LazyRoute component={PageComponent} />}
        />
      ))}
      <Route path={`${routePrefix}work/aton`} element={<Navigate to={`${prefix ? `/${prefix}` : ""}/work`} replace />} />
    </Route>
  );
}

function RouteMetadata() {
  const location = useLocation();
  const { locale } = useLocale();

  useLayoutEffect(() => {
    const resetScroll = () => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      root.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousScrollBehavior;
    };

    window.history.scrollRestoration = "manual";
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  useEffect(() => {
    const baseRoute = getBaseRoute(location.pathname);
    const page = getSeoMetadata(baseRoute, locale);
    const openGraphLocale = localeOpenGraphCodes[locale] || "uk_UA";
    const baseUrl = (import.meta.env.VITE_SITE_URL || (window.location.hostname === "iplusgor.com" ? window.location.origin : siteOrigin)).replace(/\/$/, "");
    const canonicalUrl = `${baseUrl}${getLocalizedPath(baseRoute, locale)}`;
    document.title = page.title;
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    document.querySelector('meta[name="robots"]')?.setAttribute(
      "content",
      page.robots || "index, follow, max-image-preview:large",
    );
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", page.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", page.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", canonicalUrl);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", openGraphLocale);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", page.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", page.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
      const hreflang = link.getAttribute("hreflang");
      const alternateLocale = hreflang === "uk" || hreflang === "x-default" ? "ua" : hreflang;
      link.setAttribute("href", `${baseUrl}${getLocalizedPath(baseRoute, alternateLocale)}`);
    });
  }, [locale, location.pathname]);

  return null;
}

export function App() {
  const basename = import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <LocaleProvider>
      <BrowserRouter basename={basename}>
        <RouteMetadata />
        <Routes>
          {LocalizedRoutes({ prefix: "" })}
          {LocalizedRoutes({ prefix: "en" })}
          {LocalizedRoutes({ prefix: "de" })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
