import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import NowPlayingBar from "@/components/ui/now-playing-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brandon | Portfolio",
  description:
    "Personal portfolio showcasing projects, experience, and journey — built for university admissions.",
  openGraph: {
    title: "Brandon | Portfolio",
    description:
      "Personal portfolio showcasing projects, experience, and journey.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-black text-white h-screen overflow-hidden flex flex-col select-none`}
        suppressHydrationWarning
      >
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-6rem)]">
          <Sidebar />
          <div id="main-scroll-area" className="flex-1 overflow-y-auto bg-gradient-to-b from-[#2a2a2a] to-[#121212] relative rounded-lg m-2 ml-0 md:ml-2">
            <div id="content-wrapper" className="min-h-full pb-32">
              {children}
            </div>
          </div>
        </div>
        <NowPlayingBar />
      </body>
    </html>
  );
}
