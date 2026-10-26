/**
 * Validates every ambassador profile with the rules the site applies at build time,
 * checks that each photo exists and matches its declared format and size, and keeps
 * the registry index in sync with the profile files.
 *
 *   npm run ambassador:check                validate; fails on any error
 *   npm run ambassador:check -- --write     also regenerate src/data/ambassadors/index.ts
 *   npm run ambassador:check -- --release   also fail on what would block a production build
 *
 * Production builds refuse unpublished profiles and photos that no published profile uses
 * (see src/lib/ambassadors/release.ts); without `--release` those are reported as warnings.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { ambassadorReleaseBlockers } from "../../src/lib/ambassadors/release.ts";
import { validateAmbassadorProfile } from "../../src/lib/ambassadors/schema.ts";
import {
  dataDir,
  formatExtensions,
  formatList,
  indexFile,
  profileFiles,
  publicFile,
  readImageInfo,
  readIndex,
  recommendedPhotoWidth,
  renderIndex,
  rootDir,
} from "./shared.mts";

const write = process.argv.includes("--write");
const release = process.argv.includes("--release");
const errors: string[] = [];
const warnings: string[] = [];
const rows: string[] = [];

const files = profileFiles();

for (const file of files) {
  let input: unknown;
  try {
    input = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: not valid JSON (${(error as Error).message})`);
    continue;
  }

  const { profile, errors: profileErrors, pending } = validateAmbassadorProfile(input);
  errors.push(...profileErrors.map((message) => `${file}: ${message}`));
  if (!profile) continue;

  if (file !== `${profile.slug}.json`) errors.push(`${file}: the slug "${profile.slug}" must match the file name`);
  if (profile.status === "draft") warnings.push(...pending.map((field) => `${file}: pending ${field}`));
  else errors.push(...pending.map((field) => `${file}: ${field} is required before ${profile.status}`));

  for (const [role, photo] of Object.entries(profile.photos)) {
    const target = publicFile(photo.src);
    if (!existsSync(target)) {
      errors.push(`${file}: photos.${role} ${photo.src} does not exist in public/`);
      continue;
    }
    const info = readImageInfo(target);
    if (!info) {
      errors.push(`${file}: photos.${role} ${photo.src} is not a readable JPEG, PNG, or WebP image`);
      continue;
    }
    const extension = path.extname(target).slice(1).replace("jpeg", "jpg");
    if (extension !== formatExtensions[info.format]) errors.push(`${file}: photos.${role} is ${info.format} data with a .${extension} name`);
    if (info.width !== photo.width || info.height !== photo.height) {
      errors.push(`${file}: photos.${role} declares ${photo.width}×${photo.height} but the file is ${info.width}×${info.height}`);
    }
    if (info.width < recommendedPhotoWidth) warnings.push(`${file}: photos.${role} is ${info.width} px wide; ${recommendedPhotoWidth} px or more is recommended`);
    if (info.height <= info.width) warnings.push(`${file}: photos.${role} is not vertical; the layout is composed for 4:5 portraits`);
  }

  rows.push(`  ${profile.slug.padEnd(24)} ${profile.status.padEnd(10)} ${String(profile.plans.length).padEnd(6)} ${pending.length}`);
}

const blockers = ambassadorReleaseBlockers(rootDir).map((blocker) => `production build: ${blocker}`);
(release ? errors : warnings).push(...blockers);

const expectedIndex = renderIndex(files);
if (readIndex() !== expectedIndex) {
  if (write) {
    writeFileSync(indexFile, expectedIndex);
    console.log(`Updated ${path.relative(process.cwd(), indexFile)}.`);
  } else {
    errors.push("src/data/ambassadors/index.ts is out of date; run `npm run ambassador:check -- --write`");
  }
}

if (rows.length > 0) console.log(`  ${"slug".padEnd(24)} ${"status".padEnd(10)} ${"plans".padEnd(6)} pending\n${rows.join("\n")}\n`);
process.stdout.write(formatList("Warnings:", warnings));
process.stdout.write(formatList("Errors:", errors));

if (errors.length > 0) {
  process.exitCode = 1;
} else {
  console.log(`${files.length} ambassador profile${files.length === 1 ? "" : "s"} valid.`);
}
