import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { LegalContents } from "@/components/legal/legal-contents";
import { SubpageFooter, SubpageHeader } from "@/components/subpage-chrome";
import { languages, ogLocales, type Language } from "@/lib/content";
import {
  legalChrome,
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
 * The frame every legal page shares, on the homepage's twelve-column grid: the subpage
 * header with a link to the legal index; a title block; the document's contents in the
 * first three columns from 1024px (the index has none and takes the full width); a
 * closing contact block; and the subpage footer, which links the three documents.
 * Emphasis is spent once, on the title. No page shows an effective date or a version.
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
    <div className="subpage legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }}
      />
      <SubpageHeader language={language}>
        <Link href={indexPath} className="subpage-header-link" aria-current={slug ? undefined : "page"}>
          {chrome.legal}
        </Link>
      </SubpageHeader>

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

      <SubpageFooter language={language} current={slug} />
    </div>
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
