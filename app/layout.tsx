import type { Metadata, Viewport } from "next";
import { Lato, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ConditionalHeader, ConditionalFooter } from "@/components/ClientLayoutWrapper";
import { SITE, SITE_URL, SEO_KEYWORDS, jsonLd, siteJsonLd, geoMetaTags } from "@/lib/site";

const lato = Lato({
  variable: "--font-sans",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-condensed",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const DEFAULT_TITLE = 'Tip Top Uniforms Qatar | Uniforms & Bespoke Tailoring in Doha';

export const viewport: Viewport = {
  themeColor: '#FF6200',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Tip Top Uniforms Qatar',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'Clothing & Uniforms',
  alternates: {
    canonical: '/',
  },
  formatDetection: { telephone: true, email: true, address: true },
  other: geoMetaTags(),
  openGraph: {
    type: 'website',
    locale: 'en_QA',
    url: SITE_URL,
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Paste the content value from Google Search Console / Bing Webmaster "HTML tag" verification into these env vars.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${barlowCondensed.variable} antialiased h-full `} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground pb-16 md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteJsonLd())} />
        <ConditionalHeader />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
