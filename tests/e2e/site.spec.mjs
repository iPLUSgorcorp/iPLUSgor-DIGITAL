import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes("analytics consent")) return;
  await page.addInitScript(() => localStorage.setItem("iplusgor-analytics-consent", "declined"));
});

test("analytics consent is optional and can be changed", async ({ page }) => {
  const requests = [];
  page.on("request", (request) => { if (/google-analytics|googletagmanager/.test(request.url())) requests.push(request.url()); });
  await page.goto("/en/");
  await expect(page.getByRole("button", { name: "Continue without analytics" })).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Continue without analytics" }).click();
  await expect(page.locator(".analytics-panel")).toHaveCount(0);
  await page.getByRole("button", { name: "Analytics settings" }).click();
  await page.getByRole("button", { name: "Allow analytics" }).click();
  expect(await page.evaluate(() => localStorage.getItem("iplusgor-analytics-consent"))).toBe("accepted");
  // Local development never sends production analytics.
  expect(requests).toEqual([]);
});

test("home and service journey work in every language", async ({ page }) => {
  await page.goto("/en/");
  for (const [prefix, heading] of [["/en", /Turn complexity into clarity/], ["", /Перетворюємо складність/], ["/de", /Aus Komplexität wird Klarheit/]]) {
    await page.evaluate((code) => localStorage.setItem("iplusgor-locale", code), prefix === "/en" ? "en" : prefix === "/de" ? "de" : "ua");
    await page.goto(`${prefix}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.getByRole("link", { name: /Show us the bottleneck|Покажіть вузьке місце|Engpass beschreiben/ }).first()).toBeVisible();
    await page.goto(`${prefix}/services/`);
    await expect(page.locator(".service-chapter")).toHaveCount(4);
    await page.goto(`${prefix}/about/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.goto(`${prefix}/start-project/`);
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('a[href="mailto:hello@iplusgor.com"]').first()).toBeVisible();
  }
});

test("original brand marks and automation workflows respond correctly", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("#hero-title mark")).toHaveText("clarity.");
  await expect(page.locator(".site-header .brand-mark__dark")).toBeVisible();
  await expect(page.locator(".site-header .brand-mark__light")).toBeHidden();
  await expect(page.locator(".site-footer .brand-mark__light")).toBeVisible();
  await expect(page.locator(".capability")).toHaveCount(4);
  await page.getByRole("button", { name: /Missed call/ }).click();
  await expect(page.locator(".flow-display")).toContainText("SMS sent");
  await expect(page.locator(".flow-display")).toContainText("without AI");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator(".site-header .brand-mark__light")).toBeVisible();
  await expect(page.locator(".site-footer .brand-mark__dark")).toBeVisible();
  await page.goto("/en/services/#custom-tools");
  await expect(page.locator("#custom-tools")).toContainText("spreadsheet");
  await expect(page.locator("#custom-tools")).toBeInViewport();
});

test("process imagery loads on scroll and does not pose as client work", async ({ page }) => {
  await page.goto("/en/");
  const images = page.locator(".method-list__visual");
  await expect(images).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true);
    await expect(image).toHaveAttribute("alt", /.+/);
  }
  await expect(page.locator(".method-image-note")).toContainText("illustrative");
  await page.goto("/en/services/");
  await expect(page.locator(".interior-hero mark")).toHaveText("system");
});

test("magnetic action responds to mouse and settles without motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en/");
  const action = page.locator(".hero .magnetic-link").first();
  const box = await action.boundingBox();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.7);
  await expect.poll(() => action.evaluate((node) => node.style.getPropertyValue("--magnet-x"))).not.toBe("0px");
  await page.mouse.move(0, 0);
  await expect.poll(() => action.evaluate((node) => node.style.getPropertyValue("--magnet-x"))).toBe("0px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.7);
  await expect(action).toHaveCSS("transform", "none");
});

test("legacy routes redirect to the relevant current route", async ({ page }) => {
  await page.goto("/en/");
  for (const [oldPath, target] of [["/approach/", "/#method"], ["/en/solutions/", "/en/services/"], ["/de/solutions/catalogue/", "/de/services/"], ["/team/", "/about/"], ["/work/aton/", "/services/"]]) {
    await page.evaluate((code) => localStorage.setItem("iplusgor-locale", code), oldPath.startsWith("/en/") ? "en" : oldPath.startsWith("/de/") ? "de" : "ua");
    await page.goto(oldPath);
    const expected = new URL(target, "http://example.test");
    await expect.poll(() => new URL(page.url()).pathname.replace(/\/$/, "")).toBe(expected.pathname.replace(/\/$/, ""));
    await expect.poll(() => new URL(page.url()).hash).toBe(expected.hash);
  }
});

