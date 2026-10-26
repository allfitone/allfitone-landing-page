import type { NextConfig } from "next";

import { ambassadorReleaseBlockers } from "./src/lib/ambassadors/release.ts";

const PHASE_PRODUCTION_BUILD: typeof import("next/constants").PHASE_PRODUCTION_BUILD = "phase-production-build";

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

export default function config(phase: string): NextConfig {
  // Every deployment runs a production build, so this is where unapproved ambassadors and
  // their photos are stopped, whichever pipeline deploys the site. `next dev` still previews drafts,
  // and `next typegen` loads this phase only to generate route types, so it keeps working on drafts.
  const generatingTypes = process.argv.slice(2).includes("typegen");
  if (phase === PHASE_PRODUCTION_BUILD && !generatingTypes) {
    const blockers = ambassadorReleaseBlockers(process.cwd());
    if (blockers.length > 0) {
      throw new Error(`Ambassador profiles are not ready to ship:\n- ${blockers.join("\n- ")}\nSee docs/ambassadors/README.md.`);
    }
  }
  return nextConfig;
}
