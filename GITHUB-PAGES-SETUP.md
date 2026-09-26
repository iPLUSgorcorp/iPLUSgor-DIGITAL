# Publish this site to the existing GitHub Pages domain

Target repository: `iPLUSgorcorp/iPLUSgor-DIGITAL`

Target branch: `main`

Production domain: `iplusgor.com`

The repository already contains `.github/workflows/deploy-pages.yml`. A push to `main` runs source, browser and accessibility tests, builds the Vite site, verifies the generated localized routes and publishes `dist/client` with GitHub Actions. The current workflow sets the site origin and Vite base path to `https://iplusgor.com` and `/`. `public/CNAME` also contains `iplusgor.com`. No replacement repository or new domain is needed.

## Before pushing

1. Sign in to GitHub CLI with an account that has write access to `iPLUSgorcorp/iPLUSgor-DIGITAL`. Check with `gh repo view iPLUSgorcorp/iPLUSgor-DIGITAL --json viewerPermission`. `READ` is insufficient.
2. Run `npm ci`, `npm test`, `npm run build:pages`, `npm run verify:pages` and `npm run test:e2e`.
3. Review the complete source diff and generated `dist/client/CNAME`. Confirm the old public address does not appear in source or generated output.
4. Commit the verified site changes and push the same `main` branch. The push starts the existing Pages workflow automatically.
5. Watch the workflow until both build and deploy jobs succeed. Open the live site at `https://iplusgor.com/` and verify UA, EN and DE routes, direct links, assets, contact draft and metadata.

## Domain settings

The existing GitHub Pages configuration reports `cname: iplusgor.com` and an approved HTTPS certificate for `iplusgor.com` and `www.iplusgor.com`. DNS A records point to GitHub Pages. The Pages API currently reports `https_enforced: false`; once signed in with repository admin permission, enable **Enforce HTTPS** in **Settings → Pages** or with the Pages API, then verify HTTP redirects to HTTPS. Keep the existing domain and DNS records.

If deployment cannot run after the push, check **Settings → Pages → Build and deployment** is set to **GitHub Actions** and that the Actions workflow has Pages deployment permission. Do not upload `dist` manually or change the base path to the repository name: this site uses the custom apex domain.
