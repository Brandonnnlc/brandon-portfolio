import { projects } from "@/data/projects";
import ProjectDetailClient from "./project-detail-client";
import type { Metadata } from "next";
import Link from "next/link";

type PageProps = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all project slugs
export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate dynamic metadata for each project page
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
        return { title: "Project Not Found | Brandon" };
    }
    return {
        title: `${project.title} — Brandon Lim`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    const projectIndex = projects.findIndex((p) => p.slug === slug);

    if (!project) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">
                        ← Back to home
                    </Link>
                </div>
            </main>
        );
    }

    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject =
        projects[(projectIndex - 1 + projects.length) % projects.length];

    return (
        <ProjectDetailClient
            project={project}
            nextProject={nextProject}
            prevProject={prevProject}
            position={projectIndex + 1}
            total={projects.length}
        />
    );
}
