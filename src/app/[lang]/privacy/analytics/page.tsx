import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLockup } from "@allfitone/react/brand";
import { FoundationIcon } from "@allfitone/react/icons";

import { LanguageSwitch } from "@/components/language-switch";
import { analyticsPrivacyContent, isLanguage, languages, ogLocales } from "@/lib/content";
import { languageAlternates, localizedPath, shareImage, siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/privacy/analytics";

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

export default async function AnalyticsPrivacyPage({ params }: PageProps<"/[lang]/privacy/analytics">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = analyticsPrivacyContent[lang];
  const homePath = localizedPath(lang);
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Allfit One privacy request")}`;
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: `${siteConfig.url}${homePath}` },
      { "@type": "ListItem", position: 2, name: copy.title, item: `${siteConfig.url}${localizedPath(lang, PAGE_PATH)}` },
    ],
  };

  return (
    <main className="privacy-page">
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

      <div className="privacy-shell privacy-layout">
        <aside className="privacy-rail" aria-labelledby="privacy-navigation-label">
          <p id="privacy-navigation-label" className="privacy-rail-label">
            {copy.navigation}
          </p>
          <nav>
            <ol className="privacy-nav-list">
              {copy.sections.map(([href, label], index) => (
                <li key={href}>
                  <a className="privacy-nav-link" href={href}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="privacy-article">
          <section className="privacy-hero" aria-labelledby="privacy-title">
            <p className="privacy-kicker">
              {copy.kicker}
            </p>
            <h1 id="privacy-title" className="privacy-title">
              {copy.title}
            </h1>
            <p className="privacy-lead">
              {copy.lead}
            </p>
            <div className="privacy-version">
              <span>{copy.versionLabel}</span>
              <strong>{copy.version}</strong>
            </div>
          </section>

          <section id="purpose" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">01</p>
            <div>
              <h2>{copy.purposeTitle}</h2>
              <p className="privacy-body">{copy.purposeBody}</p>
            </div>
          </section>

          <section id="data-boundary" className="privacy-section privacy-section-stacked">
            <p className="privacy-section-number" aria-hidden="true">02</p>
            <div>
              <h2>{copy.boundaryTitle}</h2>
              <p className="privacy-body">{copy.boundaryLead}</p>
              <div className="privacy-boundary">
                <div className="privacy-boundary-column privacy-boundary-allowed">
                  <h3>{copy.allowedTitle}</h3>
                  <ul>
                    {copy.allowedItems.map((item) => (
                      <li key={item}>
                        <FoundationIcon name="check" size="sm" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="privacy-boundary-column privacy-boundary-prohibited">
                  <h3>{copy.prohibitedTitle}</h3>
                  <ul>
                    {copy.prohibitedItems.map((item) => (
                      <li key={item}>
                        <span className="privacy-prohibited-mark" aria-hidden="true">×</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="privacy-note">
                <p className="privacy-note-label">{copy.pseudonymTitle}</p>
                <p>{copy.pseudonymBody}</p>
              </div>
            </div>
          </section>

          <section id="provider" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">03</p>
            <div>
              <h2>{copy.providerTitle}</h2>
              <p className="privacy-body">{copy.providerBody}</p>
              <p className="privacy-provider-boundary">
                <span className="privacy-status-dot" aria-hidden="true" />
                {copy.providerBoundary}
              </p>
            </div>
          </section>

          <section id="retention" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">04</p>
            <div>
              <h2>{copy.retentionTitle}</h2>
              <dl className="privacy-retention">
                {copy.retentionItems.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="privacy-body">{copy.retentionBody}</p>
            </div>
          </section>

          <section id="control" className="privacy-section privacy-section-stacked">
            <p className="privacy-section-number" aria-hidden="true">05</p>
            <div>
              <h2>{copy.controlTitle}</h2>
              <ol className="privacy-control-list">
                {copy.controlItems.map(([title, body], index) => (
                  <li key={title}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="privacy-deletion">
                <h3>{copy.deletionTitle}</h3>
                <p>{copy.deletionBody}</p>
              </div>
            </div>
          </section>

          <section id="contact" className="privacy-contact" aria-labelledby="privacy-contact-title">
            <p className="privacy-kicker">hello@allfit.one</p>
            <h2 id="privacy-contact-title">
              {copy.contact}
            </h2>
            <a href={contactHref} className="privacy-contact-link">
              {siteConfig.email}
              <FoundationIcon name="external" size="sm" aria-hidden="true" />
            </a>
          </section>
        </article>
      </div>

      <footer className="privacy-footer">
        <div className="privacy-shell privacy-footer-inner">
          <BrandLockup surface="dark" className="h-8 w-auto" title="Allfit One" />
          <p>{copy.footer}</p>
          <Link href={homePath} className="privacy-home-link">
            {copy.home}
          </Link>
        </div>
      </footer>
    </main>
  );
}
