"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { X, MessageSquare, Plus, Send, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type CommentPin = {
  id: string;
  x: number;
  y: number;
  text: string;
  author: string;
  timestamp: string;
  resolved: boolean;
};

export const CommentOverlay = ({ onClose }: { onClose: () => void }) => {
  const { zoom, panX, panY } = useEditorStore();
  const [comments, setComments] = useState<CommentPin[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("worline-comments");
    return saved ? JSON.parse(saved) : [];
  });
  const [newText, setNewText] = useState("");
  const [placingMode, setPlacingMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const saveComments = (updated: CommentPin[]) => {
    setComments(updated);
    localStorage.setItem("worline-comments", JSON.stringify(updated));
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!placingMode || !newText.trim()) return;
    const container = document.getElementById("canvas-container");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - panX) / zoom;
    const y = (e.clientY - rect.top - panY) / zoom;
    const comment: CommentPin = {
      id: `cmt-${Date.now()}`,
      x, y,
      text: newText.trim(),
      author: "You",
      timestamp: new Date().toLocaleTimeString(),
      resolved: false,
    };
    saveComments([...comments, comment]);
    setNewText("");
    setPlacingMode(false);
  };

  const toggleResolved = (id: string) => {
    saveComments(comments.map(c => c.id === id ? { ...c, resolved: !c.resolved } : c));
  };

  const deleteComment = (id: string) => {
    saveComments(comments.filter(c => c.id !== id));
  };

  return (
    <>
      {/* Comment pins on canvas */}
      {comments.map(c => (
        <div
          key={c.id}
          className={`absolute z-30 cursor-pointer transition-transform hover:scale-110 ${c.resolved ? "opacity-40" : ""}`}
          style={{
            left: c.x * zoom + panX - 12,
            top: c.y * zoom + panY - 12,
          }}
          onClick={() => setSelectedId(selectedId === c.id ? null : c.id)}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-lg ${c.resolved ? "bg-green-500" : "bg-amber-500"}`}>
            <Pin className="h-3 w-3" />
          </div>
          {selectedId === c.id && (
            <div className="absolute top-7 left-0 w-48 bg-background border rounded-lg shadow-xl p-2 z-50">
              <p className="text-xs font-medium">{c.text}</p>
              <p className="text-[9px] text-muted-foreground mt-1">{c.author} · {c.timestamp}</p>
              <div className="flex gap-1 mt-2">
                <Button variant="outline" size="sm" className="text-[10px] h-5 flex-1" onClick={() => toggleResolved(c.id)}>
                  {c.resolved ? "Reopen" : "Resolve"}
                </Button>
                <Button variant="destructive" size="sm" className="text-[10px] h-5" onClick={() => deleteComment(c.id)}>
                  ×
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Comment panel */}
      <div className="absolute top-16 right-4 z-50 w-64 bg-background border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
            Comments ({comments.filter(c => !c.resolved).length})
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="max-h-48 overflow-auto p-2 space-y-1.5">
          {comments.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center py-3">No comments yet</p>
          )}
          {comments.map(c => (
            <div key={c.id} className={`text-[10px] p-1.5 rounded hover:bg-muted/30 ${c.resolved ? "line-through opacity-50" : ""}`}>
              <span className="font-medium">{c.text}</span>
              <span className="text-muted-foreground ml-1">— {c.author}</span>
            </div>
          ))}
        </div>

        <div className="p-2 border-t flex gap-1.5">
          <Input
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="Add comment..."
            className="text-xs h-7"
            onKeyDown={e => e.key === "Enter" && newText.trim() && setPlacingMode(true)}
          />
          <Button
            size="sm"
            className="h-7 text-xs gap-1"
            disabled={!newText.trim()}
            onClick={() => setPlacingMode(true)}
          >
            <Pin className="h-3 w-3" />
          </Button>
        </div>
        {placingMode && (
          <div className="p-2 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-400 text-center animate-pulse">
            Click on canvas to place comment pin
          </div>
        )}
      </div>

      {/* Click handler overlay */}
      {placingMode && (
        <div className="absolute inset-0 z-40 cursor-crosshair" onClick={handleCanvasClick} />
      )}
    </>
  );
};
