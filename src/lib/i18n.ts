export type Locale = "en" | "th";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Toolbar
    "tool.select": "Select",
    "tool.text": "Text",
    "tool.wire": "Wire",
    "tool.save": "Save",
    "tool.saving": "Saving...",
    "tool.share": "Share",
    "tool.copied": "Copied",
    "tool.export": "Export",
    "tool.export_png": "Export as PNG",
    "tool.export_svg": "Export as SVG",
    "tool.export_pdf": "Export as PDF (A4 + Title Block)",
    "tool.export_bom": "Export BOM (Excel/CSV)",
    "tool.grid": "Toggle Grid",
    "tool.fit": "Fit to Screen",
    "tool.snap": "Snap to Grid",
    "tool.rotate": "Rotate 90°",
    "tool.flip_h": "Flip Horizontal",
    "tool.flip_v": "Flip Vertical",
    "tool.align_h": "Align Horizontally",
    "tool.align_v": "Align Vertically",

    // Properties
    "prop.title": "Properties",
    "prop.type": "Type",
    "prop.position": "Position",
    "prop.rotation": "Rotation",
    "prop.label": "Label / Tag",
    "prop.power": "Rated Power",
    "prop.current": "Rated Current",
    "prop.voltage": "Voltage",
    "prop.ratio": "Ratio",
    "prop.cable": "Cable Size",
    "prop.notes": "Notes",
    "prop.wire_color": "Wire Color",
    "prop.thickness": "Thickness",
    "prop.wire_label": "Wire Label",
    "prop.delete": "Delete",
    "prop.duplicate": "Duplicate",
    "prop.no_selection": "Select an object to edit properties",

    // Canvas
    "canvas.wire_start": "Click a terminal dot to start wire",
    "canvas.wire_end": "Click a terminal to connect • Esc to cancel",

    // Search
    "search.placeholder": "Search symbols... (e.g. fuse, motor)",
    "search.no_results": "No symbols found",
    "search.hint": "Ctrl+K to open · Enter to place · Esc to close",

    // BOM
    "bom.title": "Bill of Materials",
    "bom.export_csv": "Export CSV",
    "bom.symbol": "Symbol",
    "bom.category": "Category",
    "bom.qty": "Qty",
    "bom.labels": "Labels",
    "bom.power_current": "Power/Current",

    // Load Calc
    "load.title": "Load Summary",
    "load.components": "Components",
    "load.total_symbols": "Total Symbols",
    "load.total_wires": "Total Wires",
    "load.estimate": "Load Estimate",
    "load.total": "Total Load",
    "load.current": "Est. Current (3φ 400V)",
    "load.cable": "Cable Size",
    "load.disclaimer": "* Estimates only. PF=0.85, 3φ 400V. Verify with engineering calculations.",

    // General
    "general.selected": "objects selected",
  },
  th: {
    // Toolbar
    "tool.select": "เลือก",
    "tool.text": "ข้อความ",
    "tool.wire": "สายไฟ",
    "tool.save": "บันทึก",
    "tool.saving": "กำลังบันทึก...",
    "tool.share": "แชร์",
    "tool.copied": "คัดลอกแล้ว",
    "tool.export": "ส่งออก",
    "tool.export_png": "ส่งออกเป็น PNG",
    "tool.export_svg": "ส่งออกเป็น SVG",
    "tool.export_pdf": "ส่งออกเป็น PDF (A4 + Title Block)",
    "tool.export_bom": "ส่งออก BOM (Excel/CSV)",
    "tool.grid": "เปิด/ปิดเส้นกริด",
    "tool.fit": "พอดีหน้าจอ",
    "tool.snap": "จัดเส้นกริด",
    "tool.rotate": "หมุน 90°",
    "tool.flip_h": "พลิกแนวนอน",
    "tool.flip_v": "พลิกแนวตั้ง",
    "tool.align_h": "จัดแนวนอน",
    "tool.align_v": "จัดแนวตั้ง",

    // Properties
    "prop.title": "คุณสมบัติ",
    "prop.type": "ชนิด",
    "prop.position": "ตำแหน่ง",
    "prop.rotation": "การหมุน",
    "prop.label": "ป้ายกำกับ",
    "prop.power": "กำลังไฟ",
    "prop.current": "กระแสพิกัด",
    "prop.voltage": "แรงดัน",
    "prop.ratio": "อัตราส่วน",
    "prop.cable": "ขนาดสายไฟ",
    "prop.notes": "บันทึก",
    "prop.wire_color": "สีสาย",
    "prop.thickness": "ความหนา",
    "prop.wire_label": "ป้ายสาย",
    "prop.delete": "ลบ",
    "prop.duplicate": "ทำซ้ำ",
    "prop.no_selection": "เลือกอุปกรณ์เพื่อแก้ไขคุณสมบัติ",

    // Canvas
    "canvas.wire_start": "คลิกจุดต่อเพื่อเริ่มสายไฟ",
    "canvas.wire_end": "คลิกจุดต่อเพื่อเชื่อมสาย • Esc เพื่อยกเลิก",

    // Search
    "search.placeholder": "ค้นหาอุปกรณ์... (เช่น ฟิวส์, มอเตอร์)",
    "search.no_results": "ไม่พบอุปกรณ์",
    "search.hint": "Ctrl+K เปิด · Enter วาง · Esc ปิด",

    // BOM
    "bom.title": "รายการอุปกรณ์",
    "bom.export_csv": "ส่งออก CSV",
    "bom.symbol": "อุปกรณ์",
    "bom.category": "หมวดหมู่",
    "bom.qty": "จำนวน",
    "bom.labels": "ป้าย",
    "bom.power_current": "กำลัง/กระแส",

    // Load Calc
    "load.title": "สรุปโหลด",
    "load.components": "อุปกรณ์",
    "load.total_symbols": "อุปกรณ์ทั้งหมด",
    "load.total_wires": "สายไฟทั้งหมด",
    "load.estimate": "ประมาณการโหลด",
    "load.total": "โหลดรวม",
    "load.current": "กระแสโดยประมาณ (3φ 400V)",
    "load.cable": "ขนาดสาย",
    "load.disclaimer": "* ค่าประมาณเท่านั้น PF=0.85, 3φ 400V ตรวจสอบกับการคำนวณทางวิศวกรรม",

    // General
    "general.selected": "ชิ้นที่เลือก",
  },
};

// Simple locale hook using localStorage
import { useState, useEffect, useCallback } from "react";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("worline-locale") as Locale;
    if (saved && (saved === "en" || saved === "th")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("worline-locale", l);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale][key] || key;
  }, [locale]);

  return { locale, setLocale, t };
}
