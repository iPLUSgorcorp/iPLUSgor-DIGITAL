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
    title: "Evidence",
    icon: MagnifyingGlass,
    text: "We inspect the current site, business goals, customer routes and practical constraints.",
  },
  {
    id: "02",
    title: "Architecture",
    icon: Blueprint,
    text: "We shape the information structure around real customer decisions.",
  },
  {
    id: "03",
    title: "Content",
    icon: Stack,
    text: "We define the content, pages and calls to action people need to move forward.",
  },
  {
    id: "04",
    title: "UX system",
    icon: Path,
    text: "We turn the route into responsive flows for people who need to understand and contact the business.",
  },
  {
    id: "05",
    title: "Interface",
    icon: Browsers,
    text: "We create a visual system that makes the business feel clear, coherent and recognisable.",
  },
  {
    id: "06",
    title: "Frontend",
    icon: Code,
    text: "We build and verify the adaptive frontend instead of stopping at static layouts.",
  },
];

const pageCopy = {
  en: {
    label: "APPROACH — SIX STAGES",
    title: <>FROM EVIDENCE<br />TO A WORKING SYSTEM.</>,
    intro: "We do not begin with a new home page. We begin with the business goal and the customer path behind it.",
    methodLabel: "METHOD — KEEP, REMOVE, REBUILD",
    methodTitle: <>WE CHANGE THE SURFACE.<br />NOT THE CORE.</>,
    methodIntro: <>Reputation and technical expertise remain.<br />Digital barriers do not.</>,
    keep: "KEEP", remove: "REMOVE", rebuild: "REBUILD",
    keepItems: ["Brand expertise", "Documents + 3D", "Recognition"],
    removeItems: ["Dead ends", "Broken mobile paths", "Hidden specifications"],
    rebuildItems: ["Architecture", "Product choice", "Frontend"],
    timeline: ["Symptom", "Evidence", "Intervention"],
  },
  ua: {
    label: "ПІДХІД — ШІСТЬ ЕТАПІВ",
    title: <>ВІД ДОКАЗІВ<br />ДО РОБОЧОЇ СИСТЕМИ.</>,
    intro: "Ми починаємо не з нової головної сторінки, а з бізнес-цілі й шляху клієнта за нею.",
    methodLabel: "МЕТОД — ЗБЕРЕГТИ, ПРИБРАТИ, ПЕРЕБУДУВАТИ",
    methodTitle: <>МИ ЗМІНЮЄМО ОБОЛОНКУ.<br />НЕ ЯДРО.</>,
    methodIntro: <>Репутація і технічна експертиза залишаються.<br />Цифрові бар’єри — ні.</>,
    keep: "ЗБЕРЕГТИ", remove: "ПРИБРАТИ", rebuild: "ПЕРЕБУДУВАТИ",
    keepItems: ["Експертиза бренду", "Документи + 3D", "Впізнаваність"],
    removeItems: ["Глухі кути", "Зламані мобільні шляхи", "Приховані характеристики"],
    rebuildItems: ["Архітектура", "Вибір продукту", "Frontend"],
    timeline: ["Симптом", "Доказ", "Втручання"],
  },
  de: {
    label: "ANSATZ — SECHS PHASEN",
    title: <>VON DER EVIDENZ<br />ZUM FUNKTIONIERENDEN SYSTEM.</>,
    intro: "Wir beginnen nicht mit einer neuen Startseite, sondern mit dem Geschäftsziel und dem Weg der Kunden dorthin.",
    methodLabel: "METHODE — BEHALTEN, ENTFERNEN, NEU AUFBAUEN",
    methodTitle: <>WIR ÄNDERN DIE OBERFLÄCHE.<br />NICHT DEN KERN.</>,
    methodIntro: <>Ruf und technisches Know-how bleiben.<br />Digitale Barrieren nicht.</>,
    keep: "BEHALTEN", remove: "ENTFERNEN", rebuild: "NEU AUFBAUEN",
    keepItems: ["Markenkompetenz", "Dokumente + 3D", "Wiedererkennung"],
    removeItems: ["Sackgassen", "Defekte mobile Wege", "Verborgene Spezifikationen"],
    rebuildItems: ["Architektur", "Produktauswahl", "Frontend"],
    timeline: ["Symptom", "Evidenz", "Intervention"],
  },
};

const stepTranslations = {
  ua: [
    ["Докази", "Перевіряємо поточний сайт, цілі бізнесу, маршрути користувачів і практичні обмеження."],
    ["Архітектура", "Будуємо інформаційну структуру навколо реальних рішень клієнта."],
    ["Контент", "Визначаємо зміст, сторінки й точки контакту, які допомагають рухатися далі."],
    ["UX-система", "Перетворюємо маршрут на адаптивні сценарії для людей, які знайомляться з бізнесом."],
    ["Інтерфейс", "Створюємо візуальну систему, яка робить бізнес зрозумілим, цілісним і впізнаваним."],
    ["Frontend", "Будуємо та перевіряємо адаптивний frontend, а не зупиняємося на статичних макетах."],
  ],
  de: [
    ["Evidenz", "Wir prüfen die bestehende Website, Geschäftsziele, Nutzerwege und praktische Rahmenbedingungen."],
    ["Architektur", "Wir bauen die Informationsstruktur rund um echte Entscheidungen der Kunden auf."],
    ["Inhalte", "Wir definieren Inhalte, Seiten und Kontaktpunkte, die Menschen weiterbringen."],
    ["UX-System", "Wir formen den Weg zu responsiven Abläufen für Menschen, die das Unternehmen verstehen und kontaktieren möchten."],
    ["Interface", "Wir gestalten ein visuelles System, das das Unternehmen klar, stimmig und wiedererkennbar macht."],
    ["Frontend", "Wir bauen und prüfen das responsive Frontend, statt bei statischen Layouts aufzuhören."],
  ],
};

function ProcessRail({ locale }) {
  const [active, setActive] = useState(0);
  const steps = baseSteps.map((step, index) => {
    const translated = stepTranslations[locale]?.[index];
    return translated ? { ...step, title: translated[0], text: translated[1] } : step;
  });
  const current = steps[active];

  return (
    <div className="process-rail">
      <div className="process-rail__nodes" role="tablist" aria-label="Six-stage process">
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
        <ProcessRail locale={locale} />
      </SoftShell>

      <section className="method-shell" aria-labelledby="method-title">
        <SectionLabel>{labels.methodLabel}</SectionLabel>
        <h2 id="method-title">{labels.methodTitle}</h2>
        <p className="page-intro">{labels.methodIntro}</p>

        <div className="method-map">
          <MethodContour />
          <article className="method-map__zone method-map__zone--keep">
            <h3>{labels.keep}</h3>
            <Aperture className="method-map__brand-aperture" label="iPLUSgor Digital technical core symbol">
              <img
                src={publicAsset("assets/brand/iplusgor-symbol-signal.png")}
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
        <div className="method-timeline" aria-label="Intervention timeline">
          {labels.timeline.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <CommercialFrame />
    </div>
  );
}
