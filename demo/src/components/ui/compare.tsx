import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [live, setLive] = useState(Boolean(autoplay));
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
    if (!live) return;
    const started = performance.now();

    const tick = (now: number) => {
      if (dragging.current) return;
      const cycle = autoplayDuration * 2;
      const progress = ((now - started) % cycle) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      setSliderXPercent(8 + percentage * 0.84);
      frame.current = window.requestAnimationFrame(tick);
    };

    frame.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame.current);
  }, [autoplayDuration, live]);

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
          setLive(false);
          onInteract?.();
          setSliderXPercent((value) => Math.max(0, value - 4));
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setLive(false);
          onInteract?.();
          setSliderXPercent((value) => Math.min(100, value + 4));
        }
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragging.current = true;
        setLive(false);
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
        className="absolute top-0 z-30 h-full w-0.5 bg-paper shadow-[0_0_18px_rgba(255,255,255,0.45)]"
        style={{ left: `${sliderXPercent}%` }}
        transition={{ duration: 0 }}
      >
        {showHandlebar ? (
          <div
            className={`absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_10px_28px_rgba(0,0,0,0.45)] ${live ? "animate-pulse" : ""}`}
          >
            <span className="sr-only">Arraste para comparar</span>
            <span aria-hidden="true" className="flex items-center gap-0.5">
              <ChevronLeft className="size-5" strokeWidth={2.4} />
              <ChevronRight className="size-5 -ml-1.5" strokeWidth={2.4} />
            </span>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
