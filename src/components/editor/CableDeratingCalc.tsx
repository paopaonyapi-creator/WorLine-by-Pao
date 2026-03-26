"use client";

import { useState } from "react";
import { X, Thermometer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CableEntry = { id: string; size: number; base: number; temp: number; groupCount: number; method: string };

// IEC 60364-5-52 derating factors
const TEMP_DERATING: Record<number, number> = { 25: 1.06, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.5 };
const GROUP_DERATING: Record<number, number> = { 1: 1.0, 2: 0.8, 3: 0.7, 4: 0.65, 5: 0.6, 6: 0.57, 7: 0.54, 8: 0.52, 9: 0.5 };

export const CableDeratingCalc = ({ onClose }: { onClose: () => void }) => {
  const [cables, setCables] = useState<CableEntry[]>([
    { id: "c1", size: 16, base: 68, temp: 40, groupCount: 3, method: "B2" },
    { id: "c2", size: 35, base: 96, temp: 35, groupCount: 2, method: "C" },
  ]);

  const addCable = () => setCables(p => [...p, { id: `c-${Date.now()}`, size: 6, base: 36, temp: 30, groupCount: 1, method: "B1" }]);
  const update = (id: string, f: keyof CableEntry, v: any) => setCables(p => p.map(c => c.id === id ? { ...c, [f]: v } : c));

  const tempKeys = Object.keys(TEMP_DERATING).map(Number);
  const getNearestTemp = (t: number) => tempKeys.reduce((a, b) => Math.abs(b - t) < Math.abs(a - t) ? b : a);

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-rose-500/10 to-red-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Thermometer className="h-4 w-4 text-rose-500" />
          Cable Derating (IEC 60364)
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="px-2 py-2 text-left">Size mm²</th>
              <th className="px-2 py-2">Base A</th>
              <th className="px-2 py-2">Temp °C</th>
              <th className="px-2 py-2">Kt</th>
              <th className="px-2 py-2">Group</th>
              <th className="px-2 py-2">Kg</th>
              <th className="px-2 py-2">Method</th>
              <th className="px-2 py-2 font-bold">Derated A</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {cables.map(c => {
              const kt = TEMP_DERATING[getNearestTemp(c.temp)] || 1;
              const kg = GROUP_DERATING[Math.min(c.groupCount, 9)] || 0.5;
              const derated = Math.round(c.base * kt * kg * 10) / 10;
              const ok = derated > 0;
              return (
                <tr key={c.id} className="border-t">
                  <td className="px-2 py-1"><Input type="number" value={c.size} onChange={e => update(c.id, "size", +e.target.value)} className="h-6 text-[10px] w-14" /></td>
                  <td className="px-2 py-1"><Input type="number" value={c.base} onChange={e => update(c.id, "base", +e.target.value)} className="h-6 text-[10px] w-14" /></td>
                  <td className="px-2 py-1"><Input type="number" value={c.temp} onChange={e => update(c.id, "temp", +e.target.value)} className="h-6 text-[10px] w-14" /></td>
                  <td className="px-2 py-1 text-center font-mono">{kt.toFixed(2)}</td>
                  <td className="px-2 py-1"><Input type="number" value={c.groupCount} onChange={e => update(c.id, "groupCount", +e.target.value)} className="h-6 text-[10px] w-10" min="1" max="9" /></td>
                  <td className="px-2 py-1 text-center font-mono">{kg.toFixed(2)}</td>
                  <td className="px-2 py-1">
                    <select value={c.method} onChange={e => update(c.id, "method", e.target.value)} className="h-6 text-[10px] bg-background border rounded px-1">
                      <option value="A1">A1</option><option value="A2">A2</option>
                      <option value="B1">B1</option><option value="B2">B2</option>
                      <option value="C">C</option><option value="D">D</option><option value="E">E</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 text-center font-bold text-primary">{derated} A</td>
                  <td className="px-2 py-1"><button onClick={() => setCables(p => p.filter(x => x.id !== c.id))}><Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-3 border-t flex gap-2">
        <Button variant="outline" size="sm" className="text-xs" onClick={addCable}><Plus className="h-3 w-3 mr-1" /> Add Cable</Button>
        <div className="text-[9px] text-muted-foreground self-center flex-1 text-right">Kt=temp factor · Kg=group factor · Derated=Base×Kt×Kg</div>
      </div>
    </div>
  );
};
