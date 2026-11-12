import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Header } from "@/components/Header";
import { getCategories, getSiteSettings } from "@/lib/db";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gsmsolarlight.com"
  ),
  title: {
    default: "GSM Solar Light | Solar Energy & Power Solutions in Mathura",
    template: "%s | GSM Solar Light",
  },
  description:
    "GSM Solar Light is a solar energy and power solutions company in Mathura, Uttar Pradesh. Solar projects up to 1 MW, multiple 10 kW rooftop installations, solar equipment, lithium-ion batteries, E-rickshaw chargers, and Mtek Power & Getsun Power distribution.",
  keywords: [
    "Solar company in Mathura",
    "Solar panel dealer in Mathura",
    "Solar installation company in Mathura",
    "Rooftop solar installation in Mathura",
    "Commercial solar solutions",
    "Industrial solar projects",
    "Lithium-ion battery supplier",
    "E-rickshaw charger supplier",
    "Mtek Power distributor",
    "Getsun Power distributor",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GSM Solar Light",
    title: "GSM Solar Light | Powering a Brighter, Sustainable Future",
    description:
      "Solar energy systems, solar equipment, lithium-ion batteries, E-rickshaw chargers and power solutions in Mathura, Uttar Pradesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSiteSettings();
  const categories = getCategories();
  const gaId =
    settings.gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        <Header settings={settings} categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} categories={categories} />
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}

