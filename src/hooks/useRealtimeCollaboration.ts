"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/store/editorStore";

type CursorState = {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
};

const CURSOR_COLORS = [
  "#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#f97316",
];

export function useRealtimeCollaboration(projectId: string | null) {
  const [cursors, setCursors] = useState<CursorState[]>([]);
  const channelRef = useRef<any>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!projectId) return;

    let userId = "";
    let userName = "";
    let userColor = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];

    const setup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || "anon-" + Math.random().toString(36).slice(2, 8);
      userName = user?.email?.split("@")[0] || "User";

      const channel = supabase
        .channel(`project:${projectId}`, { config: { presence: { key: userId } } });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState<{ name: string; color: string; x: number; y: number }>();
          const others: CursorState[] = [];
          Object.entries(state).forEach(([key, presences]) => {
            if (key !== userId && presences.length > 0) {
              const p = presences[0] as any;
              others.push({
                userId: key,
                name: p.name || "User",
                color: p.color || "#3b82f6",
                x: p.x || 0,
                y: p.y || 0,
              });
            }
          });
          setCursors(others);
        })
        .on("broadcast", { event: "canvas-update" }, ({ payload }: any) => {
          if (payload.userId !== userId) {
            // Merge incoming canvas state (simple last-write-wins)
            const store = useEditorStore.getState();
            if (payload.canvas) {
              store.initialize(projectId, payload.canvas);
            }
          }
        })
        .subscribe(async (status: string) => {
          if (status === "SUBSCRIBED") {
            await channel.track({
              name: userName,
              color: userColor,
              x: 0,
              y: 0,
            });
          }
        });

      channelRef.current = channel;
    };

    setup();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [projectId, supabase]);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    if (channelRef.current) {
      channelRef.current.track({
        x: Math.round(x),
        y: Math.round(y),
      });
    }
  }, []);

  const broadcastCanvasUpdate = useCallback(() => {
    if (channelRef.current) {
      const canvas = useEditorStore.getState().canvas;
      const { data: { user } } = { data: { user: null } }; // avoid async in callback
      channelRef.current.send({
        type: "broadcast",
        event: "canvas-update",
        payload: { canvas },
      });
    }
  }, []);

  return { cursors, updateCursorPosition, broadcastCanvasUpdate };
}
