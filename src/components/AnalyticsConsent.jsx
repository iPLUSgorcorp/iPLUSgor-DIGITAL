import { useEffect, useState } from "react";
import { useLocale } from "../i18n.jsx";
import { getAnalyticsConsent, initializeAnalytics, setAnalyticsConsent } from "../lib/analytics.js";

const copy = {
  en: { title: "Website analytics", text: "With your permission, Google Analytics helps us understand which pages and project actions are useful. It uses analytics cookies. Your project brief and contact details are never sent in our analytics events. Google processes usage data; advertising personalization is disabled. You can change this choice here at any time.", accept: "Allow analytics", decline: "Continue without analytics", settings: "Analytics settings", saved: "Preference saved." },
  ua: { title: "Аналітика сайту", text: "За вашою згодою Google Analytics допомагає нам зрозуміти, які сторінки й дії корисні. Він використовує аналітичні cookies. Ми не надсилаємо зміст заявки чи контактні дані в подіях аналітики. Google обробляє дані використання; персоналізацію реклами вимкнено. Ви можете змінити вибір тут будь-коли.", accept: "Дозволити аналітику", decline: "Продовжити без аналітики", settings: "Налаштування аналітики", saved: "Вибір збережено." },
  de: { title: "Website-Analyse", text: "Mit Ihrer Zustimmung hilft uns Google Analytics zu verstehen, welche Seiten und Projektaktionen nützlich sind. Dafür werden Analyse-Cookies verwendet. Projektbeschreibungen und Kontaktdaten senden wir nie in unseren Analyseereignissen. Google verarbeitet Nutzungsdaten; personalisierte Werbung ist deaktiviert. Sie können Ihre Wahl hier jederzeit ändern.", accept: "Analyse erlauben", decline: "Ohne Analyse fortfahren", settings: "Analyse-Einstellungen", saved: "Auswahl gespeichert." },
};

export function AnalyticsConsent() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [choice, setChoice] = useState("pending");
  const [open, setOpen] = useState(false);
  const [announced, setAnnounced] = useState(false);
  useEffect(() => {
    const saved = getAnalyticsConsent();
    setChoice(saved);
    if (saved === "accepted") initializeAnalytics();
  }, []);
  const select = (value) => { setAnalyticsConsent(value); setChoice(value); setOpen(false); setAnnounced(true); };
  return <div className="analytics-controls">
    <button className="analytics-settings" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="analytics-panel">{text.settings}</button>
    {(choice === null || open) && <section id="analytics-panel" className="analytics-panel" aria-labelledby="analytics-title">
      <div><h2 id="analytics-title">{text.title}</h2><p>{text.text}</p></div>
      <div className="analytics-panel__actions"><button type="button" onClick={() => select("accepted")}>{text.accept}</button><button type="button" onClick={() => select("declined")}>{text.decline}</button></div>
    </section>}
    <span className="sr-only" role="status">{announced ? text.saved : ""}</span>
  </div>;
}
