import {
  ArrowDown,
  Blueprint,
  Browser,
  BracketsCurly,
  Funnel,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  CommercialFrame,
  PrimaryCTA,
  SectionLabel,
  SoftShell,
} from "../components/Primitives.jsx";
import { useLocale } from "../i18n.jsx";
import { AmbientBrandVideo } from "../components/AmbientBrandVideo.jsx";
import { BusinessValueFaq } from "../components/BusinessValueFaq.jsx";
import { ConversionOffer } from "../components/ConversionOffer.jsx";
import { getLocalizedPath } from "../seo-metadata.js";

const useAmbientHeroVideo = true;

const capabilities = [
  { icon: Blueprint, key: "structure" },
  { icon: Funnel, key: "ux" },
  { icon: Browser, key: "interface" },
  { icon: BracketsCurly, key: "frontend" },
];

const copy = {
  en: {
    label: "Conversion websites for service businesses",
    title: <>GET MORE VALUE<br />FROM THE TRAFFIC<br />YOU ALREADY PAY FOR.</>,
    lead: "iPLUSgor builds conversion-focused websites and landing pages for roofing, HVAC, home-service, dental, medspa and legal businesses already acquiring customers.",
    review: "Request a conversion review",
    premium: "$4,000 LANDING SPRINT — $8,500 WEBSITE SPRINT — CUSTOM FROM $10,000",
    capabilities: { structure: "Structure", ux: "UX", interface: "Interface system", frontend: "Frontend" },
    capabilitiesLabel: "Core capabilities",
    scroll: "See how we work",
    proofLabel: "The expensive gap after the click",
    proofTitle: <>YOUR ADS CAN DO THEIR JOB.<br />THE WEBSITE CAN STILL<br />LOSE THE INQUIRY.</>,
    proof: "We align the offer, trust signals, mobile path, calls to action and lead capture before we polish the interface. No guaranteed outcomes — just a clearer commercial path you can measure.",
    explore: "See the sprint approach",
    frame: "Already paying for traffic? Let us show you what the website makes harder than it needs to be.",
  },
  ua: {
    label: "Конверсійні сайти для сервісного бізнесу",
    title: <>ОТРИМУЙТЕ БІЛЬШЕ<br />ЦІННОСТІ З ТРАФІКУ,<br />ЗА ЯКИЙ УЖЕ ПЛАТИТЕ.</>,
    lead: "iPLUSgor створює конверсійні сайти й лендинги для покрівельних компаній, HVAC, домашніх сервісів, стоматологій, медичних студій і юридичних практик, які вже залучають клієнтів.",
    review: "Запросити конверсійний розбір",
    premium: "ЛЕНДИНГ-СПРИНТ $4,000 — WEBSITE-СПРИНТ $8,500 — CUSTOM ВІД $10,000",
    capabilities: { structure: "Структура", ux: "UX", interface: "Система інтерфейсу", frontend: "Frontend" },
    capabilitiesLabel: "Основні можливості",
    scroll: "Як ми працюємо",
    proofLabel: "Дорога втрата після кліку",
    proofTitle: <>РЕКЛАМА МОЖЕ ПРАЦЮВАТИ.<br />САЙТ УСЕ ОДНО МОЖЕ<br />ВТРАТИТИ ЗВЕРНЕННЯ.</>,
    proof: "Спочатку узгоджуємо пропозицію, докази довіри, мобільний шлях, CTA й збір звернень — потім поліруємо інтерфейс. Без гарантій результату, зате з ясним комерційним шляхом, який можна вимірювати.",
    explore: "Подивитися процес спринту",
    frame: "Уже платите за трафік? Покажемо, де сайт ускладнює шлях до звернення.",
  },
  de: {
    label: "Conversion-Websites für Dienstleistungsunternehmen",
    title: <>MEHR WERT AUS DEM<br />TRAFFIC, FÜR DEN SIE<br />BEREITS BEZAHLEN.</>,
    lead: "iPLUSgor entwickelt conversion-orientierte Websites und Landingpages für Dachdecker, HVAC- und Hausservice-Betriebe, Zahnarztpraxen, Medical Spas und Kanzleien mit aktiver Kundengewinnung.",
    review: "Conversion-Review anfragen",
    premium: "LANDING SPRINT $4,000 — WEBSITE SPRINT $8,500 — CUSTOM AB $10,000",
    capabilities: { structure: "Struktur", ux: "UX", interface: "Interface-System", frontend: "Frontend" },
    capabilitiesLabel: "Kernkompetenzen",
    scroll: "Unsere Arbeitsweise",
    proofLabel: "Die teure Lücke nach dem Klick",
    proofTitle: <>DIE ANZEIGE KANN FUNKTIONIEREN.<br />DIE WEBSITE KANN DIE<br />ANFRAGE TROTZDEM VERLIEREN.</>,
    proof: "Wir ordnen Angebot, Vertrauensbelege, mobilen Weg, CTAs und Lead-Erfassung, bevor wir das Interface verfeinern. Keine Ergebnisgarantie — dafür ein klarer, messbarer kommerzieller Weg.",
    explore: "Sprint-Ansatz ansehen",
    frame: "Sie bezahlen bereits für Traffic? Wir zeigen, wo die Website den Weg zur Anfrage unnötig erschwert.",
  },
};

export function HomePage() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;
  return (
    <div className="page page--home">
      <SoftShell className={`home-hero ${useAmbientHeroVideo ? "home-hero--ambient" : ""}`}>
        {useAmbientHeroVideo && (
          <AmbientBrandVideo className="home-hero__ambient" priority />
        )}
        <div className="home-hero__copy">
          <SectionLabel>{labels.label}</SectionLabel>
          <h1>{labels.title}</h1>
          <p className="home-hero__lead">
            {labels.lead}
          </p>
          <div className="home-hero__actions">
            <PrimaryCTA>{labels.review}</PrimaryCTA>
            <p>
              <strong>{labels.premium}</strong>
            </p>
          </div>
          <div className="home-hero__capabilities" aria-label={labels.capabilitiesLabel}>
            {capabilities.map(({ icon: Icon, key }) => (
              <div key={key}>
                <Icon aria-hidden="true" weight="regular" />
                <span>{labels.capabilities[key]}</span>
              </div>
            ))}
          </div>
        </div>

        <Link className="home-hero__scroll" to={getLocalizedPath("/approach", locale)}>
          {labels.scroll}
          <ArrowDown aria-hidden="true" />
        </Link>
      </SoftShell>

      <section className="home-proof" aria-labelledby="home-proof-title">
        <SectionLabel>{labels.proofLabel}</SectionLabel>
        <h2 id="home-proof-title">{labels.proofTitle}</h2>
        <div className="home-proof__body">
          <p>
            {labels.proof}
          </p>
          <PrimaryCTA to="/approach" tone="jade">
            {labels.explore}
          </PrimaryCTA>
        </div>
      </section>

      <ConversionOffer />

      <BusinessValueFaq />

      <CommercialFrame
        text={labels.frame}
        cta={labels.review}
      />
    </div>
  );
}
