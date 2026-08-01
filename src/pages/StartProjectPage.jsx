import {
  Check,
  EnvelopeSimple,
  FileArrowUp,
  GoogleLogo,
  Paperclip,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";
import { SectionLabel, SoftShell, StatusBadge } from "../components/Primitives.jsx";
import { useLocale } from "../i18n.jsx";

const CONTACT_EMAIL = "igorcorp.tech@gmail.com";

const copy = {
  en: {
    label: "Start project / preliminary review",
    title: <>SHOW US WHERE<br />THE PLATFORM<br />GETS IN THE WAY.</>,
    intro: "A preliminary review is a focused diagnosis of the current structure, catalogue and buyer path — not a redesign proposal.",
    premium: "SELECTIVE / SCOPE-LED ENGAGEMENTS",
    cadence: "DIRECT TEAM / CLEAR SCOPE / RESPONSIVE DELIVERY",
    email: "Contact directly",
    website: "Current website",
    market: "Primary market",
    scale: "Catalogue scale",
    scalePlaceholder: "Select approximate scale",
    barriers: "Current barriers",
    pdf: "Optional catalogue or technical PDF",
    drop: "Drop a PDF here or choose a file",
    pdfLimit: "PDF / up to 10 MB",
    fileType: "Only PDF files are accepted.",
    fileSize: "The PDF must be 10 MB or smaller.",
    attachment: "Email links cannot attach files automatically. The filename is added to the draft as a reminder to attach it.",
    compose: "Open email draft",
    gmail: "Compose in Gmail",
    mailSubject: "Preliminary review request",
    fileReminder: "Please attach this file manually",
    optional: "Every field is optional. Empty fields are omitted from the email.",
  },
  ua: {
    label: "Почати проєкт / попередній розбір",
    title: <>ПОКАЖІТЬ, ДЕ<br />ПЛАТФОРМА<br />ЗАВАЖАЄ.</>,
    intro: "Попередній розбір — це сфокусована діагностика структури, каталогу та шляху покупця, а не безкоштовна пропозиція редизайну.",
    premium: "ВИБІРКОВА РОБОТА / ОЦІНКА ЗА ОБСЯГОМ",
    cadence: "ПРЯМИЙ КОНТАКТ / ЧІТКИЙ ОБСЯГ / АДАПТИВНА РЕАЛІЗАЦІЯ",
    email: "Написати напряму",
    website: "Поточний сайт",
    market: "Основний ринок",
    scale: "Розмір каталогу",
    scalePlaceholder: "Оберіть приблизний масштаб",
    barriers: "Поточні бар’єри",
    pdf: "Необов’язковий каталог або технічний PDF",
    drop: "Перетягніть PDF або оберіть файл",
    pdfLimit: "PDF / до 10 МБ",
    fileType: "Можна додати лише PDF.",
    fileSize: "PDF має бути не більшим за 10 МБ.",
    attachment: "Посилання на пошту не може прикріпити файл автоматично. Назва файлу буде додана в чернетку як нагадування.",
    compose: "Відкрити чернетку листа",
    gmail: "Написати у Gmail",
    mailSubject: "Запит на попередній розбір",
    fileReminder: "Будь ласка, прикріпіть файл вручну",
    optional: "Усі поля необов’язкові. Порожні поля не потрапляють у лист.",
  },
  de: {
    label: "Projekt starten / Vorprüfung",
    title: <>ZEIGEN SIE UNS,<br />WO DIE PLATTFORM<br />IM WEG STEHT.</>,
    intro: "Eine Vorprüfung ist eine fokussierte Diagnose von Struktur, Katalog und Käuferpfad — kein kostenloser Redesign-Vorschlag.",
    premium: "AUSGEWÄHLTE / UMFANGSBASIERTE PROJEKTE",
    cadence: "DIREKTES TEAM / KLARER UMFANG / RESPONSIVE UMSETZUNG",
    email: "Direkt kontaktieren",
    website: "Aktuelle Website",
    market: "Hauptmarkt",
    scale: "Katalogumfang",
    scalePlaceholder: "Ungefähren Umfang wählen",
    barriers: "Aktuelle Hürden",
    pdf: "Optionaler Katalog oder technisches PDF",
    drop: "PDF hier ablegen oder Datei auswählen",
    pdfLimit: "PDF / bis 10 MB",
    fileType: "Nur PDF-Dateien werden akzeptiert.",
    fileSize: "Das PDF darf maximal 10 MB groß sein.",
    attachment: "E-Mail-Links können Dateien nicht automatisch anhängen. Der Dateiname wird als Erinnerung in den Entwurf eingefügt.",
    compose: "E-Mail-Entwurf öffnen",
    gmail: "In Gmail verfassen",
    mailSubject: "Anfrage zur Vorprüfung",
    fileReminder: "Bitte diese Datei manuell anhängen",
    optional: "Alle Felder sind optional. Leere Felder werden nicht in die E-Mail übernommen.",
  },
};

const barrierOptions = {
  en: ["Product finding", "Mobile UX", "Technical documents", "Languages", "Request flow"],
  ua: ["Пошук продукту", "Мобільний UX", "Технічні документи", "Мови", "Шлях запиту"],
  de: ["Produktsuche", "Mobile UX", "Technische Dokumente", "Sprachen", "Anfrageweg"],
};

const initialValues = { website: "", market: "", scale: "", barriers: [] };

export function StartProjectPage() {
  const { locale } = useLocale();
  const labels = copy[locale] || copy.en;
  const barriers = barrierOptions[locale] || barrierOptions.en;
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function toggleBarrier(barrier) {
    setValues((current) => ({
      ...current,
      barriers: current.barriers.includes(barrier)
        ? current.barriers.filter((item) => item !== barrier)
        : [...current.barriers, barrier],
    }));
  }

  function acceptFile(nextFile) {
    if (!nextFile) return;
    if (!(nextFile.type === "application/pdf" || nextFile.name.toLowerCase().endsWith(".pdf"))) {
      setFileError(labels.fileType);
      return;
    }
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
    if (values.scale) lines.push(`${labels.scale}: ${values.scale}`);
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
    const query = new URLSearchParams();
    if (subject) query.set("subject", subject);
    if (body) query.set("body", body);
    window.location.href = `mailto:${CONTACT_EMAIL}${query.size ? `?${query.toString()}` : ""}`;
  }

  function openGmail() {
    const { subject, body } = buildDraft();
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
            <input id="website" name="website" type="url" inputMode="url" placeholder="https://manufacturer.com" value={values.website} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="market">{labels.market}</label>
            <input id="market" name="market" type="text" placeholder="Market, region or dealer territory" value={values.market} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="scale">{labels.scale}</label>
            <select id="scale" name="scale" value={values.scale} onChange={updateField}>
              <option value="">{labels.scalePlaceholder}</option>
              <option value="Under 50 models">Under 50 models</option>
              <option value="50–200 models">50–200 models</option>
              <option value="200–500 models">200–500 models</option>
              <option value="500+ models">500+ models</option>
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
              <input id="project-file" type="file" accept="application/pdf,.pdf" onChange={(event) => acceptFile(event.target.files?.[0])} />
              <FileArrowUp aria-hidden="true" />
              <span>{file ? file.name : labels.drop}<small>{labels.pdfLimit}</small></span>
              {file && (
                <button type="button" aria-label={`Remove ${file.name}`} onClick={(event) => { event.preventDefault(); setFile(null); }}>
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
