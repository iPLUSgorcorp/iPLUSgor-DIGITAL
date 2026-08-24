import {
  Check,
  FileText,
  GridFour,
  Lightning,
  SlidersHorizontal,
  Wrench,
} from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";

function CatalogueSelect({
  active = false,
  application = false,
  icon: Icon,
  label,
  onChange,
  options,
  value,
}) {
  const [open, setOpen] = useState(false);
  const controlRef = useRef(null);
  const buttonRef = useRef(null);
  const listboxId = useId();
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const closeFromOutside = (event) => {
      if (!controlRef.current?.contains(event.target)) setOpen(false);
    };
    const closeFromKeyboard = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeFromOutside);
    window.addEventListener("keydown", closeFromKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      window.removeEventListener("keydown", closeFromKeyboard);
    };
  }, []);

  return (
    <div
      ref={controlRef}
      className={[
        "catalogue-filter-control",
        application ? "catalogue-filter-control--application" : "",
        open ? "is-open" : "",
      ].filter(Boolean).join(" ")}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`catalogue-filter-row ${active ? "catalogue-filter-row--active" : ""}`}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="catalogue-filter-row__icon"><Icon aria-hidden="true" /></span>
        <span className="catalogue-filter-row__copy">
          <span className="catalogue-filter-row__name">{label}</span>
          <span className="catalogue-filter-row__value">{selected.label}</span>
        </span>
        <span
          className="catalogue-filter-row__chevron catalogue-filter-row__chevron--caret"
          aria-hidden="true"
        />
      </button>

      <div className="catalogue-filter-menu" inert={!open}>
        <div>
          <div id={listboxId} role="listbox" aria-label={label}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <span>{option.label}</span>
                {option.value === value && <Check aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogueToggle({
  active,
  icon: Icon,
  label,
  onChange,
  value,
  valueLabel,
}) {
  return (
    <button
      type="button"
      className={`catalogue-toggle catalogue-filter-row ${active || value ? "catalogue-filter-row--active" : ""} ${value ? "is-selected" : ""}`}
      aria-pressed={value}
      onClick={() => onChange(!value)}
    >
      <span className="catalogue-filter-row__icon"><Icon aria-hidden="true" /></span>
      <span className="catalogue-filter-row__copy">
        <span className="catalogue-filter-row__name">{label}</span>
        <span className="catalogue-filter-row__value">{valueLabel}</span>
      </span>
      <Check className="catalogue-filter-row__chevron" aria-hidden="true" />
    </button>
  );
}

export function CatalogueFilterPanel({
  application,
  availabilityOnly,
  documentationOnly,
  installation,
  labels,
  power,
  setApplication,
  setAvailabilityOnly,
  setDocumentationOnly,
  setInstallation,
  setPower,
}) {
  const reset = () => {
    setApplication("all");
    setPower("all");
    setInstallation("all");
    setDocumentationOnly(false);
    setAvailabilityOnly(false);
  };

  return (
    <form
      className="catalogue-filters catalogue-filters--interactive"
      aria-label={labels.filters}
      onSubmit={(event) => event.preventDefault()}
    >
      <CatalogueSelect
        application
        icon={GridFour}
        label={labels.application}
        value={application}
        onChange={setApplication}
        options={[
          { value: "all", label: labels.allApplications },
          { value: "space", label: labels.spaceHeating },
          { value: "water", label: labels.waterHeating },
          { value: "process", label: labels.processHeat },
        ]}
      />

      <CatalogueSelect
        active
        icon={Lightning}
        label={labels.power}
        value={power}
        onChange={setPower}
        options={[
          { value: "all", label: "10 – 50 kW" },
          { value: "low", label: "10 – 20 kW" },
          { value: "medium", label: "20 – 35 kW" },
          { value: "high", label: "35 – 50 kW" },
        ]}
      />

      <CatalogueSelect
        icon={Wrench}
        label={labels.installation}
        value={installation}
        onChange={setInstallation}
        options={[
          { value: "all", label: labels.allApplications },
          { value: "Wall-mounted", label: labels.wallMounted },
          { value: "Floor-standing", label: labels.floorStanding },
        ]}
      />

      <CatalogueToggle
        icon={FileText}
        label={labels.documentation}
        value={documentationOnly}
        valueLabel={labels.technical}
        onChange={setDocumentationOnly}
      />

      <CatalogueToggle
        icon={Check}
        label={labels.availability}
        value={availabilityOnly}
        valueLabel={labels.stock}
        onChange={setAvailabilityOnly}
      />

      <button className="catalogue-filters__reset" type="button" onClick={reset}>
        <SlidersHorizontal aria-hidden="true" />
        {labels.reset}
      </button>
    </form>
  );
}
