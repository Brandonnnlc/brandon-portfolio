"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, UserCircle, ExternalLink, Play, Pause, Heart, MessageSquare, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";
import type { ProjectData } from "@/data/projects";

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
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
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Sync playing state from global player
        if (typeof window !== 'undefined') {
            setIsPlaying((window as any).__currentPlayingTrack === project.title && (window as any).__currentIsPlaying);
        }

        const handleTrackChanged = (e: Event) => {
            const customEvent = e as CustomEvent<{ name: string; isPlaying: boolean }>;
            if (customEvent.detail) {
                if (customEvent.detail.name === project.title) {
                    setIsPlaying(customEvent.detail.isPlaying);
                } else {
                    setIsPlaying(false);
                }
            }
        };

        window.addEventListener('track-changed', handleTrackChanged);
        return () => {
            window.removeEventListener('track-changed', handleTrackChanged);
        };
    }, [project.title]);

    const handlePlayProject = () => {
        if (isPlaying) {
            // Pause
            const event = new CustomEvent('track-changed', {
                detail: { name: project.title, isPlaying: false }
            });
            window.dispatchEvent(event);
        } else {
            // Play
            const event = new CustomEvent('play-track', {
                detail: {
                    name: project.title,
                    subtext: project.role,
                    duration: project.duration,
                    image: project.images && project.images.length > 0 ? project.images[0].src : "/images/brandon-profile.jpg"
                }
            });
            window.dispatchEvent(event);
        }
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-foreground">
            {/* Inject Vinyl Keyframe */}
            <style jsx global>{`
                @keyframes spin-vinyl-disc {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-vinyl-disc 8s linear infinite;
                }
            `}</style>

            {/* Sticky Inner Page Header Bar (Spotify Style) */}
            <div className="sticky top-0 z-30 bg-[#121212]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-8 flex items-center justify-between">
                <Link
                    href="/#projects"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white truncate max-w-[200px] hidden sm:block">
                        {project.title}
                    </span>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-white text-black hover:scale-105 transition-transform font-bold py-1.5 px-4 rounded-full flex items-center gap-1"
                        >
                            Open Project <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>

            {/* Album Header Banner Section */}
            <div className="relative pt-8 pb-10 px-6 md:px-8 bg-gradient-to-b from-primary/20 via-[#121212]/50 to-[#121212] flex flex-col md:flex-row items-end gap-6 md:gap-8">
                {/* Album + Vinyl Wrapper */}
                <div className="relative w-56 h-48 md:w-72 md:h-60 flex-shrink-0 flex items-center pr-8 md:pr-12">
                    {/* Square Album Cover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-2xl shadow-black/85 flex-shrink-0 relative overflow-hidden bg-zinc-800 z-10"
                    >
                        {project.images && project.images.length > 0 ? (
                            <Image
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 192px, 240px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
                                <Icon className="w-16 h-16 text-white/40" />
                            </div>
                        )}
                    </motion.div>

                    {/* Vinyl Record */}
                    <div 
                        className={`absolute top-2 left-0 w-44 h-44 md:top-2 md:w-56 md:h-56 rounded-full bg-[#080808] border border-zinc-850 shadow-2xl flex items-center justify-center transition-all duration-700 ease-out z-0 ${
                            isPlaying ? "translate-x-[45%] opacity-100" : "translate-x-[5%] opacity-80"
                        }`}
                        style={{ 
                            boxShadow: "inset 0 0 20px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Spinning container */}
                        <div className={`w-full h-full rounded-full relative flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                            {/* Grooves */}
                            <div className="absolute inset-2 rounded-full border border-zinc-900 opacity-80" />
                            <div className="absolute inset-5 rounded-full border border-zinc-950/80 opacity-70" />
                            <div className="absolute inset-10 rounded-full border border-zinc-900 opacity-60" />
                            <div className="absolute inset-16 rounded-full border border-zinc-950 opacity-80" />

                            {/* Center Label */}
                            <div className="w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden bg-zinc-750 relative border-2 border-zinc-900 flex-shrink-0">
                                {project.images && project.images.length > 0 ? (
                                    <Image
                                        src={project.images[0].src}
                                        alt=""
                                        fill
                                        className="object-cover opacity-90"
                                        sizes="80px"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-800" />
                                )}
                                {/* Spindle hole */}
                                <div className="w-3 h-3 rounded-full bg-[#121212] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border border-zinc-700" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        Project Showcase
                    </span>
                    <h1 
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 leading-[1.05]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                        {project.title}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-3xl mb-4 leading-relaxed">
                        {project.subtitle}
                    </p>
                    
                    {/* Metadata Subline */}
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold text-white">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                            <Image
                                src="/images/brandon-profile.jpg"
                                alt="Brandon Lim"
                                fill
                                className="object-cover"
                                sizes="24px"
                            />
                        </div>
                        <span className="hover:underline cursor-pointer">Brandon Lim</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{project.role}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{project.duration}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-primary font-bold">{project.tags.length} tags</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons Row */}
            <div className="px-6 md:px-8 py-6 flex items-center gap-6 border-b border-white/5 bg-[#121212]">
                <button
                    onClick={handlePlayProject}
                    className="w-14 h-14 bg-primary hover:bg-[#1ed760] hover:scale-105 active:scale-95 transition-all duration-200 rounded-full flex items-center justify-center text-black shadow-lg"
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                    ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                    )}
                </button>

                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full hover:bg-white/5 transition-colors ${
                        isLiked ? "text-primary" : "text-muted-foreground hover:text-white"
                    }`}
                >
                    <Heart className={`w-8 h-8 ${isLiked ? "fill-primary" : ""}`} />
                </button>

                {project.links?.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/20 hover:border-white text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                        Visit {link.label}
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                ))}
            </div>

            {/* Tracklist Index & Rich Section Content */}
            <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 bg-[#121212]">
                {/* Left Side: Interactive Tracklist (Sticky) */}
                <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-24 h-fit">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        Project Tracks
                    </h3>
                    <div className="flex flex-col border border-white/5 rounded-lg overflow-hidden bg-[#181818]">
                        <button
                            onClick={() => scrollToSection("problem")}
                            className="flex items-center gap-3 p-3.5 hover:bg-white/5 text-left border-b border-white/5 transition-colors group"
                        >
                            <span className="text-xs font-mono text-muted-foreground w-4 group-hover:text-primary">1</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">The Problem</p>
                                <p className="text-xs text-muted-foreground">Background & Pain Points</p>
                            </div>
                        </button>
                        <button
                            onClick={() => scrollToSection("process")}
                            className="flex items-center gap-3 p-3.5 hover:bg-white/5 text-left border-b border-white/5 transition-colors group"
                        >
                            <span className="text-xs font-mono text-muted-foreground w-4 group-hover:text-primary">2</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">The Process</p>
                                <p className="text-xs text-muted-foreground">Step-by-Step Execution</p>
                            </div>
                        </button>
                        <button
                            onClick={() => scrollToSection("outcome")}
                            className="flex items-center gap-3 p-3.5 hover:bg-white/5 text-left border-b border-white/5 transition-colors group"
                        >
                            <span className="text-xs font-mono text-muted-foreground w-4 group-hover:text-primary">3</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">The Outcome</p>
                                <p className="text-xs text-muted-foreground">Results & Deliverables</p>
                            </div>
                        </button>
                        <button
                            onClick={() => scrollToSection("tools")}
                            className="flex items-center gap-3 p-3.5 hover:bg-white/5 text-left border-b border-white/5 transition-colors group"
                        >
                            <span className="text-xs font-mono text-muted-foreground w-4 group-hover:text-primary">4</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Tools Used</p>
                                <p className="text-xs text-muted-foreground">Technologies & Software</p>
                            </div>
                        </button>
                        {project.images && project.images.length > 0 && (
                            <button
                                onClick={() => scrollToSection("gallery")}
                                className="flex items-center gap-3 p-3.5 hover:bg-white/5 text-left transition-colors group"
                            >
                                <span className="text-xs font-mono text-muted-foreground w-4 group-hover:text-primary">5</span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Project Gallery</p>
                                    <p className="text-xs text-muted-foreground">Visuals & Interfaces</p>
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side: Detailed Content Cards */}
                <div className="flex-1 space-y-12">
                    {/* Section 1: The Problem */}
                    <motion.section 
                        id="problem"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#181818] border border-white/5 p-6 md:p-8 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest px-2.5 py-1 rounded bg-red-400/10 border border-red-400/20">
                                Track 1
                            </span>
                            <h2 className="text-lg font-bold text-white uppercase">The Problem</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {project.problem}
                        </p>
                    </motion.section>

                    {/* Section 2: The Process */}
                    <motion.section 
                        id="process"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#181818] border border-white/5 p-6 md:p-8 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest px-2.5 py-1 rounded bg-primary/10 border border-primary/20">
                                Track 2
                            </span>
                            <h2 className="text-lg font-bold text-white uppercase">The Process</h2>
                        </div>
                        <div className="space-y-6 relative border-l border-white/10 pl-6 ml-3">
                            {project.process.map((step, i) => {
                                const [title, ...descParts] = step.split(" — ");
                                const desc = descParts.join(" — ");
                                return (
                                    <div key={i} className="relative group">
                                        {/* Dot Indicator */}
                                        <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 group-hover:bg-primary border border-[#181818] transition-colors" />
                                        <h3 className="font-semibold text-white text-base mb-1 group-hover:text-primary transition-colors">
                                            {title}
                                        </h3>
                                        {desc && (
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {desc}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Section 3: The Outcome */}
                    <motion.section 
                        id="outcome"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#181818] border border-white/5 p-6 md:p-8 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-400/10 border border-emerald-400/20">
                                Track 3
                            </span>
                            <h2 className="text-lg font-bold text-white uppercase">The Outcome</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {project.outcome}
                        </p>
                    </motion.section>

                    {/* Section 4: Tools Used */}
                    <motion.section 
                        id="tools"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#181818] border border-white/5 p-6 md:p-8 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-2.5 py-1 rounded bg-blue-400/10 border border-blue-400/20">
                                Track 4
                            </span>
                            <h2 className="text-lg font-bold text-white uppercase">Tools & Technologies</h2>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {project.tools.map((tool, i) => (
                                <span
                                    key={i}
                                    className="px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground hover:text-white hover:border-primary/55 cursor-default transition-all duration-200"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.section>

                    {/* Section 5: Gallery */}
                    {project.images && project.images.length > 0 && (
                        <motion.section 
                            id="gallery"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#181818] border border-white/5 p-6 md:p-8 rounded-xl"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-2.5 py-1 rounded bg-purple-400/10 border border-purple-400/20">
                                    Track 5
                                </span>
                                <h2 className="text-lg font-bold text-white uppercase">Interface Gallery</h2>
                            </div>
                            <div className="space-y-4">
                                {project.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg border border-white/10 overflow-hidden relative bg-zinc-900 group shadow-lg"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={1000}
                                            height={562}
                                            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                        />
                                        <div className="p-3 bg-black/40 backdrop-blur-sm border-t border-white/5 text-xs text-muted-foreground">
                                            {img.alt}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>

            {/* Recommendations / Next/Prev Navigation */}
            <div className="mx-auto max-w-5xl px-6 md:px-8 py-12 border-t border-white/5">
                <h3 className="text-lg font-bold text-white mb-6">You might also like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href={`/projects/${prevProject.slug}`}
                        className="group bg-[#181818] hover:bg-white/5 border border-white/5 rounded-xl p-5 transition-colors flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 rounded bg-zinc-800 relative flex-shrink-0 overflow-hidden">
                                {prevProject.images && prevProject.images.length > 0 ? (
                                    <Image src={prevProject.images[0].src} alt="" fill className="object-cover" sizes="48px" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-700 font-bold text-white text-xs">P</div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Previous</span>
                                <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">{prevProject.title}</p>
                            </div>
                        </div>
                        <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                    </Link>

                    <Link
                        href={`/projects/${nextProject.slug}`}
                        className="group bg-[#181818] hover:bg-white/5 border border-white/5 rounded-xl p-5 transition-colors flex items-center justify-between text-right"
                    >
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white order-2 md:order-none transition-colors" />
                        <div className="flex items-center gap-4 min-w-0 order-1 text-left sm:text-right">
                            <div className="min-w-0">
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold block">Next Up</span>
                                <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">{nextProject.title}</p>
                            </div>
                            <div className="w-12 h-12 rounded bg-zinc-800 relative flex-shrink-0 overflow-hidden">
                                {nextProject.images && nextProject.images.length > 0 ? (
                                    <Image src={nextProject.images[0].src} alt="" fill className="object-cover" sizes="48px" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-700 font-bold text-white text-xs">N</div>
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
