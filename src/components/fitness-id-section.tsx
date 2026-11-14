import { useRef, useState, type RefObject } from "react";
import { LazyMotion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { FitnessIdCard, type FitnessIdStage } from "@/components/fitness-id-card";
import { RevealTitle } from "@/components/reveal-title";
import type { LocalizedContent } from "@/lib/content";

/**
 * The Fitness ID section. Its card does not enter the page: it acts out the three
 * controls beside it. As the card crosses the viewport, two rows are shared («Tú
 * concedes»), one is withdrawn («Tú revocas») and, with the relationship over, nothing
 * is shared and the card is picked up («Tú te lo llevas»). The control being acted out
 * takes the cyan, and scrolling back plays it in reverse. With a mouse, pointing at a
 * control shows its stage.
 *
 * The scroll picks the stage; Motion springs the knobs and the card between stages.
 * Server-rendered HTML and reduced motion get the card at rest, whole and still.
 */

/** The controls, in the order of `fitnessIdControls`. */
const controlStages = ["grant", "revoke", "keep"] as const satisfies readonly FitnessIdStage[];

/** Fetched after the page is interactive; until then the card renders at rest. */
const loadMotionFeatures = () => import("@/components/motion-features").then((features) => features.default);

/**
 * Progress runs from the card's top reaching the middle of the viewport to its bottom
 * passing that middle, about one card height of scrolling whatever the screen. The stages
 * sit where the rows that change are on screen, and the card is whole in view when it is
 * picked up.
 */
const scrollWindow = ["start 0.55", "end 0.6"] as const;

function stageAt(progress: number): FitnessIdStage {
  if (progress < 0.08) return "rest";
  if (progress < 0.4) return "grant";
  if (progress < 0.72) return "revoke";
  return "keep";
}

function useScrollStage(card: RefObject<HTMLElement | null>): FitnessIdStage {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState<FitnessIdStage>("rest");
  const { scrollYProgress } = useScroll({ target: card, offset: [...scrollWindow] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => setStage(stageAt(progress)));
  return reducedMotion ? "rest" : stage;
}

export function FitnessIdSection({ copy }: { copy: LocalizedContent }) {
  const card = useRef<HTMLDivElement>(null);
  const scrolled = useScrollStage(card);
  const [pointed, setPointed] = useState<FitnessIdStage | null>(null);
  const stage = pointed ?? scrolled;

  return (
    <LazyMotion features={loadMotionFeatures} strict>
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
                  data-active={stage === controlStages[index]}
                  // Touch has no hover to leave, so only a mouse previews a stage.
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setPointed(controlStages[index]);
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
    </LazyMotion>
  );
}
