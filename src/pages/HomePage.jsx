import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n.jsx";
import { siteCopy } from "../content/site-copy.js";
import { serviceDepth } from "../content/service-depth.js";
import { processImages, processImageNote } from "../content/process-media.js";
import { HighlightedText } from "../components/HighlightedText.jsx";
import { MagneticLink } from "../components/MagneticLink.jsx";
import { getLocalizedPath } from "../seo-metadata.js";
import { trackEvent } from "../lib/analytics.js";

function Action({ to, children, secondary = false, locale }) {
  const Component = secondary ? Link : MagneticLink;
  return <Component className={secondary ? "text-link" : "button"} to={getLocalizedPath(to, locale)}
    onClick={() => trackEvent("primary_cta_click", { destination: to, locale })}>{children}<span aria-hidden="true">↗</span></Component>;
}

export function HomePage() {
  const { locale } = useLocale();
  const copy = siteCopy[locale];
  const home = copy.home;
  const depth = serviceDepth[locale];
  const [flowIndex, setFlowIndex] = useState(0);
  const selectedFlow = depth.examples[flowIndex];
  const heroAccent = { en: "clarity.", ua: "ясність.", de: "Klarheit." }[locale];
  const offerActive = Date.now() < new Date("2026-10-21T00:00:00+03:00").getTime();
  return <div className="page page--home">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__main">
        <p className="hero__identity">I+Gor <span aria-hidden="true">/</span> {home.heroIdentity}</p>
        <h1 id="hero-title"><HighlightedText text={home.heroTitle} phrase={heroAccent} /></h1>
        <p className="hero__lead">{home.heroLead}</p>
        <div className="hero__actions"><Action to="/start-project" locale={locale}>{copy.nav.start}</Action><Action to="/services" locale={locale} secondary>{home.seeServices}</Action></div>
      </div>
      <div className="hero__side" aria-hidden="true"><img className="hero__symbol" src={`${import.meta.env.BASE_URL}assets/brand/iplusgor-symbol.webp`} width="638" height="638" alt="" decoding="async" /><p>{home.heroAside}</p></div>
    </section>

    <section className="section section--problems" aria-labelledby="problems-title">
      <div className="container section__grid"><div className="section__lead"><h2 id="problems-title">{home.problemTitle}</h2><p>{home.problemIntro}</p></div>
        <div className="problem-list">{home.problems.map(([setup, failure]) => <div className="problem-row" key={setup}><strong>{setup}</strong><span>{failure}</span></div>)}</div>
      </div>
    </section>

    <section className="section" aria-labelledby="services-title">
      <div className="container"><div className="section__heading" data-reveal><h2 id="services-title">{depth.homeTitle}</h2><p>{depth.homeIntro}</p></div>
        <div className="capability-list">{depth.items.map((item, index) => <article className="capability" key={item.id} data-reveal>
          <div className="capability__heading"><span className="service-index__number">0{index + 1}</span><h3><Link to={`${getLocalizedPath("/services", locale)}#${item.id}`}>{item.title}</Link></h3><p>{item.statement}</p></div>
          <div className="capability__detail"><div className="capability__logic"><div><h4>{depth.labels.problem}</h4><p>{item.problem}</p></div><div><h4>{depth.labels.build}</h4><p>{item.build}</p></div></div>
            <div className="capability__outcome"><h4>{depth.labels.after}</h4><p>{item.after}</p></div>
            <ul className="component-line" aria-label={depth.labels.components}>{item.components.slice(0, 4).map((part) => <li key={part}>{part}</li>)}</ul>
            <div className="capability__foot"><span>{item.impact.join(" · ")}</span><Link className="text-link" to={`${getLocalizedPath("/services", locale)}#${item.id}`}>{depth.labels.explore}<span aria-hidden="true">↗</span></Link></div>
          </div>
        </article>)}</div>
      </div>
    </section>

    <section className="section section--flows" aria-labelledby="flow-title"><div className="container">
      <div className="section__heading" data-reveal><h2 id="flow-title">{depth.flowTitle}</h2><p>{depth.flowIntro}</p></div>
      <div className="flow-layout" data-reveal><div className="flow-selector" role="group" aria-label={depth.flowLabel}>{depth.examples.map((example, index) =>
        <button type="button" key={example.title} aria-pressed={index === flowIndex} onClick={() => setFlowIndex(index)}><span>0{index + 1}</span>{example.title}<span aria-hidden="true">↗</span></button>)}</div>
        <div className="flow-display" key={`${locale}-${flowIndex}`} aria-live="polite"><p className="flow-display__label">{depth.labels.workflow} / {selectedFlow.title}</p><ol className="flow-steps">{selectedFlow.steps.map((step, index) => <li key={`${step}-${index}`} style={{ "--step": index }}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol><p className="flow-display__note">{selectedFlow.note}</p></div>
      </div><p className="flow-disclaimer">{depth.flowNote}</p>
    </div></section>

    <section className="section section--method" id="method" aria-labelledby="method-title">
      <div className="container"><div className="section__heading" data-reveal><h2 id="method-title">{home.methodTitle}</h2><p>{home.methodIntro}</p></div>
        <ol className="method-list">{home.steps.map(([title, detail], index) => <li key={title} data-reveal><span className="method-list__number">0{index + 1}</span><span className="method-list__media"><img className="method-list__visual" src={`${import.meta.env.BASE_URL}assets/process/${processImages[index].file}`} width="1280" height="854" alt={processImages[index].alt[locale]} loading="lazy" decoding="async" /></span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol>
        <p className="method-image-note">{processImageNote[locale]}</p>
      </div>
    </section>

    <section className="section section--investment" aria-labelledby="investment-title"><div className={`container investment-grid${offerActive ? "" : " investment-grid--single"}`}>
      <div><h2 id="investment-title">{home.investmentTitle}</h2><p className="investment-grid__lead">{home.investmentLead}</p><p>{home.investmentNote}</p></div>
      {offerActive && <aside className="capacity-note"><h3>{home.offerTitle}</h3><p>{home.offer}</p></aside>}
    </div></section>

    <section className="section section--credibility"><div className="container credibility-grid"><h2>{home.credibilityTitle}</h2><p>{home.credibility}</p></div></section>

    <section className="section" aria-labelledby="faq-title"><div className="container faq-grid"><h2 id="faq-title">{home.faqTitle}</h2><div className="faq-list">{home.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="closing" aria-labelledby="closing-title"><div className="container"><h2 id="closing-title">{home.finalTitle}</h2><p>{home.finalLead}</p><Action to="/start-project" locale={locale}>{copy.nav.start}</Action></div></section>
  </div>;
}
