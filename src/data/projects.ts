export interface ProjectData {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    iconName: string;
    featured: boolean;
    role: string;
    duration: string;
    problem: string;
    process: string[];
    outcome: string;
    tools: string[];
    images?: { src: string; alt: string }[];
    liveUrl?: string;
    links?: { label: string; url: string }[];
}

export const projects: ProjectData[] = [
    {
        slug: "habit-horizon",
        title: "Habit Horizon",
        subtitle: "Habit-Building & Consistency Tracking Platform",
        description:
            "Habit Horizon is a habit-building platform designed to help Singaporeans stay consistent in their personal, academic, and professional goals.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Vercel"],
        iconName: "Calendar",
        featured: true,
        role: "Lead Creator & Full-Stack Developer",
        duration: "4 Months",
        problem:
            "Inspired by the idea that small daily actions compound into meaningful results, Habit Horizon was built to support students, NS personnel, professionals, and lifelong learners who want to become better every day. Staying consistent with goals in a fast-paced environment requires visual clarity, streak reinforcement, and frictionless tracking interfaces.",
        process: [
            "Goal Definition & Habit Creation — Designed a simple, quick wizard for users to create and manage daily or weekly habits with custom targets.",
            "Visual Grid Interface — Engineered a GitHub-style contribution grid and streak calendar, translating abstract consistency metrics into rewarding visual patterns.",
            "Frictionless Onboarding — Implemented an interactive guest mode that allows visitors to explore grid interactions instantly without sign-up barriers.",
            "Secure Auth Integration — Connected Google OAuth for a seamless transition from guest sessions to permanent cloud-saved profiles.",
            "Responsive Development — Built a fluid layout designed to scale cleanly across mobile, tablet, and desktop monitors.",
        ],
        outcome:
            "Successfully developed and launched Habit Horizon as a personal growth hub, achieving high visual satisfaction and a streamlined user journey for tracking daily consistency in Singapore.",
        tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Vercel"],
        images: [
            { src: "/images/habit-horizon.png", alt: "Habit Horizon — Your life in Singapore one year from now simulation dashboard" },
        ],
    },
    {
        slug: "chem-logistics-platform",
        title: "Chem Logistics Platform",
        subtitle: "UX Design · Internship Project @ UBTS",
        description:
            "UX redesign for a chemical logistics tracking system during my internship at UBTS. Conducted user research, wireframing, usability testing, and delivered a high-fidelity prototype that reduced task completion time.",
        tags: ["UX Research", "Figma", "B2B", "Real Client"],
        iconName: "Briefcase",
        featured: true,
        role: "UI/UX Designer",
        duration: "10 Months",
        problem:
            "Chemical logistics coordinators struggled to track shipments efficiently due to a cluttered legacy interface, causing frequent errors and delays in high-stakes operations. The existing system lacked intuitive navigation, real-time status updates, and clear data visualisation — leading to increased cognitive load and reduced operational efficiency.",
        process: [
            "User Research — Conducted interviews with logistics staff to understand pain points, daily workflows, and frustrations with the existing system",
            "Competitive Analysis — Benchmarked 3 leading logistics platforms to identify industry best practices and feature gaps",
            "Wireframing — Progressed from lo-fi sketches to mid-fidelity Figma frames, iterating based on early feedback",
            "Usability Testing — Ran 2 rounds of testing with 5 participants each, collecting quantitative and qualitative data",
            "High-Fidelity Design — Delivered a polished prototype with a complete component library and developer handoff documentation",
        ],
        outcome:
            "The redesigned dashboard significantly reduced task completion time and error rates. The design was handed off to the development team and received positive feedback from stakeholders. The project demonstrated the impact of user-centred design in a complex B2B environment.",
        tools: ["Figma", "FigJam", "User Interviews", "Usability Testing", "Miro"],
        images: [
            { src: "/images/chem-logistics.png", alt: "Chem Logistics Platform — wireframes, home page, pending tasks, inbound details" },
        ],
    },
    {
        slug: "personal-finance-app",
        title: "Personal Finance App",
        subtitle: "End-to-End Product Design",
        description:
            "End-to-end product design and frontend development for a personal budgeting app built out of a need to better track my own finances. Spoke with peers to understand their habits and built a working application focused on careful spending tracking and actionable insights.",
        tags: ["End-to-End", "Figma", "Frontend Dev"],
        iconName: "Smartphone",
        featured: false,
        role: "Designer & Developer",
        duration: "3 Months",
        problem:
            "While many peers my age don't necessarily spend unwisely, there is a common struggle to track daily spending carefully and maintain a clear overview of financial health. I needed a personal tool that was simple, frictionless, and provided a quick snapshot of where my money was going without the overwhelming complexity of existing apps.",
        process: [
            "Discovery — Asked around and spoke informally with peers to understand their spending habits and confirm the need for careful tracking",
            "Personas & Flows — Sketched user flows emphasizing quick transaction entry, calendar-based events, and clear category visualisations",
            "Information Architecture — Structured the app's navigation to surface net worth insights, a proactive calendar view, and live market feeds",
            "Wireframes to Design — Iteratively designed in Figma from lo-fi wireframes to a polished, premium dark-mode interface",
            "Frontend Build — Developed a responsive, interactive live application using modern React and Tailwind CSS",
        ],
        outcome:
            "The live web application successfully provides a frictionless budgeting experience with sovereign net worth tracking, intuitive calendar views, and real-time market feeds. The project highlighted my ability to design and engineer a functional, beautiful personal finance tool.",
        tools: ["Figma", "React", "Next.js", "Tailwind CSS", "User Interviews"],
        images: [
            { src: "/images/finance-dashboard.png", alt: "Pixiu.fi Dashboard — sovereign net worth, sovereignty score, net worth trajectory, recent flows, allocation matrix" },
            { src: "/images/finance-calendar.png", alt: "Pixiu.fi Calendar — time travel view showing monthly spending events" },
            { src: "/images/finance-markets.png", alt: "Pixiu.fi Markets — crypto heatmap, live wire feed, market portfolios" },
        ],
        liveUrl: "https://pixiufi.vercel.app/",
    },
    {
        slug: "chair-product-website",
        title: "Chair Product Website",
        subtitle: "E-Commerce UI Design & Development · Personal Project",
        description:
            "Designed and developed a premium e-commerce product showcase site for an ergonomic chair brand. Fully responsive build demonstrating commercial UI design and frontend execution.",
        tags: ["E-Commerce", "Product Design", "Frontend"],
        iconName: "ShoppingBag",
        featured: false,
        role: "Designer & Developer",
        duration: "2 Months",
        problem:
            "Wanted to design and build a premium product showcase site for an ergonomic chair brand as a self-initiated project to practise end-to-end e-commerce UI and frontend development. The goal was to create a visually compelling, conversion-focused experience.",
        process: [
            "Brand Discovery — Created moodboards and established a cohesive visual direction for the chair brand",
            "Sitemap & User Flow — Mapped the complete purchase journey from landing to checkout",
            "UI Design — Designed high-fidelity screens with a custom component library for consistency",
            "Responsive Build — Developed and deployed the live site with full mobile-to-desktop responsiveness",
        ],
        outcome:
            "Fully responsive product site built from scratch with smooth animations and micro-interactions. The project demonstrates commercial UI design sensibility and end-to-end frontend execution capabilities.",
        tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
        images: [
            { src: "/images/chair-website.png", alt: "Aero Comfort Chair — hero section with product showcase, color picker, and CTA" },
        ],
        liveUrl: "https://aerocomfort.vercel.app/",
    },
    {
        slug: "memo-showcase",
        title: "Memo Fragrance Showcase",
        subtitle: "Immersive 3D E-Commerce Experience",
        description:
            "Designed and developed a highly interactive, 3D-driven product showcase site for Memo's African Leather fragrance. Built with React and Three.js to create an immersive, scrollytelling experience.",
        tags: ["3D/WebGL", "E-Commerce", "React", "Frontend"],
        iconName: "Monitor",
        featured: true,
        role: "Creative Developer",
        duration: "1 Month",
        problem:
            "Luxury fragrance brands often struggle to convey the depth and complexity of a scent through traditional flat web interfaces. I wanted to build an experience that visually narratives the rich ingredients and mood of African Leather.",
        process: [
            "Concept & Storyboarding — Designed the visual flow and scrollytelling sequence using Figma",
            "3D Asset Integration — Sourced and optimized 3D models and textures representing the fragrance ingredients",
            "WebGL Development — Built the interactive 3D scene using React Three Fiber and GSAP for scroll-synced animations",
            "Performance Optimization — Implemented lazy loading and asset compression to ensure smooth 60fps scrolling on both mobile and desktop",
        ],
        outcome:
            "Delivered a visually stunning, award-worthy promotional site that sets a new standard for interactive digital product experiences.",
        tools: ["React", "Three.js", "GSAP", "Tailwind CSS", "Figma"],
        images: [
            { src: "/images/memo-showcase.jpg", alt: "Memo African Leather — Scrollytelling 3D fragrance showcase with interactive notes and ingredients" },
        ],
        liveUrl: "https://memoshowcase.vercel.app/",
    },
    {
        slug: "flow-studio",
        title: "Flow Studio",
        subtitle: "Agency Branding & Website — Self-Initiated",
        description:
            "Founded and built my own design agency brand from scratch — logo, colour system, typography, and a live website on Framer. Attracting real freelance client inquiries with a consistently applied brand identity.",
        tags: ["Branding", "Self-Initiated", "Agency", "Framer"],
        iconName: "Rocket",
        featured: true,
        role: "Founder · Designer · Developer",
        duration: "Ongoing",
        problem:
            "Needed a professional, credible online presence for my own design agency that showcases my range and attracts real freelance clients. The brand needed to communicate quality, creativity, and professionalism from the first touchpoint.",
        process: [
            "Brand Identity — Designed logo, colour system, and typography that reflect the agency's positioning",
            "Website Architecture — Planned pages and content hierarchy for maximum client conversion",
            "UI Design — Crafted the design in Figma, refined over 3 major iterations based on peer feedback",
            "Built & Launched — Developed and deployed the live site on Framer with custom interactions",
        ],
        outcome:
            "Live agency site actively attracting freelance inquiries. Brand identity is consistently applied across all client-facing materials including proposals, social media, and the website itself.",
        tools: ["Figma", "Framer", "Brand Guidelines", "Social Media"],
        images: [
            { src: "/images/flow-studio-hero.png", alt: "Flow Studio — Hero section with dynamic typography and project metrics" },
            { src: "/images/flow-studio-catalog.png", alt: "Flow Studio — Course catalog showing premium UI/UX learning paths" },
        ],
        liveUrl: "https://flowstudio-gamma.vercel.app/",
    },
    {
        slug: "photoshop-visual-content",
        title: "Photoshop — Visual Content",
        subtitle: "Photo Manipulation & AI-Generated Content",
        description:
            "Created AI-generated visuals and photo composites using Midjourney and Photoshop for personal projects. Explored visual storytelling and high-quality concept art generation without relying on automation.",
        tags: ["Photoshop", "AI Art", "Visual Content", "Personal"],
        iconName: "Palette",
        featured: false,
        role: "Personal Project",
        duration: "2022 — 2023",
        problem:
            "Wanted to explore the intersection of AI generation and manual photo manipulation to create compelling visual concepts for a personal portfolio.",
        process: [
            "Concept Generation — Used Midjourney to explore initial visual directions and generate base assets",
            "Composition — Combined multiple generated elements using complex masking and blending in Photoshop",
            "Polishing — Applied colour grading, lighting adjustments, and typographic elements to finalise the artwork",
            "Curation — Selected the strongest pieces to build a diverse personal gallery of visual experiments",
        ],
        outcome:
            "Developed advanced skills in AI prompting, complex compositing in Photoshop, and visual art direction. Built a strong foundational portfolio of digital art.",
        tools: ["Adobe Photoshop", "Midjourney"],
        images: [
            { src: "/images/portfolio-mockups.png", alt: "UI design artboards for a personal portfolio website layout" },
            { src: "/images/gorilla-mind-banner.png", alt: "Gorilla Mind promotional banner featuring product and 3D mockups" },
        ],
    },
    {
        slug: "illustrator-vector-design",
        title: "Illustrator — Vector Design",
        subtitle: "Vector Graphics & Brand Asset Creation",
        description:
            "Designed vector graphics, brand assets, and illustrations for social media content and client projects. Applied strong visual direction and art direction principles.",
        tags: ["Illustrator", "Vector", "Brand Assets", "Art Direction"],
        iconName: "PenTool",
        featured: false,
        role: "Graphic Designer",
        duration: "Ongoing",
        problem:
            "Needed to create scalable, pixel-perfect brand assets and illustrations that maintain visual quality across all formats — from social media posts to print materials.",
        process: [
            "Visual Research — Studied contemporary illustration and design trends for relevant inspiration",
            "Concept Development — Sketched initial concepts and refined visual direction before going digital",
            "Vector Execution — Designed polished vector graphics in Illustrator with clean paths and organised layers",
            "Asset Delivery — Exported assets in multiple formats for web, social media, and print use cases",
        ],
        outcome:
            "Built a portfolio of versatile vector assets used across social media, client projects, and brand materials. Strengthened skills in visual direction and scalable design systems.",
        tools: ["Adobe Illustrator", "Figma", "Pinterest", "Instagram"],
        images: [
            { src: "/images/housely-poster.png", alt: "Housely promotional poster featuring map overlays and app mockups" },
        ],
    },
    {
        slug: "social-media-management",
        title: "Social Media Management",
        subtitle: "Content Strategy & Platform Growth",
        description:
            "Managed and scaled social media presence across multiple platforms. Developed content pipelines, scheduled publishing, and analyzed engagement metrics to drive growth.",
        tags: ["Social Media", "Strategy", "Growth"],
        iconName: "Smartphone",
        featured: true,
        role: "Social Media Manager",
        duration: "2022 — Ongoing",
        problem:
            "Needed to build strong, consistent social media engagement and establish a clear brand presence across platforms like Pinterest and Instagram.",
        process: [
            "Content Strategy — Identified trending niches and engagement patterns for optimal reach",
            "Pipeline Creation — Built automated content pipelines using Make.com for reliable scheduling",
            "Community Management — Engaged with audience and monitored analytics to refine approach",
            "Platform Optimization — Tailored content formats specifically for Pinterest vs Instagram algorithms",
        ],
        outcome:
            "Successfully grew accounts to achieve 6M+ Pinterest views. Established reliable automation workflows that reduced manual posting time while increasing overall engagement.",
        tools: ["Make.com", "Pinterest", "Instagram", "Analytics"],
        images: [
            { src: "/images/pinterest-analytics.png", alt: "Pinterest Analytics dashboard showing 6.9M impressions and 207K engaged audience" },
            { src: "/images/instagram-insights.png", alt: "Instagram Insights displaying follower demographics and high reach content" },
        ],
        links: [
            { label: "Pinterest", url: "https://www.pinterest.com/stackedaiart" },
            { label: "Instagram", url: "https://www.instagram.com/stacked_aiart/?hl=en" }
        ],
    },
];
