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
    /** Year shown in the index */
    year?: string;
    /** Discipline bucket used by the index filters */
    kind?: "Product" | "3D / WebGL" | "Brand" | "UX" | "Tooling" | "Visual";
    /** Accent colour for cover frames and hover states */
    accent?: string;
}

export const projects: ProjectData[] = [
    {
        slug: "habit-horizon",
        year: "2025",
        kind: "Product",
        accent: "#2e54fe",
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
        year: "2024",
        kind: "UX",
        accent: "#2e54fe",
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
        year: "2025",
        kind: "Product",
        accent: "#1ec97a",
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
        year: "2024",
        kind: "Product",
        accent: "#ff6338",
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
        year: "2025",
        kind: "3D / WebGL",
        accent: "#c98d4a",
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
        year: "2024",
        kind: "Brand",
        accent: "#2e54fe",
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
        year: "2023",
        kind: "Visual",
        accent: "#ff6338",
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
        year: "2023",
        kind: "Visual",
        accent: "#2e54fe",
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
        year: "2023",
        kind: "Visual",
        accent: "#ff6338",
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
    {
        slug: "azoth-keyboard",
        year: "2025",
        kind: "3D / WebGL",
        accent: "#2e54fe",
        title: "AZOTH TKL 87",
        subtitle: "Scroll-driven exploded-view product film for a mechanical keyboard",
        description:
            "An Awwwards-style product microsite that takes a premium TKL keyboard apart layer by layer as you scroll — nine assembly layers, a seven-part switch teardown and a programmable backlight engine, all built from procedural geometry.",
        tags: ["React Three Fiber", "GSAP ScrollTrigger", "Next.js", "Procedural 3D"],
        iconName: "Keyboard",
        featured: true,
        role: "Art Direction & Creative Developer",
        duration: "3 Weeks",
        problem:
            "Keyboard marketing pages all look the same: a hero render, a spec table, some RGB. The brief was Apple product cinematography meets Nothing's industrial transparency — a page where the product itself is the narrative and every scroll tick reveals how it is actually made, without a single pre-rendered video.",
        process: [
            "Art direction — Built the look from an exploded-view reference: cool studio light, matte case, no neon, no cyberpunk grids",
            "Procedural modelling — Chose fully procedural Three.js geometry over GLB assets so every keycap, plate, gasket and PCB could be instanced and animated individually",
            "One timeline — Mapped the whole story onto a single normalised 0–1 GSAP timeline; every layer position, camera keyframe and label lives in one config file",
            "Switch teardown — Added a seven-part switch exploded view as a second act, with labels that pin to the parts in 3D space",
            "Backlight engine — Shipped seven lighting modes (wave, spectrum, breathe, reactive, radial, solid, off) with backlit legends and a pointer-reactive mode",
            "Performance — InstancedMesh for repeated geometry, reduced-motion and tab-visibility handling, and a seek() hook for frame-exact QA",
        ],
        outcome:
            "A product page that explains a keyboard better than a spec sheet: four acts on one scroll, from hero to full teardown, running at 60fps on a laptop GPU. The whole site also exports as a single self-contained HTML file for sharing.",
        tools: ["Next.js", "TypeScript", "React Three Fiber", "drei", "GSAP", "esbuild"],
        images: [
            { src: "/images/azoth/hero.jpg", alt: "Hero — the assembled board under cool studio light, wave backlight running" },
            { src: "/images/azoth/front.jpg", alt: "Act 1 — the camera drops to eye level: one billet, nine layers" },
            { src: "/images/azoth/switches.jpg", alt: "Act 2 — keycaps lift away to show the gasket-mounted switch plate" },
            { src: "/images/azoth/layers.jpg", alt: "Act 3 — full exploded section with labels pinned to each layer in 3D" },
        ],
    },
    {
        slug: "superlight",
        year: "2025",
        kind: "3D / WebGL",
        accent: "#ff6338",
        title: "SUPERLIGHT",
        subtitle: "Procedural 3D product page for a lattice-shell gaming mouse",
        description:
            "A single-file Three.js experience that rebuilds a skeletal wireless mouse entirely in code — lofted shell, Voronoi lattice, hand-built studio lighting and custom bloom — then lets you explode it, recolour it and relight it.",
        tags: ["Three.js", "GLSL", "Scroll-driven", "Single-file build"],
        iconName: "Mouse",
        featured: true,
        role: "Creative Developer",
        duration: "2 Weeks",
        problem:
            "The only asset was a reference photo. No CAD, no GLB, no budget for a 3D artist. The challenge was to get a convincing, interactive product on screen using nothing but geometry and shaders — and to keep it light enough to ship as one HTML file.",
        process: [
            "Parametric shell — Lofted the body from a handful of profile curves so the silhouette could be tuned numerically",
            "Lattice — Cut the honeycomb with a Voronoi-border function and per-fragment discard instead of modelling thousands of holes",
            "Studio — Built a PMREM environment from scratch for the metallic and matte materials, plus a lightweight custom bloom pass",
            "Interaction — Scroll-driven camera path, exploded view, colourway, LED and frame-density controls",
        ],
        outcome:
            "A product page that feels like a configurator, weighs less than a hero video, and proved out the procedural workflow later used on AZOTH.",
        tools: ["Three.js", "GLSL", "Vanilla JS", "HTML"],
        images: [
            { src: "/covers/superlight.png", alt: "SUPERLIGHT — lattice mouse poster" },
        ],
    },
    {
        slug: "halyard",
        year: "2026",
        kind: "Product",
        accent: "#2e54fe",
        title: "HALYARD",
        subtitle: "Layered landing page for a crypto product — blue on white",
        description:
            "A landing page study that borrows the layering, pacing and material tricks of Awwwards-winning sites and applies them to a restrained blue-and-white crypto brand. In progress.",
        tags: ["Landing page", "Motion design", "Next.js", "WebGL"],
        iconName: "Waves",
        featured: true,
        role: "Designer & Developer",
        duration: "Ongoing — 2026",
        problem:
            "Crypto sites tend to shout. HALYARD is an attempt at the opposite: a calm, high-trust surface where the depth comes from layered motion and materials rather than dark gradients and glow.",
        process: [
            "Reference study — Broke down a set of award-winning pages into reusable layers: backdrop, media, type, chrome, cursor",
            "System — Defined a blue/white palette, type scale and grid that could survive heavy motion without losing legibility",
            "Hero — Built the first act around a WebGL surface and scroll-synced type",
            "Assets — 3D and image assets produced with Codex and Meshy, kept deliberately sparse",
        ],
        outcome:
            "First sections are live in development; the page is being used as a testbed for the motion system that now powers this portfolio.",
        tools: ["Next.js", "GSAP", "Three.js", "Codex", "Meshy"],
        images: [
            { src: "/covers/halyard.png", alt: "HALYARD — blue and white landing page poster" },
        ],
    },
    {
        slug: "prism",
        year: "2025",
        kind: "Product",
        accent: "#11110f",
        title: "Prism",
        subtitle: "Marketing site and configurator for a premium metal payment card",
        description:
            "A dark, material-led marketing page for a metal card brand, with a card configurator, a bespoke loading sequence and scroll-driven load-in choreography across every section.",
        tags: ["Configurator", "Scroll choreography", "3D", "Fintech"],
        iconName: "CreditCard",
        featured: false,
        role: "Designer & Developer",
        duration: "6 Weeks",
        problem:
            "A metal card is a physical object people want to feel. The site needed to communicate weight, finish and light — on a flat screen, and without slowing the page to a crawl.",
        process: [
            "Material study — Defined finishes, edge highlights and reflections for the card as a 3D object",
            "Configurator — Let visitors choose finish and engraving with real-time preview",
            "Loading sequence — Designed a short branded loader that masks asset fetch and sets the pace",
            "Scroll choreography — Staggered load-ins per section so content arrives in the order you read it",
        ],
        outcome:
            "A premium-feeling page where the card is the hero throughout, and a reusable pattern for loader-into-scroll handoffs.",
        tools: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
        images: [
            { src: "/covers/prism.png", alt: "Prism — metal card poster" },
        ],
    },
    {
        slug: "vayrune",
        year: "2025",
        kind: "Brand",
        accent: "#dfff70",
        title: "VAYRUNE — Edition 01",
        subtitle: "Streetwear brand concept site and collection study",
        description:
            "A concept storefront for a streetwear label, presented as a numbered editorial from 01 to 06. Cabinet Grotesk and Satoshi on ivory, acid green and ink, with no real checkout — the point is the collection, not the cart.",
        tags: ["Brand", "Editorial layout", "React 19", "Tailwind v4"],
        iconName: "Shirt",
        featured: false,
        role: "Brand & Frontend",
        duration: "4 Weeks",
        problem:
            "Most fashion sites are templates with a logo swapped in. VAYRUNE needed to feel like a printed lookbook that happens to scroll — with a type system and pacing strong enough to carry a collection without photography on every screen.",
        process: [
            "Identity — Cabinet Grotesk display with Satoshi body; acid green #dfff70, ink and a single blue accent",
            "Structure — Numbered sections 01–06 ending in a 'Good to know' FAQ, each with its own layout rhythm",
            "Build — React 19 on a Next-style runtime with Tailwind v4 and Base UI components",
            "Iteration — Section-by-section design passes until every screen could stand alone as a poster",
        ],
        outcome:
            "A collection site that reads like a zine, built on a component system ready for a real catalogue.",
        tools: ["React 19", "vinext", "Tailwind CSS v4", "Base UI"],
        images: [
            { src: "/covers/vayrune.png", alt: "VAYRUNE Edition 01 — poster" },
        ],
    },
    {
        slug: "afterimage",
        year: "2026",
        kind: "Brand",
        accent: "#ff6338",
        title: "AFTERIMAGE",
        subtitle: "Grunge × Y2K athleisure prelaunch page, built with an agent team",
        description:
            "A pre-launch landing page for an athleisure concept with a 'degraded terminal' interface — scanlines, glitched type and a scroll story — researched and built by a team of coding agents under direction.",
        tags: ["Concept brand", "Scroll story", "Agentic build", "Y2K"],
        iconName: "Zap",
        featured: false,
        role: "Creative Director",
        duration: "1 Week",
        problem:
            "Could a brand page be art-directed and shipped almost entirely through agents, from moodboard to code, while still ending up with a point of view? AFTERIMAGE was the test.",
        process: [
            "Research — Agents mined Pinterest and the Obsidian pattern vault for grunge and Y2K references and produced a plan board",
            "Direction — Approved the AFTERIMAGE visual direction and the degraded-terminal interface before any code was written",
            "Build — Claude and Codex built the page together in a review branch; nothing merged without sign-off",
            "Review — Iterated on pacing and type treatment from a phone, between other commitments",
        ],
        outcome:
            "A finished prelaunch page in a week of part-time direction — and a repeatable brief-to-build loop for future concepts.",
        tools: ["Codex", "Claude", "Next.js", "GSAP"],
        images: [
            { src: "/covers/afterimage.png", alt: "AFTERIMAGE — glitch poster" },
        ],
    },
    {
        slug: "f1-driver-portal",
        year: "2025",
        kind: "UX",
        accent: "#1ec97a",
        title: "F1 Driver Portal",
        subtitle: "Digital-cockpit UI concept with live telemetry",
        description:
            "A dark, cockpit-style portal concept for a Formula 1 driver: live telemetry sidebar, next-race widget and a helmet-visor reveal in the hero that responds to hover and scroll.",
        tags: ["UI concept", "Data display", "Interaction design", "AI-assisted build"],
        iconName: "Gauge",
        featured: false,
        role: "Product Designer",
        duration: "2 Weeks",
        problem:
            "Motorsport data is dense and fast. The concept explores how a driver-facing portal could feel like the car — dark, instrumented, immediate — without turning into a wall of numbers.",
        process: [
            "Information architecture — Garage, Telemetry, Strategy, Calendar, Drivers and Pit Wall as the six primary spaces",
            "Hero — Designed a visor-reveal interaction so the first screen responds to the cursor before any data is read",
            "Telemetry — Laid out a persistent sidebar for live channels with clear hierarchy between critical and ambient data",
            "Build — Prompted assets and layouts across AI tools, then assembled the concept with AI-assisted development",
        ],
        outcome:
            "A portal concept that doubles as a study in dark data UI, and the start of a reusable telemetry component set.",
        tools: ["Figma", "Lovable", "Google AI Studio", "React"],
        images: [
            { src: "/covers/f1-portal.png", alt: "F1 Driver Portal — cockpit poster" },
        ],
    },
    {
        slug: "agent-manager",
        year: "2026",
        kind: "Tooling",
        accent: "#2e54fe",
        title: "Agent Manager",
        subtitle: "Dashboard for a Builder / Thinker / Manager agent team",
        description:
            "An internal tool for running a small team of coding agents from a phone: assign a brief, watch builders, thinkers and a manager work it through, and review the output — built so projects could keep moving during National Service.",
        tags: ["Internal tool", "Agent orchestration", "Dashboard", "Mobile-first"],
        iconName: "Bot",
        featured: false,
        role: "Designer & Developer",
        duration: "Ongoing — 2026",
        problem:
            "With only short evening windows and a phone, hand-coding stopped being an option. The runner needed to take a brief, split it across agent roles, and report back in a form that could be read and approved in a few minutes.",
        process: [
            "Roles — Builder, Thinker and Manager agents with distinct responsibilities and a shared task board",
            "Dashboard — A single view of every agent's status, current task and latest output",
            "Review loop — Work lands in review branches and previews; nothing merges or deploys without approval",
            "On demand — No schedule or paid hosting; it runs when given a command and reports through the dashboard",
        ],
        outcome:
            "Several concept sites, including AFTERIMAGE, shipped through the runner with only phone-based direction.",
        tools: ["Codex", "Claude", "Node.js", "Next.js"],
        images: [
            { src: "/covers/agent-manager.png", alt: "Agent Manager — dashboard poster" },
        ],
    },
];
