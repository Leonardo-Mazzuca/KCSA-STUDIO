import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { instagramImages } from "@/data/projects";
import { site } from "@/data/site";

const placements = [
  "left-[4%] top-[8%] w-[42%] -rotate-3 md:left-[8%] md:w-[22%]",
  "right-[6%] top-0 w-[38%] rotate-2 md:left-[32%] md:right-auto md:top-[18%] md:w-[20%]",
  "left-[18%] top-[38%] w-[46%] rotate-[-2deg] md:left-[54%] md:top-[4%] md:w-[24%] md:rotate-3",
  "right-[8%] bottom-[4%] w-[40%] rotate-3 md:left-[18%] md:top-[52%] md:w-[18%] md:rotate-[-4deg]",
  "hidden md:block md:right-[6%] md:bottom-[8%] md:w-[16%] md:rotate-2",
];

export function Instagram() {
  return (
    <section id="instagram" className="overflow-x-clip px-5 py-16 md:px-10 md:py-24 lg:px-14">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
            08 / Instagram
          </p>
          <h2 className="font-display mt-5 max-w-[12ch] text-[clamp(2.4rem,7vw,6.4rem)] leading-[0.84] tracking-[-0.05em]">
            O trabalho continua por lá.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="max-w-sm space-y-4 text-sm leading-relaxed text-foreground/68 md:text-base">
            <p>Algumas histórias não cabem em um único portfólio.</p>
            <p>
              No Instagram, compartilho novos trabalhos, bastidores, projetos,
              processos e momentos que acontecem entre uma fotografia e outra.
            </p>
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono mt-3 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
            >
              {site.contact.instagramHandle}
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12 h-[150vw] md:mt-20 md:h-[46vw]">
        {instagramImages.map((image, index) => (
          <a
            key={image.id}
            href={site.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="image"
            aria-label={`Ver ${image.title} no Instagram`}
            className={`group absolute overflow-hidden ${placements[index] ?? "hidden"}`}
          >
            <img
              src={image.image}
              alt={image.alt}
              sizes="(min-width: 768px) 22vw, 46vw"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
