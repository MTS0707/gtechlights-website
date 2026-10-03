import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "light" | "outline" | "outline-light" | "text" | "text-light";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-[0_0_0_0_rgba(29,74,187,0)] hover:shadow-[0_8px_30px_-8px_rgba(29,74,187,0.6)]",
  light: "bg-white text-ink-900 hover:bg-brand-50",
  outline: "border border-ink-900/20 text-ink-900 hover:border-brand-600 hover:text-brand-600",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
  text: "text-brand-600 hover:text-brand-800 px-0! min-h-0!",
  "text-light": "text-white hover:text-brand-200 px-0! min-h-0!",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[0.95rem] font-semibold tracking-wide transition-all duration-300 ease-out-soft";

type Props = {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** Link styled as a button. External / tel / mailto links render a plain anchor. */
export function Button({ href, variant = "primary", arrow = false, className = "", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
