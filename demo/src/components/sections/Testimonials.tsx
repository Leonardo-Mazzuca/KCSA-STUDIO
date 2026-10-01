import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="depoimentos" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mb-16 max-w-4xl md:mb-24">
        <SectionHeader
          index="06"
          label="Depoimentos"
          title="Eles viveram. Eu fotografei. Eles contam."
        />
        <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/70">
          Mais do que mostrar o que eu faço, prefiro deixar falar quem já
          esteve na frente da minha câmera.
        </p>
      </div>

      <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
        {testimonials.map((item, index) => (
          <li key={item.quote} className="py-10 md:py-14">
            <Reveal delay={index * 0.06}>
              <blockquote className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <p className="font-display text-2xl leading-snug tracking-tight text-pretty italic sm:text-3xl md:text-4xl lg:col-span-9">
                  “{item.quote}”
                </p>
                <footer className="font-mono text-[10px] tracking-[0.26em] text-muted uppercase lg:col-span-3 lg:text-right">
                  — {item.author}
                </footer>
              </blockquote>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
