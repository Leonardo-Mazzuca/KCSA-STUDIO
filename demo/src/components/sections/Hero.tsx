import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { HeroStage } from "@/components/webgl/HeroStage";
import { site } from "@/data/site";

function useHeroScroll(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const extra = section.offsetHeight - window.innerHeight;
      if (extra <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / extra));
      setProgress((current) => (Math.abs(current - next) < 0.002 ? current : next));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sectionRef]);

  return progress;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useHeroScroll(sectionRef);
  const fade = 1 - progress * 0.85;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative isolate h-svh bg-ink text-foreground md:h-[145svh]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <HeroStage scrollProgress={progress} />

        <div
          className="relative z-10 mt-auto flex w-full flex-col justify-end px-5 pt-24 pb-6 md:px-8 md:pt-28 md:pb-16 lg:px-12"
          style={{ opacity: fade, transform: `translate3d(0, ${progress * -24}px, 0)` }}
        >
          <p className="font-mono mb-3 flex items-center gap-3 text-[10px] tracking-[0.32em] text-white/72 uppercase md:mb-6">
            <span className="bg-paper inline-block h-4 w-px animate-pulse-line" />
            {site.role}
          </p>

          <h1 className="font-display max-w-5xl text-[clamp(2.5rem,12vw,3.4rem)] leading-[0.88] tracking-[-0.045em] md:text-[clamp(3.2rem,10vw,7.4rem)]">
            Kelvin <em className="font-display font-normal italic">Carlos</em>
          </h1>

          <p className="font-display mt-3 max-w-xl text-xl font-normal text-white/90 italic md:mt-6 md:text-3xl">
            {site.tagline}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center md:mt-10 md:gap-3">
            <a
              href="#trabalhos"
              className="group font-mono inline-flex items-center justify-center gap-3 bg-paper px-5 py-3 text-[10px] tracking-[0.28em] text-ink uppercase transition-colors hover:bg-foreground md:px-6 md:py-3.5"
            >
              {site.cta.primary}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group font-mono inline-flex items-center justify-center gap-3 border border-white/35 px-5 py-3 text-[10px] tracking-[0.28em] text-white uppercase transition-colors hover:bg-white hover:text-ink md:px-6 md:py-3.5"
            >
              {site.contact.whatsappLabel}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
