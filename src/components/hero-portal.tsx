"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PORTAL_TEXTURE = "/images/hero-obsidian-portal-alpha.png";

export default function HeroPortal() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const hero = host?.closest<HTMLElement>(".hero");
    if (!host || !canvas || !hero || !window.WebGLRenderingContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
    camera.position.z = 1;

    const uniforms = {
      uTexture: { value: new THREE.Texture() },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTextureAspect: { value: 1672 / 941 },
      uOpacity: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uScroll;
        uniform float uTextureAspect;
        uniform float uOpacity;
        uniform vec2 uPointer;
        uniform vec2 uResolution;

        vec2 containUv(vec2 screenUv) {
          float screenAspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 centered = screenUv - 0.5;
          if (screenAspect < uTextureAspect) {
            centered.y /= max(screenAspect / uTextureAspect, 0.001);
          } else {
            centered.x /= max(uTextureAspect / screenAspect, 0.001);
          }
          return centered + 0.5;
        }

        void main() {
          vec2 screen = vUv;
          vec2 p = screen - 0.5;

          float idleRotation =
            sin(uTime * 0.48) * 0.035 +
            uPointer.x * 0.018;
          float rotationCos = cos(idleRotation);
          float rotationSin = sin(idleRotation);
          p = mat2(
            rotationCos, -rotationSin,
            rotationSin, rotationCos
          ) * p;

          float breath = 1.0 + sin(uTime * 0.72) * 0.028;
          p /= breath;
          p.x /= 1.0 + uScroll * 0.22;
          p.y /= max(1.0 - uScroll * 0.27, 0.55);
          p -= uPointer * 0.028;

          vec2 uv = containUv(p + 0.5);
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

          vec2 q = uv - 0.5;
          float radius = length(vec2(q.x, q.y * 1.12));
          float angle = atan(q.y, q.x);
          float idleWave =
            sin(angle * 5.0 - uTime * 0.65) * 0.006 +
            sin(radius * 31.0 + uTime * 0.83) * 0.0045;
          float pointerWave = sin(radius * 46.0 - uTime * 1.35) * 0.0065;
          float pointerInfluence =
            exp(-length((screen - 0.5) - uPointer * 0.28) * 3.7);

          vec2 normal = normalize(q + vec2(0.0001));
          vec2 distortion =
            normal * (idleWave + pointerWave * pointerInfluence) *
            (1.0 + uScroll * 2.2);
          distortion += vec2(
            sin(uv.y * 18.0 + uTime * 0.42),
            cos(uv.x * 15.0 - uTime * 0.36)
          ) * 0.003;

          float aberration = 0.002 + pointerInfluence * 0.003 + uScroll * 0.0025;
          vec2 colorOffset = normal * aberration;
          vec4 centerSample = texture2D(uTexture, uv + distortion);
          vec4 redSample = texture2D(uTexture, uv + distortion + colorOffset);
          vec4 blueSample = texture2D(uTexture, uv + distortion - colorOffset);
          vec3 color = vec3(redSample.r, centerSample.g, blueSample.b);
          float alpha = max(
            centerSample.a,
            max(redSample.a, blueSample.a) * 0.72
          );
          color = mix(color, color * vec3(0.88, 0.94, 1.08), pointerInfluence * 0.16);
          color *= 0.98 + sin(uTime * 0.52 + radius * 8.0) * 0.04;

          gl_FragColor = vec4(color, alpha * uOpacity);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const texture = new THREE.TextureLoader().load(
      PORTAL_TEXTURE,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        uniforms.uTexture.value = loadedTexture;
        uniforms.uTextureAspect.value =
          loadedTexture.image.width / loadedTexture.image.height;
        uniforms.uOpacity.value = 1;
        hero.classList.add("hero-portal-ready");
      },
      undefined,
      () => hero.classList.remove("hero-portal-ready")
    );

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let scroll = 0;
    let scrollTarget = 0;
    let frameId = 0;
    let lastTime = performance.now();
    let inView = true;
    let pageVisible = !document.hidden;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };
    const updateScroll = () => {
      const bounds = hero.getBoundingClientRect();
      scrollTarget = THREE.MathUtils.clamp(-bounds.top / Math.max(bounds.height, 1), 0, 1);
    };
    const render = (time: number) => {
      frameId = 0;
      if (!inView || !pageVisible) return;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      pointer.x = THREE.MathUtils.damp(pointer.x, pointerTarget.x, 5.2, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointerTarget.y, 5.2, delta);
      scroll = THREE.MathUtils.damp(scroll, scrollTarget, 4.5, delta);
      uniforms.uPointer.value.copy(pointer);
      uniforms.uScroll.value = scroll;
      uniforms.uTime.value = reducedMotion ? 0 : time / 1000;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    const start = () => {
      if (!frameId && inView && pageVisible) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(render);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      pointerTarget.set(
        THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
        THREE.MathUtils.clamp(-(((event.clientY - bounds.top) / bounds.height) * 2 - 1), -1, 1)
      );
    };
    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { rootMargin: "160px 0px" }
    );
    const resizeObserver = new ResizeObserver(resize);

    resize();
    updateScroll();
    intersectionObserver.observe(hero);
    resizeObserver.observe(host);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      hero.classList.remove("hero-portal-ready");
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div className="hero-portal" ref={hostRef} aria-hidden="true">
      <div className="hero-portal-fallback" />
      <canvas ref={canvasRef} />
    </div>
  );
}
