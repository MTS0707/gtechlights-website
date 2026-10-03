import { clientReferences } from "@/data/people";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Customer references as text only (no logos) until authorisation is obtained.
 */
export function ClientReferences({ number }: { number?: string }) {
  return (
    <section className="bg-mist py-20 sm:py-28" aria-labelledby="clients-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              number={number}
              eyebrow="Customer References"
              title={<span id="clients-heading">Experience with corporate, healthcare and commercial customers</span>}
            />
            <p className="mt-6 text-sm leading-relaxed text-ink-500">
              Customer references as provided by G Tech Lights, reflecting the experience of our team. Names are shown as text; logos are
              not used.
            </p>
          </div>
          <ul className="grid grid-cols-2 border-l border-t border-ink-200/70 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            {clientReferences.map((name) => (
              <li
                key={name}
                className="flex min-h-24 items-center justify-center border-b border-r border-ink-200/70 px-4 text-center text-base font-semibold tracking-tight text-ink-700 transition-colors hover:bg-white hover:text-brand-600 sm:min-h-28 sm:text-lg"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
