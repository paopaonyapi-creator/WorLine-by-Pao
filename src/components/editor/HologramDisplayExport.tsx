"use client";

import { useState } from "react";
import { X, Box, Cuboid, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HologramDisplayExport = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[28%] right-[20%] w-[300px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-pink-500/10 font-semibold text-xs text-pink-600">
        <div className="flex items-center gap-2">
          <Cuboid className="w-4 h-4" /> 3D Holographic Export
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Export volumetric 3D models of the SLD and switchgear optimized directly for physical LED Hologram Fans or Looking Glass Displays.
        </div>

        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex justify-center items-center h-28 relative overflow-hidden group">
          <div className="w-16 h-16 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin absolute" style={{ animationDuration: '0.2s' }}></div>
          <Box className="w-8 h-8 text-pink-300 relative z-10" />
          <div className="absolute bottom-1 right-2 text-[8px] text-zinc-500 font-mono">Volumetric Engine</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="text-xs h-8 border-pink-200 text-pink-700 hover:bg-pink-50 text-[10px]">
            HYPERVSN (.mp4)
          </Button>
          <Button variant="outline" className="text-xs h-8 border-pink-200 text-pink-700 hover:bg-pink-50 text-[10px]">
            Looking Glass (.glb)
          </Button>
        </div>
        <Button className="w-full text-xs h-8 bg-pink-600 hover:bg-pink-700 text-white shadow-none font-medium">
          <MonitorPlay className="w-3.5 h-3.5 mr-2" /> Beam to connected display
        </Button>
      </div>
    </div>
  );
};
