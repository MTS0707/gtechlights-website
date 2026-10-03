import Link from "next/link";
import { ArrowUpRight, Award, Cog, Handshake, Layers, Lightbulb, PencilRuler, ShieldCheck, Users } from "lucide-react";
import { whyUs } from "@/data/company";

const icons = [Award, PencilRuler, Cog, ShieldCheck, Users, Layers, Handshake, Lightbulb];

/** "Why G Tech Lights" cards. Pass `items` to show a subset. */
type Props = { dark?: boolean; items?: typeof whyUs; cta?: { label: string; href: string }; className?: string };

export function WhyGrid({ dark = false, items = whyUs, cta, className = "" }: Props) {
  return (
    <ul className={`grid border-l border-t sm:grid-cols-2 lg:grid-cols-4 ${dark ? "border-white/10" : "border-ink-100"} ${className}`}>
      {items.map((item, i) => {
        const Icon = icons[whyUs.indexOf(item) % icons.length] ?? icons[i % icons.length];
        return (
          <li
            key={item.title}
            className={`reveal group relative border-b border-r p-7 transition-colors duration-500 sm:p-8 short:px-6 short:py-5 ${
              dark ? "border-white/10 hover:bg-white/[0.03]" : "border-ink-100 hover:bg-mist"
            }`}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100"
            />
            <Icon aria-hidden strokeWidth={1.5} className={`size-8 short:size-6 ${dark ? "text-brand-300" : "text-brand-600"}`} />
            <h3 className={`mt-6 text-lg font-semibold leading-snug short:mt-3 short:text-base ${dark ? "text-white" : "text-ink-900"}`}>{item.title}</h3>
            <p className={`mt-3 text-[0.95rem] leading-relaxed short:mt-1.5 short:text-sm ${dark ? "text-ink-300" : "text-ink-500"}`}>{item.text}</p>
          </li>
        );
      })}
      {cta && (
        <li className="on-dark group relative flex flex-col justify-between border-b border-r border-brand-700 bg-brand-600 p-7 transition-colors hover:bg-brand-700 sm:p-8 short:px-6 short:py-5">
          <p className="text-lg font-semibold leading-snug text-white">Let&apos;s discuss your space</p>
          <Link href={cta.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-white after:absolute after:inset-0">
            {cta.label}
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </li>
      )}
    </ul>
  );
}
