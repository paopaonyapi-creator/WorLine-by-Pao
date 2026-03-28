"use client";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import {
  Save, Undo, Redo, Download, ArrowLeft, Loader2,
  MousePointer2, Type, Cable, Grid3x3, Maximize,
  RotateCw, FlipHorizontal, FlipVertical, Magnet,
  Share2, Check, Copy, Trash, MoreHorizontal, FolderOpen, Plus, Shapes
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateSVG } from "@/lib/editor/export";
import { toast } from "sonner";
import { LayoutGrid } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { SymbolObject } from "@/lib/editor/types";
import { rgb, StandardFonts } from "pdf-lib";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocale } from "@/lib/i18n/useLocale";
const ToolBtn = ({ icon: Icon, label, active, onClick, className, disabled }: {
  icon: any; label: string; active?: boolean; onClick: () => void; className?: string; disabled?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger
      render={
        <Button
          variant={active ? "secondary" : "ghost"}
          size="icon"
          className={`w-8 h-8 ${className || ""}`}
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      }
    />
    <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
  </Tooltip>
);

export const Toolbar = ({ projectId, onOpenPlugins, onOpenLibrary }: { projectId: string, onOpenPlugins?: () => void, onOpenLibrary?: () => void }) => {
  const { t } = useLocale();
  const {
    undo, redo, canvas, history, currentHistoryIndex,
    activeTool, setActiveTool, selectedIds, deleteObjects,
    duplicateSelected, setZoom, setPan, rotateSelected,
    flipSelectedH, flipSelectedV, snapToGrid, toggleSnapToGrid,
  } = useEditorStore();
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;

  const handleFitToScreen = () => { setZoom(1); setPan(0, 0); toast.success(t("toast_fit_screen")); };

  const handleToggleGrid = () => {
    setGridVisible(!gridVisible);
    const gridLayer = document.querySelector('[data-grid-layer]');
    if (gridLayer) (gridLayer as HTMLElement).style.opacity = gridVisible ? '0' : '1';
    toast.success(gridVisible ? t("toast_grid_hidden") : t("toast_grid_visible"));
  };

  const handleSave = async () => {
    if (!projectId) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("projects")
      .update({ diagram_data: canvas, updated_at: new Date().toISOString() })
      .eq("id", projectId);
    if (error) toast.error(t("toast_save_failed") + error.message);
    else toast.success(t("toast_save_success"), { id: "save-success-toast" });
    setSaving(false);
  };

  const handleShare = async () => {
    if (!projectId) return;
    setSharing(true);
    const supabase = createClient();
    const { error } = await supabase.from("projects").update({ is_public: true }).eq("id", projectId);
    if (error) { toast.error(t("toast_share_failed")); setSharing(false); return; }
    const shareUrl = `${window.location.origin}/share/${projectId}`;
    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
    toast.success(t("toast_share_copied"));
    setTimeout(() => setShared(false), 3000);
    setSharing(false);
  };

  const exportPdf = async () => {
    try {
      setSaving(true);
      toast.info(t("toast_pdf_generating"));
      const canvasEl = document.querySelector('canvas');
      if (!canvasEl) { toast.error(t("toast_canvas_not_found")); setSaving(false); return; }
      const imgData = canvasEl.toDataURL("image/png");
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pimg = await pdfDoc.embedPng(imgData);
      page.drawRectangle({ x: 20, y: 20, width: 802, height: 555, borderColor: rgb(0, 0, 0), borderWidth: 2 });
      page.drawRectangle({ x: 522, y: 20, width: 300, height: 80, borderColor: rgb(0, 0, 0), borderWidth: 2 });
      page.drawLine({ start: { x: 522, y: 60 }, end: { x: 822, y: 60 }, thickness: 1, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x: 522, y: 40 }, end: { x: 822, y: 40 }, thickness: 1, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x: 672, y: 20 }, end: { x: 672, y: 60 }, thickness: 1, color: rgb(0, 0, 0) });
      page.drawText("WorLine Single-Line Diagram", { x: 530, y: 67, size: 10, font: fontBold });
      page.drawText(`Project ID: ${projectId}`, { x: 530, y: 47, size: 8, font });
      page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 680, y: 47, size: 8, font });
      page.drawText("Drawn By: WorLine User", { x: 530, y: 27, size: 8, font });
      page.drawText("Sheet: 1 of 1", { x: 680, y: 27, size: 8, font });
      const aw = 800, ah = 470;
      const scale = Math.min(aw / pimg.width, ah / pimg.height);
      const dw = pimg.width * scale, dh = pimg.height * scale;
      page.drawImage(pimg, { x: 20 + (aw - dw) / 2, y: 100 + (ah - dh) / 2, width: dw, height: dh });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = "diagram_with_titleblock.pdf";
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(t("toast_pdf_exported"));
    } catch { toast.error(t("toast_pdf_failed")); } finally { setSaving(false); }
  };

  const exportBOM = () => {
    try {
      const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];
      const countMap: Record<string, { name: string; qty: number; category: string }> = {};
      symbols.forEach(sym => {
        const def = symbolRegistry[sym.symbolId]; if (!def) return;
        if (!countMap[sym.symbolId]) countMap[sym.symbolId] = { name: def.displayName, qty: 0, category: def.category };
        countMap[sym.symbolId].qty += 1;
      });
      let csv = "Category,Item Name,Quantity\n";
      Object.values(countMap).forEach(item => { csv += `"${item.category}","${item.name}",${item.qty}\n`; });
      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = `BOM_${projectId}.csv`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(t("toast_bom_exported"));
    } catch { toast.error(t("toast_bom_failed")); }
  };

  const handleExportSVG = () => {
    try {
      const svgString = generateSVG(canvas.objects, canvas.width, canvas.height);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = `worline-export-${projectId}.svg`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(t("toast_svg_exported"));
    } catch { toast.error(t("toast_svg_failed")); }
  };

  const exportPng = () => {
    const canvasEl = document.querySelector('canvas');
    if (canvasEl) {
      const link = document.createElement("a");
      link.href = canvasEl.toDataURL("image/png");
      link.download = "diagram.png"; link.click();
      toast.success(t("toast_png_exported"));
    }
  };

  return (
    <div className="h-12 border-b bg-background/95 backdrop-blur flex items-center px-2 md:px-4 justify-between gap-1 print:hidden shrink-0 z-50">
      {/* LEFT: Navigation + Core Tools */}
      <div className="flex items-center gap-1 min-w-0">
        <Link href="/app/projects">
          <Button variant="ghost" size="icon" className="w-8 h-8 shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="w-px h-5 bg-border mx-0.5 hidden sm:block" />

        <ToolBtn icon={Undo} label={t("tool_undo")} onClick={undo} disabled={!canUndo} />
        <ToolBtn icon={Redo} label={t("tool_redo")} onClick={redo} disabled={!canRedo} />
        <div className="w-px h-5 bg-border mx-0.5" />

        {/* Desktop Mode Buttons */}
        <div className="hidden md:flex items-center gap-1">
          <ToolBtn icon={MousePointer2} label={t("tool_select")} active={activeTool === "select"} onClick={() => setActiveTool("select")} />
          <ToolBtn icon={Cable} label={t("tool_wire")} active={activeTool === "wire"} onClick={() => setActiveTool("wire")} />
          <ToolBtn icon={Type} label={t("tool_text")} active={activeTool === "text"} onClick={() => setActiveTool("text")} />
        </div>

        {/* Mobile Mode Buttons */}
        <div className="flex md:hidden items-center gap-0.5">
          <ToolBtn icon={MousePointer2} label={t("tool_select")} active={activeTool === "select"} onClick={() => setActiveTool("select")} />
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button data-testid="mobile-tools-menu-btn" variant="ghost" size="icon" className="w-8 h-8">
                <Plus className="h-4 w-4" />
              </Button>
            } />
            <DropdownMenuContent align="start" className="w-48 z-[60]">
              <DropdownMenuItem data-testid="mobile-symbol-library-btn" onClick={onOpenLibrary}>
                <FolderOpen className="h-4 w-4 mr-2" /> {t("tool_symbol_lib")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTool("wire")}>
                <Cable className="h-4 w-4 mr-2" /> {t("tool_wire")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTool("shape")}>
                <Shapes className="h-4 w-4 mr-2" /> {t("tool_shape")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ToolBtn icon={Type} label={t("tool_text")} active={activeTool === "text"} onClick={() => setActiveTool("text")} />
        </div>

        {/* Desktop canvas tools */}
        <div className="hidden md:flex items-center gap-1">
          <div className="w-px h-5 bg-border mx-0.5" />
          <ToolBtn icon={Grid3x3} label={t("tool_grid_toggle")} active={gridVisible} onClick={handleToggleGrid} />
          <ToolBtn icon={Magnet} label={t("tool_snap_to_grid")} active={snapToGrid} onClick={toggleSnapToGrid} />
          <ToolBtn icon={Maximize} label={t("tool_fit_screen")} onClick={handleFitToScreen} />
        </div>

        {/* Transform tools (context-sensitive) */}
        {selectedIds.length > 0 && (
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-px h-5 bg-border mx-0.5" />
            <ToolBtn icon={RotateCw} label={t("tool_rotate_90")} onClick={rotateSelected} />
            <ToolBtn icon={FlipHorizontal} label={t("tool_flip_h")} onClick={flipSelectedH} />
            <ToolBtn icon={FlipVertical} label={t("tool_flip_v")} onClick={flipSelectedV} />
            <ToolBtn icon={Copy} label={t("tool_duplicate")} onClick={duplicateSelected} />
            <ToolBtn icon={Trash} label={t("tool_delete")} onClick={() => deleteObjects(selectedIds)} className="text-destructive hover:text-destructive" />
          </div>
        )}

        {/* Mobile: selected object quick actions */}
        {selectedIds.length > 0 && (
          <div className="flex sm:hidden items-center gap-1">
            <div className="w-px h-5 bg-border mx-0.5" />
            <ToolBtn icon={Copy} label={t("tool_duplicate")} onClick={duplicateSelected} />
            <ToolBtn icon={Trash} label={t("tool_delete")} onClick={() => deleteObjects(selectedIds)} className="text-destructive" />
          </div>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {onOpenPlugins && (
          <Button onClick={onOpenPlugins} variant="ghost" size="sm" className="gap-1.5 h-8 px-2 md:px-3 text-primary hidden sm:flex hover:bg-primary/10">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-xs font-semibold">{t("tool_plugins")}</span>
          </Button>
        )}

        {/* Desktop share/save */}
        <div className="hidden md:flex items-center gap-1">
          <Button onClick={handleShare} disabled={sharing} variant="ghost" size="sm" className="gap-1.5 h-8 px-2.5">
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="text-xs">{shared ? t("tool_copied") : t("tool_share")}</span>
          </Button>
        </div>

        <Button data-testid="save-btn" onClick={handleSave} disabled={saving} variant="outline" size="sm" className="gap-1.5 h-8 px-2.5">
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          <span className="text-xs hidden sm:inline">{saving ? t("tool_saving") : t("save")}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button data-testid="export-menu-btn" size="sm" className="gap-1.5 h-8 px-2.5">
              <Download className="h-3.5 w-3.5" />
              <span className="text-xs hidden sm:inline">{t("tool_export")}</span>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem data-testid="export-png-btn" onClick={exportPng}>{t("tool_export_png")}</DropdownMenuItem>
            <DropdownMenuItem data-testid="export-svg-btn" onClick={handleExportSVG}>{t("tool_export_svg")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="export-pdf-btn" onClick={exportPdf}>{t("tool_export_pdf")}</DropdownMenuItem>
            <DropdownMenuItem data-testid="export-bom-btn" onClick={exportBOM}>{t("tool_export_bom")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile overflow menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button data-testid="mobile-overflow-menu-btn" variant="ghost" size="icon" className="w-8 h-8 md:hidden">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={onOpenPlugins}>
              <LayoutGrid className="h-4 w-4 mr-2 text-primary" /> <span className="text-primary font-medium">{t("tool_plugins")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" /> {t("tool_share")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {selectedIds.length > 0 && (
              <>
                <DropdownMenuItem onClick={rotateSelected}>
                  <RotateCw className="h-4 w-4 mr-2" /> {t("tool_rotate_90")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={flipSelectedH}>
                  <FlipHorizontal className="h-4 w-4 mr-2" /> {t("tool_flip_h")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={flipSelectedV}>
                  <FlipVertical className="h-4 w-4 mr-2" /> {t("tool_flip_v")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={handleToggleGrid}>
              <Grid3x3 className="h-4 w-4 mr-2" /> {gridVisible ? t("tool_hide_grid") : t("tool_show_grid")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleSnapToGrid}>
              <Magnet className="h-4 w-4 mr-2" /> {snapToGrid ? t("tool_disable_snap") : t("tool_enable_snap")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleFitToScreen}>
              <Maximize className="h-4 w-4 mr-2" /> {t("tool_fit_screen")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
