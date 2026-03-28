"use client";

import { Zap, MousePointer2, Cable, Type, Download, Save, LayoutGrid, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/useLocale";

// Note: since this is a client component, metadata must be handled differently or omitted.
// For marketing pages, having dynamic text is fine. If SEO is strictly needed, 
// a layout or split components approach is better. But since we need dynamic translation, 
// client-side is acceptable here for WorLine.

export default function GuidePage() {
  const { locale } = useLocale();
  const isTh = locale === "th";

  const steps = [
    {
      icon: Layers,
      title: isTh ? "1. สร้างโปรเจค (Create a Project)" : "1. Create a Project",
      desc: isTh 
        ? "ไปที่เมนู 'โปรเจค' → คลิกปุ่ม '+ สร้างโปรเจคใหม่' หรือจะเลือกใช้เทมเพลตที่เตรียมไว้ให้ (เช่น วงจรมอเตอร์, สถานีไฟฟ้าย่อย, โซลาร์เซลล์ ฯลฯ) ก็ได้"
        : "Go to Projects → Click '+ New Project' or use a pre-built Template (Motor Circuit, Substation, Solar PV, etc.)",
    },
    {
      icon: MousePointer2,
      title: isTh ? "2. จัดวางสัญลักษณ์ (Place Symbols)" : "2. Place Symbols",
      desc: isTh
        ? "เลือกใช้จากคลังสัญลักษณ์กว่า 100 แบบใน 7 หมวดหมู่ เพียงแค่ลากสัญลักษณ์จากแถบใช้งานด้านซ้ายไปวางตำแหน่งที่ต้องการบนผืนผ้าใบ ระบบจะปรับตำแหน่งให้พอดีกับตาราง (Grid) อัตโนมัติ"
        : "The left Palette has 100+ symbols in 7 categories. Drag & drop any symbol onto the canvas. Symbols automatically snap to the grid.",
    },
    {
      icon: Cable,
      title: isTh ? "3. ลากสายไฟ (Draw Wires)" : "3. Draw Wires",
      desc: isTh
        ? "คลิกเครื่องมือดรอว์สายไฟ (Wire tool) เพื่อให้จุดขั้วต่อกระแสไฟสีน้ำเงินปรากฎให้คลิกที่ขั้วจุดเริ่มต้นของซิมโบลหนึ่งลากเชื่อมโยงขั้วต่อไปยังอีกซิมโบลหนึ่ง"
        : "Click the Wire tool in the toolbar → Blue terminal dots appear on each symbol → Click one terminal, then click another to connect.",
    },
    {
      icon: Type,
      title: isTh ? "4. ระบุชื่อตัวแปร (Add Labels)" : "4. Add Labels",
      desc: isTh
        ? "ดับเบิ้ลคลิกบริเวณซิมโบลเพื่อระบุชื่อตัวกำหนด หรือใช้ปุ่มเมนูเครื่องมือ Text (ตัวพิมพ์ T) สำหรับการลงข้อความอิสระตามที่คุณมุ่งหวัง"
        : "Double-click any symbol to add a label (e.g. 'CB-01', 'TX 115/22kV', 'M1 5.5kW'). Use the Text tool to add free-form text anywhere.",
    },
    {
      icon: LayoutGrid,
      title: isTh ? "5. ตารางอัจฉริยะและการล็อก (Grid & Snap)" : "5. Grid & Snap",
      desc: isTh
        ? "สัญลักษณ์และการลากสายไฟทั้งหมดถูกโปรแกรมบังคับให้ตรึงตำแหน่งด้วยสเกลรูปแบบ 20px ให้สปอร์ตดูเป็นระบบระเบียบ สะอาดและคงความมืออาชีพในการออกแบบไดอะแกรมของคุณ"
        : "All symbols snap to a 20px grid on placement and drag. This keeps your diagrams neat and professional.",
    },
    {
      icon: Save,
      title: isTh ? "6. บันทึกผลงาน (Save)" : "6. Save",
      desc: isTh
        ? "คลิกปุ่มบันทึกบนระบบ หรือจะกดแป้นพิมพ์ลัด Ctrl+S สำหรับการเก็บข้อมูลเอกสารขึ้นเซิร์ฟเวอร์คลาวด์ของเรา เพื่อสร้างความมั่นใจในทุกการแก้ไข"
        : "Click the Save button or Ctrl+S to save your diagram to the cloud. All changes are persisted in your account.",
    },
    {
      icon: Download,
      title: isTh ? "7. เอ็กซ์พอร์ตผลงาน (Export)" : "7. Export",
      desc: isTh
        ? "เลือกสั่งการส่งออกโปรเจกต์งานด้วยรูปแบบนามสกุลต่างๆ ไม่ว่าจะเป็นเวคเตอร์ .SVG ตลอดจนถึง .PDF และรูปภาพไฟล์สกุล .PNG ที่พรั่งพร้อมด้วยระดับคุณภาพความละเอียดสูง"
        : "Click Export → Choose PNG (image), SVG (vector), or PDF (print-ready). Your diagram is exported at full quality.",
    },
  ];

  const shortcuts = [
    { keys: "Delete / Backspace", desc: isTh ? "ลบรายการที่เลือก (Delete selected)" : "Delete selected" },
    { keys: "Ctrl+Z", desc: isTh ? "ย้อนกลับการกระทำ (Undo)" : "Undo" },
    { keys: "Ctrl+Shift+Z / Ctrl+Y", desc: isTh ? "ทำซ้ำการกระทำ (Redo)" : "Redo" },
    { keys: "Ctrl+D", desc: isTh ? "คัดลอกรายการทำซ้ำ (Duplicate)" : "Duplicate" },
    { keys: "Escape", desc: isTh ? "ยกเลิกการกระทำ เลือกออกให้หมด (Cancel wire/deselect)" : "Cancel wire / deselect / ยกเลิก" },
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            {isTh ? "คู่มือการใช้งานแพลตฟอร์ม" : "User Guide"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {isTh ? "ขั้นตอนการทำงานของ" : "How to Use"} <span className="text-primary">WorLine</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isTh 
              ? "สร้างสรรค์การวาดผังไฟฟ้าไดอะแกรม Single-Line ระดับมืออาชีพผ่านเครื่องมือมาตรฐาน"
              : "Create professional Single-Line Diagrams with these easy steps."}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-xl border bg-card hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-16 p-6 rounded-xl border bg-card">
          <h2 className="text-xl font-bold mb-4">⌨️ {isTh ? "คีย์ลัดบนแป้นพิมพ์ (Keyboard Shortcuts)" : "Keyboard Shortcuts"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border text-muted-foreground whitespace-nowrap">
                  {s.keys}
                </kbd>
                <span className="text-sm">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center space-y-4">
          <h3 className="text-xl font-semibold">
            {isTh ? "เริ่มต้นวาดผังในแบบของคุณได้เลย" : "Ready to start?"}
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/app/projects" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                {isTh ? "เปิดหน้าจัดการโปรเจค" : "Open Editor"}
              </Button>
            </Link>
            <Link href="/app/templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                {isTh ? "ดูเทมเพลตทั้งหมด" : "Browse Templates"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
