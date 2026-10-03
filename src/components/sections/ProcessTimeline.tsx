import type { ProcessStep } from "@/data/process";

/** Numbered process timeline — vertical on mobile, a stepped grid on desktop. */
export function ProcessTimeline({ steps, dark = false }: { steps: ProcessStep[]; dark?: boolean }) {
  const cols = steps.length > 7 ? "lg:grid-cols-4" : "lg:grid-cols-4 xl:grid-cols-7";
  return (
    <ol className={`relative grid gap-0 sm:grid-cols-2 ${cols}`}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`reveal group relative border-l pb-10 pl-8 sm:border-l-0 sm:border-t sm:pb-0 sm:pl-0 sm:pr-6 sm:pt-8 ${
            dark ? "border-white/15" : "border-ink-100"
          } ${steps.length > 7 ? "lg:pb-12 short:pb-6" : ""}`}
        >
          <span
            aria-hidden
            className={`absolute -left-[5px] top-1 size-2.5 rounded-full sm:-top-[5px] sm:left-0 ${
              dark ? "bg-brand-400 shadow-[0_0_14px_3px_rgba(91,134,240,0.6)]" : "bg-brand-600 shadow-[0_0_12px_2px_rgba(29,74,187,0.35)]"
            }`}
          />
          <p className={`text-sm font-semibold tabular-nums ${dark ? "text-brand-300" : "text-brand-600"}`}>{String(i + 1).padStart(2, "0")}</p>
          <h3 className={`mt-3 text-lg font-semibold leading-snug short:mt-2 short:text-base ${dark ? "text-white" : "text-ink-900"}`}>{step.title}</h3>
          <p className={`mt-3 text-[0.95rem] leading-relaxed short:mt-2 short:text-sm ${dark ? "text-ink-300" : "text-ink-500"}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
