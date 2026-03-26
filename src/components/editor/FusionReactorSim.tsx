"use client";

import { useState, useEffect } from "react";
import { X, Atom, Zap, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FusionReactorSim = ({ onClose }: { onClose: () => void }) => {
  const [plasma, setPlasma] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setPlasma(p => (p < 150 ? p + 5 + Math.random() * 5 : 150 + Math.random() * 2));
    }, 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="absolute top-[15%] right-[10%] w-[340px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-cyan-950/20 font-semibold text-xs text-cyan-500">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4" /> Tokamak Fusion Reactor Sim
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-cyan-400 font-mono rounded-b-xl border-x border-b border-cyan-900/30">
        <div className="text-[10px] leading-tight text-cyan-600/70 mb-2">
          Simulate nuclear fusion D-T plasma ignition parameters. Connect superconducting magnets to the SLD bus to power the confinement field.
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="border border-cyan-900/50 bg-cyan-950/20 rounded p-2 space-y-1">
            <div className="text-cyan-600/70 font-bold border-b border-cyan-900/50 pb-1 flex justify-between">
              <span>Plasma Temp</span>
              <Thermometer className="w-3 h-3 text-rose-500" />
            </div>
            <div className="text-xl text-rose-400 font-bold">{plasma.toFixed(1)} M°C</div>
            <div className="text-[8px] text-cyan-600/70">Target: 150.0 M°C</div>
          </div>
          
          <div className="border border-cyan-900/50 bg-cyan-950/20 rounded p-2 space-y-1">
            <div className="text-cyan-600/70 font-bold border-b border-cyan-900/50 pb-1 flex justify-between">
              <span>Magnetic Field</span>
              <Zap className="w-3 h-3 text-yellow-500" />
            </div>
            <div className="text-xl text-yellow-400 font-bold">12.4 T</div>
            <div className="text-[8px] text-cyan-600/70">Coil Current: 40 kA</div>
          </div>
        </div>

        <div className="text-[9px] flex items-center justify-center gap-2 py-1">
          <span className="text-cyan-600/70">Q-Factor:</span>
          <span className={`font-bold ${plasma >= 150 ? 'text-emerald-400' : 'text-red-400'}`}>
            {plasma >= 150 ? '1.25 (Net Energy Gain)' : '0.85 (Breakeven approaching)'}
          </span>
        </div>

        <Button className={`w-full text-xs h-8 shadow-none font-sans ${plasma >= 150 ? 'bg-emerald-900 hover:bg-emerald-800 text-emerald-100 border border-emerald-700' : 'bg-cyan-900 hover:bg-cyan-800 text-cyan-100 border border-cyan-700'}`}>
          {plasma >= 150 ? "Distribute Net Energy to Grid" : "Inject Neutral Beams"}
        </Button>
      </div>
    </div>
  );
};
