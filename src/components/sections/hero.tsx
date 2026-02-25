"use client";

import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Hero() {
    const headingLines = [
        { text: "HI THERE", highlight: false },
        { text: "I'M BRANDON", highlight: false },
        { text: "UI/UX", highlight: true },
        { text: "DESIGNER", highlight: true },
    ];

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient orb */}
            <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(34,197,94,0.6) 0%, rgba(16,185,129,0.3) 40%, transparent 70%)",
                }}
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            />

            {/* Secondary smaller orb */}
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(34,197,94,0.5) 0%, transparent 70%)",
                }}
                animate={{
                    x: [0, -20, 30, 0],
                    y: [0, 25, -15, 0],
                    scale: [1, 0.9, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Heading */}
                <div className="mb-8">
                    {headingLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.2 + i * 0.15,
                                ease: "easeOut",
                            }}
                        >
                            <h1
                                className={`font-[family-name:var(--font-space-grotesk)] font-bold tracking-tighter leading-[0.9] ${line.highlight
                                        ? "text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"
                                        : "text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground"
                                    }`}
                            >
                                {line.text}
                            </h1>
                        </motion.div>
                    ))}
                </div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
                >
                    Bridging design intuition with technical execution.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-muted-foreground/70 text-sm md:text-base max-w-lg mx-auto mb-10"
                >
                    SP Diploma in IT · Internship @ UBTS · Flow Studio Founder
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex items-center justify-center gap-4"
                >
                    <InteractiveHoverButton
                        text="About Me"
                        className="w-36 text-foreground"
                        onClick={() =>
                            document
                                .querySelector("#about")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    />
                    <InteractiveHoverButton
                        text="Projects"
                        className="w-36 text-foreground"
                        onClick={() =>
                            document
                                .querySelector("#projects")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1"
                    >
                        <motion.div className="w-1 h-2 rounded-full bg-primary" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
