import { renderToString } from "react-dom/server";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { LocaleProvider } from "./i18n.jsx";
import { SiteLayout } from "./components/SiteLayout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { StartProjectPage } from "./pages/StartProjectPage.jsx";
import { getBaseRoute } from "./seo-metadata.js";

const pages = { "/": HomePage, "/services": ServicesPage, "/about": AboutPage, "/start-project": StartProjectPage };

export function renderPage(path, locale) {
  const Page = pages[getBaseRoute(path)];
  if (!Page) throw new Error(`No static page for ${path}`);
  return renderToString(<LocaleProvider initialLocale={locale}><StaticRouter location={path}>
    <Routes><Route element={<SiteLayout />}><Route path="*" element={<Page />} /></Route></Routes>
  </StaticRouter></LocaleProvider>);
}
