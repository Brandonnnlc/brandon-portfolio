"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TEXTURE_SIZE = 1024;

function createSurfaceTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable");

  const center = TEXTURE_SIZE / 2;
  const base = context.createRadialGradient(center - 120, center - 160, 20, center, center, center);
  base.addColorStop(0, "#252522");
  base.addColorStop(0.28, "#11110f");
  base.addColorStop(0.75, "#070706");
  base.addColorStop(1, "#020202");
  context.fillStyle = base;
  context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  const facet = context.createConicGradient(-0.7, center, center);
  facet.addColorStop(0, "rgba(255,255,255,.02)");
  facet.addColorStop(0.08, "rgba(255,255,255,.09)");
  facet.addColorStop(0.17, "rgba(0,0,0,.08)");
  facet.addColorStop(0.31, "rgba(255,255,255,.035)");
  facet.addColorStop(0.47, "rgba(0,0,0,.12)");
  facet.addColorStop(0.65, "rgba(255,255,255,.055)");
  facet.addColorStop(0.82, "rgba(0,0,0,.1)");
  facet.addColorStop(1, "rgba(255,255,255,.02)");
  context.fillStyle = facet;
  context.beginPath();
  context.arc(center, center, center - 4, 0, Math.PI * 2);
  context.fill();

  for (let radius = 166; radius < 500; radius += 3.2) {
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle =
      Math.round(radius) % 7 === 0
        ? "rgba(255,255,255,.12)"
        : "rgba(255,255,255,.045)";
    context.lineWidth = 0.72;
    context.stroke();
  }

  context.fillStyle = "#10100f";
  context.beginPath();
  context.arc(center, center, 145, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(255,255,255,.14)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "#ff6338";
  context.beginPath();
  context.arc(center, center, 13, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.translate(center, center);
  context.rotate(-0.08);
  context.fillStyle = "#ff6338";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "600 25px monospace";
  context.letterSpacing = "4px";
  context.fillText("DESIGN  •  BUILD  •  LEARN", 0, -45);
  context.fillStyle = "rgba(242,238,231,.68)";
  context.font = "500 13px monospace";
  context.fillText("BRANDON LIM — STUDIO PRESSING 001", 0, 44);
  context.restore();

  const imageData = context.getImageData(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  const pixels = imageData.data;
  for (let index = 0; index < pixels.length; index += 4) {
    const noise = (Math.random() - 0.5) * 7;
    pixels[index] = Math.max(0, Math.min(255, pixels[index] + noise));
    pixels[index + 1] = Math.max(0, Math.min(255, pixels[index + 1] + noise));
    pixels[index + 2] = Math.max(0, Math.min(255, pixels[index + 2] + noise));
  }
  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createMaterialMap(mode: "bump" | "roughness") {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable");

  const center = TEXTURE_SIZE / 2;
  context.fillStyle = mode === "bump" ? "#777" : "#a0a0a0";
  context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  for (let radius = 164; radius < 502; radius += 3.1) {
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle =
      mode === "bump"
        ? Math.round(radius) % 2
          ? "#d4d4d4"
          : "#333"
        : Math.round(radius) % 2
          ? "#646464"
          : "#d2d2d2";
    context.lineWidth = mode === "bump" ? 0.9 : 1.35;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export default function VinylDisc() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const orbit = host?.closest<HTMLElement>(".about-orbit");
    if (!host || !canvas || !orbit) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.WebGLRenderingContext) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
    camera.position.set(0, 0, 6.6);

    const tiltGroup = new THREE.Group();
    const spinGroup = new THREE.Group();
    tiltGroup.add(spinGroup);
    scene.add(tiltGroup);

    const surfaceTexture = createSurfaceTexture();
    const bumpTexture = createMaterialMap("bump");
    const roughnessTexture = createMaterialMap("roughness");

    const faceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: surfaceTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.035,
      roughnessMap: roughnessTexture,
      roughness: 0.28,
      metalness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.085,
      reflectivity: 1,
    });

    const backMaterial = faceMaterial.clone();
    const edgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x040404,
      roughness: 0.24,
      metalness: 0.38,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
    });

    const discGeometry = new THREE.CylinderGeometry(2.18, 2.18, 0.115, 160, 1);
    discGeometry.rotateX(Math.PI / 2);
    const disc = new THREE.Mesh(discGeometry, [edgeMaterial, faceMaterial, backMaterial]);
    spinGroup.add(disc);

    const rimGeometry = new THREE.TorusGeometry(2.18, 0.025, 18, 180);
    const rimMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x171715,
      metalness: 0.62,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.z = 0.064;
    spinGroup.add(rim);

    const highlightGeometry = new THREE.CircleGeometry(2.15, 160);
    const highlightMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
        uVelocity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uVelocity;

        void main() {
          vec2 p = vUv - 0.5;
          float r = length(p);
          float edge = 1.0 - smoothstep(0.34, 0.5, r);
          vec2 direction = normalize(vec2(0.58 + uPointer.x * 0.12, 0.82));
          float axis = dot(p, direction);
          float center = sin(uTime * 0.22) * 0.12 + uPointer.x * 0.05;
          float sweep = exp(-pow((axis - center) * 8.5, 2.0));
          float arc = exp(-pow((r - 0.36) * 38.0, 2.0));
          float energy = min(abs(uVelocity) * 0.12, 0.35);
          vec3 warm = vec3(1.0, 0.76, 0.58);
          vec3 cool = vec3(0.34, 0.55, 1.0);
          vec3 color = mix(warm, cool, smoothstep(-0.2, 0.35, p.x));
          float alpha = (sweep * (0.16 + energy) + arc * 0.035) * edge;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlight.position.z = 0.071;
    tiltGroup.add(highlight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.36));
    const keyLight = new THREE.DirectionalLight(0xfff4e8, 4.2);
    keyLight.position.set(-3.4, 4.8, 5.2);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x2e54fe, 26, 12, 2);
    blueLight.position.set(-3.2, -2.3, 3.3);
    scene.add(blueLight);
    const orangeLight = new THREE.PointLight(0xff6338, 18, 10, 2);
    orangeLight.position.set(3.4, 1.2, 2.8);
    scene.add(orangeLight);

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let frameId = 0;
    let inView = false;
    let pageVisible = !document.hidden;
    let lastWidth = 0;
    let lastHeight = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let spinBoost = 0;
    let spinTarget = 0;
    let elapsed = 0;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height || (width === lastWidth && height === lastHeight)) return;
      lastWidth = width;
      lastHeight = height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (timestamp: number) => {
      frameId = 0;
      if (!inView || !pageVisible) return;

      const delta = Math.min(0.05, Math.max(0.001, (timestamp - elapsed) / 1000 || 0.016));
      elapsed = timestamp;
      spinBoost = THREE.MathUtils.damp(spinBoost, spinTarget, 4.2, delta);
      spinTarget = THREE.MathUtils.damp(spinTarget, 0, 6.5, delta);

      spinGroup.rotation.z -= (0.42 + spinBoost) * delta;
      pointer.x = THREE.MathUtils.damp(pointer.x, pointerTarget.x, 5.2, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointerTarget.y, 5.2, delta);
      tiltGroup.rotation.x = THREE.MathUtils.damp(
        tiltGroup.rotation.x,
        pointer.y * -0.19,
        5.5,
        delta
      );
      tiltGroup.rotation.y = THREE.MathUtils.damp(
        tiltGroup.rotation.y,
        pointer.x * 0.24,
        5.5,
        delta
      );
      keyLight.position.x = -3.4 + pointer.x * 1.8;
      keyLight.position.y = 4.8 + pointer.y * 1.1;
      highlightMaterial.uniforms.uTime.value = timestamp / 1000;
      highlightMaterial.uniforms.uPointer.value.copy(pointer);
      highlightMaterial.uniforms.uVelocity.value = spinBoost;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!frameId && inView && pageVisible) {
        elapsed = performance.now();
        frameId = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerTarget.set(
        THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
        THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1)
      );
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);

    const onScroll = () => {
      const now = performance.now();
      const deltaTime = Math.max(16, now - lastScrollTime);
      const velocity = (window.scrollY - lastScrollY) / deltaTime;
      spinTarget = THREE.MathUtils.clamp(Math.abs(velocity) * 1.35, 0, 4.2);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        startLoop();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startLoop();
        else if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { rootMargin: "200px 0px" }
    );
    const resizeObserver = new ResizeObserver(resize);

    resize();
    intersectionObserver.observe(host);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    orbit.classList.add("webgl-ready");

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      orbit.classList.remove("webgl-ready");

      discGeometry.dispose();
      rimGeometry.dispose();
      highlightGeometry.dispose();
      faceMaterial.dispose();
      backMaterial.dispose();
      edgeMaterial.dispose();
      rimMaterial.dispose();
      highlightMaterial.dispose();
      surfaceTexture.dispose();
      bumpTexture.dispose();
      roughnessTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div className="vinyl-webgl" ref={hostRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
