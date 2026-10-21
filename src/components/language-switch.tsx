"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@allfitone/react/components/toggle-group";

import { isLanguage, type Language } from "@/lib/content";

/**
 * The URL owns the language, so switching opens the same page under the other
 * language prefix and keeps the current section anchor.
 */
export function LanguageSwitch({ language, label }: { language: Language; label: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    const [, , ...rest] = pathname.split("/");
    const path = rest.length > 0 ? `/${rest.join("/")}` : "";
    router.push(`/${nextLanguage}${path}${window.location.hash}`);
  };

  return (
    <ToggleGroup
      className="locale-toggle"
      aria-label={label}
      value={[language]}
      onValueChange={(value) => {
        const nextLanguage = value[0];
        if (nextLanguage && isLanguage(nextLanguage)) switchTo(nextLanguage);
      }}
    >
      <ToggleGroupItem className="locale-toggle-item" value="es" aria-label="Español" lang="es">
        ES
      </ToggleGroupItem>
      <ToggleGroupItem className="locale-toggle-item" value="en" aria-label="English" lang="en">
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
