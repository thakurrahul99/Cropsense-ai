"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type MousePos = { x: number; y: number };

function ParticleField({ mousePos }: { mousePos: MousePos }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesGroup = useMemo(() => new THREE.Group(), []);

  const positions = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 80 : 180;
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    // Build connection lines
    const mat = new THREE.LineBasicMaterial({
      color: "#00E5A0",
      transparent: true,
      opacity: 0.08,
    });
    let lineCount = 0;
    for (let i = 0; i < pts.length && lineCount < 100; i++) {
      for (let j = i + 1; j < pts.length && lineCount < 100; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.2) {
          const geom = new THREE.BufferGeometry();
          const linePos = new Float32Array([
            pts[i].x,
            pts[i].y,
            pts[i].z,
            pts[j].x,
            pts[j].y,
            pts[j].z,
          ]);
          geom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
          linesGroup.add(new THREE.Line(geom, mat));
          lineCount++;
        }
      }
    }
    return pos;
  }, [linesGroup]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const rotY = t * 0.04 + mousePos.x * 0.15;
    const rotX = Math.sin(t * 0.02) * 0.1 + mousePos.y * 0.08;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = rotY;
      pointsRef.current.rotation.x = rotX;
    }
    linesGroup.rotation.y = rotY;
    linesGroup.rotation.x = rotX;
  });

  return (
    <>
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00E5A0"
          size={0.055}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
      {createElement("primitive", { object: linesGroup })}
    </>
  );
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(0, 229, 160, 0.08) 0%, transparent 70%)",
      }}
    />
  );
}

export function HeroScene() {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    try {
      const canvas = document.createElement("canvas");
      const ctx =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!ctx) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!mounted || reducedMotion || !webglSupported) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0 opacity-90">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ParticleField mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
