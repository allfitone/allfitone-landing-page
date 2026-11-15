import type { CSSProperties } from "react";
import * as m from "motion/react-m";
import { BrandLogo } from "@allfitone/react/brand";

import type { LocalizedContent } from "@/lib/content";

/**
 * What the card is showing. At `rest` every switch is off; the other three follow the
 * section's controls: `grant` turns on two kinds of data, `revoke` turns one of them
 * off, and `keep` turns every row on, because all of it leaves with the person, and the
 * card is picked up.
 */
export type FitnessIdStage = "rest" | "grant" | "revoke" | "keep";

/** The stage that acts out each control, in the order of `fitnessIdControls`. */
export const fitnessIdControlStages = ["grant", "revoke", "keep"] as const satisfies readonly FitnessIdStage[];

/** The rows turned on at `grant` and `revoke`, by their place in `fitnessIdFields`: training history, then personal records. */
const grantedRows: Partial<Record<FitnessIdStage, readonly number[]>> = {
  grant: [1, 2],
  revoke: [1],
};
/**
 * Seconds between one row turning on and the next. At `grant` the two rows read as two
 * decisions; at `keep` all of them go in one wave, top to bottom.
 */
const rowGap: Partial<Record<FitnessIdStage, number>> = { grant: 0.18, keep: 0.05 };

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
 * the payoff. Each row has a switch, and with them the card acts out the
 * section's three controls instead of entering the page. Its head names the control
 * being acted out, because on a phone the list of controls is still below the fold. The
 * switches and that name are illustration: hidden from assistive technology, no pointer.
 */
export function FitnessIdCard({ copy, stage = "rest" }: { copy: LocalizedContent; stage?: FitnessIdStage }) {
  const lifted = stage === "keep";
  const granted = grantedRows[stage] ?? [];
  const gap = rowGap[stage] ?? 0;

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
        <p className="fid-card-status" aria-hidden="true">
          {copy.fitnessIdControls.map(([title], index) => (
            <span key={title} data-active={stage === fitnessIdControlStages[index]}>
              {title}
            </span>
          ))}
        </p>
      </div>

      <ul className="fid-card-list">
        {copy.fitnessIdFields.map((field, index) => {
          const on = lifted || granted.includes(index);
          // Rows wait their turn among those this stage turns on.
          const delay = (lifted ? index : Math.max(granted.indexOf(index), 0)) * gap;
          return (
            <li key={field} className="fid-card-row" data-on={on} style={{ "--wave": `${delay}s` } as CSSProperties}>
              <span className="min-w-0">{field}</span>
              <span className="fid-switch" aria-hidden="true">
                <m.span
                  className="fid-switch-knob"
                  initial={false}
                  animate={{ x: on ? knobTravel : 0 }}
                  transition={{ ...knobSpring, delay }}
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
