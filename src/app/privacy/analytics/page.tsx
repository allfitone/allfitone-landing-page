import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup, BrandLogoCarrier } from "@allfitone/react/brand";
import { FoundationIcon } from "@allfitone/react/icons";

import { PrivacyLanguageToggle } from "@/components/privacy-language-toggle";
import { analyticsPrivacyContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const spanish = analyticsPrivacyContent.es;
const english = analyticsPrivacyContent.en;

export const metadata: Metadata = {
  title: spanish.metaTitle,
  description: spanish.metaDescription,
  alternates: { canonical: "/privacy/analytics" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/privacy/analytics",
    siteName: siteConfig.name,
    title: spanish.metaTitle,
    description: spanish.metaDescription,
    locale: "es_CO",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: spanish.metaTitle,
    description: spanish.metaDescription,
  },
};

function Localized({ es, en }: { es: string; en: string }) {
  return (
    <>
      <span data-privacy-copy="es" lang="es">{es}</span>
      <span data-privacy-copy="en" lang="en">{en}</span>
    </>
  );
}

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: spanish.title, item: `${siteConfig.url}/privacy/analytics` },
  ],
};

export default function AnalyticsPrivacyPage() {
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Allfit One privacy request")}`;

  return (
    <main className="privacy-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }}
      />
      <header className="privacy-header">
        <div className="privacy-shell privacy-header-inner">
          <Link href="/" className="privacy-brand" aria-label="Allfit One">
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <PrivacyLanguageToggle />
        </div>
      </header>

      <div className="privacy-shell privacy-layout">
        <aside className="privacy-rail" aria-labelledby="privacy-navigation-label">
          <p id="privacy-navigation-label" className="privacy-rail-label">
            <Localized es={spanish.navigation} en={english.navigation} />
          </p>
          <nav>
            <ol className="privacy-nav-list">
              {spanish.sections.map(([href, label], index) => (
                <li key={href}>
                  <a className="privacy-nav-link" href={href}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <Localized es={label} en={english.sections[index][1]} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="privacy-article">
          <section className="privacy-hero" aria-labelledby="privacy-title">
            <p className="privacy-kicker">
              <Localized es={spanish.kicker} en={english.kicker} />
            </p>
            <h1 id="privacy-title" className="privacy-title">
              <Localized es={spanish.title} en={english.title} />
            </h1>
            <p className="privacy-lead">
              <Localized es={spanish.lead} en={english.lead} />
            </p>
            <div className="privacy-version">
              <span><Localized es={spanish.versionLabel} en={english.versionLabel} /></span>
              <strong>{spanish.version}</strong>
            </div>
          </section>

          <section id="purpose" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">01</p>
            <div>
              <h2><Localized es={spanish.purposeTitle} en={english.purposeTitle} /></h2>
              <p className="privacy-body"><Localized es={spanish.purposeBody} en={english.purposeBody} /></p>
            </div>
          </section>

          <section id="data-boundary" className="privacy-section privacy-section-stacked">
            <p className="privacy-section-number" aria-hidden="true">02</p>
            <div>
              <h2><Localized es={spanish.boundaryTitle} en={english.boundaryTitle} /></h2>
              <p className="privacy-body"><Localized es={spanish.boundaryLead} en={english.boundaryLead} /></p>
              <div className="privacy-boundary">
                <div className="privacy-boundary-column privacy-boundary-allowed">
                  <h3><Localized es={spanish.allowedTitle} en={english.allowedTitle} /></h3>
                  <ul>
                    {spanish.allowedItems.map((item, index) => (
                      <li key={item}>
                        <FoundationIcon name="check" size="sm" aria-hidden="true" />
                        <Localized es={item} en={english.allowedItems[index]} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="privacy-boundary-column privacy-boundary-prohibited">
                  <h3><Localized es={spanish.prohibitedTitle} en={english.prohibitedTitle} /></h3>
                  <ul>
                    {spanish.prohibitedItems.map((item, index) => (
                      <li key={item}>
                        <span className="privacy-prohibited-mark" aria-hidden="true">×</span>
                        <Localized es={item} en={english.prohibitedItems[index]} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="privacy-note">
                <p className="privacy-note-label"><Localized es={spanish.pseudonymTitle} en={english.pseudonymTitle} /></p>
                <p><Localized es={spanish.pseudonymBody} en={english.pseudonymBody} /></p>
              </div>
            </div>
          </section>

          <section id="provider" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">03</p>
            <div>
              <h2><Localized es={spanish.providerTitle} en={english.providerTitle} /></h2>
              <p className="privacy-body"><Localized es={spanish.providerBody} en={english.providerBody} /></p>
              <p className="privacy-provider-boundary">
                <span className="privacy-status-dot" aria-hidden="true" />
                <Localized es={spanish.providerBoundary} en={english.providerBoundary} />
              </p>
            </div>
          </section>

          <section id="retention" className="privacy-section">
            <p className="privacy-section-number" aria-hidden="true">04</p>
            <div>
              <h2><Localized es={spanish.retentionTitle} en={english.retentionTitle} /></h2>
              <dl className="privacy-retention">
                {spanish.retentionItems.map(([term, value], index) => (
                  <div key={term}>
                    <dt><Localized es={term} en={english.retentionItems[index][0]} /></dt>
                    <dd><Localized es={value} en={english.retentionItems[index][1]} /></dd>
                  </div>
                ))}
              </dl>
              <p className="privacy-body"><Localized es={spanish.retentionBody} en={english.retentionBody} /></p>
            </div>
          </section>

          <section id="control" className="privacy-section privacy-section-stacked">
            <p className="privacy-section-number" aria-hidden="true">05</p>
            <div>
              <h2><Localized es={spanish.controlTitle} en={english.controlTitle} /></h2>
              <ol className="privacy-control-list">
                {spanish.controlItems.map(([title, body], index) => (
                  <li key={title}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3><Localized es={title} en={english.controlItems[index][0]} /></h3>
                      <p><Localized es={body} en={english.controlItems[index][1]} /></p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="privacy-deletion">
                <h3><Localized es={spanish.deletionTitle} en={english.deletionTitle} /></h3>
                <p><Localized es={spanish.deletionBody} en={english.deletionBody} /></p>
              </div>
            </div>
          </section>

          <section id="contact" className="privacy-contact" aria-labelledby="privacy-contact-title">
            <p className="privacy-kicker">hello@allfit.one</p>
            <h2 id="privacy-contact-title">
              <Localized es={spanish.contact} en={english.contact} />
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
          <BrandLogoCarrier className="h-8 w-auto" title="Allfit One" />
          <p><Localized es={spanish.footer} en={english.footer} /></p>
          <Link href="/" className="privacy-home-link">
            <Localized es={spanish.home} en={english.home} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
