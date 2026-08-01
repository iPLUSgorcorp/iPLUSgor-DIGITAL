# iPLUSgor Digital

Responsive frontend for the iPLUSgor Digital website.

## Stack

- React 19
- Vite 6
- React Router 7
- Onest
- Phosphor Icons
- npm with a committed lockfile

Node.js 20 is recommended.

## Local development

```powershell
npm.cmd ci
npm.cmd run dev
```

## Verification

```powershell
npm.cmd test
npm.cmd run test:e2e
npm.cmd run build
```

## GitHub Pages

The included workflow automatically detects whether the repository is a root
`*.github.io` site or a project site, applies the correct base path and creates
an SPA fallback for direct links.

1. Upload the contents of this archive to the repository root.
2. In GitHub, open **Settings → Pages**.
3. Select **GitHub Actions** under **Build and deployment**.
4. Push to `main` or run the Pages workflow manually from the Actions tab.

If GitHub's browser uploader omits the hidden `.github` directory, follow the
instructions in `GITHUB-PAGES-SETUP.md`.

## Media privacy

Publishable media can be cleaned without re-encoding image pixels or video
streams:

```powershell
npm.cmd run clean:media
```

## Public routes

- `/`
- `/approach`
- `/solutions`
- `/solutions/catalogue`
- `/work`
- `/team`
- `/start-project`

The contact form creates a prepared email draft for
`igorcorp.tech@gmail.com`; it does not claim or require a server-side form
endpoint.
