import { BrandLogo } from "@allfitone/react/brand";
import { PulseMark } from "@allfitone/react/components/pulse-mark";

import type { LocalizedContent } from "@/lib/content";

export function FitnessIdCard({ copy }: { copy: LocalizedContent }) {
  return (
    <figure className="fid-card" data-reveal="card">
      <span className="fid-card-band" aria-hidden="true" />

      <div className="fid-card-head">
        <BrandLogo variant="cyan" className="h-7 w-auto" aria-hidden="true" />
        <p className="fid-card-title">Fitness ID</p>
        <PulseMark width={30} className="ml-auto text-bolt" />
      </div>

      <p className="fid-card-label">{copy.fitnessIdCardLabel}</p>

      <ul className="fid-card-list">
        {copy.fitnessIdFields.map((field, index) => (
          <li key={field} className="fid-card-row">
            <span className="fid-card-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="fid-card-field">{field}</span>
          </li>
        ))}
      </ul>

      <figcaption className="fid-card-foot">{copy.fitnessIdCardFooter}</figcaption>
    </figure>
  );
}
