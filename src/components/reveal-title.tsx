import { Fragment, type ElementType } from "react";

/**
 * A section title that rises out of its masks line by line when it scrolls into
 * view, like the Space and Studio titles. Titles wrap freely, so each word
 * carries its own mask and the motion layer tells the words of a line to rise
 * together (`--l`, src/components/landing-motion.ts). The heading's text and
 * accessible name stay the plain title.
 */
export function RevealTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className: string;
  children: string;
}) {
  return (
    <Tag className={className} data-reveal="mask">
      {children.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span className="reveal-word">
            <span>{word}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
