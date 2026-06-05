"use client";

import { motion } from "framer-motion";
import { Play, MoreHorizontal, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section id="hero" className="relative flex flex-col">
            {/* Header Area */}
            <div className="pt-24 pb-8 px-4 md:px-8 flex flex-col md:flex-row items-end gap-6 bg-gradient-to-b from-[#2a2a2a] to-transparent">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-green-400 to-blue-600 shadow-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden group"
                >
                    <Image
                        src="/images/brandon-profile.jpg"
                        alt="Brandon"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                </motion.div>

                <div className="flex flex-col gap-2 z-10 w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-6 h-6 text-[#3d91f4] fill-[#3d91f4]/20" />
                        <span className="text-sm font-medium text-white">Verified Developer</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-[140px] font-bold text-white tracking-tighter leading-[0.9]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                        Brandon.
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground mt-4 text-sm md:text-base font-medium flex items-center gap-1"
                    >
                        UI/UX Designer · Frontend Developer · <span className="text-white font-bold ml-1">1,204,593</span> monthly clicks
                    </motion.div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 md:px-8 py-6 flex items-center gap-6">
                <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="w-14 h-14 bg-primary hover:bg-[#1ed760] hover:scale-105 transition-all duration-200 rounded-full flex items-center justify-center text-black shadow-lg"
                    onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <Play className="w-7 h-7 fill-current ml-1" />
                </motion.button>
                
                <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="px-4 py-1.5 rounded-full border border-white/30 text-white font-bold text-sm hover:border-white transition-colors"
                    onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                >
                    Follow
                </motion.button>
                
                <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-white/60 hover:text-white transition-colors"
                >
                    <MoreHorizontal className="w-8 h-8" />
                </motion.button>
            </div>
        </section>
    );
}
