import type { Leader } from "@/data/people";
import { Photo } from "@/components/ui/Photo";

export function LeadershipCard({ leader, fit = false }: { leader: Leader; /** Fit-to-screen: from 1280px the card fills its grid cell. */ fit?: boolean }) {
  const initials = leader.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <article className={`reveal group grid overflow-hidden border border-white/10 bg-ink-900 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${fit ? "xl:h-full" : ""}`}>
      <div className={`relative aspect-[4/5] overflow-hidden bg-ink-800 sm:aspect-auto sm:min-h-[22rem] ${fit ? "xl:min-h-0" : ""}`}>
        {leader.photo ? (
          <Photo
            photo={leader.photo}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="object-top transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.03]"
          />
        ) : (
          <div role="img" aria-label={`Portrait of ${leader.name} — photograph to be supplied`} className="arch-grid absolute inset-0 grid place-items-center">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(91,134,240,0.35),transparent_60%)]" />
            <span aria-hidden className="relative text-7xl font-semibold tracking-tight text-white/85">
              {initials}
            </span>
            <span className="eyebrow absolute bottom-4 left-4 text-[0.6rem] text-ink-400">Photograph to be supplied</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-9 short:gap-4 short:p-6">
        <div>
          <p className="eyebrow text-brand-300">{leader.role}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl short:mt-2 short:text-2xl">{leader.name}</h3>
          <p className="mt-4 leading-relaxed text-ink-300 short:mt-2">{leader.summary}</p>
        </div>
        <ul className="space-y-3 border-t border-white/10 pt-6 text-sm text-ink-200 short:space-y-2 short:pt-4">
          {leader.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-brand-400" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
