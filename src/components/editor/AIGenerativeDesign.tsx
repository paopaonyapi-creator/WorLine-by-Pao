"use client";

import { useState } from "react";
import { X, Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIGenerativeDesign = ({ onClose }: { onClose: () => void }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
      // Logic would parse the string to JSON diagram data and push to canvas objects
    }, 2500);
  };

  return (
    <div className="absolute top-20 left-1/4 w-[400px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-purple-500/10 font-semibold text-xs text-purple-500">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" /> AI Generative SLD
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[11px] text-muted-foreground">
          Describe the electrical system you want to build. The AI will instantly generate the symbols, ratings, and layout for you.
        </div>
        
        <textarea 
          className="w-full h-24 text-xs p-2 border rounded-md bg-muted/20 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="e.g. Draw a 2000kVA 22kV to 400V substation with a main ACB 3200A and 6 outgoing MCCB feeders at 250A each."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />

        <div className="flex flex-wrap gap-1.5">
          <Button variant="outline" size="sm" className="h-6 text-[9px] px-2 text-purple-600 border-purple-200" onClick={() => setPrompt("Create a 250kW Star-Delta motor starter panel")}>
            Motor Starter
          </Button>
          <Button variant="outline" size="sm" className="h-6 text-[9px] px-2 text-purple-600 border-purple-200" onClick={() => setPrompt("100kW Solar PV system with Grid-tied inverter")}>
            Solar PV
          </Button>
          <Button variant="outline" size="sm" className="h-6 text-[9px] px-2 text-purple-600 border-purple-200" onClick={() => setPrompt("Automatic Transfer Switch (ATS) 1000A with generator")}>
            ATS + Genset
          </Button>
        </div>

        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 h-8 text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Analyzing Prompt & Generating Schema...</>
          ) : (
            <><Sparkles className="w-3.5 h-3.5 mr-2" /> Generate SLD</>
          )}
        </Button>
      </div>
    </div>
  );
};
