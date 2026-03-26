"use client";

import { useEditorStore } from "@/store/editorStore";
import { useState } from "react";
import { X, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// IEC 60909 simplified short circuit calculation
function calcShortCircuit(voltageKV: number, transformerMVA: number, impedancePct: number) {
  const voltageV = voltageKV * 1000;
  const baseImpedance = (voltageV * voltageV) / (transformerMVA * 1e6);
  const faultImpedance = baseImpedance * (impedancePct / 100);
  const isc3phase = voltageV / (Math.sqrt(3) * faultImpedance); // 3-phase symmetrical
  const isc1phase = voltageV / (3 * faultImpedance); // 1-phase to ground (approx)
  const iscPeak = isc3phase * 2.55; // peak factor for 50Hz
  return { isc3phase, isc1phase, iscPeak, faultImpedance };
}

export const ShortCircuitCalc = ({ onClose }: { onClose: () => void }) => {
  const [voltage, setVoltage] = useState(22);      // kV
  const [mva, setMva] = useState(1);                // MVA
  const [impedance, setImpedance] = useState(6);    // %

  const result = calcShortCircuit(voltage, mva, impedance);

  return (
    <div className="absolute top-16 right-4 z-50 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Zap className="h-4 w-4 text-red-500" />
          Short Circuit Calculator
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> IEC 60909 Simplified Method
        </p>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Voltage (kV)</label>
            <Input type="number" value={voltage} onChange={e => setVoltage(+e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Tr. MVA</label>
            <Input type="number" value={mva} onChange={e => setMva(+e.target.value)} className="h-8 text-sm" step="0.1" />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Z% (Imp.)</label>
            <Input type="number" value={impedance} onChange={e => setImpedance(+e.target.value)} className="h-8 text-sm" />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">I"k3 (3φ Sym.):</span>
            <span className="font-bold text-red-500">{(result.isc3phase / 1000).toFixed(2)} kA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">I"k1 (1φ Ground):</span>
            <span className="font-bold text-orange-500">{(result.isc1phase / 1000).toFixed(2)} kA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ip (peak):</span>
            <span className="font-bold text-amber-500">{(result.iscPeak / 1000).toFixed(2)} kA</span>
          </div>
          <div className="w-full h-px bg-border" />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fault Z:</span>
            <span>{result.faultImpedance.toFixed(4)} Ω</span>
          </div>
        </div>

        <p className="text-[8px] text-muted-foreground/60 text-center">
          * Simplified calculation. PF=0.85, 50Hz. Verify with professional tools.
        </p>
      </div>
    </div>
  );
};
