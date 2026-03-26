"use client";

import { useEditorStore } from "@/store/editorStore";
import { Plus, X, Edit2, Check } from "lucide-react";
import { useState } from "react";

export const SheetTabs = () => {
  const { sheets, activeSheetId, addSheet, removeSheet, switchSheet, renameSheet } = useEditorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleFinishRename = () => {
    if (editingId && editName.trim()) {
      renameSheet(editingId, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="h-8 bg-muted/50 border-t flex items-center gap-0.5 px-2 overflow-x-auto scrollbar-hide">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className={`group flex items-center gap-1 px-3 py-1 text-xs rounded-t-md cursor-pointer transition-all select-none ${
            sheet.id === activeSheetId
              ? "bg-background border border-b-0 border-border font-medium text-foreground shadow-sm -mb-px"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          onClick={() => switchSheet(sheet.id)}
          onDoubleClick={() => handleStartRename(sheet.id, sheet.name)}
        >
          {editingId === sheet.id ? (
            <div className="flex items-center gap-1">
              <input
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleFinishRename}
                onKeyDown={(e) => e.key === "Enter" && handleFinishRename()}
                className="w-20 text-xs bg-transparent border-b border-primary outline-none"
                onClick={(e) => e.stopPropagation()}
              />
              <button onClick={(e) => { e.stopPropagation(); handleFinishRename(); }}>
                <Check className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <>
              <span>{sheet.name}</span>
              {sheets.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSheet(sheet.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </button>
              )}
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => addSheet()}
        className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        title="Add Sheet"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
};
