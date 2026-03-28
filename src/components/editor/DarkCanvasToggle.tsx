"use client";

import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

export const DarkCanvasToggle = () => {
  const { canvas } = useEditorStore();
  const [isDark, setIsDark] = useState(false);
  const { locale } = useLocale();
  const isTh = locale === "th";

  useEffect(() => {
    const saved = localStorage.getItem("worline-dark-canvas");
    if (saved === "true") setIsDark(true);
  }, []);

  const toggle = () => {
    const newVal = !isDark;
    setIsDark(newVal);
    localStorage.setItem("worline-dark-canvas", String(newVal));

    // Apply dark canvas background
    const container = document.getElementById("canvas-container");
    if (container) {
      container.style.backgroundColor = newVal ? "#1a1a2e" : "#f5f5f5";
    }
    // Apply to Konva stage background
    const stage = document.querySelector(".konvajs-content");
    if (stage instanceof HTMLElement) {
      stage.style.backgroundColor = newVal ? "#1a1a2e" : "#ffffff";
    }
  };

  return (
    <Button
      variant={isDark ? "secondary" : "ghost"}
      size="icon"
      className="w-7 h-7"
      onClick={toggle}
      title={isDark ? (isTh ? "แคนวาสสีสว่าง" : "Light Canvas") : (isTh ? "แคนวาสสีเทาดำ (สไตล์ AutoCAD)" : "Dark Canvas (AutoCAD style)")}
    >
      {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
    </Button>
  );
};
