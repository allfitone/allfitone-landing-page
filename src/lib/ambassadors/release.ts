import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/*
 * Release rule for ambassador profiles. Unpublished pages never render in production,
 * but anything under `public/` is served by URL once deployed, so a build may only ship
 * published profiles and the photos they reference. `next.config.ts` applies the rule to
 * every production build and `npm run ambassador:check` reports it. The module imports
 * only Node built-ins so both Next's config loader and Node's TypeScript loader run it.
 */

function filesUnder(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .flatMap((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? filesUnder(target) : [target];
    });
}

/** Lists what would block a production build of the project at `rootDir`; empty when releasable. */
export function ambassadorReleaseBlockers(rootDir: string): string[] {
  const dataDir = path.join(rootDir, "src", "data", "ambassadors");
  const publicDir = path.join(rootDir, "public");
  const blockers: string[] = [];
  const shippedPhotos = new Set<string>();

  const profileFiles = existsSync(dataDir) ? readdirSync(dataDir).filter((file) => file.endsWith(".json")) : [];
  for (const file of profileFiles) {
    let profile: { status?: unknown; photos?: Record<string, { src?: unknown } | undefined> };
    try {
      profile = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
    } catch {
      blockers.push(`src/data/ambassadors/${file} is not valid JSON`);
      continue;
    }
    if (profile.status !== "published") {
      blockers.push(`src/data/ambassadors/${file} is "${String(profile.status)}"; only published profiles can be built for production`);
      continue;
    }
    for (const photo of Object.values(profile.photos ?? {})) {
      if (typeof photo?.src === "string") shippedPhotos.add(photo.src);
    }
  }

  for (const file of filesUnder(path.join(publicDir, "ambassadors"))) {
    const src = `/${path.relative(publicDir, file).split(path.sep).join("/")}`;
    if (!shippedPhotos.has(src)) blockers.push(`public${src} does not belong to a published profile and would be served by URL`);
  }

  return blockers;
}
