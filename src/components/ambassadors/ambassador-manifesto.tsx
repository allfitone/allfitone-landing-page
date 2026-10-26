import type { CSSProperties } from "react";
import Image from "next/image";

import type { AmbassadorMethodStep, AmbassadorProfile } from "@/lib/ambassadors/schema";
import type { Language } from "@/lib/content";

export function AmbassadorManifesto({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const copy = profile.content[language];
  const { standing } = profile.photos;

  return (
    <section className="ambassador-manifesto" aria-labelledby="ambassador-statement">
      <div className="site-grid ambassador-manifesto-grid">
        <figure className="ambassador-standing col-span-12 lg:col-span-5">
          <Image
            src={standing.src}
            alt={standing.alt[language]}
            width={standing.width}
            height={standing.height}
            sizes="(min-width: 1024px) 38vw, 100vw"
          />
        </figure>

        <div className="ambassador-manifesto-copy col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 id="ambassador-statement" className="ambassador-statement">
            {copy.statement}
          </h2>
          {copy.aboutBody.map((paragraph) => (
            <p key={paragraph} className="ambassador-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {copy.method.length > 0 && <AmbassadorMethod title={copy.methodTitle} steps={copy.method} />}
    </section>
  );
}

/** A real sequence, so the numbered columns are earned. */
export function AmbassadorMethod({ title, steps }: { title: string; steps: AmbassadorMethodStep[] }) {
  return (
    <div className="site-grid">
      <div className="ambassador-method col-span-12">
        <h3 className="eyebrow ambassador-method-title">
          {title}
        </h3>
        <ol className="ambassador-method-list" style={{ "--ambassador-method-count": steps.length } as CSSProperties}>
          {steps.map((step, index) => (
            <li key={step.title} className="ambassador-method-step">
              <span className="ambassador-method-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="ambassador-method-name">
                {step.title}
              </h4>
              <p className="ambassador-method-body">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
