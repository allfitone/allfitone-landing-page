import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { waitlistOpen } from "@/lib/waitlist";

// The page is only built while the waitlist is open; landing.spec.ts guards the closed state.
test.skip(!waitlistOpen, "The waitlist is closed (waitlistOpen in src/lib/waitlist.ts).");

const site = "https://www.allfit.one";

// Every «Únete a la lista» action leads here: the launch offer, its terms and the form.
test("publishes the waitlist page as an indexable, self-canonical page in both languages", async ({ request }) => {
  for (const [language, title, offer] of [
    ["es", "Lista de espera | Allfit One", "las primeras 100 personas"],
    ["en", "Waitlist | Allfit One", "the first 100 people"],
  ] as const) {
    const response = await request.get(`/${language}/waitlist`);
    expect(response.ok(), `/${language}/waitlist`).toBe(true);
    const html = await response.text();
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(`<link rel="canonical" href="${site}/${language}/waitlist"/>`);
    expect(html).toContain(`<link rel="alternate" hrefLang="es" href="${site}/es/waitlist"/>`);
    expect(html).toContain(`<link rel="alternate" hrefLang="en" href="${site}/en/waitlist"/>`);
    expect(html).not.toContain("noindex");
    // The title masks each word on its own, so the markup between words collapses to one space.
    const text = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ")
      .replace(/\s+/g, " ");
    expect(text.toLowerCase()).toContain(offer);
    expect(text).not.toMatch(/\bAllfit\b(?! (One|Space|Studio|Pro))/);
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${site}/es/waitlist</loc>`);
  expect(sitemap).toContain(`<loc>${site}/en/waitlist</loc>`);
});

test("states the offer, what joining brings, what Allfit Pro is and the offer's terms", async ({ page }) => {
  const hedges = {
    es: /(próximamente|tesis de producto|todavía no|aún no|más adelante|visión de producto|en desarrollo)/i,
    en: /(coming soon|product thesis|not yet|later|product vision|in development)/i,
  } as const;
  for (const [language, heading, sections, activation, after] of [
    [
      "es",
      "Tres meses de Allfit Pro para las primeras 100 personas.",
      ["Únete a la lista de espera", "Qué recibes", "Qué es Allfit Pro", "Condiciones de la oferta"],
      "Los tres meses cuentan desde que lo activas",
      "pasas al plan gratuito sin hacer nada",
    ],
    [
      "en",
      "Three months of Allfit Pro for the first 100 people.",
      ["Join the waitlist", "What you get", "What Allfit Pro is", "Offer terms"],
      "The three months start when you activate it",
      "you move to the free plan without doing anything",
    ],
  ] as const) {
    await page.goto(`/${language}/waitlist`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    for (const name of sections) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    const terms = page.locator("#offer-terms");
    await expect(terms.getByRole("listitem")).toHaveCount(7);
    await expect(terms).toContainText(activation);
    await expect(terms).toContainText(after);

    const text = await page.locator("main").innerText();
    expect(text.match(hedges[language])?.[0] ?? null, language).toBeNull();
  }
});

test("puts the form beside the offer on desktop and right after the lead on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/es/waitlist");
  const join = page.locator("#join");
  await expect(join.getByRole("button", { name: "Unirme a la lista" })).toBeInViewport();
  const beside = await page.evaluate(() => {
    const title = document.querySelector("h1")?.getBoundingClientRect();
    const form = document.querySelector("#join")?.getBoundingClientRect();
    return Boolean(title && form && form.left > title.right);
  });
  expect(beside).toBe(true);

  // The form stays in view while the terms scroll past.
  await page.locator("#offer-terms").scrollIntoViewIfNeeded();
  await expect(join.getByRole("button", { name: "Unirme a la lista" })).toBeInViewport();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/es/waitlist");
  const order = await page.evaluate(() =>
    [".waitlist-page-lead", "#join", "#offer-terms"].map((selector) => document.querySelector(selector)?.getBoundingClientRect().top ?? 0),
  );
  expect(order).toEqual([...order].sort((a, b) => a - b));
});

test("switches language through the URL and links home in the same language", async ({ page }) => {
  await page.goto("/es/waitlist");
  await page.getByRole("button", { name: "English" }).click();

  await expect(page).toHaveURL(/\/en\/waitlist$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 2, name: "Join the waitlist" })).toBeVisible();

  await page.getByRole("link", { name: "Allfit One" }).first().click();
  await expect(page).toHaveURL(/\/en$/);
});

test("has one h1, ordered headings and no serious axe findings, and stays usable at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/es/waitlist");

  await expect(page.locator("h1")).toHaveCount(1);
  const levels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }

  const viewportHasNoOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  );
  expect(viewportHasNoOverflow).toBe(true);

  // The title rises on load; let it settle before axe measures colors.
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity)
        .map((animation) => animation.finished),
    ),
  );
  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
  expect(seriousViolations).toEqual([]);
});
