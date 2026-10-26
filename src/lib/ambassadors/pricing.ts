import type { AmbassadorPlan } from "@/lib/ambassadors/schema";
import type { Language } from "@/lib/content";

const numberLocales: Record<Language, "es-CO" | "en-US"> = { es: "es-CO", en: "en-US" };

/** Prices are whole Colombian pesos; the monthly figure is the total spread over the plan. */
export function monthlyPrice(plan: AmbassadorPlan) {
  return Math.round(plan.priceCOP / plan.months);
}

/**
 * Whole-percent saving of a plan's monthly price against the base plan, or null when
 * there is nothing to show: the base plan itself, no saving, or a free base plan.
 */
export function savingPercent(plan: AmbassadorPlan, basePlan: AmbassadorPlan) {
  const baseMonthly = monthlyPrice(basePlan);
  if (plan.id === basePlan.id || baseMonthly <= 0) return null;
  const saving = Math.round((1 - monthlyPrice(plan) / baseMonthly) * 100);
  return saving > 0 ? saving : null;
}

export function formatPesos(amount: number, language: Language) {
  return `$${amount.toLocaleString(numberLocales[language])}`;
}

/**
 * Names a plan by its duration inside a sentence: "3 meses" or "1 año" in Spanish,
 * and the attributive "3-month" or "1-year" in English ("the 3-month plan").
 */
export function planDuration(months: number, language: Language) {
  const years = months % 12 === 0 ? months / 12 : 0;
  if (language === "en") return years ? `${years}-year` : `${months}-month`;
  if (years) return years === 1 ? "1 año" : `${years} años`;
  return months === 1 ? "1 mes" : `${months} meses`;
}
