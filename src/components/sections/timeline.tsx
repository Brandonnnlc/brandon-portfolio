"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Palette, Award } from "lucide-react";

const timelineItems = [
    {
        date: "Feb 2025 — Present",
        title: "Junior UI/UX Designer · Part-Time",
        organization: "Cross Code Studio (Running Stream Group)",
        description:
            "Contributing to end-to-end design projects for clients. Involved in design research, wireframing, prototyping, and presenting design solutions. Collaborating closely with clients and the development team.",
        icon: Briefcase,
    },
    {
        date: "Mar 2024 — Jan 2025",
        title: "UI/UX Designer · Intern",
        organization: "UBTS",
        description:
            "Worked on the chemical logistics platform — contributing to user research, wireframing, and high-fidelity UI design. Delivered user-centred solutions alongside senior designers for real stakeholders.",
        icon: Briefcase,
    },
    {
        date: "2022 — 2023",
        title: "Content Creator · Social Media",
        organization: "Self-Initiated (YouTube & Instagram)",
        description:
            "Ran YouTube and Instagram channels focused on AI-generated content. Created visuals using Midjourney and Photoshop, built automated workflows with Make.com. Grew to 1M+ Pinterest views and 5K+ Instagram followers.",
        icon: Palette,
    },
    {
        date: "2022 — Present",
        title: "Diploma in Information Technology",
        organization: "Singapore Polytechnic (SP)",
        description:
            "Pursuing IT diploma with a focus on UI/UX design and frontend development. Building a strong foundation in design thinking, web technologies, and user research methodologies.",
        icon: GraduationCap,
    },
    {
        date: "2024",
        title: "Google UX Design Certified",
        organization: "Google / Coursera",
        description:
            "Completed the Google UX Design Professional Certificate. Also earned certifications in Digital Marketing, Generative AI Leadership, and AI Ethics & Governance.",
        icon: Award,
    },
];

const cardVariants = {
    hidden: (isEven: boolean) => ({
        opacity: 0,
        x: isEven ? -50 : 50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut" as const,
        },
    },
};

export default function Timeline() {
    return (
        <section
            id="timeline"
            className="relative py-24 md:py-36 overflow-hidden"
        >
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-5xl px-6">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-primary tracking-widest uppercase">
                        Experience & Education
                    </span>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold tracking-tight mt-4">
                        My Journey
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4">
                        From polytechnic to professional design — a timeline of growth,
                        learning, and real-world impact.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {timelineItems.map((item, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`relative flex flex-col md:flex-row ${!isEven ? "md:flex-row-reverse" : ""
                                        } items-start gap-8`}
                                >
                                    {/* Dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                            delay: 0.1,
                                        }}
                                        className="absolute left-4 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 bg-primary rounded-full border-4 border-background z-10 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                                    />

                                    {/* Card */}
                                    <motion.div
                                        custom={isEven}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                        variants={cardVariants}
                                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${!isEven
                                                ? "md:mr-auto md:ml-0"
                                                : "md:ml-auto md:mr-0"
                                            }`}
                                    >
                                        <div className="bg-surface border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300 group">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                    <item.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-xs font-medium text-primary tracking-wide uppercase">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold tracking-tight mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {item.organization}
                                            </p>
                                            <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
