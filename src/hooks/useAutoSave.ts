"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditorStore } from "@/store/editorStore";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function useAutoSave(projectId: string | null) {
  const lastSavedRef = useRef<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  const save = useCallback(async () => {
    if (!projectId) return;

    const canvas = useEditorStore.getState().canvas;
    const json = JSON.stringify(canvas);

    // Skip if nothing changed
    if (json === lastSavedRef.current) return;

    try {
      const { error } = await supabase
        .from("projects")
        .update({
          diagram_data: canvas,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) {
        console.error("Auto-save failed:", error);
        return;
      }

      lastSavedRef.current = json;
      // Subtle save indicator - no toast to avoid spam
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  }, [projectId, supabase]);

  const manualSave = useCallback(async () => {
    await save();
    toast.success("Project saved!");
  }, [save]);

  useEffect(() => {
    if (!projectId) return;

    // Initialize lastSaved with current state
    lastSavedRef.current = JSON.stringify(useEditorStore.getState().canvas);

    // Set up auto-save interval
    timerRef.current = setInterval(save, AUTOSAVE_INTERVAL);

    // Save on page unload
    const handleBeforeUnload = () => save();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      save(); // Save on unmount
    };
  }, [projectId, save]);

  return { save: manualSave };
}
