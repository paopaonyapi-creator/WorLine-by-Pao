"use client";

import { useState } from "react";
import { X, CarFront, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EVFleetOptimizer = ({ onClose }: { onClose: () => void }) => {
  const [evCount, setEvCount] = useState(500);

  return (
    <div className="absolute top-24 left-24 w-[340px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-lime-500/10 font-semibold text-xs text-lime-600">
        <div className="flex items-center gap-2">
          <CarFront className="w-4 h-4" /> EV Fleet V2G Optimizer
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Simulate massive EV fleet charging (V1G) and Vehicle-to-Grid (V2G) discharge profiles. AI will optimize charging curves to prevent transformer overload.
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="text-muted-foreground font-semibold">Number of Evs Connected</label>
          <Input type="number" className="w-20 h-7 text-xs font-mono" value={evCount} onChange={e => setEvCount(+e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] my-2">
          <div className="border border-lime-200 bg-lime-50 rounded p-2">
            <div className="text-muted-foreground">V2G Potential</div>
            <div className="font-mono font-bold text-lime-700 text-sm">{(evCount * 0.045).toFixed(1)} MW</div>
          </div>
          <div className="border border-rose-200 bg-rose-50 rounded p-2">
            <div className="text-muted-foreground">Max Charging Load</div>
            <div className="font-mono font-bold text-rose-700 text-sm">{(evCount * 0.120).toFixed(1)} MW</div>
          </div>
        </div>

        {evCount > 200 && (
          <div className="bg-yellow-500/10 text-yellow-700 border border-yellow-500/30 p-2 rounded text-[9px] flex items-center gap-1.5 leading-tight">
            <Zap className="w-4 h-4 shrink-0 text-yellow-600" />
            Warning: Uncoordinated charging will exceed Main TR-01 limits (2000kVA). AI Smart Charging curve required.
          </div>
        )}

        <Button className="w-full text-xs h-8 bg-lime-600 hover:bg-lime-700 text-white shadow-none">
          <TrendingUp className="w-3.5 h-3.5 mr-2" /> Optimize Fleet Charging Curve
        </Button>
      </div>
    </div>
  );
};
