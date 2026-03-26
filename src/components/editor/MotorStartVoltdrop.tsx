"use client";

import { useState } from "react";
import { X, TrendingDown, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const MotorStartVoltdrop = ({ onClose }: { onClose: () => void }) => {
  const [motorKw, setMotorKw] = useState(250);
  const [startType, setStartType] = useState("dol");
  const [txKva, setTxKva] = useState(1000);
  const [txZ, setTxZ] = useState(6); // %Z

  // Typical motor multipliers: DOL ~6x, Star-Delta ~2x, Soft Start ~3x
  const multiplier = startType === "dol" ? 6 : startType === "star_delta" ? 2 : startType === "soft" ? 3 : 1.5;
  
  // Apparent power of motor
  const motorKva = motorKw / 0.85; // rough estimate
  const stKva = motorKva * multiplier;
  
  // Extremely simplified voltage dip formula for demonstration
  // Dip % ~ (StKVA / ShortCircuitKVA) * 100
  const scKva = (txKva / (txZ / 100)); 
  const dipPerc = (stKva / scKva) * 100;
  
  const dipLimit = 10; // 10% dip limit

  return (
    <div className="absolute top-24 left-1/3 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/40 font-semibold text-xs text-rose-500">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4" /> Motor Start Voltage Dip
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Motor Size (kW)</label>
            <Input type="number" className="h-7 text-xs" value={motorKw} onChange={e => setMotorKw(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Starting Method</label>
            <Select value={startType} onValueChange={(val) => setStartType(val || "dol")}>
              <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dol" className="text-xs">Direct On Line (DOL)</SelectItem>
                <SelectItem value="star_delta" className="text-xs">Star-Delta</SelectItem>
                <SelectItem value="soft" className="text-xs">Soft Starter</SelectItem>
                <SelectItem value="vfd" className="text-xs">VFD Drive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Tx Source (kVA)</label>
            <Input type="number" className="h-7 text-xs" value={txKva} onChange={e => setTxKva(+e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Tx Impedance (%Z)</label>
            <Input type="number" className="h-7 text-xs" value={txZ} onChange={e => setTxZ(+e.target.value)} />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded border relative overflow-hidden">
          <strong className="text-[10px] text-muted-foreground uppercase flex items-center justify-between">
            <span>Instantaneous Voltage Dip</span>
            <span>Limit: {dipLimit}%</span>
          </strong>
          
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-3xl font-black ${dipPerc > dipLimit ? 'text-red-500' : 'text-green-500'}`}>
              {dipPerc.toFixed(1)}%
            </span>
          </div>
          
          {dipPerc > dipLimit && (
            <div className="mt-2 text-[10px] text-red-500 leading-tight">
              <b>Warning:</b> Flicker limit exceeded. May cause unlatching of contactors or IT equipment reboot.
            </div>
          )}
        </div>
        
        <Button size="sm" variant="outline" className="w-full text-xs h-7">
          <RefreshCcw className="w-3 h-3 mr-2" /> Simulate Start Curve
        </Button>
      </div>
    </div>
  );
};
