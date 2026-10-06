export type ExperienceProfile = {
  webgl: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  isCoarse: boolean;
  lowEnd: boolean;
  useWebGL: boolean;
  pixelRatio: number;
};

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const options = { failIfMajorPerformanceCaveat: true, alpha: true };
    const gl =
      canvas.getContext("webgl2", options) ??
      canvas.getContext("webgl", options) ??
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function getExperienceProfile(): ExperienceProfile {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = Boolean(connection?.saveData);
  const slowNet = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const webgl = detectWebGL();
  const lowEnd = saveData || slowNet || cores <= 3 || memory <= 2;
  const useWebGL = webgl && !reducedMotion && !lowEnd;

  return {
    webgl,
    reducedMotion,
    isMobile,
    isCoarse,
    lowEnd,
    useWebGL,
    pixelRatio: isMobile || lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.5),
  };
}
