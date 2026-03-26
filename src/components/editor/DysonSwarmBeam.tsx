"use client";

import { useState } from "react";
import { X, Sun, Satellite, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DysonSwarmBeam = ({ onClose }: { onClose: () => void }) => {
  const [beamIntensity, setBeamIntensity] = useState([45]);

  return (
    <div className="absolute top-[30%] right-[30%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-amber-950/20 font-semibold text-xs text-amber-500">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4" /> Orbital Power Beaming (Dyson Swarm)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-amber-500 font-mono rounded-b-xl border-x border-b border-amber-900/30">
        <div className="text-[10px] leading-tight text-amber-600/70 mb-2">
          Simulate gigawatt microwave/laser energy transmission from LEO solar satellites to terrestrial rectenna receiving stations.
        </div>

        <div className="border border-amber-900/50 bg-amber-950/30 rounded p-4 text-center space-y-3 relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-500/20 to-transparent" style={{ opacity: beamIntensity[0] / 100 }}></div>
          <div className="relative z-10 flex flex-col items-center">
            <Sun className="w-6 h-6 text-yellow-400 mb-4 animate-spin-slow" />
            <div className="w-1 h-12 bg-amber-400 rounded-full" style={{ opacity: beamIntensity[0] / 100, boxShadow: `0 0 ${beamIntensity[0]}px 2px rgba(251,191,36,0.8)` }}></div>
            <div className="mt-2 text-xs font-bold text-amber-400">{(beamIntensity[0] * 2.4).toFixed(1)} GW Receiving</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-amber-600/70">
            <span>Laser Intensity</span>
            <span>{beamIntensity[0]}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={beamIntensity[0]} 
            onChange={(e) => setBeamIntensity([+e.target.value])}
            className="w-full accent-amber-500" 
          />
        </div>

        {beamIntensity[0] > 85 && (
          <div className="flex items-center gap-2 text-red-500 text-[9px] bg-red-950/30 p-1.5 rounded border border-red-900/50">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> Ionospheric scattering exceeds safe limits. Risk of localized atmospheric ignition.
          </div>
        )}
      </div>
    </div>
  );
};
