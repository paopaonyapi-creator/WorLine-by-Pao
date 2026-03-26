"use client";

import { useState } from "react";
import { X, Glasses, Maximize, Cuboid } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WebXRPreview = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[30%] left-[30%] w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-fuchsia-500/10 font-semibold text-xs text-fuchsia-600">
        <div className="flex items-center gap-2">
          <Glasses className="w-4 h-4" /> WebXR / AR Preview
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-0">
        {/* Fake 3D render window */}
        <div className="w-full h-40 bg-zinc-900 border-b flex flex-col items-center justify-center text-zinc-500 relative overflow-hidden group">
          <Cuboid className="w-12 h-12 mb-2 text-zinc-700 opacity-50 stroke-[1]" />
          <span className="text-xs font-mono group-hover:hidden transition-all">Initializing WebGL Engine...</span>
          <span className="text-xs text-fuchsia-400 font-mono hidden group-hover:block transition-all">3D Switchboard Rendered!</span>
          <button className="absolute bottom-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded text-white transition-colors">
            <Maximize className="w-3 h-3" />
          </button>
        </div>
        
        <div className="p-3 space-y-2">
          <div className="text-[10px] text-muted-foreground text-center">
            View generated 3D panel layout in physical space using AR/VR headsets or your mobile phone camera.
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button className="h-8 text-xs bg-zinc-800 hover:bg-zinc-950 text-white shadow-none rounded-md">
              <Glasses className="w-3.5 h-3.5 mr-1.5" /> Enter VR
            </Button>
            <Button variant="outline" className="h-8 text-xs border-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-50 rounded-md">
              Mobile AR QA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
