import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { Save, Undo, Redo, Download, ArrowLeft, Loader2, MousePointer2, Type } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateSVG } from "@/lib/editor/export";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Toolbar = ({ projectId }: { projectId: string }) => {
  const { undo, redo, canvas, history, currentHistoryIndex, activeTool, setActiveTool } = useEditorStore();
  const [saving, setSaving] = useState(false);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;

  const handleSave = async () => {
    if (!projectId) return;
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("projects")
      .update({
        diagram_data: canvas,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success("Saved successfully");
    }

    setSaving(false);
  };

  const exportPdf = async () => {
    try {
      setSaving(true);
      toast.info("Generating PDF...");
      const canvasEl = document.querySelector('canvas');
      if (!canvasEl) {
        toast.error("Could not find canvas to export.");
        setSaving(false);
        return;
      }
      
      const imgData = canvasEl.toDataURL("image/png");
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      
      const pimg = await pdfDoc.embedPng(imgData);
      
      const page = pdfDoc.addPage([pimg.width, pimg.height]);
      page.drawImage(pimg, {
        x: 0,
        y: 0,
        width: pimg.width,
        height: pimg.height,
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "diagram.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("PDF exported successfully");
    } catch (e) {
      toast.error("Failed to export PDF");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleExportSVG = () => {
    try {
      const svgString = generateSVG(canvas.objects, canvas.width, canvas.height);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `worline-export-${projectId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("SVG Exported successfully");
    } catch (e) {
      toast.error("Failed to export SVG");
    }
  };

  const exportPng = () => {
    const canvasEl = document.querySelector('canvas');
    if (canvasEl) {
      const imgData = canvasEl.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "diagram.png";
      link.click();
      toast.success("PNG exported");
    }
  };

  return (
    <div className="h-14 border-b bg-background flex items-center px-4 justify-between gap-2 overflow-x-auto print:hidden">
      <div className="flex items-center gap-2">
        <Link href="/app">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="w-px h-6 bg-border mx-2" />
        <Button variant="ghost" size="icon" className="w-8 h-8" disabled={!canUndo} onClick={undo}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8" disabled={!canRedo} onClick={redo}>
          <Redo className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        {/* Tools */}
        <Button 
          variant={activeTool === "select" ? "secondary" : "ghost"} 
          size="sm" 
          className="gap-2"
          onClick={() => setActiveTool("select")}
        >
          <MousePointer2 className="h-4 w-4" /> Select
        </Button>
        <Button 
          variant={activeTool === "text" ? "secondary" : "ghost"} 
          size="sm" 
          className="gap-2"
          onClick={() => setActiveTool("text")}
        >
          <Type className="h-4 w-4" /> Text
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleSave} disabled={saving} variant="outline" size="sm" className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : "Save"}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground h-9 px-3">
            <Download className="h-4 w-4" /> Export
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportPng}>
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportSVG}>
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportPdf}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
