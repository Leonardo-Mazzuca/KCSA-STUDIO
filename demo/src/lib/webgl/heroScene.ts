import {
  AdditiveBlending,
  CanvasTexture,
  LinearFilter,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  PerspectiveCamera,
  Vector2,
  VideoTexture,
  WebGLRenderer,
} from "three";

export type HeroSceneHandle = {
  setPointer: (x: number, y: number) => void;
  setScroll: (progress: number) => void;
  setVisible: (visible: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

type SceneOptions = {
  pixelRatio: number;
  mobile: boolean;
};

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uLight;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uMap, vUv);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float alpha = smoothstep(0.035, 0.16, luma) * uOpacity;

    vec2 offset = vUv - 0.5 - uLight * 0.12;
    float sheen = pow(max(0.0, 1.0 - length(offset) * 1.75), 7.0) * 0.1;

    gl_FragColor = vec4(color.rgb + sheen, alpha);
  }
`;

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);
  const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  gradient.addColorStop(0, "rgba(255,255,255,0.28)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createHeroScene(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  options: SceneOptions,
): HeroSceneHandle {
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 20);
  camera.position.z = options.mobile ? 3.9 : 3.15;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !options.mobile,
    powerPreference: options.mobile ? "low-power" : "default",
    stencil: false,
    depth: false,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(options.pixelRatio);
  renderer.outputColorSpace = SRGBColorSpace;

  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;
  videoTexture.minFilter = LinearFilter;
  videoTexture.magFilter = LinearFilter;
  videoTexture.generateMipmaps = false;

  const geometry = new PlaneGeometry(1, 1, 1, 1);
  const material = new ShaderMaterial({
    uniforms: {
      uMap: { value: videoTexture },
      uLight: { value: new Vector2(0, 0) },
      uOpacity: { value: 1 },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
  });

  const plate = new Mesh(geometry, material);
  const plateSize = options.mobile ? 1.08 : 1.56;
  plate.scale.set(plateSize, plateSize, 1);
  plate.position.y = options.mobile ? 0.38 : 0.22;
  scene.add(plate);

  const glowTexture = createGlowTexture();
  const glowMaterial = new ShaderMaterial({
    uniforms: {
      uMap: { value: glowTexture },
      uOpacity: { value: 0.7 },
    },
    vertexShader: vertex,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(uMap, vUv);
        gl_FragColor = vec4(color.rgb, color.a * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const glow = new Mesh(geometry, glowMaterial);
  glow.position.z = -0.12;
  glow.position.y = plate.position.y;
  glow.scale.set(plateSize * 1.55, plateSize * 1.55, 1);
  scene.add(glow);

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let scroll = 0;
  let visible = true;
  let raf = 0;
  let autoTime = 0;
  let last = performance.now();

  const setSize = () => {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  setSize();

  const tick = (now: number) => {
    if (!visible) return;
    raf = window.requestAnimationFrame(tick);
    const delta = Math.min(0.05, (now - last) / 1000);
    last = now;
    autoTime += delta;

    if (video.readyState >= 2) {
      videoTexture.needsUpdate = true;
    }

    const autoX = Math.sin(autoTime * 0.32) * 0.045;
    const autoY = Math.cos(autoTime * 0.24) * 0.025;
    const nextX = targetX + autoX;
    const nextY = targetY + autoY;

    plate.rotation.y += (nextY - plate.rotation.y) * 0.05;
    plate.rotation.x += (nextX - plate.rotation.x) * 0.05;
    glow.rotation.copy(plate.rotation);

    const retreat = scroll;
    plate.position.z = -retreat * 1.35;
    plate.position.y = (options.mobile ? 0.38 : 0.22) + retreat * 0.15;
    glow.position.z = -0.12 - retreat * 1.35;
    glow.position.y = plate.position.y;
    const scale = 1 - retreat * 0.26;
    plate.scale.set(plateSize * scale, plateSize * scale, 1);
    glow.scale.set(plateSize * 1.55 * scale, plateSize * 1.55 * scale, 1);
    material.uniforms.uOpacity.value = 1 - retreat * 0.5;
    glowMaterial.uniforms.uOpacity.value = 0.62 * (1 - retreat * 0.7);
    camera.position.z = (options.mobile ? 3.9 : 3.15) + retreat * 1.35;

    material.uniforms.uLight.value.set(pointerY, pointerX);

    renderer.render(scene, camera);
  };

  const start = () => {
    if (raf || !visible) return;
    last = performance.now();
    raf = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!raf) return;
    window.cancelAnimationFrame(raf);
    raf = 0;
  };

  start();

  return {
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
      targetY = x * 0.085;
      targetX = -y * 0.05;
    },
    setScroll(progress) {
      scroll = Math.min(1, Math.max(0, progress));
    },
    setVisible(next) {
      visible = next;
      if (next) start();
      else stop();
    },
    resize: setSize,
    dispose() {
      stop();
      geometry.dispose();
      material.dispose();
      glowMaterial.dispose();
      videoTexture.dispose();
      glowTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
