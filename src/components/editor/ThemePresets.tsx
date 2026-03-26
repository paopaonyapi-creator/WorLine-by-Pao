"use client";

import { useState, useEffect } from "react";
import { X, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThemePreset = {
  id: string;
  name: string;
  colors: { wire: string; symbol: string; text: string; bg: string; grid: string; accent: string };
};

const PRESETS: ThemePreset[] = [
  {
    id: "iec", name: "IEC Standard",
    colors: { wire: "#000000", symbol: "#000000", text: "#333333", bg: "#ffffff", grid: "#e0e0e0", accent: "#2563eb" },
  },
  {
    id: "schneider", name: "Schneider Electric",
    colors: { wire: "#3dcd58", symbol: "#1a1a1a", text: "#333333", bg: "#f8faf5", grid: "#e8ede0", accent: "#3dcd58" },
  },
  {
    id: "abb", name: "ABB",
    colors: { wire: "#ff000f", symbol: "#1a1a1a", text: "#333333", bg: "#fef8f8", grid: "#f0e0e0", accent: "#ff000f" },
  },
  {
    id: "siemens", name: "Siemens",
    colors: { wire: "#009999", symbol: "#1a1a1a", text: "#333333", bg: "#f5fafa", grid: "#ddf0f0", accent: "#009999" },
  },
  {
    id: "dark-cad", name: "Dark CAD",
    colors: { wire: "#00ff00", symbol: "#00ccff", text: "#cccccc", bg: "#1a1a2e", grid: "#2a2a4a", accent: "#ff6600" },
  },
  {
    id: "blueprint", name: "Blueprint",
    colors: { wire: "#ffffff", symbol: "#ffffff", text: "#e0e0ff", bg: "#0a1628", grid: "#1a2a40", accent: "#4488ff" },
  },
];

export const ThemePresets = ({ onClose }: { onClose: () => void }) => {
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === "undefined") return "iec";
    return localStorage.getItem("worline-theme") || "iec";
  });

  const apply = (preset: ThemePreset) => {
    setActiveId(preset.id);
    localStorage.setItem("worline-theme", preset.id);
    localStorage.setItem("worline-theme-colors", JSON.stringify(preset.colors));

    // Apply to canvas
    const container = document.getElementById("canvas-container");
    if (container) container.style.backgroundColor = preset.colors.bg;
    const stage = document.querySelector(".konvajs-content");
    if (stage instanceof HTMLElement) stage.style.backgroundColor = preset.colors.bg;

    document.documentElement.style.setProperty("--worline-wire", preset.colors.wire);
    document.documentElement.style.setProperty("--worline-symbol", preset.colors.symbol);
    document.documentElement.style.setProperty("--worline-accent", preset.colors.accent);
  };

  return (
    <div className="absolute top-16 right-4 z-50 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Palette className="h-4 w-4 text-pink-500" />
          Theme Presets
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-3 space-y-1.5">
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => apply(p)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${activeId === p.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted/30"}`}
          >
            {/* Color swatches */}
            <div className="flex gap-0.5 shrink-0">
              {Object.values(p.colors).map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-sm border border-white/20" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-xs font-medium flex-1 text-left">{p.name}</span>
            {activeId === p.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
};
