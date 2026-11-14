import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

/**
 * The Allfit Space section's phone: the same frame and the same capture of the app as the
 * Space landing (`space.allfit.one`), so both sites show one product. The capture is the
 * session screen with «Dominadas» open, 720 × 1566.
 *
 * The phone works instead of entering. A capture cannot change, so the parts that do are
 * drawn over it, placed by the capture's own pixels: at rest the last two sets of
 * «Dominadas» wait to be logged, and `logged` counts how many sets the reader's scroll has
 * logged since. The first two tick those sets, which leaves the capture exactly as the
 * app took it; the third logs a set of «Remo con barra». Each one moves the volume, the
 * set count and the progress bar.
 */

/** The capture's size in px. Every overlay is placed as a share of it. */
const capture = { src: "/images/space/session.webp", width: 720, height: 1566 } as const;

/** The session behind the capture: 14 sets, and what each logged set adds to the volume. */
const totalSets = 14;
const pullUpSetKg = 35 * 6;
const rowSetKg = 360;
/** The capture's own numbers: both «Dominadas» sets ticked, none added. */
const captured = { sets: 7, volumeKg: 1920, rowSets: 3 };
/** The sets of «Dominadas» still to log at rest, by their order and their top edge in the capture. */
const waitingSets = [
  { order: 3, top: 839 },
  { order: 4, top: 932 },
] as const;

/** What the screen reads once `logged` sets are on it. */
function sessionAt(logged: number) {
  const pullUps = Math.min(logged, waitingSets.length);
  const rows = logged - pullUps;
  const missing = waitingSets.length - pullUps;
  return {
    sets: captured.sets - missing + rows,
    volumeKg: captured.volumeKg - missing * pullUpSetKg + rows * rowSetKg,
    rowSets: captured.rowSets + rows,
  };
}

/** The app writes thousands with a point, in both languages: the capture is the Spanish app. */
const volumeFormat = new Intl.NumberFormat("de-DE");

/** A value that changes rolls into place and settles without a bounce. */
const rollSpring = { type: "spring", stiffness: 380, damping: 34 } as const;
/** The progress bar has a little weight. */
const barSpring = { type: "spring", stiffness: 260, damping: 30 } as const;
/** The app's own tint takes 200 ms to arrive when a set is ticked. */
const tickTiming = { duration: 0.2, ease: "easeOut" as const };
/** A ring leaves the box a set was just ticked in. */
const pulse = { scale: [1, 1.5], opacity: [0.7, 0] };
const pulseTiming = { duration: 0.5, ease: "easeOut" as const };

/** Places an overlay by the capture's pixels. */
function at(box: { left: number; top: number; width?: number; height?: number }): CSSProperties {
  return {
    left: `${(box.left / capture.width) * 100}%`,
    top: `${(box.top / capture.height) * 100}%`,
    ...(box.width === undefined ? {} : { width: `${(box.width / capture.width) * 100}%` }),
    ...(box.height === undefined ? {} : { height: `${(box.height / capture.height) * 100}%` }),
  };
}

/**
 * A value that rolls when it changes: the old one leaves upward as the new one arrives
 * from below. What is there on load does not animate, so the static HTML shows it whole.
 */
function Roll({ value }: { value: string | number }) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <m.span
        key={value}
        className="block"
        initial={{ y: "60%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-60%", opacity: 0 }}
        transition={rollSpring}
      >
        {value}
      </m.span>
    </AnimatePresence>
  );
}

/**
 * A set of «Dominadas» as the app draws it before it is logged: wells for the weight and
 * the reps, no effort yet and an empty box. Logged, it fades to show the capture's own
 * ticked row under it.
 */
function WaitingSet({ order, top, waiting }: { order: number; top: number; waiting: boolean }) {
  return (
    <m.div
      className="space-set"
      style={at({ left: 59, top: top - 1, width: 602, height: 77 })}
      data-waiting={waiting}
      initial={false}
      animate={{ opacity: waiting ? 1 : 0 }}
      transition={tickTiming}
    >
      <span className="space-set-kind">
        {order}
        <svg viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.75 5 6.75 8 3.75" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="space-set-previous">32.5 kg × 6</span>
      <span className="space-set-field">35</span>
      <span className="space-set-field">6</span>
      <span className="space-set-effort">—</span>
      <m.span
        className="space-set-tick"
        initial={false}
        animate={{ scale: waiting ? 1 : 0.88 }}
        transition={tickTiming}
      />
    </m.div>
  );
}

export function SpacePhone({ alt, logged = 0 }: { alt: string; logged?: number }) {
  const session = sessionAt(logged);

  // The ring plays when a set is ticked, not when scrolling back unticks one.
  const [seen, setSeen] = useState({ logged, ticks: 0 });
  if (seen.logged !== logged) setSeen({ logged, ticks: seen.ticks + (logged > seen.logged ? 1 : 0) });
  const ticked = waitingSets[logged - 1];

  return (
    <div className="space-phone" data-logged={logged}>
      <div className="space-phone-screen">
        <div className="space-phone-capture">
          <Image src={capture.src} alt={alt} width={capture.width} height={capture.height} sizes="320px" />

          <div aria-hidden="true">
            <span className="space-live space-live-volume" style={at({ left: 414, top: 260, width: 86, height: 42 })}>
              <Roll value={volumeFormat.format(session.volumeKg)} />
            </span>
            <span className="space-live space-live-sets" style={at({ left: 602, top: 260, width: 28, height: 42 })}>
              <Roll value={session.sets} />
            </span>

            <span className="space-progress" style={at({ left: 43, top: 359, width: 634, height: 17 })}>
              <span className="space-progress-track">
                <m.span
                  className="space-progress-fill"
                  initial={false}
                  animate={{ width: `${(session.sets / totalSets) * 100}%` }}
                  transition={barSpring}
                />
              </span>
            </span>

            {waitingSets.map((set, index) => (
              <WaitingSet key={set.order} order={set.order} top={set.top} waiting={logged <= index} />
            ))}
            {ticked && seen.ticks > 0 ? (
              <m.span
                key={seen.ticks}
                className="space-set-pulse"
                style={at({ left: 593, top: ticked.top + 7.5 })}
                initial={{ scale: 1, opacity: 0 }}
                animate={pulse}
                transition={pulseTiming}
              />
            ) : null}

            <span className="space-live space-live-row" style={at({ left: 452, top: 1190, width: 80, height: 36 })}>
              <Roll value={`${session.rowSets} de 4`} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
