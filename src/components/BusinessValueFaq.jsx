import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { PrimaryCTA, SectionLabel, SoftShell } from "./Primitives.jsx";
import { useLocale } from "../i18n.jsx";

const copy = {
  ua: {
    label: "САЙТ ЯК РОБОЧИЙ ІНСТРУМЕНТ",
    title: "НЕ ПРОСТО СТОРІНКА. ЗРОЗУМІЛИЙ ШЛЯХ ДО ДІЇ.",
    lead: "Людина має за кілька секунд зрозуміти, що ви пропонуєте, чи підходить їй це і як зробити наступний крок.",
    proofLabel: "ЗОВНІШНІ ДОКАЗИ — НЕ ОБІЦЯНКА РЕЗУЛЬТАТУ",
    proofs: [
      {
        index: "01",
        title: "Прямий шлях до запису або замовлення",
        text: "Google Business Profile дозволяє вести відвідувача на окремі сторінки меню, бронювання, запису чи замовлення. Сайт дає цим діям зрозумілий контекст і завершує шлях без зайвого пошуку.",
        link: "Правила Google Business Profile",
        href: "https://support.google.com/business/answer/6218037?hl=uk",
      },
      {
        index: "02",
        title: "Швидкість впливає на комерційний результат",
        text: "Vodafone Italy покращила LCP на 31% і в контрольованому тесті зафіксувала на 8% більше продажів. Це результат конкретної компанії, а не прогноз для кожного сайту, але він показує, чому швидкість — бізнесова вимога.",
        link: "Дослідження web.dev",
        href: "https://web.dev/case-studies/vitals-business-impact?hl=en",
      },
      {
        index: "03",
        title: "Зміни потрібно вимірювати, а не вгадувати",
        text: "Rakuten 24 протягом місяця порівнювала дві версії сторінки. Оптимізований варіант завантажувався на 0,4 секунди швидше; тест зафіксував зростання конверсії на 33,13%. Масштаб бізнесу інший, тому ці цифри — приклад методу, не наша гарантія.",
        link: "Кейс Rakuten 24",
        href: "https://web.dev/case-studies/rakuten?hl=en",
      },
    ],
    faqLabel: "ПЕРЕД ПОЧАТКОМ",
    faqTitle: "ПИТАННЯ, ЯКІ ВАРТО ЗАКРИТИ ДО РОЗРОБКИ.",
    questions: [
      ["Що саме я отримаю?", "Адаптивний сайт із погодженою структурою, дизайном, вашими матеріалами, контактними діями та підготовленою публікацією. Точний склад фіксуємо в обсязі робіт до старту."],
      ["Скільки часу займає робота?", "Орієнтир для стандартного односторінкового сайту — 10–15 робочих днів після отримання матеріалів і погодження структури. Додаткові мови, підготовка контенту або нестандартні функції змінюють строк; календар узгоджуємо до початку."],
      ["Як формується вартість?", "Після короткого брифу визначаємо сторінки, контент, функції та обсяг підготовки матеріалів. Ви отримуєте погоджену суму й перелік робіт до старту — без ціни, відірваної від реальної задачі."],
      ["Чи потрібно вже мати домен?", "Ні. Якщо домену немає, допоможемо вибрати й зареєструвати його на вас. Ви сплачуєте вартість самого домену, а підключення до готового сайту входить у нашу роботу."],
      ["Чи потрібен окремий сервер або хостинг?", "Для стандартного односторінкового сайту вам не потрібно самостійно керувати VPS чи сервером. Спосіб публікації та можливі регулярні витрати сторонніх сервісів погоджуємо заздалегідь; ми не обіцяємо безкоштовний хостинг назавжди."],
      ["Що потрібно надати?", "Назву й короткий опис бізнесу, послуги або меню, контакти, логотип і наявні фотографії. Якщо матеріалів бракує, спочатку визначимо, що критично потрібно підготувати."],
      ["Чи можна внести зміни?", "Так. Етапи перегляду та кількість погоджених раундів правок фіксуємо до старту. Ви бачите сайт до публікації й коментуєте його в узгоджених точках."],
      ["Що відбувається після запуску?", "Підключаємо домен, перевіряємо основні сценарії на телефонах і комп’ютерах та передаємо доступи й короткі пояснення. Подальша підтримка, якщо вона потрібна, узгоджується окремо."],
    ],
    cta: "Розрахувати сайт",
  },
  en: {
    label: "A WEBSITE AS A WORKING TOOL",
    title: "NOT JUST A PAGE. A CLEAR PATH TO ACTION.",
    lead: "Within seconds, people should understand what you offer, whether it fits them and what to do next.",
    proofLabel: "EXTERNAL EVIDENCE — NOT A PROMISE OF RESULTS",
    proofs: [
      {
        index: "01",
        title: "A direct path to booking or ordering",
        text: "Google Business Profile can direct visitors to dedicated menu, booking, appointment and ordering pages. A website gives those actions context and completes the journey without extra searching.",
        link: "Google Business Profile guidance",
        href: "https://support.google.com/business/answer/6218037?hl=en",
      },
      {
        index: "02",
        title: "Performance can affect commercial outcomes",
        text: "Vodafone Italy improved LCP by 31% and measured 8% more sales in a controlled test. This is one company’s result, not a forecast for every site, but it shows why speed is a business requirement.",
        link: "web.dev research",
        href: "https://web.dev/case-studies/vitals-business-impact?hl=en",
      },
      {
        index: "03",
        title: "Changes should be measured, not guessed",
        text: "Rakuten 24 compared two landing-page versions for one month. The optimized version loaded 0.4 seconds faster and the test measured a 33.13% conversion increase. Its scale is different, so this is evidence of a method, not our guarantee.",
        link: "Rakuten 24 case study",
        href: "https://web.dev/case-studies/rakuten?hl=en",
      },
    ],
    faqLabel: "BEFORE WE START",
    faqTitle: "QUESTIONS WORTH ANSWERING BEFORE DEVELOPMENT.",
    questions: [
      ["What exactly will I receive?", "A responsive website with an agreed structure, design, your content, contact actions and prepared publication. We fix the exact scope before work begins."],
      ["How long does it take?", "A standard one-page website is usually planned for 10–15 working days after receiving the materials and agreeing the structure. Extra languages, content production or non-standard functions change the timeline; we agree the calendar before starting."],
      ["How is the price calculated?", "After a short brief we define pages, content, functions and preparation work. You receive an agreed amount and scope before starting, rather than a price detached from the actual task."],
      ["Do I need to own a domain already?", "No. If you do not have one, we help choose and register it in your name. You pay the domain provider, while connecting it to the finished site is part of our work."],
      ["Do I need a separate server or hosting?", "For a standard one-page site you do not need to manage a VPS or server yourself. We agree the publishing method and any third-party recurring costs in advance; we do not promise free hosting forever."],
      ["What materials do I need to provide?", "Your business name and summary, services or menu, contacts, logo and available photographs. If something is missing, we first identify what is essential to prepare."],
      ["Can I request changes?", "Yes. Review stages and the agreed number of revision rounds are fixed before starting. You see and comment on the website before publication."],
      ["What happens after launch?", "We connect the domain, check the main journeys on phones and computers, and hand over access plus concise guidance. Ongoing support, if needed, is agreed separately."],
    ],
    cta: "Estimate my website",
  },
  de: {
    label: "DIE WEBSITE ALS ARBEITSWERKZEUG",
    title: "NICHT NUR EINE SEITE. EIN KLARER WEG ZUR HANDLUNG.",
    lead: "Menschen sollten in wenigen Sekunden verstehen, was Sie anbieten, ob es zu ihnen passt und was als Nächstes zu tun ist.",
    proofLabel: "EXTERNE BELEGE — KEIN ERGEBNISVERSPRECHEN",
    proofs: [
      {
        index: "01",
        title: "Ein direkter Weg zur Buchung oder Bestellung",
        text: "Google Business Profile kann Besucher zu eigenen Seiten für Speisekarte, Buchung, Termin und Bestellung führen. Eine Website gibt diesen Handlungen Kontext und schließt den Weg ohne zusätzliche Suche ab.",
        link: "Hinweise zu Google Business Profile",
        href: "https://support.google.com/business/answer/6218037?hl=de",
      },
      {
        index: "02",
        title: "Leistung kann Geschäftsergebnisse beeinflussen",
        text: "Vodafone Italy verbesserte den LCP um 31% und maß in einem kontrollierten Test 8% mehr Verkäufe. Das ist das Ergebnis eines Unternehmens, keine Prognose für jede Website, zeigt aber, warum Geschwindigkeit eine Geschäftsanforderung ist.",
        link: "Untersuchung auf web.dev",
        href: "https://web.dev/case-studies/vitals-business-impact?hl=de",
      },
      {
        index: "03",
        title: "Änderungen sollten gemessen, nicht erraten werden",
        text: "Rakuten 24 verglich einen Monat lang zwei Landingpage-Versionen. Die optimierte Version lud 0,4 Sekunden schneller; der Test maß 33,13% mehr Conversions. Der Maßstab ist anders — dies belegt eine Methode, nicht unsere Garantie.",
        link: "Fallstudie Rakuten 24",
        href: "https://web.dev/case-studies/rakuten?hl=de",
      },
    ],
    faqLabel: "VOR DEM START",
    faqTitle: "FRAGEN, DIE VOR DER ENTWICKLUNG GEKLÄRT SEIN SOLLTEN.",
    questions: [
      ["Was genau erhalte ich?", "Eine responsive Website mit vereinbarter Struktur, Design, Ihren Inhalten, Kontaktaktionen und vorbereiteter Veröffentlichung. Den genauen Umfang halten wir vor Beginn fest."],
      ["Wie lange dauert die Arbeit?", "Für eine Standard-Onepage-Website planen wir gewöhnlich 10–15 Arbeitstage nach Erhalt der Materialien und Freigabe der Struktur. Zusätzliche Sprachen, Inhaltserstellung oder Sonderfunktionen verändern den Zeitplan; wir vereinbaren ihn vor Beginn."],
      ["Wie wird der Preis berechnet?", "Nach einem kurzen Briefing definieren wir Seiten, Inhalte, Funktionen und Vorbereitungsaufwand. Vor dem Start erhalten Sie einen vereinbarten Betrag und Leistungsumfang — keinen Preis ohne Bezug zur Aufgabe."],
      ["Brauche ich bereits eine Domain?", "Nein. Falls keine vorhanden ist, helfen wir bei Auswahl und Registrierung auf Ihren Namen. Sie bezahlen den Domainanbieter; die Verbindung mit der fertigen Website gehört zu unserer Arbeit."],
      ["Brauche ich einen eigenen Server oder Hosting?", "Für eine Standard-Onepage-Website müssen Sie keinen VPS oder Server selbst verwalten. Veröffentlichungsweg und mögliche laufende Drittkosten vereinbaren wir im Voraus; kostenloses Hosting für immer versprechen wir nicht."],
      ["Welche Materialien muss ich liefern?", "Unternehmensname und Kurzbeschreibung, Leistungen oder Speisekarte, Kontakte, Logo und vorhandene Fotos. Fehlt etwas, bestimmen wir zuerst, was wirklich vorbereitet werden muss."],
      ["Kann ich Änderungen einbringen?", "Ja. Prüfschritte und die vereinbarte Zahl der Korrekturrunden werden vor Beginn festgelegt. Sie sehen und kommentieren die Website vor der Veröffentlichung."],
      ["Was geschieht nach dem Start?", "Wir verbinden die Domain, prüfen die wichtigsten Abläufe auf Smartphone und Computer und übergeben Zugänge sowie kurze Hinweise. Laufende Betreuung wird bei Bedarf separat vereinbart."],
    ],
    cta: "Website kalkulieren",
  },
};

