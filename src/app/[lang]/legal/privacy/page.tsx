import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage, LegalSections, contentsOf, legalMetadata } from "@/components/legal/legal-page";
import { isLanguage } from "@/lib/content";
import { privacyPolicy } from "@/lib/legal/privacy";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return legalMetadata(lang, "privacy", privacyPolicy[lang]);
}

/** The privacy policy for all of Allfit One. */
export default async function PrivacyPolicyPage({ params }: PageProps<"/[lang]/legal/privacy">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = privacyPolicy[lang];

  return (
    <LegalPage
      language={lang}
      slug="privacy"
      title={copy.title}
      lead={copy.lead}
      contents={contentsOf(copy.sections)}
      contact={copy.contact}
    >
      <LegalSections language={lang} sections={copy.sections} />
    </LegalPage>
  );
}
