import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("dist/client");
mkdirSync(output, { recursive: true });
copyFileSync(resolve(output, "index.html"), resolve(output, "404.html"));
writeFileSync(resolve(output, ".nojekyll"), "");

console.log("Prepared GitHub Pages SPA fallback: dist/client/404.html and .nojekyll");
