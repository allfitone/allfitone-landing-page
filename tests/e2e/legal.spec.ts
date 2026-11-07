import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const site = "https://www.allfit.one";
const pages = ["/legal", "/legal/terms", "/legal/privacy", "/legal/analytics"] as const;

// Words a published legal document never carries: it is in force, not a draft.
// Whole words only: «independientes» is fine.
const draftWords = /(?<!\p{L})(borrador|en revisi[oó]n|pendiente|próximamente|draft|under review|pending|coming soon)(?!\p{L})/iu;

test("publishes every legal page as an indexable, self-canonical document in both languages", async ({ request }) => {
  for (const path of pages) {
    for (const language of ["es", "en"] as const) {
      const response = await request.get(`/${language}${path}`);
      expect(response.ok(), `/${language}${path}`).toBe(true);
      const html = await response.text();
      expect(html).toContain(`<link rel="canonical" href="${site}/${language}${path}"/>`);
      expect(html).toContain(`<link rel="alternate" hrefLang="es" href="${site}/es${path}"/>`);
      expect(html).toContain(`<link rel="alternate" hrefLang="en" href="${site}/en${path}"/>`);
      expect(html).not.toContain("noindex");
      expect(html).toContain("mailto:hello@allfit.one");
      // The page text, without markup, scripts or styles.
      const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
      expect(text, `/${language}${path}`).not.toMatch(draftWords);
      expect(text).not.toMatch(/\bAllfit\b(?! (One|Space|Studio|Pro))/);
    }
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of pages) {
    expect(sitemap).toContain(`<loc>${site}/es${path}</loc>`);
    expect(sitemap).toContain(`<loc>${site}/en${path}</loc>`);
  }
  expect(sitemap).not.toContain("/privacy/analytics");
});

test("states the analytics notice's terms and when it took effect", async ({ request }) => {
  const html = await (await request.get("/es/legal/analytics")).text();
  // The page shows when the notice took effect, not the internal version id.
  expect(html).toContain("16 de agosto de 2026");
  expect(html).not.toContain("analytics-v1");
  expect(html).toContain("PostHog US");
  expect(html).toContain("90 días");
  expect(html).toContain("30 días");
  expect(html).toContain("Global Privacy Control");
  expect(html).not.toContain("Backoffice");
  expect(html).not.toContain("We never collect");

  const english = await (await request.get("/en/legal/analytics")).text();
  expect(english).toContain("We never collect");
  expect(english).toContain("90 days");
  expect(english).toContain("August 16, 2026");
});

test("keeps the analytics notice's earlier addresses working", async ({ request }) => {
  for (const [from, to] of [
    ["/privacy/analytics", "/es/legal/analytics"],
    ["/es/privacy/analytics", "/es/legal/analytics"],
    ["/en/privacy/analytics", "/en/legal/analytics"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(308);
    expect(response.headers().location).toMatch(new RegExp(`${to}$`));
  }
});

test("names who is responsible and how to exercise data rights", async ({ page }) => {
  await page.goto("/es/legal/privacy");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1, name: "Política de privacidad" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quién es responsable" })).toBeVisible();
  await expect(page.getByText("Ley 1581 de 2012").first()).toBeVisible();
  await expect(page.getByText("Superintendencia de Industria y Comercio")).toBeVisible();
  await expect(page.getByRole("link", { name: "Aviso de analítica" }).first()).toHaveAttribute("href", "/es/legal/analytics");

  await page.goto("/es/legal/terms");
  await expect(page.getByRole("heading", { level: 1, name: "Términos y condiciones" })).toBeVisible();
  for (const heading of ["Allfit Space", "Allfit Pro", "Allfit Studio"]) {
    await expect(page.getByRole("heading", { level: 2, name: heading, exact: true })).toBeVisible();
  }
});

test("lists the three documents in the index and links every one from the homepage", async ({ page }) => {
  await page.goto("/es/legal");
  const index = page.getByRole("list", { name: "Documentos legales" });
  await expect(index.getByRole("link")).toHaveText(["Términos y condiciones", "Política de privacidad", "Aviso de analítica"]);

  await index.getByRole("link", { name: "Política de privacidad" }).click();
  await expect(page).toHaveURL(/\/es\/legal\/privacy$/);

  await page.goto("/es");
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "Términos y condiciones" })).toHaveAttribute("href", "/es/legal/terms");
  await expect(footer.getByRole("link", { name: "Política de privacidad" })).toHaveAttribute("href", "/es/legal/privacy");
  await expect(footer.getByRole("link", { name: "Aviso de analítica" })).toHaveAttribute("href", "/es/legal/analytics");
  // The waitlist asks for a name and an email, so it links the policy, in a new tab.
  const waitlistLink = page.locator("#waitlist").getByRole("link", { name: /Política de privacidad/ });
  await expect(waitlistLink).toHaveAttribute("href", "/es/legal/privacy");
  await expect(waitlistLink).toHaveAttribute("target", "_blank");
});

test("switches language through the URL and links home in the same language", async ({ page }) => {
  await page.goto("/es/legal/analytics");
  await page.getByRole("button", { name: "English" }).click();

  await expect(page).toHaveURL(/\/en\/legal\/analytics$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "What we measure. What we never touch." })).toBeVisible();

  await page.getByRole("link", { name: "Allfit One" }).first().click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("footer").getByRole("link", { name: "Analytics notice" })).toHaveAttribute(
    "href",
    "/en/legal/analytics",
  );
});

for (const path of ["/es/legal", "/es/legal/privacy", "/es/legal/analytics"]) {
  test(`${path} has no serious axe findings and remains keyboard-accessible at 320 px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);

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
}
