"use client";

import { useState } from "react";
import { X, Gauge, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PowerFactorCorrection = ({ onClose }: { onClose: () => void }) => {
  const [loadKW, setLoadKW] = useState(500);
  const [currentPF, setCurrentPF] = useState(0.75);
  const [targetPF, setTargetPF] = useState(0.95);
  const [voltage, setVoltage] = useState(400);

  const phi1 = Math.acos(currentPF);
  const phi2 = Math.acos(targetPF);
  const qc = loadKW * (Math.tan(phi1) - Math.tan(phi2));
  const ic = (qc * 1000) / (Math.sqrt(3) * voltage);
  const currentKVA = loadKW / currentPF;
  const targetKVA = loadKW / targetPF;
  const kvaSaved = currentKVA - targetKVA;

  // Standard capacitor bank sizes
  const stdSizes = [25, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500];
  const recommended = stdSizes.find(s => s >= qc) || stdSizes[stdSizes.length - 1];

  return (
    <div className="absolute top-16 right-4 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Gauge className="h-4 w-4 text-green-500" />
          Power Factor Correction
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Load (kW)</label>
            <Input type="number" value={loadKW} onChange={e => setLoadKW(+e.target.value)} className="h-8 text-sm" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Voltage (V)</label>
            <Input type="number" value={voltage} onChange={e => setVoltage(+e.target.value)} className="h-8 text-sm" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Current PF</label>
            <Input type="number" value={currentPF} onChange={e => setCurrentPF(+e.target.value)} className="h-8 text-sm" step="0.01" min="0" max="1" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Target PF</label>
            <Input type="number" value={targetPF} onChange={e => setTargetPF(+e.target.value)} className="h-8 text-sm" step="0.01" min="0" max="1" /></div>
        </div>
        {/* PF gauge */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 opacity-30" />
            <div className="absolute top-0 bottom-0 w-1 bg-red-500 rounded" style={{ left: `${currentPF * 100}%` }} title={`Current: ${currentPF}`} />
            <div className="absolute top-0 bottom-0 w-1 bg-green-600 rounded" style={{ left: `${targetPF * 100}%` }} title={`Target: ${targetPF}`} />
          </div>
          <span className="text-[9px] text-muted-foreground w-16">{currentPF} → {targetPF}</span>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 space-y-1.5">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Required kVAR:</span><span className="font-bold text-green-600">{qc.toFixed(1)} kVAR</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Capacitor bank:</span><span className="font-bold text-emerald-600">{recommended} kVAR</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Cap. current:</span><span>{ic.toFixed(1)} A</span></div>
          <div className="w-full h-px bg-border" />
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">kVA saved:</span><span className="text-blue-500">{kvaSaved.toFixed(1)} kVA</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Current reduction:</span><span className="text-blue-500">{((1 - targetPF / currentPF) * 100).toFixed(1)}%</span></div>
        </div>
        <p className="text-[8px] text-muted-foreground/60 text-center">Standard bank: {stdSizes.join(", ")} kVAR</p>
      </div>
    </div>
  );
};
