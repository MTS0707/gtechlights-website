import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Projects — Architectural & Designer Lighting Installations",
  description:
    "Lighting installations by G Tech Lights: feature ceilings, linear profile systems, ring and hexagon luminaires, and decorative pendants for corporate, commercial, hospitality and retail spaces.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Light, installed"
        intro={<p>A portfolio of G Tech Lights installations, photographed on site. Filter by sector and open any image to view it larger.</p>}
        image={photo("projects/gym-hexagon-grid-ceiling", "")}
        breadcrumb={[{ name: "Projects", path: "/projects" }]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <ProjectGallery projects={projects} />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
