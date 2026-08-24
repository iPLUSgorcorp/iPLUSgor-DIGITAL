import {
  AirplaneTilt,
  ArrowDown,
  ArrowUpRight,
  Blueprint,
  BracketsCurly,
  CaretDown,
  Compass,
  GlobeHemisphereWest,
  Monitor,
  RocketLaunch,
} from "@phosphor-icons/react";
import {
  Aperture,
  CommercialFrame,
  SectionLabel,
  SoftShell,
} from "../components/Primitives.jsx";
import teamProfileDe from "../content/team-profile.de.md?raw";
import teamProfileEn from "../content/team-profile.en.md?raw";
import teamProfileUa from "../content/team-profile.ua.md?raw";
import { useLocale } from "../i18n.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { publicAsset } from "../lib/publicAsset.js";
import { getLocalizedPath } from "../seo-metadata.js";

const disciplines = [
  {
    icon: Compass,
    title: "Business study",
    text: "We study the business, its offer, audience, current website and practical constraints.",
  },
  {
    icon: Blueprint,
    title: "Structure + UX",
    text: "We turn the brief into a clear structure, user journeys and responsive interaction.",
  },
  {
    icon: Monitor,
    title: "Interface system",
    text: "We create a visual language that makes the business feel clear, trustworthy and recognisable.",
  },
  {
    icon: BracketsCurly,
    title: "Frontend",
    text: "We implement the adaptive interface ourselves and verify it in the browser.",
  },
];

const processIcons = [AirplaneTilt, Blueprint, Monitor, GlobeHemisphereWest, RocketLaunch, BracketsCurly];

