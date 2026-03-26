"use client";

import { useState } from "react";
import { X, Thermometer, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThermalIRMap = ({ onClose }: { onClose: () => void }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="absolute top-32 right-[30%] w-[280px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-red-500/10 font-semibold text-xs text-red-600">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4" /> Thermal IR Simulation
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Applies a heat-map overlay to the SLD based on current Flow vs Rating, simulating infrared thermography for switchboard hotspots.
        </div>

        <div className="h-4 w-full rounded overflow-hidden flex text-[8px] font-bold text-white text-center">
          <div className="flex-1 bg-blue-500 flex items-center justify-center">20°C</div>
          <div className="flex-1 bg-green-500 flex items-center justify-center">40°C</div>
          <div className="flex-1 bg-yellow-500 flex items-center justify-center">60°C</div>
          <div className="flex-1 bg-orange-500 flex items-center justify-center">80°C</div>
          <div className="flex-1 bg-red-600 flex items-center justify-center">&gt;90°C</div>
        </div>

        <Button 
          variant={active ? "destructive" : "default"} 
          className="w-full h-8 text-xs font-medium"
          onClick={() => setActive(!active)}
        >
          {active ? (
            <><Thermometer className="w-3.5 h-3.5 mr-2" /> Disable Thermal Layer</>
          ) : (
            <><Flame className="w-3.5 h-3.5 mr-2 text-rose-300" /> Enable IR Heatmap</>
          )}
        </Button>
      </div>
    </div>
  );
};
