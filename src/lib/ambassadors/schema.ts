import type { Language } from "@/lib/content";
import { foreignTitleSeparator } from "../page-title.ts";

/*
 * Data contract for ambassador profiles. Its only runtime import, `page-title.ts`, has
 * none of its own, so the Node scripts in `scripts/ambassadors/` load it directly
 * through type stripping and apply exactly the rules the site applies at build time.
 */

const languageKeys = { es: true, en: true } as const satisfies Record<Language, true>;
export const ambassadorLanguages = Object.keys(languageKeys) as Language[];

/** `draft` and `review` render only in local development; `published` is reachable in production. */
export const ambassadorStatuses = ["draft", "review", "published"] as const;
export type AmbassadorStatus = (typeof ambassadorStatuses)[number];

/** The hero rail and the method share the desktop grid, which holds up to four columns. */
export const ambassadorLimits = { heroFacts: 4, methodSteps: 4 } as const;

export type Localized<T> = Record<Language, T>;

export type AmbassadorPhoto = {
  /** Public path under `/ambassadors/`, served from `public/`. */
  src: string;
  width: number;
  height: number;
  /** An empty string in both languages marks the photo as decorative. */
  alt: Localized<string>;
};

export type AmbassadorHeroPhoto = AmbassadorPhoto & {
  /** `object-position` of the 4:5 phone crop, such as `88% top`. */
  focusMobile?: string;
  /** Desktop distance between the portrait and the grid's right edge, such as `5vw`. */
  insetDesktop?: string;
};

export type AmbassadorSocial = {
  platform: string;
  handle: string;
  /** Profiles without a URL stay hidden until the link is confirmed. */
  url?: string;
};

export type AmbassadorPlanCopy = {
  name: string;
  who: string;
  cadence: string;
  includesLead: string;
  includes: string[];
  cta: string;
};

export type AmbassadorPlan = {
  /** Stable identifier; copy and prices are matched by it, never by position. */
  id: string;
  months: number;
  /** Total price in whole Colombian pesos. */
  priceCOP: number;
  featured: boolean;
  copy: Localized<AmbassadorPlanCopy>;
};

export type AmbassadorMethodStep = {
  title: string;
  body: string;
};

export type AmbassadorCopy = {
  metaTitle: string;
  metaDescription: string;
  role: string;
  lead: string;
  heroFacts: string[];
  statement: string;
  aboutBody: string[];
  methodTitle: string;
  method: AmbassadorMethodStep[];
  plansTitle: string;
  plansLead: string;
  contactTitle: string;
  contactBody: string;
};

export type AmbassadorProfile = {
  slug: string;
  status: AmbassadorStatus;
  identity: { givenName: string; familyName: string };
  photos: { hero: AmbassadorHeroPhoto; standing: AmbassadorPhoto };
  socials: AmbassadorSocial[];
  /** Plan whose monthly price the others are compared with. Required when there are plans. */
  basePlanId?: string;
  plans: AmbassadorPlan[];
  content: Localized<AmbassadorCopy>;
};

export type AmbassadorValidation = {
  /** Null when there are errors. */
  profile: AmbassadorProfile | null;
  /** Problems that make the data unusable in any status. */
  errors: string[];
  /** Required copy that is still empty. Allowed in `draft`, blocking for `review` and `published`. */
  pending: string[];
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const planIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const photoSrcPattern = /^\/ambassadors\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)?[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpe?g|png|webp)$/;
const positionPattern = /^(?:left|center|right|\d{1,3}(?:\.\d+)?%)(?: (?:top|center|bottom|\d{1,3}(?:\.\d+)?%))?$/;
const insetPattern = /^(?:0|\d{1,3}(?:\.\d+)?(?:px|rem|vw))$/;

type Issues = Pick<AmbassadorValidation, "errors" | "pending">;
type Shape = { required: readonly string[]; optional?: readonly string[] };
type Field = Record<string, unknown>;

function isRecord(value: unknown): value is Field {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown, path: string, shape: Shape, issues: Issues): Field | null {
  if (!isRecord(value)) {
    issues.errors.push(`${path}: expected an object`);
    return null;
  }
  const allowed = [...shape.required, ...(shape.optional ?? [])];
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) issues.errors.push(`${path}.${key}: unknown field`);
  }
  for (const key of shape.required) {
    if (!(key in value)) issues.errors.push(`${path}.${key}: missing field`);
  }
  return value;
}

