import {
  Check,
  EnvelopeSimple,
  FileArrowUp,
  GoogleLogo,
  Paperclip,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { SectionLabel, SoftShell, StatusBadge } from "../components/Primitives.jsx";
import { useLocale } from "../i18n.jsx";
import { trackEvent } from "../lib/analytics.js";

const CONTACT_EMAIL = "igorcorp.tech@gmail.com";

const copy = {
  en: {
    label: "REQUEST — CONVERSION REVIEW",
    title: <>SHOW US WHERE<br />THE CLICK<br />LOSES MOMENTUM.</>,
    intro: "Share the current website, primary service and traffic source. We will identify the most useful next conversation and recommend a scope — without promising a lead count.",
    premium: "LANDING SPRINT $4,000 — WEBSITE SPRINT $8,500",
    cadence: "CLEAR SCOPE — FIXED SPRINT — RESPONSIVE DELIVERY",
    email: "Contact directly",
    website: "Current website",
    market: "Business and primary service",
    marketPlaceholder: "Example: HVAC installation in Austin",
    traffic: "Current traffic source",
    trafficPlaceholder: "Google Ads, Meta Ads, organic, referrals or not running yet",
    scale: "Likely sprint",
    scalePlaceholder: "Choose what seems closest",
    scaleOptions: {
      onePage: "Conversion Landing Sprint — $4,000",
      multiPage: "Conversion Website Sprint — $8,500",
      refresh: "Custom Growth Website — from $10,000",
      unsure: "Not sure yet",
    },
    barriers: "Current barriers",
    pdf: "Optional brief or materials",
    drop: "Drop a file here or choose a file",
    pdfLimit: "UP TO 10 MB",
    fileType: "Please choose a file up to 10 MB.",
    fileSize: "The file must be 10 MB or smaller.",
    attachment: "Email links cannot attach files automatically. The filename is added to the draft as a reminder to attach it.",
    compose: "Open email draft",
    gmail: "Compose in Gmail",
    mailSubject: "Conversion review request",
    fileReminder: "Please attach this file manually",
    removeFile: "Remove file",
    optional: "Every field is optional. Empty fields are omitted from the email.",
  },
  ua: {
    label: "ЗАПИТ — КОНВЕРСІЙНИЙ РОЗБІР",
    title: <>ПОКАЖІТЬ, ДЕ<br />КЛІК ВТРАЧАЄ<br />ІМПУЛЬС.</>,
    intro: "Вкажіть поточний сайт, головну послугу й джерело трафіку. Ми визначимо корисний наступний крок і порадимо обсяг роботи — без обіцянок щодо кількості лідів.",
    premium: "ЛЕНДИНГ-СПРИНТ $4,000 — WEBSITE-СПРИНТ $8,500",
    cadence: "ЧІТКИЙ ОБСЯГ — ФІКСОВАНИЙ СПРИНТ — АДАПТИВНА РЕАЛІЗАЦІЯ",
    email: "Написати напряму",
    website: "Поточний сайт",
    market: "Бізнес і головна послуга",
    marketPlaceholder: "Наприклад: монтаж HVAC в Остіні",
    traffic: "Поточне джерело трафіку",
    trafficPlaceholder: "Google Ads, Meta Ads, органіка, рекомендації або ще не запущено",
    scale: "Імовірний спринт",
    scalePlaceholder: "Оберіть найближчий варіант",
    scaleOptions: {
      onePage: "Conversion Landing Sprint — $4,000",
      multiPage: "Conversion Website Sprint — $8,500",
      refresh: "Custom Growth Website — від $10,000",
      unsure: "Поки не впевнені",
    },
    barriers: "Поточні бар’єри",
    pdf: "Необов’язковий бриф або матеріали",
    drop: "Перетягніть файл або оберіть його",
    pdfLimit: "ДО 10 МБ",
    fileType: "Оберіть файл до 10 МБ.",
    fileSize: "Файл має бути не більшим за 10 МБ.",
    attachment: "Посилання на пошту не може прикріпити файл автоматично. Назва файлу буде додана в чернетку як нагадування.",
    compose: "Відкрити чернетку листа",
    gmail: "Написати у Gmail",
    mailSubject: "Запит на конверсійний розбір",
    fileReminder: "Будь ласка, прикріпіть файл вручну",
    removeFile: "Видалити файл",
    optional: "Усі поля необов’язкові. Порожні поля не потрапляють у лист.",
  },
  de: {
    label: "ANFRAGE — CONVERSION-REVIEW",
    title: <>ZEIGEN SIE UNS,<br />WO DER KLICK<br />AN WIRKUNG VERLIERT.</>,
    intro: "Nennen Sie die aktuelle Website, die wichtigste Leistung und die Traffic-Quelle. Wir bestimmen den sinnvollsten nächsten Schritt und empfehlen einen Umfang — ohne eine Lead-Zahl zu versprechen.",
    premium: "LANDING-SPRINT $4,000 — WEBSITE-SPRINT $8,500",
    cadence: "KLARER UMFANG — FESTER SPRINT — RESPONSIVE UMSETZUNG",
    email: "Direkt kontaktieren",
    website: "Aktuelle Website",
    market: "Unternehmen und wichtigste Leistung",
    marketPlaceholder: "Beispiel: HVAC-Installation in Austin",
    traffic: "Aktuelle Traffic-Quelle",
    trafficPlaceholder: "Google Ads, Meta Ads, organisch, Empfehlungen oder noch nicht aktiv",
    scale: "Voraussichtlicher Sprint",
    scalePlaceholder: "Passendste Option wählen",
    scaleOptions: {
      onePage: "Conversion Landing Sprint — $4,000",
      multiPage: "Conversion Website Sprint — $8,500",
      refresh: "Custom Growth Website — ab $10,000",
      unsure: "Noch nicht sicher",
    },
    barriers: "Aktuelle Hürden",
    pdf: "Optionales Briefing oder Materialien",
    drop: "Datei hier ablegen oder auswählen",
    pdfLimit: "BIS 10 MB",
    fileType: "Bitte eine Datei bis 10 MB auswählen.",
    fileSize: "Die Datei darf maximal 10 MB groß sein.",
    attachment: "E-Mail-Links können Dateien nicht automatisch anhängen. Der Dateiname wird als Erinnerung in den Entwurf eingefügt.",
    compose: "E-Mail-Entwurf öffnen",
    gmail: "In Gmail verfassen",
    mailSubject: "Anfrage für ein Conversion-Review",
    fileReminder: "Bitte diese Datei manuell anhängen",
    removeFile: "Datei entfernen",
    optional: "Alle Felder sind optional. Leere Felder werden nicht in die E-Mail übernommen.",
  },
};

const barrierOptions = {
  en: ["Offer clarity", "Trust and proof", "Mobile path", "CTA hierarchy", "Lead capture", "Speed or tracking"],
  ua: ["Ясність пропозиції", "Довіра й докази", "Мобільний шлях", "Ієрархія CTA", "Збір звернень", "Швидкість або аналітика"],
  de: ["Klares Angebot", "Vertrauen und Belege", "Mobiler Weg", "CTA-Hierarchie", "Lead-Erfassung", "Tempo oder Analyse"],
};

const initialValues = { website: "", market: "", traffic: "", scale: "", barriers: [] };

export function StartProjectPage() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;
  const barriers = barrierOptions[locale] || barrierOptions.en;
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const startedRef = useRef(false);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_started", { locale, form: "conversion_review" });
  }

  function updateField(event) {
    markStarted();
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function toggleBarrier(barrier) {
    markStarted();
    setValues((current) => ({
      ...current,
      barriers: current.barriers.includes(barrier)
        ? current.barriers.filter((item) => item !== barrier)
        : [...current.barriers, barrier],
    }));
  }

  function acceptFile(nextFile) {
    if (!nextFile) return;
    markStarted();
    if (nextFile.size > 10 * 1024 * 1024) {
      setFileError(labels.fileSize);
      return;
    }
    setFile(nextFile);
    setFileError("");
  }

  function buildDraft() {
    const lines = [];
    if (values.website.trim()) lines.push(`${labels.website}: ${values.website.trim()}`);
    if (values.market.trim()) lines.push(`${labels.market}: ${values.market.trim()}`);
    if (values.traffic.trim()) lines.push(`${labels.traffic}: ${values.traffic.trim()}`);
    if (values.scale) lines.push(`${labels.scale}: ${labels.scaleOptions[values.scale] || values.scale}`);
    if (values.barriers.length) lines.push(`${labels.barriers}: ${values.barriers.join(", ")}`);
    if (file) lines.push(`${labels.fileReminder}: ${file.name}`);
    return {
      subject: lines.length ? labels.mailSubject : "",
      body: lines.join("\n"),
    };
  }

  function openMail(event) {
    event.preventDefault();
    const { subject, body } = buildDraft();
    trackEvent("form_handoff", { locale, channel: "mailto", hasDetails: Boolean(body) });
    const query = new URLSearchParams();
    if (subject) query.set("subject", subject);
    if (body) query.set("body", body);
    window.location.href = `mailto:${CONTACT_EMAIL}${query.size ? `?${query.toString()}` : ""}`;
  }

  function openGmail() {
    const { subject, body } = buildDraft();
    trackEvent("form_handoff", { locale, channel: "gmail", hasDetails: Boolean(body) });
    const query = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL });
    if (subject) query.set("su", subject);
    if (body) query.set("body", body);
    window.open(`https://mail.google.com/mail/?${query.toString()}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="page page--start-project">
      <SoftShell className="intake-shell">
        <div className="intake-shell__intro">
          <SectionLabel>{labels.label}</SectionLabel>
          <h1>{labels.title}</h1>
          <p className="page-intro selectable">{labels.intro}</p>
          <a className="contact-email selectable" href={`mailto:${CONTACT_EMAIL}`}>
            <EnvelopeSimple aria-hidden="true" />
            <span><small>{labels.email}</small>{CONTACT_EMAIL}</span>
          </a>
          <div className="intake-commercial">
            <StatusBadge>{labels.premium}</StatusBadge>
            <p>{labels.cadence}</p>
          </div>
        </div>

        <form className="project-form" onSubmit={openMail}>
          <p className="project-form__optional selectable">{labels.optional}</p>

          <div className="form-field">
            <label htmlFor="website">{labels.website}</label>
            <input id="website" name="website" type="url" inputMode="url" placeholder="https://yourbusiness.com" value={values.website} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="market">{labels.market}</label>
            <input id="market" name="market" type="text" placeholder={labels.marketPlaceholder} value={values.market} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="traffic">{labels.traffic}</label>
            <input id="traffic" name="traffic" type="text" placeholder={labels.trafficPlaceholder} value={values.traffic} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="scale">{labels.scale}</label>
            <select id="scale" name="scale" value={values.scale} onChange={updateField}>
              <option value="">{labels.scalePlaceholder}</option>
              {Object.entries(labels.scaleOptions).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <fieldset className="barrier-fieldset">
            <legend>{labels.barriers}</legend>
            <div>
              {barriers.map((barrier) => (
                <label key={barrier}>
                  <input type="checkbox" checked={values.barriers.includes(barrier)} onChange={() => toggleBarrier(barrier)} />
                  <span><Check aria-hidden="true" />{barrier}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-field">
            <label htmlFor="project-file">{labels.pdf}</label>
            <label
              className={`file-drop ${dragging ? "is-dragging" : ""}`}
              htmlFor="project-file"
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files?.[0]); }}
            >
            <input id="project-file" type="file" accept=".pdf,.doc,.docx,.txt,image/*" onChange={(event) => acceptFile(event.target.files?.[0])} />
              <FileArrowUp aria-hidden="true" />
              <span>{file ? file.name : labels.drop}<small>{labels.pdfLimit}</small></span>
              {file && (
                <button type="button" aria-label={`${labels.removeFile}: ${file.name}`} onClick={(event) => { event.preventDefault(); setFile(null); }}>
                  <X aria-hidden="true" />
                </button>
              )}
            </label>
            {fileError && <p className="form-error" role="alert">{fileError}</p>}
            {file && <p className="file-attachment-note selectable"><Paperclip aria-hidden="true" />{labels.attachment}</p>}
          </div>

          <div className="project-form__submit project-form__submit--email">
            <button type="submit"><Sparkle aria-hidden="true" />{labels.compose}</button>
            <button className="project-form__gmail" type="button" onClick={openGmail}><GoogleLogo aria-hidden="true" />{labels.gmail}</button>
          </div>
        </form>
      </SoftShell>
    </div>
  );
}
