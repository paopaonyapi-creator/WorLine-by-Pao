"use client";

import { useState } from "react";
import { X, ActivitySquare, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const HarmonicDistortion = ({ onClose }: { onClose: () => void }) => {
  const [loadkVA, setLoadkVA] = useState(1000);
  const [nlLoadPerc, setNlLoadPerc] = useState(30);

  // Simulation THD math
  const thdv = Math.min((nlLoadPerc / 100) * 12, 15).toFixed(1);
  const thdi = Math.min((nlLoadPerc / 100) * 45, 100).toFixed(1);

  const ieeeLimitV = 5.0; // IEEE 519 limit for >1kV is 5%

  return (
    <div className="absolute top-20 right-24 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 font-semibold text-xs">
        <div className="flex items-center gap-2 text-indigo-500">
          <ActivitySquare className="w-4 h-4" /> THD% Analysis (IEEE 519)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="text-muted-foreground">Total Plant Load (kVA)</label>
            <Input type="number" className="w-20 h-6 text-xs text-right" value={loadkVA} onChange={e => setLoadkVA(+e.target.value)} />
          </div>
          <div className="flex justify-between items-center text-xs">
            <label className="text-muted-foreground w-32">Non-linear Load % (VFD, LED, IT)</label>
            <Input type="number" className="w-16 h-6 text-xs text-right" value={nlLoadPerc} onChange={e => setNlLoadPerc(+e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className={`border rounded p-2 text-center ${parseFloat(thdv) > ieeeLimitV ? 'bg-red-500/10 border-red-500' : 'bg-green-500/10 border-green-500'}`}>
            <div className="text-[10px] text-muted-foreground font-semibold">THDv</div>
            <div className="text-xl font-bold">{thdv}%</div>
            <div className="text-[9px] text-muted-foreground mt-1">Limit: {ieeeLimitV}%</div>
          </div>
          <div className="border rounded p-2 text-center bg-indigo-500/5">
            <div className="text-[10px] text-muted-foreground font-semibold">THDi</div>
            <div className="text-xl font-bold">{thdi}%</div>
            <div className="text-[9px] text-muted-foreground mt-1">TDD Check</div>
          </div>
        </div>

        {parseFloat(thdv) > ieeeLimitV && (
          <div className="bg-red-500/10 text-red-600 p-2 border border-red-500/30 rounded text-[10px] flex items-start gap-1.5">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>WARNING: THDv exceeds IEEE 519 limit (5%). Active Harmonic Filter (AHF) is highly recommended.</span>
          </div>
        )}

        {parseFloat(thdv) <= ieeeLimitV && (
          <div className="bg-green-500/10 text-green-600 p-2 border border-green-500/30 rounded text-[10px] text-center">
            System harmonic levels are within IEEE 519 limits.
          </div>
        )}

      </div>
    </div>
  );
};
