import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ApproachPage } from "./pages/ApproachPage.jsx";
import { SolutionsPage } from "./pages/SolutionsPage.jsx";
import { CataloguePage } from "./pages/CataloguePage.jsx";
import { WorkPage } from "./pages/WorkPage.jsx";
import { TeamPage } from "./pages/TeamPage.jsx";
import { StartProjectPage } from "./pages/StartProjectPage.jsx";
import { useEffect, useLayoutEffect } from "react";
import { LocaleProvider, useLocale } from "./i18n.jsx";
import { getSeoMetadata, siteOrigin } from "./seo-metadata.js";

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
    const page = getSeoMetadata(location.pathname, locale);
    const baseUrl = (import.meta.env.VITE_SITE_URL || (window.location.hostname === "iplusgor.com" ? window.location.origin : siteOrigin)).replace(/\/$/, "");
    const canonicalUrl = `${baseUrl}${location.pathname === "/" ? "/" : location.pathname}`;
    document.title = page.title;
    document.documentElement.lang = locale === "ua" ? "uk" : locale;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
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
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", page.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", page.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl);
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
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="approach" element={<ApproachPage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="solutions/catalogue" element={<CataloguePage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="work/aton" element={<Navigate to="/work" replace />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="start-project" element={<StartProjectPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
