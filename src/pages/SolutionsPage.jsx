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
    title: "Traffic context",
    icon: Blueprint,
    text: "Connect the page to the campaign, service and intent that brought the visitor there.",
  },
  {
    title: "Offer clarity",
    icon: CirclesThreePlus,
    text: "Make the service, value and relevant next step clear before attention is lost.",
  },
  {
    title: "Trust path",
    icon: Sparkle,
    text: "Place real proof, process and objection handling where a buyer needs them.",
  },
  {
    title: "CTA hierarchy",
    icon: ArrowsLeftRight,
    text: "Give calls, forms and booking actions a clear hierarchy instead of equal visual weight.",
  },
  {
    title: "Lead capture",
    icon: FileText,
    text: "Ask for the minimum useful information and prepare a reliable handoff to the business.",
  },
  {
    title: "Mobile UX",
    icon: Handshake,
    text: "Protect readability, tap targets and the primary action across real mobile widths.",
  },
  {
    title: "Frontend",
    icon: Code,
    text: "Build the responsive interface with the same commercial logic approved in design.",
  },
  {
    title: "Analytics",
    icon: ChartLineUp,
    text: "Prepare CTA, form and booking events for measurement without claiming future results.",
  },
  {
    title: "Launch",
    icon: Path,
    text: "Verify core journeys, performance and domain configuration before the site receives traffic.",
  },
];

const solutionCopy = {
  en: {
    label: "SERVICES — CONVERSION SYSTEM",
    title: <>FROM PAID CLICK.<br />TO QUALIFIED INQUIRY.</>,
    intro: "Nine connected decisions inside one focused landing page or commercial website.",
    footer: "TRAFFIC — OFFER — TRUST — CTA — LEAD",
    explore: "Request a conversion review",
    frame: "If traffic already reaches the site, the next question is where clarity, trust or action breaks down.",
    discuss: "Review my website",
    systemLabel: "Conversion website system",
  },
  ua: {
    label: "ПОСЛУГИ — КОНВЕРСІЙНА СИСТЕМА",
    title: <>ВІД ПЛАТНОГО КЛІКУ.<br />ДО КВАЛІФІКОВАНОГО ЗВЕРНЕННЯ.</>,
    intro: "Дев’ять пов’язаних рішень в одній сфокусованій landing page або комерційному сайті.",
    footer: "ТРАФІК — ОФЕР — ДОВІРА — CTA — ЛІД",
    explore: "Запросити conversion review",
    frame: "Якщо трафік уже приходить на сайт, варто знайти місце, де ламається ясність, довіра або дія.",
    discuss: "Перевірити мій сайт",
    systemLabel: "Система конверсійного сайту",
    nodes: [
      ["Контекст трафіку", "Пов’язуємо сторінку з кампанією, послугою та наміром, які привели відвідувача."],
      ["Ясність оферу", "Пояснюємо послугу, цінність і наступний крок до втрати уваги."],
      ["Шлях довіри", "Розміщуємо реальні докази, процес і відповіді там, де вони потрібні покупцеві."],
      ["Ієрархія CTA", "Дзвінки, форми й запис отримують чітку ієрархію замість однакової ваги."],
      ["Збір звернень", "Запитуємо мінімум корисної інформації й готуємо надійну передачу бізнесу."],
      ["Мобільний UX", "Зберігаємо читабельність, touch targets і головну дію на реальних mobile widths."],
      ["Frontend", "Реалізуємо адаптивний інтерфейс із погодженою комерційною логікою."],
      ["Аналітика", "Готуємо події CTA, форми й booking без прогнозування майбутнього результату."],
      ["Запуск", "Перевіряємо основні сценарії, швидкість і домен до прийому трафіку."],
    ],
  },
  de: {
    label: "LEISTUNGEN — CONVERSION-SYSTEM",
    title: <>VOM BEZAHLTEN KLICK.<br />ZUR QUALIFIZIERTEN ANFRAGE.</>,
    intro: "Neun verbundene Entscheidungen in einer fokussierten Landingpage oder kommerziellen Website.",
    footer: "TRAFFIC — ANGEBOT — VERTRAUEN — CTA — LEAD",
    explore: "Conversion-Review anfragen",
    frame: "Wenn Traffic bereits die Website erreicht, gilt es zu finden, wo Klarheit, Vertrauen oder Aktion abreißen.",
    discuss: "Website prüfen lassen",
    systemLabel: "Conversion-Website-System",
    nodes: [
      ["Traffic-Kontext", "Seite, Kampagne, Leistung und Besucherabsicht miteinander verbinden."],
      ["Klares Angebot", "Leistung, Wert und nächsten Schritt erklären, bevor Aufmerksamkeit verloren geht."],
      ["Vertrauensweg", "Echte Belege, Prozess und Einwände dort platzieren, wo Käufer sie brauchen."],
      ["CTA-Hierarchie", "Anrufe, Formulare und Buchung klar gewichten, statt sie konkurrieren zu lassen."],
      ["Lead-Erfassung", "Nur nützliche Informationen abfragen und zuverlässig an das Unternehmen übergeben."],
      ["Mobile UX", "Lesbarkeit, Touch-Flächen und Hauptaktion auf echten mobilen Breiten schützen."],
      ["Frontend", "Das responsive Interface mit der freigegebenen kommerziellen Logik umsetzen."],
      ["Analyse", "CTA-, Formular- und Buchungsereignisse vorbereiten, ohne Ergebnisse zu versprechen."],
      ["Launch", "Kernabläufe, Tempo und Domain prüfen, bevor Traffic auf die Website kommt."],
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
            aria-label={labels.systemLabel}
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
          <PrimaryCTA to="/start-project" tone="jade">
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
