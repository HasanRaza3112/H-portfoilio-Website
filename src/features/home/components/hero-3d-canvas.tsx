"use client";

import { useRef, useState, useEffect } from "react";
import type { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { cn } from "@/lib/utils";

/**
 * Procedural 3D PS5 Console rendered using Three.js primitive geometries.
 * Highly stylized, lightweight, and loads instantly with no external assets.
 */
function PS5Console({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      // Slow rotation on Y axis
      groupRef.current.rotation.y += delta * 0.45;
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.15}>
      {/* Circular Base / Stand */}
      <mesh position={[0, -1.02, 0]}>
        <cylinderGeometry args={[0.5, 0.52, 0.05, 32]} />
        <meshStandardMaterial color="#0b0b0e" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Center Black Glossy Body */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.22, 2.0, 0.85]} />
        <meshStandardMaterial
          color="#08080b"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Left White Panel (flared and offset slightly) */}
      <mesh position={[-0.14, 0.08, 0.02]} rotation={[0.02, 0.01, 0.03]}>
        <boxGeometry args={[0.03, 2.1, 0.9]} />
        <meshStandardMaterial
          color="#f3f3f6"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Right White Panel (flared and offset slightly) */}
      <mesh position={[0.14, 0.08, -0.02]} rotation={[-0.02, -0.01, -0.03]}>
        <boxGeometry args={[0.03, 2.1, 0.9]} />
        <meshStandardMaterial
          color="#f3f3f6"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Internal Blue LED Glow strips on the front */}
      <mesh position={[0.08, 0.05, 0.43]}>
        <boxGeometry args={[0.008, 1.8, 0.008]} />
        <meshBasicMaterial color="#0055ff" />
      </mesh>
      <mesh position={[-0.08, 0.05, 0.43]}>
        <boxGeometry args={[0.008, 1.8, 0.008]} />
        <meshBasicMaterial color="#0055ff" />
      </mesh>

      {/* Blue Light Source to cast glow on the white panels */}
      <pointLight position={[0, 0.2, 0.35]} distance={1.5} intensity={4} color="#0066ff" />
      <pointLight position={[0, -0.2, -0.35]} distance={1.5} intensity={2} color="#0044ff" />
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 5, 6]}
        intensity={1.5}
        color="#ff6e7a"
      />
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.8}
        color="#4a6fff"
      />
      <pointLight position={[3, 3, 3]} intensity={2.0} color="#ff4655" />
      
      <PS5Console reducedMotion={reducedMotion} />
      
      <Environment preset="city" />
      <ContactShadows
        position={[0, -1.02, 0]}
        opacity={0.75}
        scale={6}
        blur={1.8}
        far={3}
        color="#ff4655"
      />
    </>
  );
}

interface Hero3DCanvasProps {
  className?: string;
}

export function Hero3DCanvas({ className }: Hero3DCanvasProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <div
      className={cn(
        "relative z-0 w-full overflow-hidden bg-surface-secondary/40",
        "aspect-square md:aspect-auto md:h-[500px]",
        className,
      )}
      aria-label="3D PS5 console model"
    >
      <div
        className="hero-viewport-grid pointer-events-none absolute inset-0 z-10"
        aria-hidden
      />
      <Canvas
        camera={{ position: [0, 0.6, 2.6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
