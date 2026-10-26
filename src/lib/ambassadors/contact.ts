import type { AmbassadorProfile } from "@/lib/ambassadors/schema";
import { siteConfig } from "@/lib/site-config";

/**
 * Email is the only conversion action. The subject names the ambassador, and the plan
 * when there is one: `Allfit One · {Given} {Family} · {Plan}`.
 */
export function ambassadorContactHref({ identity }: AmbassadorProfile, planName?: string) {
  const subject = [siteConfig.name, `${identity.givenName} ${identity.familyName}`, planName].filter(Boolean).join(" · ");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
