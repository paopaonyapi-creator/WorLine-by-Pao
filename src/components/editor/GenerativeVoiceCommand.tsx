"use client";

import { useState } from "react";
import { X, Mic, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GenerativeVoiceCommand = ({ onClose }: { onClose: () => void }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleListen = () => {
    setListening(true);
    setTranscript("Listening...");
    setTimeout(() => {
      setTranscript("WorLine, add a 500kVA transformer to Main Bus A...");
    }, 1500);
    setTimeout(() => {
      setListening(false);
      setTranscript("");
    }, 4000);
  };

  return (
    <div className="absolute bottom-[20%] right-[40%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-purple-500/10 font-semibold text-xs text-purple-600">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4" /> AI Voice Command
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-4 flex flex-col items-center justify-center space-y-4">
        <div className="text-[10px] text-muted-foreground text-center">
          Speak to the AI to auto-generate diagram components, route cables, or execute complex calculations hands-free.
        </div>

        <button 
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-purple-600 shadow-[0_0_30px_rgba(147,51,234,0.5)] animate-pulse' : 'bg-purple-100 hover:bg-purple-200'}`}
          onClick={handleListen}
        >
          {listening ? <AudioLines className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-purple-600" />}
        </button>

        <div className="h-8 flex items-center justify-center w-full">
          {transcript && <div className="text-xs font-mono text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">{transcript}</div>}
        </div>
      </div>
    </div>
  );
};
