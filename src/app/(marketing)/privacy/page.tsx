"use client";

import { useLocale } from "@/lib/i18n/useLocale";

export default function PrivacyPage() {
  const { t, locale } = useLocale();

  return (
    <div className="py-24 max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-4">
        {locale === "th" ? "นโยบายความเป็นส่วนตัว (Privacy Policy)" : "Privacy Policy"}
      </h1>
      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
        {locale === "th" ? (
          <>
            เราเคารพในความเป็นส่วนตัวของคุณ
            ไดอะแกรมและข้อมูลเมตาต้าทั้งหมดของคุณจะถูกจัดเก็บไว้อย่างปลอดภัยและจะไม่ถูกเปิดเผยต่อบุคคลที่สามโดยเด็ดขาด 
            ข้อมูลการชำระเงินของคุณจะถูกประมวลผลอย่างปลอดภัยโดยระบบ Stripe และจะไม่ถูกจัดเก็บไว้ในเซิร์ฟเวอร์ของ WorLine แต่อย่างใด
          </>
        ) : (
          <>
            We respect your privacy.
            Your diagrams and metadata are stored securely and won't be shared with third parties.
            Payment details are processed securely by Stripe and are not stored by WorLine directly.
          </>
        )}
      </p>
    </div>
  );
}
