import { useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";
import * as m from "motion/react-m";

/**
 * The hero's outlined «FITNESS». It does not enter twice: it acts. The word is hollow at
 * the top of the page and fills from the bottom up as the reader starts to scroll, the
 * way a level rises, and empties again on the way back.
 *
 * The fill is a gradient clipped to the letters whose edge is `--fill`, so nothing is
 * drawn twice and no layout moves. Static HTML, reduced motion and forced colours keep
 * the word as it is at the top: hollow.
 */

/** How far the reader scrolls, in CSS px, for the word to fill: while it is still in view on a phone. */
const fillDistance = 160;

/** The level follows the scroll with a little weight, so a wheel notch does not snap it. */
const fillSpring = { stiffness: 120, damping: 24, restDelta: 0.0005 } as const;

export function HeroFitness() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const followed = useSpring(scrollY, fillSpring);
  const rising = useTransform(followed, [0, fillDistance], ["0%", "100%"]);
  const hollow = useTransform(followed, () => "0%");

  // Motion animates custom properties, but its style type does not list them.
  const level = { "--fill": reducedMotion ? hollow : rising } as MotionStyle;

  return (
    <m.span className="hero-fitness block" style={level}>
      FITNESS
    </m.span>
  );
}
