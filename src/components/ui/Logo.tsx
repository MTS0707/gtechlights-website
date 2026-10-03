import Image from "next/image";

/** Brand logo (vector redraw of the supplied logo; original PNG kept in /images/logo). */
export function Logo({ inverse = false, className = "h-10 w-auto" }: { inverse?: boolean; className?: string }) {
  return (
    <Image
      src={inverse ? "/images/logo/g-tech-lights-logo-inverse.svg" : "/images/logo/g-tech-lights-logo.svg"}
      alt="G Tech Lights"
      width={1040}
      height={320}
      unoptimized
      priority
      className={className}
    />
  );
}
