import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLockup } from "@allfitone/react/brand";
import { FoundationIcon } from "@allfitone/react/icons";

import { LanguageSwitch } from "@/components/language-switch";
import { PrivacyContents } from "@/components/privacy-contents";
import {
  analyticsNoticeEffectiveDate,
  analyticsPrivacyContent,
  isLanguage,
  languages,
  ogLocales,
  type Language,
} from "@/lib/content";
import { languageAlternates, localizedPath, shareImage, siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/privacy/analytics";

const dateLocales: Record<Language, string> = { es: "es", en: "en-US" };

/** The effective date written out in the page language: «16 de agosto de 2026», «August 16, 2026». */
function formatNoticeDate(lang: Language): string {
  return new Intl.DateTimeFormat(dateLocales[lang], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${analyticsNoticeEffectiveDate}T00:00:00Z`),
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy/analytics">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = analyticsPrivacyContent[lang];
  const url = localizedPath(lang, PAGE_PATH);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: url, languages: languageAlternates(PAGE_PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      siteName: siteConfig.name,
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: ogLocales[lang],
      alternateLocale: languages.filter((language) => language !== lang).map((language) => ogLocales[language]),
      images: [shareImage(lang)],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [shareImage(lang)],
    },
  };
}

/**
 * The analytics notice, set as a document on the homepage's twelve-column grid: the
 * contents take the first three columns on wide screens and the text the other nine,
 * with five sections in the order the contents list them. Emphasis is spent once, on
 * the title; the sections lean on hierarchy, hairlines and a readable measure rather
 * than display type.
 */
export default async function AnalyticsPrivacyPage({ params }: PageProps<"/[lang]/privacy/analytics">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = analyticsPrivacyContent[lang];
  const homePath = localizedPath(lang);
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Allfit One privacy request")}`;
  // The title is two sentences; each takes its own line so neither breaks mid-thought.
  const titleLines = copy.title.split(/(?<=\.)\s+/);
  const [effectiveBefore, effectiveAfter] = copy.effective.split("{date}");
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: `${siteConfig.url}${homePath}` },
      { "@type": "ListItem", position: 2, name: copy.title, item: `${siteConfig.url}${localizedPath(lang, PAGE_PATH)}` },
    ],
  };

  return (
    <div className="privacy-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }}
      />
      <header className="privacy-header">
        <div className="privacy-shell privacy-header-inner">
          <Link href={homePath} className="privacy-brand" aria-label="Allfit One">
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <LanguageSwitch language={lang} label={copy.selectLanguage} />
        </div>
      </header>

      {/* The homepage's own grid, so the notice spans the same width as every other page. */}
      <main className="site-grid privacy-layout">
        <header className="privacy-intro">
          <h1 className="privacy-title">
            {titleLines.map((line, index) => (
              <span key={line} className="block">
                {index > 0 ? " " : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="privacy-lead">{copy.lead}</p>
          <p className="privacy-effective">
            {effectiveBefore}
            <time dateTime={analyticsNoticeEffectiveDate}>{formatNoticeDate(lang)}</time>
            {effectiveAfter}
          </p>
        </header>

        <PrivacyContents label={copy.navigation} entries={copy.sections} />

        <div className="privacy-document">
          <section id="purpose" className="privacy-section" aria-labelledby="purpose-title">
            <h2 id="purpose-title">{copy.purposeTitle}</h2>
            <p className="privacy-text">{copy.purposeBody}</p>
          </section>

          <section id="data-boundary" className="privacy-section" aria-labelledby="data-boundary-title">
            <h2 id="data-boundary-title">{copy.boundaryTitle}</h2>
            <p className="privacy-text">{copy.boundaryLead}</p>
            <div className="privacy-boundary">
              <div className="privacy-boundary-column" data-kind="allowed">
                <h3 className="privacy-boundary-title">{copy.allowedTitle}</h3>
                <ul className="privacy-boundary-list">
                  {copy.allowedItems.map((item) => (
                    <li key={item}>
                      <FoundationIcon name="check" size="sm" className="privacy-boundary-icon" decorative />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="privacy-boundary-column" data-kind="prohibited">
                <h3 className="privacy-boundary-title">{copy.prohibitedTitle}</h3>
                <ul className="privacy-boundary-list">
                  {copy.prohibitedItems.map((item) => (
                    <li key={item}>
                      <FoundationIcon name="close" size="sm" className="privacy-boundary-icon" decorative />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="privacy-panel">
              <h3>{copy.pseudonymTitle}</h3>
              <p>{copy.pseudonymBody}</p>
            </div>
          </section>

          <section id="provider" className="privacy-section" aria-labelledby="provider-title">
            <h2 id="provider-title">{copy.providerTitle}</h2>
            <p className="privacy-text">{copy.providerBody}</p>
            <dl className="privacy-facts">
              {copy.providerFacts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="retention" className="privacy-section" aria-labelledby="retention-title">
            <h2 id="retention-title">{copy.retentionTitle}</h2>
            <dl className="privacy-facts">
              {copy.retentionItems.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="privacy-text">{copy.retentionBody}</p>
          </section>

          <section id="control" className="privacy-section" aria-labelledby="control-title">
            <h2 id="control-title">{copy.controlTitle}</h2>
            <ul className="privacy-controls">
              {copy.controlItems.map(([title, body]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
            <div className="privacy-panel">
              <h3>{copy.deletionTitle}</h3>
              <p>{copy.deletionBody}</p>
            </div>
          </section>

          <section id="contact" className="privacy-contact" aria-labelledby="contact-title">
            <h2 id="contact-title">{copy.contact}</h2>
            <a href={contactHref} className="privacy-contact-link">
              {siteConfig.email}
              <FoundationIcon name="forward" size="sm" decorative />
            </a>
          </section>
        </div>
      </main>

      <footer className="privacy-footer">
        <div className="privacy-shell privacy-footer-inner">
          <BrandLockup surface="dark" className="h-7 w-auto" title="Allfit One" />
          <p>{copy.footer}</p>
          <Link href={homePath} className="privacy-home-link">
            {copy.home}
          </Link>
        </div>
      </footer>
    </div>
  );
}
