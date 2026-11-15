import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

/**
 * How far an object has acted, as a step count that time drives once the reader has the
 * object in view: 0 at rest, then one more after each of `beats`, in seconds.
 *
 * Use it when every step has to be seen, in order and at one pace. `useScrollSteps` ties
 * the steps to the scroll, so a fast reader skips some and a slow one lingers on others.
 *
 * The count waits while the object is out of view. It returns to 0 once the reader is
 * back above the object, so it plays again on the way down; past the object it stays at
 * its last step. Server-rendered HTML and reduced motion stay at step 0.
 */
export function useTimedSteps(
  target: RefObject<HTMLElement | null>,
  beats: readonly number[],
  /** The share of the object that has to be on screen for it to act. */
  share = 0.6,
): number {
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.intersectionRatio >= share);
        // Off screen and below the viewport: the reader went back above the object.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) setStep(0);
      },
      { threshold: [0, share] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, share]);

  useEffect(() => {
    const beat = beats[step];
    if (!inView || beat === undefined) return;
    const timer = setTimeout(() => setStep(step + 1), beat * 1000);
    return () => clearTimeout(timer);
  }, [inView, step, beats]);

  return reducedMotion ? 0 : step;
}
