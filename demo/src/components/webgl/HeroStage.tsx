import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import {
  getExperienceProfile,
  type ExperienceProfile,
} from "@/lib/webgl/capabilities";
import type { HeroSceneHandle } from "@/lib/webgl/heroScene";

type HeroStageProps = {
  scrollProgress: number;
};

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={site.images.space[0]}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute top-[12%] left-[-18%] h-[58%] w-[58%] object-cover opacity-[0.22] md:left-[-8%] md:w-[38%] md:opacity-[0.28]"
        style={{ objectPosition: "50% 22%" }}
      />
      <img
        src={site.images.space[1]}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute right-[-16%] bottom-[8%] hidden h-[46%] w-[42%] object-cover opacity-[0.18] md:block"
        style={{ objectPosition: "50% 18%" }}
      />
      <img
        src={site.images.space[2]}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute top-[6%] right-[-10%] h-[34%] w-[40%] object-cover opacity-[0.16] md:right-[4%] md:w-[22%]"
        style={{ objectPosition: "50% 40%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.35)_55%,#050505_88%)]" />
    </div>
  );
}

function paintLogoFrame(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  canvas: HTMLCanvasElement,
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !sourceWidth || !sourceHeight || !canvas.clientWidth) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const dw = sourceWidth * scale;
  const dh = sourceHeight * scale;
  const dx = (width - dw) * 0.5;
  const dy = (height - dh) * 0.46;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(source, dx, dy, dw, dh);

  const frame = ctx.getImageData(0, 0, width, height);
  const data = frame.data;
  for (let i = 0; i < data.length; i += 4) {
    const luma = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
    const alpha = luma <= 10 ? 0 : luma >= 42 ? 1 : (luma - 10) / 32;
    data[i + 3] = alpha * 255;
  }
  ctx.putImageData(frame, 0, 0);
}

function LogoMark({
  reduced,
  scrollProgress,
}: {
  reduced: boolean;
  scrollProgress: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoOnRef = useRef(false);
  const [markReady, setMarkReady] = useState(false);
  const fade = 1 - scrollProgress * 0.45;
  const lift = scrollProgress * 24;
  const scale = 1 - scrollProgress * 0.16;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = new Image();
    image.src = site.logo;
    let cancelled = false;

    const draw = () => {
      if (cancelled || videoOnRef.current || !image.naturalWidth) return;
      paintLogoFrame(image, image.naturalWidth, image.naturalHeight, canvas);
      setMarkReady(true);
    };

    if (image.complete) draw();
    else image.addEventListener("load", draw);

    return () => {
      cancelled = true;
      image.removeEventListener("load", draw);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || reduced) return;

    const play = () => {
      video.muted = true;
      video.play().catch(() => undefined);
    };

    const show = () => {
      if (video.readyState < 2 || !video.videoWidth) return;
      videoOnRef.current = true;
      paintLogoFrame(video, video.videoWidth, video.videoHeight, canvas);
      setMarkReady(true);
    };

    if (video.readyState >= 2) show();
    video.addEventListener("playing", show);
    video.addEventListener("loadeddata", show);

    let canPlay = false;
    const start = window.setTimeout(() => {
      canPlay = true;
      play();
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!canPlay) return;
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.08 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (!canPlay) return;
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let raf = 0;
    let lastTime = -1;
    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      if (video.paused || video.readyState < 2) return;
      if (video.currentTime === lastTime) return;
      lastTime = video.currentTime;
      videoOnRef.current = true;
      paintLogoFrame(video, video.videoWidth, video.videoHeight, canvas);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(start);
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("playing", show);
      video.removeEventListener("loadeddata", show);
      video.pause();
    };
  }, [reduced]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] grid place-items-center pb-28 md:pb-36"
      style={
        scrollProgress
          ? { transform: `translate3d(0, ${-lift}px, 0) scale(${scale})` }
          : undefined
      }
    >
      <div className="logo-plate">
        <img
          src={site.logo}
          alt={site.video.alt}
          width={1254}
          height={1254}
          decoding="async"
          fetchPriority="high"
          className="sr-only"
        />
        <canvas
          ref={canvasRef}
          className="logo-key"
          style={{ opacity: markReady ? fade : 0 }}
          aria-hidden="true"
        />
        {reduced ? null : (
          <video
            ref={videoRef}
            className="logo-source"
            src={site.video.src}
            muted
            loop
            playsInline
            preload="none"
            aria-label={site.video.alt}
          />
        )}
      </div>
    </div>
  );
}

export function HeroStage({ scrollProgress }: HeroStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HeroSceneHandle | null>(null);
  const [profile, setProfile] = useState<ExperienceProfile | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(getExperienceProfile());
  }, []);

  const showWebGL = Boolean(profile?.useWebGL && !failed && !profile.isMobile);

  useEffect(() => {
    if (!showWebGL || !profile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let scene: HeroSceneHandle | null = null;
    let observer: IntersectionObserver | null = null;

    const start = async () => {
      try {
        const { createHeroScene } = await import("@/lib/webgl/heroScene");
        if (disposed || !canvasRef.current) return;

        scene = createHeroScene(canvasRef.current, {
          pixelRatio: profile.pixelRatio,
          mobile: false,
          photos: [...site.images.space],
        });
        if (disposed) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        scene.resize();
        window.requestAnimationFrame(() => {
          scene?.resize();
          window.requestAnimationFrame(() => {
            if (!disposed) setReady(true);
          });
        });

        observer = new IntersectionObserver(
          ([entry]) => {
            scene?.setVisible(entry.isIntersecting);
          },
          { threshold: 0.08 },
        );
        observer.observe(canvasRef.current);

        const onVisibility = () => {
          scene?.setVisible(!document.hidden);
        };
        document.addEventListener("visibilitychange", onVisibility);

        const onResize = () => scene?.resize();
        window.addEventListener("resize", onResize, { passive: true });
        const resizeObserver = new ResizeObserver(() => scene?.resize());
        resizeObserver.observe(canvasRef.current);

        cleanupExtras = () => {
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("resize", onResize);
          resizeObserver.disconnect();
        };
      } catch {
        setFailed(true);
      }
    };

    let cleanupExtras = () => undefined;
    void start();

    return () => {
      disposed = true;
      cleanupExtras();
      observer?.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [failed, profile, showWebGL]);

  useEffect(() => {
    sceneRef.current?.setScroll(scrollProgress);
  }, [scrollProgress]);

  useEffect(() => {
    if (!showWebGL || profile?.isCoarse) return;

    const onMove = (event: PointerEvent) => {
      const host = sectionRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      sceneRef.current?.setPointer(
        Math.max(-1, Math.min(1, x)),
        Math.max(-1, Math.min(1, y)),
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [profile?.isCoarse, showWebGL]);

  const showAtmosphere = !showWebGL || !ready;

  return (
    <div ref={sectionRef} className="absolute inset-0">
      {showAtmosphere ? <Atmosphere /> : null}

      {showWebGL ? (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />
      ) : null}

      <LogoMark
        reduced={Boolean(profile?.reducedMotion)}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