/** Reads text; an empty required value is pending rather than an error. */
function readText(value: unknown, path: string, issues: Issues, required = true): string {
  if (typeof value !== "string") {
    issues.errors.push(`${path}: expected text`);
    return "";
  }
  if (required && value.trim() === "") issues.pending.push(path);
  return value;
}

function readList<T>(value: unknown, path: string, issues: Issues, read: (item: unknown, itemPath: string) => T): T[] {
  if (!Array.isArray(value)) {
    issues.errors.push(`${path}: expected a list`);
    return [];
  }
  return value.map((item, index) => read(item, `${path}[${index}]`));
}

function readTextList(value: unknown, path: string, issues: Issues, { min = 0, max = Infinity } = {}): string[] {
  const items = readList(value, path, issues, (item, itemPath) => readText(item, itemPath, issues));
  if (items.length > max) issues.errors.push(`${path}: at most ${max} items`);
  if (Array.isArray(value) && items.length < min) issues.pending.push(path);
  return items;
}

function readInteger(value: unknown, path: string, issues: Issues, min: number): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < min) {
    issues.errors.push(`${path}: expected a whole number of at least ${min}`);
    return min;
  }
  return value;
}

function readLocalized<T>(value: unknown, path: string, issues: Issues, read: (item: unknown, itemPath: string) => T): Localized<T> | null {
  const record = readRecord(value, path, { required: ambassadorLanguages }, issues);
  if (!record) return null;
  const entries = ambassadorLanguages.map((language) => [language, read(record[language], `${path}.${language}`)] as const);
  return Object.fromEntries(entries) as Localized<T>;
}

/** Every language must describe the same structure, item for item. */
function checkParity<T>(localized: Localized<T>, select: (value: T) => unknown[], path: string, issues: Issues) {
  const [first, ...rest] = ambassadorLanguages;
  const expected = select(localized[first]).length;
  for (const language of rest) {
    const actual = select(localized[language]).length;
    if (actual !== expected) issues.errors.push(`${path}: ${first} has ${expected} items and ${language} has ${actual}`);
  }
}

function readPhoto(value: unknown, path: string, issues: Issues, hero: boolean): AmbassadorHeroPhoto | null {
  const shape = { required: ["src", "width", "height", "alt"], optional: hero ? ["focusMobile", "insetDesktop"] : [] };
  const record = readRecord(value, path, shape, issues);
  if (!record) return null;

  const src = readText(record.src, `${path}.src`, issues, false);
  if (!photoSrcPattern.test(src)) {
    issues.errors.push(`${path}.src: expected a lowercase .jpg, .png or .webp path under /ambassadors/`);
  }
  const alt = readLocalized(record.alt, `${path}.alt`, issues, (item, itemPath) => readText(item, itemPath, issues, false));
  if (alt && new Set(ambassadorLanguages.map((language) => alt[language].trim() === "")).size > 1) {
    issues.errors.push(`${path}.alt: write it in every language or leave it empty in every language`);
  }

  const photo: AmbassadorHeroPhoto = {
    src,
    width: readInteger(record.width, `${path}.width`, issues, 1),
    height: readInteger(record.height, `${path}.height`, issues, 1),
    alt: alt ?? { es: "", en: "" },
  };
  // On desktop the portrait keeps its proportions at full hero height, so a horizontal photo
  // reaches across the text column and sits behind the name.
  if (hero && photo.width > photo.height) {
    issues.errors.push(`${path}: the hero photo must be vertical or square; crop a vertical version, ideally 4:5`);
  }
  if (record.focusMobile !== undefined) {
    photo.focusMobile = readText(record.focusMobile, `${path}.focusMobile`, issues, false);
    if (!positionPattern.test(photo.focusMobile)) issues.errors.push(`${path}.focusMobile: expected a CSS position such as "88% top"`);
  }
  if (record.insetDesktop !== undefined) {
    photo.insetDesktop = readText(record.insetDesktop, `${path}.insetDesktop`, issues, false);
    if (!insetPattern.test(photo.insetDesktop)) issues.errors.push(`${path}.insetDesktop: expected a length such as "5vw", "2rem" or "40px"`);
  }
  return photo;
}

