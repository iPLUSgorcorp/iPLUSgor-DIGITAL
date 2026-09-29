# Optional integrations

The production site remains safe for static hosting and does not claim integrations that are not configured.

## Booking

The primary intake is asynchronous. A booking link can be added later as a secondary step after a project inquiry. Prefer an external link over a heavy embedded widget. The booking account and calendar should be owned by I+Gor.

## Form and CRM

The current static form prepares a draft for the visitor’s mail application and provides a copyable project brief. It does not pretend to submit to a backend. The public destination is `hello@iplusgor.com`.

Possible later adapters:

- Formspree or Basin for a small managed form endpoint;
- a Cloudflare Worker for validation, rate limiting and a controlled CRM webhook;
- a direct CRM form endpoint when the selected CRM provides one.

Any adapter needs spam protection, a privacy notice, server-side validation and explicit ownership of API keys outside the repository.

## GA4: active integration

Measurement ID: `G-NXQSRS6NSX`. The Google tag loads asynchronously only on `iplusgor.com` / `www.iplusgor.com` after the visitor allows analytics. The footer's Analytics settings control can change that choice. Declining suppresses the tag; revoking disables collection and removes first-party GA cookies. Advertising storage, ad personalization and Google signals are disabled.

GA4 sends the initial page view when the tag loads. On SPA route changes, the app updates page metadata and sends one explicit page-view event. Keep the stream's enhanced "Page changes based on browser history events" option disabled to avoid duplicates. No GTM container is required.

Custom events are `primary_cta_click`, `form_started`, `form_handoff`. Only the allowlisted `destination`, `locale` and `method` values can be sent by the site. A prepared email is not reported as a submitted lead. Form values, contact details and brief text are excluded.

Validate the initial and route-change `page_view` requests and custom events in the browser Network panel. GA4 Realtime / DebugView requires access to the owner's Analytics property; deployment verification cannot prove the property has processed the events. Development and build-time rendering do not send analytics.
