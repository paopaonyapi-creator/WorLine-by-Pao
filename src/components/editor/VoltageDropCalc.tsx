"use client";

import { useState } from "react";
import { X, TrendingDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CableRun = {
  id: string;
  name: string;
  voltage: number;     // V
  current: number;     // A
  length: number;      // m
  cableSize: number;   // mm²
  material: "cu" | "al";
  phases: 1 | 3;
};

// Resistivity Ω·mm²/m at 70°C
const RESISTIVITY = { cu: 0.0225, al: 0.036 };

function calcVoltageDrop(run: CableRun) {
  const rho = RESISTIVITY[run.material];
  const R = (rho * run.length) / run.cableSize;
  const cosP = 0.85;
  const vdrop = run.phases === 3
    ? Math.sqrt(3) * run.current * R * cosP
    : 2 * run.current * R * cosP;
  const pct = (vdrop / run.voltage) * 100;
  return { vdrop: Math.round(vdrop * 100) / 100, pct: Math.round(pct * 100) / 100 };
}

export const VoltageDropCalc = ({ onClose }: { onClose: () => void }) => {
  const [runs, setRuns] = useState<CableRun[]>([
    { id: "r1", name: "Main Feeder", voltage: 400, current: 200, length: 50, cableSize: 95, material: "cu", phases: 3 },
    { id: "r2", name: "Sub-Panel", voltage: 400, current: 63, length: 30, cableSize: 16, material: "cu", phases: 3 },
  ]);

  const addRun = () => {
    setRuns(prev => [...prev, {
      id: `r-${Date.now()}`,
      name: `Cable ${prev.length + 1}`,
      voltage: 400, current: 32, length: 20, cableSize: 6, material: "cu", phases: 3,
    }]);
  };

  const update = (id: string, field: keyof CableRun, value: any) => {
    setRuns(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <TrendingDown className="h-4 w-4 text-orange-500" />
          Voltage Drop Calculator
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="px-2 py-2 text-left">Cable</th>
              <th className="px-2 py-2">V</th>
              <th className="px-2 py-2">A</th>
              <th className="px-2 py-2">L(m)</th>
              <th className="px-2 py-2">mm²</th>
              <th className="px-2 py-2">Mat</th>
              <th className="px-2 py-2">φ</th>
              <th className="px-2 py-2">ΔV</th>
              <th className="px-2 py-2">%</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {runs.map(run => {
              const result = calcVoltageDrop(run);
              const ok = result.pct <= 5;
              return (
                <tr key={run.id} className="border-t hover:bg-muted/10">
                  <td className="px-2 py-1">
                    <Input value={run.name} onChange={e => update(run.id, "name", e.target.value)} className="h-6 text-[10px] w-24" />
                  </td>
                  <td className="px-2 py-1">
                    <Input type="number" value={run.voltage} onChange={e => update(run.id, "voltage", +e.target.value)} className="h-6 text-[10px] w-14" />
                  </td>
                  <td className="px-2 py-1">
                    <Input type="number" value={run.current} onChange={e => update(run.id, "current", +e.target.value)} className="h-6 text-[10px] w-14" />
                  </td>
                  <td className="px-2 py-1">
                    <Input type="number" value={run.length} onChange={e => update(run.id, "length", +e.target.value)} className="h-6 text-[10px] w-14" />
                  </td>
                  <td className="px-2 py-1">
                    <Input type="number" value={run.cableSize} onChange={e => update(run.id, "cableSize", +e.target.value)} className="h-6 text-[10px] w-14" />
                  </td>
                  <td className="px-2 py-1">
                    <select value={run.material} onChange={e => update(run.id, "material", e.target.value)} className="h-6 text-[10px] bg-background border rounded px-1">
                      <option value="cu">Cu</option>
                      <option value="al">Al</option>
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <select value={run.phases} onChange={e => update(run.id, "phases", +e.target.value)} className="h-6 text-[10px] bg-background border rounded px-1">
                      <option value={1}>1φ</option>
                      <option value={3}>3φ</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 font-medium text-center">{result.vdrop}V</td>
                  <td className={`px-2 py-1 font-bold text-center ${ok ? "text-green-600" : "text-red-600"}`}>{result.pct}%</td>
                  <td className="px-2 py-1 text-center">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${ok ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {ok ? "OK" : "FAIL"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t flex gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={addRun}><Plus className="h-3 w-3 mr-1" /> Add Cable</Button>
        <div className="text-[9px] text-muted-foreground self-center">IEC limit: ≤5% • PF=0.85 • 70°C</div>
      </div>
    </div>
  );
};
