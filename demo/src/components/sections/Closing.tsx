import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Closing() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-paper px-5 py-28 text-ink md:px-8 md:py-40 lg:px-12"
    >
      <p className="font-mono text-[10px] tracking-[0.32em] text-ink/45 uppercase">
        10 — Encerramento
      </p>
      <h2 className="font-display mt-8 max-w-5xl text-[clamp(2.4rem,6.2vw,6rem)] leading-[0.9] tracking-[-0.04em] text-balance">
        Você já viu o meu olhar.
        <br />
        Agora, deixe-me enxergar o seu.
      </h2>

      <div className="mt-14">
        <Button
          asChild
          size="lg"
          className="bg-ink text-paper hover:bg-foreground hover:text-ink"
        >
          <a href={`mailto:${site.contact.email}`}>
            {site.cta.close}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}
