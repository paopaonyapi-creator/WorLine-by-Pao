"use client";

import { useState } from "react";
import { X, Snowflake, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SuperconductorLines = ({ onClose }: { onClose: () => void }) => {
  const [cryo, setCryo] = useState(false);

  return (
    <div className="absolute top-[35%] left-[15%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-sky-950/20 font-semibold text-xs text-sky-500">
        <div className="flex items-center gap-2">
          <Snowflake className="w-4 h-4" /> Superconductor (0% Drop) Lines
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-sky-400 font-mono rounded-b-xl border-x border-b border-sky-900/30">
        <div className="text-[10px] leading-tight text-sky-600/70 mb-2 font-sans">
          Convert selected transmission lines to cryogenic High-Temperature Superconductors (HTS). Achieves exactly 0.00% Voltage Drop across planetary distances.
        </div>

        <div className="flex items-center justify-between border border-sky-900/50 bg-sky-950/30 rounded p-2 text-xs">
          <span>Liquid N2 Cryo-Cooling (77K)</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={cryo} onChange={() => setCryo(!cryo)} />
            <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
          </label>
        </div>

        {cryo ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] bg-sky-900/20 p-1.5 rounded">
              <span className="text-sky-600/80">Line Resistance (R):</span>
              <span className="font-bold text-sky-300">0.00000 Ω/km</span>
            </div>
            <div className="flex justify-between items-center text-[9px] bg-sky-900/20 p-1.5 rounded">
              <span className="text-sky-600/80">Max Ampacity:</span>
              <span className="font-bold text-sky-300">Infinite (100 kA+)</span>
            </div>
            <div className="flex justify-between items-center text-[9px] bg-emerald-950/40 border border-emerald-900/50 p-1.5 rounded">
              <span className="text-emerald-500/80">Voltage Drop 12,000 km:</span>
              <span className="font-bold text-emerald-400">0.00 %</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-[10px] text-zinc-500 py-3 italic">
            Standard ACSR conductors active. High I²R losses detected over 50km.
          </div>
        )}
      </div>
    </div>
  );
};
