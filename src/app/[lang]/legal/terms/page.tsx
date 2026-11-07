import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage, LegalSections, contentsOf, legalMetadata } from "@/components/legal/legal-page";
import { isLanguage } from "@/lib/content";
import { termsAndConditions } from "@/lib/legal/terms";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return legalMetadata(lang, "terms", termsAndConditions[lang]);
}

/** The terms and conditions: one document for Allfit Space and Allfit Studio. */
export default async function TermsPage({ params }: PageProps<"/[lang]/legal/terms">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = termsAndConditions[lang];

  return (
    <LegalPage
      language={lang}
      slug="terms"
      title={copy.title}
      lead={copy.lead}
      contents={contentsOf(copy.sections)}
      contact={copy.contact}
    >
      <LegalSections language={lang} sections={copy.sections} />
    </LegalPage>
  );
}
