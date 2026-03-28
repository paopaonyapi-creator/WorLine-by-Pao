"use client";

import { useLocale } from "@/lib/i18n/useLocale";

export default function TermsPage() {
  const { locale } = useLocale();

  return (
    <div className="py-24 max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-4">
        {locale === "th" ? "ข้อกำหนดการให้บริการ (Terms of Service)" : "Terms of Service"}
      </h1>
      <div className="text-muted-foreground whitespace-pre-wrap space-y-4 leading-relaxed">
        {locale === "th" ? (
          <>
            <p>
              ข้อกำหนดการให้บริการนี้ควบคุมการใช้งานแพลตฟอร์ม WorLine ของคุณ 
              การสร้างโปรเจคหรือใช้บริการของเราหมายความว่าคุณได้ตกลงและยอมรับในข้อกำหนดเหล่านี้
            </p>
            <p>
              คุณถือสิทธิ์ความเป็นเจ้าของทั้งหมดในไดอะแกรมไฟฟ้าและคอนเทนต์ที่คุณสร้างขึ้น 
              บริการ WorLine จัดหาให้ตาม "สภาพปัจจุบัน (as is)" โดยไม่มีการรับประกันใดๆ เพิ่มเติม
            </p>
            <p>
              เราขอสงวนสิทธิ์ในการจำกัดการใช้งาน API โควต้าการสร้างโปรเจค 
              หรือปิดบัญชีผู้ใช้ในกรณีที่มีการนำแพลตฟอร์มไปใช้ในทางมิชอบหรือละเมิดสิทธิ์โดยแจ้งหรือไม่ได้แจ้งล่วงหน้า
            </p>
          </>
        ) : (
          <>
            <p>
              These Terms of Service govern your use of WorLine. By creating a project, you agree to these terms.
            </p>
            <p>
              You retain all rights to the electrical diagrams you create. WorLine is provided "as is" without warranties.
            </p>
            <p>
              We reserve the right to limit API usage or terminate accounts that abuse the platform.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
