import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { HeroStage } from "@/components/webgl/HeroStage";
import { site } from "@/data/site";
import { useElementProgress } from "@/hooks/useElementProgress";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useElementProgress(sectionRef);
  const fade = 1 - progress * 0.9;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative isolate h-svh overflow-hidden bg-ink text-foreground md:h-[128svh]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <HeroStage scrollProgress={progress} />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-black/80 to-transparent md:h-16" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black via-black/55 to-transparent md:h-48" />

        <div className="relative z-30 flex h-full flex-col px-5 pt-24 pb-6 md:px-10 md:pt-28 md:pb-10 lg:px-14">
          <p className="font-mono text-[10px] tracking-[0.42em] text-white/55 uppercase">
            01 / {site.location.city}
          </p>

          <div
            className="mt-auto max-w-5xl"
            style={{
              opacity: fade,
              transform: `translate3d(0, ${progress * -28}px, 0)`,
            }}
          >
            <p className="font-mono mb-3 text-[10px] tracking-[0.36em] text-white/60 uppercase md:mb-4">
              {site.role}
            </p>
            <h1 className="font-display font-light text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.8] tracking-[-0.055em]">
              Kelvin
              <span className="block font-normal italic">Carlos</span>
            </h1>

            <div className="mt-5 flex flex-col gap-5 sm:mt-7">
              <p className="font-display max-w-md text-xl leading-tight text-white/80 italic md:text-3xl">
                {site.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-5 md:gap-8">
                <a
                  href="#trabalhos"
                  className="group font-mono inline-flex items-center gap-3 bg-paper px-5 py-3 text-[10px] tracking-[0.3em] text-ink uppercase transition-colors hover:bg-foreground md:px-6 md:py-3.5"
                >
                  {site.cta.primary}
                  <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group font-mono inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/70 uppercase transition-colors hover:text-white"
                >
                  {site.contact.whatsappLabel}
                  <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-5 left-1/2 z-30 hidden h-12 w-px origin-top bg-white/40 md:block"
          style={{ transform: `translateX(-50%) scaleY(${1 - progress})` }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
