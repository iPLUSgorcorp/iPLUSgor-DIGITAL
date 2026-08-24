import {
  ArrowRight,
  Blueprint,
  Browsers,
  Code,
  MagnifyingGlass,
  Path,
  Stack,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  Aperture,
  CommercialFrame,
  SectionLabel,
  SoftShell,
} from "../components/Primitives.jsx";
import { MethodContour } from "../components/ContourSystems.jsx";
import { useLocale } from "../i18n.jsx";
import { publicAsset } from "../lib/publicAsset.js";

const baseSteps = [
  {
    id: "01",
    title: "Review",
    icon: MagnifyingGlass,
    text: "We inspect the current website, traffic sources, offer, primary action and practical constraints.",
  },
  {
    id: "02",
    title: "Strategy",
    icon: Blueprint,
    text: "We define the sprint scope, conversion path and decisions the page needs to support.",
  },
  {
    id: "03",
    title: "Structure",
    icon: Stack,
    text: "We organize the offer, proof, objections and calls to action in a commercial sequence.",
  },
  {
    id: "04",
    title: "Design",
    icon: Path,
    text: "We create the high-fidelity mobile-first interface and review it inside the agreed scope.",
  },
  {
    id: "05",
    title: "Build",
    icon: Browsers,
    text: "We build the frontend, forms, simple integrations and analytics-ready events.",
  },
  {
    id: "06",
    title: "Launch",
    icon: Code,
    text: "We verify the website, connect the agreed domain and publish the production build.",
  },
];

const pageCopy = {
  en: {
    label: "APPROACH — CONVERSION SPRINT",
    title: <>FROM PAID CLICK<br />TO A LIVE WEBSITE.</>,
    intro: "A short timeline works only when traffic, offer, decisions and implementation are handled as one connected sprint.",
    methodLabel: "METHOD — KEEP, REMOVE, REBUILD",
    methodTitle: <>WE CHANGE THE SURFACE.<br />NOT THE CORE.</>,
    methodIntro: <>Your market knowledge and real proof remain.<br />Mixed messages and weak actions do not.</>,
    keep: "KEEP", remove: "REMOVE", rebuild: "REBUILD",
    keepItems: ["Market knowledge", "Real reputation", "Existing demand"],
    removeItems: ["Mixed messages", "Weak mobile actions", "Unnecessary friction"],
    rebuildItems: ["Offer structure", "Trust path", "Lead capture"],
    timeline: ["Traffic", "Decision", "Inquiry"],
    processLabel: "Six-stage process", timelineLabel: "Intervention timeline", coreSymbol: "iPLUSgor Digital core symbol",
  },
  ua: {
    label: "ПІДХІД — CONVERSION SPRINT",
    title: <>ВІД ПЛАТНОГО КЛІКУ<br />ДО ЗАПУЩЕНОГО САЙТУ.</>,
    intro: "Короткий строк можливий, коли трафік, пропозиція, рішення та реалізація зібрані в один зв’язний спринт.",
    methodLabel: "МЕТОД — ЗБЕРЕГТИ, ПРИБРАТИ, ПЕРЕБУДУВАТИ",
    methodTitle: <>МИ ЗМІНЮЄМО ОБОЛОНКУ.<br />НЕ ЯДРО.</>,
    methodIntro: <>Ваше знання ринку й реальні докази залишаються.<br />Змішані повідомлення та слабкі дії — ні.</>,
    keep: "ЗБЕРЕГТИ", remove: "ПРИБРАТИ", rebuild: "ПЕРЕБУДУВАТИ",
    keepItems: ["Знання ринку", "Реальна репутація", "Наявний попит"],
    removeItems: ["Змішані повідомлення", "Слабкі mobile CTA", "Зайве тертя"],
    rebuildItems: ["Структура оферу", "Шлях довіри", "Збір звернень"],
    timeline: ["Трафік", "Рішення", "Звернення"],
    processLabel: "Процес із шести етапів", timelineLabel: "Послідовність втручання", coreSymbol: "Символ ядра iPLUSgor Digital",
  },
  de: {
    label: "ANSATZ — CONVERSION SPRINT",
    title: <>VOM BEZAHLTEN KLICK<br />ZUR LIVE-WEBSITE.</>,
    intro: "Ein kurzer Zeitplan funktioniert, wenn Traffic, Angebot, Entscheidungen und Umsetzung in einem verbundenen Sprint liegen.",
    methodLabel: "METHODE — BEHALTEN, ENTFERNEN, NEU AUFBAUEN",
    methodTitle: <>WIR ÄNDERN DIE OBERFLÄCHE.<br />NICHT DEN KERN.</>,
    methodIntro: <>Marktwissen und echte Belege bleiben.<br />Unklare Botschaften und schwache Aktionen nicht.</>,
    keep: "BEHALTEN", remove: "ENTFERNEN", rebuild: "NEU AUFBAUEN",
    keepItems: ["Marktwissen", "Echte Reputation", "Bestehende Nachfrage"],
    removeItems: ["Unklare Botschaften", "Schwache mobile CTAs", "Unnötige Reibung"],
    rebuildItems: ["Angebotsstruktur", "Vertrauensweg", "Lead-Erfassung"],
    timeline: ["Traffic", "Entscheidung", "Anfrage"],
    processLabel: "Prozess in sechs Phasen", timelineLabel: "Ablauf der Intervention", coreSymbol: "Kernsymbol von iPLUSgor Digital",
  },
};

