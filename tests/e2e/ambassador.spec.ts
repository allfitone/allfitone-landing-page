import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const profilePath = "/es/ambassadors/william";

test("keeps the draft profile out of search results and out of the sitemap", async ({ page, request }) => {
  const response = await request.get(profilePath);
  expect(response.ok()).toBe(true);

  const html = await response.text();
  expect(html).toContain('name="robots"');
  expect(html).toContain("noindex");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/ambassadors/william");

  const legacy = await request.get("/ambassadors/william", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toMatch(/\/es\/ambassadors\/william$/);

  await page.goto(profilePath);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("serves each language under its own URL", async ({ page }) => {
  await page.goto(profilePath);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { name: "Planes" })).toBeVisible();

  await page.getByRole("button", { name: "English" }).click();

  await expect(page).toHaveURL(/\/en\/ambassadors\/william$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Plans" })).toBeVisible();
});

test("sends every plan request to email, the only conversion action", async ({ page }) => {
  await page.goto(profilePath);

  const planRequests = page.getByRole("link", { name: /^Pedir el plan de/ });
  await expect(planRequests).toHaveCount(3);
  const destinations = await planRequests.evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
  for (const destination of destinations) {
    expect(destination.startsWith("mailto:hello@allfit.one?subject=")).toBe(true);
  }
});

test("has no serious axe findings and remains keyboard-accessible at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(profilePath);

  const viewportHasNoOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(viewportHasNoOverflow).toBe(true);

  const controls = page.locator("button:visible, a:visible");
  const count = await controls.count();
  for (let index = 0; index < count; index += 1) {
    const box = await controls.nth(index).boundingBox();
    if (box) {
      expect(box.height, `interactive element ${index} should be at least 44 px tall`).toBeGreaterThanOrEqual(44);
    }
  }

  await page.keyboard.press("Tab");
  const focusStyle = await page.evaluate(() => {
    const element = document.activeElement;
    return element instanceof HTMLElement ? getComputedStyle(element).boxShadow : "none";
  });
  expect(focusStyle).not.toBe("none");

  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );
  expect(seriousViolations).toEqual([]);
});
