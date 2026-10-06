import { useState } from "react";
import { Compare } from "@/components/ui/compare";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function BeforeAfter() {
  const [hint, setHint] = useState(true);

  return (
    <section id="tratamento" className="relative px-5 pt-20 pb-8 md:px-10 md:pt-28 md:pb-12 lg:px-14">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
          O tratamento
        </p>
        <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.2rem,6.4vw,5.6rem)] leading-[0.88] font-light tracking-[-0.04em]">
          Antes e depois.
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70 md:mt-8 md:text-base">
          O instante é o mesmo. Arraste para ver o olhar bruto e o tratamento
          final.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-10 w-full max-w-3xl md:mt-14">
        <div className="relative mx-auto w-full max-w-[min(100%,calc(72svh*0.75))]">
          <Compare
            firstImage={site.images.before}
            secondImage={site.images.after}
            firstImageAlt={site.images.beforeAlt}
            secondImageAlt={site.images.afterAlt}
            slideMode="drag"
            autoplay
            autoplayDuration={3800}
            className="aspect-[3/4] w-full bg-line"
            onInteract={() => setHint(false)}
          />
          <div className="pointer-events-none absolute inset-x-3 top-3 z-40 flex justify-between md:inset-x-5 md:top-5">
            <span className="rounded-full bg-black/80 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.22em] text-white uppercase shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-4 md:text-xs">
              Antes
            </span>
            <span className="rounded-full bg-black/80 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.22em] text-white uppercase shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-4 md:text-xs">
              Depois
            </span>
          </div>
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-500 md:bottom-6 ${hint ? "opacity-100" : "opacity-0"}`}
          >
            <p className="font-mono animate-pulse rounded-full bg-black/55 px-3.5 py-1.5 text-[10px] tracking-[0.28em] text-white uppercase">
              Arrastar a imagem?
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
