"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-24 md:py-36 overflow-hidden"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text column */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-widest uppercase">
                                About Me
                            </span>
                        </div>

                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Discover the
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                professional journey
                            </span>
                            <br />
                            of a designer.
                        </h2>

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I&apos;m Brandon Lim Jia Cher — a UI/UX Designer and Frontend
                                Developer currently pursuing my IT Diploma at Singapore
                                Polytechnic. My journey into design started with a curiosity for
                                how people interact with technology, which led me to discover
                                the world of user experience.
                            </p>
                            <p>
                                Through my internship at UBTS and current role at NATT
                                Studio, I&apos;ve honed my skills in user research, wireframing,
                                prototyping, and delivering real design solutions for actual
                                clients. I founded Flow Studio — my own design agency — to push
                                my craft further and take on freelance projects.
                            </p>
                            <p>
                                I&apos;m also a content creator who grew to 1M+ Pinterest views
                                and 5K+ Instagram followers through AI-generated content and
                                strategic automation. I believe great design sits at the
                                intersection of empathy, aesthetics, and technical execution.
                            </p>
                        </div>
                    </motion.div>

                    {/* Visual column */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border/50">
                            <Image
                                src="/images/brandon-profile.jpg"
                                alt="Brandon Lim Jia Cher"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                            className="absolute -top-4 -right-4 bg-surface border border-border/50 rounded-xl px-4 py-3 shadow-lg shadow-black/20"
                        >
                            <p className="text-2xl font-bold text-foreground">6M+</p>
                            <p className="text-xs text-muted-foreground">Pinterest Views</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                            className="absolute -bottom-4 -left-4 bg-surface border border-border/50 rounded-xl px-4 py-3 shadow-lg shadow-black/20"
                        >
                            <p className="text-2xl font-bold text-primary">3K+</p>
                            <p className="text-xs text-muted-foreground">IG Followers</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
