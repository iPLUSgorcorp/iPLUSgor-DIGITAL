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

const metadata = {
  "/": {
    title: "iPLUSgor Digital — Industrial website modernization",
    description:
      "iPLUSgor Digital is the website and digital-platform division of iPLUSgor, modernizing industrial websites for product selection, sales and dealer workflows.",
  },
  "/approach": {
    title: "Approach — iPLUSgor Digital",
    description:
      "A six-stage modernization process for industrial platform structure, catalogue UX and frontend delivery.",
  },
  "/solutions": {
    title: "Solutions — iPLUSgor Digital",
    description:
      "One connected platform system for architecture, catalogue, product finding, technical content and dealer routes.",
  },
  "/solutions/catalogue": {
    title: "Catalogue demo — iPLUSgor Digital",
    description:
      "An interface example showing how clear filters, comparison and technical evidence can shorten industrial product selection.",
  },
  "/work": {
    title: "Selected work and independent concepts — iPLUSgor Digital",
    description:
      "Client work is published only with explicit permission. Explore approved material and clearly labelled independent interface concepts by iPLUSgor Digital.",
  },
  "/team": {
    title: "Team — iPLUSgor Digital",
    description:
      "Meet iPLUSgor Digital, the website and digital-platform division of the independent Ukrainian iPLUSgor design company.",
  },
  "/start-project": {
    title: "Get a preliminary review — iPLUSgor Digital",
    description:
      "Share your current industrial website, catalogue scale and barriers for a focused preliminary diagnosis.",
  },
};

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
    const page = metadata[location.pathname] ?? metadata["/"];
    const baseUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
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