function readSocial(value: unknown, path: string, issues: Issues): AmbassadorSocial | null {
  const record = readRecord(value, path, { required: ["platform", "handle"], optional: ["url"] }, issues);
  if (!record) return null;
  const social: AmbassadorSocial = {
    platform: readText(record.platform, `${path}.platform`, issues),
    handle: readText(record.handle, `${path}.handle`, issues, false),
  };
  const url = record.url === undefined ? "" : readText(record.url, `${path}.url`, issues, false);
  if (url) {
    if (!URL.canParse(url) || new URL(url).protocol !== "https:") issues.errors.push(`${path}.url: expected an https:// address`);
    social.url = url;
  }
  return social;
}

function readPlan(value: unknown, path: string, issues: Issues): AmbassadorPlan | null {
  const record = readRecord(value, path, { required: ["id", "months", "priceCOP", "featured", "copy"] }, issues);
  if (!record) return null;

  const id = readText(record.id, `${path}.id`, issues, false);
  if (!planIdPattern.test(id)) issues.errors.push(`${path}.id: use lowercase letters, numbers and single hyphens`);
  if (typeof record.featured !== "boolean") issues.errors.push(`${path}.featured: expected true or false`);

  const copy = readLocalized(record.copy, `${path}.copy`, issues, (item, itemPath) => {
    const fields = readRecord(item, itemPath, { required: ["name", "who", "cadence", "includesLead", "includes", "cta"] }, issues) ?? {};
    return {
      name: readText(fields.name, `${itemPath}.name`, issues),
      who: readText(fields.who, `${itemPath}.who`, issues),
      cadence: readText(fields.cadence, `${itemPath}.cadence`, issues),
      includesLead: readText(fields.includesLead, `${itemPath}.includesLead`, issues),
      includes: readTextList(fields.includes, `${itemPath}.includes`, issues, { min: 1 }),
      cta: readText(fields.cta, `${itemPath}.cta`, issues),
    };
  });
  if (!copy) return null;
  checkParity(copy, (planCopy) => planCopy.includes, `${path}.copy.*.includes`, issues);

  return {
    id,
    months: readInteger(record.months, `${path}.months`, issues, 1),
    priceCOP: readInteger(record.priceCOP, `${path}.priceCOP`, issues, 0),
    featured: record.featured === true,
    copy,
  };
}

function readCopy(value: unknown, path: string, issues: Issues, hasPlans: boolean): AmbassadorCopy {
  const fields =
    readRecord(
      value,
      path,
      {
        required: [
          "metaTitle",
          "metaDescription",
          "role",
          "lead",
          "heroFacts",
          "statement",
          "aboutBody",
          "methodTitle",
          "method",
          "plansTitle",
          "plansLead",
          "contactTitle",
          "contactBody",
        ],
      },
      issues,
    ) ?? {};

  const method = readList(fields.method, `${path}.method`, issues, (item, itemPath) => {
    const step = readRecord(item, itemPath, { required: ["title", "body"] }, issues) ?? {};
    return { title: readText(step.title, `${itemPath}.title`, issues), body: readText(step.body, `${itemPath}.body`, issues) };
  });
  if (method.length > ambassadorLimits.methodSteps) issues.errors.push(`${path}.method: at most ${ambassadorLimits.methodSteps} steps`);

  const metaTitle = readText(fields.metaTitle, `${path}.metaTitle`, issues);
  if (foreignTitleSeparator.test(metaTitle)) {
    issues.errors.push(`${path}.metaTitle: separate the title's parts with " | ", not "-", "–", "—" or "·"`);
  }

  return {
    metaTitle,
    metaDescription: readText(fields.metaDescription, `${path}.metaDescription`, issues),
    role: readText(fields.role, `${path}.role`, issues),
    lead: readText(fields.lead, `${path}.lead`, issues),
    heroFacts: readTextList(fields.heroFacts, `${path}.heroFacts`, issues, { max: ambassadorLimits.heroFacts }),
    statement: readText(fields.statement, `${path}.statement`, issues),
    aboutBody: readTextList(fields.aboutBody, `${path}.aboutBody`, issues, { min: 1 }),
    methodTitle: readText(fields.methodTitle, `${path}.methodTitle`, issues, method.length > 0),
    method,
    plansTitle: readText(fields.plansTitle, `${path}.plansTitle`, issues, hasPlans),
    plansLead: readText(fields.plansLead, `${path}.plansLead`, issues, hasPlans),
    contactTitle: readText(fields.contactTitle, `${path}.contactTitle`, issues),
    contactBody: readText(fields.contactBody, `${path}.contactBody`, issues),
  };
}

