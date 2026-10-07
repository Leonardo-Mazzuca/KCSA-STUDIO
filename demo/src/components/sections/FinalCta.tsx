import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { useElementProgress } from "@/hooks/useElementProgress";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const progress = useElementProgress(ref);
  const scale = 1.12 - progress * 0.1;

  return (
    <section
      id="ensaio"
      ref={ref}
      className="relative h-[160svh] overflow-hidden md:h-[175svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <img
          src={site.images.closing}
          alt={site.images.closingAlt}
          sizes="100vw"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{
            objectPosition: "50% 22%",
            transform: `scale(${scale})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/40" />

        <div className="absolute inset-x-5 bottom-10 md:inset-x-14 md:bottom-16">
          <p className="font-mono text-[10px] tracking-[0.36em] text-white/55 uppercase">
            09 / Convite
          </p>
          <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2.6rem,8vw,7.4rem)] leading-[0.84] tracking-[-0.05em] text-white">
            Agora imagine essa página com você.
          </h2>
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.32em] text-white uppercase"
          >
            {site.cta.session}
            <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
