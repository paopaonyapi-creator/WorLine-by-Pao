import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "WorLine pricing — All Pro features free until March 2027. Create unlimited single-line diagrams with full symbol library, PDF export, and cloud sync.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
