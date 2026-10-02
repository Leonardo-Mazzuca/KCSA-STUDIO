import { included } from "@/data/included";

export function Included() {
  return (
    <section id="incluso" className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
            07 / Incluso
          </p>
          <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(1.8rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.03em]">
            Você cuida do momento. Eu cuido de todo o resto.
          </h2>
        </div>
      </div>

      <ol className="mt-12 columns-1 gap-x-16 sm:columns-2">
        {included.map((item, index) => (
          <li
            key={item}
            className="flex break-inside-avoid items-baseline gap-4 border-t border-foreground/10 py-4"
          >
            <span className="font-mono text-[10px] tracking-[0.24em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl tracking-tight md:text-2xl">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
