"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { GraduationCap, Briefcase, Palette, Award, Play, Pause } from "lucide-react";

const timelineItems = [
    {
        date: "Feb 2025 — Present",
        month: "Feb",
        year: "2025",
        title: "Junior UI/UX Designer",
        organization: "Cross Code Studio (Running Stream Group)",
        description: "Contributing to end-to-end design projects for clients. Involved in design research, wireframing, prototyping, and presenting design solutions.",
        icon: Briefcase,
    },
    {
        date: "Mar 2024 — Jan 2025",
        month: "Mar",
        year: "2024",
        title: "UI/UX Designer Intern",
        organization: "UBTS",
        description: "Worked on the chemical logistics platform — contributing to user research, wireframing, and high-fidelity UI design.",
        icon: Briefcase,
    },
    {
        date: "2022 — 2023",
        month: "Jan",
        year: "2022",
        title: "Content Creator",
        organization: "Self-Initiated",
        description: "Ran channels focused on AI-generated content. Built automated workflows with Make.com. Grew to 1M+ Pinterest views.",
        icon: Palette,
    },
    {
        date: "2022 — Present",
        month: "Apr",
        year: "2022",
        title: "IT Diploma",
        organization: "Singapore Polytechnic",
        description: "Pursuing IT diploma with a focus on UI/UX design and frontend development.",
        icon: GraduationCap,
    },
    {
        date: "2024",
        month: "Dec",
        year: "2024",
        title: "Google UX Certified",
        organization: "Google / Coursera",
        description: "Completed the Google UX Design Professional Certificate and other AI certifications.",
        icon: Award,
    },
];

export default function Timeline() {
    const [activeTrack, setActiveTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setActiveTrack((window as any).__currentPlayingTrack || null);
            setIsPlaying((window as any).__currentIsPlaying || false);
        }

        const handleTrackChanged = (e: Event) => {
            const customEvent = e as CustomEvent<{ name: string; isPlaying: boolean }>;
            if (customEvent.detail) {
                setActiveTrack(customEvent.detail.name);
                setIsPlaying(customEvent.detail.isPlaying);
            }
        };

        window.addEventListener('track-changed', handleTrackChanged);
        return () => {
            window.removeEventListener('track-changed', handleTrackChanged);
        };
    }, []);

    const handlePlayTimeline = (item: typeof timelineItems[0]) => {
        if (activeTrack === item.title) {
            // Toggle playing state
            const event = new CustomEvent('track-changed', {
                detail: { name: item.title, isPlaying: !isPlaying }
            });
            window.dispatchEvent(event);
        } else {
            // Play new track
            const event = new CustomEvent('play-track', {
                detail: {
                    name: item.title,
                    subtext: item.organization,
                    duration: item.year,
                    image: "/images/brandon-profile.jpg"
                }
            });
            window.dispatchEvent(event);
        }
    };

    return (
        <section id="timeline" className="relative py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-8"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white hover:underline cursor-pointer w-fit">
                        Experience & Journey
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-2">
                    {timelineItems.map((item, i) => {
                        const isCurrent = activeTrack === item.title;
                        const isCurrentlyPlaying = isCurrent && isPlaying;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                onClick={() => handlePlayTimeline(item)}
                                className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-4 px-4 rounded-md hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/5 ${
                                    isCurrent ? "bg-white/5" : ""
                                }`}
                            >
                                {/* "Tour Date" style calendar block */}
                                <div className="flex flex-col items-center justify-center min-w-[60px] bg-[#282828] group-hover:bg-[#333] transition-colors rounded-md py-2 px-3 shadow-md">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? "text-primary" : "text-primary"}`}>{item.month}</span>
                                    <span className="text-lg font-bold text-white leading-tight">{item.year}</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className={`font-bold text-lg transition-colors ${
                                        isCurrent ? "text-primary" : "text-white group-hover:text-primary"
                                    }`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-medium">
                                        {item.organization} • {item.date}
                                    </p>
                                </div>

                                <div className="hidden lg:block flex-[1.5]">
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center justify-end min-w-[100px]">
                                    <button 
                                        className={`px-4 py-1.5 rounded-full border text-sm font-bold hover:scale-105 transition-all flex items-center gap-1.5 ${
                                            isCurrent ? "bg-primary text-black border-primary" : "border-white/30 text-white hover:border-white"
                                        }`}
                                    >
                                        {isCurrentlyPlaying ? (
                                            <>
                                                <Pause className="w-3.5 h-3.5 fill-current" />
                                                Playing
                                            </>
                                        ) : isCurrent ? (
                                            <>
                                                <Play className="w-3.5 h-3.5 fill-current" />
                                                Play
                                            </>
                                        ) : (
                                            "Details"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
