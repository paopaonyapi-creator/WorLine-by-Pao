import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('consent', 'default', {
                  analytics_storage: 'granted',
                });
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* PWA Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
