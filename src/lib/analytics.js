export function trackEvent(name, details = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: name,
    ...details,
  };

  window.dispatchEvent(new CustomEvent("iplusgor:conversion", { detail: payload }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}
