import Link from "next/link";
import {
    Linkedin,
    Github,
    Instagram,
    Twitter,
    Globe
} from "lucide-react";

const footerGroups = [
    {
        title: "Company",
        links: [
            { label: "About Artist", href: "#about" },
            { label: "Selected Works", href: "#projects" },
            { label: "Experience Mix", href: "#timeline" },
        ]
    },
    {
        title: "Communities",
        links: [
            { label: "For Developers", href: "https://github.com/Brandonnnlc" },
            { label: "Design Services", href: "https://flowstudio-gamma.vercel.app/" },
            { label: "Collaborations", href: "#contact" },
        ]
    },
    {
        title: "Useful Links",
        links: [
            { label: "Direct Booking", href: "#contact" },
            { label: "Skills Tracks", href: "#skills" },
            { label: "Vercel Deployment", href: "https://brandon-lim-portfolio.vercel.app" },
        ]
    }
];

const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/brandonlimcher/" },
    { icon: Github, label: "GitHub", href: "https://github.com/Brandonnnlc" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/stacked_aiart/?hl=en" },
];

export default function FooterSection() {
    return (
        <footer className="pt-20 pb-12 bg-transparent text-muted-foreground border-t border-white/5 mt-16 select-none">
            <div className="mx-auto max-w-5xl px-6">
                {/* Main Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Columns 1-3: Footer Groups */}
                    {footerGroups.map((group, idx) => (
                        <div key={idx} className="flex flex-col gap-3 col-span-1">
                            <span className="text-white font-bold text-sm tracking-wider uppercase">
                                {group.title}
                            </span>
                            <ul className="flex flex-col gap-2.5 text-sm">
                                {group.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link 
                                            href={link.href}
                                            className="hover:text-white hover:underline transition-all duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Column 4-5: Social Links (Floated Right on MD+) */}
                    <div className="col-span-2 flex justify-start md:justify-end gap-4 items-start pt-2">
                        {socialLinks.map((social, index) => (
                            <Link
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full bg-[#292929] hover:bg-[#727272] text-white transition-colors duration-250 flex items-center justify-center shadow"
                            >
                                <social.icon className="size-4 fill-none" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Bottom Legal & Copyright Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <Link href="#hero" className="hover:text-white transition-colors">Legal</Link>
                        <Link href="#hero" className="hover:text-white transition-colors">Safety Center</Link>
                        <Link href="#hero" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#hero" className="hover:text-white transition-colors">Cookies</Link>
                        <Link href="#hero" className="hover:text-white transition-colors">About Ads</Link>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                        <span className="text-muted-foreground">
                            © {new Date().getFullYear()} Brandon Lim. All rights reserved.
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase font-semibold">
                            Record Label: Brandon Lim Independent
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
