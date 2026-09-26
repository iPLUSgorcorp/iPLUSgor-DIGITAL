import { useLocale } from "../i18n.jsx";
import { siteCopy } from "../content/site-copy.js";
import { getLocalizedPath } from "../seo-metadata.js";
import { MagneticLink } from "../components/MagneticLink.jsx";

export function AboutPage() {
  const { locale } = useLocale();
  const copy = siteCopy[locale];
  const page = copy.about;
  return <div className="page page--interior">
    <header className="interior-hero container"><p className="page-kicker">I+Gor / {copy.nav.about}</p><h1>{page.title}</h1><p>{page.lead}</p></header>
    <section className="section section--about"><div className="container about-grid"><h2>{page.beliefTitle}</h2><div className="about-principles">{page.beliefs.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="container about-note"><p>{page.note}</p><MagneticLink to={getLocalizedPath("/start-project", locale)}>{copy.nav.start}<span aria-hidden="true">↗</span></MagneticLink></section>
  </div>;
}
