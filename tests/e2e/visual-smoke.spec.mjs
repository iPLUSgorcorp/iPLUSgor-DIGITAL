import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const screenshotDir = path.resolve("artifacts/screenshots");
const routes = [
  ["home", "/"],
  ["approach", "/approach"],
  ["solutions", "/solutions"],
  ["catalogue", "/solutions/catalogue"],
  ["work", "/work"],
  ["team", "/team"],
  ["start-project", "/start-project"],
];

function collectRuntimeFailures(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.request().resourceType() !== "favicon") {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  return errors;
}

test.beforeAll(async () => {
  await mkdir(screenshotDir, { recursive: true });
});

test("all required routes render and create desktop control screenshots", async ({ page }) => {
  const errors = collectRuntimeFailures(page);
  await page.setViewportSize({ width: 1536, height: 1024 });

  for (const [name, route] of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await page.screenshot({
      path: path.join(screenshotDir, `desktop-${name}-1536x1024.png`),
      fullPage: false,
    });
  }

  await page.goto("/approach", { waitUntil: "networkidle" });
  await page.locator(".method-shell").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(screenshotDir, "desktop-approach-method-1536x1024.png"),
    fullPage: false,
  });

  await page.goto("/work/aton");
  await expect(page).toHaveURL(/\/work$/);
  expect(errors).toEqual([]);
});

test("catalogue, solution states, concept library and locale controls work", async ({ page }) => {
  const errors = collectRuntimeFailures(page);

  await page.goto("/solutions/catalogue");
  await page.getByRole("button", { name: /Application All/i }).click();
  await expect(page.getByRole("listbox", { name: "Application" })).toBeVisible();
  await page.getByRole("option", { name: "Process heat" }).click();
  await expect(page.getByRole("heading", { name: "MODEL C" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "MODEL A" })).toHaveCount(0);
  await page.getByRole("button", { name: /Application Process heat/i }).click();
  await page.getByRole("option", { name: "All" }).click();
  await page.getByRole("button", { name: /Power range 10 – 50 kW/i }).click();
  await page.getByRole("option", { name: "35 – 50 kW" }).click();
  await expect(page.getByRole("heading", { name: "MODEL C" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "MODEL A" })).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /Application All/i }).click();
  await page.waitForTimeout(260);
  const mobileMenuGeometry = await page.evaluate(() => {
    const menu = document.querySelector(".catalogue-filter-control--application [role='listbox']")
      .getBoundingClientRect();
    const power = document.querySelectorAll(".catalogue-filter-control")[1].getBoundingClientRect();
    return {
      optionCount: document.querySelectorAll(
        ".catalogue-filter-control--application [role='option']",
      ).length,
      overlapsNextControl: menu.bottom > power.top,
    };
  });
  expect(mobileMenuGeometry.optionCount).toBe(4);
  expect(mobileMenuGeometry.overlapsNextControl).toBe(false);
  await page.screenshot({
    path: path.join(screenshotDir, "mobile-catalogue-filters-open-390x844.png"),
    fullPage: false,
  });
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto("/solutions");
  await page.getByRole("tab", { name: "Frontend" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("responsive implementation");
  const overlap = await page.evaluate(() => {
    const detail = document.querySelector(".solution-manifold__detail").getBoundingClientRect();
    return [...document.querySelectorAll(".solution-manifold__rail button")].some((button) => {
      const node = button.getBoundingClientRect();
      return detail.left < node.right && detail.right > node.left && detail.top < node.bottom && detail.bottom > node.top;
    });
  });
  expect(overlap).toBe(false);

  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Atelier objects" })).toBeVisible();
  await expect(page.getByText(/ATON|VTN LED|AEROSTAR/)).toHaveCount(0);

  const workFlowGeometry = await page.evaluate(() => {
    const concept = document.querySelector(".concept-card").getBoundingClientRect();
    const frame = document.querySelector(".page--work > .commercial-frame").getBoundingClientRect();
    return { conceptBottom: concept.bottom, frameTop: frame.top };
  });
  expect(workFlowGeometry.frameTop).toBeGreaterThanOrEqual(workFlowGeometry.conceptBottom);

  const viewerTrigger = page.getByRole("button", { name: "View concept", exact: true });
  await viewerTrigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const viewerGeometry = await page.evaluate(() => {
    const viewer = document.querySelector(".concept-viewer");
    const panel = document.querySelector(".concept-viewer__panel").getBoundingClientRect();
    return {
      parentIsBody: viewer.parentElement === document.body,
      position: getComputedStyle(viewer).position,
      bodyOverflow: document.body.style.overflow,
      panelTop: panel.top,
      panelBottom: panel.bottom,
      viewportHeight: window.innerHeight,
    };
  });
  expect(viewerGeometry).toMatchObject({
    parentIsBody: true,
    position: "fixed",
    bodyOverflow: "hidden",
  });
  expect(viewerGeometry.panelTop).toBeGreaterThanOrEqual(0);
  expect(viewerGeometry.panelBottom).toBeLessThanOrEqual(viewerGeometry.viewportHeight);
  await page.getByRole("button", { name: "Close image viewer" }).last().click();
  await expect(viewerTrigger).toBeFocused();

  await page.getByRole("button", { name: "DE", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(
    page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Ansatz", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");

  expect(errors).toEqual([]);
});

test("contact form is optional and exposes honest mail handoffs", async ({ page }) => {
  await page.goto("/start-project");
  await expect(page.getByRole("link", { name: /igorcorp\.tech@gmail\.com/ })).toHaveAttribute(
    "href",
    "mailto:igorcorp.tech@gmail.com",
  );
  await page.getByLabel("Current website").fill("https://manufacturer.example");
  await page.getByLabel("Primary market").fill("Central Europe");
  await page.getByLabel("Catalogue scale").selectOption("50–200 models");
  await expect(page.getByText(/Every field is optional/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Open email draft" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Compose in Gmail" })).toBeEnabled();
});

test("mobile compositions, menu and required widths have no overflow", async ({ page }) => {
  test.setTimeout(100_000);
  const errors = collectRuntimeFailures(page);
  await page.setViewportSize({ width: 390, height: 844 });

  for (const [name, route] of [["home", "/"], ["work", "/work"], ["start-project", "/start-project"]]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(screenshotDir, `mobile-${name}-390x844.png`),
      fullPage: false,
    });
  }

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Solutions/ }).click();
  await expect(page).toHaveURL(/\/solutions$/);

  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1024 });
    for (const [, route] of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasOverflow, `horizontal overflow at ${route} / ${width}px`).toBe(false);
    }
  }
  expect(errors).toEqual([]);
});

