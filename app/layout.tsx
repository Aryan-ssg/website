import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { PageShell } from "@/components/layout/page-shell";

import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

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
    default: "OBSIDIAN — Architecture of the Unseen",
    template: "%s | OBSIDIAN",
  },
  description:
    "A spatial design studio working between mass, light, and silence. Rendered and drawn.",
  openGraph: {
    title: "OBSIDIAN — Architecture of the Unseen",
    description:
      "A spatial design studio working between mass, light, and silence.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageShell>{children}</PageShell>
        <Toaster />
      </body>
    </html>
  );
}