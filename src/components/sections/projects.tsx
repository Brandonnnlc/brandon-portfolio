"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { projects } from "@/data/projects";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut" as const,
        },
    }),
};

export default function Projects() {
    return (
        <section id="projects" className="relative py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-8"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white hover:underline cursor-pointer w-fit">
                        Selected Works
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {projects.map((project, i) => {
                        return (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={cardVariants}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block bg-[#181818] hover:bg-[#282828] transition-colors duration-300 p-4 rounded-md h-full"
                                >
                                    <div className="relative aspect-square w-full mb-4 shadow-xl overflow-hidden rounded-md bg-[#282828]">
                                        {project.images && project.images.length > 0 ? (
                                            <Image
                                                src={project.images[0].src}
                                                alt={project.images[0].alt}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#121212] flex items-center justify-center text-white/20 font-bold text-4xl">
                                                {project.title.substring(0, 1)}
                                            </div>
                                        )}
                                        
                                        {/* Spotify Green Play Button */}
                                        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-xl shadow-black/50 bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1ed760]"
                                             onClick={(e) => { e.preventDefault(); console.log("Play " + project.title); }}>
                                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-white text-base truncate mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                                        {project.description}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
