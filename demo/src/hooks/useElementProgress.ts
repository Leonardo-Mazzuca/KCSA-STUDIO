import { useEffect, useState, type RefObject } from "react";

export function useElementProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const extra = node.offsetHeight - window.innerHeight;
      if (extra <= 0) {
        const rect = node.getBoundingClientRect();
        const next = rect.bottom <= window.innerHeight * 0.55 ? 1 : 0;
        setProgress((current) => (Math.abs(current - next) < 0.002 ? current : next));
        return;
      }
      const next = Math.min(
        1,
        Math.max(0, -node.getBoundingClientRect().top / extra),
      );
      setProgress((current) => (Math.abs(current - next) < 0.002 ? current : next));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}
