"use client";

import { useEditorStore } from "@/store/editorStore";
import { useState, useEffect } from "react";

export const CrosshairOverlay = () => {
  const { activeTool } = useEditorStore();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("canvas-container");
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible || activeTool === "select") return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-primary/30"
        style={{ left: pos.x }}
      />
      {/* Horizontal line */}
      <div
        className="absolute left-0 right-0 h-px bg-primary/30"
        style={{ top: pos.y }}
      />
      {/* Coordinates badge */}
      <div
        className="absolute bg-background/90 text-[10px] font-mono px-1.5 py-0.5 rounded border shadow-sm"
        style={{ left: pos.x + 12, top: pos.y + 12 }}
      >
        {Math.round(pos.x)}, {Math.round(pos.y)}
      </div>
    </div>
  );
};
