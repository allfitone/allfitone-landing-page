import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-07-17"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteConfig.url}/opengraph-image.png`],
    },
    {
      url: `${siteConfig.url}/privacy/analytics`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
