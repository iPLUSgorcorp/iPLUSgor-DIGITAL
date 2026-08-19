import {
  ArrowsLeftRight,
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
} from "../components/ContourSystems.jsx";
import { useLocale } from "../i18n.jsx";

const solutionNodes = [
  {
    title: "Architecture",
    icon: Blueprint,
    text: "A structure built around the business, its offer and the next customer decision.",
  },
  {
    title: "Content",
    icon: CirclesThreePlus,
    text: "Clear pages, service groups and content that helps people understand the offer.",
  },
  {
    title: "Customer path",
    icon: Sparkle,
    text: "Guide visitors to the right next step instead of making them search through a deep menu.",
  },
  {
    title: "Compare",
    icon: ArrowsLeftRight,
    text: "Make the differences between services, offers or options easy to understand.",
  },
  {
    title: "Documentation",
    icon: FileText,
    text: "Bring useful information, answers and proof into the decision path.",
  },
  {
    title: "Contact routes",
    icon: Handshake,
    text: "Connect messages, calls and request forms to a clear path for the business.",
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
    text: "Prepare guided choices without making unsupported promises.",
  },
];

const solutionCopy = {
  en: {
    label: "SOLUTIONS — WEBSITE SYSTEM",
    title: <>ONE WEBSITE.<br />EVERY CUSTOMER ROUTE.</>,
    intro: "From the first impression to a clear next step.",
    footer: "STRATEGY — UX — SYSTEM — BUILD",
    explore: "Explore the solution",
    frame: "A website is strongest when business context, structure, interaction and frontend share one logic.",
    discuss: "Discuss your website",
  },
  ua: {
    label: "РІШЕННЯ — СИСТЕМА САЙТУ",
    title: <>ОДИН САЙТ.<br />УСІ ШЛЯХИ КЛІЄНТА.</>,
    intro: "Від першого враження до зрозумілого наступного кроку.",
    footer: "СТРАТЕГІЯ — UX — СИСТЕМА — РЕАЛІЗАЦІЯ",
    explore: "Дослідити рішення",
    frame: "Сайт найсильніший, коли контекст бізнесу, структура, взаємодія і frontend мають спільну логіку.",
    discuss: "Обговорити сайт",
    nodes: [
      ["Архітектура", "Структура навколо бізнесу, його пропозиції й наступного рішення клієнта."],
      ["Контент", "Зрозумілі сторінки, групи послуг і зміст, який допомагає розібратися в пропозиції."],
      ["Шлях клієнта", "Ведіть відвідувачів до потрібної дії, а не змушуйте шукати в глибокому меню."],
      ["Порівняння", "Показуйте відмінності між послугами, пропозиціями чи варіантами зрозуміло."],
      ["Корисна інформація", "Додавайте відповіді й докази у шлях прийняття рішення."],
      ["Шляхи контакту", "Об’єднуйте повідомлення, дзвінки й форми у зрозумілий шлях до бізнесу."],
      ["Frontend", "Адаптивна реалізація тією ж командою, яка проєктує UX."],
      ["Аналітика", "Готуйте змістовні точки взаємодії без вигаданих показників."],
      ["Керований вибір", "Готуйте зрозумілий вибір без непідтверджених обіцянок."],
    ],
  },
  de: {
    label: "LÖSUNGEN — WEBSITE-SYSTEM",
    title: <>EINE WEBSITE.<br />JEDER KUNDENWEG.</>,
    intro: "Vom ersten Eindruck bis zum klaren nächsten Schritt.",
    footer: "STRATEGIE — UX — SYSTEM — UMSETZUNG",
    explore: "Lösung erkunden",
    frame: "Eine Website ist am stärksten, wenn Geschäftskontext, Struktur, Interaktion und Frontend einer Logik folgen.",
    discuss: "Website besprechen",
    nodes: [
      ["Architektur", "Eine Struktur rund um das Unternehmen, sein Angebot und die nächste Entscheidung der Kunden."],
      ["Inhalte", "Klare Seiten, Leistungsgruppen und Inhalte, die das Angebot verständlich machen."],
      ["Kundenweg", "Besucher zum richtigen nächsten Schritt führen, statt sie durch tiefe Menüs suchen zu lassen."],
      ["Vergleich", "Unterschiede zwischen Leistungen, Angeboten oder Optionen verständlich machen."],
      ["Nützliche Informationen", "Antworten und Belege in den Entscheidungsweg integrieren."],
      ["Kontaktwege", "Nachrichten, Anrufe und Formulare zu einem klaren Weg zum Unternehmen verbinden."],
      ["Frontend", "Responsive Umsetzung durch dasselbe Team, das die UX entwirft."],
      ["Analyse", "Sinnvolle Interaktionspunkte vorbereiten, ohne Leistungswerte zu erfinden."],
      ["Geführte Auswahl", "Verständliche Auswahl vorbereiten, ohne unbelegte Versprechen."],
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
          <div
            className={`solution-manifold__detail ${active >= 6 ? "is-lower-branch" : "is-upper-branch"}`}
            role="tabpanel"
          >
            <span aria-hidden="true">{locale === "ua" ? "ЕТАП" : locale === "de" ? "SCHRITT" : "STEP"} 0{active + 1} {locale === "ua" ? "З" : locale === "de" ? "VON" : "OF"} 09</span>
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
