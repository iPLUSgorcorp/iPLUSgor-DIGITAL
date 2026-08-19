import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Images,
  LinkSimple,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Plus,
  ArrowCounterClockwise,
  ArrowsIn,
  ArrowsOut,
  X,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { publicAsset } from "../lib/publicAsset.js";
import {
  CommercialFrame,
  SectionLabel,
  SoftShell,
  StatusBadge,
} from "../components/Primitives.jsx";
import { useLocale } from "../i18n.jsx";

const copy = {
  en: {
    label: "WORK — CONCEPT LIBRARY",
    title: <>CLIENT TRUST<br />COMES FIRST.</>,
    intro: "Commercial work is published only with explicit client permission. When a project must remain private, we do not disclose it; this library contains only publishable material and clearly labelled independent concepts.",
    all: "All concepts",
    emptyTitle: "The concept library is ready.",
    emptyText: "New studies added through the local concept manager will appear here automatically.",
    emptyAction: "Add the first concept locally",
    status: "INDEPENDENT CONCEPT — SELF-INITIATED STUDY",
    view: "View concept",
    image: "Image",
    close: "Close image viewer",
    previous: "Previous concept",
    next: "Next concept",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetZoom: "Reset zoom",
    openLink: "Open project link",
    frame: "Client work is shared only with permission; independent concepts are labelled separately.",
    frameCta: "See how we work",
  },
  ua: {
    label: "РОБОТИ — БІБЛІОТЕКА КОНЦЕПТІВ",
    title: <>ДОВІРА<br />ПЕРШ ЗА ВСЕ.</>,
    intro: "Ми публікуємо комерційні проєкти лише з прямого дозволу клієнта. Якщо робота має залишатися конфіденційною, ми її не розкриваємо; тому тут показані лише дозволені до публікації матеріали та чітко позначені незалежні концепти.",
    all: "Усі концепти",
    emptyTitle: "Бібліотека концептів готова.",
    emptyText: "Нові дослідження, додані через локальний менеджер, автоматично з’являться тут.",
    emptyAction: "Додати перший концепт локально",
    status: "НЕЗАЛЕЖНИЙ КОНЦЕПТ — САМОСТІЙНЕ ДОСЛІДЖЕННЯ",
    view: "Переглянути концепт",
    image: "Зображення",
    close: "Закрити перегляд",
    previous: "Попередній концепт",
    next: "Наступний концепт",
    zoomIn: "Збільшити",
    zoomOut: "Зменшити",
    resetZoom: "Скинути масштаб",
    openLink: "Відкрити посилання",
    frame: "Клієнтська робота публікується лише з дозволу; незалежні концепти позначаються окремо.",
    frameCta: "Як ми працюємо",
  },
  de: {
    label: "ARBEITEN — KONZEPTBIBLIOTHEK",
    title: <>VERTRAUEN<br />HAT VORRANG.</>,
    intro: "Kommerzielle Projekte veröffentlichen wir nur mit ausdrücklicher Zustimmung des Kunden. Wenn eine Arbeit vertraulich bleiben soll, legen wir sie nicht offen; diese Bibliothek enthält daher nur freigegebene Materialien und klar gekennzeichnete unabhängige Konzepte.",
    all: "Alle Konzepte",
    emptyTitle: "Die Konzeptbibliothek ist bereit.",
    emptyText: "Neue Studien aus dem lokalen Konzeptmanager erscheinen hier automatisch.",
    emptyAction: "Erstes Konzept lokal hinzufügen",
    status: "UNABHÄNGIGES KONZEPT — EIGENSTÄNDIGE STUDIE",
    view: "Konzept ansehen",
    image: "Bild",
    close: "Bildansicht schließen",
    previous: "Vorheriges Konzept",
    next: "Nächstes Konzept",
    zoomIn: "Vergrößern",
    zoomOut: "Verkleinern",
    resetZoom: "Zoom zurücksetzen",
    openLink: "Projektlink öffnen",
    frame: "Kundenarbeit wird nur mit Zustimmung gezeigt; unabhängige Konzepte werden separat gekennzeichnet.",
    frameCta: "Unsere Arbeitsweise",
  },
};