const howWeWorkCopy = {
  ua: {
    label: "ПРОЦЕС — БЕЗ ПРИХОВАНИХ ЕТАПІВ",
    title: <>ЯК МИ ПРАЦЮЄМО<br />ВІД РОЗБОРУ ТРАФІКУ<br />ДО ЗАПУСКУ.</>,
    intro: "Фіксований sprint-маршрут для сервісного бізнесу: трафік, офер, довіра, CTA, збір звернень і запуск.",
    openStep: "Відкрити етап",
    steps: [
      {
        title: "Зв’язуємось",
        summary: "Починаємо з короткої розмови про бізнес і завдання.",
        body: "Надішліть поточний сайт, головну послугу та джерело трафіку. Ми перевіримо, чи відповідає запит нашому формату, без продажу повного аудиту в першому листі.",
      },
      {
        title: "Обговорюємо проєкт",
        summary: "Визначаємо реальний обсяг до початку розробки.",
        body: "Керівник проєкту уточнює основну інформацію про бізнес і разом із вами формує чітку рамку роботи.",
        list: ["Landing Sprint — $4,000", "Website Sprint — $8,500", "Custom scope — від $10,000", "потрібні матеріали та інтеграції", "чіткий критерій запуску"],
        note: "До старту ви знаєте рекомендований формат, ціну, обсяг і припущення щодо терміну.",
      },
      {
        title: "Створюємо сайт",
        summary: "Перетворюємо погоджену логіку на адаптивний інтерфейс.",
        body: "Проєктуємо офер, структуру довіри й mobile-first інтерфейс, а потім самі реалізуємо responsive frontend. Типовий орієнтир — 2–3 робочі дні для лендингу та 5–7 для основного website sprint за готових матеріалів і швидких рішень.",
      },
      {
        title: "Допомагаємо з доменом",
        summary: "Власна адреса сайту лишається вашою власністю.",
        body: "Якщо домену ще немає, допомагаємо підібрати та зареєструвати його. Домен оформлюється на вас: ви сплачуєте лише його вартість, а налаштування та підключення входять у нашу роботу.",
        note: "Наприклад: yourbusiness.com.ua",
      },
      {
        title: "Перевіряємо шлях",
        summary: "QA охоплює mobile, CTA, форми, швидкість і події аналітики.",
        body: "Перед запуском перевіряємо основний комерційний сценарій, responsive-стани, контакти, форми й базові measurement events. Ми не прогнозуємо кількість лідів — готуємо шлях, який можна вимірювати.",
      },
      {
        title: "Запускаємо сайт",
        summary: "Підключаємо домен і передаємо контроль клієнту.",
        body: "Публікуємо погоджену версію, перевіряємо її за власним доменом і передаємо доступи та код за умовами проєкту. Після запуску коротка підтримка входить в основний sprint; подальша робота узгоджується окремо.",
        note: "Сайт запущено. Наступні рішення спираються на реальні дані, а не обіцянки.",
      },
    ],
    contact: {
      title: "Зв’язатися з нами",
      text: "Уже отримуєте трафік? Надішліть сайт, головну послугу й джерело переходів — визначимо найбільш корисний наступний крок.",
      primary: "Запросити розбір",
      secondary: "Написати нам",
    },
  },
  en: {
    label: "PROCESS — NO HIDDEN STEPS",
    title: <>HOW WE WORK<br />FROM TRAFFIC REVIEW<br />TO LAUNCH.</>,
    intro: "A fixed sprint route for service businesses: traffic, offer, trust, CTA, lead capture and launch.",
    openStep: "Open step",
    steps: [
      {
        title: "We connect",
        summary: "We begin with a short conversation about your business and task.",
        body: "Send the current website, primary service and traffic source. We determine whether the task fits our format without pushing a full audit in the first message.",
      },
      {
        title: "We define the project",
        summary: "We establish the real scope before development begins.",
        body: "A project lead gathers the core information about the business and shapes a clear working frame with you.",
        list: ["Landing Sprint — $4,000", "Website Sprint — $8,500", "Custom scope — from $10,000", "required materials and integrations", "a clear launch criterion"],
        note: "Before work begins, you know the recommended engagement, price, scope and timeline assumptions.",
      },
      {
        title: "We build the site",
        summary: "We turn the agreed logic into a responsive interface.",
        body: "We shape the offer, trust structure and mobile-first interface, then implement the responsive frontend ourselves. Typical delivery is 2–3 business days for a landing sprint and 5–7 for the core website sprint when materials and decisions are available.",
      },
      {
        title: "We help with the domain",
        summary: "Your web address remains your property.",
        body: "If you do not have a domain yet, we help choose and register it. The domain is registered to you: you pay only for the domain itself, while setup and connection are part of our work.",
        note: "For example: yourbusiness.com.ua",
      },
      {
        title: "We verify the path",
        summary: "QA covers mobile, CTAs, forms, speed and analytics events.",
        body: "Before launch, we verify the primary commercial journey, responsive states, contacts, forms and basic measurement events. We do not forecast a lead count; we prepare a path the business can measure.",
      },
      {
        title: "We launch the site",
        summary: "We connect the domain and transfer control to the client.",
        body: "We publish the approved version, verify it under the client domain, and hand over access and code under the project terms. Short post-launch support is included in the core sprint; continued work is scoped separately.",
        note: "The site is live. Further decisions can use real data instead of promises.",
      },
    ],
    contact: {
      title: "Contact us",
      text: "Already receiving traffic? Share the site, primary service and traffic source so we can define the most useful next step.",
      primary: "Request a review",
      secondary: "Write to us",
    },
  },
  de: {
    label: "ABLAUF — OHNE VERSTECKTE SCHRITTE",
    title: <>SO ARBEITEN WIR<br />VOM TRAFFIC-REVIEW<br />BIS ZUM LAUNCH.</>,
    intro: "Ein fester Sprint-Ablauf für Dienstleister: Traffic, Angebot, Vertrauen, CTA, Lead-Erfassung und Launch.",
    openStep: "Schritt öffnen",
    steps: [
      {
        title: "Wir nehmen Kontakt auf",
        summary: "Wir beginnen mit einem kurzen Gespräch über Ihr Unternehmen und Ihre Aufgabe.",
        body: "Senden Sie aktuelle Website, wichtigste Leistung und Traffic-Quelle. Wir prüfen, ob die Aufgabe zu unserem Format passt, ohne im ersten Kontakt ein volles Audit zu verkaufen.",
      },
      {
        title: "Wir klären das Projekt",
        summary: "Wir bestimmen den tatsächlichen Umfang vor Beginn der Entwicklung.",
        body: "Eine Projektleitung sammelt die wichtigsten Informationen zum Unternehmen und entwickelt gemeinsam mit Ihnen einen klaren Arbeitsrahmen.",
        list: ["Landing Sprint — $4,000", "Website Sprint — $8,500", "Custom Scope — ab $10,000", "notwendige Materialien und Integrationen", "ein klares Launch-Kriterium"],
        note: "Vor dem Start kennen Sie empfohlenes Format, Preis, Umfang und Annahmen zum Zeitplan.",
      },
      {
        title: "Wir entwickeln die Website",
        summary: "Wir machen aus der abgestimmten Logik ein responsives Interface.",
        body: "Wir gestalten Angebot, Vertrauensstruktur und Mobile-first-Interface und implementieren das responsive Frontend selbst. Typisch sind 2–3 Werktage für den Landing Sprint und 5–7 für den Kern-Sprint, wenn Material und Entscheidungen verfügbar sind.",
      },
      {
        title: "Wir helfen mit der Domain",
        summary: "Ihre Webadresse bleibt Ihr Eigentum.",
        body: "Wenn noch keine Domain vorhanden ist, helfen wir bei Auswahl und Registrierung. Die Domain wird auf Sie registriert: Sie zahlen nur die Domain selbst, Einrichtung und Verbindung gehören zu unserer Arbeit.",
        note: "Zum Beispiel: yourbusiness.com.ua",
      },
      {
        title: "Wir prüfen den Weg",
        summary: "QA umfasst Mobile, CTAs, Formulare, Tempo und Analyse-Events.",
        body: "Vor dem Launch prüfen wir den kommerziellen Hauptweg, responsive Zustände, Kontakte, Formulare und grundlegende Messereignisse. Wir prognostizieren keine Lead-Zahl, sondern bereiten einen messbaren Weg vor.",
      },
      {
        title: "Wir starten die Website",
        summary: "Wir verbinden die Domain und übertragen die Kontrolle.",
        body: "Wir veröffentlichen die freigegebene Version, prüfen sie unter der Kundendomain und übergeben Zugänge und Code gemäß Projektumfang. Kurzer Support nach Launch gehört zum Kern-Sprint; weitere Arbeit wird separat definiert.",
        note: "Die Website ist live. Weitere Entscheidungen können auf echten Daten statt Versprechen beruhen.",
      },
    ],
    contact: {
      title: "Kontakt aufnehmen",
      text: "Sie erhalten bereits Traffic? Teilen Sie Website, wichtigste Leistung und Quelle, damit wir den sinnvollsten nächsten Schritt bestimmen.",
      primary: "Review anfragen",
      secondary: "Uns schreiben",
    },
  },
};

