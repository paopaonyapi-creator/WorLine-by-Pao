"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { X, Paintbrush, Square, Circle as CircleIcon, Minus, Triangle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type ShapeItem = {
  type: "rect" | "circle" | "line" | "triangle";
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

export const CustomSymbolCreator = ({ onClose }: { onClose: () => void }) => {
  const { addObject, panX, panY, zoom } = useEditorStore();
  const [name, setName] = useState("");
  const [shapes, setShapes] = useState<ShapeItem[]>([]);
  const [activePrimitive, setActivePrimitive] = useState<ShapeItem["type"]>("rect");
  const [color, setColor] = useState("#000000");

  const handleAddShape = () => {
    const base = 30;
    setShapes(prev => [
      ...prev,
      {
        type: activePrimitive,
        x: 10 + prev.length * 5,
        y: 10 + prev.length * 5,
        w: activePrimitive === "line" ? 40 : base,
        h: activePrimitive === "line" ? 2 : base,
        color,
      },
    ]);
  };

  const handleSaveAsSymbol = () => {
    if (!name.trim()) {
      toast.error("Please name your symbol");
      return;
    }
    if (shapes.length === 0) {
      toast.error("Add at least one shape");
      return;
    }

    // Save custom symbol definition to localStorage
    const customSymbols = JSON.parse(localStorage.getItem("worline-custom-symbols") || "[]");
    const symbolDef = {
      id: `custom_${uuidv4().slice(0, 8)}`,
      displayName: name,
      category: "Custom",
      shapes,
      width: 60,
      height: 60,
    };
    customSymbols.push(symbolDef);
    localStorage.setItem("worline-custom-symbols", JSON.stringify(customSymbols));

    // Place on canvas immediately
    const canvasContainer = document.getElementById("canvas-container");
    const rect = canvasContainer?.getBoundingClientRect();
    const w = rect ? rect.width : window.innerWidth;
    const h = rect ? rect.height : window.innerHeight;
    const centerX = -panX / zoom + (w / 2) / zoom;
    const centerY = -panY / zoom + (h / 2) / zoom;

    addObject({
      type: "symbol",
      symbolId: "custom_block",
      x: centerX - 30,
      y: centerY - 30,
      rotation: 0,
      zIndex: 1,
      connections: [],
      label: name,
    } as any);

    toast.success(`Custom symbol "${name}" saved!`);
    onClose();
  };

  const primitives = [
    { type: "rect" as const, icon: Square, label: "Rectangle" },
    { type: "circle" as const, icon: CircleIcon, label: "Circle" },
    { type: "line" as const, icon: Minus, label: "Line" },
    { type: "triangle" as const, icon: Triangle, label: "Triangle" },
  ];

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Paintbrush className="h-4 w-4 text-primary" />
          Custom Symbol Creator
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {/* Symbol Name */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-1">Symbol Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Custom Relay, Special Switch"
            className="text-sm"
          />
        </div>

        {/* Primitive Tools */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Add Shapes</label>
          <div className="flex gap-2 mb-2">
            {primitives.map((p) => {
              const Icon = p.icon;
              return (
                <Button
                  key={p.type}
                  variant={activePrimitive === p.type ? "secondary" : "outline"}
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => setActivePrimitive(p.type)}
                >
                  <Icon className="h-3.5 w-3.5" /> {p.label}
                </Button>
              );
            })}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <Button size="sm" onClick={handleAddShape} className="text-xs">
              + Add Shape
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Preview</label>
          <div className="w-full h-32 border rounded-lg bg-white dark:bg-zinc-900 relative overflow-hidden">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              {shapes.map((s, i) => {
                if (s.type === "rect") return (
                  <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} fill="none" stroke={s.color} strokeWidth={2} />
                );
                if (s.type === "circle") return (
                  <circle key={i} cx={s.x + s.w / 2} cy={s.y + s.h / 2} r={s.w / 2} fill="none" stroke={s.color} strokeWidth={2} />
                );
                if (s.type === "line") return (
                  <line key={i} x1={s.x} y1={s.y + s.h / 2} x2={s.x + s.w} y2={s.y + s.h / 2} stroke={s.color} strokeWidth={2} />
                );
                if (s.type === "triangle") return (
                  <polygon key={i} points={`${s.x + s.w / 2},${s.y} ${s.x},${s.y + s.h} ${s.x + s.w},${s.y + s.h}`} fill="none" stroke={s.color} strokeWidth={2} />
                );
                return null;
              })}
              {shapes.length === 0 && (
                <text x="40" y="42" textAnchor="middle" fontSize="6" fill="#999">Add shapes above</text>
              )}
            </svg>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{shapes.length} shapes</p>
        </div>
      </div>

      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1 gap-2" onClick={handleSaveAsSymbol}>
          <Save className="h-4 w-4" /> Save & Place
        </Button>
      </div>
    </div>
  );
};
