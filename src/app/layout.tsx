import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paytonix | Single Pane of Glass for Founders & Executives",
  description:
    "Stop running on delayed data and spreadsheet chaos. Unified marketing, sales, and financial dashboards—enterprise-grade architecture without full-time overhead.",
  metadataBase: new URL("https://paytonix.net"),
  openGraph: {
    title: "Paytonix — Operational Clarity for Growth Leaders",
    description:
      "Your company's Single Pane of Glass. Real-time executive dashboards engineered by a Fractional CTO & Growth Architect.",
    url: "https://paytonix.net",
    siteName: "Paytonix",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
