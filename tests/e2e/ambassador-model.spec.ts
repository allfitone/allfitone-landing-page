import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, test } from "@playwright/test";

import { ambassadorReleaseBlockers } from "@/lib/ambassadors/release";
import { formatPesos, monthlyPrice, planDuration, savingPercent } from "@/lib/ambassadors/pricing";
import { ambassadors, isAmbassadorVisible } from "@/lib/ambassadors/registry";
import { parseAmbassadorProfile, validateAmbassadorProfile, type AmbassadorPlan, type AmbassadorProfile } from "@/lib/ambassadors/schema";

function williamProfile(): AmbassadorProfile {
  const profile = ambassadors.find(({ slug }) => slug === "william");
  if (!profile) throw new Error("The william profile is missing from the registry");
  return structuredClone(profile);
}

function samplePlan(id: string, months: number, priceCOP: number, featured = false): AmbassadorPlan {
  const copy = { name: `${months} meses`, who: "Muestra", cadence: "Muestra", includesLead: "Incluye", includes: ["Muestra"], cta: `Pedir ${id}` };
  return { id, months, priceCOP, featured, copy: { es: copy, en: { ...copy, name: `${months} months` } } };
}

/** Plans whose monthly price falls with duration, the second one featured. */
function withPlans(count: number): AmbassadorProfile {
  const durations = [1, 3, 6, 12, 24];
  const profile = williamProfile();
  profile.plans = durations.slice(0, count).map((months, index) => samplePlan(`plan-${months}`, months, months * (200_000 - index * 20_000), index === 1));
  profile.basePlanId = profile.plans[0].id;
  return profile;
}

test.describe("pricing", () => {
  test("derives monthly prices and savings from the explicit base plan", () => {
    const [threeMonths, ...longer] = williamProfile().plans;
    expect([threeMonths, ...longer].map(monthlyPrice)).toEqual([150_000, 135_000, 120_000]);
    expect([threeMonths, ...longer].map((plan) => savingPercent(plan, threeMonths))).toEqual([null, 10, 20]);

    const monthly = samplePlan("monthly", 1, 100_000);
    const yearly = samplePlan("yearly", 12, 960_000);
    expect(savingPercent(yearly, monthly)).toBe(20);
    expect(savingPercent(monthly, yearly)).toBeNull();
    expect(savingPercent(yearly, samplePlan("free", 1, 0))).toBeNull();
  });

  test("names durations and formats pesos per language", () => {
    expect([1, 3, 12, 18, 24].map((months) => planDuration(months, "es"))).toEqual(["1 mes", "3 meses", "1 año", "18 meses", "2 años"]);
    expect([1, 3, 12, 18, 24].map((months) => planDuration(months, "en"))).toEqual(["1-month", "3-month", "1-year", "18-month", "2-year"]);
    expect(formatPesos(1_440_000, "es")).toBe("$1.440.000");
    expect(formatPesos(1_440_000, "en")).toBe("$1,440,000");
  });
});

