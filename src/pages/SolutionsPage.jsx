import {
  ArrowsLeftRight,
  ArrowRight,
  Blueprint,
  ChartLineUp,
  CirclesThreePlus,
  Code,
  FileText,
  Handshake,
  Path,
  Sparkle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import {
  CommercialFrame,
  PrimaryCTA,
  SectionLabel,
  SoftShell,
} from "../components/Primitives.jsx";
import {
  PageFrameContour,
  SolutionContour,
} from "../components/ContourSystems.jsx";
import { useLocale } from "../i18n.jsx";

const solutionNodes = [
  {
    title: "Architecture",
    icon: Blueprint,
    text: "A structure built around equipment, applications and buyer decisions.",
  },
  {
    title: "Catalogue",
    icon: CirclesThreePlus,
    text: "Clear categories, product families and scalable technical content.",
  },
  {
    title: "Product finder",
    icon: Sparkle,
    text: "Match equipment to an application, not to menu depth.",
  },
  {
    title: "Compare",
    icon: ArrowsLeftRight,
    text: "Expose the differences that make an engineering choice possible.",
  },
  {
    title: "Documentation",
    icon: FileText,
    text: "Bring manuals, drawings and certifications into the buying route.",
  },
  {
    title: "Dealer routes",
    icon: Handshake,
    text: "Connect local sales and dealer workflows to a single product system.",
  },
  {
    title: "Frontend",
    icon: Code,
    text: "A responsive implementation designed by the same team as the UX.",
  },
  {
    title: "Analytics",
    icon: ChartLineUp,
    text: "Prepare meaningful interaction points without inventing performance claims.",
  },
  {
    title: "AI selection",
    icon: Path,
    text: "Prepare guided selection without making unsupported product claims.",
  },
];

const solutionCopy = {
  en: {
    label: "Solutions / platform system",
    title: <>ONE PLATFORM.<br />EVERY INDUSTRIAL ROUTE.</>,
    intro: "From the first category to the final technical request.",
    footer: "STRATEGY / UX / SYSTEM / BUILD",
    explore: "Explore the solution",
    frame: "A platform is strongest when product structure, interaction and frontend share one logic.",
    discuss: "Discuss your platform",
  },
  ua: {
    label: "Рішення / система платформи",
    title: <>ОДНА ПЛАТФОРМА.<br />УСІ ПРОМИСЛОВІ МАРШРУТИ.</>,
    intro: "Від першої категорії до фінального технічного запиту.",
    footer: "СТРАТЕГІЯ / UX / СИСТЕМА / РЕАЛІЗАЦІЯ",
    explore: "Дослідити рішення",
    frame: "Платформа найсильніша, коли структура продукту, взаємодія і frontend мають спільну логіку.",
    discuss: "Обговорити платформу",
    nodes: [
      ["Архітектура", "Структура навколо обладнання, застосувань і рішень покупця."],
      ["Каталог", "Зрозумілі категорії, продуктові сімейства й масштабований технічний контент."],
      ["Пошук продукту", "Підбирайте обладнання під застосування, а не під глибину меню."],
      ["Порівняння", "Показуйте відмінності, необхідні для інженерного вибору."],
      ["Документація", "Вбудовуйте інструкції, креслення й сертифікати у шлях покупки."],
      ["Дилерські шляхи", "Об’єднуйте локальні продажі й дилерські процеси в одну продуктову систему."],
      ["Frontend", "Адаптивна реалізація тією ж командою, яка проєктує UX."],
      ["Аналітика", "Готуйте змістовні точки взаємодії без вигаданих показників."],
      ["AI-підбір", "Готуйте керований підбір без непідтверджених тверджень про продукт."],
    ],
  },
  de: {
    label: "Lösungen / Plattformsystem",
    title: <>EINE PLATTFORM.<br />JEDER INDUSTRIELLE WEG.</>,
    intro: "Von der ersten Kategorie bis zur finalen technischen Anfrage.",
    footer: "STRATEGIE / UX / SYSTEM / UMSETZUNG",
    explore: "Lösung erkunden",
    frame: "Eine Plattform ist am stärksten, wenn Produktstruktur, Interaktion und Frontend einer Logik folgen.",
    discuss: "Plattform besprechen",
    nodes: [
      ["Architektur", "Eine Struktur rund um Anlagen, Anwendungen und Kaufentscheidungen."],
      ["Katalog", "Klare Kategorien, Produktfamilien und skalierbare technische Inhalte."],
      ["Produktfinder", "Anlagen nach Anwendung auswählen, nicht nach Menütiefe."],
      ["Vergleich", "Unterschiede sichtbar machen, die eine technische Entscheidung ermöglichen."],
      ["Dokumentation", "Handbücher, Zeichnungen und Zertifikate in den Kaufweg integrieren."],
      ["Händlerwege", "Lokale Vertriebs- und Händlerabläufe in einem Produktsystem verbinden."],
      ["Frontend", "Responsive Umsetzung durch dasselbe Team, das die UX entwirft."],
      ["Analyse", "Sinnvolle Interaktionspunkte vorbereiten, ohne Leistungswerte zu erfinden."],
      ["KI-Auswahl", "Geführte Auswahl vorbereiten, ohne unbelegte Produktversprechen."],
    ],
  },
};

export function SolutionsPage() {
  const { locale } = useLocale();
  const labels = solutionCopy[locale] || solutionCopy.en;
  const localizedNodes = solutionNodes.map((node, index) => labels.nodes?.[index]
    ? { ...node, title: labels.nodes[index][0], text: labels.nodes[index][1] }
    : node);
  const [active, setActive] = useState(2);
  const selected = localizedNodes[active];
  const SelectedIcon = selected.icon;
  const railRef = useRef(null);

  useEffect(() => {
    const rail = railRef.current;
    const activeTab = rail?.querySelector('[aria-selected="true"]');
    if (!rail || !activeTab || rail.scrollWidth <= rail.clientWidth) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const targetLeft = activeTab.offsetLeft - (rail.clientWidth - activeTab.offsetWidth) / 2;
      rail.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div className="page page--solutions">
      <SoftShell className="solutions-hero">
        <PageFrameContour variant="solutions" />
        <SectionLabel>{labels.label}</SectionLabel>
        <h1>{labels.title}</h1>
        <p className="page-intro">{labels.intro}</p>

        <div className="solution-manifold">
          <SolutionContour />
          <div
            ref={railRef}
            className="solution-manifold__rail"
            role="tablist"
            aria-label="Solution system"
          >
            {localizedNodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.title}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  className={active === index ? "is-active" : ""}
                  onClick={() => setActive(index)}
                >
                  <small className="solution-manifold__node-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </small>
                  <Icon aria-hidden="true" />
                  <span>{node.title}</span>
                </button>
              );
            })}
          </div>
          <div className="solution-manifold__arrows" aria-hidden="true">
            <ArrowRight />
            <ArrowRight />
            <ArrowRight />
            <ArrowRight />
            <ArrowRight />
            <ArrowRight />
          </div>
          <div
            className={`solution-manifold__detail ${active >= 6 ? "is-lower-branch" : "is-upper-branch"}`}
            role="tabpanel"
          >
            <span aria-hidden="true">0{active + 1} / 09</span>
            <SelectedIcon aria-hidden="true" weight="thin" />
            <div>
              <p>{selected.title}</p>
              <h2>{selected.text}</h2>
            </div>
          </div>
        </div>

        <div className="solutions-hero__footer">
          <p>{labels.footer}</p>
          <PrimaryCTA to="/solutions/catalogue" tone="jade">
            {labels.explore}
          </PrimaryCTA>
        </div>
      </SoftShell>

      <CommercialFrame
        text={labels.frame}
        cta={labels.discuss}
      />
    </div>
  );
}
