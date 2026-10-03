import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  number?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, number, title, intro, dark, align = "left", as = "h2", className = "" }: Props) {
  const Tag = as;
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 short:mb-3 flex items-center gap-3 ${centered ? "justify-center" : ""} ${dark ? "text-brand-300" : "text-brand-600"}`}>
          {number && <span className="tabular-nums">{number}</span>}
          <span aria-hidden className={`h-px w-8 ${dark ? "bg-brand-300/60" : "bg-brand-600/50"}`} />
          <span>{eyebrow}</span>
        </p>
      )}
      <Tag
        className={`text-balance text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3.1rem] short:text-[2.5rem] ${dark ? "text-white" : "text-ink-900"}`}
      >
        {title}
      </Tag>
      {intro && (
        <div className={`mt-6 text-pretty text-[1.05rem] leading-relaxed sm:text-lg short:mt-3 short:text-base ${dark ? "text-ink-300" : "text-ink-500"}`}>{intro}</div>
      )}
    </div>
  );
}
