"use client";

import { useEditorStore } from "@/store/editorStore";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { SymbolObject, WireObject } from "@/lib/editor/types";
import { Calculator, X } from "lucide-react";

export const LoadCalculator = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();

  const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];
  const wires = canvas.objects.filter(o => o.type === "wire") as WireObject[];

  // Symbol counts by category
  const categoryCount: Record<string, { items: string[]; count: number }> = {};
  symbols.forEach(sym => {
    const def = symbolRegistry[sym.symbolId];
    if (!def) return;
    if (!categoryCount[def.category]) {
      categoryCount[def.category] = { items: [], count: 0 };
    }
    categoryCount[def.category].count += 1;
    if (!categoryCount[def.category].items.includes(def.displayName)) {
      categoryCount[def.category].items.push(def.displayName);
    }
  });

  // Simple load estimation
  const motorCount = symbols.filter(s => s.symbolId === "motor").length;
  const generatorCount = symbols.filter(s => s.symbolId === "generator").length;
  const lampCount = symbols.filter(s => s.symbolId === "lamp").length;
  const vfdCount = symbols.filter(s => s.symbolId === "vfd").length;

  // Estimated load (simplified)
  const estimatedLoadKW = motorCount * 7.5 + lampCount * 0.5 + vfdCount * 11;
  const estimatedCurrentA = estimatedLoadKW > 0
    ? (estimatedLoadKW * 1000) / (Math.sqrt(3) * 400 * 0.85) // 3-phase, 400V, PF 0.85
    : 0;
  const cableSizeRecommendation =
    estimatedCurrentA <= 20 ? "2.5 mm²" :
    estimatedCurrentA <= 32 ? "4.0 mm²" :
    estimatedCurrentA <= 50 ? "10 mm²" :
    estimatedCurrentA <= 80 ? "16 mm²" :
    estimatedCurrentA <= 100 ? "25 mm²" :
    estimatedCurrentA <= 150 ? "50 mm²" : "70+ mm²";

  return (
    <div className="absolute bottom-16 right-4 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Calculator className="h-4 w-4" />
          Load Summary
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Component Summary */}
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Components</h5>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <span className="text-muted-foreground">Total Symbols:</span>
            <span className="font-medium text-right">{symbols.length}</span>
            <span className="text-muted-foreground">Total Wires:</span>
            <span className="font-medium text-right">{wires.length}</span>
            {Object.entries(categoryCount).map(([cat, data]) => (
              <span key={cat} className="text-muted-foreground col-span-2 flex justify-between">
                <span>{cat}:</span>
                <span className="font-medium">{data.count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Load Estimation */}
        {estimatedLoadKW > 0 && (
          <div className="border-t pt-3">
            <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Load Estimate</h5>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <span className="text-muted-foreground">Motors ({motorCount}×7.5kW):</span>
              <span className="font-medium text-right">{motorCount * 7.5} kW</span>
              {lampCount > 0 && <>
                <span className="text-muted-foreground">Lamps ({lampCount}×0.5kW):</span>
                <span className="font-medium text-right">{lampCount * 0.5} kW</span>
              </>}
              {vfdCount > 0 && <>
                <span className="text-muted-foreground">VFDs ({vfdCount}×11kW):</span>
                <span className="font-medium text-right">{vfdCount * 11} kW</span>
              </>}
              <span className="text-muted-foreground font-semibold border-t pt-1">Total Load:</span>
              <span className="font-bold text-right border-t pt-1">{estimatedLoadKW.toFixed(1)} kW</span>
              <span className="text-muted-foreground">Est. Current (3φ 400V):</span>
              <span className="font-medium text-right">{estimatedCurrentA.toFixed(1)} A</span>
              <span className="text-muted-foreground">Cable Size:</span>
              <span className="font-medium text-right text-primary">{cableSizeRecommendation}</span>
            </div>
          </div>
        )}

        {estimatedLoadKW === 0 && (
          <div className="text-xs text-muted-foreground/60 text-center py-2">
            Add motors, lamps, or VFDs to see load calculations
          </div>
        )}

        <div className="text-[9px] text-muted-foreground/50 text-center border-t pt-2">
          * Estimates only. PF=0.85, 3φ 400V. Verify with engineering calculations.
        </div>
      </div>
    </div>
  );
};