const stepTranslations = {
  ua: [
    ["Розбір", "Перевіряємо поточний сайт, джерела трафіку, офер, головну дію й практичні обмеження."],
    ["Стратегія", "Визначаємо обсяг спринту, шлях конверсії й рішення, які має підтримати сторінка."],
    ["Структура", "Збираємо офер, докази, заперечення та CTA в комерційну послідовність."],
    ["Дизайн", "Створюємо деталізований mobile-first інтерфейс і переглядаємо його в погодженому обсязі."],
    ["Розробка", "Будуємо frontend, форми, прості інтеграції та події для аналітики."],
    ["Запуск", "Перевіряємо сайт, підключаємо погоджений домен і публікуємо production build."],
  ],
  de: [
    ["Review", "Wir prüfen Website, Traffic-Quellen, Angebot, Hauptaktion und praktische Rahmenbedingungen."],
    ["Strategie", "Wir definieren Sprint-Umfang, Conversion-Weg und die Entscheidungen der Seite."],
    ["Struktur", "Wir ordnen Angebot, Belege, Einwände und CTAs zu einer kommerziellen Sequenz."],
    ["Design", "Wir gestalten das detaillierte Mobile-first Interface im vereinbarten Umfang."],
    ["Umsetzung", "Wir bauen Frontend, Formulare, einfache Integrationen und Analytics-Events."],
    ["Launch", "Wir prüfen die Website, verbinden die vereinbarte Domain und veröffentlichen den Production-Build."],
  ],
};

function ProcessRail({ locale, processLabel }) {
  const [active, setActive] = useState(0);
  const steps = baseSteps.map((step, index) => {
    const translated = stepTranslations[locale]?.[index];
    return translated ? { ...step, title: translated[0], text: translated[1] } : step;
  });
  const current = steps[active];

  return (
    <div className="process-rail">
      <div className="process-rail__nodes" role="tablist" aria-label={processLabel}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="process-detail"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <span className="process-step__node">
                <Icon aria-hidden="true" />
                <strong>{step.title}</strong>
              </span>
              <span className="process-step__index">{step.id}</span>
            </button>
          );
        })}
      </div>
      <div className="process-rail__detail" id="process-detail" role="tabpanel">
        <span>{locale === "ua" ? "ЕТАП" : locale === "de" ? "SCHRITT" : "STEP"} {current.id} {locale === "ua" ? "З" : locale === "de" ? "VON" : "OF"} 06</span>
        <div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
        <ArrowRight aria-hidden="true" />
      </div>
    </div>
  );
}

export function ApproachPage() {
  const { locale } = useLocale();
  const labels = pageCopy[locale] || pageCopy.en;
  return (
    <div className="page page--approach">
      <SoftShell className="approach-hero">
        <SectionLabel>{labels.label}</SectionLabel>
        <h1>{labels.title}</h1>
        <p className="page-intro">
          {labels.intro}
        </p>
        <ProcessRail locale={locale} processLabel={labels.processLabel} />
      </SoftShell>

      <section className="method-shell" aria-labelledby="method-title">
        <SectionLabel>{labels.methodLabel}</SectionLabel>
        <h2 id="method-title">{labels.methodTitle}</h2>
        <p className="page-intro">{labels.methodIntro}</p>

        <div className="method-map">
          <MethodContour />
          <article className="method-map__zone method-map__zone--keep">
            <h3>{labels.keep}</h3>
            <Aperture className="method-map__brand-aperture" label={labels.coreSymbol}>
              <img
                src={publicAsset("assets/brand/iplusgor-symbol-signal.webp")}
                alt=""
                width="1254"
                height="1254"
                loading="eager"
                decoding="async"
                fetchPriority="low"
              />
            </Aperture>
            <ul>
              {labels.keepItems.map((item) => <li key={item}><span>{item}</span></li>)}
            </ul>
          </article>
          <article className="method-map__zone method-map__zone--remove">
            <h3>{labels.remove}</h3>
            <ul>
              {labels.removeItems.map((item) => <li key={item}><span>{item}</span></li>)}
            </ul>
          </article>
          <article className="method-map__zone method-map__zone--rebuild">
            <h3>{labels.rebuild}</h3>
            <ul>
              {labels.rebuildItems.map((item) => <li key={item}><span>{item}</span></li>)}
            </ul>
          </article>
        </div>
        <div className="method-timeline" aria-label={labels.timelineLabel}>
          {labels.timeline.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <CommercialFrame />
    </div>
  );
}
