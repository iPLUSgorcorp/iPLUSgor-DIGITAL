import {
  ArrowUpRight,
  List,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PrimaryCTA } from "./Primitives.jsx";
import { useLocale } from "../i18n.jsx";
import { publicAsset } from "../lib/publicAsset.js";
import { AmbientBrandVideo } from "./AmbientBrandVideo.jsx";
import { ProgressiveAssetWarmup } from "./ProgressiveAssetWarmup.jsx";
import { getBaseRoute, getLocalizedPath } from "../seo-metadata.js";

const useGlobalAmbientVideo = true;

const navigation = [
  { key: "approach", to: "/approach" },
  { key: "solutions", to: "/solutions" },
  { key: "work", to: "/work" },
  { key: "team", to: "/team" },
];

const scrollRevealSelector = [
  ".section-label",
  ".page h1",
  ".page > .page-intro",
  ".home-hero__actions",
  ".commercial-frame",
  ".process-rail",
  ".method-map__zone",
  ".method-timeline",
  ".catalogue-filter-control",
  ".catalogue-filters--interactive > .catalogue-toggle",
  ".catalogue-row",
  ".concept-card",
  ".team-hero",
  ".team-profile",
  ".team-disciplines > article",
  ".project-form > *",
].join(",");

const contourSelector = [
  ".page-frame-contour",
  ".work-contour",
  ".method-contour",
  ".solution-contour",
  ".catalogue-contour",
].join(",");

function ScrollMotion() {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!main || reduceMotion || !("IntersectionObserver" in window)) return undefined;

    let revealOrder = 0;
    const revealElements = new Set();
    const contourElements = new Set();

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-motion-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -5%", threshold: 0.06 });

    const contourObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-motion-visible");
        contourObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -4%", threshold: 0.08 });

    const registerReveal = (element) => {
      if (revealElements.has(element)) return;
      revealElements.add(element);
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-order", String(revealOrder % 6));
      revealOrder += 1;
      revealObserver.observe(element);
    };

    const registerContour = (element) => {
      if (contourElements.has(element)) return;
      contourElements.add(element);
      element.classList.add("motion-draw");

      element.querySelectorAll("path, circle, ellipse, line, polyline, polygon").forEach((shape) => {
        if (!(shape instanceof window.SVGGeometryElement)) return;
        const stroke = window.getComputedStyle(shape).stroke;
        if (!stroke || stroke === "none") return;
        const length = Math.max(1, Math.ceil(shape.getTotalLength()));
        shape.style.setProperty("--motion-path-length", String(length));
        shape.classList.add("motion-draw__stroke");
      });

      contourObserver.observe(element);
    };

    const registerWithin = (root) => {
      if (!(root instanceof Element)) return;
      if (root.matches(scrollRevealSelector)) registerReveal(root);
      root.querySelectorAll(scrollRevealSelector).forEach(registerReveal);
      if (root.matches(contourSelector)) registerContour(root);
      root.querySelectorAll(contourSelector).forEach(registerContour);
    };

    registerWithin(main);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(registerWithin);
      });
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      contourObserver.disconnect();
      revealElements.forEach((element) => {
        element.classList.remove("motion-reveal", "is-motion-visible");
        element.style.removeProperty("--motion-order");
      });
      contourElements.forEach((element) => {
        element.classList.remove("motion-draw", "is-motion-visible");
        element.querySelectorAll(".motion-draw__stroke").forEach((shape) => {
          shape.classList.remove("motion-draw__stroke");
          shape.style.removeProperty("--motion-path-length");
        });
      });
    };
  }, [location.pathname]);

  return null;
}

function LocaleSwitcher({ mobile = false }) {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className={`locale-switcher ${mobile ? "locale-switcher--mobile" : ""}`} role="group" aria-label={t("shared.language")}>
      {["ua", "en", "de"].map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? "is-active" : ""}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ mobile = false, theme, onToggle }) {
  const { t } = useLocale();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const themeLabel = nextTheme === "dark" ? t("shared.themeDark") : t("shared.themeLight");
  return (
    <button
      className={`theme-toggle ${mobile ? "theme-toggle--mobile" : ""}`}
      type="button"
      aria-label={themeLabel}
      title={themeLabel}
      onClick={onToggle}
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      {mobile && <span>{nextTheme === "dark" ? t("shared.darkMode") : t("shared.lightMode")}</span>}
    </button>
  );
}

