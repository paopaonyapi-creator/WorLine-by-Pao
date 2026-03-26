"use client";

import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Send, Headphones, Mic, MicOff } from "lucide-react";

export const CollaborationChat = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{user: string, text: string, time: string}[]>([
    { user: "Pao", text: "I've placed the 2000kVA transformer.", time: "10:42 AM" },
    { user: "Engineer 1", text: "Checking the THD% now. Looks good.", time: "10:45 AM" }
  ]);
  const [input, setInput] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { user: "You", text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput("");
  };

  return (
    <div className="absolute bottom-16 right-4 w-72 bg-background border rounded-t-xl rounded-bl-xl shadow-2xl flex flex-col z-50 h-96 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white font-semibold text-xs shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Team Collaboration
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setVoiceActive(!voiceActive)} className={`p-1 rounded-full transition-colors ${voiceActive ? 'bg-red-500 animate-pulse' : 'hover:bg-blue-500'}`} title={voiceActive ? "Mute Microphone" : "Join Voice Channel"}>
            {voiceActive ? <Mic className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
          </button>
          <button onClick={onClose}><X className="w-4 h-4 hover:text-blue-200" /></button>
        </div>
      </div>

      {voiceActive && (
        <div className="bg-red-500/10 px-3 py-1.5 border-b border-red-500/20 text-[10px] text-red-600 dark:text-red-400 flex items-center gap-2 font-medium shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Voice Channel Active (2 Members)
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-muted/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.user === 'You' ? 'items-end' : 'items-start'}`}>
            <span className="text-[9px] text-muted-foreground mb-0.5">{m.user === 'You' ? '' : m.user + ' • '}{m.time}</span>
            <div className={`px-2.5 py-1.5 rounded-lg text-xs max-w-[85%] ${m.user === 'You' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-muted border rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendMsg} className="p-2 border-t bg-background flex items-center gap-2 shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 h-8 text-xs px-2 bg-muted rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button type="submit" disabled={!input.trim()} className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors">
          <Send className="w-3.5 h-3.5 -ml-0.5" />
        </button>
      </form>
    </div>
  );
};
