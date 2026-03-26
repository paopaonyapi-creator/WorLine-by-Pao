"use client";

import { useState } from "react";
import { X, Layers, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MultiverseTimeline = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[25%] left-[30%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-blue-950/20 font-semibold text-xs text-blue-500">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" /> Multiverse Grid Timeline Viewer
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-blue-400 font-mono rounded-b-xl border-x border-b border-blue-900/30">
        <div className="text-[10px] leading-tight text-blue-600/70 mb-2 font-sans">
          Quantum simulation evaluates 1,024 parallel future timelines of the grid simultaneously over a 30-year span.
        </div>

        <div className="space-y-1">
          <div className="border border-blue-900/50 bg-blue-950/30 p-2 rounded text-[9px] flex justify-between items-center cursor-pointer hover:bg-blue-900/50">
            <div><span className="text-blue-500 font-bold">Timeline Alpha-1</span> (Current)</div>
            <div className="text-right"><div className="text-red-400">Cost: $240M</div><div>Carbon: 12k T</div></div>
          </div>
          <div className="border border-emerald-900/50 bg-emerald-950/30 p-2 rounded text-[9px] flex justify-between items-center cursor-pointer hover:bg-emerald-900/50 relative overflow-hidden group">
            <div className="absolute inset-0 border-2 border-emerald-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div><span className="text-emerald-500 font-bold">Timeline Sigma-X</span> (Optimal)</div>
            <div className="text-right"><div className="text-emerald-400">Cost: $185M</div><div>Carbon: 0 T</div></div>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 p-2 rounded text-[9px] flex justify-between items-center opacity-50">
            <div><span className="text-zinc-500 font-bold">Timeline Beta-4</span> (Void)</div>
            <div className="text-right"><div className="text-red-900">Blackout Event Year 12</div></div>
          </div>
        </div>

        <Button className="w-full text-[11px] h-8 bg-blue-900 hover:bg-blue-800 text-blue-100 shadow-none font-sans">
          <Route className="w-3.5 h-3.5 mr-2" /> Shift to Sigma-X Timeline
        </Button>
      </div>
    </div>
  );
};
