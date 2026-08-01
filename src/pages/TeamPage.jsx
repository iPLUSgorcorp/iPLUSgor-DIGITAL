import {
  ArrowDown,
  ArrowUpRight,
  Blueprint,
  BracketsCurly,
  CaretDown,
  Compass,
  InstagramLogo,
  Monitor,
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
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { publicAsset } from "../lib/publicAsset.js";

const disciplines = [
  {
    icon: Compass,
    title: "Business study",
    text: "We learn the catalogue, buyer routes, dealer context and internal constraints.",
  },
  {
    icon: Blueprint,
    title: "Structure + UX",
    text: "We turn evidence into architecture, selection logic and responsive interaction.",
  },
  {
    icon: Monitor,
    title: "Interface system",
    text: "We create a visual language that feels as capable as the manufacturer.",
  },
  {
    icon: BracketsCurly,
    title: "Frontend",
    text: "We implement the adaptive interface ourselves and verify it in the browser.",
  },
];

const teamCopy = {
  en: {
    label: "Team / independent Ukrainian practice",
    title: <>SMALL ENOUGH<br />TO THINK TOGETHER.<br />TECHNICAL ENOUGH<br />TO BUILD IT.</>,
    intro: "iPLUSgor Digital is the website and digital-platform division of an independent Ukrainian design company, working directly across strategy, structure, UX and implementation.",
    note: "No relay race between strategy, interface and build.",
    practice: "One connected practice",
    practiceTitle: <>THE SAME TEAM FOLLOWS<br />THE LOGIC INTO THE BROWSER.</>,
    frame: "Bring the catalogue, constraints and unresolved buyer path.",
    cta: "Start with a preliminary review",
    profile: {
      label: "About iPLUSgor Digital",
      title: "Digital modernization for complex B2B",
      detailsLabel: "More about the studio",
      fullLabel: "Full profile",
    },
    brand: {
      label: "iPLUSgor / brand architecture",
      title: "ONE DESIGN COMPANY. DISTINCT SPECIALIST TERRITORIES.",
      intro: "Founded in Ukraine in 2026, iPLUSgor is a young design company earning trust through focused work, transparent positioning and clear responsibility in every specialist division.",
      digitalEyebrow: "Websites + digital platforms",
      digitalText: "The division behind this site: strategy, information architecture, catalogue UX, interface systems and frontend delivery.",
      creativeEyebrow: "Visual content + post-production",
      creativeText: "A separate creative territory for cover design, graphic editing, visual content and video editing.",
      current: "Start a collaboration",
      creativeCta: "Visit iPLUSgor Creative",
    },
  },
  ua: {
    label: "Команда / незалежна українська практика",
    title: <>ДОСИТЬ МАЛІ,<br />ЩОБ ДУМАТИ РАЗОМ.<br />ДОСИТЬ ТЕХНІЧНІ,<br />ЩОБ ЦЕ ПОБУДУВАТИ.</>,
    intro: "iPLUSgor Digital — напрям сайтів і цифрових платформ незалежної української дизайн-компанії, який напряму працює зі стратегією, структурою, UX та реалізацією.",
    note: "Без естафети між стратегією, інтерфейсом і розробкою.",
    practice: "Одна зв’язна практика",
    practiceTitle: <>ТА САМА КОМАНДА<br />ПРОВОДИТЬ ЛОГІКУ У БРАУЗЕР.</>,
    frame: "Покажіть каталог, обмеження та невирішений шлях покупця.",
    cta: "Почати з попереднього розбору",
    profile: {
      label: "Коротко про iPLUSgor Digital",
      title: "Цифрова модернізація для складного B2B",
      detailsLabel: "Докладніше про студію",
      fullLabel: "Повна версія",
    },
    brand: {
      label: "iPLUSgor / архітектура бренду",
      title: "ОДНА ДИЗАЙН-КОМПАНІЯ. ОКРЕМІ ПРОФЕСІЙНІ ТЕРИТОРІЇ.",
      intro: "iPLUSgor заснована в Україні у 2026 році. Це молода дизайн-компанія, яка завойовує довіру сфокусованою роботою, прозорим позиціонуванням і чіткою відповідальністю кожного напряму.",
      digitalEyebrow: "Сайти + цифрові платформи",
      digitalText: "Напрям, у якому створено цей сайт: стратегія, інформаційна архітектура, UX каталогів, системи інтерфейсів і frontend-реалізація.",
      creativeEyebrow: "Візуальний контент + постпродакшн",
      creativeText: "Окрема творча територія для дизайну обкладинок, графічного редагування, візуального контенту та монтажу відео.",
      current: "Перейти до співпраці",
      creativeCta: "Перейти до iPLUSgor Creative",
    },
    disciplines: [
      ["Дослідження бізнесу", "Вивчаємо каталог, шляхи покупця, дилерський контекст і внутрішні обмеження."],
      ["Структура + UX", "Перетворюємо докази на архітектуру, логіку вибору й адаптивну взаємодію."],
      ["Система інтерфейсу", "Створюємо візуальну мову, яка відповідає силі виробника."],
      ["Frontend", "Самі реалізуємо адаптивний інтерфейс і перевіряємо його у браузері."],
    ],
  },
  de: {
    label: "Team / unabhängige ukrainische Praxis",
    title: <>KLEIN GENUG,<br />UM GEMEINSAM ZU DENKEN.<br />TECHNISCH GENUG,<br />UM ES ZU BAUEN.</>,
    intro: "iPLUSgor Digital ist der Bereich für Websites und digitale Plattformen eines unabhängigen ukrainischen Designunternehmens und verbindet Strategie, Struktur, UX und Umsetzung direkt.",
    note: "Kein Staffellauf zwischen Strategie, Interface und Entwicklung.",
    practice: "Eine verbundene Praxis",
    practiceTitle: <>DASSELBE TEAM FÜHRT<br />DIE LOGIK BIS IN DEN BROWSER.</>,
    frame: "Bringen Sie Katalog, Grenzen und den ungelösten Käuferweg mit.",
    cta: "Mit einer Vorprüfung beginnen",
    profile: {
      label: "Kurz über iPLUSgor Digital",
      title: "Digitale Modernisierung für komplexes B2B",
      detailsLabel: "Mehr über das Studio",
      fullLabel: "Vollständiges Profil",
    },
    brand: {
      label: "iPLUSgor / Markenarchitektur",
      title: "EIN DESIGNUNTERNEHMEN. KLAR GETRENNTE FACHBEREICHE.",
      intro: "iPLUSgor wurde 2026 in der Ukraine gegründet. Als junges Designunternehmen baut die Marke Vertrauen durch fokussierte Arbeit, transparente Positionierung und klare Verantwortung jedes Fachbereichs auf.",
      digitalEyebrow: "Websites + digitale Plattformen",
      digitalText: "Der Bereich hinter dieser Website: Strategie, Informationsarchitektur, Katalog-UX, Interface-Systeme und Frontend-Umsetzung.",
      creativeEyebrow: "Visuelle Inhalte + Postproduktion",
      creativeText: "Ein eigenständiger Kreativbereich für Coverdesign, Grafikbearbeitung, visuelle Inhalte und Videoschnitt.",
      current: "Zusammenarbeit starten",
      creativeCta: "iPLUSgor Creative besuchen",
    },
    disciplines: [
      ["Geschäftsanalyse", "Wir lernen Katalog, Käuferwege, Händlerkontext und interne Grenzen kennen."],
      ["Struktur + UX", "Wir formen Evidenz zu Architektur, Auswahllogik und responsiver Interaktion."],
      ["Interface-System", "Wir schaffen eine visuelle Sprache, die so kompetent wirkt wie der Hersteller."],
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

export function TeamPage() {
  const { locale } = useLocale();
  const labels = teamCopy[locale] || teamCopy.en;
  const profile = splitTeamProfile(teamProfiles[locale] || teamProfileEn);
  const localizedDisciplines = disciplines.map((item, index) => labels.disciplines?.[index]
    ? { ...item, title: labels.disciplines[index][0], text: labels.disciplines[index][1] }
    : item);
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !("IntersectionObserver" in window)) return undefined;
    root.dataset.scrollReveal = "ready";
    const targets = root.querySelectorAll(
      ".team-profile__summary > *, .team-profile__full > *, .team-disciplines article",
    );
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-reading", entry.isIntersecting));
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

  return (
    <div className="page page--team" ref={pageRef}>
      <SoftShell className="team-hero">
        <div>
          <SectionLabel>{labels.label}</SectionLabel>
          <h1>{labels.title}</h1>
          <p className="page-intro">{labels.intro}</p>
        </div>
        <Aperture label="iPLUSgor Digital symbol">
          <img
            src={publicAsset("assets/brand/iplusgor-symbol.png")}
            width="640"
            height="645"
            alt=""
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

      <section className="brand-architecture" aria-labelledby="brand-architecture-title">
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
              loading="lazy"
              draggable="false"
            />
            <video
              className="brand-branch__video"
              src={publicAsset("assets/brand/iplusgor-digital-pingpong.mp4")}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden="true"
            />
            <span className="brand-branch__index">01 / DIGITAL</span>
            <small>{labels.brand.digitalEyebrow}</small>
            <h3>iPLUSgor Digital</h3>
            <p>{labels.brand.digitalText}</p>
            <Link className="brand-branch__current" to="/start-project">
              <span>{labels.brand.current}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
          <article className="brand-branch brand-branch--creative">
            <img
              className="brand-branch__poster"
              src={publicAsset("assets/brand/iplusgor-creative-poster.webp")}
              alt=""
              loading="lazy"
              draggable="false"
            />
            <video
              className="brand-branch__video"
              src={publicAsset("assets/brand/iplusgor-creative-pingpong.mp4")}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-hidden="true"
            />
            <span className="brand-branch__index">02 / CREATIVE</span>
            <small>{labels.brand.creativeEyebrow}</small>
            <h3>iPLUSgor Creative</h3>
            <p>{labels.brand.creativeText}</p>
            <a
              href="https://www.instagram.com/iPLUSgor.creative"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo aria-hidden="true" />
              <span>{labels.brand.creativeCta}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
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

      <CommercialFrame
        text={labels.frame}
        cta={labels.cta}
      />
    </div>
  );
}
