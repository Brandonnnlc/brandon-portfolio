# Brandon Lim - Developer Portfolio

A personal portfolio showcasing my engineering projects, design experience, and journey as I prepare for university admissions. Built to be fast, interactive, and visually striking, this portfolio reflects my capabilities in full-stack development and UI/UX design.

## 🎯 Purpose
The main goal of this project is to provide a comprehensive, interactive resume. It goes beyond a simple PDF by demonstrating technical skills through live code—featuring custom scroll animations, interactive physics components, and a custom dark mode UI system.

## 🛠️ Tech Stack & Framework
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Animations:** [GSAP](https://gsap.com/) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering/) smooth scroll; [Three.js](https://threejs.org/) for the hero portal and vinyl disc
- **Fonts:** Geist Sans / Geist Mono, self-hosted via the `geist` package
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Custom UI inspired by [shadcn/ui](https://ui.shadcn.com/)

## 🚀 Build Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Brandonnnlc/brandon-portfolio.git
   cd brandon-portfolio
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio live.

### Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

## 📂 Key Features
- **17 case studies** — featured rows on the home page plus a filterable Index of every project (product, 3D/WebGL, brand, UX, tooling, visual).
- **Motion system** — Lenis smooth scroll synced to GSAP ScrollTrigger, custom cursor with contextual labels, magnetic buttons, scroll-velocity marquee, split-character hero reveal.
- **Page transitions** — a curtain wipe between the home page and case studies (`TransitionLink`), with the loader playing once per session.
- **Case study template** — sticky chapter nav, reading progress bar, word-by-word intro, cover parallax and a full-bleed "next project" handoff.
- **Designed covers** — projects without screenshots use generated poster art in `public/covers` (regenerate with `node tools/covers.mjs`, needs `playwright`; replace with real captures any time).
- **Responsive + accessible** — mobile menu, touch-aware (no cursor/magnetics on touch), `prefers-reduced-motion` disables Lenis, loader, cursor and curtain.

## 🧩 Structure
- `src/data/projects.ts` — all project content. Add a project here and it appears in the Index automatically; add its slug to `featuredSlugs` in `src/app/page.tsx` to feature it.
- `src/components/scroll-director.tsx` — every scroll-bound animation, keyed by route.
- `src/components/page-transition.tsx` — curtain + `TransitionLink`.
- `src/components/project-index.tsx` — the filterable archive with hover preview.