const teamCopy = {
  en: {
    label: "TEAM — INDEPENDENT UKRAINIAN PRACTICE",
    title: <>SMALL ENOUGH<br />TO THINK TOGETHER.<br />TECHNICAL ENOUGH<br />TO BUILD IT.</>,
    intro: "iPLUSgor Digital is an independent Ukrainian strategy, UX/UI and frontend team building conversion-focused websites for service businesses with existing traffic.",
    note: "No relay race between strategy, interface and build.",
    practice: "One connected practice",
    practiceTitle: <>THE SAME TEAM FOLLOWS<br />THE LOGIC INTO THE BROWSER.</>,
    frame: "Bring the current website, primary service and traffic source. We will identify the most useful next conversation.",
    cta: "Request a conversion review",
    profile: {
      label: "About iPLUSgor Digital",
      title: "Conversion websites from review to launch",
      detailsLabel: "More about the studio",
      fullLabel: "Full profile",
    },
    brand: {
      label: "iPLUSgor Digital — web practice",
      title: "ONE FOCUSED TEAM. ONE COMMERCIAL PATH.",
      intro: "Founded in Ukraine in 2026, iPLUSgor Digital is a young independent team earning trust through honest scope, clear communication and accountable delivery.",
      digitalEyebrow: "Conversion websites for service businesses",
      digitalText: "Traffic review, offer structure, UX/UI, responsive frontend, lead capture and launch in one connected practice.",
      current: "Start a collaboration",
    },
  },
  ua: {
    label: "КОМАНДА — НЕЗАЛЕЖНА УКРАЇНСЬКА ПРАКТИКА",
    title: <>ДОСИТЬ МАЛІ,<br />ЩОБ ДУМАТИ РАЗОМ.<br />ДОСИТЬ ТЕХНІЧНІ,<br />ЩОБ ЦЕ ПОБУДУВАТИ.</>,
    intro: "iPLUSgor Digital — незалежна українська команда стратегії, UX/UI та frontend, яка створює конверсійні сайти для сервісного бізнесу з наявним трафіком.",
    note: "Без естафети між стратегією, інтерфейсом і розробкою.",
    practice: "Одна зв’язна практика",
    practiceTitle: <>ТА САМА КОМАНДА<br />ПРОВОДИТЬ ЛОГІКУ У БРАУЗЕР.</>,
    frame: "Покажіть поточний сайт, головну послугу й джерело трафіку. Визначимо корисний наступний крок.",
    cta: "Запросити конверсійний розбір",
    profile: {
      label: "Коротко про iPLUSgor Digital",
      title: "Конверсійні сайти від розбору до запуску",
      detailsLabel: "Докладніше про студію",
      fullLabel: "Повна версія",
    },
    brand: {
      label: "iPLUSgor Digital — вебпрактика",
      title: "ОДНА СФОКУСОВАНА КОМАНДА. ОДИН КОМЕРЦІЙНИЙ ШЛЯХ.",
      intro: "iPLUSgor Digital заснована в Україні у 2026 році. Ми молода незалежна команда, яка будує довіру чесним обсягом, прозорою комунікацією та відповідальною реалізацією.",
      digitalEyebrow: "Конверсійні сайти для сервісного бізнесу",
      digitalText: "Розбір трафіку, структура оферу, UX/UI, адаптивний frontend, збір звернень і запуск — одна зв’язна практика.",
      current: "Перейти до співпраці",
    },
    disciplines: [
      ["Дослідження бізнесу", "Вивчаємо бізнес, його пропозицію, аудиторію, поточний сайт і практичні обмеження."],
      ["Структура + UX", "Перетворюємо бриф на зрозумілу структуру, сценарії користувача й адаптивну взаємодію."],
      ["Система інтерфейсу", "Створюємо візуальну мову, яка робить бізнес зрозумілим, цілісним і впізнаваним."],
      ["Frontend", "Самі реалізуємо адаптивний інтерфейс і перевіряємо його у браузері."],
    ],
  },
  de: {
    label: "TEAM — UNABHÄNGIGE UKRAINISCHE PRAXIS",
    title: <>KLEIN GENUG,<br />UM GEMEINSAM ZU DENKEN.<br />TECHNISCH GENUG,<br />UM ES ZU BAUEN.</>,
    intro: "iPLUSgor Digital ist ein unabhängiges ukrainisches Team für Strategie, UX/UI und Frontend. Wir bauen Conversion-Websites für Dienstleister mit vorhandenem Traffic.",
    note: "Kein Staffellauf zwischen Strategie, Interface und Entwicklung.",
    practice: "Eine verbundene Praxis",
    practiceTitle: <>DASSELBE TEAM FÜHRT<br />DIE LOGIK BIS IN DEN BROWSER.</>,
    frame: "Bringen Sie aktuelle Website, wichtigste Leistung und Traffic-Quelle mit. Wir bestimmen den sinnvollen nächsten Schritt.",
    cta: "Conversion-Review anfragen",
    profile: {
      label: "Kurz über iPLUSgor Digital",
      title: "Conversion-Websites vom Review bis zum Launch",
      detailsLabel: "Mehr über das Studio",
      fullLabel: "Vollständiges Profil",
    },
    brand: {
      label: "iPLUSgor Digital — Webpraxis",
      title: "EIN FOKUSSIERTES TEAM. EIN KOMMERZIELLER WEG.",
      intro: "iPLUSgor Digital wurde 2026 in der Ukraine gegründet. Als junges unabhängiges Team gewinnen wir Vertrauen durch ehrlichen Umfang, klare Kommunikation und verantwortliche Umsetzung.",
      digitalEyebrow: "Conversion-Websites für Dienstleister",
      digitalText: "Traffic-Review, Angebotsstruktur, UX/UI, responsives Frontend, Lead-Erfassung und Launch in einer verbundenen Praxis.",
      current: "Zusammenarbeit starten",
    },
    disciplines: [
      ["Geschäftsanalyse", "Wir untersuchen Geschäft, Angebot, Zielgruppen, bestehende Website und praktische Rahmenbedingungen."],
      ["Struktur + UX", "Wir übersetzen den Brief in eine klare Struktur, Nutzerwege und responsive Interaktion."],
      ["Interface-System", "Wir schaffen eine visuelle Sprache, die das Unternehmen klar, stimmig und wiedererkennbar macht."],
      ["Frontend", "Wir implementieren das responsive Interface selbst und prüfen es im Browser."],
    ],
  },
};

