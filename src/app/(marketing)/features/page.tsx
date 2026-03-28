"use client";

import { useLocale } from "@/lib/i18n/useLocale";
import { Zap, Download, Layers, Shield, Palette, Users, Cloud, MonitorSmartphone } from "lucide-react";

export default function FeaturesPage() {
  const { locale } = useLocale();
  const isTh = locale === "th";

  const features = [
    {
      icon: Zap,
      title: isTh ? "ตัวแก้ไขแบบลากวาง" : "Drag & Drop Editor",
      description: isTh 
        ? "จัดวางเจเนอเรเตอร์ หม้อแปลง เบรกเกอร์ และอื่นๆ ได้อย่างง่ายดาย เพียงลากสัญลักษณ์จากแถบเครื่องมือลงบนแคนวาสของคุณ"
        : "Intuitively place generators, transformers, breakers, and more — simply drag from the symbol palette onto your diagram canvas.",
    },
    {
      icon: Layers,
      title: isTh ? "ระบบลากสายไฟอัจฉริยะ" : "Smart Wire Routing",
      description: isTh
        ? "ระบบลากสายแบบมุมฉากอัตโนมัติจะเชื่อมต่อไปยังขั้วต่อได้แม่นยำ การเชื่อมต่อจะยังคงเป็นระเบียบแม้จะมีการเคลื่อนย้ายอุปกรณ์"
        : "Automatic orthogonal routing snaps wires between terminals. Connections stay clean even when you move components.",
    },
    {
      icon: Download,
      title: isTh ? "ส่งออกเป็น SVG และ PDF" : "SVG & PDF Export",
      description: isTh
        ? "ส่งออกซิงเกิลไลน์ไดอะแกรมพร้อมพิมพ์ในรูปแบบเวกเตอร์ SVG หรือเอกสาร PDF สำหรับทำรายงาน ยื่นเอกสาร หรือสั่งพิมพ์"
        : "Export publication-ready single-line diagrams as SVG vectors or PDF documents for reports, submissions, and printing.",
    },
    {
      icon: Palette,
      title: isTh ? "คลังสัญลักษณ์มาตรฐาน IEC และ IEEE" : "IEC & IEEE Symbol Library",
      description: isTh
        ? "คลังสัญลักษณ์ที่ครอบคลุม ทั้งเครื่องกำเนิดไฟฟ้า มอเตอร์ หม้อแปลง สวิตช์เกียร์ รีเลย์ป้องกัน และอื่นๆ สร้างขึ้นตามมาตรฐานสากล"
        : "Comprehensive symbol set covering generators, motors, transformers, switchgear, protection relays, and more — built to international standards.",
    },
    {
      icon: Cloud,
      title: isTh ? "บันทึกและซิงค์คลาวด์" : "Cloud Save & Sync",
      description: isTh
        ? "โปรเจคของคุณจะถูกเข้ารหัสเก็บไว้อย่างปลอดภัยบนคลาวด์ สามารถกลับมาทำงานที่ค้างไว้ได้จากทุกอุปกรณ์ ตลอดเวลา"
        : "Your projects are securely stored in the cloud. Pick up where you left off from any device, any time.",
    },
    {
      icon: Shield,
      title: isTh ? "ประวัติการแก้ไข" : "Version History",
      description: isTh
        ? "ไม่ต้องกลัวงานหาย ระบบบันทึกเวอร์ชันอัตโนมัติช่วยให้คุณสามารถตรวจสอบ เทียบ และกู้คืนไดอะแกรมจากเวอร์ชันก่อนหน้าได้"
        : "Never lose work. Automatic version snapshots let you review, compare, and restore previous diagram revisions.",
    },
    {
      icon: Users,
      title: isTh ? "การทำงานร่วมกันเป็นทีม" : "Team Collaboration",
      description: isTh
        ? "แชร์โปรเจคกับเพื่อนร่วมงาน ระบบทำงานร่วมกันแบบเรียลไทม์ช่วยให้วิศวกรหลายคนทำงานบนไดอะแกรมเดียวกันได้พร้อมๆ กัน"
        : "Share projects with colleagues. Real-time collaboration lets multiple engineers work on the same diagram simultaneously.",
    },
    {
      icon: MonitorSmartphone,
      title: isTh ? "ใช้งานได้ทุกที่" : "Works Everywhere",
      description: isTh
        ? "WorLine สามารถทำงานได้บนบราวเซอร์เต็มรูปแบบ ไม่ต้องติดตั้งโปรแกรม รองรับการใช้งานผ่านเดสก์ท็อป แท็บเล็ต และมือถือ"
        : "WorLine runs entirely in the browser — no installation required. Works on desktop, tablet, and modern mobile browsers.",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium mb-6 bg-primary/5 text-primary border-primary/20">
          {isTh ? "มีทุกสิ่งที่คุณต้องการ" : "Everything you need"}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          {isTh ? "ฟีเจอร์ทรงพลังสำหรับ " : "Powerful features for "}
          <br className="md:hidden" />
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            {isTh ? "การเขียนแบบมืออาชีพ" : "professional diagrams"}
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {isTh 
            ? "WorLine มอบชุดเครื่องมือบนเว็บที่ทันสมัยสำหรับวิศวกรไฟฟ้า เพื่อสร้าง แก้ไข และส่งออกซิงเกิลไลน์ไดอะแกรม โดยไม่ต้องติดตั้งโปรแกรมคอมพิวเตอร์แบบเดิม" 
            : "WorLine gives electrical engineers a modern, web-based toolkit to create, edit, and export single-line diagrams — no desktop software required."}
        </p>
      </section>

      {/* Feature Grid */}
      <section className="pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 text-center">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-blue-500/5 p-12 md:p-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isTh ? "พร้อมเริ่มต้นเขียนแบบหรือยัง?" : "Ready to start drawing?"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {isTh 
              ? "สร้างซิงเกิลไลน์ไดอะแกรมแรกของคุณในไม่กี่นาที — ไม่ต้องใช้บัตรเครดิต" 
              : "Create your first single-line diagram in minutes — no credit card required."}
          </p>
          <a
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            {isTh ? "เริ่มต้นใช้งานฟรี" : "Get Started Free"}
          </a>
        </div>
      </section>
    </div>
  );
}