test("required routes have no serious or critical accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const violations = [];
  for (const [, route] of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const result = await new AxeBuilder({ page }).analyze();
    violations.push(...result.violations
      .filter((violation) => ["serious", "critical"].includes(violation.impact))
      .map((violation) => ({
        route,
        id: violation.id,
        targets: violation.nodes.map((node) => node.target.join(" ")),
        summaries: violation.nodes.map((node) => node.failureSummary),
      })));
  }
  expect(violations).toEqual([]);
});

test("sticky optical header and motion remain lightweight and reduced-motion safe", async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });

  const initialHeader = await page.locator(".site-header").boundingBox();
  expect(initialHeader.height).toBeLessThanOrEqual(96);

  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await expect(page.locator(".site-header")).toBeInViewport();

  const effects = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const surface = getComputedStyle(header, "::before");
    const infiniteAnimations = [...document.querySelectorAll("*")].filter(
      (element) => getComputedStyle(element).animationIterationCount === "infinite",
    );
    return {
      background: surface.backgroundImage,
      backdropFilter: surface.backdropFilter || surface.webkitBackdropFilter,
      infiniteAnimations: infiniteAnimations.length,
    };
  });
  expect(effects.background).toContain("linear-gradient");
  expect(effects.backdropFilter).toContain("blur");
  expect(effects.infiniteAnimations).toBe(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  const reducedMotion = await page.evaluate(() => {
    const pageElement = document.querySelector(".page");
    const cta = document.querySelector(".primary-cta");
    return {
      pageAnimation: getComputedStyle(pageElement).animationName,
      ctaTransition: getComputedStyle(cta).transitionDuration,
    };
  });
  expect(reducedMotion.pageAnimation).toBe("none");
  expect(reducedMotion.ctaTransition).toBe("0s");
});

