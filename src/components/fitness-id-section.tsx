import { useRef, useState } from "react";

import { FitnessIdCard, fitnessIdControlStages, type FitnessIdStage } from "@/components/fitness-id-card";
import { RevealTitle } from "@/components/reveal-title";
import { useTimedSteps } from "@/components/timed-steps";
import type { LocalizedContent } from "@/lib/content";

/**
 * The Fitness ID section. Its card does not enter the page: it acts out the three
 * controls beside it. Once the card is in view, two rows are shared («Tú concedes»), one
 * is withdrawn («Tú revocas») and, with the relationship over, every row turns on and the
 * card is picked up («Tú te lo llevas»). The control being acted out takes the cyan. With
 * a mouse, pointing at a control shows its stage.
 *
 * Time picks the stage, not the scroll: tied to the scroll the three changes fit in two
 * turns of a mouse wheel, so a reader in a hurry skipped one and nobody had time to read
 * the control it stood for. Motion springs the knobs and the card between stages.
 * Server-rendered HTML and reduced motion get the card at rest, whole and still.
 */

/** The card's stages in order: at rest, then one per control, in the order of `fitnessIdControls`. */
const stages = ["rest", ...fitnessIdControlStages] as const satisfies readonly FitnessIdStage[];

/** Seconds before each stage once the card is in view: a breath, then time to read a control. */
const stageBeats = [0.45, 1.7, 1.7] as const;

export function FitnessIdSection({ copy }: { copy: LocalizedContent }) {
  const card = useRef<HTMLDivElement>(null);
  const played = stages[useTimedSteps(card, stageBeats)];
  const [pointed, setPointed] = useState<FitnessIdStage | null>(null);
  /** Where the pointer was when a control came under it. */
  const entered = useRef({ x: 0, y: 0 });
  const stage = pointed ?? played;

  return (
    <section id="fitness-id" className="fid-section bg-void text-white">
      <div className="site-grid relative z-10">
        <div className="col-span-12 lg:col-span-8">
          <RevealTitle className="section-title">{copy.fitnessIdTitle}</RevealTitle>
        </div>

        <div ref={card} className="col-span-12 mt-16 md:mt-20 lg:col-span-5 lg:mt-24">
          <FitnessIdCard copy={copy} stage={stage} />
        </div>

        <div className="col-span-12 mt-14 lg:col-span-6 lg:col-start-7 lg:mt-24">
          <p className="section-lead text-white/72">{copy.fitnessIdCopy}</p>

          <ul className="fid-controls">
            {copy.fitnessIdControls.map(([title, description], index) => (
              <li
                key={title}
                className="fid-control"
                data-active={stage === stages[index + 1]}
                // Only a mouse that moves previews a stage: touch has no hover to leave, and
                // the list passing under a still cursor is not the reader pointing at it.
                onPointerEnter={(event) => {
                  entered.current = { x: event.clientX, y: event.clientY };
                }}
                onPointerMove={(event) => {
                  if (event.pointerType !== "mouse") return;
                  const { x, y } = entered.current;
                  if (event.clientX !== x || event.clientY !== y) setPointed(stages[index + 1]);
                }}
                onPointerLeave={() => setPointed(null)}
              >
                <h3 className="fid-control-title">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/64">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
