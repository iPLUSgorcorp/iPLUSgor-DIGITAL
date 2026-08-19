import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const screenshotDir = path.resolve("artifacts/design-qa/business-content");

test.beforeAll(async () => {
  await mkdir(screenshotDir, { recursive: true });
});

test("new concept library entries and business FAQ remain responsive and accessible", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator(".concept-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: /Lypa|Липа/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /résumé|резюме|Lebenslauf/i })).toBeVisible();
  const newConceptImages = page.locator(
    '.concept-card__media img[src*="20260820-lypa"], .concept-card__media img[src*="20260820-personal"]',
  );
  await expect(newConceptImages).toHaveCount(2);
  await expect.poll(async () => newConceptImages.evaluateAll(
    (images) => images.every((image) => image.complete && image.naturalWidth === 1536),
  )).toBe(true);
  await page.locator(".concept-card").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(screenshotDir, "work-concepts-1536x1024.png"),
    fullPage: false,
  });
  await page.locator(".concept-card__media").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").locator("img")).toBeVisible();
  await page.getByRole("button", { name: /Close image viewer|Закрити перегляд|Bildansicht schließen/ }).last().click();

  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".business-value").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.locator(".business-faq__list article").first()).toHaveClass(/is-open/);
  await page.locator(".business-faq__list button").nth(1).click();
  await expect(page.locator(".business-faq__list article").nth(1)).toHaveClass(/is-open/);
  const a11y = await new AxeBuilder({ page }).include(".business-value").analyze();
  expect(a11y.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
  await page.screenshot({
    path: path.join(screenshotDir, "business-faq-1536x1024.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work", { waitUntil: "networkidle" });
  await page.locator(".concept-card").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  expect(await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )).toBe(false);
  await page.screenshot({
    path: path.join(screenshotDir, "work-concepts-390x844.png"),
    fullPage: false,
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".business-value").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  expect(await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )).toBe(false);
  await page.screenshot({
    path: path.join(screenshotDir, "business-value-390x844.png"),
    fullPage: false,
  });

  expect(errors).toEqual([]);
});
