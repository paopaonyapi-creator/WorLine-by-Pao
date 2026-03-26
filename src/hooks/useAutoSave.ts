"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditorStore } from "@/store/editorStore";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const AUTOSAVE_INTERVAL = 30000; // 30 seconds
const VERSION_SNAPSHOT_INTERVAL = 300000; // 5 minutes

export function useAutoSave(projectId: string | null) {
  const lastSavedRef = useRef<string>("");
  const lastVersionRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  const saveVersion = useCallback(async () => {
    if (!projectId) return;
    const canvas = useEditorStore.getState().canvas;
    // Only save a version if enough time has passed
    if (Date.now() - lastVersionRef.current < VERSION_SNAPSHOT_INTERVAL) return;
    try {
      await supabase
        .from("project_versions")
        .insert({ project_id: projectId, diagram_data: canvas });
      lastVersionRef.current = Date.now();
    } catch (err) {
      console.error("Version snapshot error:", err);
    }
  }, [projectId, supabase]);

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

      // Try saving a version snapshot (respects 5-minute interval)
      saveVersion();
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  }, [projectId, supabase, saveVersion]);

  const manualSave = useCallback(async () => {
    await save();
    // Force save a version on manual save
    if (projectId) {
      const canvas = useEditorStore.getState().canvas;
      try {
        await supabase
          .from("project_versions")
          .insert({ project_id: projectId, diagram_data: canvas });
        lastVersionRef.current = Date.now();
      } catch (err) {
        console.error("Manual version save error:", err);
      }
    }
    toast.success("Project saved!");
  }, [save, projectId, supabase]);

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

