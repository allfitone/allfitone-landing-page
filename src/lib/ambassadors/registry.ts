import { ambassadorSources } from "@/data/ambassadors";
import { parseAmbassadorProfile, type AmbassadorProfile } from "@/lib/ambassadors/schema";

/** Every registered profile. Invalid data throws while the module loads, so it fails the build. */
export const ambassadors: readonly AmbassadorProfile[] = ambassadorSources.map(({ file, data }) => {
  const profile = parseAmbassadorProfile(data, file);
  if (file !== `${profile.slug}.json`) throw new Error(`Invalid ambassador profile ${file}: the slug must match the file name`);
  return profile;
});

/**
 * Draft and review profiles render only under `next dev`, so they never reach a production
 * build. A published profile is reachable, not indexable: every ambassador page stays noindex.
 */
const previewUnpublished = process.env.NODE_ENV === "development";

export function isAmbassadorVisible(profile: AmbassadorProfile, preview = previewUnpublished) {
  return profile.status === "published" || preview;
}

export function visibleAmbassadors(preview = previewUnpublished) {
  return ambassadors.filter((profile) => isAmbassadorVisible(profile, preview));
}

export function getAmbassador(slug: string) {
  return visibleAmbassadors().find((profile) => profile.slug === slug);
}

/** Language-neutral path of a profile, to be prefixed with `localizedPath()`. */
export function ambassadorPath(slug: string) {
  return `/ambassadors/${slug}`;
}
