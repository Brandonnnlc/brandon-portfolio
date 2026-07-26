import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollDirector from "@/components/scroll-director";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Brandon Lim — Designer & Creative Developer",
  description:
    "Singapore-based UI/UX designer and frontend developer creating useful, expressive digital products.",
  openGraph: {
    title: "Brandon Lim — Designer & Creative Developer",
    description:
      "Product design, frontend engineering and visual experiments from Singapore.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brandon Lim — Designer and Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Lim — Designer & Creative Developer",
    description:
      "Product design, frontend engineering and visual experiments from Singapore.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ScrollDirector />
        {children}
      </body>
    </html>
  );
}
