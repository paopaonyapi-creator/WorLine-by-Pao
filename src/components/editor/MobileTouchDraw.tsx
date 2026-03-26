"use client";

import { useState, useEffect } from "react";
import { X, Smartphone, Hand, ZoomIn, Move, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileTouchDraw = ({ onClose }: { onClose: () => void }) => {
  const [gesture, setGesture] = useState<string>("none");
  const [touchCount, setTouchCount] = useState(0);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      setTouchCount(e.touches.length);
      if (e.touches.length === 1) setGesture("draw");
      else if (e.touches.length === 2) setGesture("pan/zoom");
      else if (e.touches.length === 3) setGesture("rotate");
    };
    const handleEnd = () => { setGesture("none"); setTouchCount(0); };

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const gestures = [
    { icon: Hand, label: "1 Finger", action: "Draw / Select", color: "text-blue-500" },
    { icon: Move, label: "2 Fingers", action: "Pan canvas", color: "text-green-500" },
    { icon: ZoomIn, label: "Pinch", action: "Zoom in/out", color: "text-purple-500" },
    { icon: RotateCw, label: "3 Fingers", action: "Rotate selected", color: "text-amber-500" },
  ];

  return (
    <div className="absolute top-16 right-4 z-50 w-64 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Smartphone className="h-3.5 w-3.5 text-indigo-500" /> Touch Controls
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>
      </div>
      <div className="p-3 space-y-2">
        {/* Live status */}
        <div className="bg-muted/20 rounded-lg p-2 text-center">
          <div className="text-lg font-bold">{touchCount}</div>
          <div className="text-[10px] text-muted-foreground">Active touches</div>
          <div className={`text-[10px] mt-1 font-medium ${gesture !== "none" ? "text-green-500" : "text-muted-foreground"}`}>
            {gesture !== "none" ? `Gesture: ${gesture}` : "No touch detected"}
          </div>
        </div>

        {/* Guide */}
        <div className="space-y-1">
          {gestures.map(g => (
            <div key={g.label} className="flex items-center gap-2 p-2 rounded-lg bg-muted/10">
              <g.icon className={`h-4 w-4 ${g.color}`} />
              <div className="flex-1">
                <div className="text-[10px] font-medium">{g.label}</div>
                <div className="text-[9px] text-muted-foreground">{g.action}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[8px] text-muted-foreground/60 text-center">
          Works on iPad, Surface, and Android tablets
        </p>
      </div>
    </div>
  );
};
