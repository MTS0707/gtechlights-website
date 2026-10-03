import Image from "next/image";
import { channelPartners } from "@/data/partners";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

/** Dark band presenting the companies G Tech Lights is a channel partner for (logos are designed for dark backgrounds). */
export function ChannelPartners({ number }: { number?: string }) {
  if (channelPartners.length === 0) return null;
  const names = channelPartners.map((p) => p.name).join(", ");
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 py-16 sm:py-20" aria-labelledby="partners-heading">
      <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-brand-300">
              {number && <span className="tabular-nums">{number}</span>}
              <span aria-hidden className="h-px w-8 bg-brand-300/60" />
              Channel Partner
            </p>
            <h2 id="partners-heading" className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {site.name} is a channel partner of {names}
            </h2>
          </div>
          <ul className="flex flex-wrap items-center gap-6 lg:col-span-7 lg:justify-end">
            {channelPartners.map((p) => {
              const logo = (
                <Image
                  src={p.logo.src}
                  alt={p.logo.alt}
                  width={p.logo.width}
                  height={p.logo.height}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="h-auto w-full max-w-[560px]"
                />
              );
              return (
                <li key={p.name} className="w-full border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-10 lg:max-w-[640px]">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                      {logo}
                    </a>
                  ) : (
                    logo
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
