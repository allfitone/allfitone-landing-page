import { buttonVariants } from "@allfitone/react/components/button";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { ambassadorContactHref } from "@/lib/ambassadors/contact";
import type { AmbassadorProfile } from "@/lib/ambassadors/schema";
import { ambassadorPageContent, type Language } from "@/lib/content";

/** The final conversion moment, so it takes the large primary action. */
export function AmbassadorContact({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const copy = profile.content[language];
  const linkedSocials = profile.socials.filter((social) => social.url);

  return (
    <section className="ambassador-contact" aria-labelledby="ambassador-contact-title">
      <div className="site-grid ambassador-contact-grid">
        <h2 id="ambassador-contact-title" className="ambassador-contact-title col-span-12 lg:col-span-7">
          {copy.contactTitle}
        </h2>
        <div className="ambassador-contact-side col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="ambassador-contact-lead">
            {copy.contactBody}
          </p>
          <a href={ambassadorContactHref(profile)} className={cn(buttonVariants({ size: "lg" }), "ambassador-contact-button")}>
            {ambassadorPageContent[language].contact}
            <FoundationIcon name="forward" data-icon="inline-end" decorative />
          </a>

          {linkedSocials.length > 0 && (
            <ul className="ambassador-socials">
              {linkedSocials.map((social) => (
                <li key={social.platform}>
                  <a className="inline-link" href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
