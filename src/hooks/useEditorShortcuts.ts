"use client";

import { useEffect, useCallback } from "react";
import { useEditorStore } from "@/store/editorStore";

export function useEditorShortcuts(projectId: string, onSave: () => void) {
  const { undo, redo, deleteObjects, selectedIds, duplicateSelected } = useEditorStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
      return;
    }

    const isCtrl = e.ctrlKey || e.metaKey;

    // Ctrl+S → Save
    if (isCtrl && e.key === "s") {
      e.preventDefault();
      onSave();
      return;
    }

    // Ctrl+Z → Undo
    if (isCtrl && !e.shiftKey && e.key === "z") {
      e.preventDefault();
      undo();
      return;
    }

    // Ctrl+Shift+Z or Ctrl+Y → Redo
    if ((isCtrl && e.shiftKey && e.key === "z") || (isCtrl && e.key === "y")) {
      e.preventDefault();
      redo();
      return;
    }

    // Delete / Backspace → Delete selected
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedIds.length > 0) {
        e.preventDefault();
        deleteObjects(selectedIds);
      }
      return;
    }

    // Ctrl+D → Duplicate
    if (isCtrl && e.key === "d") {
      e.preventDefault();
      duplicateSelected();
      return;
    }

    // Escape → Deselect
    if (e.key === "Escape") {
      useEditorStore.getState().setSelection([]);
      return;
    }
  }, [undo, redo, deleteObjects, selectedIds, duplicateSelected, onSave]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
