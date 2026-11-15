import type { Language } from "@/lib/content";
import { productSiteUrl } from "@/lib/site-config";

/**
 * The Allfit Space waitlist lives on space.allfit.one (`/{lang}/waitlist`), with its
 * form, its referral links and the Founding Members' terms. The owner moved it there in
 * November 2026: the list is Allfit Space's alone, and the referral links people share
 * are Allfit Space links. This site only leads to it.
 *
 * Whether this site shows the waitlist at all. Closed, the homepage drops its waitlist
 * section and every «Únete a la lista» action. Open since November 2026 (TECH-297), when
 * the waitlist on space.allfit.one began storing sign-ups.
 */
export const waitlistOpen: boolean = true;

/** The Allfit Space waitlist page in the visitor's language, e.g. `https://space.allfit.one/es/waitlist`. */
export function spaceWaitlistUrl(language: Language): string {
  return `${productSiteUrl("space", language)}/waitlist`;
}
