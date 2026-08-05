import type { Metadata } from "next";
import { Lato, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ConditionalHeader, ConditionalFooter } from "@/components/ClientLayoutWrapper";

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

const BASE_URL = 'https://tiptopuniforms.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Tip Top Uniforms Trading — Bespoke Tailoring, Doha Qatar',
    template: '%s | Tip Top Uniforms Trading',
  },
  description:
    'Custom uniforms for corporate, industrial, hospitality, school & more. Genuine bespoke tailoring made-to-measure in Doha, Qatar.',
  keywords: [
    'uniforms Qatar',
    'bespoke tailoring Doha',
    'corporate uniforms',
    'workwear Qatar',
    'school uniforms Doha',
    'hospitality uniforms',
    'custom uniforms',
    'Tip Top Uniforms',
  ],
  authors: [{ name: 'Tip Top Uniforms Trading W.L.L' }],
  creator: 'Tip Top Uniforms Trading W.L.L',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_QA',
    url: BASE_URL,
    siteName: 'Tip Top Uniforms Trading',
    title: 'Tip Top Uniforms Trading — Bespoke Tailoring, Doha Qatar',
    description:
      'Custom uniforms for corporate, industrial, hospitality, school & more. Genuine bespoke tailoring made-to-measure in Doha, Qatar.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tip Top Uniforms Trading — Bespoke Tailoring, Doha Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Top Uniforms Trading — Bespoke Tailoring, Doha Qatar',
    description:
      'Custom uniforms for corporate, industrial, hospitality, school & more. Genuine bespoke tailoring made-to-measure in Doha, Qatar.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <ConditionalHeader />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
