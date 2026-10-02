import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Closing() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36 lg:px-14"
    >
      <p
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-6 top-8 text-[clamp(5rem,18vw,16rem)] leading-none tracking-[-0.07em] text-foreground/[0.06] md:top-4"
      >
        KCSA
      </p>
      <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
        10 / Encerramento
      </p>
      <h2 className="font-display mt-6 max-w-[16ch] text-[clamp(2.4rem,8vw,7.2rem)] leading-[0.86] tracking-[-0.05em]">
        Você já viu o meu olhar.
        <span className="mt-2 block font-normal italic">
          Agora, deixe-me enxergar o seu.
        </span>
      </h2>

      <a
        href={site.contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="group font-mono mt-12 inline-flex items-center gap-3 bg-paper px-7 py-4 text-[10px] tracking-[0.32em] text-ink uppercase transition-colors hover:bg-foreground"
      >
        {site.contact.whatsappLabel}
        <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
}
