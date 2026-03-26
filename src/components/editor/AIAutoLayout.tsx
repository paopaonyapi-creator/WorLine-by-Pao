"use client";

import { useEditorStore } from "@/store/editorStore";
import { SymbolObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Wand2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Auto-layout algorithm: arrange symbols in a vertical column with wires
function autoLayoutSLD(symbols: SymbolObject[]): { id: string; x: number; y: number }[] {
  if (symbols.length === 0) return [];

  // Sort by category priority: Source > HV > Protection > Motor/Load
  const priority: Record<string, number> = {
    "Source": 0,
    "High Voltage": 1,
    "Measurement": 2,
    "Switchgear": 3,
    "Protection": 4,
    "Power Conversion": 5,
    "Load": 6,
    "Custom": 7,
  };

  const sorted = [...symbols].sort((a, b) => {
    const defA = symbolRegistry[a.symbolId];
    const defB = symbolRegistry[b.symbolId];
    const prioA = defA ? (priority[defA.category] ?? 99) : 99;
    const prioB = defB ? (priority[defB.category] ?? 99) : 99;
    return prioA - prioB;
  });

  // Determine layout based on count
  const isSmall = sorted.length <= 6;
  const spacing = 120;
  const startX = 400;
  const startY = 60;

  if (isSmall) {
    // Single column layout
    return sorted.map((sym, i) => ({
      id: sym.id,
      x: startX,
      y: startY + i * spacing,
    }));
  }

  // Multi-column: split at Protection/Load boundary
  const mainColumn: typeof sorted = [];
  const branches: typeof sorted = [];

  sorted.forEach(sym => {
    const def = symbolRegistry[sym.symbolId];
    const cat = def?.category || "";
    // Duplicate loads/motors go to branches
    if (cat === "Load" && mainColumn.some(m => symbolRegistry[m.symbolId]?.category === "Load")) {
      branches.push(sym);
    } else {
      mainColumn.push(sym);
    }
  });

  const results: { id: string; x: number; y: number }[] = [];

  // Main column
  mainColumn.forEach((sym, i) => {
    results.push({ id: sym.id, x: startX, y: startY + i * spacing });
  });

  // Branches spread horizontally from bottom of main
  const branchY = startY + mainColumn.length * spacing;
  const branchSpacing = 160;
  const branchStartX = startX - ((branches.length - 1) * branchSpacing) / 2;
  branches.forEach((sym, i) => {
    results.push({ id: sym.id, x: branchStartX + i * branchSpacing, y: branchY });
  });

  return results;
}

export const AIAutoLayout = ({ onClose }: { onClose: () => void }) => {
  const { canvas, updateObject } = useEditorStore();
  const [running, setRunning] = useState(false);

  const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];

  const handleAutoLayout = () => {
    if (symbols.length === 0) {
      toast.error("No symbols on canvas to arrange");
      return;
    }

    setRunning(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const layout = autoLayoutSLD(symbols);
      layout.forEach(pos => {
        updateObject(pos.id, { x: pos.x, y: pos.y } as any);
      });

      toast.success(`Arranged ${layout.length} symbols in SLD layout`);
      setRunning(false);
    }, 800);
  };

  return (
    <div className="absolute top-16 right-4 z-50 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-violet-500/10 to-indigo-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-violet-500" />
          AI Auto Layout
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          จัดวาง SLD อัตโนมัติตามลำดับ: Source → HV → Protection → Load
        </p>

        <div className="bg-muted/30 rounded-lg p-3 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Symbols on canvas:</span>
            <span className="font-medium">{symbols.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Layout type:</span>
            <span className="font-medium">{symbols.length <= 6 ? "Single Column" : "Multi-Column"}</span>
          </div>
        </div>

        <Button
          className="w-full gap-2"
          onClick={handleAutoLayout}
          disabled={running || symbols.length === 0}
        >
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Arranging...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" /> Auto Arrange SLD
            </>
          )}
        </Button>

        <p className="text-[9px] text-muted-foreground/50 text-center">
          * Arranges by Source → HV → Protection → Load hierarchy
        </p>
      </div>
    </div>
  );
};
