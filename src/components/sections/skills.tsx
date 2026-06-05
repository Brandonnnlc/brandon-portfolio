"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Clock3 } from "lucide-react";

type SkillTrack = {
    name: string;
    category: string;
    level: string;
    experience: string; // fake duration like "3:45"
};

export default function Skills() {
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

    const handlePlayTrack = (track: SkillTrack) => {
        if (activeTrack === track.name) {
            // Toggle playing state
            const event = new CustomEvent('track-changed', {
                detail: { name: track.name, isPlaying: !isPlaying }
            });
            window.dispatchEvent(event);
        } else {
            // Play new track
            const event = new CustomEvent('play-track', {
                detail: {
                    name: track.name,
                    subtext: track.category,
                    duration: track.experience,
                    image: "/images/brandon-profile.jpg"
                }
            });
            window.dispatchEvent(event);
        }
    };

    const tracks: SkillTrack[] = useMemo(() => [
        { name: "Figma", category: "Design Tools", level: "Primary", experience: "4:20" },
        { name: "React / Next.js", category: "Development", level: "Primary", experience: "3:15" },
        { name: "UI/UX Design", category: "Core Skill", level: "Primary", experience: "5:00" },
        { name: "Tailwind CSS", category: "Development", level: "Primary", experience: "2:45" },
        { name: "User Research", category: "UX Methods", level: "Secondary", experience: "2:10" },
        { name: "Adobe Photoshop", category: "Design Tools", level: "Secondary", experience: "1:50" },
        { name: "GSAP Animations", category: "Development", level: "Secondary", experience: "1:30" },
        { name: "Wireframing", category: "UX Methods", level: "Primary", experience: "3:40" },
        { name: "Prompt Engineering", category: "Other", level: "Secondary", experience: "1:15" },
        { name: "Midjourney", category: "Other", level: "Learning", experience: "0:45" },
    ], []);

    return (
        <section id="skills" className="relative py-12 md:py-16">
            {/* Inject CSS Equalizer Animation */}
            <style jsx global>{`
                @keyframes eq {
                    0% { transform: scaleY(0.2); }
                    100% { transform: scaleY(1.0); }
                }
                .eq-bar {
                    transform-origin: bottom;
                    animation: eq 0.6s ease-in-out infinite alternate;
                }
            `}</style>

            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-8"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white hover:underline cursor-pointer w-fit">
                        Top Skills
                    </h2>
                </motion.div>

                <div className="w-full">
                    {/* Table Header */}
                    <div className="flex items-center text-sm text-muted-foreground border-b border-white/10 pb-2 mb-4 px-4">
                        <div className="w-8 md:w-12 text-center">#</div>
                        <div className="flex-[2]">Title</div>
                        <div className="hidden md:block flex-1">Category</div>
                        <div className="hidden sm:block flex-1">Proficiency</div>
                        <div className="w-16 flex justify-end pr-4"><Clock3 className="w-4 h-4" /></div>
                    </div>

                    {/* Tracks */}
                    <div className="flex flex-col">
                        {tracks.map((track, i) => {
                            const isCurrent = activeTrack === track.name;
                            const isCurrentlyPlaying = isCurrent && isPlaying;

                            return (
                                <motion.div
                                    key={track.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    onClick={() => handlePlayTrack(track)}
                                    className={`group flex items-center text-sm py-3 px-4 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                                        isCurrent ? "bg-white/5" : ""
                                    }`}
                                >
                                    {/* Number / Play / Equalizer Column */}
                                    <div className="w-8 md:w-12 text-center text-muted-foreground flex items-center justify-center">
                                        {isCurrentlyPlaying ? (
                                            /* Active Equalizer Graphic */
                                            <div className="flex items-end gap-[2px] h-3.5 w-3.5 mb-[2px]">
                                                <div className="w-[3px] h-3 bg-primary eq-bar" style={{ animationDelay: '0.1s' }} />
                                                <div className="w-[3px] h-3.5 bg-primary eq-bar" style={{ animationDelay: '0.3s' }} />
                                                <div className="w-[3px] h-2.5 bg-primary eq-bar" style={{ animationDelay: '0s' }} />
                                            </div>
                                        ) : isCurrent ? (
                                            /* Active but Paused: show number in green, or play on hover */
                                            <div className="group-hover:hidden text-primary font-medium">
                                                {i + 1}
                                            </div>
                                        ) : (
                                            /* Inactive: standard track number */
                                            <span className="group-hover:hidden">{i + 1}</span>
                                        )}
                                        
                                        {/* Play icon overlay on hover */}
                                        <div className="hidden group-hover:block">
                                            {isCurrentlyPlaying ? (
                                                <Pause className="w-4 h-4 text-white fill-current" />
                                            ) : (
                                                <Play className="w-4 h-4 text-white fill-current" />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className={`flex-[2] font-semibold truncate pr-4 ${
                                        isCurrent ? "text-primary" : "text-white"
                                    }`}>
                                        {track.name}
                                    </div>
                                    <div className="hidden md:block flex-1 text-muted-foreground truncate pr-4 group-hover:text-white transition-colors">
                                        {track.category}
                                    </div>
                                    <div className="hidden sm:block flex-1 text-muted-foreground truncate pr-4">
                                        <span className={`px-2 py-0.5 rounded text-xs border ${
                                            track.level === 'Primary' ? 'border-primary/50 text-primary bg-primary/10' :
                                            track.level === 'Secondary' ? 'border-blue-400/50 text-blue-400 bg-blue-400/10' :
                                            'border-yellow-400/50 text-yellow-400 bg-yellow-400/10'
                                        }`}>
                                            {track.level}
                                        </span>
                                    </div>
                                    <div className={`w-16 text-right font-mono pr-2 ${
                                        isCurrent ? "text-primary" : "text-muted-foreground"
                                    }`}>
                                        {track.experience}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
