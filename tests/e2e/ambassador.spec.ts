import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { ambassadorContactHref } from "@/lib/ambassadors/contact";
import { ambassadorPath, visibleAmbassadors } from "@/lib/ambassadors/registry";
import { languages, type Language } from "@/lib/content";
import { localizedPath, siteConfig } from "@/lib/site-config";

// Every published profile runs the same checks, so a new ambassador needs no new spec. Unpublished
// profiles cannot reach this server: production builds refuse them (see ambassador-model.spec.ts).
const published = visibleAmbassadors(false);
const switchLabels: Record<Language, string> = { es: "Español", en: "English" };

async function hasNoHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
}

test("registers at least one published profile", () => {
  expect(published.length).toBeGreaterThan(0);
});

for (const profile of published) {
  for (const language of languages) {
    const path = localizedPath(language, ambassadorPath(profile.slug));
    const copy = profile.content[language];

    test.describe(`${profile.slug} in ${language}`, () => {
      test("is reachable, profile-specific in metadata, and kept out of search", async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);

        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await expect(page).toHaveTitle(copy.metaTitle);
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteConfig.url}${path}`);
        await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${siteConfig.url}${path}`);
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", copy.metaTitle);
        await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", copy.metaTitle);
        await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", copy.metaDescription);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(`${profile.identity.givenName} ${profile.identity.familyName}`);
      });

      test("converts only through email, with a contextual subject per plan", async ({ page }) => {
        await page.goto(path);

        const planRequests = page.locator(".plan-cta");
        await expect(planRequests).toHaveCount(profile.plans.length);
        for (const [index, plan] of profile.plans.entries()) {
          await expect(planRequests.nth(index)).toHaveText(plan.copy[language].cta);
          await expect(planRequests.nth(index)).toHaveAttribute("href", ambassadorContactHref(profile, plan.copy[language].name));
        }
        await expect(page.locator(".ambassador-contact-button")).toHaveAttribute("href", ambassadorContactHref(profile));

        // Outbound links are limited to email, Allfit One's social profiles, and the ambassador's confirmed profiles.
        const allowed = new Set([...Object.values(siteConfig.social), ...profile.socials.flatMap((social) => social.url ?? [])]);
        const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
        for (const href of hrefs) {
          if (href.startsWith("mailto:")) expect(href.startsWith(`mailto:${siteConfig.email}?subject=`)).toBe(true);
          else if (/^https?:/.test(href)) expect(allowed.has(href), `unexpected outbound link ${href}`).toBe(true);
          else expect(href.startsWith(`/${language}`), `unexpected internal link ${href}`).toBe(true);
        }
        await expect(page.locator(".ambassador-socials a")).toHaveCount(profile.socials.filter((social) => social.url).length);
      });

      test("switches language on the same profile", async ({ page }) => {
        const other = languages.find((candidate) => candidate !== language) ?? language;
        await page.goto(path);
        // The toggle group uses a roving tab stop: once hydrated, exactly one item is in the tab order.
        await expect(page.locator('[data-slot="toggle-group-item"][tabindex="0"]')).toHaveCount(1);
        await expect(page.getByRole("button", { name: switchLabels[language] })).toHaveAttribute("aria-pressed", "true");

        await page.getByRole("button", { name: switchLabels[other] }).click();

        await expect(page).toHaveURL(new RegExp(`${localizedPath(other, ambassadorPath(profile.slug))}$`));
        await expect(page.locator("html")).toHaveAttribute("lang", other);
        await expect(page).toHaveTitle(profile.content[other].metaTitle);
      });

      test("has no serious axe findings and stays usable at 320 px", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        await page.goto(path);
        expect(await hasNoHorizontalOverflow(page)).toBe(true);

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
        const seriousViolations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
        expect(seriousViolations).toEqual([]);
      });

      test("keeps tablet and desktop free of horizontal overflow", async ({ page }) => {
        for (const width of [768, 1024, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(path);
          expect(await hasNoHorizontalOverflow(page), `overflow at ${width} px`).toBe(true);
        }
      });
    });
  }
}

test("keeps William's URLs and the legacy redirect", async ({ request }) => {
  for (const path of ["/es/ambassadors/william", "/en/ambassadors/william"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }

  const legacy = await request.get("/ambassadors/william", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toMatch(/\/es\/ambassadors\/william$/);
});

test("renders William's reference plans with the same figures", async ({ page }) => {
  await page.goto("/es/ambassadors/william");
  await expect(page.getByRole("heading", { name: "Planes" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Pedir el plan de/ })).toHaveCount(3);
  await expect(page.locator(".plan-price")).toHaveText(["$450.000COP", "$810.000COP", "$1.440.000COP"]);
  await expect(page.locator(".plan-meta")).toContainText(["Equivale a $150.000 al mes", "Equivale a $135.000 al mes", "Equivale a $120.000 al mes"]);
  await expect(page.locator(".plan-saving")).toHaveText(["Ahorras 10% frente al plan de 3 meses", "Ahorras 20% frente al plan de 3 meses"]);
  await expect(page.locator(".plan-featured .plan-name")).toHaveText("6 meses");
  await expect(page.locator(".plan-cta").first()).toHaveAttribute(
    "href",
    "mailto:hello@allfit.one?subject=Allfit%20One%20%C2%B7%20William%20Vergel%20%C2%B7%203%20meses",
  );

  await page.goto("/en/ambassadors/william");
  await expect(page.getByRole("heading", { name: "Plans" })).toBeVisible();
  await expect(page.locator(".plan-price")).toHaveText(["$450,000COP", "$810,000COP", "$1,440,000COP"]);
  await expect(page.locator(".plan-saving")).toHaveText(["Save 10% compared with the 3-month plan", "Save 20% compared with the 3-month plan"]);
});

test("answers unknown slugs and the missing ambassador index with a 404", async ({ request }) => {
  for (const path of ["/es/ambassadors/not-an-ambassador", "/en/ambassadors/not-an-ambassador", "/es/ambassadors", "/en/ambassadors", "/ambassadors"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("keeps every ambassador page out of the sitemap", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/ambassadors");
});