export function BusinessValueFaq() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SoftShell className="business-value" aria-labelledby="business-value-title">
      <div className="business-value__heading">
        <SectionLabel>{labels.label}</SectionLabel>
        <h2 id="business-value-title">{labels.title}</h2>
        <p className="selectable">{labels.lead}</p>
      </div>

      <section className="business-evidence" aria-labelledby="business-evidence-title">
        <h3 id="business-evidence-title">{labels.proofLabel}</h3>
        <div className="business-evidence__register">
          {labels.proofs.map((proof) => (
            <article key={proof.index}>
              <span>{proof.index}</span>
              <div>
                <h4>{proof.title}</h4>
                <p className="selectable">{proof.text}</p>
                <a href={proof.href} target="_blank" rel="noreferrer">
                  {proof.link} <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="business-faq" aria-labelledby="business-faq-title">
        <div className="business-faq__intro">
          <SectionLabel>{labels.faqLabel}</SectionLabel>
          <h3 id="business-faq-title">{labels.faqTitle}</h3>
          <PrimaryCTA tone="jade">{labels.cta}</PrimaryCTA>
        </div>
        <div className="business-faq__list">
          {labels.questions.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const panelId = `business-faq-panel-${index}`;
            return (
              <article className={isOpen ? "is-open" : ""} key={question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <CaretDown aria-hidden="true" />
                </button>
                <div className="business-faq__answer" id={panelId} aria-hidden={!isOpen}>
                  <div><p className="selectable">{answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </SoftShell>
  );
}
