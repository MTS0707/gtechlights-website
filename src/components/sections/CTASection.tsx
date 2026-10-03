import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappUrl } from "@/config/site";

type Props = {
  title?: string;
  text?: string;
};

export function CTASection({
  title = "Have a Lighting Requirement?",
  text = "Let's design the right lighting solution for your space.",
}: Props) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-700">
      <div aria-hidden className="arch-grid absolute inset-0 -z-10 opacity-80" />
      <div
        aria-hidden
        className="absolute -right-40 top-1/2 -z-10 size-[42rem] -translate-y-1/2 rounded-full border border-white/10 shadow-[inset_0_0_120px_rgba(255,255,255,0.08)]"
      />
      <div aria-hidden className="absolute -right-20 top-1/2 -z-10 size-[26rem] -translate-y-1/2 rounded-full border border-white/15" />
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-6 text-lg text-brand-100 sm:text-xl">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="light" arrow>
              Request a Consultation
            </Button>
            <Button href={whatsappUrl()} variant="outline-light">
              WhatsApp Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