test.describe("profile contract", () => {
  test("accepts every registered profile", () => {
    for (const profile of ambassadors) {
      expect(validateAmbassadorProfile(profile).errors, profile.slug).toEqual([]);
    }
  });

  const brokenProfiles: [string, (profile: AmbassadorProfile) => void, string][] = [
    ["duplicate plan ids", (profile) => { profile.plans[1].id = profile.plans[0].id; }, "plans: every id must be unique"],
    ["two featured plans", (profile) => { profile.plans[0].featured = true; }, "plans: at most one plan can be featured"],
    ["no base plan", (profile) => { delete profile.basePlanId; }, "basePlanId: required"],
    ["an unknown base plan", (profile) => { profile.basePlanId = "missing"; }, "is not the id of a plan"],
    ["a zero-month plan", (profile) => { profile.plans[0].months = 0; }, "plans[0].months"],
    ["a negative price", (profile) => { profile.plans[0].priceCOP = -1; }, "plans[0].priceCOP"],
    ["a fractional price", (profile) => { profile.plans[0].priceCOP = 1.5; }, "plans[0].priceCOP"],
    ["languages with different structure", (profile) => { profile.content.en.aboutBody.pop(); }, "content.*.aboutBody"],
    ["a missing language", (profile) => { delete (profile.content as Partial<AmbassadorProfile["content"]>).en; }, "content.en: missing field"],
    ["an insecure social link", (profile) => { profile.socials[0].url = "http://example.com"; }, "socials[0].url"],
    ["an unknown field", (profile) => { (profile as unknown as Record<string, unknown>).extra = true; }, "profile.extra: unknown field"],
    ["an accented slug", (profile) => { profile.slug = "andrés"; }, "slug:"],
    ["a photo outside /ambassadors/", (profile) => { profile.photos.hero.src = "/images/portrait.jpg"; }, "photos.hero.src"],
    ["a horizontal hero photo", (profile) => { Object.assign(profile.photos.hero, { width: 1440, height: 960 }); }, "photos.hero: the hero photo must be vertical or square"],
    ["a CSS value smuggled into the framing", (profile) => { profile.photos.hero.focusMobile = "88% top; color: red"; }, "photos.hero.focusMobile"],
    ["alt text in only one language", (profile) => { profile.photos.hero.alt.es = "Retrato"; }, "photos.hero.alt"],
    [
      "more hero facts than columns",
      (profile) => {
        profile.content.es.heroFacts = ["1", "2", "3", "4", "5"];
        profile.content.en.heroFacts = ["1", "2", "3", "4", "5"];
      },
      "content.es.heroFacts: at most 4 items",
    ],
  ];

  for (const [name, breakProfile, message] of brokenProfiles) {
    test(`rejects ${name}`, () => {
      const profile = williamProfile();
      breakProfile(profile);
      const { profile: parsed, errors } = validateAmbassadorProfile(profile);
      expect(parsed).toBeNull();
      expect(errors.join("\n")).toContain(message);
    });
  }

  test("lets a draft carry pending copy but blocks its promotion", () => {
    const draft = williamProfile();
    draft.status = "draft";
    draft.content.es.lead = "";
    expect(validateAmbassadorProfile(draft).pending).toEqual(["content.es.lead"]);
    expect(() => parseAmbassadorProfile(draft, "draft.json")).not.toThrow();

    draft.status = "review";
    expect(() => parseAmbassadorProfile(draft, "draft.json")).toThrow("content.es.lead: required before review");
  });

  test("shows unpublished profiles only in a local preview", () => {
    for (const status of ["draft", "review"] as const) {
      const profile = { ...williamProfile(), status };
      expect(isAmbassadorVisible(profile, false)).toBe(false);
      expect(isAmbassadorVisible(profile, true)).toBe(true);
    }
    expect(isAmbassadorVisible(williamProfile(), false)).toBe(true);
  });
});

test.describe("release guard", () => {
  const roots: string[] = [];

  /** Builds a throwaway project with the given profile files and public photos. */
  function project(profiles: Record<string, unknown>, photos: string[]) {
    const root = mkdtempSync(path.join(tmpdir(), "ambassador-release-"));
    roots.push(root);
    const dataDir = path.join(root, "src", "data", "ambassadors");
    mkdirSync(dataDir, { recursive: true });
    for (const [file, data] of Object.entries(profiles)) writeFileSync(path.join(dataDir, file), JSON.stringify(data));
    for (const photo of photos) {
      const target = path.join(root, "public", ...photo.split("/").filter(Boolean));
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, "");
    }
    return root;
  }

  const photosOf = (slug: string) => ({ hero: { src: `/ambassadors/${slug}/hero.jpg` }, standing: { src: `/ambassadors/${slug}/standing.jpg` } });

  test.afterAll(() => {
    for (const root of roots) rmSync(root, { recursive: true, force: true });
  });

  test("lets the repository as it stands ship", () => {
    expect(ambassadorReleaseBlockers(process.cwd())).toEqual([]);
  });

  test("ships published profiles with their photos", () => {
    const root = project({ "ana.json": { status: "published", photos: photosOf("ana") } }, ["/ambassadors/ana/hero.jpg", "/ambassadors/ana/standing.jpg"]);
    expect(ambassadorReleaseBlockers(root)).toEqual([]);
  });

  for (const status of ["draft", "review"]) {
    test(`refuses a ${status} profile and its photos`, () => {
      const root = project({ "ana.json": { status, photos: photosOf("ana") } }, ["/ambassadors/ana/hero.jpg", "/ambassadors/ana/standing.jpg"]);
      const blockers = ambassadorReleaseBlockers(root).join("\n");
      expect(blockers).toContain(`ana.json is "${status}"`);
      expect(blockers).toContain("public/ambassadors/ana/hero.jpg does not belong to a published profile");
      expect(blockers).toContain("public/ambassadors/ana/standing.jpg does not belong to a published profile");
    });
  }

  test("refuses photos that no published profile uses", () => {
    const root = project({ "ana.json": { status: "published", photos: photosOf("ana") } }, [
      "/ambassadors/ana/hero.jpg",
      "/ambassadors/ana/standing.jpg",
      "/ambassadors/retired/hero.jpg",
    ]);
    expect(ambassadorReleaseBlockers(root)).toEqual([
      "public/ambassadors/retired/hero.jpg does not belong to a published profile and would be served by URL",
    ]);
  });
});

