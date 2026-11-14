import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

/**
 * The Allfit Studio section's one object: a window on the real app. Both captures are the
 * app's home screen, «Inicio», taken from Allfit Studio itself with sample data: what
 * waits for the studio today, from people without a professional to the week's clients.
 *
 * The window works instead of entering. Each capture comes in two pieces, the screen as it
 * loads and the whole page under its header, so the page can be read down as the reader
 * scrolls: the sidebar and the header stay, as they do in the app, and the page moves
 * under them. Scrolling back reads it up again.
 */

type Capture = {
  /** The screen as it loads, sidebar and header included. */
  screen: string;
  /** The whole page under the header, as tall as it is. */
  page: string;
  /** The screen's size in CSS px. */
  width: number;
  height: number;
  /** Where the page sits on the screen, and how tall it is in all. */
  pageLeft: number;
  pageTop: number;
  pageHeight: number;
  /**
   * How far down the page is read, in CSS px: part of the way, so the page inside never
   * moves faster than the reader's own scroll and stays readable.
   */
  travel: number;
};

/** The app from 1024px: its sidebar beside the page. */
const desktop: Capture = {
  screen: "/images/studio/home-desktop.webp",
  page: "/images/studio/home-desktop-page.webp",
  width: 1280,
  height: 720,
  pageLeft: 272,
  pageTop: 64,
  pageHeight: 1313,
  travel: 480,
};

/** The app on a phone. */
const mobile: Capture = {
  screen: "/images/studio/home-mobile.webp",
  page: "/images/studio/home-mobile-page.webp",
  width: 390,
  height: 700,
  pageLeft: 0,
  pageTop: 64,
  pageHeight: 1746,
  travel: 420,
};

/** Reading is not the scroll wheel: the page follows it with a little weight. */
const readingSpring = { stiffness: 140, damping: 26, restDelta: 0.0005 } as const;

function share(part: number, whole: number) {
  return `${(part / whole) * 100}%`;
}

function Screen({
  capture,
  name,
  alt,
  read,
}: {
  capture: Capture;
  name: "desktop" | "mobile";
  alt: string;
  read: MotionValue<number>;
}) {
  // A share of the page's own height, so it holds at every width.
  const y = useTransform(read, [0, 1], ["0%", `-${(capture.travel / capture.pageHeight) * 100}%`]);
  const pageBox: CSSProperties = {
    left: share(capture.pageLeft, capture.width),
    top: share(capture.pageTop, capture.height),
    width: share(capture.width - capture.pageLeft, capture.width),
    height: share(capture.height - capture.pageTop, capture.height),
  };

  return (
    <div className="studio-window" data-screen={name}>
      <Image src={capture.screen} alt={alt} width={capture.width} height={capture.height} sizes="(min-width: 1024px) 92vw, 390px" />
      <div className="studio-window-page" style={pageBox} aria-hidden="true">
        <m.div style={{ y }}>
          <Image
            src={capture.page}
            alt=""
            width={capture.width - capture.pageLeft}
            height={capture.pageHeight}
            sizes="(min-width: 1024px) 72vw, 390px"
          />
        </m.div>
      </div>
    </div>
  );
}

export function StudioWindow({ alt }: { alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // From the window's top at 60% of the viewport to its bottom at 80%: the stretch in
  // which the window is in the reader's view.
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start 0.6", "end 0.8"] });
  const followed = useSpring(scrollYProgress, readingSpring);
  const still = useTransform(scrollYProgress, () => 0);
  const read = reducedMotion ? still : followed;

  return (
    <div ref={frame} className="studio-window-frame">
      <Screen capture={desktop} name="desktop" alt={alt} read={read} />
      <Screen capture={mobile} name="mobile" alt={alt} read={read} />
    </div>
  );
}
