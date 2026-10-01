import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Closing() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-paper px-5 py-16 text-ink md:px-8 md:py-40 lg:px-12"
    >
      <p className="font-mono text-[10px] tracking-[0.32em] text-ink/45 uppercase">
        10 — Encerramento
      </p>
      <h2 className="font-display mt-5 max-w-5xl text-[clamp(2rem,9vw,6rem)] leading-[0.95] tracking-[-0.04em] text-balance md:mt-8">
        Você já viu o meu olhar.
        <br />
        Agora, deixe-me enxergar o seu.
      </h2>

      <div className="mt-8 md:mt-14">
        <Button
          asChild
          size="lg"
          className="bg-ink text-paper hover:bg-foreground hover:text-ink"
        >
          <a href={site.contact.whatsapp} target="_blank" rel="noreferrer">
            {site.contact.whatsappLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}
