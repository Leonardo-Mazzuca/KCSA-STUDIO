import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-svh overflow-hidden bg-ink text-foreground"
    >
      <div className="grid min-h-svh lg:grid-cols-12">
        <div className="relative min-h-[72svh] lg:col-span-7 lg:min-h-svh">
          <img
            src={site.images.hero}
            alt={site.images.heroAlt}
            width={1500}
            height={2000}
            fetchPriority="high"
            decoding="sync"
            className="animate-kenburns absolute inset-0 h-full w-full object-cover object-[80%_52%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 flex flex-col justify-end px-5 py-10 md:px-8 lg:col-span-5 lg:px-12 lg:py-16">
          <Spotlight
            className="-top-40 left-0 hidden lg:block"
            fill="white"
          />
          <p className="font-mono mb-6 flex items-center gap-3 text-[10px] tracking-[0.32em] text-white/72 uppercase">
            <span className="bg-paper inline-block h-4 w-px animate-[pulse-line_2.4s_ease-in-out_infinite]" />
            {site.role}
          </p>

          <h1 className="font-display text-[clamp(3.2rem,8vw,6.4rem)] leading-[0.86] tracking-[-0.045em]">
            Kelvin <em className="font-display font-normal italic">Carlos</em>
          </h1>

          <p className="font-display animate-fade-up mt-6 max-w-md text-2xl font-normal text-white/90 italic md:text-3xl">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#trabalhos"
              className="group font-mono inline-flex items-center justify-center gap-3 bg-paper px-6 py-3.5 text-[10px] tracking-[0.28em] text-ink uppercase transition-colors hover:bg-foreground"
            >
              {site.cta.primary}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contato"
              className="group font-mono inline-flex items-center justify-center gap-3 border border-white/35 px-6 py-3.5 text-[10px] tracking-[0.28em] text-white uppercase transition-colors hover:bg-white hover:text-ink"
            >
              {site.cta.secondary}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
