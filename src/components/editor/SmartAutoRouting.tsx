"use client";

import { useState } from "react";
import { X, Route, Zap } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

export const SmartAutoRouting = ({ onClose }: { onClose: () => void }) => {
  const [avoidObstacles, setAvoidObstacles] = useState(true);
  const [minimizeCrossings, setMinimizeCrossings] = useState(true);
  const [autoBusbar, setAutoBusbar] = useState(false);
  const { toggleOrthoMode, orthoMode } = useEditorStore();

  return (
    <div className="absolute top-20 right-60 w-64 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 font-semibold text-xs">
        <div className="flex items-center gap-2 text-teal-500">
          <Route className="w-4 h-4" /> Smart Auto-Routing
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Orthogonal Routing</span>
              <span className="text-[9px] text-muted-foreground">Force 90° angles</span>
            </div>
            <input type="checkbox" checked={orthoMode} onChange={toggleOrthoMode} className="accent-teal-500 w-4 h-4 cursor-pointer" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Obstacle Avoidance</span>
              <span className="text-[9px] text-muted-foreground">A* pathfinding around symbols</span>
            </div>
            <input type="checkbox" checked={avoidObstacles} onChange={(e) => setAvoidObstacles(e.target.checked)} className="accent-teal-500 w-4 h-4 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Minimize Crossings</span>
              <span className="text-[9px] text-muted-foreground">Add junction dots automatically</span>
            </div>
            <input type="checkbox" checked={minimizeCrossings} onChange={(e) => setMinimizeCrossings(e.target.checked)} className="accent-teal-500 w-4 h-4 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium">Auto Busbar Attach</span>
              <span className="text-[9px] text-muted-foreground">Snap wires to nearest busbar</span>
            </div>
            <input type="checkbox" checked={autoBusbar} onChange={(e) => setAutoBusbar(e.target.checked)} className="accent-teal-500 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <button className="w-full py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded text-[10px] font-medium transition-colors flex items-center justify-center gap-1.5">
          <Zap className="w-3 h-3" /> Re-route All Current Wires
        </button>
      </div>
    </div>
  );
};
