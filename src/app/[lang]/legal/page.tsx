import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FoundationIcon } from "@allfitone/react/icons";

import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { isLanguage } from "@/lib/content";
import { legalChrome, legalDocumentSlugs, legalIndexContent, legalPath } from "@/lib/legal/documents";
import { localizedPath } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return legalMetadata(lang, undefined, legalIndexContent[lang]);
}

/** The legal index: each document as one row, with what it covers. */
export default async function LegalIndexPage({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = legalIndexContent[lang];
  const chrome = legalChrome[lang];

  return (
    <LegalPage language={lang} title={copy.title} lead={copy.lead} contact={copy.contact}>
      <ul className="legal-index" aria-label={chrome.documents}>
        {legalDocumentSlugs.map((slug) => (
          <li key={slug} className="legal-index-item">
            <Link href={localizedPath(lang, legalPath(slug))} className="legal-index-link">
              <span className="legal-index-name">{chrome.names[slug]}</span>
              <span className="legal-index-arrow" aria-hidden="true">
                <FoundationIcon name="forward" size="md" decorative />
              </span>
            </Link>
            <p className="legal-index-summary">{copy.summaries[slug]}</p>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
