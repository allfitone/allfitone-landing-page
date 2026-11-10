import type { MetadataRoute } from "next";

import { languages } from "@/lib/content";
import { localizedPath, shareImage, siteConfig } from "@/lib/site-config";

// Rendered once at build time: the site is a static export.
export const dynamic = "force-static";

const pages = [
  { path: "", lastModified: new Date("2026-10-20"), changeFrequency: "monthly", priority: 1, image: true },
  { path: "/legal", lastModified: new Date("2026-11-07"), changeFrequency: "yearly", priority: 0.3, image: false },
  { path: "/legal/terms", lastModified: new Date("2026-11-07"), changeFrequency: "yearly", priority: 0.4, image: false },
  { path: "/legal/privacy", lastModified: new Date("2026-11-10"), changeFrequency: "yearly", priority: 0.4, image: false },
  { path: "/legal/analytics", lastModified: new Date("2026-11-07"), changeFrequency: "yearly", priority: 0.4, image: false },
] as const;

/** Lists each canonical language URL once, with its translations as hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    languages.map((language) => ({
      url: `${siteConfig.url}${localizedPath(language, page.path)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          languages.map((alternate) => [alternate, `${siteConfig.url}${localizedPath(alternate, page.path)}`]),
        ),
      },
      ...(page.image ? { images: [`${siteConfig.url}${shareImage(language).url}`] } : {}),
    })),
  );
}
