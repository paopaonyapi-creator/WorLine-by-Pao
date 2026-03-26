"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 px-3 font-medium text-xs gap-1.5"
      onClick={() => setLocale(locale === "en" ? "th" : "en")}
      aria-label={locale === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
    >
      {locale === "en" ? "🇹🇭 ไทย" : "🇺🇸 EN"}
    </Button>
  );
}
