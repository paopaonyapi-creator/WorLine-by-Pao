"use client";

import { useState } from "react";
import { X, Flame, AlertTriangle, ShieldAlert, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditorStore } from "@/store/editorStore";

export const ArcFlashAnalysis = ({ onClose }: { onClose: () => void }) => {
  const [voltage, setVoltage] = useState(480);
  const [faultCurrent, setFaultCurrent] = useState(25); // kA
  const [clearingTime, setClearingTime] = useState(100); // ms
  const [distance, setDistance] = useState(610); // mm

  // IEEE 1584 Simplified formula for Incident Energy
  const incidentEnergy = ((voltage / 1000) * faultCurrent * (clearingTime / 1000) * 0.12).toFixed(2);
  const energyVal = parseFloat(incidentEnergy);

  let category = "0";
  let ppe = "Non-melting apparel";
  let limit = "1.2 cal/cm²";

  if (energyVal > 1.2 && energyVal <= 4) { category = "1"; ppe = "Arc-rated shirt & pants (4 cal)"; limit = "4.0 cal/cm²"; }
  else if (energyVal > 4 && energyVal <= 8) { category = "2"; ppe = "Arc-rated shirt/pants, flash suit hood (8 cal)"; limit = "8.0 cal/cm²"; }
  else if (energyVal > 8 && energyVal <= 25) { category = "3"; ppe = "Arc flash suit (25 cal)"; limit = "25.0 cal/cm²"; }
  else if (energyVal > 25 && energyVal <= 40) { category = "4"; ppe = "Arc flash suit (40 cal)"; limit = "40.0 cal/cm²"; }
  else if (energyVal > 40) { category = "DANGER"; ppe = "NO SAFE PPE EXISTS - DE-ENERGIZE ONLY"; limit = "N/A"; }

  return (
    <div className="absolute top-16 right-16 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 font-semibold text-xs">
        <div className="flex items-center gap-2 text-orange-500">
          <Flame className="w-4 h-4" /> Arc Flash Hazard (IEEE 1584)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Voltage (V)</label>
            <Input type="number" className="h-7 text-xs" value={voltage} onChange={e => setVoltage(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Fault (kA)</label>
            <Input type="number" className="h-7 text-xs" value={faultCurrent} onChange={e => setFaultCurrent(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Clear Time (ms)</label>
            <Input type="number" className="h-7 text-xs" value={clearingTime} onChange={e => setClearingTime(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Work Dist. (mm)</label>
            <Input type="number" className="h-7 text-xs" value={distance} onChange={e => setDistance(+e.target.value)} />
          </div>
        </div>

        <div className={`p-3 rounded-lg border flex flex-col items-center justify-center ${energyVal > 40 ? 'bg-red-500/10 border-red-500/50' : energyVal > 8 ? 'bg-orange-500/10 border-orange-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
          <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Incident Energy</div>
          <div className={`text-3xl font-black ${energyVal > 40 ? 'text-red-500' : 'text-foreground'}`}>
            {incidentEnergy} <span className="text-sm font-normal">cal/cm²</span>
          </div>
        </div>

        <div className="space-y-1 mt-2 border-t pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">PPE Category:</span>
            <span className={`font-bold ${category === 'DANGER' ? 'text-red-500' : 'text-primary'}`}>CAT {category}</span>
          </div>
          <div className="flex justify-between items-start text-xs">
            <span className="text-muted-foreground w-20">Req. PPE:</span>
            <span className="text-right text-[11px] leading-tight flex-1">{ppe}</span>
          </div>
        </div>

        <Button size="sm" className="w-full text-xs h-7 mt-2 bg-orange-600 hover:bg-orange-500">
          <Download className="w-3 h-3 mr-2" /> Export Label (PDF)
        </Button>
      </div>
    </div>
  );
};
