"use client";

import { useState, useEffect } from "react";
import { X, ShieldAlert, BatteryWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AntimatterUPS = ({ onClose }: { onClose: () => void }) => {
  const [containment, setContainment] = useState(100);

  useEffect(() => {
    const i = setInterval(() => {
      setContainment(v => (v > 98 ? v - 0.01 : v));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="absolute top-[25%] right-[25%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-rose-950/20 font-semibold text-xs text-rose-500">
        <div className="flex items-center gap-2">
          <BatteryWarning className="w-4 h-4" /> Antimatter UPS Containment
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-rose-400 font-mono rounded-b-xl border-x border-b border-rose-900/30">
        <div className="text-[10px] leading-tight text-rose-600/70 mb-2 font-sans">
          Monitor magnetic confinement fields for the Antimatter Backup Core (1g = 43 Kilotons TNT equivalent). Provides 1 Petawatt-Hour backup.
        </div>

        <div className="flex flex-col items-center justify-center p-3 border border-rose-900/50 bg-rose-950/20 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/40 to-transparent"></div>
          <ShieldAlert className="w-8 h-8 text-rose-500 mb-2 relative z-10 animate-pulse" />
          <div className="text-[10px] text-rose-600/70 relative z-10">Magnetic Bottle Integrity</div>
          <div className="text-2xl font-bold text-white relative z-10">{containment.toFixed(2)}%</div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="border border-rose-900/30 p-1.5 rounded">
            <span className="text-rose-600/70 block">Stored Energy</span>
            <span className="font-bold">14.2 PWh</span>
          </div>
          <div className="border border-rose-900/30 p-1.5 rounded">
            <span className="text-rose-600/70 block">Time to Annihilation</span>
            <span className="font-bold text-emerald-400">Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
