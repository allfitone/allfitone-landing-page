import type { NextConfig } from "next";

import { ambassadorReleaseBlockers } from "./src/lib/ambassadors/release.ts";

const PHASE_PRODUCTION_BUILD: typeof import("next/constants").PHASE_PRODUCTION_BUILD = "phase-production-build";

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives under app/[lang], so unmatched URLs need a 404 that renders its own document.
    globalNotFound: true,
  },
  // A static export: CloudFront serves the files, and answers the redirects (see README).
  output: "export",
  images: { unoptimized: true },
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
