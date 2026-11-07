"use client";

import { useEffect, useState } from "react";

type Entry = readonly [href: `#${string}`, label: string];

/**
 * The notice's contents. Without JavaScript it is a plain list of anchors; once
 * hydrated it marks the section being read, the last one whose top has passed the
 * upper third of the viewport. On wide screens it sits beside the text and stays put
 * while the text scrolls; on narrow ones it reads as a list above the first section.
 */
export function PrivacyContents({ label, entries }: { label: string; entries: readonly Entry[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = entries
      .map(([href]) => document.getElementById(href.slice(1)))
      .filter((target): target is HTMLElement => target !== null);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let reading: string | null = null;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= line) reading = target.id;
      }
      setCurrent(reading);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [entries]);

  return (
    <nav className="privacy-contents" aria-labelledby="privacy-contents-label">
      <div className="privacy-contents-inner">
        <p id="privacy-contents-label" className="privacy-contents-label">
          {label}
        </p>
        <ol className="privacy-contents-list">
          {entries.map(([href, text]) => (
            <li key={href}>
              <a
                className="privacy-contents-link"
                href={href}
                aria-current={current === href.slice(1) ? "true" : undefined}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
