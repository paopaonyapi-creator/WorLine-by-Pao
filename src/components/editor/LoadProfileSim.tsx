"use client";

import { useState } from "react";
import { X, TrendingDown, BatteryCharging } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LoadProfileSim = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[10%] left-[40%] w-[400px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-indigo-500/10 font-semibold text-xs text-indigo-600">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4" /> 24hr Load Profile & Peak Shaving
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 text-xs">
        <div className="text-[10px] text-muted-foreground">
          Simulate 24-hour daily demand based on attached loads (HVAC, Lighting, EV Chargers) and analyze battery discharge needed to shave peak demand limits (TOU Tariff).
        </div>

        <div className="border rounded bg-muted/20 p-2 flex flex-col justify-end h-32 relative group cursor-crosshair">
          {/* Fake bar chart for load profile over 24h */}
          <div className="absolute top-2 left-2 text-[9px] text-muted-foreground font-semibold">Demand (kW)</div>
          <div className="absolute top-8 left-0 right-0 border-t border-dashed border-red-500/50 flex justify-end pr-1">
            <span className="text-[8px] bg-background px-1 text-red-500 -mt-1.5 font-bold">Peak Limit (450kW)</span>
          </div>
          
          <div className="flex items-end h-20 gap-px px-4 pt-4">
            {Array.from({ length: 24 }).map((_, i) => {
              // Creating a realistic double peak curve (morning + evening)
              let val = 150;
              if (i > 8 && i < 12) val = 300 + Math.random() * 50;
              if (i >= 12 && i < 17) val = 350 + Math.random() * 80;
              if (i >= 17 && i < 21) val = 480 + Math.random() * 40; // Peak over 450
              if (i >= 21) val = 250;
              
              const isPeak = val > 450;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center group-hover:opacity-80 transition-opacity">
                  {isPeak && <div className="w-full bg-emerald-400 rounded-t-sm" style={{ height: `${(val - 450) / 6}px` }} title="BESS Discharging" />}
                  <div className={`w-full rounded-t-sm ${isPeak ? 'bg-indigo-500 rounded-none' : 'bg-indigo-300'}`} style={{ height: `${Math.min(val, 450) / 6}px` }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[8px] text-muted-foreground mt-1 px-4">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
            <div className="text-emerald-700 font-semibold mb-0.5">BESS Capacity Req.</div>
            <div className="font-mono text-sm text-emerald-600 font-bold">185 kWh</div>
          </div>
          <div className="bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
            <div className="text-indigo-700 font-semibold mb-0.5">Est. Monthly Savings</div>
            <div className="font-mono text-sm text-indigo-600 font-bold">$1,240</div>
          </div>
        </div>

        <Button className="w-full h-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-none text-xs">
          <BatteryCharging className="w-3.5 h-3.5 mr-2" /> Auto-Size ESS Storage
        </Button>
      </div>
    </div>
  );
};
