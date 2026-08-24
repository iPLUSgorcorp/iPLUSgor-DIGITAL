# Optional integrations

The production site remains safe for static hosting and does not claim integrations that are not configured.

## Analytics

The frontend emits `iplusgor:conversion` browser events and pushes the same payload to `window.dataLayer` only when a data layer already exists. Current events include primary CTA clicks, first form interaction and the email handoff.

To connect GA4 without changing the UI:

1. create a Google Tag Manager container owned by iPLUSgor;
2. load it only after the required privacy/consent decision;
3. map the existing event names to GA4 events;
4. validate them in GA4 DebugView before production;
5. never include form field values, email addresses or uploaded-file names in analytics payloads.

No analytics script or tracking ID is committed now.

## Booking

Calendly or Cal.com can be added later as a secondary action after the conversion review. Prefer an external booking link over a heavy embedded widget so the main site remains fast. The booking account and calendar should be owned by iPLUSgor.

## Form and CRM

The current static form prepares an email through Gmail or the visitor’s mail application. It does not pretend to submit to a backend.

Possible later adapters:

- Formspree or Basin for a small managed form endpoint;
- a Cloudflare Worker for validation, rate limiting and a controlled CRM webhook;
- a direct CRM form endpoint when the selected CRM provides one.

Any adapter needs spam protection, a privacy notice, server-side validation and explicit ownership of API keys outside the repository.
