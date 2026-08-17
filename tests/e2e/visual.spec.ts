import { expect, test } from "@playwright/test";

test.skip(process.platform !== "win32", "Canonical visual snapshots are approved on Windows.");

async function preparePage(page: import("@playwright/test").Page, path = "/") {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

test("@visual desktop 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparePage(page);
  await expect(page).toHaveScreenshot("desktop-1440x900.png");
});

test("@visual tablet 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await preparePage(page);
  await expect(page).toHaveScreenshot("tablet-768x1024.png");
});

test("@visual mobile 320x800", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await preparePage(page);
  await expect(page).toHaveScreenshot("mobile-320x800.png");
});

test("@visual mobile menu open", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await preparePage(page);
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog", { name: "Navegación principal" })).toBeVisible();
  await page.getByRole("button", { name: "Cerrar menú" }).blur();
  await expect(page).toHaveScreenshot("mobile-menu-open-320x800.png");
});

test("@visual analytics privacy desktop 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparePage(page, "/privacy/analytics");
  await expect(page).toHaveScreenshot("analytics-privacy-desktop-1440x900.png");
});

test("@visual analytics privacy tablet 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await preparePage(page, "/privacy/analytics");
  await expect(page).toHaveScreenshot("analytics-privacy-tablet-768x1024.png");
});

test("@visual analytics privacy mobile 320x800", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await preparePage(page, "/privacy/analytics");
  await expect(page).toHaveScreenshot("analytics-privacy-mobile-320x800.png");
});

test("@visual not found", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await preparePage(page, "/missing-page");
  await expect(page).toHaveScreenshot("not-found-1440x900.png");
});
