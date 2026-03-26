"use client";

import { useState } from "react";
import { X, CloudRainWind, ThermometerSun, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExtremeWeatherSim = ({ onClose }: { onClose: () => void }) => {
  const [simActive, setSimActive] = useState(false);

  return (
    <div className="absolute top-[18%] right-[32%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-sky-500/10 font-semibold text-xs text-sky-600">
        <div className="flex items-center gap-2">
          <CloudRainWind className="w-4 h-4" /> Extreme Weather Simulation
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Ingest live meteorological API data to simulate structural/electrical stress on external substations and solar arrays during severe weather events.
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <Button variant="outline" className={`h-16 flex flex-col items-center gap-1 border-sky-200 ${simActive ? 'bg-sky-50 border-sky-400' : ''}`} onClick={() => setSimActive(!simActive)}>
            <CloudRainWind className="w-5 h-5 text-sky-500" />
            <span className="text-[9px] font-bold">Category 4 Typhoon</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center gap-1 border-orange-200">
            <ThermometerSun className="w-5 h-5 text-orange-500" />
            <span className="text-[9px] font-bold">Heatwave (45°C)</span>
          </Button>
        </div>

        {simActive && (
          <div className="space-y-2 border border-sky-200 rounded p-2 bg-sky-50/50 text-[10px]">
            <div className="font-bold flex items-center gap-1 text-sky-900 border-b pb-1">
              <AlertTriangle className="w-3 h-3 text-red-500" /> SIMULATION IMPACT REPORT
            </div>
            <div className="space-y-1 font-mono text-muted-foreground">
              <div className="flex justify-between"><span>Wind Shear Stress:</span><span className="text-red-500">CRITICAL</span></div>
              <div className="flex justify-between"><span>Solar Array Yield:</span><span>-85% (Clouds)</span></div>
              <div className="flex justify-between"><span>Tower 44 Tension:</span><span className="text-red-500 font-bold">EXCEEDED</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
