"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Figma,
    Brush,
    PenTool,
    Code2,
    GitBranch,
    Search,
    Users,
    Layout,
    TestTube2,
    Route,
    Sparkles,
    BarChart3,
    Share2,
    FileText,
    ChevronDown,
} from "lucide-react";

type ToolItem = {
    name: string;
    icon?: React.ReactNode;
    level: "Primary" | "Secondary" | "Learning";
    usedFor: string;
    proof?: string[]; // projects / examples
};

type Category = {
    title: string;
    pill: string;
    pillClass: string;
    className?: string; // bento sizing
    items: ToolItem[];
};

function SpotlightCard({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                const r = ref.current?.getBoundingClientRect();
                if (!r) return;
                setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                "transition-transform duration-300 will-change-transform hover:-translate-y-0.5",
                className
            )}
        >
            {/* spotlight */}
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300",
                    hovered && "opacity-100"
                )}
                style={{
                    background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.10), transparent 45%)`,
                }}
            />
            {/* inner glow border */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10"
            />
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </div>
    );
}

function ToolRow({ item }: { item: ToolItem }) {
    const [isOpen, setIsOpen] = useState(false);

    const levelTone =
        item.level === "Primary"
            ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/20"
            : item.level === "Secondary"
                ? "bg-sky-500/15 text-sky-200 border-sky-500/20"
                : "bg-amber-500/15 text-amber-200 border-amber-500/20";

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={cn(
                    "group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2",
                    "transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                    isOpen && "border-white/20 bg-white/[0.05]"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition group-hover:bg-white/[0.06]">
                        {item.icon}
                    </div>
                    <div className="flex flex-col items-start gap-0.5 max-w-[120px] sm:max-w-[180px]">
                        <div className="text-sm font-medium text-white/90 truncate w-full text-left">{item.name}</div>
                        <div className="text-[11px] text-white/55 truncate w-full text-left">{item.usedFor}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span
                        className={cn(
                            "rounded-full border px-2.5 py-1 text-[10px] sm:text-[11px] font-medium hidden sm:inline-block",
                            levelTone
                        )}
                    >
                        {item.level}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden w-full"
                    >
                        <div className="mt-2 text-left bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:p-4 shadow-inner">
                            <div className="flex items-center justify-between mb-2 sm:hidden">
                                <span className="text-sm font-semibold text-white/90">{item.name}</span>
                                <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium", levelTone)}>
                                    {item.level}
                                </span>
                            </div>

                            <p className="text-sm text-white/70 leading-relaxed">
                                {item.usedFor}
                            </p>

                            {item.proof?.length ? (
                                <div className="mt-4 pt-3 border-t border-white/10">
                                    <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mb-2">Used In</div>
                                    <ul className="space-y-1.5 min-w-0">
                                        {item.proof.map((p) => (
                                            <li key={p} className="flex items-start gap-2.5 text-sm text-white/75 relative">
                                                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-white/30 mt-1.5" />
                                                <span className="truncate max-w-[200px] sm:max-w-none">{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Skills() {
    const categories: Category[] = useMemo(
        () => [
            {
                title: "Design",
                pill: "DESIGN",
                pillClass: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
                className: "md:col-span-2", // bigger tile
                items: [
                    {
                        name: "Figma",
                        icon: <Figma className="h-4 w-4 text-white/80" />,
                        level: "Primary",
                        usedFor: "UI design, components, prototyping",
                        proof: ["WMS dashboards & modals", "Mobile UI adaptation", "Design system library"],
                    },
                    {
                        name: "Photoshop",
                        icon: <Brush className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Visual edits, assets, quick mockups",
                        proof: ["A4 layout adjustments", "Marketing visuals"],
                    },
                    {
                        name: "Illustrator",
                        icon: <PenTool className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Icons, vector assets",
                        proof: ["UI icon set work", "Brand assets"],
                    },
                    {
                        name: "Midjourney",
                        icon: <Sparkles className="h-4 w-4 text-white/80" />,
                        level: "Learning",
                        usedFor: "Concept exploration & creative prompts",
                    },
                ],
            },
            {
                title: "Development",
                pill: "DEVELOPMENT",
                pillClass: "bg-sky-500/15 text-sky-200 border-sky-500/20",
                className: "md:col-span-2",
                items: [
                    {
                        name: "HTML / CSS",
                        icon: <Code2 className="h-4 w-4 text-white/80" />,
                        level: "Primary",
                        usedFor: "Layout, responsive UI, styling",
                    },
                    {
                        name: "JavaScript",
                        icon: <Code2 className="h-4 w-4 text-white/80" />,
                        level: "Primary",
                        usedFor: "Front-end logic, interactions",
                    },
                    {
                        name: "React",
                        icon: <Code2 className="h-4 w-4 text-white/80" />,
                        level: "Primary",
                        usedFor: "Component-driven UI builds",
                    },
                    {
                        name: "Git",
                        icon: <GitBranch className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Version control & collaboration",
                    },
                ],
            },
            {
                title: "UX Methods",
                pill: "UX METHODS",
                pillClass: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/20",
                className: "md:col-span-2",
                items: [
                    {
                        name: "User Research",
                        icon: <Users className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Clarify needs, constraints, and context",
                    },
                    {
                        name: "Wireframing",
                        icon: <Layout className="h-4 w-4 text-white/80" />,
                        level: "Primary",
                        usedFor: "Structure + information hierarchy",
                    },
                    {
                        name: "Usability Testing",
                        icon: <TestTube2 className="h-4 w-4 text-white/80" />,
                        level: "Learning",
                        usedFor: "Validate flows & reduce friction",
                    },
                    {
                        name: "Journey Mapping",
                        icon: <Route className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Understand end-to-end workflow steps",
                    },
                ],
            },
            {
                title: "Other",
                pill: "OTHER",
                pillClass: "bg-amber-500/15 text-amber-200 border-amber-500/20",
                className: "md:col-span-2",
                items: [
                    {
                        name: "Content Strategy",
                        icon: <FileText className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Clear UI copy and structured info",
                    },
                    {
                        name: "Social Media",
                        icon: <Share2 className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Creative direction & content iteration",
                    },
                    {
                        name: "Prompt Engineering",
                        icon: <Sparkles className="h-4 w-4 text-white/80" />,
                        level: "Secondary",
                        usedFor: "Better outputs + faster ideation",
                    },
                    {
                        name: "Google Analytics",
                        icon: <BarChart3 className="h-4 w-4 text-white/80" />,
                        level: "Learning",
                        usedFor: "Basic user behaviour insights",
                    },
                ],
            },
        ],
        []
    );

    const certs = [
        "Google UX Design",
        "Google Digital Marketing",
        "Generative AI Leader",
        "AI Ethics & Governance (SCS)",
    ];

    return (
        <section id="skills" className="relative py-24 md:py-36 overflow-hidden bg-background">
            {/* Section divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70 shadow-sm"
                    >
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/70" />
                        TOOLS & SKILLS
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-3xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-white md:text-5xl"
                    >
                        What I Work With
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
                    >
                        A mix of design, development, and UX tools I use to build clear, usable products.
                    </motion.p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.title}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                                className={cn("md:col-span-2 w-full", cat.className)}
                            >
                                <SpotlightCard className="h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="text-lg font-semibold text-white/90 font-[family-name:var(--font-space-grotesk)]">
                                            {cat.title}
                                        </div>
                                        <span
                                            className={cn(
                                                "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
                                                cat.pillClass
                                            )}
                                        >
                                            {cat.pill}
                                        </span>
                                    </div>

                                    <div className="space-y-3 flex-1">
                                        <AnimatePresence mode="popLayout">
                                            {cat.items.map((item) => (
                                                <motion.div key={item.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                                    <ToolRow item={item} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-20 text-center">
                    <div className="text-sm font-semibold text-white/80 uppercase tracking-widest">Certifications</div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {certs.map((c, i) => (
                            <motion.span
                                key={c}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/70 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-all cursor-default shadow-sm"
                            >
                                {c}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
