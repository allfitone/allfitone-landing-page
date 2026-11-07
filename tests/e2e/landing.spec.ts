import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("redirects the root to Spanish and switches language through the URL", async ({ page, request }) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toMatch(/\/es$/);

  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByText("Escríbenos").first()).toBeVisible();

  const English = page.getByRole("button", { name: "English" }).first();
  await English.click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("button", { name: "English" }).first()).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Get in touch").first()).toBeVisible();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.getByRole("button", { name: "Español" }).first().click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("answers unknown languages and paths with a 404", async ({ request }) => {
  for (const path of ["/fr", "/es/missing", "/missing/page"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("links each product to its own landing in the page language", async ({ page }) => {
  for (const [language, space, studio] of [
    ["es", "Conoce Allfit Space", "Conoce Allfit Studio"],
    ["en", "Explore Allfit Space", "Explore Allfit Studio"],
  ] as const) {
    await page.goto(`/${language}`);
    await expect(page.getByRole("link", { name: space })).toHaveAttribute("href", `https://space.allfit.one/${language}`);
    await expect(page.getByRole("link", { name: studio })).toHaveAttribute("href", `https://studio.allfit.one/${language}`);
  }
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

test("links styled as buttons show a visible keyboard focus ring", async ({ page }) => {
  await page.goto("/es");

  // The hero action, then each product link: all render through buttonVariants().
  const actions = [
    page.locator(".hero-actions").getByRole("link", { name: "Escríbenos" }),
    page.getByRole("link", { name: "Conoce Allfit Space" }),
    page.getByRole("link", { name: "Conoce Allfit Studio" }),
  ];
  // The ring's outer color is the brand-light token, resolved the way the browser reports it.
  const ringColor = await page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.color = "var(--afo-color-brand-light)";
    document.body.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  });

  for (const action of actions) {
    const resting = await action.evaluate((element) => getComputedStyle(element).boxShadow);
    expect(resting).not.toContain(`${ringColor} 0px 0px 0px 4px`);
    await action.focus();
    await expect(action).toBeFocused();
    // box-shadow transitions, so wait for the settled ring rather than a mid-transition frame.
    await expect
      .poll(() => action.evaluate((element) => getComputedStyle(element).boxShadow))
      .toContain(`${ringColor} 0px 0px 0px 4px`);
  }
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

test("every section action receives the pointer, with nothing painted over it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/es");

    const covered = await page.locator("section[id]").evaluateAll((sections) =>
      sections.flatMap((section) =>
        [...section.querySelectorAll<HTMLElement>("a, button")]
          .filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden")
          .flatMap((element) => {
            element.scrollIntoView({ block: "center", behavior: "instant" });
            const box = element.getBoundingClientRect();
            const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
            return hit && (hit === element || element.contains(hit))
              ? []
              : [`${section.id}: «${element.textContent?.trim()}» is under ${hit?.tagName.toLowerCase()}.${hit?.getAttribute("class") ?? ""}`];
          }),
      ),
    );
    expect(covered, `${viewport.width}px`).toEqual([]);
  }
});

test("sections carry no sequence numbers or ghost marks", async ({ page }) => {
  await page.goto("/es");

  // No "01 / 02 / 03" on lists whose order carries no information.
  const indexes = await page.locator("section[id]").evaluateAll((sections) =>
    sections.flatMap((section) =>
      [...section.querySelectorAll("*")]
        .filter((element) => element.children.length === 0 && /^0\d$/.test(element.textContent?.trim() ?? ""))
        .map((element) => `${section.id}: ${element.textContent?.trim()}`),
    ),
  );
  expect(indexes).toEqual([]);

  // No large decorative outline sitting behind a section's content.
  const ghosts = await page.locator("section[id]:not(#home)").evaluateAll((sections) =>
    sections.flatMap((section) =>
      [...section.querySelectorAll<HTMLElement | SVGElement>("[aria-hidden='true']")]
        .filter((element) => getComputedStyle(element).position === "absolute" && element.getBoundingClientRect().width > 300)
        .map(() => section.id),
    ),
  );
  expect(ghosts).toEqual([]);
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

test("describes each product with the identity and URL of its own landing", async ({ request }) => {
  for (const language of ["es", "en"] as const) {
    const html = await (await request.get(`/${language}`)).text();
    const graph = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].flatMap(
      ([, json]) => JSON.parse(json)["@graph"] ?? [],
    ) as Array<Record<string, unknown>>;
    const entity = (id: string) => graph.find((node) => node["@id"] === id);

    // Same @id as each product's landing, so search engines merge both descriptions into one product.
    expect(entity("https://space.allfit.one/#app")).toMatchObject({
      "@type": "MobileApplication",
      name: "Allfit Space",
      url: `https://space.allfit.one/${language}`,
    });
    const studio = entity("https://studio.allfit.one/#app");
    expect(studio).toMatchObject({
      "@type": "WebApplication",
      name: "Allfit Studio",
      url: `https://studio.allfit.one/${language}`,
    });
    // The page lists the schedule under "later", so the structured data must not sell it as current.
    expect(String(studio?.description)).not.toMatch(/agenda|schedule/i);
    expect(graph.filter((node) => /^Allfit (Space|Studio)$/.test(String(node.name))).map((node) => node.url)).not.toContainEqual(
      expect.stringContaining("www.allfit.one"),
    );
  }
});

test("publishes Studio metadata and keeps the legacy anchor compatible", async ({ page, request }) => {
  const response = await request.get("/es");
  const html = await response.text();

  expect(html).toContain('<link rel="canonical" href="https://www.allfit.one/es"/>');
  expect(html).toContain('<link rel="alternate" hrefLang="en" href="https://www.allfit.one/en"/>');
  expect(html).toContain('<link rel="alternate" hrefLang="x-default" href="https://www.allfit.one"/>');
  expect(html).toContain('<meta property="og:image" content="https://www.allfit.one/social/allfit-one-share.png"/>');
  expect(html).toContain("Allfit Studio");
  expect(html).not.toContain("Allfit OS");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.allfit.one/sitemap.xml");
  expect(robots).toContain("Disallow: /dev");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://www.allfit.one/es</loc>");
  expect(sitemap).toContain("<loc>https://www.allfit.one/en</loc>");

  const english = await (await request.get("/en")).text();
  expect(english).toContain('<html lang="en"');
  expect(english).toContain('<link rel="canonical" href="https://www.allfit.one/en"/>');

  await page.goto("/es#allfit-studio");
  await expect(page.locator("#allfit-studio")).toBeInViewport();

  await page.goto("/es#allfit-os");
  await expect(page.locator("#allfit-os")).toBeInViewport();
  const [studioTop, legacyTop] = await page.evaluate(() => {
    const studio = document.querySelector("#allfit-studio");
    const legacy = document.querySelector("#allfit-os");
    if (!studio || !legacy) return [Number.NaN, Number.NaN];
    return [studio.getBoundingClientRect().top + window.scrollY, legacy.getBoundingClientRect().top + window.scrollY];
  });
  expect(Math.abs(studioTop - legacyTop)).toBeLessThanOrEqual(1);
});
