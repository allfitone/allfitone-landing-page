import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLockup } from "@allfitone/react/brand";
import { buttonVariants } from "@allfitone/react/components/button";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { LanguageSwitch } from "@/components/language-switch";
import { ambassadorContent, ambassadorPlans, ambassadorSocials, content, isLanguage, ogLocales, type Language } from "@/lib/content";
import { localizedPath, shareImage, siteConfig } from "@/lib/site-config";

const PAGE_PATH = "/ambassadors/william";
const numberLocales: Record<Language, "es-CO" | "en-US"> = { es: "es-CO", en: "en-US" };

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
export async function generateMetadata({ params }: PageProps<"/[lang]/ambassadors/william">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = ambassadorContent[lang];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: localizedPath(lang, PAGE_PATH) },
    robots: { index: false, follow: false },
    openGraph: {
      type: "profile",
      url: localizedPath(lang, PAGE_PATH),
      siteName: siteConfig.name,
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: ogLocales[lang],
      images: [shareImage(lang)],
    },
  };
}

export default async function WilliamAmbassadorPage({ params }: PageProps<"/[lang]/ambassadors/william">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = ambassadorContent[lang];
  const numberLocale = numberLocales[lang];
  const contactSubject = `Allfit One · ${copy.givenName} ${copy.familyName}`;
  const contactHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(contactSubject)}`;

  return (
    <main className="ambassador-page">
      <header className="ambassador-nav-shell">
        <div className="site-grid ambassador-nav">
          <Link href={localizedPath(lang)} className="col-span-6 ambassador-brand" aria-label={siteConfig.name}>
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </Link>
          <div className="col-span-6 flex justify-end">
            <LanguageSwitch language={lang} label={copy.selectLanguage} />
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
              {copy.role}
            </p>
            <h1 id="ambassador-name" className="ambassador-name">
              <span>{copy.givenName}</span>
              <span className="ambassador-name-outline">{copy.familyName}</span>
            </h1>
            <p className="ambassador-hero-lead">
              {copy.lead}
            </p>
          </div>
        </div>

        <div className="site-grid ambassador-hero-rail">
          <ul className="ambassador-rail col-span-12">
            {copy.heroFacts.map((fact) => (
              <li key={fact}>
                {fact}
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
              {copy.statement}
            </h2>
            {copy.aboutBody.map((paragraph) => (
              <p key={paragraph} className="ambassador-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="site-grid">
          <div className="ambassador-method col-span-12">
            <h3 className="eyebrow ambassador-method-title">
              {copy.methodTitle}
            </h3>
            <ol className="ambassador-method-list">
              {copy.method.map((step, index) => (
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
      </section>

      <section className="ambassador-plans" aria-labelledby="ambassador-plans-title">
        <div className="site-grid ambassador-plans-head">
          <h2 id="ambassador-plans-title" className="section-title text-void col-span-12 lg:col-span-6">
            {copy.plansTitle}
          </h2>
          <p className="section-lead ambassador-plans-lead col-span-12 lg:col-span-4 lg:col-start-9">
            {copy.plansLead}
          </p>
        </div>

        <div className="site-grid">
          <div className="plans-panel col-span-12">
            {ambassadorPlans.map((plan, index) => {
              const planCopy = copy.plans[index];
              const monthly = monthlyPrice(plan);
              const saving = savingPercent(plan);
              const subject = `Allfit One · ${copy.givenName} ${copy.familyName} · ${planCopy.name}`;

              return (
                <article key={plan.months} className={cn("plan", plan.featured && "plan-featured")}>
                  {plan.featured && (
                    <p className="plan-tag">
                      {copy.featuredTag}
                    </p>
                  )}
                  <h3 className="plan-name">
                    {planCopy.name}
                  </h3>
                  <p className="plan-who">
                    {planCopy.who}
                  </p>

                  <p className="plan-price">
                    {formatPesos(plan.price, numberLocale)}
                    <span className="plan-currency">COP</span>
                  </p>
                  <p className="plan-meta">
                    {copy.perMonth.replace("{amount}", formatPesos(monthly, numberLocale))}
                    {saving > 0 && (
                      <span className="plan-saving">
                        {copy.saving.replace("{percent}", String(saving))}
                      </span>
                    )}
                  </p>

                  <p className="plan-cadence">
                    {planCopy.cadence}
                  </p>

                  <div className="plan-includes">
                    <p className="plan-includes-lead">
                      {planCopy.includesLead}
                    </p>
                    <ul>
                      {planCopy.includes.map((item) => (
                        <li key={item}>
                          {item}
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
                    {planCopy.cta}
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
            {copy.contactTitle}
          </h2>
          <div className="ambassador-contact-side col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="ambassador-contact-lead">
              {copy.contactBody}
            </p>
            <a href={contactHref} className={cn(buttonVariants({ size: "lg" }), "ambassador-contact-button")}>
              {copy.contact}
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
              <p className="footer-tagline">{content[lang].tagline}</p>
            </div>

            <div className="footer-nav-grid ambassador-footer-nav">
              <nav className="footer-nav" aria-labelledby="ambassador-footer-site">
                <p id="ambassador-footer-site" className="footer-nav-title">
                  {copy.footerNavTitle}
                </p>
                <div className="footer-link-list">
                  <Link className="footer-link" href={localizedPath(lang)}>
                    {copy.footerHome}
                  </Link>
                  <Link className="footer-link" href={localizedPath(lang, "/privacy/analytics")}>
                    {copy.footerPrivacy}
                  </Link>
                  <a className="footer-link" href={contactHref}>
                    <span>{siteConfig.email}</span>
                    <span className="footer-link-mark" aria-hidden="true">→</span>
                  </a>
                </div>
              </nav>

              <nav className="footer-nav" aria-labelledby="ambassador-footer-social">
                <p id="ambassador-footer-social" className="footer-nav-title">
                  {copy.footerSocialTitle}
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
            <span>{copy.rights}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
