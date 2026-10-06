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
        className="absolute top-[12%] left-[-18%] h-[58%] w-[58%] object-cover opacity-[0.22] md:left-[-8%] md:w-[38%] md:opacity-[0.28]"
        style={{ objectPosition: "50% 22%" }}
      />
      <img
        src={site.images.space[1]}
        alt=""
        className="absolute right-[-16%] bottom-[8%] hidden h-[46%] w-[42%] object-cover opacity-[0.18] md:block"
        style={{ objectPosition: "50% 18%" }}
      />
      <img
        src={site.images.space[2]}
        alt=""
        className="absolute top-[6%] right-[-10%] h-[34%] w-[40%] object-cover opacity-[0.16] md:right-[4%] md:w-[22%]"
        style={{ objectPosition: "50% 40%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.35)_55%,#050505_88%)]" />
    </div>
  );
}

function LogoMark({
  reduced,
  isMobile,
  scrollProgress,
}: {
  reduced: boolean;
  isMobile: boolean;
  scrollProgress: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const scale = 1 - scrollProgress * 0.16;
  const lift = scrollProgress * 24;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      video.play().catch(() => undefined);
    };

    const show = () => setVisible(true);
    if (video.readyState >= 2) show();
    video.addEventListener("playing", show);
    video.addEventListener("loadeddata", show);
    play();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.08 },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("playing", show);
      video.removeEventListener("loadeddata", show);
      video.pause();
    };
  }, [isMobile, reduced]);

  const mediaStyle = {
    opacity: visible ? 1 - scrollProgress * 0.45 : 0,
  } as const;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] grid place-items-center pb-28 md:pb-36"
      style={{
        transform: `translate3d(0, ${-lift}px, 0) scale(${scale})`,
      }}
    >
      <div className="logo-plate">
        {reduced ? (
          <img
            src={site.video.poster}
            alt={site.video.alt}
            width={720}
            height={720}
            className="logo-key"
            style={mediaStyle}
            onLoad={() => setVisible(true)}
          />
        ) : (
          <video
            ref={videoRef}
            className="logo-key"
            style={mediaStyle}
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

      {profile ? (
        <LogoMark
          reduced={profile.reducedMotion}
          isMobile={profile.isMobile}
          scrollProgress={scrollProgress}
        />
      ) : null}
    </div>
  );
}
