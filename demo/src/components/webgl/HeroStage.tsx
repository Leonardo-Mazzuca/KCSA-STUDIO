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

const logoClass =
  "logo-key h-auto w-[min(56vw,16rem)] md:w-[min(68vw,26rem)]";

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={site.images.hero}
        alt=""
        className="absolute top-[12%] left-[-18%] h-[58%] w-[58%] object-cover opacity-[0.22] md:left-[-8%] md:w-[38%] md:opacity-[0.28]"
        style={{ objectPosition: "50% 28%" }}
      />
      <img
        src={site.images.differentiator}
        alt=""
        className="absolute right-[-16%] bottom-[8%] hidden h-[46%] w-[42%] object-cover opacity-[0.18] md:block"
        style={{ objectPosition: "50% 30%" }}
      />
      <img
        src="/images/noiva.jpg"
        alt=""
        className="absolute top-[6%] right-[-10%] h-[34%] w-[40%] object-cover opacity-[0.16] md:right-[4%] md:w-[22%]"
        style={{ objectPosition: "50% 18%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.35)_55%,#050505_88%)]" />
    </div>
  );
}

function LogoFallback({
  reduced,
  isMobile,
  scrollProgress,
}: {
  reduced: boolean;
  isMobile: boolean;
  scrollProgress: number;
}) {
  const [visible, setVisible] = useState(false);
  const scale = 1 - scrollProgress * 0.16;
  const lift = scrollProgress * 24;

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        transform: `translate3d(0, ${-lift}px, 0) scale(${scale})`,
        opacity: visible ? 1 - scrollProgress * 0.45 : 0,
      }}
    >
      {reduced ? (
        <img
          src={site.video.poster}
          alt={site.video.alt}
          width={720}
          height={720}
          className={logoClass}
          onLoad={() => setVisible(true)}
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
          onLoadedData={() => setVisible(true)}
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

        scene = createHeroScene(canvasRef.current, video, {
          pixelRatio: profile.pixelRatio,
          mobile: profile.isMobile,
          photos: profile.isMobile ? [] : [...site.images.space],
        });
        if (disposed) {
          scene.dispose();
          return;
        }
        sceneRef.current = scene;
        scene.resize();

        let revealed = false;
        const reveal = () => {
          if (disposed || revealed) return;
          revealed = true;
          scene?.resize();
          window.requestAnimationFrame(() => {
            scene?.resize();
            window.requestAnimationFrame(() => {
              if (!disposed) setReady(true);
            });
          });
        };

        if (typeof video.requestVideoFrameCallback === "function") {
          video.requestVideoFrameCallback(() => reveal());
        } else {
          video.addEventListener("playing", reveal, { once: true });
          video.addEventListener("loadeddata", reveal, { once: true });
        }

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
    if (!profile?.useWebGL || profile.isMobile || profile.isCoarse || failed) return;

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
  const showAtmosphere = !showWebGL || !ready || Boolean(profile?.isMobile);

  return (
    <div ref={sectionRef} className="absolute inset-0">
      {showAtmosphere ? <Atmosphere /> : null}

      {showWebGL ? (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
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
