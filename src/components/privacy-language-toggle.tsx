"use client";

import { useEffect, useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@allfitone/react/components/toggle-group";

import {
  analyticsPrivacyContent,
  readStoredLanguage,
  writeStoredLanguage,
  type Language,
} from "@/lib/content";

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dataset.privacyLanguage = language;
}

export function PrivacyLanguageToggle() {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = readStoredLanguage();
    const timer = window.setTimeout(() => {
      setLanguage(savedLanguage);
      applyLanguage(savedLanguage);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    writeStoredLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  };

  return (
    <ToggleGroup
      className="locale-toggle"
      aria-label={analyticsPrivacyContent[language].selectLanguage}
      value={[language]}
      onValueChange={(value) => {
        const nextLanguage = value[0];
        if (nextLanguage === "es" || nextLanguage === "en") {
          changeLanguage(nextLanguage);
        }
      }}
    >
      <ToggleGroupItem className="locale-toggle-item" value="es" aria-label="Español">
        ES
      </ToggleGroupItem>
      <ToggleGroupItem className="locale-toggle-item" value="en" aria-label="English">
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