test.describe("plans of any length", () => {
  for (const count of [1, 2, 3, 4, 5]) {
    test(`validates and prices ${count} plan${count === 1 ? "" : "s"}`, () => {
      const profile = withPlans(count);
      expect(validateAmbassadorProfile(profile).errors).toEqual([]);
      const [basePlan] = profile.plans;
      expect(profile.plans.map((plan) => savingPercent(plan, basePlan))).toEqual([null, 10, 20, 30, 40].slice(0, count));
    });
  }

  // Plan cards share one structure, so cloning the rendered ones exercises the real CSS
  // with any count. The Design System's ESM-only exports keep the component out of Node.
  for (const count of [1, 2, 4, 5]) {
    test(`lays out ${count} plans without overflow or misaligned rows`, async ({ page }) => {
      await page.goto("/es/ambassadors/william");
      // Wait for hydration, which sets the language switch's tab stop, so React keeps the cloned cards.
      await expect(page.locator('[data-slot="toggle-group-item"][tabindex="0"]')).toHaveCount(1);
      await page.evaluate((total) => {
        const panel = document.querySelector(".plans-panel");
        const regular = panel?.querySelector(".plan:not(.plan-featured)");
        const featured = panel?.querySelector(".plan-featured");
        if (!panel || !regular || !featured) throw new Error("The plan cards did not render");
        const cards = Array.from({ length: total }, (_, index) => (index === 1 ? featured : regular).cloneNode(true));
        panel.replaceChildren(...cards);
        panel.setAttribute("data-plan-count", String(total));
      }, count);

      for (const width of [1440, 1024, 768, 320]) {
        await page.setViewportSize({ width, height: 900 });
        const layout = await page.evaluate(() => {
          const panel = document.querySelector(".plans-panel")?.getBoundingClientRect();
          const cards = [...document.querySelectorAll(".plan")].map((card) => ({
            left: card.getBoundingClientRect().left,
            right: card.getBoundingClientRect().right,
            top: card.getBoundingClientRect().top,
            price: card.querySelector(".plan-price")?.getBoundingClientRect().top ?? 0,
          }));
          return {
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            panel: { left: panel?.left ?? 0, right: panel?.right ?? 0 },
            cards,
          };
        });

        expect(layout.overflow, `overflow at ${width} px`).toBe(false);
        expect(layout.cards).toHaveLength(count);
        for (const card of layout.cards) {
          expect(card.left).toBeGreaterThanOrEqual(layout.panel.left - 1);
          expect(card.right).toBeLessThanOrEqual(layout.panel.right + 1);
        }
        if (width >= 1024) {
          // Desktop rows hold three cards that share subgrid tracks, so prices line up.
          for (let row = 0; row * 3 < count; row += 1) {
            const prices = layout.cards.slice(row * 3, row * 3 + 3).map((card) => Math.round(card.price));
            expect(Math.max(...prices) - Math.min(...prices), `row ${row + 1} at ${width} px`).toBeLessThanOrEqual(1);
          }
        }
      }
    });
  }
});
