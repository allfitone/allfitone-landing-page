"use client";

import { useEffect, useState } from "react";

type Entry = readonly [href: `#${string}`, label: string];

/**
 * A legal document's contents. Without JavaScript it is a plain list of anchors; once
 * hydrated it marks the section being read, the last one whose top has passed the
 * upper third of the viewport. On wide screens it sits beside the text and stays put
 * while the text scrolls; on narrow ones it reads as a list above the first section.
 */
export function LegalContents({ label, entries }: { label: string; entries: readonly Entry[] }) {
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
    <nav className="legal-contents" aria-labelledby="legal-contents-label">
      <div className="legal-contents-inner">
        <p id="legal-contents-label" className="legal-contents-label">
          {label}
        </p>
        <ol className="legal-contents-list">
          {entries.map(([href, text]) => (
            <li key={href}>
              <a
                className="legal-contents-link"
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
