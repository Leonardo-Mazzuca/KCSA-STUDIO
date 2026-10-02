import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" className="px-5 pt-24 md:px-10 md:pt-40 lg:px-14">
      <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
        05 / Serviços
      </p>
      <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,8vw,7rem)] leading-[0.84] tracking-[-0.05em]">
        O que podemos criar juntos?
      </h2>

      <ul className="mt-14 md:mt-24">
        {services.map((service) => (
          <li
            key={service.id}
            className="group border-t border-foreground/10 last:border-b"
          >
            <article className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-12">
              <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase md:col-span-2">
                {service.index}
              </p>
              <h3 className="font-display text-3xl tracking-tight transition-all duration-500 group-hover:italic md:col-span-4 md:text-5xl lg:text-6xl">
                {service.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-foreground/62 md:col-span-6 md:text-base">
                {service.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
