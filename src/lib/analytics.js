export const measurementId = 'G-NXQSRS6NSX';
const consentKey = 'iplusgor-analytics-consent';
let initialized = false;
let previousPage = '';
let sessionChoice = null;

export function getAnalyticsConsent() {
  if (typeof window === 'undefined') return null;
  try { return sessionChoice || window.localStorage.getItem(consentKey); } catch { return sessionChoice; }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || getAnalyticsConsent() !== 'accepted') return;
  if (!['iplusgor.com', 'www.iplusgor.com'].includes(window.location.hostname)) return;
  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer ||= [];
  window.gtag ||= function () { window.dataLayer.push(arguments); };
  window.gtag('consent', initialized ? 'update' : 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (initialized) return;
  initialized = true;
  previousPage = `${window.location.origin}${window.location.pathname}`;
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_title: document.title,
    page_location: `${window.location.origin}${window.location.pathname}`,
  });
  const script = document.createElement('script');
  script.id = 'google-analytics-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}

export function setAnalyticsConsent(choice) {
  const previousChoice = getAnalyticsConsent();
  sessionChoice = choice;
  try { window.localStorage.setItem(consentKey, choice); } catch { /* Session choice still applies. */ }
  if (choice === 'accepted') {
    initializeAnalytics();
    if (initialized && previousChoice === 'declined') {
      previousPage = `${window.location.origin}${window.location.pathname}`;
      window.gtag('event', 'page_view', { page_title: document.title, page_location: previousPage });
    }
  } else {
    window[`ga-disable-${measurementId}`] = true;
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    for (const cookie of ['_ga', `_ga_${measurementId.slice(2).replaceAll('-', '_')}`]) {
      for (const domain of ['', '; domain=iplusgor.com', '; domain=.iplusgor.com']) {
        document.cookie = `${cookie}=; Max-Age=0; path=/${domain}`;
      }
    }
  }
}

export function updateAnalyticsPage() {
  if (!initialized || getAnalyticsConsent() !== 'accepted') return;
  const page = `${window.location.origin}${window.location.pathname}`;
  if (page === previousPage) return;
  const pageReferrer = previousPage;
  window.gtag('config', measurementId, { update: true, page_title: document.title, page_location: page });
  window.gtag('event', 'page_view', { page_title: document.title, page_location: page, page_referrer: pageReferrer });
  previousPage = page;
}

export function trackEvent(name, details = {}) {
  if (typeof window === 'undefined') return;
  const safe = Object.fromEntries(['destination', 'locale', 'method'].filter((key) => typeof details[key] === 'string').map((key) => [key, details[key]]));
  const payload = { event: name, ...safe };
  window.dispatchEvent(new CustomEvent('iplusgor:conversion', { detail: payload }));
  if (initialized && getAnalyticsConsent() === 'accepted') window.gtag?.('event', name, safe);
}
