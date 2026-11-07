import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("redirects the root to Spanish and switches language through the URL", async ({ page, request }) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toMatch(/\/es$/);

  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("link", { name: "Únete a la lista", exact: true })).toBeVisible();

  const English = page.getByRole("button", { name: "English" }).first();
  await English.click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("button", { name: "English" }).first()).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: "Join the waitlist" }).first()).toBeVisible();

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

test("links each product to its own landing in the page language, in a new tab", async ({ page }) => {
  for (const [language, newTab, links] of [
    ["es", "(se abre en una pestaña nueva)", [
      ["#home", "Conoce Allfit Space", "space"],
      ["#home", "Conoce Allfit Studio", "studio"],
      ["#allfit-space", "Más sobre Allfit Space", "space"],
      ["#allfit-studio", "Más sobre Allfit Studio", "studio"],
    ]],
    ["en", "(opens in a new tab)", [
      ["#home", "Explore Allfit Space", "space"],
      ["#home", "Explore Allfit Studio", "studio"],
      ["#allfit-space", "More about Allfit Space", "space"],
      ["#allfit-studio", "More about Allfit Studio", "studio"],
    ]],
  ] as const) {
    await page.goto(`/${language}`);
    for (const [section, name, product] of links) {
      const link = page.locator(section).getByRole("link", { name });
      await expect(link).toHaveAttribute("href", `https://${product}.allfit.one/${language}`);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAccessibleName(`${name} ${newTab}`);
    }
    // The product sections lead to their landing, not to email.
    for (const section of ["#allfit-space", "#allfit-studio"]) {
      await expect(page.locator(section).locator("a[href^='mailto:']")).toHaveCount(0);
    }
  }
});

