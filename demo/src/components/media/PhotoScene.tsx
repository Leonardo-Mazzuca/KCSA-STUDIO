import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useElementProgress } from "@/hooks/useElementProgress";

export function PhotoScene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative [perspective:1400px] [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StickyBleed({
  children,
  className,
  heightClassName = "h-[140svh] md:h-[150svh]",
}: {
  children: (progress: number) => ReactNode;
  className?: string;
  heightClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(ref);

  return (
    <div ref={ref} className={cn("relative", heightClassName, className)}>
      <div className="sticky top-0 h-svh overflow-hidden">{children(progress)}</div>
    </div>
  );
}
