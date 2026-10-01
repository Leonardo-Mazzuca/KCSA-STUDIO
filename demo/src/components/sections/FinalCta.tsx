import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <section
      id="ensaio"
      className="px-5 py-28 md:px-8 md:py-40 lg:px-12 lg:py-48"
    >
      <Reveal>
        <p className="font-mono mb-10 text-[10px] tracking-[0.32em] text-muted uppercase">
          09 — Convite
        </p>
        <h2 className="font-display mx-auto max-w-4xl text-center text-[clamp(2.4rem,6.4vw,6rem)] leading-[0.92] tracking-[-0.04em] text-balance">
          Agora imagine essa página com você.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-16 max-w-lg md:mt-24">
        <figure>
          <div className="overflow-hidden bg-line">
            <img
              src={site.images.closing}
              alt={site.images.closingAlt}
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover object-[50%_22%]"
            />
          </div>
        </figure>
      </Reveal>

      <Reveal delay={0.16} className="mt-14 flex justify-center">
        <a
          href="#contato"
          className="group font-mono inline-flex items-center gap-3 border-b border-foreground/40 pb-2 text-[11px] tracking-[0.32em] uppercase transition-colors hover:border-foreground"
        >
          {site.cta.session}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
