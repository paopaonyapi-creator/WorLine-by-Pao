"use client";

import { useState, useMemo } from "react";
import { symbolRegistry, categories } from "@/lib/editor/symbols/registry";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editorStore";

export const SymbolSearch = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const { addObject, panX, panY, zoom } = useEditorStore();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return Object.values(symbolRegistry).filter(
      (s: any) =>
        s.displayName.toLowerCase().includes(q) ||
        s.symbolType.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handlePlace = (symbolId: string) => {
    const canvasContainer = document.getElementById("canvas-container");
    const rect = canvasContainer?.getBoundingClientRect();
    const w = rect ? rect.width : window.innerWidth;
    const h = rect ? rect.height : window.innerHeight;
    const centerX = -panX / zoom + (w / 2) / zoom;
    const centerY = -panY / zoom + (h / 2) / zoom;

    const def = symbolRegistry[symbolId];
    if (!def) return;

    addObject({
      type: "symbol",
      symbolId,
      x: centerX - def.width / 2,
      y: centerY - def.height / 2,
      rotation: 0,
      zIndex: 1,
      connections: [],
    } as any);

    onClose();
  };

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbols... (e.g. fuse, motor)"
          className="border-0 focus-visible:ring-0 h-8 px-0 text-sm"
        />
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {query.trim() === "" ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Type to search {Object.keys(symbolRegistry).length} symbols
          </div>
        ) : results.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No symbols found
          </div>
        ) : (
          results.map((sym: any) => (
            <button
              key={sym.id}
              onClick={() => handlePlace(sym.id)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/50 transition-colors text-left"
            >
              <span className="text-sm font-medium">{sym.displayName}</span>
              <span className="text-[10px] text-muted-foreground ml-auto">{sym.category}</span>
            </button>
          ))
        )}
      </div>
      <div className="px-3 py-1.5 border-t text-[10px] text-muted-foreground">
        Ctrl+K to open · Enter to place · Esc to close
      </div>
    </div>
  );
};