test("intake can prepare and copy a complete brief", async ({ page }) => {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/start-project/");
  await page.getByRole("button", { name: "Copy project brief" }).click();
  await expect(page.locator("#intake-message")).toContainText("Add your name");
  await page.locator('input[name="name"]').fill("Alex Example");
  await page.locator('input[name="email"]').fill("alex@example.com");
  await page.locator('input[name="company"]').fill("Example Co");
  await page.locator('textarea[name="problem"]').fill("Qualified requests are being lost after our contact form.");
  await page.locator('textarea[name="outcome"]').fill("Route each request to the right owner.");
  await page.locator('select[name="budget"]').selectOption({ label: "$4,000–$10,000" });
  await page.getByRole("button", { name: "Copy project brief" }).click();
  await expect(page.locator("#intake-message")).toContainText("Brief copied");
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain("Example Co");
  expect(clipboard).toContain("Qualified requests");
  await page.getByRole("button", { name: "Prepare email draft" }).click();
  await expect(page.locator("#intake-message")).toContainText("Please send the draft there");
});

test("primary actions, method link and language switcher work", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.locator(".hero").getByRole("link", { name: "Explore what we build" }).click();
  await expect(page).toHaveURL(/\/en\/services\/?$/);
  await page.getByRole("link", { name: "How we work" }).click();
  await expect(page).toHaveURL(/\/en\/?#method$/);
  await expect(page.locator("#method")).toBeInViewport();
  await page.locator(".site-header__tools").getByRole("button", { name: "DE" }).click();
  await expect(page).toHaveURL(/\/de\/?#method$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.locator(".site-header__tools").getByRole("button", { name: "UA" }).click();
  await expect(page).toHaveURL(/\/#method$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await page.locator(".hero").getByRole("link", { name: /Покажіть вузьке місце/ }).click();
  await expect(page).toHaveURL(/\/start-project\/?$/);
});

test("responsive layouts, theme and accessibility remain usable", async ({ page }) => {
  await page.goto("/en/");
  for (const width of [390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const prefix of ["/en", "/de", ""]) {
      await page.evaluate((code) => localStorage.setItem("iplusgor-locale", code), prefix === "/en" ? "en" : prefix === "/de" ? "de" : "ua");
      await page.goto(`${prefix}/`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), `overflow at ${prefix || "ua"} ${width}`).toBe(false);
      if (width === 390) {
        await page.getByRole("button", { name: /Open menu|Menü öffnen|Відкрити меню/ }).click();
        await expect(page.getByRole("navigation", { name: /Mobile navigation|Mobile Navigation|Мобільна навігація/ })).toBeVisible();
        await page.getByRole("button", { name: /Close menu|Menü schließen|Закрити меню/ }).click();
      }
    }
  }
  for (const theme of ["light", "dark"]) {
    await page.goto("/en/");
    await page.evaluate((value) => localStorage.setItem("iplusgor-theme", value), theme);
    for (const route of ["/en/", "/en/services/", "/en/about/", "/en/start-project/"]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations.filter(({ impact }) => ["serious", "critical"].includes(impact)), `${theme} ${route}`).toEqual([]);
    }
  }
});

test("interior pages fit small screens and reduced motion removes entrance animation", async ({ page }) => {
  await page.goto("/en/");
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 850 });
    for (const prefix of ["/en", "/de", ""]) {
      await page.evaluate((code) => localStorage.setItem("iplusgor-locale", code), prefix === "/en" ? "en" : prefix === "/de" ? "de" : "ua");
      for (const route of ["services", "about", "start-project"]) {
        await page.goto(`${prefix}/${route}/`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), `${prefix || "ua"} ${route} at ${width}`).toBe(false);
      }
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  const duration = await page.locator(".hero .motion-word__inner").first().evaluate((node) => getComputedStyle(node).animationDuration);
  const seconds = duration.endsWith("ms") ? Number.parseFloat(duration) / 1000 : Number.parseFloat(duration);
  expect(seconds).toBeLessThanOrEqual(0.001);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const motion = await page.locator(".hero .motion-word__inner").first().evaluate((node) => {
    const style = getComputedStyle(node);
    return { name: style.animationName, duration: Number.parseFloat(style.animationDuration), iterations: style.animationIterationCount };
  });
  expect(motion.name).toBe("word-rise");
  expect(motion.duration).toBeLessThan(0.9);
  expect(motion.iterations).toBe("1");
});

test("metadata and unknown routes are honest", async ({ page }) => {
  await page.goto("/en/services/");
  await expect(page).toHaveTitle(/AI automation, CRM integrations and conversion systems/);
  const schema = await page.locator("#site-schema").textContent();
  expect(JSON.parse(schema)["@graph"].filter((node) => node["@type"] === "Service")).toHaveLength(4);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://iplusgor.com/en/services/");
  await expect(page.locator('link[hreflang="de"]')).toHaveAttribute("href", "https://iplusgor.com/de/services/");
  await page.goto("/en/does-not-exist/");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
});
