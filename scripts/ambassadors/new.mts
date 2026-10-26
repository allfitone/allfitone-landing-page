/**
 * Creates a draft ambassador profile from an intake file. It validates the data with the
 * rules the site applies at build time, checks and copies the photos, writes the profile,
 * and registers it. Nothing is written when there is an error, the source photos are
 * only read, and existing files are never overwritten.
 *
 *   npm run ambassador:new -- path/to/intake.json
 *   npm run ambassador:new -- path/to/intake.json --dry-run
 *
 * The intake follows docs/ambassadors/intake.template.json; photo paths are relative to it.
 */
import { constants, copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { validateAmbassadorProfile } from "../../src/lib/ambassadors/schema.ts";
import {
  dataDir,
  formatExtensions,
  formatList,
  indexFile,
  profileFiles,
  publicDir,
  readImageInfo,
  recommendedPhotoWidth,
  renderIndex,
  rootDir,
} from "./shared.mts";

const intakeFields = ["slug", "identity", "photos", "socials", "basePlanId", "plans", "content"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stop(message: string): never {
  console.error(message);
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const intakeArg = args.find((arg) => !arg.startsWith("--"));
if (!intakeArg) stop("Usage: npm run ambassador:new -- <intake.json> [--dry-run]");

const intakePath = path.resolve(intakeArg);
let intake: unknown;
try {
  intake = JSON.parse(readFileSync(intakePath, "utf8"));
} catch (error) {
  stop(`Cannot read ${intakeArg}: ${(error as Error).message}`);
}
if (!isRecord(intake)) stop("The intake must be a JSON object.");

const errors: string[] = [];
const warnings: string[] = [];

for (const key of Object.keys(intake)) {
  if (key === "status") warnings.push("status is ignored: every new profile starts as draft");
  else if (!intakeFields.includes(key)) errors.push(`${key}: unknown field`);
}

const slug = typeof intake.slug === "string" ? intake.slug : "";
if (slug && existsSync(path.join(dataDir, `${slug}.json`))) {
  errors.push(`slug: src/data/ambassadors/${slug}.json already exists; edit that profile instead`);
}

const photos: Record<string, unknown> = {};
const copies: { from: string; to: string }[] = [];
const intakePhotos = isRecord(intake.photos) ? intake.photos : {};

for (const role of ["hero", "standing"]) {
  const entry = intakePhotos[role];
  if (!isRecord(entry)) {
    errors.push(`photos.${role}: expected an object with file and alt`);
    continue;
  }
  const { file, ...options } = entry;
  // Keeps validating the rest of the photo entry when the file itself is unusable.
  const placeholder = { src: `/ambassadors/${slug}/${role}.jpg`, width: 1, height: 1, ...options };

  if (typeof file !== "string" || file.trim() === "") {
    errors.push(`photos.${role}.file: the path to the photo is required`);
    photos[role] = placeholder;
    continue;
  }
  const from = path.resolve(path.dirname(intakePath), file);
  const info = existsSync(from) ? readImageInfo(from) : null;
  if (!info) {
    errors.push(`photos.${role}.file: ${from} ${existsSync(from) ? "is not a readable JPEG, PNG, or WebP image" : "does not exist"}`);
    photos[role] = placeholder;
    continue;
  }
  if (info.width < recommendedPhotoWidth) warnings.push(`photos.${role}: ${info.width} px wide; ${recommendedPhotoWidth} px or more is recommended`);
  if (info.height <= info.width) warnings.push(`photos.${role}: not vertical; the layout is composed for 4:5 portraits`);

  const name = `${role}.${formatExtensions[info.format]}`;
  const to = path.join(publicDir, "ambassadors", slug, name);
  if (existsSync(to)) errors.push(`photos.${role}: ${path.relative(rootDir, to)} already exists and will not be overwritten`);
  copies.push({ from, to });
  photos[role] = { src: `/ambassadors/${slug}/${name}`, width: info.width, height: info.height, ...options };
}

const plans = intake.plans ?? [];
const hasBasePlan = intake.basePlanId !== undefined && !(intake.basePlanId === "" && Array.isArray(plans) && plans.length === 0);
const { profile, errors: profileErrors, pending } = validateAmbassadorProfile({
  slug: intake.slug,
  status: "draft",
  identity: intake.identity,
  photos,
  socials: intake.socials ?? [],
  ...(hasBasePlan ? { basePlanId: intake.basePlanId } : {}),
  plans,
  content: intake.content,
});
errors.push(...profileErrors);

process.stdout.write(formatList("Warnings:", warnings));
if (errors.length > 0 || !profile) {
  process.stdout.write(formatList("Errors (nothing was written):", errors));
  process.exit(1);
}
process.stdout.write(formatList("Pending (allowed in draft, required before review):", pending));

if (dryRun) {
  console.log(`Dry run: the intake for "${slug}" is valid. Nothing was written.`);
  process.exit(0);
}

mkdirSync(path.join(publicDir, "ambassadors", slug), { recursive: true });
for (const { from, to } of copies) copyFileSync(from, to, constants.COPYFILE_EXCL);
const profileFile = path.join(dataDir, `${slug}.json`);
writeFileSync(profileFile, `${JSON.stringify(profile, null, 2)}\n`, { flag: "wx" });
writeFileSync(indexFile, renderIndex(profileFiles()));

console.log(`Created the draft ambassador "${slug}":
  ${path.relative(rootDir, profileFile)}
${copies.map(({ to }) => `  ${path.relative(rootDir, to)}`).join("\n")}

Next steps:
  1. Run \`npm run dev\` and open /es/ambassadors/${slug} and /en/ambassadors/${slug}. Drafts render only in development,
     and \`npm run build\` refuses to run until every profile is published.
  2. Review copy, prices, photo rights, and the hero framing (photos.hero.focusMobile, photos.hero.insetDesktop)
     at 320 px, tablet, and desktop widths.
  3. Fill every pending field, then set "status" to "review". Set "published" only after explicit approval.
  4. Once published, run npm run ambassador:check -- --release, lint, typecheck, build, and test:e2e.`);
