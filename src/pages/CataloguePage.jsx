import {
  ArrowRight,
  Check,
  FileText,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { publicAsset } from "../lib/publicAsset.js";
import {
  CommercialFrame,
  SoftShell,
  StatusBadge,
} from "../components/Primitives.jsx";
import { CatalogueFilterPanel } from "../components/CatalogueFilterPanel.jsx";
import { useLocale } from "../i18n.jsx";

const products = [
  {
    id: "a",
    model: "MODEL A",
    application: "space",
    power: 18,
    range: "10 – 20 kW",
    installation: "Wall-mounted",
    feature: "Compact footprint",
    docs: true,
    available: true,
  },
  {
    id: "b",
    model: "MODEL B",
    application: "water",
    power: 30,
    range: "20 – 35 kW",
    installation: "Wall-mounted",
    feature: "High efficiency",
    docs: true,
    available: true,
  },
  {
    id: "c",
    model: "MODEL C",
    application: "process",
    power: 45,
    range: "35 – 50 kW",
    installation: "Floor-standing",
    feature: "Service access",
    docs: true,
    available: true,
  },
];

const catalogueCopy = {
  en: {
    label: "SOLUTION DEMO — CATALOGUE",
    title: <>MAKE COMPLEX<br />PRODUCTS EASIER TO CHOOSE.</>,
    intro: "Clear categories, relevant filters and technical evidence in one buying path.",
    filters: "Product filters", application: "Application", allApplications: "All",
    spaceHeating: "Space heating", waterHeating: "Water heating", processHeat: "Process heat",
    power: "Power range", installation: "Installation",
    documentation: "Documentation", technical: "Technical data", availability: "Availability", stock: "In stock",
    reset: "Reset filters", model: "Model", feature: "Key feature", added: "Added", compare: "Compare",
    selectedShort: "Selected",
    empty: "No interface examples match this combination.", all: "Show all examples",
    selected: "selected models", demo: "INTERFACE EXAMPLE — NOT CLIENT DATA",
    why: "WHY THIS DEMO EXISTS",
    whyText: "It demonstrates how filters, comparison and technical evidence can turn a dense product archive into a guided selection route. The models are interface examples, not client or product data.",
    frame: "A catalogue that shortens the path from specification to the right product.",
    discuss: "Discuss your catalogue",
  },
  ua: {
    label: "ДЕМОНСТРАЦІЯ РІШЕННЯ — КАТАЛОГ",
    title: <>СПРОСТІТЬ ВИБІР<br />СКЛАДНИХ ПРОДУКТІВ.</>,
    intro: "Зрозумілі категорії, доречні фільтри й технічні докази в одному шляху покупки.",
    filters: "Фільтри продукту", application: "Застосування", allApplications: "Усі",
    spaceHeating: "Опалення приміщень", waterHeating: "Нагрів води", processHeat: "Промислове тепло",
    power: "Діапазон потужності", installation: "Монтаж",
    documentation: "Документація", technical: "Технічні дані", availability: "Наявність", stock: "В наявності",
    reset: "Скинути фільтри", model: "Модель", feature: "Ключова властивість", added: "Додано", compare: "Порівняти",
    selectedShort: "Обрано",
    empty: "Цій комбінації не відповідає жоден приклад.", all: "Показати всі приклади",
    selected: "обрані моделі", demo: "ПРИКЛАД ІНТЕРФЕЙСУ — НЕ ДАНІ КЛІЄНТА",
    why: "НАВІЩО ЦЯ ДЕМОНСТРАЦІЯ",
    whyText: "Вона показує, як фільтри, порівняння й технічні докази перетворюють щільний архів продуктів на керований шлях вибору. Моделі — приклади інтерфейсу, а не дані клієнта чи продукту.",
    frame: "Каталог, який скорочує шлях від специфікації до правильного продукту.",
    discuss: "Обговорити ваш каталог",
  },
  de: {
    label: "LÖSUNGSDEMO — KATALOG",
    title: <>KOMPLEXE PRODUKTE<br />EINFACHER AUSWÄHLEN.</>,
    intro: "Klare Kategorien, relevante Filter und technische Evidenz in einem Kaufweg.",
    filters: "Produktfilter", application: "Anwendung", allApplications: "Alle",
    spaceHeating: "Raumheizung", waterHeating: "Warmwasser", processHeat: "Prozesswärme",
    power: "Leistungsbereich", installation: "Installation",
    documentation: "Dokumentation", technical: "Technische Daten", availability: "Verfügbarkeit", stock: "Auf Lager",
    reset: "Filter zurücksetzen", model: "Modell", feature: "Hauptmerkmal", added: "Hinzugefügt", compare: "Vergleichen",
    selectedShort: "Ausgewählt",
    empty: "Keine Interface-Beispiele entsprechen dieser Kombination.", all: "Alle Beispiele zeigen",
    selected: "ausgewählte Modelle", demo: "INTERFACE-BEISPIEL — KEINE KUNDENDATEN",
    why: "WARUM DIESE DEMO EXISTIERT",
    whyText: "Sie zeigt, wie Filter, Vergleich und technische Evidenz ein dichtes Produktarchiv in einen geführten Auswahlweg verwandeln. Die Modelle sind Interface-Beispiele, keine Kunden- oder Produktdaten.",
    frame: "Ein Katalog, der den Weg von der Spezifikation zum richtigen Produkt verkürzt.",
    discuss: "Katalog besprechen",
  },
};

function ProductSilhouette({ variant }) {
  return (
    <div className={`product-silhouette product-silhouette--${variant}`} aria-hidden="true">
      <img
        src={publicAsset(`assets/reference/catalogue-model-${variant}.webp`)}
        alt=""
        width="140"
        height="140"
        loading="eager"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}

export function CataloguePage() {
  const { locale } = useLocale();
  const labels = catalogueCopy[locale] || catalogueCopy.en;
  const [application, setApplication] = useState("all");
  const [power, setPower] = useState("all");
  const [installation, setInstallation] = useState("all");
  const [documentationOnly, setDocumentationOnly] = useState(false);
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [compared, setCompared] = useState(["a", "b", "c"]);
  const [comparisonRequested, setComparisonRequested] = useState(false);
  const [labelLead, labelTail] = labels.label.split("—").map((part) => part.trim());

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const applicationMatch =
          application === "all" || product.application === application;
        const powerMatch =
          power === "all" ||
          (power === "low" && product.power <= 20) ||
          (power === "medium" && product.power > 20 && product.power <= 35) ||
          (power === "high" && product.power > 35);
        const installationMatch =
          installation === "all" || product.installation === installation;
        return (
          applicationMatch &&
          powerMatch &&
          installationMatch &&
          (!documentationOnly || product.docs) &&
          (!availabilityOnly || product.available)
        );
      }),
    [application, availabilityOnly, documentationOnly, installation, power],
  );

  function toggleCompare(id) {
    setCompared((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );
  }

  return (
    <div className="page page--catalogue">
      <SoftShell className="catalogue-shell">
        <div className="catalogue-kicker" aria-label={labels.label}>
          <span>{labelLead}</span>
          <strong>{labelTail}</strong>
        </div>
        <h1>{labels.title}</h1>
        <p className="page-intro">{labels.intro}</p>

        <div className="catalogue-demo">
          <CatalogueFilterPanel
            application={application}
            availabilityOnly={availabilityOnly}
            documentationOnly={documentationOnly}
            installation={installation}
            labels={labels}
            power={power}
            setApplication={setApplication}
            setAvailabilityOnly={setAvailabilityOnly}
            setDocumentationOnly={setDocumentationOnly}
            setInstallation={setInstallation}
            setPower={setPower}
          />

          <div className="catalogue-results">
            <div className="catalogue-results__head" aria-hidden="true">
              <span className="catalogue-results__model-head">{labels.model}</span>
              <span>{labels.power}</span>
              <span>{labels.installation}</span>
              <span>{labels.feature}</span>
              <span>{labels.documentation}</span>
              <span>{labels.availability}</span>
              <span>{labels.compare}</span>
            </div>
            <div className="catalogue-results__list" aria-live="polite">
              {filtered.length ? (
                filtered.map((product) => {
                  const isCompared = compared.includes(product.id);
                  return (
                    <article className="catalogue-row" key={product.id}>
                      <ProductSilhouette variant={product.id} />
                      <h2>{product.model}</h2>
                      <div className="catalogue-row__specs">
                        <p>{product.range}</p>
                        <p>{product.installation}</p>
                        <p>{product.feature}</p>
                      </div>
                      <span className="catalogue-row__document" aria-label="Technical documentation available">
                        <FileText aria-hidden="true" />
                      </span>
                      <span className="catalogue-row__availability" aria-label="Available">
                        <Check aria-hidden="true" />
                      </span>
                      <button
                        type="button"
                        className={`catalogue-row__compare ${isCompared ? "is-active" : ""}`}
                        aria-pressed={isCompared}
                        onClick={() => toggleCompare(product.id)}
                      >
                        <Check aria-hidden="true" />
                        <span>{isCompared ? labels.added : labels.compare}</span>
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="catalogue-empty">
                  <p>{labels.empty}</p>
                  <button type="button" onClick={() => setPower("all")}>
                    {labels.all}
                  </button>
                </div>
              )}
            </div>
            <div className="catalogue-compare-footer" aria-live="polite">
              <strong>{labels.selectedShort} {compared.length}</strong>
              <button
                type="button"
                disabled={!compared.length}
                onClick={() => setComparisonRequested(true)}
              >
                <span>{labels.compare}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {comparisonRequested && compared.length
                ? `${labels.compare}: ${compared.map((id) => products.find((product) => product.id === id)?.model).filter(Boolean).join(", ")}`
                : ""}
            </p>
          </div>
        </div>

        <StatusBadge tone="coral">{labels.demo}</StatusBadge>
        <aside className="catalogue-purpose">
          <strong>{labels.why}</strong>
          <p className="selectable">
            {labels.whyText}
          </p>
        </aside>
      </SoftShell>

      <CommercialFrame
        text={labels.frame}
        cta={labels.discuss}
      />
    </div>
  );
}
