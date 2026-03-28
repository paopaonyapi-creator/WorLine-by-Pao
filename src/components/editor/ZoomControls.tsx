"use client";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useLocale } from "@/lib/i18n/useLocale";

export const ZoomControls = () => {
  const { zoom, setZoom } = useEditorStore();
  const { locale } = useLocale();
  const isTh = locale === "th";

  const zoomIn = () => setZoom(Math.min(zoom + 0.1, 3));
  const zoomOut = () => setZoom(Math.max(zoom - 0.1, 0.2));
  const fitToScreen = () => setZoom(1);

  return (
    <div className="absolute bottom-20 md:bottom-4 right-4 z-10 hidden md:flex items-center gap-1 bg-background/90 backdrop-blur-sm border rounded-lg shadow-lg p-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <button
        className="h-8 min-w-[3rem] text-xs font-medium text-center hover:bg-muted rounded px-2 transition-colors"
        onClick={fitToScreen}
        title={isTh ? "รีเซ็ตการซูมเป็น 100%" : "Reset zoom to 100%"}
      >
        {Math.round(zoom * 100)}%
      </button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <div className="w-px h-5 bg-border mx-1" />
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={fitToScreen} title={isTh ? "พอดีกับหน้าจอ" : "Fit to screen"}>
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  );
};
