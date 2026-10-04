import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type CompareProps = {
  firstImage?: string;
  secondImage?: string;
  firstImageAlt?: string;
  secondImageAlt?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  onInteract?: () => void;
};

export function Compare({
  firstImage = "",
  secondImage = "",
  firstImageAlt = "",
  secondImageAlt = "",
  className,
  firstImageClassName,
  secondImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "drag",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  onInteract,
}: CompareProps) {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const dragging = useRef(false);
  const frame = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const backClass = secondImageClassName ?? secondImageClassname;

  const setFromClientX = useCallback((clientX: number) => {
    const node = sliderRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      setSliderXPercent(Math.max(0, Math.min(100, percent)));
    });
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const started = performance.now();

    const tick = (now: number) => {
      if (dragging.current) return;
      const cycle = autoplayDuration * 2;
      const progress = ((now - started) % cycle) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      setSliderXPercent(percentage);
      frame.current = window.requestAnimationFrame(tick);
    };

    frame.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame.current);
  }, [autoplay, autoplayDuration]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (slideMode === "hover" || dragging.current) {
        setFromClientX(event.clientX);
      }
    };

    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX, slideMode]);

  return (
    <div
      ref={sliderRef}
      role="slider"
      aria-label="Comparar antes e depois"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderXPercent)}
      tabIndex={0}
      data-cursor="image"
      className={cn("relative overflow-hidden select-none", className)}
      style={{ cursor: slideMode === "drag" ? "grab" : "col-resize" }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onInteract?.();
          setSliderXPercent((value) => Math.max(0, value - 4));
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onInteract?.();
          setSliderXPercent((value) => Math.min(100, value + 4));
        }
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragging.current = true;
        onInteract?.();
        setFromClientX(event.clientX);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerEnter={(event) => {
        if (slideMode === "hover") setFromClientX(event.clientX);
      }}
      onPointerLeave={() => {
        if (slideMode === "hover") setSliderXPercent(initialSliderPercentage);
      }}
    >
      {secondImage ? (
        <img
          src={secondImage}
          alt={secondImageAlt}
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            backClass,
          )}
        />
      ) : null}

      {firstImage ? (
        <motion.div
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}
          transition={{ duration: 0 }}
        >
          <img
            src={firstImage}
            alt={firstImageAlt}
            draggable={false}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              firstImageClassName,
            )}
          />
        </motion.div>
      ) : null}

      <motion.div
        className="absolute top-0 z-30 h-full w-px bg-gradient-to-b from-transparent via-paper to-transparent"
        style={{ left: `${sliderXPercent}%` }}
        transition={{ duration: 0 }}
      >
        {showHandlebar ? (
          <div className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <span className="sr-only">Arraste para comparar</span>
            <span aria-hidden="true" className="flex gap-0.5">
              <span className="h-3.5 w-px bg-ink/70" />
              <span className="h-3.5 w-px bg-ink/70" />
            </span>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
