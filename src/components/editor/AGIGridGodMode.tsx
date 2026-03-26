"use client";

import { useState } from "react";
import { X, Network, Cpu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AGIGridGodMode = ({ onClose }: { onClose: () => void }) => {
  const [computing, setComputing] = useState(false);

  const triggerSingularity = () => {
    setComputing(true);
    setTimeout(() => {
      setComputing(false);
    }, 4500);
  };

  return (
    <div className="absolute top-[40%] left-[40%] w-[340px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-violet-950/20 font-semibold text-xs text-violet-500">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" /> AGI Grid Architect (God-Mode)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-violet-400 font-mono rounded-b-xl border-x border-b border-violet-900/30">
        <div className="text-[10px] leading-tight text-violet-600/70 mb-2">
          Unleash Artificial General Intelligence (AGI) to autonomously erase, redesign, and optimize the entire megacity power grid across a 50-year horizon.
        </div>

        {computing ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-3 border border-violet-900/50 bg-violet-950/20 rounded">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            <div className="text-[10px] text-violet-400 animate-pulse text-center space-y-1">
              <div>Simulating 1,402,394 architectural permutations...</div>
              <div>Rewriting transformer vector nodes...</div>
              <div>Bypassing human engineering constraints...</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border border-violet-900/50 bg-violet-950/20 rounded p-2 text-[9px] flex items-center justify-between">
              <span className="text-violet-600/70">Current Structural Entropy:</span>
              <span className="text-red-400 font-bold">84% (Highly Inefficient)</span>
            </div>
            
            <Button className="w-full text-[11px] h-9 bg-violet-900 hover:bg-violet-800 text-violet-100 border border-violet-700 shadow-[0_0_15px_rgba(139,92,246,0.2)] font-sans" onClick={triggerSingularity}>
              <Network className="w-4 h-4 mr-2" /> Handover Control to AGI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
