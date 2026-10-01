import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title?: string;
  align?: "left" | "right";
  className?: string;
};

export function SectionHeader({
  index,
  label,
  title,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "right" && "items-end text-right",
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.32em] text-muted uppercase">
        {index} — {label}
      </p>
      {title ? (
        <h2 className="font-display max-w-5xl text-4xl leading-[0.95] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
