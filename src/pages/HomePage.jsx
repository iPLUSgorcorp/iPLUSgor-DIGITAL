import {
  ArrowDown,
  Blueprint,
  Browser,
  BracketsCurly,
  Funnel,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  Aperture,
  CommercialFrame,
  PrimaryCTA,
  SectionLabel,
  SoftShell,
} from "../components/Primitives.jsx";
import { useLocale } from "../i18n.jsx";
import { publicAsset } from "../lib/publicAsset.js";
import { AmbientBrandVideo } from "../components/AmbientBrandVideo.jsx";

const useAmbientHeroVideo = true;
const showIndustrialFallback = false;

const capabilities = [
  { icon: Blueprint, label: "Structure" },
  { icon: Funnel, label: "Catalogue UX" },
  { icon: Browser, label: "Interface system" },
  { icon: BracketsCurly, label: "Frontend" },
];

const copy = {
  en: {
    label: "Industrial platform modernization",
    title: <>CLEAR DIGITAL<br />PLATFORMS FOR<br />COMPLEX EQUIPMENT.</>,
    lead: "iPLUSgor Digital turns outdated industrial websites into clear platforms for product selection, sales and dealer workflows.",
    review: "Get a preliminary review",
    premium: "SELECTIVE INDUSTRIAL PLATFORM ENGAGEMENTS",
    scroll: "See how we work",
    proofLabel: "When the company is stronger than the site",
    proofTitle: <>THE CATALOGUE IS NOT<br />A FILE ARCHIVE. IT IS<br />A SALES SYSTEM.</>,
    proof: "We study the business, product logic, customer route and technical constraints before drawing a new interface.",
    explore: "Explore the system",
    frame: "Structure, catalogue UX and frontend are designed as one modernization system.",
  },
  ua: {
    label: "Модернізація промислових платформ",
    title: <>ЗРОЗУМІЛІ ЦИФРОВІ<br />ПЛАТФОРМИ ДЛЯ<br />СКЛАДНОГО ОБЛАДНАННЯ.</>,
    lead: "iPLUSgor Digital перетворює застарілі промислові сайти на зрозумілі платформи для вибору продукту, продажів і дилерських процесів.",
    review: "Отримати попередній розбір",
    premium: "ВИБІРКОВІ ПРОЄКТИ ПРОМИСЛОВИХ ПЛАТФОРМ",
    scroll: "Як ми працюємо",
    proofLabel: "Коли компанія сильніша за свій сайт",
    proofTitle: <>КАТАЛОГ — НЕ<br />АРХІВ ФАЙЛІВ. ЦЕ<br />СИСТЕМА ПРОДАЖІВ.</>,
    proof: "Ми вивчаємо бізнес, логіку продукту, шлях клієнта й технічні обмеження до того, як проєктувати новий інтерфейс.",
    explore: "Дослідити систему",
    frame: "Структура, UX каталогу та frontend проєктуються як єдина система модернізації.",
  },
  de: {
    label: "Modernisierung industrieller Plattformen",
    title: <>KLARE DIGITALE<br />PLATTFORMEN FÜR<br />KOMPLEXE TECHNIK.</>,
    lead: "iPLUSgor Digital verwandelt veraltete Industriewebsites in klare Plattformen für Produktauswahl, Vertrieb und Händlerprozesse.",
    review: "Vorprüfung anfragen",
    premium: "AUSGEWÄHLTE INDUSTRIELLE PLATTFORMPROJEKTE",
    scroll: "Unsere Arbeitsweise",
    proofLabel: "Wenn das Unternehmen stärker ist als seine Website",
    proofTitle: <>DER KATALOG IST<br />KEIN DATEIARCHIV.<br />ER IST EIN VERTRIEBSSYSTEM.</>,
    proof: "Wir untersuchen Geschäft, Produktlogik, Kundenweg und technische Grenzen, bevor wir eine neue Oberfläche entwerfen.",
    explore: "System erkunden",
    frame: "Struktur, Katalog-UX und Frontend werden als ein Modernisierungssystem entworfen.",
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
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label}>
                <Icon aria-hidden="true" weight="regular" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {showIndustrialFallback && (
          <div className="home-hero__visual" aria-label="Industrial core held inside a soft shell">
            <p className="home-hero__idea">SOFT SHELL / HARD CORE</p>
            <Aperture label="Precision industrial component">
              <img
                src={publicAsset("assets/brand/iplusgor-industrial-core.png")}
                width="900"
                height="922"
                alt="Precision-machined industrial component"
              />
            </Aperture>
            <p className="home-hero__principle">
              We change the surface.
              <br />
              Not the core.
            </p>
          </div>
        )}

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
          <PrimaryCTA to="/solutions" tone="jade">
            {labels.explore}
          </PrimaryCTA>
        </div>
      </section>

      <CommercialFrame
        text={labels.frame}
        cta={labels.review}
      />
    </div>
  );
}
