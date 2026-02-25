"use client";

import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Mail, MapPin, Send } from "lucide-react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative py-24 md:py-36 overflow-hidden"
        >
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[120px] pointer-events-none bg-gradient-to-t from-primary/40 to-transparent" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="mx-auto max-w-4xl px-6 text-center"
            >
                {/* Large heading */}
                <motion.h2
                    variants={itemVariants}
                    className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                >
                    LET&apos;S{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                        ✦
                    </span>{" "}
                    CREATE
                    <br />
                    GREAT THINGS.
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mt-6 leading-relaxed"
                >
                    I&apos;m always excited to connect with new people. Whether it&apos;s
                    about a project idea, a collaboration, or just to say hello — don&apos;t
                    hesitate to reach out.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="mt-10 flex justify-center">
                    <InteractiveHoverButton
                        text="Say Hello"
                        className="w-40 text-foreground text-base"
                        onClick={() =>
                            window.open("mailto:blc33833@gmail.com", "_blank")
                        }
                    />
                </motion.div>

                {/* Info cards */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-border/50 hover:border-primary/30 transition-colors duration-300">
                        <Mail className="w-6 h-6 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            blc33833@gmail.com
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-border/50 hover:border-primary/30 transition-colors duration-300">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            Singapore
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-border/50 hover:border-primary/30 transition-colors duration-300">
                        <Send className="w-6 h-6 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            Open to opportunities
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
