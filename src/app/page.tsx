"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BrandLockup,
  BrandLogo,
  BrandLogoCarrier,
  BrandWordmark,
  ProductWordmark,
} from "@allfitone/react/brand";
import { buttonVariants } from "@allfitone/react/components/button";
import { IconButton } from "@allfitone/react/components/icon-button";
import { Separator } from "@allfitone/react/components/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@allfitone/react/components/sheet";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@allfitone/react/components/toggle-group";
import { FoundationIcon, type IconName } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import { FitnessIdCard } from "@/components/fitness-id-card";
import { PhoneMockup, StudioDashboardMockup } from "@/components/product-mockups";
import {
  content,
  readStoredLanguage,
  writeStoredLanguage,
  type Language,
  type LocalizedContent,
} from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const CONTACT_HREF = `mailto:${siteConfig.email}`;

const spacePillarIcons = ["training", "people", "permissions"] as const satisfies readonly IconName[];

function LanguageToggle({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <ToggleGroup
      className="locale-toggle"
      aria-label={content[language].selectLanguage}
      value={[language]}
      onValueChange={(value) => {
        const nextLanguage = value[0];
        if (nextLanguage === "es" || nextLanguage === "en") {
          onLanguageChange(nextLanguage);
        }
      }}
    >
      <ToggleGroupItem className="locale-toggle-item" value="es" aria-label="Español">ES</ToggleGroupItem>
      <ToggleGroupItem className="locale-toggle-item" value="en" aria-label="English">EN</ToggleGroupItem>
    </ToggleGroup>
  );
}

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
          <p className="section-lead mt-8 text-void/72 lg:mt-0">{copy.ecosystemCopy}</p>
        </div>

        <div className="ecosystem-bridge col-span-12 mt-16 md:mt-20">
          {copy.ecosystemRows.map(([person, organization]) => (
            <div key={person} className="ecosystem-bridge-row">
              <p className="ecosystem-bridge-person">{person}</p>
              <span className="ecosystem-bridge-node" aria-hidden="true">
                <FoundationIcon name="forward" size="sm" decorative />
              </span>
              <p className="ecosystem-bridge-organization">{organization}</p>
            </div>
          ))}
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

      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = content[language];

  useEffect(() => {
    const savedLanguage = readStoredLanguage();
    const timer = window.setTimeout(() => {
      if (savedLanguage !== language) setLanguage(savedLanguage);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    writeStoredLanguage(nextLanguage);
  };

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
              <LanguageToggle language={language} onLanguageChange={changeLanguage} />
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
                      <LanguageToggle language={language} onLanguageChange={changeLanguage} />
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
                      <LanguageToggle language={language} onLanguageChange={changeLanguage} />
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

      <footer id="footer" className="bg-void px-5 pb-7 pt-10 text-white md:px-8 md:pt-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center justify-between gap-6 md:items-end">
            <div className="flex items-center">
              <BrandLogoCarrier className="h-9 w-auto" title="Allfit One" />
            </div>
            <nav className="flex w-fit items-center gap-0 text-white/55" aria-label={copy.socialNavigation}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none"
                aria-label={copy.instagramLabel}
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none"
                aria-label={copy.tiktokLabel}
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.4 2.5h2.8a4.8 4.8 0 0 0 4.3 4.3v2.8a7.5 7.5 0 0 1-4.3-1.4v7.1a6.2 6.2 0 1 1-5.4-6.1v2.9a3.4 3.4 0 1 0 2.6 3.2V2.5Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none"
                aria-label={copy.linkedinLabel}
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.7 8.3H3.4V21h3.3V8.3ZM5.05 3A2.05 2.05 0 1 0 5 7.1 2.05 2.05 0 0 0 5.05 3ZM21 13.72c0-3.83-2.04-5.61-4.77-5.61a4.12 4.12 0 0 0-3.75 2.06V8.3H9.15V21h3.33v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.28Z" />
                </svg>
              </a>
            </nav>
          </div>

          <BrandWordmark surface="dark" className="mx-auto mt-20 h-auto w-full max-w-[1160px]" aria-hidden="true" />
          <Separator className="mt-10 bg-white/12" />
          <div className="mt-5 grid gap-4 text-[9px] font-bold uppercase tracking-[.16em] text-white/60 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <span>© 2026 Allfit One</span>
            <div className="flex flex-col items-start sm:items-center">
              <p className="flex min-h-11 items-center text-[10px] font-medium uppercase tracking-[.12em] text-white/64">{copy.tagline}</p>
              <Link className="flex min-h-11 items-center text-bolt transition-colors hover:text-white" href="/privacy/analytics">
                {copy.analyticsPrivacy}
              </Link>
            </div>
            <span className="sm:justify-self-end sm:self-start sm:pt-4">{copy.built}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
