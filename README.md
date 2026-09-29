# I+Gor website

Production website for I+Gor, a digital implementation company building conversion systems, business automation, integrations and custom software around costly business bottlenecks.

## Stack

React 19, Vite 6, React Router 7, self-hosted Onest (SIL Open Font License 1.1), Playwright and axe. The site is static and publishes to GitHub Pages at `iplusgor.com`.

The navigation and footer use the original `iPLUSgor` light and dark logo files from `public/assets/brand`; the original signal mark is the favicon. Commercial copy for the four capabilities and workflow examples lives in `src/content/service-depth.js` in Ukrainian, English and German. Motion uses CSS and respects `prefers-reduced-motion`.

Four optimized, self-hosted editorial images in `public/assets/process` illustrate diagnosis, design, build and launch checks. They are generated illustrations in a documentary photographic style, not photographs of I+Gor staff, clients or client results. Their generation prompts are recorded in [docs/process-image-prompts.md](docs/process-image-prompts.md).

## Commands

```sh
npm ci
npm test
npm run build
npm run verify:pages
npm run test:e2e
```

## Routes

The public pages are `/`, `/services/`, `/about/` and `/start-project/`. Ukrainian uses root paths; English and German use `/en/` and `/de/`. Legacy paths are retained as static and client-side redirects to relevant new pages. `scripts/prepare-github-pages.mjs` renders full localized page HTML from a build-only React SSR entry and emits the GitHub Pages SPA fallback. Pages contain their visible copy, links and page-specific structured data before JavaScript runs. The sitemap includes reciprocal language alternatives and a factual content modification date. `scripts/verify-pages-build.mjs` checks those documents and referenced assets.

## Contact

The intake prepares an email to `hello@iplusgor.com` and offers a copyable brief. No form backend is configured. Visitors must send the prepared email from their mail app. The site does not claim a successful submission before that happens.

## Analytics

GA4 (`G-NXQSRS6NSX`) loads after optional analytics consent on the production domain. SPA page views use GA4 history measurement. Custom events exclude all form values. Development and static rendering never collect data. See [INTEGRATIONS.md](INTEGRATIONS.md).

## Deployment

`.github/workflows/deploy-pages.yml` installs from the lockfile, builds, verifies, then uploads `dist/client` to GitHub Pages. The `CNAME` and canonical origin remain `iplusgor.com`. No deployment credentials are stored in the repository.
