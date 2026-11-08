import { expect, test } from "@playwright/test";

import { ambassadorPath, visibleAmbassadors } from "@/lib/ambassadors/registry";
import { languages } from "@/lib/content";
import { legalDocumentSlugs, legalPath } from "@/lib/legal/documents";
import { foreignTitleSeparator } from "@/lib/page-title";
import { localizedPath } from "@/lib/site-config";
import { waitlistPagePath } from "@/lib/waitlist";

// Every page title separates its parts with « | », in the tab and when shared. New pages
// join this list; published ambassadors join it on their own.
const paths = [
  ...languages.flatMap((language) => [
    localizedPath(language),
    localizedPath(language, waitlistPagePath),
    localizedPath(language, legalPath()),
    ...legalDocumentSlugs.map((slug) => localizedPath(language, legalPath(slug))),
  ]),
  ...visibleAmbassadors(false).flatMap((profile) =>
    languages.map((language) => localizedPath(language, ambassadorPath(profile.slug))),
  ),
  "/missing/page",
];

const decode = (text: string) =>
  text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

test("every page title separates its parts with a vertical bar", async ({ request }) => {
  expect(paths.length).toBeGreaterThan(5);
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    const titles = [
      html.match(/<title>([^<]*)<\/title>/)?.[1],
      html.match(/<meta property="og:title" content="([^"]*)"/)?.[1],
      html.match(/<meta name="twitter:title" content="([^"]*)"/)?.[1],
    ]
      .filter((title): title is string => title !== undefined)
      .map(decode);

    expect(titles.length, `${path} has a title`).toBeGreaterThan(0);
    for (const title of titles) {
      expect(title, `${path}: «${title}»`).toContain(" | ");
      expect(title, `${path}: «${title}»`).not.toMatch(foreignTitleSeparator);
    }
  }
});
