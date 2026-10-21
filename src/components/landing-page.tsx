"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BrandLockup,
  BrandLogo,
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
import { FoundationIcon, type IconName } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { FitnessIdCard } from "@/components/fitness-id-card";
import { LanguageSwitch } from "@/components/language-switch";
import { PhoneMockup, StudioDashboardMockup } from "@/components/product-mockups";
import { content, type Language, type LocalizedContent } from "@/lib/content";
import { localizedPath, siteConfig } from "@/lib/site-config";

const CONTACT_HREF = `mailto:${siteConfig.email}`;

const spacePillarIcons = ["training", "people", "permissions"] as const satisfies readonly IconName[];

function ProblemSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="problem" className="bg-panel text-white">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="section-title">{copy.problemTitle}</h2>
          <p className="section-lead mt-8 text-white/70">{copy.problemCopy}</p>
        </div>

        {/* A handover ledger. The empty left column is the argument, and the right
            column deliberately mirrors the Fitness ID card: same
            list, opposite outcome. */}
        <div className="col-span-12 mt-16 md:mt-24">
          <p className="ledger-lead">{copy.problemLedgerLead}</p>
          <div className="ledger">
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
      <BrandLogo variant="cyan" className="fid-section-mark" aria-hidden="true" />
      <div className="site-grid relative z-10">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="section-title">{copy.fitnessIdTitle}</h2>
        </div>

        <div className="col-span-12 mt-16 md:mt-20 lg:col-span-5 lg:mt-24">
          <FitnessIdCard copy={copy} />
        </div>

        <div className="col-span-12 mt-14 lg:col-span-6 lg:col-start-7 lg:mt-24">
          <p className="section-lead text-white/72">{copy.fitnessIdCopy}</p>

          <ul className="fid-controls">
            {copy.fitnessIdControls.map(([title, description], index) => (
              <li key={title} className="fid-control">
                <span className="fid-control-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="fid-control-title">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="fid-note">
            <FoundationIcon name="info" size="sm" className="mt-px shrink-0 text-bolt" decorative />
            <span>{copy.fitnessIdNote}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function SpaceSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="allfit-space" className="bg-chalk text-void">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        <div className="col-span-12 md:col-span-3">
          <div className="product-section-wordmark">
            <ProductWordmark product="space" surface="light" title={copy.appSectionLabel} />
          </div>
        </div>
        <div className="col-span-12 mt-10 md:col-span-9 md:mt-0 lg:col-span-8">
          <h2 className="section-title text-void">{copy.appSectionTitle}</h2>
          <p className="section-lead mt-8 text-void/70">{copy.appSectionCopy}</p>
          <a href={CONTACT_HREF} className="inline-link inline-link-on-light mt-6">
            {copy.contact}
            <FoundationIcon name="forward" size="sm" decorative />
          </a>
        </div>

        <div className="col-span-12 mt-20 grid border-y border-void/16 md:mt-28 md:grid-cols-3">
          {copy.appPillars.map(([title, description], index) => (
            <article
              key={title}
              className="border-b border-void/16 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <FoundationIcon name={spacePillarIcons[index]} size="md" className="text-turquoise-dark" decorative />
              <h3 className="mt-8 font-display text-3xl font-semibold uppercase leading-none tracking-[-.035em] lg:text-4xl">{title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-6 text-void/70">{description}</p>
            </article>
          ))}
        </div>

        <div className="col-span-12 mt-20 overflow-hidden rounded-2xl bg-void px-6 py-8 text-white md:mt-28 md:px-10 md:py-10">
          <div className="flex flex-col gap-3 border-b border-white/14 pb-7 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display text-3xl font-semibold uppercase tracking-[-.03em] md:text-4xl">{copy.appAreasLabel}</h3>
            <p className="eyebrow text-bolt">{copy.appVision}</p>
          </div>
          <div className="grid md:grid-cols-5">
            {copy.appAreas.map(([area, description]) => (
              <div
                key={area}
                className="border-b border-white/12 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="font-display text-2xl font-semibold uppercase">{area}</p>
                <p className="mt-2 text-xs leading-5 text-white/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="allfit-studio" className="relative overflow-hidden bg-panel text-white">
      <span id="allfit-os" className="legacy-section-anchor" aria-hidden="true" />
      <ProductWordmark product="studio" surface="dark" className="studio-section-mark" aria-hidden="true" />
      <div className="site-grid relative z-10 py-24 md:py-32 lg:py-40">
        <div className="col-span-12 md:col-span-3">
          <div className="product-section-wordmark product-section-wordmark-dark">
            <ProductWordmark product="studio" surface="dark" title={copy.studioSectionLabel} />
          </div>
        </div>
        <div className="col-span-12 mt-10 md:col-span-9 md:mt-0 lg:col-span-8">
          <h2 className="section-title">{copy.studioSectionTitle}</h2>
          <p className="section-lead mt-8 text-white/70">{copy.studioSectionCopy}</p>
          <a href={CONTACT_HREF} className="inline-link mt-6">
            {copy.contact}
            <FoundationIcon name="forward" size="sm" decorative />
          </a>
        </div>

        <div className="col-span-12 mt-20 md:mt-28">
          <p className="eyebrow text-white/70">{copy.studioDifferentiatorsLabel}</p>
          <div className="studio-difference-grid">
            {copy.studioDifferentiators.map(([title, description], index) => (
              <article key={title} className="studio-difference">
                <span className="studio-difference-index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="studio-difference-title">{title}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/64">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-20 md:mt-24">
          <p className="eyebrow text-white/70">{copy.studioModulesLabel}</p>
          <div className="studio-module-grid">
            {copy.studioModules.map(([module, description]) => (
              <article key={module} className="studio-module">
                <h3 className="font-display text-2xl font-semibold uppercase leading-none tracking-[-.03em]">{module}</h3>
                <p className="mt-2 text-xs leading-5 text-white/64">{description}</p>
              </article>
            ))}
          </div>

          <div className="studio-upcoming">
            <p className="eyebrow shrink-0 text-white/60">{copy.studioUpcomingLabel}</p>
            <p className="text-sm leading-6 text-white/56">{copy.studioUpcoming.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcosystemSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="ecosystem" className="bg-bolt text-void">
      <div className="site-grid py-24 md:py-32">
        <div className="col-span-12 md:col-span-8 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,.85fr)] lg:items-end lg:gap-12">
          <h2 className="section-title text-void">{copy.ecosystemTitle}</h2>
          <div className="mt-8 lg:mt-0">
            <p className="section-lead text-void/72">{copy.ecosystemCopy}</p>
            <div className="ecosystem-relation">
              <div className="ecosystem-relation-flow">
                <span className="ecosystem-relation-node">{copy.ecosystem.relation[0]}</span>
                <span className="ecosystem-relation-link" aria-hidden="true" />
                <span className="ecosystem-relation-node">{copy.ecosystem.relation[1]}</span>
                <span className="ecosystem-relation-link" aria-hidden="true" />
                <span className="ecosystem-relation-node">{copy.ecosystem.relation[2]}</span>
              </div>
              <p className="ecosystem-relation-shared">{copy.ecosystem.relationShared}</p>
            </div>
          </div>
        </div>

        <div className="ecosystem-panel col-span-12 mt-16 md:mt-20">
          <div className="ecosystem-grid">
            <article className="ecosystem-product">
              <p className="ecosystem-product-head">
                <span className="ecosystem-product-index">{copy.ecosystem.space.index}</span>
                <span className="ecosystem-product-rule" aria-hidden="true" />
                <span className="ecosystem-product-label">{copy.appSectionLabel}</span>
              </p>
              <h3 className="ecosystem-product-title">{copy.ecosystem.space.title}</h3>
              <p className="ecosystem-product-copy">{copy.ecosystem.space.copy}</p>
              <p className="ecosystem-tags">{copy.ecosystem.space.tags.join(" · ")}</p>
            </article>

            <div className="ecosystem-connect">
              <span className="ecosystem-node" aria-hidden="true">
                <svg className="ecosystem-node-svg" viewBox="0 0 260 64" fill="none">
                  <line x1="26" y1="32" x2="104" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
                  <line x1="156" y1="32" x2="234" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
                  <circle cx="26" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="26" cy="32" r="3.5" fill="currentColor" />
                  <circle cx="234" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="234" cy="32" r="3.5" fill="currentColor" />
                  <circle cx="130" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="130" cy="32" r="13" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="130" cy="32" r="5.5" fill="currentColor" />
                </svg>
              </span>
              <p className="ecosystem-connect-title">{copy.ecosystem.connect.title}</p>
              <p className="ecosystem-connect-tags">{copy.ecosystem.connect.tags.join(" · ")}</p>
            </div>

            <article className="ecosystem-product ecosystem-product-studio">
              <p className="ecosystem-product-head">
                <span className="ecosystem-product-index">{copy.ecosystem.studio.index}</span>
                <span className="ecosystem-product-rule" aria-hidden="true" />
                <span className="ecosystem-product-label">{copy.studioSectionLabel}</span>
              </p>
              <h3 className="ecosystem-product-title">{copy.ecosystem.studio.title}</h3>
              <p className="ecosystem-product-copy">{copy.ecosystem.studio.copy}</p>
              <p className="ecosystem-tags">{copy.ecosystem.studio.tags.join(" · ")}</p>
            </article>
          </div>

          <p className="ecosystem-statement">
            <span className="ecosystem-statement-line">{copy.ecosystem.closingLead}</span>
            <span className="ecosystem-statement-line">
              <span className="ecosystem-statement-accent">{copy.ecosystem.closingAccent}</span> {copy.ecosystem.closingRest}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function StatusSection({ copy }: { copy: LocalizedContent }) {
  return (
    <section id="status" className="bg-void text-white">
      <div className="site-grid py-24 md:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="section-title">{copy.statusTitle}</h2>
          <p className="section-lead mt-8 text-white/70">{copy.statusCopy}</p>
        </div>

        <div className="col-span-12 mt-16 border-t border-white/14 md:mt-24">
          {copy.statusRows.map(([name, state, description]) => (
            <article key={name} className="status-row">
              <h3 className="status-row-name">{name}</h3>
              <p className="status-row-state">
                <span className="status-dot" aria-hidden="true" />
                {state}
              </p>
              <p className="status-row-description">{description}</p>
            </article>
          ))}
        </div>

        <div className="col-span-12 mt-16 md:mt-24 lg:col-span-8">
          <p className="section-lead text-white/80">{copy.closingPrompt}</p>
          <a href={CONTACT_HREF} className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full sm:w-auto")}>
            {copy.contact}
            <FoundationIcon name="forward" data-icon="inline-end" decorative />
          </a>
        </div>

      </div>
    </section>
  );
}

export function LandingPage({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = content[language];

  const closeMenu = () => setMenuOpen(false);

  const primaryLinks = [
    ["#fitness-id", copy.navFitnessId, copy.fitnessIdLabel],
    ["#allfit-space", copy.navSpace, copy.appAudience],
    ["#allfit-studio", copy.navStudio, copy.studioAudience],
    ["#ecosystem", copy.navEcosystem, copy.ecosystemLabel],
  ] as const;

  return (
    <main className="min-h-screen overflow-x-clip bg-void text-white">
      <section id="home" className="hero relative overflow-hidden">
        <nav
          className="site-grid fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 items-center rounded-2xl bg-void/86 py-3.5 shadow-[0_18px_55px_rgba(3,7,19,.24)] backdrop-blur-xl"
          aria-label={copy.mainNavigation}
        >
          <a href="#home" className="col-span-6 flex min-h-11 items-center lg:col-span-3" aria-label={copy.homeLink}>
            <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
          </a>

          <div className="col-span-6 hidden justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 lg:flex">
            {primaryLinks.map(([href, label]) => (
              <a key={href} href={href} className="nav-link inline-flex min-h-11 items-center">{label}</a>
            ))}
          </div>

          <div className="col-span-6 ml-auto flex items-center gap-3 lg:col-span-3 lg:gap-4">
            <div className="hidden min-[400px]:block">
              <LanguageSwitch language={language} label={copy.selectLanguage} />
            </div>
            <a href={CONTACT_HREF} className="ml-auto hidden min-h-11 items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white sm:flex">
              {copy.contactShort}
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
                    <p className="mb-4 text-[9px] font-bold uppercase tracking-[.18em] text-white/60">{copy.tagline}</p>
                    <a href={CONTACT_HREF} onClick={closeMenu} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                      {copy.contact}
                      <FoundationIcon name="forward" data-icon="inline-end" decorative />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <BrandLogo variant="cyan" className="hero-brand-mark" aria-hidden="true" />

        <div className="site-grid relative z-20 pb-24 pt-32 md:pb-28 md:pt-40 lg:pt-36">
          <div className="col-span-12 mt-6 md:mt-8">
            <h1 className="hero-title-new" aria-label={copy.tagline}>
              <span className="block">ALL THE</span>
              <span className="hero-fitness block">FITNESS</span>
              <span className="block text-bolt">IN ONE<span className="hero-place-break"> PLACE.</span></span>
            </h1>
          </div>

          <div className="col-span-12 mt-12 md:mt-14 lg:col-span-7">
            <p className="hero-lead">{copy.heroLead}</p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <a href={CONTACT_HREF} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
                {copy.contact}
                <FoundationIcon name="forward" data-icon="inline-end" decorative />
              </a>
              <p className="max-w-xs text-xs leading-5 text-white/56">{copy.heroNote}</p>
            </div>
          </div>

          <div className="product-stage col-span-12 mt-20 md:mt-28 lg:mt-32">
            <div className="product-stage-visual">
              <div className="app-visual-anchor">
                <PhoneMockup copy={copy} />
              </div>
              <div className="studio-visual-anchor">
                <StudioDashboardMockup copy={copy} />
              </div>
            </div>

            <div className="product-definitions">
              <article className="product-definition product-definition-app">
                <p className="eyebrow text-white/60">{copy.appAudience}</p>
                <h2 className="mt-4" aria-label="Allfit Space">
                  <ProductWordmark product="space" surface="dark" className="product-definition-wordmark" aria-hidden="true" />
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/64">{copy.appDescription}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-bolt" aria-hidden="true" />
                  <span className="eyebrow text-bolt">{copy.comingSoon}</span>
                </div>
              </article>

              <article className="product-definition product-definition-studio">
                <p className="eyebrow text-white/60">{copy.studioAudience}</p>
                <h2 className="mt-4" aria-label="Allfit Studio">
                  <ProductWordmark product="studio" surface="dark" className="product-definition-wordmark" aria-hidden="true" />
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/64">{copy.studioDescription}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-bolt" aria-hidden="true" />
                  <span className="eyebrow text-bolt">{copy.comingSoon}</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection copy={copy} />
      <FitnessIdSection copy={copy} />
      <SpaceSection copy={copy} />
      <StudioSection copy={copy} />
      <EcosystemSection copy={copy} />
      <StatusSection copy={copy} />

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
                  <a className="footer-link" href="#ecosystem">{copy.navEcosystem}</a>
                  <a className="footer-link" href="#status">{copy.statusLabel}</a>
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
                <p className="footer-partner-legal">{copy.nvidiaTrademarks}</p>
              </div>
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
