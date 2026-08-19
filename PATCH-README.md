# iPLUSgor GitHub patch — 2026-08-20

This archive contains only the production source files required for the current update:

- two new self-initiated Work concepts and optimized WebP assets;
- localized Work metadata and viewer correction;
- localized business-value evidence and FAQ section;
- route-aware UA, EN and DE SEO metadata;
- canonical, sitemap, social metadata and Organization/WebSite structured data;
- ambient-video cache recovery and poster fallback;
- regression tests for the new content and SEO contract.

## Apply through GitHub

1. Open the root of the `iPLUSgor-DIGITAL` repository on the `main` branch.
2. Choose **Add file → Upload files**.
3. Extract this archive locally.
4. Drag all extracted folders and files except this README into the GitHub upload area. Keep the folder structure unchanged.
5. Confirm that GitHub shows replacements inside `src`, `public`, `scripts`, and `tests`, rather than creating an extra parent folder.
6. Commit with:
   - Title: `Add website concepts, FAQ and production SEO metadata`
   - Description: `Publishes two labelled independent concepts, adds localized business evidence and FAQ content, strengthens route metadata and structured data, and hardens ambient video loading.`
7. Wait for the GitHub Pages workflow to complete.
8. Verify `/`, `/work`, `/team`, `/sitemap.xml`, and `/robots.txt` on `https://iplusgor.com`.
9. In Google Search Console, submit `https://iplusgor.com/sitemap.xml` and request indexing for the home page.

## Verified before packaging

- `npm run build:pages`
- `npm test`
- `npm run test:sites`
- targeted Playwright test for Work concepts, viewer, FAQ, accessibility and mobile overflow

No dependencies, build output, local environment files, screenshots, design-QA artifacts, credentials, Git metadata or editor files are included.
