import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoundationIcon } from "@allfitone/react/icons";

import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { isLanguage } from "@/lib/content";
import { analyticsNotice } from "@/lib/legal/analytics";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal/analytics">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return legalMetadata(lang, "analytics", analyticsNotice[lang]);
}

/**
 * The analytics notice. Unlike the terms and the privacy policy it is not plain prose:
 * the data boundary reads as a two-column table, provider and retention as term-value
 * facts, and the controls as a list of situations.
 */
export default async function AnalyticsNoticePage({ params }: PageProps<"/[lang]/legal/analytics">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = analyticsNotice[lang];

  return (
    <LegalPage
      language={lang}
      slug="analytics"
      title={copy.title}
      lead={copy.lead}
      contents={copy.sections}
      contact={copy.contact}
    >
      <section id="purpose" className="legal-section" aria-labelledby="purpose-title">
        <h2 id="purpose-title">{copy.purposeTitle}</h2>
        <p className="legal-text">{copy.purposeBody}</p>
      </section>

      <section id="data-boundary" className="legal-section" aria-labelledby="data-boundary-title">
        <h2 id="data-boundary-title">{copy.boundaryTitle}</h2>
        <p className="legal-text">{copy.boundaryLead}</p>
        <div className="legal-boundary">
          <div className="legal-boundary-column" data-kind="allowed">
            <h3 className="legal-boundary-title">{copy.allowedTitle}</h3>
            <ul className="legal-boundary-list">
              {copy.allowedItems.map((item) => (
                <li key={item}>
                  <FoundationIcon name="check" size="sm" className="legal-boundary-icon" decorative />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="legal-boundary-column" data-kind="prohibited">
            <h3 className="legal-boundary-title">{copy.prohibitedTitle}</h3>
            <ul className="legal-boundary-list">
              {copy.prohibitedItems.map((item) => (
                <li key={item}>
                  <FoundationIcon name="close" size="sm" className="legal-boundary-icon" decorative />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="legal-panel">
          <h3>{copy.pseudonymTitle}</h3>
          <p>{copy.pseudonymBody}</p>
        </div>
      </section>

      <section id="provider" className="legal-section" aria-labelledby="provider-title">
        <h2 id="provider-title">{copy.providerTitle}</h2>
        <p className="legal-text">{copy.providerBody}</p>
        <dl className="legal-facts">
          {copy.providerFacts.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="retention" className="legal-section" aria-labelledby="retention-title">
        <h2 id="retention-title">{copy.retentionTitle}</h2>
        <dl className="legal-facts">
          {copy.retentionItems.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="legal-text">{copy.retentionBody}</p>
      </section>

      <section id="control" className="legal-section" aria-labelledby="control-title">
        <h2 id="control-title">{copy.controlTitle}</h2>
        <ul className="legal-controls">
          {copy.controlItems.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        <div className="legal-panel">
          <h3>{copy.deletionTitle}</h3>
          <p>{copy.deletionBody}</p>
        </div>
      </section>
    </LegalPage>
  );
}