/** Checks untrusted profile data, typically a parsed JSON file, against the contract. */
export function validateAmbassadorProfile(input: unknown): AmbassadorValidation {
  const issues: Issues = { errors: [], pending: [] };
  const record = readRecord(
    input,
    "profile",
    { required: ["slug", "status", "identity", "photos", "socials", "plans", "content"], optional: ["basePlanId"] },
    issues,
  );
  if (!record) return { profile: null, ...issues };

  const slug = readText(record.slug, "slug", issues, false);
  if (!slugPattern.test(slug)) issues.errors.push("slug: use lowercase letters, numbers and single hyphens, without accents");

  const status = record.status as AmbassadorStatus;
  if (!ambassadorStatuses.includes(status)) issues.errors.push(`status: expected one of ${ambassadorStatuses.join(", ")}`);

  const identityRecord = readRecord(record.identity, "identity", { required: ["givenName", "familyName"] }, issues) ?? {};
  const identity = {
    givenName: readText(identityRecord.givenName, "identity.givenName", issues, false),
    familyName: readText(identityRecord.familyName, "identity.familyName", issues, false),
  };
  if (!identity.givenName.trim() || !identity.familyName.trim()) issues.errors.push("identity: both names are required");

  const photosRecord = readRecord(record.photos, "photos", { required: ["hero", "standing"] }, issues) ?? {};
  const hero = readPhoto(photosRecord.hero, "photos.hero", issues, true);
  const standing = readPhoto(photosRecord.standing, "photos.standing", issues, false);

  const socials = readList(record.socials, "socials", issues, (item, path) => readSocial(item, path, issues));

  const plans = readList(record.plans, "plans", issues, (item, path) => readPlan(item, path, issues));
  const planIds = plans.flatMap((plan) => (plan ? [plan.id] : []));
  if (new Set(planIds).size !== planIds.length) issues.errors.push("plans: every id must be unique");
  if (plans.filter((plan) => plan?.featured).length > 1) issues.errors.push("plans: at most one plan can be featured");

  let basePlanId: string | undefined;
  if (record.basePlanId !== undefined) {
    basePlanId = readText(record.basePlanId, "basePlanId", issues, false);
    if (plans.length === 0) issues.errors.push("basePlanId: remove it or add plans");
    else if (!planIds.includes(basePlanId)) issues.errors.push(`basePlanId: "${basePlanId}" is not the id of a plan`);
  } else if (plans.length > 0) {
    issues.errors.push("basePlanId: required to compare monthly prices");
  }

  const content = readLocalized(record.content, "content", issues, (item, path) => readCopy(item, path, issues, plans.length > 0));
  if (content) {
    checkParity(content, (copy) => copy.heroFacts, "content.*.heroFacts", issues);
    checkParity(content, (copy) => copy.aboutBody, "content.*.aboutBody", issues);
    checkParity(content, (copy) => copy.method, "content.*.method", issues);
  }

  if (issues.errors.length > 0 || !hero || !standing || !content || plans.some((plan) => !plan) || socials.some((social) => !social)) {
    return { profile: null, ...issues };
  }

  const profile: AmbassadorProfile = {
    slug,
    status,
    identity,
    photos: { hero, standing },
    socials: socials as AmbassadorSocial[],
    ...(basePlanId !== undefined ? { basePlanId } : {}),
    plans: plans as AmbassadorPlan[],
    content,
  };
  return { profile, ...issues };
}

/**
 * Returns the validated profile or throws with every problem listed. Pending copy is
 * tolerated only in `draft`, so an incomplete profile can never be promoted.
 */
export function parseAmbassadorProfile(input: unknown, source: string): AmbassadorProfile {
  const { profile, errors, pending } = validateAmbassadorProfile(input);
  const blocking =
    profile && profile.status !== "draft" ? pending.map((path) => `${path}: required before ${profile.status}`) : [];
  if (!profile || blocking.length > 0) {
    throw new Error(`Invalid ambassador profile ${source}:\n- ${[...errors, ...blocking].join("\n- ")}`);
  }
  return profile;
}
