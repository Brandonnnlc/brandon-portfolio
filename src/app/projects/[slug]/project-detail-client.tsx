"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, UserCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";
import type { ProjectData } from "@/data/projects";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    }),
};

export default function ProjectDetailClient({
    project,
    nextProject,
    prevProject,
}: {
    project: ProjectData;
    nextProject: ProjectData;
    prevProject: ProjectData;
}) {
    const Icon = getIcon(project.iconName);

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Sticky back nav */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-border/30"
            >
                <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                    <span className="text-sm text-muted-foreground hidden sm:block">
                        {project.title}
                    </span>
                </div>
            </motion.div>

            {/* Hero area */}
            <section className="pt-32 pb-16 px-6">
                <div className="mx-auto max-w-5xl">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-muted text-muted-foreground border-border/50">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    <motion.h1
                        custom={0.1}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        custom={0.2}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-xl text-muted-foreground mb-8 max-w-2xl"
                    >
                        {project.subtitle}
                    </motion.p>

                    <motion.div
                        custom={0.3}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex flex-wrap gap-6"
                    >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserCircle className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground">{project.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground">{project.duration}</span>
                        </div>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 ml-auto sm:ml-0"
                            >
                                Visit Live Project
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {project.links?.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 ml-auto sm:ml-0"
                            >
                                Visit {link.label}
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Project images */}
            <section className="py-16 px-6">
                <div className="mx-auto max-w-5xl space-y-6">
                    {project.images && project.images.length > 0 ? (
                        project.images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="rounded-2xl bg-surface border border-border/50 overflow-hidden"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={1200}
                                    height={675}
                                    className="w-full h-auto"
                                    priority={i === 0}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="aspect-[16/9] rounded-2xl bg-surface border border-border/50 flex items-center justify-center overflow-hidden">
                                <div className="text-center p-8">
                                    <Icon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground/50 text-sm">
                                        Project screenshots coming soon
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Problem */}
            <section className="py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-sm font-medium text-red-400 tracking-widest uppercase">
                            The Problem
                        </span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.problem}
                    </p>
                </motion.div>
            </section>

            {/* Process */}
            <section className="py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-primary tracking-widest uppercase">
                            The Process
                        </span>
                    </div>
                    <div className="space-y-6">
                        {project.process.map((step, i) => {
                            const [title, ...descParts] = step.split(" — ");
                            const desc = descParts.join(" — ");
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="flex flex-col items-center mt-1">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        {i < project.process.length - 1 && (
                                            <div className="w-[2px] flex-1 bg-border/50 mt-2" />
                                        )}
                                    </div>
                                    <div className="pb-6">
                                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-foreground mb-1">
                                            {title}
                                        </h3>
                                        {desc && (
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {desc}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* Outcome */}
            <section className="py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400 tracking-widest uppercase">
                            The Outcome
                        </span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.outcome}
                    </p>
                </motion.div>
            </section>

            {/* Tools */}
            <section className="py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
                            Tools Used
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {project.tools.map((tool, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-4 py-2 rounded-full bg-surface border border-border/50 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300"
                            >
                                {tool}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <div className="mx-auto max-w-5xl px-6 py-8">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Prev/Next nav */}
            <section className="py-12 px-6 pb-24">
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link
                            href={`/projects/${prevProject.slug}`}
                            className="group bg-surface border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                        >
                            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-2">
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                Previous Project
                            </span>
                            <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-foreground group-hover:text-primary transition-colors">
                                {prevProject.title}
                            </p>
                        </Link>

                        <Link
                            href={`/projects/${nextProject.slug}`}
                            className="group bg-surface border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 text-right"
                        >
                            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center justify-end gap-1 mb-2">
                                Next Project
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-foreground group-hover:text-primary transition-colors">
                                {nextProject.title}
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
