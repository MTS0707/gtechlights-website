import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getProject, projects, PLACEHOLDER } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.application}`,
    description: `${project.solution} Lighting scope: ${project.lightingScope}.`,
    path: `/projects/${project.slug}`,
    image: project.images[0].src,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const related = projects.filter((p) => p.slug !== project.slug && p.categories.some((c) => project.categories.includes(c))).slice(0, 3);

  const facts: [string, string | undefined][] = [
    ["Client", project.client],
    ["Location", project.location],
    ["Application", project.application],
    ["Sector", project.categories.join(", ")],
    ["Lighting scope", project.lightingScope],
    ["Year", project.year],
  ];

  return (
    <>
      <PageHero
        eyebrow={project.categories.join(" · ")}
        title={project.title}
        intro={<p>{project.application}</p>}
        image={project.images[0]}
        breadcrumb={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="eyebrow text-ink-900">Project Details</h2>
                <dl className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
                  {facts.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-[0.95rem]">
                      <dt className="text-ink-400">{k}</dt>
                      <dd className={v ? "text-ink-800" : "italic text-ink-400"}>{v ?? PLACEHOLDER}</dd>
                    </div>
                  ))}
                </dl>
                <h2 className="eyebrow mt-10 text-ink-900">Solution</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-600">{project.solution}</p>
                <Button href="/contact" className="mt-10 w-full sm:w-auto" arrow>
                  Discuss a similar project
                </Button>
              </div>
            </aside>
            <div className="lg:col-span-8">
              <ImageGrid images={project.images} columns="grid-cols-1" />
              <p className="mt-4 text-sm text-ink-400">Installation photograph{project.images.length > 1 ? "s" : ""} supplied by G Tech Lights.</p>
            </div>
          </div>

          <nav aria-label="More projects" className="mt-20 grid grid-cols-2 border-t border-ink-100 pt-8">
            <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1 pr-4">
              <span className="flex items-center gap-2 text-sm text-ink-400">
                <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" /> Previous
              </span>
              <span className="font-semibold text-ink-900 group-hover:text-brand-600">{prev.title}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-1 pl-4 text-right">
              <span className="flex items-center gap-2 text-sm text-ink-400">
                Next <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-semibold text-ink-900 group-hover:text-brand-600">{next.title}</span>
            </Link>
          </nav>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-mist py-20 sm:py-28">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Related projects</h2>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
