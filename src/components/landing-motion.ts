import { useEffect, type CSSProperties } from "react";

/**
 * The homepage's motion layer, one listener set for the page root marked
 * `[data-landing]`.
 *
 * - `[data-reveal]` elements get `is-in` the first time they enter the viewport.
 *   A masked title first learns which line each word sits on, so its lines rise
 *   one after another, as the Space and Studio titles do.
 * - `[data-spotlight]` elements follow the pointer through `--mx` and `--my`.
 * - The scroll progress bar grows with the scroll through `--progress`.
 *
 * Values go to CSS custom properties on the element that uses them, never on the
 * root, so neither the pointer nor the scroll restyles the page or re-renders
 * anything. Reveals only arm once `[data-motion='on']` is set here, so the page
 * reads whole without JavaScript. Whatever is already on screen when they arm
 * stays shown, so arming never blinks out content the reader can see, and
 * reduced motion gets every final state at once.
 *
 * The same motion as the Space and Studio landings, deliberately a copy rather
 * than a shared package: each site owns its motion. Like Studio, the progress
 * bar follows scroll events instead of a scroll timeline, because the visual
 * snapshots wait for finite animations and one tied to the scroll never ends.
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

    const bar = site.querySelector<HTMLElement>(".scroll-progress");
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const travel = document.documentElement.scrollHeight - window.innerHeight;
        const progress = travel > 0 ? Math.min(window.scrollY / travel, 1) : 0;
        bar?.style.setProperty("--progress", progress.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let pointerFrame = 0;
    const onPointer = (event: PointerEvent) => {
      if (reduced || event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      const spot = target?.closest<HTMLElement>("[data-spotlight]");
      if (!spot) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - box.left}px`);
        spot.style.setProperty("--my", `${event.clientY - box.top}px`);
      });
    };
    site.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      revealer.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", onScroll);
      site.removeEventListener("pointermove", onPointer);
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
