import { useState } from "react";
import { useLocale } from "../i18n.jsx";
import { siteCopy } from "../content/site-copy.js";
import { trackEvent } from "../lib/analytics.js";

const CONTACT_EMAIL = "hello@iplusgor.com";
const empty = { name: "", email: "", company: "", problem: "", outcome: "", tools: "", budget: "", timeline: "" };

function makeBrief(values, labels) {
  return [
    `${labels.name}: ${values.name}`,
    `${labels.email}: ${values.email}`,
    `${labels.company}: ${values.company}`,
    "",
    `${labels.problem}:\n${values.problem}`,
    "",
    `${labels.outcome}:\n${values.outcome || "—"}`,
    "",
    `${labels.tools}: ${values.tools || "—"}`,
    `${labels.budget}: ${values.budget || "—"}`,
    `${labels.timeline}: ${values.timeline || "—"}`,
  ].join("\n");
}

export function StartProjectPage() {
  const { locale } = useLocale();
  const labels = siteCopy[locale].intake;
  const [values, setValues] = useState(empty);
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const update = (field) => (event) => {
    if (!values.name && !values.email && !values.problem) trackEvent("form_started", { locale });
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setMessage("");
  };
  const valid = values.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) && values.problem.trim().length >= 12;
  const invalidName = !values.name.trim();
  const invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
  const invalidProblem = values.problem.trim().length < 12;
  const subject = `I+Gor project inquiry — ${values.company.trim() || values.name.trim()}`;
  const brief = makeBrief(values, labels);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;

  const showValidation = () => {
    setAttempted(true);
    setMessage(labels.validation);
    window.requestAnimationFrame(() => document.querySelector('.intake-form [aria-invalid="true"]')?.focus());
  };

  const prepare = (event) => {
    event.preventDefault();
    if (!valid) { showValidation(); return; }
    trackEvent("form_handoff", { locale, method: "mailto" });
    setOpened(true);
    setMessage(labels.guidance);
    window.location.href = mailto;
  };
  const copy = async () => {
    if (!valid) { showValidation(); return; }
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${brief}`);
    } catch {
      const temporary = document.createElement("textarea");
      temporary.value = `${subject}\n\n${brief}`;
      document.body.append(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      if (!copied) { setMessage(labels.copyFailed); return; }
    }
    setMessage(labels.copied);
    trackEvent("form_handoff", { locale, method: "copy" });
  };

  return <div className="page page--interior page--intake">
    <header className="interior-hero container"><p className="page-kicker">I+Gor / {siteCopy[locale].nav.start}</p><h1>{labels.title}</h1><p>{labels.lead}</p></header>
    <div className="container intake-grid">
      <form className="intake-form" onSubmit={prepare} noValidate>
        <div className="field-pair"><label>{labels.name}<input name="name" autoComplete="name" value={values.name} onChange={update("name")} required maxLength="100" aria-invalid={attempted && invalidName} aria-describedby={attempted && invalidName ? "intake-message" : undefined} /></label><label>{labels.email}<input name="email" type="email" autoComplete="email" spellCheck={false} value={values.email} onChange={update("email")} required maxLength="180" aria-invalid={attempted && invalidEmail} aria-describedby={attempted && invalidEmail ? "intake-message" : undefined} /></label></div>
        <label>{labels.company}<input name="company" autoComplete="organization" value={values.company} onChange={update("company")} maxLength="180" /></label>
        <label>{labels.problem}<textarea name="problem" rows="4" value={values.problem} onChange={update("problem")} required minLength="12" maxLength="1500" aria-invalid={attempted && invalidProblem} aria-describedby={attempted && invalidProblem ? "intake-message" : undefined} /></label>
        <label>{labels.outcome}<textarea name="outcome" rows="2" value={values.outcome} onChange={update("outcome")} maxLength="600" /></label>
        <label>{labels.tools}<input name="tools" value={values.tools} onChange={update("tools")} maxLength="300" /></label>
        <div className="field-pair"><label>{labels.budget}<select name="budget" value={values.budget} onChange={update("budget")}>{labels.budgetOptions.map((option, index) => <option key={option} value={index ? option : ""}>{option}</option>)}</select></label><label>{labels.timeline}<select name="timeline" value={values.timeline} onChange={update("timeline")}>{labels.timelineOptions.map((option, index) => <option key={option} value={index ? option : ""}>{option}</option>)}</select></label></div>
        <p className="form-privacy">{labels.privacy}</p>
        <div className="form-actions"><button className="button" type="submit">{labels.prepare}<span aria-hidden="true">↗</span></button><button className="text-link" type="button" onClick={copy}>{labels.copy}</button></div>
        <p id="intake-message" className="form-message" role="status" aria-live="polite">{message || (opened ? labels.guidance : "")}</p>
      </form>
      <aside className="intake-aside"><h2>{labels.expected}</h2><ol>{labels.steps.map((step) => <li key={step}>{step}</li>)}</ol><p>{labels.fallback} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></aside>
    </div>
  </div>;
}
