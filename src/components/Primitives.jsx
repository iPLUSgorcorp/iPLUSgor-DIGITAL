import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n.jsx";

export function SectionLabel({ children, tone = "jade" }) {
  return <p className={`section-label section-label--${tone}`}>{children}</p>;
}

export function PrimaryCTA({
  children,
  to = "/start-project",
  tone = "dark",
  className = "",
}) {
  return (
    <Link className={`primary-cta primary-cta--${tone} ${className}`} to={to}>
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
      <span className="status-badge__dot" aria-hidden="true" />
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
    en: ["A strong manufacturer should not look weaker than its website.", "Get a preliminary review"],
    ua: ["Сильний виробник не повинен виглядати слабшим за свій сайт.", "Отримати попередній розбір"],
    de: ["Ein starker Hersteller sollte nicht schwächer wirken als seine Website.", "Vorprüfung anfragen"],
  }[locale] || ["A strong manufacturer should not look weaker than its website.", "Get a preliminary review"];
  return (
    <aside className="commercial-frame" aria-label="Commercial information">
      <div className="commercial-frame__mark" aria-hidden="true">
        {mark === "arrow" ? <ArrowUpRight weight="regular" /> : <Sparkle weight="regular" />}
      </div>
      <p>{text || defaults[0]}</p>
      <span className="commercial-frame__line" aria-hidden="true" />
      <PrimaryCTA to={to}>{cta || defaults[1]}</PrimaryCTA>
    </aside>
  );
}
