/**
 * How a person would use Allfit One. It decides which opening they hear about:
 * Allfit Space for people who train, Allfit Studio for coaches and gyms.
 */
export const waitlistRoles = ["train", "coach", "gym"] as const;
export type WaitlistRole = (typeof waitlistRoles)[number];

export type WaitlistEntry = {
  /** First name only, for the greeting in the opening email. */
  name: string;
  email: string;
  role: WaitlistRole;
};

export function isWaitlistRole(value: unknown): value is WaitlistRole {
  return typeof value === "string" && (waitlistRoles as readonly string[]).includes(value);
}

/**
 * Adds a person to the Allfit One waitlist.
 *
 * FRONT-END ONLY FOR NOW: nothing is sent or stored. The form around it already
 * handles the pending, joined and failed states, so wiring the real service only
 * means replacing this body with the request (and throwing when it fails). The
 * site is a static export, so that request has to go to an external endpoint;
 * there is no route handler to receive it here.
 *
 * Do not ship this stub to production: visitors would see "You're on the list"
 * while their name and email go nowhere.
 */
export async function joinWaitlist(entry: WaitlistEntry): Promise<void> {
  void entry;
  await new Promise((resolve) => setTimeout(resolve, 700));
}

/** Loose on purpose: the service will confirm the address; this only catches typos. */
export function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
