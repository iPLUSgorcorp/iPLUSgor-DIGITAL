import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("dist/client");
const appRoutes = [
  "approach",
  "solutions",
  "solutions/catalogue",
  "work",
  "work/aton",
  "team",
  "start-project",
];

mkdirSync(output, { recursive: true });
copyFileSync(resolve(output, "index.html"), resolve(output, "404.html"));

for (const route of appRoutes) {
  const routeOutput = resolve(output, route);
  mkdirSync(routeOutput, { recursive: true });
  copyFileSync(resolve(output, "index.html"), resolve(routeOutput, "index.html"));
}

writeFileSync(resolve(output, ".nojekyll"), "");

console.log(`Prepared GitHub Pages routes (${appRoutes.length}), SPA fallback and .nojekyll`);
