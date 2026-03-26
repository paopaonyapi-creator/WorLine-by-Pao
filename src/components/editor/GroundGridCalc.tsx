"use client";

import { useState } from "react";
import { X, Network, AlertOctagon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const GroundGridCalc = ({ onClose }: { onClose: () => void }) => {
  const [rho, setRho] = useState(100); // Soil resistivity ohm-m
  const [faultCurrent, setFaultCurrent] = useState(15); // kA
  const [clearingTime, setClearingTime] = useState(0.5); // s

  // IEEE 80 simplified mock calculations for demonstration
  // Touch voltage limit for 50kg person
  const touchLimit = ((1000 + 1.5 * 3000) * 0.116) / Math.sqrt(clearingTime); 
  const stepLimit = ((1000 + 6.0 * 3000) * 0.116) / Math.sqrt(clearingTime);
  
  // Real mesh voltage would depend on grid geometry, using fake est. based on rho and fault
  const estMesh = (rho * faultCurrent * 10) / 100;
  const estStep = (rho * faultCurrent * 5) / 100;

  const safe = estMesh <= touchLimit && estStep <= stepLimit;

  return (
    <div className="absolute top-24 left-1/3 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-500/10 font-semibold text-xs text-emerald-600">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4" /> Earthing Grid (IEEE 80)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-muted-foreground">Soil Res (Ω-m)</label>
            <Input type="number" className="h-6 text-xs" value={rho} onChange={e => setRho(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground">Fault I (kA)</label>
            <Input type="number" className="h-6 text-xs" value={faultCurrent} onChange={e => setFaultCurrent(+e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] text-muted-foreground">Clear Time (s) [50kg body]</label>
            <Input type="number" step="0.1" className="h-6 text-xs" value={clearingTime} onChange={e => setClearingTime(+e.target.value)} />
          </div>
        </div>

        <div className="rounded border bg-muted/20 p-2 divide-y">
          <div className="flex items-center justify-between py-1 text-[11px]">
            <span className="text-muted-foreground">Touch Voltage Limit:</span>
            <span className="font-bold">{touchLimit.toFixed(1)} V</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[11px]">
            <span className="text-muted-foreground">Est. Mesh Voltage:</span>
            <span className={`font-bold ${estMesh > touchLimit ? 'text-red-500' : 'text-emerald-500'}`}>{estMesh.toFixed(1)} V</span>
          </div>
        </div>

        <div className="rounded border bg-muted/20 p-2 divide-y">
          <div className="flex items-center justify-between py-1 text-[11px]">
            <span className="text-muted-foreground">Step Voltage Limit:</span>
            <span className="font-bold">{stepLimit.toFixed(1)} V</span>
          </div>
          <div className="flex items-center justify-between py-1 text-[11px]">
            <span className="text-muted-foreground">Est. Grid Step Voltage:</span>
            <span className={`font-bold ${estStep > stepLimit ? 'text-red-500' : 'text-emerald-500'}`}>{estStep.toFixed(1)} V</span>
          </div>
        </div>

        {!safe && (
          <div className="bg-red-500/10 text-red-600 border border-red-500/30 p-2 rounded text-[10px] flex items-start gap-2 leading-tight">
            <AlertOctagon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            Grid is UNSAFE. Increase rod length, decrease grid spacing, or add surface crush rock (3000 Ω-m).
          </div>
        )}

        <Button variant="outline" className="w-full text-xs h-7 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10">
          Generate Grid Drawing
        </Button>
      </div>
    </div>
  );
};
