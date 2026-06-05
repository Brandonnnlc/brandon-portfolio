"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloatingLines from "@/components/ui/floating-lines";

export default function About() {
    return (
        <section id="about" className="relative py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-8"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white hover:underline cursor-pointer w-fit">
                        About
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-xl overflow-hidden bg-[#181818] group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                >
                    {/* Background image area with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/75 to-transparent z-10" />
                    
                    {/* WebGL Floating Waves background */}
                    <div className="absolute inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none">
                        <FloatingLines 
                            enabledWaves={["top","middle","bottom"]}
                            lineCount={8}
                            lineDistance={8}
                            bendRadius={8}
                            bendStrength={-2}
                            interactive
                            parallax={true}
                            animationSpeed={0.8}
                            linesGradient={["#1DB954", "#1ed760", "#121212"]}
                        />
                    </div>

                    <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-end min-h-[400px]">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter group-hover:underline">
                                1,204,593 Monthly Listeners
                            </h3>
                            <div className="space-y-4 text-white/80 leading-relaxed font-medium">
                                <p>
                                    I'm Brandon Lim Jia Cher — a UI/UX Designer and Frontend
                                    Developer currently pursuing my IT Diploma at Singapore
                                    Polytechnic.
                                </p>
                                <p>
                                    Through my internship at UBTS and current role at NATT
                                    Studio, I've honed my skills in user research, wireframing,
                                    prototyping, and delivering real design solutions. I founded Flow Studio to push
                                    my craft further and take on freelance projects.
                                </p>
                                <p>
                                    I'm also a content creator who grew to 1M+ Pinterest views
                                    and 5K+ Instagram followers through AI-generated content and
                                    strategic automation.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-4 flex items-center justify-between gap-8 hover:bg-black/60 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-xl">6M+</span>
                                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Pinterest Views</span>
                                </div>
                            </div>
                            <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-4 flex items-center justify-between gap-8 hover:bg-black/60 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-primary font-bold text-xl">5K+</span>
                                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">IG Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
