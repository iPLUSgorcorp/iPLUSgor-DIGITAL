# iPLUSgor production full-sync patch — 2026-08-20

This package replaces the mixed GitHub source with one coherent local production version.

It includes:

- the complete `src` application;
- every runtime asset referenced by the application and Work JSON;
- GitHub Pages workflow using Node.js 24;
- Vite, package and lock files;
- build scripts, worker files and regression tests;
- production SEO, sitemap, manifest and robots files.

The package intentionally excludes dependencies, build output, local tooling, QA screenshots, credentials, Git metadata and development instructions.

## Upload

1. Extract this archive.
2. Open the root of the `iPLUSgor-DIGITAL` repository on `main`.
3. Choose **Add file → Upload files**.
4. Upload the extracted contents, not the enclosing archive folder.
5. Confirm that GitHub replaces files throughout `src`, `public`, `scripts`, `tests` and the root.
6. Confirm `.github/workflows/deploy-pages.yml` exists and uses Node.js 24. If the browser omits the hidden `.github` directory, upload that workflow file separately through GitHub's file editor.
7. Commit with title `Synchronize production source and brand assets`.
8. Wait for the Pages workflow and hard-refresh the production site after deployment.

The obsolete Creative footer copy and stretched legacy logo are not present in this source. The required `assets/brand/iplusgor-symbol-signal.png` file is included.
