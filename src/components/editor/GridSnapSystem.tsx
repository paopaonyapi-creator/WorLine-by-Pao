"use client";

import { useState } from "react";
import { X, Grid3x3, Magnet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editorStore";

export const GridSnapSystem = ({ onClose }: { onClose: () => void }) => {
  const { canvas, snapToGrid, toggleSnapToGrid } = useEditorStore();
  const [gridSize, setLocalGrid] = useState(canvas.gridSize || 20);
  const [snapEnabled, setSnapEnabled] = useState(snapToGrid);
  const [magnetStrength, setMagnetStrength] = useState(10);
  const [showGrid, setShowGrid] = useState(true);
  const [gridStyle, setGridStyle] = useState<"dots" | "lines" | "cross">("dots");

  const applyGrid = (size: number) => {
    setLocalGrid(size);
    // setGridSize(size);
  };

  const presets = [
    { label: "Fine", size: 5 },
    { label: "10mm", size: 10 },
    { label: "20mm", size: 20 },
    { label: "50mm", size: 50 },
    { label: "100mm", size: 100 },
  ];

  return (
    <div className="absolute top-16 left-14 z-50 w-64 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Grid3x3 className="h-3.5 w-3.5 text-blue-500" /> Grid & Snap
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>
      </div>
      <div className="p-3 space-y-3">
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground block mb-1">Grid Size</label>
          <div className="flex gap-1">
            {presets.map(p => (
              <Button key={p.size} variant={gridSize === p.size ? "secondary" : "outline"} size="sm" className="flex-1 text-[9px] h-6" onClick={() => applyGrid(p.size)}>
                {p.label}
              </Button>
            ))}
          </div>
          <Input type="number" value={gridSize} onChange={e => applyGrid(+e.target.value)} className="h-7 text-xs mt-1" min="1" max="200" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground block mb-1">Grid Style</label>
          <div className="flex gap-1">
            {(["dots", "lines", "cross"] as const).map(s => (
              <Button key={s} variant={gridStyle === s ? "secondary" : "outline"} size="sm" className="flex-1 text-[9px] h-6 capitalize" onClick={() => setGridStyle(s)}>
                {s}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={snapToGrid} onChange={() => toggleSnapToGrid()} />
            <Magnet className="h-3 w-3" /> Snap to Grid
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} />
            Show Grid
          </label>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">Magnetic strength: {magnetStrength}px</label>
          <input type="range" min="1" max="50" value={magnetStrength} onChange={e => setMagnetStrength(+e.target.value)} className="w-full h-1.5 accent-primary" />
        </div>
      </div>
    </div>
  );
};
