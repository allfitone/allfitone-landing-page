/**
 * Adds an email to the Allfit One waitlist.
 *
 * FRONT-END ONLY FOR NOW: nothing is sent or stored. The form around it already
 * handles the pending, joined and failed states, so wiring the real service only
 * means replacing this body with the request (and throwing when it fails). The
 * site is a static export, so that request has to go to an external endpoint;
 * there is no route handler to receive it here.
 *
 * Do not ship this stub to production: visitors would see "You're on the list"
 * while their email goes nowhere.
 */
export async function joinWaitlist(email: string): Promise<void> {
  void email;
  await new Promise((resolve) => setTimeout(resolve, 700));
}

/** Loose on purpose: the service will confirm the address; this only catches typos. */
export function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
