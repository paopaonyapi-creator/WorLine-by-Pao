"use client";

import { useState } from "react";
import { X, CloudLightning, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const LightningProtection = ({ onClose }: { onClose: () => void }) => {
  const [lpl, setLpl] = useState("1"); // Lightning Protection Level
  const [height, setHeight] = useState(20);

  // IEC 62305 Rolling Sphere Radius based on LPL (I=20m, II=30m, III=45m, IV=60m)
  const radius = lpl === "1" ? 20 : lpl === "2" ? 30 : lpl === "3" ? 45 : 60;
  
  // Safe distance simplified calculation
  const safeDistance = Math.sqrt(Math.pow(radius, 2) - Math.pow(radius - height, 2)) || 0;
  
  const isProtected = height <= radius;

  return (
    <div className="absolute top-20 left-20 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-amber-500/10 font-semibold text-xs text-amber-600">
        <div className="flex items-center gap-2">
          <CloudLightning className="w-4 h-4" /> Lightning Protection (IEC 62305)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label className="text-muted-foreground">Protection Level (LPL)</label>
          <Select value={lpl} onValueChange={(val) => setLpl(val || "1")}>
            <SelectTrigger className="w-24 h-7 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1" className="text-[10px]">LPL I (High)</SelectItem>
              <SelectItem value="2" className="text-[10px]">LPL II</SelectItem>
              <SelectItem value="3" className="text-[10px]">LPL III</SelectItem>
              <SelectItem value="4" className="text-[10px]">LPL IV (Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="text-muted-foreground">Mast Height (m)</label>
          <Input type="number" className="w-20 h-7 text-xs" value={height} onChange={e => setHeight(+e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 text-center">
          <div className="border p-2 rounded-lg bg-muted/20">
            <div className="text-[10px] text-muted-foreground font-semibold">Rolling Sphere Radius</div>
            <div className="text-xl font-bold font-mono">{radius}m</div>
          </div>
          <div className="border p-2 rounded-lg bg-muted/20">
            <div className="text-[10px] text-muted-foreground font-semibold">Safe Base Radius</div>
            <div className="text-xl font-bold font-mono">{Number.isNaN(safeDistance) ? "0.0" : safeDistance.toFixed(1)}m</div>
          </div>
        </div>

        {isProtected ? (
          <div className="bg-green-500/10 text-green-600 border border-green-500/30 p-2 rounded text-[10px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Structure is fully protected from direct stroke.
          </div>
        ) : (
          <div className="bg-red-500/10 text-red-600 border border-red-500/30 p-2 rounded text-[10px] leading-tight">
            <b>Warning:</b> Mast height exceeds rolling sphere radius. Direct strikes to side of structure possible.
          </div>
        )}

        <Button className="w-full text-xs h-8 bg-amber-500 hover:bg-amber-600 shadow-none font-medium text-white shadow-amber-500/20">
          Draw Protection Zone (3D)
        </Button>
      </div>
    </div>
  );
};
