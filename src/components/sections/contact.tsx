"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, ExternalLink } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="relative py-12 md:py-16 pb-32">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-12"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white hover:underline cursor-pointer w-fit mb-2">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium">
                        Open to new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Big CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-[#2a2a2a] to-[#121212] p-8 md:p-12 rounded-xl flex flex-col justify-between min-h-[300px] group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                        onClick={() => window.open("mailto:blc33833@gmail.com", "_blank")}
                    >
                        <div>
                            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 group-hover:text-primary transition-colors">
                                Let's Work<br/>Together.
                            </h3>
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <span className="text-lg font-bold text-white">blc33833@gmail.com</span>
                            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Smaller Info Cards */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#181818] hover:bg-[#282828] p-6 rounded-xl flex items-center gap-6 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#282828] flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Location</h4>
                                <p className="text-muted-foreground text-sm font-medium">Singapore</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#181818] hover:bg-[#282828] p-6 rounded-xl flex items-center gap-6 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#282828] flex items-center justify-center flex-shrink-0">
                                <Send className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Status</h4>
                                <p className="text-muted-foreground text-sm font-medium">Open to opportunities</p>
                            </div>
                        </motion.div>

                         <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-[#181818] hover:bg-[#282828] p-6 rounded-xl flex items-center gap-6 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#282828] flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg">Social</h4>
                                <p className="text-muted-foreground text-sm font-medium">LinkedIn • Instagram • Pinterest</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
