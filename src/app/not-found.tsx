import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-950 pb-20 pt-36">
      <div aria-hidden className="arch-grid absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 h-px overflow-hidden">
        <div className="h-px w-1/2 animate-beam bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
      </div>
      <Container>
        <p className="eyebrow text-brand-300">Error 404</p>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-7xl">This page is in the dark.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-300">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/projects" variant="outline-light">
            View projects
          </Button>
          <Button href="/contact" variant="text-light" className="px-3!">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
