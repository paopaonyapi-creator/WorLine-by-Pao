"use client";

import { useState } from "react";
import { X, Rocket, Zap, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SpaceLaunchPulse = ({ onClose }: { onClose: () => void }) => {
  const [pulse, setPulse] = useState(false);

  const fire = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 2000);
  };

  return (
    <div className="absolute top-[20%] right-[15%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-fuchsia-950/20 font-semibold text-xs text-fuchsia-500">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4" /> Orbital Launch Pulse Sim
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-fuchsia-400 font-mono rounded-b-xl border-x border-b border-fuchsia-900/30">
        <div className="text-[10px] leading-tight text-fuchsia-600/70 mb-2 font-sans">
          Simulate the enormous 0.5-second pulse power draw of an Electromagnetic Space Catapult (SpinLaunch/Tether). Tests supercapacitor banks.
        </div>

        <div className="h-24 bg-zinc-900 border border-fuchsia-900/50 rounded flex items-end justify-center relative overflow-hidden p-2 gap-1">
          <div className="absolute top-2 left-2 text-[9px] text-zinc-500">Power Draw (GW)</div>
          <div className="w-8 bg-zinc-800 rounded-t h-[10%] transition-none"></div>
          <div className="w-8 bg-zinc-800 rounded-t h-[10%] transition-none"></div>
          <div className={`w-12 rounded-t transition-all duration-100 ${pulse ? 'h-[100%] bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.8)]' : 'h-[10%] bg-zinc-800'}`}></div>
          <div className={`w-8 rounded-t transition-all duration-700 ${pulse ? 'h-[40%] bg-fuchsia-800' : 'h-[10%] bg-zinc-800'}`}></div>
          <div className="w-8 bg-zinc-800 rounded-t h-[10%] transition-none"></div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="border border-fuchsia-900/50 bg-fuchsia-950/20 p-1.5 rounded">
            <span className="text-zinc-500 block">Baseline Load</span>
            <span className="font-bold">450 MW</span>
          </div>
          <div className={`border p-1.5 rounded transition-colors ${pulse ? 'border-fuchsia-500 bg-fuchsia-900/50' : 'border-fuchsia-900/50 bg-fuchsia-950/20'}`}>
            <span className="text-zinc-500 block">Pulse Peak (t=0.1s)</span>
            <span className={`font-bold ${pulse ? 'text-white' : ''}`}>18.5 GW</span>
          </div>
        </div>

        <Button className="w-full text-xs h-8 bg-fuchsia-900 hover:bg-fuchsia-800 text-fuchsia-100 shadow-none font-sans" onMouseDown={fire}>
          <Zap className="w-3.5 h-3.5 mr-2" /> Fire Electromagnetic Catapult
        </Button>
      </div>
    </div>
  );
};
