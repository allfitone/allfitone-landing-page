import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("defaults to Spanish and persists a required locale selection", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByText("Escríbenos").first()).toBeVisible();

  const English = page.getByRole("button", { name: "English" }).first();
  await English.click();

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(English).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("allfitone-language"))).toBe("en");

  await English.click();
  await expect(English).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Get in touch").first()).toBeVisible();
});

test("mobile Sheet traps focus, closes predictably and restores the trigger", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Navegación principal" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect.poll(() => page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false)).toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await dialog.getByRole("link", { name: /Allfit Studio/ }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#allfit-studio$/);
  await expect(trigger).toBeFocused();
});

test("keeps controls reachable and the 320 px canvas free of horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");

  const interactiveElements = page.locator("button:visible, a:visible");
  const count = await interactiveElements.count();
  for (let index = 0; index < count; index += 1) {
    const box = await interactiveElements.nth(index).boundingBox();
    if (box) {
      expect(box.height, `interactive element ${index} should be at least 44 px tall`).toBeGreaterThanOrEqual(44);
    }
  }

  const viewportHasNoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  expect(viewportHasNoOverflow).toBe(true);

  await page.keyboard.press("Tab");
  const focusStyle = await page.evaluate(() => {
    const element = document.activeElement;
    return element instanceof HTMLElement ? getComputedStyle(element).boxShadow : "none";
  });
  expect(focusStyle).not.toBe("none");
});

test("honors reduced motion and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/");

  const duration = await page.locator(".nav-link").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(["0s", "0.00001s", "1e-05s"]).toContain(duration);
  await expect(page.locator("h1")).toBeVisible();
});

test("editorial sections render without eyebrow markers", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".section-marker")).toHaveCount(0);
});

test("has a logical heading structure and no serious axe violations", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  const levels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }

  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
  expect(seriousViolations).toEqual([]);
});

test("publishes Studio metadata and keeps the legacy anchor compatible", async ({ page, request }) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(html).toContain('<link rel="canonical" href="https://www.allfit.one"');
  expect(html).toContain("Allfit Studio");
  expect(html).not.toContain("Allfit OS");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.allfit.one/sitemap.xml");
  expect(robots).toContain("Disallow: /dev");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://www.allfit.one</loc>");

  await page.goto("/#allfit-studio");
  await expect(page.locator("#allfit-studio")).toBeInViewport();

  await page.goto("/#allfit-os");
  await expect(page.locator("#allfit-os")).toBeInViewport();
  const [studioTop, legacyTop] = await page.evaluate(() => {
    const studio = document.querySelector("#allfit-studio");
    const legacy = document.querySelector("#allfit-os");
    if (!studio || !legacy) return [Number.NaN, Number.NaN];
    return [studio.getBoundingClientRect().top + window.scrollY, legacy.getBoundingClientRect().top + window.scrollY];
  });
  expect(Math.abs(studioTop - legacyTop)).toBeLessThanOrEqual(1);
});
