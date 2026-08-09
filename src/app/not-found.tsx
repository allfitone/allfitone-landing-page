"use client";

import { useEffect } from "react";
import { BrandLockup } from "@allfitone/react/brand";
import { FoundationIcon } from "@allfitone/react/icons";

export default function NotFound() {
  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = "en";

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, []);

  return (
    <main className="relative h-svh overflow-hidden bg-void text-chalk">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        aria-hidden="true"
      />

      <header className="site-grid relative z-10 mt-4 w-[calc(100%-2rem)] items-center py-3.5">
        {/* A plain anchor preserves the project's link-as-button semantics. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="col-span-6 flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bolt focus-visible:ring-offset-4 focus-visible:ring-offset-void lg:col-span-3"
          aria-label="Allfit One home"
        >
          <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
        </a>
        <p className="col-span-6 text-right text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/45 lg:col-span-9">
          Error / 404
        </p>
      </header>

      <section className="relative z-10 mx-auto grid h-[calc(100svh-88px)] w-full max-w-[1500px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="relative z-10 min-w-0 max-w-xl">
          <p className="eyebrow text-bolt">You&apos;ve reached the edge</p>
          <h1 className="mt-5 max-w-[8ch] font-display text-[clamp(4.4rem,10vw,9rem)] font-bold uppercase leading-[0.75] tracking-[-0.055em]">
            Page not found.
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/55 md:text-base">
            The page you&apos;re looking for has moved or doesn&apos;t exist. Return to the starting point and keep moving.
          </p>
          {/* A plain anchor preserves the project's link-as-button semantics. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="group mt-9 inline-flex min-h-14 items-center gap-4 text-xs font-extrabold uppercase tracking-[0.14em] text-white/60 outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-bolt/30 bg-bolt/5 text-bolt transition-colors group-hover:bg-bolt group-hover:text-void group-focus-visible:bg-bolt group-focus-visible:text-void group-focus-visible:ring-2 group-focus-visible:ring-bolt group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-void">
              <FoundationIcon name="back" size="sm" decorative />
            </span>
            <span>Back to home</span>
          </a>
        </div>

        <div className="relative flex min-h-64 min-w-0 items-center justify-center overflow-hidden lg:min-h-[34rem] lg:justify-end" aria-hidden="true">
          <p className="select-none font-display text-[clamp(12rem,40vw,38rem)] font-bold leading-[0.62] tracking-[-0.095em] text-transparent [-webkit-text-stroke:1px_rgba(104,238,244,.28)] lg:text-[clamp(20rem,34vw,38rem)]">
            404
          </p>
        </div>

        <p className="col-span-full border-t border-white/10 pt-5 text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
          All the fitness in one place.
        </p>
      </section>
    </main>
  );
}
