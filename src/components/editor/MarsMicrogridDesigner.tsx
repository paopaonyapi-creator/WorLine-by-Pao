"use client";

import { useState } from "react";
import { X, Rocket, Orbit, Earth } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MarsMicrogridDesigner = ({ onClose }: { onClose: () => void }) => {
  const [planet, setPlanet] = useState("mars");

  return (
    <div className="absolute top-20 right-20 w-[340px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-orange-950/20 font-semibold text-xs text-orange-600">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4" /> Interplanetary Microgrid Designer
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-orange-500 font-mono rounded-b-xl border-x border-b border-orange-900/30">
        <div className="text-[10px] leading-tight text-orange-600/70 mb-2">
          Calculate load profiles, atmospheric resistance, and space-based solar yields for off-world colonization phases.
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-orange-400">Target Celestial Body</span>
          <select 
            value={planet} 
            onChange={(e) => setPlanet(e.target.value)}
            className="w-32 h-7 text-xs bg-zinc-900 border border-orange-800 text-orange-500 rounded px-2 outline-none"
          >
            <option value="mars">Mars (Jezero)</option>
            <option value="moon">Luna (Shackleton)</option>
            <option value="titan">Titan</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px] my-2">
          <div className="border border-orange-900/50 bg-orange-950/30 rounded p-2">
            <div className="text-orange-600/70">Gravity (g)</div>
            <div className="font-bold text-orange-400">{planet === 'mars' ? '3.72' : planet === 'moon' ? '1.62' : '1.35'} m/s²</div>
          </div>
          <div className="border border-orange-900/50 bg-orange-950/30 rounded p-2">
            <div className="text-orange-600/70">Solar Irradiance</div>
            <div className="font-bold text-orange-400">{planet === 'mars' ? '590' : planet === 'moon' ? '1361' : '14'} W/m²</div>
          </div>
        </div>

        <div className="border border-red-900/50 bg-red-950/20 rounded p-2 text-[9px] flex items-start gap-1.5 leading-tight">
          <Orbit className="w-3.5 h-3.5 shrink-0 text-red-500 mt-0.5" />
          <span className="text-red-400">WARNING: Martian dust storm incoming (Opacity: Tau 4.5). Solar yield predicted to drop by 82% over the next 48 Sols. Switch to Kilopower Fission Reactor back-up.</span>
        </div>

        <Button className="w-full text-xs h-8 bg-orange-800 hover:bg-orange-700 text-white shadow-none font-sans">
          <Earth className="w-3.5 h-3.5 mr-2" /> Sync Terraform Grid
        </Button>
      </div>
    </div>
  );
};
