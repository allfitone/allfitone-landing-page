import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const noticePath = "/privacy/analytics";

test("publishes an indexable bilingual analytics notice with the required policy", async ({ page, request }) => {
  const response = await request.get(noticePath);
  expect(response.ok()).toBe(true);
  const html = await response.text();

  expect(html).toContain('<link rel="canonical" href="https://www.allfit.one/privacy/analytics"');
  expect(html).toContain("analytics-v1");
  expect(html).toContain("PostHog US");
  expect(html).toContain("90 días");
  expect(html).toContain("30 días");
  expect(html).toContain("Global Privacy Control");
  expect(html).toContain("hello@allfitone.com");
  expect(html).toContain("We never collect");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://www.allfit.one/privacy/analytics</loc>");

  await page.goto(noticePath);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Lo que medimos. Lo que nunca tocamos." })).toBeVisible();
});

test("uses the shared language preference and preserves the semantic document", async ({ page }) => {
  await page.goto(noticePath);
  await page.getByRole("button", { name: "English" }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-privacy-language", "en");
  await expect(page.getByRole("heading", { name: "What we measure. What we never touch." })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("allfitone-language"))).toBe("en");

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("link", { name: "Analytics privacy" })).toBeVisible();
});

test("has no serious axe findings and remains keyboard-accessible at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(noticePath);

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
