import type { Language } from "@/lib/content";

/*
 * The legal section: one index (`/legal`) and three documents, each under its own URL in
 * both languages. The terms cover Allfit Space and Allfit Studio in one document; the
 * privacy policy covers all of Allfit One (both products and this site, waitlist
 * included); the analytics notice details the one optional processing that asks for
 * consent, and the privacy policy links to it.
 */

export const legalDocumentSlugs = ["terms", "privacy", "analytics"] as const;
export type LegalDocumentSlug = (typeof legalDocumentSlugs)[number];

/**
 * The day each document took effect, shown as «Vigente desde…». Change a date whenever
 * that document's terms change. The products record analytics consent against the
 * notice's internal version id («analytics-v1»), which the page does not show.
 */
export const legalEffectiveDates: Record<LegalDocumentSlug, string> = {
  terms: "2026-11-07",
  privacy: "2026-11-07",
  analytics: "2026-08-16",
};

/** The path of the index, or of one document, without the language prefix. */
export function legalPath(slug?: LegalDocumentSlug): string {
  return slug ? `/legal/${slug}` : "/legal";
}

const dateLocales: Record<Language, string> = { es: "es", en: "en-US" };

/** An ISO date written out in the page language: «7 de noviembre de 2026», «November 7, 2026». */
export function formatLegalDate(language: Language, isoDate: string): string {
  return new Intl.DateTimeFormat(dateLocales[language], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

/** A section of a plain legal document. A string is a paragraph; a list of strings is a list. */
export interface LegalSection {
  id: string;
  title: string;
  content: readonly (string | readonly string[])[];
  /** Another legal document this section points to, linked after its text. */
  link?: LegalDocumentSlug;
}

export interface LegalText {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  contact: string;
  sections: readonly LegalSection[];
}

/** Interface copy shared by every legal page. */
export const legalChrome = {
  es: {
    selectLanguage: "Seleccionar idioma",
    legal: "Legal",
    home: "Volver a Allfit One",
    contents: "En este documento",
    // `{date}` is the document's effective date, written out by `formatLegalDate()`.
    effective: "Vigente desde el {date}",
    documents: "Documentos legales",
    read: "Leer",
    names: {
      terms: "Términos y condiciones",
      privacy: "Política de privacidad",
      analytics: "Aviso de analítica",
    },
  },
  en: {
    selectLanguage: "Select language",
    legal: "Legal",
    home: "Back to Allfit One",
    contents: "In this document",
    effective: "Effective {date}",
    documents: "Legal documents",
    read: "Read",
    names: {
      terms: "Terms and conditions",
      privacy: "Privacy policy",
      analytics: "Analytics notice",
    },
  },
} as const satisfies Record<Language, unknown>;

export const legalIndexContent = {
  es: {
    metaTitle: "Legal | Allfit One",
    metaDescription: "Términos y condiciones, política de privacidad y aviso de analítica de Allfit One.",
    title: "Legal",
    lead: "Las condiciones para usar Allfit One y cómo tratamos tus datos personales, en un solo lugar.",
    summaries: {
      terms: "Las condiciones para usar Allfit Space y Allfit Studio.",
      privacy: "Qué datos personales tratamos, para qué y cómo ejerces tus derechos.",
      analytics: "Qué medimos con la analítica opcional y lo que nunca recopilamos.",
    },
    contact: "Preguntas sobre estos documentos",
  },
  en: {
    metaTitle: "Legal | Allfit One",
    metaDescription: "Allfit One's terms and conditions, privacy policy and analytics notice.",
    title: "Legal",
    lead: "The terms for using Allfit One and how we handle your personal data, in one place.",
    summaries: {
      terms: "The terms for using Allfit Space and Allfit Studio.",
      privacy: "Which personal data we process, why, and how you exercise your rights.",
      analytics: "What optional analytics measures and what we never collect.",
    },
    contact: "Questions about these documents",
  },
} as const satisfies Record<Language, unknown>;
