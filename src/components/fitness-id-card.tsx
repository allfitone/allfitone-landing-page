import * as m from "motion/react-m";
import { BrandLogo } from "@allfitone/react/brand";

import type { LocalizedContent } from "@/lib/content";

/**
 * What the card is showing. At `rest` nothing is shared; the other three follow the
 * section's controls: `grant` shares two kinds of data, `revoke` withdraws one of them,
 * and `keep` ends the relationship, so nothing is shared and the card is picked up.
 */
export type FitnessIdStage = "rest" | "grant" | "revoke" | "keep";

/** The rows shared at each stage, by their place in `fitnessIdFields`: training history, then personal records. */
const sharedRows: Record<FitnessIdStage, readonly number[]> = {
  rest: [],
  grant: [1, 2],
  revoke: [1],
  keep: [],
};

/** A switch knob has weight: it overshoots a little and settles. */
const knobSpring = { type: "spring", stiffness: 520, damping: 28 } as const;
/** The card is heavier than a knob, so it lifts slower and settles without a wobble. */
const cardSpring = { type: "spring", stiffness: 220, damping: 24 } as const;
/** How far a knob travels inside its track, in px: the track's width less its padding and the knob. */
const knobTravel = 14;

/*
 * The Fitness ID as one object: its name, what it holds and where it stays. The list
 * answers the problem section's ledger (the kinds of data you leave at your old gym, kept
 * this time), so it carries no label, index or decoration of its own; the cyan foot is
 * the payoff. Each row has the switch the person shares it with: the card acts out the
 * section's three controls instead of entering the page. The switches are part of the
 * illustration, so they are hidden from assistive technology and take no pointer.
 */
export function FitnessIdCard({ copy, stage = "rest" }: { copy: LocalizedContent; stage?: FitnessIdStage }) {
  const shared = sharedRows[stage];
  const lifted = stage === "keep";

  return (
    <m.figure
      className="fid-card"
      data-stage={stage}
      initial={false}
      animate={{ y: lifted ? -12 : 0, rotate: lifted ? -1.5 : 0 }}
      transition={cardSpring}
    >
      <div className="fid-card-head">
        <BrandLogo variant="cyan" className="h-7 w-auto" aria-hidden="true" />
        <p className="fid-card-title">Fitness ID</p>
      </div>

      <ul className="fid-card-list">
        {copy.fitnessIdFields.map((field, index) => {
          const on = shared.includes(index);
          return (
            <li key={field} className="fid-card-row" data-shared={on}>
              <span className="min-w-0">{field}</span>
              <span className="fid-switch" aria-hidden="true">
                <m.span
                  className="fid-switch-knob"
                  initial={false}
                  animate={{ x: on ? knobTravel : 0 }}
                  transition={knobSpring}
                />
              </span>
            </li>
          );
        })}
      </ul>

      <figcaption className="fid-card-foot">{copy.fitnessIdCardFooter}</figcaption>
    </m.figure>
  );
}
