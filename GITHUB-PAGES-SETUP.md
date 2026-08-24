# GitHub Pages publication

## Upload the archive

1. Create an empty GitHub repository or open the target repository.
2. Extract the release archive locally.
3. Upload all extracted files and folders to the repository root.
4. Commit them to the `main` branch.

GitHub's browser uploader may skip the hidden `.github` folder. If the workflow
is absent after the upload, create it manually as described below.

## Create the workflow in GitHub

1. Open the repository and select **Add file → Create new file**.
2. Enter this complete filename: `.github/workflows/deploy-pages.yml`.
3. Paste the following content and commit it to `main`:

```yaml
name: Deploy iPLUSgor Digital to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Set up Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Configure GitHub Pages
        id: pages
        uses: actions/configure-pages@v6

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        shell: bash
        run: |
          REPO_NAME="${GITHUB_REPOSITORY#*/}"
          if [[ "$REPO_NAME" == *.github.io ]]; then
            BASE_PATH="/"
          else
            BASE_PATH="/$REPO_NAME/"
          fi
          VITE_BASE_PATH="$BASE_PATH" \
          VITE_SITE_URL="https://${GITHUB_REPOSITORY_OWNER}.github.io${BASE_PATH%/}" \
          npm run build:pages

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: dist/client

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

## Enable Pages

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions**, select **Deploy iPLUSgor Digital to GitHub Pages**, and
   run the workflow if it did not start automatically.
4. Wait for both the `build` and `deploy` jobs to finish successfully.

The workflow supports both `username.github.io` repositories and ordinary
project repositories. It calculates the correct base path automatically and
includes an SPA fallback for direct links such as `/solutions/catalogue`.
