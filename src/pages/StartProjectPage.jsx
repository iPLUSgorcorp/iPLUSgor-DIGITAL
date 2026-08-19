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
    label: "START PROJECT — PRELIMINARY REVIEW",
    title: <>SHOW US WHERE<br />THE WEBSITE<br />GETS IN THE WAY.</>,
    intro: "A preliminary review is a focused look at the current website, business goal and customer path — not a redesign proposal.",
    premium: "SELECTIVE, SCOPE-LED ENGAGEMENTS",
    cadence: "DIRECT TEAM — CLEAR SCOPE — RESPONSIVE DELIVERY",
    email: "Contact directly",
    website: "Current website",
    market: "Primary market",
    scale: "Website scope",
    scalePlaceholder: "Select an approximate scope",
    barriers: "Current barriers",
    pdf: "Optional brief or materials",
    drop: "Drop a file here or choose a file",
    pdfLimit: "UP TO 10 MB",
    fileType: "Please choose a file up to 10 MB.",
    fileSize: "The file must be 10 MB or smaller.",
    attachment: "Email links cannot attach files automatically. The filename is added to the draft as a reminder to attach it.",
    compose: "Open email draft",
    gmail: "Compose in Gmail",
    mailSubject: "Preliminary review request",
    fileReminder: "Please attach this file manually",
    optional: "Every field is optional. Empty fields are omitted from the email.",
  },
  ua: {
    label: "ПОЧАТИ ПРОЄКТ — ПОПЕРЕДНІЙ РОЗБІР",
    title: <>ПОКАЖІТЬ, ДЕ<br />САЙТ<br />ЗАВАЖАЄ.</>,
    intro: "Попередній розбір — це сфокусований погляд на поточний сайт, ціль бізнесу й шлях клієнта, а не безкоштовна пропозиція редизайну.",
    premium: "ВИБІРКОВА РОБОТА, ОЦІНКА ЗА ОБСЯГОМ",
    cadence: "ПРЯМИЙ КОНТАКТ — ЧІТКИЙ ОБСЯГ — АДАПТИВНА РЕАЛІЗАЦІЯ",
    email: "Написати напряму",
    website: "Поточний сайт",
    market: "Основний ринок",
    scale: "Обсяг сайту",
    scalePlaceholder: "Оберіть приблизний обсяг",
    barriers: "Поточні бар’єри",
    pdf: "Необов’язковий бриф або матеріали",
    drop: "Перетягніть файл або оберіть його",
    pdfLimit: "ДО 10 МБ",
    fileType: "Оберіть файл до 10 МБ.",
    fileSize: "Файл має бути не більшим за 10 МБ.",
    attachment: "Посилання на пошту не може прикріпити файл автоматично. Назва файлу буде додана в чернетку як нагадування.",
    compose: "Відкрити чернетку листа",
    gmail: "Написати у Gmail",
    mailSubject: "Запит на попередній розбір",
    fileReminder: "Будь ласка, прикріпіть файл вручну",
    optional: "Усі поля необов’язкові. Порожні поля не потрапляють у лист.",
  },
  de: {
    label: "PROJEKT STARTEN — VORPRÜFUNG",
    title: <>ZEIGEN SIE UNS,<br />WO DIE WEBSITE<br />IM WEG STEHT.</>,
    intro: "Eine Vorprüfung ist ein fokussierter Blick auf die aktuelle Website, das Geschäftsziel und den Kundenweg — kein kostenloser Redesign-Vorschlag.",
    premium: "AUSGEWÄHLTE, UMFANGSBASIERTE PROJEKTE",
    cadence: "DIREKTES TEAM — KLARER UMFANG — RESPONSIVE UMSETZUNG",
    email: "Direkt kontaktieren",
    website: "Aktuelle Website",
    market: "Hauptmarkt",
    scale: "Website-Umfang",
    scalePlaceholder: "Ungefähren Umfang wählen",
    barriers: "Aktuelle Hürden",
    pdf: "Optionales Briefing oder Materialien",
    drop: "Datei hier ablegen oder auswählen",
    pdfLimit: "BIS 10 MB",
    fileType: "Bitte eine Datei bis 10 MB auswählen.",
    fileSize: "Die Datei darf maximal 10 MB groß sein.",
    attachment: "E-Mail-Links können Dateien nicht automatisch anhängen. Der Dateiname wird als Erinnerung in den Entwurf eingefügt.",
    compose: "E-Mail-Entwurf öffnen",
    gmail: "In Gmail verfassen",
    mailSubject: "Anfrage zur Vorprüfung",
    fileReminder: "Bitte diese Datei manuell anhängen",
    optional: "Alle Felder sind optional. Leere Felder werden nicht in die E-Mail übernommen.",
  },
};

const barrierOptions = {
  en: ["Clear offer", "Mobile experience", "Content", "Languages", "Request flow"],
  ua: ["Зрозуміла пропозиція", "Мобільний досвід", "Контент", "Мови", "Шлях запиту"],
  de: ["Klares Angebot", "Mobile Nutzung", "Inhalte", "Sprachen", "Anfrageweg"],
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
            <input id="website" name="website" type="url" inputMode="url" placeholder="https://yourbusiness.com" value={values.website} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="market">{labels.market}</label>
            <input id="market" name="market" type="text" placeholder="Business, service or region" value={values.market} onChange={updateField} />
          </div>

          <div className="form-field">
            <label htmlFor="scale">{labels.scale}</label>
            <select id="scale" name="scale" value={values.scale} onChange={updateField}>
              <option value="">{labels.scalePlaceholder}</option>
              <option value="One-page website">One-page website</option>
              <option value="Small multi-page website">Small multi-page website</option>
              <option value="Website refresh">Website refresh</option>
              <option value="Not sure yet">Not sure yet</option>
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
