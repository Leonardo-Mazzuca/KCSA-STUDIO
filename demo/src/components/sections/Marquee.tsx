const items = [
  "Fotografia",
  "Direção criativa",
  "São Paulo",
  "Presença",
  "Imagem",
  "Brasil",
];

export function Marquee() {
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-foreground/15 bg-paper py-3 text-ink md:py-4"
    >
      <div className="animate-marquee flex w-max items-baseline gap-6 md:gap-10">
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-baseline gap-6 md:gap-10">
            <span
              className={`font-display text-3xl leading-none tracking-tight md:text-5xl ${
                index % 2 === 0 ? "italic" : "font-medium"
              }`}
            >
              {item}
            </span>
            <span className="font-mono text-[10px] tracking-[0.4em] text-ink/40 uppercase">
              ✴
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