function TeamProfileMarkdown({ source }) {
  const lines = source.split("\n");
  const content = [];
  let skippedTitle = false;

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();

    if (!line || line === "---") {
      index += 1;
      continue;
    }

    if (line.startsWith("# ") && !skippedTitle) {
      skippedTitle = true;
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      content.push(<h4 key={`h4-${index}`}>{line.slice(4)}</h4>);
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      content.push(<h3 key={`h3-${index}`}>{line.slice(3)}</h3>);
      index += 1;
      continue;
    }

    if (line.startsWith("* ")) {
      const items = [];
      const listStart = index;
      while (index < lines.length && lines[index].trim().startsWith("* ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      content.push(
        <ul key={`list-${listStart}`}>
          {items.map((item) => <li key={item}><span>{item}</span></li>)}
        </ul>,
      );
      continue;
    }

    const strong = line.match(/^\*\*(.+)\*\*$/);
    content.push(
      <p key={`p-${index}`} className={strong ? "team-profile__statement" : undefined}>
        {strong ? <strong>{strong[1]}</strong> : line}
      </p>,
    );
    index += 1;
  }

  return content;
}

const teamProfileDivider = "\n---\n";
const teamProfiles = {
  en: teamProfileEn,
  ua: teamProfileUa,
  de: teamProfileDe,
};
const profileLanguages = { en: "en", ua: "uk", de: "de" };

