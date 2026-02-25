"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, Share2, Briefcase } from "lucide-react";

const PORTFOLIO_URL = "https://brandon-portfolio.vercel.app";

export default function ShareModal() {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(PORTFOLIO_URL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const input = document.createElement("input");
            input.value = PORTFOLIO_URL;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, []);

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
            >
                <Share2 className="w-4 h-4" />
                Share
            </button>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />

                        {/* Modal content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
                            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
                        >
                            <div className="relative w-full max-w-sm bg-surface border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                                {/* Green gradient header */}
                                <div className="relative h-32 bg-gradient-to-br from-primary/30 via-emerald-600/20 to-primary/10 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.15),transparent_70%)]" />
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", damping: 15 }}
                                        className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <Briefcase className="w-8 h-8 text-primary" />
                                    </motion.div>

                                    {/* Close button */}
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 text-center">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1"
                                    >
                                        Brandon Lim Jia Cher
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-sm text-muted-foreground mb-6"
                                    >
                                        UI/UX Designer · Open for Internships
                                    </motion.p>

                                    {/* QR Code */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.25, type: "spring", damping: 20 }}
                                        className="inline-block p-4 bg-white rounded-2xl mb-6"
                                    >
                                        <QRCodeSVG
                                            value={PORTFOLIO_URL}
                                            size={180}
                                            level="H"
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            includeMargin={false}
                                        />
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                        className="text-xs text-muted-foreground mb-4"
                                    >
                                        Scan to view my portfolio
                                    </motion.p>

                                    {/* URL + Copy */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center gap-2 bg-muted/50 border border-border/50 rounded-xl px-4 py-3"
                                    >
                                        <span className="text-xs text-muted-foreground truncate flex-1 text-left">
                                            {PORTFOLIO_URL}
                                        </span>
                                        <button
                                            onClick={handleCopy}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${copied
                                                    ? "bg-primary/20 text-primary"
                                                    : "bg-surface border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                                                }`}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-3 h-3" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
