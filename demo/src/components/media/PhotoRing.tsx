import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type PhotoRingProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
  paused?: boolean;
};

function wrap(value: number, count: number) {
  return ((value % count) + count) % count;
}

function shortestOffset(index: number, position: number, count: number) {
  let delta = index - wrap(position, count);
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

export function PhotoRing({ projects, onSelect, paused = false }: PhotoRingProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startTargetRef = useRef(0);
  const movedRef = useRef(false);
  const pausedRef = useRef(paused);
  const reducedRef = useRef(false);
  const count = projects.length;

  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  pausedRef.current = paused;

  useEffect(() => {
    const next = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(next);
    reducedRef.current = next;
  }, []);

  useEffect(() => {
    if (reduced || count < 2) return;
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    let last = performance.now();
    let auto = 0;

    const cardWidth = () => {
      const width = stage.clientWidth || window.innerWidth;
      return width < 768 ? Math.min(width * 0.78, 336) : Math.min(width * 0.4, 544);
    };

    const apply = () => {
      const mobile = (stage.clientWidth || window.innerWidth) < 768;
      const spacing = cardWidth() * (mobile ? 0.68 : 0.64);
      const position = positionRef.current;

      cardsRef.current.forEach((cardNode, index) => {
        if (!cardNode) return;
        const offset = shortestOffset(index, position, count);
        const abs = Math.abs(offset);
        const hidden = abs > 2.15;
        const rotate = Math.max(-48, Math.min(48, offset * -28));
        const x = offset * spacing;
        const depth = -abs * 180;
        const scale = 1 - Math.min(abs, 2) * 0.045;
        const dim = 1 - Math.min(abs, 1.6) * 0.18;

        cardNode.style.visibility = hidden ? "hidden" : "visible";
        cardNode.style.opacity = hidden ? "0" : String(1 - Math.max(0, abs - 1.35) * 0.85);
        cardNode.style.pointerEvents = hidden || abs > 1.15 ? "none" : "auto";
        cardNode.style.zIndex = String(Math.round(30 - abs * 8));
        cardNode.style.transform = `translate3d(${x}px, 0, ${depth}px) rotateY(${rotate}deg) scale(${scale})`;
        cardNode.style.filter = `brightness(${dim})`;
      });

      const nextActive = wrap(Math.round(position), count);
      setActive((current) => (current === nextActive ? current : nextActive));
    };

    const tick = (now: number) => {
      raf = window.requestAnimationFrame(tick);
      const elapsed = (now - last) / 1000;
      last = now;

      const rect = stage.getBoundingClientRect();
      const onscreen = rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.18;
      const canAuto =
        onscreen &&
        !pausedRef.current &&
        !draggingRef.current &&
        !reducedRef.current;

      if (canAuto) {
        auto += elapsed;
        if (auto >= 2.6) {
          targetRef.current += 1;
          auto = 0;
        }
      } else {
        auto = 0;
      }

      const ease = draggingRef.current ? 0.32 : 0.12;
      positionRef.current += (targetRef.current - positionRef.current) * ease;

      if (positionRef.current > count * 20) {
        positionRef.current -= count * 10;
        targetRef.current -= count * 10;
      }

      apply();
    };

    apply();
    raf = window.requestAnimationFrame(tick);

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      draggingRef.current = true;
      movedRef.current = false;
      startXRef.current = event.clientX;
      startTargetRef.current = targetRef.current;
      stage.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = event.clientX - startXRef.current;
      if (Math.abs(dx) > 8) movedRef.current = true;
      targetRef.current = startTargetRef.current - dx / (cardWidth() * 0.7);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      targetRef.current = Math.round(targetRef.current);
      try {
        stage.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [count, reduced]);

  const goTo = (index: number) => {
    const current = wrap(positionRef.current, count);
    let delta = index - current;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    targetRef.current = positionRef.current + delta;
  };

  const current = projects[active];

  if (reduced) {
    return (
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-10 lg:px-14">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className="w-[78vw] shrink-0 text-left sm:w-[42vw] md:w-[28vw]"
          >
            <img
              src={project.image}
              alt={project.alt}
              sizes="(min-width: 768px) 28vw, 78vw"
              loading="lazy"
              decoding="async"
              className="aspect-4/5 w-full object-cover"
            />
            <span className="mt-3 flex items-end justify-between gap-3">
              <span className="font-display text-2xl tracking-tight">{project.title}</span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                {project.year}
              </span>
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        ref={stageRef}
        className="photo-flow-stage relative h-[54svh] touch-pan-y select-none md:h-[86svh]"
      >
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            ref={(node) => {
              cardsRef.current[index] = node;
            }}
            data-cursor="image"
            aria-label={`${project.title}, ${project.year}`}
            className="photo-flow-card"
            onClick={() => {
              if (movedRef.current) return;
              const offset = Math.abs(shortestOffset(index, positionRef.current, count));
              if (offset < 0.45) onSelect(project);
              else goTo(index);
            }}
          >
            <img
              src={project.image}
              alt=""
              sizes="(min-width: 768px) 40vw, 78vw"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {current ? (
        <div className="mt-6 flex items-end justify-between gap-6 px-5 md:mt-8 md:px-10 lg:px-14">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
              {current.category} · {current.year}
            </p>
            <p className="font-display mt-1 text-3xl tracking-tight md:text-5xl">
              {current.title}
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-muted">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
