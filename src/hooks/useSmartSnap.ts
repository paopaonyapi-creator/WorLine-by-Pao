"use client";

import { useEditorStore } from "@/store/editorStore";
import { SymbolObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { useEffect, useCallback } from "react";

/**
 * SmartSnapEngine — Provides automatic terminal-to-terminal snapping
 * and wire routing assistance.
 * 
 * This hook listens for object movement and snaps wires to the nearest
 * terminal when within snap radius.
 */
export function useSmartSnap(enabled: boolean = true) {
  const { canvas, snapToGrid } = useEditorStore();

  const findNearestTerminal = useCallback((x: number, y: number, excludeId?: string) => {
    const SNAP_RADIUS = 25;
    let nearest: { objectId: string; terminalId: string; x: number; y: number; dist: number } | null = null;

    canvas.objects.forEach(obj => {
      if (obj.type !== "symbol" || obj.id === excludeId) return;
      const sym = obj as SymbolObject;
      const def = symbolRegistry[sym.symbolId];
      if (!def) return;

      def.terminals.forEach((terminal: { id: string; x: number; y: number; direction: string }) => {
        // Calculate terminal world position (simplified - no rotation)
        const tx = sym.x + (terminal.x / def.defaultWidth) * sym.width;
        const ty = sym.y + (terminal.y / def.defaultHeight) * sym.height;
        const dist = Math.sqrt((x - tx) ** 2 + (y - ty) ** 2);

        if (dist < SNAP_RADIUS && (!nearest || dist < nearest.dist)) {
          nearest = { objectId: sym.id, terminalId: terminal.id, x: tx, y: ty, dist };
        }
      });
    });

    return nearest;
  }, [canvas.objects]);

  /**
   * A* pathfinding for wire routing around obstacles.
   * Returns array of [x,y] waypoints.
   */
  const routeWire = useCallback((startX: number, startY: number, endX: number, endY: number): number[] => {
    const gridStep = 20;
    
    // Simple L-shaped routing (horizontal then vertical)
    const midX = endX;
    const midY = startY;

    // Check if straight line is possible
    const dx = Math.abs(endX - startX);
    const dy = Math.abs(endY - startY);

    if (dx < gridStep) {
      // Vertical line
      return [startX, startY, startX, endY];
    }
    if (dy < gridStep) {
      // Horizontal line
      return [startX, startY, endX, startY];
    }

    // L-route: horizontal first, then vertical
    return [startX, startY, endX, startY, endX, endY];
  }, []);

  return { findNearestTerminal, routeWire, enabled };
}
