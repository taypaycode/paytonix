import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";
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
  title: {
    default: "Revenue Data Reliability & Attribution Audits | Paytonix",
    template: "%s | Paytonix",
  },
  description:
    "Find where customer journeys, campaign attribution, CRM records, warehouse models, and reported revenue break apart before more budget is wasted.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Paytonix — Revenue Data Reliability",
    description:
      "Find where customer journeys, attribution, CRM records, and reported revenue break apart—before more budget is allocated using bad data.",
    url: SITE_URL,
    siteName: "Paytonix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paytonix — Revenue Data Reliability",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paytonix — Revenue Data Reliability",
    description:
      "Find where customer journeys, attribution, CRM records, and reported revenue break apart—before more budget is allocated using bad data.",
    images: ["/og-image.png"],
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
            ${GA4_MEASUREMENT_ID ? `gtag('config', '${GA4_MEASUREMENT_ID}');` : ""}
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
