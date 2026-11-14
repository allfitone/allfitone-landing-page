import { useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * The hero's outlined «FITNESS». It does not enter twice: it acts. The word is hollow at
 * the top of the page; once the reader starts to scroll a level rises inside the letters
 * until the word is solid, and it drains when they are back at the top.
 *
 * The level is a second, solid copy of the word behind a mask. The mask slides up and the
 * copy slides down by the same amount, so the letters stay put while the window on them
 * rises: two transforms, which the browser animates without painting the text again.
 * It runs on time, not on the scroll position. The word has about 100px of scroll before
 * it reaches the navbar, too short a stretch to follow by hand without stutter.
 *
 * The copy is drawn from `data-text`, so the heading holds the word once. Static HTML,
 * reduced motion and forced colours keep the word hollow.
 */

/** Past this many px of scroll the reader has left the top of the page. */
const leftTheTop = 12;

export function HeroFitness() {
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > leftTheTop));
  const filled = scrolled && !reducedMotion;

  return (
    <span className="hero-fitness block" data-filled={filled ? "true" : undefined}>
      FITNESS
      <span className="hero-fitness-level" aria-hidden="true">
        <span data-text="FITNESS" />
      </span>
    </span>
  );
}
