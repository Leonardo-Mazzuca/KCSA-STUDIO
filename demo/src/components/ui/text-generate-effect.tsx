import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.45,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  return (
    <p className={cn("font-display font-medium", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline"
          initial={
            reduceMotion
              ? { opacity: 1, filter: "none" }
              : { opacity: 0, filter: filter ? "blur(8px)" : "none" }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: reduceMotion ? 0 : duration,
            delay: reduceMotion ? 0 : idx * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </p>
  );
};
