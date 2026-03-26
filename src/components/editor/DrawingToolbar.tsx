"use client";

import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import {
  Pencil, Square, Circle, ArrowUpRight, Ruler, Minus, 
  Group, Ungroup, Hash, Layers, ToggleLeft, ToggleRight, MousePointer2, Hand
} from "lucide-react";
import { toast } from "sonner";

export const DrawingToolbar = () => {
  const {
    activeTool, setActiveTool,
    orthoMode, toggleOrthoMode,
    activeLayer, setActiveLayer,
    groupSelected, ungroupSelected,
    autoNumberSymbols,
    selectedIds,
  } = useEditorStore();

  const tools = [
    { id: "select" as const, icon: MousePointer2, label: "Select", shortcut: "V" },
    { id: "pan" as const, icon: Hand, label: "Pan / Hand", shortcut: "H" },
    { id: "pencil" as const, icon: Pencil, label: "Freehand", shortcut: "F" },
    { id: "shape" as const, icon: Square, label: "Rectangle", shortcut: "D" },
    { id: "arrow" as const, icon: ArrowUpRight, label: "Arrow", shortcut: "A" },
    { id: "dimension" as const, icon: Ruler, label: "Dimension", shortcut: "M" },
    { id: "busbar" as const, icon: Minus, label: "Bus Bar", shortcut: "B" },
  ];

  const layers = [
    { id: "power" as const, label: "Power", color: "bg-red-500" },
    { id: "control" as const, label: "Control", color: "bg-blue-500" },
    { id: "ground" as const, label: "Ground", color: "bg-green-500" },
    { id: "annotation" as const, label: "Note", color: "bg-yellow-500" },
  ];

  return (
    <div className="flex flex-col gap-1 p-2 bg-background/95 backdrop-blur border-r w-12 items-center shrink-0 shadow-md md:shadow-none z-50 rounded-r-lg md:rounded-none">
      {/* Drawing tools */}
      {tools.map(tool => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "secondary" : "ghost"}
            size="icon"
            className="w-7 h-7"
            onClick={() => setActiveTool(tool.id)}
            title={`${tool.label} (${tool.shortcut})`}
          >
            <Icon className="h-3.5 w-3.5" />
          </Button>
        );
      })}

      <div className="w-full h-px bg-border my-1" />

      {/* Ortho Mode */}
      <Button
        variant={orthoMode ? "secondary" : "ghost"}
        size="icon"
        className="w-7 h-7"
        onClick={() => {
          toggleOrthoMode();
          toast.success(orthoMode ? "Ortho OFF" : "Ortho ON (H/V only)");
        }}
        title="Ortho Mode (lock H/V)"
      >
        {orthoMode ? <ToggleRight className="h-3.5 w-3.5 text-primary" /> : <ToggleLeft className="h-3.5 w-3.5" />}
      </Button>

      <div className="w-full h-px bg-border my-1" />

      {/* Group/Ungroup */}
      <Button
        variant="ghost"
        size="icon"
        className="w-7 h-7"
        onClick={() => {
          groupSelected();
          toast.success("Grouped");
        }}
        disabled={selectedIds.length < 2}
        title="Group (Ctrl+G)"
      >
        <Group className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-7 h-7"
        onClick={() => {
          ungroupSelected();
          toast.success("Ungrouped");
        }}
        disabled={selectedIds.length === 0}
        title="Ungroup (Ctrl+Shift+G)"
      >
        <Ungroup className="h-3.5 w-3.5" />
      </Button>

      <div className="w-full h-px bg-border my-1" />

      {/* Auto Number */}
      <Button
        variant="ghost"
        size="icon"
        className="w-7 h-7"
        onClick={() => {
          autoNumberSymbols();
          toast.success("Auto numbered!");
        }}
        title="Auto Number Symbols"
      >
        <Hash className="h-3.5 w-3.5" />
      </Button>

      <div className="w-full h-px bg-border my-1" />

      {/* Layer indicator */}
      <div className="flex flex-col gap-0.5">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(l.id)}
            className={`w-7 h-2.5 rounded-sm transition-all ${l.color} ${
              activeLayer === l.id ? "opacity-100 ring-1 ring-foreground" : "opacity-30"
            }`}
            title={l.label}
          />
        ))}
      </div>
    </div>
  );
};
