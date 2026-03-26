"use client";

import { useEditorStore } from "@/store/editorStore";
import { X, GitCompare, ArrowLeftRight } from "lucide-react";

export const VersionDiffView = ({ onClose }: { onClose: () => void }) => {
  const { history, currentHistoryIndex, canvas } = useEditorStore();

  const prevIndex = Math.max(0, currentHistoryIndex - 1);
  const prevCanvas = history[prevIndex];
  const currCanvas = canvas;

  // Compute diff
  const prevIds = new Set(prevCanvas?.objects?.map(o => o.id) || []);
  const currIds = new Set(currCanvas.objects.map(o => o.id));

  const added = currCanvas.objects.filter(o => !prevIds.has(o.id));
  const removed = (prevCanvas?.objects || []).filter(o => !currIds.has(o.id));
  const modified = currCanvas.objects.filter(o => {
    if (!prevIds.has(o.id)) return false;
    const prev = prevCanvas?.objects?.find(p => p.id === o.id);
    return prev && JSON.stringify(prev) !== JSON.stringify(o);
  });

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <GitCompare className="h-4 w-4 text-cyan-500" />
          Version Diff — Step {prevIndex + 1} vs {currentHistoryIndex + 1}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* Summary */}
        <div className="flex gap-3">
          <div className="flex-1 bg-green-500/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{added.length}</div>
            <div className="text-[10px] text-green-600/70">Added</div>
          </div>
          <div className="flex-1 bg-amber-500/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{modified.length}</div>
            <div className="text-[10px] text-amber-600/70">Modified</div>
          </div>
          <div className="flex-1 bg-red-500/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{removed.length}</div>
            <div className="text-[10px] text-red-600/70">Removed</div>
          </div>
        </div>

        {/* Details */}
        {added.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-green-600 mb-1">+ Added</h4>
            {added.map(o => (
              <div key={o.id} className="text-[10px] px-2 py-1 bg-green-500/5 rounded mb-0.5 flex justify-between">
                <span className="capitalize font-medium">{o.type}</span>
                <span className="text-muted-foreground">({Math.round(o.x)}, {Math.round(o.y)})</span>
              </div>
            ))}
          </div>
        )}

        {modified.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-amber-600 mb-1">~ Modified</h4>
            {modified.map(o => (
              <div key={o.id} className="text-[10px] px-2 py-1 bg-amber-500/5 rounded mb-0.5 flex justify-between">
                <span className="capitalize font-medium">{o.type}</span>
                <span className="text-muted-foreground">{o.id.slice(0, 8)}</span>
              </div>
            ))}
          </div>
        )}

        {removed.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-red-600 mb-1">- Removed</h4>
            {removed.map(o => (
              <div key={o.id} className="text-[10px] px-2 py-1 bg-red-500/5 rounded mb-0.5 flex justify-between">
                <span className="capitalize font-medium">{o.type}</span>
                <span className="text-muted-foreground">{o.id.slice(0, 8)}</span>
              </div>
            ))}
          </div>
        )}

        {added.length === 0 && modified.length === 0 && removed.length === 0 && (
          <div className="text-center text-muted-foreground text-xs py-8">
            No differences between versions
          </div>
        )}

        <div className="text-[9px] text-muted-foreground/50 text-center">
          History: {history.length} steps · Current: {currentHistoryIndex + 1}
        </div>
      </div>
    </div>
  );
};
