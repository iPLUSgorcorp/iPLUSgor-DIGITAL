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

const useAmbientHeroVideo = true;

const capabilities = [
  { icon: Blueprint, key: "structure" },
  { icon: Funnel, key: "ux" },
  { icon: Browser, key: "interface" },
  { icon: BracketsCurly, key: "frontend" },
];

const copy = {
  en: {
    label: "Websites + digital platforms",
    title: <>CLEAR BUSINESS<br />WEBSITES FROM<br />REVIEW TO LAUNCH.</>,
    lead: "iPLUSgor Digital is an independent Ukrainian web design and frontend team creating and modernizing clear, responsive websites for businesses.",
    review: "Get a preliminary review",
    premium: "CLEAR SCOPE — CLIENT OWNERSHIP — RESPONSIVE DELIVERY",
    capabilities: { structure: "Structure", ux: "UX", interface: "Interface system", frontend: "Frontend" },
    scroll: "See how we work",
    proofLabel: "When the business is stronger than the site",
    proofTitle: <>A WEBSITE IS NOT<br />JUST A BUSINESS CARD.<br />IT HELPS PEOPLE ACT.</>,
    proof: "We study the business, audience and next customer step before designing an interface.",
    explore: "Explore the approach",
    frame: "Business context, structure, interface and frontend are designed as one connected website.",
  },
  ua: {
    label: "Сайти + цифрові платформи",
    title: <>ЗРОЗУМІЛІ САЙТИ<br />ДЛЯ БІЗНЕСУ — ВІД<br />РОЗБОРУ ДО ЗАПУСКУ.</>,
    lead: "iPLUSgor Digital — незалежна українська команда вебдизайну та frontend-розробки, яка створює й модернізує зрозумілі адаптивні сайти для бізнесу.",
    review: "Отримати попередній розбір",
    premium: "ЧІТКИЙ ОБСЯГ — ВЛАСНІСТЬ КЛІЄНТА — АДАПТИВНА РЕАЛІЗАЦІЯ",
    capabilities: { structure: "Структура", ux: "UX", interface: "Система інтерфейсу", frontend: "Frontend" },
    scroll: "Як ми працюємо",
    proofLabel: "Коли бізнес сильніший за свій сайт",
    proofTitle: <>САЙТ — НЕ ЛИШЕ<br />ВІЗИТІВКА. ВІН ДОПОМАГАЄ<br />ЛЮДЯМ ДІЯТИ.</>,
    proof: "Ми вивчаємо бізнес, аудиторію і наступний крок клієнта до того, як проєктувати інтерфейс.",
    explore: "Дослідити підхід",
    frame: "Контекст бізнесу, структура, інтерфейс і frontend проєктуються як один зв’язний сайт.",
  },
  de: {
    label: "Websites + digitale Plattformen",
    title: <>KLARE BUSINESS-<br />WEBSITES VON DER<br />ANALYSE BIS ZUM LAUNCH.</>,
    lead: "iPLUSgor Digital ist ein unabhängiges ukrainisches Team für Webdesign und Frontend-Entwicklung, das klare responsive Websites für Unternehmen entwickelt und modernisiert.",
    review: "Vorprüfung anfragen",
    premium: "KLARER UMFANG — EIGENTUM DES KUNDEN — RESPONSIVE UMSETZUNG",
    capabilities: { structure: "Struktur", ux: "UX", interface: "Interface-System", frontend: "Frontend" },
    scroll: "Unsere Arbeitsweise",
    proofLabel: "Wenn das Unternehmen stärker ist als seine Website",
    proofTitle: <>EINE WEBSITE IST<br />MEHR ALS EINE VISITENKARTE.<br />SIE HILFT MENSCHEN HANDELN.</>,
    proof: "Wir untersuchen das Unternehmen, Zielgruppen und den nächsten Kundenschritt, bevor wir ein Interface gestalten.",
    explore: "Ansatz erkunden",
    frame: "Geschäftskontext, Struktur, Interface und Frontend werden als eine verbundene Website entwickelt.",
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
          <div className="home-hero__capabilities" aria-label="Core capabilities">
            {capabilities.map(({ icon: Icon, key }) => (
              <div key={key}>
                <Icon aria-hidden="true" weight="regular" />
                <span>{labels.capabilities[key]}</span>
              </div>
            ))}
          </div>
        </div>

        <Link className="home-hero__scroll" to="/approach">
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

      <BusinessValueFaq />

      <CommercialFrame
        text={labels.frame}
        cta={labels.review}
      />
    </div>
  );
}