export function SiteHeader({ theme, onThemeToggle, localAmbient = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { locale, t } = useLocale();
  const showDesktopCta = ["/", "/work"].includes(getBaseRoute(location.pathname));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 12);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header className={`site-header ${localAmbient && location.pathname !== "/" ? "site-header--ambient" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      {localAmbient && location.pathname !== "/" && (
        <>
          <AmbientBrandVideo className="site-header__ambient site-header__ambient--cover" priority />
          <div className="ambient-brand-video site-header__ambient site-header__ambient--contain" aria-hidden="true">
            <img
              src={publicAsset("assets/brand/iplusgor-ambient-forms-poster.webp")}
              alt=""
              width="1280"
              height="720"
              loading="eager"
              decoding="async"
              fetchPriority="low"
              draggable="false"
            />
          </div>
        </>
      )}
      <Link className="brand" to={getLocalizedPath("/", locale)} aria-label={t("shared.home")}>
        <img
          className="brand__symbol"
          src={publicAsset("assets/brand/iplusgor-symbol-signal.webp")}
          width="1254"
          height="1254"
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <span className="brand__wordmark">iPLUSgor</span>
        <span className="brand__division">Digital</span>
      </Link>

      <nav
        className={`desktop-nav ${showDesktopCta ? "desktop-nav--with-cta" : "desktop-nav--compact"}`}
        aria-label={t("navigation.primary")}
      >
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={getLocalizedPath(item.to, locale)}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {t(`navigation.${item.key}`)}
          </NavLink>
        ))}
        <LocaleSwitcher />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        {showDesktopCta && (
          <PrimaryCTA className="desktop-nav__cta">{t("navigation.start")}</PrimaryCTA>
        )}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("navigation.menuClose") : t("navigation.menuOpen")}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
      </button>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu">
        <nav aria-label={t("navigation.mobile")}>
          {navigation.map((item, index) => (
            <NavLink key={item.to} to={getLocalizedPath(item.to, locale)}>
              <span>0{index + 1}</span>
              {t(`navigation.${item.key}`)}
              <ArrowUpRight aria-hidden="true" />
            </NavLink>
          ))}
          <NavLink to={getLocalizedPath("/start-project", locale)}>
            <span>05</span>
            {t("navigation.start")}
            <ArrowUpRight aria-hidden="true" />
          </NavLink>
        </nav>
        <div className="mobile-menu__preferences">
          <LocaleSwitcher mobile />
          <ThemeToggle mobile theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ localAmbient = false }) {
  const { locale, t } = useLocale();
  return (
    <footer className="site-footer">
      {localAmbient && <AmbientBrandVideo className="site-footer__ambient" forceStatic />}
      <div>
        <div className="site-footer__brand">
          <img
            className="site-footer__symbol"
            src={publicAsset("assets/brand/iplusgor-symbol-signal.webp")}
            width="1254"
            height="1254"
            alt=""
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <strong>iPLUSgor</strong>
          <span>Digital</span>
        </div>
        <p>
          {t("shared.practice")}
        </p>
      </div>
      <nav aria-label={t("navigation.footer")}>
        {navigation.map((item) => (
          <Link key={item.to} to={getLocalizedPath(item.to, locale)}>
            {t(`navigation.${item.key}`)}
          </Link>
        ))}
        <Link to={getLocalizedPath("/start-project", locale)}>{t("navigation.review")}</Link>
        <a href="https://www.instagram.com/iplusgor/" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
      <p className="site-footer__note">
        SOFT SHELL — HARD CORE
        <br />
        {t("shared.premium")}
      </p>
    </footer>
  );
}

export function SiteLayout() {
  const { t } = useLocale();
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("iplusgor-theme", theme);
    } catch {
      // The visual preference still applies for the current session.
    }
  }, [theme]);

  return (
    <>
      <ProgressiveAssetWarmup />
      {useGlobalAmbientVideo && (
        <AmbientBrandVideo className="site-wide-ambient" forceStatic hideWhenStatic />
      )}
      <a className="skip-link" href="#main-content">
        {t("navigation.skip")}
      </a>
      <SiteHeader
        theme={theme}
        localAmbient
        onThemeToggle={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />
      <main id="main-content">
        <ScrollMotion />
        <Outlet />
      </main>
      <SiteFooter localAmbient />
    </>
  );
}
