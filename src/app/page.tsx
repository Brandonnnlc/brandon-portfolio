import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Timeline from "@/components/sections/timeline";
import Contact from "@/components/sections/contact";
import FooterSection from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="relative w-full pb-24">
      <Navbar />
      <Hero />
      <div className="px-4 md:px-8 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#121212] pt-8">
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <FooterSection />
      </div>
    </main>
  );
}
