# iPLUSgor custom-domain root hotfix

The previous GitHub Pages workflow built the project with `/iPLUSgor-DIGITAL/` as Vite's base path. That path is valid only for a project site without a custom domain. On `https://iplusgor.com`, production assets must be emitted from `/assets/...`.

Upload the contents of this archive to the repository root and replace the existing files.

Important: verify `.github/workflows/deploy-pages.yml` is actually replaced. If GitHub's browser upload skips the hidden `.github` directory, open that workflow in GitHub, choose Edit, replace its contents with the file from this archive, and commit it manually.

Commit title: `Fix GitHub Pages base path for custom domain`

After the Pages workflow succeeds, the generated HTML will reference `/assets/index-*.js` and `/assets/index-*.css`. Hard-refresh `https://iplusgor.com` to discard the incompatible cached bundle.
