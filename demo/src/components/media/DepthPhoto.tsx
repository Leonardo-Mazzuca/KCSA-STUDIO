import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DepthPhotoProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function DepthPhoto({
  children,
  className,
  intensity = 1,
}: DepthPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced) return;
    if (coarse || window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    let visible = true;
    const max = 3.4 * intensity;

    const tick = () => {
      if (!visible) return;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      node.style.transform = `perspective(1200px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
      raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !visible) return;
      raf = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!raf) return;
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetY = x * max;
      targetX = -y * max;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    start();

    return () => {
      observer.disconnect();
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      stop();
      node.style.transform = "";
    };
  }, [intensity]);

  return (
    <div className={cn("[transform-style:preserve-3d]", className)}>
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
