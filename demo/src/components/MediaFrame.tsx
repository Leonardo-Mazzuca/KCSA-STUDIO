import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function MediaFrame({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes,
}: MediaFrameProps) {
  return (
    <div className={cn("relative overflow-hidden bg-line", className)}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.035]",
          imgClassName,
        )}
      />
    </div>
  );
}
