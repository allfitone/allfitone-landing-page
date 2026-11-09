import { useSyncExternalStore } from "react";

/**
 * The one person the landing names. Every place a name appears (the Allfit Studio
 * panel and its avatar) uses the same first name, picked at random once per visit
 * from these five, so the page keeps telling one person's story. The owner chose
 * the five in November 2026.
 *
 * The static HTML carries the first name; the visit's pick replaces it right after
 * hydration (`useSyncExternalStore` reads the server snapshot while hydrating, so React
 * never sees a mismatch). Every name section sits below the first viewport.
 */
export const personNames = ["Kevin", "Walbert", "Jimmy", "Charly", "Nico"] as const;
export type PersonName = (typeof personNames)[number];

let visitPick: PersonName | undefined;

function pickForVisit(): PersonName {
  visitPick ??= personNames[Math.floor(Math.random() * personNames.length)];
  return visitPick;
}

const staticName = () => personNames[0];
const noUpdates = () => () => {};

export function usePersonName(): PersonName {
  return useSyncExternalStore(noUpdates, pickForVisit, staticName);
}

/** Fills `{name}` with the visit's person. */
export function withPerson(text: string, name: string): string {
  return text.replace(/\{name\}/g, name);
}
