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

export const metadata: Metadata = {
  title: "Tip Top Uniforms Trading — Bespoke Tailoring, Doha Qatar",
  description: "Custom uniforms for corporate, industrial, hospitality, school & more. Genuine bespoke tailoring made-to-measure in Qatar.",
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
