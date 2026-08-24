import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n.jsx";
import { getLocalizedPath } from "../seo-metadata.js";
import { trackEvent } from "../lib/analytics.js";

export function SectionLabel({ children, tone = "jade" }) {
  return <p className={`section-label section-label--${tone}`}>{children}</p>;
}

export function PrimaryCTA({
  children,
  to = "/start-project",
  tone = "dark",
  className = "",
}) {
  const { locale } = useLocale();
  const localizedTo = getLocalizedPath(to, locale);
  return (
    <Link
      className={`primary-cta primary-cta--${tone} ${className}`}
      to={localizedTo}
      onClick={() => trackEvent("primary_cta_click", {
        destination: localizedTo,
        label: typeof children === "string" ? children : "primary_cta",
        locale,
      })}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" weight="regular" />
    </Link>
  );
}

export function SoftShell({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag className={`soft-shell ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function Aperture({ className = "", children, label }) {
  return (
    <div
      className={`aperture ${className}`}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      <div className="aperture__rim">
        <div className="aperture__core">{children}</div>
      </div>
    </div>
  );
}

export function StatusBadge({ children, tone = "jade" }) {
  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__mark" aria-hidden="true" />
      {children}
    </span>
  );
}

export function CommercialFrame({
  text,
  cta,
  to = "/start-project",
  mark = "sparkle",
}) {
  const { locale } = useLocale();
  const defaults = {
    en: ["A strong business deserves a website that makes its value clear.", "Start a conversation", "Commercial information"],
    ua: ["Сильний бізнес заслуговує на сайт, який зрозуміло пояснює його цінність.", "Почати розмову", "Комерційна інформація"],
    de: ["Ein starkes Unternehmen verdient eine Website, die seinen Wert klar vermittelt.", "Gespräch beginnen", "Kommerzielle Informationen"],
  }[locale] || ["A strong business deserves a website that makes its value clear.", "Start a conversation", "Commercial information"];
  return (
    <aside className="commercial-frame" aria-label={defaults[2]}>
      <div className="commercial-frame__mark" aria-hidden="true">
        {mark === "arrow" ? <ArrowUpRight weight="regular" /> : <Sparkle weight="regular" />}
      </div>
      <p>{text || defaults[0]}</p>
      <span className="commercial-frame__line" aria-hidden="true" />
      <PrimaryCTA to={to}>{cta || defaults[1]}</PrimaryCTA>
    </aside>
  );
}
