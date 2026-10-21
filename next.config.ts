import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives under app/[lang], so unmatched URLs need a 404 that renders its own document.
    globalNotFound: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      // Temporary, so the root can later negotiate the visitor's language without cached 308s in browsers.
      { source: "/", destination: "/es", permanent: false },
      // Pages that were published before language prefixes keep their links working.
      { source: "/privacy/analytics", destination: "/es/privacy/analytics", permanent: true },
      { source: "/ambassadors/william", destination: "/es/ambassadors/william", permanent: true },
    ];
  },
};

export default nextConfig;
