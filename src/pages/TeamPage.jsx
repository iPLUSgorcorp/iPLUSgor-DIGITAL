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
    title: <>ЯК МИ ПРАЦЮЄМО<br />ВІД ПЕРШОГО ПОВІДОМЛЕННЯ<br />ДО САЙТУ В ІНТЕРНЕТІ.</>,
    intro: "Зрозумілий маршрут із фіксованими точками рішення: ви бачите обсяг, наступний крок і результат на кожному етапі.",
    openStep: "Відкрити етап",
    steps: [
      {
        title: "Зв’язуємось",
        summary: "Починаємо з короткої розмови про бізнес і задачу.",
        body: "Залиште заявку на сайті або напишіть нам. Ми також можемо першими вийти на зв’язок, якщо бачимо, що наша робота може бути корисною вашому бізнесу.",
      },
      {
        title: "Обговорюємо проєкт",
        summary: "Визначаємо реальний обсяг до початку розробки.",
        body: "Керівник проєкту уточнює основну інформацію про бізнес і разом із вами формує чітку рамку роботи.",
        list: ["потрібний тип сайту", "структуру та функції", "дизайн і матеріали", "терміни розробки", "остаточну вартість"],
        note: "До початку розробки ви знаєте ціну й обсяг роботи.",
      },
      {
        title: "Створюємо сайт",
        summary: "Перетворюємо погоджену логіку на адаптивний інтерфейс.",
        body: "Проєктуємо дизайн, адаптуємо сайт для смартфонів і комп’ютерів, додаємо погоджені тексти, зображення, контакти та потрібні функціональні блоки. Перед публікацією ви переглядаєте результат.",
      },
      {
        title: "Допомагаємо з доменом",
        summary: "Власна адреса сайту лишається вашою власністю.",
        body: "Якщо домену ще немає, допомагаємо підібрати та зареєструвати його. Домен оформлюється на вас: ви сплачуєте лише його вартість, а налаштування та підключення входять у нашу роботу.",
        note: "Наприклад: yourbusiness.com.ua",
      },
      {
        title: "Публікуємо сайт",
        summary: "Налаштовуємо запуск і підключаємо ваш домен.",
        body: "Після завершення розробки самостійно готуємо публікацію. Для стандартного односторінкового сайту вам не потрібно окремо розбиратися з серверами, хостингом або технічними налаштуваннями — ми беремо це на себе.",
      },
      {
        title: "Ваш сайт працює",
        summary: "Готовий сайт доступний на будь-якому пристрої.",
        body: "У результаті ви отримуєте готову вебсторінку бізнесу за власним доменом — з телефону, комп’ютера або іншого пристрою.",
        note: "Ви займаєтесь бізнесом. Ми займаємось сайтом.",
      },
    ],
    contact: {
      title: "Зв’язатися з нами",
      text: "Хочете дізнатися, яким може бути сайт саме для вашого бізнесу? Розкажіть кілька слів про задачу — сформуємо зрозумілий наступний крок.",
      primary: "Розрахувати сайт",
      secondary: "Написати нам",
    },
  },
  en: {
    label: "PROCESS — NO HIDDEN STEPS",
    title: <>HOW WE WORK<br />FROM THE FIRST MESSAGE<br />TO A LIVE WEBSITE.</>,
    intro: "A clear route with visible decision points: you see the scope, next step and outcome at every stage.",
    openStep: "Open step",
    steps: [
      {
        title: "We connect",
        summary: "We begin with a short conversation about your business and task.",
        body: "Leave a request on the site or write to us. We may also reach out first when we see a clear way our work could help your business.",
      },
      {
        title: "We define the project",
        summary: "We establish the real scope before development begins.",
        body: "A project lead gathers the core information about the business and shapes a clear working frame with you.",
        list: ["the website you need", "its structure and functions", "design and materials", "development timeline", "final project cost"],
        note: "Before build begins, you know the price and scope of work.",
      },
      {
        title: "We build the site",
        summary: "We turn the agreed logic into a responsive interface.",
        body: "We design the interface, adapt the site for phones and computers, add approved copy, imagery, contacts and required functional blocks. You see and review the result before it goes live.",
      },
      {
        title: "We help with the domain",
        summary: "Your web address remains your property.",
        body: "If you do not have a domain yet, we help choose and register it. The domain is registered to you: you pay only for the domain itself, while setup and connection are part of our work.",
        note: "For example: yourbusiness.com.ua",
      },
      {
        title: "We publish the site",
        summary: "We prepare the launch and connect your domain.",
        body: "After development, we prepare publishing ourselves. For a standard one-page site, you do not need to separately learn servers, hosting or technical settings — we handle that work.",
      },
      {
        title: "Your site is live",
        summary: "The finished site works on every device.",
        body: "You receive a finished business website under your own domain, available from a phone, computer or any other device.",
        note: "You run the business. We take care of the website.",
      },
    ],
    contact: {
      title: "Contact us",
      text: "Want to understand what a website for your business could involve? Tell us a little about the task and we will define a clear next step.",
      primary: "Estimate my website",
      secondary: "Write to us",
    },
  },
  de: {
    label: "ABLAUF — OHNE VERSTECKTE SCHRITTE",
    title: <>SO ARBEITEN WIR<br />VON DER ERSTEN NACHRICHT<br />BIS ZUR LIVE-WEBSITE.</>,
    intro: "Ein klarer Ablauf mit sichtbaren Entscheidungspunkten: Umfang, nächster Schritt und Ergebnis sind in jeder Phase nachvollziehbar.",
    openStep: "Schritt öffnen",
    steps: [
      {
        title: "Wir nehmen Kontakt auf",
        summary: "Wir beginnen mit einem kurzen Gespräch über Ihr Unternehmen und Ihre Aufgabe.",
        body: "Hinterlassen Sie eine Anfrage auf der Website oder schreiben Sie uns. Wir können auch selbst Kontakt aufnehmen, wenn wir einen klaren Nutzen für Ihr Unternehmen sehen.",
      },
      {
        title: "Wir klären das Projekt",
        summary: "Wir bestimmen den tatsächlichen Umfang vor Beginn der Entwicklung.",
        body: "Eine Projektleitung sammelt die wichtigsten Informationen zum Unternehmen und entwickelt gemeinsam mit Ihnen einen klaren Arbeitsrahmen.",
        list: ["die benötigte Website", "Struktur und Funktionen", "Design und Materialien", "Entwicklungszeitraum", "endgültige Projektkosten"],
        note: "Vor Beginn der Umsetzung kennen Sie Preis und Umfang der Arbeit.",
      },
      {
        title: "Wir entwickeln die Website",
        summary: "Wir machen aus der abgestimmten Logik ein responsives Interface.",
        body: "Wir gestalten das Interface, passen die Website für Smartphones und Computer an und ergänzen abgestimmte Texte, Bilder, Kontakte und Funktionsblöcke. Vor der Veröffentlichung sehen und prüfen Sie das Ergebnis.",
      },
      {
        title: "Wir helfen mit der Domain",
        summary: "Ihre Webadresse bleibt Ihr Eigentum.",
        body: "Wenn noch keine Domain vorhanden ist, helfen wir bei Auswahl und Registrierung. Die Domain wird auf Sie registriert: Sie zahlen nur die Domain selbst, Einrichtung und Verbindung gehören zu unserer Arbeit.",
        note: "Zum Beispiel: yourbusiness.com.ua",
      },
      {
        title: "Wir veröffentlichen die Website",
        summary: "Wir bereiten den Launch vor und verbinden Ihre Domain.",
        body: "Nach der Entwicklung bereiten wir die Veröffentlichung selbst vor. Bei einer Standard-One-Page-Website müssen Sie sich nicht separat mit Servern, Hosting oder technischen Einstellungen beschäftigen — das übernehmen wir.",
      },
      {
        title: "Ihre Website ist live",
        summary: "Die fertige Website funktioniert auf jedem Gerät.",
        body: "Sie erhalten eine fertige Business-Website unter Ihrer eigenen Domain, erreichbar per Smartphone, Computer oder anderem Gerät.",
        note: "Sie kümmern sich um Ihr Geschäft. Wir kümmern uns um die Website.",
      },
    ],
    contact: {
      title: "Kontakt aufnehmen",
      text: "Möchten Sie verstehen, wie eine Website für Ihr Unternehmen aussehen kann? Erzählen Sie uns kurz von der Aufgabe — wir definieren einen klaren nächsten Schritt.",
      primary: "Website anfragen",
      secondary: "Uns schreiben",
    },
  },
};

