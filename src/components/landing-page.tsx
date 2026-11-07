"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BrandLockup,
  ProductWordmark,
} from "@allfitone/react/brand";
import { buttonVariants } from "@allfitone/react/components/button";
import { IconButton } from "@allfitone/react/components/icon-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@allfitone/react/components/sheet";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { FitnessIdCard } from "@/components/fitness-id-card";
import { stagger, useLandingMotion } from "@/components/landing-motion";
import { LanguageSwitch } from "@/components/language-switch";
import { PhoneMockup, SpaceSessionMockup, StudioDashboardMockup, StudioReviewMockup } from "@/components/product-mockups";
import { RevealTitle } from "@/components/reveal-title";
import { WaitlistForm } from "@/components/waitlist-form";
import { content, type Language, type LocalizedContent } from "@/lib/content";
import { localizedPath, productSiteUrl, siteConfig } from "@/lib/site-config";

const CONTACT_HREF = `mailto:${siteConfig.email}`;

/**
 * Every link to a product landing opens it in a new tab, so the visitor keeps their place
 * here. Pair it with the `external` icon and `NewTabHint` so the new tab is announced.
 */
function productSiteLink(product: "space" | "studio", language: Language) {
  return { href: productSiteUrl(product, language), target: "_blank", rel: "noopener noreferrer" } as const;
}

function NewTabHint({ copy }: { copy: LocalizedContent }) {
  return <span className="sr-only"> {copy.opensInNewTab}</span>;
}

function ProblemSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="problem" className="bg-panel text-white">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-8">
          <RevealTitle className="section-title">{copy.problemTitle}</RevealTitle>
          <p className="section-lead mt-8 text-white/70">{copy.problemCopy}</p>
        </div>

        {/* A handover ledger. The empty left column is the argument, and the right
            column deliberately mirrors the Fitness ID card: same
            list, opposite outcome. The title already says when this happens, so the
            ledger needs no introduction of its own. */}
        <div className="col-span-12 mt-16 md:mt-24">
          <div className="ledger" data-reveal>
            <div className="ledger-keep">
              <p className="ledger-label">{copy.problemKeepLabel}</p>
              <p className="ledger-keep-value">{copy.problemKeepValue}</p>
            </div>
            <div className="ledger-lose">
              <p className="ledger-label">{copy.problemLoseLabel}</p>
              <ul className="ledger-list">
                {copy.problemLoseItems.map((item) => (
                  <li key={item} className="ledger-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FitnessIdSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="fitness-id" className="fid-section bg-void text-white">
      <div className="site-grid relative z-10">
        <div className="col-span-12 lg:col-span-8">
          <RevealTitle className="section-title">{copy.fitnessIdTitle}</RevealTitle>
        </div>

        <div className="col-span-12 mt-16 md:mt-20 lg:col-span-5 lg:mt-24">
          <FitnessIdCard copy={copy} />
        </div>

        <div className="col-span-12 mt-14 lg:col-span-6 lg:col-start-7 lg:mt-24">
          <p className="section-lead text-white/72">{copy.fitnessIdCopy}</p>

          <ul className="fid-controls">
            {copy.fitnessIdControls.map(([title, description]) => (
              <li key={title} className="fid-control">
                <h3 className="fid-control-title">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/64">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SpaceSection({ copy, language }: { copy: LocalizedContent; language: Language }) {
  return (
    <section id="allfit-space" className="overflow-hidden bg-chalk text-void">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-7 lg:self-center">
          <div className="product-section-wordmark">
            <ProductWordmark product="space" surface="light" title={copy.appSectionLabel} />
          </div>
          <RevealTitle className="section-title mt-10 text-void md:mt-12">{copy.appSectionTitle}</RevealTitle>
          <p className="section-lead mt-8 text-void/70">{copy.appSectionCopy}</p>
          <a {...productSiteLink("space", language)} className="inline-link inline-link-on-light mt-6">
            {copy.spaceSectionLink}
            <NewTabHint copy={copy} />
            <FoundationIcon name="external" size="sm" decorative />
          </a>
        </div>

        {/* The section's one object is the app itself: the hero's 18:00 session under way,
            the professional's plan and the person's log on one screen. It replaces the row
            of five app areas, which listed what the app will hold instead of showing it. */}
        <div className="col-span-12 mt-16 flex justify-center md:mt-20 lg:col-span-5 lg:mt-0 lg:items-center" data-reveal="stage">
          <div className="space-phone-anchor">
            <SpaceSessionMockup copy={copy} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioSection({ copy, language }: { copy: LocalizedContent; language: Language }) {
  return (
    <section id="allfit-studio" className="relative overflow-hidden bg-panel text-white">
      <span id="allfit-os" className="legacy-section-anchor" aria-hidden="true" />
      <div className="site-grid relative z-10 py-24 md:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-7">
          <div className="product-section-wordmark product-section-wordmark-dark">
            <ProductWordmark product="studio" surface="dark" title={copy.studioSectionLabel} />
          </div>
          <RevealTitle className="section-title mt-10 md:mt-12">{copy.studioSectionTitle}</RevealTitle>
        </div>
        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <p className="section-lead text-white/70">{copy.studioSectionCopy}</p>
          <a {...productSiteLink("studio", language)} className="inline-link mt-6">
            {copy.studioSectionLink}
            <NewTabHint copy={copy} />
            <FoundationIcon name="external" size="sm" decorative />
          </a>
        </div>

        {/* The section's one object is the product: Estudio Norte reviewing the session
            Mariana finished, plan beside log. It replaces the four differentiators and the
            five modules, which listed Studio's features instead of showing them. */}
        <div className="studio-review-anchor col-span-12 mt-16 md:mt-20" data-reveal="card">
          <StudioReviewMockup copy={copy} />
        </div>
      </div>
    </section>
  );
}

function WaitlistSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="waitlist" className="bg-void text-white">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        {/* The hero's action lands here. As in the hero, the lead and the form sit beside
            the title from lg, so the form is in view as soon as the jump ends. */}
        <div className="col-span-12 lg:col-span-6 lg:row-start-1">
          <RevealTitle className="section-title">{copy.statusTitle}</RevealTitle>
        </div>
        <div className="col-span-12 mt-8 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0">
          <p className="section-lead text-white/72">{copy.statusCopy}</p>
          <WaitlistForm copy={copy.waitlist} />

          {/* Email stays possible, but quiet: the waitlist is this section's one action. */}
          <div className="mt-12 flex flex-col gap-2 border-t border-white/14 pt-6">
            <p className="text-sm leading-6 text-white/64">{copy.closingPrompt}</p>
            <a href={CONTACT_HREF} className="inline-link self-start">
              {copy.contact}
              <FoundationIcon name="forward" size="sm" decorative />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = content[language];
  useLandingMotion(language);

  const closeMenu = () => setMenuOpen(false);

  const primaryLinks = [
    ["#fitness-id", copy.navFitnessId, copy.fitnessIdLabel],
    ["#allfit-space", copy.navSpace, copy.appAudience],
    ["#allfit-studio", copy.navStudio, copy.studioAudience],
  ] as const;

  return (
    <main data-landing className="min-h-screen overflow-x-clip bg-void text-white">
      <section id="home" className="hero relative overflow-hidden">
        <nav
          className="site-grid fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 items-center rounded-2xl bg-void/86 py-3.5 shadow-[0_18px_55px_rgba(3,7,19,.24)] backdrop-blur-xl"
          aria-label={copy.mainNavigation}
        >
          <a href="#home" className="col-span-6 flex min-h-11 items-center lg:col-span-3 lg:row-start-1" aria-label={copy.homeLink}>
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </a>

          {/* The links stay centred on the page; the actions take one extra column on the right,
              overlapping the links' area where it is empty, so the waitlist action never wraps
              or spills past the bar at 1024px. */}
          <div className="col-span-6 hidden justify-center gap-6 text-xs font-bold uppercase tracking-[.12em] text-white/64 lg:col-start-4 lg:row-start-1 lg:flex">
            {primaryLinks.map(([href, label]) => (
              <a key={href} href={href} className="nav-link inline-flex min-h-11 items-center">{label}</a>
            ))}
          </div>

          <div className="col-span-6 ml-auto flex items-center gap-3 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:gap-4">
            <div className="hidden min-[400px]:block">
              <LanguageSwitch language={language} label={copy.selectLanguage} />
            </div>
            {/* The navbar's action is the page's conversion: it jumps to the waitlist, like the hero's. */}
            <a href="#waitlist" className="ml-auto hidden min-h-11 items-center gap-2 whitespace-nowrap text-xs font-extrabold uppercase tracking-[.12em] text-white sm:flex">
              {copy.navAction}
              <FoundationIcon name="forward" size="sm" className="text-bolt" decorative />
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={<IconButton aria-label={copy.openMenu} variant="outline" className="ml-auto sm:ml-0 lg:hidden" />}
              >
                <FoundationIcon name="menu" size="sm" decorative />
              </SheetTrigger>
              <SheetContent id="mobile-navigation" side="right" showCloseButton={false} className="site-mobile-sheet lg:hidden">
                <SheetHeader className="sr-only">
                  <SheetTitle>{copy.mainNavigation}</SheetTitle>
                  <SheetDescription>{copy.menuDescription}</SheetDescription>
                </SheetHeader>
                <div className="site-mobile-sheet-bar">
                  <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
                  <div className="ml-auto flex items-center gap-3">
                    <div className="hidden min-[400px]:block">
                      <LanguageSwitch language={language} label={copy.selectLanguage} />
                    </div>
                    <SheetClose render={<IconButton aria-label={copy.closeMenu} variant="outline" />}>
                      <FoundationIcon name="close" size="sm" decorative />
                    </SheetClose>
                  </div>
                </div>
                <div className="site-mobile-sheet-content">
                  <nav className="flex flex-col" aria-label={copy.mobileNavigation}>
                    {primaryLinks.map(([href, label, audience]) => (
                      <a key={href} href={href} onClick={closeMenu} className="mobile-nav-link">
                        <span>{label}</span>
                        <span className="mobile-nav-audience">{audience}</span>
                      </a>
                    ))}
                  </nav>
                  <div className="mt-10">
                    <div className="mb-6 min-[400px]:hidden">
                      <LanguageSwitch language={language} label={copy.selectLanguage} />
                    </div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[.14em] text-white/64">{copy.tagline}</p>
                    <a href="#waitlist" onClick={closeMenu} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                      {copy.heroAction}
                      <FoundationIcon name="forward" data-icon="inline-end" decorative />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <div className="site-grid relative z-20 pb-24 pt-32 md:pb-28 md:pt-40 lg:pt-36">
          {/* From lg the lead and the action sit beside the first two headline lines,
              so the product stage rises into the first viewport. */}
          <div className="col-span-12 mt-6 md:mt-8 lg:col-start-1 lg:row-start-1">
            <h1 className="hero-title-new" lang="en" aria-label={copy.tagline}>
              <span className="hero-line"><span className="block">ALL THE</span></span>
              <span className="hero-line"><span className="hero-fitness block">FITNESS</span></span>
              <span className="hero-line">
                <span className="block text-bolt">IN ONE<span className="hero-place-break"> PLACE.</span></span>
              </span>
            </h1>
          </div>

          <div className="hero-copy col-span-12 mt-12 md:mt-14 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="hero-lead hero-enter">{copy.heroLead}</p>
            <div style={stagger(1)} className="hero-actions hero-enter mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 lg:mt-8">
              <a href="#waitlist" className={cn(buttonVariants({ size: "lg" }), "min-h-14 w-full sm:min-h-11 sm:w-auto")}>
                {copy.heroAction}
                <FoundationIcon name="forward" data-icon="inline-end" decorative />
              </a>
            </div>
          </div>

          <div className="product-stage col-span-12 mt-20 md:mt-28 lg:mt-20">
            <div className="product-stage-visual" data-reveal="stage">
              <div className="app-visual-anchor">
                <PhoneMockup copy={copy} />
              </div>
              <div className="studio-visual-anchor">
                <StudioDashboardMockup copy={copy} />
              </div>
            </div>

            <div className="product-definitions">
              <article className="product-definition product-definition-app">
                <h2 aria-label="Allfit Space">
                  <ProductWordmark product="space" surface="dark" className="product-definition-wordmark" aria-hidden="true" />
                </h2>
                <p className="product-definition-audience">{copy.appAudience}</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/64">{copy.appDescription}</p>
                <a {...productSiteLink("space", language)} className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
                  {copy.spaceLink}
                  <NewTabHint copy={copy} />
                  <FoundationIcon name="external" data-icon="inline-end" decorative />
                </a>
              </article>

              <article className="product-definition product-definition-studio">
                <h2 aria-label="Allfit Studio">
                  <ProductWordmark product="studio" surface="dark" className="product-definition-wordmark" aria-hidden="true" />
                </h2>
                <p className="product-definition-audience">{copy.studioAudience}</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/64">{copy.studioDescription}</p>
                <a {...productSiteLink("studio", language)} className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
                  {copy.studioLink}
                  <NewTabHint copy={copy} />
                  <FoundationIcon name="external" data-icon="inline-end" decorative />
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection copy={copy} />
      <FitnessIdSection copy={copy} />
      <SpaceSection copy={copy} language={language} />
      <StudioSection copy={copy} language={language} />
      <WaitlistSection copy={copy} />

      <footer id="footer" className="site-footer">
        <div className="footer-shell">
          <div className="footer-main">
            <div className="footer-brand">
              <p className="footer-tagline">{copy.tagline}</p>
            </div>

            <div className="footer-nav-grid">
              <nav className="footer-nav" aria-label={copy.footerExplore}>
                <p className="footer-nav-title">{copy.footerExplore}</p>
                <div className="footer-link-list">
                  <a className="footer-link" href="#fitness-id">{copy.navFitnessId}</a>
                  <a className="footer-link" href="#allfit-space">{copy.navSpace}</a>
                  <a className="footer-link" href="#allfit-studio">{copy.navStudio}</a>
                  <a className="footer-link" href="#waitlist">{copy.statusLabel}</a>
                </div>
              </nav>

              <nav className="footer-nav" aria-label={copy.socialNavigation}>
                <p className="footer-nav-title">{copy.footerSocial}</p>
                <div className="footer-link-list">
                  <a className="footer-link" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={copy.instagramLabel}>
                    <span>Instagram</span><span className="footer-link-mark" aria-hidden="true">↗</span>
                  </a>
                  <a className="footer-link" href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label={copy.tiktokLabel}>
                    <span>TikTok</span><span className="footer-link-mark" aria-hidden="true">↗</span>
                  </a>
                  <a className="footer-link" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={copy.linkedinLabel}>
                    <span>LinkedIn</span><span className="footer-link-mark" aria-hidden="true">↗</span>
                  </a>
                </div>
              </nav>

              <nav className="footer-nav" aria-label={copy.footerInformation}>
                <p className="footer-nav-title">{copy.footerInformation}</p>
                <div className="footer-link-list">
                  <Link className="footer-link" href={localizedPath(language, "/privacy/analytics")}>{copy.analyticsPrivacy}</Link>
                  <a className="footer-link" href={CONTACT_HREF}>
                    <span>{siteConfig.email}</span><span className="footer-link-mark" aria-hidden="true">→</span>
                  </a>
                </div>
              </nav>
            </div>

          </div>

          <div className="footer-partner">
            <Image
              className="footer-partner-badge"
              src="/partners/nvidia-inception-program-badge.svg"
              alt={copy.inceptionBadgeAlt}
              width={500}
              height={216}
            />
            <div className="footer-partner-text">
              <p className="footer-partner-copy">{copy.inceptionMember}</p>
              <p className="footer-partner-legal" lang="en">{copy.nvidiaTrademarks}</p>
            </div>
          </div>

          <div className="footer-meta footer-meta-centered">
            <span>© 2026 Allfit One</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