function splitTeamProfile(source) {
  const dividerIndex = source.indexOf(teamProfileDivider);
  if (dividerIndex === -1) return { summary: source, full: "" };
  return {
    summary: source.slice(0, dividerIndex),
    full: source.slice(dividerIndex + teamProfileDivider.length),
  };
}

function useMagneticPointer() {
  const frameRef = useRef(null);
  const pendingRef = useRef(null);

  const reset = (target) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    pendingRef.current = null;
    target?.style.setProperty("--magnetic-x", "0");
    target?.style.setProperty("--magnetic-y", "0");
  };

  return {
    onPointerMove: (event) => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      pendingRef.current = {
        target,
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 3.2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 3.2,
      };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        const pending = pendingRef.current;
        if (pending) {
          pending.target.style.setProperty("--magnetic-x", pending.x.toFixed(2));
          pending.target.style.setProperty("--magnetic-y", pending.y.toFixed(2));
        }
        frameRef.current = null;
      });
    },
    onPointerLeave: (event) => reset(event.currentTarget),
  };
}

export function TeamPage() {
  const { locale } = useLocale();
  const labels = teamCopy[locale] || teamCopy.en;
  const process = howWeWorkCopy[locale] || howWeWorkCopy.en;
  const profile = splitTeamProfile(teamProfiles[locale] || teamProfileEn);
  const localizedDisciplines = disciplines.map((item, index) => labels.disciplines?.[index]
    ? { ...item, title: labels.disciplines[index][0], text: labels.disciplines[index][1] }
    : item);
  const pageRef = useRef(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const magneticPointer = useMagneticPointer();

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !("IntersectionObserver" in window)) return undefined;
    root.dataset.scrollReveal = "ready";
    const targets = root.querySelectorAll(
      ".team-profile__summary > *, .team-profile__full > *, .team-disciplines article, .how-we-work__stage",
    );
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-reading", entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "-36% 0px -36%" });
    targets.forEach((target) => {
      revealObserver.observe(target);
      focusObserver.observe(target);
    });
    return () => {
      revealObserver.disconnect();
      focusObserver.disconnect();
    };
  }, [locale]);

  useEffect(() => {
    setActiveProcessStep(0);
  }, [locale]);

  return (
    <div className="page page--team" ref={pageRef}>
      <SoftShell className="team-hero">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h1>{labels.title}</h1>
          <p className="page-intro">{labels.intro}</p>
        </div>
        <Aperture className="team-hero__brand-aperture" label="iPLUSgor Digital symbol">
          <img
            src={publicAsset("assets/brand/iplusgor-symbol.webp")}
            width="640"
            height="645"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Aperture>
        <p className="team-hero__note">
          {labels.note}
          <ArrowDown aria-hidden="true" />
        </p>
      </SoftShell>

      <section
        className="team-profile selectable"
        aria-labelledby="team-profile-title"
        lang={profileLanguages[locale] || "en"}
      >
          <SectionLabel>{labels.profile.label}</SectionLabel>
          <h2 id="team-profile-title">{labels.profile.title}</h2>
          <div className="team-profile__summary">
            <TeamProfileMarkdown source={profile.summary} />
          </div>

          {profile.full && <details className="team-profile__details">
            <summary>
              <span>
                <small>{labels.profile.detailsLabel}</small>
                {labels.profile.fullLabel}
              </span>
              <CaretDown aria-hidden="true" />
            </summary>
            <div className="team-profile__full">
              <TeamProfileMarkdown source={profile.full} />
            </div>
          </details>}
        </section>

      <section className="brand-architecture brand-architecture--single" aria-labelledby="brand-architecture-title">
        <div className="brand-architecture__intro">
          <SectionLabel>{labels.brand.label}</SectionLabel>
          <h2 id="brand-architecture-title">{labels.brand.title}</h2>
          <p>{labels.brand.intro}</p>
        </div>
        <div className="brand-architecture__branches">
          <article className="brand-branch brand-branch--digital">
            <img
              className="brand-branch__poster"
              src={publicAsset("assets/brand/iplusgor-digital-workspace.webp")}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              draggable="false"
            />
            <span className="brand-branch__index">iPLUSgor Digital</span>
            <small>{labels.brand.digitalEyebrow}</small>
            <h3>iPLUSgor Digital</h3>
            <p>{labels.brand.digitalText}</p>
            <Link className="brand-branch__current" to={getLocalizedPath("/start-project", locale)}>
              <span>{labels.brand.current}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="team-disciplines" aria-labelledby="team-disciplines-title">
        <SectionLabel>{labels.practice}</SectionLabel>
        <h2
          id="team-disciplines-title"
          style={locale === "de" ? { fontSize: "clamp(2rem, 3.2vw, 3.5rem)" } : undefined}
        >
          {labels.practiceTitle}
        </h2>
        <div>
          {localizedDisciplines.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-we-work" className="how-we-work selectable" aria-labelledby="how-we-work-title">
        <header className="how-we-work__header">
          <SectionLabel>{process.label}</SectionLabel>
          <h2 id="how-we-work-title">{process.title}</h2>
          <p>{process.intro}</p>
        </header>

        <div className="how-we-work__layout">
          <ol className="how-we-work__stages">
            {process.steps.map((step, index) => {
              const Icon = processIcons[index];
              const active = activeProcessStep === index;
              return (
                <li
                  className={`how-we-work__stage ${active ? "is-active" : ""}`}
                  data-process-step={index}
                  key={step.title}
                >
                  <button
                    type="button"
                    aria-controls={`process-detail-${index}`}
                    aria-expanded={active}
                    onClick={() => setActiveProcessStep(index)}
                    onFocus={() => setActiveProcessStep(index)}
                    {...magneticPointer}
                  >
                    <span className="how-we-work__stage-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="how-we-work__stage-copy">
                      <strong>{step.title}</strong>
                      <small>{step.summary}</small>
                    </span>
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{process.openStep}: {step.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="how-we-work__detail" aria-live="polite">
            {process.steps.map((step, index) => activeProcessStep === index && (
              <article id={`process-detail-${index}`} key={step.title} className="how-we-work__detail-content">
                <span>{locale === "ua" ? "ЕТАП" : locale === "de" ? "SCHRITT" : "STEP"} {String(index + 1).padStart(2, "0")} {locale === "ua" ? "З" : locale === "de" ? "VON" : "OF"} 06</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.list && (
                  <ul>
                    {step.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {step.note && <strong>{step.note}</strong>}
              </article>
            ))}
          </div>
        </div>

        <aside className="how-we-work__contact" aria-labelledby="how-we-work-contact-title">
          <div>
            <SectionLabel tone="coral">{process.contact.title}</SectionLabel>
            <h3 id="how-we-work-contact-title">{process.contact.title}</h3>
            <p>{process.contact.text}</p>
          </div>
          <div className="how-we-work__contact-actions">
            <Link className="primary-cta primary-cta--dark" to={getLocalizedPath("/start-project", locale)}>
              <span>{process.contact.primary}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <a href="mailto:igorcorp.tech@gmail.com">{process.contact.secondary}</a>
          </div>
        </aside>
      </section>

      <CommercialFrame
        text={labels.frame}
        cta={labels.cta}
      />
    </div>
  );
}
