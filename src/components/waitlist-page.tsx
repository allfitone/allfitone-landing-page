import { Fragment } from "react";

import { SubpageFooter, SubpageHeader } from "@/components/subpage-chrome";
import { WaitlistForm } from "@/components/waitlist-form";
import { content, waitlistPageContent, type Language } from "@/lib/content";
import { waitlistOfferTermsId } from "@/lib/waitlist";

/**
 * The waitlist page, where every «Únete a la lista» action leads. The offer is the title;
 * the form sits beside it from 1024px and stays in view while the context scrolls: what
 * joining brings, what Allfit Pro is, and the offer's terms. Below 1024px the form comes
 * right after the lead, so the action is never more than a screen away.
 *
 * The title's words rise once, on load, the page's one moment of motion; everything
 * else stays still. The homepage keeps its own form at the end.
 */
export function WaitlistPage({ language }: { language: Language }) {
  const copy = waitlistPageContent[language];
  const [lead, accent] = copy.title;

  return (
    <div className="subpage waitlist-page">
      <SubpageHeader language={language} />

      <main className="site-grid waitlist-page-layout">
        <header className="waitlist-page-intro">
          <h1 className="waitlist-page-title">
            <TitlePart text={lead} />{" "}
            <TitlePart text={accent} accent />
          </h1>
          <p className="waitlist-page-lead">{copy.lead}</p>
        </header>

        <section id="join" className="waitlist-page-join" aria-labelledby="join-title">
          <div className="waitlist-page-join-inner">
            <h2 id="join-title" className="waitlist-page-join-title">
              {copy.joinTitle}
            </h2>
            <WaitlistForm copy={content[language].waitlist} />
          </div>
        </section>

        <div className="waitlist-page-details">
          <section className="waitlist-page-section" aria-labelledby="what-you-get-title">
            <h2 id="what-you-get-title">{copy.get.title}</h2>
            <Rows rows={copy.get.rows} />
          </section>

          <section className="waitlist-page-section" aria-labelledby="allfit-pro-title">
            <h2 id="allfit-pro-title">{copy.pro.title}</h2>
            <p className="waitlist-page-text">{copy.pro.text}</p>
            <Rows rows={copy.pro.rows} />
          </section>

          <section id={waitlistOfferTermsId} className="waitlist-page-section" aria-labelledby="offer-terms-title">
            <h2 id="offer-terms-title">{copy.terms.title}</h2>
            <ul className="waitlist-page-terms">
              {copy.terms.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SubpageFooter language={language} />
    </div>
  );
}

/** One part of the title. Each word rises out of its own mask, so the title can wrap freely. */
function TitlePart({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className="waitlist-page-title-part" data-accent={accent ? "" : undefined}>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span className="waitlist-page-word">
            <span>{word}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/** Term and value pairs: the condition dimmed on the left, what follows at full strength. */
function Rows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <dl className="waitlist-page-rows">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
