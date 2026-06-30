"use client";

import { Suspense, useRef, useState, useEffect, type ReactNode, Component } from "react";
import type { Group, Mesh } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import { cn } from "@/lib/utils";

const MODEL_URL = "/models/avatar.glb";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ThreeErrorBoundary caught loading error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function FallbackMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state: unknown, delta: number) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ff4655" wireframe />
    </mesh>
  );
}

function AvatarModel({ url, reducedMotion }: { url: string; reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const firstName = names[0];
    if (firstName && actions[firstName] && !reducedMotion) {
      actions[firstName]?.reset().fadeIn(0.4).play();
    }
    return () => {
      const firstName = names[0];
      if (firstName && actions[firstName]) {
        actions[firstName]?.fadeOut(0.4);
      }
    };
  }, [actions, names, reducedMotion]);

  useFrame((_state: unknown, delta: number) => {
    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * 0.25; // slow autorotate
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={1.6} position={[0, -1.2, 0]} />
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.2}
        color="#ff6e7a"
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.6}
        color="#4a6fff"
      />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#ff4655" />
      <ThreeErrorBoundary fallback={<FallbackMesh reducedMotion={reducedMotion} />}>
        <Suspense fallback={<FallbackMesh reducedMotion={reducedMotion} />}>
          <AvatarModel url={MODEL_URL} reducedMotion={reducedMotion} />
        </Suspense>
      </ThreeErrorBoundary>
      <Environment preset="city" />
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.6}
        scale={8}
        blur={2}
        far={4}
        color="#ff4655"
      />
    </>
  );
}

function Hero3DLoadingState() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-secondary/80 p-6"
      aria-hidden
    >
      <div className="size-10 animate-pulse rounded-full border-2 border-accent border-t-transparent" />
      <p className="font-mono text-caption uppercase tracking-widest text-accent">
        Loading 3D Scene…
      </p>
    </div>
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

  useEffect(() => {
    try {
      useGLTF.preload(MODEL_URL);
    } catch {
      /* noop */
    }
  }, []);

  return (
    <div
      className={cn(
        "relative z-0 w-full overflow-hidden bg-surface-secondary/40",
        "aspect-square md:aspect-auto md:h-[500px]",
        className,
      )}
      aria-label="3D developer avatar"
    >
      <div
        className="hero-viewport-grid pointer-events-none absolute inset-0 z-10"
        aria-hidden
      />
      <Suspense fallback={<Hero3DLoadingState />}>
        <Canvas
          camera={{ position: [0, 1.2, 3], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
}
