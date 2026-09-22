import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@allfitone/react/brand";
import { buttonVariants } from "@allfitone/react/components/button";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { PrivacyLanguageToggle } from "@/components/privacy-language-toggle";
import { ambassadorContent, ambassadorPlans, ambassadorSocials, content } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const spanish = ambassadorContent.es;
const english = ambassadorContent.en;

const linkedSocials = ambassadorSocials.filter((social) => social.url);

type Plan = (typeof ambassadorPlans)[number];
const [basePlan] = ambassadorPlans;

const monthlyPrice = (plan: Plan) => Math.round(plan.price / plan.months);
const savingPercent = (plan: Plan) => Math.round((1 - monthlyPrice(plan) / monthlyPrice(basePlan)) * 100);
const formatPesos = (amount: number, locale: "es-CO" | "en-US") => `$${amount.toLocaleString(locale)}`;

/**
 * The page holds sample copy and no approved ambassador program, so it stays out
 * of the index and the sitemap until William's own content replaces the draft.
 */
export const metadata: Metadata = {
  title: spanish.metaTitle,
  description: spanish.metaDescription,
  alternates: { canonical: "/ambassadors/william" },
  robots: { index: false, follow: false },
};

function Localized({ es, en }: { es: string; en: string }) {
  return (
    <>
      <span data-privacy-copy="es" lang="es">{es}</span>
      <span data-privacy-copy="en" lang="en">{en}</span>
    </>
  );
}

