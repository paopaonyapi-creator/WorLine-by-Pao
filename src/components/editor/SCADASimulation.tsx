"use client";

import { useState, useEffect } from "react";
import { X, Play, Square, Settings2, Activity } from "lucide-react";

export const SCADASimulation = ({ onClose }: { onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volts, setVolts] = useState(400);
  const [amps, setAmps] = useState(1200);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVolts(400 + (Math.random() * 4 - 2));
        setAmps(1200 + (Math.random() * 50 - 25));
      }, 500);
      
      // We would ideally dispatch a global event to change wire colors here 
      // by interacting with the Zustand store, but simulated for UI.
      const canvasEl = document.getElementById('canvas-container');
      if(canvasEl) {
        canvasEl.style.boxShadow = "inset 0 0 50px rgba(0, 255, 0, 0.05)";
      }
    } else {
      const canvasEl = document.getElementById('canvas-container');
      if(canvasEl) canvasEl.style.boxShadow = "none";
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-96 bg-gray-900 border border-gray-700 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden z-50 text-gray-100 flex items-center p-2 gap-3 pr-4">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {isPlaying ? <Square className="w-4 h-4 text-white" fill="currentColor" /> : <Play className="w-4 h-4 pl-0.5 text-white" fill="currentColor" />}
      </button>

      <div className="flex-1 flex items-center gap-4 text-sm font-mono border-l border-gray-700 pl-3">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Main Bus Volts</span>
          <span className={`font-bold ${isPlaying ? 'text-green-400' : 'text-gray-300'}`}>{volts.toFixed(1)} <span className="text-xs">V</span></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Total Load</span>
          <span className={`font-bold ${isPlaying ? 'text-yellow-400' : 'text-gray-300'}`}>{amps.toFixed(0)} <span className="text-xs">A</span></span>
        </div>
      </div>

      <div className="flex gap-2">
        {isPlaying && <Activity className="w-4 h-4 text-green-500 animate-pulse" />}
        <button><Settings2 className="w-4 h-4 text-gray-400 hover:text-white" /></button>
        <button onClick={onClose}><X className="w-4 h-4 text-gray-400 hover:text-red-400" /></button>
      </div>
    </div>
  );
};
