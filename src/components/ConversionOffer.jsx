import {
  ArrowRight,
  Check,
  CursorClick,
  Gauge,
  Layout,
  Path,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { PrimaryCTA, SectionLabel, SoftShell } from "./Primitives.jsx";
import { useLocale } from "../i18n.jsx";
import { publicAsset } from "../lib/publicAsset.js";
import { getLocalizedPath } from "../seo-metadata.js";

const changeIcons = [Target, Layout, Path, CursorClick, ShieldCheck, Gauge];

const copy = {
  en: {
    label: "WHAT CHANGES AFTER THE CLICK",
    title: "A CLEARER PATH FROM PAID TRAFFIC TO A REAL INQUIRY.",
    intro: "We do not promise a lead count. We improve the parts of the website a visitor needs to understand the offer, trust the business and take the next step.",
    funnel: ["Traffic", "Offer", "Trust", "CTA", "Lead"],
    changes: [
      ["Offer clarity", "Make the service and its value understandable without decoding agency language."],
      ["Page structure", "Put proof, objections and the next step in the order a buyer needs them."],
      ["Mobile path", "Keep the primary action obvious on the device most local-service traffic uses."],
      ["CTA architecture", "Give calls, forms and booking actions a clear role instead of competing."],
      ["Lead capture", "Collect only the information the business actually needs to continue the conversation."],
      ["Speed and tracking", "Ship a fast frontend with practical events ready for measurement."],
    ],
    workLabel: "SELECTED INDEPENDENT CONCEPTS",
    workTitle: "DESIGN EVIDENCE, LABELLED HONESTLY.",
    workIntro: "These are self-initiated interface concepts, not client results. They show how we structure a decision and execute the responsive interface.",
    viewWork: "View all concepts",
    concepts: [
      ["Atelier objects", "A premium commerce concept that organizes discovery, products and collection context.", "assets/work-concepts/1785460153-atelier-objects-01.webp"],
      ["Lypa café", "A short route from first impression to menu, location and reservation.", "assets/work-concepts/20260820-lypa-cafe-concept.webp"],
    ],
    scopeLabel: "SCOPE AND INVESTMENT",
    scopeTitle: "ONE RECOMMENDATION. THREE POSSIBLE SCOPE LEVELS.",
    scopeIntro: "We recommend the right scope after reviewing your traffic, current website and commercial goal. The options are not interchangeable plans.",
    scopes: [
      {
        tier: "FAST",
        name: "Conversion Landing Sprint",
        price: "$4,000",
        time: "2–3 business days",
        text: "One focused landing page for one service, campaign, offer or traffic source.",
        deliverables: ["Offer and page structure", "Responsive design and frontend", "Lead form or simple booking connection", "Basic analytics and launch", "Up to two revision rounds"],
      },
      {
        tier: "CORE — RECOMMENDED",
        name: "Conversion Website Sprint",
        price: "$8,500",
        time: "5–7 business days",
        text: "A redesigned commercial website built around turning existing traffic into inquiries, bookings or leads.",
        deliverables: ["Current-site and conversion-path audit", "New structure and offer presentation", "Mobile-first design and frontend", "CTA, forms, tracking and speed optimization", "Launch plus short post-launch support"],
        primary: true,
      },
      {
        tier: "CUSTOM",
        name: "Custom Growth Website",
        price: "From $10,000",
        time: "Typical scope $10,000–$15,000+",
        text: "For multiple locations, many pages, CMS, integrations, calculators, migrations or custom backend requirements.",
        deliverables: ["Scope designed around real complexity", "Advanced forms, APIs or CRM connections", "Multiple landing pages or locations", "Custom tracking and SEO architecture", "Timeline agreed after technical review"],
      },
    ],
    included: "Typical scope",
    request: "Request a conversion review",
    processLabel: "SPRINT MODEL",
    processTitle: "BUILT TO REACH LAUNCH, NOT TO LIVE IN HANDOFFS.",
    process: [
      ["01", "Review", "Traffic, current site, offer and primary action."],
      ["02", "Strategy", "Scope, structure and conversion path."],
      ["03", "Design", "High-fidelity responsive interface."],
      ["04", "Build", "Frontend, forms, tracking and QA."],
      ["05", "Launch", "Domain, deployment and final checks."],
    ],
    sprintNote: "One team owns strategy, design and implementation. That reduces handoffs, keeps the scope visible and makes a short timeline possible when content and decisions are available.",
  },
  ua: {
    label: "ЩО ЗМІНЮЄТЬСЯ ПІСЛЯ КЛІКУ",
    title: "ЗРОЗУМІЛІШИЙ ШЛЯХ ВІД ПЛАТНОГО ТРАФІКУ ДО РЕАЛЬНОГО ЗАПИТУ.",
    intro: "Ми не обіцяємо кількість лідів. Ми покращуємо частини сайту, які допомагають відвідувачу зрозуміти пропозицію, довіритися бізнесу й зробити наступний крок.",
    funnel: ["Трафік", "Пропозиція", "Довіра", "Дія", "Лід"],
    changes: [
      ["Ясність пропозиції", "Пояснюємо послугу та її цінність без абстрактної агентської мови."],
      ["Структура сторінки", "Розміщуємо докази, заперечення й наступний крок у потрібній покупцеві послідовності."],
      ["Мобільний шлях", "Головна дія залишається очевидною на пристрої, з якого часто приходить локальний трафік."],
      ["Архітектура CTA", "Дзвінки, форми й запис мають чіткі ролі й не конкурують між собою."],
      ["Збір звернень", "Запитуємо лише інформацію, потрібну бізнесу для продовження розмови."],
      ["Швидкість і вимірювання", "Запускаємо швидкий frontend із підготовленими подіями для аналітики."],
    ],
    workLabel: "ВИБРАНІ НЕЗАЛЕЖНІ КОНЦЕПТИ",
    workTitle: "ДОКАЗ ДИЗАЙН-МЕТОДУ З ЧЕСНИМ СТАТУСОМ.",
    workIntro: "Це самостійні концепти інтерфейсів, а не результати клієнтських проєктів. Вони показують, як ми будуємо шлях рішення й реалізуємо адаптивний інтерфейс.",
    viewWork: "Переглянути всі концепти",
    concepts: [
      ["Atelier objects", "Преміальний e-commerce концепт із логікою вибору, товарів і колекцій.", "assets/work-concepts/1785460153-atelier-objects-01.webp"],
      ["Кав’ярня Lypa", "Короткий шлях від першого враження до меню, адреси й бронювання.", "assets/work-concepts/20260820-lypa-cafe-concept.webp"],
    ],
    scopeLabel: "ОБСЯГ ТА ІНВЕСТИЦІЯ",
    scopeTitle: "ОДНА РЕКОМЕНДАЦІЯ. ТРИ МОЖЛИВІ РІВНІ ОБСЯГУ.",
    scopeIntro: "Ми рекомендуємо потрібний обсяг після огляду трафіку, поточного сайту й комерційної цілі. Це не взаємозамінні тарифні плани.",
    scopes: [
      {
        tier: "FAST",
        name: "Conversion Landing Sprint",
        price: "$4,000",
        time: "2–3 робочі дні",
        text: "Одна сфокусована landing page для конкретної послуги, кампанії, пропозиції або джерела трафіку.",
        deliverables: ["Структура пропозиції та сторінки", "Адаптивний дизайн і frontend", "Форма звернення або просте підключення запису", "Базова аналітика й запуск", "До двох раундів правок"],
      },
      {
        tier: "CORE — РЕКОМЕНДОВАНО",
        name: "Conversion Website Sprint",
        price: "$8,500",
        time: "5–7 робочих днів",
        text: "Оновлений комерційний сайт, побудований навколо перетворення наявного трафіку на звернення, записи або ліди.",
        deliverables: ["Аудит поточного сайту й шляху конверсії", "Нова структура та подача пропозиції", "Mobile-first дизайн і frontend", "CTA, форми, події та оптимізація швидкості", "Запуск і коротка підтримка після нього"],
        primary: true,
      },
      {
        tier: "CUSTOM",
        name: "Custom Growth Website",
        price: "Від $10,000",
        time: "Типовий обсяг $10,000–$15,000+",
        text: "Для багатьох локацій і сторінок, CMS, інтеграцій, калькуляторів, міграцій або custom backend.",
        deliverables: ["Обсяг відповідно до реальної складності", "Розширені форми, API або CRM", "Кілька landing pages чи локацій", "Custom tracking і SEO-архітектура", "Строк після технічного розбору"],
      },
    ],
    included: "Типовий склад",
    request: "Запросити conversion review",
    processLabel: "СПРИНТ-МОДЕЛЬ",
    processTitle: "ПОБУДОВАНО ДЛЯ ЗАПУСКУ, А НЕ ДЛЯ НЕСКІНЧЕННИХ ПЕРЕДАЧ.",
    process: [
      ["01", "Розбір", "Трафік, поточний сайт, пропозиція й головна дія."],
      ["02", "Стратегія", "Обсяг, структура й шлях конверсії."],
      ["03", "Дизайн", "Детальний адаптивний інтерфейс."],
      ["04", "Розробка", "Frontend, форми, події й QA."],
      ["05", "Запуск", "Домен, публікація та фінальна перевірка."],
    ],
    sprintNote: "Одна команда відповідає за стратегію, дизайн і реалізацію. Це зменшує кількість передач, тримає обсяг видимим і дозволяє працювати швидко, коли матеріали та рішення доступні вчасно.",
  },
  de: {
    label: "WAS NACH DEM KLICK PASSIERT",
    title: "EIN KLARERER WEG VOM BEZAHLTEN TRAFFIC ZUR ECHTEN ANFRAGE.",
    intro: "Wir versprechen keine Lead-Anzahl. Wir verbessern die Website-Bausteine, die Besuchern helfen, das Angebot zu verstehen, Vertrauen aufzubauen und den nächsten Schritt zu gehen.",
    funnel: ["Traffic", "Angebot", "Vertrauen", "Aktion", "Lead"],
    changes: [
      ["Klares Angebot", "Leistung und Wert ohne abstrakte Agentursprache verständlich machen."],
      ["Seitenstruktur", "Belege, Einwände und den nächsten Schritt in eine kaufgerechte Reihenfolge bringen."],
      ["Mobiler Weg", "Die Hauptaktion auf dem wichtigsten Gerät für lokalen Traffic sichtbar halten."],
      ["CTA-Architektur", "Anrufe, Formulare und Buchung erhalten klare Rollen, statt zu konkurrieren."],
      ["Lead-Erfassung", "Nur die Informationen abfragen, die für das nächste Gespräch wirklich nötig sind."],
      ["Tempo und Messung", "Ein schnelles Frontend mit praktisch messbaren Ereignissen ausliefern."],
    ],
    workLabel: "AUSGEWÄHLTE EIGENSTÄNDIGE KONZEPTE",
    workTitle: "DESIGNBELEG MIT EHRLICHER KENNZEICHNUNG.",
    workIntro: "Dies sind eigenständige Interface-Konzepte, keine Kundenergebnisse. Sie zeigen, wie wir Entscheidungen strukturieren und responsive Interfaces umsetzen.",
    viewWork: "Alle Konzepte ansehen",
    concepts: [
      ["Atelier objects", "Ein hochwertiges Commerce-Konzept für Entdeckung, Produkte und Kollektionen.", "assets/work-concepts/1785460153-atelier-objects-01.webp"],
      ["Café Lypa", "Ein kurzer Weg vom ersten Eindruck zu Speisekarte, Standort und Reservierung.", "assets/work-concepts/20260820-lypa-cafe-concept.webp"],
    ],
    scopeLabel: "UMFANG UND INVESTITION",
    scopeTitle: "EINE EMPFEHLUNG. DREI MÖGLICHE UMFANGSSTUFEN.",
    scopeIntro: "Wir empfehlen den passenden Umfang nach Prüfung von Traffic, aktueller Website und Geschäftsziel. Es sind keine austauschbaren Tarifpläne.",
    scopes: [
      {
        tier: "FAST",
        name: "Conversion Landing Sprint",
        price: "$4,000",
        time: "2–3 Arbeitstage",
        text: "Eine fokussierte Landingpage für eine Leistung, Kampagne, ein Angebot oder eine Traffic-Quelle.",
        deliverables: ["Angebots- und Seitenstruktur", "Responsives Design und Frontend", "Lead-Formular oder einfache Buchungsanbindung", "Basis-Analytics und Launch", "Bis zu zwei Korrekturrunden"],
      },
      {
        tier: "CORE — EMPFOHLEN",
        name: "Conversion Website Sprint",
        price: "$8,500",
        time: "5–7 Arbeitstage",
        text: "Eine neu entwickelte kommerzielle Website, die bestehenden Traffic zu Anfragen, Buchungen oder Leads führt.",
        deliverables: ["Audit von Website und Conversion-Weg", "Neue Struktur und Angebotsdarstellung", "Mobile-first Design und Frontend", "CTA, Formulare, Tracking und Tempo-Optimierung", "Launch und kurze Betreuung danach"],
        primary: true,
      },
      {
        tier: "CUSTOM",
        name: "Custom Growth Website",
        price: "Ab $10,000",
        time: "Typischer Umfang $10,000–$15,000+",
        text: "Für mehrere Standorte, viele Seiten, CMS, Integrationen, Rechner, Migrationen oder individuelle Backend-Anforderungen.",
        deliverables: ["Umfang nach tatsächlicher Komplexität", "Erweiterte Formulare, APIs oder CRM", "Mehrere Landingpages oder Standorte", "Individuelles Tracking und SEO-Architektur", "Zeitplan nach technischer Prüfung"],
      },
    ],
    included: "Typischer Umfang",
    request: "Conversion-Review anfragen",
    processLabel: "SPRINT-MODELL",
    processTitle: "FÜR DEN LAUNCH GEBAUT, NICHT FÜR ENDLOSE ÜBERGABEN.",
    process: [
      ["01", "Review", "Traffic, aktuelle Website, Angebot und Hauptaktion."],
      ["02", "Strategie", "Umfang, Struktur und Conversion-Weg."],
      ["03", "Design", "Detailliertes responsives Interface."],
      ["04", "Umsetzung", "Frontend, Formulare, Events und QA."],
      ["05", "Launch", "Domain, Veröffentlichung und letzte Prüfung."],
    ],
    sprintNote: "Ein Team verantwortet Strategie, Design und Umsetzung. Das reduziert Übergaben, hält den Umfang sichtbar und ermöglicht einen kurzen Zeitplan, wenn Inhalte und Entscheidungen rechtzeitig vorliegen.",
  },
};

export function ConversionOffer() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;

  return (
    <div className="conversion-offer">
      <SoftShell className="conversion-system" aria-labelledby="conversion-system-title">
        <div className="conversion-system__intro">
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 id="conversion-system-title">{labels.title}</h2>
          <p className="selectable">{labels.intro}</p>
        </div>
        <ol className="conversion-funnel" aria-label={labels.label}>
          {labels.funnel.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              {index < labels.funnel.length - 1 && <ArrowRight aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <div className="conversion-changes">
          {labels.changes.map(([title, text], index) => {
            const Icon = changeIcons[index];
            return (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p className="selectable">{text}</p>
              </article>
            );
          })}
        </div>
      </SoftShell>

      <section className="selected-concepts" aria-labelledby="selected-concepts-title">
        <div className="selected-concepts__intro">
          <SectionLabel>{labels.workLabel}</SectionLabel>
          <h2 id="selected-concepts-title">{labels.workTitle}</h2>
          <p className="selectable">{labels.workIntro}</p>
          <Link to={getLocalizedPath("/work", locale)}>{labels.viewWork}<ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="selected-concepts__grid">
          {labels.concepts.map(([title, text, image]) => (
            <Link to={getLocalizedPath("/work", locale)} className="selected-concept" key={title}>
              <img src={publicAsset(image)} alt="" width="1280" height="800" loading="lazy" decoding="async" fetchPriority="low" />
              <span>{labels.workLabel}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <SoftShell className="scope-system" aria-labelledby="scope-system-title">
        <div className="scope-system__intro">
          <SectionLabel>{labels.scopeLabel}</SectionLabel>
          <h2 id="scope-system-title">{labels.scopeTitle}</h2>
          <p className="selectable">{labels.scopeIntro}</p>
        </div>
        <div className="scope-system__levels">
          {labels.scopes.map((scope) => (
            <article className={scope.primary ? "scope-level scope-level--primary" : "scope-level"} key={scope.tier}>
              <div className="scope-level__head">
                <span>{scope.tier}</span>
                <strong>{scope.price}</strong>
              </div>
              <h3>{scope.name}</h3>
              <p className="scope-level__time">{scope.time}</p>
              <p className="selectable">{scope.text}</p>
              <details open={scope.primary}>
                <summary>{labels.included}</summary>
                <ul>
                  {scope.deliverables.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
                </ul>
              </details>
              {scope.primary && <PrimaryCTA>{labels.request}</PrimaryCTA>}
            </article>
          ))}
        </div>
      </SoftShell>

      <section className="sprint-model" aria-labelledby="sprint-model-title">
        <div className="sprint-model__intro">
          <SectionLabel>{labels.processLabel}</SectionLabel>
          <h2 id="sprint-model-title">{labels.processTitle}</h2>
          <p className="selectable">{labels.sprintNote}</p>
        </div>
        <ol>
          {labels.process.map(([index, title, text]) => (
            <li key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p className="selectable">{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
