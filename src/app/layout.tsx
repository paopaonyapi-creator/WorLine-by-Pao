import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WorLine by Pao — Professional Single-Line Diagram Editor",
    template: "%s | WorLine by Pao",
  },
  description: "Create professional electrical single-line diagrams online. Drag-and-drop editor with IEC/IEEE symbols, cloud save, and PDF export. Built for engineers.",
  keywords: ["single-line diagram", "electrical diagram", "SLD editor", "electrical engineering", "one-line diagram", "WorLine"],
  authors: [{ name: "WorLine by Pao" }],
  creator: "WorLine by Pao",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://worline-by-pao-production.up.railway.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WorLine by Pao",
    title: "WorLine by Pao — Professional Single-Line Diagram Editor",
    description: "Create professional electrical single-line diagrams online. Drag-and-drop editor with IEC/IEEE symbols, cloud save, and PDF export.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorLine by Pao — Professional Single-Line Diagram Editor",
    description: "Create professional electrical single-line diagrams online. Built for engineers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
