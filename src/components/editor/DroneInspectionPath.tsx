"use client";

import { useState } from "react";
import { X, Navigation, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DroneInspectionPath = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[40%] right-8 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-teal-500/10 font-semibold text-xs text-teal-600">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="w-4 h-4" /> Drone Auto-Flight Path
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          AI generated 3D waypoints for DJI drones (KML export). Automatically scans PV string arrays and transformers mapped in the SLD layout for thermal hotspots.
        </div>

        <div className="border border-teal-100 bg-teal-50 rounded p-2 text-[10px] font-mono space-y-1">
          <div className="text-teal-800 font-bold mb-1 border-b border-teal-200 pb-1">FLIGHT PLAN GENERATED</div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Total Waypoints:</span><span>142 points</span></div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Est. Flight Time:</span><span>24m 10s</span></div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Altitude AGL:</span><span>35.0 m</span></div>
          <div className="flex items-center justify-between"><span className="text-muted-foreground">Overlap:</span><span>Front 80% / Side 70%</span></div>
        </div>

        <Button className="w-full text-[11px] h-8 bg-teal-600 hover:bg-teal-700 shadow-none text-white">
          <Navigation className="w-3.5 h-3.5 mr-2" /> Export DJI Waypoints (KML)
        </Button>
      </div>
    </div>
  );
};
