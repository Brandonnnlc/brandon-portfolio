"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ShareModal from "@/components/share-modal";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#timeline" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-black/70 backdrop-blur-xl border-b border-border/30"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                >
                    Brandon
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item.href)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                    <button
                        onClick={() => handleNavClick("#contact")}
                        className="text-sm px-5 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                        Get In Touch
                    </button>
                    <ShareModal />
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-xl border-b border-border/30 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-left text-lg text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavClick("#contact")}
                                className="mt-2 text-sm px-5 py-2.5 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-fit"
                            >
                                Get In Touch
                            </button>
                            <div className="mt-2">
                                <ShareModal />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
