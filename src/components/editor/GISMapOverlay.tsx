"use client";

import { useState } from "react";
import { X, Map as MapIcon, Layers, Orbit } from "lucide-react";

export const GISMapOverlay = ({ onClose }: { onClose: () => void }) => {
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState("satellite");

  return (
    <div className="absolute top-20 right-1/4 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-blue-500/10 font-semibold text-xs text-blue-600">
        <div className="flex items-center gap-2">
          <MapIcon className="w-4 h-4" /> GIS Map Integration
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Enable GIS Background</span>
          <input type="checkbox" checked={showMap} onChange={e => setShowMap(e.target.checked)} className="accent-blue-600 w-4 h-4 cursor-pointer" />
        </div>

        <div className={`space-y-3 transition-opacity ${showMap ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div>
            <label className="text-[10px] text-muted-foreground block mb-1">Map Layer Provider</label>
            <div className="flex bg-muted rounded-md p-1">
              <button 
                onClick={() => setMapType('satellite')} 
                className={`flex-1 text-[10px] py-1 rounded transition-colors ${mapType === 'satellite' ? 'bg-background shadow-sm font-bold' : 'text-muted-foreground'}`}
              >Satellite High-Res</button>
              <button 
                onClick={() => setMapType('terrain')} 
                className={`flex-1 text-[10px] py-1 rounded transition-colors ${mapType === 'terrain' ? 'bg-background shadow-sm font-bold' : 'text-muted-foreground'}`}
              >Terrain</button>
            </div>
          </div>

          <div className="border rounded bg-muted/20 p-2 text-[10px] space-y-1">
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Current Lat:</span> <span className="font-mono">13.7563° N</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Current Lng:</span> <span className="font-mono">100.5018° E</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Scale:</span> <span className="font-mono">1 grid = 1km</span></div>
          </div>

          <button className="w-full text-[10px] py-1.5 border border-blue-500/50 text-blue-600 rounded flex items-center justify-center gap-1.5 hover:bg-blue-50">
            <Orbit className="w-3.5 h-3.5" /> Sync Coordinates to Viewport
          </button>
        </div>
      </div>
    </div>
  );
};