const teamCopy = {
  en: {
    label: "TEAM — INDEPENDENT UKRAINIAN PRACTICE",
    title: <>SMALL ENOUGH<br />TO THINK TOGETHER.<br />TECHNICAL ENOUGH<br />TO BUILD IT.</>,
    intro: "iPLUSgor Digital is an independent Ukrainian web design and frontend team. We take business websites from initial analysis and structure through design, development and launch.",
    note: "No relay race between strategy, interface and build.",
    practice: "One connected practice",
    practiceTitle: <>THE SAME TEAM FOLLOWS<br />THE LOGIC INTO THE BROWSER.</>,
    frame: "Bring the current website, business goals and the problems it needs to solve.",
    cta: "Start with a preliminary review",
    profile: {
      label: "About iPLUSgor Digital",
      title: "Websites from business review to launch",
      detailsLabel: "More about the studio",
      fullLabel: "Full profile",
    },
    brand: {
      label: "iPLUSgor Digital — web practice",
      title: "ONE FOCUSED TEAM. WEBSITES THAT WORK.",
      intro: "Founded in Ukraine in 2026, iPLUSgor Digital is a young independent team building trust through focused web work, transparent communication and responsible delivery.",
      digitalEyebrow: "Websites + digital platforms",
      digitalText: "Business review, structure, UX and UI design, responsive frontend and launch in one connected website practice.",
      current: "Start a collaboration",
    },
  },
  ua: {
    label: "КОМАНДА — НЕЗАЛЕЖНА УКРАЇНСЬКА ПРАКТИКА",
    title: <>ДОСИТЬ МАЛІ,<br />ЩОБ ДУМАТИ РАЗОМ.<br />ДОСИТЬ ТЕХНІЧНІ,<br />ЩОБ ЦЕ ПОБУДУВАТИ.</>,
    intro: "iPLUSgor Digital — незалежна українська команда вебдизайну та frontend-розробки. Ми проводимо бізнес-сайт від первинного аналізу й структури до дизайну, розробки та запуску.",
    note: "Без естафети між стратегією, інтерфейсом і розробкою.",
    practice: "Одна зв’язна практика",
    practiceTitle: <>ТА САМА КОМАНДА<br />ПРОВОДИТЬ ЛОГІКУ У БРАУЗЕР.</>,
    frame: "Покажіть поточний сайт, бізнес-цілі та проблеми, які він має вирішити.",
    cta: "Почати з попереднього розбору",
    profile: {
      label: "Коротко про iPLUSgor Digital",
      title: "Сайти від розбору бізнесу до запуску",
      detailsLabel: "Докладніше про студію",
      fullLabel: "Повна версія",
    },
    brand: {
      label: "iPLUSgor Digital — вебпрактика",
      title: "ОДНА СФОКУСОВАНА КОМАНДА. САЙТИ, ЯКІ ПРАЦЮЮТЬ.",
      intro: "iPLUSgor Digital заснована в Україні у 2026 році. Це молода незалежна команда, яка завойовує довіру сфокусованою роботою над сайтами, прозорою комунікацією та відповідальною реалізацією.",
      digitalEyebrow: "Сайти + цифрові платформи",
      digitalText: "Розбір бізнесу, структура, UX та UI-дизайн, адаптивний frontend і запуск — одна зв’язна вебпрактика.",
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
    intro: "iPLUSgor Digital ist ein unabhängiges ukrainisches Team für Webdesign und Frontend-Entwicklung. Wir begleiten Business-Websites von Analyse und Struktur über Design und Entwicklung bis zum Launch.",
    note: "Kein Staffellauf zwischen Strategie, Interface und Entwicklung.",
    practice: "Eine verbundene Praxis",
    practiceTitle: <>DASSELBE TEAM FÜHRT<br />DIE LOGIK BIS IN DEN BROWSER.</>,
    frame: "Bringen Sie Ihre aktuelle Website, Geschäftsziele und die Probleme mit, die sie lösen soll.",
    cta: "Mit einer Vorprüfung beginnen",
    profile: {
      label: "Kurz über iPLUSgor Digital",
      title: "Websites von der Geschäftsanalyse bis zum Launch",
      detailsLabel: "Mehr über das Studio",
      fullLabel: "Vollständiges Profil",
    },
    brand: {
      label: "iPLUSgor Digital — Webpraxis",
      title: "EIN FOKUSSIERTES TEAM. WEBSITES, DIE FUNKTIONIEREN.",
      intro: "iPLUSgor Digital wurde 2026 in der Ukraine gegründet. Als junges unabhängiges Team gewinnen wir Vertrauen durch fokussierte Webarbeit, transparente Kommunikation und verantwortungsvolle Umsetzung.",
      digitalEyebrow: "Websites + digitale Plattformen",
      digitalText: "Geschäftsanalyse, Struktur, UX- und UI-Design, responsives Frontend und Launch in einer verbundenen Webpraxis.",
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
            src={publicAsset("assets/brand/iplusgor-symbol.png")}
            width="640"
            height="645"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="low"
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
              src={publicAsset("assets/brand/iplusgor-digital-poster.webp")}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="low"
              draggable="false"
            />
            <span className="brand-branch__index">iPLUSgor Digital</span>
            <small>{labels.brand.digitalEyebrow}</small>
            <h3>iPLUSgor Digital</h3>
            <p>{labels.brand.digitalText}</p>
            <Link className="brand-branch__current" to="/start-project">
              <span>{labels.brand.current}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="team-disciplines" aria-labelledby="team-disciplines-title">
        <SectionLabel>{labels.practice}</SectionLabel>
        <h2 id="team-disciplines-title">{labels.practiceTitle}</h2>
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
            <Link className="primary-cta primary-cta--dark" to="/start-project">
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