export default function WilliamAmbassadorPage() {
  const contactSubject = `Allfit One · ${spanish.givenName} ${spanish.familyName}`;
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(contactSubject)}`;

  return (
    <main className="ambassador-page">
      <header className="ambassador-nav-shell">
        <div className="site-grid ambassador-nav">
          <Link href="/" className="col-span-6 ambassador-brand" aria-label={siteConfig.name}>
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <div className="col-span-6 flex justify-end">
            <PrivacyLanguageToggle />
          </div>
        </div>
      </header>

      <section className="ambassador-hero" aria-labelledby="ambassador-name">
        <figure className="ambassador-hero-figure">
          <Image
            src="/ambassadors/william-vergel-portrait.jpg"
            alt=""
            width={1440}
            height={1800}
            priority
            sizes="(min-width: 1024px) 72vw, 100vw"
          />
        </figure>

        <div className="site-grid ambassador-hero-grid">
          <div className="ambassador-hero-copy col-span-12 lg:col-span-6">
            <p className="eyebrow ambassador-role">
              <Localized es={spanish.role} en={english.role} />
            </p>
            <h1 id="ambassador-name" className="ambassador-name">
              <span>{spanish.givenName}</span>
              <span className="ambassador-name-outline">{spanish.familyName}</span>
            </h1>
            <p className="ambassador-hero-lead">
              <Localized es={spanish.lead} en={english.lead} />
            </p>
          </div>
        </div>

        <div className="site-grid ambassador-hero-rail">
          <ul className="ambassador-rail col-span-12">
            {spanish.heroFacts.map((fact, index) => (
              <li key={fact}>
                <Localized es={fact} en={english.heroFacts[index]} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ambassador-manifesto" aria-labelledby="ambassador-statement">
        <div className="site-grid ambassador-manifesto-grid">
          <figure className="ambassador-standing col-span-12 lg:col-span-5">
            <Image
              src="/ambassadors/william-vergel-standing.jpg"
              alt=""
              width={1351}
              height={1801}
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </figure>

          <div className="ambassador-manifesto-copy col-span-12 lg:col-span-6 lg:col-start-7">
            <h2 id="ambassador-statement" className="ambassador-statement">
              <Localized es={spanish.statement} en={english.statement} />
            </h2>
            {spanish.aboutBody.map((paragraph, index) => (
              <p key={paragraph} className="ambassador-body">
                <Localized es={paragraph} en={english.aboutBody[index]} />
              </p>
            ))}
          </div>
        </div>

        <div className="site-grid">
          <div className="ambassador-method col-span-12">
            <h3 className="eyebrow ambassador-method-title">
              <Localized es={spanish.methodTitle} en={english.methodTitle} />
            </h3>
            <ol className="ambassador-method-list">
              {spanish.method.map((step, index) => (
                <li key={step.title} className="ambassador-method-step">
                  <span className="ambassador-method-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="ambassador-method-name">
                    <Localized es={step.title} en={english.method[index].title} />
                  </h4>
                  <p className="ambassador-method-body">
                    <Localized es={step.body} en={english.method[index].body} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ambassador-plans" aria-labelledby="ambassador-plans-title">
        <div className="site-grid ambassador-plans-head">
          <h2 id="ambassador-plans-title" className="section-title text-void col-span-12 lg:col-span-6">
            <Localized es={spanish.plansTitle} en={english.plansTitle} />
          </h2>
          <p className="section-lead ambassador-plans-lead col-span-12 lg:col-span-4 lg:col-start-9">
            <Localized es={spanish.plansLead} en={english.plansLead} />
          </p>
        </div>

        <div className="site-grid">
          <div className="plans-panel col-span-12">
            {ambassadorPlans.map((plan, index) => {
              const planEs = spanish.plans[index];
              const planEn = english.plans[index];
              const monthly = monthlyPrice(plan);
              const saving = savingPercent(plan);
              const subject = `Allfit One · ${spanish.givenName} ${spanish.familyName} · ${planEs.name}`;

              return (
                <article key={plan.months} className={cn("plan", plan.featured && "plan-featured")}>
                  {plan.featured && (
                    <p className="plan-tag">
                      <Localized es={spanish.featuredTag} en={english.featuredTag} />
                    </p>
                  )}
                  <h3 className="plan-name">
                    <Localized es={planEs.name} en={planEn.name} />
                  </h3>
                  <p className="plan-who">
                    <Localized es={planEs.who} en={planEn.who} />
                  </p>

                  <p className="plan-price">
                    <Localized es={formatPesos(plan.price, "es-CO")} en={formatPesos(plan.price, "en-US")} />
                    <span className="plan-currency">COP</span>
                  </p>
                  <p className="plan-meta">
                    <Localized
                      es={spanish.perMonth.replace("{amount}", formatPesos(monthly, "es-CO"))}
                      en={english.perMonth.replace("{amount}", formatPesos(monthly, "en-US"))}
                    />
                    {saving > 0 && (
                      <span className="plan-saving">
                        <Localized
                          es={spanish.saving.replace("{percent}", String(saving))}
                          en={english.saving.replace("{percent}", String(saving))}
                        />
                      </span>
                    )}
                  </p>

                  <p className="plan-cadence">
                    <Localized es={planEs.cadence} en={planEn.cadence} />
                  </p>

                  <div className="plan-includes">
                    <p className="plan-includes-lead">
                      <Localized es={planEs.includesLead} en={planEn.includesLead} />
                    </p>
                    <ul>
                      {planEs.includes.map((item, itemIndex) => (
                        <li key={item}>
                          <Localized es={item} en={planEn.includes[itemIndex]} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`}
                    className={cn(
                      buttonVariants({ variant: plan.featured ? undefined : "outline", size: "lg" }),
                      "plan-cta",
                    )}
                  >
                    <Localized es={planEs.cta} en={planEn.cta} />
                  </a>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <section className="ambassador-contact" aria-labelledby="ambassador-contact-title">
        <div className="site-grid ambassador-contact-grid">
          <h2 id="ambassador-contact-title" className="ambassador-contact-title col-span-12 lg:col-span-7">
            <Localized es={spanish.contactTitle} en={english.contactTitle} />
          </h2>
          <div className="ambassador-contact-side col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="ambassador-contact-lead">
              <Localized es={spanish.contactBody} en={english.contactBody} />
            </p>
            <a href={contactHref} className={cn(buttonVariants({ size: "lg" }), "ambassador-contact-button")}>
              <Localized es={spanish.contact} en={english.contact} />
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

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-main">
            <div className="footer-brand">
              <p className="footer-tagline">{content.es.tagline}</p>
            </div>

            <div className="footer-nav-grid ambassador-footer-nav">
              <nav className="footer-nav" aria-labelledby="ambassador-footer-site">
                <p id="ambassador-footer-site" className="footer-nav-title">
                  <Localized es={spanish.footerNavTitle} en={english.footerNavTitle} />
                </p>
                <div className="footer-link-list">
                  <Link className="footer-link" href="/">
                    <Localized es={spanish.footerHome} en={english.footerHome} />
                  </Link>
                  <Link className="footer-link" href="/privacy/analytics">
                    <Localized es={spanish.footerPrivacy} en={english.footerPrivacy} />
                  </Link>
                  <a className="footer-link" href={contactHref}>
                    <span>{siteConfig.email}</span>
                    <span className="footer-link-mark" aria-hidden="true">→</span>
                  </a>
                </div>
              </nav>

              <nav className="footer-nav" aria-labelledby="ambassador-footer-social">
                <p id="ambassador-footer-social" className="footer-nav-title">
                  <Localized es={spanish.footerSocialTitle} en={english.footerSocialTitle} />
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
            <span>{spanish.rights}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
