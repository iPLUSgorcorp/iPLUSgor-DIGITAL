import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { PrimaryCTA, SectionLabel, SoftShell } from "./Primitives.jsx";
import { useLocale } from "../i18n.jsx";

const copy = {
  ua: {
    label: "ДОКАЗИ Й ВІДПОВІДАЛЬНІСТЬ",
    title: "КОНВЕРСІЙНИЙ ПІДХІД БЕЗ ВИГАДАНИХ ГАРАНТІЙ.",
    lead: "Людина має за кілька секунд зрозуміти вашу послугу, побачити підстави довіряти й знати, як звернутися. Ми проєктуємо цей шлях, але не видаємо чужі результати за прогноз для вашого бізнесу.",
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
    faqTitle: "ЩО ПОТРІБНО ЗНАТИ ДО CONVERSION SPRINT.",
    questions: [
      ["Кому підходить цей формат?", "Сервісному бізнесу, який уже отримує трафік із Google Ads, Meta Ads або активної лідогенерації й хоче сильніше опрацювати шлях після кліку. Найкращий fit — roofing, HVAC, home improvement, dental, medspa, legal та інші high-ticket послуги."],
      ["Скільки коштує робота?", "Conversion Landing Sprint коштує $4,000, основний Conversion Website Sprint — $8,500. Custom Growth Website починається від $10,000 і зазвичай становить $10,000–$15,000+ залежно від сторінок, локацій та інтеграцій."],
      ["Скільки часу займає робота?", "Landing Sprint зазвичай займає 2–3 робочі дні, Website Sprint — 5–7 робочих днів. Строк починається після погодження обсягу та отримання потрібних матеріалів; custom-проєкти оцінюємо окремо."],
      ["Що саме я отримаю?", "Погоджену стратегію й структуру, premium responsive дизайн, frontend, CTA та форму або простий booking flow, базові події аналітики, оптимізацію швидкості, допомогу з доменом і запуск. Точний склад фіксуємо до старту."],
      ["Ви гарантуєте більше лідів?", "Ні. На результат впливають попит, оффер, трафік, ціна, робота відділу продажів та інші фактори. Ми відповідаємо за сильнішу структуру, ясніший шлях, технічну реалізацію й готовність вимірювати поведінку."],
      ["Чи потрібно вже мати домен?", "Ні. Якщо домену немає, допоможемо вибрати й зареєструвати його на вас. Ви сплачуєте вартість самого домену, а підключення до готового сайту входить у нашу роботу."],
      ["Що потрібно надати?", "Послуги, географію роботи, ключову пропозицію, наявні фото, відгуки або інші дозволені докази, доступну аналітику й рекламний контекст. Якщо матеріалів бракує, одразу визначаємо, що критично для короткого спринту."],
      ["Чи входять правки?", "Так. У FAST і CORE передбачено до двох раундів правок у межах погодженого обсягу. Нова функціональність або зміна задачі оцінюються окремо, щоб не розмивати строк запуску."],
      ["Що відбувається після запуску?", "Перевіряємо основні сценарії на телефонах і комп’ютерах, підключаємо погоджений домен, передаємо доступи та короткі пояснення. CORE також включає короткий post-launch support; подальша підтримка узгоджується окремо."],
    ],
    cta: "Запросити conversion review",
  },
  en: {
    label: "EVIDENCE AND ACCOUNTABILITY",
    title: "A CONVERSION APPROACH WITHOUT INVENTED GUARANTEES.",
    lead: "Within seconds, people should understand your service, see reasons to trust it and know how to respond. We design that path without presenting another company’s outcome as a forecast for yours.",
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
    faqTitle: "WHAT TO KNOW BEFORE A CONVERSION SPRINT.",
    questions: [
      ["Who is this built for?", "Service businesses already acquiring visitors through Google Ads, Meta Ads or active lead generation and ready to improve what happens after the click. The strongest fit is roofing, HVAC, home improvement, dental, medspa, legal and other high-ticket services."],
      ["What does it cost?", "The Conversion Landing Sprint is $4,000. The primary Conversion Website Sprint is $8,500. Custom Growth Websites start at $10,000 and typically fall in the $10,000–$15,000+ range depending on pages, locations and integrations."],
      ["How long does it take?", "A Landing Sprint typically takes 2–3 business days and a Website Sprint 5–7 business days. Timing begins after scope approval and receipt of required content. Custom projects receive a separate schedule."],
      ["What exactly will I receive?", "An agreed strategy and structure, premium responsive design, frontend implementation, CTA and lead form or simple booking flow, basic analytics events, speed optimization, domain support and launch. The exact scope is fixed before work begins."],
      ["Do you guarantee more leads?", "No. Demand, offer strength, traffic quality, pricing, sales follow-up and other factors affect results. We are accountable for a clearer structure, stronger website path, technical implementation and measurement readiness."],
      ["Do I need to own a domain already?", "No. If you do not have one, we help choose and register it in your name. You pay the domain provider, while connecting it to the finished site is part of our work."],
      ["What materials do I need to provide?", "Your services, service area, core offer, available photos, permitted reviews or other proof, existing analytics and advertising context. If something is missing, we identify what is essential for the sprint before the clock starts."],
      ["Are revisions included?", "Yes. FAST and CORE include up to two revision rounds within the agreed scope. New functionality or a changed brief is estimated separately so the launch timeline stays real."],
      ["What happens after launch?", "We test the core journeys on phones and computers, connect the agreed domain, and hand over access with concise guidance. CORE also includes short post-launch support; ongoing support is agreed separately if required."],
    ],
    cta: "Request a conversion review",
  },
  de: {
    label: "BELEGE UND VERANTWORTUNG",
    title: "EIN CONVERSION-ANSATZ OHNE ERFUNDENE GARANTIEN.",
    lead: "Menschen sollten Ihre Leistung in Sekunden verstehen, Gründe für Vertrauen sehen und wissen, wie sie reagieren. Wir gestalten diesen Weg, ohne fremde Ergebnisse als Prognose für Ihr Unternehmen darzustellen.",
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
    faqTitle: "WAS SIE VOR EINEM CONVERSION SPRINT WISSEN SOLLTEN.",
    questions: [
      ["Für wen ist das Angebot gedacht?", "Für Dienstleistungsunternehmen, die bereits über Google Ads, Meta Ads oder aktive Leadgenerierung Besucher gewinnen und den Weg nach dem Klick verbessern wollen. Besonders passend für Roofing, HVAC, Home Improvement, Dental, Medspa, Kanzleien und andere hochwertige Dienstleistungen."],
      ["Was kostet die Arbeit?", "Der Conversion Landing Sprint kostet $4,000. Der primäre Conversion Website Sprint kostet $8,500. Custom Growth Websites starten bei $10,000 und liegen je nach Seiten, Standorten und Integrationen typischerweise bei $10,000–$15,000+."],
      ["Wie lange dauert die Arbeit?", "Ein Landing Sprint dauert typischerweise 2–3 Arbeitstage, ein Website Sprint 5–7 Arbeitstage. Die Zeit beginnt nach Freigabe des Umfangs und Eingang der benötigten Inhalte. Custom-Projekte erhalten einen eigenen Zeitplan."],
      ["Was genau erhalte ich?", "Vereinbarte Strategie und Struktur, hochwertiges responsives Design, Frontend, CTA und Lead-Formular oder einfachen Buchungsweg, grundlegende Analytics-Events, Tempo-Optimierung, Domain-Hilfe und Launch. Den genauen Umfang fixieren wir vor dem Start."],
      ["Garantieren Sie mehr Leads?", "Nein. Nachfrage, Angebot, Traffic-Qualität, Preis, Vertriebsnachverfolgung und weitere Faktoren beeinflussen das Ergebnis. Wir verantworten klarere Struktur, einen stärkeren Website-Weg, technische Umsetzung und Messbarkeit."],
      ["Brauche ich bereits eine Domain?", "Nein. Falls keine vorhanden ist, helfen wir bei Auswahl und Registrierung auf Ihren Namen. Sie bezahlen den Domainanbieter; die Verbindung mit der fertigen Website gehört zu unserer Arbeit."],
      ["Welche Materialien muss ich liefern?", "Leistungen, Einsatzgebiet, Kernangebot, verfügbare Fotos, freigegebene Bewertungen oder andere Belege, vorhandene Analytics und Werbekontext. Fehlt etwas, klären wir vor dem Sprint, was wirklich erforderlich ist."],
      ["Sind Korrekturen enthalten?", "Ja. FAST und CORE enthalten bis zu zwei Korrekturrunden innerhalb des vereinbarten Umfangs. Neue Funktionen oder ein verändertes Briefing werden separat geschätzt, damit der Launch-Termin real bleibt."],
      ["Was geschieht nach dem Launch?", "Wir prüfen die wichtigsten Wege auf Smartphone und Computer, verbinden die vereinbarte Domain und übergeben Zugänge mit kurzen Hinweisen. CORE umfasst zudem eine kurze Betreuung nach dem Launch; laufende Unterstützung wird bei Bedarf separat vereinbart."],
    ],
    cta: "Conversion-Review anfragen",
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
