import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroImage } from "@/data/projects";
import { site } from "@/data/site";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-svh overflow-hidden bg-ink text-foreground"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage.image}
          alt={heroImage.alt}
          width={1080}
          height={1350}
          fetchPriority="high"
          decoding="sync"
          className="animate-kenburns h-full w-full object-cover object-[50%_20%] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 z-20 border border-white/20 md:inset-6"
      >
        <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-white md:h-12 md:w-12" />
        <span className="absolute top-0 right-0 h-8 w-8 border-t border-r border-white md:h-12 md:w-12" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white md:h-12 md:w-12" />
        <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-white md:h-12 md:w-12" />
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-[14%] left-1/2 z-10 -translate-x-1/2 font-display text-[32vw] leading-none font-medium tracking-[-0.07em] text-white/15 select-none"
      >
        {site.shortName}
      </p>

      <p className="absolute top-1/2 left-6 hidden origin-left -translate-y-1/2 rotate-180 font-mono text-[10px] tracking-[0.42em] text-white/80 uppercase [writing-mode:vertical-rl] md:left-10 lg:block">
        Estúdio criativo
      </p>

      <div className="relative z-10 mt-auto flex w-full flex-col justify-end px-7 pt-28 pb-12 md:px-12 md:pb-16 lg:px-16">
        <p className="font-mono mb-5 flex items-center gap-3 text-[10px] tracking-[0.32em] text-white/80 uppercase">
          <span className="bg-paper inline-block h-4 w-px animate-[pulse-line_2.4s_ease-in-out_infinite]" />
          01 — Introdução
        </p>

        <h1 className="font-display max-w-6xl text-[clamp(3.6rem,10vw,9.4rem)] leading-[0.82] tracking-[-0.045em]">
          KCSA{" "}
          <em className="font-display font-normal italic">Studio</em>
        </h1>

        <TextGenerateEffect
          words={site.tagline}
          className="font-display mt-6 max-w-2xl text-3xl font-normal text-white italic sm:text-4xl md:text-5xl"
        />

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.28em] text-white/80 uppercase">
            {site.location.label}
          </p>
          <a
            href="/demo#trabalhos"
            className="group font-mono inline-flex items-center gap-3 border border-white/40 bg-white/5 px-5 py-3 text-[10px] tracking-[0.28em] uppercase backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
          >
            Ver trabalhos
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <ArrowDown className="size-3.5 opacity-50" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
