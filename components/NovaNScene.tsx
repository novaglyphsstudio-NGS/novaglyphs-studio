"use client";

/**
 * NovaGlyphs Studio — Primary Hero 3D Logo
 * Cinematic interactive crystalline "N" in a deep cosmic void.
 *
 * - Procedurally built faceted N from multiple meshes for a crystalline/gem-like quality.
 * - Galaxy/nebula "fill": inner point cloud + colored emissive shards.
 * - Layered particle systems (starfield + drifting cosmic dust + accent particles).
 * - Dramatic multi-colored volumetric-style lighting (cyan key, magenta fill, gold rim).
 * - Slow autonomous orbit + gentle floating + mouse-reactive tilt.
 * - Limited OrbitControls so user can explore the object while maintaining cinematic framing.
 *
 * References: the uploaded crystalline N logo + orbiting 3D N video (used as separate video fallback).
 *
 * Performance: All heavy geometry created once with useMemo. Points use buffer attributes.
 * No post-processing to keep deps minimal and performance high on most devices.
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Color palette matching brand (deep cinematic)
const COLORS = {
  void: "#020205",
  cyan: "#00f0ff",
  cyanDark: "#00a8b3",
  magenta: "#ff2e9a",
  magentaDark: "#b81f6e",
  gold: "#d4af37",
  goldDark: "#8f7a2a",
  nebulaOrange: "#ff7a2e",
  star: "#f8f8ff",
};

/**
 * The main faceted crystalline geometric "N" (CrystalN) has been removed.
 * This allows the user's rotating N video (logos-orbit-reel.mp4) to be the clear, prominent graphic
 * floating behind the hero without being obscured by duplicate 3D geometry.
 * Only lightweight atmospheric particles, nebula, and stars remain for subtle depth and motion.
 */

/**
 * Layered slow-moving cosmic particles / nebula dust.
 * Multiple point layers at different scales + speeds for convincing depth.
 */
function CosmicParticles() {
  const dustRef = useRef<THREE.Points>(null!);
  const accentRef = useRef<THREE.Points>(null!);

  const dust = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 52;
      pos[i + 1] = (Math.random() - 0.5) * 34;
      pos[i + 2] = (Math.random() - 0.5) * 38 - 6;
    }
    return pos;
  }, []);

  const accent = useMemo(() => {
    const count = 260;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [COLORS.cyan, COLORS.magenta, COLORS.gold, COLORS.nebulaOrange];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 29;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 19;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const c = new THREE.Color(palette[i % palette.length]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { pos, col };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.04;
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.6;
      dustRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (accentRef.current) {
      accentRef.current.rotation.y = t * 1.15;
      accentRef.current.rotation.x = Math.cos(t * 0.35) * 0.16;
    }
  });

  return (
    <>
      {/* Deep starfield / dust layer (very slow) */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.026}
          color={COLORS.star}
          transparent
          opacity={0.65}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Accent colored slow nebula particles */}
      <points ref={accentRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[accent.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[accent.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.072}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  );
}

/**
 * Subtle nebula "clouds" — low-poly glowing planes/spheres for volumetric atmosphere.
 * Very low opacity + additive feel.
 */
function NebulaClouds() {
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-6 + i * 7.5, -1.5 + Math.sin(i) * 3, -14 - i * 3]}
          rotation={[0.6 + i * 0.3, i * 1.1, -0.2]}
        >
          <sphereGeometry args={[i === 1 ? 11 : 8.5]} />
          <meshBasicMaterial
            color={i === 2 ? COLORS.magenta : i === 1 ? COLORS.cyan : COLORS.gold}
            transparent
            opacity={0.028 + i * 0.008}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Main Scene contents. Lights + environment.
 */
function Scene() {
  const { camera } = useThree();

  // Initial camera framing for dramatic hero presence
  useMemo(() => {
    camera.position.set(0, 1.2, 17.5);
    camera.lookAt(0, 0.3, 0);
    // @ts-expect-error — three types
    camera.fov = 41;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      {/* Very dark void fog for depth and cinematic mood */}
      <fog attach="fog" args={[COLORS.void, 18, 68]} />

      {/* Lighting — dramatic volumetric-style without actual volumetrics */}
      <ambientLight intensity={0.06} color="#0a0a18" />
      {/* Cyan key light — primary "hero" illumination */}
      <pointLight
        position={[-9, 12, -6]}
        color={COLORS.cyan}
        intensity={1.8}
        decay={1.6}
      />
      {/* Magenta dramatic rim / fill */}
      <pointLight
        position={[13, -7, -12]}
        color={COLORS.magenta}
        intensity={1.35}
        decay={2}
      />
      {/* Gold accent rim from below right */}
      <pointLight
        position={[5, -18, 9]}
        color={COLORS.gold}
        intensity={0.9}
        decay={2.2}
      />
      {/* Subtle central glow behind the N */}
      <pointLight position={[0, 0, -9]} color="#4a3a6a" intensity={0.4} />

      {/* Main geometric crystalline "N" removed so the rotating video logo (logos-orbit-reel.mp4) is clearly visible and unobscured.
          Only subtle cosmic particles, nebula layers, and stars remain as atmospheric enhancement floating over the video background. */}

      {/* Layered cosmic atmosphere (no main "N" geometry) */}
      <CosmicParticles />
      <NebulaClouds />

      {/* Classic distant stars for scale and wonder */}
      <Stars
        radius={92}
        depth={14}
        count={180}
        factor={1.8}
        saturation={0}
        fade
        speed={0.2}
      />

      {/* User-controlled cinematic orbit (restricted to keep framing elegant) */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.68}
        minAzimuthAngle={-Math.PI * 0.42}
        maxAzimuthAngle={Math.PI * 0.42}
        enableDamping
        dampingFactor={0.09}
        rotateSpeed={0.42}
      />
    </>
  );
}

/**
 * Public exported component.
 * Renders the full-screen interactive 3D experience.
 * Mouse movement (even outside canvas via window) gives parallax reactivity.
 */
export default function NovaNScene() {
  // Mouse interaction removed along with the main geometric "N" (the rotating video is now the primary visible logo).
  // The 3D scene now provides only subtle atmospheric particles over the video background.
  return (
    <div className="canvas-container absolute inset-0 z-1">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        camera={{ position: [0, 1.2, 17.5], fov: 41, near: 0.1, far: 140 }}
        dpr={[1, 1.85]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

