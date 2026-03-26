"use client";

import { useState } from "react";
import { X, Battery, BatteryCharging } from "lucide-react";
import { Input } from "@/components/ui/input";

export const BatterySizingCalc = ({ onClose }: { onClose: () => void }) => {
  const [loadKVA, setLoadKVA] = useState(10);
  const [pf, setPF] = useState(0.8);
  const [backupMin, setBackupMin] = useState(30);
  const [battVolt, setBattVolt] = useState(12);
  const [efficiency, setEfficiency] = useState(0.85);
  const [agingFactor, setAgingFactor] = useState(1.25);

  const loadW = loadKVA * 1000 * pf;
  const energyWh = (loadW * backupMin) / 60;
  const requiredAh = (energyWh * agingFactor) / (battVolt * efficiency);
  const battCount = Math.ceil(requiredAh / 100); // assuming 100Ah batteries

  const stdBatteries = [
    { ah: 7, use: "Small UPS" },
    { ah: 18, use: "Desktop UPS" },
    { ah: 65, use: "Rack UPS" },
    { ah: 100, use: "Industrial" },
    { ah: 200, use: "Large Systems" },
  ];
  const recommended = stdBatteries.find(b => b.ah * Math.ceil(requiredAh / b.ah) >= requiredAh) || stdBatteries[stdBatteries.length - 1];

  return (
    <div className="absolute top-16 right-4 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Battery className="h-4 w-4 text-amber-500" />
          Battery / UPS Sizing
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Load (kVA)</label>
            <Input type="number" value={loadKVA} onChange={e => setLoadKVA(+e.target.value)} className="h-7 text-xs" step="0.5" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">PF</label>
            <Input type="number" value={pf} onChange={e => setPF(+e.target.value)} className="h-7 text-xs" step="0.05" min="0" max="1" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Backup (min)</label>
            <Input type="number" value={backupMin} onChange={e => setBackupMin(+e.target.value)} className="h-7 text-xs" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Batt Volt</label>
            <Input type="number" value={battVolt} onChange={e => setBattVolt(+e.target.value)} className="h-7 text-xs" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Efficiency</label>
            <Input type="number" value={efficiency} onChange={e => setEfficiency(+e.target.value)} className="h-7 text-xs" step="0.05" /></div>
          <div><label className="text-[10px] font-semibold text-muted-foreground block mb-1">Aging ×</label>
            <Input type="number" value={agingFactor} onChange={e => setAgingFactor(+e.target.value)} className="h-7 text-xs" step="0.05" /></div>
        </div>
        {/* Battery visual */}
        <div className="flex items-center gap-2">
          <BatteryCharging className="h-8 w-8 text-green-500" />
          <div className="flex-1">
            <div className="text-lg font-bold">{requiredAh.toFixed(0)} Ah</div>
            <div className="text-[10px] text-muted-foreground">@ {battVolt}V = {energyWh.toFixed(0)} Wh</div>
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 space-y-1.5 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Load power:</span><span>{(loadW / 1000).toFixed(1)} kW</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Energy needed:</span><span>{energyWh.toFixed(0)} Wh</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">With aging factor:</span><span>{(energyWh * agingFactor).toFixed(0)} Wh</span></div>
          <div className="flex justify-between font-medium"><span>100Ah batteries:</span><span>{battCount} pcs</span></div>
        </div>
        <p className="text-[8px] text-muted-foreground/60 text-center">Std sizes: {stdBatteries.map(b => `${b.ah}Ah`).join(", ")}</p>
      </div>
    </div>
  );
};
