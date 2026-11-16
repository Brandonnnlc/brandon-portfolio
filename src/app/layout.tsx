import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import ScrollDirector from "@/components/scroll-director";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

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
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <SmoothScroll />
        <Cursor />
        <PageTransition>
          <ScrollDirector />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