test("mobile performance mode avoids decorative video decoding and live blur", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  expect(await page.locator("video").count()).toBe(0);
  expect(await page.locator(".site-wide-ambient").count()).toBe(0);
  const mobileMediaRequests = await page.evaluate(() => performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((name) => /\.mp4(?:\?|$)/i.test(name)));
  expect(mobileMediaRequests).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);

  const mobileEffects = await page.evaluate(() => {
    const header = getComputedStyle(document.querySelector(".site-header"), "::before");
    const reveal = document.querySelector(".motion-reveal");
    return {
      backdropFilter: header.backdropFilter || header.webkitBackdropFilter,
      revealFilter: reveal ? getComputedStyle(reveal).filter : "none",
    };
  });
  expect(mobileEffects.backdropFilter).toBe("none");
  expect(mobileEffects.revealFilter).toBe("none");

  await page.goto("/team", { waitUntil: "networkidle" });
  expect(await page.locator("video").count()).toBe(0);
  await expect(page.locator(".brand-branch__poster").first()).toBeVisible();

  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.locator("video").count()).toBeGreaterThan(0);
});

test("dark theme switches, persists and keeps the shell accessible", async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".brand img")).toHaveAttribute(
    "src",
    "/assets/brand/iplusgor-logo-light.png",
  );
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  for (const [name, route] of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.screenshot({
      path: path.join(screenshotDir, `desktop-${name}-dark-1536x1024.png`),
      fullPage: false,
    });
    const violations = await new AxeBuilder({ page }).analyze();
    expect(
      violations.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map((violation) => violation.id),
      `dark theme accessibility at ${route}`,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
      `dark theme overflow at ${route}`,
    ).toBe(false);
  }

  await page.goto("/approach", { waitUntil: "networkidle" });
  const processButtonsAreTransparent = await page.locator(".process-rail__nodes button")
    .evaluateAll((buttons) => buttons.every(
      (button) => getComputedStyle(button).backgroundColor === "rgba(0, 0, 0, 0)",
    ));
  expect(processButtonsAreTransparent).toBe(true);
  await page.locator(".method-shell").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(screenshotDir, "desktop-approach-method-dark-1536x1024.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [name, route] of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(screenshotDir, `mobile-${name}-dark-390x844.png`),
      fullPage: false,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
      `mobile dark theme overflow at ${route}`,
    ).toBe(false);
  }
});

test("approach indices and diagnostic copy stay clear at desktop zoom equivalents", async ({ page }) => {
  for (const width of [1121, 1228, 1439, 1440, 1536, 1920, 3840, 5472]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/approach", { waitUntil: "networkidle" });

    const processGeometry = await page.locator(".process-rail__nodes button").evaluateAll((buttons) =>
      buttons.every((button) => {
        const node = button.querySelector(".process-step__node").getBoundingClientRect();
        const index = button.querySelector(".process-step__index").getBoundingClientRect();
        return Math.abs(node.width - node.height) <= 1
          && index.top >= node.bottom
          && index.left >= node.left
          && index.right <= node.right;
      }));
    expect(processGeometry, `process circles or indices distort at ${width}px`).toBe(true);

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow, `Approach overflows at ${width}px`).toBe(false);
  }

  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/approach", { waitUntil: "networkidle" });
  const removeCopy = await page.locator(".method-map__zone--remove").evaluate((zone) => {
    const zoneBox = zone.getBoundingClientRect();
    return [...zone.querySelectorAll("li span")].every((span) => {
      const box = span.getBoundingClientRect();
      return box.left >= zoneBox.left + 16
        && box.right <= zoneBox.right - 16;
    });
  });
  expect(removeCopy).toBe(true);
});

