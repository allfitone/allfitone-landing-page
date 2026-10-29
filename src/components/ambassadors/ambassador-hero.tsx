import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@allfitone/react/lib/utils";

import type { AmbassadorProfile } from "@/lib/ambassadors/schema";
import type { Language } from "@/lib/content";

/** Accents and tildes decompose into combining marks, such as Á into A + U+0301. */
const combiningMark = /[\u0300-\u036f]/;

/** The page spends its boldness here: the name crosses in front of the portrait. */
export function AmbassadorHero({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const copy = profile.content[language];
  const { hero } = profile.photos;
  // The stacked name's tight line height hides an accent on the family name behind the given
  // name, so only those names get room for it; names without accents keep their exact layout.
  const accentedFamilyName = combiningMark.test(profile.identity.familyName.normalize("NFD"));
  // Framing belongs to each photo, so it travels as CSS variables instead of per-person rules.
  const framing = {
    "--ambassador-hero-focus": hero.focusMobile,
    "--ambassador-hero-inset": hero.insetDesktop,
  } as CSSProperties;

  return (
    <section className="ambassador-hero" aria-labelledby="ambassador-name">
      <figure className="ambassador-hero-figure" style={framing}>
        <Image
          src={hero.src}
          alt={hero.alt[language]}
          width={hero.width}
          height={hero.height}
          preload
          sizes="(min-width: 1024px) 72vw, 100vw"
        />
      </figure>

      <div className="site-grid ambassador-hero-grid">
        <div className="ambassador-hero-copy col-span-12 lg:col-span-6">
          <p className="eyebrow ambassador-role">
            {copy.role}
          </p>
          {/* The space between the block-level names keeps the accessible name two words. */}
          <h1 id="ambassador-name" className="ambassador-name">
            <span>{profile.identity.givenName}</span>{" "}
            <span className={cn("ambassador-name-outline", accentedFamilyName && "ambassador-name-accented")}>
              {profile.identity.familyName}
            </span>
          </h1>
          <p className="ambassador-hero-lead">
            {copy.lead}
          </p>
        </div>
      </div>

      {copy.heroFacts.length > 0 && (
        <div className="site-grid ambassador-hero-rail">
          <ul className="ambassador-rail col-span-12" style={{ "--ambassador-fact-count": copy.heroFacts.length } as CSSProperties}>
            {copy.heroFacts.map((fact) => (
              <li key={fact}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
