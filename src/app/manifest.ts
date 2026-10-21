import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/es",
    display: "standalone",
    lang: "es",
    background_color: "#030713",
    theme_color: "#030713",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/allfit-one-avatar.png", type: "image/png", sizes: "1080x1080", purpose: "any" },
    ],
  };
}
