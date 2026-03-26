"use client";

import { useEditorStore } from "@/store/editorStore";
import { X, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SymbolObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";

export const HyperlinkCrossRef = ({ onClose }: { onClose: () => void }) => {
  const { canvas, sheets, activeSheetId, switchSheet, setSelection } = useEditorStore();

  // Build cross-reference map from all sheets
  const allSymbols: { sheetId: string; sheetName: string; obj: SymbolObject }[] = [];

  sheets.forEach(sheet => {
    const objs = sheet.id === activeSheetId ? canvas.objects : sheet.canvas.objects;
    objs.forEach(obj => {
      if (obj.type === "symbol") {
        allSymbols.push({ sheetId: sheet.id, sheetName: sheet.name, obj: obj as SymbolObject });
      }
    });
  });

  // Group by symbolId
  const groups: Record<string, typeof allSymbols> = {};
  allSymbols.forEach(s => {
    const key = s.obj.symbolId;
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  });

  const handleJump = (sheetId: string, objId: string) => {
    if (sheetId !== activeSheetId) {
      switchSheet(sheetId);
    }
    setSelection([objId]);
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-indigo-500/10 to-violet-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link2 className="h-4 w-4 text-indigo-500" />
          Cross-Reference Index ({allSymbols.length} symbols)
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {Object.entries(groups).map(([symbolId, items]) => {
          const def = symbolRegistry[symbolId];
          return (
            <div key={symbolId} className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-3 py-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold">{def?.displayName || symbolId}</span>
                <span className="text-[9px] text-muted-foreground">{items.length}×</span>
              </div>
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleJump(item.sheetId, item.obj.id)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] border-t hover:bg-muted/20 transition-colors"
                >
                  <span className="font-medium">{(item.obj as any).label || item.obj.id.slice(0, 8)}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[8px]">{item.sheetName}</span>
                  <span className="text-muted-foreground ml-auto">({Math.round(item.obj.x)}, {Math.round(item.obj.y)})</span>
                  <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          );
        })}

        {allSymbols.length === 0 && (
          <div className="text-center text-muted-foreground text-xs py-8">No symbols found</div>
        )}
      </div>
    </div>
  );
};
