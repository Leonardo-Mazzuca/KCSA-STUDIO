import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches && !reduceMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-cursor");

    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      animate={{
        x: position.x - (hovering ? 28 : 9),
        y: position.y - (hovering ? 28 : 9),
      }}
      transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.4 }}
    >
      <div
        className="rounded-full border border-white transition-[width,height] duration-300"
        style={{
          width: hovering ? 56 : 18,
          height: hovering ? 56 : 18,
        }}
      />
    </motion.div>
  );
}
