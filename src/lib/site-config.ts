import type { Language } from "@/lib/content";

const seo = {
  es: {
    title: "Allfit One - El ecosistema donde el fitness se conecta",
    description:
      "Allfit One conecta personas, profesionales y organizaciones alrededor de una identidad fitness portátil: Allfit Space para vivir el fitness y Allfit Studio para gestionarlo.",
  },
  en: {
    title: "Allfit One - The ecosystem where fitness connects",
    description:
      "Allfit One connects people, professionals and organizations around a portable fitness identity: Allfit Space to live fitness and Allfit Studio to manage it.",
  },
} as const satisfies Record<Language, { title: string; description: string }>;

export const siteConfig = {
  name: "Allfit One",
  url: "https://www.allfit.one",
  seo,
  /** Default-language SEO copy for surfaces without a URL language, such as the web manifest. */
  title: seo.es.title,
  description: seo.es.description,
  email: "hello@allfit.one",
  social: {
    instagram: "https://www.instagram.com/allfitone/",
    tiktok: "https://www.tiktok.com/@allfitone",
    linkedin: "https://www.linkedin.com/company/allfitone/",
  },
  /** Each product's own landing. Both answer under `/es` and `/en`, like this site. */
  products: {
    space: "https://space.allfit.one",
    studio: "https://studio.allfit.one",
  },
} as const;

/** A product's landing in the given language, e.g. `https://studio.allfit.one/en`. */
export function productSiteUrl(product: keyof typeof siteConfig.products, language: Language) {
  return `${siteConfig.products[product]}/${language}`;
}

const shareImageAlt = {
  es: "Allfit One — All the fitness in one place. Allfit Space y Allfit Studio, dos productos conectados.",
  en: "Allfit One — All the fitness in one place. Allfit Space and Allfit Studio, two connected products.",
} as const satisfies Record<Language, string>;

/**
 * The shared social preview. It is declared explicitly because a page that sets its own
 * openGraph or twitter metadata replaces the inherited object, image included.
 */
export function shareImage(language: Language) {
  return { url: "/social/allfit-one-share.png", width: 1200, height: 630, type: "image/png", alt: shareImageAlt[language] };
}

/** Builds the public path of a page in the given language, e.g. `/en/privacy/analytics`. */
export function localizedPath(language: Language, path = "") {
  return `/${language}${path}`;
}

/** hreflang alternates for a page, with the language-negotiating root as x-default for the homepage. */
export function languageAlternates(path = "") {
  return {
    es: localizedPath("es", path),
    en: localizedPath("en", path),
    "x-default": path ? localizedPath("es", path) : "/",
  };
}
