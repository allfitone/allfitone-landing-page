import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLockup } from "@allfitone/react/brand";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { LanguageSwitch } from "@/components/language-switch";
import { LegalContents } from "@/components/legal/legal-contents";
import { languages, ogLocales, type Language } from "@/lib/content";
import {
  formatLegalDate,
  legalChrome,
  legalDocumentSlugs,
  legalEffectiveDates,
  legalIndexContent,
  legalPath,
  type LegalDocumentSlug,
  type LegalSection,
} from "@/lib/legal/documents";
import { languageAlternates, localizedPath, shareImage, siteConfig } from "@/lib/site-config";

/** Metadata for a legal page: its own canonical in each language, indexable, shared as an article. */
export function legalMetadata(
  language: Language,
  slug: LegalDocumentSlug | undefined,
  { metaTitle, metaDescription }: { metaTitle: string; metaDescription: string },
): Metadata {
  const path = legalPath(slug);
  const url = localizedPath(language, path);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url, languages: languageAlternates(path) },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      locale: ogLocales[language],
      alternateLocale: languages.filter((other) => other !== language).map((other) => ogLocales[other]),
      images: [shareImage(language)],
    },
    twitter: { card: "summary_large_image", title: metaTitle, description: metaDescription, images: [shareImage(language)] },
  };
}

type ContentsEntry = readonly [`#${string}`, string];

/**
 * The frame every legal page shares, on the homepage's twelve-column grid: a header with
 * the brand, the legal index and the language switch; a title block with the effective
 * date; the document's contents in the first three columns from 1024px (the index has
 * none and takes the full width); a closing contact block; and a footer that links the
 * three documents. Emphasis is spent once, on the title.
 */
export function LegalPage({
  language,
  slug,
  title,
  lead,
  contents,
  contact,
  children,
}: {
  language: Language;
  /** The document; the legal index has none. */
  slug?: LegalDocumentSlug;
  title: string;
  lead: string;
  contents?: readonly ContentsEntry[];
  contact: string;
  children: ReactNode;
}) {
  const chrome = legalChrome[language];
  const homePath = localizedPath(language);
  const indexPath = localizedPath(language, legalPath());
  const subject = slug === "terms" || !slug ? "Allfit One legal request" : "Allfit One privacy request";
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
  // A title of two sentences gives each its own line, so neither breaks mid-thought.
  const titleLines = title.split(/(?<=\.)\s+/);
  const breadcrumb = [
    { name: siteConfig.name, path: homePath },
    { name: legalIndexContent[language].title, path: indexPath },
    ...(slug ? [{ name: chrome.names[slug], path: localizedPath(language, legalPath(slug)) }] : []),
  ];
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return (
    <div className="legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }}
      />
      <header className="legal-header">
        <div className="legal-shell legal-header-inner">
          <Link href={homePath} className="legal-brand" aria-label="Allfit One">
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <div className="legal-header-actions">
            <Link href={indexPath} className="legal-header-link" aria-current={slug ? undefined : "page"}>
              {chrome.legal}
            </Link>
            <LanguageSwitch language={language} label={chrome.selectLanguage} />
          </div>
        </div>
      </header>

      {/* The homepage's own grid, so every legal page spans the same width as the rest of the site. */}
      <main className={cn("site-grid legal-layout", !contents && "legal-layout-single")}>
        <header className="legal-intro">
          <h1 className="legal-title">
            {titleLines.map((line, index) => (
              <span key={line} className="block">
                {index > 0 ? " " : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="legal-lead">{lead}</p>
          {slug ? <EffectiveDate language={language} slug={slug} /> : null}
        </header>

        {contents ? <LegalContents label={chrome.contents} entries={contents} /> : null}

        <div className="legal-document">
          {children}
          <section id="contact" className="legal-contact" aria-labelledby="legal-contact-title">
            <h2 id="legal-contact-title">{contact}</h2>
            <a href={contactHref} className="legal-contact-link">
              {siteConfig.email}
              <FoundationIcon name="forward" size="sm" decorative />
            </a>
          </section>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="legal-shell legal-footer-inner">
          <BrandLockup surface="dark" className="h-7 w-auto" title="Allfit One" />
          <nav className="legal-footer-nav" aria-label={chrome.documents}>
            {legalDocumentSlugs.map((document) => (
              <Link
                key={document}
                href={localizedPath(language, legalPath(document))}
                className="legal-footer-link"
                aria-current={document === slug ? "page" : undefined}
              >
                {chrome.names[document]}
              </Link>
            ))}
          </nav>
          <Link href={homePath} className="legal-home-link">
            {chrome.home}
          </Link>
        </div>
      </footer>
    </div>
  );
}

/** «Vigente desde el 7 de noviembre de 2026», with the date as a machine-readable `<time>`. */
export function EffectiveDate({ language, slug }: { language: Language; slug: LegalDocumentSlug }) {
  const date = legalEffectiveDates[slug];
  const [before, after] = legalChrome[language].effective.split("{date}");
  return (
    <p className="legal-effective">
      {before}
      <time dateTime={date}>{formatLegalDate(language, date)}</time>
      {after}
    </p>
  );
}

/** The sections of a plain legal document: a heading, then paragraphs and lists in order. */
export function LegalSections({ language, sections }: { language: Language; sections: readonly LegalSection[] }) {
  const chrome = legalChrome[language];
  return sections.map((section) => (
    <section key={section.id} id={section.id} className="legal-section" aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      {section.content.map((block) =>
        typeof block === "string" ? (
          <p key={block} className="legal-text">
            {block}
          </p>
        ) : (
          <ul key={block[0]} className="legal-list">
            {block.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
      {section.link ? (
        <Link href={localizedPath(language, legalPath(section.link))} className="legal-section-link">
          {chrome.names[section.link]}
          <FoundationIcon name="forward" size="sm" decorative />
        </Link>
      ) : null}
    </section>
  ));
}

/** Turns a document's sections into the entries its contents list. */
export function contentsOf(sections: readonly LegalSection[]): ContentsEntry[] {
  return sections.map((section) => [`#${section.id}`, section.title] as const);
}
