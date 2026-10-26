import Link from "next/link";
import { BrandLockup } from "@allfitone/react/brand";

import { AmbassadorContact } from "@/components/ambassadors/ambassador-contact";
import { AmbassadorHero } from "@/components/ambassadors/ambassador-hero";
import { AmbassadorManifesto } from "@/components/ambassadors/ambassador-manifesto";
import { AmbassadorPlans } from "@/components/ambassadors/ambassador-plans";
import { LanguageSwitch } from "@/components/language-switch";
import { ambassadorContactHref } from "@/lib/ambassadors/contact";
import type { AmbassadorProfile } from "@/lib/ambassadors/schema";
import { ambassadorPageContent, content, type Language } from "@/lib/content";
import { localizedPath, siteConfig } from "@/lib/site-config";

/**
 * The one template every ambassador page renders: nav, hero, manifesto and method,
 * plans, contact, and footer. Profiles supply data only; sections without content
 * are left out instead of rendering empty.
 */
export function AmbassadorLanding({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const ui = ambassadorPageContent[language];

  return (
    <main className="ambassador-page">
      <header className="ambassador-nav-shell">
        <div className="site-grid ambassador-nav">
          <Link href={localizedPath(language)} className="col-span-6 ambassador-brand" aria-label={siteConfig.name}>
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <div className="col-span-6 flex justify-end">
            <LanguageSwitch language={language} label={ui.selectLanguage} />
          </div>
        </div>
      </header>

      <AmbassadorHero profile={profile} language={language} />
      <AmbassadorManifesto profile={profile} language={language} />
      {profile.plans.length > 0 && <AmbassadorPlans profile={profile} language={language} />}
      <AmbassadorContact profile={profile} language={language} />
      <AmbassadorFooter profile={profile} language={language} />
    </main>
  );
}

function AmbassadorFooter({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const ui = ambassadorPageContent[language];

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <p className="footer-tagline">{content[language].tagline}</p>
          </div>

          <div className="footer-nav-grid ambassador-footer-nav">
            <nav className="footer-nav" aria-labelledby="ambassador-footer-site">
              <p id="ambassador-footer-site" className="footer-nav-title">
                {ui.footerNavTitle}
              </p>
              <div className="footer-link-list">
                <Link className="footer-link" href={localizedPath(language)}>
                  {ui.footerHome}
                </Link>
                <Link className="footer-link" href={localizedPath(language, "/privacy/analytics")}>
                  {ui.footerPrivacy}
                </Link>
                <a className="footer-link" href={ambassadorContactHref(profile)}>
                  <span>{siteConfig.email}</span>
                  <span className="footer-link-mark" aria-hidden="true">→</span>
                </a>
              </div>
            </nav>

            <nav className="footer-nav" aria-labelledby="ambassador-footer-social">
              <p id="ambassador-footer-social" className="footer-nav-title">
                {ui.footerSocialTitle}
              </p>
              <div className="footer-link-list">
                <a className="footer-link" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                  <span>Instagram</span>
                  <span className="footer-link-mark" aria-hidden="true">↗</span>
                </a>
                <a className="footer-link" href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer">
                  <span>TikTok</span>
                  <span className="footer-link-mark" aria-hidden="true">↗</span>
                </a>
                <a className="footer-link" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                  <span className="footer-link-mark" aria-hidden="true">↗</span>
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="footer-meta">
          <span>{ui.rights}</span>
        </div>
      </div>
    </footer>
  );
}
