import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [first, ...rest] = testimonials;

  return (
    <section id="depoimentos" className="relative mt-20 overflow-hidden md:mt-32">
      <img
        src={site.images.testimonials}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        style={{ objectPosition: "50% 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="relative z-10 px-5 py-20 md:px-10 md:py-32 lg:px-14">
        <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
          06 / Depoimentos
        </p>
        <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(2rem,5.5vw,4.6rem)] leading-[0.92] tracking-[-0.04em]">
          Eles viveram. Eu fotografei. Eles contam.
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/65 md:text-base">
          Mais do que mostrar o que eu faço, prefiro deixar falar quem já
          esteve na frente da minha câmera.
        </p>

        {first ? (
          <Reveal>
            <blockquote className="mt-16 max-w-5xl md:mt-24">
              <p className="font-display text-[clamp(1.7rem,4.4vw,4.2rem)] leading-[1.05] tracking-tight italic">
                “{first.quote}”
              </p>
            </blockquote>
          </Reveal>
        ) : null}

        {rest.length ? (
          <ul className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
            {rest.map((item) => (
              <li key={item.quote}>
                <blockquote>
                  <p className="font-display text-2xl leading-snug tracking-tight italic md:text-3xl">
                    “{item.quote}”
                  </p>
                </blockquote>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
