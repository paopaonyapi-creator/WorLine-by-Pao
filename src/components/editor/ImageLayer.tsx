"use client";

import { useState, useRef } from "react";
import { X, Image, Upload, Move, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageLayerData = { src: string; x: number; y: number; width: number; height: number; opacity: number; locked: boolean; name: string };

export const ImageLayer = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<ImageLayerData[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImages(prev => [...prev, {
        src: reader.result as string,
        x: 100, y: 100, width: 400, height: 300,
        opacity: 0.3, locked: true, name: file.name,
      }]);
    };
    reader.readAsDataURL(file);
  };

  const update = (idx: number, f: keyof ImageLayerData, v: any) => {
    setImages(prev => prev.map((img, i) => i === idx ? { ...img, [f]: v } : img));
  };

  return (
    <>
      {/* Render images behind canvas */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute z-0"
          style={{
            left: img.x, top: img.y,
            width: img.width, height: img.height,
            opacity: img.opacity,
            pointerEvents: img.locked ? "none" : "auto",
          }}
        >
          <img src={img.src} alt={img.name} className="w-full h-full object-contain" draggable={false} />
        </div>
      ))}

      {/* Panel */}
      <div className="absolute top-16 right-4 z-50 w-64 bg-background border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Image className="h-3.5 w-3.5 text-teal-500" /> Image Layer
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>
        </div>
        <div className="p-3 space-y-2">
          <Button variant="outline" className="w-full text-xs gap-1" onClick={() => fileRef.current?.click()}>
            <Upload className="h-3 w-3" /> Upload Background
          </Button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

          {images.map((img, i) => (
            <div key={i} className="bg-muted/20 rounded-lg p-2 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="font-medium truncate flex-1">{img.name}</span>
                <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-2.5 w-2.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div><label className="text-[8px] text-muted-foreground">X</label>
                  <Input type="number" value={img.x} onChange={e => update(i, "x", +e.target.value)} className="h-5 text-[10px]" /></div>
                <div><label className="text-[8px] text-muted-foreground">Y</label>
                  <Input type="number" value={img.y} onChange={e => update(i, "y", +e.target.value)} className="h-5 text-[10px]" /></div>
              </div>
              <div>
                <label className="text-[8px] text-muted-foreground">Opacity: {Math.round(img.opacity * 100)}%</label>
                <input type="range" min="0" max="100" value={img.opacity * 100} onChange={e => update(i, "opacity", +e.target.value / 100)} className="w-full h-1 accent-primary" />
              </div>
              <label className="flex items-center gap-1.5 text-[10px] cursor-pointer">
                <input type="checkbox" checked={img.locked} onChange={e => update(i, "locked", e.target.checked)} />
                🔒 Locked
              </label>
            </div>
          ))}

          {images.length === 0 && <p className="text-[10px] text-muted-foreground text-center py-2">No background images</p>}
        </div>
      </div>
    </>
  );
};
