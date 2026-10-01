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

const logoClass = "logo-key h-auto w-[min(56vw,16rem)] md:w-[min(72vw,28rem)]";

function LogoFallback({
  reduced,
  isMobile,
  scrollProgress,
}: {
  reduced: boolean;
  isMobile: boolean;
  scrollProgress: number;
}) {
  const scale = 1 - scrollProgress * 0.18;
  const lift = scrollProgress * 28;

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        transform: `translate3d(0, ${-lift}px, 0) scale(${scale})`,
        opacity: 1 - scrollProgress * 0.45,
      }}
    >
      {reduced ? (
        <img
          src={site.video.poster}
          alt={site.video.alt}
          width={720}
          height={720}
          className={logoClass}
        />
      ) : (
        <video
          className={logoClass}
          src={isMobile ? site.video.mobile : site.video.src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-label={site.video.alt}
        />
      )}
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

  useEffect(() => {
    if (!profile?.useWebGL || failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let scene: HeroSceneHandle | null = null;
    let video: HTMLVideoElement | null = null;
    let observer: IntersectionObserver | null = null;

    const start = async () => {
      try {
        const { createHeroScene } = await import("@/lib/webgl/heroScene");
        if (disposed || !canvasRef.current) return;

        video = document.createElement("video");
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "auto";
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        video.src = profile.isMobile ? site.video.mobile : site.video.src;

        const play = () => {
          video?.play().catch(() => undefined);
        };

        const reveal = () => {
          if (disposed) return;
          play();
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              if (!disposed) setReady(true);
            });
          });
        };

        if (video.readyState >= 2) reveal();
        else video.addEventListener("loadeddata", reveal, { once: true });

        scene = createHeroScene(canvasRef.current, video, {
          pixelRatio: profile.pixelRatio,
          mobile: profile.isMobile,
        });
        if (disposed) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        play();

        observer = new IntersectionObserver(
          ([entry]) => {
            scene?.setVisible(entry.isIntersecting);
            if (entry.isIntersecting) play();
            else video?.pause();
          },
          { threshold: 0.08 },
        );
        observer.observe(canvasRef.current);

        const onVisibility = () => {
          if (document.hidden) {
            scene?.setVisible(false);
            video?.pause();
          } else if (!disposed) {
            scene?.setVisible(true);
            play();
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        const onResize = () => scene?.resize();
        window.addEventListener("resize", onResize, { passive: true });

        cleanupExtras = () => {
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("resize", onResize);
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
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }
    };
  }, [failed, profile]);

  useEffect(() => {
    sceneRef.current?.setScroll(scrollProgress);
  }, [scrollProgress]);

  useEffect(() => {
    if (!profile?.useWebGL || profile.isMobile || failed) return;

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
  }, [failed, profile]);

  const showWebGL = Boolean(profile?.useWebGL && !failed);

  const showPoster = !ready && (showWebGL || !profile);

  return (
    <div ref={sectionRef} className="absolute inset-0">
      {showPoster ? (
        <img
          src={site.video.poster}
          alt=""
          width={720}
          height={720}
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 left-1/2 ${logoClass} -translate-x-1/2 -translate-y-1/2`}
        />
      ) : null}

      {showWebGL ? (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />
      ) : profile ? (
        <LogoFallback
          reduced={profile.reducedMotion}
          isMobile={profile.isMobile}
          scrollProgress={scrollProgress}
        />
      ) : null}
    </div>
  );
}
