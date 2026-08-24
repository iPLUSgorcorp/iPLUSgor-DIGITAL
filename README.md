# iPLUSgor frontend

Production-oriented responsive frontend for iPLUSgor Digital conversion-focused
website and landing-page sprints for service businesses.

## Stack

- React 19
- Vite 6
- React Router 7
- Onest (self-hosted through `@fontsource/onest`)
- Phosphor Icons
- JavaScript/JSX (TypeScript is not configured in the source scaffold)

Node 18+ is required. The repository uses npm and the committed
`package-lock.json`.

## Commands

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd test
npm.cmd run build:pages
npm.cmd run verify:pages
npm.cmd run build
```

The Vite dev server accepts `--host`, `--port` and `--strictPort` for local
browser verification.

## Theme

The header includes a light/dark theme control. The initial theme follows the
browser preference and an explicit choice is stored locally in the browser.
Both themes use the same responsive geometry and support reduced motion.

## GitHub publication

The repository is source-complete and builds with the committed lockfile. The
Pages workflow detects whether the repository is a root `*.github.io` site or a
project site and applies the correct base path automatically. It also emits a
`404.html` SPA fallback so direct links to every public route keep working.

Local verification for a project repository named `iPLUSgor`:

```powershell
npm.cmd ci
$env:VITE_BASE_PATH = "/iPLUSgor/"
npm.cmd run build:pages
Remove-Item Env:\VITE_BASE_PATH
```

The generated `dist/client` directory contains the static browser build and is
the directory uploaded by `.github/workflows/deploy-pages.yml`.

In GitHub, select **Settings → Pages → Build and deployment → Source: GitHub
Actions**. A push to `main`, or a manual run from the Actions tab, then deploys
the site.

## Media privacy

Publishable PNG, JPEG, WebP and MP4 assets can be cleaned with:

```powershell
npm.cmd run clean:media
```

The cleaner removes EXIF/XMP, textual comments, timestamps and container
metadata without re-encoding image pixels or video streams. ICC/sRGB data is
retained because it controls accurate colour rendering.

## Routes

- `/`
- `/approach`
- `/solutions`
- `/solutions/catalogue`
- `/work`
- `/team`
- `/start-project`

The legacy `/work/aton` URL redirects to `/work`; it is not a published case.
The Pages build emits route documents and a `404.html` fallback so direct
navigation works on the custom domain.

## Contact handoff

`ProjectIntakeForm` has no backend. Optional fields are assembled into a
prefilled `mailto:` or Gmail compose draft for `igorcorp.tech@gmail.com`.
Browsers cannot attach a local PDF through either URL, so the filename is added
to the draft as an explicit reminder to attach it manually.

## Local concept manager

The ignored `.local-tools/work-concept-manager.py` utility runs only on the
owner's machine. It writes concept metadata to
`public/data/work-concepts.json` and before/after images to
`public/assets/work-concepts`. The tool itself is excluded from Git; the
published JSON and concept images can be reviewed and committed separately.

## Brand assets

Optimized transparent WebP assets used by the interface are in
`public/assets/brand`. Archival PNG sources are not required by the production
runtime. Brand assets can be reproduced from the supplied chroma-key sources with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\prepare-brand-assets.ps1
```
