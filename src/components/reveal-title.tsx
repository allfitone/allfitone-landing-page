import { Fragment, type ElementType, type ReactNode } from "react";

/**
 * A section title that rises out of its masks line by line when it scrolls into
 * view, like the Space and Studio titles. Titles wrap freely, so each word
 * carries its own mask and the motion layer tells the words of a line to rise
 * together (`--l`, src/components/landing-motion.ts). The heading's text and
 * accessible name stay the plain title. `tail` closes the title with an object
 * that is not text (a wordmark), which rises as its last word; the caller then
 * names the heading with `label`.
 */
export function RevealTitle({
  as: Tag = "h2",
  className,
  children,
  tail,
  label,
}: {
  as?: ElementType;
  className: string;
  children: string;
  tail?: ReactNode;
  label?: string;
}) {
  return (
    <Tag className={className} data-reveal="mask" aria-label={label}>
      {children.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span className="reveal-word">
            <span>{word}</span>
          </span>
        </Fragment>
      ))}
      {tail ? (
        <>
          {" "}
          <span className="reveal-word">
            <span>{tail}</span>
          </span>
        </>
      ) : null}
    </Tag>
  );
}
