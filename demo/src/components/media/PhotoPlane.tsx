import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DepthPhoto } from "@/components/media/DepthPhoto";

type PhotoPlaneProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  tilt?: boolean;
  intensity?: number;
  caption?: string;
  meta?: string;
  overlay?: boolean;
  onOpen?: () => void;
};

export function PhotoPlane({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority = false,
  tilt = false,
  intensity = 0.7,
  caption,
  meta,
  overlay = false,
  onOpen,
}: PhotoPlaneProps) {
  const image = (
    <div className="relative overflow-hidden bg-line">
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]",
          imgClassName,
        )}
      />
      {overlay && caption ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      ) : null}
    </div>
  );

  const credit = caption ? (
    <figcaption
      className={cn(
        "flex items-end justify-between gap-4",
        overlay
          ? "absolute inset-x-4 bottom-4 z-10 text-white md:inset-x-6 md:bottom-6"
          : "mt-3",
      )}
    >
      <span className="font-display text-base tracking-tight md:text-xl">
        {caption}
      </span>
      {meta ? (
        <span className="font-mono text-[10px] tracking-[0.22em] text-current/60 uppercase">
          {meta}
        </span>
      ) : null}
    </figcaption>
  ) : null;

  const body = (
    <>
      {tilt ? <DepthPhoto intensity={intensity}>{image}</DepthPhoto> : image}
      {credit}
    </>
  );

  if (onOpen) {
    return (
      <figure className={cn("group relative", className)}>
        <button
          type="button"
          onClick={onOpen}
          data-cursor="image"
          className="relative block w-full overflow-hidden text-left"
        >
          {body}
        </button>
      </figure>
    );
  }

  return <figure className={cn("group relative", className)}>{body}</figure>;
}

export function PhotoCredit({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] tracking-[0.28em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