test("the navbar and the mobile menu lead to the waitlist, not to email", async ({ page }) => {
  await page.goto("/es");
  await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Únete a la lista", exact: true }).click();
  await expect(page).toHaveURL(/#waitlist$/);
  await expect(page.locator("#waitlist").getByLabel("Tu correo")).toBeInViewport();

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/es");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const dialog = page.getByRole("dialog", { name: "Navegación principal" });
  await expect(dialog.locator("a[href^='mailto:']")).toHaveCount(0);
  await dialog.getByRole("link", { name: "Únete a la lista de espera" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#waitlist$/);
  await expect(page.locator("#waitlist").getByLabel("Tu correo")).toBeInViewport();
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

test("the hero action leads to the waitlist, which validates and confirms in the page language", async ({ page }) => {
  for (const [language, action, nameLabel, emailLabel, role, submit, nameEmpty, emailInvalid, roleEmpty, joined, another] of [
    ["es", "Únete a la lista de espera", "Tu nombre", "Tu correo", "Para entrenar", "Unirme a la lista", "Escribe tu nombre", "Revisa el correo", "Elige cómo usarías", "Ya estás en la lista, Nico.", "Usar otro correo"],
    ["en", "Join the waitlist", "Your name", "Your email", "To train", "Join the list", "Enter your name", "Check the email", "Choose how you'd use", "You're on the list, Nico.", "Use another email"],
  ] as const) {
    await page.goto(`/${language}`);
    await page.locator(".hero-actions").getByRole("link", { name: action }).click();
    await expect(page).toHaveURL(new RegExp(`/${language}#waitlist$`));

    const waitlist = page.locator("#waitlist");
    const name = waitlist.getByLabel(nameLabel);
    const email = waitlist.getByLabel(emailLabel);
    await expect(name).toBeInViewport();
    await expect(name).toHaveAttribute("autocomplete", "given-name");
    await expect(email).toHaveAttribute("type", "email");
    await expect(email).toHaveAttribute("autocomplete", "email");

    // Validation runs on submit, in the page language: every missing field is marked, and
    // only the first is announced and takes the keyboard.
    await waitlist.getByRole("button", { name: submit }).click();
    await expect(waitlist.getByRole("alert")).toHaveCount(1);
    await expect(waitlist.getByRole("alert")).toContainText(nameEmpty);
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();

    await name.fill("Nico");
    await email.fill("nico@correo");
    await email.press("Enter");
    await expect(waitlist.getByRole("alert")).toContainText(emailInvalid);
    await expect(email).toBeFocused();

    await email.fill("nico@correo.com");
    await email.press("Enter");
    await expect(waitlist.getByRole("alert")).toContainText(roleEmpty);
    await expect(waitlist.getByRole("radio").first()).toBeFocused();

    // Choosing clears the error; the confirmation greets them by name, takes focus, repeats
    // the address and names the product that is hers.
    // The radio sits inside its pill; people press the pill, so the test does too.
    await waitlist.locator("label", { hasText: role }).click();
    await expect(waitlist.getByRole("radio", { name: role })).toBeChecked();
    await expect(waitlist.getByRole("alert")).toHaveCount(0);
    await waitlist.getByRole("button", { name: submit }).click();
    const confirmation = waitlist.locator("p", { hasText: joined });
    await expect(confirmation).toBeFocused();
    await expect(waitlist.getByRole("status")).toContainText("nico@correo.com");
    await expect(waitlist.getByRole("status")).toContainText("Allfit Space");

    // Another email keeps their name and their choice, and puts the keyboard on the email.
    await waitlist.getByRole("button", { name: another }).click();
    await expect(waitlist.getByLabel(emailLabel)).toBeFocused();
    await expect(waitlist.getByLabel(nameLabel)).toHaveValue("Nico");
    await expect(waitlist.getByRole("radio", { name: role })).toBeChecked();
  }
});

test("the page names one person per visit, the same in every section", async ({ page }) => {
  const names = ["Kevin", "Walbert", "Jimmy", "Charly", "Nico"];
  const seen = new Set<string>();
  await page.goto("/es");
  for (let visit = 0; visit < 8; visit += 1) {
    if (visit > 0) await page.reload();
    // The visit's pick replaces the static name right after hydration; the motion hook arms
    // in the same commit, so wait for it and one more task before reading.
    await expect(page.locator("[data-landing][data-motion='on']")).toHaveCount(1);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve))));
    const waitlist = page.locator("#waitlist");
    const person = (await waitlist.getByLabel("Tu nombre").getAttribute("placeholder")) ?? "";
    const name = names.find((candidate) => candidate === person);
    expect(name, `«${person}» is one of the five names`).toBeDefined();
    seen.add(name!);

    // The email placeholder, the Studio panel and its access line name the same person.
    await expect(waitlist.getByLabel("Tu correo")).toHaveAttribute("placeholder", `${name!.toLowerCase()}@correo.com`);
    const panel = page.locator(".studio-review");
    await expect(panel).toContainText(`Lo autorizó ${name}.`);
    await expect(panel.locator(".studio-shared-avatar")).toHaveText(name!.charAt(0));
  }
  // Eight visits all on one name out of five would happen about once in 78,000 runs.
  expect(seen.size).toBeGreaterThan(1);
});

test("links styled as buttons show a visible keyboard focus ring", async ({ page }) => {
  await page.goto("/es");

  // The hero action, then each product link: all render through buttonVariants().
  const actions = [
    page.locator(".hero-actions").getByRole("link", { name: "Únete a la lista de espera" }),
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

test("the homepage states what the products do, without hedging labels", async ({ page }) => {
  // The owner removed these in November 2026: they read as unfinished and cost credibility.
  const hedges = {
    es: /(próximamente|tesis de producto|todavía no|aún no|más adelante|visión de producto|en desarrollo)/i,
    en: /(coming soon|product thesis|not yet|later|product vision|in development)/i,
  } as const;
  for (const language of ["es", "en"] as const) {
    await page.goto(`/${language}`);
    const text = await page.locator("main").innerText();
    expect(text.match(hedges[language])?.[0] ?? null, language).toBeNull();
  }
});

test("has a logical heading structure and no serious axe violations", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  const levels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }

  // The hero fades in on load; axe would measure its action's colors mid-fade and report
  // contrast the settled page does not have. Let every finite animation finish first.
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
