import { Link } from "react-router-dom";
import { useLocale } from "../i18n.jsx";
import { siteCopy } from "../content/site-copy.js";
import { serviceDepth } from "../content/service-depth.js";
import { HighlightedText } from "../components/HighlightedText.jsx";
import { getLocalizedPath } from "../seo-metadata.js";
import { MagneticLink } from "../components/MagneticLink.jsx";

export function ServicesPage() {
  const { locale } = useLocale();
  const copy = siteCopy[locale];
  const page = copy.services;
  const depth = serviceDepth[locale];
  const labels = depth.labels;
  const titleAccent = { en: "system", ua: "систему", de: "System" }[locale];
  return <div className="page page--interior">
    <header className="interior-hero container"><p className="page-kicker">I+Gor / {copy.nav.services}</p><h1><HighlightedText text={depth.heroTitle} phrase={titleAccent} /></h1><p>{depth.heroLead}</p></header>
    <nav className="container service-jump" aria-label={copy.nav.services}>{depth.items.map((item) => <Link key={item.id} to={`#${item.id}`}>{item.title}</Link>)}</nav>
    <section className="container service-details" aria-label={copy.nav.services}>{depth.items.map((item, index) => <article className="service-chapter" id={item.id} key={item.id}>
      <div className="service-chapter__header" data-reveal><span>0{index + 1} / 04</span><h2>{item.title}</h2><p>{item.statement}</p></div>
      <div className="service-chapter__main"><div className="service-chapter__narrative" data-reveal>
        <div><h3>{labels.problem}</h3><p>{item.problem}</p></div><div><h3>{labels.build}</h3><p>{item.build}</p></div><div><h3>{labels.after}</h3><p>{item.after}</p></div>
      </div><div className="service-chapter__spec" data-reveal><h3>{labels.components}</h3><ul>{item.components.map((part) => <li key={part}>{part}</li>)}</ul></div></div>
      <div className="service-chapter__workflow" data-reveal><h3>{labels.workflow}</h3><ol className="chapter-flow">{item.workflow.map((step, stepIndex) => <li key={step}><span>0{stepIndex + 1}</span>{step}</li>)}</ol></div>
      <div className="service-chapter__bottom"><div><h3>{labels.fit}</h3><p>{item.fit}</p></div><div><h3>{labels.scope}</h3><p>{item.scope}</p></div><div><h3>{labels.impact}</h3><p>{item.impact.join(" · ")}</p></div></div>
      <Link className="text-link" to={getLocalizedPath("/start-project", locale)}>{labels.discuss}<span aria-hidden="true">↗</span></Link>
    </article>)}</section>
    <section className="closing"><div className="container"><h2>{page.closerTitle}</h2><p>{page.closer}</p><MagneticLink to={getLocalizedPath("/start-project", locale)}>{copy.nav.start}<span aria-hidden="true">↗</span></MagneticLink></div></section>
  </div>;
}
