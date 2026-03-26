"use client";

import { useState } from "react";
import { X, Sun, BatteryFull } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SolarPVSizing = ({ onClose }: { onClose: () => void }) => {
  const [panelWatt, setPanelWatt] = useState(550);
  const [targetKw, setTargetKw] = useState(100);

  const totalPanels = Math.ceil((targetKw * 1000) / panelWatt);
  const areaReq = (totalPanels * 2.58).toFixed(1); // avg 2.58 sqm per 550W panel
  const strSize = 18; // generic string
  const totalStrings = Math.ceil(totalPanels / strSize);

  return (
    <div className="absolute top-20 left-20 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-amber-500/10 text-amber-600 font-semibold text-xs">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" /> Solar PV Array Sizing
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="text-muted-foreground">Target Capacity (kWp)</label>
            <Input type="number" className="w-20 h-6 text-xs text-right" value={targetKw} onChange={e => setTargetKw(+e.target.value)} />
          </div>
          <div className="flex justify-between items-center text-xs">
            <label className="text-muted-foreground">Panel Wattage (W)</label>
            <Input type="number" className="w-20 h-6 text-xs text-right" value={panelWatt} onChange={e => setPanelWatt(+e.target.value)} />
          </div>
        </div>

        <div className="border rounded-lg bg-muted/20 divide-y text-xs">
          <div className="flex justify-between p-2">
            <span className="text-muted-foreground">Total Panels:</span>
            <span className="font-bold font-mono">{totalPanels} pcs</span>
          </div>
          <div className="flex justify-between p-2 bg-amber-500/5">
            <span className="text-muted-foreground">Roof Area Req:</span>
            <span className="font-bold">{areaReq} m²</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-muted-foreground">Optimal Strings:</span>
            <span className="font-bold">{totalStrings} strings (x18)</span>
          </div>
        </div>

        <button className="w-full mt-2 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs transition-colors flex items-center justify-center gap-2 font-medium">
          <BatteryFull className="w-3 h-3" /> Insert Solar Array to Canvas
        </button>
      </div>
    </div>
  );
};
