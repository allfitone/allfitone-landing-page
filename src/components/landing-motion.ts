import { useEffect, type CSSProperties } from "react";

/**
 * The homepage's motion layer, one listener set for the page root marked
 * `[data-landing]`.
 *
 * `[data-reveal]` elements get `is-in` the first time they enter the viewport.
 * A masked title first learns which line each word sits on, so its lines rise
 * one after another, as the Space and Studio titles do. There is no pointer
 * light: it lit the Studio columns, which were removed in November 2026.
 *
 * Reveals only arm once `[data-motion='on']` is set here, so the page
 * reads whole without JavaScript. Whatever is already on screen when they arm
 * stays shown, so arming never blinks out content the reader can see, and
 * reduced motion gets every final state at once.
 *
 * The same motion as the Space and Studio landings, deliberately a copy rather
 * than a shared package: each site owns its motion. Unlike them, this page has
 * no scroll progress bar; it was removed in November 2026 at the owner's request.
 *
 * `language` re-arms the layer: switching languages keeps this page mounted
 * and only replaces the blocks whose keys follow the copy, and those new
 * blocks must be observed too.
 */
export function useLandingMotion(language: string): void {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>("[data-landing]");
    if (!site) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target.matches("[data-reveal='mask']")) lineUp(entry.target);
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    // Read every position before arming, then arm in the same frame.
    const reveals = [...site.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")];
    const onScreen = reveals.map((element) => reduced || element.getBoundingClientRect().top < window.innerHeight);
    reveals.forEach((element, index) => {
      if (onScreen[index]) element.classList.add("is-in");
      else revealer.observe(element);
    });
    site.dataset.motion = "on";

    return () => {
      revealer.disconnect();
      delete site.dataset.motion;
    };
  }, [language]);
}

/** Numbers each word of a masked title by the line it wrapped onto, as `--l`. */
function lineUp(title: Element) {
  const words = [...title.querySelectorAll<HTMLElement>(".reveal-word")];
  const tops = words.map((word) => word.offsetTop);
  let line = 0;
  words.forEach((word, index) => {
    if (index > 0 && tops[index] - tops[index - 1] > 1) line += 1;
    word.style.setProperty("--l", String(line));
  });
}

/** Stagger index for `[data-reveal]` siblings that arrive as one wave. */
export function stagger(index: number) {
  return { "--i": index } as CSSProperties;
}
