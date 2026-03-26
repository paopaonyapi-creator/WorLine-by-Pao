"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n/translations";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("worline-locale") as Locale | null;
    if (saved === "th" || saved === "en") {
      setLocaleState(saved);
    }

    const handler = () => {
      const current = localStorage.getItem("worline-locale") as Locale | null;
      if (current) setLocaleState(current);
    };

    window.addEventListener("locale-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("locale-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem("worline-locale", newLocale);
    setLocaleState(newLocale);
    window.dispatchEvent(new Event("locale-change"));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      return entry?.[locale] ?? key;
    },
    [locale]
  );

  return { locale, setLocale, t };
}
