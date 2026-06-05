"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ShareModal from "@/components/share-modal";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const mainScrollArea = document.getElementById("main-scroll-area");
            if (mainScrollArea) {
                setScrolled(mainScrollArea.scrollTop > 50);
            }
        };
        const mainScrollArea = document.getElementById("main-scroll-area");
        if (mainScrollArea) {
            mainScrollArea.addEventListener("scroll", handleScroll);
            return () => mainScrollArea.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-40 transition-colors duration-300 px-4 md:px-8 py-4 flex items-center justify-between",
                scrolled ? "bg-[#121212] shadow-md" : "bg-transparent"
            )}
        >
            {/* Left: Navigation Arrows */}
            <div className="flex items-center gap-2 hidden md:flex">
                <button className="bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5 text-white/50" />
                </button>
                <button className="bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-not-allowed">
                    <ChevronRight className="w-5 h-5 text-white/50" />
                </button>
            </div>

            {/* Mobile Menu Button Replacement? We'll just rely on the sidebar or hide it for now, 
                actually let's just make it a clean top bar on mobile too. */}
            <div className="md:hidden flex-1 font-bold text-white tracking-tighter">
                Brandon.
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleNavClick("#contact")}
                    className="hidden md:block text-sm font-bold px-4 py-1.5 rounded-full bg-white text-black hover:scale-105 transition-transform duration-200"
                >
                    Get In Touch
                </button>
                <ShareModal />
                <button className="bg-black p-1.5 rounded-full hover:scale-105 transition-transform duration-200 flex items-center gap-2 pl-2 pr-3">
                    <div className="bg-zinc-700 rounded-full p-1">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white hidden md:block">Brandon</span>
                </button>
            </div>
        </header>
    );
}
