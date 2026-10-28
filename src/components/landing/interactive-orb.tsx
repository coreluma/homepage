"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const vertexShader = /* glsl */ `
  varying vec3 vObjectPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vObjectPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// 3D simplex noise by Ian McEwan, Ashima Arts (MIT).
const noise = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLightDirection;
  varying vec3 vObjectPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  ${noise}

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewPosition);
    vec3 lightDirection = normalize(uLightDirection);

    // One broad, soft sweep of light that only shifts hue gently as the sphere turns.
    float sweep = snoise(vObjectPosition * 0.45 + vec3(0.0, uTime * 0.03, 0.0));
    float aurora = smoothstep(-0.2, 0.8, sweep);

    vec3 deep = vec3(0.27, 0.22, 0.92);
    vec3 blue = vec3(0.26, 0.56, 1.0);
    vec3 sky = vec3(0.74, 0.89, 1.0);

    // Base gradient follows the light so the sphere reads as a smooth, lit volume.
    float facing = dot(normal, lightDirection) * 0.5 + 0.5;
    vec3 color = mix(deep, blue, smoothstep(0.1, 0.75, facing));
    color = mix(color, sky, smoothstep(0.7, 1.0, facing) * 0.6);
    color = mix(color, vec3(0.62, 0.5, 1.0), aurora * 0.22);

    vec3 halfVector = normalize(lightDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 90.0);
    float softSpecular = pow(max(dot(normal, halfVector), 0.0), 12.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);

    vec3 lit = color;
    lit += vec3(1.0) * specular * 0.9;
    lit += vec3(0.75, 0.88, 1.0) * softSpecular * 0.12;
    lit += vec3(0.55, 0.78, 1.0) * fresnel * 0.7;

    gl_FragColor = vec4(lit, 1.0);
  }
