import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
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
  photos?: string[];
};

type PhotoLayer = {
  mesh: Mesh<PlaneGeometry, ShaderMaterial>;
  texture: Texture;
  baseX: number;
  baseY: number;
  baseZ: number;
  spreadX: number;
  spreadY: number;
  opacity: number;
};

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const photoFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uDark;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uMap, vUv);
    float vignette = smoothstep(0.78, 0.12, length(vUv - 0.5));
    vec3 rgb = color.rgb * uDark * vignette;
    gl_FragColor = vec4(rgb, uOpacity * vignette);
  }
`;

const photoLayouts = [
  { x: -1.92, y: 0.42, z: -1.85, sx: 1.05, sy: 1.4, ry: 0.22, dark: 0.3, opacity: 0.46, spreadX: -1.2, spreadY: 0.28 },
  { x: 1.95, y: 0.08, z: -2.25, sx: 1.38, sy: 1.0, ry: -0.18, dark: 0.26, opacity: 0.4, spreadX: 1.3, spreadY: -0.16 },
  { x: 0.2, y: -0.82, z: -3.05, sx: 1.85, sy: 1.15, ry: 0.05, dark: 0.18, opacity: 0.28, spreadX: 0.18, spreadY: -0.5 },
];

export function createHeroScene(
  canvas: HTMLCanvasElement,
  options: SceneOptions,
): HeroSceneHandle {
  let disposed = false;
  const scene = new Scene();
  const world = new Group();
  scene.add(world);

  const camera = new PerspectiveCamera(34, 1, 0.1, 24);
  camera.position.z = options.mobile ? 3.9 : 3.28;

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !options.mobile,
    powerPreference: options.mobile ? "low-power" : "default",
    stencil: false,
    depth: !options.mobile,
    premultipliedAlpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(options.pixelRatio);
  renderer.outputColorSpace = SRGBColorSpace;

  const geometry = new PlaneGeometry(1, 1, 1, 1);

  const photoLayers: PhotoLayer[] = [];
  const photoMaterials: ShaderMaterial[] = [];
  const loader = new TextureLoader();

  if (!options.mobile && options.photos?.length) {
    options.photos.forEach((url, index) => {
      const layout = photoLayouts[index];
      if (!layout) return;
      loader.load(url, (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = SRGBColorSpace;
        texture.minFilter = LinearFilter;
        texture.generateMipmaps = false;
        const photoMaterial = new ShaderMaterial({
          uniforms: {
            uMap: { value: texture },
            uDark: { value: layout.dark },
            uOpacity: { value: layout.opacity },
          },
          vertexShader: vertex,
          fragmentShader: photoFragment,
          transparent: true,
          depthWrite: true,
        });
        const mesh = new Mesh(geometry, photoMaterial);
        mesh.position.set(layout.x, layout.y, layout.z);
        mesh.scale.set(layout.sx, layout.sy, 1);
        mesh.rotation.y = layout.ry;
        mesh.renderOrder = 0;
        world.add(mesh);
        photoMaterials.push(photoMaterial);
        photoLayers.push({
          mesh,
          texture,
          baseX: layout.x,
          baseY: layout.y,
          baseZ: layout.z,
          spreadX: layout.spreadX,
          spreadY: layout.spreadY,
          opacity: layout.opacity,
        });
      });
    });
  }

  let dust: Points<BufferGeometry, PointsMaterial> | null = null;
  if (!options.mobile) {
    const count = 86;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 6.4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
      positions[i * 3 + 2] = -Math.random() * 4.2 - 0.2;
    }
    const dustGeometry = new BufferGeometry();
    dustGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const dustMaterial = new PointsMaterial({
      color: new Color("#d8d3c6"),
      size: 0.016,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      sizeAttenuation: true,
    });
    dust = new Points(dustGeometry, dustMaterial);
    dust.renderOrder = 3;
    world.add(dust);
  }

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

    const autoX = Math.sin(autoTime * 0.28) * 0.038;
    const autoY = Math.cos(autoTime * 0.21) * 0.02;
    const nextY = targetY + autoX;
    const nextX = targetX + autoY;

    world.rotation.y += (nextY - world.rotation.y) * 0.045;
    world.rotation.x += (nextX - world.rotation.x) * 0.045;

    const retreat = scroll;
    world.position.z = -retreat * 1.15;
    camera.position.z = (options.mobile ? 3.9 : 3.28) + retreat * 0.85;

    for (const layer of photoLayers) {
      layer.mesh.position.x = layer.baseX + layer.spreadX * retreat;
      layer.mesh.position.y = layer.baseY + layer.spreadY * retreat;
      layer.mesh.position.z = layer.baseZ - retreat * 0.9;
      layer.mesh.material.uniforms.uOpacity.value =
        layer.opacity * (1 - retreat * 0.55);
    }

    if (dust) {
      dust.rotation.y = autoTime * 0.018;
      dust.position.z = -retreat * 0.8;
      dust.material.opacity = 0.28 * (1 - retreat * 0.7);
    }

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
      targetY = x * 0.11;
      targetX = -y * 0.055;
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
      disposed = true;
      stop();
      for (const layer of photoLayers) {
        world.remove(layer.mesh);
        layer.texture.dispose();
      }
      photoMaterials.forEach((item) => item.dispose());
      if (dust) {
        dust.geometry.dispose();
        dust.material.dispose();
      }
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
