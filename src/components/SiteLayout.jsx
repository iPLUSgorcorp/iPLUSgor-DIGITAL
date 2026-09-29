import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useLocale } from "../i18n.jsx";
import { siteCopy } from "../content/site-copy.js";
import { getLocalizedPath } from "../seo-metadata.js";
import { MagneticLink } from "./MagneticLink.jsx";
import { AnalyticsConsent } from "./AnalyticsConsent.jsx";

const languages = ["ua", "en", "de"];
const brandAsset = (name) => `${import.meta.env.BASE_URL}assets/brand/${name}`;

function BrandMark({ footer = false, label }) {
  return <span className={`brand-mark${footer ? " brand-mark--footer" : ""}`} aria-label={label} role="img">
    <img className="brand-mark__dark" src={brandAsset("iplusgor-logo-dark.png")} width="965" height="268" alt="" decoding="async" />
    <img className="brand-mark__light" src={brandAsset("iplusgor-logo-light.png")} width="965" height="268" alt="" decoding="async" />
  </span>;
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const labels = siteCopy[locale].nav;
  return (
    <div className="language-switcher" role="group" aria-label={labels.language}>
      {languages.map((code) => (
        <button key={code} type="button" lang={code === "ua" ? "uk" : code}
          aria-pressed={locale === code} onClick={() => setLocale(code)}>{code === "ua" ? "UA" : code.toUpperCase()}</button>
      ))}
    </div>
  );
}

export function SiteLayout() {
  const { locale } = useLocale();
  const labels = siteCopy[locale].nav;
  const footer = siteCopy[locale].footer;
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => typeof document === "undefined" ? "light" : document.documentElement.dataset.theme || "light");

  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.hash, locale]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#171716" : "#f8f7f3");
    try { window.localStorage.setItem("iplusgor-theme", theme); } catch { /* session preference remains active */ }
  }, [theme]);
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView();
      mutations.disconnect();
    };
    const mutations = new MutationObserver(scroll);
    mutations.observe(document.getElementById("main-content"), { childList: true, subtree: true });
    const frame = window.requestAnimationFrame(scroll);
    return () => { window.cancelAnimationFrame(frame); mutations.disconnect(); };
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    const watched = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    const watch = () => document.querySelectorAll("[data-reveal]").forEach((node) => {
      if (watched.has(node)) return;
      watched.add(node);
      observer.observe(node);
    });
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.getElementById("main-content"), { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, [location.pathname, locale]);

  const home = getLocalizedPath("/", locale);
  const services = getLocalizedPath("/services", locale);
  const about = getLocalizedPath("/about", locale);
  const start = getLocalizedPath("/start-project", locale);
  const method = `${home}#method`;
  const nav = [[services, labels.services], [method, labels.method], [about, labels.about]];

  return (
    <>
      <a className="skip-link" href="#main-content">{labels.skip}</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand-link" to={home} aria-label={labels.home} translate="no"><BrandMark label="iPLUSgor" /></Link>
          <nav className="desktop-nav" aria-label={labels.primary}>
            {nav.map(([to, text]) => to.includes("#")
              ? <Link key={to} to={to}>{text}</Link>
              : <NavLink key={to} to={to}>{text}</NavLink>)}
          </nav>
          <div className="site-header__tools">
            <LanguageSwitcher />
            <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? labels.themeLight : labels.themeDark}>{theme === "dark" ? "◐" : "◑"}</button>
            <MagneticLink className="button button--small header-cta" to={start}>{labels.start}</MagneticLink>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav"
              aria-label={menuOpen ? labels.close : labels.menu} onClick={() => setMenuOpen(!menuOpen)}>
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label={labels.mobile} inert={!menuOpen}>
          {nav.map(([to, text]) => <Link key={to} to={to}>{text}</Link>)}
          <Link to={start}>{labels.start}</Link>
          <LanguageSwitcher />
        </nav>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="site-footer__top">
          <Link className="brand-link" to={home} aria-label={labels.home} translate="no"><BrandMark footer label="iPLUSgor" /></Link>
          <p>{footer.line}</p>
        </div>
        <div className="site-footer__bottom">
          <p>{footer.note}</p>
          <nav aria-label={labels.footer}><Link to={services}>{labels.services}</Link><Link to={about}>{labels.about}</Link><Link to={start}>{labels.start}</Link></nav>
          <a href="mailto:hello@iplusgor.com">hello@iplusgor.com</a>
          <span>© {new Date().getFullYear()} I+Gor</span>
        </div>
        <AnalyticsConsent />
      </footer>
    </>
  );
}
