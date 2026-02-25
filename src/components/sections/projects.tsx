"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { getIcon } from "@/lib/icons";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut" as const,
        },
    }),
};

export default function Projects() {
    return (
        <section
            id="projects"
            className="relative py-24 md:py-36 overflow-hidden"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4 items-start mb-16"
                >
                    <Badge variant="default">Projects</Badge>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl tracking-tighter font-bold">
                        Selected Works
                    </h2>
                    <p className="text-lg max-w-xl leading-relaxed text-muted-foreground">
                        Real projects spanning UX design, frontend development, branding,
                        and creative work.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => {
                        const Icon = getIcon(project.iconName);
                        return (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={cardVariants}
                                className={project.featured ? "lg:col-span-2" : ""}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className={`project-card group relative bg-surface border border-border/50 rounded-2xl p-6 flex flex-col justify-between cursor-pointer block h-full hover:shadow-[0_20px_60px_rgba(34,197,94,0.1)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 ${project.featured ? "min-h-[280px]" : "aspect-square"
                                        }`}
                                >
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0" />

                                    {project.images && project.images.length > 0 && (
                                        <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-2xl overflow-hidden">
                                            <Image
                                                src={project.images[0].src}
                                                alt={project.images[0].alt}
                                                fill
                                                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, j) => (
                                                <Badge
                                                    key={j}
                                                    variant="secondary"
                                                    className="text-xs bg-muted text-muted-foreground border-border/50"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