test("solutions system stays aligned through zoom-equivalent and mobile widths", async ({ page }) => {
  for (const width of [1024, 1267, 1439]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/solutions", { waitUntil: "networkidle" });
    const geometry = await page.evaluate((evaluatedWidth) => {
      const nodes = [...document.querySelectorAll(".solution-manifold__rail button")];
      const detail = document.querySelector(".solution-manifold__detail").getBoundingClientRect();
      return {
        circularNodes: nodes.filter((node) => {
          const box = node.getBoundingClientRect();
          const radius = Number.parseFloat(getComputedStyle(node).borderTopLeftRadius);
          return radius >= Math.min(box.width, box.height) * 0.45;
        }).length,
        detailOverlap: nodes.some((node) => {
          const box = node.getBoundingClientRect();
          return detail.left < box.right && detail.right > box.left
            && detail.top < box.bottom && detail.bottom > box.top;
        }),
        iconsVisible: nodes.every((node) => getComputedStyle(node.querySelector("svg")).display !== "none"),
        uniformCards: Math.max(...nodes.map((node) => node.getBoundingClientRect().height))
          - Math.min(...nodes.map((node) => node.getBoundingClientRect().height)) <= 1,
        uniformLabelInset: Math.max(...nodes.map((node) => {
          const box = node.getBoundingClientRect();
          const label = node.querySelector(":scope > span").getBoundingClientRect();
          return box.bottom - label.bottom;
        })) - Math.min(...nodes.map((node) => {
          const box = node.getBoundingClientRect();
          const label = node.querySelector(":scope > span").getBoundingClientRect();
          return box.bottom - label.bottom;
        })) <= 1,
        centeredSecondRow: evaluatedWidth < 1121 || (() => {
          const top = nodes.slice(0, 6).map((node) => node.getBoundingClientRect());
          const bottom = nodes.slice(6).map((node) => node.getBoundingClientRect());
          const topCenter = (top[0].left + top.at(-1).right) / 2;
          const bottomCenter = (bottom[0].left + bottom.at(-1).right) / 2;
          return Math.abs(topCenter - bottomCenter) <= 1;
        })(),
      };
    }, width);
    expect(geometry.circularNodes, `cheap circular nodes at ${width}px`).toBe(0);
    expect(geometry.detailOverlap, `detail collision at ${width}px`).toBe(false);
    expect(geometry.iconsVisible, `missing solution icons at ${width}px`).toBe(true);
    expect(geometry.uniformCards, `uneven solution cards at ${width}px`).toBe(true);
    expect(geometry.uniformLabelInset, `uneven solution label inset at ${width}px`).toBe(true);
    expect(geometry.centeredSecondRow, `off-centre solution second row at ${width}px`).toBe(true);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solutions", { waitUntil: "networkidle" });
  const mobileRail = await page.evaluate(() => {
    const rail = document.querySelector(".solution-manifold__rail");
    const active = rail.querySelector("button.is-active").getBoundingClientRect();
    return {
      scrollable: rail.scrollWidth > rail.clientWidth,
      activeRatio: active.width / active.height,
      documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  expect(mobileRail.scrollable).toBe(true);
  expect(mobileRail.activeRatio).toBeGreaterThan(1.35);
  expect(mobileRail.documentOverflow).toBe(false);

  for (const width of [1440, 1536, 1920, 3840, 5472]) {
    await page.setViewportSize({ width, height: 1200 });
    await page.goto("/solutions", { waitUntil: "networkidle" });
    const desktopGeometry = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll(".solution-manifold__rail button")]
        .map((node) => node.getBoundingClientRect());
      const detail = document.querySelector(".solution-manifold__detail").getBoundingClientRect();
      return {
        equalWidth: Math.max(...nodes.map((node) => node.width))
          - Math.min(...nodes.map((node) => node.width)) <= 1,
        equalHeight: Math.max(...nodes.map((node) => node.height))
          - Math.min(...nodes.map((node) => node.height)) <= 1,
        circular: nodes.every((node) => Math.abs(node.width - node.height) <= 1),
        detailOverlap: nodes.some((node) => detail.left < node.right
          && detail.right > node.left
          && detail.top < node.bottom
          && detail.bottom > node.top),
      };
    });
    expect(desktopGeometry.equalWidth, `uneven desktop node widths at ${width}px`).toBe(true);
    expect(desktopGeometry.equalHeight, `uneven desktop node heights at ${width}px`).toBe(true);
    expect(desktopGeometry.circular, `distorted desktop circles at ${width}px`).toBe(true);
    expect(desktopGeometry.detailOverlap, `desktop detail collision at ${width}px`).toBe(false);
  }

  await page.setViewportSize({ width: 3840, height: 1200 });
  await page.goto("/solutions", { waitUntil: "networkidle" });
  const ultraWide = await page.evaluate(() => {
    const pageBox = document.querySelector(".page--solutions").getBoundingClientRect();
    const manifold = document.querySelector(".solution-manifold").getBoundingClientRect();
    return {
      pageWidth: pageBox.width,
      manifoldWidth: manifold.width,
      manifoldInsidePage: manifold.left >= pageBox.left && manifold.right <= pageBox.right,
    };
  });
  expect(ultraWide.pageWidth).toBeLessThanOrEqual(1888);
  expect(ultraWide.manifoldWidth).toBeLessThanOrEqual(1800);
  expect(ultraWide.manifoldInsidePage).toBe(true);
});

test("catalogue geometry and brand proportions stay locked across zoom-equivalent widths", async ({ page }) => {
  for (const width of [390, 700, 860, 1120, 1121, 1396, 1439, 1440, 1536, 1920, 3840]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/solutions/catalogue", { waitUntil: "networkidle" });

    const geometry = await page.evaluate(() => {
      const box = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          display: getComputedStyle(element).display,
        };
      };
      const intersects = (first, second) =>
        Boolean(first && second)
        && first.display !== "none"
        && second.display !== "none"
        && first.width > 0
        && second.width > 0
        && first.left < second.right
        && first.right > second.left
        && first.top < second.bottom
        && first.bottom > second.top;

      const logo = box(".brand img");
      const purpose = box(".catalogue-purpose");
      const results = box(".catalogue-results");
      const filters = box(".catalogue-filters");
      const processor = box(".catalogue-processor");
      const filterRows = [...document.querySelectorAll(".catalogue-filters--interactive .catalogue-filter-row")];
      const filterHeights = filterRows
        .map((row) => row.getBoundingClientRect().height);
      const filterAlignment = filterRows.every((row) => {
        const rowBox = row.getBoundingClientRect();
        const rowCenter = rowBox.top + rowBox.height / 2;
        const icon = row.querySelector(".catalogue-filter-row__icon").getBoundingClientRect();
        const chevron = row.querySelector(".catalogue-filter-row__chevron").getBoundingClientRect();
        return Math.abs(icon.top + icon.height / 2 - rowCenter) <= 1
          && Math.abs(chevron.top + chevron.height / 2 - rowCenter) <= 1;
      });

      return {
        logoRatio: logo.width / logo.height,
        logoWidth: logo.width,
        purposeResultOverlap: intersects(purpose, results),
        compactProcessorOverlap:
          innerWidth < 1440 && (intersects(processor, filters) || intersects(processor, results)),
        uniformFilters: Math.max(...filterHeights) - Math.min(...filterHeights) <= 1,
        filterAlignment,
        pageWidth: box(".page--catalogue").width,
        documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    expect(geometry.logoRatio, `brand distortion at ${width}px`).toBeCloseTo(960 / 239, 2);
    expect(geometry.logoWidth, `wrong brand size at ${width}px`).toBeCloseTo(width <= 760 ? 128 : 179.2, 0);
    expect(geometry.purposeResultOverlap, `purpose copy collision at ${width}px`).toBe(false);
    expect(geometry.compactProcessorOverlap, `processor collision at ${width}px`).toBe(false);
    expect(geometry.uniformFilters, `uneven filter controls at ${width}px`).toBe(true);
    expect(geometry.filterAlignment, `filter icons or chevrons drift at ${width}px`).toBe(true);
    expect(geometry.documentOverflow, `Catalogue overflows at ${width}px`).toBe(false);
    if (width > 1920) expect(geometry.pageWidth).toBeLessThanOrEqual(1888);
  }
});

test("mobile Home keeps concept copy outside the circular industrial core", async ({ page }) => {
  for (const width of [320, 375, 390, 620]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });

    const geometry = await page.evaluate(() => {
      const box = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      };
      const intersects = (first, second) =>
        Boolean(first && second)
        && first.left < second.right
        && first.right > second.left
        && first.top < second.bottom
        && first.bottom > second.top;
      const apertureElement = document.querySelector(".home-hero__visual .aperture");
      const aperture = apertureElement ? box(".home-hero__visual .aperture") : null;
      const idea = box(".home-hero__idea");
      const principle = box(".home-hero__principle");
      const capabilities = box(".home-hero__capabilities");
      const actions = box(".home-hero__actions");
      const ambient = document.querySelector(".home-hero__ambient");

      return {
        apertureRatio: aperture ? aperture.width / aperture.height : null,
        ideaCollision: aperture ? intersects(idea, aperture) : false,
        principleCollision: aperture ? intersects(principle, aperture) : false,
        capabilitiesCollision: intersects(principle, capabilities),
        actionCollision: intersects(actions, capabilities),
        hasAmbientReplacement: Boolean(ambient),
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    if (geometry.apertureRatio !== null) {
      expect(geometry.apertureRatio, `industrial core distortion at ${width}px`).toBeCloseTo(1, 2);
    } else {
      expect(geometry.hasAmbientReplacement, `missing ambient hero at ${width}px`).toBe(true);
    }
    expect(geometry.ideaCollision, `concept label collision at ${width}px`).toBe(false);
    expect(geometry.principleCollision, `principle copy collision at ${width}px`).toBe(false);
    expect(geometry.capabilitiesCollision, `capability collision at ${width}px`).toBe(false);
    expect(geometry.actionCollision, `action/capability collision at ${width}px`).toBe(false);
    expect(geometry.overflow, `Home overflow at ${width}px`).toBe(false);
  }
});
