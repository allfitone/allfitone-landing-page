import { useState, type RefObject } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/** An edge of the object or of the viewport: a named one, or a share of its height from 0 to 1. */
type Edge = "start" | "center" | "end" | `${number}`;
/** Where an edge of the object meets an edge of the viewport, as Motion's `useScroll` reads it. */
type Meeting = `${Edge} ${Edge}`;
/** A scroll window: where progress is 0, then where it is 1. */
export type ScrollWindow = readonly [start: Meeting, end: Meeting];

/**
 * How far an object has acted, as a step count the reader's scroll drives: 0 at rest,
 * then one more each time the progress through `window` passes the next of `starts`.
 * Scrolling back lowers it, so every object plays in reverse.
 *
 * Objects act instead of entering: the step picks a state and Motion springs between
 * states. Server-rendered HTML and reduced motion stay at step 0, the object at rest.
 */
export function useScrollSteps(
  target: RefObject<HTMLElement | null>,
  window: ScrollWindow,
  starts: readonly number[],
): number {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target, offset: [...window] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setStep(starts.filter((start) => progress >= start).length);
  });
  return reducedMotion ? 0 : step;
}
