"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const [locale, setLocale] = useState<"en" | "th">("en");

  useEffect(() => {
    const saved = localStorage.getItem("worline-locale") as "en" | "th";
    if (saved) setLocale(saved);
  }, []);

  const toggle = () => {
    const next = locale === "en" ? "th" : "en";
    setLocale(next);
    localStorage.setItem("worline-locale", next);
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent("locale-change", { detail: next }));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      title={locale === "en" ? "Switch to Thai" : "เปลี่ยนเป็นภาษาอังกฤษ"}
      className="h-9 w-9"
    >
      <Globe className="h-4 w-4" />
      <span className="sr-only">{locale === "en" ? "TH" : "EN"}</span>
    </Button>
  );
};
