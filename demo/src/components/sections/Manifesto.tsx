import { Reveal } from "@/components/Reveal";

export function Manifesto() {
  return (
    <section
      aria-label="Manifesto"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vw] leading-none font-medium tracking-[-0.08em] text-foreground/[0.07] select-none"
      >
        OLHAR
      </p>
      <Reveal className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="font-mono text-[10px] tracking-[0.32em] text-muted uppercase">
          Nota de direção
        </p>
        <blockquote className="font-display mt-8 text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-muted">A imagem certa não explica.</span>
          <br />
          <em className="text-paper italic">Ela permanece.</em>
        </blockquote>
      </Reveal>
    </section>
  );
}
