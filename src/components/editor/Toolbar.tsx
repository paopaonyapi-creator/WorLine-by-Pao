import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { Save, Undo, Redo, Download, ArrowLeft, Loader2, MousePointer2, Type, Cable, Grid3x3, Maximize, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter, RotateCw, FlipHorizontal, FlipVertical, Magnet, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateSVG } from "@/lib/editor/export";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { SymbolObject } from "@/lib/editor/types";
import { rgb, StandardFonts } from "pdf-lib";
import { Share2, Check, Copy, Trash, Boxes } from "lucide-react";
import { Palette } from "./Palette";

export const Toolbar = ({ projectId }: { projectId: string }) => {
  const { undo, redo, canvas, history, currentHistoryIndex, activeTool, setActiveTool, selectedIds, deleteObjects, duplicateSelected, setZoom, setPan, rotateSelected, flipSelectedH, flipSelectedV, snapToGrid, toggleSnapToGrid } = useEditorStore();
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;

  const handleFitToScreen = () => {
    // Reset zoom and pan to fit canvas
    setZoom(1);
    setPan(0, 0);
    toast.success("Fit to screen");
  };

  const handleToggleGrid = () => {
    setGridVisible(!gridVisible);
    // Toggle grid visibility on canvas
    const gridLayer = document.querySelector('[data-grid-layer]');
    if (gridLayer) {
      (gridLayer as HTMLElement).style.opacity = gridVisible ? '0' : '1';
    }
    toast.success(gridVisible ? "Grid hidden" : "Grid visible");
  };

  const handleAlignH = () => {
    if (selectedIds.length < 2) { toast.error("Select 2+ objects"); return; }
    const objs = canvas.objects.filter(o => selectedIds.includes(o.id));
    const avgY = objs.reduce((sum, o) => sum + (o as any).y, 0) / objs.length;
    objs.forEach(o => { (o as any).y = avgY; });
    toast.success("Aligned horizontally");
  };

  const handleAlignV = () => {
    if (selectedIds.length < 2) { toast.error("Select 2+ objects"); return; }
    const objs = canvas.objects.filter(o => selectedIds.includes(o.id));
    const avgX = objs.reduce((sum, o) => sum + (o as any).x, 0) / objs.length;
    objs.forEach(o => { (o as any).x = avgX; });
    toast.success("Aligned vertically");
  };

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

  const handleShare = async () => {
    if (!projectId) return;
    setSharing(true);
    const supabase = createClient();
    
    // Set project to public
    const { error } = await supabase
      .from("projects")
      .update({ is_public: true })
      .eq("id", projectId);

    if (error) {
      toast.error("Failed to make project public");
      setSharing(false);
      return;
    }

    const shareUrl = `${window.location.origin}/share/${projectId}`;
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    toast.success("Public link copied to clipboard!");
    setTimeout(() => setShared(false), 3000);
    setSharing(false);
  };

  const exportPdf = async () => {
    try {
      setSaving(true);
      toast.info("Generating PDF with Title Block...");
      const canvasEl = document.querySelector('canvas');
      if (!canvasEl) {
        toast.error("Could not find canvas to export.");
        setSaving(false);
        return;
      }
      
      const imgData = canvasEl.toDataURL("image/png");
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      
      // A4 Landscape: 842 x 595 points
      const page = pdfDoc.addPage([842, 595]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pimg = await pdfDoc.embedPng(imgData);
      
      // Draw Border
      page.drawRectangle({
        x: 20, y: 20, width: 802, height: 555,
        borderColor: rgb(0, 0, 0),
        borderWidth: 2,
      });

      // Draw Title Block Area (Bottom Right)
      page.drawRectangle({
        x: 522, y: 20, width: 300, height: 80,
        borderColor: rgb(0, 0, 0),
        borderWidth: 2,
      });
      // Title Block inner lines
      page.drawLine({ start: { x: 522, y: 60 }, end: { x: 822, y: 60 }, thickness: 1, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x: 522, y: 40 }, end: { x: 822, y: 40 }, thickness: 1, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x: 672, y: 20 }, end: { x: 672, y: 60 }, thickness: 1, color: rgb(0, 0, 0) });

      // Title Block Text
      page.drawText("WorLine Single-Line Diagram", { x: 530, y: 67, size: 10, font: fontBold });
      page.drawText(`Project ID: ${projectId}`, { x: 530, y: 47, size: 8, font });
      page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 680, y: 47, size: 8, font });
      page.drawText("Drawn By: WorLine User", { x: 530, y: 27, size: 8, font });
      page.drawText("Sheet: 1 of 1", { x: 680, y: 27, size: 8, font });

      // Calculate image fit inside border (excluding title block area if needed, but we'll center it mostly)
      // Available space for image: 800 x 470 (above title block)
      const availableWidth = 800;
      const availableHeight = 470;
      const scale = Math.min(availableWidth / pimg.width, availableHeight / pimg.height);
      const drawW = pimg.width * scale;
      const drawH = pimg.height * scale;
      const drawX = 20 + (availableWidth - drawW) / 2;
      const drawY = 100 + (availableHeight - drawH) / 2;
      
      page.drawImage(pimg, {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "diagram_with_titleblock.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("PDF exported successfully");
    } catch (e) {
      toast.error("Failed to export PDF");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const exportBOM = () => {
    try {
      const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];
      const countMap: Record<string, { name: string, qty: number, category: string }> = {};

      symbols.forEach(sym => {
        const def = symbolRegistry[sym.symbolId];
        if (!def) return;
        const key = sym.symbolId;
        if (!countMap[key]) {
          countMap[key] = { name: def.displayName, qty: 0, category: def.category };
        }
        countMap[key].qty += 1;
      });

      let csv = "Category,Item Name,Quantity\n";
      Object.values(countMap).forEach(item => {
        // Simple escape just in case
        const cat = `"${item.category}"`;
        const name = `"${item.name}"`;
        csv += `${cat},${name},${item.qty}\n`;
      });

      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BOM_${projectId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("BOM Exported successfully");
    } catch (e) {
      toast.error("Failed to export BOM");
      console.error(e);
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
    <div className="h-14 border-b bg-background flex items-center px-4 justify-between gap-4 overflow-x-auto scrollbar-hide print:hidden">
      <div className="flex items-center gap-2 shrink-0">
        <Link href="/app/projects">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Mobile Library Button */}
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="sm" className="gap-2 md:hidden" />}>
            <Boxes className="h-4 w-4" /> Library
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Palette />
          </SheetContent>
        </Sheet>

        <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" disabled={!canUndo} onClick={undo}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" disabled={!canRedo} onClick={redo}>
          <Redo className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
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
        <Button 
          variant={activeTool === "wire" ? "secondary" : "ghost"} 
          size="sm" 
          className="gap-2"
          onClick={() => setActiveTool("wire")}
        >
          <Cable className="h-4 w-4" /> Wire
        </Button>

        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

        {/* Canvas tools */}
        <Button
          variant={gridVisible ? "secondary" : "ghost"}
          size="icon"
          className="w-8 h-8 hidden sm:inline-flex"
          onClick={handleToggleGrid}
          title="Toggle Grid"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 hidden sm:inline-flex"
          onClick={handleFitToScreen}
          title="Fit to Screen"
        >
          <Maximize className="h-4 w-4" />
        </Button>
        <Button
          variant={snapToGrid ? "secondary" : "ghost"}
          size="icon"
          className="w-8 h-8 hidden sm:inline-flex"
          onClick={toggleSnapToGrid}
          title="Snap to Grid (Magnet)"
        >
          <Magnet className="h-4 w-4" />
        </Button>

        {/* Transform tools (visible when selected) */}
        {selectedIds.length > 0 && (
          <>
            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
            <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" onClick={rotateSelected} title="Rotate 90° (R)">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" onClick={flipSelectedH} title="Flip Horizontal (H)">
              <FlipHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" onClick={flipSelectedV} title="Flip Vertical (V)">
              <FlipVertical className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Alignment tools (visible when 2+ selected) */}
        {selectedIds.length >= 2 && (
          <>
            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
            <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" onClick={handleAlignH} title="Align Horizontally">
              <AlignHorizontalJustifyCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 hidden sm:inline-flex" onClick={handleAlignV} title="Align Vertically">
              <AlignVerticalJustifyCenter className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Mobile quick actions for selected */}
        {selectedIds.length > 0 && (
          <>
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="ghost" size="icon" className="w-8 h-8 lg:hidden text-destructive" onClick={() => deleteObjects(selectedIds)}>
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 lg:hidden" onClick={() => duplicateSelected()}>
              <Copy className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button onClick={handleShare} disabled={sharing} variant="outline" size="sm" className="gap-2">
          {shared ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
          {shared ? "Copied" : "Share"}
        </Button>
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
              Export as PDF (A4 + Title Block)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportBOM}>
              Export BOM (Excel/CSV)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
