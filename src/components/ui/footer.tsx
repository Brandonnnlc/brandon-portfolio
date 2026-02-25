import Link from "next/link";
import {
    Linkedin,
    Github,
    Instagram,
} from "lucide-react";

const navLinks = [
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Experience", href: "#timeline" },
    { title: "Contact", href: "#contact" },
];

const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/brandonlimcher/" },
    { icon: Github, label: "GitHub", href: "https://github.com/Brandonnnlc" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/stacked_aiart/?hl=en" },
];

export default function FooterSection() {
    return (
        <footer className="border-t border-border/40 py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-8 text-center">
                    <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
                        Brandon
                    </span>
                </div>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block transition-colors duration-150"
                        >
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {socialLinks.map((social, index) => (
                        <Link
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-muted-foreground hover:text-primary block transition-colors duration-200"
                        >
                            <social.icon className="size-5" />
                        </Link>
                    ))}
                </div>

                <span className="text-muted-foreground block text-center text-sm">
                    © {new Date().getFullYear()} Brandon. All rights reserved.
                </span>
            </div>
        </footer>
    );
}
