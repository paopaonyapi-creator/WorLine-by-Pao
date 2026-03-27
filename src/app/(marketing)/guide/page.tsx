import { Zap, MousePointer2, Cable, Type, Download, Save, LayoutGrid, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "User Guide",
  description: "วิธีใช้ WorLine เครื่องมือวาดผังไฟฟ้า Single-Line Diagram ออนไลน์ — How to use WorLine",
};

const steps = [
  {
    icon: Layers,
    title: "1. Create a Project / สร้างโปรเจค",
    titleTh: "สร้างโปรเจคใหม่ หรือเลือกจากเทมเพลต",
    desc: "Go to Projects → Click '+ New Project' or use a pre-built Template (Motor Circuit, Substation, Solar PV, etc.)",
    descTh: "ไปที่หน้า โปรเจค → กด '+ New Project' หรือไปที่ เทมเพลต เพื่อเลือกแบบผังสำเร็จรูป",
  },
  {
    icon: MousePointer2,
    title: "2. Place Symbols / วางสัญลักษณ์",
    titleTh: "ลากสัญลักษณ์จากแถบด้านซ้ายวางบนผืนผ้าใบ",
    desc: "The left Palette has 100+ symbols in 7 categories. Drag & drop any symbol onto the canvas. Symbols automatically snap to the grid.",
    descTh: "แถบด้านซ้ายมี 100+ สัญลักษณ์ใน 7 หมวด ลากแล้ววางบน Canvas สัญลักษณ์จะล็อกตำแหน่งตาม Grid อัตโนมัติ",
  },
  {
    icon: Cable,
    title: "3. Draw Wires / วาดสายไฟ",
    titleTh: "เชื่อมต่อสัญลักษณ์ด้วยเครื่องมือ Wire",
    desc: "Click the Wire tool in the toolbar → Blue terminal dots appear on each symbol → Click one terminal, then click another to connect.",
    descTh: "กดปุ่ม Wire บน Toolbar → จุดสีน้ำเงินจะปรากฏบนสัญลักษณ์ → คลิกจุดเริ่มต้น แล้วคลิกจุดปลายทางเพื่อเชื่อมสาย",
  },
  {
    icon: Type,
    title: "4. Add Labels / เพิ่มชื่อ",
    titleTh: "ดับเบิ้ลคลิกสัญลักษณ์เพื่อตั้งชื่อ",
    desc: "Double-click any symbol to add a label (e.g. 'CB-01', 'TX 115/22kV', 'M1 5.5kW'). Use the Text tool to add free-form text anywhere.",
    descTh: "ดับเบิ้ลคลิกที่สัญลักษณ์ → พิมพ์ชื่อ เช่น 'CB-01', 'TX 115/22kV' กด Enter เพื่อบันทึก หรือใช้เครื่องมือ Text เพื่อพิมพ์อิสระ",
  },
  {
    icon: LayoutGrid,
    title: "5. Grid & Snap / ตารางและการล็อก",
    titleTh: "สัญลักษณ์จะล็อกตาม Grid อัตโนมัติ",
    desc: "All symbols snap to a 20px grid on placement and drag. This keeps your diagrams neat and professional.",
    descTh: "สัญลักษณ์ทุกตัวจะล็อกตามตาราง 20px อัตโนมัติเมื่อวางและลาก ทำให้ผังเรียบร้อยเป็นมืออาชีพ",
  },
  {
    icon: Save,
    title: "6. Save / บันทึก",
    titleTh: "กดปุ่ม Save เพื่อบันทึกผังบนคลาวด์",
    desc: "Click the Save button or Ctrl+S to save your diagram to the cloud. All changes are persisted in your account.",
    descTh: "กดปุ่ม Save หรือ Ctrl+S เพื่อบันทึกผังบนคลาวด์ ข้อมูลจะเก็บในบัญชีของคุณ",
  },
  {
    icon: Download,
    title: "7. Export / ส่งออก",
    titleTh: "ส่งออกเป็น PNG, SVG หรือ PDF",
    desc: "Click Export → Choose PNG (image), SVG (vector), or PDF (print-ready). Your diagram is exported at full quality.",
    descTh: "กดปุ่ม Export → เลือก PNG (รูปภาพ), SVG (เวกเตอร์) หรือ PDF (พร้อมพิมพ์) ผังจะส่งออกคุณภาพเต็ม",
  },
];

const shortcuts = [
  { keys: "Delete / Backspace", desc: "Delete selected / ลบที่เลือก" },
  { keys: "Ctrl+Z", desc: "Undo / ย้อนกลับ" },
  { keys: "Ctrl+Shift+Z / Ctrl+Y", desc: "Redo / ทำซ้ำ" },
  { keys: "Ctrl+D", desc: "Duplicate / คัดลอก" },
  { keys: "Escape", desc: "Cancel wire / deselect / ยกเลิก" },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            User Guide / วิธีใช้
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            How to Use <span className="text-primary">WorLine</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            วาดผังไฟฟ้า Single-Line Diagram แบบมืออาชีพ ด้วย 7 ขั้นตอนง่ายๆ
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
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  <p className="text-sm text-primary/70">{step.descTh}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-16 p-6 rounded-xl border bg-card">
          <h2 className="text-xl font-bold mb-4">⌨️ Keyboard Shortcuts / คีย์ลัด</h2>
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
          <h3 className="text-xl font-semibold">Ready to start? / พร้อมเริ่มวาดผังแล้ว?</h3>
          <div className="flex justify-center gap-4">
            <Link href="/app/projects">
              <Button size="lg">
                <Zap className="mr-2 h-4 w-4" />
                Open Editor
              </Button>
            </Link>
            <Link href="/app/templates">
              <Button size="lg" variant="outline">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