`;

const ORBIT_RADIUS = 1.58;

const trailVertexShader = /* glsl */ `
  attribute float aFade;
  varying float vFade;
  varying float vEdge;

  void main() {
    vFade = aFade;
    vEdge = uv.y * 2.0 - 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFragmentShader = /* glsl */ `
  varying float vFade;
  varying float vEdge;

  void main() {
    float core = 1.0 - smoothstep(0.0, 1.0, abs(vEdge));
    vec3 color = mix(vec3(0.45, 0.62, 1.0), vec3(1.0), vFade);
    gl_FragColor = vec4(color, core * pow(vFade, 1.6));
  }
`;

// Ribbon that trails behind the head (at angle 0), tapering and fading along `arc` radians.
function createTrailGeometry(radius: number, arc: number, width: number) {
  const segments = 96;
  const positions: number[] = [];
  const uvs: number[] = [];
  const fades: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const angle = t * arc;
    const halfWidth = width * Math.pow(1 - t, 1.4);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    positions.push(x, -halfWidth, z, x, halfWidth, z);
    uvs.push(t, 0, t, 1);
    fades.push(1 - t, 1 - t);

    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute("aFade", new THREE.Float32BufferAttribute(fades, 1));
  geometry.setIndex(indices);
  return geometry;
}

// Four-point star with a soft halo, echoing the sparkle in the Core Luma wordmark.
function createSparkleTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (context) {
    const center = size / 2;
    const halo = context.createRadialGradient(center, center, 0, center, center, center);
    halo.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    halo.addColorStop(0.12, "rgba(191, 228, 255, 0.45)");
    halo.addColorStop(0.4, "rgba(120, 160, 255, 0.08)");
    halo.addColorStop(1, "rgba(120, 160, 255, 0)");
    context.fillStyle = halo;
    context.fillRect(0, 0, size, size);

    const arm = size * 0.48;
    const pinch = size * 0.035;
    context.beginPath();
    context.moveTo(center, center - arm);
    context.quadraticCurveTo(center + pinch, center - pinch, center + arm, center);
    context.quadraticCurveTo(center + pinch, center + pinch, center, center + arm);
    context.quadraticCurveTo(center - pinch, center + pinch, center - arm, center);
    context.quadraticCurveTo(center - pinch, center - pinch, center, center - arm);
    context.fillStyle = "#ffffff";
    context.shadowColor = "rgba(191, 228, 255, 0.9)";
    context.shadowBlur = 18;
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function InteractiveOrb() {
  const followRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.getElementById("top");

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const tilt = new THREE.Group();
    scene.add(tilt);

    const uniforms = {
      uTime: { value: 0 },
      uLightDirection: { value: new THREE.Vector3(-0.6, 0.7, 0.9) },
    };

    const sphereGeometry = new THREE.SphereGeometry(1.1, 128, 128);
    const sphereMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.rotation.z = 0.35;
    tilt.add(sphere);

    // Orbit plane is seen slightly from above and slanted, like a planet's ring.
    const orbit = new THREE.Group();
    orbit.rotation.x = 0.38;
    orbit.rotation.z = -0.32;
    tilt.add(orbit);

    const orbitLineGeometry = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 160 }, (_, i) => {
        const angle = (i / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * ORBIT_RADIUS, 0, Math.sin(angle) * ORBIT_RADIUS);
      }),
    );
    const orbitLineMaterial = new THREE.LineBasicMaterial({
      color: 0x9fc8ff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });
    orbit.add(new THREE.LineLoop(orbitLineGeometry, orbitLineMaterial));

    // Light streaks: a sparkle (the logo's four-point star) dragging a fading tail.
    const spinner = new THREE.Group();
    orbit.add(spinner);

    const trailMaterial = new THREE.ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const sparkleTexture = createSparkleTexture();
    const sparkleMaterial = new THREE.SpriteMaterial({
      map: sparkleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const streaks = [
      { offset: 0, arc: 2.1, width: 0.05, size: 0.42 },
      { offset: Math.PI, arc: 1.2, width: 0.028, size: 0.24 },
    ].map(({ offset, arc, width, size }) => {
      const group = new THREE.Group();
      group.rotation.y = offset;

      const trailGeometry = createTrailGeometry(ORBIT_RADIUS, arc, width);
      group.add(new THREE.Mesh(trailGeometry, trailMaterial));

      const sparkle = new THREE.Sprite(sparkleMaterial);
      sparkle.position.set(ORBIT_RADIUS, 0, 0);
      sparkle.scale.setScalar(size);
      group.add(sparkle);

      spinner.add(group);
      return { trailGeometry, sparkle, size };
    });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const handlePointerMove = (event: PointerEvent) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      targetRef.current.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      targetRef.current.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    };

    const resetPointer = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const clock = new THREE.Clock();
    const spinSpeed = reduceMotion ? 0.04 : 0.28;
    let frame = 0;
    let visible = true;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(host);

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;

      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;

      uniforms.uTime.value += delta;
      sphere.rotation.y += delta * spinSpeed;
      spinner.rotation.y += delta * spinSpeed * 2.2;
      streaks.forEach(({ sparkle, size }, index) => {
        const twinkle = 1 + Math.sin(uniforms.uTime.value * 5 + index * 2) * 0.18;
        sparkle.scale.setScalar(size * twinkle);
        sparkle.material.rotation = uniforms.uTime.value * 0.6;
      });

      tilt.rotation.x = current.y * 0.35;
      tilt.rotation.y = current.x * 0.45;
      uniforms.uLightDirection.value.set(-0.6 + current.x * 0.9, 0.7 - current.y * 0.9, 0.9);

      const follow = followRef.current;
      if (follow) {
        follow.style.setProperty("--orb-x", `${current.x * 6}vmin`);
        follow.style.setProperty("--orb-y", `${current.y * 4}vmin`);
      }

      renderer.render(scene, camera);
    };

    hero?.addEventListener("pointermove", handlePointerMove);
    hero?.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero?.removeEventListener("pointermove", handlePointerMove);
      hero?.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      orbitLineGeometry.dispose();
      orbitLineMaterial.dispose();
      streaks.forEach(({ trailGeometry }) => trailGeometry.dispose());
      trailMaterial.dispose();
      sparkleMaterial.dispose();
      sparkleTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute top-[36%] left-1/2 size-[120vmin] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:size-[109vmin]"
      aria-hidden="true"
    >
      <div ref={followRef} className="landing-orb-follow size-full">
        <div className="landing-orb-glow absolute inset-[32%] rounded-full" />
        <div ref={canvasHostRef} className="relative size-full" />
      </div>
    </div>
  );
}