function localizeField(value, locale, fallback = "") {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return fallback;
  return value[locale] || value.en || value.ua || value.de || fallback;
}

function normalizeConcept(item, index, locale) {
  const legacyImages = [
    item.before ? { src: item.before, label: "Before" } : null,
    item.after ? { src: item.after, label: "After" } : null,
  ].filter(Boolean);
  const images = Array.isArray(item.images)
    ? item.images
      .filter((image) => image && typeof image.src === "string" && image.src)
      .map((image, imageIndex) => ({
        src: image.src,
        label: localizeField(image.label, locale, `Image ${imageIndex + 1}`),
      }))
    : legacyImages;
  const layout = ["before-after", "carousel", "single"].includes(item.layout)
    ? item.layout
    : (images.length > 1 ? "before-after" : "single");

  return {
    id: item.id || `concept-${index + 1}`,
    title: localizeField(item.title, locale, `Concept ${index + 1}`),
    description: localizeField(item.description, locale),
    tag: localizeField(item.tag, locale, "Concept"),
    layout,
    images,
    projectUrl: item.projectUrl || item.githubUrl || item.externalUrl || "",
    createdAt: item.createdAt || "",
  };
}

function ConceptViewer({ concepts, initialIndex, labels, locale, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [imageIndex, setImageIndex] = useState(
    concepts[initialIndex]?.layout === "before-after" ? 1 : 0,
  );
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const figureRef = useRef(null);
  const activePointers = useRef(new Map());
  const gesture = useRef({ distance: 0, zoom: 1, x: 0, y: 0 });
  const concept = concepts[index];
  const activeImage = concept.images[imageIndex] || concept.images[0];

  const moveConcept = (delta) => {
    setIndex((value) => (value + delta + concepts.length) % concepts.length);
    setImageIndex(0);
    setZoom(1);
  };

  const changeZoom = (delta) => {
    setZoom((value) => Math.min(3, Math.max(1, Number((value + delta).toFixed(2)))));
  };

  const selectImage = (value) => {
    setImageIndex(value);
    setZoom(1);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await panelRef.current?.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const pointerDistance = () => {
    const [first, second] = [...activePointers.current.values()];
    return first && second ? Math.hypot(second.x - first.x, second.y - first.y) : 0;
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "touch") return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.current.size === 1) {
      gesture.current.x = event.clientX;
      gesture.current.y = event.clientY;
    } else if (activePointers.current.size === 2) {
      gesture.current.distance = pointerDistance();
      gesture.current.zoom = zoom;
    }
  };

  const handlePointerMove = (event) => {
    if (!activePointers.current.has(event.pointerId)) return;
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.current.size === 2) {
      event.preventDefault();
      const nextDistance = pointerDistance();
      if (gesture.current.distance > 0) {
        setZoom(Math.min(3, Math.max(1, gesture.current.zoom * (nextDistance / gesture.current.distance))));
      }
      return;
    }
    if (zoom > 1 && figureRef.current) {
      event.preventDefault();
      figureRef.current.scrollLeft -= event.clientX - gesture.current.x;
      figureRef.current.scrollTop -= event.clientY - gesture.current.y;
      gesture.current.x = event.clientX;
      gesture.current.y = event.clientY;
    }
  };

  const handlePointerEnd = (event) => {
    activePointers.current.delete(event.pointerId);
    const [remaining] = activePointers.current.values();
    if (remaining) {
      gesture.current.x = remaining.x;
      gesture.current.y = remaining.y;
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape" && !document.fullscreenElement) onClose();
      if (event.key === "ArrowLeft") moveConcept(-1);
      if (event.key === "ArrowRight") moveConcept(1);
      if (event.key === "+" || event.key === "=") changeZoom(0.25);
      if (event.key === "-") changeZoom(-0.25);
      if (event.key === "0") setZoom(1);
    };
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === panelRef.current);
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      previousFocus?.focus?.();
    };
  }, [concepts.length, onClose]);

  return createPortal(
    <div className="concept-viewer" role="dialog" aria-modal="true" aria-labelledby="concept-viewer-title">
      <button className="concept-viewer__backdrop" type="button" onClick={onClose} aria-label={labels.close} />
      <div className="concept-viewer__panel" ref={panelRef}>
        <header>
          <div>
            <StatusBadge>{labels.status}</StatusBadge>
            <h2 id="concept-viewer-title">{concept.title}</h2>
          </div>
          <div className="concept-viewer__header-actions">
            <div className="concept-viewer__zoom" aria-label="Image zoom controls">
              <button
                type="button"
                onClick={() => changeZoom(-0.25)}
                aria-label={labels.zoomOut}
                disabled={zoom <= 1}
              >
                <MagnifyingGlassMinus aria-hidden="true" />
              </button>
              <output aria-live="polite">{Math.round(zoom * 100)}%</output>
              <button
                type="button"
                onClick={() => changeZoom(0.25)}
                aria-label={labels.zoomIn}
                disabled={zoom >= 3}
              >
                <MagnifyingGlassPlus aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                aria-label={labels.resetZoom}
                disabled={zoom === 1}
              >
                <ArrowCounterClockwise aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "Open full screen"}
              >
                {isFullscreen ? <ArrowsIn aria-hidden="true" /> : <ArrowsOut aria-hidden="true" />}
              </button>
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close}>
              <X aria-hidden="true" />
            </button>
          </div>
        </header>
        {concept.images.length > 1 && (
          <div className="concept-viewer__tabs" role="tablist" aria-label="Image state">
            {concept.images.map((image, value) => (
              <button
                key={`${image.src}-${value}`}
                type="button"
                role="tab"
                aria-selected={imageIndex === value}
                className={imageIndex === value ? "is-active" : ""}
                onClick={() => selectImage(value)}
              >
                {image.label || `${labels.image} ${value + 1}`}
              </button>
            ))}
          </div>
        )}
        <figure ref={figureRef} className={zoom > 1 ? "is-zoomed" : undefined}>
          <div
            className="concept-viewer__image-stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            <img
              src={activeImage?.src ? publicAsset(activeImage.src) : undefined}
              alt={`${concept.title} — ${activeImage?.label || labels.image}`}
              draggable="false"
              style={{ width: `${zoom * 100}%` }}
              onDoubleClick={() => setZoom((value) => value === 1 ? 2 : 1)}
            />
          </div>
          {concept.description && <figcaption className="selectable">{concept.description}</figcaption>}
        </figure>
        {concepts.length > 1 && (
          <nav aria-label="Concept viewer">
            <button type="button" aria-label={labels.previous} onClick={() => moveConcept(-1)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <span>{String(index + 1).padStart(2, "0")} {locale === "ua" ? "З" : locale === "de" ? "VON" : "OF"} {String(concepts.length).padStart(2, "0")}</span>
            <button type="button" aria-label={labels.next} onClick={() => moveConcept(1)}>
              <ArrowRight aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function WorkPage() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;
  const [concepts, setConcepts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [viewerIndex, setViewerIndex] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(publicAsset("data/work-concepts.json"), { cache: "default" })
      .then((response) => response.ok ? response.json() : [])
      .then((items) => {
        if (active) {
          setConcepts(Array.isArray(items)
            ? items.map((item, index) => normalizeConcept(item, index, locale))
            : []);
        }
      })
      .catch(() => {
        if (active) setConcepts([]);
      });
    return () => { active = false; };
  }, [locale]);

  const filters = useMemo(
    () => ["all", ...new Set(concepts.map((item) => item.tag).filter(Boolean))],
    [concepts],
  );
  const visible = useMemo(
    () => concepts.filter((item) => filter === "all" || item.tag === filter),
    [concepts, filter],
  );

  useEffect(() => {
    if (!filters.includes(filter)) setFilter("all");
  }, [filter, filters]);

  return (
    <div className="page page--work">
      <SoftShell className="work-shell work-shell--concepts">
        <div className="work-shell__intro">
          <SectionLabel>{labels.label}</SectionLabel>
          <h1>{labels.title}</h1>
          <p className="page-intro selectable">{labels.intro}</p>
        </div>

        <div className="work-filters" role="group" aria-label="Filter concepts">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "is-active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "all" ? labels.all : item}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="concept-library" aria-live="polite">
            {visible.map((item, index) => {
              const globalIndex = concepts.findIndex((concept) => concept.id === item.id);
              const previewImages = item.images.slice(0, item.layout === "single" ? 1 : 2);
              return (
                <article className={`concept-card concept-card--${item.layout}`} key={item.id}>
                  <div
                    className={`concept-card__media concept-card__media--${item.layout}`}
                    role="button"
                    tabIndex="0"
                    aria-label={`${labels.view}: ${item.title}`}
                    onClick={() => setViewerIndex(globalIndex)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setViewerIndex(globalIndex);
                      }
                    }}
                    style={previewImages[0]
                      ? { "--concept-image": `url(${JSON.stringify(publicAsset(previewImages[0].src))})` }
                      : undefined}
                  >
                    {previewImages[0] && (
                      <figure>
                        <img
                          src={publicAsset(previewImages[0].src)}
                          alt={`${item.title} — ${previewImages[0].label || `${labels.image} 1`}`}
                          draggable="false"
                          loading="eager"
                          decoding="async"
                          fetchPriority="low"
                        />
                        <figcaption>{previewImages[0].label || `${labels.image} 1`}</figcaption>
                      </figure>
                    )}
                    {previewImages.length > 1 && <span aria-hidden="true"><ArrowRight /></span>}
                    {previewImages[1] && (
                      <figure>
                        <img
                          src={publicAsset(previewImages[1].src)}
                          alt={`${item.title} — ${previewImages[1].label || `${labels.image} 2`}`}
                          draggable="false"
                          loading="eager"
                          decoding="async"
                          fetchPriority="low"
                        />
                        <figcaption>{previewImages[1].label || `${labels.image} 2`}</figcaption>
                      </figure>
                    )}
                  </div>
                  <div className="concept-card__content">
                    <span className="concept-card__index">{String(index + 1).padStart(2, "0")}</span>
                    <StatusBadge>{labels.status}</StatusBadge>
                    <p className="concept-card__tag">{item.tag}</p>
                    <h2>{item.title}</h2>
                    {item.createdAt && (
                      <time dateTime={item.createdAt}>
                        {new Intl.DateTimeFormat(locale === "ua" ? "uk-UA" : locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(item.createdAt))}
                      </time>
                    )}
                    {item.description && <p className="selectable">{item.description}</p>}
                    <div className="concept-card__actions">
                      <button type="button" onClick={() => setViewerIndex(globalIndex)}>
                        {labels.view} <ArrowUpRight aria-hidden="true" />
                      </button>
                      {item.projectUrl && (
                        <a href={item.projectUrl} target="_blank" rel="noreferrer">
                          {labels.openLink} <LinkSimple aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="concept-library__empty">
            <span><Images aria-hidden="true" /></span>
            <div>
              <h2>{labels.emptyTitle}</h2>
              <p className="selectable">{labels.emptyText}</p>
            </div>
            <span className="concept-library__empty-action"><Plus aria-hidden="true" /> {labels.emptyAction}</span>
          </div>
        )}

        <StatusBadge>{labels.status}</StatusBadge>
      </SoftShell>

      <CommercialFrame text={labels.frame} cta={labels.frameCta} to="/approach" mark="arrow" />

      {viewerIndex !== null && concepts[viewerIndex] && (
        <ConceptViewer
          concepts={concepts}
          initialIndex={viewerIndex}
          labels={labels}
          locale={locale}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
