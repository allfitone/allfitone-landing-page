import { BrandLogo } from "@allfitone/react/brand";

import type { LocalizedContent } from "@/lib/content";

/*
 * The Fitness ID as one object: its name, what it holds and where it stays. The list
 * answers the problem section's ledger (the kinds of data the person left at their gym, kept
 * this time), so it carries no label, index or decoration of its own; the cyan foot is
 * the payoff.
 */
export function FitnessIdCard({ copy }: { copy: LocalizedContent }) {
  return (
    <figure className="fid-card" data-reveal="card">
      <div className="fid-card-head">
        <BrandLogo variant="cyan" className="h-7 w-auto" aria-hidden="true" />
        <p className="fid-card-title">Fitness ID</p>
      </div>

      <ul className="fid-card-list">
        {copy.fitnessIdFields.map((field) => (
          <li key={field} className="fid-card-row">
            {field}
          </li>
        ))}
      </ul>

      <figcaption className="fid-card-foot">{copy.fitnessIdCardFooter}</figcaption>
    </figure>
  );
}
