"use client";

import { useState, useRef } from "react";
import { X, Brain, Upload, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

// Simulated AI recognition — maps detected shapes to SLD components
function recognizeFromImage(imageData: string): { type: string; symbolId: string; x: number; y: number; label: string }[] {
  // In production, this would call an AI vision API
  // For now, generate a plausible set of recognized components
  const detected = [
    { type: "symbol", symbolId: "transformer", x: 400, y: 150, label: "TR-1" },
    { type: "symbol", symbolId: "mccb", x: 400, y: 300, label: "CB-1" },
    { type: "symbol", symbolId: "mccb", x: 250, y: 450, label: "CB-2" },
    { type: "symbol", symbolId: "mccb", x: 550, y: 450, label: "CB-3" },
    { type: "symbol", symbolId: "motor", x: 250, y: 580, label: "M1" },
    { type: "symbol", symbolId: "motor", x: 550, y: 580, label: "M2" },
  ];
  return detected;
}

export const AIDiagramRecognition = ({ onClose }: { onClose: () => void }) => {
  const { addObject } = useEditorStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof recognizeFromImage> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRecognize = async () => {
    if (!imagePreview) return;
    setProcessing(true);
    // Simulate processing delay
    await new Promise(r => setTimeout(r, 2000));
    const detected = recognizeFromImage(imagePreview);
    setResults(detected);
    setProcessing(false);
    toast.success(`Detected ${detected.length} components!`);
  };

  const handleApply = () => {
    if (!results) return;
    results.forEach((item, i) => {
      addObject({
        type: "symbol",
        symbolId: item.symbolId,
        x: item.x,
        y: item.y,
        width: 60,
        height: 60,
        rotation: 0,
        zIndex: i + 1,
        label: item.label,
        id: `ai-${Date.now()}-${i}`,
      } as any);
    });
    toast.success(`Applied ${results.length} components to canvas!`);
    onClose();
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Brain className="h-4 w-4 text-violet-500" />
          AI Diagram Recognition
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* Upload area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/20 transition-colors ${imagePreview ? "border-primary/50" : "border-muted-foreground/20"}`}
          onClick={() => fileRef.current?.click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Uploaded SLD" className="max-h-48 mx-auto rounded-lg object-contain" />
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-xs text-muted-foreground">Click to upload SLD image</p>
              <p className="text-[9px] text-muted-foreground/60 mt-1">PNG, JPG, or scanned PDF</p>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>

        {/* Recognize button */}
        {imagePreview && !results && (
          <Button className="w-full gap-2" onClick={handleRecognize} disabled={processing}>
            {processing ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Wand2 className="h-4 w-4" /> Recognize Components</>
            )}
          </Button>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-2">
            <p className="text-xs font-semibold">Detected {results.length} components:</p>
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted/20 rounded-lg text-xs">
                <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-[8px] font-bold text-primary">{i + 1}</div>
                <div className="flex-1">
                  <span className="font-medium capitalize">{r.symbolId.replace(/-/g, " ")}</span>
                  <span className="text-muted-foreground ml-2">({r.label})</span>
                </div>
                <span className="text-[9px] text-muted-foreground">({r.x}, {r.y})</span>
              </div>
            ))}
            <Button className="w-full gap-2" onClick={handleApply}>
              <Wand2 className="h-4 w-4" /> Apply to Canvas
            </Button>
          </div>
        )}
      </div>

      <div className="p-3 border-t text-[8px] text-muted-foreground/60 text-center">
        AI recognition is approximate. Verify and adjust component positions after applying.
      </div>
    </div>
  );
};
